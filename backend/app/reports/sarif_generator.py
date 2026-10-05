import json
from typing import List, Dict, Any
from app.models.entities import Project, Scan, CryptoAsset

class SARIFGenerator:
    """
    SARIF 2.1.0 Exporter (Section 24)
    Formats cryptographic discovery findings and quantum vulnerabilities into standard SARIF format
    compatible with GitHub Code Scanning, GitLab SAST, and DevSecOps pipelines.
    """

    @staticmethod
    def generate_sarif(project: Project, scan: Scan) -> Dict[str, Any]:
        rules = [
            {
                "id": "PRIME-QUANTUM-VULNERABLE",
                "name": "QuantumVulnerableCryptography",
                "shortDescription": {"text": "Usage of classical public key cryptography vulnerable to Shor's algorithm."},
                "fullDescription": {
                    "text": "The asset uses classical asymmetric cryptography (e.g. RSA, ECC, DH) that will be completely broken by a cryptanalytically relevant quantum computer (CRQC)."
                },
                "defaultConfiguration": {"level": "error"},
                "helpUri": "https://csrc.nist.gov/pubs/fips/204/final"
            },
            {
                "id": "PRIME-LEGACY-ALGORITHM",
                "name": "ClassicallyBrokenOrDeprecatedAlgorithm",
                "shortDescription": {"text": "Usage of deprecated or classically broken cryptographic algorithm."},
                "fullDescription": {
                    "text": "The asset uses algorithms such as MD5, SHA-1, 3DES, or RC4 that are vulnerable to classical collision or block-size attacks."
                },
                "defaultConfiguration": {"level": "error"},
                "helpUri": "https://csrc.nist.gov/pubs/sp/800/131/a/r2/final"
            },
            {
                "id": "PRIME-MOSCA-DEFICIT",
                "name": "HarvestNowDecryptLaterExposure",
                "shortDescription": {"text": "Data lifetime exceeds quantum threat horizon (Mosca deficit X + Y > Z)."},
                "fullDescription": {
                    "text": "Protected data will still be secret when quantum computers arrive, making it vulnerable to Harvest Now, Decrypt Later (HNDL) adversaries."
                },
                "defaultConfiguration": {"level": "warning"}
            }
        ]

        results = []
        for asset in scan.assets:
            level = "note"
            rule_id = "PRIME-QUANTUM-VULNERABLE"

            if asset.risk:
                if asset.risk.overall_risk in ["HIGH", "CRITICAL"]:
                    level = "error"
                elif asset.risk.overall_risk == "MEDIUM":
                    level = "warning"

                if asset.risk.hygiene_risk in ["BROKEN", "DEPRECATED"]:
                    rule_id = "PRIME-LEGACY-ALGORITHM"
                elif asset.risk.mosca_status == "AT_RISK":
                    rule_id = "PRIME-MOSCA-DEFICIT"

            snippet_text = asset.evidence.code_snippet if asset.evidence else f"{asset.algorithm} usage"
            line_no = asset.line_number or 1

            results.append({
                "ruleId": rule_id,
                "level": level,
                "message": {
                    "text": (
                        f"Cryptographic asset {asset.algorithm} ({asset.purpose}) detected. "
                        f"Quantum status: {asset.quantum_status or 'VULNERABLE'}. "
                        f"Recommended migration: {asset.recommendation.recommended_pqc if asset.recommendation else 'NIST PQC'}"
                    )
                },
                "locations": [
                    {
                        "physicalLocation": {
                            "artifactLocation": {
                                "uri": asset.file_path.replace("\\", "/"),
                                "uriBaseId": "%SRCROOT%"
                            },
                            "region": {
                                "startLine": line_no,
                                "snippet": {"text": snippet_text}
                            }
                        }
                    }
                ],
                "properties": {
                    "asset_id": asset.asset_id,
                    "algorithm": asset.algorithm,
                    "purpose": asset.purpose,
                    "confidence": asset.confidence,
                    "confidence_classification": asset.confidence_classification or "CONFIRMED"
                }
            })

        return {
            "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
            "version": "2.1.0",
            "runs": [
                {
                    "tool": {
                        "driver": {
                            "name": "PRIME",
                            "semanticVersion": "1.0.0",
                            "informationUri": "https://github.com/Krishna-7772/PRIME",
                            "rules": rules
                        }
                    },
                    "results": results
                }
            ]
        }
