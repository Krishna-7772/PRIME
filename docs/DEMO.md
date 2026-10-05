# ECDAT Golden Demonstration Guide
**Smart India Hackathon 2026 | Problem Statement SIH26164 (NTRO)**

This guide presents the end-to-end evaluation flow for hackathon judges and security auditors.

---

## 1. Golden Demonstration Script

### Step 1: Open ECDAT
Navigate to the web interface: `http://localhost:5173/`.
Notice the clean enterprise cybersecurity aesthetic: dark navy layout, SIH26164 / NTRO / Team PRAYAS tags, and zero mock or placeholder graphics.

### Step 2: Select "BharatPay Demo Enterprise"
From the top project selector dropdown, ensure **BharatPay Demo Enterprise** is active.
- Business Criticality: **CRITICAL**
- Data Shelf-Life ($X$): **12.0 Years**
- Migration Duration ($Y$): **4.0 Years**
- Quantum Threat Horizon ($Z$): **10.0 Years**

### Step 3: Observe Real Dashboard Telemetry
All numbers reflect the underlying database:
- **Total Crypto Assets**: `24`
- **Quantum-Exposed Assets**: `14` (Shor / SNDL)
- **High / Critical Risk Items**: `14`
- **Applications Impacted**: `3` (`auth-service`, `payment-service`, `api-gateway`)
- **Certificates Found**: `2` (`payment_gateway_rsa.crt`, `bharatpay_ca_ec.crt`)
- **Mosca Equation Status**: **`AT RISK (X + Y > Z)`** with a `+6.0 Year` vulnerability window.

### Step 4: Interact with Mosca Formulation Simulator
On the dashboard, adjust the **Data Lifetime ($X$)** slider down to 5 years:
- The Mosca margin dynamically changes to `(5 + 4) - 10 = -1.0 Year` (`MANAGEABLE`).
- Slide it back to 12 years: The banner alerts the auditor that data will remain sensitive beyond the CRQC arrival horizon before migration can finish.

### Step 5: Explore Cryptographic Inventory
Click the **Cryptographic Inventory** tab:
- Demonstrate the real-time search: type `RSA` $\rightarrow$ filters immediately.
- Filter by Purpose (`Digital Signature`, `Key Establishment`, `Encryption`, `Certificate`).
- Point out the rich context: each asset displays Algorithm, Key Size, Library, Application, File Location, and Quantum Exposure status.

### Step 6: Deep-Dive Inspector (Evidence & Traceability)
Click **Inspect** on asset `CRYPTO-0004` (RSA-2048 in `auth-service/src/auth.py`):
1. **Overview**: Algorithm `RSA`, 2048-bit modulus, Purpose `digital_signature`, Confidence `98%` via Python AST.
2. **Traceable Code Evidence**: Exact code lines:
   ```python
   self.private_key = rsa.generate_private_key(
       public_exponent=65537,
       key_size=2048
   )
   ```
3. **Quantum Risk & Mosca Explanation**: Shor's algorithm threat mechanism, complete mathematical breakdown of $12 + 4 > 10$, and calculated risk score (`81.2/100`).
4. **NIST Purpose-Aware PQC Recommendation**: Target standard: **ML-DSA-65 (FIPS 204)**. Alternative: **SLH-DSA (FIPS 205)**. Notice that ML-KEM is NOT recommended here because the primitive is used for digital signatures!
5. **Migration Impact & Blast Radius**: Blast radius summary, affected services, and architectural checklist items.

### Step 7: View Interactive Dependency Map
Click the **Dependency Map** tab:
- The React Flow canvas visualizes the topology:
  $$\text{Application} \rightarrow \text{Component} \rightarrow \text{Library} \rightarrow \text{Crypto Asset} \rightarrow \text{Certificate}$$
- Point out the provenance labels: **`OBSERVED`**, **`DECLARED`**, and **`INFERRED`**.
- Click any node to open the side inspector drawer.

### Step 8: View Migration Impact & Blast Radius
Click the **Migration Impact & Blast Radius** tab:
- Select `RSA-2048` or `ECDSA`:
- Review the blast radius counters: 3 Applications, 2 Components, 4 Libraries, 1 Certificate.
- Highlight the **Architectural Verification Checklist**:
  - *Protocol & Buffer Sizing* (CRITICAL): Accommodate signature expansion from 256 B to ~3.3 KB for ML-DSA-65.
  - *Client Interoperability* (HIGH): Validate partner and mobile SDK support for FIPS 204.

### Step 9: Export Standards & Executive Audit Report
1. Click **CBOM JSON** in the top navigation header $\rightarrow$ Downloads standardized `CycloneDX 1.6 Cryptographic Bill of Materials` JSON.
2. Click **Executive Report** $\rightarrow$ Opens the high-contrast executive audit document suitable for security leadership and compliance bodies.
