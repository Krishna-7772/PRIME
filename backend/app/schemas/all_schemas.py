from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Project Schemas ---
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    organization: str = "Enterprise"
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

    model_config = ConfigDict(from_attributes=True)

# --- Scan Schema ---
class ScanResponse(BaseModel):
    id: str
    project_id: str
    target_type: str
    status: str
    total_files: int
    analyzed_files: int
    findings_count: int
    certificates_count: int
    libraries_count: int
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
    risk_distribution: Dict[str, int]
    purpose_distribution: Dict[str, int]
    algorithm_distribution: Dict[str, int]
    top_migration_priorities: List[CryptoAssetResponse]
    recent_scans: List[ScanResponse]
