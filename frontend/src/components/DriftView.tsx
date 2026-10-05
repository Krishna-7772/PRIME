import React, { useEffect, useState } from 'react';
import { Project, DriftSnapshot } from '../types';
import { fetchProjectDrift } from '../services/api';
import { GitCompare, PlusCircle, MinusCircle, AlertCircle, RefreshCw, Calendar, ArrowRight } from 'lucide-react';

interface DriftViewProps {
  activeProject: Project | null;
}

export const DriftView: React.FC<DriftViewProps> = ({ activeProject }) => {
  const [snapshots, setSnapshots] = useState<DriftSnapshot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetchProjectDrift(activeProject.id)
      .then((data) => setSnapshots(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activeProject?.id]);

  if (!activeProject) {
    return <div className="text-slate-400 text-xs">Please select a project.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2">
          <GitCompare className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">Cryptographic Drift &amp; Temporal Posture</h2>
          <span className="bg-purple-950 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-800">
            CONTINUOUS CRYPTOGRAPHIC OBSERVABILITY
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Tracks changes in cryptographic posture between successive scans (Scan N vs Scan N-1). Detects new primitives, removed algorithms, key size alterations, and certificate drift.
        </p>
      </div>

      {/* Snapshots List */}
      {snapshots.length > 0 ? (
        <div className="space-y-4">
          {snapshots.map((snap) => (
            <div key={snap.id} className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">Snapshot: {new Date(snap.created_at).toLocaleString()}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="font-mono text-[11px] text-slate-400">Scan: {snap.scan_id.slice(0, 8)}</span>
                  {snap.previous_scan_id && (
                    <>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono text-[11px] text-slate-400">vs {snap.previous_scan_id.slice(0, 8)}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/60">
                    +{snap.new_assets_count} New
                  </span>
                  <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    -{snap.removed_assets_count} Removed
                  </span>
                  <span className="bg-blue-950 text-cyan-400 px-2 py-0.5 rounded border border-blue-900/60">
                    {snap.modified_assets_count} Modified
                  </span>
                </div>
              </div>

              {/* Event Cards */}
              <div className="space-y-2">
                {snap.events.map((ev) => (
                  <div key={ev.id} className="bg-[#1e293b]/70 p-3 rounded-lg border border-slate-800 flex items-start justify-between text-xs gap-3">
                    <div className="flex items-start space-x-2.5">
                      {ev.event_type === 'NEW_CRYPTO' && <PlusCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
                      {ev.event_type === 'REMOVED_CRYPTO' && <MinusCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />}
                      {ev.event_type === 'CHANGED_ALGORITHM' && <RefreshCw className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                      {ev.event_type === 'COVERAGE_CHANGE' && <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />}

                      <div>
                        <div className="font-bold text-slate-200">{ev.description}</div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5">{ev.asset_identifier}</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase shrink-0 ${
                      ev.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border-red-900' :
                      ev.severity === 'WARNING' ? 'bg-amber-950 text-amber-400 border-amber-900' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {ev.event_type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-400 text-xs">
          No temporal drift recorded yet. Trigger a second scan of this project repository to observe cryptographic drift across scans.
        </div>
      )}

    </div>
  );
};
