import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Trophy, 
  MoreVertical, 
  MessageSquare, 
  Layers
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MistakesPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();

  const [unitFilter, setUnitFilter] = useState('All Units');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('Unrevised Only');

  const [revisedState, setRevisedState] = useState<Record<string, boolean>>({});

  const toggleRevised = (id: string) => {
    setRevisedState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const mistakes = [
    {
      id: 'm1',
      title: 'Q: Defne 2NF',
      unit: 'UNIT 4',
      type: 'MCQ',
      prompt: 'Which of the following conditions must be met for a table to be in Second Normal Form (2NF)?',
      yourAnswer: 'It must have no transitive dependencies.',
      correctAnswer: 'It must be in 1NF and have no partial functional dependencies.',
      explanation: '2NF specifically addresses partial dependencies on a composite primary key. Transitive dependencies are handled in 3NF.',
    },
    {
      id: 'm2',
      title: 'Q: TCP vs UDP',
      unit: 'UNIT 3',
      type: 'Structured',
      prompt: 'Differentiate between TCP and UDP based on connection reliability and overhead.',
      yourAnswer: 'UDP is reliable but has high overhead.',
      correctAnswer: 'TCP is connection-oriented and reliable; UDP is connectionless and has lower overhead.',
      explanation: 'TCP uses a three-way handshake and error checking which increases overhead. UDP prioritizes speed over reliability.',
    },
    {
      id: 'm3',
      title: 'Q: Normalization Logic',
      unit: 'UNIT 4',
      type: 'Essay',
      prompt: 'Discuss the impact of many-to-many relationships in a relational database and how to resolve them.',
      yourAnswer: 'They should be left as they are to save storage space.',
      correctAnswer: 'They must be resolved using an associative/bridge table to ensure 1NF compliance.',
      explanation: 'Direct M:M relationships cause data redundancy and update anomalies. A junction table decomposes them into two 1:M relationships.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Title & Top Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">Mistake Notebook</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your incorrect answers to strengthen your understanding.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/quiz/new')}
          className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Revise my mistakes quiz</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            1. UNIT
          </label>
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none min-w-[130px]"
          >
            <option>All Units</option>
            <option>Unit 1</option>
            <option>Unit 2</option>
            <option>Unit 3</option>
            <option>Unit 4</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            2. QUESTION TYPE
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none min-w-[130px]"
          >
            <option>All Types</option>
            <option>MCQ</option>
            <option>Structured</option>
            <option>Essay</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            3. STATUS
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none min-w-[140px]"
          >
            <option>Unrevised Only</option>
            <option>Revised</option>
            <option>All Mistakes</option>
          </select>
        </div>

        <div className="pt-5">
          <button
            type="button"
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Badges (Visily Page 13) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Mistakes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL MISTAKES</div>
            <div className="text-xl font-black text-slate-900">24</div>
          </div>
        </div>

        {/* Revised */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REVISED</div>
            <div className="text-xl font-black text-slate-900">18</div>
          </div>
        </div>

        {/* Critical Unit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CRITICAL UNIT</div>
            <div className="text-xl font-black text-slate-900">Unit 4</div>
          </div>
        </div>

        {/* Streak Goal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STREAK GOAL</div>
            <div className="text-xl font-black text-slate-900">5/10</div>
          </div>
        </div>
      </div>

      {/* Mistake Cards */}
      <div className="space-y-4">
        {mistakes.map((item) => {
          const isRevised = revisedState[item.id];
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 transition-opacity ${
                isRevised ? 'opacity-60' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {item.unit}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {item.type}
                  </span>
                </div>

                <button type="button" className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Prompt */}
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {item.prompt}
              </p>

              {/* Your Answer & Correct Answer Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-rose-950 space-y-1">
                  <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">YOUR ANSWER</div>
                  <p className="leading-relaxed font-medium">
                    {item.yourAnswer}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">CORRECT ANSWER</div>
                  <p className="leading-relaxed font-medium">
                    {item.correctAnswer}
                  </p>
                </div>
              </div>

              {/* Explanation Box */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs text-slate-600 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EXPLANATION</div>
                <p className="leading-relaxed">
                  {item.explanation}
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={!!isRevised}
                    onChange={() => toggleRevised(item.id)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Mark as revised</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/chat?q=${encodeURIComponent(item.prompt)}`)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                  >
                    Ask tutor
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/quiz/new')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                  >
                    Similar Qs
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Older Mistakes Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors shadow-2xs"
        >
          View older mistakes
        </button>
      </div>
    </div>
  );
};
