import os
import shutil
import zipfile
from pathlib import Path
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query, Response
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc

from app.db.session import get_db
from app.core.config import settings
from app.models.entities import (
    Project, Scan, CryptoAsset, Evidence, RiskAssessment,
    Recommendation, MigrationAssessment, Dependency, Certificate, Application, Report,
    AgilityAssessment, PolicyViolation, DriftSnapshot, DriftEvent, ValidationRun
)
from app.schemas.all_schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse, ScanResponse,
    CryptoAssetResponse, DependencyGraphResponse, DashboardOverviewResponse,
    AgilityAssessmentResponse, PolicyViolationResponse, DriftSnapshotResponse,
    ValidationBenchmarkRequest, TLSProbeRequest, DeclaredAssetBatch
)
from app.services.scan_service import ScanService
from app.dependency.dependency_mapper import DependencyMapper
from app.reports.cbom_generator import CBOMGenerator
from app.reports.html_reporter import HTMLReporter
from app.reports.sarif_generator import SARIFGenerator
from app.validation.validation_lab import ValidationLab
from app.scanners.network.tls_scanner import TLSNetworkScanner
from app.scanners.cloud.declared_scanner import DeclaredCloudHSMScanner

api_router = APIRouter()

# --- Health Check ---
@api_router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PRIME - Postquantum Readiness Intelligence and Migration Engine",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "problem_statement": settings.PROBLEM_STATEMENT,
        "organization": settings.ORGANIZATION,
        "team": settings.TEAM,
        "standards": [
            "NIST FIPS 203 (ML-KEM)",
            "NIST FIPS 204 (ML-DSA)",
            "NIST FIPS 205 (SLH-DSA)",
            "NIST CSWP 39upd1 (Crypto Agility)",
            "CycloneDX 1.7 CBOM",
            "IETF RFC 10024 (PQ/T Hybrid TLS 1.3)",
            "SARIF 2.1.0"
        ]
    }

# --- Projects ---
@api_router.post("/projects", response_model=ProjectResponse)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(
        name=payload.name,
        description=payload.description,
        organization=payload.organization,
        business_criticality=payload.business_criticality,
        data_lifetime_years=payload.data_lifetime_years,
        migration_time_years=payload.migration_time_years,
        quantum_horizon_years=payload.quantum_horizon_years
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@api_router.get("/projects", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(desc(Project.created_at)).all()

@api_router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@api_router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, payload: ProjectUpdate, db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(proj, key, value)
    
    db.commit()
    db.refresh(proj)
    return proj

# --- Scans ---
@api_router.post("/projects/{project_id}/scans", response_model=ScanResponse)
def initiate_scan(
    project_id: str,
    repository_path: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    target_dir = None
    target_type = "SOURCE_REPOSITORY"

    # Handle file upload (ZIP)
    if file:
        target_type = "ARCHIVE_UPLOAD"
        upload_id = f"upload_{project_id}_{int(os.times().system)}"
        extract_folder = settings.UPLOAD_PATH / upload_id
        extract_folder.mkdir(parents=True, exist_ok=True)
        
        zip_path = extract_folder / file.filename
        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Unpack zip safely (zip-slip protection)
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                for member in zip_ref.namelist():
                    filename = os.path.basename(member)
                    if not filename: continue
                    target_member_path = (extract_folder / member).resolve()
                    if not str(target_member_path).startswith(str(extract_folder.resolve())):
                        raise HTTPException(status_code=400, detail="Path traversal attempt in ZIP archive.")
                zip_ref.extractall(extract_folder)
            target_dir = str(extract_folder)
        except zipfile.BadZipFile:
            raise HTTPException(status_code=400, detail="Invalid zip file.")
    elif repository_path:
        p = Path(repository_path)
        if not p.is_absolute():
            p = settings.BASE_DIR / repository_path
        if not p.exists():
            raise HTTPException(status_code=400, detail=f"Repository path '{repository_path}' does not exist on disk.")
        target_dir = str(p)
    else:
        demo_p = settings.BASE_DIR / "demo" / "bharatpay"
        if demo_p.exists():
            target_dir = str(demo_p)
        else:
            raise HTTPException(status_code=400, detail="Please upload a repository zip or specify a target path.")

    scan_service = ScanService(db)
    scan = scan_service.execute_scan(
        project_id=project_id,
        target_path=target_dir,
        target_type=target_type
    )
    return scan

@api_router.get("/scans/{scan_id}", response_model=ScanResponse)
def get_scan(scan_id: str, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan

# --- Crypto Asset Inventory ---
@api_router.get("/projects/{project_id}/assets", response_model=List[CryptoAssetResponse])
def get_project_assets(
    project_id: str,
    algorithm: Optional[str] = Query(None),
    purpose: Optional[str] = Query(None),
    risk: Optional[str] = Query(None),
    library: Optional[str] = Query(None),
    application: Optional[str] = Query(None),
    confidence_class: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.migration),
            joinedload(CryptoAsset.agility)
        )
        .filter(CryptoAsset.project_id == project_id)
    )

    if algorithm:
        query = query.filter(CryptoAsset.algorithm.ilike(f"%{algorithm}%"))
    if purpose:
        query = query.filter(CryptoAsset.purpose == purpose)
    if library:
        query = query.filter(CryptoAsset.library.ilike(f"%{library}%"))
    if application:
        query = query.filter(CryptoAsset.application.ilike(f"%{application}%"))
    if confidence_class:
        query = query.filter(CryptoAsset.confidence_classification == confidence_class)

    assets = query.all()

    if risk:
        assets = [a for a in assets if a.risk and a.risk.overall_risk.upper() == risk.upper()]

    return assets

@api_router.get("/assets/{asset_id}", response_model=CryptoAssetResponse)
def get_asset_detail(asset_id: str, db: Session = Depends(get_db)):
    asset = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.migration),
            joinedload(CryptoAsset.agility)
        )
        .filter(CryptoAsset.id == asset_id)
        .first()
    )
    if not asset:
        raise HTTPException(status_code=404, detail="Cryptographic Asset not found")
    return asset

