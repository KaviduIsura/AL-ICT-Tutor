import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BarChart2, 
  TrendingUp, 
  Check, 
  X, 
  RotateCcw, 
  BookOpen, 
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const QuizResultPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const [filterIncorrectOnly, setFilterIncorrectOnly] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/quizzes" className="hover:text-blue-700 transition-colors">Quizzes</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-600">Unit 2–3 Mock</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Result</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">Quiz Results</h1>
      </div>

      {/* Top 3 Score & Analytics Cards (Visily Page 10) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Quiz Score */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Trophy className="w-4 h-4 text-blue-700" />
            <span>Quiz Score</span>
          </div>

          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl font-black text-slate-900">32</span>
            <span className="text-xl font-bold text-slate-400">/ 45</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold ml-1">
              71%
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Time: 42:10</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>32 Correct</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500">
              <XCircle className="w-3.5 h-3.5" />
              <span>13 Incorrect</span>
            </div>
          </div>
        </div>

        {/* Card 2: Performance Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <BarChart2 className="w-4 h-4 text-blue-700" />
            <span>Performance Breakdown</span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>MCQ</span>
                <span>80%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>STRUCTURED</span>
                <span>65%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>ESSAY</span>
                <span>60%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: By Unit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <span>By Unit</span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>UNIT 2: ARCHITECTURE</span>
                <span>92%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>UNIT 3: NETWORKING</span>
                <span>45%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Detailed Question Review */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">Detailed Question Review</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterIncorrectOnly(!filterIncorrectOnly)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                filterIncorrectOnly 
                  ? 'border-blue-600 bg-blue-50 text-blue-800' 
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Show Incorrect Only
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              Filter By Unit
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-4">
          {/* Card 1: Q4 - Structured (Correct) */}
          {!filterIncorrectOnly && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Q4 - Structured</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                    Unit 4 &gt; 4.2
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-emerald-500 text-emerald-600 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Explain the concept of Second Normal Form (2NF) with reference to partial functional dependency.
              </p>

              {/* Your Answer & Model Answer Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">YOUR ANSWER</div>
                  <p className="leading-relaxed">
                    2NF is about removing partial dependencies. A table is in 2NF if it is in 1NF and all non-key attributes are fully functionally dependent on the primary key.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MODEL ANSWER</div>
                  <p className="leading-relaxed italic text-slate-600">
                    A relation is in 2NF if and only if it is in 1NF and every non-prime attribute is fully functionally dependent on any candidate key of the relation.
                  </p>
                </div>
              </div>

              {/* AI Feedback & Marks Box */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Feedback & Marks</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Excellent understanding. You correctly identified the core principle of removing partial dependency. In the future, explicitly define 'full functional dependency' for a perfect score.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 text-[11px] font-bold">
                    Part (a): 2/2
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 text-[11px] font-bold">
                    Part (b): 1.5/2
                  </span>
                </div>
              </div>

              {/* Feedback Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Agree</span>
                  </button>
                  <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                    <ThumbsDown className="w-3 h-3" />
                    <span>Disagree</span>
                  </button>
                  <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span>Report</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold uppercase">REASONS:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">Unclear</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">Wrong mark</span>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Q7 - MCQ (Incorrect) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Q7 - MCQ</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                  Unit 5 &gt; 5.3
                </span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-rose-500 text-rose-600 flex items-center justify-center">
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-medium">
              Which layer of the OSI model is responsible for logical addressing and routing?
            </p>

            {/* Your Answer & Model Answer Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-rose-950 space-y-1">
                <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">YOUR ANSWER</div>
                <p className="leading-relaxed font-medium">
                  Data Link Layer (Layer 2)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MODEL ANSWER</div>
                <p className="leading-relaxed font-medium text-slate-800">
                  Network Layer (Layer 3)
                </p>
              </div>
            </div>

            {/* AI Feedback & Marks Box */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Feedback & Marks</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Logical addressing (IP) and routing occur at the Network Layer. Data Link layer handles physical addressing (MAC).
              </p>
            </div>

            {/* Feedback Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Agree</span>
                </button>
                <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                  <ThumbsDown className="w-3 h-3" />
                  <span>Disagree</span>
                </button>
                <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span>Report</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold uppercase">REASONS:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">Unclear</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">Wrong mark</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner: Mistake Notebook Updated (Visily Page 10) */}
      <div className="rounded-2xl border border-dashed border-slate-300 p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Mistake Notebook Updated</div>
            <div className="text-xs text-slate-500">Your 13 incorrect answers were automatically saved for revision.</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link
            to="/quiz/new"
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Quiz</span>
          </Link>
          <Link
            to="/units/4"
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Revise Lessons</span>
          </Link>
          <Link
            to="/units/4"
            className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Unit</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <span>ICT LEARNING PLATFORM · QUIZ ENGINE V3.1</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600">Documentation</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Platform Status</a>
        </div>
      </div>
    </div>
  );
};
