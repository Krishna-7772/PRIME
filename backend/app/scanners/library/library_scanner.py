import os
import json
import re
from pathlib import Path
from typing import List, Optional, Dict, Any
from app.scanners.base import BaseScanner, DiscoveredFinding

class LibraryScanner(BaseScanner):
    def __init__(self):
        # Known cryptographic libraries across ecosystems
        self.known_libraries = {
            "python": {
                "cryptography": {"family": "asymmetric", "algo": "RSA/ECDSA/AES", "purpose": "encryption"},
                "pycryptodome": {"family": "asymmetric", "algo": "RSA/AES", "purpose": "encryption"},
                "pyjwt": {"family": "asymmetric", "algo": "RSA/ECDSA", "purpose": "digital_signature"},
                "ecdsa": {"family": "asymmetric", "algo": "ECDSA", "purpose": "digital_signature"},
                "rsa": {"family": "asymmetric", "algo": "RSA", "purpose": "digital_signature"},
                "bcrypt": {"family": "kdf", "algo": "bcrypt", "purpose": "password_hashing"},
                "argon2-cffi": {"family": "kdf", "algo": "Argon2", "purpose": "password_hashing"},
                "hashlib": {"family": "hash", "algo": "SHA-256", "purpose": "hashing"}
            },
            "npm": {
                "crypto-js": {"family": "symmetric", "algo": "AES/SHA-256", "purpose": "encryption"},
                "node-forge": {"family": "asymmetric", "algo": "RSA/TLS", "purpose": "digital_signature"},
                "jsonwebtoken": {"family": "asymmetric", "algo": "RSA/ECDSA", "purpose": "digital_signature"},
                "bcrypt": {"family": "kdf", "algo": "bcrypt", "purpose": "password_hashing"},
                "argon2": {"family": "kdf", "algo": "Argon2", "purpose": "password_hashing"},
                "elliptic": {"family": "asymmetric", "algo": "ECDSA", "purpose": "digital_signature"},
                "noble-secp256k1": {"family": "asymmetric", "algo": "ECDSA", "purpose": "digital_signature"}
            },
            "maven": {
                "bcprov-jdk15on": {"family": "asymmetric", "algo": "BouncyCastle (RSA/ECC/AES)", "purpose": "encryption"},
                "bcpkix-jdk15on": {"family": "asymmetric", "algo": "BouncyCastle PKIX", "purpose": "certificate"},
                "jjwt-api": {"family": "asymmetric", "algo": "RSA/ECDSA", "purpose": "digital_signature"}
            }
        }

    def scan_path(self, target_path: str, context: Optional[dict] = None) -> List[DiscoveredFinding]:
        findings: List[DiscoveredFinding] = []
        path = Path(target_path)

        if path.is_file():
            findings.extend(self._scan_manifest(path, base_path=path.parent))
            return findings

        for root, _, files in os.walk(path):
            for file in files:
                p = Path(root) / file
                if p.name in {"requirements.txt", "package.json", "pom.xml"}:
                    findings.extend(self._scan_manifest(p, base_path=path))

        return findings

    def _scan_manifest(self, file_path: Path, base_path: Path) -> List[DiscoveredFinding]:
        rel_path = str(file_path.relative_to(base_path)).replace("\\", "/") if base_path else file_path.name
        name = file_path.name.lower()
        findings: List[DiscoveredFinding] = []

        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            return []

        if name == "requirements.txt":
            findings.extend(self._parse_requirements_txt(rel_path, content))
        elif name == "package.json":
            findings.extend(self._parse_package_json(rel_path, content))
        elif name == "pom.xml":
            findings.extend(self._parse_pom_xml(rel_path, content))

        return findings

    def _parse_requirements_txt(self, rel_path: str, content: str) -> List[DiscoveredFinding]:
        findings = []
        for line_no, line in enumerate(content.splitlines(), 1):
            line_clean = line.strip().split("#")[0].strip()
            if not line_clean: continue
            
            # match pkg==1.2.3 or pkg>=1.2.3
            parts = re.split(r"[=><~]+", line_clean)
            pkg_name = parts[0].strip().lower()
            version = parts[1].strip() if len(parts) > 1 else "unspecified"

            if pkg_name in self.known_libraries["python"]:
                meta = self.known_libraries["python"][pkg_name]
                findings.append(
                    DiscoveredFinding(
                        algorithm=meta["algo"],
                        family=meta["family"],
                        purpose=meta["purpose"],
                        purpose_confidence="INFERRED",
                        file_path=rel_path,
                        line_number=line_no,
                        code_snippet=line.strip(),
                        library=pkg_name,
                        library_version=version,
                        confidence=0.92,
                        detection_method="Dependency Manifest Analysis (pip requirements.txt)",
                        context_notes=f"Declared Python cryptographic dependency: '{pkg_name}' version '{version}'."
                    )
                )
        return findings

    def _parse_package_json(self, rel_path: str, content: str) -> List[DiscoveredFinding]:
        findings = []
        try:
            data = json.loads(content)
        except Exception:
            return []

        deps = {}
        deps.update(data.get("dependencies", {}))
        deps.update(data.get("devDependencies", {}))

        for pkg_name, ver in deps.items():
            pkg_lower = pkg_name.lower()
            if pkg_lower in self.known_libraries["npm"]:
                meta = self.known_libraries["npm"][pkg_lower]
                findings.append(
                    DiscoveredFinding(
                        algorithm=meta["algo"],
                        family=meta["family"],
                        purpose=meta["purpose"],
                        purpose_confidence="INFERRED",
                        file_path=rel_path,
                        line_number=1,
                        code_snippet=f'"{pkg_name}": "{ver}"',
                        library=pkg_name,
                        library_version=ver,
                        confidence=0.92,
                        detection_method="Dependency Manifest Analysis (npm package.json)",
                        context_notes=f"Declared Node.js cryptographic dependency: '{pkg_name}' version '{ver}'."
                    )
                )
        return findings

    def _parse_pom_xml(self, rel_path: str, content: str) -> List[DiscoveredFinding]:
        findings = []
        for artifact, meta in self.known_libraries["maven"].items():
            if artifact in content:
                findings.append(
                    DiscoveredFinding(
                        algorithm=meta["algo"],
                        family=meta["family"],
                        purpose=meta["purpose"],
                        purpose_confidence="INFERRED",
                        file_path=rel_path,
                        line_number=1,
                        code_snippet=f"<artifactId>{artifact}</artifactId>",
                        library=artifact,
                        confidence=0.90,
                        detection_method="Dependency Manifest Analysis (Maven pom.xml)",
                        context_notes=f"Declared Java cryptographic artifact: '{artifact}'."
                    )
                )
        return findings
