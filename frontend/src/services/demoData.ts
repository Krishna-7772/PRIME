// Auto-generated real demo dataset for offline / standalone prototype mode
import { Project, CryptoAsset, DependencyGraph, DashboardOverview, DriftSnapshot, PolicyViolation } from '../types';

export const OFFLINE_PROJECT: Project = ({
  "id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
  "name": "BharatPay Demo Enterprise",
  "description": "Simulated Indian FinTech core banking and payments platform.",
  "organization": "National Technical Research Organisation (NTRO)",
  "business_criticality": "CRITICAL",
  "data_lifetime_years": 12.0,
  "migration_time_years": 4.0,
  "quantum_horizon_years": 10.0,
  "created_at": "2026-10-05T17:59:30.581345",
  "updated_at": "2026-10-05T17:59:30.581345"
}) as any;

export const OFFLINE_DASHBOARD: DashboardOverview = ({
  "total_crypto_assets": 96,
  "quantum_exposed_assets": 44,
  "critical_risk_assets": 52,
  "high_risk_assets": 0,
  "medium_risk_assets": 0,
  "low_risk_assets": 44,
  "applications_affected": 5,
  "certificates_count": 12,
  "mosca_at_risk_count": 44,
  "average_agility_score": 1.48,
  "coverage_percentage": 90.9,
  "policy_violations_count": 56,
  "risk_distribution": {
    "CRITICAL": 52,
    "HIGH": 0,
    "MEDIUM": 0,
    "LOW": 44
  },
  "purpose_distribution": {
    "hashing": 24,
    "digital_signature": 24,
    "encryption": 28,
    "certificate": 12,
    "protocol_security": 8
  },
  "algorithm_distribution": {
    "SHA-256": 20,
    "RSA": 16,
    "AES": 8,
    "MD5": 4,
    "ECDSA": 8,
    "3DES": 4,
    "RSA/ECDSA": 8,
    "AES/SHA-256": 4,
    "RSA/ECDSA/AES": 8,
    "RSA/AES": 4,
    "OpenSSL": 4,
    "X.509 PKI Trust Store": 4,
    "OpenSSL libssl": 4
  },
  "top_migration_priorities": [
    {
      "id": "230ff81b-6167-4181-a719-ff0d8c4f08b1",
      "asset_id": "CRYPTO-0005",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
      "algorithm": "RSA",
      "family": "asymmetric",
      "key_size": 256,
      "curve": null,
      "purpose": "digital_signature",
      "purpose_confidence": "CONFIRMED",
      "confidence_classification": "CONFIRMED",
      "provenance": "OBSERVED",
      "quantum_status": "QUANTUM_VULNERABLE",
      "owner": "Security Engineering",
      "data_classification": "RESTRICTED",
      "application": "auth-service",
      "component": "src",
      "library": "pyjwt",
      "library_version": null,
      "file_path": "auth-service/src/auth.py",
      "line_number": 20,
      "confidence": 0.95,
      "detection_method": "Python AST (JWT signing)",
      "created_at": "2026-10-05T17:59:30.761342",
      "evidence": {
        "id": "c7d2ea86-3c45-49b7-8b92-e759dbd22c26",
        "file_path": "auth-service/src/auth.py",
        "line_start": 20,
        "line_end": 20,
        "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
        "detection_rule": "Python AST (JWT signing)",
        "ast_node_type": null,
        "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
      },
      "risk": {
        "id": "05f32eb9-90c0-4289-9c8b-2b41ffca8ba8",
        "overall_risk": "CRITICAL",
        "quantum_exposure": "HIGH",
        "hygiene_risk": "CRITICAL",
        "mosca_status": "AT_RISK",
        "data_lifetime_years": 12.0,
        "migration_time_years": 4.0,
        "quantum_horizon_years": 10.0,
        "mosca_margin_years": 6.0,
        "risk_score": 100.0,
        "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
      },
      "recommendation": {
        "id": "e08a3734-bfb2-4cdc-af44-7fa7ec4963ea",
        "recommended_pqc": "ML-DSA (FIPS 204)",
        "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
        "alternative_pqc": "SLH-DSA (FIPS 205)",
        "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
        "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
        "tradeoffs_json": {
          "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
          "public_key_size": "Public key is 1,952 bytes.",
          "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
        },
        "migration_complexity": "HIGH",
        "validation_required": true
      },
      "migration": {
        "id": "34563cbb-8d7e-4358-aaad-39414c1ec2ef",
        "affected_applications": 3,
        "affected_components": 2,
        "affected_libraries": 4,
        "affected_certificates": 1,
        "affected_configurations": 4,
        "migration_complexity": "CRITICAL",
        "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
        "review_items": [
          {
            "category": "Protocol & Buffer Sizing",
            "component": "auth-service / src",
            "status": "Potentially affected",
            "finding": "PQC signature expansion",
            "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
            "validation_priority": "CRITICAL"
          },
          {
            "category": "Client Interoperability",
            "component": "API Gateway & Client SDKs",
            "status": "Requires validation",
            "finding": "Downstream client support for NIST FIPS 204",
            "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Library Ecosystem",
            "component": "pyjwt",
            "status": "Requires validation",
            "finding": "PQC support in pyjwt",
            "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
            "validation_priority": "MEDIUM"
          },
          {
            "category": "PKI & Certificate Hierarchy",
            "component": "Certificate Authority / Trust Store",
            "status": "Potentially affected",
            "finding": "Quantum-vulnerable X.509 certificate chains",
            "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
            "validation_priority": "CRITICAL"
          }
        ]
      },
      "agility": {
        "id": "1109aad9-e782-4d19-aa39-288c46af534e",
        "c1_operation_coupling": 1.0,
        "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
        "c2_creation_coupling": 1.0,
        "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
        "c3_provider_coupling": 1.5,
        "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
        "c4_decoupling_mechanism": 2.0,
        "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
        "c5_decoupling_authority": 1.0,
        "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
        "e1_algorithm_migration": 1.5,
        "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
        "e2_provider_migration": 2.5,
        "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
        "overall_agility_score": 1.5,
        "agility_rating": "LOW",
        "radar_data": [
          {
            "dimension": "C1: Operation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C2: Creation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C3: Provider Coupling",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "C4: Decoupling Mechanism",
            "score": 2.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C5: Decoupling Authority",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E1: Algorithm Migration",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "E2: Provider Migration",
            "score": 2.5,
            "fullMark": 4.0
          }
        ],
        "recommendations": [
          "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
          "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
          "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
        ]
      }
    },
    {
      "id": "a923ba22-d934-4221-938d-fe56f1f89761",
      "asset_id": "CRYPTO-0005",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
      "algorithm": "RSA",
      "family": "asymmetric",
      "key_size": 256,
      "curve": null,
      "purpose": "digital_signature",
      "purpose_confidence": "CONFIRMED",
      "confidence_classification": "CONFIRMED",
      "provenance": "OBSERVED",
      "quantum_status": "QUANTUM_VULNERABLE",
      "owner": "Security Engineering",
      "data_classification": "RESTRICTED",
      "application": "auth-service",
      "component": "src",
      "library": "pyjwt",
      "library_version": null,
      "file_path": "auth-service/src/auth.py",
      "line_number": 20,
      "confidence": 0.95,
      "detection_method": "Python AST (JWT signing)",
      "created_at": "2026-10-05T17:59:30.918719",
      "evidence": {
        "id": "273e9aa0-1df6-4e45-be51-01f5a3d76380",
        "file_path": "auth-service/src/auth.py",
        "line_start": 20,
        "line_end": 20,
        "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
        "detection_rule": "Python AST (JWT signing)",
        "ast_node_type": null,
        "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
      },
      "risk": {
        "id": "5d465aa8-5f1f-4c01-9afc-47c863bf92f1",
        "overall_risk": "CRITICAL",
        "quantum_exposure": "HIGH",
        "hygiene_risk": "CRITICAL",
        "mosca_status": "AT_RISK",
        "data_lifetime_years": 12.0,
        "migration_time_years": 4.0,
        "quantum_horizon_years": 10.0,
        "mosca_margin_years": 6.0,
        "risk_score": 100.0,
        "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
      },
      "recommendation": {
        "id": "094a019e-5e94-42d5-ac70-575775849264",
        "recommended_pqc": "ML-DSA (FIPS 204)",
        "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
        "alternative_pqc": "SLH-DSA (FIPS 205)",
        "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
        "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
        "tradeoffs_json": {
          "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
          "public_key_size": "Public key is 1,952 bytes.",
          "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
        },
        "migration_complexity": "HIGH",
        "validation_required": true
      },
      "migration": {
        "id": "b17a6290-089c-4f8f-9bb9-08c8bfab83e1",
        "affected_applications": 3,
        "affected_components": 2,
        "affected_libraries": 4,
        "affected_certificates": 1,
        "affected_configurations": 4,
        "migration_complexity": "CRITICAL",
        "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
        "review_items": [
          {
            "category": "Protocol & Buffer Sizing",
            "component": "auth-service / src",
            "status": "Potentially affected",
            "finding": "PQC signature expansion",
            "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
            "validation_priority": "CRITICAL"
          },
          {
            "category": "Client Interoperability",
            "component": "API Gateway & Client SDKs",
            "status": "Requires validation",
            "finding": "Downstream client support for NIST FIPS 204",
            "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Library Ecosystem",
            "component": "pyjwt",
            "status": "Requires validation",
            "finding": "PQC support in pyjwt",
            "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
            "validation_priority": "MEDIUM"
          },
          {
            "category": "PKI & Certificate Hierarchy",
            "component": "Certificate Authority / Trust Store",
            "status": "Potentially affected",
            "finding": "Quantum-vulnerable X.509 certificate chains",
            "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
            "validation_priority": "CRITICAL"
          }
        ]
      },
      "agility": {
        "id": "65d23f45-08b1-48e9-b6b2-9b6e97a94350",
        "c1_operation_coupling": 1.0,
        "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
        "c2_creation_coupling": 1.0,
        "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
        "c3_provider_coupling": 1.5,
        "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
        "c4_decoupling_mechanism": 2.0,
        "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
        "c5_decoupling_authority": 1.0,
        "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
        "e1_algorithm_migration": 1.5,
        "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
        "e2_provider_migration": 2.5,
        "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
        "overall_agility_score": 1.5,
        "agility_rating": "LOW",
        "radar_data": [
          {
            "dimension": "C1: Operation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C2: Creation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C3: Provider Coupling",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "C4: Decoupling Mechanism",
            "score": 2.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C5: Decoupling Authority",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E1: Algorithm Migration",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "E2: Provider Migration",
            "score": 2.5,
            "fullMark": 4.0
          }
        ],
        "recommendations": [
          "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
          "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
          "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
        ]
      }
    },
    {
      "id": "8661dbe3-1be3-4f8f-89c7-291a0e5ead54",
      "asset_id": "CRYPTO-0005",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
      "algorithm": "RSA",
      "family": "asymmetric",
      "key_size": 256,
      "curve": null,
      "purpose": "digital_signature",
      "purpose_confidence": "CONFIRMED",
      "confidence_classification": "CONFIRMED",
      "provenance": "OBSERVED",
      "quantum_status": "QUANTUM_VULNERABLE",
      "owner": "Security Engineering",
      "data_classification": "RESTRICTED",
      "application": "auth-service",
      "component": "src",
      "library": "pyjwt",
      "library_version": null,
      "file_path": "auth-service/src/auth.py",
      "line_number": 20,
      "confidence": 0.95,
      "detection_method": "Python AST (JWT signing)",
      "created_at": "2026-10-05T18:00:22.416649",
      "evidence": {
        "id": "ed46622b-58a2-4820-bbe7-e70d88b5483f",
        "file_path": "auth-service/src/auth.py",
        "line_start": 20,
        "line_end": 20,
        "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
        "detection_rule": "Python AST (JWT signing)",
        "ast_node_type": null,
        "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
      },
      "risk": {
        "id": "c96bdf11-a4cc-4c06-989c-2b333d25e1ac",
        "overall_risk": "CRITICAL",
        "quantum_exposure": "HIGH",
        "hygiene_risk": "CRITICAL",
        "mosca_status": "AT_RISK",
        "data_lifetime_years": 12.0,
        "migration_time_years": 4.0,
        "quantum_horizon_years": 10.0,
        "mosca_margin_years": 6.0,
        "risk_score": 100.0,
        "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
      },
      "recommendation": {
        "id": "b212d390-9975-467b-91bb-cd74c8b3acdd",
        "recommended_pqc": "ML-DSA (FIPS 204)",
        "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
        "alternative_pqc": "SLH-DSA (FIPS 205)",
        "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
        "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
        "tradeoffs_json": {
          "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
          "public_key_size": "Public key is 1,952 bytes.",
          "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
        },
        "migration_complexity": "HIGH",
        "validation_required": true
      },
      "migration": {
        "id": "5e34a953-8a2d-424b-a003-75cf3877a04d",
        "affected_applications": 3,
        "affected_components": 2,
        "affected_libraries": 4,
        "affected_certificates": 1,
        "affected_configurations": 4,
        "migration_complexity": "CRITICAL",
        "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
        "review_items": [
          {
            "category": "Protocol & Buffer Sizing",
            "component": "auth-service / src",
            "status": "Potentially affected",
            "finding": "PQC signature expansion",
            "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
            "validation_priority": "CRITICAL"
          },
          {
            "category": "Client Interoperability",
            "component": "API Gateway & Client SDKs",
            "status": "Requires validation",
            "finding": "Downstream client support for NIST FIPS 204",
            "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Library Ecosystem",
            "component": "pyjwt",
            "status": "Requires validation",
            "finding": "PQC support in pyjwt",
            "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
            "validation_priority": "MEDIUM"
          },
          {
            "category": "PKI & Certificate Hierarchy",
            "component": "Certificate Authority / Trust Store",
            "status": "Potentially affected",
            "finding": "Quantum-vulnerable X.509 certificate chains",
            "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
            "validation_priority": "CRITICAL"
          }
        ]
      },
      "agility": {
        "id": "f1c60920-bb56-42ec-a311-70bbc6753df5",
        "c1_operation_coupling": 1.0,
        "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
        "c2_creation_coupling": 1.0,
        "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
        "c3_provider_coupling": 1.5,
        "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
        "c4_decoupling_mechanism": 2.0,
        "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
        "c5_decoupling_authority": 1.0,
        "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
        "e1_algorithm_migration": 1.5,
        "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
        "e2_provider_migration": 2.5,
        "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
        "overall_agility_score": 1.5,
        "agility_rating": "LOW",
        "radar_data": [
          {
            "dimension": "C1: Operation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C2: Creation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C3: Provider Coupling",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "C4: Decoupling Mechanism",
            "score": 2.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C5: Decoupling Authority",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E1: Algorithm Migration",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "E2: Provider Migration",
            "score": 2.5,
            "fullMark": 4.0
          }
        ],
        "recommendations": [
          "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
          "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
          "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
        ]
      }
    },
    {
      "id": "b28ed83e-7e34-4eb4-9c0c-b7800f2b0471",
      "asset_id": "CRYPTO-0005",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
      "algorithm": "RSA",
      "family": "asymmetric",
      "key_size": 256,
      "curve": null,
      "purpose": "digital_signature",
      "purpose_confidence": "CONFIRMED",
      "confidence_classification": "CONFIRMED",
      "provenance": "OBSERVED",
      "quantum_status": "QUANTUM_VULNERABLE",
      "owner": "Security Engineering",
      "data_classification": "RESTRICTED",
      "application": "auth-service",
      "component": "src",
      "library": "pyjwt",
      "library_version": null,
      "file_path": "auth-service/src/auth.py",
      "line_number": 20,
      "confidence": 0.95,
      "detection_method": "Python AST (JWT signing)",
      "created_at": "2026-10-05T18:00:22.590115",
      "evidence": {
        "id": "36556207-d95c-4fb6-bc8e-92b227678ac0",
        "file_path": "auth-service/src/auth.py",
        "line_start": 20,
        "line_end": 20,
        "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
        "detection_rule": "Python AST (JWT signing)",
        "ast_node_type": null,
        "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
      },
      "risk": {
        "id": "ac8166c8-dbbc-42b5-a4f2-2e1823f43f64",
        "overall_risk": "CRITICAL",
        "quantum_exposure": "HIGH",
        "hygiene_risk": "CRITICAL",
        "mosca_status": "AT_RISK",
        "data_lifetime_years": 12.0,
        "migration_time_years": 4.0,
        "quantum_horizon_years": 10.0,
        "mosca_margin_years": 6.0,
        "risk_score": 100.0,
        "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
      },
      "recommendation": {
        "id": "11f3f5c2-a7e6-416d-9a13-2f85f22ad36b",
        "recommended_pqc": "ML-DSA (FIPS 204)",
        "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
        "alternative_pqc": "SLH-DSA (FIPS 205)",
        "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
        "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
        "tradeoffs_json": {
          "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
          "public_key_size": "Public key is 1,952 bytes.",
          "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
        },
        "migration_complexity": "HIGH",
        "validation_required": true
      },
      "migration": {
        "id": "cbeb263c-e95a-485d-b505-a239fd114d7d",
        "affected_applications": 3,
        "affected_components": 2,
        "affected_libraries": 4,
        "affected_certificates": 1,
        "affected_configurations": 4,
        "migration_complexity": "CRITICAL",
        "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
        "review_items": [
          {
            "category": "Protocol & Buffer Sizing",
            "component": "auth-service / src",
            "status": "Potentially affected",
            "finding": "PQC signature expansion",
            "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
            "validation_priority": "CRITICAL"
          },
          {
            "category": "Client Interoperability",
            "component": "API Gateway & Client SDKs",
            "status": "Requires validation",
            "finding": "Downstream client support for NIST FIPS 204",
            "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Library Ecosystem",
            "component": "pyjwt",
            "status": "Requires validation",
            "finding": "PQC support in pyjwt",
            "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
            "validation_priority": "MEDIUM"
          },
          {
            "category": "PKI & Certificate Hierarchy",
            "component": "Certificate Authority / Trust Store",
            "status": "Potentially affected",
            "finding": "Quantum-vulnerable X.509 certificate chains",
            "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
            "validation_priority": "CRITICAL"
          }
        ]
      },
      "agility": {
        "id": "57eef639-2a85-46f3-adee-44856ef33c1a",
        "c1_operation_coupling": 1.0,
        "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
        "c2_creation_coupling": 1.0,
        "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
        "c3_provider_coupling": 1.5,
        "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
        "c4_decoupling_mechanism": 2.0,
        "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
        "c5_decoupling_authority": 1.0,
        "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
        "e1_algorithm_migration": 1.5,
        "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
        "e2_provider_migration": 2.5,
        "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
        "overall_agility_score": 1.5,
        "agility_rating": "LOW",
        "radar_data": [
          {
            "dimension": "C1: Operation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C2: Creation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C3: Provider Coupling",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "C4: Decoupling Mechanism",
            "score": 2.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C5: Decoupling Authority",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E1: Algorithm Migration",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "E2: Provider Migration",
            "score": 2.5,
            "fullMark": 4.0
          }
        ],
        "recommendations": [
          "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
          "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
          "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
        ]
      }
    },
    {
      "id": "9ae54697-520d-43ef-928e-522e05fb1678",
      "asset_id": "CRYPTO-0017",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
      "algorithm": "RSA/ECDSA/AES",
      "family": "asymmetric",
      "key_size": null,
      "curve": null,
      "purpose": "encryption",
      "purpose_confidence": "INFERRED",
      "confidence_classification": "CONFIRMED",
      "provenance": "OBSERVED",
      "quantum_status": "QUANTUM_VULNERABLE",
      "owner": "Security Engineering",
      "data_classification": "RESTRICTED",
      "application": "Core Application",
      "component": "Cryptographic Module",
      "library": "cryptography",
      "library_version": "42.0.5",
      "file_path": "auth-service/requirements.txt",
      "line_number": 1,
      "confidence": 0.92,
      "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
      "created_at": "2026-10-05T17:59:30.809361",
      "evidence": {
        "id": "7ee19491-8c8d-430d-aed2-00010ccb9c22",
        "file_path": "auth-service/requirements.txt",
        "line_start": 1,
        "line_end": null,
        "code_snippet": "cryptography==42.0.5",
        "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
        "ast_node_type": null,
        "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '42.0.5'."
      },
      "risk": {
        "id": "1233dd02-7f1a-4676-bf93-9a28bd356a7e",
        "overall_risk": "CRITICAL",
        "quantum_exposure": "CRITICAL",
        "hygiene_risk": "CLEAN",
        "mosca_status": "AT_RISK",
        "data_lifetime_years": 12.0,
        "migration_time_years": 4.0,
        "quantum_horizon_years": 10.0,
        "mosca_margin_years": 6.0,
        "risk_score": 93.8,
        "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
      },
      "recommendation": {
        "id": "e29b493f-53ae-4bc3-86b9-690df206cc04",
        "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
        "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
        "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
        "alternative_parameter_set": "Symmetric-only envelope",
        "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
        "tradeoffs_json": {
          "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
          "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
        },
        "migration_complexity": "HIGH",
        "validation_required": true
      },
      "migration": {
        "id": "0e740f28-21c1-49d6-ae0d-304fc5bc98dc",
        "affected_applications": 1,
        "affected_components": 1,
        "affected_libraries": 1,
        "affected_certificates": 0,
        "affected_configurations": 4,
        "migration_complexity": "HIGH",
        "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0017) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
        "review_items": [
          {
            "category": "Protocol & Buffer Sizing",
            "component": "Core Application / Cryptographic Module",
            "status": "Potentially affected",
            "finding": "PQC signature expansion",
            "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
            "validation_priority": "CRITICAL"
          },
          {
            "category": "Client Interoperability",
            "component": "API Gateway & Client SDKs",
            "status": "Requires validation",
            "finding": "Downstream client support for NIST FIPS 204",
            "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Network MTU & Handshake",
            "component": "Transport Layer / Ingress",
            "status": "Potentially affected",
            "finding": "Ciphertext encapsulation overhead",
            "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
            "validation_priority": "HIGH"
          },
          {
            "category": "Library Ecosystem",
            "component": "cryptography",
            "status": "Requires validation",
            "finding": "PQC support in cryptography",
            "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
            "validation_priority": "MEDIUM"
          }
        ]
      },
      "agility": {
        "id": "21129dda-b6c7-4cfa-8069-d5a8e62205fc",
        "c1_operation_coupling": 1.0,
        "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
        "c2_creation_coupling": 1.0,
        "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
        "c3_provider_coupling": 1.5,
        "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
        "c4_decoupling_mechanism": 1.0,
        "c4_explanation": "Algorithm change requires source code modification and redeployment.",
        "c5_decoupling_authority": 1.0,
        "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
        "e1_algorithm_migration": 2.0,
        "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
        "e2_provider_migration": 2.0,
        "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
        "overall_agility_score": 1.36,
        "agility_rating": "LOW",
        "radar_data": [
          {
            "dimension": "C1: Operation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C2: Creation Coupling",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C3: Provider Coupling",
            "score": 1.5,
            "fullMark": 4.0
          },
          {
            "dimension": "C4: Decoupling Mechanism",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "C5: Decoupling Authority",
            "score": 1.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E1: Algorithm Migration",
            "score": 2.0,
            "fullMark": 4.0
          },
          {
            "dimension": "E2: Provider Migration",
            "score": 2.0,
            "fullMark": 4.0
          }
        ],
        "recommendations": [
          "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
          "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
          "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
          "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
        ]
      }
    }
  ],
  "recent_scans": [
    {
      "id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "target_type": "SOURCE_REPOSITORY",
      "status": "COMPLETED",
      "total_files": 11,
      "analyzed_files": 10,
      "supported_files": 10,
      "unsupported_files": 1,
      "skipped_files": 0,
      "failed_files": 0,
      "coverage_percentage": 90.9,
      "findings_count": 24,
      "certificates_count": 2,
      "libraries_count": 7,
      "binaries_count": 0,
      "containers_count": 3,
      "started_at": "2026-10-05T18:00:22.534109",
      "completed_at": "2026-10-05T18:00:22.637830",
      "error_message": null
    },
    {
      "id": "2d3c7e95-c142-424e-af44-7ab12736b765",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "target_type": "SOURCE_REPOSITORY",
      "status": "COMPLETED",
      "total_files": 11,
      "analyzed_files": 10,
      "supported_files": 10,
      "unsupported_files": 1,
      "skipped_files": 0,
      "failed_files": 0,
      "coverage_percentage": 90.9,
      "findings_count": 24,
      "certificates_count": 2,
      "libraries_count": 7,
      "binaries_count": 0,
      "containers_count": 3,
      "started_at": "2026-10-05T18:00:22.377956",
      "completed_at": "2026-10-05T18:00:22.496529",
      "error_message": null
    },
    {
      "id": "d6d7317b-6472-43e2-803e-9211943a9551",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "target_type": "SOURCE_REPOSITORY",
      "status": "COMPLETED",
      "total_files": 11,
      "analyzed_files": 10,
      "supported_files": 10,
      "unsupported_files": 1,
      "skipped_files": 0,
      "failed_files": 0,
      "coverage_percentage": 90.9,
      "findings_count": 24,
      "certificates_count": 2,
      "libraries_count": 7,
      "binaries_count": 0,
      "containers_count": 3,
      "started_at": "2026-10-05T17:59:30.879846",
      "completed_at": "2026-10-05T17:59:31.015108",
      "error_message": null
    },
    {
      "id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
      "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
      "target_type": "SOURCE_REPOSITORY",
      "status": "COMPLETED",
      "total_files": 11,
      "analyzed_files": 10,
      "supported_files": 10,
      "unsupported_files": 1,
      "skipped_files": 0,
      "failed_files": 0,
      "coverage_percentage": 90.9,
      "findings_count": 24,
      "certificates_count": 2,
      "libraries_count": 7,
      "binaries_count": 0,
      "containers_count": 3,
      "started_at": "2026-10-05T17:59:30.630140",
      "completed_at": "2026-10-05T17:59:30.836874",
      "error_message": null
    }
  ]
}) as any;

