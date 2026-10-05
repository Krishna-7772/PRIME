import React from 'react';
import { CryptoAsset } from '../types';
import { X, ShieldAlert, Cpu, Code2, AlertTriangle, ArrowRight, Layers, FileCheck } from 'lucide-react';

interface AssetDetailModalProps {
  asset: CryptoAsset | null;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  const risk = asset.risk;
  const rec = asset.recommendation;
  const mig = asset.migration;

  const getRiskBadge = (level?: string) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="bg-red-950/80 text-red-400 border border-red-700/60 text-xs px-2.5 py-1 rounded-full font-bold">CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="bg-amber-950/80 text-amber-400 border border-amber-700/60 text-xs px-2.5 py-1 rounded-full font-bold">HIGH RISK</span>;
      case 'MEDIUM':
        return <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-700/60 text-xs px-2.5 py-1 rounded-full font-bold">MEDIUM RISK</span>;
      default:
        return <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 text-xs px-2.5 py-1 rounded-full font-bold">LOW RISK</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#1e293b] px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-900/60 text-cyan-300 font-mono text-xs px-2.5 py-1 rounded border border-blue-700">
              {asset.asset_id}
            </span>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{asset.algorithm}</span>
              {asset.key_size && <span className="text-slate-400 font-normal">({asset.key_size} bits)</span>}
            </h2>
            {getRiskBadge(risk?.overall_risk)}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Section 1: Overview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111827] p-4 rounded-lg border border-slate-800">
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Purpose</div>
              <div className="font-semibold text-white capitalize mt-0.5">{asset.purpose.replace('_', ' ')}</div>
              <div className="text-[10px] text-cyan-400">Status: {asset.purpose_confidence}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Application / Module</div>
              <div className="font-semibold text-white truncate mt-0.5">{asset.application}</div>
              <div className="text-[10px] text-slate-400 truncate">{asset.component}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Cryptographic Library</div>
              <div className="font-semibold text-white mt-0.5">{asset.library || 'Native / Built-in'}</div>
              <div className="text-[10px] text-slate-400">{asset.library_version || 'vStandard'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Confidence & Method</div>
              <div className="font-semibold text-emerald-400 mt-0.5">{(asset.confidence * 100).toFixed(0)}% Confidence</div>
              <div className="text-[10px] text-slate-400 truncate">{asset.detection_method}</div>
            </div>
          </div>

          {/* Section 2: Code Evidence */}
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold mb-2">
              <Code2 className="w-4 h-4" />
              <span>Traceable Code Evidence</span>
            </div>
            <div className="bg-[#090d16] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 mb-2 font-mono">
                <span>{asset.file_path}</span>
                {asset.line_number && <span className="text-cyan-400">Line: {asset.line_number}</span>}
              </div>
              <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap p-2 bg-[#050811] rounded border border-slate-900">
                {asset.evidence?.code_snippet || '// Code context recorded by deterministic scanner'}
              </pre>
              {asset.evidence?.context_notes && (
                <div className="mt-2 text-xs text-slate-400 italic">
                  Note: {asset.evidence.context_notes}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Quantum Risk & Mosca Theorem */}
          <div>
            <div className="flex items-center space-x-2 text-red-400 font-semibold mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Quantum Risk Assessment & Mosca Formulation</span>
            </div>
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-4 space-y-3">
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#090d16] p-3 rounded border border-slate-800">
                  <div className="text-xs text-slate-500">Quantum Threat Mechanism</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {risk?.quantum_exposure === 'CRITICAL' ? 'Store-Now-Decrypt-Later (SNDL)' : 
                     risk?.quantum_exposure === 'HIGH' ? "Shor's Algorithm (Signature Forgery)" : 
                     "Grover's Search (Halved Margin)"}
                  </div>
                </div>

                <div className="bg-[#090d16] p-3 rounded border border-slate-800">
                  <div className="text-xs text-slate-500">Mosca Theorem Status</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {risk?.mosca_status === 'AT_RISK' ? (
                      <span className="text-red-400">AT RISK (X + Y &gt; Z)</span>
                    ) : (
                      <span className="text-emerald-400">MANAGEABLE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Margin: {risk?.mosca_margin_years ? (risk.mosca_margin_years > 0 ? `+${risk.mosca_margin_years}` : risk.mosca_margin_years) : 0} years
                  </div>
                </div>

                <div className="bg-[#090d16] p-3 rounded border border-slate-800">
                  <div className="text-xs text-slate-500">Calculated Risk Score</div>
                  <div className="text-sm font-bold text-cyan-400 mt-1">
                    {risk?.risk_score || 0} / 100
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Hygiene: {risk?.hygiene_risk || 'CLEAN'}
                  </div>
                </div>
              </div>

              {risk?.explanation_markdown && (
                <div className="text-xs text-slate-300 leading-relaxed bg-[#090d16] p-3 rounded border border-slate-800 whitespace-pre-line">
                  {risk.explanation_markdown}
                </div>
              )}

            </div>
          </div>

          {/* Section 4: Purpose-Aware PQC Recommendation */}
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>NIST Purpose-Aware PQC Recommendation</span>
            </div>
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Target Standard</div>
                  <div className="text-base font-bold text-white">{rec?.recommended_pqc}</div>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">Parameter Set: {rec?.parameter_set || 'Standard Profile'}</div>
                </div>
                {rec?.alternative_pqc && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Conservative Alternative</div>
                    <div className="text-sm font-medium text-slate-300">{rec.alternative_pqc}</div>
                    <div className="text-xs text-slate-400 font-mono">{rec.alternative_parameter_set}</div>
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-300 bg-[#090d16] p-3 rounded border border-slate-800">
                <strong>Migration Rationale:</strong> {rec?.rationale}
              </div>

              {rec?.tradeoffs_json && (
                <div className="text-xs text-slate-400 bg-blue-950/20 p-2.5 rounded border border-blue-900/40">
                  <strong className="text-blue-300">Technical Consideration:</strong>{' '}
                  {JSON.stringify(rec.tradeoffs_json)}
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Migration Impact / Blast Radius */}
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-semibold mb-2">
              <Layers className="w-4 h-4" />
              <span>Migration Impact & Blast Radius</span>
            </div>
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-[#090d16] p-2 rounded">
                  <div className="text-lg font-bold text-cyan-400">{mig?.affected_applications || 1}</div>
                  <div className="text-slate-500">Applications</div>
                </div>
                <div className="bg-[#090d16] p-2 rounded">
                  <div className="text-lg font-bold text-cyan-400">{mig?.affected_components || 1}</div>
                  <div className="text-slate-500">Components</div>
                </div>
                <div className="bg-[#090d16] p-2 rounded">
                  <div className="text-lg font-bold text-cyan-400">{mig?.affected_libraries || 1}</div>
                  <div className="text-slate-500">Libraries</div>
                </div>
                <div className="bg-[#090d16] p-2 rounded">
                  <div className="text-lg font-bold text-amber-400">{mig?.migration_complexity || 'MEDIUM'}</div>
                  <div className="text-slate-500">Complexity</div>
                </div>
              </div>

              {mig?.review_items && mig.review_items.length > 0 && (
                <div className="space-y-2 mt-2">
                  <div className="text-xs font-semibold text-slate-400">Actionable Architectural Review Items:</div>
                  {mig.review_items.map((item, idx) => (
                    <div key={idx} className="bg-[#090d16] p-2.5 rounded border border-slate-800 text-xs flex items-start space-x-2">
                      <FileCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{item.category}</span>
                          <span className="bg-amber-950/60 text-amber-300 px-1.5 py-0.5 rounded text-[10px] border border-amber-800">
                            {item.status}
                          </span>
                        </div>
                        <div className="text-slate-400 mt-1">{item.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#1e293b] px-6 py-3 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
