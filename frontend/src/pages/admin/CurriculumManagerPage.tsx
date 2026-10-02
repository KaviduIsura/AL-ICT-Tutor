import React from 'react';
import { Layers, Database, RefreshCw, CheckCircle2, Cpu } from 'lucide-react';
import { AL_ICT_UNITS } from '../../data/mockData';

export const CurriculumManagerPage: React.FC = () => {
  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Curriculum & Chunk Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Vector embeddings metadata, chunk index counts, and full re-indexing operations.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md">
          <RefreshCw className="w-4 h-4" />
          <span>Re-Index Embeddings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AL_ICT_UNITS.map((unit) => (
          <div key={unit.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950/70 border border-indigo-900 px-2 py-0.5 rounded-md">
                {unit.code}
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Indexed</span>
              </span>
            </div>
            <h3 className="text-sm font-bold text-white line-clamp-1">{unit.titleEn}</h3>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
              <div>Chunks: <strong className="text-white">{unit.lessonCount * 12 + 10}</strong></div>
              <div>Model: <strong className="text-white">BGE-M3</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
