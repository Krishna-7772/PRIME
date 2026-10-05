# BharatPay Enterprise Demo Repository
**DEMO ENVIRONMENT FOR SIH26164 (NTRO)**

This repository simulates an Indian FinTech enterprise stack with realistic cryptographic usage across:
1. `auth-service`: RSA-2048 token signing, hashlib SHA-256, legacy MD5 checksum.
2. `payment-service`: AES-256-CBC, ECDSA SECP256R1 signing, legacy 3DES cipher.
3. `api-gateway`: Node.js crypto createHash SHA-256, AES-256-GCM, RSA keygen.
4. `certificates`: RSA-2048 and ECDSA P-256 X.509 public certificates.
5. `docker`: Dockerfile provisioning OpenSSL, ca-certificates, and libssl-dev.
