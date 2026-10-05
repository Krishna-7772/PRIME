import React, { useState } from 'react';
import { Project, Scan } from '../types';
import { triggerScan } from '../services/api';
import { UploadCloud, Folder, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ScanModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (scan: Scan) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  project,
  isOpen,
  onClose,
  onScanComplete
}) => {
  if (!isOpen) return null;

  const [scanMode, setScanMode] = useState<'PATH' | 'ZIP'>('PATH');
  const [repoPath, setRepoPath] = useState<string>('demo/bharatpay');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scanPhase, setScanPhase] = useState<string>('');

  const handleStartScan = async () => {
    setIsScanning(true);
    setErrorMsg(null);
    setScanPhase('Initiating cryptographic discovery engine...');

    const formData = new FormData();
    if (scanMode === 'PATH') {
      formData.append('repository_path', repoPath);
    } else if (selectedFile) {
      formData.append('file', selectedFile);
    } else {
      setErrorMsg('Please select a ZIP file to upload.');
      setIsScanning(false);
      return;
    }

    try {
      setScanPhase('Analyzing source code ASTs, certificates, and manifests...');
      const scanResult = await triggerScan(project.id, formData);
      setScanPhase('Synthesizing Mosca risk metrics and dependency graph...');
      onScanComplete(scanResult);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden text-sm">
        
        {/* Header */}
        <div className="bg-[#1e293b] px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <span>Scan Enterprise Repository</span>
          </div>
          <button onClick={onClose} disabled={isScanning} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="text-xs text-slate-400">
            Target Project: <strong className="text-cyan-400">{project.name}</strong> ({project.business_criticality})
          </div>

          {/* Mode Switcher */}
          <div className="flex border border-slate-700 rounded-lg p-1 bg-[#111827]">
            <button
              type="button"
              onClick={() => setScanMode('PATH')}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition ${
                scanMode === 'PATH' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Workspace Directory Path
            </button>
            <button
              type="button"
              onClick={() => setScanMode('ZIP')}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition ${
                scanMode === 'ZIP' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload ZIP Archive
            </button>
          </div>

          {scanMode === 'PATH' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Local Repository / Directory Path:
              </label>
              <div className="relative">
                <Folder className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={repoPath}
                  onChange={(e) => setRepoPath(e.target.value)}
                  placeholder="e.g. demo/bharatpay"
                  className="w-full bg-[#111827] text-white text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Default: <code>demo/bharatpay</code> (FinTech enterprise stack with Python, Node, X.509 certs, and Docker).
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Upload Repository ZIP Archive:
              </label>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full bg-[#111827] text-slate-300 text-xs p-2 rounded-lg border border-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
              />
              <p className="text-[11px] text-slate-500">
                Safe analysis mode: Uploaded archives are unpacked with zip-slip validation and never executed.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 p-3 rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isScanning && (
            <div className="bg-blue-950/40 border border-blue-900/60 p-3 rounded-lg text-xs space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{scanPhase}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full animate-pulse w-3/4 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#1e293b] px-6 py-3 border-t border-slate-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isScanning}
            className="text-slate-400 hover:text-white text-xs px-3 py-2 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition flex items-center space-x-1.5 shadow"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <span>Start Discovery Scan</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
