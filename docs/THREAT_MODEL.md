# PRIME — Threat Model & Security Architecture

**Product**: PRIME (Postquantum Readiness Intelligence and Migration Engine)  
**SIH Problem Statement**: SIH26164  
**Organization**: National Technical Research Organisation (NTRO)  
**Team**: PRAYAS  

---

## 1. Threat Scenarios & Cryptographic Risk Landscape

### 1.1 Harvest Now, Decrypt Later (HNDL)
- **Threat Actor**: Sophisticated state-sponsored adversaries and persistent threat actors.
- **Mechanism**: Adversaries intercept and record encrypted network traffic and confidential database backups today. Even though the cipher cannot be broken with classical computers, recorded data is archived until a Cryptanalytically Relevant Quantum Computer (CRQC) becomes operational.
- **PRIME Countermeasure**:
  - Implements **Dr. Michele Mosca’s Theorem**: $X + Y > Z$.
  - Quantifies the vulnerability window where Data Shelf-Life ($X$) plus Migration Time ($Y$) exceeds the Quantum Horizon ($Z$).
  - Recommends immediate transition to **IETF RFC 10024 PQ/T Hybrid Key Exchange** (`X25519MLKEM768`) to ensure current traffic cannot be retroactively decrypted.

### 1.2 Shor's Algorithm Threat on Asymmetric Primitives
- **Impact**: Poly-time factorization ($O(n^3)$) and discrete logarithms.
- **Affected Primitives**: RSA (all key lengths), ECDSA, ECDH, Ed25519, DSA, Diffie-Hellman.
- **PRIME Classification**: `QUANTUM_VULNERABLE` (Total cryptographic break once CRQC is reached).
- **PRIME Replacement**:
  - Key Exchange: **NIST FIPS 203 (ML-KEM)**
  - Digital Signatures: **NIST FIPS 204 (ML-DSA)** & **NIST FIPS 205 (SLH-DSA)**

### 1.3 Grover's Algorithm Threat on Symmetric Primitives
- **Impact**: Quadratic speedup for unstructured search ($O(\sqrt{N})$), effectively halving classical security margins.
- **Affected Primitives**: AES-128 (reduced to ~64 bits of security, vulnerable), AES-256 (reduced to ~128 bits of security, remains quantum resistant).
- **PRIME Classification**:
  - AES-128 / ChaCha20: `QUANTUM_WEAKENED` (recommend migration to 256-bit symmetric keys).
  - AES-256-GCM: `QUANTUM_RESISTANT` (sufficient post-quantum security margin).

---

## 2. Security of the PRIME Platform Itself

PRIME analyzes untrusted enterprise source code, compiled binaries, container manifests, and network endpoints. The tool itself is built with strict defensive controls:

### 2.1 Untrusted Archive & File Upload Protections
- **Zip-Slip Mitigation**: All file paths in uploaded archives are strictly checked against directory traversal patterns (`../`) before extraction. Path resolution ensures files cannot escape the designated temporary scratch workspace.
- **Zip-Bomb Protection**: File sizes and decompression ratios are monitored with hard limits.

### 2.2 Strict Zero-Execution Policy for Uploaded Binaries
- **Policy**: Uploaded ELF, PE, and Mach-O binaries are **NEVER EXECUTED**.
- **Implementation**: `BinaryScanner` performs purely passive static inspection:
  - Header inspection (ELF/PE magic bytes)
  - Static string harvesting
  - Section table inspection
  - Imported symbol tables without launching any sub-processes.

### 2.3 SSRF (Server-Side Request Forgery) Protection
- **Target**: `TLSNetworkScanner` (`backend/app/scanners/network/tls_scanner.py`).
- **Enforcement**:
  - Validates all endpoint targets against private IPv4/IPv6 ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `::1`, link-local, multicast).
  - Disallows internal network scanning unless the IP/hostname is explicitly added to the administrator's allowlist.

### 2.4 Private Key Material & Secret Redaction
- **No Private Keys Stored**: PRIME strictly examines public certificates, public key algorithms, and public parameters. Private key bodies (`BEGIN PRIVATE KEY`, `BEGIN RSA PRIVATE KEY`) are immediately discarded or redacted.
- **Log Sanitization**: Code snippet evidence extraction automatically strips sensitive API tokens and credentials.

### 2.5 Local-First & Air-Gapped Operation
- **Zero External API Calls**: PRIME does not send source code or cryptographic findings to external cloud LLMs or third-party APIs.
- **Offline Self-Contained**: The complete knowledge base (`knowledge_base/`) and discovery scanners run entirely offline on-premises.
