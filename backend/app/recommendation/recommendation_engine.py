import json
from pathlib import Path
from typing import Dict, Any, Optional
from app.core.config import settings
from app.scanners.base import DiscoveredFinding

class RecommendationEngine:
    def __init__(self, kb_dir: Optional[Path] = None):
        self.kb_dir = kb_dir or settings.KNOWLEDGE_BASE_DIR
        self._load_knowledge_base()

    def _load_knowledge_base(self):
        rec_path = self.kb_dir / "recommendation_rules.json"
        pqc_path = self.kb_dir / "pqc_algorithms.json"

        with open(rec_path, "r", encoding="utf-8") as f:
            self.recommendation_rules = json.load(f).get("rules", [])

        with open(pqc_path, "r", encoding="utf-8") as f:
            self.pqc_db = json.load(f).get("algorithms", {})

    def recommend(self, finding: DiscoveredFinding) -> Dict[str, Any]:
        """
        Determines purpose-aware PQC / hybrid migration target according to NIST FIPS 203/204/205.
        Strictly prevents improper cross-primitive mappings (e.g. RSA signature != ML-KEM).
        """
        algo_name = finding.algorithm.upper()
        purpose = finding.purpose.lower() if finding.purpose else "unknown"

        # Match against knowledge base rules
        for rule in self.recommendation_rules:
            rule_purpose = rule.get("purpose", "")
            target_algos = [a.upper() for a in rule.get("target_algorithms", [])]

            purpose_matches = (rule_purpose == purpose) or (purpose == "unknown" and any(a in algo_name for a in target_algos))
            algo_matches = any(a in algo_name for a in target_algos)

            if purpose_matches and algo_matches:
                return {
                    "recommended_pqc": rule["recommended_pqc"],
                    "parameter_set": rule.get("recommended_parameter_set"),
                    "alternative_pqc": rule.get("alternative_pqc"),
                    "alternative_parameter_set": rule.get("alternative_parameter_set"),
                    "rationale": rule["rationale"],
                    "tradeoffs_json": rule.get("tradeoffs", {}),
                    "migration_complexity": rule.get("migration_complexity", "MEDIUM"),
                    "validation_required": rule.get("validation_required", True)
                }

        # Fallback for unrecognized or already safe primitives
        if "SHA-256" in algo_name or "SHA-384" in algo_name or "SHA-512" in algo_name:
            return {
                "recommended_pqc": "Retain Current Implementation",
                "parameter_set": algo_name,
                "alternative_pqc": "SHA3-256 / SHA3-384",
                "alternative_parameter_set": "FIPS 202 Keccak",
                "rationale": f"{algo_name} provides robust classical and quantum collision resistance. No immediate replacement required.",
                "tradeoffs_json": {"status": "Quantum-Resistant"},
                "migration_complexity": "LOW",
                "validation_required": False
            }

        if "AES" in algo_name and (finding.key_size or 0) >= 256:
            return {
                "recommended_pqc": "Retain AES-256 (Grover-Resistant)",
                "parameter_set": "256-bit Key",
                "alternative_pqc": "ChaCha20-Poly1305",
                "alternative_parameter_set": "256-bit Key",
                "rationale": "AES-256 retains 128-bit quantum security against Grover's algorithm, satisfying NIST and CNSA 2.0 standards.",
                "tradeoffs_json": {"status": "Quantum-Resistant"},
                "migration_complexity": "LOW",
                "validation_required": False
            }

        return {
            "recommended_pqc": "Architectural Review Required",
            "parameter_set": "Custom Assessment",
            "alternative_pqc": None,
            "alternative_parameter_set": None,
            "rationale": f"Cryptographic usage of {algo_name} with purpose '{purpose}' requires specialized manual protocol review.",
            "tradeoffs_json": {"review_needed": True},
            "migration_complexity": "HIGH",
            "validation_required": True
        }
