import React, { useEffect, useState } from 'react';
import { Project, PolicyViolation } from '../types';
import { fetchPolicyViolations } from '../services/api';
import { ShieldCheck, AlertOctagon, CheckCircle2, FileCode, Wrench } from 'lucide-react';

interface PolicyComplianceViewProps {
  activeProject: Project | null;
}

export const PolicyComplianceView: React.FC<PolicyComplianceViewProps> = ({ activeProject }) => {
  const [violations, setViolations] = useState<PolicyViolation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetchPolicyViolations(activeProject.id)
      .then((data) => setViolations(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activeProject?.id]);

  const defaultPolicies = [
    { code: 'POL-001', name: 'Disallow MD5 Hash Algorithm', category: 'HASH_HYGIENE', severity: 'CRITICAL' },
    { code: 'POL-002', name: 'Disallow SHA-1 for Digital Signatures', category: 'HASH_HYGIENE', severity: 'HIGH' },
    { code: 'POL-003', name: 'Minimum RSA Key Size 2048-bit', category: 'ASYMMETRIC_STRENGTH', severity: 'CRITICAL' },
    { code: 'POL-004', name: 'Disallow Legacy 3DES and DES Ciphers', category: 'SYMMETRIC_HYGIENE', severity: 'CRITICAL' },
    { code: 'POL-005', name: 'Mandatory PQC Transition for Mosca Deficit', category: 'QUANTUM_EXPOSURE', severity: 'HIGH' },
    { code: 'POL-006', name: 'Enforce TLS 1.2+ Protocol Baseline', category: 'PROTOCOL_BASELINE', severity: 'HIGH' },
    { code: 'POL-007', name: 'Expiring Certificate Proactive Renewal (<30d)', category: 'CERTIFICATE_LIFECYCLE', severity: 'MEDIUM' }
  ];

  if (!activeProject) {
    return <div className="text-slate-400 text-xs">Please select a project.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">Enterprise Cryptographic Policy Compliance</h2>
              <span className="bg-blue-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-800">
                CONFIGURABLE POLICY ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Enforces organization-wide cryptographic standards against discovered assets. Validates key sizes, disallows deprecated hashing algorithms, flags 3DES/DES, and mandates PQC transition plans for Mosca deficits.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
              violations.length === 0 ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-red-950 text-red-400 border-red-800'
            }`}>
              {violations.length} POLICY VIOLATION{violations.length === 1 ? '' : 'S'} DETECTED
            </span>
          </div>
        </div>
      </div>

      {/* Policies Rules Grid */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800">Active Organizational Baseline Policies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {defaultPolicies.map((pol) => {
            const hasViolation = violations.some((v) => v.rule_code === pol.code);
            return (
              <div
                key={pol.code}
                className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                  hasViolation
                    ? 'bg-red-950/20 border-red-900/60 text-red-300'
                    : 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700">
                    {pol.code}
                  </span>
                  <span className="flex items-center space-x-1 text-[10px] font-mono">
                    {hasViolation ? (
                      <span className="text-red-400 flex items-center"><AlertOctagon className="w-3 h-3 mr-1" /> FAILING</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> PASSING</span>
                    )}
                  </span>
                </div>
                <div className="font-semibold text-slate-200 text-xs">{pol.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{pol.category} &bull; {pol.severity}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Violations Detail Table */}
      {violations.length > 0 && (
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800">Detected Violations &amp; Evidence</h3>
          
          <div className="space-y-3">
            {violations.map((v) => (
              <div key={v.id} className="bg-[#1e293b]/70 p-4 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-800 font-mono text-[10px] font-bold">
                      {v.rule_code}
                    </span>
                    <span className="font-bold text-slate-200">{v.message}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {v.file_path} {v.line_number ? `(Line ${v.line_number})` : ''}
                  </span>
                </div>

                {v.evidence_snippet && (
                  <pre className="bg-[#0b1329] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
                    {v.evidence_snippet}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
