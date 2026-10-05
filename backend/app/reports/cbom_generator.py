import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from app.models.entities import Project, CryptoAsset

class CBOMGenerator:
    def generate_cbom(
        self,
        project: Project,
        assets: List[CryptoAsset]
    ) -> Dict[str, Any]:
        """
        Generates standard CycloneDX 1.6 CBOM (Cryptographic Bill of Materials) JSON.
        """
        bom_uuid = str(uuid.uuid4())
        now_iso = datetime.now(timezone.utc).isoformat()

        components: List[Dict[str, Any]] = []

        for asset in assets:
            comp_entry = {
                "type": "cryptographic-asset",
                "bom-ref": f"cbom:{project.name}:{asset.asset_id}",
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
                        "file": asset.file_path,
                        "line": asset.line_number
                    },
                    "riskAssessment": {
                        "overallRisk": asset.risk.overall_risk if asset.risk else "UNKNOWN",
                        "quantumExposure": asset.risk.quantum_exposure if asset.risk else "UNKNOWN",
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

        return {
            "bomFormat": "CycloneDX",
            "specVersion": "1.6",
            "serialNumber": f"urn:uuid:{bom_uuid}",
            "version": 1,
            "metadata": {
                "timestamp": now_iso,
                "tools": {
                    "components": [
                        {
                            "type": "application",
                            "name": "ECDAT",
                            "version": "1.0.0",
                            "description": "Enterprise Cryptographic Discovery & Analysis Tool (NTRO SIH26164)"
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
                    {"name": "ecdat:businessCriticality", "value": project.business_criticality},
                    {"name": "ecdat:dataLifetimeYears", "value": str(project.data_lifetime_years)},
                    {"name": "ecdat:migrationTimeYears", "value": str(project.migration_time_years)},
                    {"name": "ecdat:quantumHorizonYears", "value": str(project.quantum_horizon_years)}
                ]
            },
            "components": components
        }
