import os
import zipfile
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.entities import (
    Project, Scan, CryptoAsset, Evidence, RiskAssessment,
    Recommendation, MigrationAssessment, Dependency, Certificate, Application
)
from app.scanners.orchestrator import ScannerOrchestrator
from app.risk.risk_engine import RiskEngine
from app.recommendation.recommendation_engine import RecommendationEngine
from app.dependency.dependency_mapper import DependencyMapper
from app.migration.migration_impact import MigrationImpactAnalyzer

class ScanService:
    def __init__(self, db: Session):
        self.db = db
        self.orchestrator = ScannerOrchestrator()
        self.risk_engine = RiskEngine()
        self.rec_engine = RecommendationEngine()
        self.dep_mapper = DependencyMapper()
        self.impact_analyzer = MigrationImpactAnalyzer()

    def execute_scan(
        self,
        project_id: str,
        target_path: str,
        target_type: str = "SOURCE_REPOSITORY"
    ) -> Scan:
        project = self.db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise ValueError(f"Project {project_id} not found.")

        # Create Scan record in PENDING / RUNNING
        scan = Scan(
            project_id=project_id,
            target_type=target_type,
            target_path=target_path,
            status="RUNNING",
            started_at=datetime.now(timezone.utc)
        )
        self.db.add(scan)
        self.db.commit()
        self.db.refresh(scan)

        try:
            # 1. Run all scanners
            scan_result = self.orchestrator.run_all_scanners(target_path)
            findings = scan_result["findings"]

            scan.total_files = scan_result["total_files"]
            scan.analyzed_files = scan_result["total_files"]
            scan.certificates_count = scan_result["certificates_count"]
            scan.libraries_count = scan_result["libraries_count"]

            created_assets: List[CryptoAsset] = []
            asset_counter = 1

            # Track applications to auto-populate Project.applications
            discovered_apps = set()

            for f in findings:
                asset_code = f"CRYPTO-{asset_counter:04d}"
                asset_counter += 1

                app_name = f.application or "Core Service"
                comp_name = f.component or "Module"
                discovered_apps.add(app_name)

                # 2. Risk Assessment (Mosca + Quantum + Hygiene + Business Criticality)
                risk_data = self.risk_engine.assess_risk(
                    f,
                    business_criticality=project.business_criticality,
                    data_lifetime_years=project.data_lifetime_years,
                    migration_time_years=project.migration_time_years,
                    quantum_horizon_years=project.quantum_horizon_years
                )

                # 3. Purpose-aware PQC Recommendation
                rec_data = self.rec_engine.recommend(f)

                # 4. Create CryptoAsset entity
                asset = CryptoAsset(
                    asset_id=asset_code,
                    project_id=project_id,
                    scan_id=scan.id,
                    algorithm=f.algorithm,
                    family=f.family,
                    key_size=f.key_size,
                    curve=f.curve,
                    purpose=f.purpose,
                    purpose_confidence=f.purpose_confidence,
                    application=app_name,
                    component=comp_name,
                    library=f.library,
                    library_version=f.library_version,
                    file_path=f.file_path,
                    line_number=f.line_number,
                    confidence=f.confidence,
                    detection_method=f.detection_method
                )
                self.db.add(asset)
                self.db.flush() # populate asset.id

                # 5. Create Evidence entity
                evidence = Evidence(
                    crypto_asset_id=asset.id,
                    file_path=f.file_path,
                    line_start=f.line_number,
                    line_end=f.line_end,
                    code_snippet=f.code_snippet,
                    detection_rule=f.detection_method,
                    context_notes=f.context_notes
                )
                self.db.add(evidence)

                # 6. Create RiskAssessment entity
                risk_entity = RiskAssessment(
                    crypto_asset_id=asset.id,
                    overall_risk=risk_data["overall_risk"],
                    quantum_exposure=risk_data["quantum_exposure"],
                    hygiene_risk=risk_data["hygiene_risk"],
                    mosca_status=risk_data["mosca_status"],
                    data_lifetime_years=risk_data["data_lifetime_years"],
                    migration_time_years=risk_data["migration_time_years"],
                    quantum_horizon_years=risk_data["quantum_horizon_years"],
                    mosca_margin_years=risk_data["mosca_margin_years"],
                    risk_score=risk_data["risk_score"],
                    explanation_markdown=risk_data["explanation_markdown"]
                )
                self.db.add(risk_entity)

                # 7. Create Recommendation entity
                rec_entity = Recommendation(
                    crypto_asset_id=asset.id,
                    recommended_pqc=rec_data["recommended_pqc"],
                    parameter_set=rec_data["parameter_set"],
                    alternative_pqc=rec_data["alternative_pqc"],
                    alternative_parameter_set=rec_data["alternative_parameter_set"],
                    rationale=rec_data["rationale"],
                    tradeoffs_json=rec_data["tradeoffs_json"],
                    migration_complexity=rec_data["migration_complexity"],
                    validation_required=rec_data["validation_required"]
                )
                self.db.add(rec_entity)

                # 8. Certificate record if certificate purpose
                if f.purpose == "certificate" and f.raw_metadata:
                    raw = f.raw_metadata
                    cert = Certificate(
                        scan_id=scan.id,
                        subject=raw.get("subject", "CN=Subject"),
                        issuer=raw.get("issuer", "CN=Issuer"),
                        serial_number=raw.get("serial_number"),
                        signature_algorithm=raw.get("signature_algorithm", "SHA256withRSA"),
                        public_key_algorithm=f.algorithm,
                        public_key_size=f.key_size,
                        file_path=f.file_path,
                        is_expired=raw.get("is_expired", False),
                        quantum_vulnerable=risk_data["quantum_exposure"] in {"CRITICAL", "HIGH"}
                    )
                    self.db.add(cert)

                created_assets.append(asset)

            # 9. Compute Migration Blast Radius for each asset
            for asset in created_assets:
                impact_data = self.impact_analyzer.analyze_impact(asset, created_assets)
                migration_entity = MigrationAssessment(
                    crypto_asset_id=asset.id,
                    affected_applications=impact_data["affected_applications"],
                    affected_components=impact_data["affected_components"],
                    affected_libraries=impact_data["affected_libraries"],
                    affected_certificates=impact_data["affected_certificates"],
                    affected_configurations=impact_data["affected_configurations"],
                    migration_complexity=impact_data["migration_complexity"],
                    blast_radius_summary=impact_data["blast_radius_summary"],
                    review_items=impact_data["review_items"]
                )
                self.db.add(migration_entity)

            # 10. Map Dependencies
            dependencies = self.dep_mapper.build_dependencies_for_scan(project_id, created_assets)
            for d in dependencies:
                self.db.add(d)

            # 11. Record Applications
            for app_name in discovered_apps:
                existing_app = self.db.query(Application).filter(
                    Application.project_id == project_id,
                    Application.name == app_name
                ).first()
                if not existing_app:
                    self.db.add(Application(
                        project_id=project_id,
                        name=app_name,
                        business_criticality=project.business_criticality
                    ))

            scan.findings_count = len(created_assets)
            scan.status = "COMPLETED"
            scan.completed_at = datetime.now(timezone.utc)
            self.db.commit()
            self.db.refresh(scan)

            return scan

        except Exception as e:
            self.db.rollback()
            scan.status = "FAILED"
            scan.error_message = str(e)
            scan.completed_at = datetime.now(timezone.utc)
            self.db.commit()
            raise e
