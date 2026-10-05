import React, { useState } from 'react';
import { CryptoAsset } from '../types';
import { Layers, ShieldAlert, Cpu, CheckSquare, AlertTriangle, ArrowRight, FileCheck } from 'lucide-react';

interface MigrationImpactViewProps {
  assets: CryptoAsset[];
  onSelectAsset: (asset: CryptoAsset) => void;
}

export const MigrationImpactView: React.FC<MigrationImpactViewProps> = ({ assets, onSelectAsset }) => {
  const quantumExposedAssets = assets.filter((a) => a.risk && ['CRITICAL', 'HIGH'].includes(a.risk.quantum_exposure));
  const [selectedAssetId, setSelectedAssetId] = useState<string>(
    quantumExposedAssets.length > 0 ? quantumExposedAssets[0].id : (assets[0]?.id || '')
  );

  const currentAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];
  const mig = currentAsset?.migration;
  const rec = currentAsset?.recommendation;

  return (
    <div className="space-y-6">
      
      {/* Target Asset Selector Header */}
      <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Cryptographic Migration Impact & Blast Radius Analysis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate the blast radius and architectural review items required to migrate a cryptographic primitive to Post-Quantum Cryptography.
          </p>
        </div>

        {/* Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold">Select Target Primitive:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="bg-[#090d16] text-white text-xs font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.asset_id}: {a.algorithm} ({a.key_size || 'N/A'}) - {a.application} [{a.purpose}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentAsset && (
        <div className="space-y-6">
          
          {/* Target Summary Banner */}
          <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Current Classical Primitive</div>
              <div className="text-lg font-black text-white mt-1">
                {currentAsset.algorithm} {currentAsset.key_size ? `(${currentAsset.key_size} bits)` : ''}
              </div>
              <div className="text-xs text-cyan-400 capitalize">{currentAsset.purpose.replace('_', ' ')}</div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">PQC Transition</span>
                <ArrowRight className="w-5 h-5 text-emerald-400 my-1" />
                <span className="text-[10px] text-emerald-400 font-semibold">NIST FIPS Validated</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Recommended PQC Target</div>
              <div className="text-lg font-black text-emerald-400 mt-1">
                {rec?.recommended_pqc || 'Under Review'}
              </div>
              <div className="text-xs text-slate-400 font-mono">{rec?.parameter_set || 'Standard'}</div>
            </div>

            <div className="bg-[#111827] p-3 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Migration Complexity</div>
              <div className="text-base font-black text-amber-400 mt-0.5">
                {mig?.migration_complexity || 'MEDIUM'}
              </div>
              <div className="text-[10px] text-slate-400">Estimated Effort</div>
            </div>
          </div>

          {/* Blast Radius Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 uppercase font-semibold">Affected Applications</div>
              <div className="text-3xl font-extrabold text-cyan-400 mt-2">{mig?.affected_applications || 1}</div>
              <div className="text-[11px] text-slate-400 mt-1">Upstream Services</div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 uppercase font-semibold">Affected Components</div>
              <div className="text-3xl font-extrabold text-blue-400 mt-2">{mig?.affected_components || 1}</div>
              <div className="text-[11px] text-slate-400 mt-1">Calling Code Modules</div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 uppercase font-semibold">Affected Libraries</div>
              <div className="text-3xl font-extrabold text-purple-400 mt-2">{mig?.affected_libraries || 1}</div>
              <div className="text-[11px] text-slate-400 mt-1">Package Dependencies</div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 uppercase font-semibold">Dependent Certificates</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">{mig?.affected_certificates || 0}</div>
              <div className="text-[11px] text-slate-400 mt-1">PKI Chains Requiring Update</div>
            </div>

          </div>

          {/* Detailed Impact Checklist */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Architectural Verification Checklist &amp; Blast Radius Detail</span>
            </h3>

            {mig?.blast_radius_summary && (
              <p className="text-xs text-slate-300 bg-[#090d16] p-3 rounded border border-slate-800">
                {mig.blast_radius_summary}
              </p>
            )}

            <div className="space-y-3 mt-3">
              {mig?.review_items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#090d16] p-4 rounded-lg border border-slate-800 text-xs flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{item.category}</span>
                      <span className="bg-amber-950/70 text-amber-300 border border-amber-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {item.status}
                      </span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                        Target: {item.component}
                      </span>
                    </div>
                    <div className="text-cyan-300 font-medium">{item.finding}</div>
                    <div className="text-slate-400 leading-relaxed">{item.action}</div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Priority</span>
                    <span className="font-bold text-red-400 font-mono">{item.validation_priority}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
