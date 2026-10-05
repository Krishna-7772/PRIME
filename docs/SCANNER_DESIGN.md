# PRIME: Multi-Layer Cryptographic Discovery & Scanner Architecture
**Document ID**: ARCH-SCAN-2026-V1  
**Module**: `backend/app/scanners/`

---

## 1. Discovery Pipeline Architecture

PRIME's scanner engine adopts an **Evidence-First, Pluggable Pipeline Architecture**:

```
                       ┌────────────────────────────┐
                       │ Target Enterprise Sandbox  │
                       └─────────────┬──────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
     [ Static Code & Manifests ]             [ Environmental Artifacts ]
     - Python AST (`.py`)                    - X.509 Certificates (`.pem`, `.crt`)
     - JS/TS Lexical (`.js`, `.ts`)          - Dockerfile / Containers
     - Java JCA (`.java`)                    - Static Binaries (`.elf`, `.so`, `.exe`)
     - C/C++ OpenSSL (`.c`, `.cpp`)          - Authorized TLS Endpoints (SSRF-Guarded)
     - Package Manifests (pip, npm, mvn)     - Declared Cloud/HSM (AWS/Azure/GCP/PKCS#11)
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │    Scanner Orchestrator     │
                      │  (Coverage & Error Tracker) │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │ Raw Observation Stream      │
                      │ (Line, Excerpt, Confidence) │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │ Normalization & Fusion Layer│
                      │ (Canonical Crypto Naming)   │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │ Relational Crypto Inventory │
                      └─────────────────────────────┘
```

---

## 2. Pluggable Scanner Modules

### 2.1 Python AST Scanner (`source/python_scanner.py`)
- Employs Python's native `ast` module to construct ASTs without running target code.
- Traces symbol bindings across imports (`ast.Import`, `ast.ImportFrom`) to capture aliasing.
- Scans `ast.Call` nodes:
  - `rsa.generate_private_key(public_exponent, key_size)` $\rightarrow$ Extracts exact modulus bit length.
  - `ec.generate_private_key(curve)` $\rightarrow$ Extracts NIST curves (`SECP256R1`, `SECP384R1`, `SECP521R1`, `SECP256K1`).
  - `Cipher(algorithms.AES(key), modes.GCM(iv))` $\rightarrow$ Extracts symmetric cipher, mode, and key length.
  - `Cipher(algorithms.TripleDES(key), modes.CBC(iv))` $\rightarrow$ Identifies legacy 3DES.
  - `hashes.SHA256()`, `hashes.MD5()`, `hashes.SHA1()` $\rightarrow$ Identifies digest functions and flags legacy usages.
  - `jwt.encode(..., algorithm="RS256")` $\rightarrow$ Captures JWT digital signature bindings.

### 2.2 JavaScript / TypeScript Scanner (`source/javascript_scanner.py`)
- Evaluates Node.js native `crypto` invocations:
  - `crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })`
  - `crypto.createCipheriv('aes-256-gcm', key, iv)`
  - `crypto.createSign('SHA256')`
- Evaluates Web Crypto API (`window.crypto.subtle`):
  - `subtle.generateKey({ name: 'RSA-OAEP', modulusLength: 2048 })`
  - `subtle.sign({ name: 'ECDSA', hash: { name: 'SHA-256' } })`
- Evaluates modern KDF APIs (`bcrypt`, `argon2`, `scrypt`).

### 2.3 Java JCA Scanner (`source/java_scanner.py`)
- Inspects Java Cryptography Architecture (JCA) patterns:
  - `KeyPairGenerator.getInstance("RSA")` with `.initialize(2048)`
  - `Cipher.getInstance("AES/GCM/NoPadding")`
  - `MessageDigest.getInstance("SHA-256")`
  - `Signature.getInstance("SHA256withRSA")`
  - `KeyAgreement.getInstance("ECDH")`

### 2.4 C / C++ OpenSSL Scanner (`source/cpp_scanner.py`)
- Analyzes C/C++ source for OpenSSL / BoringSSL primitives:
  - `EVP_RSA_gen`, `RSA_generate_key_ex`
  - `EVP_aes_256_gcm()`, `EVP_sha256()`
  - `EC_KEY_new_by_curve_name(NID_X9_62_prime256v1)`

### 2.5 Safe X.509 Certificate Scanner (`certificate/certificate_scanner.py`)
- Inspects PEM, DER, and certificate chains using `cryptography.x509`.
- Safely extracts Subject, Issuer, Serial Number, Not Before / Not After, Public Key Bit Length, and Signature Algorithm.
- **Strict Security Rule**: Private keys are never touched, persisted, or logged.

### 2.6 Dependency & Manifest Scanner (`dependencies/library_scanner.py`)
- Parses dependency lockfiles and manifests:
  - `requirements.txt`, `pyproject.toml`, `poetry.lock`
  - `package.json`, `package-lock.json`
  - `pom.xml`, `build.gradle`
  - `go.mod`, `go.sum`
  - `Cargo.toml`, `Cargo.lock`
- Distinguishes **Direct Dependencies**, **Transitive Dependencies**, and **Observed Usages**.

### 2.7 Static Binary Scanner (`binary/binary_scanner.py`)
- Uploaded binaries are **NEVER executed**.
- Performs passive static inspection of PE, ELF, and Mach-O files:
  - SHA-256 cryptographic digest.
  - Section analysis (`.text`, `.rodata`).
  - Imported symbol tables (`libcrypto.so`, `advapi32.dll`, `BCryptOpenAlgorithmProvider`).
  - String heuristics with offset addresses.
- Findings are classified as `WEAK_INFERENCE` with explicit confidence ratings.

### 2.8 Network / TLS Scanner (`network/tls_scanner.py`)
- Actively probes administrator-authorized endpoints for TLS 1.2 / TLS 1.3 posture.
- Inspects negotiated cipher suite, certificate chain, and supported hybrid PQC key exchange groups (RFC 10024 `X25519MLKEM768`, `SecP256r1MLKEM768`).
- Enforces strict SSRF controls against RFC 1918 / RFC 4193 private and loopback networks.

### 2.9 Declared Cloud / HSM Connector (`cloud/declared_scanner.py`)
- Ingests declared cloud key metadata for AWS KMS, Azure Key Vault, Google Cloud KMS, and PKCS#11 HSMs.
- Findings are explicitly labeled with `DECLARED` provenance rather than pretending automated discovery.

---

## 3. Strict Coverage Tracking (Section 3.B)

The Scanner Orchestrator tracks real-time coverage metrics during every scan:

$$\text{Coverage Rate} = \frac{\text{Assessed Files}}{\text{Total Files Found}} \times 100\%$$

Each scan record stores:
- `files_assessed`
- `files_supported`
- `files_unsupported`
- `files_failed`
- `files_skipped`
- `coverage_percentage`
- `scan_duration_ms`

This data is rendered in the executive header and exported in the CycloneDX 1.7 CBOM metadata block.
