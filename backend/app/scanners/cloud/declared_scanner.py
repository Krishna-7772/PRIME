from typing import List, Dict, Any
from app.scanners.base import DiscoveredFinding

class DeclaredCloudHSMScanner:
    """
    Cloud / HSM / Hardware Declared Asset Ingestion (Section 14)
    Connects to or parses declared inventory records for:
      - AWS KMS
      - Azure Key Vault
      - Google Cloud KMS
      - Hardware Security Modules (PKCS#11 / HSM)
      - Trusted Platform Modules (TPM)
    Clearly marks findings as provenance: 'DECLARED' rather than pretending scanner observed them.
    """

    SUPPORTED_PROVIDERS = [
        "AWS_KMS", "AZURE_KEY_VAULT", "GOOGLE_CLOUD_KMS", "PKCS11_HSM", "TPM_2_0"
    ]

    def parse_declared_inventory(self, items: List[Dict[str, Any]]) -> List[DiscoveredFinding]:
        findings = []

        for item in items:
            provider = item.get("provider", "AWS_KMS")
            key_id = item.get("key_id", "arn:aws:kms:us-east-1:123456789012:key/declared-001")
            algo = item.get("algorithm", "RSA_2048")
            purpose = item.get("purpose", "encryption")
            owner = item.get("owner", "Infrastructure / Cloud Ops")
            criticality = item.get("business_criticality", "HIGH")
            data_lifetime = item.get("data_lifetime_years", 7.0)

            # Normalize algorithm and key size
            key_size = 2048
            if "2048" in algo:
                key_size = 2048
            elif "3072" in algo:
                key_size = 3072
            elif "4096" in algo:
                key_size = 4096
            elif "256" in algo:
                key_size = 256

            family = "asymmetric" if ("RSA" in algo or "EC" in algo) else "symmetric"

            findings.append(DiscoveredFinding(
                algorithm=algo.replace("_", "-"),
                family=family,
                key_size=key_size,
                curve=item.get("curve"),
                purpose=purpose,
                purpose_confidence="CONFIRMED",
                file_path=f"cloud://{provider}/{key_id}",
                line_number=1,
                code_snippet=f"Provider: {provider}\nKey ARN / Identifier: {key_id}\nAlgorithm: {algo}\nStatus: Declared / Customer Managed Key",
                detection_method=f"Declared Connector ({provider})",
                confidence=1.0,
                detection_rule="RULE-DECLARED-CLOUD-KMS",
                application=item.get("application", "Cloud Platform"),
                component=provider,
                library=provider,
                metadata={
                    "provenance": "DECLARED",
                    "confidence_classification": "MANUAL",
                    "owner": owner,
                    "business_criticality": criticality,
                    "data_lifetime_years": data_lifetime,
                    "quantum_vulnerable": family == "asymmetric"
                }
            ))

        return findings
