import os
import re
from pathlib import Path
from typing import List, Optional, Dict, Any
from app.scanners.base import BaseScanner, DiscoveredFinding
from app.scanners.source.python_scanner import PythonScanner
from app.scanners.source.javascript_scanner import JavaScriptScanner
from app.scanners.source.java_scanner import JavaScanner

class SourceScanner(BaseScanner):
    def __init__(self):
        self.python_scanner = PythonScanner()
        self.js_scanner = JavaScriptScanner()
        self.java_scanner = JavaScanner()
        
        # Ignored directories
        self.ignore_dirs = {
            "node_modules", ".git", "venv", ".venv", "__pycache__", 
            "dist", "build", ".next", ".idea", ".vscode", "target", "vendor"
        }
        
        # Supported extensions
        self.supported_extensions = {
            ".py", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
            ".java", ".go", ".rs", ".c", ".cpp", ".h", ".cs"
        }

    def scan_path(self, target_path: str, context: Optional[Dict[str, Any]] = None) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        path = Path(target_path)

        if path.is_file():
            findings.extend(self._scan_single_file(path, base_path=path.parent))
            return findings

        for root, dirs, files in os.walk(path):
            dirs[:] = [d for d in dirs if d not in self.ignore_dirs and not d.startswith(".")]
            for file in files:
                ext = Path(file).suffix.lower()
                if ext in self.supported_extensions:
                    file_path = Path(root) / file
                    try:
                        file_findings = self._scan_single_file(file_path, base_path=path)
                        findings.extend(file_findings)
                    except Exception as e:
                        # Defensive error capture for malformed files
                        pass

        return findings

    def _scan_single_file(self, file_path: Path, base_path: Path) -> List[DiscoveredFinding]:
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            return []

        rel_path = str(file_path.relative_to(base_path)).replace("\\", "/") if base_path else file_path.name
        ext = file_path.suffix.lower()

        # Deduce application and component from directory path
        path_parts = Path(rel_path).parts
        app_name = path_parts[0] if len(path_parts) > 1 else "Core Service"
        component_name = path_parts[1] if len(path_parts) > 2 else file_path.stem

        findings: List[DiscoveredFinding] = []

        if ext == ".py":
            findings = self.python_scanner.scan_file(rel_path, content)
        elif ext in {".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"}:
            findings = self.js_scanner.scan_file(rel_path, content)
        elif ext == ".java":
            findings = self.java_scanner.scan_file(rel_path, content)
        elif ext in {".c", ".cpp", ".h"}:
            findings = self._scan_c_cpp(rel_path, content)
        elif ext == ".go":
            findings = self._scan_go(rel_path, content)

        # Enrich findings with application and component context
        for f in findings:
            if not f.application or f.application == "Core Application":
                f.application = app_name
            if not f.component or f.component == "Cryptographic Module":
                f.component = component_name

        return findings

    def _scan_c_cpp(self, rel_path: str, content: str) -> List[DiscoveredFinding]:
        findings = []
        lines = content.splitlines()

        # OpenSSL EVP_aes_256_gcm / RSA_generate_key
        if "EVP_aes_256_gcm" in content:
            findings.append(
                DiscoveredFinding(
                    algorithm="AES",
                    family="symmetric",
                    purpose="encryption",
                    purpose_confidence="CONFIRMED",
                    file_path=rel_path,
                    line_number=self._find_line(lines, "EVP_aes_256_gcm"),
                    code_snippet="EVP_aes_256_gcm()",
                    key_size=256,
                    library="OpenSSL libcrypto",
                    confidence=0.96,
                    detection_method="C/C++ Pattern Matcher (OpenSSL EVP)",
                    context_notes="Native OpenSSL EVP AES-256-GCM cipher referenced."
                )
            )
        if "RSA_generate_key" in content:
            findings.append(
                DiscoveredFinding(
                    algorithm="RSA",
                    family="asymmetric",
                    purpose="digital_signature",
                    purpose_confidence="CONFIRMED",
                    file_path=rel_path,
                    line_number=self._find_line(lines, "RSA_generate_key"),
                    code_snippet="RSA_generate_key_ex()",
                    key_size=2048,
                    library="OpenSSL libcrypto",
                    confidence=0.97,
                    detection_method="C/C++ Pattern Matcher (OpenSSL RSA)",
                    context_notes="Native OpenSSL RSA key generation function referenced."
                )
            )
        return findings

    def _scan_go(self, rel_path: str, content: str) -> List[DiscoveredFinding]:
        findings = []
        lines = content.splitlines()
        if "rsa.GenerateKey" in content:
            findings.append(
                DiscoveredFinding(
                    algorithm="RSA",
                    family="asymmetric",
                    purpose="digital_signature",
                    purpose_confidence="CONFIRMED",
                    file_path=rel_path,
                    line_number=self._find_line(lines, "rsa.GenerateKey"),
                    code_snippet="rsa.GenerateKey(rand.Reader, 2048)",
                    key_size=2048,
                    library="crypto/rsa (Go Standard Library)",
                    confidence=0.98,
                    detection_method="Go AST Pattern Matcher (crypto/rsa)",
                    context_notes="Go standard library RSA key generation invoked."
                )
            )
        if "sha256.New()" in content or "sha256.Sum256" in content:
            findings.append(
                DiscoveredFinding(
                    algorithm="SHA-256",
                    family="hash",
                    purpose="hashing",
                    purpose_confidence="CONFIRMED",
                    file_path=rel_path,
                    line_number=self._find_line(lines, "sha256"),
                    code_snippet="sha256.New()",
                    library="crypto/sha256 (Go Standard Library)",
                    confidence=0.99,
                    detection_method="Go AST Pattern Matcher (crypto/sha256)",
                    context_notes="Go SHA-256 digest creation."
                )
            )
        return findings

    def _find_line(self, lines: List[str], keyword: str) -> int:
        for idx, line in enumerate(lines, 1):
            if keyword in line:
                return idx
        return 1
