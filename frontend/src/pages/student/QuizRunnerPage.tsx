import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const QuizRunnerPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();

  // Active question index (1 to 13, Visily page 9 displays Question 4 / 13)
  const [currentQNum, setCurrentQNum] = useState<number>(4);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({ 5: true });
  
  // MCQ state
  const [selectedMcq, setSelectedMcq] = useState<string>('Option A');
  
  // Structured answers state
  const [structuredAnsA, setStructuredAnsA] = useState<string>('');
  const [structuredAnsB, setStructuredAnsB] = useState<string>('');
  const [structuredAnsC, setStructuredAnsC] = useState<string>('');

  // Essay state
  const [essayText, setEssayText] = useState<string>('');

  // Timer: 42 mins 10 secs = 2530 seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(2530);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const essayWordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;

  const toggleCurrentFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQNum]: !prev[currentQNum],
    }));
  };

  const handleSubmitQuiz = () => {
    navigate('/quiz/result', {
      state: {
        score: 32,
        totalMarks: 45,
        percentage: 71,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-left pb-24">
      {/* Top Header Row (Visily Page 09) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Title & Live Badge */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0D1B3E]">Unit 2–3 quiz</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                LIVE SESSION
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Question {currentQNum} / 13
            </div>
          </div>
        </div>

        {/* Center: Timer badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-red-50/50 text-red-600 font-mono text-base font-bold shadow-xs">
          <Clock className="w-4 h-4 text-red-500" />
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-wider text-red-400 font-sans font-bold leading-none">TIMER</div>
            <div className="leading-tight">{formatTimer(secondsRemaining)}</div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative">
          <button
            type="button"
            onClick={toggleCurrentFlag}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              flaggedQuestions[currentQNum]
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQNum] ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
            <span>Flag Question</span>
          </button>

          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Answers Autosaved</span>
          </div>

          {/* Proctoring status popup pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] shadow-md absolute -bottom-10 right-0 z-10 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">PROCTORING STATUS:</span>
            <span className="text-slate-200">Tab lock active. Focus mode engaged.</span>
          </div>
        </div>
      </div>

      {/* 3 Main Working Columns (Visily Page 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Column 1: MCQ Selection */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">MCQ Selection</h2>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold">1 MARK</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Which of the following describes the purpose of a <strong className="font-bold text-slate-900">Primary Key</strong> in a database table?
            </p>

            <div className="space-y-2.5 pt-2">
              {['Option A', 'Option B', 'Option C', 'Option D', 'Option E'].map((opt) => {
                const isSelected = selectedMcq === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedMcq(opt)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 2: Structured (10 marks) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Structured (10 marks)</h2>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold">Part A</span>
          </div>

          {/* Scenario Quote Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 italic leading-relaxed">
            "Consider a library system where books are tracked by ISBN, Title, and Author. Multiple authors can write one book."
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Subquestion A */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-700">
                (A) 2 MARKS
              </div>
              <p className="text-xs text-slate-800 font-medium">
                Identify the potential candidate key for the 'Books' table.
              </p>
              <input
                type="text"
                value={structuredAnsA}
                onChange={(e) => setStructuredAnsA(e.target.value)}
                placeholder="Your answer here..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 text-slate-900"
              />
            </div>

            {/* Subquestion B */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-700">
                (B) 4 MARKS
              </div>
              <p className="text-xs text-slate-800 font-medium">
                Explain the relationship type between 'Books' and 'Authors'.
              </p>
              <input
                type="text"
                value={structuredAnsB}
                onChange={(e) => setStructuredAnsB(e.target.value)}
                placeholder="Explain briefly..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 text-slate-900"
              />
            </div>

            {/* Subquestion C */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-700">
                (C) 4 MARKS
              </div>
              <p className="text-xs text-slate-800 font-medium">
                What modification is needed to convert the table to 1NF?
              </p>
              <input
                type="text"
                value={structuredAnsC}
                onChange={(e) => setStructuredAnsC(e.target.value)}
                placeholder="Step-by-step..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Column 3: Essay (15 marks) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Essay (15 marks)</h2>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Discuss the impact of <strong className="font-bold text-slate-900">Database Normalization</strong> on system performance and data integrity in large-scale enterprise applications.
            </p>

            <div className="pt-1">
              <textarea
                rows={9}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Compose your detailed essay response here..."
                className="w-full p-3.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 text-slate-900 leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2 border-t border-slate-100">
            <span>WORD GUIDE: 150–200</span>
            <span>CURRENT: {essayWordCount} WORDS</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar: Question Map & Navigation (Visily Page 9) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setCurrentQNum(Math.max(1, currentQNum - 1))}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Question Map */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:inline">
              • QUESTION MAP
            </span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: 13 }).map((_, idx) => {
                const q = idx + 1;
                const isCurrent = q === currentQNum;
                const isFlagged = flaggedQuestions[q];
                const isCompleted = q < currentQNum;

                let btnStyle = 'border-slate-200 text-slate-500 hover:bg-slate-100';
                if (isCurrent) {
                  btnStyle = 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs font-bold';
                } else if (isFlagged) {
                  btnStyle = 'border-red-300 text-red-600 bg-red-50/50 font-bold';
                } else if (isCompleted) {
                  btnStyle = 'border-blue-300 text-blue-700 bg-blue-50/30';
                }

                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setCurrentQNum(q)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-xs font-semibold flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden lg:inline ml-2">
              JUMP TO QUESTION
            </span>
          </div>

          {/* Next & Submit Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentQNum(Math.min(13, currentQNum + 1))}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="px-5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
