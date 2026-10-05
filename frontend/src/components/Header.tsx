import React from 'react';
import { Project } from '../types';
import { Shield, Plus, UploadCloud, FileJson, FileText, ChevronDown } from 'lucide-react';
import { getCBOMDownloadUrl, getReportDownloadUrl } from '../services/api';

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
  return (
    <header className="bg-[#0f172a] border-b border-[#1e293b] sticky top-0 z-40 px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Brand & PS Identity */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-2 rounded-lg shadow-md">
            <Shield className="w-6 h-6 text-white" />
            <span className="font-extrabold text-xl tracking-wider">ECDAT</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider flex items-center space-x-2">
              <span>Enterprise Cryptographic Discovery & Analysis Tool</span>
              <span className="bg-[#1e293b] text-slate-300 px-2 py-0.5 rounded text-[10px]">SIH26164</span>
              <span className="bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded text-[10px]">NTRO</span>
            </div>
            <div className="text-xs text-slate-400">
              National Technical Research Organisation &bull; Post-Quantum Cryptography Readiness
            </div>
          </div>
        </div>

        {/* Project Selector & Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Project Dropdown */}
          <div className="relative">
            <select
              aria-label="Active Monitored Project"
              value={activeProject?.id || ''}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className="bg-[#1e293b] text-slate-200 text-sm font-medium rounded-lg px-3 py-2 pr-8 border border-slate-700 hover:border-slate-500 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.business_criticality})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <button
            onClick={onOpenNewProject}
            className="flex items-center space-x-1.5 bg-[#1e293b] hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>New Project</span>
          </button>

          <button
            onClick={onOpenScan}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Scan Repository</span>
          </button>

          {activeProject && (
            <div className="flex items-center space-x-2 border-l border-slate-700 pl-3">
              <a
                href={getCBOMDownloadUrl(activeProject.id)}
                download
                className="flex items-center space-x-1 bg-[#1e293b] hover:bg-slate-700 text-emerald-400 text-xs font-medium px-2.5 py-2 rounded border border-emerald-900/50 transition"
                title="Download CycloneDX 1.6 Cryptographic Bill of Materials JSON"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>CBOM JSON</span>
              </a>

              <a
                href={getReportDownloadUrl(activeProject.id)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 bg-[#1e293b] hover:bg-slate-700 text-cyan-400 text-xs font-medium px-2.5 py-2 rounded border border-cyan-900/50 transition"
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
