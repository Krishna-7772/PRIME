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
    def __init__(self):
        self.source_scanner = SourceScanner()
        self.cert_scanner = CertificateScanner()
        self.lib_scanner = LibraryScanner()
        self.container_scanner = ContainerScanner()
        self.binary_scanner = BinaryScanner()

    def run_all_scanners(self, target_path: str, progress_callback=None) -> Dict[str, Any]:
        """
        Runs complete scanner suite against the target directory or file.
        Returns dictionary containing findings, counts, and metadata.
        """
        target = Path(target_path)
        if not target.exists():
            raise FileNotFoundError(f"Target path '{target_path}' does not exist.")

        # 1. Source Scan
        if progress_callback: progress_callback("Scanning source code files...")
        source_findings = self.source_scanner.scan_path(target_path)

        # 2. Certificate Scan
        if progress_callback: progress_callback("Analyzing certificates and trust stores...")
        cert_findings = self.cert_scanner.scan_path(target_path)

        # 3. Library & Dependency Scan
        if progress_callback: progress_callback("Analyzing package manifests and dependencies...")
        lib_findings = self.lib_scanner.scan_path(target_path)

        # 4. Container Configuration Scan
        if progress_callback: progress_callback("Scanning container specifications and Dockerfiles...")
        container_findings = self.container_scanner.scan_path(target_path)

        # 5. Static Binary Scan
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

        # Count total files analyzed
        total_files = 0
        for _, _, files in os.walk(target):
            total_files += len(files)

        return {
            "total_files": total_files,
            "findings": unique_findings,
            "findings_count": len(unique_findings),
            "certificates_count": len(cert_findings),
            "libraries_count": len(lib_findings),
            "source_findings_count": len(source_findings),
            "container_findings_count": len(container_findings),
            "binary_findings_count": len(binary_findings)
        }
