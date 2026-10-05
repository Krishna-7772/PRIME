import os
import datetime
from pathlib import Path
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, ec
from cryptography.hazmat.primitives import serialization

BASE_DIR = Path(__file__).resolve().parent.parent / "demo" / "bharatpay"

def create_bharatpay_demo():
    print(f"Generating BharatPay demo enterprise project in {BASE_DIR}...")
    
    # 1. Directories
    dirs = [
        BASE_DIR / "auth-service" / "src",
        BASE_DIR / "payment-service" / "src",
        BASE_DIR / "api-gateway" / "src",
        BASE_DIR / "customer-portal" / "src",
        BASE_DIR / "certificates",
        BASE_DIR / "config",
        BASE_DIR / "docker"
    ]
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)

    # 2. auth-service/src/auth.py
    auth_py = """# BharatPay Enterprise Authentication Service
# Handles customer identity, OAuth2 token minting, and PKI key exchange.

from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
import jwt

class AuthenticationService:
    def __init__(self):
        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()

    def mint_session_jwt(self, user_id: str) -> str:
        # Mint RS256 token signed with RSA private key
        payload = {"sub": user_id, "iss": "bharatpay.auth.internal"}
        token = jwt.encode(payload, "secret-key", algorithm="RS256")
        return token

    def sign_authentication_payload(self, data: bytes) -> bytes:
        signature = self.private_key.sign(
            data,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return signature
"""
    with open(BASE_DIR / "auth-service" / "src" / "auth.py", "w", encoding="utf-8") as f:
        f.write(auth_py)

    # 3. auth-service/src/session.py
    session_py = """import hashlib

def verify_api_token_hash(token: str) -> str:
    # Compute SHA-256 digest for cached session lookup
    return hashlib.sha256(token.encode('utf-8')).hexdigest()

def legacy_checksum(data: str) -> str:
    # Legacy MD5 checksum - deprecated hygiene finding
    return hashlib.md5(data.encode('utf-8')).hexdigest()
"""
    with open(BASE_DIR / "auth-service" / "src" / "session.py", "w", encoding="utf-8") as f:
        f.write(session_py)

    # 4. auth-service/requirements.txt
    auth_reqs = """cryptography==42.0.5
pyjwt==2.8.0
hashlib
"""
    with open(BASE_DIR / "auth-service" / "requirements.txt", "w", encoding="utf-8") as f:
        f.write(auth_reqs)

    # 5. payment-service/src/crypto_vault.py
    vault_py = """# BharatPay Payment Processing Service - Cryptographic Storage Vault
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.asymmetric import ec
import os

class PaymentCryptoVault:
    def __init__(self, master_key: bytes):
        self.master_key = master_key # 256-bit AES key
        
        # Elliptic Curve SECP256R1 for payment transaction signing
        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())

    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:
        iv = os.urandom(16)
        # AES-256 symmetric cipher
        cipher = Cipher(algorithms.AES(self.master_key), modes.CBC(iv))
        encryptor = cipher.encryptor()
        return iv + encryptor.update(plaintext) + encryptor.finalize()

    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):
        # Legacy 3DES module for backward compatibility with 1990s POS terminals
        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b"01234567"))
        decryptor = cipher.decryptor()
        return decryptor.update(legacy_blob) + decryptor.finalize()
"""
    with open(BASE_DIR / "payment-service" / "src" / "crypto_vault.py", "w", encoding="utf-8") as f:
        f.write(vault_py)

    # 6. payment-service/requirements.txt
    payment_reqs = """cryptography>=41.0.0
pycryptodome>=3.20.0
"""
    with open(BASE_DIR / "payment-service" / "requirements.txt", "w", encoding="utf-8") as f:
        f.write(payment_reqs)

    # 7. api-gateway/server.js
    gateway_js = """// BharatPay Reverse Proxy & API Gateway
const crypto = require('crypto');

function hashClientRequest(body) {
    // Generate SHA-256 integrity digest of incoming request payload
    return crypto.createHash('sha256').update(body).digest('hex');
}

function generateEphemeralSessionCipher(secretKey, iv) {
    // AES-256-GCM envelope encryption for inter-service communication
    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);
}

function initGatewayKeypair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

module.exports = { hashClientRequest, generateEphemeralSessionCipher, initGatewayKeypair };
"""
    with open(BASE_DIR / "api-gateway" / "src" / "server.js", "w", encoding="utf-8") as f:
        f.write(gateway_js)

    # 8. api-gateway/package.json
    gateway_pkg = """{
  "name": "bharatpay-api-gateway",
  "version": "2.4.0",
  "dependencies": {
    "jsonwebtoken": "^9.0.2",
    "crypto-js": "^4.2.0"
  }
}"""
    with open(BASE_DIR / "api-gateway" / "package.json", "w", encoding="utf-8") as f:
        f.write(gateway_pkg)

    # 9. Dockerfile
    dockerfile = """FROM python:3.12-slim
RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "src/auth.py"]
"""
    with open(BASE_DIR / "docker" / "Dockerfile", "w", encoding="utf-8") as f:
        f.write(dockerfile)

    # 10. Generate Safe Self-Signed X.509 Certificates
    print("Generating safe X.509 certificates...")
    # A. RSA-2048 Leaf Certificate
    rsa_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "BharatPay Payments Ltd"),
        x509.NameAttribute(NameOID.COMMON_NAME, "api.bharatpay.internal")
    ])
    cert_rsa = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(rsa_key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.now(datetime.timezone.utc))
        .not_valid_after(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=730))
        .sign(rsa_key, hashes.SHA256())
    )
    with open(BASE_DIR / "certificates" / "payment_gateway_rsa.crt", "wb") as f:
        f.write(cert_rsa.public_bytes(serialization.Encoding.PEM))

    # B. ECDSA P-256 CA Certificate
    ec_key = ec.generate_private_key(ec.SECP256R1())
    subject_ec = issuer_ec = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "BharatPay Root Authority"),
        x509.NameAttribute(NameOID.COMMON_NAME, "BharatPay Internal CA")
    ])
    cert_ec = (
        x509.CertificateBuilder()
        .subject_name(subject_ec)
        .issuer_name(issuer_ec)
        .public_key(ec_key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.now(datetime.timezone.utc))
        .not_valid_after(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1825))
        .sign(ec_key, hashes.SHA256())
    )
    with open(BASE_DIR / "certificates" / "bharatpay_ca_ec.crt", "wb") as f:
        f.write(cert_ec.public_bytes(serialization.Encoding.PEM))

    # 11. README
    readme = """# BharatPay Enterprise Demo Repository
**DEMO ENVIRONMENT FOR SIH26164 (NTRO)**

This repository simulates an Indian FinTech enterprise stack with realistic cryptographic usage across:
1. `auth-service`: RSA-2048 token signing, hashlib SHA-256, legacy MD5 checksum.
2. `payment-service`: AES-256-CBC, ECDSA SECP256R1 signing, legacy 3DES cipher.
3. `api-gateway`: Node.js crypto createHash SHA-256, AES-256-GCM, RSA keygen.
4. `certificates`: RSA-2048 and ECDSA P-256 X.509 public certificates.
5. `docker`: Dockerfile provisioning OpenSSL, ca-certificates, and libssl-dev.
"""
    with open(BASE_DIR / "README.md", "w", encoding="utf-8") as f:
        f.write(readme)

    print("BharatPay demo repository created successfully!")

if __name__ == "__main__":
    create_bharatpay_demo()
