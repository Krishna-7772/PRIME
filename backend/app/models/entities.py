import datetime
import uuid
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
)
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    organization = Column(String(255), default="National Technical Research Organisation (NTRO)")
    business_criticality = Column(String(50), default="HIGH") # LOW, MEDIUM, HIGH, CRITICAL
    data_lifetime_years = Column(Float, default=10.0) # Mosca X
    migration_time_years = Column(Float, default=3.0)  # Mosca Y
    quantum_horizon_years = Column(Float, default=10.0) # Mosca Z
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    scans = relationship("Scan", back_populates="project", cascade="all, delete-orphan")
    assets = relationship("CryptoAsset", back_populates="project", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="project", cascade="all, delete-orphan")
    dependencies = relationship("Dependency", back_populates="project", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="project", cascade="all, delete-orphan")
    policies = relationship("Policy", back_populates="project", cascade="all, delete-orphan")
    drift_snapshots = relationship("DriftSnapshot", back_populates="project", cascade="all, delete-orphan")
    validation_runs = relationship("ValidationRun", back_populates="project", cascade="all, delete-orphan")

class Application(Base):
    __tablename__ = "applications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    business_criticality = Column(String(50), default="HIGH")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="applications")

class Scan(Base):
    __tablename__ = "scans"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    target_type = Column(String(50), default="SOURCE_REPOSITORY") # SOURCE_REPOSITORY, ARCHIVE, DIRECTORY
    target_path = Column(String(1024), nullable=True)
    status = Column(String(50), default="PENDING") # PENDING, RUNNING, COMPLETED, FAILED
    
    # Coverage metrics (Section 3.B)
    total_files = Column(Integer, default=0)
    analyzed_files = Column(Integer, default=0)
    supported_files = Column(Integer, default=0)
    unsupported_files = Column(Integer, default=0)
    failed_files = Column(Integer, default=0)
    skipped_files = Column(Integer, default=0)
    coverage_percentage = Column(Float, default=0.0)
    
    findings_count = Column(Integer, default=0)
    certificates_count = Column(Integer, default=0)
    libraries_count = Column(Integer, default=0)
    binaries_count = Column(Integer, default=0)
    containers_count = Column(Integer, default=0)
    
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)

    project = relationship("Project", back_populates="scans")
    assets = relationship("CryptoAsset", back_populates="scan", cascade="all, delete-orphan")
    certificates = relationship("Certificate", back_populates="scan", cascade="all, delete-orphan")
    policy_violations = relationship("PolicyViolation", back_populates="scan", cascade="all, delete-orphan")

