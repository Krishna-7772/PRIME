# PRIME: Deterministic 8-Dimension Risk & Prioritization Model
**Document ID**: RISK-PRIME-2026-V1  
**Module**: `backend/app/risk/`  
**Compliance**: NIST SP 800-227, Mosca's Theorem, NCSC PQC Guidance

---

## 1. Core Risk Philosophy: Deterministic & Explainable

PRIME rejects single opaque "AI risk numbers" or arbitrary heuristic scoring. Every derived priority score must be **fully explainable**, tracing directly back to mathematically defined cryptanalytic parameters, verifiable source code properties, and organizational risk policies.

---

## 2. The 8 Independent Risk Dimensions

Rather than conflating threat with migration friction, PRIME tracks 8 orthogonal dimensions:

| Dimension | Description | Observable Range / States | Evaluation Mechanism |
| :--- | :--- | :--- | :--- |
| **1. Quantum Exposure** | Vulnerability of the mathematical hardness assumption to Shor's or Grover's algorithm. | `QUANTUM_VULNERABLE`<br>`QUANTUM_WEAKENED`<br>`QUANTUM_RESISTANT`<br>`CLASSICALLY_BROKEN`<br>`NOT_APPLICABLE` | Evaluated against `knowledge_base/algorithms.json` and cryptanalytic threat matrices. |
| **2. Data Sensitivity** | Classification and confidentiality level of the payload protected by the primitive. | `TOP_SECRET`<br>`CRITICAL`<br>`HIGH`<br>`MEDIUM`<br>`LOW` | Ingested from project configuration or asset metadata tags. |
| **3. Data Lifetime ($X$)** | Number of years into the future that the protected data remains commercially or strategically sensitive. | Continuous: $0.1$ to $50.0$ years | Operational metadata or enterprise compliance retention rules. |
| **4. Business Criticality** | Financial, operational, and regulatory impact if the service or primitive fails. | `CRITICAL`<br>`HIGH`<br>`MEDIUM`<br>`LOW` | Service classification (e.g. Payment Gateway vs Internal Logging). |
| **5. External Exposure** | Network attack surface and internet accessibility of the cryptographic endpoint or token. | `INTERNET_FACING`<br>`INTERNAL_DMZ`<br>`RESTRICTED_INTRANET`<br>`ISOLATED_BATCH` | Inferred from endpoint probes, container configs, and API bindings. |
| **6. Dependency / Blast Radius** | Number of upstream services, downstream callers, and shared libraries dependent on this asset. | Integer count ($0$ to $N$) | Calculated from the relational dependency graph (`backend/app/dependency/`). |
| **7. Migration Effort** | Friction, code refactoring complexity, and payload expansion constraints required to upgrade. | `LOW`<br>`MEDIUM`<br>`HIGH`<br>`VERY_HIGH` | Computed from AST call site density, provider coupling, and buffer expansion. |
| **8. Crypto Agility** | Capacity of the application architecture to swap algorithms without widespread refactoring. | Continuous: $0.0$ to $4.0$ scale | Evaluated across 7 dimensions (C1–C5, E1–E2) per NIST CSWP 39upd1. |

---

## 3. Dr. Michele Mosca's Theorem Formulation

Dr. Michele Mosca (Institute for Quantum Computing, University of Waterloo) formulated the canonical condition for post-quantum urgency:

$$\text{If } X + Y > Z \implies \text{TIME\_AT\_RISK}$$

Where:
- **$X$ (Shelf-Life / Data Lifetime)**: Number of years protected data must remain confidential or authenticated.
- **$Y$ (Migration Time)**: Number of years needed to design, test, re-architect, and deploy PQC across all dependent infrastructure.
- **$Z$ (Quantum Threat Horizon)**: Estimated years until a Cryptanalytically Relevant Quantum Computer (CRQC) emerges.

### Mathematical Deficit & Planning Window:
$$\text{Mosca Deficit} = (X + Y) - Z$$

- **`TIME_AT_RISK`** ($\text{Deficit} > 0$): Sensitive ciphertext intercepted today via **Harvest Now, Decrypt Later (HNDL)** will be decrypted before migration completes. Immediate priority.
- **`WITHIN_PLANNING_WINDOW`** ($-2.0 \le \text{Deficit} \le 0$): Migration must initiate immediately to prevent falling into the deficit window.
- **`OUTSIDE_CONFIGURED_HORIZON`** ($\text{Deficit} < -2.0$): Adequate buffer exists under the selected threat scenario.
- **`INSUFFICIENT_DATA`**: Data lifetime ($X$) or migration time ($Y$) has not been declared or estimated.

---

## 4. Priority Derivation Matrix

PRIME calculates operational priority using a deterministic weighted model governed by `knowledge_base/policy_defaults.json`:

$$\text{Priority Score} = \min\left(100.0, \; (\text{Base Quantum Weight} + \text{Mosca Bonus} + \text{Hygiene Penalty}) \times \text{Criticality Factor}\right)$$

### Base Quantum Weights:
- `CLASSICALLY_BROKEN` (MD5, SHA-1 for signatures, 3DES, DES): **50 points** (Immediate classical hygiene violation)
- `QUANTUM_VULNERABLE` (RSA, ECDSA, ECDH, DH, Ed25519): **45 points** (Vulnerable to Shor's algorithm)
- `QUANTUM_WEAKENED` (AES-128, ChaCha20 without 256-bit key): **20 points** (Grover quadratic speedup)
- `QUANTUM_RESISTANT` (AES-256, SHA-256, ML-KEM, ML-DSA): **5 points**

### Mosca Urgency Modifiers:
- `TIME_AT_RISK`: **+25 points**
- `WITHIN_PLANNING_WINDOW`: **+15 points**

### Hygiene Penalties:
- Deprecated primitive per NIST SP 800-131A: **+20 points**
- Modulus length $< 2048$ bits: **+25 points**
- Hardcoded credentials / private keys detected: **+30 points**

### Business Criticality Multipliers:
- `CRITICAL` (Payment gateways, Core Banking, CA Root): $1.25\times$
- `HIGH` (Identity Provider, Authentication APIs): $1.00\times$
- `MEDIUM` (Internal Analytics, Notification Queues): $0.80\times$
- `LOW` (Static Content, Non-sensitive Microservices): $0.60\times$

---

## 5. Explainability Guarantee ("Why Did PRIME Conclude This?")

Every single risk score generated by PRIME includes an inline breakdown:
- **Exact Formula**: Displaying values of $X, Y, Z$, and computed deficit.
- **Threat Mechanism**: Explanation of Shor's algorithm, Grover's algorithm, or classical differential cryptanalysis.
- **Contributing Factors**: List of source files, blast radius count, and policy violations.
- **Unverified Assumptions**: Explicitly identifying any inferred parameters or unverified observations.
