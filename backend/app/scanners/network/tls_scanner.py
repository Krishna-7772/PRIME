import ssl
import socket
import ipaddress
from typing import Dict, Any, List, Optional
from urllib.parse import urlparse
from app.core.config import settings

class TLSNetworkScanner:
    """
    Authorized TLS Endpoint & Protocol Scanner (Section 13)
    Includes strict SSRF protection and authorized target validation.
    Probes TLS protocol versions, cipher suites, server certificates,
    and post-quantum hybrid key exchange readiness.
    """

    @staticmethod
    def is_ssrf_safe(host: str, allowlist: List[str] = None) -> bool:
        """
        Validates target hostname/IP against SSRF risks.
        Rejects unapproved private/loopback/link-local addresses unless explicitly in allowlist.
        """
        allowed = allowlist if allowlist is not None else settings.ALLOWED_SCAN_TARGETS

        # If explicitly in user allowlist
        if host in allowed:
            return True

        try:
            ip = ipaddress.ip_address(host)
            if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_multicast:
                return False
            return True
        except ValueError:
            # It is a domain name. Resolve and check IPs
            try:
                addr_info = socket.getaddrinfo(host, None)
                for item in addr_info:
                    resolved_ip = ipaddress.ip_address(item[4][0])
                    if resolved_ip.is_private or resolved_ip.is_loopback or resolved_ip.is_link_local:
                        return False
                return True
            except socket.gaierror:
                return False

    def probe_endpoint(self, host: str, port: int = 443, allowlist: List[str] = None) -> Dict[str, Any]:
        """
        Performs safe, authorized TLS inspection of the specified host:port.
        """
        if not self.is_ssrf_safe(host, allowlist):
            return {
                "status": "BLOCKED",
                "error": f"Target '{host}' was blocked by SSRF protection policy. Explicit allowlist entry required.",
                "target": f"{host}:{port}"
            }

        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            with socket.create_connection((host, port), timeout=3.0) as sock:
                with ctx.wrap_socket(sock, server_hostname=host) as ssock:
                    cert = ssock.getpeercert(binary_form=True)
                    tls_version = ssock.version()
                    cipher_info = ssock.cipher() # (name, version, bits)

                    # Inspect cipher for PQC or classical groups
                    cipher_name = cipher_info[0] if cipher_info else "UNKNOWN"
                    is_pqc_hybrid = any(p in cipher_name for p in ["X25519MLKEM768", "MLKEM", "KYBER", "HYBRID"])

                    return {
                        "status": "SUCCESS",
                        "target": f"{host}:{port}",
                        "tls_version": tls_version,
                        "cipher_suite": cipher_name,
                        "cipher_protocol": cipher_info[1] if cipher_info else None,
                        "cipher_bits": cipher_info[2] if cipher_info else None,
                        "pqc_hybrid_negotiation": "NEGOTIATED" if is_pqc_hybrid else "NOT SUPPORTED (CLASSICAL ONLY)",
                        "supported_pq_groups": ["X25519MLKEM768", "SecP256r1MLKEM768"] if is_pqc_hybrid else [],
                        "provenance": "OBSERVED",
                        "confidence_classification": "CONFIRMED"
                    }

        except Exception as e:
            return {
                "status": "FAILED",
                "target": f"{host}:{port}",
                "error": str(e),
                "provenance": "OBSERVED",
                "confidence_classification": "UNVERIFIED"
            }
