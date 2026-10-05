import re
from typing import List, Optional
from app.scanners.base import DiscoveredFinding

class JavaScanner:
    def __init__(self):
        self.rules = [
            # 1. KeyPairGenerator.getInstance("RSA" / "EC" / "DiffieHellman")
            {
                "pattern": re.compile(r"""KeyPairGenerator\.getInstance\(\s*["']([a-zA-Z0-9_\-]+)["']""", re.IGNORECASE),
                "handler": self._handle_keypair_gen
            },
            # 2. Cipher.getInstance("AES/..." / "RSA/..." / "DES/...")
            {
                "pattern": re.compile(r"""Cipher\.getInstance\(\s*["']([^"']+)["']""", re.IGNORECASE),
                "handler": self._handle_cipher
            },
            # 3. MessageDigest.getInstance("SHA-256" / "MD5" / "SHA-1")
            {
                "pattern": re.compile(r"""MessageDigest\.getInstance\(\s*["']([a-zA-Z0-9_\-]+)["']""", re.IGNORECASE),
                "handler": self._handle_digest
            },
            # 4. Signature.getInstance("SHA256withRSA" / "SHA256withECDSA")
            {
                "pattern": re.compile(r"""Signature\.getInstance\(\s*["']([a-zA-Z0-9_\-]+)["']""", re.IGNORECASE),
                "handler": self._handle_signature
            },
            # 5. KeyAgreement.getInstance("ECDH" / "DH")
            {
                "pattern": re.compile(r"""KeyAgreement\.getInstance\(\s*["']([a-zA-Z0-9_\-]+)["']""", re.IGNORECASE),
                "handler": self._handle_key_agreement
            }
        ]

    def _get_snippet(self, lines: List[str], line_no: int) -> str:
        s_line = max(1, line_no - 2)
        e_line = min(len(lines), line_no + 2)
        return "\n".join(lines[s_line - 1 : e_line])

    def _get_line_number(self, content: str, char_pos: int) -> int:
        return content.count("\n", 0, char_pos) + 1

    def scan_file(self, file_path: str, content: str) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        lines = content.splitlines()

        # Check for keyGen.initialize(2048) or similar
        init_size_match = re.search(r"""(?:keyGen|kpg|generator)\.initialize\(\s*(\d+)\s*\)""", content, re.IGNORECASE)
        explicit_key_size = int(init_size_match.group(1)) if init_size_match else None

        for rule in self.rules:
            for match in rule["pattern"].finditer(content):
                line_no = self._get_line_number(content, match.start())
                snippet = self._get_snippet(lines, line_no)
                finding = rule["handler"](match, file_path, line_no, snippet, explicit_key_size)
                if finding:
                    findings.append(finding)

        return findings

    def _handle_keypair_gen(self, match: re.Match, file_path: str, line_no: int, snippet: str, key_size: Optional[int]) -> Optional[DiscoveredFinding]:
        algo_name = match.group(1).upper()
        algo = algo_name
        family = "asymmetric"
        purpose = "digital_signature"
        resolved_key_size = key_size or (2048 if algo == "RSA" else 256)
        
        if "EC" in algo_name:
            algo = "ECDSA"
        elif "DIFFIEHELLMAN" in algo_name or "DH" in algo_name:
            algo = "DH"
            purpose = "key_establishment"

        return DiscoveredFinding(
            algorithm=algo,
            family=family,
            purpose=purpose,
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            key_size=resolved_key_size,
            library="java.security.KeyPairGenerator",
            confidence=0.97,
            detection_method="Java JCA Pattern Matcher (KeyPairGenerator)",
            context_notes=f"Java Cryptography Architecture key pair generator requested for {algo} ({resolved_key_size} bits)."
        )

    def _handle_cipher(self, match: re.Match, file_path: str, line_no: int, snippet: str, key_size: Optional[int]) -> Optional[DiscoveredFinding]:
        transformation = match.group(1).upper()
        root_algo = transformation.split("/")[0]
        
        algo = root_algo
        family = "symmetric"
        purpose = "encryption"
        size = 256

        if "RSA" in root_algo:
            algo = "RSA"
            family = "asymmetric"
            purpose = "encryption"
            size = key_size or 2048
        elif "AES" in root_algo:
            algo = "AES"
            size = 256
        elif "DESEDE" in root_algo or "3DES" in root_algo:
            algo = "3DES"
            size = 168
        elif "DES" in root_algo:
            algo = "DES"
            size = 56

        return DiscoveredFinding(
            algorithm=algo,
            family=family,
            purpose=purpose,
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            key_size=size,
            library="javax.crypto.Cipher",
            confidence=0.97,
            detection_method="Java JCA Pattern Matcher (Cipher.getInstance)",
            context_notes=f"Java Cipher transformation requested: {transformation}."
        )

    def _handle_digest(self, match: re.Match, file_path: str, line_no: int, snippet: str, key_size: Optional[int]) -> Optional[DiscoveredFinding]:
        name = match.group(1).upper()
        algo = name
        if "SHA-256" in name or "SHA256" in name: algo = "SHA-256"
        elif "SHA-512" in name or "SHA512" in name: algo = "SHA-512"
        elif "SHA-384" in name or "SHA384" in name: algo = "SHA-384"
        elif "SHA-1" in name or "SHA1" in name: algo = "SHA-1"
        elif "MD5" in name: algo = "MD5"

        return DiscoveredFinding(
            algorithm=algo,
            family="hash",
            purpose="hashing",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="java.security.MessageDigest",
            confidence=0.98,
            detection_method="Java JCA Pattern Matcher (MessageDigest)",
            context_notes=f"Java standard message digest {algo} instantiated."
        )

    def _handle_signature(self, match: re.Match, file_path: str, line_no: int, snippet: str, key_size: Optional[int]) -> Optional[DiscoveredFinding]:
        sig_str = match.group(1).upper()
        algo = "RSA"
        if "ECDSA" in sig_str:
            algo = "ECDSA"
        elif "DSA" in sig_str:
            algo = "DSA"

        return DiscoveredFinding(
            algorithm=algo,
            family="asymmetric",
            purpose="digital_signature",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="java.security.Signature",
            confidence=0.97,
            detection_method="Java JCA Pattern Matcher (Signature)",
            context_notes=f"Java digital signature instance configured with algorithm {sig_str}."
        )

    def _handle_key_agreement(self, match: re.Match, file_path: str, line_no: int, snippet: str, key_size: Optional[int]) -> Optional[DiscoveredFinding]:
        name = match.group(1).upper()
        algo = "ECDH" if "ECDH" in name or "EC" in name else "DH"

        return DiscoveredFinding(
            algorithm=algo,
            family="asymmetric",
            purpose="key_establishment",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="javax.crypto.KeyAgreement",
            confidence=0.98,
            detection_method="Java JCA Pattern Matcher (KeyAgreement)",
            context_notes=f"Java key exchange agreement initialized for {algo}."
        )
