import React, { useState } from 'react';
import { Sliders, Save, Check, Database, Cpu, Globe } from 'lucide-react';

export const SystemSettingsPage: React.FC = () => {
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [simThreshold, setSimThreshold] = useState('0.70');
  const [topK, setTopK] = useState('4');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System & LLM Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Backend inference endpoints, vector similarity thresholds, and retrieval parameters.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>System configuration updated and hot-reloaded!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>LLM Provider & Model</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Inference Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Groq)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Google)</option>
                <option value="gpt-4o-mini">gpt-4o-mini (OpenAI)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Embedding Model</label>
              <input
                type="text"
                disabled
                value="BAAI/bge-m3 (1024-dim dense)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Vector Search Parameters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Similarity Threshold (Cosine Distance)</label>
              <input
                type="text"
                value={simThreshold}
                onChange={(e) => setSimThreshold(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Top-K Context Chunks</label>
              <input
                type="number"
                value={topK}
                onChange={(e) => setTopK(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </form>
    </div>
  );
};
