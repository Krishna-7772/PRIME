import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { fetchProjectAgility } from '../services/api';
import { Compass, ShieldCheck, AlertTriangle, Layers, Award } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface AgilityRadarViewProps {
  activeProject: Project | null;
}

export const AgilityRadarView: React.FC<AgilityRadarViewProps> = ({ activeProject }) => {
  const [agilityData, setAgilityData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetchProjectAgility(activeProject.id)
      .then((data) => setAgilityData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activeProject?.id]);

  if (!activeProject) {
    return <div className="text-slate-400 text-xs">Please select a project.</div>;
  }

  const radarData = agilityData?.radar_data || [];
  const score = agilityData?.average_score || 0;
  const rating = agilityData?.rating || 'MODERATE';

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">Cryptographic Agility Assessment</h2>
              <span className="bg-blue-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-800">
                NIST CSWP 39upd1 / Rameshan &amp; Messmer (2026)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Evaluates application-level readiness to swap, upgrade, and configure cryptographic primitives across 5 internal coupling dimensions (C1–C5) and 2 migration capability dimensions (E1–E2).
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#1e293b] px-4 py-2.5 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Overall Agility Index</div>
              <div className="text-xl font-bold text-white font-mono">{score.toFixed(2)} <span className="text-xs text-slate-400">/ 4.00</span></div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded border font-mono ${
              rating === 'EXCELLENT' || rating === 'HIGH' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
              rating === 'MODERATE' ? 'bg-blue-950 text-cyan-400 border-blue-800' :
              'bg-amber-950 text-amber-400 border-amber-800'
            }`}>
              {rating} AGILITY
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Radar Chart + 7 Dimensions Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart Card */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">7-Dimension Cryptographic Agility Profile</h3>
            <span className="text-[11px] text-slate-400 font-mono">0.0 (Tightly Coupled) &rarr; 4.0 (Agile)</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 4]} tick={{ fill: '#64748b', fontSize: 9 }} />
                <Radar name="Agility Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-start space-x-2">
            <Award className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <span>
              Higher scores denote systems capable of seamless PQC algorithm negotiation and drop-in provider replacement without requiring code rewrites or service downtime.
            </span>
          </div>
        </div>

        {/* Detailed Dimension Explanations */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-white text-sm pb-3 border-b border-slate-800">Coupling &amp; Capability Dimensions</h3>
          
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {radarData.map((d: any, idx: number) => (
              <div key={idx} className="bg-[#1e293b]/70 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{d.dimension}</span>
                  <span className="font-mono font-bold text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    {d.score} / 4.0
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                    style={{ width: `${(d.score / 4.0) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
