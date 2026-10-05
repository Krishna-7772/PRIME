# PRIME — Cryptographic Agility Assessment Model

**Framework**: NIST CSWP 39upd1 / Rameshan &amp; Messmer (2026)  
**Implementation**: `backend/app/agility/agility_engine.py`  
**Frontend Radar**: `frontend/src/components/AgilityRadarView.tsx`  

---

## 1. Overview & Purpose

Cryptographic Agility is the ability of an application or infrastructure to transition between cryptographic primitives, key lengths, and providers with minimal disruption, code rewrites, or operational downtime.

PRIME implements a deterministic evaluation framework based on 7 formal dimensions:
- **5 Internal Coupling Dimensions (C1 – C5)**
- **2 Migration Capability Dimensions (E1 – E2)**

Each dimension is scored on an explainable **0.0 to 4.0 scale**, derived directly from observable AST node properties, code context, configuration mechanisms, and library imports.

---

## 2. Dimension Definitions & Scoring Criteria

### C1: Operation Coupling
*Evaluates the degree to which cryptographic operations (signing, encrypting, hashing) are hardcoded at invocation call sites.*

| Score | Coupling Level | Observable Code Characteristics |
|---|---|---|
| **0.0** | Tightly Coupled | Hardcoded algorithm calls (`private_key.sign(..., padding.PSS(...))`) scattered across business functions. |
| **1.0** | High Coupling | Direct algorithm classes used, but isolated into localized utility helper scripts. |
| **2.0** | Moderate Coupling | Cryptographic operations invoke service-level abstraction wrappers with fixed parameter sets. |
| **3.0** | Low Coupling | Operations use generic crypto facades/interfaces where algorithm names/parameters are supplied dynamically. |
| **4.0** | Decoupled | Business logic expresses domain security intents (`protect_payload()`, `verify_identity()`) without referencing algorithms. |

### C2: Creation Coupling
*Evaluates how cryptographic keys, certificates, and cipher contexts are instantiated.*

| Score | Coupling Level | Observable Code Characteristics |
|---|---|---|
| **0.0** | Tightly Coupled | Concrete constructors invoked directly in code (e.g. `rsa.generate_private_key(65537, 2048)`). |
| **1.0** | High Coupling | Key generation isolated in single module, but lacks parameterized factories. |
| **2.0** | Moderate Coupling | Factory pattern utilized with hardcoded switch cases for supported algorithm families. |
| **3.0** | Low Coupling | Dynamic factory pattern using dependency injection and external algorithm configuration. |
| **4.0** | Decoupled | Full KMS / HSM / PKCS#11 key handle abstraction; key material is opaque and managed out-of-band. |

### C3: Provider Coupling
*Evaluates coupling to underlying cryptographic libraries, platform APIs, or hardware providers.*

| Score | Coupling Level | Observable Code Characteristics |
|---|---|---|
| **0.0** | Vendor Lock-in | Direct proprietary vendor C-extension or hardware-bound driver imports scattered in code. |
| **1.0** | Standard Lib Direct | Direct imports of standard libraries (`from cryptography.hazmat...`, `require('crypto')`). |
| **2.0** | Wrapped Provider | Standard library accessed through an internal application adapter layer. |
| **3.0** | Pluggable SPI | Pluggable provider architecture (e.g. Java JCA `Security.addProvider`, OpenSSL 3.0 provider modules). |
| **4.0** | Provider Agnostic | Hardware- and provider-agnostic abstraction supporting transparent HSM/TPM/Software failover. |

### C4: Decoupling Mechanism
*Evaluates the engineering mechanism required to migrate to a post-quantum algorithm.*

