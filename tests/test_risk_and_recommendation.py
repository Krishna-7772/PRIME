import pytest
from app.scanners.base import DiscoveredFinding
from app.risk.risk_engine import RiskEngine
from app.recommendation.recommendation_engine import RecommendationEngine

def test_risk_engine_rsa_high_risk():
    finding = DiscoveredFinding(
        algorithm="RSA",
        family="asymmetric",
        purpose="digital_signature",
        purpose_confidence="CONFIRMED",
        file_path="src/auth.py",
        line_number=42,
        key_size=2048,
        library="cryptography",
        confidence=0.98
    )

    risk_engine = RiskEngine()
    assessment = risk_engine.assess_risk(
        finding,
        business_criticality="CRITICAL",
        data_lifetime_years=12.0,
        migration_time_years=4.0,
        quantum_horizon_years=10.0
    )

    assert assessment["overall_risk"] in {"HIGH", "CRITICAL"}
    assert assessment["quantum_exposure"] in {"HIGH", "CRITICAL"}
    assert assessment["mosca_status"] == "AT_RISK"
    assert assessment["mosca_margin_years"] == 6.0 # (12 + 4) - 10 = 6
    assert "Mosca's Theorem" in assessment["explanation_markdown"]

def test_recommendation_engine_rsa_signature():
    finding = DiscoveredFinding(
        algorithm="RSA",
        family="asymmetric",
        purpose="digital_signature",
        purpose_confidence="CONFIRMED",
        file_path="src/auth.py",
        line_number=42,
        key_size=2048
    )
    rec_engine = RecommendationEngine()
    rec = rec_engine.recommend(finding)

    assert "ML-DSA" in rec["recommended_pqc"]
    assert "SLH-DSA" in rec["alternative_pqc"]
    assert rec["validation_required"] is True

def test_recommendation_engine_ecdh_key_exchange():
    finding = DiscoveredFinding(
        algorithm="ECDH",
        family="asymmetric",
        purpose="key_establishment",
        purpose_confidence="CONFIRMED",
        file_path="src/tunnel.py",
        line_number=10
    )
    rec_engine = RecommendationEngine()
    rec = rec_engine.recommend(finding)

    assert "ML-KEM" in rec["recommended_pqc"]

def test_recommendation_engine_aes():
    finding = DiscoveredFinding(
        algorithm="AES",
        family="symmetric",
        purpose="encryption",
        purpose_confidence="CONFIRMED",
        file_path="src/storage.py",
        line_number=20,
        key_size=128
    )
    rec_engine = RecommendationEngine()
    rec = rec_engine.recommend(finding)

    assert "AES-256" in rec["recommended_pqc"]
    assert "ML-KEM" not in rec["recommended_pqc"]
