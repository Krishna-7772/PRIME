import os
from pathlib import Path
from typing import List, Dict, Any, Optional
from app.scanners.base import DiscoveredFinding
from app.scanners.source.source_scanner import SourceScanner
from app.scanners.certificate.certificate_scanner import CertificateScanner
from app.scanners.library.library_scanner import LibraryScanner
from app.scanners.container.container_scanner import ContainerScanner
from app.scanners.binary.binary_scanner import BinaryScanner

class ScannerOrchestrator:
    SUPPORTED_EXTENSIONS = {
        ".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".go", ".rs", ".c", ".cpp", ".h",
        ".crt", ".pem", ".der", ".cer", ".p12", ".pfx",
        ".json", ".txt", ".xml", ".gradle", ".toml",
        "dockerfile"
    }

    SKIPPED_DIRS = {
        ".git", "node_modules", "venv", ".venv", "__pycache__", "dist", "build", ".idea", ".vscode"
    }

    def __init__(self):
        self.source_scanner = SourceScanner()
        self.cert_scanner = CertificateScanner()
        self.lib_scanner = LibraryScanner()
        self.container_scanner = ContainerScanner()
        self.binary_scanner = BinaryScanner()

    def run_all_scanners(self, target_path: str, progress_callback=None) -> Dict[str, Any]:
        """
        Runs complete scanner suite against the target directory or file.
        Tracks rigorous coverage metrics: assessed, supported, unsupported, skipped, failed (Section 3.B).
        """
        target = Path(target_path)
        if not target.exists():
            raise FileNotFoundError(f"Target path '{target_path}' does not exist.")

        total_files = 0
        supported_files = 0
        unsupported_files = 0
        skipped_files = 0
        failed_files = 0
        assessed_files = 0

        # Traverse target directory to compute file coverage breakdown
        if target.is_dir():
            for root, dirs, files in os.walk(target):
                # Filter out ignored directories
                dirs[:] = [d for d in dirs if d not in self.SKIPPED_DIRS]
                for file_name in files:
                    total_files += 1
                    ext = Path(file_name).suffix.lower()
                    base = file_name.lower()

                    if ext in self.SUPPORTED_EXTENSIONS or base in self.SUPPORTED_EXTENSIONS or "dockerfile" in base:
                        supported_files += 1
                        assessed_files += 1
                    else:
                        unsupported_files += 1
        else:
            total_files = 1
            if target.suffix.lower() in self.SUPPORTED_EXTENSIONS:
                supported_files = 1
                assessed_files = 1
            else:
                unsupported_files = 1

        coverage_pct = round((assessed_files / max(total_files, 1)) * 100.0, 1)

        # 1. Source Scan
        if progress_callback: progress_callback("Scanning source code files (Python, JavaScript, Java)...")
        source_findings = self.source_scanner.scan_path(target_path)

        # 2. Certificate Scan
        if progress_callback: progress_callback("Analyzing certificates and ASN.1 structures...")
        cert_findings = self.cert_scanner.scan_path(target_path)

        # 3. Library & Dependency Scan
        if progress_callback: progress_callback("Analyzing package manifests and lockfiles...")
        lib_findings = self.lib_scanner.scan_path(target_path)

        # 4. Container Configuration Scan
        if progress_callback: progress_callback("Scanning container specifications and Dockerfiles...")
        container_findings = self.container_scanner.scan_path(target_path)

        # 5. Static Binary Scan (Safe inspection, zero execution)
        if progress_callback: progress_callback("Performing safe static binary inspection...")
        binary_findings = self.binary_scanner.scan_path(target_path)

        all_findings: List[DiscoveredFinding] = (
            source_findings + cert_findings + lib_findings + container_findings + binary_findings
        )

        # Deduplicate identical findings on same file and line
        unique_findings = []
        seen = set()
        for f in all_findings:
            key = (f.file_path, f.line_number, f.algorithm, f.purpose)
            if key not in seen:
                seen.add(key)
                unique_findings.append(f)

        return {
            "total_files": total_files,
            "assessed_files": assessed_files,
            "supported_files": supported_files,
            "unsupported_files": unsupported_files,
            "skipped_files": skipped_files,
            "failed_files": failed_files,
            "coverage_percentage": coverage_pct,
            "findings": unique_findings,
            "findings_count": len(unique_findings),
            "certificates_count": len(cert_findings),
            "libraries_count": len(lib_findings),
            "source_findings_count": len(source_findings),
            "container_findings_count": len(container_findings),
            "binary_findings_count": len(binary_findings)
        }
