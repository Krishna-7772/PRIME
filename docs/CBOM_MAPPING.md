# PRIME — CycloneDX 1.7 CBOM Mapping Specification

**Standard**: CycloneDX v1.7 Specification (Cryptographic Bill of Materials)  
**Implementation**: `backend/app/reports/cbom_generator.py`  
**API Endpoint**: `GET /api/v1/projects/{project_id}/cbom`  

---

## 1. Overview

A Cryptographic Bill of Materials (CBOM) provides an inventory of cryptographic assets, algorithms, public keys, certificates, protocols, and library dependencies utilized within a software system.

PRIME generates standard **CycloneDX 1.7 JSON CBOM** files that can be consumed by enterprise governance platforms, SIEM tools, and automated compliance pipelines.

---

## 2. Component Mapping Schema

Every discovered cryptographic item is represented as a component of type `cryptographic-asset`:

```json
{
  "type": "cryptographic-asset",
  "bom-ref": "cbom:BharatPay FinTech:CRYPTO-0001",
  "name": "RSA",
  "version": "1.0",
  "description": "Cryptographic primitive RSA used for digital_signature",
  "cryptoProperties": {
    "assetType": "algorithm",
    "algorithmProperties": {
      "name": "RSA",
      "family": "asymmetric",
      "primitive": "digital_signature",
      "parameterSetIdentifier": "RSA-2048",
      "classicalSecurityLevel": 112,
      "nistQuantumSecurityLevel": 0
    },
    "detection": {
      "method": "Python AST Scanner",
      "confidence": 0.95,
      "confidenceClassification": "CONFIRMED",
      "provenance": "OBSERVED",
      "file": "auth-service/src/auth.py",
      "line": 42
    },
    "riskAssessment": {
      "overallRisk": "HIGH",
      "quantumExposure": "HIGH",
      "hygieneRisk": "CLEAN",
      "moscaStatus": "AT_RISK",
      "moscaMarginYears": 5.0
    },
    "pqcRecommendation": {
      "recommendedPQC": "ML-DSA (NIST FIPS 204)",
      "parameterSet": "ML-DSA-65",
      "alternativePQC": "SLH-DSA (NIST FIPS 205)",
      "rationale": "Direct post-quantum drop-in replacement for RSA digital signatures and JWT tokens."
    }
  },
  "evidence": {
    "occurrences": [
      {
        "location": "auth-service/src/auth.py",
        "line": 42,
        "snippet": "signature = private_key.sign(payload, padding.PSS(...))"
      }
    ]
  }
}
```

---

## 3. Provenance & Confidence Taxonomy

PRIME strictly differentiates the provenance of cryptographic findings to ensure transparency:

| Provenance Level | Description | Criteria |
|---|---|---|
| `OBSERVED` | Directly detected by static scanner | AST parser or X.509 ASN.1 parser directly observed the code structure or certificate byte sequence. |
| `INFERRED` | Contextually derived | Library declared in manifest without direct source call site observed, or inferred from network protocol cipher negotiation. |
| `DECLARED` | Administratively declared | Cloud KMS keys (AWS KMS, Azure Key Vault), HSM handles, or external supplier cryptographic statements imported manually. |

### Confidence Classification
- `CONFIRMED`: High-confidence parser observation with exact file and line number.
- `STRONG_INFERENCE`: Pattern match with high contextual corroboration.
- `WEAK_INFERENCE`: Passive string or symbol presence without call site confirmation.
- `UNVERIFIED`: Network probe or third-party artifact with ambiguous headers.
- `MANUAL`: User-declared or imported administrative metadata.
