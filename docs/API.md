# ECDAT REST API Reference

Base URL: `http://localhost:8000/api/v1`
Interactive Swagger UI: `http://localhost:8000/docs`
ReDoc Specification: `http://localhost:8000/redoc`

---

## 1. System Health
### `GET /health`
Returns system status, version, and supported standards.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "service": "ECDAT API",
  "version": "1.0.0",
  "standards": [
    "NIST FIPS 203 (ML-KEM)",
    "NIST FIPS 204 (ML-DSA)",
    "NIST FIPS 205 (SLH-DSA)",
    "CycloneDX 1.6 CBOM"
  ]
}
```

---

## 2. Project Management

### `POST /projects`
Creates a new monitored enterprise project.

**Request Body:**
```json
{
  "name": "Core Banking Platform",
  "description": "Financial core system handling RTGS transactions",
  "organization": "National Technical Research Organisation",
  "business_criticality": "CRITICAL",
  "data_lifetime_years": 12.0,
  "migration_time_years": 4.0,
  "quantum_horizon_years": 10.0
}
```

### `GET /projects`
Lists all monitored projects.

### `GET /projects/{project_id}`
Retrieves project details and configured Mosca parameters.

### `PUT /projects/{project_id}`
Updates project configuration and Mosca parameters.

---

## 3. Discovery Scans

### `POST /projects/{project_id}/scans`
Initiates a cryptographic discovery scan. Supports both local path and file upload.

**Form Parameters:**
- `repository_path` (string, optional): Local directory path (e.g. `demo/bharatpay`).
- `file` (file upload, optional): `.zip` archive of source repository.

**Response (200 OK):**
```json
{
  "id": "scan_uuid",
  "project_id": "proj_uuid",
  "target_type": "SOURCE_REPOSITORY",
  "status": "COMPLETED",
  "total_files": 1284,
  "analyzed_files": 1284,
  "findings_count": 24,
  "certificates_count": 2,
  "libraries_count": 5
}
```

### `GET /scans/{scan_id}`
Retrieves scan execution metrics.

---

## 4. Cryptographic Inventory & Assets

### `GET /projects/{project_id}/assets`
Retrieves normalized cryptographic findings with evidence, risk, and recommendations.

**Query Parameters:**
- `algorithm` (string): Filter by algorithm name (e.g. `RSA`, `AES`).
- `purpose` (string): Filter by purpose (`digital_signature`, `key_establishment`, etc.).
- `risk` (string): Filter by overall risk (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
- `library` (string): Filter by library name.

### `GET /assets/{asset_id}`
Retrieves detailed asset view including:
- Exact line number, code snippet evidence, and detection rule.
- Full Mosca theorem formulation and quantum risk explanation.
- Purpose-aware NIST PQC recommendation with tradeoffs.
- Migration blast radius and actionable verification items.

---

## 5. Dependency Graph

### `GET /projects/{project_id}/dependencies`
Returns multi-layer topological graph formatted for **React Flow**:
- Nodes: Application, Component, Library, Crypto Asset, Certificate.
- Edges: Labeled as `OBSERVED`, `INFERRED`, or `DECLARED`.

---

## 6. Live Dashboard Telemetry

### `GET /projects/{project_id}/dashboard`
Returns live calculated metrics directly from the relational database:
- `total_crypto_assets`, `quantum_exposed_assets`, `critical_risk_assets`
- `risk_distribution`, `algorithm_distribution`, `purpose_distribution`
- `top_migration_priorities`
- `recent_scans`

---

## 7. Standards Export

### `GET /projects/{project_id}/cbom`
Generates and downloads standardized **CycloneDX 1.6 Cryptographic Bill of Materials (CBOM)** JSON.

### `GET /projects/{project_id}/report`
Renders standalone **Executive Cryptographic Audit & PQC Report** in dark-navy HTML.
