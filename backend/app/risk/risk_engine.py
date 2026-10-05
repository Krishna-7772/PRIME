import json
from pathlib import Path
from typing import Dict, Any, Optional
from app.core.config import settings
from app.scanners.base import DiscoveredFinding

class RiskEngine:
    def __init__(self, kb_dir: Optional[Path] = None):
        self.kb_dir = kb_dir or settings.KNOWLEDGE_BASE_DIR
        self._load_knowledge_base()

    def _load_knowledge_base(self):
        algos_path = self.kb_dir / "algorithms.json"
        risk_path = self.kb_dir / "risk_rules.json"

        with open(algos_path, "r", encoding="utf-8") as f:
            self.algorithms_db = json.load(f).get("algorithms", {})

        with open(risk_path, "r", encoding="utf-8") as f:
            self.risk_db = json.load(f)

    def assess_risk(
        self,
        finding: DiscoveredFinding,
        business_criticality: str = "HIGH",
        data_lifetime_years: float = 10.0,
        migration_time_years: float = 3.0,
        quantum_horizon_years: float = 10.0
    ) -> Dict[str, Any]:
        """
        Calculates transparent, deterministic risk assessment combining:
        1. Mosca's Theorem (X + Y > Z)
        2. Quantum Vulnerability (Shor's algorithm on asymmetric primitives vs Grover's on symmetric)
        3. Cryptographic Hygiene (MD5, SHA-1, 3DES deprecation)
        4. Business Criticality weighting
        """
        algo_name = finding.algorithm.upper()
        algo_meta = self.algorithms_db.get(algo_name, {})
        
        family = finding.family or algo_meta.get("family", "unknown")
        purpose = finding.purpose or "unknown"
        key_size = finding.key_size or 0

        # 1. Quantum Exposure determination
        quantum_exposure = "LOW"
        quantum_vulnerable = algo_meta.get("quantum_vulnerable", False)
        
        if "RSA" in algo_name or "ECDSA" in algo_name or "DH" in algo_name or "ED25519" in algo_name:
            quantum_vulnerable = True

        if quantum_vulnerable:
            if purpose in {"key_establishment", "encryption", "protocol_security"}:
                quantum_exposure = "CRITICAL" # Subject to Store-Now-Decrypt-Later (SNDL)
            else:
                quantum_exposure = "HIGH" # Digital signatures & certificates
        elif family == "symmetric":
            if key_size > 0 and key_size <= 128:
                quantum_exposure = "MEDIUM" # Grover speedup reduces to <= 64 bits
            else:
                quantum_exposure = "LOW" # AES-256 retains 128-bit quantum security
        else:
            quantum_exposure = "LOW"

        # 2. Cryptographic Hygiene determination
        hygiene_risk = "CLEAN"
        if algo_name in {"MD5", "SHA-1", "3DES", "DES", "RC4"}:
            hygiene_risk = "CRITICAL"
        elif "RSA" in algo_name and key_size > 0 and key_size < 2048:
            hygiene_risk = "CRITICAL" # Sub-2048 bit RSA is broken classically

        # 3. Mosca's Theorem Calculation
        # Condition: X + Y > Z => Vulnerability window exists
        mosca_exposure_sum = data_lifetime_years + migration_time_years
        mosca_margin = mosca_exposure_sum - quantum_horizon_years
        
        if quantum_vulnerable:
            if mosca_margin > 0:
                mosca_status = "AT_RISK"
            elif mosca_margin == 0:
                mosca_status = "CRITICAL_URGENCY"
            else:
                mosca_status = "MANAGEABLE"
        else:
            mosca_status = "NOT_APPLICABLE"

        # 4. Overall Numerical Risk Score (0 - 100)
        # Weights:
        # Base Quantum Weight: CRITICAL=50, HIGH=40, MEDIUM=20, LOW=5
        # Mosca Penalty: AT_RISK=+25, CRITICAL_URGENCY=+15
        # Business Criticality Multiplier: CRITICAL=1.2, HIGH=1.0, MEDIUM=0.8, LOW=0.6
        # Hygiene Penalty: CRITICAL=+25
        base_quantum = {"CRITICAL": 50, "HIGH": 40, "MEDIUM": 20, "LOW": 5, "NONE": 0}.get(quantum_exposure, 10)
        mosca_bonus = 25 if mosca_status == "AT_RISK" else (15 if mosca_status == "CRITICAL_URGENCY" else 0)
        hygiene_bonus = 25 if hygiene_risk == "CRITICAL" else 0
        
        raw_score = base_quantum + mosca_bonus + hygiene_bonus
        
        crit_multiplier = {"CRITICAL": 1.25, "HIGH": 1.0, "MEDIUM": 0.8, "LOW": 0.6}.get(business_criticality, 1.0)
        final_score = min(100.0, round(raw_score * crit_multiplier, 1))

        # 5. Overall Risk Level
        if final_score >= 75.0 or hygiene_risk == "CRITICAL":
            overall_risk = "CRITICAL"
        elif final_score >= 50.0:
            overall_risk = "HIGH"
        elif final_score >= 25.0:
            overall_risk = "MEDIUM"
        else:
            overall_risk = "LOW"

        # 6. Detailed Transparent Explanation
        explanation = self._build_explanation(
            algo_name=algo_name,
            key_size=key_size,
            purpose=purpose,
            family=family,
            quantum_exposure=quantum_exposure,
            hygiene_risk=hygiene_risk,
            mosca_status=mosca_status,
            data_lifetime=data_lifetime_years,
            migration_time=migration_time_years,
            horizon=quantum_horizon_years,
            mosca_margin=mosca_margin,
            criticality=business_criticality,
            final_score=final_score,
            overall_risk=overall_risk
        )

        return {
            "overall_risk": overall_risk,
            "quantum_exposure": quantum_exposure,
            "hygiene_risk": hygiene_risk,
            "mosca_status": mosca_status,
            "data_lifetime_years": data_lifetime_years,
            "migration_time_years": migration_time_years,
            "quantum_horizon_years": quantum_horizon_years,
            "mosca_margin_years": round(mosca_margin, 2),
            "risk_score": final_score,
            "explanation_markdown": explanation
        }

    def _build_explanation(
        self,
        algo_name: str,
        key_size: int,
        purpose: str,
        family: str,
        quantum_exposure: str,
        hygiene_risk: str,
        mosca_status: str,
        data_lifetime: float,
        migration_time: float,
        horizon: float,
        mosca_margin: float,
        criticality: str,
        final_score: float,
        overall_risk: str
    ) -> str:
        lines = [
            f"### Deterministic Risk Assessment: **{overall_risk}** (Score: {final_score}/100)",
            "",
            f"- **Algorithm & Primitive**: `{algo_name}` ({family}) | Key Size: `{key_size or 'N/A'}`",
            f"- **Classified Purpose**: `{purpose}`",
            f"- **Quantum Threat Category**: `{quantum_exposure}`"
        ]

        if quantum_exposure in {"CRITICAL", "HIGH"}:
            if purpose in {"key_establishment", "encryption", "protocol_security"}:
                lines.append(
                    "> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. "
                    "Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) "
                    "emerges to break the discrete log or factorization keys."
                )
            else:
                lines.append(
                    "> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, "
                    "invalidating non-repudiation and identity verification."
                )

        if hygiene_risk == "CRITICAL":
            lines.append(
                f"> **Immediate Hygiene Failure**: `{algo_name}` possesses severe known classical cryptanalytic flaws. "
                "Immediate remediation is required regardless of quantum timelines."
            )

        lines.extend([
            "",
            "#### Mosca's Theorem Formulation ($X + Y > Z$):",
            f"- **Data Shelf-Life ($X$)**: `{data_lifetime} years`",
            f"- **Migration Time ($Y$)**: `{migration_time} years`",
            f"- **Quantum Threat Horizon ($Z$)**: `{horizon} years`",
            f"- **Equation Evaluation**: ${data_lifetime} + {migration_time} = {data_lifetime + migration_time:.1f} > {horizon}$",
            f"- **Mosca Status**: `{mosca_status}` (Vulnerability Window: `{mosca_margin:+.1f} years`)"
        ])

        if mosca_status == "AT_RISK":
            lines.append(
                "> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. "
                "Data protected by this primitive will remain exposed before migration can finish."
            )

        lines.extend([
            "",
            f"- **Business Context**: Application criticality is `{criticality}`."
        ])

        return "\n".join(lines)
