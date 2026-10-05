# ECDAT Quantum Risk Assessment Engine Specification

## Overview
The ECDAT Risk Engine implements a deterministic, explainable risk methodology. It completely eliminates arbitrary black-box AI scores in favor of transparent mathematical and cryptanalytic principles.

---

## 1. Dr. Michele Mosca's Theorem Integration

Dr. Michele Mosca (Institute for Quantum Computing, University of Waterloo) formulated the canonical theorem for quantum migration urgency:

$$\text{If } X + Y > Z \implies \text{AT RISK}$$

Where:
- **$X$ (Shelf-Life / Data Lifetime)**: The duration (in years) that the protected data must remain confidential or authenticated.
- **$Y$ (Migration Time)**: The duration (in years) required to design, test, re-architect, and deploy Post-Quantum Cryptography across all dependent infrastructure.
- **$Z$ (Quantum Threat Horizon)**: The estimated time (in years) until a Cryptographically Relevant Quantum Computer (CRQC) capable of breaking classical public-key cryptography becomes operational.

### Threat Evaluation & Margin:
$$\text{Mosca Margin} = (X + Y) - Z$$
- If $\text{Mosca Margin} > 0$: Threat Status is **`AT_RISK`**. Sensitive ciphertext intercepted today will be decrypted by adversaries before migration completes (Store-Now-Decrypt-Later).
- If $\text{Mosca Margin} = 0$: Threat Status is **`CRITICAL_URGENCY`**.
- If $\text{Mosca Margin} < 0$: Threat Status is **`MANAGEABLE`**.

---

## 2. Quantum Threat Mechanisms

The engine differentiates between distinct quantum algorithms:

| Primitive Family | Classical Hardness | Quantum Threat Mechanism | Quantum Security Impact | ECDAT Risk Exposure |
|---|---|---|---|---|
| **RSA** (All Key Sizes) | Integer Factorization (IFP) | **Shor's Algorithm** (Polynomial Time) | Broken completely by CRQC | **CRITICAL** (SNDL) / **HIGH** (Signature) |
| **ECDSA / ECDH** | Elliptic Curve Discrete Log (ECDLP) | **Shor's Algorithm** | Broken completely by CRQC | **CRITICAL** (SNDL) / **HIGH** (Signature) |
| **Finite Field DH** | Discrete Logarithm (DLP) | **Shor's Algorithm** | Broken completely by CRQC | **CRITICAL** (SNDL Target) |
| **AES-128** | Symmetric Substitution-Permutation | **Grover's Algorithm** (Quadratic Speedup) | Effective security halved to 64 bits | **MEDIUM** (Upgrade to 256 bits) |
| **AES-256** | Symmetric Substitution-Permutation | **Grover's Algorithm** | Effective security halved to 128 bits | **LOW** (128-bit quantum secure) |
| **SHA-256 / SHA-384** | Cryptographic Hash | Brassard-Høyer-Tapp (BHT) | Adequate collision & preimage margin | **LOW** (PQC Resistant) |
| **MD5 / SHA-1** | Hash Collisions | Classical Differential Cryptanalysis | Broken classically | **CRITICAL** (Immediate Hygiene Failure) |
| **3DES / DES** | Feistel Network | Sweet32 / Small Block Attacks | Broken classically | **CRITICAL** (Deprecated Hygiene Failure) |

---

## 3. Numerical Score Computation (0 - 100)

$$\text{Raw Score} = \text{Base Quantum Weight} + \text{Mosca Urgency Bonus} + \text{Hygiene Penalty}$$
$$\text{Final Risk Score} = \min(100.0, \text{Raw Score} \times \text{Business Criticality Multiplier})$$

- **Base Quantum Weight**:
  - `CRITICAL`: 50 points
  - `HIGH`: 40 points
  - `MEDIUM`: 20 points
  - `LOW`: 5 points
- **Mosca Urgency Bonus**:
  - `AT_RISK`: +25 points
  - `CRITICAL_URGENCY`: +15 points
- **Hygiene Penalty**:
  - Deprecated / Broken primitives (`MD5`, `SHA-1`, `3DES`): +25 points
- **Business Criticality Multiplier**:
  - `CRITICAL` (Payment, Core Banking, CA Root): $1.25\times$
  - `HIGH` (Authentication, Customer Gateway): $1.0\times$
  - `MEDIUM` (Internal Analytics, HR): $0.8\times$
  - `LOW` (Static Content): $0.6\times$

Every score produces a human-readable markdown breakdown detailing each parameter.
