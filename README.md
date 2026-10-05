# ECDAT: Enterprise Cryptographic Discovery & Analysis Tool
**Smart India Hackathon 2026 | Problem Statement SIH26164**
**Organization**: National Technical Research Organisation (NTRO)
**Theme**: Blockchain & Cybersecurity
**Team**: PRAYAS

---

## Executive Overview
**ECDAT** discovers cryptographic usage across enterprise source code, package manifests, X.509 public certificates, container configurations, and compiled binaries. It generates an evidence-backed cryptographic inventory, calculates deterministic quantum risk using **Dr. Michele Mosca's Theorem**, maps multi-layer dependency topologies, recommends finalized NIST Post-Quantum Cryptography standards (**FIPS 203 ML-KEM**, **FIPS 204 ML-DSA**, **FIPS 205 SLH-DSA**), assesses migration blast radius, and exports **CycloneDX 1.6 Cryptographic Bill of Materials (CBOM)** alongside executive audit reports.

---

## System Architecture

```
                                 [ Monitored Enterprise Software ]
                                                 │
            ┌────────────────────────────────────┼──────────────────────────────────┐
            ▼                                    ▼                                  ▼
      Source Code                       X.509 Certificates                Package Manifests
  (Python AST, JS/TS, Java)              (PEM / DER ASN.1)            (pip, npm, Maven, Docker)
            │                                    │                                  │
            └────────────────────────────────────┼──────────────────────────────────┘
                                                 │
                                                 ▼
                                     [ Scanner Orchestrator ]
                                                 │
                                                 ▼
                                     [ Evidence Extraction ]
                                                 │
                                                 ▼
                                  [ Relational Inventory DB ]
                                  (PostgreSQL / SQLite Engine)
                                                 │
                 ┌───────────────────────────────┼───────────────────────────────┐
                 ▼                               ▼                               ▼
       [ Quantum Risk Engine ]      [ PQC Recommendation Engine ]      [ Dependency & Blast Radius ]
        - Mosca Theorem (X+Y>Z)      - FIPS 203 (ML-KEM)                - React Flow Topology
        - Shor & Grover Exposure     - FIPS 204 (ML-DSA)                - Blast Radius Calculator
        - Cryptographic Hygiene      - FIPS 205 (SLH-DSA)               - Interoperability Checklist
                 │                               │                               │
                 └───────────────────────────────┼───────────────────────────────┘
                                                 │
                                                 ▼
                                    [ Fast REST API & Engine ]
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
        [ Enterprise React Dashboard ]                     [ CycloneDX 1.6 CBOM & Reports ]
         - Dark Navy Security UI                            - CycloneDX 1.6 CBOM JSON
         - Interactive Mosca Simulator                      - Executive HTML Audit Report
         - React Flow Dependency Graph
```

---

## Key Capabilities & Verified Vertical Slice

1. **Deterministic Discovery (Zero Hallucination)**:
   - Python AST visitor inspecting `cryptography.hazmat`, `hashlib`, `PyCryptodome`, `PyJWT`.
   - JavaScript/TypeScript pattern matcher for Node.js `crypto`, Web Crypto API `crypto.subtle`, and KDFs.
   - Java pattern matcher for JCA (`KeyPairGenerator`, `Cipher`, `MessageDigest`, `Signature`, `KeyAgreement`).
   - X.509 Certificate Parser extracting subject, issuer, validity, key sizes, curves, without ever reading or storing private keys.
   - Manifest scanner inspecting `requirements.txt`, `package.json`, `pom.xml`, and `Dockerfile`.
   - Non-executing static binary string & symbol heuristic.

2. **Traceable Code Evidence**:
   - Every single asset records the exact file path, starting/ending line numbers, surrounding code context, and detection mechanism.

3. **Dr. Michele Mosca's Theorem Evaluation**:
   - Real-time evaluation of:
     $$\text{Data Lifetime } (X) + \text{Migration Time } (Y) > \text{Quantum Horizon } (Z)$$
   - Transparent markdown explanation showing exact formula values and vulnerability window in years.
   - Interactive UI slider sandbox allowing cybersecurity architects to stress-test horizon assumptions.

