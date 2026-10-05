import os
from pathlib import Path
from typing import List, Optional, Tuple
from datetime import datetime, timezone
from cryptography import x509
from cryptography.hazmat.primitives.asymmetric import rsa, ec, dsa, ed25519, ed448
from app.scanners.base import BaseScanner, DiscoveredFinding

class CertificateScanner(BaseScanner):
    def __init__(self):
        self.cert_extensions = {".pem", ".crt", ".cer", ".der"}

    def scan_path(self, target_path: str, context: Optional[dict] = None) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        path = Path(target_path)

        if path.is_file():
            if path.suffix.lower() in self.cert_extensions or "cert" in path.name.lower():
                findings.extend(self._scan_cert_file(path, base_path=path.parent))
            return findings

        for root, _, files in os.walk(path):
            for file in files:
                file_path = Path(root) / file
                if file_path.suffix.lower() in self.cert_extensions or "cert" in file.lower():
                    findings.extend(self._scan_cert_file(file_path, base_path=path))

        return findings

    def _scan_cert_file(self, file_path: Path, base_path: Path) -> List[DiscoveredFinding]:
        try:
            with open(file_path, "rb") as f:
                data = f.read()
        except Exception:
            return []

        rel_path = str(file_path.relative_to(base_path)).replace("\\", "/") if base_path else file_path.name
        cert = None

        # Try PEM parsing
        try:
            cert = x509.load_pem_x509_certificate(data)
        except Exception:
            # Try DER parsing
            try:
                cert = x509.load_der_x509_certificate(data)
            except Exception:
                # Might be a file with multiple PEM certs or private key
                pass

        if not cert:
            return []

        # Extract Public Key properties safely (NEVER examine or log private key material!)
        pub_key = cert.public_key()
        algo = "Unknown"
        key_size = 0
        curve = None
        family = "asymmetric"

        if isinstance(pub_key, rsa.RSAPublicKey):
            algo = "RSA"
            key_size = pub_key.key_size
        elif isinstance(pub_key, ec.EllipticCurvePublicKey):
            algo = "ECDSA"
            key_size = pub_key.key_size
            curve = pub_key.curve.name
        elif isinstance(pub_key, ed25519.Ed25519PublicKey):
            algo = "Ed25519"
            key_size = 256
        elif isinstance(pub_key, dsa.DSAPublicKey):
            algo = "DSA"
            key_size = pub_key.key_size

        subject_str = cert.subject.rfc4514_string()
        issuer_str = cert.issuer.rfc4514_string()
        sig_algo = cert.signature_algorithm_oid._name if hasattr(cert, "signature_algorithm_oid") else "Signature"
        serial = hex(cert.serial_number)
        
        now = datetime.now(timezone.utc)
        not_after = cert.not_valid_after_utc if hasattr(cert, "not_valid_after_utc") else cert.not_valid_after.replace(tzinfo=timezone.utc)
        is_expired = now > not_after

        snippet = (
            f"Subject: {subject_str}\n"
            f"Issuer: {issuer_str}\n"
            f"Public Key Algorithm: {algo} ({key_size} bits)\n"
            f"Signature Algorithm: {sig_algo}\n"
            f"Validity: {cert.not_valid_before_utc.isoformat() if hasattr(cert, 'not_valid_before_utc') else cert.not_valid_before} to {not_after.isoformat()}"
        )

        finding = DiscoveredFinding(
            algorithm=algo,
            family=family,
            purpose="certificate",
            purpose_confidence="CONFIRMED",
            file_path=rel_path,
            line_number=1,
            code_snippet=snippet,
            key_size=key_size,
            curve=curve,
            application="PKI / Identity Infrastructure",
            component="TLS Certificate",
            library="X.509 Certificate",
            confidence=1.0,
            detection_method="X.509 ASN.1 Certificate Parser",
            context_notes=f"Public X.509 certificate found for subject '{subject_str}'. Quantum-vulnerable {algo}-{key_size} key.",
            raw_metadata={
                "subject": subject_str,
                "issuer": issuer_str,
                "serial_number": serial,
                "signature_algorithm": sig_algo,
                "not_before": (cert.not_valid_before_utc if hasattr(cert, "not_valid_before_utc") else cert.not_valid_before).isoformat(),
                "not_after": not_after.isoformat(),
                "is_expired": is_expired
            }
        )
        return [finding]
