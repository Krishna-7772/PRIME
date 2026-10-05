# PRIME: Security Architecture & Threat Model Defenses
**Document ID**: SEC-PRIME-2026-V1  
**Classification**: Enterprise Cryptographic Security Control Plane  
**Target Compliance**: ISO 27001, NIST SP 800-53, OWASP Top 10, CWE / SANS Top 25

---

## 1. Core Security Tenet: Untrusted Input Handling

PRIME assesses enterprise codebases, binary artifacts, container files, and X.509 certificates. Because target artifacts may be compromised, legacy, or adversarial, PRIME treats **all uploaded repositories, files, and metadata as untrusted**.

### 1.1 Archive Inspection & Zip Bomb Mitigation
When repositories are uploaded via tarballs or zip archives:
- **Maximum Compressed Ratio**: Archives with compression ratios exceeding 100:1 or uncompressed sizes exceeding 250 MB are immediately rejected.
- **Path Traversal (`..`) Defense**: Every file path inside incoming archives is sanitized with strict canonical path checking. Path characters matching `../`, `..\`, absolute prefixes (`/`, `C:\`), or null bytes (`\0`) trigger an immediate upload abort (`400 Bad Request`).
- **Symlink Protection**: Symbolic links targeting locations outside the designated temporary sandbox are stripped and not traversed.

### 1.2 Binary Execution Absolute Prohibition
PRIME **never executes uploaded binaries or containers**.
- Binaries (ELF, PE, Mach-O) undergo **strictly passive, static inspection**:
  - SHA-256 integrity digest generation
  - Read-only header parsing
  - Static imported symbol inspection (e.g. `EVP_EncryptInit`, `RSA_sign`, `BCryptOpenAlgorithmProvider`)
  - Sanitized printable string extraction (`strings` heuristic)
- Binaries are never spawned as sub-processes, injected with debuggers, or loaded into dynamic memory.

---

## 2. Cryptographic Material & Private Key Redaction

PRIME is an inventory and migration analysis tool, **not a key escrow or secrets manager**.

### 2.1 Zero Private Key Persistence
- **Automatic Pattern Scrubbing**: When scanning source code or certificates, any detected private key blocks:
  ```
  -----BEGIN RSA PRIVATE KEY-----
  -----BEGIN EC PRIVATE KEY-----
  -----BEGIN PRIVATE KEY-----
  -----BEGIN ENCRYPTED PRIVATE KEY-----
  ```
  are **immediately masked and redacted** before reaching memory models or database persistence.
- **Secret Metadata Only**: PRIME records only safe cryptographic metadata:
  - Subject Name, Issuer Name
  - Public Key Algorithm (`RSA`, `EC`, `Ed25519`)
  - Modulus bit-length / Curve specification (`prime256v1`, `secp384r1`)
  - Expiration timestamp and Key Usage flags
  - SHA-256 fingerprint of the public certificate
- Under no circumstances does PRIME store private exponents, seed bytes, or decryption passphrases.

---

## 3. Network Scanning & SSRF Safeguards

PRIME includes an active TLS probe for authorized enterprise endpoints (`backend/app/scanners/network/tls_scanner.py`). Unrestricted network scanners pose Server-Side Request Forgery (SSRF) and intranet pivoting risks.

### 3.1 Strict IP Address Allowlisting
- Hostnames provided for network scans are resolved to IP addresses and evaluated against private/internal CIDR blocks before connection:
  - `10.0.0.0/8` (Private network)
  - `172.16.0.0/12` (Private network)
  - `192.168.0.0/16` (Private network)
  - `127.0.0.0/8` & `::1` (Loopback)
  - `169.254.0.0/16` (Link-local / Cloud metadata endpoint `169.254.169.254`)
  - `224.0.0.0/4` (Multicast)
- Connections to non-allowlisted private IPs are rejected with `SSRF Protection: Target IP is in a restricted private/loopback range`.
- Administrators can explicitly configure an endpoint allowlist (`PRIME_ALLOWED_SCAN_TARGETS`) in `backend/app/core/config.py`.

### 3.2 Timeouts & DoS Protection
- TLS handshakes and socket probes enforce strict 5-second socket timeouts.
- Connection attempts are rate-limited to avoid triggering enterprise IDS/IPS alerts or overloading edge proxies.

---

## 4. Role-Based Access Control (RBAC)

PRIME implements a structured role hierarchy to enforce the principle of least privilege:

| Role | Permissions | Scope |
| :--- | :--- | :--- |
| **ADMIN** | Manage projects, delete scans, edit organizational policies (`policy_defaults.json`), trigger active network probes, configure cloud connectors. | Full System |
| **ANALYST** | Ingest repositories, execute discovery scans, edit manual metadata (data lifetime, business criticality), create migration work packages, run validation lab benchmarks. | Project Level |
| **VIEWER** | Inspect inventory, view topology graphs, examine Mosca risk calculations, download CycloneDX 1.7 CBOM and SARIF reports. | Read-Only |

---

## 5. Air-Gapped & Local-First Design

In defense, banking, and government intelligence deployments (such as NTRO):
- **Zero Mandatory External AI**: Detection, categorization, Mosca risk scoring, and recommendation rules are 100% deterministic and self-contained in `knowledge_base/`.
- **Zero Outbound Telemetry**: PRIME makes no background phone-home pings, analytic reporting, or external font/CDN calls.
- **Offline Artifact Generation**: All CycloneDX 1.7 CBOM, SARIF 2.1.0, and executive HTML reports compile locally from database records.
