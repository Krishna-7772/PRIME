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

export interface AgilityAssessment {
  id: string;
  c1_operation_coupling: number;
  c1_explanation?: string;
  c2_creation_coupling: number;
  c2_explanation?: string;
  c3_provider_coupling: number;
  c3_explanation?: string;
  c4_decoupling_mechanism: number;
  c4_explanation?: string;
  c5_decoupling_authority: number;
  c5_explanation?: string;
  e1_algorithm_migration: number;
  e1_explanation?: string;
  e2_provider_migration: number;
  e2_explanation?: string;
  overall_agility_score: number;
  agility_rating: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'EXCELLENT';
  radar_data?: Array<{ dimension: string; score: number; fullMark: number }>;
  recommendations?: string[];
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

export interface PolicyViolation {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  rule_code: string;
  message: string;
  evidence_snippet?: string;
  file_path?: string;
  line_number?: number;
  created_at: string;
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
  confidence_classification: 'CONFIRMED' | 'STRONG_INFERENCE' | 'WEAK_INFERENCE' | 'UNVERIFIED' | 'MANUAL';
  provenance: 'OBSERVED' | 'INFERRED' | 'DECLARED';
  quantum_status: 'QUANTUM_VULNERABLE' | 'QUANTUM_WEAKENED' | 'QUANTUM_RESISTANT' | 'CLASSICALLY_BROKEN' | 'NOT_APPLICABLE' | 'UNKNOWN';
  owner?: string;
  data_classification?: string;
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
  agility?: AgilityAssessment;
}

export interface Scan {
  id: string;
  project_id: string;
  target_type: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  total_files: number;
  analyzed_files: number;
  supported_files: number;
  unsupported_files: number;
  skipped_files: number;
  failed_files: number;
  coverage_percentage: number;
  findings_count: number;
  certificates_count: number;
  libraries_count: number;
  binaries_count: number;
  containers_count: number;
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

export interface DriftEvent {
  id: string;
  event_type: 'NEW_CRYPTO' | 'REMOVED_CRYPTO' | 'CHANGED_ALGORITHM' | 'CHANGED_KEY_SIZE' | 'EXPIRING_CERTIFICATE' | 'RISK_INCREASE' | 'RISK_DECREASE' | 'COVERAGE_CHANGE';
  asset_identifier: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
  details?: Record<string, any>;
}

export interface DriftSnapshot {
  id: string;
  project_id: string;
  scan_id: string;
  previous_scan_id?: string;
  total_assets_diff: number;
  new_assets_count: number;
  removed_assets_count: number;
  modified_assets_count: number;
  created_at: string;
  events: DriftEvent[];
}

export interface ValidationBenchmarkResult {
  test_type: string;
  execution_status: string;
  classical: {
    algorithm: string;
    keygen_time_us: number;
    sign_time_us?: number;
    verify_time_us?: number;
    exchange_time_us?: number;
    signature_size_bytes?: number;
    public_key_bytes?: number;
  };
  candidate: {
    algorithm: string;
    standard: string;
    keygen_time_us: number;
    sign_time_us?: number;
    verify_time_us?: number;
    encapsulation_time_us?: number;
    decapsulation_time_us?: number;
    signature_size_bytes?: number;
    public_key_bytes?: number;
    ciphertext_bytes?: number;
  };
  overhead?: {
    size_overhead_factor: number;
    bandwidth_impact: string;
    verification_ratio: string;
    compatibility_verdict: string;
  };
  hybrid_rfc10024?: {
    algorithm: string;
    total_handshake_us: number;
    total_public_key_bytes: number;
    total_ciphertext_bytes: number;
    security_note: string;
  };
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
  average_agility_score: number;
  coverage_percentage: number;
  policy_violations_count: number;
  risk_distribution: Record<string, number>;
  purpose_distribution: Record<string, number>;
  algorithm_distribution: Record<string, number>;
  top_migration_priorities: CryptoAsset[];
  recent_scans: Scan[];
}
