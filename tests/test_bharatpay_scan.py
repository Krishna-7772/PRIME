import pytest
from pathlib import Path
from app.scanners.orchestrator import ScannerOrchestrator

def test_bharatpay_full_scan():
    demo_path = Path(__file__).resolve().parent.parent / "demo" / "bharatpay"
    assert demo_path.exists()

    orchestrator = ScannerOrchestrator()
    result = orchestrator.run_all_scanners(str(demo_path))

    findings = result["findings"]
    algos = {f.algorithm for f in findings}
    
    print("\nDetected Algorithms in BharatPay:", algos)
    for f in findings:
        print(f"[{f.algorithm}] ({f.key_size or 'N/A'}) - Purpose: {f.purpose} - File: {f.file_path}:{f.line_number or 1} - Method: {f.detection_method}")

    # Core required detections
    assert "RSA" in algos
    assert "ECDSA" in algos
    assert "AES" in algos
    assert "SHA-256" in algos
    assert "3DES" in algos
    assert "MD5" in algos

    # Certificate checks
    cert_findings = [f for f in findings if f.purpose == "certificate"]
    assert len(cert_findings) >= 2

    # Container checks
    container_findings = [f for f in findings if "Container" in f.detection_method]
    assert len(container_findings) >= 1

    # Findings count
    assert result["findings_count"] >= 8
