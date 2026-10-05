import React, { useState, useMemo } from 'react';
import { CryptoAsset } from '../types';
import { Search, Filter, ShieldAlert, Cpu, Eye, ExternalLink } from 'lucide-react';

interface InventoryViewProps {
  assets: CryptoAsset[];
  onSelectAsset: (asset: CryptoAsset) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ assets, onSelectAsset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [quantumFilter, setQuantumFilter] = useState('ALL');

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchesSearch =
        a.algorithm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.asset_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.file_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.library && a.library.toLowerCase().includes(searchTerm.toLowerCase())) ||
        a.application.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPurpose = purposeFilter === 'ALL' || a.purpose === purposeFilter;
      const matchesRisk = riskFilter === 'ALL' || (a.risk && a.risk.overall_risk === riskFilter);
      const matchesQuantum =
        quantumFilter === 'ALL' ||
        (quantumFilter === 'EXPOSED' && a.risk && ['CRITICAL', 'HIGH'].includes(a.risk.quantum_exposure)) ||
        (quantumFilter === 'SAFE' && a.risk && ['LOW', 'NONE'].includes(a.risk.quantum_exposure));

      return matchesSearch && matchesPurpose && matchesRisk && matchesQuantum;
    });
  }, [assets, searchTerm, purposeFilter, riskFilter, quantumFilter]);

  const getRiskBadge = (risk?: string) => {
    switch (risk) {
      case 'CRITICAL':
        return <span className="bg-red-950/80 text-red-400 border border-red-700/60 text-[11px] font-bold px-2 py-0.5 rounded">CRITICAL</span>;
      case 'HIGH':
        return <span className="bg-amber-950/80 text-amber-400 border border-amber-700/60 text-[11px] font-bold px-2 py-0.5 rounded">HIGH</span>;
      case 'MEDIUM':
        return <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-700/60 text-[11px] font-bold px-2 py-0.5 rounded">MEDIUM</span>;
      default:
        return <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 text-[11px] font-bold px-2 py-0.5 rounded">LOW</span>;
    }
  };

  const getQuantumBadge = (quantum?: string) => {
    if (quantum === 'CRITICAL') {
      return <span className="bg-purple-950/80 text-purple-300 border border-purple-700/60 text-[10px] font-bold px-1.5 py-0.5 rounded">SNDL EXPOSED</span>;
    } else if (quantum === 'HIGH') {
      return <span className="bg-pink-950/80 text-pink-300 border border-pink-700/60 text-[10px] font-bold px-1.5 py-0.5 rounded">SHOR VULNERABLE</span>;
    } else if (quantum === 'MEDIUM') {
      return <span className="bg-blue-950/80 text-blue-300 border border-blue-700/60 text-[10px] font-semibold px-1.5 py-0.5 rounded">GROVER REDUCED</span>;
    }
    return <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded">PQC RESISTANT</span>;
  };

  return (
    <div className="space-y-4">
      
      {/* Control / Filter Bar */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by algorithm, asset ID, file, application, or library..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090d16] text-white text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 placeholder-slate-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center space-x-2 text-xs">
          
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="bg-[#090d16] text-slate-300 border border-slate-700 rounded-lg px-2.5 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Purposes</option>
            <option value="digital_signature">Digital Signature</option>
            <option value="key_establishment">Key Establishment</option>
            <option value="encryption">Encryption</option>
            <option value="hashing">Hashing</option>
            <option value="certificate">Certificate</option>
            <option value="password_hashing">Password Hashing</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#090d16] text-slate-300 border border-slate-700 rounded-lg px-2.5 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>

          <select
            value={quantumFilter}
            onChange={(e) => setQuantumFilter(e.target.value)}
            className="bg-[#090d16] text-slate-300 border border-slate-700 rounded-lg px-2.5 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Quantum Postures</option>
            <option value="EXPOSED">Quantum Exposed (Shor / SNDL)</option>
            <option value="SAFE">Quantum Resistant (AES-256 / SHA-256)</option>
          </select>

          <div className="text-slate-500 text-xs px-2 border-l border-slate-800">
            Found: <strong className="text-cyan-400">{filteredAssets.length}</strong> / {assets.length}
          </div>

        </div>

      </div>

      {/* Asset Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090d16] text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800 tracking-wider">
              <tr>
                <th className="py-3 px-4">Asset ID</th>
                <th className="py-3 px-4">Algorithm & Parameters</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Application / Component</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Quantum Exposure</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">NIST PQC Target</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    No cryptographic findings match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-800/40 transition cursor-pointer"
                    onClick={() => onSelectAsset(asset)}
                  >
                    <td className="py-3 px-4 font-mono font-medium text-cyan-400">
                      {asset.asset_id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-white flex items-center space-x-1.5">
                        <span>{asset.algorithm}</span>
                        {asset.key_size && (
                          <span className="text-[10px] text-slate-400 font-mono">({asset.key_size})</span>
                        )}
                        {asset.curve && (
                          <span className="text-[10px] text-cyan-400 font-mono">[{asset.curve}]</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {asset.library || 'Native API'}
                      </div>
                    </td>

                    <td className="py-3 px-4 capitalize">
                      <span className="bg-[#090d16] px-2 py-0.5 rounded text-[11px] border border-slate-800 text-slate-300">
                        {asset.purpose.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200 truncate max-w-[140px]">{asset.application}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{asset.component}</div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      <div className="truncate max-w-[180px]" title={asset.file_path}>
                        {asset.file_path}
                      </div>
                      {asset.line_number && (
                        <div className="text-[10px] text-cyan-400">Line: {asset.line_number}</div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {getQuantumBadge(asset.risk?.quantum_exposure)}
                    </td>

                    <td className="py-3 px-4">
                      {getRiskBadge(asset.risk?.overall_risk)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-emerald-400 truncate max-w-[170px]" title={asset.recommendation?.recommended_pqc}>
                        {asset.recommendation?.recommended_pqc || 'Under Review'}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {asset.recommendation?.parameter_set || 'Default'}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAsset(asset);
                        }}
                        className="inline-flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs px-2.5 py-1 rounded transition border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
