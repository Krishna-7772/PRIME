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
  FileText
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
      
      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Crypto</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{overview.total_crypto_assets}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Discovered Primitives</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-400 font-semibold uppercase">Quantum Exposed</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400 mt-2">{overview.quantum_exposed_assets}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Shor / SNDL Targets</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold uppercase">High / Critical</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {overview.critical_risk_assets + overview.high_risk_assets}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Actionable Priority</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Applications</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{overview.applications_affected}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Monitored Services</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Certificates</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{overview.certificates_count}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">X.509 PKI Assets</div>
        </div>

        <div className={`p-4 rounded-xl border ${isMoscaAtRisk ? 'bg-red-950/20 border-red-800/80' : 'bg-emerald-950/20 border-emerald-800/80'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`}>Mosca Equation</span>
            <Clock className={`w-4 h-4 ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`} />
          </div>
          <div className={`text-lg font-black mt-2 ${isMoscaAtRisk ? 'text-red-400' : 'text-emerald-400'}`}>
            {isMoscaAtRisk ? 'AT RISK' : 'MANAGEABLE'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            X + Y {isMoscaAtRisk ? '>' : '<='} Z
          </div>
        </div>

      </div>

      {/* Mosca Theorem Interactive Analysis Card */}
      <div className="bg-gradient-to-r from-[#0d1527] to-[#111827] border border-blue-900/40 p-5 rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Dr. Michele Mosca's Quantum Risk Formulation Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              If Data Shelf-Life (X) + Migration Time (Y) &gt; Quantum Horizon (Z), cryptographic assets are exposed before migration completes.
            </p>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${isMoscaAtRisk ? 'bg-red-950 text-red-300 border-red-700' : 'bg-emerald-950 text-emerald-300 border-emerald-700'}`}>
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
              max="10"
              step="0.5"
              value={migrationTime}
              onChange={(e) => setMigrationTime(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">Time to transition enterprise infrastructure to PQC</div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Quantum Horizon (Z)</span>
              <span className="font-mono text-purple-400 font-bold">{quantumHorizon} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={quantumHorizon}
              onChange={(e) => setQuantumHorizon(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">Configurable estimate for Cryptographically Relevant Quantum Computer (CRQC)</div>
          </div>

        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Distribution Bar Chart */}
        <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-4">Risk Distribution Profile</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskBarData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Algorithm Usage Donut Chart */}
        <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-4">Cryptographic Algorithm Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={algoPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {algoPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Migration Priorities Table */}
      <div className="bg-[#111827] border border-slate-800 p-5 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Top Post-Quantum Migration Priorities</h3>
            <p className="text-xs text-slate-400">Determined deterministically by Quantum Exposure, Mosca Window, and Business Criticality</p>
          </div>
          <button
            onClick={() => onNavigateToTab('inventory')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
          >
            <span>View All Inventory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090d16] text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Algorithm</th>
                <th className="py-2.5 px-3">Purpose</th>
                <th className="py-2.5 px-3">Application</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">FIPS 203/204/205 Target</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {overview.top_migration_priorities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500">
                    No active assets requiring immediate migration.
                  </td>
                </tr>
              ) : (
                overview.top_migration_priorities.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-3 font-mono text-cyan-400">{a.asset_id}</td>
                    <td className="py-2.5 px-3 font-bold text-white">
                      {a.algorithm} {a.key_size ? `(${a.key_size})` : ''}
                    </td>
                    <td className="py-2.5 px-3 capitalize">{a.purpose.replace('_', ' ')}</td>
                    <td className="py-2.5 px-3">{a.application}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-red-950/80 text-red-400 border border-red-700/60 font-mono px-2 py-0.5 rounded font-bold">
                        {a.risk?.risk_score || 0}/100
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-400">
                      {a.recommendation?.recommended_pqc || 'Review'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => onSelectAsset(a)}
                        className="bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded border border-slate-700 text-[11px]"
                      >
                        Inspect
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
