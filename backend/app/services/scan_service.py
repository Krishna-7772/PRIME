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
    Recommendation, MigrationAssessment, Dependency, Certificate, Application,
    AgilityAssessment, PolicyViolation, DriftSnapshot, DriftEvent
)
from app.scanners.orchestrator import ScannerOrchestrator
from app.risk.risk_engine import RiskEngine
from app.recommendation.recommendation_engine import RecommendationEngine
from app.dependency.dependency_mapper import DependencyMapper
from app.migration.migration_impact import MigrationImpactAnalyzer
from app.agility.agility_engine import AgilityEngine
from app.policies.policy_engine import PolicyEngine
from app.drift.drift_engine import DriftEngine

class ScanService:
    def __init__(self, db: Session):
        self.db = db
        self.orchestrator = ScannerOrchestrator()
        self.risk_engine = RiskEngine()
        self.rec_engine = RecommendationEngine()
        self.dep_mapper = DependencyMapper()
        self.impact_analyzer = MigrationImpactAnalyzer()
        self.agility_engine = AgilityEngine()
        self.policy_engine = PolicyEngine()

    def execute_scan(
        self,
        project_id: str,
        target_path: str,
        target_type: str = "SOURCE_REPOSITORY"
    ) -> Scan:
        project = self.db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise ValueError(f"Project {project_id} not found.")

        # Identify previous completed scan for drift tracking (Section 21)
        previous_scan = (
            self.db.query(Scan)
            .filter(Scan.project_id == project_id, Scan.status == "COMPLETED")
            .order_by(Scan.started_at.desc())
            .first()
        )

        # Create Scan record in RUNNING state
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
            # 1. Run all scanners with coverage tracking
            scan_result = self.orchestrator.run_all_scanners(target_path)
            findings = scan_result["findings"]

            scan.total_files = scan_result["total_files"]
            scan.analyzed_files = scan_result["assessed_files"]
            scan.supported_files = scan_result["supported_files"]
            scan.unsupported_files = scan_result["unsupported_files"]
            scan.skipped_files = scan_result["skipped_files"]
            scan.failed_files = scan_result["failed_files"]
            scan.coverage_percentage = scan_result["coverage_percentage"]

            scan.certificates_count = scan_result["certificates_count"]
            scan.libraries_count = scan_result["libraries_count"]
            scan.binaries_count = scan_result["binary_findings_count"]
            scan.containers_count = scan_result["container_findings_count"]

            created_assets: List[CryptoAsset] = []
            asset_counter = 1
            discovered_apps = set()
            assets_for_policy = []
            certificates_for_policy = []

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

                # 4. Agility Assessment (7 dimensions: C1-C5, E1-E2)
                agility_data = self.agility_engine.assess_asset_agility(f)

                # 5. Determine Provenance & Confidence Classification
                confidence_class = "CONFIRMED" if f.confidence >= 0.85 else "STRONG_INFERENCE"
                if "DECLARED" in f.detection_method or (f.raw_metadata and f.raw_metadata.get("provenance") == "DECLARED"):
                    provenance = "DECLARED"
                    confidence_class = "MANUAL"
                else:
                    provenance = "OBSERVED"

                quantum_status = (
                    "QUANTUM_VULNERABLE" if risk_data["quantum_exposure"] in {"CRITICAL", "HIGH"}
                    else "QUANTUM_WEAKENED" if risk_data["quantum_exposure"] == "MEDIUM"
                    else "QUANTUM_RESISTANT"
                )

                # 6. Create CryptoAsset entity
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
                    confidence_classification=confidence_class,
                    provenance=provenance,
                    quantum_status=quantum_status,
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
                self.db.flush()

                # 7. Create Evidence entity
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

                # 8. Create RiskAssessment entity
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

                # 9. Create Recommendation entity
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

                # 10. Create AgilityAssessment entity
                agility_entity = AgilityAssessment(
                    crypto_asset_id=asset.id,
                    c1_operation_coupling=agility_data["c1_operation_coupling"],
                    c1_explanation=agility_data["c1_explanation"],
                    c2_creation_coupling=agility_data["c2_creation_coupling"],
                    c2_explanation=agility_data["c2_explanation"],
                    c3_provider_coupling=agility_data["c3_provider_coupling"],
                    c3_explanation=agility_data["c3_explanation"],
                    c4_decoupling_mechanism=agility_data["c4_decoupling_mechanism"],
                    c4_explanation=agility_data["c4_explanation"],
                    c5_decoupling_authority=agility_data["c5_decoupling_authority"],
                    c5_explanation=agility_data["c5_explanation"],
                    e1_algorithm_migration=agility_data["e1_algorithm_migration"],
                    e1_explanation=agility_data["e1_explanation"],
                    e2_provider_migration=agility_data["e2_provider_migration"],
                    e2_explanation=agility_data["e2_explanation"],
                    overall_agility_score=agility_data["overall_agility_score"],
                    agility_rating=agility_data["agility_rating"],
                    radar_data=agility_data["radar_data"],
                    recommendations=agility_data["recommendations"]
                )
                self.db.add(agility_entity)

                # 11. Certificate entity if applicable
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
                    certificates_for_policy.append({
                        "id": cert.id,
                        "subject": cert.subject,
                        "issuer": cert.issuer,
                        "signature_algorithm": cert.signature_algorithm,
                        "public_key_algorithm": cert.public_key_algorithm,
                        "public_key_size": cert.public_key_size,
                        "file_path": cert.file_path,
                        "days_remaining": 180 if not cert.is_expired else -1
                    })

                created_assets.append(asset)
                assets_for_policy.append({
                    "asset_id": asset.asset_id,
                    "algorithm": asset.algorithm,
                    "family": asset.family,
                    "key_size": asset.key_size,
                    "purpose": asset.purpose,
                    "file_path": asset.file_path,
                    "line_number": asset.line_number,
                    "code_snippet": f.code_snippet,
                    "mosca_status": risk_data["mosca_status"]
                })

            # 12. Migration Impact / Blast Radius
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

            # 13. Map Graph Dependencies
            dependencies = self.dep_mapper.build_dependencies_for_scan(project_id, created_assets)
            for d in dependencies:
                self.db.add(d)

            # 14. Record Applications
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

            # 15. Policy Engine Evaluation (Section 3.F)
            violations = self.policy_engine.evaluate_findings(
                assets_for_policy,
                certificates=certificates_for_policy
            )
            for v in violations:
                # Find matching asset entity id if present
                matching_asset = next((a for a in created_assets if a.asset_id == v.get("asset_id")), None)
                asset_db_id = matching_asset.id if matching_asset else None

                # Find or ensure policy record
                self.db.add(PolicyViolation(
                    policy_id=v["policy_code"],
                    scan_id=scan.id,
                    crypto_asset_id=asset_db_id,
                    severity=v["severity"],
                    rule_code=v["policy_code"],
                    message=v["message"],
                    evidence_snippet=v.get("evidence_snippet"),
                    file_path=v.get("file_path"),
                    line_number=v.get("line_number")
                ))

            # 16. Cryptographic Drift Tracking (Section 21)
            if previous_scan:
                drift_data = DriftEngine.compare_scans(scan, previous_scan)
                drift_snap = DriftSnapshot(
                    project_id=project_id,
                    scan_id=scan.id,
                    previous_scan_id=previous_scan.id,
                    total_assets_diff=drift_data["total_assets_diff"],
                    new_assets_count=drift_data["new_assets_count"],
                    removed_assets_count=drift_data["removed_assets_count"],
                    modified_assets_count=drift_data["modified_assets_count"]
                )
                self.db.add(drift_snap)
                self.db.flush()

                for ev in drift_data["events"]:
                    self.db.add(DriftEvent(
                        drift_snapshot_id=drift_snap.id,
                        event_type=ev["event_type"],
                        asset_identifier=ev["asset_identifier"],
                        severity=ev["severity"],
                        description=ev["description"],
                        details=ev.get("details")
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
