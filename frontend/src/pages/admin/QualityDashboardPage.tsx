import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export const QualityDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">RAG Triad & System Quality Evaluation</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Automated evaluation measuring Context Relevance, Groundedness, and Hallucination suppression (Section 14).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Groundedness (Faithfulness)</div>
          <div className="text-3xl font-black text-emerald-400 font-mono">0.94</div>
          <div className="text-[11px] text-slate-500">Target: &gt;0.90 (Passed)</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Context Relevance</div>
          <div className="text-3xl font-black text-indigo-400 font-mono">0.91</div>
          <div className="text-[11px] text-slate-500">Vector top-3 semantic match</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Answer Relevance</div>
          <div className="text-3xl font-black text-blue-400 font-mono">0.92</div>
          <div className="text-[11px] text-slate-500">Addresses student intent</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Hallucination Rate</div>
          <div className="text-3xl font-black text-emerald-400 font-mono">0.8%</div>
          <div className="text-[11px] text-slate-500">Threshold: &lt;1.0% (Passed)</div>
        </div>
      </div>

      {/* Quality Triad Explanation */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Syllabus Grounding Verification Protocol</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-indigo-300">1. Context Retrieval</div>
            <p className="text-slate-400 leading-relaxed">
              BGE-M3 calculates cosine distance against 2,840 curriculum chunks. Only chunks with similarity score &ge; 0.70 are passed to context.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-emerald-300">2. Grounded Inference</div>
            <p className="text-slate-400 leading-relaxed">
              LLM is constrained by system prompts to refuse extrapolation. Citations to Unit, Lesson, and section titles are strictly enforced.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-blue-300">3. Teacher Moderation</div>
            <p className="text-slate-400 leading-relaxed">
              Whenever confidence drops below 0.75 or students file a dispute, the item is instantly routed to the human teacher review queue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
