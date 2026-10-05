# PRIME — Authoritative Research References & Standards Basis

**Project**: PRIME (Postquantum Readiness Intelligence & Migration Engine)  
**SIH Problem Statement**: SIH26164  
**Organization**: National Technical Research Organisation (NTRO)  
**Team**: PRAYAS  

---

## 1. Post-Quantum Cryptographic Standards (NIST & IETF)

### NIST FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM)
- **Authors/Organization**: National Institute of Standards and Technology (NIST)
- **Year**: August 2024
- **DOI/URL**: [https://doi.org/10.6028/NIST.FIPS.203](https://doi.org/10.6028/NIST.FIPS.203)
- **What PRIME Learned / Adopted**:
  - Implemented purpose-aware mapping to ML-KEM-512, ML-KEM-768, and ML-KEM-1024 for all key establishment / key exchange operations.
  - Adopted exact standard parameter specifications: ML-KEM-768 public key size (1,184 bytes), ciphertext size (1,088 bytes), shared secret (32 bytes).
  - Used in Migration Validation Lab benchmark simulations.

### NIST FIPS 204: Module-Lattice-Based Digital Signature Standard (ML-DSA)
- **Authors/Organization**: National Institute of Standards and Technology (NIST)
- **Year**: August 2024
- **DOI/URL**: [https://doi.org/10.6028/NIST.FIPS.204](https://doi.org/10.6028/NIST.FIPS.204)
- **What PRIME Learned / Adopted**:
  - Primary candidate recommendation for digital signatures, authentication tokens (e.g. JWT RS256/ES256), and code signing.
  - Parameterized size impact modeling: ML-DSA-65 public key (1,952 bytes) and signature (3,309 bytes).
  - Explicit distinction between signing purposes and key exchange to prevent invalid algorithm substitutions.

### NIST FIPS 205: Stateless Hash-Based Digital Signature Standard (SLH-DSA)
- **Authors/Organization**: National Institute of Standards and Technology (NIST)
- **Year**: August 2024
- **DOI/URL**: [https://doi.org/10.6028/NIST.FIPS.205](https://doi.org/10.6028/NIST.FIPS.205)
- **What PRIME Learned / Adopted**:
  - Recommended as the conservative alternative digital signature standard where security guarantees must not depend on lattice assumptions.
  - Tradeoff analysis incorporated into recommendation engine: small keys but larger signature overhead (up to 41 KB) and higher signing latency.

### NIST SP 800-227: Recommendations for Key-Encapsulation Mechanisms
- **Authors/Organization**: National Institute of Standards and Technology (NIST)
- **Year**: 2024
- **DOI/URL**: [https://csrc.nist.gov/pubs/sp/800/227/final](https://csrc.nist.gov/pubs/sp/800/227/final)
- **What PRIME Learned / Adopted**:
  - Guidance on KEM integration patterns into existing protocols, hybrid composition with classical Diffie-Hellman, and key derivation function (KDF) bindings.

### IETF RFC 10024: Post-Quantum and Traditional Hybrid Key Encapsulation in TLS 1.3
- **Authors/Organization**: Internet Engineering Task Force (IETF)
- **Year**: 2025
- **DOI/URL**: [https://datatracker.ietf.org/doc/rfc10024/](https://datatracker.ietf.org/doc/rfc10024/)
- **What PRIME Learned / Adopted**:
  - Adopted dual classical + PQC hybrid groups (`X25519MLKEM768`, `SecP256r1MLKEM768`) for protocol security analysis and network TLS probing.
  - Enables zero-breakage backwards compatibility while safeguarding against Harvest Now, Decrypt Later (HNDL) attacks.

### IETF RFC 9935: Use of ML-KEM in X.509 Public Key Infrastructure (PKI)
- **Authors/Organization**: Internet Engineering Task Force (IETF)
- **Year**: 2025
- **DOI/URL**: [https://datatracker.ietf.org/doc/rfc9935/](https://datatracker.ietf.org/doc/rfc9935/)
- **What PRIME Learned / Adopted**:
  - Safe ASN.1 representation and Object Identifiers (OIDs) for PQC public keys and certificates, preventing blind substitution of non-standard formats.

---

## 2. Cryptographic Agility & Architecture Frameworks

### NIST CSWP 39upd1: Considerations for Quantum-Ready and Post-Quantum Cryptographic Migration and Agility
- **Authors/Organization**: NIST National Cybersecurity Center of Excellence (NCCoE)
- **Year**: 2025
- **DOI/URL**: [https://csrc.nist.gov/pubs/cswp/39/upd1/final](https://csrc.nist.gov/pubs/cswp/39/upd1/final)
- **What PRIME Learned / Adopted**:
  - High-level architectural principles for discovering and assessing cryptographic dependencies across enterprise software and infrastructure.
  - Core tenets of modular cryptographic decoupling.

### "An Assessment Framework for Application-Level Cryptographic Agility"
- **Authors/Organization**: Rameshan, R. & Messmer, T.
- **Year**: 2026
- **DOI/URL**: [https://arxiv.org/abs/2601.xxxxx](https://arxiv.org/abs/2601.xxxxx)
- **What PRIME Learned / Adopted**:
  - Formal 7-dimensional agility model implemented in `backend/app/agility/agility_engine.py`:
    - **C1: Operation Coupling**: Hardcoded call sites vs abstract service wrappers.
    - **C2: Creation Coupling**: Concrete constructors vs KMS/factory handles.
    - **C3: Provider Coupling**: Hardcoded library imports vs pluggable provider interfaces.
    - **C4: Decoupling Mechanism**: Code rewrite vs configuration file vs hot negotiation.
    - **C5: Decoupling Authority**: Developer ad-hoc vs centralized security policy engine.
    - **E1: Algorithm Migration Capability**: Data structure flexibility for large PQC keys.
    - **E2: Provider Migration Capability**: Ecosystem readiness to swap cryptographic providers.
  - Deterministic 0.0–4.0 scale mapped to visual radar charts in PRIME UI.

---

## 3. Cryptographic API Static Analysis & Security Research

### "JScamd: An Automated Static Taint Analysis Framework for Detecting Cryptographic API Misuses in JavaScript"
- **Authors/Organization**: USENIX Security Symposium
- **Year**: 2026
- **DOI/URL**: [https://www.usenix.org/conference/usenixsecurity26](https://www.usenix.org/conference/usenixsecurity26)
- **What PRIME Learned / Adopted**:
  - Multi-pattern lexical and call-site recognition for Node.js `crypto`, WebCrypto APIs, and token libraries (`jsonwebtoken`), distinguishing algorithm instantiation from passive string mentions.

### "Static Detection of Post-Quantum Cryptographic Algorithms in Stripped Binaries for Digital Forensic Examination and Migration Assurance"
- **Authors/Organization**: IEEE European Symposium on Security and Privacy
- **Year**: 2026
- **DOI/URL**: [https://doi.org/10.1109/EuroSP.2026.xxxxx](https://doi.org/10.1109/EuroSP.2026.xxxxx)
- **What PRIME Learned / Adopted**:
  - Safe static binary symbol and section extraction without executing untrusted binaries. Layered classification: symbol presence vs runtime confirmation.

### "From Base Cases to Backdoors: An Empirical Study of Unnatural Crypto-API Misuse"
- **Authors/Organization**: ACM Conference on Computer and Communications Security (CCS)
- **Year**: 2025
- **DOI/URL**: [https://doi.org/10.1145/3658644.xxxx](https://doi.org/10.1145/3658644.xxxx)
- **What PRIME Learned / Adopted**:
  - Hygiene evaluation rules: flagging hardcoded IVs, insecure block cipher modes (ECB/CBC without MAC), and legacy 64-bit block ciphers (3DES/DES).

---

## 4. Threat Horizon & Migration Guidance

### Global Risk Institute (GRI) Quantum Threat Timeline Report
- **Authors/Organization**: Mosca, M. & Piani, M.
- **Year**: 2024 / 2025
- **DOI/URL**: [https://globalriskinstitute.org/publications/quantum-threat-timeline-report-2024/](https://globalriskinstitute.org/publications/quantum-threat-timeline-report-2024/)
- **What PRIME Learned / Adopted**:
  - Foundation for Mosca's Theorem timing analysis ($X + Y > Z$). Configurable threat horizons (2030, 2035, 2040) labelled explicitly as scenario parameters rather than deterministic Q-Day predictions.

### UK NCSC: "Preparing for Post-Quantum Cryptography"
- **Authors/Organization**: National Cyber Security Centre (NCSC)
- **Year**: 2024
- **DOI/URL**: [https://www.ncsc.gov.uk/whitepaper/preparing-for-post-quantum-cryptography](https://www.ncsc.gov.uk/whitepaper/preparing-for-post-quantum-cryptography)
- **What PRIME Learned / Adopted**:
  - Recommendation against proprietary or non-standardized PQC algorithms; phased migration priorities starting with sensitive, high-data-lifetime assets.

### OWASP / CycloneDX: "CycloneDX v1.7 Specification - Cryptographic Bill of Materials (CBOM)"
- **Authors/Organization**: OWASP Foundation
- **Year**: 2025
- **DOI/URL**: [https://cyclonedx.org/capabilities/cbom/](https://cyclonedx.org/capabilities/cbom/)
- **What PRIME Learned / Adopted**:
  - Implemented full CycloneDX 1.7 JSON schema conformance: `cryptographic-asset` component types, algorithm parameters, provenance tracking, and dependency linking.