export const OFFLINE_ASSETS: CryptoAsset[] = ([
  {
    "id": "1f319d75-fc5a-42cb-b920-179346f87453",
    "asset_id": "CRYPTO-0001",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 6,
    "confidence": 0.97,
    "detection_method": "JavaScript API Matcher (crypto.createHash)",
    "created_at": "2026-10-05T17:59:30.732299",
    "evidence": {
      "id": "e3e07ab4-d311-43d9-8592-601825e3ccfa",
      "file_path": "api-gateway/src/server.js",
      "line_start": 6,
      "line_end": null,
      "code_snippet": "function hashClientRequest(body) {\n    // Generate SHA-256 integrity digest of incoming request payload\n    return crypto.createHash('sha256').update(body).digest('hex');\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createHash)",
      "ast_node_type": null,
      "context_notes": "Node.js native hash stream instantiated with SHA-256."
    },
    "risk": {
      "id": "d578dd47-45b9-443b-82a0-eabaa0b274a4",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "9151d192-28dc-4bc1-a88e-23d9cb50d442",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "dab0fb40-c20a-4c44-adea-ac72b734e442",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0001) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "4f7ecf4d-b179-4705-8be4-4f9dbb6cfdf9",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "82da183e-3483-4454-8c77-2e0b89bf15f3",
    "asset_id": "CRYPTO-0002",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "confidence": 0.98,
    "detection_method": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
    "created_at": "2026-10-05T17:59:30.736246",
    "evidence": {
      "id": "875fe5e2-4191-4d90-9b15-a14a04fd34b8",
      "file_path": "api-gateway/src/server.js",
      "line_start": 15,
      "line_end": null,
      "code_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
      "detection_rule": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
      "ast_node_type": null,
      "context_notes": "Node.js RSA key generation with modulus 2048 bits."
    },
    "risk": {
      "id": "a1d1c6d9-af67-4cb5-826b-7feb0b1663ad",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "0778f2a7-ac94-46f7-b947-df5dcd82af11",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "7bf95d18-b2ba-41cd-b6f4-9b6c5c304b7e",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0002) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "api-gateway / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "51c4a228-e114-462c-8f7a-df6c183ef37d",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.21,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "ac8af064-c52f-46db-baf0-684b1d296ec3",
    "asset_id": "CRYPTO-0003",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 11,
    "confidence": 0.96,
    "detection_method": "JavaScript API Matcher (crypto.createCipheriv)",
    "created_at": "2026-10-05T17:59:30.751374",
    "evidence": {
      "id": "e626965f-4093-467a-8fac-9cc737149f06",
      "file_path": "api-gateway/src/server.js",
      "line_start": 11,
      "line_end": null,
      "code_snippet": "function generateEphemeralSessionCipher(secretKey, iv) {\n    // AES-256-GCM envelope encryption for inter-service communication\n    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createCipheriv)",
      "ast_node_type": null,
      "context_notes": "Node.js symmetric cipher stream created for aes-256-gcm."
    },
    "risk": {
      "id": "60ef417d-4ebb-4cbc-ac4a-a29b186b3249",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "c6d747c2-da23-4dce-8f1d-a9d56b306ebe",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "7310fb36-ae62-4582-b26e-1321ccaad50e",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0003) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "7cdf4a46-a80f-4d4f-8ea9-0ba15d053829",
      "c1_operation_coupling": 3.0,
      "c1_explanation": "Operation parameters dynamically referenced via configuration or environment settings.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.5,
      "c4_explanation": "Algorithm or key parameters can be updated via configuration files without extensive code changes.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 2.07,
      "agility_rating": "MODERATE",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 3.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors."
      ]
    }
  },
  {
    "id": "9b7a713b-49ca-4704-87fb-5696db3d7c72",
    "asset_id": "CRYPTO-0004",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "confidence": 0.98,
    "detection_method": "Python AST (rsa.generate_private_key)",
    "created_at": "2026-10-05T17:59:30.757365",
    "evidence": {
      "id": "38a30093-8fb6-4b3d-8397-8a6210df2a16",
      "file_path": "auth-service/src/auth.py",
      "line_start": 11,
      "line_end": 14,
      "code_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
      "detection_rule": "Python AST (rsa.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found explicit RSA private key generation with modulus size 2048 bits."
    },
    "risk": {
      "id": "f565a92f-d4ed-433c-8119-1671385017f8",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "b4617c0a-79d5-470e-9d71-2865af17bf70",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "ab9bf0fb-f7cd-495d-86dc-6209bcb7a399",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0004) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "ff24ef02-bf23-4946-b0b2-b79455b6d315",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.29,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "230ff81b-6167-4181-a719-ff0d8c4f08b1",
    "asset_id": "CRYPTO-0005",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "pyjwt",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "confidence": 0.95,
    "detection_method": "Python AST (JWT signing)",
    "created_at": "2026-10-05T17:59:30.761342",
    "evidence": {
      "id": "c7d2ea86-3c45-49b7-8b92-e759dbd22c26",
      "file_path": "auth-service/src/auth.py",
      "line_start": 20,
      "line_end": 20,
      "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
      "detection_rule": "Python AST (JWT signing)",
      "ast_node_type": null,
      "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
    },
    "risk": {
      "id": "05f32eb9-90c0-4289-9c8b-2b41ffca8ba8",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 100.0,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "e08a3734-bfb2-4cdc-af44-7fa7ec4963ea",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "34563cbb-8d7e-4358-aaad-39414c1ec2ef",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "1109aad9-e782-4d19-aa39-288c46af534e",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "63385e80-3f2c-40d5-ad95-ee7a8ec8fbf7",
    "asset_id": "CRYPTO-0006",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 27,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T17:59:30.766252",
    "evidence": {
      "id": "a571df4b-dc3b-4a74-beee-236d2ed7cf04",
      "file_path": "auth-service/src/auth.py",
      "line_start": 27,
      "line_end": 27,
      "code_snippet": "            data,\n            padding.PSS(\n                mgf=padding.MGF1(hashes.SHA256()),\n                salt_length=padding.PSS.MAX_LENGTH\n            ),",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "19bf9349-bcf9-439d-82fa-f968c509a475",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "16be3c87-9209-4fe5-9c31-27864f07904e",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "15854db6-d112-4207-8a88-9a94868c0d01",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0006) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "35141408-0436-4bde-b82d-ab82504b9fc4",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "4a9068de-8bf0-4eac-8525-1c6cbe22e100",
    "asset_id": "CRYPTO-0007",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 30,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T17:59:30.771372",
    "evidence": {
      "id": "23d59a32-33de-46ab-87c6-f8589dd480b3",
      "file_path": "auth-service/src/auth.py",
      "line_start": 30,
      "line_end": 30,
      "code_snippet": "                salt_length=padding.PSS.MAX_LENGTH\n            ),\n            hashes.SHA256()\n        )\n        return signature",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "5579578f-de00-4669-b3d8-29fb45deaa6d",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "4c39c83d-7026-4a77-a866-15a2f3369d8f",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "25d6f76d-72ab-4565-a9c4-a5772d38f64b",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0007) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "83adcf52-0db2-48e9-8dea-cd3a03f8643d",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm SHA-256 directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "7edb3ae6-f302-4c9a-bc73-3a4232604674",
    "asset_id": "CRYPTO-0008",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 5,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T17:59:30.775369",
    "evidence": {
      "id": "065c066f-03c2-4396-adb6-0fc637c7973c",
      "file_path": "auth-service/src/session.py",
      "line_start": 5,
      "line_end": 5,
      "code_snippet": "def verify_api_token_hash(token: str) -> str:\n    # Compute SHA-256 digest for cached session lookup\n    return hashlib.sha256(token.encode('utf-8')).hexdigest()\n\ndef legacy_checksum(data: str) -> str:",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest SHA-256 invoked."
    },
    "risk": {
      "id": "6fdb13cd-f73a-49d9-beae-9de066e5e943",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "2629adb6-4891-40e5-b8fe-e0fdcfb8c2c4",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "5e112138-050e-45f2-a427-7850611a855e",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0008) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "6d948e7a-a667-41af-8c08-444d7d449b2c",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "d8f02ed6-fa84-4b1e-aea5-139cd22a4da6",
    "asset_id": "CRYPTO-0009",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "MD5",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T17:59:30.778295",
    "evidence": {
      "id": "e13bbe63-3a42-4231-8609-a92712a22b7e",
      "file_path": "auth-service/src/session.py",
      "line_start": 9,
      "line_end": 9,
      "code_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest MD5 invoked."
    },
    "risk": {
      "id": "3abadb62-cc3e-4449-9bda-b57d5e29f6b4",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `MD5` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `MD5` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "f75b842a-153f-4890-9e78-cf3bc9051f03",
      "recommended_pqc": "SHA-256 or SHA-384",
      "parameter_set": "FIPS 180-4 Secure Hash",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "Immediate hygiene upgrade required. MD5 and SHA-1 have classical collision vulnerabilities.",
      "tradeoffs_json": {
        "performance": "Fast and ubiquitous.",
        "consideration": "Verify digest length compatibility in calling modules."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "b7c5d54f-7d36-470a-aa13-3ae3cc21aa1b",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of MD5 (CRYPTO-0009) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "f832bd46-5055-4472-b860-1c2dd454248f",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "5051d0dc-87ee-4545-91c0-9199b8e78d6d",
    "asset_id": "CRYPTO-0010",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "SECP256R1",
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "confidence": 0.97,
    "detection_method": "Python AST (ec.generate_private_key)",
    "created_at": "2026-10-05T17:59:30.782366",
    "evidence": {
      "id": "a595da92-e76c-4616-8b46-71c08493a453",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 11,
      "line_end": 11,
      "code_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
      "detection_rule": "Python AST (ec.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found Elliptic Curve key generation for curve SECP256R1 (256 bits)."
    },
    "risk": {
      "id": "499f8960-6428-49b3-8ddb-0a6aacbe3137",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "073b98f2-098e-465d-ab1d-70ca76e28330",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "62d37054-97e4-41ba-91d0-13289563c007",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0010) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "payment-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "51cb19e1-a865-4dff-a1da-16eec1ff2627",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm ECDSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "374bb6cb-ae54-48c2-82f0-ca52685500b6",
    "asset_id": "CRYPTO-0011",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 16,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T17:59:30.785256",
    "evidence": {
      "id": "9f376fa5-91bd-44b9-a255-3273052b56d8",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 16,
      "line_end": 16,
      "code_snippet": "        iv = os.urandom(16)\n        # AES-256 symmetric cipher\n        cipher = Cipher(algorithms.AES(self.master_key), modes.CBC(iv))\n        encryptor = cipher.encryptor()\n        return iv + encryptor.update(plaintext) + encryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found AES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "9858a705-50d9-4d2e-8cc2-52e3f6ea8116",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "6f30047f-f311-4f45-bfc5-6267cbe5379a",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "2fabfc9d-dbb6-435d-af3c-d994eaf84d18",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0011) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "1de9029c-c59b-4609-8acb-433a6a98c816",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.79,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "fb6ccab3-501e-46ca-bee6-79caaa473745",
    "asset_id": "CRYPTO-0012",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "3DES",
    "family": "symmetric",
    "key_size": 168,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T17:59:30.788251",
    "evidence": {
      "id": "4411035b-8a01-43da-ad89-f14c9d0971f0",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 22,
      "line_end": 22,
      "code_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found 3DES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "1ac52c0a-3021-47db-bec5-06fc1b61d1a1",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `3DES` (symmetric) | Key Size: `168`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `3DES` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "4c1a81e7-8f25-4461-8b9e-77a81508cf5f",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "21defb23-489b-482b-a7f5-11c8e4a7166e",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of 3DES (CRYPTO-0012) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "5268a1cc-ee44-4da0-95ed-257f92dd3335",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "e74b409d-8cb1-4c41-8625-c6a1caa26ccc",
    "asset_id": "CRYPTO-0013",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "secp256r1",
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T17:59:30.791252",
    "evidence": {
      "id": "94d38ceb-5711-4444-9535-c9a6d2de97dd",
      "file_path": "certificates/bharatpay_ca_ec.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN'. Quantum-vulnerable ECDSA-256 key."
    },
    "risk": {
      "id": "ddebcb6e-3074-49e9-8a5d-64bf71d00aa6",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "d3f5c92e-0347-459e-90ca-9aee0c85b74c",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "0736d3aa-2a0c-41c8-8b48-f7a6cf1e350b",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0013) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "1f7d68a4-7c14-4ed6-aed6-c0e5bde64afc",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm ECDSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "e2db8a3f-93c5-4951-a25c-4be14f40d2d6",
    "asset_id": "CRYPTO-0014",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T17:59:30.798306",
    "evidence": {
      "id": "98b9973e-76e4-4180-bb42-f02ddae94e37",
      "file_path": "certificates/payment_gateway_rsa.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN'. Quantum-vulnerable RSA-2048 key."
    },
    "risk": {
      "id": "150ada68-5891-4618-9129-3aa915afe47d",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "2bc9f9c5-f88f-42a5-8653-9680638c411d",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "726eeb2f-5f0a-478b-b98f-8b4c94e9f3df",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0014) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "c64795ee-72bb-46c3-99f8-2da9b70e7ddb",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "1eb17f5b-3919-427f-880f-637b9a6dcdbf",
    "asset_id": "CRYPTO-0015",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "jsonwebtoken",
    "library_version": "^9.0.2",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T17:59:30.802374",
    "evidence": {
      "id": "5cbce118-dfe4-4969-9cc5-c2c8d9192abe",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'jsonwebtoken' version '^9.0.2'."
    },
    "risk": {
      "id": "7cba6a9a-03bb-4183-9fd1-7c7f5f4e8e5e",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "7e73f44f-3b7b-4ecf-9537-b69bd29c1866",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "108f97db-ce5a-449a-8406-4f7356516f59",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0015) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "jsonwebtoken",
          "status": "Requires validation",
          "finding": "PQC support in jsonwebtoken",
          "action": "Verify whether current runtime version of jsonwebtoken exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "69f2115a-5b06-4147-8d4e-cf9ff3c02c53",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "855a92b3-c1bc-46b1-bc03-88b72a613531",
    "asset_id": "CRYPTO-0016",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "AES/SHA-256",
    "family": "symmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "crypto-js",
    "library_version": "^4.2.0",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T17:59:30.806359",
    "evidence": {
      "id": "063a2769-b88c-4092-bcee-fcaa8c584421",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"crypto-js\": \"^4.2.0\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'crypto-js' version '^4.2.0'."
    },
    "risk": {
      "id": "0c00c059-7981-457c-a88d-eb0ca2004d41",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES/SHA-256` (symmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "f6d87ed6-be02-4fbf-ae4b-81899133bf28",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "c6209471-0a35-4b6c-b460-fd70169fd668",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES/SHA-256 (CRYPTO-0016) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "crypto-js",
          "status": "Requires validation",
          "finding": "PQC support in crypto-js",
          "action": "Verify whether current runtime version of crypto-js exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "bd30bdc3-164f-425f-a5fd-ba3adcfe63d6",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "9ae54697-520d-43ef-928e-522e05fb1678",
    "asset_id": "CRYPTO-0017",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.809361",
    "evidence": {
      "id": "7ee19491-8c8d-430d-aed2-00010ccb9c22",
      "file_path": "auth-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography==42.0.5",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '42.0.5'."
    },
    "risk": {
      "id": "1233dd02-7f1a-4676-bf93-9a28bd356a7e",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "e29b493f-53ae-4bc3-86b9-690df206cc04",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "0e740f28-21c1-49d6-ae0d-304fc5bc98dc",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0017) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "21129dda-b6c7-4cfa-8069-d5a8e62205fc",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "40127221-e906-422c-89a0-89be55031fc7",
    "asset_id": "CRYPTO-0018",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pyjwt",
    "library_version": "2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.812323",
    "evidence": {
      "id": "20550809-af8b-4a3e-850f-aa58f0e35a8f",
      "file_path": "auth-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pyjwt==2.8.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pyjwt' version '2.8.0'."
    },
    "risk": {
      "id": "50e7c3ec-f53b-49bb-8787-394cf67057df",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "d7e46be5-1891-4429-a441-45256b6f3389",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "ac774d4a-f97b-47fe-88d7-a78097e17b61",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0018) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "a46ae1b6-69c8-4375-9569-aa9bf2a793ed",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "f67d46f2-70b0-4c4d-ab5b-5b4832100551",
    "asset_id": "CRYPTO-0019",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "hashlib",
    "library_version": "unspecified",
    "file_path": "auth-service/requirements.txt",
    "line_number": 3,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.815844",
    "evidence": {
      "id": "e6c172be-0c71-4b0e-9e78-cd112821d3bc",
      "file_path": "auth-service/requirements.txt",
      "line_start": 3,
      "line_end": null,
      "code_snippet": "hashlib",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'hashlib' version 'unspecified'."
    },
    "risk": {
      "id": "eee18eb6-9605-47f2-95a9-029fd287a3d1",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "483365e3-e46e-4e80-9a00-8ef17e323e83",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "270eaa61-ee30-4683-a1df-098d2116f9cf",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0019) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "fbafad5c-a996-40b0-a001-e3659feb463b",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "fa2903ac-1921-402a-b355-a56645aa3fb1",
    "asset_id": "CRYPTO-0020",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.817846",
    "evidence": {
      "id": "9700184d-5cc2-4bb3-8270-2a294b070560",
      "file_path": "payment-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography>=41.0.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '41.0.0'."
    },
    "risk": {
      "id": "e01579a3-c703-4067-8804-df98f21a18be",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "7b1837b9-3cf3-4fb0-bad5-b01993a8b7cc",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "d82e72d8-8a02-41cd-96ec-cbf655bb2ea2",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0020) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "4d09f44e-9a2b-4016-b13f-461e56bc9fe2",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "ce227aa8-7ec0-40d3-99bb-860d969dc5e5",
    "asset_id": "CRYPTO-0021",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "RSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pycryptodome",
    "library_version": "3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.820845",
    "evidence": {
      "id": "9fafec8c-2e29-4eb9-ad95-7f64fdf44bcf",
      "file_path": "payment-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pycryptodome>=3.20.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pycryptodome' version '3.20.0'."
    },
    "risk": {
      "id": "2c4b0680-e891-49d5-a230-48eafdffe8cd",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "5440cfc9-43b2-41d3-a619-1d3b338ce7e4",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "df3755be-39c0-41cb-b2f3-ac96011dc782",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/AES (CRYPTO-0021) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pycryptodome",
          "status": "Requires validation",
          "finding": "PQC support in pycryptodome",
          "action": "Verify whether current runtime version of pycryptodome exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "0a081ec4-5441-4456-b9f7-04677eb81dbe",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "725c23b1-1731-4884-865d-4517c841bb50",
    "asset_id": "CRYPTO-0022",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "OpenSSL",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.822844",
    "evidence": {
      "id": "97fc6d2b-0878-4e7d-8afb-7238a2f46deb",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL'."
    },
    "risk": {
      "id": "fdd45b87-d2a5-4e17-961c-e08fae3eb3c7",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "a9bdb151-7ef3-49a7-986f-07af18de3e63",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "09f1a892-7b68-4b2c-9c33-0cbc558145fb",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL (CRYPTO-0022) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL",
          "action": "Verify whether current runtime version of OpenSSL exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "35775273-e994-4d64-af10-903f8a367e84",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "a494ee37-23b3-4442-86f9-d8618e456729",
    "asset_id": "CRYPTO-0023",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "X.509 PKI Trust Store",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "X.509 PKI Trust Store",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.824843",
    "evidence": {
      "id": "2bb410b6-fbbd-4248-bbb3-385db64df3b7",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'X.509 PKI Trust Store'."
    },
    "risk": {
      "id": "75ad0bb3-3e79-47dd-92a5-1d1f5a72c6c2",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `X.509 PKI TRUST STORE` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "5daaacd9-da62-42bb-a2a7-30738c7b26b0",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of X.509 PKI TRUST STORE with purpose 'certificate' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "3890bc36-50e6-4f0f-a6df-af5fdb1ff676",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of X.509 PKI Trust Store (CRYPTO-0023) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 PKI Trust Store",
          "status": "Requires validation",
          "finding": "PQC support in X.509 PKI Trust Store",
          "action": "Verify whether current runtime version of X.509 PKI Trust Store exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "e36e4a2d-cf2c-4715-9b93-950526a6903a",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "38404e9f-d730-4833-a216-6753c5e78cb8",
    "asset_id": "CRYPTO-0024",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "algorithm": "OpenSSL libssl",
    "family": "protocol",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL libssl",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.826843",
    "evidence": {
      "id": "4d72e0a0-f2e3-480b-b1dc-8ecc6e96d393",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL libssl'."
    },
    "risk": {
      "id": "be11c09a-0432-43f6-9cbf-d45fbfbbd7c0",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL LIBSSL` (protocol) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "c0264ce6-1653-4fe9-a020-56b330c1abef",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL LIBSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "0652a24f-c58f-4f83-8519-73a39a73f851",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL libssl (CRYPTO-0024) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL libssl",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL libssl",
          "action": "Verify whether current runtime version of OpenSSL libssl exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b70139f6-aeb0-426f-9876-84b3afaf6ae0",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "664f45d2-36ff-455d-84d9-87786a4b20d1",
    "asset_id": "CRYPTO-0001",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 6,
    "confidence": 0.97,
    "detection_method": "JavaScript API Matcher (crypto.createHash)",
    "created_at": "2026-10-05T17:59:30.910056",
    "evidence": {
      "id": "87c2f9d6-bdd0-4165-81a5-8d35ea6d193b",
      "file_path": "api-gateway/src/server.js",
      "line_start": 6,
      "line_end": null,
      "code_snippet": "function hashClientRequest(body) {\n    // Generate SHA-256 integrity digest of incoming request payload\n    return crypto.createHash('sha256').update(body).digest('hex');\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createHash)",
      "ast_node_type": null,
      "context_notes": "Node.js native hash stream instantiated with SHA-256."
    },
    "risk": {
      "id": "fffda3ea-8a79-4361-8192-cc892fd58193",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "2daa0ab0-ee6e-43a7-a9c3-90357929447f",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "54576e9b-214a-4917-bec0-3a5fc313f673",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0001) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b144d444-9c22-44c6-857f-9e56cdcbd7f1",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "f639753e-8d17-4ed9-b051-8ef38e102765",
    "asset_id": "CRYPTO-0002",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "confidence": 0.98,
    "detection_method": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
    "created_at": "2026-10-05T17:59:30.913060",
    "evidence": {
      "id": "d4360879-8cc7-4eab-a6f2-30496bd0b929",
      "file_path": "api-gateway/src/server.js",
      "line_start": 15,
      "line_end": null,
      "code_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
      "detection_rule": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
      "ast_node_type": null,
      "context_notes": "Node.js RSA key generation with modulus 2048 bits."
    },
    "risk": {
      "id": "ad947d3d-5d98-44d7-8c8c-4b0bdffe0fbe",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "0c95c677-0e7f-42ea-a76f-a94c20699293",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "391bb5fd-1205-48d5-9321-4fa22e54b715",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0002) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "api-gateway / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "179b2f31-9589-469b-9b31-7b8d7c3b82e5",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.21,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "0a489733-dc40-48ab-a8ad-3c0869e59109",
    "asset_id": "CRYPTO-0003",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 11,
    "confidence": 0.96,
    "detection_method": "JavaScript API Matcher (crypto.createCipheriv)",
    "created_at": "2026-10-05T17:59:30.914578",
    "evidence": {
      "id": "92946a6a-a3b3-4681-bead-21e6f3ffe826",
      "file_path": "api-gateway/src/server.js",
      "line_start": 11,
      "line_end": null,
      "code_snippet": "function generateEphemeralSessionCipher(secretKey, iv) {\n    // AES-256-GCM envelope encryption for inter-service communication\n    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createCipheriv)",
      "ast_node_type": null,
      "context_notes": "Node.js symmetric cipher stream created for aes-256-gcm."
    },
    "risk": {
      "id": "eb5512ee-d6d1-430c-a711-c9b7fd7034a8",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "e029e957-3569-460b-9b4f-2240856de152",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "c7527331-a968-4ac1-8beb-cedf8d4064d1",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0003) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "76d7873f-594f-44eb-8fb7-c605e85cd5b3",
      "c1_operation_coupling": 3.0,
      "c1_explanation": "Operation parameters dynamically referenced via configuration or environment settings.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.5,
      "c4_explanation": "Algorithm or key parameters can be updated via configuration files without extensive code changes.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 2.07,
      "agility_rating": "MODERATE",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 3.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors."
      ]
    }
  },
  {
    "id": "cd7a2dba-3438-43e7-8f7d-f59ba743cb19",
    "asset_id": "CRYPTO-0004",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "confidence": 0.98,
    "detection_method": "Python AST (rsa.generate_private_key)",
    "created_at": "2026-10-05T17:59:30.916710",
    "evidence": {
      "id": "f95a8cf7-2de8-484e-8a58-da7bdbf164ab",
      "file_path": "auth-service/src/auth.py",
      "line_start": 11,
      "line_end": 14,
      "code_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
      "detection_rule": "Python AST (rsa.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found explicit RSA private key generation with modulus size 2048 bits."
    },
    "risk": {
      "id": "b599bd3d-543f-4ce3-b3be-cef4e65ae3cc",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "03bae540-e7b9-4ebb-a0eb-622c8c464014",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "ec44826c-cbd1-46d5-ae83-b1fd7fd73b7f",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0004) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "a96634f6-8d1b-4465-92e3-60cc4bfea4a8",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.29,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "a923ba22-d934-4221-938d-fe56f1f89761",
    "asset_id": "CRYPTO-0005",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "pyjwt",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "confidence": 0.95,
    "detection_method": "Python AST (JWT signing)",
    "created_at": "2026-10-05T17:59:30.918719",
    "evidence": {
      "id": "273e9aa0-1df6-4e45-be51-01f5a3d76380",
      "file_path": "auth-service/src/auth.py",
      "line_start": 20,
      "line_end": 20,
      "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
      "detection_rule": "Python AST (JWT signing)",
      "ast_node_type": null,
      "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
    },
    "risk": {
      "id": "5d465aa8-5f1f-4c01-9afc-47c863bf92f1",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 100.0,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "094a019e-5e94-42d5-ac70-575775849264",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "b17a6290-089c-4f8f-9bb9-08c8bfab83e1",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "65d23f45-08b1-48e9-b6b2-9b6e97a94350",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "52ffd42c-10ca-410e-86f0-31019efbd295",
    "asset_id": "CRYPTO-0006",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 27,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T17:59:30.922921",
    "evidence": {
      "id": "52123536-33da-4951-b3e6-237141de5ecb",
      "file_path": "auth-service/src/auth.py",
      "line_start": 27,
      "line_end": 27,
      "code_snippet": "            data,\n            padding.PSS(\n                mgf=padding.MGF1(hashes.SHA256()),\n                salt_length=padding.PSS.MAX_LENGTH\n            ),",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "ffbe536e-2015-470f-9729-8d52490c242c",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "acf84e89-0aa3-47e6-9887-3f7f72d6a5bb",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "67a5d2b8-ed12-4a79-8db1-a7aca3f902e0",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0006) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "296dddef-a0c0-4f82-8abc-e56f266ddb23",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "010ae25f-4382-4f29-b446-99dd0268cdfa",
    "asset_id": "CRYPTO-0007",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 30,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T17:59:30.924918",
    "evidence": {
      "id": "9d507a98-61ad-41cd-84c3-ebc916417a66",
      "file_path": "auth-service/src/auth.py",
      "line_start": 30,
      "line_end": 30,
      "code_snippet": "                salt_length=padding.PSS.MAX_LENGTH\n            ),\n            hashes.SHA256()\n        )\n        return signature",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "52c91465-3547-479e-b0a4-0195c027e076",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "8384bd11-605c-4e5e-bde9-56d6835a0677",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "acaebf66-fe49-4eb1-82cc-a0b6559f7fcc",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0007) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "a7eb3ce7-3809-4662-805d-1f32e63006bf",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm SHA-256 directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "65f08a85-74f7-4767-ab12-427bb2b01126",
    "asset_id": "CRYPTO-0008",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 5,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T17:59:30.927960",
    "evidence": {
      "id": "8ee1f7a4-e6a3-4944-b95c-8761a77f3ce8",
      "file_path": "auth-service/src/session.py",
      "line_start": 5,
      "line_end": 5,
      "code_snippet": "def verify_api_token_hash(token: str) -> str:\n    # Compute SHA-256 digest for cached session lookup\n    return hashlib.sha256(token.encode('utf-8')).hexdigest()\n\ndef legacy_checksum(data: str) -> str:",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest SHA-256 invoked."
    },
    "risk": {
      "id": "28aaaf16-af8b-4706-a601-fb545a336964",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "6425e3df-bd84-44b6-b1da-15a8b4c8beef",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "9103e619-09d0-4029-8849-7b03fc7bc823",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0008) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "089f1d73-f1ae-441f-9154-b7dda0841cb4",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "f25df94b-b61d-40ee-af21-18d0f3bb1f80",
    "asset_id": "CRYPTO-0009",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "MD5",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T17:59:30.930004",
    "evidence": {
      "id": "dcdeed04-67c2-491e-ae45-63cd64b6b05b",
      "file_path": "auth-service/src/session.py",
      "line_start": 9,
      "line_end": 9,
      "code_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest MD5 invoked."
    },
    "risk": {
      "id": "9a1943ad-b7a9-40f9-ba0b-f10ca5a8810c",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `MD5` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `MD5` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "c76cdf47-ddb6-448b-a954-3aea0688a08c",
      "recommended_pqc": "SHA-256 or SHA-384",
      "parameter_set": "FIPS 180-4 Secure Hash",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "Immediate hygiene upgrade required. MD5 and SHA-1 have classical collision vulnerabilities.",
      "tradeoffs_json": {
        "performance": "Fast and ubiquitous.",
        "consideration": "Verify digest length compatibility in calling modules."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "8118d6a6-6709-4ec4-80d6-d3bb34122349",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of MD5 (CRYPTO-0009) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "a66f7ac7-8014-470c-9c0b-121aaa434008",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "f5eb8298-5ae5-4a00-825a-d001de498e4d",
    "asset_id": "CRYPTO-0010",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "SECP256R1",
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "confidence": 0.97,
    "detection_method": "Python AST (ec.generate_private_key)",
    "created_at": "2026-10-05T17:59:30.932967",
    "evidence": {
      "id": "1fef188a-d4b9-4e38-b5ec-bf54555f1864",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 11,
      "line_end": 11,
      "code_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
      "detection_rule": "Python AST (ec.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found Elliptic Curve key generation for curve SECP256R1 (256 bits)."
    },
    "risk": {
      "id": "07237ed4-cbe7-4545-99d6-07a2d6181050",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "7f960dca-0cc3-41fe-9493-cbc32dace0ce",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "4c5a0c01-5486-4778-964a-e3669124d9ee",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0010) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "payment-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "77bb9d08-b694-4fd0-a53a-1e2d045c30d5",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm ECDSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "5205ded5-deaf-4e8f-9163-74d6d250b998",
    "asset_id": "CRYPTO-0011",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 16,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T17:59:30.935966",
    "evidence": {
      "id": "997d0f5e-28b6-4358-a6ee-bb73665a3065",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 16,
      "line_end": 16,
      "code_snippet": "        iv = os.urandom(16)\n        # AES-256 symmetric cipher\n        cipher = Cipher(algorithms.AES(self.master_key), modes.CBC(iv))\n        encryptor = cipher.encryptor()\n        return iv + encryptor.update(plaintext) + encryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found AES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "5d50ce2a-7f7b-4818-8c06-5f7f133be1f8",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "585a22f9-77f0-465b-b5b2-ffa45764c744",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "5c8ba5e7-aebf-4a94-b931-53c8a7365547",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0011) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "113ea7a4-7440-41aa-8191-c710edb18ccf",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.79,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "4be5acae-eb92-4a36-aa5e-8e8c0c56728c",
    "asset_id": "CRYPTO-0012",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "3DES",
    "family": "symmetric",
    "key_size": 168,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T17:59:30.937918",
    "evidence": {
      "id": "dee4c395-b963-4603-8dc6-dd9162517712",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 22,
      "line_end": 22,
      "code_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found 3DES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "64fb74c2-25ea-44fd-b306-aa54f0d67bcc",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `3DES` (symmetric) | Key Size: `168`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `3DES` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "2ce4a6fd-7a11-4130-9aed-39754fe6d127",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "5ca65c06-9d6c-4de9-8069-2b7777545c56",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of 3DES (CRYPTO-0012) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "7da46bed-f807-4a1d-a908-e769849ae872",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "be9def6d-56f9-4510-9810-22cd9c441204",
    "asset_id": "CRYPTO-0013",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "secp256r1",
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T17:59:30.940972",
    "evidence": {
      "id": "3907348b-cb52-476a-826d-46790c6b1032",
      "file_path": "certificates/bharatpay_ca_ec.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN'. Quantum-vulnerable ECDSA-256 key."
    },
    "risk": {
      "id": "f57b50c0-b9f5-4480-8834-6352bf6273fb",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "8ca9f99d-6f30-4db3-a43c-4f4f2df6ad16",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "4dc97ea9-1e69-48ed-a835-feca099e3bab",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0013) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "d79c114a-aeb1-40d9-acb6-626f3536a402",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm ECDSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "0ada89e3-4a6d-47f9-9de1-82d36b6c6d25",
    "asset_id": "CRYPTO-0014",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T17:59:30.944954",
    "evidence": {
      "id": "a9a56644-e7c6-4eae-bfaf-9baad6599270",
      "file_path": "certificates/payment_gateway_rsa.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN'. Quantum-vulnerable RSA-2048 key."
    },
    "risk": {
      "id": "82a52c91-ad12-4d08-a9f7-c63f5c867f95",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "31cbb4d4-22fa-4a5b-9df4-1df609a0bc68",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "a9ac53cc-d141-4dab-9fea-7e26392bbbed",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0014) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "8815fedf-40ef-4326-a76e-5ba2951813b5",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "69a97a19-7313-4683-ba42-d8a4bf374da6",
    "asset_id": "CRYPTO-0015",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "jsonwebtoken",
    "library_version": "^9.0.2",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T17:59:30.948052",
    "evidence": {
      "id": "7583e5ed-f077-4c8c-b456-d564dfb8d76c",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'jsonwebtoken' version '^9.0.2'."
    },
    "risk": {
      "id": "2ca060ba-78df-4598-848e-f8a379defab0",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "1d8863f3-5808-456f-8286-70aecc77eea0",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "474ad320-10e9-441e-9315-ab85a2e85682",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0015) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "jsonwebtoken",
          "status": "Requires validation",
          "finding": "PQC support in jsonwebtoken",
          "action": "Verify whether current runtime version of jsonwebtoken exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "2cf717db-998e-4bfe-9008-e4370fd6535a",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "d8a7c383-ca6d-4a32-b78b-b4886e68b39d",
    "asset_id": "CRYPTO-0016",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "AES/SHA-256",
    "family": "symmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "crypto-js",
    "library_version": "^4.2.0",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T17:59:30.952052",
    "evidence": {
      "id": "3fd12a36-066c-4512-a2c0-1d72b24347d2",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"crypto-js\": \"^4.2.0\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'crypto-js' version '^4.2.0'."
    },
    "risk": {
      "id": "247450ba-54a4-4b1b-bac2-f3b57dbb0390",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES/SHA-256` (symmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "790a4a36-bf0f-4f0f-921a-8afb72b0e48c",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "ad245b08-5612-44f5-8947-36a400297f05",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES/SHA-256 (CRYPTO-0016) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "crypto-js",
          "status": "Requires validation",
          "finding": "PQC support in crypto-js",
          "action": "Verify whether current runtime version of crypto-js exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "708fc757-e30d-4924-a399-a87a7b55a86c",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "9b96ad33-9f49-45e3-9009-eb83a60f9ee2",
    "asset_id": "CRYPTO-0017",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.954045",
    "evidence": {
      "id": "c7f41c2d-c249-44df-9caa-24f78e351f82",
      "file_path": "auth-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography==42.0.5",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '42.0.5'."
    },
    "risk": {
      "id": "c2512100-b10f-4321-87fc-c75edd77c2b6",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "db916b84-2815-4db5-ac89-d70f8536786b",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "9204cc18-3e33-4598-8f95-112cd72278eb",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0017) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "1dd46191-b10f-4578-a407-23d3714a2884",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "518043b3-7a73-49d3-ba5a-bf85da663b54",
    "asset_id": "CRYPTO-0018",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pyjwt",
    "library_version": "2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.956987",
    "evidence": {
      "id": "67aa4856-e942-45dd-bafb-f2226c64eac9",
      "file_path": "auth-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pyjwt==2.8.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pyjwt' version '2.8.0'."
    },
    "risk": {
      "id": "c2dfd5a2-7f65-4841-813f-6bfe01b90a05",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "597cdd9e-582e-46f2-adc6-4f69c4d0f254",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "51490736-15b3-4996-b352-3c7a9e6b7195",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0018) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "f6dec4d7-eda0-45f8-829f-a51f09f7329c",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "a2ff9c63-2552-46cf-99db-475fd68b8fcf",
    "asset_id": "CRYPTO-0019",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "hashlib",
    "library_version": "unspecified",
    "file_path": "auth-service/requirements.txt",
    "line_number": 3,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.959924",
    "evidence": {
      "id": "f005ec6d-72db-4dae-a516-1f80eecd1d71",
      "file_path": "auth-service/requirements.txt",
      "line_start": 3,
      "line_end": null,
      "code_snippet": "hashlib",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'hashlib' version 'unspecified'."
    },
    "risk": {
      "id": "7100f2ef-8168-40de-ada3-8069b59177d4",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "122298a0-efd7-459f-9aee-9a703e217280",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a24711aa-3f4e-4399-8476-c2f678d2a48b",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0019) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "3eee0f12-8708-4738-9cc5-0a3f03c70c4f",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "93cdc335-8547-4e2d-aa12-348a10d0a05e",
    "asset_id": "CRYPTO-0020",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.963045",
    "evidence": {
      "id": "d27a6b71-d2f8-41d5-8cc3-3039b80461d3",
      "file_path": "payment-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography>=41.0.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '41.0.0'."
    },
    "risk": {
      "id": "3ad9b63a-cc42-4a61-9d34-2e543b7a94bd",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "99095529-0406-4d08-bbbb-fe4a0804099f",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "d2bff196-42ce-4ad4-9f2f-ad482f5a57d9",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0020) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "5a5cf6a7-7fd7-4702-ba75-7a9fff8e7032",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "02713ed3-a91e-4955-994a-0de5091d00f5",
    "asset_id": "CRYPTO-0021",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "RSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pycryptodome",
    "library_version": "3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T17:59:30.966047",
    "evidence": {
      "id": "2aac359d-7c4a-431e-b1fe-f436b5cd6c54",
      "file_path": "payment-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pycryptodome>=3.20.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pycryptodome' version '3.20.0'."
    },
    "risk": {
      "id": "1e98447f-e8cc-4602-aff5-48511e109322",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "0d2c0412-2183-455a-ba1c-7d76c89b68e7",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "319e8ff2-ec05-41ae-8806-9b8d1e8bb13f",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/AES (CRYPTO-0021) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pycryptodome",
          "status": "Requires validation",
          "finding": "PQC support in pycryptodome",
          "action": "Verify whether current runtime version of pycryptodome exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "d43fb2c7-3314-4440-aa35-f28e6d622d99",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "a8d7f1dc-843f-4ce6-86fd-0a83c68a2e86",
    "asset_id": "CRYPTO-0022",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "OpenSSL",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.969044",
    "evidence": {
      "id": "92852f65-bf3b-4793-968d-d7c8745c351f",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL'."
    },
    "risk": {
      "id": "b2fda501-b833-48a0-9e28-9881d31d976e",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "2f477a9e-a873-4291-b60d-7404134a7dbe",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "4f9feeec-b057-4c3e-b74a-7626bff8d511",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL (CRYPTO-0022) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL",
          "action": "Verify whether current runtime version of OpenSSL exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "edf00b15-a141-4b56-b9c2-22d623ec69a0",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "7732cac6-65b8-42c8-8a90-7232678eccee",
    "asset_id": "CRYPTO-0023",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "X.509 PKI Trust Store",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "X.509 PKI Trust Store",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.971036",
    "evidence": {
      "id": "3306096b-ba85-49be-8977-6302afe2b5d2",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'X.509 PKI Trust Store'."
    },
    "risk": {
      "id": "1756aa3a-1d62-4e68-8756-5d3d6c80b268",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `X.509 PKI TRUST STORE` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "5637a2de-3c67-48d7-b5c9-c1637150628e",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of X.509 PKI TRUST STORE with purpose 'certificate' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "ef7be132-608a-4187-a1a1-8531e5c912f4",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of X.509 PKI Trust Store (CRYPTO-0023) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 PKI Trust Store",
          "status": "Requires validation",
          "finding": "PQC support in X.509 PKI Trust Store",
          "action": "Verify whether current runtime version of X.509 PKI Trust Store exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "4d8ef510-1722-4c5c-a4a7-3e2ba584d5d6",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "7bd9b88e-7565-40e1-bade-19e77e046275",
    "asset_id": "CRYPTO-0024",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "algorithm": "OpenSSL libssl",
    "family": "protocol",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL libssl",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T17:59:30.972962",
    "evidence": {
      "id": "416a7ea1-3e9c-47ba-962d-2b9d718e24b4",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL libssl'."
    },
    "risk": {
      "id": "285a4da0-f353-4085-902f-8089505cc0f0",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL LIBSSL` (protocol) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "67b0a3dc-d43f-4742-8241-7a9bc968f42f",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL LIBSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "f6f3e83e-3f44-48c2-b78b-2dda7737bec5",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL libssl (CRYPTO-0024) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL libssl",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL libssl",
          "action": "Verify whether current runtime version of OpenSSL libssl exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "90e9325a-0310-4a66-8ce7-36b024d14b6d",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "e6104287-01b8-4445-bca3-33670f2e302f",
    "asset_id": "CRYPTO-0001",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 6,
    "confidence": 0.97,
    "detection_method": "JavaScript API Matcher (crypto.createHash)",
    "created_at": "2026-10-05T18:00:22.409637",
    "evidence": {
      "id": "a9b11743-4925-4ad7-afdc-b6980427ce7e",
      "file_path": "api-gateway/src/server.js",
      "line_start": 6,
      "line_end": null,
      "code_snippet": "function hashClientRequest(body) {\n    // Generate SHA-256 integrity digest of incoming request payload\n    return crypto.createHash('sha256').update(body).digest('hex');\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createHash)",
      "ast_node_type": null,
      "context_notes": "Node.js native hash stream instantiated with SHA-256."
    },
    "risk": {
      "id": "6eae4282-0abb-4e25-81f0-3648c4cfbe6b",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "41cf1f2f-21a5-4b5d-8ee2-cf2756afdf51",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "eee68bca-f5fb-4a6d-af21-0e510a5077ff",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0001) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "caa15736-6a12-45c2-8d69-a2f5c0f16ebc",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "ae05a3a3-8c1f-4b79-a33c-a4415085c97f",
    "asset_id": "CRYPTO-0002",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "confidence": 0.98,
    "detection_method": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
    "created_at": "2026-10-05T18:00:22.410635",
    "evidence": {
      "id": "df062d44-7e18-4b8d-ad57-4da134399d1a",
      "file_path": "api-gateway/src/server.js",
      "line_start": 15,
      "line_end": null,
      "code_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
      "detection_rule": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
      "ast_node_type": null,
      "context_notes": "Node.js RSA key generation with modulus 2048 bits."
    },
    "risk": {
      "id": "daf97837-3764-4fce-86e7-57d4e978ae7f",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "9af98ce5-d576-427c-b3ef-39109b395dbb",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "7887eada-4c19-4fe5-99f7-c969c5cc7db6",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0002) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "api-gateway / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "2977d381-d232-4963-9931-757522de64df",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.21,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "788fbde3-2ca6-4207-abd0-803b07909547",
    "asset_id": "CRYPTO-0003",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 11,
    "confidence": 0.96,
    "detection_method": "JavaScript API Matcher (crypto.createCipheriv)",
    "created_at": "2026-10-05T18:00:22.412650",
    "evidence": {
      "id": "d9cba7ba-fe2d-42cc-92d2-84f5cab65b0a",
      "file_path": "api-gateway/src/server.js",
      "line_start": 11,
      "line_end": null,
      "code_snippet": "function generateEphemeralSessionCipher(secretKey, iv) {\n    // AES-256-GCM envelope encryption for inter-service communication\n    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createCipheriv)",
      "ast_node_type": null,
      "context_notes": "Node.js symmetric cipher stream created for aes-256-gcm."
    },
    "risk": {
      "id": "ffb56228-2f28-437e-b3d0-89fd2f2f4143",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "54db0af5-82db-4b03-b931-0702f992f040",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a2c75917-a335-4585-bd3e-c1f631f27baf",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0003) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "90d8e86d-28f2-4768-8000-5bef2d0863ba",
      "c1_operation_coupling": 3.0,
      "c1_explanation": "Operation parameters dynamically referenced via configuration or environment settings.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.5,
      "c4_explanation": "Algorithm or key parameters can be updated via configuration files without extensive code changes.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 2.07,
      "agility_rating": "MODERATE",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 3.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors."
      ]
    }
  },
  {
    "id": "7a386fa8-8e52-4cb2-b6d6-b80c2814d816",
    "asset_id": "CRYPTO-0004",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "confidence": 0.98,
    "detection_method": "Python AST (rsa.generate_private_key)",
    "created_at": "2026-10-05T18:00:22.414652",
    "evidence": {
      "id": "2dc27f43-e9e2-4ab4-b381-961d33c752e0",
      "file_path": "auth-service/src/auth.py",
      "line_start": 11,
      "line_end": 14,
      "code_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
      "detection_rule": "Python AST (rsa.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found explicit RSA private key generation with modulus size 2048 bits."
    },
    "risk": {
      "id": "64270ad1-a819-486b-af45-e780e2de362a",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "15cc7d0c-4a48-485c-af1a-a949ffe26178",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "e212954d-a5b7-4986-b1a4-6fdd3d9960db",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0004) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "99a751af-3d39-478e-8b51-e7d0121110c6",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.29,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "8661dbe3-1be3-4f8f-89c7-291a0e5ead54",
    "asset_id": "CRYPTO-0005",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "pyjwt",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "confidence": 0.95,
    "detection_method": "Python AST (JWT signing)",
    "created_at": "2026-10-05T18:00:22.416649",
    "evidence": {
      "id": "ed46622b-58a2-4820-bbe7-e70d88b5483f",
      "file_path": "auth-service/src/auth.py",
      "line_start": 20,
      "line_end": 20,
      "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
      "detection_rule": "Python AST (JWT signing)",
      "ast_node_type": null,
      "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
    },
    "risk": {
      "id": "c96bdf11-a4cc-4c06-989c-2b333d25e1ac",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 100.0,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "b212d390-9975-467b-91bb-cd74c8b3acdd",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "5e34a953-8a2d-424b-a003-75cf3877a04d",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "f1c60920-bb56-42ec-a311-70bbc6753df5",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "29eb8746-fb1e-4fa1-b9e9-5aaf41eaea67",
    "asset_id": "CRYPTO-0006",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 27,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T18:00:22.418648",
    "evidence": {
      "id": "a2b6e05a-6d06-4659-9823-e3a489c58b61",
      "file_path": "auth-service/src/auth.py",
      "line_start": 27,
      "line_end": 27,
      "code_snippet": "            data,\n            padding.PSS(\n                mgf=padding.MGF1(hashes.SHA256()),\n                salt_length=padding.PSS.MAX_LENGTH\n            ),",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "9c73da93-43c7-4ff7-a4e5-653972401d1b",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "a7d1644a-8dcd-457c-a5e5-8fdeaa01abf1",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "8765966c-7bb8-4ec3-ba9d-40a88672c129",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0006) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "ec9def18-673e-4eb0-9d4b-3aa816326053",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "c1e12152-f44b-4a42-aa4f-074a2731a4ca",
    "asset_id": "CRYPTO-0007",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 30,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T18:00:22.420649",
    "evidence": {
      "id": "cdddda64-9c8c-4e44-a302-4dd67e6cb10c",
      "file_path": "auth-service/src/auth.py",
      "line_start": 30,
      "line_end": 30,
      "code_snippet": "                salt_length=padding.PSS.MAX_LENGTH\n            ),\n            hashes.SHA256()\n        )\n        return signature",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "fbf19d15-61f3-4a9e-9d99-65ac7bf03eca",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "d1af228d-fdd9-4709-b0e9-10ef1aa262d3",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a18892c9-e544-44b2-8b0e-e49a76490b1d",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0007) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "7a14c239-e832-41da-b76d-344f5cdbdc31",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm SHA-256 directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "af040b6e-d823-4c5f-a707-c8286641de19",
    "asset_id": "CRYPTO-0008",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 5,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T18:00:22.422649",
    "evidence": {
      "id": "e57e0c09-acc1-48cb-b240-1d4aaef41e50",
      "file_path": "auth-service/src/session.py",
      "line_start": 5,
      "line_end": 5,
      "code_snippet": "def verify_api_token_hash(token: str) -> str:\n    # Compute SHA-256 digest for cached session lookup\n    return hashlib.sha256(token.encode('utf-8')).hexdigest()\n\ndef legacy_checksum(data: str) -> str:",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest SHA-256 invoked."
    },
    "risk": {
      "id": "ab8ba48b-2fd1-47d1-abb6-b25b5724c91d",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "843edb15-6736-43a3-b008-ba12ddcd5f97",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a9aa82a7-3d42-465f-8cc2-5c33318249f1",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0008) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "7d3cded6-8a19-4a17-8011-81f3814c75e3",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "4a348513-54c6-4d9b-b7bf-36f60455d360",
    "asset_id": "CRYPTO-0009",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "MD5",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T18:00:22.424651",
    "evidence": {
      "id": "8dcfd635-4ee0-4f92-a6ae-1dc181adab2d",
      "file_path": "auth-service/src/session.py",
      "line_start": 9,
      "line_end": 9,
      "code_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest MD5 invoked."
    },
    "risk": {
      "id": "488ab304-b704-494d-80d6-12c5bc7051fd",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `MD5` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `MD5` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "e28360dc-39d4-4765-9f11-ff042b5b6bef",
      "recommended_pqc": "SHA-256 or SHA-384",
      "parameter_set": "FIPS 180-4 Secure Hash",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "Immediate hygiene upgrade required. MD5 and SHA-1 have classical collision vulnerabilities.",
      "tradeoffs_json": {
        "performance": "Fast and ubiquitous.",
        "consideration": "Verify digest length compatibility in calling modules."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a49814ee-733c-40cc-9917-80e213b84f78",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of MD5 (CRYPTO-0009) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "2dc509f9-5466-45eb-a626-223cc22dd1cc",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "9ac6c1bb-7b10-4fee-b400-f12f27f3fbf0",
    "asset_id": "CRYPTO-0010",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "SECP256R1",
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "confidence": 0.97,
    "detection_method": "Python AST (ec.generate_private_key)",
    "created_at": "2026-10-05T18:00:22.428650",
    "evidence": {
      "id": "dd97deb3-7376-4285-8ddd-1092e488a7fd",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 11,
      "line_end": 11,
      "code_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
      "detection_rule": "Python AST (ec.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found Elliptic Curve key generation for curve SECP256R1 (256 bits)."
    },
    "risk": {
      "id": "a3b248a2-e6f3-43ee-b415-fec8131a6cc3",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "c92f4fd4-9a2e-4166-9c76-60b824e8516c",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "9f27b73a-5640-444c-ada1-cb03ccc3cb63",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0010) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "payment-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "cbae0809-c940-45a1-a985-f6d0c2ea3576",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm ECDSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "08943b6d-06cf-4f85-bf9e-7f216dc4ad53",
    "asset_id": "CRYPTO-0011",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 16,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T18:00:22.431224",
    "evidence": {
      "id": "c260465f-ce56-497f-b3ad-660f8bde8779",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 16,
      "line_end": 16,
      "code_snippet": "        iv = os.urandom(16)\n        # AES-256 symmetric cipher\n        cipher = Cipher(algorithms.AES(self.master_key), modes.CBC(iv))\n        encryptor = cipher.encryptor()\n        return iv + encryptor.update(plaintext) + encryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found AES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "5b6a0fa6-b40a-47dd-904e-7f40c7db463a",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "71220e95-082c-4052-b456-784f41250633",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "c442742e-a73a-49fe-b5c4-bcf394a0e17c",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0011) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b642a382-9024-49bf-93ce-ea697eeb0df7",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.79,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "c2e00278-0dac-419f-94c9-e4e5ae324804",
    "asset_id": "CRYPTO-0012",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "3DES",
    "family": "symmetric",
    "key_size": 168,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T18:00:22.434256",
    "evidence": {
      "id": "5bdaa263-ea87-41ff-b669-e13c6099a47b",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 22,
      "line_end": 22,
      "code_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found 3DES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "00ef620b-cbd4-4c9d-86c6-c771a0565f63",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `3DES` (symmetric) | Key Size: `168`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `3DES` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "1cf5d22d-ac22-4194-88a6-7ffb6fce0512",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "f220084d-2dbd-4217-9165-8d48110b94ad",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of 3DES (CRYPTO-0012) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "2df3e66a-c5d5-486a-9205-9b5d470c8399",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "06dbc8e3-6841-4ce2-965e-a21ccb988f1c",
    "asset_id": "CRYPTO-0013",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "secp256r1",
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T18:00:22.437256",
    "evidence": {
      "id": "5e264022-9ba6-46ae-b164-038e723569d9",
      "file_path": "certificates/bharatpay_ca_ec.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN'. Quantum-vulnerable ECDSA-256 key."
    },
    "risk": {
      "id": "083144cf-2ec4-4241-b3d8-c9eae36772e8",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "55fc16df-af82-4021-8948-b571099c86ee",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "07cea3f4-3971-40be-8cbe-99d214cc7958",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0013) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "227be744-6ee1-4427-abf5-c0c1f556b978",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm ECDSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "12c5bb76-7d61-4953-b701-274598aad42d",
    "asset_id": "CRYPTO-0014",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T18:00:22.441258",
    "evidence": {
      "id": "c1bbc0d3-4955-4429-8e40-65f39669ebb1",
      "file_path": "certificates/payment_gateway_rsa.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN'. Quantum-vulnerable RSA-2048 key."
    },
    "risk": {
      "id": "36cc6356-b36c-4059-9a69-ec7ab4d04ebe",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "3f140107-688d-4eae-bdb3-b5f73be31613",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "35a200cb-36df-4f06-ae59-86016b154616",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0014) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "4842e2f4-9a7f-4ef2-8b9d-3a48fcc02058",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "b88e9596-819c-45f8-896a-2dd2924f0f2c",
    "asset_id": "CRYPTO-0015",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "jsonwebtoken",
    "library_version": "^9.0.2",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T18:00:22.444255",
    "evidence": {
      "id": "8cc1ff10-0d31-4280-8ba0-1c4cf0d4e1a3",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'jsonwebtoken' version '^9.0.2'."
    },
    "risk": {
      "id": "18bfa23c-3c02-46f1-812c-4edfd773215d",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "213a8798-decf-4870-b83d-2f0720ff5ecb",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "08bde078-575d-4f64-82a6-9c3d3fa3b28c",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0015) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "jsonwebtoken",
          "status": "Requires validation",
          "finding": "PQC support in jsonwebtoken",
          "action": "Verify whether current runtime version of jsonwebtoken exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b2647df7-8091-4fb8-840f-e6b602498b3a",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "9c537e06-2cec-4cb2-8eeb-8afbd1e28e21",
    "asset_id": "CRYPTO-0016",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "AES/SHA-256",
    "family": "symmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "crypto-js",
    "library_version": "^4.2.0",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T18:00:22.447251",
    "evidence": {
      "id": "06c9ebf9-8fda-4ee9-aee8-dbaa649106b7",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"crypto-js\": \"^4.2.0\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'crypto-js' version '^4.2.0'."
    },
    "risk": {
      "id": "3f0c7377-994f-4994-9b94-cc464605b6fe",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES/SHA-256` (symmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "d653ba73-c1a4-42a1-b74b-0c8692fe0461",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "e701fd5f-d1c0-4da0-b270-0afbe90a7026",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES/SHA-256 (CRYPTO-0016) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "crypto-js",
          "status": "Requires validation",
          "finding": "PQC support in crypto-js",
          "action": "Verify whether current runtime version of crypto-js exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "3f5dbb8b-c612-445a-881d-2d28162cce88",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "cf4d49bc-7733-45c2-8d02-32b9b5877c79",
    "asset_id": "CRYPTO-0017",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.450254",
    "evidence": {
      "id": "1443239f-089f-46ef-a46c-0db04624f5ec",
      "file_path": "auth-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography==42.0.5",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '42.0.5'."
    },
    "risk": {
      "id": "f92da87b-b30f-44e0-a8c0-7982cc2ef3d6",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "1c7231b1-1a58-4c50-a438-d10e82a03e6b",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "a4a7a0d9-0e32-46ff-8a7c-ad7f852cdc91",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0017) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "acc933e4-03d1-434b-a42d-592964fb0299",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "3dd2da04-925b-4957-900c-7a27c06a3fbe",
    "asset_id": "CRYPTO-0018",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pyjwt",
    "library_version": "2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.453254",
    "evidence": {
      "id": "92ec1db1-33d9-4b69-95df-0688b958808a",
      "file_path": "auth-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pyjwt==2.8.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pyjwt' version '2.8.0'."
    },
    "risk": {
      "id": "2b4e474b-7770-4ed0-88a6-12a01072d1d0",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "85bf8524-89ca-4e69-93df-de5a2aa1e1d0",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "8199eeab-3c25-491a-b5e4-e9c7f635a7fa",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0018) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "2f380025-2f5f-44fc-900c-96557568d22f",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "105c4c94-c2d2-4a09-a895-6fec6ad491a5",
    "asset_id": "CRYPTO-0019",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "hashlib",
    "library_version": "unspecified",
    "file_path": "auth-service/requirements.txt",
    "line_number": 3,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.456300",
    "evidence": {
      "id": "79dab6b7-9580-4bf9-9ffa-c2e8f488f7a0",
      "file_path": "auth-service/requirements.txt",
      "line_start": 3,
      "line_end": null,
      "code_snippet": "hashlib",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'hashlib' version 'unspecified'."
    },
    "risk": {
      "id": "81d713a1-c538-4195-b68c-8ac7046e9dd1",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "1fc839b4-dea3-4c6b-baa8-8d17b1756285",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "5cb086d2-1150-4b9d-ab42-a3b6327cb541",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0019) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "9f921746-a48b-44ab-bc91-52ca4c0203cb",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "9d1adca6-51fc-4c4e-bc73-24b06aec7fff",
    "asset_id": "CRYPTO-0020",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.458243",
    "evidence": {
      "id": "f8e29399-dc56-42dc-9d03-f5d5b4b1f153",
      "file_path": "payment-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography>=41.0.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '41.0.0'."
    },
    "risk": {
      "id": "54dfb182-af53-4f4d-9ee7-909ed2b9f238",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "0fe96711-e6ea-4267-b310-5d2714112925",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "b513b7a0-500b-464d-b216-72f1523317d9",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0020) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "f1d5ac0c-482d-45ff-bf91-3946c5793cfb",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "b588334d-73d2-4bae-b522-615316823af1",
    "asset_id": "CRYPTO-0021",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "RSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pycryptodome",
    "library_version": "3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.461350",
    "evidence": {
      "id": "51e74563-7fb1-435b-adaa-0fed805085ba",
      "file_path": "payment-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pycryptodome>=3.20.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pycryptodome' version '3.20.0'."
    },
    "risk": {
      "id": "5d2b18b1-09b1-4875-948f-eefd7fee67e5",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "8e576f78-95b1-4975-9186-1674ad71bb5e",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "192edf87-214b-4a90-b48e-5c0b15a7b03a",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/AES (CRYPTO-0021) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pycryptodome",
          "status": "Requires validation",
          "finding": "PQC support in pycryptodome",
          "action": "Verify whether current runtime version of pycryptodome exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b67451d2-f195-4db2-8b98-788b863cf0f3",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "ddec819e-4691-4195-b84b-8dd188532b12",
    "asset_id": "CRYPTO-0022",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "OpenSSL",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.463344",
    "evidence": {
      "id": "c50a69d5-5963-4a9a-b0f3-ec7a3e27a62d",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL'."
    },
    "risk": {
      "id": "5e5cae9e-2a7e-478a-ac54-e3b9ebde8cd2",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "36357ce6-c8f4-4d19-99b4-4f71ebaf5468",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "8ca26d31-6483-44a5-a162-99372c790c04",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL (CRYPTO-0022) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL",
          "action": "Verify whether current runtime version of OpenSSL exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "1e731b07-b9d8-4c4d-8b09-006b88152271",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "45baade7-606f-41d3-89c3-1f2c65c8cc56",
    "asset_id": "CRYPTO-0023",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "X.509 PKI Trust Store",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "X.509 PKI Trust Store",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.466341",
    "evidence": {
      "id": "e30fef0d-198f-43ad-8553-4283e5c0edac",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'X.509 PKI Trust Store'."
    },
    "risk": {
      "id": "000ba529-be2e-4d28-859e-f4819277e688",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `X.509 PKI TRUST STORE` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "3c3c9120-d2fc-4559-8058-f0e85e732b2b",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of X.509 PKI TRUST STORE with purpose 'certificate' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "0561b4de-d85a-473c-8d2f-797fcb71d2ad",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of X.509 PKI Trust Store (CRYPTO-0023) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 PKI Trust Store",
          "status": "Requires validation",
          "finding": "PQC support in X.509 PKI Trust Store",
          "action": "Verify whether current runtime version of X.509 PKI Trust Store exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "d29f43ae-171b-46a2-af0c-08ba5db8f652",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "a85e8ad9-4ac8-4ea5-a4e0-6ab18f24bde6",
    "asset_id": "CRYPTO-0024",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "algorithm": "OpenSSL libssl",
    "family": "protocol",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL libssl",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.469337",
    "evidence": {
      "id": "c18d05a8-34c4-4670-82cd-499d4039c6af",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL libssl'."
    },
    "risk": {
      "id": "a402aefc-1bfa-4115-a8cc-f3260519f40f",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL LIBSSL` (protocol) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "3f89978b-fb9d-42d7-8121-22185167ce59",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL LIBSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "1f173a66-dbba-4462-ab27-ffc3fdadbc11",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL libssl (CRYPTO-0024) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL libssl",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL libssl",
          "action": "Verify whether current runtime version of OpenSSL libssl exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "667002e2-6303-4b57-ac28-990b2696940d",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "3b1c398e-1b7c-468c-a1f0-8a772a246bed",
    "asset_id": "CRYPTO-0001",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 6,
    "confidence": 0.97,
    "detection_method": "JavaScript API Matcher (crypto.createHash)",
    "created_at": "2026-10-05T18:00:22.579990",
    "evidence": {
      "id": "c94c9687-c9b8-4e8f-8edc-b746521f40f8",
      "file_path": "api-gateway/src/server.js",
      "line_start": 6,
      "line_end": null,
      "code_snippet": "function hashClientRequest(body) {\n    // Generate SHA-256 integrity digest of incoming request payload\n    return crypto.createHash('sha256').update(body).digest('hex');\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createHash)",
      "ast_node_type": null,
      "context_notes": "Node.js native hash stream instantiated with SHA-256."
    },
    "risk": {
      "id": "f74e82c4-10d9-48c4-837f-675817fb8312",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "92596dc4-2302-4a91-aa7b-8714801eef58",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "a7aa004d-1024-45a1-8e67-968d8d49f824",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0001) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "2957dd11-3f4e-4565-bed5-3eebb70682be",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "3e6e19ce-190f-4873-a4b0-6bfb7fc3c96d",
    "asset_id": "CRYPTO-0002",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "confidence": 0.98,
    "detection_method": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
    "created_at": "2026-10-05T18:00:22.581971",
    "evidence": {
      "id": "269bec30-025b-4e73-85c5-3fa2dc4c1a77",
      "file_path": "api-gateway/src/server.js",
      "line_start": 15,
      "line_end": null,
      "code_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
      "detection_rule": "JavaScript API Matcher (crypto.generateKeyPair RSA)",
      "ast_node_type": null,
      "context_notes": "Node.js RSA key generation with modulus 2048 bits."
    },
    "risk": {
      "id": "cb5c9df2-66a2-409e-847c-9c049882ef54",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "3aa6122d-836f-4005-8c29-8e55b59a3d99",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "4503fc2a-cf9b-48f2-a62e-d279fbfe8acf",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0002) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "api-gateway / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "29fc8aa8-389b-439f-b8fd-8ac116bb6db4",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.21,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "9e380927-766a-4544-9cc5-0e87da8e6a3d",
    "asset_id": "CRYPTO-0003",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "api-gateway",
    "component": "src",
    "library": "Node.js crypto",
    "library_version": null,
    "file_path": "api-gateway/src/server.js",
    "line_number": 11,
    "confidence": 0.96,
    "detection_method": "JavaScript API Matcher (crypto.createCipheriv)",
    "created_at": "2026-10-05T18:00:22.584022",
    "evidence": {
      "id": "06c5c226-79a0-420c-a44b-626503ba855f",
      "file_path": "api-gateway/src/server.js",
      "line_start": 11,
      "line_end": null,
      "code_snippet": "function generateEphemeralSessionCipher(secretKey, iv) {\n    // AES-256-GCM envelope encryption for inter-service communication\n    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);\n}\n",
      "detection_rule": "JavaScript API Matcher (crypto.createCipheriv)",
      "ast_node_type": null,
      "context_notes": "Node.js symmetric cipher stream created for aes-256-gcm."
    },
    "risk": {
      "id": "dd05e18b-6715-4a3c-9701-475f010a4863",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "747114f7-9246-4b54-bb27-b1e078bda3ff",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "321bc99b-a066-48c5-950b-9ea7187f10f9",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0003) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "Node.js crypto",
          "status": "Requires validation",
          "finding": "PQC support in Node.js crypto",
          "action": "Verify whether current runtime version of Node.js crypto exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "17e649ad-d66e-4070-943c-305b5352fecd",
      "c1_operation_coupling": 3.0,
      "c1_explanation": "Operation parameters dynamically referenced via configuration or environment settings.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.5,
      "c4_explanation": "Algorithm or key parameters can be updated via configuration files without extensive code changes.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 2.07,
      "agility_rating": "MODERATE",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 3.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors."
      ]
    }
  },
  {
    "id": "8fa4d011-660d-482c-8fe3-f383f97a3e22",
    "asset_id": "CRYPTO-0004",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "confidence": 0.98,
    "detection_method": "Python AST (rsa.generate_private_key)",
    "created_at": "2026-10-05T18:00:22.588161",
    "evidence": {
      "id": "755d811e-fa9a-4c09-a589-b628766e96aa",
      "file_path": "auth-service/src/auth.py",
      "line_start": 11,
      "line_end": 14,
      "code_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
      "detection_rule": "Python AST (rsa.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found explicit RSA private key generation with modulus size 2048 bits."
    },
    "risk": {
      "id": "7af04a4b-0f61-4c6a-8436-75f5c4a244b0",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "22e0ae3e-cc19-4c57-a451-39be008f860c",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "9dc7cb08-f9dd-423f-b9bf-b0714092a12c",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0004) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "5ac676d9-ea44-4c9c-afcc-bf9afeecda9e",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm RSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.29,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "b28ed83e-7e34-4eb4-9c0c-b7800f2b0471",
    "asset_id": "CRYPTO-0005",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "pyjwt",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "confidence": 0.95,
    "detection_method": "Python AST (JWT signing)",
    "created_at": "2026-10-05T18:00:22.590115",
    "evidence": {
      "id": "36556207-d95c-4fb6-bc8e-92b227678ac0",
      "file_path": "auth-service/src/auth.py",
      "line_start": 20,
      "line_end": 20,
      "code_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
      "detection_rule": "Python AST (JWT signing)",
      "ast_node_type": null,
      "context_notes": "JSON Web Token signature configured with RS256 (RSA-based)."
    },
    "risk": {
      "id": "ac8166c8-dbbc-42b5-a4f2-2e1823f43f64",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 100.0,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 100.0/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n> **Immediate Hygiene Failure**: `RSA` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "11f3f5c2-a7e6-416d-9a13-2f85f22ad36b",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "cbeb263c-e95a-485d-b505-a239fd114d7d",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0005) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "auth-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "57eef639-2a85-46f3-adee-44856ef33c1a",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "629d607e-2c2b-419a-ae46-1c30fc73474a",
    "asset_id": "CRYPTO-0006",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 27,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T18:00:22.593161",
    "evidence": {
      "id": "17c92cbc-2745-4193-a569-813e16ca6428",
      "file_path": "auth-service/src/auth.py",
      "line_start": 27,
      "line_end": 27,
      "code_snippet": "            data,\n            padding.PSS(\n                mgf=padding.MGF1(hashes.SHA256()),\n                salt_length=padding.PSS.MAX_LENGTH\n            ),",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "36d154fb-b08b-42e7-b128-45254843554a",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "073745d4-d572-40c0-934c-5c47b2f04fc5",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "b41c169c-20f8-47d3-aa73-afe2f24a23ef",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0006) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "490c870e-e47a-4a65-ad6c-e9a4ccb1f6f6",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "42e7308b-8eb6-4f56-bed7-2d2a45fb95a8",
    "asset_id": "CRYPTO-0007",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "auth-service/src/auth.py",
    "line_number": 30,
    "confidence": 0.99,
    "detection_method": "Python AST (hazmat hashes)",
    "created_at": "2026-10-05T18:00:22.594915",
    "evidence": {
      "id": "d0fa3470-af2d-4ed2-9b4f-1750161aa6ae",
      "file_path": "auth-service/src/auth.py",
      "line_start": 30,
      "line_end": 30,
      "code_snippet": "                salt_length=padding.PSS.MAX_LENGTH\n            ),\n            hashes.SHA256()\n        )\n        return signature",
      "detection_rule": "Python AST (hazmat hashes)",
      "ast_node_type": null,
      "context_notes": "Cryptographic hash digest SHA-256 instantiated."
    },
    "risk": {
      "id": "7c88be03-4111-445a-9d92-6d666d1b6940",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "ad7b5938-f8c7-4c4e-8133-ce2cb187b9af",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "6861ed73-e59e-4e6d-9ff2-0155608868b6",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0007) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "e8c256ca-2c43-4b41-b138-f2b3bc8a4ccc",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm SHA-256 directly within functional business logic.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "42728121-53f1-48e1-a142-f448ade69734",
    "asset_id": "CRYPTO-0008",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 5,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T18:00:22.597893",
    "evidence": {
      "id": "18873312-6e4c-4cb5-8b41-c1b903fa7a96",
      "file_path": "auth-service/src/session.py",
      "line_start": 5,
      "line_end": 5,
      "code_snippet": "def verify_api_token_hash(token: str) -> str:\n    # Compute SHA-256 digest for cached session lookup\n    return hashlib.sha256(token.encode('utf-8')).hexdigest()\n\ndef legacy_checksum(data: str) -> str:",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest SHA-256 invoked."
    },
    "risk": {
      "id": "745bce66-7321-4d27-bd9b-fe7daa46c223",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "26527249-cd17-4402-96de-02be9e3b6923",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "5a5194e4-0b4e-4787-8cc7-5a9fbbd9465c",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0008) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "49753efc-36ba-4b56-9f6f-3bd5cd539fb9",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.64,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "f27b5882-412a-46fd-8b2c-9b124358f928",
    "asset_id": "CRYPTO-0009",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "MD5",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "auth-service",
    "component": "src",
    "library": "hashlib",
    "library_version": null,
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "confidence": 0.99,
    "detection_method": "Python AST (hashlib)",
    "created_at": "2026-10-05T18:00:22.599890",
    "evidence": {
      "id": "ec26930a-0ebb-405f-9bc6-da5e0903bc72",
      "file_path": "auth-service/src/session.py",
      "line_start": 9,
      "line_end": 9,
      "code_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
      "detection_rule": "Python AST (hashlib)",
      "ast_node_type": null,
      "context_notes": "Python hashlib digest MD5 invoked."
    },
    "risk": {
      "id": "9793cd05-59ad-4c8a-92ab-f72eff16bc22",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `MD5` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `MD5` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "ddbcad3b-5f54-4dda-9739-c99d369bb595",
      "recommended_pqc": "SHA-256 or SHA-384",
      "parameter_set": "FIPS 180-4 Secure Hash",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "Immediate hygiene upgrade required. MD5 and SHA-1 have classical collision vulnerabilities.",
      "tradeoffs_json": {
        "performance": "Fast and ubiquitous.",
        "consideration": "Verify digest length compatibility in calling modules."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "e1b9b8d1-c3b5-493f-a72d-003c686565ad",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of MD5 (CRYPTO-0009) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "dbd7cd1a-85e6-4fb0-b517-f1946d4215b4",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "948b9636-90cb-472c-83e3-6814d6de99ba",
    "asset_id": "CRYPTO-0010",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "SECP256R1",
    "purpose": "digital_signature",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "confidence": 0.97,
    "detection_method": "Python AST (ec.generate_private_key)",
    "created_at": "2026-10-05T18:00:22.601892",
    "evidence": {
      "id": "f31c8c43-3c59-4ca8-8570-61aacc1c2bbc",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 11,
      "line_end": 11,
      "code_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
      "detection_rule": "Python AST (ec.generate_private_key)",
      "ast_node_type": null,
      "context_notes": "Found Elliptic Curve key generation for curve SECP256R1 (256 bits)."
    },
    "risk": {
      "id": "1b7792e0-4151-4675-a8ad-5592d487e14e",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "4b78c382-107c-4427-8396-b72b97d70918",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "2c0967a8-bc6e-48ef-9584-5e3808f5fe2f",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0010) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "payment-service / src",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "5cd1196b-25d1-42c2-b26c-171952dcd6db",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 0.5,
      "c2_explanation": "Key generation hardcodes concrete algorithm ECDSA with fixed parameter set.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 0.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "354901f8-4159-4c8f-a251-a4704bcdf54d",
    "asset_id": "CRYPTO-0011",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "AES",
    "family": "symmetric",
    "key_size": 256,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 16,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T18:00:22.602883",
    "evidence": {
      "id": "6f4a6547-8592-4aeb-ae89-c4ccc97c2ca0",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 16,
      "line_end": 16,
      "code_snippet": "        iv = os.urandom(16)\n        # AES-256 symmetric cipher\n        cipher = Cipher(algorithms.AES(self.master_key), modes.CBC(iv))\n        encryptor = cipher.encryptor()\n        return iv + encryptor.update(plaintext) + encryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found AES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "f11cdf20-4169-4be1-95a7-b990281d6c53",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES` (symmetric) | Key Size: `256`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "c5de20ec-4167-4efc-94b9-709ae7a6668d",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "2cedac47-7536-4d51-8784-a3885c271b72",
      "affected_applications": 2,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES (CRYPTO-0011) impacts 2 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "9a1511f8-bf33-40f0-adc5-b8698461f701",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.79,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "50e4bc0f-9092-4800-a24b-14cbc290ce04",
    "asset_id": "CRYPTO-0012",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "3DES",
    "family": "symmetric",
    "key_size": 168,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "payment-service",
    "component": "src",
    "library": "cryptography",
    "library_version": null,
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "confidence": 0.96,
    "detection_method": "Python AST (Cipher instantiation)",
    "created_at": "2026-10-05T18:00:22.604885",
    "evidence": {
      "id": "4c43957b-e521-4dc3-826a-36f085b540a0",
      "file_path": "payment-service/src/crypto_vault.py",
      "line_start": 22,
      "line_end": 22,
      "code_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
      "detection_rule": "Python AST (Cipher instantiation)",
      "ast_node_type": null,
      "context_notes": "Found 3DES symmetric cipher initialized with mode."
    },
    "risk": {
      "id": "fb485026-bc37-4e76-a2c8-beefce49a7ed",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CRITICAL",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 37.5,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 37.5/100)\n\n- **Algorithm & Primitive**: `3DES` (symmetric) | Key Size: `168`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n> **Immediate Hygiene Failure**: `3DES` possesses severe known classical cryptanalytic flaws. Immediate remediation is required regardless of quantum timelines.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "27d11eb7-41d1-44dd-b8fe-0ba47f4903b6",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "aa9b8664-8d00-4fd1-8ad4-07060dd8d36b",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of 3DES (CRYPTO-0012) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "d6c6e8e4-45fc-4d39-b1ca-57a8e96f3eda",
      "c1_operation_coupling": 2.0,
      "c1_explanation": "Cryptographic operation isolated inside dedicated service module/vault adapter.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.5,
      "e2_explanation": "Python ecosystem supports liboqs-python or cryptography PQC extensions for drop-in migration.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.5,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "2f6727ca-3b05-4a50-8b39-2fea6dba6ae4",
    "asset_id": "CRYPTO-0013",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "ECDSA",
    "family": "asymmetric",
    "key_size": 256,
    "curve": "secp256r1",
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T18:00:22.605883",
    "evidence": {
      "id": "db440ab0-a248-49ec-ad1c-40b651f79924",
      "file_path": "certificates/bharatpay_ca_ec.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN'. Quantum-vulnerable ECDSA-256 key."
    },
    "risk": {
      "id": "c1717e28-b12e-4082-88fe-779770f9addc",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `ECDSA` (asymmetric) | Key Size: `256`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "5f12dbc2-3f75-4c10-99c1-768cd1a8ef55",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "97572053-c646-4ffc-8e2e-5c7ac532cf11",
      "affected_applications": 2,
      "affected_components": 2,
      "affected_libraries": 2,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of ECDSA (CRYPTO-0013) impacts 2 applications and 2 components across 2 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "721aa674-555a-4a52-92f2-171d18f25f0a",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm ECDSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning ECDSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "672d8339-9c24-4e57-8888-d07858de1781",
    "asset_id": "CRYPTO-0014",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA",
    "family": "asymmetric",
    "key_size": 2048,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "CONFIRMED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "PKI / Identity Infrastructure",
    "component": "TLS Certificate",
    "library": "X.509 Certificate",
    "library_version": null,
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "confidence": 1.0,
    "detection_method": "X.509 ASN.1 Certificate Parser",
    "created_at": "2026-10-05T18:00:22.608864",
    "evidence": {
      "id": "e9fc07a3-b8b1-4864-8a23-e4b6d64a4e36",
      "file_path": "certificates/payment_gateway_rsa.crt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
      "detection_rule": "X.509 ASN.1 Certificate Parser",
      "ast_node_type": null,
      "context_notes": "Public X.509 certificate found for subject 'CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN'. Quantum-vulnerable RSA-2048 key."
    },
    "risk": {
      "id": "772e1a1b-1048-4013-aa9a-e940eef5279c",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA` (asymmetric) | Key Size: `2048`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "d5474487-30c5-4fa2-b93a-165d3a8c7dbe",
      "recommended_pqc": "Composite / Hybrid X.509 Certificate (RFC 9478 / draft-ietf-lamps-pq-composite-sigs)",
      "parameter_set": "ECDSA P-256 + ML-DSA-65 Dual Signature",
      "alternative_pqc": "Pure PQC Certificate (ML-DSA-65)",
      "alternative_parameter_set": "FIPS 204 Certificate Profile",
      "rationale": "Dual-signature certificates allow legacy systems to validate ECDSA while quantum-aware systems validate ML-DSA, ensuring backward compatibility.",
      "tradeoffs_json": {
        "cert_size": "Certificate size increases from ~1.5 KB to ~5 KB.",
        "consideration": "CA root and intermediate hierarchy must support composite OIDs."
      },
      "migration_complexity": "CRITICAL",
      "validation_required": true
    },
    "migration": {
      "id": "e742c47c-960c-4cd2-90f4-6b1488f69624",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 4,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of RSA (CRYPTO-0014) impacts 3 applications and 2 components across 4 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "PKI / Identity Infrastructure / TLS Certificate",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 Certificate",
          "status": "Requires validation",
          "finding": "PQC support in X.509 Certificate",
          "action": "Verify whether current runtime version of X.509 Certificate exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "c57cd86a-91f4-4ee8-8b23-4d5859ffed9c",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Operation invokes concrete algorithm RSA directly within functional business logic.",
      "c2_creation_coupling": 2.0,
      "c2_explanation": "Public key context imported from X.509 certificate metadata.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 1.5,
      "e1_explanation": "Transitioning RSA to PQC (e.g. ML-KEM-768 public key: 1184 bytes, ML-DSA-65 sig: 3309 bytes) imposes significant payload expansion requiring buffer and protocol updates.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.43,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "1cf5eb2c-2fbc-40b7-a39d-ce552e8cadc1",
    "asset_id": "CRYPTO-0015",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "jsonwebtoken",
    "library_version": "^9.0.2",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T18:00:22.609880",
    "evidence": {
      "id": "54dacd60-380c-4f7a-925a-7fe195a6083e",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'jsonwebtoken' version '^9.0.2'."
    },
    "risk": {
      "id": "68db6c56-8c74-4cf8-abc5-31f2bc8834d7",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "6d5349ef-6118-46da-afb0-d3d6a42052c2",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "aea2444d-bb0a-4a71-86ec-43c13a75f1f1",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0015) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "jsonwebtoken",
          "status": "Requires validation",
          "finding": "PQC support in jsonwebtoken",
          "action": "Verify whether current runtime version of jsonwebtoken exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "faa20a49-c8b3-4e38-a868-78893a30571f",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "335195b7-d186-4365-b87a-6f8edd008caa",
    "asset_id": "CRYPTO-0016",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "AES/SHA-256",
    "family": "symmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "crypto-js",
    "library_version": "^4.2.0",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (npm package.json)",
    "created_at": "2026-10-05T18:00:22.611887",
    "evidence": {
      "id": "8d44af66-f38a-4a98-a76c-9e747c436a15",
      "file_path": "api-gateway/package.json",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "\"crypto-js\": \"^4.2.0\"",
      "detection_rule": "Dependency Manifest Analysis (npm package.json)",
      "ast_node_type": null,
      "context_notes": "Declared Node.js cryptographic dependency: 'crypto-js' version '^4.2.0'."
    },
    "risk": {
      "id": "aa7833c9-673e-44bf-a71e-68bc3bd7aa21",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `AES/SHA-256` (symmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "6767a96d-86aa-4e8e-93f2-a73cdd7a936a",
      "recommended_pqc": "AES-256-GCM",
      "parameter_set": "256-bit key length",
      "alternative_pqc": "ChaCha20-Poly1305 (256-bit)",
      "alternative_parameter_set": "256-bit key length",
      "rationale": "Symmetric ciphers are not broken by Shor's algorithm, but Grover's search halves effective security. Upgrading key size to 256 bits guarantees 128-bit quantum security.",
      "tradeoffs_json": {
        "performance": "Negligible on modern CPUs with AES-NI instructions.",
        "consideration": "Key storage and key management systems must support 256-bit keys."
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "83e4bcf6-0fdd-45e8-a6ea-bf7b2b1380f8",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of AES/SHA-256 (CRYPTO-0016) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "crypto-js",
          "status": "Requires validation",
          "finding": "PQC support in crypto-js",
          "action": "Verify whether current runtime version of crypto-js exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "c8f71f85-eecd-42e0-bf48-38cb4b1922fb",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Node.js crypto library requires upgrade to Node 22+ or external OpenSSL 3.x provider for PQC.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "c4d5b601-b0a2-4bf0-a065-c5d368120e15",
    "asset_id": "CRYPTO-0017",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.612889",
    "evidence": {
      "id": "47da697f-c9bf-447d-8622-6868761388fd",
      "file_path": "auth-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography==42.0.5",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '42.0.5'."
    },
    "risk": {
      "id": "2fdcb110-4696-44c0-8439-6551a7407017",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "1fb1c79c-cbe9-4f2e-9b0a-eb9b6d4448f0",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "0311087e-7072-4d1b-b2ab-5a10b21cb516",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0017) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "99cc00fc-e0ad-498b-8c70-1c67dc6104a2",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "2b3b1ebb-6325-4369-a948-e98eec0257b6",
    "asset_id": "CRYPTO-0018",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA/ECDSA",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "digital_signature",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pyjwt",
    "library_version": "2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.614887",
    "evidence": {
      "id": "32e5ea2c-f22e-42db-a7e7-ef5a30dd0644",
      "file_path": "auth-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pyjwt==2.8.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pyjwt' version '2.8.0'."
    },
    "risk": {
      "id": "e01c0682-310d-4147-a102-49af750f5a3e",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "HIGH",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 81.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 81.2/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `digital_signature`\n- **Quantum Threat Category**: `HIGH`\n> **Signature Vulnerability**: Public-key digital signatures will face forgery under Shor's algorithm, invalidating non-repudiation and identity verification.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "a7107292-b1a0-4c31-89b8-91b598784d5a",
      "recommended_pqc": "ML-DSA (FIPS 204)",
      "parameter_set": "ML-DSA-65 (NIST Security Category 3)",
      "alternative_pqc": "SLH-DSA (FIPS 205)",
      "alternative_parameter_set": "SLH-DSA-SHA2-128s (Conservative stateless hash-based)",
      "rationale": "ML-DSA provides compact lattice-based digital signatures with high-speed verification, standard for authentication and PKI.",
      "tradeoffs_json": {
        "signature_size": "ML-DSA-65 signature is 3,309 bytes (vs 256 bytes for RSA-2048 and 64 bytes for ECDSA P-256).",
        "public_key_size": "Public key is 1,952 bytes.",
        "consideration": "Inspect protocol message buffers and database column sizes to accommodate multi-kilobyte signatures."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "fcd3bccd-3038-45f9-b1ab-0363dfa8834f",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 2,
      "affected_certificates": 0,
      "affected_configurations": 3,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA (CRYPTO-0018) impacts 1 applications and 1 components across 2 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pyjwt",
          "status": "Requires validation",
          "finding": "PQC support in pyjwt",
          "action": "Verify whether current runtime version of pyjwt exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "246a2091-a7a9-4708-99ff-01746206c9e3",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 2.0,
      "c4_explanation": "Header-declared algorithm allows protocol-level algorithm declaration but requires validator update.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.5,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "2fdb49dc-b727-4988-88be-2a321b87d0a1",
    "asset_id": "CRYPTO-0019",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "SHA-256",
    "family": "hash",
    "key_size": null,
    "curve": null,
    "purpose": "hashing",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "hashlib",
    "library_version": "unspecified",
    "file_path": "auth-service/requirements.txt",
    "line_number": 3,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.615890",
    "evidence": {
      "id": "9faddf25-7175-4281-a56d-687283240775",
      "file_path": "auth-service/requirements.txt",
      "line_start": 3,
      "line_end": null,
      "code_snippet": "hashlib",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'hashlib' version 'unspecified'."
    },
    "risk": {
      "id": "a7cb6ff6-0740-41e1-a128-026825f8afde",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `SHA-256` (hash) | Key Size: `N/A`\n- **Classified Purpose**: `hashing`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "03158472-eadb-4d07-9799-8ea5da6896de",
      "recommended_pqc": "Retain Current Implementation",
      "parameter_set": "SHA-256",
      "alternative_pqc": "SHA3-256 / SHA3-384",
      "alternative_parameter_set": "FIPS 202 Keccak",
      "rationale": "SHA-256 provides robust classical and quantum collision resistance. No immediate replacement required.",
      "tradeoffs_json": {
        "status": "Quantum-Resistant"
      },
      "migration_complexity": "LOW",
      "validation_required": false
    },
    "migration": {
      "id": "e2ba3e70-f1ea-40d1-a380-72d174f756a3",
      "affected_applications": 3,
      "affected_components": 2,
      "affected_libraries": 3,
      "affected_certificates": 0,
      "affected_configurations": 1,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of SHA-256 (CRYPTO-0019) impacts 3 applications and 2 components across 3 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Library Ecosystem",
          "component": "hashlib",
          "status": "Requires validation",
          "finding": "PQC support in hashlib",
          "action": "Verify whether current runtime version of hashlib exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "9f603377-555e-4258-b90b-e8da322fee83",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 3.5,
      "e1_explanation": "Symmetric / hash algorithm parameter enlargement (e.g. 256-bit keys) is readily accommodated.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.57,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 3.5,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files."
      ]
    }
  },
  {
    "id": "a32db830-11bb-47d4-9cb0-53558156f4ca",
    "asset_id": "CRYPTO-0020",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA/ECDSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "cryptography",
    "library_version": "41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.617855",
    "evidence": {
      "id": "1093ca70-de55-45c0-afb0-989a096460b7",
      "file_path": "payment-service/requirements.txt",
      "line_start": 1,
      "line_end": null,
      "code_snippet": "cryptography>=41.0.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'cryptography' version '41.0.0'."
    },
    "risk": {
      "id": "b5643219-987d-414e-a63c-5a7d9a3a8143",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/ECDSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "0cd68b79-4fc9-45c7-afb3-c2ea6c2d7550",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "14d04b35-0adc-44d2-9369-31fd4d98b42b",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/ECDSA/AES (CRYPTO-0020) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "cryptography",
          "status": "Requires validation",
          "finding": "PQC support in cryptography",
          "action": "Verify whether current runtime version of cryptography exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "c0560f99-5581-4095-9ae2-fe594249e6d4",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "be3cc59d-6fc4-416f-9134-912ac516c601",
    "asset_id": "CRYPTO-0021",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "RSA/AES",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "encryption",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_VULNERABLE",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "pycryptodome",
    "library_version": "3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "confidence": 0.92,
    "detection_method": "Dependency Manifest Analysis (pip requirements.txt)",
    "created_at": "2026-10-05T18:00:22.618885",
    "evidence": {
      "id": "b6b640d3-3c71-40ce-8ff2-575ef4b599c4",
      "file_path": "payment-service/requirements.txt",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "pycryptodome>=3.20.0",
      "detection_rule": "Dependency Manifest Analysis (pip requirements.txt)",
      "ast_node_type": null,
      "context_notes": "Declared Python cryptographic dependency: 'pycryptodome' version '3.20.0'."
    },
    "risk": {
      "id": "81073f08-a889-4467-9f19-410aff003749",
      "overall_risk": "CRITICAL",
      "quantum_exposure": "CRITICAL",
      "hygiene_risk": "CLEAN",
      "mosca_status": "AT_RISK",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 93.8,
      "explanation_markdown": "### Deterministic Risk Assessment: **CRITICAL** (Score: 93.8/100)\n\n- **Algorithm & Primitive**: `RSA/AES` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `encryption`\n- **Quantum Threat Category**: `CRITICAL`\n> **SNDL Advisory**: This primitive is vulnerable to **Store-Now-Decrypt-Later** attacks. Adversaries intercepting ciphertext today can retain it until a Cryptographically Relevant Quantum Computer (CRQC) emerges to break the discrete log or factorization keys.\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `AT_RISK` (Vulnerability Window: `+6.0 years`)\n> **Warning**: The required retention period plus system migration time exceeds the anticipated quantum threat window. Data protected by this primitive will remain exposed before migration can finish.\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "f7caf87f-c3d7-4f6b-b91a-2f7c68002818",
      "recommended_pqc": "Hybrid Envelope: ML-KEM-768 + AES-256-GCM",
      "parameter_set": "FIPS 203 KEM + FIPS 197 AEAD",
      "alternative_pqc": "AES-256-GCM with pre-shared quantum key distribution / KDF",
      "alternative_parameter_set": "Symmetric-only envelope",
      "rationale": "PQC does not directly provide trapdoor one-way asymmetric encryption like RSA-OAEP; modern architectures encapsulate a symmetric session key with ML-KEM and encrypt payload with AES-256-GCM.",
      "tradeoffs_json": {
        "architecture_shift": "Requires transition from direct public-key encryption to hybrid KEM-DEM (Key/Data Encapsulation Mechanism) envelope.",
        "consideration": "Payloads remain AES-speed; only key header grows by ~1.1 KB."
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "efc8b0cb-933f-4e31-8430-abc95774dd3f",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 4,
      "migration_complexity": "HIGH",
      "blast_radius_summary": "Migration of RSA/AES (CRYPTO-0021) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as HIGH.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "pycryptodome",
          "status": "Requires validation",
          "finding": "PQC support in pycryptodome",
          "action": "Verify whether current runtime version of pycryptodome exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "88dc68a5-42f1-4ab9-8a37-f55ab4690c80",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "0bd5d736-eb9f-475e-84cb-e2c5dc8053c6",
    "asset_id": "CRYPTO-0022",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "OpenSSL",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.620886",
    "evidence": {
      "id": "8857211d-d3d8-4498-b300-82e206302484",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL'."
    },
    "risk": {
      "id": "d0edb875-1ee6-4a00-98d1-982883b4c9c0",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "89390ddd-2cee-4a0b-ba2d-9569e8048d6d",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "b93902c3-4223-479e-b11c-d10e11e6c4b8",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL (CRYPTO-0022) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL",
          "action": "Verify whether current runtime version of OpenSSL exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "b68b110e-3d78-4cd5-be24-95c31250a662",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "651331b4-1ec3-46a7-9311-aebfd78910f5",
    "asset_id": "CRYPTO-0023",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "X.509 PKI Trust Store",
    "family": "asymmetric",
    "key_size": null,
    "curve": null,
    "purpose": "certificate",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "X.509 PKI Trust Store",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.621883",
    "evidence": {
      "id": "9b5cc463-9dd9-43fa-b34a-9660ab6fa738",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'X.509 PKI Trust Store'."
    },
    "risk": {
      "id": "98930022-28b8-4b83-ac3f-7ddadb5d7f34",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `X.509 PKI TRUST STORE` (asymmetric) | Key Size: `N/A`\n- **Classified Purpose**: `certificate`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "7f9ce057-9712-4311-a33b-b822bd636766",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of X.509 PKI TRUST STORE with purpose 'certificate' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "9675a00b-ab43-4982-ba1d-f97d51992400",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 1,
      "affected_configurations": 4,
      "migration_complexity": "CRITICAL",
      "blast_radius_summary": "Migration of X.509 PKI Trust Store (CRYPTO-0023) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as CRITICAL.",
      "review_items": [
        {
          "category": "Protocol & Buffer Sizing",
          "component": "Core Application / Cryptographic Module",
          "status": "Potentially affected",
          "finding": "PQC signature expansion",
          "action": "ML-DSA-65 signatures are ~3,309 bytes (compared to RSA-2048's 256 bytes). Validate HTTP header size limits, message queue payloads, and database column definitions.",
          "validation_priority": "CRITICAL"
        },
        {
          "category": "Client Interoperability",
          "component": "API Gateway & Client SDKs",
          "status": "Requires validation",
          "finding": "Downstream client support for NIST FIPS 204",
          "action": "Ensure consumer mobile apps, microservices, and external partners have updated crypto libraries to parse ML-DSA signatures.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "X.509 PKI Trust Store",
          "status": "Requires validation",
          "finding": "PQC support in X.509 PKI Trust Store",
          "action": "Verify whether current runtime version of X.509 PKI Trust Store exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        },
        {
          "category": "PKI & Certificate Hierarchy",
          "component": "Certificate Authority / Trust Store",
          "status": "Potentially affected",
          "finding": "Quantum-vulnerable X.509 certificate chains",
          "action": "Evaluate composite dual-signature X.509 certificates to maintain backward compatibility while migrating trust roots.",
          "validation_priority": "CRITICAL"
        }
      ]
    },
    "agility": {
      "id": "61b12623-5958-4373-8671-5ab4fc7b4d5e",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  },
  {
    "id": "202fef81-c5a7-40f0-b845-cf1aa2b11b08",
    "asset_id": "CRYPTO-0024",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "algorithm": "OpenSSL libssl",
    "family": "protocol",
    "key_size": null,
    "curve": null,
    "purpose": "protocol_security",
    "purpose_confidence": "INFERRED",
    "confidence_classification": "CONFIRMED",
    "provenance": "OBSERVED",
    "quantum_status": "QUANTUM_RESISTANT",
    "owner": "Security Engineering",
    "data_classification": "RESTRICTED",
    "application": "Core Application",
    "component": "Cryptographic Module",
    "library": "OpenSSL libssl",
    "library_version": null,
    "file_path": "docker/Dockerfile",
    "line_number": 2,
    "confidence": 0.88,
    "detection_method": "Container Configuration Inspection (Dockerfile/Compose)",
    "created_at": "2026-10-05T18:00:22.623885",
    "evidence": {
      "id": "945fe8bb-46c8-4c9d-99da-5f8e9de90191",
      "file_path": "docker/Dockerfile",
      "line_start": 2,
      "line_end": null,
      "code_snippet": "RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev",
      "detection_rule": "Container Configuration Inspection (Dockerfile/Compose)",
      "ast_node_type": null,
      "context_notes": "Container environment provisions cryptographic package or service: 'OpenSSL libssl'."
    },
    "risk": {
      "id": "aba2e374-305b-4b82-99d7-4a44a7d23218",
      "overall_risk": "LOW",
      "quantum_exposure": "LOW",
      "hygiene_risk": "CLEAN",
      "mosca_status": "NOT_APPLICABLE",
      "data_lifetime_years": 12.0,
      "migration_time_years": 4.0,
      "quantum_horizon_years": 10.0,
      "mosca_margin_years": 6.0,
      "risk_score": 6.2,
      "explanation_markdown": "### Deterministic Risk Assessment: **LOW** (Score: 6.2/100)\n\n- **Algorithm & Primitive**: `OPENSSL LIBSSL` (protocol) | Key Size: `N/A`\n- **Classified Purpose**: `protocol_security`\n- **Quantum Threat Category**: `LOW`\n\n#### Mosca's Theorem Formulation ($X + Y > Z$):\n- **Data Shelf-Life ($X$)**: `12.0 years`\n- **Migration Time ($Y$)**: `4.0 years`\n- **Quantum Threat Horizon ($Z$)**: `10.0 years`\n- **Equation Evaluation**: $12.0 + 4.0 = 16.0 > 10.0$\n- **Mosca Status**: `NOT_APPLICABLE` (Vulnerability Window: `+6.0 years`)\n\n- **Business Context**: Application criticality is `CRITICAL`."
    },
    "recommendation": {
      "id": "54236f1f-8d03-4f00-8c65-237224015d48",
      "recommended_pqc": "Architectural Review Required",
      "parameter_set": "Custom Assessment",
      "alternative_pqc": null,
      "alternative_parameter_set": null,
      "rationale": "Cryptographic usage of OPENSSL LIBSSL with purpose 'protocol_security' requires specialized manual protocol review.",
      "tradeoffs_json": {
        "review_needed": true
      },
      "migration_complexity": "HIGH",
      "validation_required": true
    },
    "migration": {
      "id": "6e5f29df-69b2-461d-906a-a57adf6db3ac",
      "affected_applications": 1,
      "affected_components": 1,
      "affected_libraries": 1,
      "affected_certificates": 0,
      "affected_configurations": 2,
      "migration_complexity": "MEDIUM",
      "blast_radius_summary": "Migration of OpenSSL libssl (CRYPTO-0024) impacts 1 applications and 1 components across 1 cryptographic libraries. Overall migration complexity is classified as MEDIUM.",
      "review_items": [
        {
          "category": "Network MTU & Handshake",
          "component": "Transport Layer / Ingress",
          "status": "Potentially affected",
          "finding": "Ciphertext encapsulation overhead",
          "action": "ML-KEM-768 public key (1,184 B) and ciphertext (1,088 B) enlarge handshake packets. Test network firewalls and middleboxes for fragmentation handling.",
          "validation_priority": "HIGH"
        },
        {
          "category": "Library Ecosystem",
          "component": "OpenSSL libssl",
          "status": "Requires validation",
          "finding": "PQC support in OpenSSL libssl",
          "action": "Verify whether current runtime version of OpenSSL libssl exposes FIPS 203/204 bindings (or integrate OpenSSL 3.4+ / liboqs-python).",
          "validation_priority": "MEDIUM"
        }
      ]
    },
    "agility": {
      "id": "0b648b0e-b83e-420e-832c-be1c05bf0c88",
      "c1_operation_coupling": 1.0,
      "c1_explanation": "Algorithm invocation directly binds concrete parameters in the call site.",
      "c2_creation_coupling": 1.0,
      "c2_explanation": "Key and cipher contexts instantiated with concrete algorithm classes.",
      "c3_provider_coupling": 1.5,
      "c3_explanation": "Application couples directly to standard ecosystem provider APIs.",
      "c4_decoupling_mechanism": 1.0,
      "c4_explanation": "Algorithm change requires source code modification and redeployment.",
      "c5_decoupling_authority": 1.0,
      "c5_explanation": "Cryptographic posture currently determined by individual service code implementation.",
      "e1_algorithm_migration": 2.0,
      "e1_explanation": "System handles binary payloads; PQC key expansion will require schema and bandwidth verification.",
      "e2_provider_migration": 2.0,
      "e2_explanation": "Ecosystem library supports active updates; migration to hybrid/PQC library adapter is feasible.",
      "overall_agility_score": 1.36,
      "agility_rating": "LOW",
      "radar_data": [
        {
          "dimension": "C1: Operation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C2: Creation Coupling",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C3: Provider Coupling",
          "score": 1.5,
          "fullMark": 4.0
        },
        {
          "dimension": "C4: Decoupling Mechanism",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "C5: Decoupling Authority",
          "score": 1.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E1: Algorithm Migration",
          "score": 2.0,
          "fullMark": 4.0
        },
        {
          "dimension": "E2: Provider Migration",
          "score": 2.0,
          "fullMark": 4.0
        }
      ],
      "recommendations": [
        "Decouple algorithm calls by encapsulating cryptographic operations behind a domain-level CryptoService interface.",
        "Adopt factory pattern or KMS key-handle pattern instead of direct concrete key generation constructors.",
        "Externalize cryptographic suites and key parameters to versioned, signed configuration files.",
        "Verify network serialization protocols and database columns to ensure compatibility with large PQC key/signature payloads."
      ]
    }
  }
]) as any[];

export const OFFLINE_DEPENDENCIES: DependencyGraph = ({
  "nodes": [
    {
      "id": "api-gateway",
      "type": "customNode",
      "data": {
        "label": "api-gateway",
        "nodeType": "APPLICATION",
        "status": "OBSERVED"
      },
      "position": {
        "x": 50.0,
        "y": 60.0
      }
    },
    {
      "id": "src",
      "type": "customNode",
      "data": {
        "label": "src",
        "nodeType": "COMPONENT",
        "status": "OBSERVED"
      },
      "position": {
        "x": 320.0,
        "y": 60.0
      }
    },
    {
      "id": "Node.js crypto",
      "type": "customNode",
      "data": {
        "label": "Node.js crypto",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 60.0
      }
    },
    {
      "id": "CRYPTO-0001: SHA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0001: SHA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 60.0
      }
    },
    {
      "id": "CRYPTO-0002: RSA-2048",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0002: RSA-2048",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 170.0
      }
    },
    {
      "id": "CRYPTO-0003: AES-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0003: AES-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 280.0
      }
    },
    {
      "id": "auth-service",
      "type": "customNode",
      "data": {
        "label": "auth-service",
        "nodeType": "APPLICATION",
        "status": "OBSERVED"
      },
      "position": {
        "x": 50.0,
        "y": 170.0
      }
    },
    {
      "id": "cryptography",
      "type": "customNode",
      "data": {
        "label": "cryptography",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 170.0
      }
    },
    {
      "id": "CRYPTO-0004: RSA-2048",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0004: RSA-2048",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 390.0
      }
    },
    {
      "id": "pyjwt",
      "type": "customNode",
      "data": {
        "label": "pyjwt",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 280.0
      }
    },
    {
      "id": "CRYPTO-0005: RSA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0005: RSA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 500.0
      }
    },
    {
      "id": "CRYPTO-0006: SHA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0006: SHA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 610.0
      }
    },
    {
      "id": "hashlib",
      "type": "customNode",
      "data": {
        "label": "hashlib",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 390.0
      }
    },
    {
      "id": "CRYPTO-0008: SHA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0008: SHA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 720.0
      }
    },
    {
      "id": "CRYPTO-0009: MD5",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0009: MD5",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 830.0
      }
    },
    {
      "id": "payment-service",
      "type": "customNode",
      "data": {
        "label": "payment-service",
        "nodeType": "APPLICATION",
        "status": "OBSERVED"
      },
      "position": {
        "x": 50.0,
        "y": 280.0
      }
    },
    {
      "id": "CRYPTO-0010: ECDSA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0010: ECDSA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 940.0
      }
    },
    {
      "id": "CRYPTO-0011: AES-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0011: AES-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1050.0
      }
    },
    {
      "id": "CRYPTO-0012: 3DES-168",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0012: 3DES-168",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1160.0
      }
    },
    {
      "id": "PKI / Identity Infrastructure",
      "type": "customNode",
      "data": {
        "label": "PKI / Identity Infrastructure",
        "nodeType": "APPLICATION",
        "status": "OBSERVED"
      },
      "position": {
        "x": 50.0,
        "y": 390.0
      }
    },
    {
      "id": "TLS Certificate",
      "type": "customNode",
      "data": {
        "label": "TLS Certificate",
        "nodeType": "COMPONENT",
        "status": "OBSERVED"
      },
      "position": {
        "x": 320.0,
        "y": 170.0
      }
    },
    {
      "id": "X.509 Certificate",
      "type": "customNode",
      "data": {
        "label": "X.509 Certificate",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 500.0
      }
    },
    {
      "id": "CRYPTO-0013: ECDSA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0013: ECDSA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1270.0
      }
    },
    {
      "id": "X.509 Certificate Chain",
      "type": "customNode",
      "data": {
        "label": "X.509 Certificate Chain",
        "nodeType": "CERTIFICATE",
        "status": "OBSERVED"
      },
      "position": {
        "x": 1130.0,
        "y": 60.0
      }
    },
    {
      "id": "CRYPTO-0014: RSA-2048",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0014: RSA-2048",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1380.0
      }
    },
    {
      "id": "Core Application",
      "type": "customNode",
      "data": {
        "label": "Core Application",
        "nodeType": "APPLICATION",
        "status": "OBSERVED"
      },
      "position": {
        "x": 50.0,
        "y": 500.0
      }
    },
    {
      "id": "Cryptographic Module",
      "type": "customNode",
      "data": {
        "label": "Cryptographic Module",
        "nodeType": "COMPONENT",
        "status": "OBSERVED"
      },
      "position": {
        "x": 320.0,
        "y": 280.0
      }
    },
    {
      "id": "jsonwebtoken",
      "type": "customNode",
      "data": {
        "label": "jsonwebtoken",
        "nodeType": "LIBRARY",
        "status": "DECLARED"
      },
      "position": {
        "x": 590.0,
        "y": 610.0
      }
    },
    {
      "id": "CRYPTO-0015: RSA/ECDSA",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0015: RSA/ECDSA",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1490.0
      }
    },
    {
      "id": "crypto-js",
      "type": "customNode",
      "data": {
        "label": "crypto-js",
        "nodeType": "LIBRARY",
        "status": "DECLARED"
      },
      "position": {
        "x": 590.0,
        "y": 720.0
      }
    },
    {
      "id": "CRYPTO-0016: AES/SHA-256",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0016: AES/SHA-256",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1600.0
      }
    },
    {
      "id": "CRYPTO-0017: RSA/ECDSA/AES",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0017: RSA/ECDSA/AES",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1710.0
      }
    },
    {
      "id": "CRYPTO-0018: RSA/ECDSA",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0018: RSA/ECDSA",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1820.0
      }
    },
    {
      "id": "pycryptodome",
      "type": "customNode",
      "data": {
        "label": "pycryptodome",
        "nodeType": "LIBRARY",
        "status": "DECLARED"
      },
      "position": {
        "x": 590.0,
        "y": 830.0
      }
    },
    {
      "id": "CRYPTO-0021: RSA/AES",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0021: RSA/AES",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 1930.0
      }
    },
    {
      "id": "OpenSSL",
      "type": "customNode",
      "data": {
        "label": "OpenSSL",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 940.0
      }
    },
    {
      "id": "CRYPTO-0022: OpenSSL",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0022: OpenSSL",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 2040.0
      }
    },
    {
      "id": "X.509 PKI Trust Store",
      "type": "customNode",
      "data": {
        "label": "X.509 PKI Trust Store",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 1050.0
      }
    },
    {
      "id": "CRYPTO-0023: X.509 PKI Trust Store",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0023: X.509 PKI Trust Store",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 2150.0
      }
    },
    {
      "id": "OpenSSL libssl",
      "type": "customNode",
      "data": {
        "label": "OpenSSL libssl",
        "nodeType": "LIBRARY",
        "status": "OBSERVED"
      },
      "position": {
        "x": 590.0,
        "y": 1160.0
      }
    },
    {
      "id": "CRYPTO-0024: OpenSSL libssl",
      "type": "customNode",
      "data": {
        "label": "CRYPTO-0024: OpenSSL libssl",
        "nodeType": "CRYPTO_ASSET",
        "status": "OBSERVED"
      },
      "position": {
        "x": 860.0,
        "y": 2260.0
      }
    }
  ],
  "edges": [
    {
      "id": "e-ad05c54d-b7e9-4f65-a0c7-1ca4ee55bd1c",
      "source": "api-gateway",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a50df4b7-5110-4e87-a9bb-c6d8c5f05bee",
      "source": "src",
      "target": "Node.js crypto",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-8fdb6402-6a1b-4b03-a8e0-b83ac71924c7",
      "source": "Node.js crypto",
      "target": "CRYPTO-0001: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-cb48d9d7-a68e-4763-8ec1-40fa38fb27c8",
      "source": "Node.js crypto",
      "target": "CRYPTO-0002: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-57ffc178-b280-4104-8b24-9405a126bd97",
      "source": "Node.js crypto",
      "target": "CRYPTO-0003: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d11decc4-44c9-4bb5-b308-66eeab236de2",
      "source": "auth-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-be480ac6-2d03-4944-8a98-47d9b803b46a",
      "source": "src",
      "target": "cryptography",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a417b9d4-2065-4e75-b365-cbc348149186",
      "source": "cryptography",
      "target": "CRYPTO-0004: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-078fb6b3-a458-4ac9-8431-ca227f9918f4",
      "source": "src",
      "target": "pyjwt",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b9c6babd-380d-40bc-a983-43c8e256c46b",
      "source": "pyjwt",
      "target": "CRYPTO-0005: RSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3623b4f4-3cd6-4977-b31a-d01803f2e71c",
      "source": "cryptography",
      "target": "CRYPTO-0006: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1c1d2ea8-c138-4286-9de5-4910709bbb78",
      "source": "src",
      "target": "hashlib",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c4d0287c-69e7-4eeb-99b3-d0e373aa61cf",
      "source": "hashlib",
      "target": "CRYPTO-0008: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-28f1f2ca-c684-47d8-9559-539d9e0bdbe2",
      "source": "hashlib",
      "target": "CRYPTO-0009: MD5",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-506a9b28-6fd9-41e4-86c0-65407186c8e1",
      "source": "payment-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-756473b1-dd6a-458e-af59-c7a64c6714e5",
      "source": "cryptography",
      "target": "CRYPTO-0010: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0c37fcb9-3cc6-44e8-822e-9b605a6bed5b",
      "source": "cryptography",
      "target": "CRYPTO-0011: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e4acc8a4-32ef-4919-a2a6-e3ebc1c4e5f2",
      "source": "cryptography",
      "target": "CRYPTO-0012: 3DES-168",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3fd6d668-6692-4c86-8194-7e7adcffdd21",
      "source": "PKI / Identity Infrastructure",
      "target": "TLS Certificate",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c788d152-49f0-4fa7-bb00-7e7faae7427a",
      "source": "TLS Certificate",
      "target": "X.509 Certificate",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0d51d3c6-c24c-463e-9445-99dcf84038ae",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0013: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-705833a3-3a1c-4c22-b155-9c09c2d15923",
      "source": "CRYPTO-0013: ECDSA-256",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-cd59516b-b511-4ec7-8498-c113f2b22ff3",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0014: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1cb809d8-7551-4c7e-a6ba-a324b4577621",
      "source": "CRYPTO-0014: RSA-2048",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c87c47e5-c5c5-4a27-b907-fabce43e4eec",
      "source": "Core Application",
      "target": "Cryptographic Module",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-8e435be1-b5cb-466b-b8b0-4a43b322e620",
      "source": "Cryptographic Module",
      "target": "jsonwebtoken",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-dc6c715f-4fda-47c9-8514-08705f5e15da",
      "source": "jsonwebtoken",
      "target": "CRYPTO-0015: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-fe6aa461-cae5-44e0-8b65-88886cd7d217",
      "source": "Cryptographic Module",
      "target": "crypto-js",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-92cdb2db-18d4-4db0-82b3-28ff80835bdc",
      "source": "crypto-js",
      "target": "CRYPTO-0016: AES/SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-ae349b41-9799-45ae-b50e-d6a6f79dc7a4",
      "source": "Cryptographic Module",
      "target": "cryptography",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e5f2da0e-b8a2-4f0e-aa63-e5f754ba5d6a",
      "source": "cryptography",
      "target": "CRYPTO-0017: RSA/ECDSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-5b488aa0-5a70-46f2-ba0d-24315c0fa000",
      "source": "Cryptographic Module",
      "target": "pyjwt",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b012a808-21af-4459-9eec-9c3982c41db4",
      "source": "pyjwt",
      "target": "CRYPTO-0018: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-20b11b75-c8a7-4dc0-b843-bc75b74bebd1",
      "source": "Cryptographic Module",
      "target": "hashlib",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e34d4d8e-059d-4e5a-b2d9-95899b00e173",
      "source": "Cryptographic Module",
      "target": "pycryptodome",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e942640c-f205-42f4-b0bb-4469f43edb9b",
      "source": "pycryptodome",
      "target": "CRYPTO-0021: RSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-47f497e0-dded-4f6a-8298-2da466df565f",
      "source": "Cryptographic Module",
      "target": "OpenSSL",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-66f9f61c-656f-4d69-9801-c286b0e038cf",
      "source": "OpenSSL",
      "target": "CRYPTO-0022: OpenSSL",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-899382b0-bb5e-4443-92cc-1ee6bfff777b",
      "source": "Cryptographic Module",
      "target": "X.509 PKI Trust Store",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-07164a94-e6e7-46fa-93ff-9be56601cc9c",
      "source": "X.509 PKI Trust Store",
      "target": "CRYPTO-0023: X.509 PKI Trust Store",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-7fb36ca1-7a34-4b19-8d16-6ced8b84d655",
      "source": "CRYPTO-0023: X.509 PKI Trust Store",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4271069b-42d2-4811-bdee-41235555fd77",
      "source": "Cryptographic Module",
      "target": "OpenSSL libssl",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-96b93b04-7611-467e-affe-0ccf7cb1d71f",
      "source": "OpenSSL libssl",
      "target": "CRYPTO-0024: OpenSSL libssl",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c100b684-fa69-45b4-b5d6-776811839e62",
      "source": "api-gateway",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-07af2724-a1f3-459c-9d4c-405eaa2533cf",
      "source": "src",
      "target": "Node.js crypto",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-f544b2b2-9da7-4ecc-b499-868de04cac47",
      "source": "Node.js crypto",
      "target": "CRYPTO-0001: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a394f0e6-b742-462a-8148-481aefd51d28",
      "source": "Node.js crypto",
      "target": "CRYPTO-0002: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-5087a06b-81b8-4e88-af18-273876648f33",
      "source": "Node.js crypto",
      "target": "CRYPTO-0003: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0ee46310-5f92-4099-8f7f-fc3a860c6bab",
      "source": "auth-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e772c6a2-7e99-4e7f-ab98-cb41fde17f8c",
      "source": "src",
      "target": "cryptography",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-bc94da59-d3dc-40b8-aee9-1e019a92a66f",
      "source": "cryptography",
      "target": "CRYPTO-0004: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-7988b57e-6014-418d-b1b7-cfcd659eddd6",
      "source": "src",
      "target": "pyjwt",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-8948d79e-70a1-4f74-aee1-95f23a3e498d",
      "source": "pyjwt",
      "target": "CRYPTO-0005: RSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1bc463b0-f23b-4e45-ab4e-a89c7fbdb6c3",
      "source": "cryptography",
      "target": "CRYPTO-0006: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a64cd583-3301-4af9-959d-593b8e3c7e4d",
      "source": "src",
      "target": "hashlib",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-2028773c-7d02-47e1-83fd-21cc80458685",
      "source": "hashlib",
      "target": "CRYPTO-0008: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-bded6174-dbde-4803-b42c-2549c34809f5",
      "source": "hashlib",
      "target": "CRYPTO-0009: MD5",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-417521a5-d60b-41a5-99c9-5febb0bf2941",
      "source": "payment-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0c732769-7b41-4318-ab7e-a4e75dea96c8",
      "source": "cryptography",
      "target": "CRYPTO-0010: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-47499b48-7fc4-4d43-bb24-51c50e17687f",
      "source": "cryptography",
      "target": "CRYPTO-0011: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-df40803b-da01-4aac-92bf-bad811d8efc0",
      "source": "cryptography",
      "target": "CRYPTO-0012: 3DES-168",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b4243084-5f38-47f2-a4a8-b6aa8cdddb63",
      "source": "PKI / Identity Infrastructure",
      "target": "TLS Certificate",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-6c2a825e-4175-480e-ba2b-858c90aa9d5f",
      "source": "TLS Certificate",
      "target": "X.509 Certificate",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-434b238d-39cb-45f6-b82a-5a0cd3b9f243",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0013: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a927a3d1-886d-4265-8177-5f027a75fe67",
      "source": "CRYPTO-0013: ECDSA-256",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-2471a8b2-0b78-43f8-8e0a-8cfecba52058",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0014: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-eb97d63f-9114-4d09-80ab-a2104dd53efa",
      "source": "CRYPTO-0014: RSA-2048",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b37c3d39-ef43-4e64-b689-2840f7ef113a",
      "source": "Core Application",
      "target": "Cryptographic Module",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4b5b3b22-4016-4a9c-b4b1-566a8188362e",
      "source": "Cryptographic Module",
      "target": "jsonwebtoken",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-fe4cdc6d-f41c-42ed-94fe-98408b43940a",
      "source": "jsonwebtoken",
      "target": "CRYPTO-0015: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-09d9b576-36fe-497f-9595-66046de02511",
      "source": "Cryptographic Module",
      "target": "crypto-js",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-cd9a835f-97a7-47ce-913b-28d6de9c1bbe",
      "source": "crypto-js",
      "target": "CRYPTO-0016: AES/SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-2553fc55-6e9f-492a-ab26-edbbd4119f26",
      "source": "Cryptographic Module",
      "target": "cryptography",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-067adff2-8b1f-478f-a90c-fcfd734b54e2",
      "source": "cryptography",
      "target": "CRYPTO-0017: RSA/ECDSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a2ce7acd-0077-4bcc-b9eb-3df580311846",
      "source": "Cryptographic Module",
      "target": "pyjwt",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3fd6b270-cbcb-45cd-9740-1a7805b60b17",
      "source": "pyjwt",
      "target": "CRYPTO-0018: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-11801cf2-d852-4b32-96cb-156a438525fc",
      "source": "Cryptographic Module",
      "target": "hashlib",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-59e3d8a7-74e8-44f1-9756-f760096fedec",
      "source": "Cryptographic Module",
      "target": "pycryptodome",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-7accdd34-16f9-493d-9ff1-a58a868e9897",
      "source": "pycryptodome",
      "target": "CRYPTO-0021: RSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-febc6db0-0ef6-4568-b624-da37bce57ab5",
      "source": "Cryptographic Module",
      "target": "OpenSSL",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-bb0faf88-be50-4a30-a8df-6d5e50c577ce",
      "source": "OpenSSL",
      "target": "CRYPTO-0022: OpenSSL",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-30fe690a-a5a0-467c-bc6a-44803c1cccbd",
      "source": "Cryptographic Module",
      "target": "X.509 PKI Trust Store",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a449e3f7-f933-402a-abed-c687cb00f685",
      "source": "X.509 PKI Trust Store",
      "target": "CRYPTO-0023: X.509 PKI Trust Store",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3f303209-e95d-4cde-bcfd-33c170819864",
      "source": "CRYPTO-0023: X.509 PKI Trust Store",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e73b482a-64d5-4b69-a380-aeb7c2da9016",
      "source": "Cryptographic Module",
      "target": "OpenSSL libssl",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-ebb724f8-c942-4962-97f2-12894898f939",
      "source": "OpenSSL libssl",
      "target": "CRYPTO-0024: OpenSSL libssl",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b97124fa-5d2b-447a-a0e9-af3ec87176f1",
      "source": "api-gateway",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-676c1d9e-24f4-46c7-8d09-c725c4e0a4c3",
      "source": "src",
      "target": "Node.js crypto",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a935e75d-33e9-4a04-be24-31a7eef9e988",
      "source": "Node.js crypto",
      "target": "CRYPTO-0001: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0c4f4add-f812-4d20-a827-726fe5042166",
      "source": "Node.js crypto",
      "target": "CRYPTO-0002: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b982a6a9-d131-4ee6-bb5c-f51726111f70",
      "source": "Node.js crypto",
      "target": "CRYPTO-0003: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d9faa15e-9590-4616-9204-efb9fab59bf9",
      "source": "auth-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-f7b86de3-767c-4810-9015-92cd4fac8f71",
      "source": "src",
      "target": "cryptography",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-ce075ade-3b6e-4f7f-97f8-7397ada34f29",
      "source": "cryptography",
      "target": "CRYPTO-0004: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d589212c-9981-49bc-9bcf-4b435df83cdf",
      "source": "src",
      "target": "pyjwt",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-60ef0c77-4d58-452e-afb2-420ae27b211c",
      "source": "pyjwt",
      "target": "CRYPTO-0005: RSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0a7d6693-8898-472b-9cd1-38c0f1864f5a",
      "source": "cryptography",
      "target": "CRYPTO-0006: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-72cfcd87-3511-4e07-81bc-ea391536ae2f",
      "source": "src",
      "target": "hashlib",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-344a4184-e901-46d0-b3a8-5bb8064df563",
      "source": "hashlib",
      "target": "CRYPTO-0008: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-38654ac9-2c85-4bde-8ba0-5d02023fad5a",
      "source": "hashlib",
      "target": "CRYPTO-0009: MD5",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1c74b599-a111-46e7-9586-61f0ad6d23b8",
      "source": "payment-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-6a85da0b-90cc-49ba-b5c9-015d1e565697",
      "source": "cryptography",
      "target": "CRYPTO-0010: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-bfdc34ee-738b-41e3-a9ed-56b7b1f23ff1",
      "source": "cryptography",
      "target": "CRYPTO-0011: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1f211fb6-2498-46db-a048-da07828e2373",
      "source": "cryptography",
      "target": "CRYPTO-0012: 3DES-168",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-f517d728-10ab-4cee-a77f-936dc39c0ba9",
      "source": "PKI / Identity Infrastructure",
      "target": "TLS Certificate",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-2b1b4969-b359-4f56-82a1-2a78d74d5707",
      "source": "TLS Certificate",
      "target": "X.509 Certificate",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-7f7ca7eb-97d5-4433-9a0a-84063148a91c",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0013: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-6370d1db-9308-4e53-a42c-796a8e330062",
      "source": "CRYPTO-0013: ECDSA-256",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-023192da-4423-490c-97c9-271c423d06e2",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0014: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-fcfe0980-8c34-45e1-b648-2afe665fd352",
      "source": "CRYPTO-0014: RSA-2048",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4dfede0d-54aa-4d6d-8873-50b16a55925f",
      "source": "Core Application",
      "target": "Cryptographic Module",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-041ee6d0-e806-49fb-952c-7fd96bf30a57",
      "source": "Cryptographic Module",
      "target": "jsonwebtoken",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-af53d4ec-e8ed-46b7-849a-a21afabb6f48",
      "source": "jsonwebtoken",
      "target": "CRYPTO-0015: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e24a4db4-b0ee-453a-be45-ba087147ad1a",
      "source": "Cryptographic Module",
      "target": "crypto-js",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1b428fd1-a3b1-4f8c-999a-42c2cdf176c8",
      "source": "crypto-js",
      "target": "CRYPTO-0016: AES/SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-60b4b94c-9108-4dc6-94be-5ba7c77f1a48",
      "source": "Cryptographic Module",
      "target": "cryptography",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-803925d2-e65f-4b79-ada8-60622fa81239",
      "source": "cryptography",
      "target": "CRYPTO-0017: RSA/ECDSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-80f1251d-cacb-465a-a094-928f73027093",
      "source": "Cryptographic Module",
      "target": "pyjwt",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-915009a8-8e8c-4040-be2f-226ce937aac1",
      "source": "pyjwt",
      "target": "CRYPTO-0018: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-397bb9b0-8e4e-469b-8be4-a2378c76c6e1",
      "source": "Cryptographic Module",
      "target": "hashlib",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-19c459ea-296d-42c6-ad0d-af2db2ff5f16",
      "source": "Cryptographic Module",
      "target": "pycryptodome",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-8c3a977c-281c-47f1-a587-009dfedfe074",
      "source": "pycryptodome",
      "target": "CRYPTO-0021: RSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-615c1167-48a4-44cb-be27-c0a52e37e217",
      "source": "Cryptographic Module",
      "target": "OpenSSL",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-f7e3529f-0a1a-4219-be13-c7867432a48c",
      "source": "OpenSSL",
      "target": "CRYPTO-0022: OpenSSL",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b19c2eb2-d14b-4ba4-9bc3-7344a2cff1e6",
      "source": "Cryptographic Module",
      "target": "X.509 PKI Trust Store",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-9c55976b-aebd-4ec1-98d4-0ff380aa71fb",
      "source": "X.509 PKI Trust Store",
      "target": "CRYPTO-0023: X.509 PKI Trust Store",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-dd37754d-1776-448b-9e0d-71569f680a70",
      "source": "CRYPTO-0023: X.509 PKI Trust Store",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-02cdf769-300b-49a3-bb9a-9919b3500c96",
      "source": "Cryptographic Module",
      "target": "OpenSSL libssl",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-50ef3353-dd84-4a1e-abed-e086721ac1d1",
      "source": "OpenSSL libssl",
      "target": "CRYPTO-0024: OpenSSL libssl",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d29bfb79-2b6a-4c94-8c75-3a6d7b65f385",
      "source": "api-gateway",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e4be12aa-c9a3-4a66-958c-2cf5bcf24ada",
      "source": "src",
      "target": "Node.js crypto",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a4bbe50d-90b5-49bc-8484-464ad31f4fea",
      "source": "Node.js crypto",
      "target": "CRYPTO-0001: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e1ca9311-9773-4c86-9ecf-3a2e03f5ca68",
      "source": "Node.js crypto",
      "target": "CRYPTO-0002: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-32059167-5346-4225-b8f1-c35094442a2f",
      "source": "Node.js crypto",
      "target": "CRYPTO-0003: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-7f8b04f8-247c-4e9a-b1c6-7ceb9260d1ff",
      "source": "auth-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-5fad6ae6-8349-4144-aae4-b7a8c997f14d",
      "source": "src",
      "target": "cryptography",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-0b6dfd78-a997-4dba-9c09-a11bc82d4619",
      "source": "cryptography",
      "target": "CRYPTO-0004: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b6f0860b-849b-4ecf-8133-391d61556aa8",
      "source": "src",
      "target": "pyjwt",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-eee27369-5aa3-4245-b499-ffe194c34033",
      "source": "pyjwt",
      "target": "CRYPTO-0005: RSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3547029d-7392-48d5-91ca-9cc2c7232c94",
      "source": "cryptography",
      "target": "CRYPTO-0006: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-92e2f7c8-da7f-41f2-bc59-bb8f629b946e",
      "source": "src",
      "target": "hashlib",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-eebbf930-bdb7-417e-9e7f-9de5b177d4c8",
      "source": "hashlib",
      "target": "CRYPTO-0008: SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-6502531e-2209-4865-8074-2c7602b0ec77",
      "source": "hashlib",
      "target": "CRYPTO-0009: MD5",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-30a3fc31-6928-432c-9e12-d2f0d8599d88",
      "source": "payment-service",
      "target": "src",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a32d2434-b2e3-406c-942e-9f55d152bb8e",
      "source": "cryptography",
      "target": "CRYPTO-0010: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-bfddbf09-98e8-40bb-9f0a-11214fc8c648",
      "source": "cryptography",
      "target": "CRYPTO-0011: AES-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-1400c6c1-5985-4a49-8e12-f34900a90928",
      "source": "cryptography",
      "target": "CRYPTO-0012: 3DES-168",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d8e923a8-3615-485b-b1cb-2de21335c16a",
      "source": "PKI / Identity Infrastructure",
      "target": "TLS Certificate",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3a403c7e-3cee-4241-b50b-7533f14bbba7",
      "source": "TLS Certificate",
      "target": "X.509 Certificate",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-a9696ce5-707b-414d-9515-5bb1852af888",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0013: ECDSA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-560b2678-9c23-4bab-812c-e5712f7b623d",
      "source": "CRYPTO-0013: ECDSA-256",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c7910e4e-6d34-4ac2-9b19-ddbe3d63de2d",
      "source": "X.509 Certificate",
      "target": "CRYPTO-0014: RSA-2048",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4dfff801-c13c-4ccc-ad5c-fb013ee3e016",
      "source": "CRYPTO-0014: RSA-2048",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-607c49ca-1b79-4048-8084-d33b3610828c",
      "source": "Core Application",
      "target": "Cryptographic Module",
      "label": "CONTAINS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-3cd1f2c8-a30b-4f2f-b8d9-e5c9e838d857",
      "source": "Cryptographic Module",
      "target": "jsonwebtoken",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-e7e04843-b765-4215-ad36-7bd55767a931",
      "source": "jsonwebtoken",
      "target": "CRYPTO-0015: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4dea9367-b04c-46a2-b832-54e1999fbe19",
      "source": "Cryptographic Module",
      "target": "crypto-js",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-f6e2c3e8-3d04-4587-9e36-8130c811888c",
      "source": "crypto-js",
      "target": "CRYPTO-0016: AES/SHA-256",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-eeacd864-ed86-4f69-a6b8-00a114518433",
      "source": "Cryptographic Module",
      "target": "cryptography",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-743b0007-4c6c-47d1-b141-c741e0b2e803",
      "source": "cryptography",
      "target": "CRYPTO-0017: RSA/ECDSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-629b6ef0-3170-4383-90f4-f02ee6d25fa2",
      "source": "Cryptographic Module",
      "target": "pyjwt",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-545b718a-5326-4400-aa5e-fbafdd32045f",
      "source": "pyjwt",
      "target": "CRYPTO-0018: RSA/ECDSA",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d3195eee-7be9-4b20-91b0-31db047eebf9",
      "source": "Cryptographic Module",
      "target": "hashlib",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-96cb0f70-bd70-494b-8be9-d560a194b85e",
      "source": "Cryptographic Module",
      "target": "pycryptodome",
      "label": "USES",
      "animated": false,
      "style": {
        "stroke": "#a78bfa",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-197b7654-0268-4bdb-929c-a62d1229f652",
      "source": "pycryptodome",
      "target": "CRYPTO-0021: RSA/AES",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-b565298c-1b22-41b9-8e8b-f68c925f2392",
      "source": "Cryptographic Module",
      "target": "OpenSSL",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-9e163dc7-74f7-49f3-a5e2-8bb7f5c77d7a",
      "source": "OpenSSL",
      "target": "CRYPTO-0022: OpenSSL",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-ce073b8f-ed0c-46ec-87d0-ee4f2f222485",
      "source": "Cryptographic Module",
      "target": "X.509 PKI Trust Store",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-d9b1cf9b-4d72-4dba-a859-19ce14888962",
      "source": "X.509 PKI Trust Store",
      "target": "CRYPTO-0023: X.509 PKI Trust Store",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-46440989-010a-407d-b0d9-4838922e9947",
      "source": "CRYPTO-0023: X.509 PKI Trust Store",
      "target": "X.509 Certificate Chain",
      "label": "BINDS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-4613cd0f-91ad-4b84-812b-6f02f7a97093",
      "source": "Cryptographic Module",
      "target": "OpenSSL libssl",
      "label": "USES",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    },
    {
      "id": "e-c84c23fc-bf73-40c5-b21f-f27fb80ec182",
      "source": "OpenSSL libssl",
      "target": "CRYPTO-0024: OpenSSL libssl",
      "label": "IMPLEMENTS",
      "animated": true,
      "style": {
        "stroke": "#38bdf8",
        "strokeWidth": 2
      }
    }
  ]
}) as any;

export const OFFLINE_AGILITY: any = ({
  "average_score": 1.48,
  "rating": "LOW",
  "total_assets_assessed": 96,
  "radar_data": [
    {
      "dimension": "C1: Operation Coupling",
      "score": 1.21,
      "fullMark": 4.0
    },
    {
      "dimension": "C2: Creation Coupling",
      "score": 1.02,
      "fullMark": 4.0
    },
    {
      "dimension": "C3: Provider Coupling",
      "score": 1.5,
      "fullMark": 4.0
    },
    {
      "dimension": "C4: Decoupling Mechanism",
      "score": 1.15,
      "fullMark": 4.0
    },
    {
      "dimension": "C5: Decoupling Authority",
      "score": 1.0,
      "fullMark": 4.0
    },
    {
      "dimension": "E1: Algorithm Migration",
      "score": 2.31,
      "fullMark": 4.0
    },
    {
      "dimension": "E2: Provider Migration",
      "score": 2.19,
      "fullMark": 4.0
    }
  ]
}) as any;

export const OFFLINE_DRIFT: DriftSnapshot[] = ([
  {
    "id": "7585446f-7e98-4b55-9af1-c646ec68e715",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "20fc0ffb-9dea-43f9-9d90-1f0dd67877e2",
    "previous_scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "total_assets_diff": 0,
    "new_assets_count": 0,
    "removed_assets_count": 0,
    "modified_assets_count": 0,
    "created_at": "2026-10-05T18:00:22.634831",
    "events": []
  },
  {
    "id": "ac9c0889-13ba-47bf-a4a6-eb6dc8cafac9",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "2d3c7e95-c142-424e-af44-7ab12736b765",
    "previous_scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "total_assets_diff": 0,
    "new_assets_count": 0,
    "removed_assets_count": 0,
    "modified_assets_count": 0,
    "created_at": "2026-10-05T18:00:22.489710",
    "events": []
  },
  {
    "id": "147192fa-a381-4cd4-bf51-49048cb3ad09",
    "project_id": "660de637-af8a-4c6f-a5c0-aff97ca0795f",
    "scan_id": "d6d7317b-6472-43e2-803e-9211943a9551",
    "previous_scan_id": "43b724c2-7ad4-4aae-83c2-21b9c6a29bab",
    "total_assets_diff": 0,
    "new_assets_count": 0,
    "removed_assets_count": 0,
    "modified_assets_count": 0,
    "created_at": "2026-10-05T17:59:31.006047",
    "events": []
  }
]) as any[];

export const OFFLINE_POLICIES: PolicyViolation[] = ([
  {
    "id": "bff3809c-ead8-434a-9a86-de4db5119bad",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "f40ae903-22dc-408b-a2c8-d441f6b320f3",
    "severity": "CRITICAL",
    "rule_code": "POL-004",
    "message": "Legacy 64-bit block cipher 3DES/DES detected. Vulnerable to Sweet32 attacks.",
    "evidence_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "6d17970d-12f0-4b7a-b7c8-6979ad46135e",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "f7fbfa01-9d73-4f2f-b79a-bc8e2055f4d2",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "0200ca4d-af36-4dda-b48c-98a420becff4",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "5c7ce7cc-63ce-4f99-8b94-422f585de05c",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography==42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "2e4becd7-4433-4552-8f63-fb1c0b84142f",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pyjwt==2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "814d9b0c-0f19-485f-a444-8a1c34837227",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography>=41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "bf8160e6-7e81-4a63-9dd5-b6df077f9b25",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pycryptodome>=3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T18:00:22.636836"
  },
  {
    "id": "9a1a5177-f898-4956-807b-63e9c5ccb495",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "created_at": "2026-10-05T18:00:22.635831"
  },
  {
    "id": "d746a9e1-40cf-4f9e-a221-3cbd1419a46a",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "created_at": "2026-10-05T18:00:22.635831"
  },
  {
    "id": "5b815681-2e87-4aca-b9cc-bb33f8db9588",
    "severity": "CRITICAL",
    "rule_code": "POL-003",
    "message": "RSA key size of 256 bits is below enterprise minimum threshold of 2048 bits.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T18:00:22.635831"
  },
  {
    "id": "b848c58e-84ba-47e5-9bac-6a789fb00d9f",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T18:00:22.635831"
  },
  {
    "id": "dd2f2323-1f7e-478e-9bc1-c415628f010d",
    "severity": "CRITICAL",
    "rule_code": "POL-001",
    "message": "MD5 hash algorithm detected. Collisions can be generated in seconds.",
    "evidence_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "created_at": "2026-10-05T18:00:22.635831"
  },
  {
    "id": "8e30ae4b-f5a4-419a-b9b4-766cc4bc7194",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "c817921b-3896-4c94-b15d-fa9b9eaf720a",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "7bea7e10-1e6f-4504-9bcd-0e75f3723c44",
    "severity": "CRITICAL",
    "rule_code": "POL-003",
    "message": "RSA key size of 256 bits is below enterprise minimum threshold of 2048 bits.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "ee0c6e2a-d9b4-4fed-a4c5-13c85c1d3fb7",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "2724eaf1-31ab-4614-98a4-81760e894643",
    "severity": "CRITICAL",
    "rule_code": "POL-001",
    "message": "MD5 hash algorithm detected. Collisions can be generated in seconds.",
    "evidence_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "4f593804-8337-49b6-8178-b233e29f6905",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "9a4bd32f-8fa9-4c43-9af1-aae7b2265a8a",
    "severity": "CRITICAL",
    "rule_code": "POL-004",
    "message": "Legacy 64-bit block cipher 3DES/DES detected. Vulnerable to Sweet32 attacks.",
    "evidence_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "4d7ea1f8-b0f1-42c8-859a-92f4d6dce9b3",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "e633b5f6-babb-45e8-8f93-ea551f7f07e9",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "ccbe468e-4fd8-4cb1-b3a3-32ef6d4a6221",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "c002f987-9638-4697-bbb9-66180f866f55",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography==42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "beb7f68f-b8d3-428d-aa1f-05734cd63f80",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pyjwt==2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "34d7d8bc-359f-44d3-b104-707fbe5b83b0",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography>=41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "693f9e66-b7ef-4f68-8e10-226581275bec",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pycryptodome>=3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T18:00:22.494381"
  },
  {
    "id": "2635785d-5f6c-4a74-9874-585ccbc9afc9",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "fa545acc-d845-4e06-a7f3-13706e8b8bb0",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "a2683879-4c3e-4c86-bf2f-dd93f6561d42",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "de317cfc-2548-4087-8c83-a60b52b85088",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography==42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "81b4ffc1-7be3-4422-a934-c6eb581be768",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pyjwt==2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "f900bcb2-a735-444a-959b-3b0c24afbee8",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography>=41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "84ce799b-a40d-4401-80ab-d87da7ec97e6",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pycryptodome>=3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T17:59:31.012452"
  },
  {
    "id": "b023794d-59be-42e2-b0c9-010c92130c15",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "33498b6d-502c-48b5-ab62-22bc9573ab88",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "7fd5b68f-5f32-49ba-9750-237f7a93a179",
    "severity": "CRITICAL",
    "rule_code": "POL-003",
    "message": "RSA key size of 256 bits is below enterprise minimum threshold of 2048 bits.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "026c9bdb-02ae-49d0-a618-9fcee2d00762",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "7eab279a-8150-4ce7-8e61-8c0f281703f5",
    "severity": "CRITICAL",
    "rule_code": "POL-001",
    "message": "MD5 hash algorithm detected. Collisions can be generated in seconds.",
    "evidence_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "b2be1eb5-3c07-4421-a1d7-b8fea0b169f7",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "ce7c3920-7452-41b4-add3-587ad0279926",
    "severity": "CRITICAL",
    "rule_code": "POL-004",
    "message": "Legacy 64-bit block cipher 3DES/DES detected. Vulnerable to Sweet32 attacks.",
    "evidence_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "created_at": "2026-10-05T17:59:31.011409"
  },
  {
    "id": "0305558d-baaa-47e2-8167-5d55a4e9ade6",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\nfunction initGatewayKeypair() {\n    return crypto.generateKeyPairSync('rsa', {\n        modulusLength: 2048,\n        publicKeyEncoding: { type: 'spki', format: 'pem' },",
    "file_path": "api-gateway/src/server.js",
    "line_number": 15,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "f6c1fb7a-e71d-4f50-9af5-09ae5f89a1d2",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "    def __init__(self):\n        # Generate enterprise RSA-2048 keypair for signing JSON Web Tokens\n        self.private_key = rsa.generate_private_key(\n            public_exponent=65537,\n            key_size=2048\n        )\n        self.public_key = self.private_key.public_key()\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 11,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "c34891a6-8288-4a9f-9f04-4835189813f8",
    "severity": "CRITICAL",
    "rule_code": "POL-003",
    "message": "RSA key size of 256 bits is below enterprise minimum threshold of 2048 bits.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "d272ff6d-1b6d-4139-8c74-57c4471fe54c",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        # Mint RS256 token signed with RSA private key\n        payload = {\"sub\": user_id, \"iss\": \"bharatpay.auth.internal\"}\n        token = jwt.encode(payload, \"secret-key\", algorithm=\"RS256\")\n        return token\n",
    "file_path": "auth-service/src/auth.py",
    "line_number": 20,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "109dfe3c-1a22-481e-b851-7d5c94082529",
    "severity": "CRITICAL",
    "rule_code": "POL-001",
    "message": "MD5 hash algorithm detected. Collisions can be generated in seconds.",
    "evidence_snippet": "def legacy_checksum(data: str) -> str:\n    # Legacy MD5 checksum - deprecated hygiene finding\n    return hashlib.md5(data.encode('utf-8')).hexdigest()",
    "file_path": "auth-service/src/session.py",
    "line_number": 9,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "101148c4-afce-425f-aa30-b347ca607da2",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "        \n        # Elliptic Curve SECP256R1 for payment transaction signing\n        self.ec_signing_key = ec.generate_private_key(curve=ec.SECP256R1())\n\n    def encrypt_cardholder_data(self, plaintext: bytes) -> bytes:",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 11,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "b2e76ee4-0b6d-48d3-9300-82e69238a3b5",
    "severity": "CRITICAL",
    "rule_code": "POL-004",
    "message": "Legacy 64-bit block cipher 3DES/DES detected. Vulnerable to Sweet32 attacks.",
    "evidence_snippet": "    def legacy_triple_des_migration(self, legacy_blob: bytes, key_3des: bytes):\n        # Legacy 3DES module for backward compatibility with 1990s POS terminals\n        cipher = Cipher(algorithms.TripleDES(key_3des), modes.CBC(b\"01234567\"))\n        decryptor = cipher.decryptor()\n        return decryptor.update(legacy_blob) + decryptor.finalize()",
    "file_path": "payment-service/src/crypto_vault.py",
    "line_number": 22,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "4ab795e0-cd50-496d-9387-55a7528639cb",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nIssuer: CN=BharatPay Internal CA,O=BharatPay Root Authority,C=IN\nPublic Key Algorithm: ECDSA (256 bits)\nSignature Algorithm: ecdsa-with-SHA256\nValidity: 2026-10-05T09:49:37+00:00 to 2031-10-04T09:49:37+00:00",
    "file_path": "certificates/bharatpay_ca_ec.crt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "573a621f-9b05-4bf8-9e32-02f81b5fc5ec",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "Subject: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nIssuer: CN=api.bharatpay.internal,O=BharatPay Payments Ltd,C=IN\nPublic Key Algorithm: RSA (2048 bits)\nSignature Algorithm: sha256WithRSAEncryption\nValidity: 2026-10-05T09:49:37+00:00 to 2028-10-04T09:49:37+00:00",
    "file_path": "certificates/payment_gateway_rsa.crt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "26dcb7d0-c265-4ab3-8da6-7097892e99d8",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "\"jsonwebtoken\": \"^9.0.2\"",
    "file_path": "api-gateway/package.json",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "a0aadbf6-775a-468f-b946-3f74c93ec928",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography==42.0.5",
    "file_path": "auth-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "611957e8-36a0-45c7-a245-02623e6d0a6d",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pyjwt==2.8.0",
    "file_path": "auth-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "ad0c228e-6fad-4c58-84a8-e84b0de2d3b2",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/ECDSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "cryptography>=41.0.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 1,
    "created_at": "2026-10-05T17:59:30.852045"
  },
  {
    "id": "7fd1499d-9fe5-4c94-beb9-7a2d3bb19531",
    "severity": "HIGH",
    "rule_code": "POL-005",
    "message": "Asset 'RSA/AES' has data lifetime + migration time exceeding quantum horizon (Mosca deficit). Harvest Now Decrypt Later risk.",
    "evidence_snippet": "pycryptodome>=3.20.0",
    "file_path": "payment-service/requirements.txt",
    "line_number": 2,
    "created_at": "2026-10-05T17:59:30.852045"
  }
]) as any[];
