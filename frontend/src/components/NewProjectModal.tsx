import React, { useState } from 'react';
import { Project } from '../types';
import { createProject } from '../services/api';
import { Plus, X, AlertCircle } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('Enterprise');
  const [description, setDescription] = useState('');
  const [criticality, setCriticality] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('HIGH');
  const [dataLifetime, setDataLifetime] = useState(10.0);
  const [migrationTime, setMigrationTime] = useState(3.0);
  const [quantumHorizon, setQuantumHorizon] = useState(10.0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Project name is required.');
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const proj = await createProject({
        name,
        organization,
        description,
        business_criticality: criticality,
        data_lifetime_years: dataLifetime,
        migration_time_years: migrationTime,
        quantum_horizon_years: quantumHorizon
      });
      onProjectCreated(proj);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden text-sm">
        
        {/* Header */}
        <div className="bg-[#1e293b] px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold">
            <Plus className="w-5 h-5 text-cyan-400" />
            <span>Create Monitored Project</span>
          </div>
          <button onClick={onClose} disabled={isLoading} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Core Banking Platform"
              className="w-full bg-[#111827] text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Organization / Entity</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. National Technical Research Organisation"
              className="w-full bg-[#111827] text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Business Criticality</label>
            <select
              value={criticality}
              onChange={(e) => setCriticality(e.target.value as any)}
              className="w-full bg-[#111827] text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="CRITICAL">CRITICAL (Payment, Banking, Identity, CA Root)</option>
              <option value="HIGH">HIGH (Authentication, Customer Gateway)</option>
              <option value="MEDIUM">MEDIUM (Internal Analytics, HR Portal)</option>
              <option value="LOW">LOW (Static Marketing, Documentation)</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Data Life (X)</label>
              <input
                type="number"
                step="0.5"
                value={dataLifetime}
                onChange={(e) => setDataLifetime(parseFloat(e.target.value))}
                className="w-full bg-[#111827] text-white text-xs px-2 py-1.5 rounded-lg border border-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Migration (Y)</label>
              <input
                type="number"
                step="0.5"
                value={migrationTime}
                onChange={(e) => setMigrationTime(parseFloat(e.target.value))}
                className="w-full bg-[#111827] text-white text-xs px-2 py-1.5 rounded-lg border border-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Horizon (Z)</label>
              <input
                type="number"
                step="0.5"
                value={quantumHorizon}
                onChange={(e) => setQuantumHorizon(parseFloat(e.target.value))}
                className="w-full bg-[#111827] text-white text-xs px-2 py-1.5 rounded-lg border border-slate-700"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 p-2 rounded text-xs flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-slate-400 hover:text-white text-xs px-3 py-1.5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
