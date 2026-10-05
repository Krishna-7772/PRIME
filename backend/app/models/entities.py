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
    organization = Column(String(255), default="Enterprise")
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
    total_files = Column(Integer, default=0)
    analyzed_files = Column(Integer, default=0)
    findings_count = Column(Integer, default=0)
    certificates_count = Column(Integer, default=0)
    libraries_count = Column(Integer, default=0)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)

    project = relationship("Project", back_populates="scans")
    assets = relationship("CryptoAsset", back_populates="scan", cascade="all, delete-orphan")
    certificates = relationship("Certificate", back_populates="scan", cascade="all, delete-orphan")

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

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String(36), nullable=True)
    
    title = Column(String(255), nullable=False)
    report_type = Column(String(50), nullable=False) # CBOM_JSON, EXECUTIVE_HTML
    file_path = Column(String(1024), nullable=False)
    file_size_bytes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="reports")
