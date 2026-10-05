import os
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.db.session import engine, Base, SessionLocal
from app.api.v1.router import api_router
from app.models.entities import Project
from app.services.scan_service import ScanService

# Ensure database tables are created
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    On first boot, if no projects exist in the database, automatically
    creates the BharatPay Demo Enterprise and executes a real scanner analysis.
    """
    db = SessionLocal()
    try:
        existing = db.query(Project).first()
        if not existing:
            demo_path = settings.BASE_DIR / "demo" / "bharatpay"
            if demo_path.exists():
                print("Seeding BharatPay Demo Enterprise with real cryptographic scan analysis...")
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
    
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Evidence-driven cryptographic intelligence for post-quantum migration readiness (NTRO SIH26164 Team PRAYAS)",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
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

# Check for production frontend build (single-service hosting support)
FRONTEND_DIST = settings.BASE_DIR / "frontend" / "dist"
if not FRONTEND_DIST.exists():
    alt_dist = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
    if alt_dist.exists():
        FRONTEND_DIST = alt_dist

if FRONTEND_DIST.exists() and (FRONTEND_DIST / "index.html").exists():
    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
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
            "product": "PRIME",
            "name": "Postquantum Readiness Intelligence and Migration Engine",
            "tagline": "Evidence-driven cryptographic intelligence for post-quantum migration readiness",
            "problem_statement": "SIH26164",
            "organization": "National Technical Research Organisation (NTRO)",
            "team": "PRAYAS",
            "environment": "LOCAL / AIR-GAPPED",
            "documentation": "/docs"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
