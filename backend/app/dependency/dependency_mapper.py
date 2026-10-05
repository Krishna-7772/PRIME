from typing import List, Dict, Any, Optional
from app.models.entities import CryptoAsset, Dependency

class DependencyMapper:
    def build_dependencies_for_scan(
        self,
        project_id: str,
        assets: List[CryptoAsset]
    ) -> List[Dependency]:
        """
        Synthesizes relationships from normalized crypto assets:
        Application -> Component -> Library -> Crypto Asset -> Certificate
        """
        deps: List[Dependency] = []
        seen = set()

        for asset in assets:
            app_name = asset.application or "Core Service"
            comp_name = asset.component or "Crypto Module"
            lib_name = asset.library or "Native Implementation"
            asset_label = f"{asset.algorithm}-{asset.key_size or ''}".rstrip("-")

            # 1. Application -> Component (CONTAINS, OBSERVED)
            key1 = (app_name, comp_name, "CONTAINS")
            if key1 not in seen:
                seen.add(key1)
                deps.append(Dependency(
                    project_id=project_id,
                    source_type="APPLICATION",
                    source_name=app_name,
                    target_type="COMPONENT",
                    target_name=comp_name,
                    relation_type="CONTAINS",
                    status="OBSERVED"
                ))

            # 2. Component -> Library (USES, DECLARED or INFERRED)
            status_lib = "DECLARED" if "Manifest" in (asset.detection_method or "") else "OBSERVED"
            key2 = (comp_name, lib_name, "USES")
            if key2 not in seen:
                seen.add(key2)
                deps.append(Dependency(
                    project_id=project_id,
                    source_type="COMPONENT",
                    source_name=comp_name,
                    target_type="LIBRARY",
                    target_name=lib_name,
                    relation_type="USES",
                    status=status_lib
                ))

            # 3. Library -> Crypto Asset (IMPLEMENTS, OBSERVED)
            key3 = (lib_name, asset_label, "IMPLEMENTS")
            if key3 not in seen:
                seen.add(key3)
                deps.append(Dependency(
                    project_id=project_id,
                    source_type="LIBRARY",
                    source_name=lib_name,
                    target_type="CRYPTO_ASSET",
                    target_name=f"{asset.asset_id}: {asset_label}",
                    relation_type="IMPLEMENTS",
                    status="OBSERVED"
                ))

            # 4. If Certificate
            if asset.purpose == "certificate":
                key4 = (asset_label, "X.509 Trust Store", "BINDS")
                if key4 not in seen:
                    seen.add(key4)
                    deps.append(Dependency(
                        project_id=project_id,
                        source_type="CRYPTO_ASSET",
                        source_name=f"{asset.asset_id}: {asset_label}",
                        target_type="CERTIFICATE",
                        target_name="X.509 Certificate Chain",
                        relation_type="BINDS",
                        status="OBSERVED"
                    ))

        return deps

    def format_for_react_flow(
        self,
        dependencies: List[Dependency],
        assets: Optional[List[CryptoAsset]] = None,
        certificates: Optional[List[Any]] = None
    ) -> Dict[str, Any]:
        """
        Converts list of dependencies into React Flow nodes and edges layout with positions.
        """
        node_map: Dict[str, Dict[str, Any]] = {}
        edges: List[Dict[str, Any]] = []

        # Layer coordinates
        layer_x = {
            "APPLICATION": 50,
            "COMPONENT": 320,
            "LIBRARY": 590,
            "CRYPTO_ASSET": 860,
            "CERTIFICATE": 1130
        }
        layer_counts = {k: 0 for k in layer_x}

        for idx, dep in enumerate(dependencies):
            # Source Node
            s_type = dep.source_type
            s_name = dep.source_name
            if s_name not in node_map:
                y_pos = 60 + layer_counts.get(s_type, 0) * 110
                layer_counts[s_type] = layer_counts.get(s_type, 0) + 1
                node_map[s_name] = {
                    "id": s_name,
                    "type": "customNode",
                    "data": {
                        "label": s_name,
                        "nodeType": s_type,
                        "status": dep.status
                    },
                    "position": {"x": layer_x.get(s_type, 50), "y": y_pos}
                }

            # Target Node
            t_type = dep.target_type
            t_name = dep.target_name
            if t_name not in node_map:
                y_pos = 60 + layer_counts.get(t_type, 0) * 110
                layer_counts[t_type] = layer_counts.get(t_type, 0) + 1
                node_map[t_name] = {
                    "id": t_name,
                    "type": "customNode",
                    "data": {
                        "label": t_name,
                        "nodeType": t_type,
                        "status": dep.status
                    },
                    "position": {"x": layer_x.get(t_type, 350), "y": y_pos}
                }

            # Edge
            edge_color = "#38bdf8" if dep.status == "OBSERVED" else ("#a78bfa" if dep.status == "DECLARED" else "#94a3b8")
            edges.append({
                "id": f"e-{dep.id or idx}",
                "source": s_name,
                "target": t_name,
                "label": dep.relation_type,
                "animated": dep.status == "OBSERVED",
                "style": {"stroke": edge_color, "strokeWidth": 2}
            })

        return {
            "nodes": list(node_map.values()),
            "edges": edges
        }
