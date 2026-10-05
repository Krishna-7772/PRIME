from typing import List, Dict, Any, Optional
from datetime import datetime
from app.models.entities import Scan, CryptoAsset, Certificate

class DriftEngine:
    """
    Cryptographic Drift Engine (Section 21)
    Analyzes temporal evolution of cryptographic posture across successive scans (Scan N vs Scan N-1).
    """

    @staticmethod
    def compare_scans(current_scan: Scan, previous_scan: Scan) -> Dict[str, Any]:
        """
        Calculates cryptographic delta between two scans.
        """
        curr_assets = {f"{a.file_path}:{a.algorithm}:{a.purpose}": a for a in current_scan.assets}
        prev_assets = {f"{a.file_path}:{a.algorithm}:{a.purpose}": a for a in previous_scan.assets}

        events = []

        # 1. New crypto assets
        new_keys = set(curr_assets.keys()) - set(prev_assets.keys())
        for k in new_keys:
            asset = curr_assets[k]
            events.append({
                "event_type": "NEW_CRYPTO",
                "asset_identifier": f"{asset.algorithm} in {asset.file_path}",
                "severity": "WARNING" if asset.risk and asset.risk.overall_risk in ["HIGH", "CRITICAL"] else "INFO",
                "description": f"New {asset.algorithm} usage discovered at line {asset.line_number} in {asset.file_path}.",
                "details": {
                    "algorithm": asset.algorithm,
                    "purpose": asset.purpose,
                    "file_path": asset.file_path,
                    "risk": asset.risk.overall_risk if asset.risk else "UNKNOWN"
                }
            })

        # 2. Removed crypto assets
        removed_keys = set(prev_assets.keys()) - set(curr_assets.keys())
        for k in removed_keys:
            asset = prev_assets[k]
            events.append({
                "event_type": "REMOVED_CRYPTO",
                "asset_identifier": f"{asset.algorithm} in {asset.file_path}",
                "severity": "INFO",
                "description": f"Cryptographic asset {asset.algorithm} removed or migrated from {asset.file_path}.",
                "details": {
                    "algorithm": asset.algorithm,
                    "purpose": asset.purpose,
                    "file_path": asset.file_path
                }
            })

        # 3. Changed algorithm / key size in same file
        curr_by_file = {a.file_path: a for a in current_scan.assets}
        prev_by_file = {a.file_path: a for a in previous_scan.assets}
        common_files = set(curr_by_file.keys()) & set(prev_by_file.keys())

        for f in common_files:
            c = curr_by_file[f]
            p = prev_by_file[f]
            if c.algorithm != p.algorithm:
                events.append({
                    "event_type": "CHANGED_ALGORITHM",
                    "asset_identifier": f,
                    "severity": "INFO" if "ML-" in c.algorithm or "PQC" in c.algorithm else "WARNING",
                    "description": f"Algorithm changed in {f} from {p.algorithm} to {c.algorithm}.",
                    "details": {"previous": p.algorithm, "current": c.algorithm}
                })
            elif c.key_size and p.key_size and c.key_size != p.key_size:
                events.append({
                    "event_type": "CHANGED_KEY_SIZE",
                    "asset_identifier": f,
                    "severity": "INFO" if c.key_size > p.key_size else "WARNING",
                    "description": f"Key size in {f} modified from {p.key_size} bits to {c.key_size} bits.",
                    "details": {"previous_size": p.key_size, "current_size": c.key_size}
                })

        # 4. Coverage change
        cov_diff = (current_scan.coverage_percentage or 0.0) - (previous_scan.coverage_percentage or 0.0)
        if abs(cov_diff) > 0.01:
            events.append({
                "event_type": "COVERAGE_CHANGE",
                "asset_identifier": "Repository Coverage",
                "severity": "INFO",
                "description": f"Codebase scanner coverage changed by {cov_diff:+.1f}% (now {current_scan.coverage_percentage:.1f}%).",
                "details": {
                    "previous_coverage": previous_scan.coverage_percentage,
                    "current_coverage": current_scan.coverage_percentage
                }
            })

        # Calculate summary numbers
        new_count = len(new_keys)
        removed_count = len(removed_keys)
        modified_count = len([e for e in events if e["event_type"] in ["CHANGED_ALGORITHM", "CHANGED_KEY_SIZE"]])
        total_diff = len(current_scan.assets) - len(previous_scan.assets)

        return {
            "project_id": current_scan.project_id,
            "scan_id": current_scan.id,
            "previous_scan_id": previous_scan.id,
            "total_assets_diff": total_diff,
            "new_assets_count": new_count,
            "removed_assets_count": removed_count,
            "modified_assets_count": modified_count,
            "events": events
        }