| Score | Agility Level | Required Migration Action |
|---|---|---|
| **0.0** | Recompile & Rewrite | Full code rewrite, re-compilation, and database schema migration required. |
| **1.0** | Constant Update | Code change limited to central configuration classes, but requires redeployment. |
| **2.0** | Static Config | Parameter change in static configuration file (YAML/JSON/ENV), requiring service restart. |
| **3.0** | Hot-Reload Config | Dynamic runtime configuration reloadable via hot-reload or administrative API without restart. |
| **4.0** | Autonomous Negotiation | Dynamic policy-driven negotiation where endpoints autonomously negotiate supported PQC/classical algorithms. |

### C5: Decoupling Authority
*Evaluates who or what has authority to enforce cryptographic policies and algorithm transitions.*

| Score | Governance Level | Enforcement Mechanism |
|---|---|---|
| **0.0** | Developer Discretion | Individual developers select algorithms at code write time without automated guardrails. |
| **1.0** | Ad-hoc Review | Manual code review process without automated cryptographic policy checks. |
| **2.0** | Team Lead Control | Service leads manage configuration files per microservice independently. |
| **3.0** | Centralized CI Policy | Central enterprise configuration repository with automated CI/CD policy linting. |
| **4.0** | Central Orchestration | Centralized enterprise cryptographic policy engine with real-time posture enforcement and automated migration. |

### E1: Algorithm Migration Capability
*Evaluates the capability of system data structures, database schemas, and wire protocols to accommodate PQC characteristics (e.g., significantly larger public keys and signatures).*

| Score | Capability Level | Engineering Readiness |
|---|---|---|
| **0.0** | Rigid Constraints | Rigid database column limits (e.g. `VARCHAR(256)` for signatures), fixed buffer sizes, or inflexible wire protocols. |
| **1.0** | Partial Flexibility | Variable memory buffers, but serialized formats or relational schemas enforce strict constraints. |
| **2.0** | Protocol Constrained | Relational database supports arbitrary blobs, but network transport/HTTP headers enforce size caps. |
| **3.0** | High Tolerance | Schemas and transport accommodate large keys (ML-KEM-768: 1,184 B; ML-DSA-65: 3,309 B) with minor tuning. |
| **4.0** | Protocol Agile | Transparent chunking, streaming, and parameter negotiation built into communication layer. |

### E2: Provider Migration Capability
*Evaluates ecosystem readiness to bind a PQC-capable provider or sidecar alongside classical crypto.*

| Score | Ecosystem Readiness | Integration Path |
|---|---|---|
| **0.0** | No Roadmap | Legacy proprietary provider with no planned PQC support. |
| **1.0** | Library Swap Needed | Standard provider currently lacking PQC, requiring library replacement for migration. |
| **2.0** | Roadmap Available | Standard provider with planned PQC support in upcoming versions (e.g. OpenSSL 3.x, Bouncy Castle 1.78+). |
| **3.0** | Dual Provider / Hybrid | Dual-provider architecture capable of binding a PQC sidecar (e.g. `liboqs`) alongside classical. |
| **4.0** | Modular Plug-and-Play | Verified compatibility with NIST FIPS 203/204/205 standard libraries and hybrid TLS 1.3. |

---

## 3. Overall Agility Rating Index

The Overall Agility Index is computed as the unweighted mean of all 7 dimensions:

$$\text{Agility Index} = \frac{C_1 + C_2 + C_3 + C_4 + C_5 + E_1 + E_2}{7}$$

| Agility Index Range | Qualitative Rating | Recommended Enterprise Posture |
|---|---|---|
| **0.00 – 1.20** | `VERY_LOW` | Urgent refactoring: wrap crypto calls in service interfaces before initiating PQC algorithm migration. |
| **1.21 – 2.00** | `LOW` | Encapsulate hardcoded key generation and externalize algorithm configurations. |
| **2.01 – 2.80** | `MODERATE` | Ready for hybrid PQ/T testing; verify schema tolerance for expanded key sizes. |
| **2.81 – 3.50** | `HIGH` | Highly agile; deploy FIPS 203 / 204 drop-in replacement adapters. |
| **3.51 – 4.00** | `EXCELLENT` | Autonomous cryptographic control plane; runtime algorithm negotiation enabled. |
