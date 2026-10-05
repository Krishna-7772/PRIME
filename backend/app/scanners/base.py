from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any

@dataclass
class DiscoveredFinding:
    algorithm: str
    family: str # asymmetric, symmetric, hash, protocol, kdf
    purpose: str # digital_signature, key_establishment, encryption, decryption, hashing, password_hashing, certificate, protocol_security, unknown
    purpose_confidence: str # CONFIRMED, INFERRED, UNKNOWN
    
    file_path: str
    line_number: Optional[int]
    line_end: Optional[int] = None
    code_snippet: str = ""
    
    key_size: Optional[int] = None
    curve: Optional[str] = None
    
    application: str = "Core Application"
    component: str = "Cryptographic Module"
    library: Optional[str] = None
    library_version: Optional[str] = None
    
    confidence: float = 0.90
    detection_method: str = "Static Analysis"
    context_notes: Optional[str] = None
    raw_metadata: Dict[str, Any] = field(default_factory=dict)

class BaseScanner:
    """Base interface for all ECDAT discovery modules"""
    
    def scan_path(self, target_path: str, context: Optional[Dict[str, Any]] = None) -> List[DiscoveredFinding]:
        raise NotImplementedError("Subclasses must implement scan_path")
