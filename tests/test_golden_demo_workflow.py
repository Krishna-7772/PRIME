from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_golden_demo_workflow_end_to_end():
    """
    Validates the Golden Demonstration Workflow (Section 38 & 48):
    Step 1: Create project.
    Step 2: Select BHARATPAY DEMO ENTERPRISE.
    Step 3: Start full scan.
    Step 4: Show actual scan progress / completion.
    Step 5: Complete source/dependency/certificate/container/binary analysis.
    Step 6: Show actual inventory.
    Step 7-9: Inspect RSA-2048: Purpose=Digital Signature, Confidence=Confirmed.
    Step 10-14: Risk, Mosca timing, Migration effort, Agility profile.
    Step 15: Dependency / blast radius graph.
    Step 16-17: PQC recommendation (ML-DSA) and migration package.
    Step 18-20: Migration validation lab running controlled PQ/T test with real timings.
    Step 21: CycloneDX 1.7 CBOM.
    Step 22: Executive report.
    Step 23-24: Second scan and Cryptographic Drift detection.
    """
    # Step 1: Create project
    proj_res = client.post("/api/v1/projects", json={
        "name": "BharatPay FinTech Production",
        "description": "Enterprise Core Payment and Auth Services",
        "organization": "National Technical Research Organisation (NTRO)",
        "business_criticality": "CRITICAL",
        "data_lifetime_years": 10.0,
        "migration_time_years": 3.0,
        "quantum_horizon_years": 10.0
    })
    assert proj_res.status_code == 200
    project = proj_res.json()
    project_id = project["id"]

    # Step 2 & 3: Start full scan on BharatPay demo directory
    scan_res = client.post(
        f"/api/v1/projects/{project_id}/scans",
        data={"repository_path": "demo/bharatpay"}
    )
    assert scan_res.status_code == 200
    scan1 = scan_res.json()

    # Step 4 & 5: Check scan completion and coverage
    assert scan1["status"] == "COMPLETED"
    assert scan1["findings_count"] > 0
    assert scan1["coverage_percentage"] > 0
    assert scan1["certificates_count"] >= 2
    assert scan1["libraries_count"] >= 2

    # Step 6: Show actual inventory
    assets_res = client.get(f"/api/v1/projects/{project_id}/assets")
    assert assets_res.status_code == 200
    assets = assets_res.json()
    assert len(assets) > 0

    # Step 7-9: Inspect RSA-2048
    rsa_finding = next((a for a in assets if a["algorithm"] == "RSA" and a.get("key_size") == 2048), None)
    assert rsa_finding is not None
    assert rsa_finding["purpose"] == "digital_signature"
    assert rsa_finding["confidence_classification"] == "CONFIRMED"

    # Step 10-14: Risk, Mosca timing, Agility profile
    assert rsa_finding["risk"]["quantum_exposure"] in ["HIGH", "CRITICAL"]
    assert rsa_finding["risk"]["mosca_status"] in ["AT_RISK", "MANAGEABLE"]
    assert rsa_finding["agility"] is not None
    assert "radar_data" in rsa_finding["agility"]
    assert len(rsa_finding["agility"]["radar_data"]) == 7

    # Step 15: Dependency / blast radius graph
    graph_res = client.get(f"/api/v1/projects/{project_id}/graph")
    assert graph_res.status_code == 200
    graph = graph_res.json()
    assert len(graph["nodes"]) > 0
    assert len(graph["edges"]) > 0

    # Step 16-17: PQC recommendation
    assert "ML-DSA" in rsa_finding["recommendation"]["recommended_pqc"]
    assert rsa_finding["migration"]["blast_radius_summary"] is not None

    # Step 18-20: Migration Validation Lab
    val_res = client.post("/api/v1/validation/benchmark", json={
        "benchmark_type": "ASYMMETRIC",
        "classical_algo": "RSA-2048",
        "candidate_pqc": "ML-DSA-65"
    })
    assert val_res.status_code == 200
    val_data = val_res.json()
    assert val_data["execution_status"] == "SUCCESS"
    assert val_data["classical"]["keygen_time_us"] > 0
    assert val_data["candidate"]["signature_size_bytes"] == 3309

    # Step 21: CycloneDX 1.7 CBOM
    cbom_res = client.get(f"/api/v1/projects/{project_id}/cbom")
    assert cbom_res.status_code == 200
    cbom = cbom_res.json()
    assert cbom["bomFormat"] == "CycloneDX"
    assert cbom["specVersion"] == "1.7"
    assert len(cbom["components"]) > 0

    # Step 22: Executive Report
    rep_res = client.get(f"/api/v1/projects/{project_id}/report")
    assert rep_res.status_code == 200
    assert "PRIME" in rep_res.text or "Cryptographic Audit" in rep_res.text

    # Step 23: Run second scan to test Cryptographic Drift
    scan2_res = client.post(
        f"/api/v1/projects/{project_id}/scans",
        data={"repository_path": "demo/bharatpay"}
    )
    assert scan2_res.status_code == 200
    scan2 = scan2_res.json()

    # Step 24: Show crypto drift
    drift_res = client.get(f"/api/v1/projects/{project_id}/drift")
    assert drift_res.status_code == 200
    drift_snapshots = drift_res.json()
    assert len(drift_snapshots) > 0
    snapshot = drift_snapshots[0]
    assert snapshot["scan_id"] == scan2["id"]
    assert snapshot["previous_scan_id"] == scan1["id"]
