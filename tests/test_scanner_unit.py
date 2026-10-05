import pytest
from app.scanners.source.python_scanner import PythonScanner
from app.scanners.source.javascript_scanner import JavaScriptScanner
from app.scanners.source.java_scanner import JavaScanner

def test_python_ast_rsa_aes_ecdsa():
    code = """
from cryptography.hazmat.primitives.asymmetric import rsa, ec
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import hashlib

# 1. RSA Key Generation
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)

# 2. ECDSA Curve
ec_key = ec.generate_private_key(curve=ec.SECP256R1())

# 3. AES Cipher
cipher = Cipher(algorithms.AES(b"01234567890123456789012345678901"), modes.CBC(b"0123456789012345"))

# 4. Hashlib SHA-256
digest = hashlib.sha256(b"hello world").hexdigest()
"""
    scanner = PythonScanner()
    findings = scanner.scan_file("test_auth.py", code)
    
    algos = {f.algorithm for f in findings}
    assert "RSA" in algos
    assert "ECDSA" in algos
    assert "AES" in algos
    assert "SHA-256" in algos

    rsa_finding = next(f for f in findings if f.algorithm == "RSA")
    assert rsa_finding.key_size == 2048
    assert rsa_finding.purpose == "digital_signature"
    assert rsa_finding.library == "cryptography"
    assert rsa_finding.confidence >= 0.95
    assert "generate_private_key" in rsa_finding.code_snippet

def test_javascript_scanner():
    code = """
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const keys = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
"""
    scanner = JavaScriptScanner()
    findings = scanner.scan_file("test_server.js", code)

    algos = {f.algorithm for f in findings}
    assert "SHA-256" in algos
    assert "AES" in algos
    assert "RSA" in algos

def test_java_scanner():
    code = """
KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
keyGen.initialize(2048);
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
MessageDigest md = MessageDigest.getInstance("SHA-256");
"""
    scanner = JavaScanner()
    findings = scanner.scan_file("TestService.java", code)

    algos = {f.algorithm for f in findings}
    assert "RSA" in algos
    assert "AES" in algos
    assert "SHA-256" in algos
