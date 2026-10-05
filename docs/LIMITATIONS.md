# PRIME: Operational Scope, Detection Boundaries & Limitations
**Document ID**: LIM-PRIME-2026-V1  
**Principle**: Radical Honesty & Evidence-First Engineering (Section 3.B & Section 42)

---

## 1. Fundamental Posture: Never Claim Complete Detection

PRIME rejects vendor claims of "100% cryptographic visibility" or "guaranteed quantum immunity." Modern enterprise software contains dynamic reflection, polymorphic packaging, obfuscated binaries, runtime configuration injections, and external proprietary HSM offloads.

PRIME reports:
$$\text{Coverage Rate} = \frac{\text{Assessed Files}}{\text{Total Identified Files}} \times 100\%$$

For any unassessed asset, PRIME explicitly records the status and reason:
- **`SUPPORTED`**: File format and language parser implemented and executed without errors.
- **`UNSUPPORTED`**: Recognized extension/format where semantic parsing is currently unmapped (e.g., Ada, Fortran, Objective-C).
- **`SKIPPED`**: Asset bypassed per explicit enterprise policy (e.g. test fixtures, vendor binary blobs, minified 3rd-party bundles).
- **`FAILED`**: Parser encountered a syntax error, malformed AST, or unexpected encoding.

---

## 2. Language & Scanner Scope

| Language / Source | Detection Technique | Coverage Scope | Confidence Level | Known Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Python** | Native Abstract Syntax Tree (`ast` module) | Direct imports, function calls, keyword arguments for `cryptography`, `hashlib`, `PyCryptodome`, `PyJWT`. | `CONFIRMED` | Dynamic imports via `__import__()`, `importlib`, or runtime monkey-patching cannot be fully resolved statically. |
| **JavaScript / TypeScript** | Deterministic lexical and AST pattern matcher | Node.js `crypto`, Web Crypto API (`window.crypto.subtle`), `jsonwebtoken`, `bcrypt`, `argon2`. | `CONFIRMED` / `STRONG_INFERENCE` | Highly minified or webpack-bundled source files may obfuscate function signatures; sourcemaps are required for line-exactness. |
| **Java** | JCA / JCE regex and symbol parser | `KeyPairGenerator`, `Cipher.getInstance()`, `Signature.getInstance()`, `MessageDigest`, `KeyAgreement`. | `CONFIRMED` | Custom JCA Security Providers loaded dynamically at runtime via external `.jar` injection are catalogued as `INFERRED`. |
| **Go** | Lexical pattern matcher | `crypto/rsa`, `crypto/ecdsa`, `crypto/aes`, `crypto/tls`, `golang.org/x/crypto`. | `STRONG_INFERENCE` | Reflection-based cipher suite instantiations are catalogued as `UNVERIFIED`. |
| **C / C++** | Lexical symbol scanner | OpenSSL, BoringSSL, LibreSSL, WolfSSL APIs (`EVP_*`, `RSA_*`, `AES_*`). | `STRONG_INFERENCE` | Macro expansion (`#define`) and preprocessor-generated symbols may hide algorithm constants without full clang compilation unit integration. |
| **X.509 Certificates** | Safe ASN.1 PEM/DER parser | Subject, Issuer, Serial, Validities, Public Key Algorithm, Bit Length, Curves, Extensions. | `CONFIRMED` | Private key material is never inspected. Encrypted PKCS#12 (`.p12`/`.pfx`) bundles require password decryption which is not attempted. |
| **Compiled Binaries** | Static PE / ELF / Mach-O parser | Header metadata, section analysis, imported symbol table, cryptographic string heuristics. | `WEAK_INFERENCE` | **Binaries are NEVER executed**. Stripped binaries without symbol tables rely solely on string/constant heuristics. Full binary disassembly is planned for v2.0 adapter. |
| **Docker / Containers** | Static manifest parser | Dockerfile base images, package managers (`apk`, `apt`), crypto packages, installed cert stores. | `STRONG_INFERENCE` | Runtime image layer mutations or ephemeral container states are not captured statically. |
| **Network Endpoints** | Authorized TLS 1.2 / 1.3 socket probe | TLS version, negotiated cipher suite, certificate chain, RFC 10024 hybrid PQC groups (`X25519MLKEM768`). | `CONFIRMED` (Observed) | Endpoints not in the administrator allowlist are rejected. Firewalled or mutual TLS (mTLS) endpoints requiring client certs report `FAILED`. |
| **Cloud KMS / HSM** | Declared inventory connector | AWS KMS, Azure Key Vault, Google Cloud KMS, PKCS#11 HSM, TPM. | `DECLARED` (Manual) | Does not poll active cloud IAM credentials in air-gapped demo mode. Relies on structured manual inventory import or simulated connector. |

---

## 3. Cryptographic Purpose Inference Boundaries

PRIME infers cryptographic purpose (e.g. `digital_signature` vs `key_establishment` vs `encryption` vs `password_hashing`) from call-site context:
- `private_key.sign()` $\rightarrow$ `digital_signature`
- `Cipher.getInstance("AES/GCM/NoPadding")` $\rightarrow$ `encryption`
- `KeyAgreement.getInstance("ECDH")` $\rightarrow$ `key_establishment`

**Boundary Condition**: When an algorithm constant (such as `RSA` or `ECDSA`) is defined in an abstract configuration file or data dictionary without an immediate operational call site, PRIME labels the purpose as `unknown` or `protocol_security` and assigns an evidence classification of `STRONG_INFERENCE` rather than `CONFIRMED`.

---

## 4. Post-Quantum Standardization Status

PRIME adheres to finalized standards from NIST and IETF:
- **Finalized NIST Standards**:
  - **FIPS 203**: ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism)
  - **FIPS 204**: ML-DSA (Module-Lattice-Based Digital Signature Algorithm)
  - **FIPS 205**: SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)
- **Draft / Future Candidates**:
  - **HQC** (Hamming Quasi-Cyclic): Explicitly tagged in `knowledge_base/pqc_algorithms.json` with `status: "standardization_candidate"`. PRIME **never** recommends HQC as a finalized replacement until formally released by NIST.
  - **Stateful Hash-Based Signatures (LMS / XMSS, SP 800-208)**: Restricted to firmware and code-signing with strict state-exhaustion warnings.

---

## 5. Mosca Theorem Horizon Parameterization

Dr. Michele Mosca's Theorem ($X + Y > Z$) requires a projected "Quantum Horizon" ($Z$, colloquially referred to as "Q-Day").
- **No Predictive Claims**: PRIME does **not** claim to predict the exact year when a Cryptanalytically Relevant Quantum Computer (CRQC) will emerge.
- **Scenario Planning Only**: The default horizon of 2035 is an operational planning baseline aligned with NSA CNSA 2.0 and ANSSI timelines.
- **Configurable Sliders**: Cybersecurity teams are provided with interactive controls (2030, 2035, 2040, or Custom Year) to evaluate risk under varying threat scenarios.
