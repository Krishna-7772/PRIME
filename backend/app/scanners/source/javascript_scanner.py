import re
from typing import List, Optional
from app.scanners.base import DiscoveredFinding

class JavaScriptScanner:
    def __init__(self):
        # Rule patterns with regex and context extractors
        self.rules = [
            # 1. crypto.createHash
            {
                "pattern": re.compile(r"""crypto\.createHash\(\s*['"]([a-zA-Z0-9_\-]+)['"]\s*\)""", re.IGNORECASE),
                "handler": self._handle_create_hash
            },
            # 2. crypto.generateKeyPair / generateKeyPairSync (RSA)
            {
                "pattern": re.compile(r"""generateKeyPair(?:Sync)?\(\s*['"]rsa['"]\s*,\s*\{[^}]*?modulusLength:\s*(\d+)""", re.IGNORECASE | re.DOTALL),
                "handler": self._handle_rsa_key_gen
            },
            # 3. crypto.createCipheriv (AES / DES)
            {
                "pattern": re.compile(r"""crypto\.createCipheriv\(\s*['"]([a-zA-Z0-9_\-]+)['"]""", re.IGNORECASE),
                "handler": self._handle_cipher_iv
            },
            # 4. crypto.createSign
            {
                "pattern": re.compile(r"""crypto\.createSign\(\s*['"]([a-zA-Z0-9_\-]+)['"]""", re.IGNORECASE),
                "handler": self._handle_create_sign
            },
            # 5. Web Crypto subtle.generateKey
            {
                "pattern": re.compile(r"""subtle\.generateKey\(\s*\{[^}]*?name:\s*['"]([a-zA-Z0-9_\-]+)['"][^}]*?\}""", re.IGNORECASE | re.DOTALL),
                "handler": self._handle_webcrypto_generate
            },
            # 6. Subtle sign
            {
                "pattern": re.compile(r"""subtle\.sign\(\s*\{[^}]*?name:\s*['"]([a-zA-Z0-9_\-]+)['"]""", re.IGNORECASE),
                "handler": self._handle_webcrypto_sign
            },
            # 7. bcrypt.hash / argon2.hash
            {
                "pattern": re.compile(r"""(?:bcrypt|argon2)\.hash\(""", re.IGNORECASE),
                "handler": self._handle_password_hash
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

        for rule in self.rules:
            for match in rule["pattern"].finditer(content):
                line_no = self._get_line_number(content, match.start())
                snippet = self._get_snippet(lines, line_no)
                finding = rule["handler"](match, file_path, line_no, snippet)
                if finding:
                    findings.append(finding)

        return findings

    def _handle_create_hash(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        raw_algo = match.group(1).upper()
        algo = raw_algo
        if "SHA256" in raw_algo or "SHA-256" in raw_algo: algo = "SHA-256"
        elif "SHA512" in raw_algo or "SHA-512" in raw_algo: algo = "SHA-512"
        elif "SHA384" in raw_algo or "SHA-384" in raw_algo: algo = "SHA-384"
        elif "SHA1" in raw_algo or "SHA-1" in raw_algo: algo = "SHA-1"
        elif "MD5" in raw_algo: algo = "MD5"

        return DiscoveredFinding(
            algorithm=algo,
            family="hash",
            purpose="hashing",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="Node.js crypto",
            confidence=0.97,
            detection_method="JavaScript API Matcher (crypto.createHash)",
            context_notes=f"Node.js native hash stream instantiated with {algo}."
        )

    def _handle_rsa_key_gen(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        modulus = int(match.group(1))
        return DiscoveredFinding(
            algorithm="RSA",
            family="asymmetric",
            purpose="digital_signature",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            key_size=modulus,
            library="Node.js crypto",
            confidence=0.98,
            detection_method="JavaScript API Matcher (crypto.generateKeyPair RSA)",
            context_notes=f"Node.js RSA key generation with modulus {modulus} bits."
        )

    def _handle_cipher_iv(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        cipher_str = match.group(1).lower()
        algo = "AES"
        key_size = 256
        if "aes-128" in cipher_str:
            algo = "AES"
            key_size = 128
        elif "aes-192" in cipher_str:
            algo = "AES"
            key_size = 192
        elif "aes-256" in cipher_str:
            algo = "AES"
            key_size = 256
        elif "des-ede3" in cipher_str or "3des" in cipher_str:
            algo = "3DES"
            key_size = 168
        elif "des" in cipher_str:
            algo = "DES"
            key_size = 56

        return DiscoveredFinding(
            algorithm=algo,
            family="symmetric",
            purpose="encryption",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            key_size=key_size,
            library="Node.js crypto",
            confidence=0.96,
            detection_method="JavaScript API Matcher (crypto.createCipheriv)",
            context_notes=f"Node.js symmetric cipher stream created for {cipher_str}."
        )

    def _handle_create_sign(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        algo_str = match.group(1).upper()
        return DiscoveredFinding(
            algorithm="RSA",
            family="asymmetric",
            purpose="digital_signature",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="Node.js crypto",
            confidence=0.94,
            detection_method="JavaScript API Matcher (crypto.createSign)",
            context_notes=f"Digital signature object initialized with digest algorithm {algo_str}."
        )

    def _handle_webcrypto_generate(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        algo_name = match.group(1).upper()
        algo = "RSA" if "RSA" in algo_name else ("ECDSA" if "ECD" in algo_name else algo_name)
        purpose = "key_establishment" if "ECDH" in algo_name or "OAEP" in algo_name else "digital_signature"
        key_size = 2048 if algo == "RSA" else 256
        
        return DiscoveredFinding(
            algorithm=algo,
            family="asymmetric",
            purpose=purpose,
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            key_size=key_size,
            library="Web Crypto API",
            confidence=0.96,
            detection_method="Web Crypto Matcher (subtle.generateKey)",
            context_notes=f"Browser/Node SubtleCrypto key generation configured for {algo_name}."
        )

    def _handle_webcrypto_sign(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        algo_name = match.group(1).upper()
        algo = "RSA" if "RSA" in algo_name else ("ECDSA" if "ECD" in algo_name else "HMAC")
        return DiscoveredFinding(
            algorithm=algo,
            family="asymmetric" if algo != "HMAC" else "symmetric",
            purpose="digital_signature",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library="Web Crypto API",
            confidence=0.95,
            detection_method="Web Crypto Matcher (subtle.sign)",
            context_notes=f"SubtleCrypto digital signature generated with {algo_name}."
        )

    def _handle_password_hash(self, match: re.Match, file_path: str, line_no: int, snippet: str) -> Optional[DiscoveredFinding]:
        text = match.group(0).lower()
        algo = "Argon2" if "argon2" in text else "bcrypt"
        return DiscoveredFinding(
            algorithm=algo,
            family="kdf",
            purpose="password_hashing",
            purpose_confidence="CONFIRMED",
            file_path=file_path,
            line_number=line_no,
            code_snippet=snippet,
            library=algo.lower(),
            confidence=0.98,
            detection_method=f"KDF Library Matcher ({algo})",
            context_notes=f"Salted password hashing function invocation ({algo})."
        )
