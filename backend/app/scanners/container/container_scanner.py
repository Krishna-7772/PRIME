import os
import re
from pathlib import Path
from typing import List, Optional
from app.scanners.base import BaseScanner, DiscoveredFinding

class ContainerScanner(BaseScanner):
    def __init__(self):
        self.crypto_keywords = [
            ("openssl", "OpenSSL", "asymmetric", "protocol_security"),
            ("ca-certificates", "X.509 PKI Trust Store", "asymmetric", "certificate"),
            ("libssl", "OpenSSL libssl", "protocol", "protocol_security"),
            ("libcrypto", "OpenSSL libcrypto", "asymmetric", "encryption"),
            ("nginx:ssl", "TLS Reverse Proxy", "protocol", "protocol_security")
        ]

    def scan_path(self, target_path: str, context: Optional[dict] = None) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        path = Path(target_path)

        if path.is_file():
            if "dockerfile" in path.name.lower() or path.suffix.lower() in {".yml", ".yaml"}:
                findings.extend(self._scan_docker_file(path, base_path=path.parent))
            return findings

        for root, _, files in os.walk(path):
            for file in files:
                p = Path(root) / file
                if "dockerfile" in file.lower() or (file.lower().startswith("docker-compose") and file.endswith((".yml", ".yaml"))):
                    findings.extend(self._scan_docker_file(p, base_path=path))

        return findings

    def _scan_docker_file(self, file_path: Path, base_path: Path) -> List[DiscoveredFinding]:
        rel_path = str(file_path.relative_to(base_path)).replace("\\", "/") if base_path else file_path.name
        findings: List[DiscoveredFinding] = []

        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
        except Exception:
            return []

        for line_no, line in enumerate(lines, 1):
            line_lower = line.lower()
            for kw, disp_name, family, purpose in self.crypto_keywords:
                if kw in line_lower:
                    findings.append(
                        DiscoveredFinding(
                            algorithm=disp_name,
                            family=family,
                            purpose=purpose,
                            purpose_confidence="INFERRED",
                            file_path=rel_path,
                            line_number=line_no,
                            code_snippet=line.strip(),
                            library=disp_name,
                            confidence=0.88,
                            detection_method="Container Configuration Inspection (Dockerfile/Compose)",
                            context_notes=f"Container environment provisions cryptographic package or service: '{disp_name}'."
                        )
                    )
        return findings
