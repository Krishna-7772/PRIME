import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
KB_DIR = BASE_DIR / "knowledge_base"
UPLOAD_DIR = BASE_DIR / "uploads"
REPORTS_DIR = BASE_DIR / "generated_reports"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

class Settings(BaseSettings):
    PROJECT_NAME: str = "ECDAT - Enterprise Cryptographic Discovery & Analysis Tool"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database: Default to SQLite for zero-config startup, supports PostgreSQL via env
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'backend' / 'ecdat.db'}")
    
    # Knowledge Base Path
    KNOWLEDGE_BASE_DIR: Path = KB_DIR
    
    # Upload and Reports
    UPLOAD_PATH: Path = UPLOAD_DIR
    REPORTS_PATH: Path = REPORTS_DIR
    
    # Mosca Theorem defaults
    DEFAULT_QUANTUM_HORIZON_YEARS: float = 10.0
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "*"]
    BASE_DIR: Path = BASE_DIR

    model_config = SettingsConfigDict(case_sensitive=True, arbitrary_types_allowed=True)

settings = Settings()