4. **Purpose-Aware NIST Finalized PQC Recommendations**:
   - Strictly validates primitive purpose before recommending targets:
     - Digital Signature (`RSA`, `ECDSA`, `Ed25519`) $\rightarrow$ **ML-DSA (FIPS 204)** / **SLH-DSA (FIPS 205)**.
     - Key Establishment (`ECDH`, `DH`, `RSA-OAEP`) $\rightarrow$ **ML-KEM (FIPS 203)** / **Hybrid KEM**.
     - Symmetric Encryption (`AES-128`, `3DES`) $\rightarrow$ **AES-256-GCM (FIPS 197)** (128-bit quantum security against Grover).
     - Weak Hashes (`MD5`, `SHA-1`) $\rightarrow$ **SHA-256 / SHA-384 (FIPS 180-4)**.

5. **Multi-Layer Dependency Graph & Blast Radius**:
   - React Flow visualizer rendering:
     $$\text{Application} \rightarrow \text{Component} \rightarrow \text{Library} \rightarrow \text{Crypto Asset} \rightarrow \text{Certificate}$$
   - Labels relations as **OBSERVED**, **INFERRED**, or **DECLARED**.
   - Blast radius analyzer detailing affected upstream applications, downstream callers, and actionable verification checklists (signature size expansion, buffer limits, client SDK updates).

6. **Standardized Reporting & CBOM Export**:
   - Direct export of **CycloneDX 1.6 CBOM JSON** (`application/json`).
   - Standalone **Executive Cryptographic Audit Report** formatted in high-contrast dark navy HTML.

---

## Quickstart Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- Git

### 1. Backend Setup
```bash
# From workspace root
python -m venv backend/venv

# Windows Powershell
.\backend\venv\Scripts\Activate.ps1
# Linux / macOS
source backend/venv/bin/activate

pip install -r backend/requirements.txt

# Run backend
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://127.0.0.1:5173/`.

### 3. Run Automated Tests
```bash
# Run complete test suite (AST scanner, risk engine, PQC recommendations, full scan, REST APIs)
$env:PYTHONPATH="backend"
pytest tests/ -v
```

---

## Demonstration Workflow: "BharatPay Demo Enterprise"

ECDAT includes a simulated Indian FinTech enterprise stack in `demo/bharatpay/`:
- `auth-service`: RSA-2048 keypair generation, JWT RS256 token signing, hashlib SHA-256, legacy MD5 checksum.
- `payment-service`: AES-256-CBC, ECDSA SECP256R1 transaction signing, legacy 3DES cipher.
- `api-gateway`: Node.js `crypto.createHash`, `createCipheriv` AES-256-GCM, RSA keygen.
- `certificates`: Self-signed RSA-2048 and ECDSA P-256 X.509 public certificates.
- `docker`: Dockerfile configuring OpenSSL and `ca-certificates`.

To run the golden demonstration:
1. Open ECDAT in browser (`http://127.0.0.1:5173/`).
2. Select **BharatPay Demo Enterprise** from the top selector.
3. Observe live KPI cards and the **Mosca Equation Status** (`AT RISK: 12 + 4 > 10`).
4. Interact with the **Mosca Risk Formulation Simulator** sliders to observe dynamic recalculations.
5. Open the **Cryptographic Inventory** tab to inspect all 24 discovered assets.
6. Click **Inspect** on `CRYPTO-0004` (RSA-2048 in `auth.py`) to verify the code snippet evidence, risk score, ML-DSA recommendation, and blast radius.
7. Open the **Dependency Map** tab to inspect the interactive React Flow topology.
8. Open the **Migration Impact & Blast Radius** tab to review the pre-migration architectural checklist.
9. Click **CBOM JSON** in the top navigation to download the CycloneDX 1.6 Cryptographic Bill of Materials.
10. Click **Executive Report** to view the printable audit document.

---

## License & Attribution
Developed for Smart India Hackathon 2026 (SIH26164) by Team PRAYAS for the National Technical Research Organisation (NTRO).