# --- Dependency Graph ---
@api_router.get("/projects/{project_id}/graph", response_model=DependencyGraphResponse)
@api_router.get("/projects/{project_id}/dependencies", response_model=DependencyGraphResponse)
def get_dependency_graph(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    dependencies = db.query(Dependency).filter(Dependency.project_id == project_id).all()
    assets = (
        db.query(CryptoAsset)
        .options(joinedload(CryptoAsset.risk))
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )
    certificates = db.query(Certificate).join(Scan).filter(Scan.project_id == project_id).all()

    mapper = DependencyMapper()
    return mapper.format_for_react_flow(dependencies, assets, certificates)

# --- Agility Assessment ---
@api_router.get("/projects/{project_id}/agility")
def get_project_agility(project_id: str, db: Session = Depends(get_db)):
    assets = (
        db.query(CryptoAsset)
        .options(joinedload(CryptoAsset.agility))
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )
    
    agilities = [a.agility for a in assets if a.agility]
    if not agilities:
        return {"average_score": 0.0, "rating": "UNKNOWN", "dimensions": []}

    avg_score = round(sum(ag.overall_agility_score for ag in agilities) / len(agilities), 2)
    
    c1_avg = round(sum(ag.c1_operation_coupling for ag in agilities) / len(agilities), 2)
    c2_avg = round(sum(ag.c2_creation_coupling for ag in agilities) / len(agilities), 2)
    c3_avg = round(sum(ag.c3_provider_coupling for ag in agilities) / len(agilities), 2)
    c4_avg = round(sum(ag.c4_decoupling_mechanism for ag in agilities) / len(agilities), 2)
    c5_avg = round(sum(ag.c5_decoupling_authority for ag in agilities) / len(agilities), 2)
    e1_avg = round(sum(ag.e1_algorithm_migration for ag in agilities) / len(agilities), 2)
    e2_avg = round(sum(ag.e2_provider_migration for ag in agilities) / len(agilities), 2)

    rating = "MODERATE"
    if avg_score <= 1.2: rating = "VERY_LOW"
    elif avg_score <= 2.0: rating = "LOW"
    elif avg_score <= 2.8: rating = "MODERATE"
    elif avg_score <= 3.5: rating = "HIGH"
    else: rating = "EXCELLENT"

    return {
        "average_score": avg_score,
        "rating": rating,
        "total_assets_assessed": len(agilities),
        "radar_data": [
            {"dimension": "C1: Operation Coupling", "score": c1_avg, "fullMark": 4.0},
            {"dimension": "C2: Creation Coupling", "score": c2_avg, "fullMark": 4.0},
            {"dimension": "C3: Provider Coupling", "score": c3_avg, "fullMark": 4.0},
            {"dimension": "C4: Decoupling Mechanism", "score": c4_avg, "fullMark": 4.0},
            {"dimension": "C5: Decoupling Authority", "score": c5_avg, "fullMark": 4.0},
            {"dimension": "E1: Algorithm Migration", "score": e1_avg, "fullMark": 4.0},
            {"dimension": "E2: Provider Migration", "score": e2_avg, "fullMark": 4.0}
        ]
    }

# --- Cryptographic Drift ---
@api_router.get("/projects/{project_id}/drift", response_model=List[DriftSnapshotResponse])
def get_project_drift(project_id: str, db: Session = Depends(get_db)):
    snapshots = (
        db.query(DriftSnapshot)
        .options(joinedload(DriftSnapshot.events))
        .filter(DriftSnapshot.project_id == project_id)
        .order_by(desc(DriftSnapshot.created_at))
        .all()
    )
    return snapshots

# --- Policy Violations ---
@api_router.get("/projects/{project_id}/policies/violations", response_model=List[PolicyViolationResponse])
def get_policy_violations(project_id: str, db: Session = Depends(get_db)):
    violations = (
        db.query(PolicyViolation)
        .join(Scan)
        .filter(Scan.project_id == project_id)
        .order_by(desc(PolicyViolation.created_at))
        .all()
    )
    return violations

# --- Migration Validation Lab Benchmark ---
@api_router.post("/validation/benchmark")
def run_validation_benchmark(req: ValidationBenchmarkRequest):
    if req.benchmark_type == "KEY_EXCHANGE":
        result = ValidationLab.run_key_exchange_benchmark(
            classical_algo=req.classical_algo,
            candidate_pqc=req.candidate_pqc
        )
    else:
        result = ValidationLab.run_asymmetric_benchmark(
            classical_algo=req.classical_algo,
            candidate_pqc=req.candidate_pqc
        )
    return result

# --- Network TLS Scanner (with SSRF protection) ---
@api_router.post("/scanners/network/tls")
def probe_tls_endpoint(req: TLSProbeRequest):
    scanner = TLSNetworkScanner()
    result = scanner.probe_endpoint(req.host, req.port)
    return result

# --- Declared Cloud/HSM Ingestion ---
@api_router.post("/projects/{project_id}/assets/declared")
def ingest_declared_assets(project_id: str, batch: DeclaredAssetBatch, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    scanner = DeclaredCloudHSMScanner()
    findings = scanner.parse_declared_inventory([item.model_dump() for item in batch.items])

    latest_scan = (
        db.query(Scan)
        .filter(Scan.project_id == project_id)
        .order_by(desc(Scan.started_at))
        .first()
    )
    if not latest_scan:
        latest_scan = Scan(project_id=project_id, target_type="DECLARED_INVENTORY", status="COMPLETED")
        db.add(latest_scan)
        db.commit()
        db.refresh(latest_scan)

    created = []
    for f in findings:
        asset = CryptoAsset(
            asset_id=f"CLOUD-{len(project.assets)+1:04d}",
            project_id=project_id,
            scan_id=latest_scan.id,
            algorithm=f.algorithm,
            family=f.family,
            key_size=f.key_size,
            purpose=f.purpose,
            purpose_confidence="CONFIRMED",
            confidence_classification="MANUAL",
            provenance="DECLARED",
            quantum_status="QUANTUM_VULNERABLE" if f.family == "asymmetric" else "QUANTUM_RESISTANT",
            owner=f.metadata.get("owner", "Cloud Team"),
            application=f.application,
            component=f.component,
            file_path=f.file_path,
            detection_method=f.detection_method,
            confidence=1.0
        )
        db.add(asset)
        created.append(asset)

    db.commit()
    return {"message": f"Successfully ingested {len(created)} declared cloud/HSM cryptographic assets."}

# --- Dashboard Overview ---
@api_router.get("/projects/{project_id}/dashboard", response_model=DashboardOverviewResponse)
def get_dashboard_overview(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    assets = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.agility)
        )
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )

    total_assets = len(assets)
    quantum_exposed = 0
    critical_count = 0
    high_count = 0
    medium_count = 0
    low_count = 0
    mosca_at_risk_count = 0

    risk_dist = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0}
    purpose_dist = {}
    algo_dist = {}

    agilities = []
    for a in assets:
        algo_dist[a.algorithm] = algo_dist.get(a.algorithm, 0) + 1
        purpose_dist[a.purpose] = purpose_dist.get(a.purpose, 0) + 1

        if a.agility:
            agilities.append(a.agility.overall_agility_score)

        if a.risk:
            r = a.risk.overall_risk.upper()
            risk_dist[r] = risk_dist.get(r, 0) + 1
            if r == "CRITICAL": critical_count += 1
            elif r == "HIGH": high_count += 1
            elif r == "MEDIUM": medium_count += 1
            elif r == "LOW": low_count += 1

            if a.risk.quantum_exposure in {"CRITICAL", "HIGH"}:
                quantum_exposed += 1
            if a.risk.mosca_status == "AT_RISK":
                mosca_at_risk_count += 1

    apps = {a.application for a in assets if a.application}
    certs_count = len([a for a in assets if a.purpose == "certificate"])
    avg_agility = round(sum(agilities) / len(agilities), 2) if agilities else 2.0

    # Policy violations count
    violations_count = (
        db.query(PolicyViolation)
        .join(Scan)
        .filter(Scan.project_id == project_id)
        .count()
    )

    # Latest scan coverage
    latest_scan = (
        db.query(Scan)
        .filter(Scan.project_id == project_id, Scan.status == "COMPLETED")
        .order_by(desc(Scan.started_at))
        .first()
    )
    coverage = latest_scan.coverage_percentage if latest_scan else 100.0

    sorted_assets = sorted(
        assets,
        key=lambda x: (x.risk.risk_score if x.risk else 0),
        reverse=True
    )
    top_priorities = sorted_assets[:5]

    recent_scans = (
        db.query(Scan)
        .filter(Scan.project_id == project_id)
        .order_by(desc(Scan.started_at))
        .limit(5)
        .all()
    )

    return {
        "total_crypto_assets": total_assets,
        "quantum_exposed_assets": quantum_exposed,
        "critical_risk_assets": critical_count,
        "high_risk_assets": high_count,
        "medium_risk_assets": medium_count,
        "low_risk_assets": low_count,
        "applications_affected": len(apps),
        "certificates_count": certs_count,
        "mosca_at_risk_count": mosca_at_risk_count,
        "average_agility_score": avg_agility,
        "coverage_percentage": coverage,
        "policy_violations_count": violations_count,
        "risk_distribution": risk_dist,
        "purpose_distribution": purpose_dist,
        "algorithm_distribution": algo_dist,
        "top_migration_priorities": top_priorities,
        "recent_scans": recent_scans
    }

