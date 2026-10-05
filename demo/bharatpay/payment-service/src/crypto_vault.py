# BharatPay Payment Processing Service - Cryptographic Storage Vault
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
