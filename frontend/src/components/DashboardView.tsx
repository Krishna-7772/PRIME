import React, { useState } from 'react';
import { DashboardOverview, CryptoAsset, Project } from '../types';
import {
  ShieldAlert,
  Cpu,
  Layers,
  Award,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Sliders,
  CheckCircle,
  FileText,
  Compass,
  FileCheck,
  ShieldCheck,
  Percent
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface DashboardViewProps {
  overview: DashboardOverview;
  activeProject: Project;
  onSelectAsset: (asset: CryptoAsset) => void;
  onNavigateToTab: (tab: string) => void;
}

const RISK_COLORS: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f59e0b',
  MEDIUM: '#38bdf8',
  LOW: '#10b981'
};

const PIE_COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb923c', '#4ade80', '#94a3b8'];

export const DashboardView: React.FC<DashboardViewProps> = ({
  overview,
  activeProject,
  onSelectAsset,
  onNavigateToTab
}) => {
  // Interactive Mosca Simulation sliders
  const [dataLifetime, setDataLifetime] = useState<number>(activeProject.data_lifetime_years || 10.0);
  const [migrationTime, setMigrationTime] = useState<number>(activeProject.migration_time_years || 3.0);
  const [quantumHorizon, setQuantumHorizon] = useState<number>(activeProject.quantum_horizon_years || 10.0);

  const moscaExposureSum = dataLifetime + migrationTime;
  const isMoscaAtRisk = moscaExposureSum > quantumHorizon;
  const moscaMargin = moscaExposureSum - quantumHorizon;

  // Chart data
  const riskBarData = [
    { name: 'Critical', count: overview.risk_distribution['CRITICAL'] || 0, fill: RISK_COLORS.CRITICAL },
    { name: 'High', count: overview.risk_distribution['HIGH'] || 0, fill: RISK_COLORS.HIGH },
    { name: 'Medium', count: overview.risk_distribution['MEDIUM'] || 0, fill: RISK_COLORS.MEDIUM },
    { name: 'Low', count: overview.risk_distribution['LOW'] || 0, fill: RISK_COLORS.LOW }
  ];

  const algoPieData = Object.entries(overview.algorithm_distribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      
      {/* 8-Card Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        
        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Crypto</span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-black text-white mt-1.5">{overview.total_crypto_assets}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Discovered Assets</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-red-400 font-semibold uppercase">Quantum Vulnerable</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-xl font-black text-red-400 mt-1.5">{overview.quantum_exposed_assets}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Shor / HNDL Target</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-400 font-semibold uppercase">High / Critical</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400 mt-1.5">
            {overview.critical_risk_assets + overview.high_risk_assets}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Actionable Risk</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-400 font-semibold uppercase">Crypto Agility</span>
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-black text-cyan-300 font-mono mt-1.5">{overview.average_agility_score?.toFixed(1) || '2.0'} <span className="text-xs text-slate-500">/4</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">NIST CSWP 39</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-semibold uppercase">Coverage</span>
            <Percent className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1.5">{overview.coverage_percentage?.toFixed(0) || '100'}%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Assessed Files</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-purple-400 font-semibold uppercase">Policy Violations</span>
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-300 font-mono mt-1.5">{overview.policy_violations_count || 0}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Baseline Deviations</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Applications</span>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-black text-white mt-1.5">{overview.applications_affected}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">FinTech Services</div>
        </div>

        <div className={`p-3.5 rounded-xl border ${isMoscaAtRisk ? 'bg-red-950/20 border-red-800/80' : 'bg-emerald-950/20 border-emerald-800/80'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-semibold uppercase ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`}>Mosca X+Y&gt;Z</span>
            <Clock className={`w-3.5 h-3.5 ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`} />
          </div>
          <div className={`text-base font-black mt-1.5 ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`}>
            {isMoscaAtRisk ? 'AT RISK' : 'SECURE'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {moscaMargin > 0 ? `+${moscaMargin.toFixed(0)}y gap` : `${Math.abs(moscaMargin).toFixed(0)}y buffer`}
          </div>
        </div>

      </div>

      {/* Mosca Theorem Interactive Analysis Card */}
      <div className="bg-gradient-to-r from-[#0d1527] to-[#111827] border border-blue-900/40 p-5 rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Dr. Michele Mosca's Theorem Risk Formulation Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              If Data Shelf-Life (X) + Migration Time (Y) &gt; Quantum Horizon (Z), confidential data is exposed to Harvest Now, Decrypt Later (HNDL).
            </p>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-lg border font-mono ${isMoscaAtRisk ? 'bg-red-950 text-red-300 border-red-700' : 'bg-emerald-950 text-emerald-300 border-emerald-700'}`}>
            {isMoscaAtRisk ? `Vulnerability Window: +${moscaMargin.toFixed(1)} Years` : `Safety Buffer: ${Math.abs(moscaMargin).toFixed(1)} Years`}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Data Lifetime (X)</span>
              <span className="font-mono text-cyan-400 font-bold">{dataLifetime} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={dataLifetime}
              onChange={(e) => setDataLifetime(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">Duration data must remain confidential</div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Migration Duration (Y)</span>
              <span className="font-mono text-amber-400 font-bold">{migrationTime} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={migrationTime}
              onChange={(e) => setMigrationTime(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">Engineering &amp; compliance replacement timeline</div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Quantum Threat Horizon (Z)</span>
              <span className="font-mono text-purple-400 font-bold">{quantumHorizon} Years</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={quantumHorizon}
              onChange={(e) => setQuantumHorizon(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">Time until Cryptanalytically Relevant Quantum Computer</div>
          </div>

        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Breakdown Bar Chart */}
        <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-sm">Deterministic Risk Distribution</h3>
            <span className="text-xs text-slate-400 font-mono">By Asset Severity</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskBarData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {riskBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Algorithm Distribution Pie Chart */}
        <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-sm">Cryptographic Algorithm Breakdown</h3>
            <span className="text-xs text-slate-400 font-mono">Discovered Families</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={algoPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {algoPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Priority Migration Findings Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">Top Post-Quantum Migration Priorities</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ranked by risk score, quantum exposure, and business criticality</p>
          </div>
          <button
            onClick={() => onNavigateToTab('inventory')}
            className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>View Full Inventory</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1329] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Asset ID</th>
                <th className="px-4 py-3">Algorithm</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Application</th>
                <th className="px-4 py-3">Risk Level</th>
                <th className="px-4 py-3">Quantum Status</th>
                <th className="px-4 py-3">Recommended PQC</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {overview.top_migration_priorities.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="px-4 py-3 font-mono text-cyan-400 font-semibold">{asset.asset_id}</td>
                  <td className="px-4 py-3 font-bold text-white">
                    {asset.algorithm} {asset.key_size ? `(${asset.key_size}b)` : ''}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-300">{asset.purpose.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-slate-300">{asset.application}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: `${RISK_COLORS[asset.risk?.overall_risk || 'LOW']}20`,
                        color: RISK_COLORS[asset.risk?.overall_risk || 'LOW'],
                        border: `1px solid ${RISK_COLORS[asset.risk?.overall_risk || 'LOW']}50`
                      }}
                    >
                      {asset.risk?.overall_risk || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[10px] text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-900/50">
                      {asset.quantum_status || 'VULNERABLE'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-cyan-300">
                    {asset.recommendation?.recommended_pqc || 'Review Needed'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAsset(asset);
                      }}
                      className="text-xs text-blue-400 hover:text-cyan-300 font-medium underline"
                    >
                      Inspect Evidence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
