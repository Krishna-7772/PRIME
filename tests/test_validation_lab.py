from app.validation.validation_lab import ValidationLab

def test_validation_lab_asymmetric_benchmark():
    result = ValidationLab.run_asymmetric_benchmark(
        classical_algo="RSA-2048",
        candidate_pqc="ML-DSA-65"
    )
    assert result["execution_status"] == "SUCCESS"
    assert result["classical"]["algorithm"] == "RSA-2048"
    assert result["classical"]["keygen_time_us"] > 0
    assert result["classical"]["sign_time_us"] > 0
    assert result["classical"]["verify_time_us"] > 0
    assert result["classical"]["signature_size_bytes"] == 256 # 2048 bits = 256 bytes

    assert result["candidate"]["algorithm"] == "ML-DSA-65"
    assert result["candidate"]["signature_size_bytes"] == 3309 # NIST FIPS 204 standard
    assert result["overhead"]["size_overhead_factor"] > 10.0

def test_validation_lab_key_exchange_benchmark():
    result = ValidationLab.run_key_exchange_benchmark(
        classical_algo="X25519",
        candidate_pqc="ML-KEM-768"
    )
    assert result["execution_status"] == "SUCCESS"
    assert result["classical"]["public_key_bytes"] == 32
    assert result["candidate"]["public_key_bytes"] == 1184 # NIST FIPS 203 standard
    assert result["candidate"]["ciphertext_bytes"] == 1088 # NIST FIPS 203 standard
    assert "hybrid_rfc10024" in result
    assert result["hybrid_rfc10024"]["total_public_key_bytes"] == 1216 # 32 + 1184