class CryptoAsset(Base):
    __tablename__ = "crypto_assets"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    asset_id = Column(String(50), nullable=False) # e.g. CRYPTO-0001
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False)
    
    algorithm = Column(String(100), nullable=False) # RSA, ECDSA, AES, SHA-256, etc.
    family = Column(String(50), nullable=True) # asymmetric, symmetric, hash, protocol
    key_size = Column(Integer, nullable=True) # 2048, 256, etc.
    curve = Column(String(100), nullable=True) # secp256r1, ed25519, etc.
    
    purpose = Column(String(100), default="unknown") # digital_signature, key_establishment, encryption, etc.
    purpose_confidence = Column(String(50), default="INFERRED") # CONFIRMED, INFERRED, UNKNOWN
    
    # Evidence Classification & Provenance (Section 3.A, 20)
    confidence_classification = Column(String(50), default="CONFIRMED") # CONFIRMED, STRONG_INFERENCE, WEAK_INFERENCE, UNVERIFIED, MANUAL
    provenance = Column(String(50), default="OBSERVED") # OBSERVED, INFERRED, DECLARED
    quantum_status = Column(String(50), default="QUANTUM_VULNERABLE") # QUANTUM_VULNERABLE, QUANTUM_WEAKENED, QUANTUM_RESISTANT, CLASSICALLY_BROKEN, NOT_APPLICABLE, UNKNOWN
    
    owner = Column(String(255), default="Security Engineering")
    data_classification = Column(String(50), default="RESTRICTED") # PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL
    business_criticality = Column(String(50), default="HIGH") # LOW, MEDIUM, HIGH, CRITICAL
    
    application = Column(String(255), default="Default Service")
    component = Column(String(255), default="Core Module")
    library = Column(String(255), nullable=True)
    library_version = Column(String(50), nullable=True)
    
    file_path = Column(String(1024), nullable=False)
    line_number = Column(Integer, nullable=True)
    confidence = Column(Float, default=0.9)
    detection_method = Column(String(100), default="AST Analysis")
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="assets")
    scan = relationship("Scan", back_populates="assets")
    evidence = relationship("Evidence", back_populates="crypto_asset", uselist=False, cascade="all, delete-orphan")
    risk = relationship("RiskAssessment", back_populates="crypto_asset", uselist=False, cascade="all, delete-orphan")
    recommendation = relationship("Recommendation", back_populates="crypto_asset", uselist=False, cascade="all, delete-orphan")
    migration = relationship("MigrationAssessment", back_populates="crypto_asset", uselist=False, cascade="all, delete-orphan")
    agility = relationship("AgilityAssessment", back_populates="crypto_asset", uselist=False, cascade="all, delete-orphan")
    policy_violations = relationship("PolicyViolation", back_populates="crypto_asset", cascade="all, delete-orphan")

class Evidence(Base):
    __tablename__ = "evidences"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=False)
    file_path = Column(String(1024), nullable=False)
    line_start = Column(Integer, nullable=True)
    line_end = Column(Integer, nullable=True)
    code_snippet = Column(Text, nullable=False)
    detection_rule = Column(String(255), nullable=True)
    ast_node_type = Column(String(100), nullable=True)
    context_notes = Column(Text, nullable=True)

    crypto_asset = relationship("CryptoAsset", back_populates="evidence")

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=False)
    
    overall_risk = Column(String(50), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    quantum_exposure = Column(String(50), nullable=False) # NONE, LOW, MEDIUM, HIGH, CRITICAL
    hygiene_risk = Column(String(50), default="CLEAN") # CLEAN, DEPRECATED, BROKEN
    
    # Mosca Theorem parameters
    mosca_status = Column(String(50), default="MANAGEABLE") # AT_RISK, MANAGEABLE, CRITICAL_URGENCY
    data_lifetime_years = Column(Float, default=10.0) # X
    migration_time_years = Column(Float, default=3.0)  # Y
    quantum_horizon_years = Column(Float, default=10.0) # Z
    mosca_margin_years = Column(Float, default=0.0) # (X + Y) - Z
    
    risk_score = Column(Float, default=50.0) # 0 - 100
    explanation_markdown = Column(Text, nullable=False)

    crypto_asset = relationship("CryptoAsset", back_populates="risk")

class AgilityAssessment(Base):
    """
    7-Dimensional Cryptographic Agility Profile (NIST CSWP 39upd1 & Rameshan & Messmer 2026)
    """
    __tablename__ = "agility_assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=False)
    
    # Internal Coupling Dimensions (0 - 4)
    c1_operation_coupling = Column(Float, default=1.0)
    c1_explanation = Column(Text, nullable=True)
    
    c2_creation_coupling = Column(Float, default=1.0)
    c2_explanation = Column(Text, nullable=True)
    
    c3_provider_coupling = Column(Float, default=1.0)
    c3_explanation = Column(Text, nullable=True)
    
    c4_decoupling_mechanism = Column(Float, default=1.0)
    c4_explanation = Column(Text, nullable=True)
    
    c5_decoupling_authority = Column(Float, default=1.0)
    c5_explanation = Column(Text, nullable=True)
    
    # Migration Capability Dimensions (0 - 4)
    e1_algorithm_migration = Column(Float, default=2.0)
    e1_explanation = Column(Text, nullable=True)
    
    e2_provider_migration = Column(Float, default=2.0)
    e2_explanation = Column(Text, nullable=True)
    
    # Overall Agility Index (0.0 to 4.0)
    overall_agility_score = Column(Float, default=1.5)
    agility_rating = Column(String(50), default="LOW") # VERY_LOW, LOW, MODERATE, HIGH, EXCELLENT
    
    radar_data = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)

    crypto_asset = relationship("CryptoAsset", back_populates="agility")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=False)
    
    recommended_pqc = Column(String(255), nullable=False) # e.g. ML-DSA (FIPS 204)
    parameter_set = Column(String(255), nullable=True) # e.g. ML-DSA-65
    alternative_pqc = Column(String(255), nullable=True) # e.g. SLH-DSA (FIPS 205)
    alternative_parameter_set = Column(String(255), nullable=True)
    
    rationale = Column(Text, nullable=False)
    tradeoffs_json = Column(JSON, nullable=True)
    migration_complexity = Column(String(50), default="MEDIUM") # LOW, MEDIUM, HIGH, CRITICAL
    validation_required = Column(Boolean, default=True)

    crypto_asset = relationship("CryptoAsset", back_populates="recommendation")

