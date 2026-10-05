# ECDAT Cryptographic Scanner Engine Specification

## Overview
The ECDAT Scanner Engine performs deterministic, evidence-backed discovery across multiple software artifacts without executing untrusted code or guessing results.

---

## 1. Scanner Modules

### A. Python AST Scanner (`python_scanner.py`)
- Employs Python's native `ast` module to construct Abstract Syntax Trees.
- Traces symbol bindings across imports (`ast.Import`, `ast.ImportFrom`) to capture aliases.
- Evaluates `ast.Call` nodes to inspect:
  - `rsa.generate_private_key(public_exponent, key_size)` $\rightarrow$ Extracts exact modulus bit length.
  - `ec.generate_private_key(curve)` $\rightarrow$ Extracts NIST curves (`SECP256R1`, `SECP384R1`, `SECP521R1`, `SECP256K1`).
  - `Cipher(algorithms.AES(key), modes.CBC(iv))` $\rightarrow$ Extracts symmetric cipher algorithm and key length.
  - `Cipher(algorithms.TripleDES(key), modes.CBC(iv))` $\rightarrow$ Identifies legacy 3DES.
  - `hashes.SHA256()`, `hashes.MD5()`, `hashes.SHA1()` $\rightarrow$ Identifies digest functions.
  - `hashlib.sha256()`, `hashlib.md5()` $\rightarrow$ Standard library hashing.
  - `jwt.encode(..., algorithm="RS256")` $\rightarrow$ JWT digital signature bindings.

### B. JavaScript / TypeScript Scanner (`javascript_scanner.py`)
- Analyzes Node.js native `crypto` module invocations:
  - `crypto.createHash('sha256')`, `crypto.createHash('md5')`
  - `crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })`
  - `crypto.createCipheriv('aes-256-gcm', key, iv)`
  - `crypto.createSign('SHA256')`
- Analyzes Web Crypto API (`crypto.subtle`):
  - `subtle.generateKey({ name: 'RSA-OAEP', modulusLength: 2048 })`
  - `subtle.sign({ name: 'ECDSA', hash: { name: 'SHA-256' } })`
- Analyzes KDF libraries (`bcrypt.hash`, `argon2.hash`).

### C. Java JCA Scanner (`java_scanner.py`)
- Analyzes Java Cryptography Architecture (JCA) patterns:
  - `KeyPairGenerator.getInstance("RSA")` with `.initialize(2048)`
  - `Cipher.getInstance("AES/CBC/PKCS5Padding")`
  - `MessageDigest.getInstance("SHA-256")`
  - `Signature.getInstance("SHA256withRSA")`
  - `KeyAgreement.getInstance("ECDH")`

### D. Certificate Scanner (`certificate_scanner.py`)
- Inspects `.crt`, `.pem`, `.cer`, `.der` files using `cryptography.x509`.
- Parses ASN.1 structures and extracts:
  - Subject, Issuer, Serial Number, Validity window.
  - Public Key Algorithm (`RSA`, `ECDSA`, `Ed25519`) and key bit size.
  - Signature Algorithm (`SHA256withRSA`, `ECDSA-SHA256`).
- **Security Rule**: Strictly reads public keys. Never accesses, records, or logs private key content.

### E. Library & Manifest Scanner (`library_scanner.py`)
- Parses dependency lockfiles and manifests:
  - `requirements.txt` (Python pip)
  - `package.json` (Node npm)
  - `pom.xml` (Java Maven)
- Matches against known cryptographic libraries (`cryptography`, `pycryptodome`, `crypto-js`, `bouncycastle`, `node-forge`).

### F. Container & Binary Scanners
- `container_scanner.py`: Inspects `Dockerfile` and `docker-compose.yml` for OpenSSL packages, TLS reverse proxies, and PKI trust roots.
- `binary_scanner.py`: Performs safe static inspection of executable files (`.exe`, `.so`, `.bin`) using string and symbol heuristics at offset addresses without execution. Labels findings as "Potential / Inferred" with 73% confidence.
