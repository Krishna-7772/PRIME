export interface Project {
  id: string;
  name: string;
  description?: string;
  organization: string;
  business_criticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  data_lifetime_years: number;
  migration_time_years: number;
  quantum_horizon_years: number;
  created_at: string;
  updated_at: string;
}

export interface Evidence {
  id: string;
  file_path: string;
  line_start?: number;
  line_end?: number;
  code_snippet: string;
  detection_rule?: string;
  ast_node_type?: string;
  context_notes?: string;
}

export interface RiskAssessment {
  id: string;
  overall_risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  quantum_exposure: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  hygiene_risk: 'CLEAN' | 'DEPRECATED' | 'BROKEN';
  mosca_status: 'AT_RISK' | 'MANAGEABLE' | 'CRITICAL_URGENCY' | 'NOT_APPLICABLE';
  data_lifetime_years: number;
  migration_time_years: number;
  quantum_horizon_years: number;
  mosca_margin_years: number;
  risk_score: number;
  explanation_markdown: string;
}

export interface Recommendation {
  id: string;
  recommended_pqc: string;
  parameter_set?: string;
  alternative_pqc?: string;
  alternative_parameter_set?: string;
  rationale: string;
  tradeoffs_json?: Record<string, any>;
  migration_complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  validation_required: boolean;
}

export interface MigrationReviewItem {
  category: string;
  component: string;
  status: string;
  finding: string;
  action: string;
  validation_priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface MigrationAssessment {
  id: string;
  affected_applications: number;
  affected_components: number;
  affected_libraries: number;
  affected_certificates: number;
  affected_configurations: number;
  migration_complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  blast_radius_summary?: string;
  review_items?: MigrationReviewItem[];
}

export interface CryptoAsset {
  id: string;
  asset_id: string;
  project_id: string;
  scan_id: string;
  algorithm: string;
  family?: string;
  key_size?: number;
  curve?: string;
  purpose: string;
  purpose_confidence: string;
  application: string;
  component: string;
  library?: string;
  library_version?: string;
  file_path: string;
  line_number?: number;
  confidence: number;
  detection_method: string;
  created_at: string;
  evidence?: Evidence;
  risk?: RiskAssessment;
  recommendation?: Recommendation;
  migration?: MigrationAssessment;
}

export interface Scan {
  id: string;
  project_id: string;
  target_type: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  total_files: number;
  analyzed_files: number;
  findings_count: number;
  certificates_count: number;
  libraries_count: number;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
}

export interface GraphNode {
  id: string;
  type: string;
  data: {
    label: string;
    nodeType: string;
    status: string;
  };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: Record<string, any>;
}

export interface DependencyGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface DashboardOverview {
  total_crypto_assets: number;
  quantum_exposed_assets: number;
  critical_risk_assets: number;
  high_risk_assets: number;
  medium_risk_assets: number;
  low_risk_assets: number;
  applications_affected: number;
  certificates_count: number;
  mosca_at_risk_count: number;
  risk_distribution: Record<string, number>;
  purpose_distribution: Record<string, number>;
  algorithm_distribution: Record<string, number>;
  top_migration_priorities: CryptoAsset[];
  recent_scans: Scan[];
}
