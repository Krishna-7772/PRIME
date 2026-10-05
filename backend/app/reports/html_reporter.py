import json
from datetime import datetime, timezone
from jinja2 import Template
from typing import List, Dict, Any
from app.models.entities import Project, CryptoAsset

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ECDAT Executive Cryptographic Audit & PQC Migration Report - {{ project.name }}</title>
  <style>
    :root {
      --bg: #0b132b;
      --card-bg: #1c2541;
      --accent: #3a86ff;
      --cyan: #38bdf8;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;
      --warning: #f59e0b;
      --success: #10b981;
      --border: #334155;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 40px;
    }
    .header {
      border-bottom: 2px solid var(--accent);
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand { font-size: 28px; font-weight: 800; color: var(--cyan); letter-spacing: 1px; }
    .subtitle { color: var(--text-muted); font-size: 14px; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-critical { background: rgba(239,68,68,0.2); color: var(--danger); border: 1px solid var(--danger); }
    .badge-high { background: rgba(245,158,11,0.2); color: var(--warning); border: 1px solid var(--warning); }
    .badge-medium { background: rgba(56,189,248,0.2); color: var(--cyan); border: 1px solid var(--cyan); }
    .badge-low { background: rgba(16,185,129,0.2); color: var(--success); border: 1px solid var(--success); }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 35px;
    }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }
    .stat-val { font-size: 32px; font-weight: 800; color: var(--cyan); }
    .stat-lbl { color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-top: 5px; }

    .mosca-banner {
      background: linear-gradient(135deg, #1e1b4b, #1e293b);
      border-left: 4px solid var(--accent);
      padding: 20px;
      border-radius: 6px;
      margin-bottom: 35px;
    }
    .mosca-title { font-size: 18px; font-weight: 700; color: #a5b4fc; margin-bottom: 8px; }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background: var(--card-bg);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      font-size: 13px;
    }
    th {
      background: #0f172a;
      color: var(--cyan);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    tr:hover { background: rgba(255,255,255,0.02); }
    code {
      font-family: monospace;
      background: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      color: #38bdf8;
    }
    pre {
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 12px;
      font-size: 12px;
      color: #cbd5e1;
      overflow-x: auto;
    }
    .footer {
      margin-top: 50px;
      border-top: 1px solid var(--border);
      padding-top: 20px;
      font-size: 12px;
      color: var(--text-muted);
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <div class="brand">ECDAT</div>
      <div class="subtitle">Enterprise Cryptographic Discovery & Analysis Tool | NTRO SIH26164</div>
    </div>
    <div style="text-align: right;">
      <h2 style="margin: 0; color: var(--text);">{{ project.name }}</h2>
      <div class="subtitle">Generated on: {{ timestamp }} UTC</div>
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val">{{ total_assets }}</div>
      <div class="stat-lbl">Discovered Crypto Assets</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color: var(--danger);">{{ quantum_exposed }}</div>
      <div class="stat-lbl">Quantum-Exposed Primitives</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color: var(--warning);">{{ high_risk_count }}</div>
      <div class="stat-lbl">High & Critical Risk</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">{{ affected_apps_count }}</div>
      <div class="stat-lbl">Applications Affected</div>
    </div>
  </div>

  <div class="mosca-banner">
    <div class="mosca-title">Dr. Michele Mosca's Theorem Risk Evaluation (X + Y > Z)</div>
    <div style="font-size: 14px; color: #cbd5e1;">
      <strong>Data Lifetime (X):</strong> {{ project.data_lifetime_years }} yrs |
      <strong>Migration Time (Y):</strong> {{ project.migration_time_years }} yrs |
      <strong>Quantum Threat Horizon (Z):</strong> {{ project.quantum_horizon_years }} yrs
    </div>
    <div style="margin-top: 10px; font-size: 13px;">
      {% if project.data_lifetime_years + project.migration_time_years > project.quantum_horizon_years %}
      <span class="badge badge-critical">AT RISK</span>
      Equation Result: <code>{{ project.data_lifetime_years + project.migration_time_years }} > {{ project.quantum_horizon_years }}</code>.
      Protected data will remain sensitive beyond the CRQC arrival horizon before migration can complete. Immediate PQC transition planning mandated.
      {% else %}
      <span class="badge badge-low">MANAGEABLE</span>
      Equation Result: <code>{{ project.data_lifetime_years + project.migration_time_years }} &le; {{ project.quantum_horizon_years }}</code>.
      {% endif %}
    </div>
  </div>

  <h3 style="color: var(--cyan); margin-top: 30px;">Discovered Cryptographic Asset Inventory</h3>
  <table>
    <thead>
      <tr>
        <th>Asset ID</th>
        <th>Algorithm</th>
        <th>Purpose</th>
        <th>Application / Module</th>
        <th>Quantum Exposure</th>
        <th>Overall Risk</th>
        <th>FIPS PQC Target</th>
        <th>Confidence</th>
      </tr>
    </thead>
    <tbody>
      {% for asset in assets %}
      <tr>
        <td><code>{{ asset.asset_id }}</code></td>
        <td><strong>{{ asset.algorithm }}</strong> {% if asset.key_size %}({{ asset.key_size }}){% endif %}</td>
        <td>{{ asset.purpose }}</td>
        <td>{{ asset.application }} / {{ asset.component }}</td>
        <td>
          <span class="badge badge-{{ 'critical' if asset.risk.quantum_exposure == 'CRITICAL' else ('high' if asset.risk.quantum_exposure == 'HIGH' else ('medium' if asset.risk.quantum_exposure == 'MEDIUM' else 'low')) }}">
            {{ asset.risk.quantum_exposure }}
          </span>
        </td>
        <td>
          <span class="badge badge-{{ 'critical' if asset.risk.overall_risk == 'CRITICAL' else ('high' if asset.risk.overall_risk == 'HIGH' else ('medium' if asset.risk.overall_risk == 'MEDIUM' else 'low')) }}">
            {{ asset.risk.overall_risk }}
          </span>
        </td>
        <td><strong style="color: #38bdf8;">{{ asset.recommendation.recommended_pqc if asset.recommendation else 'N/A' }}</strong></td>
        <td>{{ (asset.confidence * 100)|int }}%</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>

  <h3 style="color: var(--cyan); margin-top: 40px;">Traceable Cryptographic Evidence Sample</h3>
  {% for asset in assets[:5] %}
  <div style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 6px; padding: 15px; margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <div><strong>{{ asset.asset_id }} - {{ asset.algorithm }}</strong> in <code>{{ asset.file_path }}{% if asset.line_number %}:{{ asset.line_number }}{% endif %}</code></div>
      <div>Method: <em>{{ asset.detection_method }}</em></div>
    </div>
    {% if asset.evidence and asset.evidence.code_snippet %}
    <pre><code>{{ asset.evidence.code_snippet }}</code></pre>
    {% endif %}
    <div style="font-size: 13px; color: var(--text-muted);">
      <strong>PQC Path:</strong> {{ asset.recommendation.recommended_pqc }} | <strong>Rationale:</strong> {{ asset.recommendation.rationale }}
    </div>
  </div>
  {% endfor %}

  <div class="footer">
    Report generated by ECDAT (National Technical Research Organisation - SIH26164) &bull; Confidential Cryptographic Audit
  </div>

</body>
</html>
"""

class HTMLReporter:
    def generate_html_report(self, project: Project, assets: List[CryptoAsset]) -> str:
        template = Template(HTML_TEMPLATE)
        total_assets = len(assets)
        quantum_exposed = len([a for a in assets if a.risk and a.risk.quantum_exposure in {"CRITICAL", "HIGH"}])
        high_risk_count = len([a for a in assets if a.risk and a.risk.overall_risk in {"CRITICAL", "HIGH"}])
        apps = {a.application for a in assets if a.application}

        return template.render(
            project=project,
            assets=assets,
            total_assets=total_assets,
            quantum_exposed=quantum_exposed,
            high_risk_count=high_risk_count,
            affected_apps_count=len(apps),
            timestamp=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
        )
