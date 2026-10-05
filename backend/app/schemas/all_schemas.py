from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Project Schemas ---
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    organization: str = "National Technical Research Organisation (NTRO)"
    business_criticality: str = "HIGH"
    data_lifetime_years: float = 10.0
    migration_time_years: float = 3.0
    quantum_horizon_years: float = 10.0

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    organization: Optional[str] = None
    business_criticality: Optional[str] = None
    data_lifetime_years: Optional[float] = None
    migration_time_years: Optional[float] = None
    quantum_horizon_years: Optional[float] = None

class ProjectResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    organization: str
    business_criticality: str
    data_lifetime_years: float
    migration_time_years: float
    quantum_horizon_years: float
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- Evidence Schema ---
class EvidenceResponse(BaseModel):
    id: str
    file_path: str
    line_start: Optional[int]
    line_end: Optional[int]
    code_snippet: str
    detection_rule: Optional[str]
    ast_node_type: Optional[str]
    context_notes: Optional[str]

    model_config = ConfigDict(from_attributes=True)

# --- Risk Schema ---
class RiskAssessmentResponse(BaseModel):
    id: str
    overall_risk: str
    quantum_exposure: str
    hygiene_risk: str
    mosca_status: str
    data_lifetime_years: float
    migration_time_years: float
    quantum_horizon_years: float
    mosca_margin_years: float
    risk_score: float
    explanation_markdown: str

    model_config = ConfigDict(from_attributes=True)

# --- Recommendation Schema ---
class RecommendationResponse(BaseModel):
    id: str
    recommended_pqc: str
    parameter_set: Optional[str]
    alternative_pqc: Optional[str]
    alternative_parameter_set: Optional[str]
    rationale: str
    tradeoffs_json: Optional[Dict[str, Any]]
    migration_complexity: str
    validation_required: bool

    model_config = ConfigDict(from_attributes=True)

# --- Agility Schema ---
class AgilityAssessmentResponse(BaseModel):
    id: str
    c1_operation_coupling: float
    c1_explanation: Optional[str]
    c2_creation_coupling: float
    c2_explanation: Optional[str]
    c3_provider_coupling: float
    c3_explanation: Optional[str]
    c4_decoupling_mechanism: float
    c4_explanation: Optional[str]
    c5_decoupling_authority: float
    c5_explanation: Optional[str]
    e1_algorithm_migration: float
    e1_explanation: Optional[str]
    e2_provider_migration: float
    e2_explanation: Optional[str]
    overall_agility_score: float
    agility_rating: str
    radar_data: Optional[List[Dict[str, Any]]] = None
    recommendations: Optional[List[str]] = None

    model_config = ConfigDict(from_attributes=True)

# --- Migration Impact Schema ---
class MigrationAssessmentResponse(BaseModel):
    id: str
    affected_applications: int
    affected_components: int
    affected_libraries: int
    affected_certificates: int
    affected_configurations: int
    migration_complexity: str
    blast_radius_summary: Optional[str]
    review_items: Optional[List[Dict[str, Any]]]

    model_config = ConfigDict(from_attributes=True)

# --- Policy Violation Schema ---
class PolicyViolationResponse(BaseModel):
    id: str
    severity: str
    rule_code: str
    message: str
    evidence_snippet: Optional[str]
    file_path: Optional[str]
    line_number: Optional[int]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- Crypto Asset Schema ---
class CryptoAssetResponse(BaseModel):
    id: str
    asset_id: str
    project_id: str
    scan_id: str
    algorithm: str
    family: Optional[str]
    key_size: Optional[int]
    curve: Optional[str]
    purpose: str
    purpose_confidence: str
    confidence_classification: str
    provenance: str
    quantum_status: str
    owner: Optional[str] = "Security Engineering"
    data_classification: Optional[str] = "RESTRICTED"
    application: str
    component: str
    library: Optional[str]
    library_version: Optional[str]
    file_path: str
    line_number: Optional[int]
    confidence: float
    detection_method: str
    created_at: datetime
    
    evidence: Optional[EvidenceResponse] = None
    risk: Optional[RiskAssessmentResponse] = None
    recommendation: Optional[RecommendationResponse] = None
    migration: Optional[MigrationAssessmentResponse] = None
    agility: Optional[AgilityAssessmentResponse] = None

    model_config = ConfigDict(from_attributes=True)

# --- Scan Schema ---
class ScanResponse(BaseModel):
    id: str
    project_id: str
    target_type: str
    status: str
    total_files: int
    analyzed_files: int
    supported_files: int
    unsupported_files: int
    skipped_files: int
    failed_files: int
    coverage_percentage: float
    findings_count: int
    certificates_count: int
    libraries_count: int
    binaries_count: int
    containers_count: int
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    error_message: Optional[str]

    model_config = ConfigDict(from_attributes=True)

# --- Dependency Graph Schemas (React Flow ready) ---
class GraphNode(BaseModel):
    id: str
    type: str # 'customNode', 'application', 'crypto', 'library', 'certificate'
    data: Dict[str, Any]
    position: Dict[str, float]

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None
    animated: Optional[bool] = False
    style: Optional[Dict[str, Any]] = None

class DependencyGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# --- Drift Schemas ---
class DriftEventResponse(BaseModel):
    id: str
    event_type: str
    asset_identifier: str
    severity: str
    description: str
    details: Optional[Dict[str, Any]] = None

    model_config = ConfigDict(from_attributes=True)

class DriftSnapshotResponse(BaseModel):
    id: str
    project_id: str
    scan_id: str
    previous_scan_id: Optional[str]
    total_assets_diff: int
    new_assets_count: int
    removed_assets_count: int
    modified_assets_count: int
    created_at: datetime
    events: List[DriftEventResponse] = []

    model_config = ConfigDict(from_attributes=True)

# --- Validation Lab Schemas ---
class ValidationBenchmarkRequest(BaseModel):
    benchmark_type: str = "ASYMMETRIC" # ASYMMETRIC, KEY_EXCHANGE
    classical_algo: str = "RSA-2048"
    candidate_pqc: str = "ML-DSA-65"

# --- TLS Probing Schemas ---
class TLSProbeRequest(BaseModel):
    host: str
    port: int = 443

# --- Declared Cloud Ingestion Schema ---
class DeclaredAssetItem(BaseModel):
    provider: str = "AWS_KMS" # AWS_KMS, AZURE_KEY_VAULT, GOOGLE_CLOUD_KMS, PKCS11_HSM, TPM_2_0
    key_id: str
    algorithm: str = "RSA_2048"
    purpose: str = "encryption"
    owner: str = "Cloud Platform Team"
    business_criticality: str = "HIGH"
    data_lifetime_years: float = 7.0

class DeclaredAssetBatch(BaseModel):
    items: List[DeclaredAssetItem]

# --- Dashboard Schemas ---
class DashboardOverviewResponse(BaseModel):
    total_crypto_assets: int
    quantum_exposed_assets: int
    critical_risk_assets: int
    high_risk_assets: int
    medium_risk_assets: int
    low_risk_assets: int
    applications_affected: int
    certificates_count: int
    mosca_at_risk_count: int
    average_agility_score: float = 2.0
    coverage_percentage: float = 100.0
    policy_violations_count: int = 0
    risk_distribution: Dict[str, int]
    purpose_distribution: Dict[str, int]
    algorithm_distribution: Dict[str, int]
    top_migration_priorities: List[CryptoAssetResponse]
    recent_scans: List[ScanResponse]
