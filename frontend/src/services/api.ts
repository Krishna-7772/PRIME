import {
  Project,
  CryptoAsset,
  Scan,
  DependencyGraph,
  DashboardOverview
} from '../types';

const API_BASE = '/api/v1';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function triggerScan(projectId: string, formData: FormData): Promise<Scan> {
  const res = await fetch(`${API_BASE}/projects/${projectId}/scans`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Scan initiation failed' }));
    throw new Error(err.detail || 'Failed to initiate scan');
  }
  return res.json();
}

export async function fetchAssets(
  projectId: string,
  filters?: {
    algorithm?: string;
    purpose?: string;
    risk?: string;
    library?: string;
    application?: string;
  }
): Promise<CryptoAsset[]> {
  const params = new URLSearchParams();
  if (filters?.algorithm) params.append('algorithm', filters.algorithm);
  if (filters?.purpose) params.append('purpose', filters.purpose);
  if (filters?.risk) params.append('risk', filters.risk);
  if (filters?.library) params.append('library', filters.library);
  if (filters?.application) params.append('application', filters.application);

  const res = await fetch(`${API_BASE}/projects/${projectId}/assets?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch crypto assets');
  return res.json();
}

export async function fetchAssetDetail(assetId: string): Promise<CryptoAsset> {
  const res = await fetch(`${API_BASE}/assets/${assetId}`);
  if (!res.ok) throw new Error('Failed to fetch asset detail');
  return res.json();
}

export async function fetchDependencies(projectId: string): Promise<DependencyGraph> {
  const res = await fetch(`${API_BASE}/projects/${projectId}/dependencies`);
  if (!res.ok) throw new Error('Failed to fetch dependency graph');
  return res.json();
}

export async function fetchDashboard(projectId: string): Promise<DashboardOverview> {
  const res = await fetch(`${API_BASE}/projects/${projectId}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard overview');
  return res.json();
}

export function getCBOMDownloadUrl(projectId: string): string {
  return `${API_BASE}/projects/${projectId}/cbom`;
}

export function getReportDownloadUrl(projectId: string): string {
  return `${API_BASE}/projects/${projectId}/report`;
}