class MigrationAssessment(Base):
    __tablename__ = "migration_assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=False)
    
    affected_applications = Column(Integer, default=1)
    affected_components = Column(Integer, default=1)
    affected_libraries = Column(Integer, default=1)
    affected_certificates = Column(Integer, default=0)
    affected_configurations = Column(Integer, default=0)
    
    migration_complexity = Column(String(50), default="MEDIUM") # LOW, MEDIUM, HIGH, CRITICAL
    blast_radius_summary = Column(Text, nullable=True)
    review_items = Column(JSON, nullable=True)

    crypto_asset = relationship("CryptoAsset", back_populates="migration")

class Dependency(Base):
    __tablename__ = "dependencies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    
    source_type = Column(String(50), nullable=False) # APPLICATION, COMPONENT, LIBRARY, CRYPTO_ASSET, CERTIFICATE
    source_name = Column(String(255), nullable=False)
    target_type = Column(String(50), nullable=False)
    target_name = Column(String(255), nullable=False)
    
    relation_type = Column(String(50), default="USES") # USES, CONTAINS, BINDS, DEPENDS_ON
    status = Column(String(50), default="OBSERVED") # OBSERVED, INFERRED, DECLARED
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="dependencies")

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False)
    
    subject = Column(String(512), nullable=False)
    issuer = Column(String(512), nullable=False)
    serial_number = Column(String(128), nullable=True)
    not_before = Column(DateTime, nullable=True)
    not_after = Column(DateTime, nullable=True)
    public_key_algorithm = Column(String(100), nullable=False)
    public_key_size = Column(Integer, nullable=True)
    signature_algorithm = Column(String(100), nullable=False)
    file_path = Column(String(1024), nullable=False)
    is_expired = Column(Boolean, default=False)
    quantum_vulnerable = Column(Boolean, default=True)

    scan = relationship("Scan", back_populates="certificates")

class Policy(Base):
    """
    Configurable enterprise cryptographic policy (Section 3.F)
    """
    __tablename__ = "policies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    code = Column(String(50), nullable=False) # e.g. POL-001
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), default="GENERAL")
    severity = Column(String(50), default="HIGH") # LOW, MEDIUM, HIGH, CRITICAL
    is_enabled = Column(Boolean, default=True)
    parameters = Column(JSON, nullable=True)
    remediation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="policies")
    violations = relationship("PolicyViolation", back_populates="policy", cascade="all, delete-orphan")

