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
import { ValidationLabView } from './components/ValidationLabView';
import { AgilityRadarView } from './components/AgilityRadarView';
import { DriftView } from './components/DriftView';
import { PolicyComplianceView } from './components/PolicyComplianceView';
import { AssetDetailModal } from './components/AssetDetailModal';
import { ScanModal } from './components/ScanModal';
import { NewProjectModal } from './components/NewProjectModal';
import {
  LayoutDashboard,
  Database,
  GitFork,
  Layers,
  Compass,
  Activity,
  GitCompare,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'inventory' | 'dependencies' | 'migration' | 'agility' | 'validation' | 'drift' | 'policy'
  >('dashboard');

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
      setError(err.message || 'Failed to connect to PRIME backend.');
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
    <div className="min-h-screen bg-[#070c1a] text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={(p) => setActiveProject(p)}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onOpenScan={() => setIsScanModalOpen(true)}
      />

      {/* Navigation Sub-header / Tabs */}
      <div className="bg-[#0b1329] border-b border-[#1e293b] px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Tabs">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'dashboard'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview &amp; Mosca</span>
          </button>

          <button
            onClick={() => setCurrentTab('inventory')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'inventory'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Inventory ({assets.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('dependencies')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'dependencies'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Topology Graph</span>
          </button>

          <button
            onClick={() => setCurrentTab('migration')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'migration'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blast Radius</span>
          </button>

          <button
            onClick={() => setCurrentTab('agility')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'agility'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Crypto Agility</span>
          </button>

          <button
            onClick={() => setCurrentTab('validation')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'validation'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Validation Lab</span>
          </button>

          <button
            onClick={() => setCurrentTab('drift')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'drift'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Drift &amp; Timeline</span>
          </button>

          <button
            onClick={() => setCurrentTab('policy')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'policy'
                ? 'bg-blue-900/60 text-cyan-300 border border-blue-700/80 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Policies</span>
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
            <div className="text-sm font-semibold text-slate-400">Loading cryptographic intelligence from PRIME engine...</div>
          </div>
        ) : error ? (
          <div className="bg-red-950/40 border border-red-800 p-6 rounded-xl flex items-center space-x-3 text-sm text-red-300">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <div className="font-bold text-red-200">PRIME Connection Notice</div>
              <div className="text-xs text-red-400 mt-1">{error}</div>
            </div>
          </div>
        ) : !activeProject ? (
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-12 text-center space-y-3">
            <div className="text-lg font-bold text-white">No Monitored Projects Initialized</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Create an enterprise project or select a repository to initiate cryptographic AST and dependency analysis.
            </p>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-lg"
            >
              Initialize Project
            </button>
          </div>
        ) : (
          <>
            {currentTab === 'dashboard' && dashboardData && (
              <DashboardView
                overview={dashboardData}
                activeProject={activeProject}
                onSelectAsset={(asset) => setSelectedAsset(asset)}
                onNavigateToTab={(tab: any) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'inventory' && (
              <InventoryView
                assets={assets}
                onSelectAsset={(asset) => setSelectedAsset(asset)}
              />
            )}

            {currentTab === 'dependencies' && (
              <DependencyMapView
                graph={dependencyGraph}
              />
            )}

            {currentTab === 'migration' && (
              <MigrationImpactView
                assets={assets}
                onSelectAsset={(asset) => setSelectedAsset(asset)}
              />
            )}

            {currentTab === 'agility' && (
              <AgilityRadarView activeProject={activeProject} />
            )}

            {currentTab === 'validation' && (
              <ValidationLabView />
            )}

            {currentTab === 'drift' && (
              <DriftView activeProject={activeProject} />
            )}

            {currentTab === 'policy' && (
              <PolicyComplianceView activeProject={activeProject} />
            )}
          </>
        )}

      </main>

      {/* Asset Detail / Code Evidence Inspector Modal */}
      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {/* Trigger Scan Modal */}
      {isScanModalOpen && activeProject && (
        <ScanModal
          project={activeProject}
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onScanComplete={handleScanComplete}
        />
      )}

    </div>
  );
};

export default App;
