import httpx
import json

client = httpx.Client(base_url='http://127.0.0.1:8000')

# Check if project exists
projects = client.get('/api/v1/projects').json()
project_id = None
for p in projects:
    if p['name'] == 'BharatPay Demo Enterprise':
        project_id = p['id']
        break

if not project_id:
    p_data = {
        'name': 'BharatPay Demo Enterprise',
        'description': 'Simulated Indian FinTech core banking and payments platform.',
        'organization': 'National Technical Research Organisation (NTRO)',
        'business_criticality': 'CRITICAL',
        'data_lifetime_years': 12.0,
        'migration_time_years': 4.0,
        'quantum_horizon_years': 10.0
    }
    res = client.post('/api/v1/projects', json=p_data)
    project_id = res.json()['id']
    print(f"Created project: {project_id}")
else:
    print(f"Using existing project: {project_id}")

# Run scan
scan_res = client.post(f'/api/v1/projects/{project_id}/scans', data={'repository_path': 'demo/bharatpay'})
print(f"Scan triggered: {scan_res.status_code}")

# Run second scan for drift demonstration
scan2_res = client.post(f'/api/v1/projects/{project_id}/scans', data={'repository_path': 'demo/bharatpay'})
print(f"Second scan triggered for drift: {scan2_res.status_code}")

# Dump data for offline standalone mode
assets = client.get(f'/api/v1/projects/{project_id}/assets').json()
overview = client.get(f'/api/v1/projects/{project_id}/dashboard').json()
deps = client.get(f'/api/v1/projects/{project_id}/dependencies').json()
agility = client.get(f'/api/v1/projects/{project_id}/agility').json()
drift = client.get(f'/api/v1/projects/{project_id}/drift').json()
policies = client.get(f'/api/v1/projects/{project_id}/policies/violations').json()

print(f"Dumped: {len(assets)} assets, {len(drift)} drift snapshots, {len(policies)} policy violations")

# Export as typescript demoData.ts
ts_content = f"""// Auto-generated real demo dataset for offline / standalone prototype mode
import {{ Project, CryptoAsset, DependencyGraph, DashboardOverview, DriftSnapshot, PolicyViolation }} from '../types';

export const OFFLINE_PROJECT: Project = ({json.dumps(projects[0] if projects else client.get('/api/v1/projects').json()[0], indent=2)}) as any;

export const OFFLINE_DASHBOARD: DashboardOverview = ({json.dumps(overview, indent=2)}) as any;

export const OFFLINE_ASSETS: CryptoAsset[] = ({json.dumps(assets, indent=2)}) as any[];

export const OFFLINE_DEPENDENCIES: DependencyGraph = ({json.dumps(deps, indent=2)}) as any;

export const OFFLINE_AGILITY: any = ({json.dumps(agility, indent=2)}) as any;

export const OFFLINE_DRIFT: DriftSnapshot[] = ({json.dumps(drift, indent=2)}) as any[];

export const OFFLINE_POLICIES: PolicyViolation[] = ({json.dumps(policies, indent=2)}) as any[];
"""

with open('frontend/src/services/demoData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Saved frontend/src/services/demoData.ts successfully!")
