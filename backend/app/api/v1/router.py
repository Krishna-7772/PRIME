import os
import shutil
import zipfile
from pathlib import Path
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query, Response
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc

from app.db.session import get_db
from app.core.config import settings
from app.models.entities import (
    Project, Scan, CryptoAsset, Evidence, RiskAssessment,
    Recommendation, MigrationAssessment, Dependency, Certificate, Application, Report
)
from app.schemas.all_schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse, ScanResponse,
    CryptoAssetResponse, DependencyGraphResponse, DashboardOverviewResponse
)
from app.services.scan_service import ScanService
from app.dependency.dependency_mapper import DependencyMapper
from app.reports.cbom_generator import CBOMGenerator
from app.reports.html_reporter import HTMLReporter

api_router = APIRouter()

# --- Health Check ---
@api_router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ECDAT API",
        "version": settings.VERSION,
        "standards": ["NIST FIPS 203 (ML-KEM)", "NIST FIPS 204 (ML-DSA)", "NIST FIPS 205 (SLH-DSA)", "CycloneDX 1.6 CBOM"]
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

        # Unpack zip safely
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                # Basic zip-slip protection
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
        # Check if local path exists (e.g. demo/bharatpay)
        p = Path(repository_path)
        if not p.is_absolute():
            # Resolve relative to workspace root
            p = settings.BASE_DIR / repository_path
        if not p.exists():
            raise HTTPException(status_code=400, detail=f"Repository path '{repository_path}' does not exist on disk.")
        target_dir = str(p)
    else:
        # Default to BharatPay demo
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
    db: Session = Depends(get_db)
):
    query = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.migration)
        )
        .filter(CryptoAsset.project_id == project_id)
    )

    if algorithm:
        query = query.filter(CryptoAsset.algorithm.ilike(f"%{algorithm}%"))
    if purpose:
        query = query.filter(CryptoAsset.purpose == purpose)
    if application:
        query = query.filter(CryptoAsset.application.ilike(f"%{application}%"))
    if library:
        query = query.filter(CryptoAsset.library.ilike(f"%{library}%"))

    assets = query.order_by(CryptoAsset.asset_id).all()

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
            joinedload(CryptoAsset.migration)
        )
        .filter((CryptoAsset.id == asset_id) | (CryptoAsset.asset_id == asset_id))
        .first()
    )
    if not asset:
        raise HTTPException(status_code=404, detail="Crypto Asset not found")
    return asset

# --- Dependency Graph ---
@api_router.get("/projects/{project_id}/dependencies", response_model=DependencyGraphResponse)
def get_dependency_graph(project_id: str, db: Session = Depends(get_db)):
    deps = db.query(Dependency).filter(Dependency.project_id == project_id).all()
    mapper = DependencyMapper()
    return mapper.format_for_react_flow(deps)

# --- Real Live Dashboard ---
@api_router.get("/projects/{project_id}/dashboard", response_model=DashboardOverviewResponse)
def get_project_dashboard(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    assets = (
        db.query(CryptoAsset)
        .options(
            joinedload(CryptoAsset.evidence),
            joinedload(CryptoAsset.risk),
            joinedload(CryptoAsset.recommendation),
            joinedload(CryptoAsset.migration)
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

    for a in assets:
        # Algo dist
        algo_dist[a.algorithm] = algo_dist.get(a.algorithm, 0) + 1
        # Purpose dist
        purpose_dist[a.purpose] = purpose_dist.get(a.purpose, 0) + 1

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

    # Top migration priorities sorted by risk_score desc
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
        "risk_distribution": risk_dist,
        "purpose_distribution": purpose_dist,
        "algorithm_distribution": algo_dist,
        "top_migration_priorities": top_priorities,
        "recent_scans": recent_scans
    }

# --- CBOM Export ---
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

    generator = CBOMGenerator()
    cbom_data = generator.generate_cbom(project, assets)
    return JSONResponse(
        content=cbom_data,
        headers={
            "Content-Disposition": f"attachment; filename=ecdat_cbom_{project.name.lower().replace(' ', '_')}.json"
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
            joinedload(CryptoAsset.recommendation)
        )
        .filter(CryptoAsset.project_id == project_id)
        .all()
    )

    reporter = HTMLReporter()
    html_content = reporter.generate_html_report(project, assets)
    return HTMLResponse(content=html_content)
