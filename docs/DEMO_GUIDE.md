# PRIME: 24-Step Golden Demonstration Guide
**Document ID**: DEMO-PRIME-2026-V1  
**Target Audience**: SIH26164 Jury, NTRO Evaluators, Enterprise Security Architects  
**Product**: Postquantum Readiness Intelligence & Migration Engine (PRIME)  
**Team**: PRAYAS (Theme: Blockchain & Cybersecurity)

---

## Complete 24-Step Golden Demonstration Sequence (Section 38)

This exact test script demonstrates every required capability of the PRIME platform using the **BharatPay Demo Enterprise** synthetic environment.

---

### Step 1: Create or Ingest Project
- Open the PRIME platform at `http://127.0.0.1:5173/` (or the unified endpoint at `http://127.0.0.1:8000/`).
- Notice the enterprise-grade dark graphite header displaying the **PRIME** wordmark, the **DEMO MODE — SYNTHETIC DATA** tag, and the **LOCAL / AIR-GAPPED** status badge.
- View the active project: **BharatPay Demo Enterprise (PRJ-BHARATPAY)**.

### Step 2: Select BharatPay Demo Enterprise
- Examine the project baseline parameters:
  - Data Sensitivity: **CRITICAL**
  - Data Lifetime ($X$): **12.0 Years**
  - Migration Duration ($Y$): **4.0 Years**
  - Quantum Threat Horizon ($Z$): **10.0 Years** (Baseline: 2035)

### Step 3: Trigger Discovery Scan
- Trigger the full repository scan via the **Rescan Project** action or via the automated scanner API:
  `POST /api/v1/projects/{id}/scan`
- The system queues the job and instantiates the pluggable scanner orchestrator.

### Step 4: Monitor Real-Time Scanner Progress
- The scanner reports real-time execution states: `QUEUED` $\rightarrow$ `RUNNING` $\rightarrow$ `COMPLETED`.
- Progress metrics record:
  - Files Assessed: `28`
  - Files Supported: `24`
  - Files Skipped: `3` (test mocks & static assets)
  - Files Failed: `0`
  - Total Coverage: `87.5%`

### Step 5: Multi-Artifact Discovery Assessment
The orchestrator coordinates the specialized discovery engines:
- **Source Code**: Python AST (`auth.py`), Node.js crypto (`server.js`), Java JCA (`SignatureService.java`), C OpenSSL (`crypto_core.c`).
- **Dependencies**: `requirements.txt`, `package.json`, `pom.xml`.
- **Certificates**: ASN.1 X.509 PEM parsing of `payment_gateway_rsa.crt` and `bharatpay_ca_ec.crt`.
- **Containers**: `Dockerfile` and `docker-compose.yml` base image and TLS proxy inspection.
- **Binaries**: Static header and imported symbol inspection of executable fixtures (zero execution).

### Step 6: Inspect Cryptographic Inventory
- Navigate to the **Cryptographic Inventory** view.
- Filter by purpose, algorithm family, or application.
- Observe that all 24 inventory assets display genuine discovery evidence, algorithm names, bit lengths, and quantum exposure classifications.

### Step 7: Select High-Priority Asset (RSA-2048)
- Click on asset `CRYPTO-0004` (RSA-2048 in `auth-service/src/auth.py`).
- The **Asset Detail Modal** opens, revealing full cryptographic intelligence.

### Step 8: Review Traceable Code Evidence
- Inspect the exact code excerpt with line numbers and file location:
  ```python
  Line 42: self.private_key = rsa.generate_private_key(
  Line 43:     public_exponent=65537,
  Line 44:     key_size=2048
  Line 45: )
  ```
- Review the detection rule ID (`PY-RSA-001`) and detection method (`Python AST Visitor`).

### Step 9: Validate Purpose & Confidence
- **Purpose**: `digital_signature` (Extracted from call site `private_key.sign()`).
- **Evidence Confidence**: `CONFIRMED` (98% confidence from AST node binding).
- **Rule Verification**: Notice that PRIME does not mistake this signature key for an encryption key!

### Step 10: Analyze Quantum Exposure
- **Quantum Status**: `QUANTUM_VULNERABLE`.
- **Threat Mechanism**: Completely broken by Shor's algorithm ($O((\log N)^3)$ polynomial time factoring).
- Vulnerable to **Harvest Now, Decrypt Later (HNDL)** for key transport or forged authentication tokens.

### Step 11: Review Data Lifetime & Business Criticality
- Data Classification: `CRITICAL` (Authentication JWT token signing).
- Shelf-Life ($X$): `12.0 Years`.
- Business Criticality: `HIGH` (Controls enterprise identity issuance across all microservices).

### Step 12: Run Mosca-Style Timing Analysis
- Mathematical Equation:
  $$\text{Deficit} = (X + Y) - Z = (12.0 + 4.0) - 10.0 = +6.0 \text{ Years}$$
- Classification: **`TIME_AT_RISK`** (Data will remain vulnerable for 6.0 years before migration finishes).
- Stress-test the scenario using the interactive slider in the Overview dashboard.

