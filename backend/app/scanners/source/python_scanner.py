import ast
from pathlib import Path
from typing import List, Optional, Dict, Any
from app.scanners.base import DiscoveredFinding

class PythonCryptoVisitor(ast.NodeVisitor):
    def __init__(self, file_path: str, lines: List[str]):
        self.file_path = file_path
        self.lines = lines
        self.findings: List[DiscoveredFinding] = []
        self.imported_symbols: Dict[str, str] = {} # local_name -> full_module_or_alias

    def _get_snippet(self, start_line: int, end_line: Optional[int] = None) -> str:
        s_line = max(1, start_line - 2)
        e_line = min(len(self.lines), (end_line or start_line) + 2)
        return "\n".join(self.lines[s_line - 1 : e_line])

    def visit_Import(self, node: ast.Import):
        for alias in node.names:
            self.imported_symbols[alias.asname or alias.name] = alias.name
        self.generic_visit(node)

    def visit_ImportFrom(self, node: ast.ImportFrom):
        mod = node.module or ""
        for alias in node.names:
            full = f"{mod}.{alias.name}" if mod else alias.name
            self.imported_symbols[alias.asname or alias.name] = full
        self.generic_visit(node)

    def visit_Call(self, node: ast.Call):
        func_name = self._resolve_call_name(node.func)
        lineno = getattr(node, "lineno", 1)
        end_lineno = getattr(node, "end_lineno", lineno)
        snippet = self._get_snippet(lineno, end_lineno)

        # 1. cryptography.hazmat RSA key generation
        if "generate_private_key" in func_name and ("rsa" in func_name or self._is_rsa_call(node)):
            key_size = self._extract_kwarg_int(node, "key_size", default=2048)
            self.findings.append(
                DiscoveredFinding(
                    algorithm="RSA",
                    family="asymmetric",
                    purpose="digital_signature",
                    purpose_confidence="CONFIRMED",
                    file_path=self.file_path,
                    line_number=lineno,
                    line_end=end_lineno,
                    code_snippet=snippet,
                    key_size=key_size,
                    library="cryptography",
                    confidence=0.98,
                    detection_method="Python AST (rsa.generate_private_key)",
                    context_notes=f"Found explicit RSA private key generation with modulus size {key_size} bits."
                )
            )

        # 2. cryptography.hazmat EC key generation
        elif "generate_private_key" in func_name and ("ec" in func_name or self._is_ec_call(node)):
            curve_name, key_size = self._extract_ec_curve(node)
            self.findings.append(
                DiscoveredFinding(
                    algorithm="ECDSA",
                    family="asymmetric",
                    purpose="digital_signature",
                    purpose_confidence="CONFIRMED",
                    file_path=self.file_path,
                    line_number=lineno,
                    line_end=end_lineno,
                    code_snippet=snippet,
                    key_size=key_size,
                    curve=curve_name,
                    library="cryptography",
                    confidence=0.97,
                    detection_method="Python AST (ec.generate_private_key)",
                    context_notes=f"Found Elliptic Curve key generation for curve {curve_name} ({key_size} bits)."
                )
            )

        # 3. cryptography.hazmat Cipher (AES, 3DES, ChaCha20)
        elif "Cipher" in func_name:
            algo_name, key_size = self._extract_cipher_algorithm(node)
            if algo_name:
                self.findings.append(
                    DiscoveredFinding(
                        algorithm=algo_name,
                        family="symmetric",
                        purpose="encryption",
                        purpose_confidence="CONFIRMED",
                        file_path=self.file_path,
                        line_number=lineno,
                        line_end=end_lineno,
                        code_snippet=snippet,
                        key_size=key_size,
                        library="cryptography",
                        confidence=0.96,
                        detection_method="Python AST (Cipher instantiation)",
                        context_notes=f"Found {algo_name} symmetric cipher initialized with mode."
                    )
                )

        # 4. cryptography.hazmat hashes
        elif any(h in func_name for h in ["hashes.SHA256", "hashes.SHA384", "hashes.SHA512", "hashes.SHA1", "hashes.MD5"]):
            algo = "SHA-256"
            if "SHA384" in func_name: algo = "SHA-384"
            elif "SHA512" in func_name: algo = "SHA-512"
            elif "SHA1" in func_name: algo = "SHA-1"
            elif "MD5" in func_name: algo = "MD5"

            self.findings.append(
                DiscoveredFinding(
                    algorithm=algo,
                    family="hash",
                    purpose="hashing",
                    purpose_confidence="CONFIRMED",
                    file_path=self.file_path,
                    line_number=lineno,
                    line_end=end_lineno,
                    code_snippet=snippet,
                    library="cryptography",
                    confidence=0.99,
                    detection_method="Python AST (hazmat hashes)",
                    context_notes=f"Cryptographic hash digest {algo} instantiated."
                )
            )

        # 5. Standard library hashlib
        elif "hashlib" in func_name or func_name.startswith("sha") or func_name.startswith("md5"):
            algo = None
            if "sha256" in func_name: algo = "SHA-256"
            elif "sha384" in func_name: algo = "SHA-384"
            elif "sha512" in func_name: algo = "SHA-512"
            elif "sha1" in func_name: algo = "SHA-1"
            elif "md5" in func_name: algo = "MD5"
            elif func_name.endswith(".new"):
                if node.args and isinstance(node.args[0], ast.Constant) and isinstance(node.args[0].value, str):
                    algo = node.args[0].value.upper()

            if algo:
                self.findings.append(
                    DiscoveredFinding(
                        algorithm=algo,
                        family="hash",
                        purpose="hashing",
                        purpose_confidence="CONFIRMED",
                        file_path=self.file_path,
                        line_number=lineno,
                        line_end=end_lineno,
                        code_snippet=snippet,
                        library="hashlib",
                        confidence=0.99,
                        detection_method="Python AST (hashlib)",
                        context_notes=f"Python hashlib digest {algo} invoked."
                    )
                )

        # 6. PyCryptodome RSA / AES
        elif "RSA.generate" in func_name:
            bits = 2048
            if node.args and isinstance(node.args[0], ast.Constant) and isinstance(node.args[0].value, int):
                bits = node.args[0].value
            self.findings.append(
                DiscoveredFinding(
                    algorithm="RSA",
                    family="asymmetric",
                    purpose="digital_signature",
                    purpose_confidence="CONFIRMED",
                    file_path=self.file_path,
                    line_number=lineno,
                    line_end=end_lineno,
                    code_snippet=snippet,
                    key_size=bits,
                    library="pycryptodome",
                    confidence=0.98,
                    detection_method="Python AST (PyCryptodome RSA.generate)",
                    context_notes=f"PyCryptodome RSA key generation with {bits}-bit modulus."
                )
            )

        # 7. JWT algorithm detection (jwt.encode, jwt.decode)
        elif "jwt.encode" in func_name or "jwt.decode" in func_name:
            algo_val = self._extract_kwarg_str(node, "algorithm", default="HS256")
            if "RS" in algo_val:
                self.findings.append(
                    DiscoveredFinding(
                        algorithm="RSA",
                        family="asymmetric",
                        purpose="digital_signature",
                        purpose_confidence="CONFIRMED",
                        file_path=self.file_path,
                        line_number=lineno,
                        line_end=end_lineno,
                        code_snippet=snippet,
                        key_size=int(algo_val.replace("RS", "")) if algo_val.replace("RS", "").isdigit() else 2048,
                        library="pyjwt",
                        confidence=0.95,
                        detection_method="Python AST (JWT signing)",
                        context_notes=f"JSON Web Token signature configured with {algo_val} (RSA-based)."
                    )
                )
            elif "ES" in algo_val:
                self.findings.append(
                    DiscoveredFinding(
                        algorithm="ECDSA",
                        family="asymmetric",
                        purpose="digital_signature",
                        purpose_confidence="CONFIRMED",
                        file_path=self.file_path,
                        line_number=lineno,
                        line_end=end_lineno,
                        code_snippet=snippet,
                        curve="SECP256R1",
                        key_size=256,
                        library="pyjwt",
                        confidence=0.95,
                        detection_method="Python AST (JWT signing)",
                        context_notes=f"JSON Web Token signature configured with {algo_val} (ECDSA-based)."
                    )
                )

        self.generic_visit(node)

    def _resolve_call_name(self, node: ast.AST) -> str:
        if isinstance(node, ast.Name):
            return self.imported_symbols.get(node.id, node.id)
        elif isinstance(node, ast.Attribute):
            val = self._resolve_call_name(node.value)
            return f"{val}.{node.attr}"
        return ""

    def _extract_kwarg_int(self, node: ast.Call, kwarg_name: str, default: int = 2048) -> int:
        for kw in node.keywords:
            if kw.arg == kwarg_name and isinstance(kw.value, ast.Constant) and isinstance(kw.value.value, int):
                return kw.value.value
        return default

    def _extract_kwarg_str(self, node: ast.Call, kwarg_name: str, default: str = "") -> str:
        for kw in node.keywords:
            if kw.arg == kwarg_name and isinstance(kw.value, ast.Constant) and isinstance(kw.value.value, str):
                return kw.value.value
        return default

    def _is_rsa_call(self, node: ast.Call) -> bool:
        for kw in node.keywords:
            if kw.arg in ("public_exponent", "key_size"):
                return True
        return False

    def _is_ec_call(self, node: ast.Call) -> bool:
        for kw in node.keywords:
            if kw.arg == "curve":
                return True
        return False

    def _extract_ec_curve(self, node: ast.Call) -> tuple[str, int]:
        # Check first argument or 'curve' keyword
        arg = None
        if node.args:
            arg = node.args[0]
        else:
            for kw in node.keywords:
                if kw.arg == "curve":
                    arg = kw.value
                    break
        
        if arg:
            call_repr = ast.unparse(arg) if hasattr(ast, "unparse") else str(arg)
            if "SECP384R1" in call_repr or "P-384" in call_repr:
                return "SECP384R1", 384
            elif "SECP521R1" in call_repr or "P-521" in call_repr:
                return "SECP521R1", 521
            elif "SECP256K1" in call_repr:
                return "SECP256K1", 256
            elif "SECP256R1" in call_repr or "P-256" in call_repr:
                return "SECP256R1", 256
        return "SECP256R1", 256

    def _extract_cipher_algorithm(self, node: ast.Call) -> tuple[Optional[str], Optional[int]]:
        if not node.args:
            return None, None
        first_arg = node.args[0]
        repr_str = ast.unparse(first_arg) if hasattr(ast, "unparse") else ""
        if "AES" in repr_str:
            # Check if key size is identifiable
            if "256" in repr_str: return "AES", 256
            elif "128" in repr_str: return "AES", 128
            return "AES", 256
        elif "TripleDES" in repr_str or "3DES" in repr_str:
            return "3DES", 168
        elif "ChaCha20" in repr_str:
            return "ChaCha20", 256
        return None, None

class PythonScanner:
    def scan_file(self, file_path: str, content: str) -> List[DiscoveredFinding]:
        try:
            tree = ast.parse(content, filename=file_path)
        except SyntaxError:
            return []
        
        lines = content.splitlines()
        visitor = PythonCryptoVisitor(file_path=file_path, lines=lines)
        visitor.visit(tree)
        return visitor.findings
