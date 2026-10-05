# ECDAT System Architecture & Design Specification

## Problem Statement SIH26164 (NTRO)
Organizations preparing for the transition to Post-Quantum Cryptography require systematic cryptographic asset discovery, quantum risk evaluation, dependency mapping, and purpose-aware migration paths.

---

## 1. High-Level Architecture

ECDAT employs a modular, decoupled architecture organized into distinct functional layers:

```
[ FRONTEND LAYER ]
  React 19 + TypeScript + Vite + Tailwind CSS
  Interactive React Flow Topology Graph (@xyflow/react)
  Real-time Telemetry Visualizations (Recharts)
  Mosca Theorem Parameter Simulator
        ▲
        │ REST API (JSON / FormData / SSE)
        ▼
[ API & BACKEND ENGINE ]
  FastAPI Asynchronous Gateway
  Pydantic v2 Strong Typing & Schema Validation
  SQLAlchemy 2.0 ORM with PostgreSQL & SQLite engines
        ▲
        │ Modular Discovery & Analysis Interfaces
        ▼
[ CORE ANALYSIS MODULES ]
  1. Scanner Orchestrator:
     ├── SourceScanner (Python AST, JS/TS, Java JCA, Go, C/C++)
     ├── CertificateScanner (X.509 ASN.1 with cryptography library)
     ├── LibraryScanner (pip requirements, npm package.json, Maven pom.xml)
     ├── ContainerScanner (Dockerfiles, compose specs)
     └── BinaryScanner (Safe static string & symbol heuristics)
  2. Quantum Risk Engine:
     ├── Mosca Theorem Evaluator (X + Y > Z)
     ├── Shor's & Grover's Exposure Classifier
     └── Cryptographic Hygiene Evaluator
  3. PQC Recommendation Engine:
     ├── NIST FIPS 203 (ML-KEM)
     ├── NIST FIPS 204 (ML-DSA)
     ├── NIST FIPS 205 (SLH-DSA)
     └── FIPS 197 (AES-256 Symmetric Key Growth)
  4. Dependency & Blast Radius Engine:
     ├── Relational Graph Builder (Application -> Component -> Library -> Crypto -> Cert)
     ├── React Flow Coordinate Formatter
     └── Blast Radius Sizer & Verification Checklist Generator
  5. Reporting & Standards Engine:
     ├── CycloneDX 1.6 Cryptographic Bill of Materials (CBOM)
     └── Executive Audit HTML Report Generator
```

---

## 2. Data Models & Entity Relationships

The relational database enforces clean data provenance and traceability:

- **`Project`**: Organization profile, business criticality (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), and Mosca theorem assumptions ($X$, $Y$, $Z$).
- **`Scan`**: Audit execution run tracking timestamp, status, file counts, and findings metrics.
- **`CryptoAsset`**: Normalized cryptographic asset (`CRYPTO-XXXX`) capturing algorithm, key size, curve, purpose, confidence, application, component, library, file path, and line number.
- **`Evidence`**: Linked $1:1$ with `CryptoAsset`, recording exact line ranges, surrounding code snippet, and detection rule.
- **`RiskAssessment`**: Linked $1:1$ with `CryptoAsset`, capturing overall risk, quantum exposure category, hygiene status, Mosca status, margin in years, and markdown explanation.
- **`Recommendation`**: Linked $1:1$ with `CryptoAsset`, capturing target NIST PQC primitive, parameter set, alternative PQC, rationale, and tradeoffs.
- **`MigrationAssessment`**: Linked $1:1$ with `CryptoAsset`, capturing blast radius metrics and actionable verification items.
- **`Dependency`**: Graph edges between applications, components, libraries, crypto assets, and certificates, labeled as `OBSERVED`, `INFERRED`, or `DECLARED`.
- **`Certificate`**: Parsed public X.509 certificate metadata.

---

## 3. Extensibility & Future Roadmap

The architecture is deliberately designed to scale into a continuous enterprise cryptovigilance platform:
- **CI/CD Scanner Adapter**: Can be executed as a pre-commit hook or GitHub Action to prevent quantum-vulnerable primitives from merging into main repositories.
- **Continuous Secret & HSM Discovery**: Adapter slots for AWS KMS, Azure Key Vault, HashiCorp Vault, and PKCS#11 hardware security modules.
- **Celery / Redis Job Queue**: The `ScanService` interface can switch from synchronous background tasks to a distributed task queue without altering API contracts.
