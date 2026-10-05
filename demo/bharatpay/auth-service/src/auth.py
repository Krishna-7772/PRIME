# BharatPay Enterprise Authentication Service
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