class PolicyViolation(Base):
    """
    Specific violation of an enterprise policy detected during a scan
    """
    __tablename__ = "policy_violations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    policy_id = Column(String(36), ForeignKey("policies.id"), nullable=False)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False)
    crypto_asset_id = Column(String(36), ForeignKey("crypto_assets.id"), nullable=True)
    
    severity = Column(String(50), nullable=False)
    rule_code = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    evidence_snippet = Column(Text, nullable=True)
    file_path = Column(String(1024), nullable=True)
    line_number = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    policy = relationship("Policy", back_populates="violations")
    scan = relationship("Scan", back_populates="policy_violations")
    crypto_asset = relationship("CryptoAsset", back_populates="policy_violations")

class DriftSnapshot(Base):
    """
    Cryptographic Drift tracking comparing Scan N vs Scan N-1 (Section 21)
    """
    __tablename__ = "drift_snapshots"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String(36), nullable=False)
    previous_scan_id = Column(String(36), nullable=True)
    
    total_assets_diff = Column(Integer, default=0)
    new_assets_count = Column(Integer, default=0)
    removed_assets_count = Column(Integer, default=0)
    modified_assets_count = Column(Integer, default=0)
    risk_score_diff = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="drift_snapshots")
    events = relationship("DriftEvent", back_populates="drift_snapshot", cascade="all, delete-orphan")

class DriftEvent(Base):
    """
    Individual drift change event between scans
    """
    __tablename__ = "drift_events"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    drift_snapshot_id = Column(String(36), ForeignKey("drift_snapshots.id"), nullable=False)
    
    event_type = Column(String(50), nullable=False) # NEW_CRYPTO, REMOVED_CRYPTO, CHANGED_ALGORITHM, CHANGED_KEY_SIZE, EXPIRING_CERTIFICATE, RISK_INCREASE, RISK_DECREASE, COVERAGE_CHANGE
    asset_identifier = Column(String(255), nullable=False)
    severity = Column(String(50), default="INFO") # INFO, WARNING, CRITICAL
    description = Column(Text, nullable=False)
    details = Column(JSON, nullable=True)

    drift_snapshot = relationship("DriftSnapshot", back_populates="events")

class ValidationRun(Base):
    """
    Migration Validation Lab benchmark execution record (Section 22)
    """
    __tablename__ = "validation_runs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    crypto_asset_id = Column(String(36), nullable=True)
    
    test_type = Column(String(100), nullable=False) # ASYMMETRIC_BENCHMARK, KEY_EXCHANGE_BENCHMARK, SYMMETRIC_BENCHMARK, TLS_HYBRID_HANDSHAKE
    current_primitive = Column(String(100), nullable=False)
    candidate_primitive = Column(String(100), nullable=False)
    
    # Real measured performance benchmarks
    execution_status = Column(String(50), default="SUCCESS") # SUCCESS, FAILED, NOT_AVAILABLE
    keygen_time_us = Column(Float, nullable=True) # microseconds
    candidate_keygen_time_us = Column(Float, nullable=True)
    
    op_time_us = Column(Float, nullable=True) # Sign or Encapsulate
    candidate_op_time_us = Column(Float, nullable=True)
    
    verify_time_us = Column(Float, nullable=True) # Verify or Decapsulate
    candidate_verify_time_us = Column(Float, nullable=True)
    
    payload_size_bytes = Column(Integer, nullable=True)
    candidate_payload_size_bytes = Column(Integer, nullable=True)
    size_overhead_factor = Column(Float, nullable=True)
    
    compatibility_status = Column(String(50), default="COMPATIBLE") # COMPATIBLE, WARNING, BREAKING_CHANGE
    details = Column(JSON, nullable=True)
    executed_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="validation_runs")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String(36), nullable=True)
    
    title = Column(String(255), nullable=False)
    report_type = Column(String(50), nullable=False) # CBOM_JSON_1_7, SARIF_2_1_0, EXECUTIVE_HTML
    file_path = Column(String(1024), nullable=False)
    file_size_bytes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="reports")
