import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "FIPS 203" in str(data["standards"])

def test_project_and_scan_lifecycle():
    # 1. Create Project
    proj_payload = {
        "name": "Integration Test Enterprise",
        "description": "Integration testing of cryptographic discovery pipeline",
        "organization": "NTRO Cyber Lab",
        "business_criticality": "CRITICAL",
        "data_lifetime_years": 10.0,
        "migration_time_years": 3.0,
        "quantum_horizon_years": 10.0
    }
    res = client.post("/api/v1/projects", json=proj_payload)
    assert res.status_code == 200
    project = res.json()
    project_id = project["id"]
    assert project["name"] == "Integration Test Enterprise"

    # 2. Trigger Scan on BharatPay demo directory
    scan_res = client.post(
        f"/api/v1/projects/{project_id}/scans",
        data={"repository_path": "demo/bharatpay"}
    )
    assert scan_res.status_code == 200
    scan = scan_res.json()
    assert scan["status"] == "COMPLETED"
    assert scan["findings_count"] > 0
    assert scan["certificates_count"] >= 2

    # 3. Retrieve Assets
    assets_res = client.get(f"/api/v1/projects/{project_id}/assets")
    assert assets_res.status_code == 200
    assets = assets_res.json()
    assert len(assets) > 0

    # Verify RSA-2048 asset
    rsa_asset = next((a for a in assets if a["algorithm"] == "RSA" and a.get("key_size") == 2048), None)
    assert rsa_asset is not None
    assert rsa_asset["evidence"] is not None
    assert rsa_asset["risk"] is not None
    assert rsa_asset["recommendation"] is not None
    assert rsa_asset["migration"] is not None

    # Check PQC recommendation on RSA asset
    rec = rsa_asset["recommendation"]
    assert "ML-DSA" in rec["recommended_pqc"]

    # 4. Check Asset Detail Endpoint
    asset_id = rsa_asset["id"]
    detail_res = client.get(f"/api/v1/assets/{asset_id}")
    assert detail_res.status_code == 200
    detail = detail_res.json()
    assert detail["asset_id"] == rsa_asset["asset_id"]

    # 5. Check Dashboard Endpoint
    dash_res = client.get(f"/api/v1/projects/{project_id}/dashboard")
    assert dash_res.status_code == 200
    dash = dash_res.json()
    assert dash["total_crypto_assets"] == len(assets)
    assert dash["quantum_exposed_assets"] > 0
    assert len(dash["top_migration_priorities"]) > 0

    # 6. Check Dependencies Endpoint (React Flow formatted)
    dep_res = client.get(f"/api/v1/projects/{project_id}/dependencies")
    assert dep_res.status_code == 200
    deps = dep_res.json()
    assert "nodes" in deps
    assert "edges" in deps
    assert len(deps["nodes"]) > 0

    # 7. Check CBOM Export Endpoint
    cbom_res = client.get(f"/api/v1/projects/{project_id}/cbom")
    assert cbom_res.status_code == 200
    cbom = cbom_res.json()
    assert cbom["bomFormat"] == "CycloneDX"
    assert cbom["specVersion"] == "1.6"
    assert len(cbom["components"]) > 0

    # 8. Check HTML Report Endpoint
    report_res = client.get(f"/api/v1/projects/{project_id}/report")
    assert report_res.status_code == 200
    assert "ECDAT Executive Cryptographic Audit" in report_res.text
