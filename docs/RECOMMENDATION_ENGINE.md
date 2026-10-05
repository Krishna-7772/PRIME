# ECDAT Purpose-Aware PQC Recommendation Engine

## Overview
A critical principle of ECDAT is **purpose-aware recommendation**. The system avoids superficial replacements (e.g. blindly suggesting ML-KEM for digital signatures). It enforces cryptanalytic alignment between the original primitive's purpose and finalized NIST PQC standards.

---

## 1. Finalized NIST Standards (August 2024)

ECDAT aligns strictly with official NIST Post-Quantum Cryptography standards:

1. **FIPS 203: ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism)**
   - Derived from CRYSTALS-Kyber.
   - Purpose: General key establishment, TLS 1.3 handshakes, hybrid encryption envelopes.
   - Profiles: `ML-KEM-512` (Category 1), `ML-KEM-768` (Category 3 - Recommended), `ML-KEM-1024` (Category 5).

2. **FIPS 204: ML-DSA (Module-Lattice-Based Digital Signature Algorithm)**
   - Derived from CRYSTALS-Dilithium.
   - Purpose: Digital signatures, identity assertions, code signing, PKI certificates.
   - Profiles: `ML-DSA-44` (Category 2), `ML-DSA-65` (Category 3 - Recommended), `ML-DSA-87` (Category 5).

3. **FIPS 205: SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)**
   - Derived from SPHINCS+.
   - Purpose: Conservative digital signatures backed solely by hash functions (SHA-2 / SHAKE).
   - Profiles: `SLH-DSA-SHA2-128s`, `SLH-DSA-SHAKE-128f`, `SLH-DSA-SHA2-256s`.

---

## 2. Decision Matrix by Purpose

| Current Primitive | Detected Purpose | Primary PQC Recommendation | Conservative Alternative | Technical Consideration |
|---|---|---|---|---|
| **RSA / ECDSA / Ed25519** | `digital_signature` | **ML-DSA-65 (FIPS 204)** | **SLH-DSA (FIPS 205)** | Signature size expands from 256 B (RSA) or 64 B (ECDSA) to **3,309 B**. Protocol buffers, network MTUs, and DB columns must accommodate multi-kilobyte signatures. |
| **ECDH / DH / X25519** | `key_establishment` | **ML-KEM-768 (FIPS 203)** | **HYBRID-KEM (X25519 + ML-KEM-768)** | Ciphertext overhead is 1,088 B. Hybrid composite mode is recommended during transition to preserve FIPS 140-3 compliance while mitigating SNDL. |
| **RSA-OAEP** | `encryption` (Asymmetric) | **Hybrid Envelope (ML-KEM-768 + AES-256-GCM)** | Pre-shared KDF + AES-256 | PQC does not offer direct trapdoor encryption. Architectural shift to KEM-DEM (Key Encapsulation / Data Encapsulation) is required. |
| **AES-128 / 3DES** | `encryption` (Symmetric) | **AES-256-GCM (FIPS 197)** | **ChaCha20-Poly1305** | Symmetric ciphers are unaffected by Shor's algorithm. Grover's search halves bit security; upgrading key size to 256 bits guarantees 128-bit quantum security. **ML-KEM/ML-DSA are NOT symmetric ciphers.** |
| **MD5 / SHA-1** | `hashing` | **SHA-256 or SHA-384 (FIPS 180-4)** | **SHA3-256 (FIPS 202)** | Classical collision hygiene upgrade. No PQC primitives required. |
| **TLS / SSL** | `protocol_security` | **TLS 1.3 with Hybrid Key Exchange (X25519MLKEM768)** | WireGuard / IPSec with PQC PSK | Protects transport sessions against passive eavesdropping and retrospective decryption. |
| **X.509 Leaf / CA** | `certificate` | **Composite / Dual-Signature X.509 (ECDSA P-256 + ML-DSA-65)** | Pure PQC Certificate (ML-DSA-65) | Enables dual-verification: legacy systems validate ECDSA while quantum-aware systems validate ML-DSA. |
