from app.scanners.network.tls_scanner import TLSNetworkScanner
from app.reports.sarif_generator import SARIFGenerator
from app.models.entities import Project, Scan, CryptoAsset, Evidence, RiskAssessment, Recommendation

def test_tls_network_scanner_ssrf_protection():
    scanner = TLSNetworkScanner()

    # Blocked private IPs without explicit allowlist
    assert not scanner.is_ssrf_safe("192.168.1.1", allowlist=[])
    assert not scanner.is_ssrf_safe("10.0.0.5", allowlist=[])
    assert not scanner.is_ssrf_safe("127.0.0.1", allowlist=[])

    # Allowed when explicitly in user allowlist
    assert scanner.is_ssrf_safe("127.0.0.1", allowlist=["127.0.0.1"])
    assert scanner.is_ssrf_safe("localhost", allowlist=["localhost"])

def test_sarif_generator_conformance():
    proj = Project(name="Test Repo", business_criticality="HIGH")
    scan = Scan(project_id="test-proj-id", status="COMPLETED")
    asset = CryptoAsset(
        asset_id="CRYPTO-0001",
        project_id="test-proj-id",
        scan_id=scan.id,
        algorithm="RSA",
        purpose="digital_signature",
        purpose_confidence="CONFIRMED",
        file_path="src/auth.py",
        line_number=45,
        confidence=0.95
    )
    asset.evidence = Evidence(
        crypto_asset_id=asset.id,
        file_path="src/auth.py",
        line_start=45,
        code_snippet="key.sign(msg)",
        detection_rule="AST-RSA"
    )
    asset.risk = RiskAssessment(
        crypto_asset_id=asset.id,
        overall_risk="HIGH",
        quantum_exposure="HIGH",
        hygiene_risk="CLEAN",
        mosca_status="AT_RISK",
        explanation_markdown="Vulnerable to Shor"
    )
    asset.recommendation = Recommendation(
        crypto_asset_id=asset.id,
        recommended_pqc="ML-DSA-65",
        rationale="NIST FIPS 204 digital signature replacement"
    )
    scan.assets = [asset]

    sarif = SARIFGenerator.generate_sarif(proj, scan)
    assert sarif["version"] == "2.1.0"
    assert len(sarif["runs"]) == 1
    run = sarif["runs"][0]
    assert run["tool"]["driver"]["name"] == "PRIME"
    assert len(run["results"]) == 1
    res = run["results"][0]
    assert res["level"] == "error"
    assert "src/auth.py" in res["locations"][0]["physicalLocation"]["artifactLocation"]["uri"]
