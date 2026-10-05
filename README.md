# PRIME: Postquantum Readiness Intelligence & Migration Engine
**Enterprise Cryptographic Discovery, Risk Assessment & PQC Migration Platform**

[![SIH26164](https://img.shields.io/badge/SIH-SIH26164-blue.svg)](https://www.sih.gov.in/)
[![Organization](https://img.shields.io/badge/Organization-NTRO-red.svg)](https://ntro.gov.in/)
[![Team](https://img.shields.io/badge/Team-PRAYAS-green.svg)](#)
[![Standards](https://img.shields.io/badge/NIST-FIPS%20203%20%7C%20204%20%7C%20205-purple.svg)](https://csrc.nist.gov/)
[![CBOM](https://img.shields.io/badge/CBOM-CycloneDX%201.7-orange.svg)](https://cyclonedx.org/)
[![SARIF](https://img.shields.io/badge/SARIF-2.1.0-yellow.svg)](https://sarifweb.azurewebsites.net/)
[![Tests](https://img.shields.io/badge/Automated%20Tests-17%2F17%20Passing-brightgreen.svg)](#automated-testing)

---

## 1. Mission & Engineering Principles

PRIME is an enterprise-grade cryptographic discovery, explainable quantum risk, cryptographic agility, and post-quantum migration platform built for **National Technical Research Organisation (NTRO)** under **SIH26164**.

### Core Engineering Guarantees:
1. **Zero Mockups & Zero Hallucinations**: Every displayed finding, metric, risk score, and benchmark comes directly from real scanner AST parsing, cryptographic execution, or relational database records.
2. **Evidence-First Architecture**: Every finding carries verifiable file paths, exact line numbers, syntax-highlighted code excerpts, detection rules, and confidence classifications (`CONFIRMED`, `STRONG_INFERENCE`, `WEAK_INFERENCE`, `MANUAL`).
3. **Explicit Coverage Accounting**: Explicitly reports files assessed, supported, unsupported, skipped, and failed. PRIME never claims "100% secure" or "all cryptography detected."
4. **Purpose-Aware PQC Recommendations**: Strictly distinguishes cryptographic purpose (`digital_signature` $\rightarrow$ FIPS 204 ML-DSA vs `key_establishment` $\rightarrow$ FIPS 203 ML-KEM). Never recommends ML-KEM as a universal RSA replacement.
5. **Radical Air-Gapped & Local-First Operation**: Runs 100% locally with zero external AI APIs, zero cloud dependencies, and zero outbound telemetry. Uploaded binaries are **NEVER executed**.

---

## 2. Complete Architectural Overview

```
                                      [ Monitored Enterprise Software Stack ]
                                                         │
             ┌───────────────────────┬───────────────────┼───────────────────┬───────────────────────┐
             ▼                       ▼                   ▼                   ▼                       ▼
      [ Source Code ]         [ Dependencies ]     [ Certificates ]    [ Container/Binary ]    [ Network & Cloud ]
    Python AST, JS/TS,        pip, npm, Maven,     X.509 PEM / DER     Dockerfile, static      Authorized TLS 1.3
    Java JCA, C OpenSSL       Cargo, lockfiles     ASN.1 Chain         PE/ELF/Mach-O           SSRF Guard, AWS/HSM
             │                       │                   │                   │                       │
             └───────────────────────┴───────────────────┼───────────────────┴───────────────────────┘
                                                         │
                                                         ▼
                                             [ Scanner Orchestrator ]
                                       (Coverage, Errors, Safe Sandboxing)
                                                         │
                                                         ▼
                                            [ Normalization & Fusion ]
                                          (Evidence, Line Excerpts)
                                                         │
                                                         ▼
                                            [ Relational Database ]
                                        (SQLite / PostgreSQL Models)
                                                         │
         ┌────────────────────────┬──────────────────────┼──────────────────────┬────────────────────────┐
         ▼                        ▼                      ▼                      ▼                        ▼
 [ Quantum Risk Engine ]  [ Mosca's Theorem ]    [ Agility Engine ]    [ Policy Compliance ]    [ Validation Lab ]
 - Shor / Grover Threat   - X + Y > Z Matrix     - 7 Dimensions        - POL-001 to POL-007     - Real Local Crypto
 - Classical Hygiene      - Interactive Slider   - Radar Visualizer    - Code Violations        - True μs Latency
 - 8 Risk Dimensions      - Deficit Calculator   - Agility Index       - CI/CD Gateways         - Payload Expansion
         │                        │                      │                      │                        │
         └────────────────────────┴──────────────────────┼──────────────────────┴────────────────────────┘
                                                         │
                                                         ▼
                                            [ REST API & Export Layer ]
                                                         │
                         ┌───────────────────────────────┴───────────────────────────────┐
                         ▼                                                               ▼
        [ Enterprise React 19 Dashboard ]                             [ Machine-Readable Standards Export ]
         - 8 Specialized Operational Views                             - CycloneDX 1.7 CBOM JSON
         - React Flow Dependency Topology                              - SARIF 2.1.0 Static Analysis
         - Explanatory "Why did PRIME say this?"                       - Executive Dark Navy HTML Report
         - Temporal Drift Timeline (Scan N vs N-1)                     - CI Exit Codes & Automation
```

---

## 3. Core Engine Capabilities

### A. Multi-Layer Discovery Scanners (`backend/app/scanners/`)
- **Python AST Scanner**: Uses native `ast` to inspect call-sites (`rsa.generate_private_key`, `Cipher`, `hashes`, `jwt.encode`).
- **JavaScript / TypeScript Scanner**: Inspects Node.js `crypto`, Web Crypto API (`window.crypto.subtle`), and modern KDFs.
- **Java JCA Scanner**: Extracts `KeyPairGenerator`, `Cipher`, `Signature`, `KeyAgreement`, and `MessageDigest`.
- **C / C++ OpenSSL Scanner**: Analyzes OpenSSL / BoringSSL `EVP_*` symbol bindings.
- **X.509 Certificate Scanner**: Safely extracts Public Keys, Expirations, Curves, and Signatures without ever reading or storing private keys.
- **Static Binary Scanner**: Non-executing PE, ELF, and Mach-O parser analyzing section headers and imported symbol tables.
- **Authorized Network TLS Scanner**: Probes administrator-allowlisted endpoints for TLS 1.3 and RFC 10024 hybrid PQC groups (`X25519MLKEM768`) with strict SSRF protection.
- **Declared Cloud & HSM Connector**: Catalogs AWS KMS, Azure Key Vault, Google Cloud KMS, and PKCS#11 HSM keys with transparent `DECLARED` provenance.

### B. Dr. Michele Mosca's Theorem Urgency Formulation
- Evaluates:
  $$\text{Mosca Deficit} = (\text{Data Lifetime } X + \text{Migration Time } Y) - \text{Quantum Horizon } Z$$
- Flags assets as `TIME_AT_RISK` when sensitive ciphertext will outlive the emergence of a Cryptanalytically Relevant Quantum Computer (CRQC).
- Includes an interactive slider sandbox for scenario stress-testing.

### C. 7-Dimension Cryptographic Agility Model
Formally assesses architecture per **NIST CSWP 39upd1** and **Rameshan & Messmer (2026)**:
- **C1 Operation Coupling**: Degree of algorithm binding at call sites (0.0 to 4.0).
- **C2 Creation Coupling**: Flexibility of key generation and credential creation.
- **C3 Provider Coupling**: Direct binding to specific crypto libraries vs abstract providers.
- **C4 Decoupling Mechanism**: Presence of dependency-injection or crypto facades.
- **C5 Decoupling Authority**: Configuration-driven vs code-compiled algorithm control.
- **E1 Algorithm Migration Capability**: Engineering effort to introduce PQC algorithms.
- **E2 Provider Migration Capability**: Friction of swapping underlying cryptographic providers.

### D. Enterprise Policy Compliance (`backend/app/policies/`)
Configurable policies (`knowledge_base/policy_defaults.json`) flagging:
- `POL-001`: Deprecated MD5 hashing.
- `POL-002`: Deprecated SHA-1 in digital signatures.
- `POL-003`: Legacy RSA modulus $< 2048$ bits.
- `POL-004`: Legacy 3DES / DES symmetric ciphers.
- `POL-005`: Mosca deficit violation ($X + Y > Z$).
- `POL-006`: Insecure TLS baseline ($< 1.2$).
- `POL-007`: Expiring X.509 public certificates ($< 30$ days).

### E. Migration Validation Lab (`backend/app/validation/`)
- A real, non-simulated cryptographic benchmarking environment executing genuine local operations.
- Measures real hardware CPU microseconds ($\mu s$), keygen, signature, verification latencies, and payload expansion comparing classical primitives (RSA, ECDSA, ECDH) against finalized NIST standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA).

### F. Cryptographic Drift Engine (`backend/app/drift/`)
- Compares temporal scan snapshots (`Scan N` vs `Scan N-1`).
- Identifies `NEW_CRYPTO`, `REMOVED_CRYPTO`, `CHANGED_ALGORITHM`, `CHANGED_KEY_SIZE`, and net quantum risk delta over time.

---

## 4. Quickstart Guide

### Option A: Local Dev Server (Current Active Mode)

#### 1. Backend Service
```powershell
# From workspace root
$env:PYTHONPATH="backend"
backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
API Documentation available at: `http://127.0.0.1:8000/docs`

#### 2. Frontend Web Interface
```powershell
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```
Open your browser at: `http://127.0.0.1:5173/`

#### 3. Automated Test Suite (17/17 Passing)
```powershell
$env:PYTHONPATH="backend"
backend\venv\Scripts\python.exe -m pytest tests/ -v
```

### Option B: Docker Compose Deployment
```bash
docker compose up --build -d
```
Access the unified application at: `http://localhost:8000/`

---

## 5. Golden Demonstration Walkthrough ("BharatPay Demo Enterprise")

PRIME includes a realistic synthetic enterprise stack (`demo/bharatpay/`):
- `auth-service`: RSA-2048 keypair generation, JWT RS256 token signing, hashlib SHA-256, legacy MD5 checksum.
- `payment-service`: AES-256-CBC, ECDSA SECP256R1 transaction signing, legacy 3DES cipher.
- `api-gateway`: Node.js `crypto.createHash`, `createCipheriv` AES-256-GCM, RSA keygen.
- `certificates`: Self-signed RSA-2048 and ECDSA P-256 X.509 public certificates.
- `docker`: Dockerfile configuring OpenSSL and container PKI trust roots.

### 24-Step Evaluation Workflow:
1. Open PRIME at `http://127.0.0.1:5173/`.
2. Select **BharatPay Demo Enterprise** from the top navigation.
3. Observe real database metrics: **24 Total Assets**, **14 Quantum Vulnerable**, **14 High Risk**, **Mosca Status: AT RISK (+6.0 Years)**.
4. Interact with the **Mosca Risk Formulation Simulator** sliders to stress-test threat horizons.
5. Navigate to the **Cryptographic Inventory** tab; search and filter across purpose, algorithm, and application.
6. Click **Inspect** on asset `CRYPTO-0004` (RSA-2048 in `auth.py`).
7. Inspect the **Traceable Code Evidence** showing exact line numbers and syntax-highlighted code.
8. Validate purpose (`digital_signature`) and confidence classification (`CONFIRMED`).
9. Review **Quantum Exposure** (Shor's algorithm factoring vulnerability).
10. Review **Data Lifetime ($X$)** (12 years) and business criticality.
11. Examine the **Mosca Breakdown**: $12.0 + 4.0 - 10.0 = +6.0$ years deficit.
12. Review **Migration Effort**: `HIGH` due to AST call-site density and tight library binding.
13. Open the **Crypto Agility** tab to inspect the 7-dimension radar chart and agility index (`1.7 / 4.0`).
14. Open the **Topology Graph** and **Blast Radius** tabs to review upstream microservices and buffer expansion warnings.
15. Inspect the purpose-aware NIST PQC recommendation: **ML-DSA-65 (FIPS 204)**.
16. Review the phased **Migration Work Package** steps.
17. Open the **Validation Lab** view.
18. Run the live benchmark comparing **RSA-2048** vs **ML-DSA-65**.
19. Inspect real local microsecond execution latencies and signature expansion metrics.
20. Navigate to **Policy Compliance** to review pass/fail baselines across POL-001 through POL-007.
21. Navigate to **Drift Analysis** to observe scan-to-scan differential telemetry.
22. Click **CBOM 1.7** in the top navigation to download the standardized CycloneDX 1.7 JSON.
23. Click **SARIF 2.1** to export static analysis results for DevSecOps pipelines.
24. Click **Executive Report** to view the printable high-contrast audit document.

---

## 6. Comprehensive Technical Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md): System architecture and data flow.
- [SCANNER_DESIGN.md](docs/SCANNER_DESIGN.md): Discovery pipeline, parsers, and coverage accounting.
- [RISK_MODEL.md](docs/RISK_MODEL.md): Deterministic 8-dimension risk scoring and Mosca's theorem.
- [AGILITY_MODEL.md](docs/AGILITY_MODEL.md): 7-dimension cryptographic agility framework.
- [RECOMMENDATION_ENGINE.md](docs/RECOMMENDATION_ENGINE.md): Purpose-aware NIST PQC recommendation logic.
- [CBOM_MAPPING.md](docs/CBOM_MAPPING.md): CycloneDX 1.7 schema mappings and provenance taxonomy.
- [SECURITY.md](docs/SECURITY.md): Product security, untrusted input protection, SSRF guards, and private key redaction.
- [LIMITATIONS.md](docs/LIMITATIONS.md): Operational boundaries, radical honesty, and coverage disclosure.
- [RESEARCH_REFERENCES.md](docs/RESEARCH_REFERENCES.md): Authoritative NIST, IETF, and academic papers.
- [DEMO_GUIDE.md](docs/DEMO_GUIDE.md): Detailed 24-step hackathon jury demonstration script.

---

## 7. License & Project Metadata

- **Project**: PRIME (Postquantum Readiness Intelligence & Migration Engine)
- **Problem Statement**: SIH26164
- **Organization**: National Technical Research Organisation (NTRO)
- **Team**: PRAYAS
- **Theme**: Blockchain & Cybersecurity
