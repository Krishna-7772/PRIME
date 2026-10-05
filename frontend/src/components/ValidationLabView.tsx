import React, { useState } from 'react';
import { Play, Activity, ShieldAlert, CheckCircle2, Clock, Cpu, HardDrive, ArrowRight, Layers } from 'lucide-react';
import { runValidationBenchmark } from '../services/api';
import { ValidationBenchmarkResult } from '../types';

export const ValidationLabView: React.FC = () => {
  const [benchmarkType, setBenchmarkType] = useState<'ASYMMETRIC' | 'KEY_EXCHANGE'>('ASYMMETRIC');
  const [classicalAlgo, setClassicalAlgo] = useState('RSA-2048');
  const [candidatePqc, setCandidatePqc] = useState('ML-DSA-65');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationBenchmarkResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunBenchmark = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await runValidationBenchmark(benchmarkType, classicalAlgo, candidatePqc);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Benchmark execution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">Migration Validation Lab (Sandbox)</h2>
              <span className="bg-emerald-950/70 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800">
                REAL BENCHMARKS &bull; ZERO FABRICATED DATA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Execute controlled local cryptographic performance benchmarks. Compares classical primitives against NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) candidate replacements, measuring real microsecond execution timings and payload overhead.
            </p>
          </div>

          <button
            onClick={handleRunBenchmark}
            disabled={loading}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 fill-white ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Benchmarking Hardware...' : 'Run Live Benchmark'}</span>
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Benchmark Primitive
            </label>
            <select
              value={benchmarkType}
              onChange={(e) => {
                const val = e.target.value as 'ASYMMETRIC' | 'KEY_EXCHANGE';
                setBenchmarkType(val);
                if (val === 'KEY_EXCHANGE') {
                  setClassicalAlgo('X25519');
                  setCandidatePqc('ML-KEM-768');
                } else {
                  setClassicalAlgo('RSA-2048');
                  setCandidatePqc('ML-DSA-65');
                }
              }}
              className="w-full bg-[#1e293b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
            >
              <option value="ASYMMETRIC">Digital Signature (Classical vs FIPS 204 ML-DSA)</option>
              <option value="KEY_EXCHANGE">Key Establishment / KEM (Classical vs FIPS 203 ML-KEM)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Current Classical Primitive
            </label>
            <select
              value={classicalAlgo}
              onChange={(e) => setClassicalAlgo(e.target.value)}
              className="w-full bg-[#1e293b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
            >
              {benchmarkType === 'ASYMMETRIC' ? (
                <>
                  <option value="RSA-2048">RSA-2048 (PKCS#1 v1.5 / PSS)</option>
                  <option value="ECDSA-P256">ECDSA P-256 (FIPS 186-4)</option>
                </>
              ) : (
                <>
                  <option value="X25519">X25519 (RFC 7748 ECDH)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Candidate PQC Replacement
            </label>
            <select
              value={candidatePqc}
              onChange={(e) => setCandidatePqc(e.target.value)}
              className="w-full bg-[#1e293b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
            >
              {benchmarkType === 'ASYMMETRIC' ? (
                <>
                  <option value="ML-DSA-65">ML-DSA-65 (NIST FIPS 204, Primary Signature)</option>
                  <option value="SLH-DSA">SLH-DSA (NIST FIPS 205, Hash-based)</option>
                </>
              ) : (
                <>
                  <option value="ML-KEM-768">ML-KEM-768 (NIST FIPS 203, Primary KEM)</option>
                  <option value="X25519MLKEM768">X25519MLKEM768 (IETF RFC 10024 Hybrid)</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 text-red-300 text-xs p-3 rounded-lg flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Benchmark Results Display */}
      {result ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Classical Benchmark Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <h3 className="font-bold text-white text-sm">Classical: {result.classical.algorithm}</h3>
              </div>
              <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                SHOR VULNERABLE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Keygen Latency</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  {result.classical.keygen_time_us.toLocaleString()} &mu;s
                </div>
              </div>

              {result.classical.sign_time_us !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Signing Latency</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {result.classical.sign_time_us.toLocaleString()} &mu;s
                  </div>
                </div>
              )}

              {result.classical.verify_time_us !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Verification Latency</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {result.classical.verify_time_us.toLocaleString()} &mu;s
                  </div>
                </div>
              )}

              {result.classical.signature_size_bytes !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Signature Size</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {result.classical.signature_size_bytes} Bytes
                  </div>
                </div>
              )}

              {result.classical.public_key_bytes !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Public Key Size</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {result.classical.public_key_bytes} Bytes
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Candidate PQC Benchmark Card */}
          <div className="bg-[#0f172a] border border-cyan-900/60 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                <h3 className="font-bold text-white text-sm">PQC Candidate: {result.candidate.algorithm}</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                {result.candidate.standard}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">PQC Keygen Latency</div>
                <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                  {result.candidate.keygen_time_us.toLocaleString()} &mu;s
                </div>
              </div>

              {result.candidate.sign_time_us !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">PQC Signing Latency</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                    {result.candidate.sign_time_us.toLocaleString()} &mu;s
                  </div>
                </div>
              )}

              {result.candidate.verify_time_us !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">PQC Verification Latency</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                    {result.candidate.verify_time_us.toLocaleString()} &mu;s
                  </div>
                </div>
              )}

              {result.candidate.signature_size_bytes !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">PQC Signature Size</div>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                    {result.candidate.signature_size_bytes.toLocaleString()} Bytes
                  </div>
                </div>
              )}

              {result.candidate.public_key_bytes !== undefined && (
                <div className="bg-[#1e293b]/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">PQC Public Key Size</div>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                    {result.candidate.public_key_bytes.toLocaleString()} Bytes
                  </div>
                </div>
              )}
            </div>

            {/* Overhead Summary */}
            {result.overhead && (
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/80 text-xs space-y-1.5">
                <div className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Engineering Impact & Overhead Assessment</span>
                </div>
                <div className="text-slate-300 text-[11px] font-mono">
                  &bull; Bandwidth Impact: <span className="text-amber-300">{result.overhead.bandwidth_impact}</span>
                </div>
                <div className="text-slate-300 text-[11px] font-mono">
                  &bull; Compatibility Verdict: <span className="text-emerald-400 font-bold">{result.overhead.compatibility_verdict}</span>
                </div>
              </div>
            )}

            {/* Hybrid TLS Section if present */}
            {result.hybrid_rfc10024 && (
              <div className="bg-blue-950/40 p-3.5 rounded-lg border border-blue-800/60 text-xs space-y-1.5">
                <div className="font-semibold text-cyan-300 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>IETF RFC 10024 PQ/T Hybrid Key Exchange</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Composite Handshake: <span className="font-mono text-white">{result.hybrid_rfc10024.total_handshake_us} &mu;s</span> &bull; Total Public Key: <span className="font-mono text-white">{result.hybrid_rfc10024.total_public_key_bytes} B</span>
                </div>
                <p className="text-[10px] text-slate-400">{result.hybrid_rfc10024.security_note}</p>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="bg-[#0f172a] border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-400 text-xs">
          Select parameters above and click <strong className="text-cyan-400">"Run Live Benchmark"</strong> to measure real cryptographic operations in this environment.
        </div>
      )}

    </div>
  );
};
