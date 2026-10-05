import React from 'react';
import { Project } from '../types';
import { Shield, Plus, UploadCloud, FileJson, FileText, ChevronDown, Download, Radio } from 'lucide-react';
import { getCBOMDownloadUrl, getReportDownloadUrl, getSARIFDownloadUrl } from '../services/api';

interface HeaderProps {
  projects: Project[];
  activeProject: Project | null;
  onSelectProject: (project: Project) => void;
  onOpenNewProject: () => void;
  onOpenScan: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenNewProject,
  onOpenScan
}) => {
  const isDemoProject = activeProject?.name.toLowerCase().includes('demo') || activeProject?.name.toLowerCase().includes('bharatpay');

  return (
    <header className="bg-[#0b1329] border-b border-[#1e293b] sticky top-0 z-40 px-6 py-2.5">
      <div className="flex items-center justify-between">
        
        {/* Brand & PS Identity */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white px-3 py-1.5 rounded-lg shadow-md border border-cyan-500/30">
            <Shield className="w-5 h-5 text-cyan-300" />
            <span className="font-extrabold text-xl tracking-wider">PRIME</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider flex items-center space-x-2">
              <span>Postquantum Readiness Intelligence & Migration Engine</span>
              <span className="bg-[#1e293b] text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">SIH26164</span>
              <span className="bg-blue-950 text-blue-200 px-2 py-0.5 rounded text-[10px] border border-blue-800">NTRO</span>
              <span className="bg-slate-800 text-cyan-300 px-2 py-0.5 rounded text-[10px] border border-slate-700 font-mono">TEAM PRAYAS</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
              <span>Evidence-driven cryptographic intelligence for post-quantum migration readiness</span>
              <span className="text-slate-600">&bull;</span>
              <span className="inline-flex items-center text-emerald-400 text-[10px] font-mono bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                LOCAL / AIR-GAPPED
              </span>
            </div>
          </div>
        </div>

        {/* Project Selector & Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Demo Mode Banner (Section 37, 40) */}
          {isDemoProject && (
            <div className="hidden lg:flex items-center space-x-1.5 bg-amber-950/60 border border-amber-600/40 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>DEMO MODE — SYNTHETIC DATA</span>
            </div>
          )}

          {/* Project Dropdown */}
          <div className="relative">
            <select
              aria-label="Active Monitored Project"
              value={activeProject?.id || ''}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className="bg-[#131d36] text-slate-200 text-xs font-medium rounded-lg px-3 py-2 pr-8 border border-slate-700 hover:border-slate-500 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.business_criticality})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={onOpenNewProject}
            className="flex items-center space-x-1.5 bg-[#131d36] hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>New Project</span>
          </button>

          <button
            onClick={onOpenScan}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Scan Repository</span>
          </button>

          {activeProject && (
            <div className="flex items-center space-x-1.5 border-l border-slate-700 pl-2.5">
              <a
                href={getCBOMDownloadUrl(activeProject.id)}
                download
                className="flex items-center space-x-1 bg-[#131d36] hover:bg-slate-700 text-emerald-400 text-xs font-medium px-2 py-1.5 rounded border border-emerald-900/50 transition"
                title="Download CycloneDX 1.7 Cryptographic Bill of Materials JSON"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>CBOM 1.7</span>
              </a>

              <a
                href={getSARIFDownloadUrl(activeProject.id)}
                download
                className="flex items-center space-x-1 bg-[#131d36] hover:bg-slate-700 text-purple-400 text-xs font-medium px-2 py-1.5 rounded border border-purple-900/50 transition"
                title="Download SARIF 2.1.0 Static Analysis Report for CI/CD"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SARIF 2.1</span>
              </a>

              <a
                href={getReportDownloadUrl(activeProject.id)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 bg-[#131d36] hover:bg-slate-700 text-cyan-400 text-xs font-medium px-2.5 py-1.5 rounded border border-cyan-900/50 transition"
                title="View Executive Cryptographic Audit & PQC Report"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Report</span>
              </a>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
