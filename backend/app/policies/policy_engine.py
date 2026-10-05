import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.core.config import settings

class PolicyEngine:
    """
    Configurable Enterprise Policy Engine (Section 3.F)
    Evaluates discovered cryptographic assets against organizational cryptographic standards.
    """

    def __init__(self, kb_path: Path = None):
        self.kb_path = kb_path or settings.KNOWLEDGE_BASE_DIR
        self.default_policies = self._load_default_policies()

    def _load_default_policies(self) -> List[Dict[str, Any]]:
        policy_file = self.kb_path / "policy_defaults.json"
        if policy_file.exists():
            with open(policy_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("rules", [])
        return []

    def evaluate_findings(
        self,
        assets: List[Dict[str, Any]],
        certificates: List[Dict[str, Any]] = None,
        custom_policies: List[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Evaluates assets against active enterprise policies.
        Returns a list of policy violations with exact evidence and remediations.
        """
        policies_to_run = custom_policies if custom_policies else self.default_policies
        violations = []

        for asset in assets:
            algo = (asset.get("algorithm") or "").upper()
            family = (asset.get("family") or "").lower()
            key_size = asset.get("key_size")
            purpose = (asset.get("purpose") or "").lower()
            mosca_status = asset.get("mosca_status") or "MANAGEABLE"

            for policy in policies_to_run:
                code = policy.get("code")
                cond = policy.get("condition", {})

                violated = False
                violation_msg = ""

                # POL-001: Disallow MD5
                if code == "POL-001" and algo == "MD5":
                    violated = True
                    violation_msg = "MD5 hash algorithm detected. Collisions can be generated in seconds."

                # POL-002: Disallow SHA-1 for signatures
                elif code == "POL-002" and algo in ["SHA-1", "SHA1"] and ("sign" in purpose or "cert" in purpose or "auth" in purpose):
                    violated = True
                    violation_msg = "SHA-1 used in digital signature / authentication context. Vulnerable to SHAttered collision attacks."

                # POL-003: Minimum RSA key size 2048
                elif code == "POL-003" and "RSA" in algo:
                    if key_size and key_size < 2048:
                        violated = True
                        violation_msg = f"RSA key size of {key_size} bits is below enterprise minimum threshold of 2048 bits."

                # POL-004: Disallow 3DES/DES
                elif code == "POL-004" and algo in ["3DES", "DES", "TRIPLEDES"]:
                    violated = True
                    violation_msg = "Legacy 64-bit block cipher 3DES/DES detected. Vulnerable to Sweet32 attacks."

                # POL-005: Mandatory PQC Transition for Mosca Deficit
                elif code == "POL-005" and mosca_status == "AT_RISK":
                    violated = True
                    violation_msg = f"Asset '{algo}' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk."

                if violated:
                    violations.append({
                        "policy_code": code,
                        "policy_name": policy.get("name"),
                        "severity": policy.get("severity", "HIGH"),
                        "category": policy.get("category", "GENERAL"),
                        "message": violation_msg,
                        "remediation": policy.get("remediation", ""),
                        "asset_id": asset.get("asset_id"),
                        "algorithm": algo,
                        "file_path": asset.get("file_path"),
                        "line_number": asset.get("line_number"),
                        "evidence_snippet": asset.get("code_snippet")
                    })

        # Evaluate certificates
        if certificates:
            for cert in certificates:
                days_left = cert.get("days_remaining", 365)
                sig_algo = (cert.get("signature_algorithm") or "").upper()
                pub_algo = (cert.get("public_key_algorithm") or "").upper()
                pub_size = cert.get("public_key_size")

                # POL-007: Expiring certificates
                if days_left is not None and days_left <= 30:
                    violations.append({
                        "policy_code": "POL-007",
                        "policy_name": "Expiring Certificate Proactive Renewal",
                        "severity": "MEDIUM",
                        "category": "CERTIFICATE_LIFECYCLE",
                        "message": f"Certificate for subject '{cert.get('subject')}' expires in {days_left} days.",
                        "remediation": "Renew certificate with modern cryptographic parameters.",
                        "asset_id": cert.get("id"),
                        "algorithm": f"{pub_algo} ({pub_size}b)",
                        "file_path": cert.get("file_path"),
                        "line_number": 1,
                        "evidence_snippet": f"Subject: {cert.get('subject')}\nIssuer: {cert.get('issuer')}\nExpires: {cert.get('not_after')}"
                    })

        return violations
