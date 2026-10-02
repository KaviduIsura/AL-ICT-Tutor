import React, { useState } from 'react';
import { Terminal, Save, RotateCcw, Check, Sparkles, Layers } from 'lucide-react';

export const PromptVersionsPage: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState('v2.1');
  const [saved, setSaved] = useState(false);

  const [promptText, setPromptText] = useState(`You are the official Sinhala A/L ICT AI Tutor, strictly grounded in the Sri Lanka National Institute of Education (NIE) curriculum.

CORE DIRECTIVES:
1. Always ground your explanations in the provided context chunks. Cite the Unit and Lesson explicitly.
2. If the user asks in Sinhala, explain in clear Sinhala using official Sinhala ICT terminology paired with English technical terms in parentheses (e.g. ප්‍රාථමික යතුර (Primary Key)).
3. In Discuss mode, follow the explanation with a targeted, challenging check question to verify concept grasp.
4. If a question is outside the G.C.E. Advanced Level syllabus, politely clarify its out-of-scope status.`);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI System Prompt Engineering</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Version control for /ask and /discuss system prompts according to Section 10.4 of SPEC.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-lg">
            Active: {activeVersion}
          </span>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Deploy Prompt</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Prompt version deployed to backend FastAPI inference engine!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-slate-300">system_prompt_v2.1.jinja2</span>
            <span className="text-xs text-slate-500 font-mono">Temperature: 0.3 • Top_p: 0.9</span>
          </div>

          <textarea
            rows={14}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
          ></textarea>
        </div>

        {/* Version History & Parameters */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400">Version History</h3>
            <div className="space-y-2">
              {[
                { v: 'v2.1 (Active)', date: 'Today', author: 'Admin' },
                { v: 'v2.0 (Phase 3)', date: 'Yesterday', author: 'FastAPI Agent' },
                { v: 'v1.0 (Baseline)', date: '3 days ago', author: 'System' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white font-mono">{item.v}</div>
                    <div className="text-[10px] text-slate-500">{item.date} by {item.author}</div>
                  </div>
                  {i !== 0 && (
                    <button className="text-xs font-semibold text-indigo-400 hover:underline">
                      Rollback
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