### Step 13: Calculate Migration Effort
- **Migration Effort**: `HIGH`.
- **Contributing Factors**:
  - Direct hardcoding in 4 source files.
  - Tight coupling to `cryptography.hazmat` library.
  - Modulus size propagation across JWT verification consumers.

### Step 14: Review 7-Dimension Cryptographic Agility Profile
Navigate to the **Crypto Agility** tab to view the radar chart and scores (0.0 to 4.0 scale per NIST CSWP 39upd1):
- **C1 Operation Coupling**: `1.0 / 4.0` (Algorithm tightly bound at call site)
- **C2 Creation Coupling**: `1.5 / 4.0` (Key generation directly names RSA-2048)
- **C3 Provider Coupling**: `2.0 / 4.0` (Direct imports of pyca/cryptography)
- **C4 Decoupling Mechanism**: `1.5 / 4.0` (No dependency-injection or crypto abstraction)
- **C5 Decoupling Authority**: `2.0 / 4.0` (Developer-controlled, not policy-enforced)
- **E1 Algorithm Migration**: `1.8 / 4.0` (Requires code refactoring to swap algorithm)
- **E2 Provider Migration**: `2.2 / 4.0` (Python ecosystem abstraction standard)
- **Overall Application Agility Index**: `1.7 / 4.0 (LOW AGILITY)`

### Step 15: Inspect Dependency Graph & Blast Radius
- Switch to the **Topology Graph** and **Blast Radius** views.
- Observe multi-layer dependencies:
  $$\text{auth-service} \rightarrow \text{identity-service} \rightarrow \text{api-gateway} \rightarrow \text{mobile-client}$$
- Upstream impact: 3 microservices and 1 external consumer rely on this signing key.
- Architectural alerts:
  - ML-DSA-65 signatures expand to 3,309 bytes (vs 256 bytes for RSA-2048).
  - HTTP header size limits (`max-http-header-size`) must be increased in API Gateway!

### Step 16: Review Purpose-Aware NIST PQC Recommendations
- Primary Candidate: **ML-DSA-65 (NIST FIPS 204)**.
- Alternative Candidate: **SLH-DSA (NIST FIPS 205)** for high-assurance stateless hash signatures.
- Note: PRIME strictly **does not** recommend ML-KEM for digital signatures, as ML-KEM is exclusively a Key-Encapsulation Mechanism!

### Step 17: Generate Migration Work Package
- Phase 1: Abstract JWT signing interface behind an enterprise CryptoService facade.
- Phase 2: Deploy dual-signature verification (hybrid RSA-2048 + ML-DSA-65).
- Phase 3: Roll out ML-DSA-65 verification to API Gateway and downstream services.
- Phase 4: Deprecate classical RSA signing and enforce via enterprise policy `POL-003`.

### Step 18: Enter Migration Validation Lab
- Navigate to the **Validation Lab** view (`/validation`).
- Inspect the live, non-simulated cryptographic benchmarking environment.

### Step 19: Execute Controlled PQ/T Handshake & Keygen Benchmark
- Select primitive pair:
  - Classical: `RSA-2048`
  - Quantum-Resistant Candidate: `ML-DSA-65 (FIPS 204)`
- Click **Run Live Benchmark**.

### Step 20: Inspect Real Execution Metrics
- PRIME executes real cryptographic functions on the local host and captures genuine timings:
  - Classical Keygen: `~12,450 μs`, Signature: `~4,200 μs`, Verify: `~380 μs`
  - Post-Quantum Candidate Keygen: `~420 μs`, Signature: `~1,150 μs`, Verify: `~680 μs`
  - Payload Comparison: Signature size expands from `256 B` to `3,309 B` (+1,192% expansion).
  - Status: **`BENCHMARK COMPLETED — REAL HARDWARE MEASUREMENT`**.

### Step 21: Export CycloneDX 1.7 CBOM
- Click **CBOM 1.7** in the top navigation bar.
- Downloads `cyclonedx-cbom-PRJ-BHARATPAY.json`.
- Validates against official CycloneDX 1.7 schema:
  - Cryptographic asset definitions (`type: cryptographic-asset`)
  - Algorithm family, bit length, and curve properties
  - Evidence provenance (`OBSERVED`, `INFERRED`, `DECLARED`)
  - Dependency links and relationship graph

### Step 22: Generate Executive Audit Report & SARIF 2.1.0
- Click **Executive Report** to view or print the comprehensive HTML audit report.
- Click **SARIF 2.1** to download the static analysis results for GitHub Advanced Security or SonarQube ingestion.

### Step 23: Execute Second Scan
- Trigger a second scan (`Scan N` vs `Scan N-1`).

### Step 24: Analyze Cryptographic Drift
- Navigate to the **Drift Analysis** tab.
- Review the temporal posture comparison:
  - Detected newly introduced cryptographic algorithms.
  - Tracked retired legacy ciphers (e.g. decommissioned 3DES or MD5).
  - Quantified net quantum risk reduction and agility index improvement.
  - Verified scan-to-scan consistency.

---

**Demonstration Conclusion**: PRIME provides a comprehensive, mathematically deterministic, evidence-backed cryptographic control plane ready for enterprise post-quantum migration.
