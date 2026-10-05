from app.scanners.base import DiscoveredFinding
from app.agility.agility_engine import AgilityEngine
from app.policies.policy_engine import PolicyEngine
from app.drift.drift_engine import DriftEngine

def test_agility_engine_seven_dimensions():
    engine = AgilityEngine()
    finding = DiscoveredFinding(
        algorithm="RSA",
        family="asymmetric",
        purpose="digital_signature",
        purpose_confidence="CONFIRMED",
        key_size=2048,
        file_path="auth/signer.py",
        line_number=42,
        code_snippet="signature = private_key.sign(payload, padding.PSS())",
        detection_method="Python AST Scanner",
        confidence=0.95
    )

    agility = engine.assess_asset_agility(finding)
    assert "overall_agility_score" in agility
    assert 0.0 <= agility["overall_agility_score"] <= 4.0
    assert agility["agility_rating"] in ["VERY_LOW", "LOW", "MODERATE", "HIGH", "EXCELLENT"]
    assert len(agility["radar_data"]) == 7
    dims = [d["dimension"] for d in agility["radar_data"]]
    assert any("C1" in d for d in dims)
    assert any("C2" in d for d in dims)
    assert any("C3" in d for d in dims)
    assert any("C4" in d for d in dims)
    assert any("C5" in d for d in dims)
    assert any("E1" in d for d in dims)
    assert any("E2" in d for d in dims)

def test_policy_engine_violations():
    engine = PolicyEngine()
    assets = [
        {
            "asset_id": "ASSET-01",
            "algorithm": "MD5",
            "family": "hash",
            "purpose": "hashing",
            "file_path": "legacy/checksum.py",
            "line_number": 12,
            "code_snippet": "hashlib.md5(data).hexdigest()",
            "mosca_status": "MANAGEABLE"
        },
        {
            "asset_id": "ASSET-02",
            "algorithm": "RSA",
            "family": "asymmetric",
            "key_size": 1024,
            "purpose": "digital_signature",
            "file_path": "auth/token.py",
            "line_number": 88,
            "code_snippet": "rsa.generate_private_key(1024)",
            "mosca_status": "AT_RISK"
        }
    ]

    violations = engine.evaluate_findings(assets)
    assert len(violations) >= 2
    rule_codes = [v["policy_code"] for v in violations]
    assert "POL-001" in rule_codes # MD5 disallowed
    assert "POL-003" in rule_codes # RSA < 2048 disallowed
    assert "POL-005" in rule_codes # Mosca AT_RISK policy
