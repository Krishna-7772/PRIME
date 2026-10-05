import os
import re
from pathlib import Path
from typing import List, Optional
from app.scanners.base import BaseScanner, DiscoveredFinding

class BinaryScanner(BaseScanner):
    """
    Safe static inspection of executable binaries and shared libraries.
    CRITICAL: Never executes binaries. Employs bounded string and symbol extraction.
    """
    def __init__(self):
        self.binary_extensions = {".exe", ".dll", ".so", ".dylib", ".bin", ".elf"}
        self.crypto_signatures = [
            (b"OpenSSL", "OpenSSL", "asymmetric", "protocol_security"),
            (b"libcrypto", "OpenSSL libcrypto", "asymmetric", "encryption"),
            (b"RSA_new", "RSA (Potential)", "asymmetric", "digital_signature"),
            (b"AES_encrypt", "AES (Potential)", "symmetric", "encryption"),
            (b"SHA256_Init", "SHA-256 (Potential)", "hash", "hashing"),
            (b"EC_KEY_new", "ECDSA/ECDH (Potential)", "asymmetric", "key_establishment"),
            (b"secp256r1", "NIST P-256 Curve (Potential)", "asymmetric", "digital_signature"),
            (b"ChaCha20_ctr32", "ChaCha20 (Potential)", "symmetric", "encryption")
        ]

    def scan_path(self, target_path: str, context: Optional[dict] = None) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        path = Path(target_path)

        if path.is_file():
            if path.suffix.lower() in self.binary_extensions:
                findings.extend(self._scan_binary_file(path, base_path=path.parent))
            return findings

        for root, _, files in os.walk(path):
            for file in files:
                p = Path(root) / file
                if p.suffix.lower() in self.binary_extensions:
                    findings.extend(self._scan_binary_file(p, base_path=path))

        return findings

    def _scan_binary_file(self, file_path: Path, base_path: Path) -> List[DiscoveredFinding]:
        rel_path = str(file_path.relative_to(base_path)).replace("\\", "/") if base_path else file_path.name
        findings: List[DiscoveredFinding] = []

        try:
            # Safely read first 2MB to prevent memory exhaustion on giant binaries
            with open(file_path, "rb") as f:
                header = f.read(2 * 1024 * 1024)
        except Exception:
            return []

        for sig, algo_name, family, purpose in self.crypto_signatures:
            pos = header.find(sig)
            if pos != -1:
                findings.append(
                    DiscoveredFinding(
                        algorithm=algo_name,
                        family=family,
                        purpose=purpose,
                        purpose_confidence="INFERRED",
                        file_path=rel_path,
                        line_number=None,
                        code_snippet=f"Binary symbol offset: 0x{pos:08x} -> {sig.decode('ascii', errors='ignore')}",
                        library="Compiled Binary Linkage",
                        confidence=0.73,
                        detection_method="Static Binary Inspection (Safe String & Symbol Heuristic)",
                        context_notes=f"Potential cryptographic capability inferred from static binary symbol table at offset 0x{pos:08x}. Manual dynamic review required."
                    )
                )
        return findings
