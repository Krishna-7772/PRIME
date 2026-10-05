from typing import Dict, Any, List
from app.models.entities import CryptoAsset

class MigrationImpactAnalyzer:
    def analyze_impact(
        self,
        target_asset: CryptoAsset,
        all_project_assets: List[CryptoAsset]
    ) -> Dict[str, Any]:
        """
        Calculates blast radius and migration impact for a specific cryptographic asset.
        Identifies dependent applications, components, libraries, and configurations.
        """
        algo_name = target_asset.algorithm.upper()
        purpose = target_asset.purpose.lower() if target_asset.purpose else "unknown"

        # Find all assets sharing the same algorithm or belonging to same application
        same_algo_assets = [a for a in all_project_assets if a.algorithm.upper() == algo_name]
        same_app_assets = [a for a in all_project_assets if a.application == target_asset.application]

        affected_apps = {a.application for a in same_algo_assets if a.application}
        affected_components = {a.component for a in same_algo_assets if a.component}
        affected_libraries = {a.library for a in same_algo_assets if a.library}
        affected_certs = len([a for a in same_algo_assets if a.purpose == "certificate"])

        # Determine migration complexity based on blast radius and algorithm
        complexity = "MEDIUM"
        if len(affected_apps) >= 3 or "RSA" in algo_name or "ECDSA" in algo_name:
            complexity = "HIGH"
        if affected_certs > 0 or len(affected_apps) >= 5:
            complexity = "CRITICAL"

        review_items: List[Dict[str, Any]] = []

        # 1. Signature / Token considerations
        if purpose in {"digital_signature", "certificate"} or "RSA" in algo_name or "ECDSA" in algo_name:
            review_items.append({
                "category": "Protocol & Buffer Sizing",
                "component": f"{target_asset.application} / {target_asset.component}",
                "status": "Potentially affected",
                "finding": "PQC signature expansion",
                "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
                "validation_priority": "CRITICAL"
            })
            review_items.append({
                "category": "Client Interoperability",
                "component": "API Gateway & Client SDKs",
                "status": "Requires validation",
                "finding": "Downstream client support for NIST FIPS 204",
                "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
                "validation_priority": "HIGH"
            })

        # 2. Key Establishment / TLS considerations
        if purpose in {"key_establishment", "encryption", "protocol_security"}:
            review_items.append({
                "category": "Network MTU & Handshake",
                "component": "Transport Layer / Ingress",
                "status": "Potentially affected",
                "finding": "Ciphertext encapsulation overhead",
                "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
                "validation_priority": "HIGH"
            })

        # 3. Cryptographic Library / Dependencies
        if target_asset.library:
            review_items.append({
                "category": "Library Ecosystem",
                "component": target_asset.library,
                "status": "Requires validation",
                "finding": f"PQC support in {target_asset.library}",
                "action": f"Verify whether current runtime version of {target_asset.library} exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
                "validation_priority": "MEDIUM"
            })

        # 4. Certificates & PKI
        if affected_certs > 0:
            review_items.append({
                "category": "PKI & Certificate Hierarchy",
                "component": "Certificate Authority / Trust Store",
                "status": "Potentially affected",
                "finding": "Quantum-vulnerable X.509 certificate chains",
                "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
                "validation_priority": "CRITICAL"
            })

        summary = (
            f"Migration of {target_asset.algorithm} ({target_asset.asset_id}) impacts {len(affected_apps)} applications "
            f"and {len(affected_components)} components across {len(affected_libraries)} cryptographic libraries. "
            f"Overall migration complexity is classified as {complexity}."
        )

        return {
            "affected_applications": len(affected_apps),
            "affected_components": len(affected_components),
            "affected_libraries": len(affected_libraries),
            "affected_certificates": affected_certs,
            "affected_configurations": len(review_items),
            "migration_complexity": complexity,
            "blast_radius_summary": summary,
            "review_items": review_items,
            "affected_apps_list": list(affected_apps),
            "affected_components_list": list(affected_components),
            "affected_libraries_list": list(affected_libraries)
        }
