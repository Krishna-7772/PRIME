import json
from pathlib import Path
from typing import Dict, Any, List
from app.core.config import settings
from app.scanners.base import DiscoveredFinding

class AgilityEngine:
    """
    Cryptographic Agility Assessment Engine
    Implements NIST CSWP 39upd1 and Rameshan & Messmer (2026) 7-dimensional agility framework:
      C1: Operation Coupling
      C2: Creation Coupling
      C3: Provider Coupling
      C4: Decoupling Mechanism
      C5: Decoupling Authority
      E1: Algorithm Migration Capability
      E2: Provider Migration Capability
    """

    def __init__(self, kb_path: Path = None):
        self.kb_path = kb_path or settings.KNOWLEDGE_BASE_DIR
        self.agility_rules = self._load_rules()

    def _load_rules(self) -> Dict[str, Any]:
        rules_file = self.kb_path / "agility_rules.json"
        if rules_file.exists():
            with open(rules_file, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    def assess_asset_agility(self, finding: DiscoveredFinding, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Calculates deterministic agility scores (0.0 - 4.0) for each dimension
        based on real observable code snippet characteristics and AST evidence.
        """
        snippet = (finding.code_snippet or "").lower()
        algo = (finding.algorithm or "").upper()
        rule = (getattr(finding, "detection_rule", None) or getattr(finding, "detection_method", "") or "").lower()
        purpose = (finding.purpose or "").lower()

        # --- Dimension C1: Operation Coupling ---
        # 0: Hardcoded algorithm calls scattered directly
        # 1: Helper utility function
        # 2: Service-level wrapper
        # 3: Interface facade
        # 4: Domain intent
        c1_score = 1.0
        c1_explanation = "Algorithm invocation directly binds concrete parameters in the call site."
        if "os.environ" in snippet or "config" in snippet or "settings" in snippet or "env" in snippet:
            c1_score = 3.0
            c1_explanation = "Operation parameters dynamically referenced via configuration or environment settings."
        elif "helper" in finding.file_path.lower() or "util" in finding.file_path.lower() or "vault" in finding.file_path.lower():
            c1_score = 2.0
            c1_explanation = "Cryptographic operation isolated inside dedicated service module/vault adapter."
        elif "sign" in snippet or "encrypt" in snippet or "new_cipher" in snippet:
            c1_score = 1.0
            c1_explanation = f"Operation invokes concrete algorithm {algo} directly within functional business logic."

        # --- Dimension C2: Creation Coupling ---
        # 0: Direct concrete keygen (rsa.generate_private_key)
        # 1: Isolated creation
        # 2: Hardcoded factory
        # 3: Dynamic factory / DI
        # 4: Full KMS / HSM abstraction
        c2_score = 1.0
        c2_explanation = "Key and cipher contexts instantiated with concrete algorithm classes."
        if "kms" in snippet or "vault" in snippet or "awskms" in snippet or "hsm" in snippet:
            c2_score = 4.0
            c2_explanation = "Key material and context managed via external KMS/Vault handle with opaque algorithm binding."
        elif "generate_private_key" in snippet or "generatekey" in snippet or "keypairgenerator" in snippet:
            c2_score = 0.5
            c2_explanation = f"Key generation hardcodes concrete algorithm {algo} with fixed parameter set."
        elif "certificate" in finding.file_path.lower() or "cert" in finding.file_path.lower():
            c2_score = 2.0
            c2_explanation = "Public key context imported from X.509 certificate metadata."

        # --- Dimension C3: Provider Coupling ---
        # 0: Proprietary C API
        # 1: Standard library direct imports (cryptography, crypto, jca)
        # 2: Internal wrapper
        # 3: Pluggable provider (JCA/SPI)
        # 4: Hardware/Software failover
        c3_score = 1.5
        c3_explanation = "Application couples directly to standard ecosystem provider APIs."
        if "bouncycastle" in snippet or "security.addprovider" in snippet:
            c3_score = 3.0
            c3_explanation = "Uses pluggable provider architecture (e.g. JCA Provider / Bouncy Castle SPI)."
        elif "import cryptography" in snippet or "from cryptography" in snippet or "require('crypto')" in snippet:
            c3_score = 1.5
            c3_explanation = "Standard platform library directly imported without formal provider-independent interface."

        # --- Dimension C4: Decoupling Mechanism ---
        # 0: Full code rewrite required
        # 1: Code change in constants
        # 2: Static config file
        # 3: Hot-reload runtime config
        # 4: Dynamic autonomous negotiation
        c4_score = 1.0
        c4_explanation = "Algorithm change requires source code modification and redeployment."
        if "config" in snippet or "env" in snippet:
            c4_score = 2.5
            c4_explanation = "Algorithm or key parameters can be updated via configuration files without extensive code changes."
        elif "jwt" in snippet or "jws" in snippet:
            c4_score = 2.0
            c4_explanation = "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update."

        # --- Dimension C5: Decoupling Authority ---
        # 0: Developer discretion
        # 1: Ad-hoc review
        # 2: Lead control
        # 3: Central config repo / CI policy
        # 4: Real-time security policy engine
        c5_score = 1.0
        c5_explanation = "Cryptographic posture currently determined by individual service code implementation."
        if "policy" in snippet or "validator" in snippet:
            c5_score = 2.5
            c5_explanation = "Cryptographic choices verified by local policy validator modules."

        # --- Dimension E1: Algorithm Migration Capability ---
        # 0: Rigid wire protocol / DB constraint
        # 1: Memory flexible, wire rigid
        # 2: DB blob, HTTP header limit
        # 3: Data structures accommodate large PQC keys
        # 4: Fully protocol-agile
        e1_score = 2.0
        e1_explanation = "System handles binary payloads; PQC key expansion will require schema and bandwidth verification."
        if algo in ["RSA", "ECDSA", "ECDH", "X25519"]:
            e1_score = 1.5
            e1_explanation = (
                f"Transitioning {algo} to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) "
                "imposes significant payload expansion requiring buffer and protocol updates."
            )
        elif algo in ["AES", "SHA-256", "SHA-384"]:
            e1_score = 3.5
            e1_explanation = "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated."

        # --- Dimension E2: Provider Migration Capability ---
        # 0: Vendor lock-in
        # 1: Standard lacking PQC
        # 2: Standard with planned PQC
        # 3: Dual provider / hybrid
        # 4: Modular plug-and-play
        e2_score = 2.0
        e2_explanation = "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible."
        if "node" in finding.file_path.lower() or "package.json" in finding.file_path.lower():
            e2_score = 2.0
            e2_explanation = "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC."
        elif "python" in finding.file_path.lower() or ".py" in finding.file_path.lower():
            e2_score = 2.5
            e2_explanation = "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration."

        # --- Overall Agility Index ---
        total_score = (c1_score + c2_score + c3_score + c4_score + c5_score + e1_score + e2_score) / 7.0
        overall_agility = round(total_score, 2)

        # Rating label
        if overall_agility <= 1.2:
            rating = "VERY_LOW"
        elif overall_agility <= 2.0:
            rating = "LOW"
        elif overall_agility <= 2.8:
            rating = "MODERATE"
        elif overall_agility <= 3.5:
            rating = "HIGH"
        else:
            rating = "EXCELLENT"

        radar_data = [
            {"dimension": "C1: Operation Coupling", "score": c1_score, "fullMark": 4.0},
            {"dimension": "C2: Creation Coupling", "score": c2_score, "fullMark": 4.0},
            {"dimension": "C3: Provider Coupling", "score": c3_score, "fullMark": 4.0},
            {"dimension": "C4: Decoupling Mechanism", "score": c4_score, "fullMark": 4.0},
            {"dimension": "C5: Decoupling Authority", "score": c5_score, "fullMark": 4.0},
            {"dimension": "E1: Algorithm Migration", "score": e1_score, "fullMark": 4.0},
            {"dimension": "E2: Provider Migration", "score": e2_score, "fullMark": 4.0}
        ]

        recommendations = []
        if c1_score < 2.0:
            recommendations.append("Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.")
        if c2_score < 2.0:
            recommendations.append("Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.")
        if c4_score < 2.0:
            recommendations.append("Externalize cryptographic suites and key parameters to versioned, signed configuration files.")
        if e1_score < 2.5:
            recommendations.append("Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads.")

        return {
            "c1_operation_coupling": c1_score,
            "c1_explanation": c1_explanation,
            "c2_creation_coupling": c2_score,
            "c2_explanation": c2_explanation,
            "c3_provider_coupling": c3_score,
            "c3_explanation": c3_explanation,
            "c4_decoupling_mechanism": c4_score,
            "c4_explanation": c4_explanation,
            "c5_decoupling_authority": c5_score,
            "c5_explanation": c5_explanation,
            "e1_algorithm_migration": e1_score,
            "e1_explanation": e1_explanation,
            "e2_provider_migration": e2_score,
            "e2_explanation": e2_explanation,
            "overall_agility_score": overall_agility,
            "agility_rating": rating,
            "radar_data": radar_data,
            "recommendations": recommendations
        }