# --- CycloneDX 1.7 CBOM Export ---
@api_router.get("/projects/{project_id}/cbom")
def export_cbom(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    assets = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation)
        )
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )
    certificates = db.query(Certificate).join(Scan).filter(Scan.project_id == project_id).all()

    generator = CBOMGenerator()
    cbom_data = generator.generate_cbom(project, assets, certificates)
    return JSONResponse(
        content=cbom_data,
        headers={
            "Content-Disposition": f"attachment; filename=prime_cbom_1_7_{project.name.lower().replace(' ', '_')}.json"
        }
    )

# --- SARIF 2.1.0 Export ---
@api_router.get("/projects/{project_id}/sarif")
def export_sarif(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    latest_scan = (
        db.query(Scan)
        .filter(Scan.project_id == project_id)
        .order_by(desc(Scan.started_at))
        .first()
    )
    if not latest_scan:
        raise HTTPException(status_code=404, detail="No scan findings available to generate SARIF report.")

    sarif_data = SARIFGenerator.generate_sarif(project, latest_scan)
    return JSONResponse(
        content=sarif_data,
        headers={
            "Content-Disposition": f"attachment; filename=prime_findings_{project.name.lower().replace(' ', '_')}.sarif"
        }
    )

# --- Executive HTML Report ---
@api_router.get("/projects/{project_id}/report")
def export_html_report(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    assets = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.agility)
        )
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )

    reporter = HTMLReporter()
    html_content = reporter.generate_html_report(project, assets)
    return HTMLResponse(content=html_content)
