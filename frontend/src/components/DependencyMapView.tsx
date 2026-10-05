import React, { useState } from 'react';
import { DependencyGraph, GraphNode } from '../types';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  Handle,
  Position,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Layers, Box, Cpu, Award, Shield } from 'lucide-react';

interface DependencyMapViewProps {
  graph: DependencyGraph;
  onSelectNode?: (nodeId: string) => void;
}

// Custom Node Renderer with enterprise badge styling
const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeType = (data as any).nodeType || 'DEFAULT';
  const label = (data as any).label || 'Node';
  const status = (data as any).status || 'OBSERVED';

  const getNodeIcon = () => {
    switch (nodeType) {
      case 'APPLICATION': return <Layers className="w-3.5 h-3.5 text-blue-400" />;
      case 'COMPONENT': return <Box className="w-3.5 h-3.5 text-indigo-400" />;
      case 'LIBRARY': return <Box className="w-3.5 h-3.5 text-purple-400" />;
      case 'CRYPTO_ASSET': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'CERTIFICATE': return <Award className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Shield className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getBorderColor = () => {
    if (selected) return 'border-cyan-400 shadow-cyan-500/20 shadow-lg';
    switch (nodeType) {
      case 'APPLICATION': return 'border-blue-600 bg-blue-950/40';
      case 'COMPONENT': return 'border-indigo-600 bg-indigo-950/40';
      case 'LIBRARY': return 'border-purple-600 bg-purple-950/40';
      case 'CRYPTO_ASSET': return 'border-cyan-600 bg-cyan-950/40';
      case 'CERTIFICATE': return 'border-emerald-600 bg-emerald-950/40';
      default: return 'border-slate-700 bg-slate-900';
    }
  };

  return (
    <div className={`px-3 py-2 rounded-lg border-2 min-w-[150px] max-w-[220px] transition ${getBorderColor()}`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-slate-500 border border-slate-700" />
      <div className="flex items-center space-x-1.5 mb-1">
        {getNodeIcon()}
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          {nodeType.replace('_', ' ')}
        </span>
      </div>
      <div className="text-xs font-semibold text-white truncate" title={label}>
        {label}
      </div>
      <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-between">
        <span>Relation:</span>
        <span className="font-mono text-cyan-300 font-bold">{status}</span>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-cyan-500 border border-slate-700" />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode
};

export const DependencyMapView: React.FC<DependencyMapViewProps> = ({ graph }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onNodeClick = (_: any, node: any) => {
    setSelectedNode(node);
  };

  return (
    <div className="space-y-4">
      
      {/* Graph Top Info Bar */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs">
        <div>
          <h3 className="font-bold text-white text-sm">Interactive Cryptographic Dependency Graph</h3>
          <p className="text-slate-400 text-xs">
            Multi-layer topology mapping Application &rarr; Component &rarr; Library &rarr; Crypto Asset &rarr; Certificate
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-300">Application</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-slate-300">Component</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span className="text-slate-300">Library</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">Crypto Asset</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">Certificate</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-[#090d16] border border-slate-800 rounded-xl h-[650px] relative overflow-hidden">
        {graph.nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            No dependency relationships recorded for this project yet. Run a scan to populate graph.
          </div>
        ) : (
          <ReactFlow
            nodes={graph.nodes}
            edges={graph.edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            colorMode="dark"
          >
            <Background color="#1e293b" gap={16} size={1} />
            <Controls className="bg-[#111827] border-slate-700 text-white fill-white" />
            <MiniMap
              nodeColor={(node: any) => {
                const type = node.data?.nodeType;
                if (type === 'APPLICATION') return '#3b82f6';
                if (type === 'CRYPTO_ASSET') return '#38bdf8';
                if (type === 'CERTIFICATE') return '#10b981';
                return '#6366f1';
              }}
              className="bg-[#111827] border border-slate-800 rounded-lg"
            />
          </ReactFlow>
        )}

        {/* Selected Node Drawer */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-[#111827] border border-slate-700 p-4 rounded-xl shadow-xl w-72 text-xs z-10 space-y-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-white uppercase text-[10px] text-cyan-400">
                {selectedNode.data?.nodeType} Detail
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">Identifier</div>
              <div className="font-bold text-white text-sm">{selectedNode.data?.label}</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">Evidence Provenance</div>
              <div className="font-mono text-cyan-400">{selectedNode.data?.status} Relation</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
