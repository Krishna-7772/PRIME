import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from app.models.entities import Project, CryptoAsset, Certificate

class CBOMGenerator:
    """
    Standardized CycloneDX 1.7 Cryptographic Bill of Materials (CBOM) Generator (Section 23)
    Adheres to CycloneDX v1.7 specification with cryptographic-asset components,
    CycloneDX Cryptography Registry terminology, and full provenance tracking.
    """

    def generate_cbom(
        self,
        project: Project,
        assets: List[CryptoAsset],
        certificates: List[Certificate] = None
    ) -> Dict[str, Any]:
        bom_uuid = str(uuid.uuid4())
        now_iso = datetime.now(timezone.utc).isoformat()

        components: List[Dict[str, Any]] = []
        dependencies: List[Dict[str, Any]] = []

        # 1. Cryptographic Asset Components
        for asset in assets:
            bom_ref = f"cbom:{project.name}:{asset.asset_id}"
            comp_entry = {
                "type": "cryptographic-asset",
                "bom-ref": bom_ref,
                "name": asset.algorithm,
                "version": asset.library_version or "1.0",
                "description": f"Cryptographic primitive {asset.algorithm} used for {asset.purpose}",
                "cryptoProperties": {
                    "assetType": "algorithm",
                    "algorithmProperties": {
                        "name": asset.algorithm,
                        "family": asset.family or "asymmetric",
                        "primitive": asset.purpose,
                        "parameterSetIdentifier": f"{asset.algorithm}-{asset.key_size or asset.curve or 'default'}",
                        "curve": asset.curve,
                        "classicalSecurityLevel": asset.key_size or 128,
                        "nistQuantumSecurityLevel": 0 if (asset.risk and asset.risk.quantum_exposure in {"CRITICAL", "HIGH"}) else 3
                    },
                    "detection": {
                        "method": asset.detection_method,
                        "confidence": asset.confidence,
                        "confidenceClassification": asset.confidence_classification or "CONFIRMED",
                        "provenance": asset.provenance or "OBSERVED",
                        "file": asset.file_path,
                        "line": asset.line_number
                    },
                    "riskAssessment": {
                        "overallRisk": asset.risk.overall_risk if asset.risk else "UNKNOWN",
                        "quantumExposure": asset.risk.quantum_exposure if asset.risk else "UNKNOWN",
                        "hygieneRisk": asset.risk.hygiene_risk if asset.risk else "CLEAN",
                        "moscaStatus": asset.risk.mosca_status if asset.risk else "MANAGEABLE",
                        "moscaMarginYears": asset.risk.mosca_margin_years if asset.risk else 0.0
                    },
                    "pqcRecommendation": {
                        "recommendedPQC": asset.recommendation.recommended_pqc if asset.recommendation else "Review",
                        "parameterSet": asset.recommendation.parameter_set if asset.recommendation else None,
                        "alternativePQC": asset.recommendation.alternative_pqc if asset.recommendation else None,
                        "rationale": asset.recommendation.rationale if asset.recommendation else ""
                    }
                },
                "evidence": {
                    "occurrences": [
                        {
                            "location": asset.file_path,
                            "line": asset.line_number,
                            "snippet": asset.evidence.code_snippet if asset.evidence else ""
                        }
                    ]
                }
            }
            components.append(comp_entry)

        # 2. X.509 Certificate Components
        if certificates:
            for cert in certificates:
                cert_ref = f"cbom:{project.name}:cert:{cert.id[:8]}"
                components.append({
                    "type": "cryptographic-asset",
                    "bom-ref": cert_ref,
                    "name": f"X.509 Certificate ({cert.public_key_algorithm})",
                    "description": f"Issued to {cert.subject} by {cert.issuer}",
                    "cryptoProperties": {
                        "assetType": "certificate",
                        "certificateProperties": {
                            "subject": cert.subject,
                            "issuer": cert.issuer,
                            "serialNumber": cert.serial_number,
                            "notBefore": cert.not_before.isoformat() if cert.not_before else None,
                            "notAfter": cert.not_after.isoformat() if cert.not_after else None,
                            "publicKeyAlgorithm": cert.public_key_algorithm,
                            "publicKeySize": cert.public_key_size,
                            "signatureAlgorithm": cert.signature_algorithm,
                            "quantumVulnerable": cert.quantum_vulnerable
                        },
                        "detection": {
                            "method": "X.509 ASN.1 Parser",
                            "confidence": 1.0,
                            "confidenceClassification": "CONFIRMED",
                            "provenance": "OBSERVED",
                            "file": cert.file_path
                        }
                    }
                })

        return {
            "bomFormat": "CycloneDX",
            "specVersion": "1.7",
            "serialNumber": f"urn:uuid:{bom_uuid}",
            "version": 1,
            "metadata": {
                "timestamp": now_iso,
                "tools": {
                    "components": [
                        {
                            "type": "application",
                            "name": "PRIME",
                            "version": "1.0.0",
                            "description": "Postquantum Readiness Intelligence and Migration Engine (NTRO SIH26164 Team PRAYAS)"
                        }
                    ]
                },
                "component": {
                    "type": "application",
                    "name": project.name,
                    "version": "1.0.0",
                    "description": project.description or "Monitored Enterprise Repository"
                },
                "properties": [
                    {"name": "prime:businessCriticality", "value": project.business_criticality},
                    {"name": "prime:dataLifetimeYears", "value": str(project.data_lifetime_years)},
                    {"name": "prime:migrationTimeYears", "value": str(project.migration_time_years)},
                    {"name": "prime:quantumHorizonYears", "value": str(project.quantum_horizon_years)},
                    {"name": "prime:environment", "value": "LOCAL / AIR-GAPPED"}
                ]
            },
            "components": components
        }
