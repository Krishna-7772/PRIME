import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.db.session import engine, Base, SessionLocal
from app.api.v1.router import api_router
from app.models.entities import Project
from app.services.scan_service import ScanService

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Cryptographic Discovery & Analysis Tool for Post-Quantum Cryptography Migration (NTRO SIH26164)",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_seed_demo():
    """
    On first boot, if no projects exist in the database, automatically
    create BharatPay Demo Enterprise and run the real scanner on demo/bharatpay.
    """
    db = SessionLocal()
    try:
        existing = db.query(Project).first()
        if not existing:
            demo_path = settings.BASE_DIR / "demo" / "bharatpay"
            if demo_path.exists():
                print("Seeding initial BharatPay Demo Enterprise with real scan analysis...")
                proj = Project(
                    name="BharatPay Demo Enterprise",
                    description="Indian Digital Payments Platform with core banking integrations, token vaults, and hybrid TLS gateways.",
                    organization="National Technical Research Organisation (NTRO Demo)",
                    business_criticality="CRITICAL",
                    data_lifetime_years=12.0,
                    migration_time_years=4.0,
                    quantum_horizon_years=10.0
                )
                db.add(proj)
                db.commit()
                db.refresh(proj)

                # Execute real scan on BharatPay demo files
                scan_service = ScanService(db)
                scan_service.execute_scan(
                    project_id=proj.id,
                    target_path=str(demo_path),
                    target_type="SOURCE_REPOSITORY"
                )
                print(f"BharatPay demo seeded successfully with ID: {proj.id}")
    except Exception as e:
        print(f"Startup demo seed notice: {e}")
    finally:
        db.close()

# Check for production frontend build (e.g. for single-service free cloud deployment)
FRONTEND_DIST = settings.BASE_DIR / "frontend" / "dist"
if not FRONTEND_DIST.exists():
    # In container deployment, might be located at /app/frontend/dist or relative
    alt_dist = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
    if alt_dist.exists():
        FRONTEND_DIST = alt_dist

if FRONTEND_DIST.exists() and (FRONTEND_DIST / "index.html").exists():
    print(f"Mounting production frontend from {FRONTEND_DIST}")
    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        # Don't intercept API or docs routes
        if full_path.startswith("api/") or full_path in {"docs", "redoc", "openapi.json"}:
            return None
        file_candidate = FRONTEND_DIST / full_path
        if file_candidate.is_file():
            return FileResponse(file_candidate)
        return FileResponse(FRONTEND_DIST / "index.html")
else:
    @app.get("/")
    def root():
        return {
            "tool": "ECDAT",
            "name": "Enterprise Cryptographic Discovery & Analysis Tool",
            "problem_statement": "SIH26164",
            "organization": "National Technical Research Organisation (NTRO)",
            "theme": "Blockchain & Cybersecurity",
            "team": "PRAYAS",
            "documentation": "/docs"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
