import React, { useState, useEffect } from 'react';
import { Project, CryptoAsset, DependencyGraph, DashboardOverview, Scan } from './types';
import {
  fetchProjects,
  fetchAssets,
  fetchDependencies,
  fetchDashboard
} from './services/api';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { InventoryView } from './components/InventoryView';
import { DependencyMapView } from './components/DependencyMapView';
import { MigrationImpactView } from './components/MigrationImpactView';
import { AssetDetailModal } from './components/AssetDetailModal';
import { ScanModal } from './components/ScanModal';
import { NewProjectModal } from './components/NewProjectModal';
import {
  LayoutDashboard,
  Database,
  GitFork,
  Layers,
  Loader2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'inventory' | 'dependencies' | 'migration'>('dashboard');

  const [dashboardData, setDashboardData] = useState<DashboardOverview | null>(null);
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [dependencyGraph, setDependencyGraph] = useState<DependencyGraph>({ nodes: [], edges: [] });

  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial projects
  useEffect(() => {
    loadProjects();
  }, []);

  // When active project changes, load its data
  useEffect(() => {
    if (activeProject) {
      loadProjectData(activeProject.id);
    }
  }, [activeProject]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const projs = await fetchProjects();
      setProjects(projs);
      if (projs.length > 0) {
        setActiveProject(projs[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to ECDAT backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjectData = async (projectId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const [dash, assetList, deps] = await Promise.all([
        fetchDashboard(projectId),
        fetchAssets(projectId),
        fetchDependencies(projectId)
      ]);
      setDashboardData(dash);
      setAssets(assetList);
      setDependencyGraph(deps);
    } catch (err: any) {
      setError(err.message || 'Failed to load project details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanComplete = (_: Scan) => {
    if (activeProject) {
      loadProjectData(activeProject.id);
    }
  };

  const handleProjectCreated = (newProj: Project) => {
    setProjects([newProj, ...projects]);
    setActiveProject(newProj);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={(p) => setActiveProject(p)}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onOpenScan={() => setIsScanModalOpen(true)}
      />

      {/* Navigation Sub-header / Tabs */}
      <div className="bg-[#0f172a] border-b border-[#1e293b] px-6 py-2 flex items-center justify-between">
        <nav className="flex space-x-1" aria-label="Tabs">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              currentTab === 'dashboard'
                ? 'bg-blue-900/50 text-cyan-400 border border-blue-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview &amp; Mosca Risk</span>
          </button>

          <button
            onClick={() => setCurrentTab('inventory')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              currentTab === 'inventory'
                ? 'bg-blue-900/50 text-cyan-400 border border-blue-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cryptographic Inventory ({assets.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('dependencies')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              currentTab === 'dependencies'
                ? 'bg-blue-900/50 text-cyan-400 border border-blue-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>Dependency Map</span>
          </button>

          <button
            onClick={() => setCurrentTab('migration')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              currentTab === 'migration'
                ? 'bg-blue-900/50 text-cyan-400 border border-blue-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Migration Impact &amp; Blast Radius</span>
          </button>
        </nav>

        {activeProject && (
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span>Org: <strong className="text-slate-200">{activeProject.organization}</strong></span>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={() => loadProjectData(activeProject.id)}
              className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition"
              title="Refresh project telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {isLoading && !dashboardData ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <div className="text-sm font-semibold text-slate-400">Loading cryptographic telemetry from ECDAT engine...</div>
          </div>
        ) : error ? (
          <div className="bg-red-950/40 border border-red-800 p-6 rounded-xl flex items-center space-x-3 text-sm text-red-300">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <div className="font-bold text-red-200">ECDAT Connection Warning</div>
              <div className="text-xs text-red-400 mt-1">{error}</div>
            </div>
          </div>
        ) : !activeProject ? (
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-12 text-center space-y-3">
            <div className="text-lg font-bold text-white">No Monitored Projects Initialized</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Create an enterprise project or launch a discovery scan to begin inventorying cryptographic assets.
            </p>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Create Project
            </button>
          </div>
        ) : (
          <>
            {currentTab === 'dashboard' && dashboardData && (
              <DashboardView
                overview={dashboardData}
                activeProject={activeProject}
                onSelectAsset={(a) => setSelectedAsset(a)}
                onNavigateToTab={(tab) => setCurrentTab(tab as any)}
              />
            )}

            {currentTab === 'inventory' && (
              <InventoryView
                assets={assets}
                onSelectAsset={(a) => setSelectedAsset(a)}
              />
            )}

            {currentTab === 'dependencies' && (
              <DependencyMapView
                graph={dependencyGraph}
                onSelectNode={(nodeId) => {
                  const match = assets.find((a) => a.asset_id === nodeId || a.algorithm === nodeId);
                  if (match) setSelectedAsset(match);
                }}
              />
            )}

            {currentTab === 'migration' && (
              <MigrationImpactView
                assets={assets}
                onSelectAsset={(a) => setSelectedAsset(a)}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] border-t border-[#1e293b] px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between">
        <div>
          <strong>ECDAT</strong> &bull; National Technical Research Organisation (NTRO) &bull; SIH26164 Team PRAYAS
        </div>
        <div className="flex items-center space-x-4">
          <span>Standards: FIPS 203 (ML-KEM) &bull; FIPS 204 (ML-DSA) &bull; FIPS 205 (SLH-DSA)</span>
          <span className="text-slate-600">&bull;</span>
          <span>CycloneDX 1.6 CBOM</span>
        </div>
      </footer>

      {/* Modals */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

      {activeProject && (
        <ScanModal
          project={activeProject}
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onScanComplete={handleScanComplete}
        />
      )}

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

    </div>
  );
};

export default App;
