import React from 'react';
import { CryptoAsset } from '../types';
import { X, ShieldAlert, Cpu, Code2, AlertTriangle, ArrowRight, Layers, FileCheck, Compass, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AssetDetailModalProps {
  asset: CryptoAsset | null;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  const risk = asset.risk;
  const rec = asset.recommendation;
  const mig = asset.migration;
  const agility = asset.agility;

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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b1329] border border-slate-700 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#101b38] px-6 py-3.5 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-950 text-cyan-300 font-mono text-xs px-2.5 py-1 rounded border border-blue-800">
              {asset.asset_id}
            </span>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{asset.algorithm}</span>
              {asset.key_size && <span className="text-slate-400 font-normal">({asset.key_size} bits)</span>}
            </h2>
            {getRiskBadge(risk?.overall_risk)}
            
            {/* Confidence Classification Badge */}
            <span className="bg-slate-800 text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
              {asset.confidence_classification || 'CONFIRMED'}
            </span>
            
            {/* Provenance Badge */}
            <span className="bg-indigo-950/80 text-indigo-300 font-mono text-[10px] px-2 py-0.5 rounded border border-indigo-800">
              {asset.provenance || 'OBSERVED'}
            </span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#101935] p-4 rounded-lg border border-slate-800">
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
              <div className="text-[10px] text-slate-400">{asset.library_version || 'Standard Platform'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Confidence &amp; Method</div>
              <div className="font-semibold text-emerald-400 mt-0.5">{(asset.confidence * 100).toFixed(0)}% Confidence</div>
              <div className="text-[10px] text-slate-400 truncate">{asset.detection_method}</div>
            </div>
          </div>

          {/* Section 2: Code Evidence */}
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold mb-2">
              <Code2 className="w-4 h-4" />
              <span>Traceable Code Evidence (Zero Fabrication)</span>
            </div>
            <div className="bg-[#060a17] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 mb-2 font-mono">
                <span className="text-slate-300">{asset.file_path}</span>
                {asset.line_number && <span className="text-cyan-400">Line: {asset.line_number}</span>}
              </div>
              <pre className="text-xs font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap p-2.5 bg-[#030610] rounded border border-slate-900">
                {asset.evidence?.code_snippet || '// Code context recorded by deterministic scanner'}
              </pre>
              {asset.evidence?.context_notes && (
                <div className="mt-2 text-xs text-slate-400 italic">
                  Note: {asset.evidence.context_notes}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Risk & Mosca Theorem Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#101935] border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-red-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Quantum Exposure Assessment</span>
              </div>
              <div className="text-xs text-slate-300">
                Exposure Classification:{' '}
                <span className="font-bold text-red-400 font-mono">{risk?.quantum_exposure || 'HIGH'}</span>
              </div>
              <div className="text-xs text-slate-300">
                Cryptographic Hygiene:{' '}
                <span className="font-bold text-emerald-400 font-mono">{risk?.hygiene_risk || 'CLEAN'}</span>
              </div>
              <div className="text-xs text-slate-400 pt-1">
                {risk?.explanation_markdown}
              </div>
            </div>

            <div className="bg-[#101935] border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Mosca Timing Formula (X + Y &gt; Z)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-[#070c1e] p-2 rounded">
                  <div className="text-slate-400 text-[10px]">Data Life (X)</div>
                  <div className="font-bold text-cyan-400 font-mono">{risk?.data_lifetime_years} yrs</div>
                </div>
                <div className="bg-[#070c1e] p-2 rounded">
                  <div className="text-slate-400 text-[10px]">Migration (Y)</div>
                  <div className="font-bold text-amber-400 font-mono">{risk?.migration_time_years} yrs</div>
                </div>
                <div className="bg-[#070c1e] p-2 rounded">
                  <div className="text-slate-400 text-[10px]">Threat (Z)</div>
                  <div className="font-bold text-purple-400 font-mono">{risk?.quantum_horizon_years} yrs</div>
                </div>
              </div>
              <div className="text-xs text-slate-400 pt-1 font-mono">
                Mosca Status:{' '}
                <span className={`font-bold ${risk?.mosca_status === 'AT_RISK' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {risk?.mosca_status}
                </span>
                {' '}(Margin: {risk?.mosca_margin_years ? `${risk.mosca_margin_years > 0 ? '+' : ''}${risk.mosca_margin_years.toFixed(1)} yrs` : '0.0 yrs'})
              </div>
            </div>
          </div>

          {/* Section 4: Cryptographic Agility Profile (7 Dimensions) */}
          {agility && (
            <div>
              <div className="flex items-center justify-between text-cyan-400 font-semibold mb-2">
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4" />
                  <span>Cryptographic Agility Profile (NIST CSWP 39upd1)</span>
                </div>
                <span className="font-mono text-xs text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  Agility Index: {agility.overall_agility_score} / 4.0 ({agility.agility_rating})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#101935] border border-slate-800 rounded-lg p-4 text-xs">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>C1: Operation Coupling</span>
                      <span className="font-mono text-cyan-400">{agility.c1_operation_coupling} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.c1_explanation}</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>C2: Creation Coupling</span>
                      <span className="font-mono text-cyan-400">{agility.c2_creation_coupling} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.c2_explanation}</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>C3: Provider Coupling</span>
                      <span className="font-mono text-cyan-400">{agility.c3_provider_coupling} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.c3_explanation}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>C4: Decoupling Mechanism</span>
                      <span className="font-mono text-cyan-400">{agility.c4_decoupling_mechanism} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.c4_explanation}</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>E1: Algorithm Migration</span>
                      <span className="font-mono text-cyan-400">{agility.e1_algorithm_migration} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.e1_explanation}</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold">
                      <span>E2: Provider Migration</span>
                      <span className="font-mono text-cyan-400">{agility.e2_provider_migration} / 4</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{agility.e2_explanation}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Purpose-Aware PQC Recommendation */}
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>NIST Purpose-Aware PQC Replacement</span>
            </div>
            <div className="bg-[#101935] border border-slate-800 rounded-lg p-4 space-y-3">
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

              <div className="text-xs text-slate-300 bg-[#060a17] p-3 rounded border border-slate-800">
                <strong>Migration Rationale:</strong> {rec?.rationale}
              </div>
            </div>
          </div>

          {/* Section 6: Explainability Panel (Section 30) */}
          <div className="bg-[#101935] border border-blue-900/50 rounded-lg p-4 space-y-2.5 text-xs">
            <div className="flex items-center space-x-2 text-cyan-300 font-semibold pb-1 border-b border-slate-800">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>PRIME Explainability &bull; Why Did PRIME Conclude This?</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <strong className="text-slate-200">Why is this a priority?</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Classical algorithm {asset.algorithm} lacks post-quantum security. If used to protect high-shelf-life confidential assets, adversaries can record ciphertext today and decrypt once quantum hardware arrives.
                </p>
              </div>
              <div>
                <strong className="text-slate-200">What could break?</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Migrating to {rec?.recommended_pqc} expands key/signature sizes by 5x-15x, which may require schema expansion in SQL columns and network packet buffers.
                </p>
              </div>
              <div>
                <strong className="text-slate-200">What should be tested?</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Run the <span className="text-cyan-400">Migration Validation Lab</span> benchmark to verify real execution latency, signature generation throughput, and wire protocol compatibility.
                </p>
              </div>
              <div>
                <strong className="text-slate-200">Recommended Next Step:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Wrap cryptographic invocation in an agile service provider facade and deploy hybrid classical + PQC key encapsulation where applicable.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#101b38] px-6 py-3 border-t border-slate-700/80 flex justify-end">
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
