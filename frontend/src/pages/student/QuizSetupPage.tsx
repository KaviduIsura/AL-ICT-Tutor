import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Plus, 
  Minus, 
  Check, 
  Languages, 
  Clock, 
  FileText, 
  Target, 
  Bookmark, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const QuizSetupPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const isSin = language === 'si';

  // Scope
  const [scope, setScope] = useState<'this_unit' | 'multi_unit' | 'whole_syllabus'>('multi_unit');
  const [selectedUnits, setSelectedUnits] = useState<number[]>([3, 4]);
  const [includeAllLessons, setIncludeAllLessons] = useState(true);

  // Question types
  const [mcqCount, setMcqCount] = useState<number>(10);
  const [structuredCount, setStructuredCount] = useState<number>(2);
  const [essayCount, setEssayCount] = useState<number>(1);

  // Difficulty & Language & Exam Mode
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('medium');
  const [quizLang, setQuizLang] = useState<'Sinhala' | 'English' | 'Bilingual (Mixed)'>('English');
  const [timedExamMode, setTimedExamMode] = useState(true);
  const [paperLayout, setPaperLayout] = useState(false);

  // Calculations
  const totalQuestions = mcqCount + structuredCount + essayCount;
  const totalMarks = mcqCount * 2 + structuredCount * 10 + essayCount * 15;
  const estimatedMins = timedExamMode ? Math.max(15, Math.round(mcqCount * 1.5 + structuredCount * 10 + essayCount * 25)) : 60;

  const toggleUnit = (unitId: number) => {
    if (selectedUnits.includes(unitId)) {
      if (selectedUnits.length > 1) {
        setSelectedUnits(selectedUnits.filter(id => id !== unitId));
      }
    } else {
      setSelectedUnits([...selectedUnits, unitId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUnits.length === 4) {
      setSelectedUnits([3]);
    } else {
      setSelectedUnits([1, 2, 3, 4]);
    }
  };

  const handleStartQuiz = () => {
    navigate('/quiz/run', {
      state: {
        units: selectedUnits,
        mcqCount,
        structuredCount,
        essayCount,
        difficulty,
        language: quizLang,
        timedExamMode,
        paperLayout,
        totalQuestions,
        totalMarks,
        estimatedMins,
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/app" className="hover:text-blue-700 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/quizzes" className="hover:text-blue-700 transition-colors">Quizzes</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Quiz Setup</span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">New Quiz Setup</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure your practice session parameters following the G.C.E. A/L exam structure.
        </p>
      </div>

      {/* Row 1: Scope & Question Types */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Card 1: Scope */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900">Scope</h2>
          </div>

          {/* Scope Radios */}
          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="radio"
                name="scope"
                checked={scope === 'this_unit'}
                onChange={() => setScope('this_unit')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>This unit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="radio"
                name="scope"
                checked={scope === 'multi_unit'}
                onChange={() => setScope('multi_unit')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Multi-unit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="radio"
                name="scope"
                checked={scope === 'whole_syllabus'}
                onChange={() => setScope('whole_syllabus')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Whole syllabus</span>
            </label>
          </div>

          {/* Inner Units Box */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                SELECT UNITS
              </span>
              <button 
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                {selectedUnits.length === 4 ? 'DESELECT ALL' : 'SELECT ALL'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 1, title: 'Unit 1: Fundamentals' },
                { id: 2, title: 'Unit 2: Computer Architecture' },
                { id: 3, title: 'Unit 3: Operating Systems' },
                { id: 4, title: 'Unit 4: Database Management' },
              ].map((unit) => {
                const checked = selectedUnits.includes(unit.id);
                return (
                  <label
                    key={unit.id}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer text-xs transition-colors ${
                      checked 
                        ? 'border-blue-300 bg-white font-semibold text-slate-900 shadow-xs' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleUnit(unit.id)}
                      className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>{unit.title}</span>
                  </label>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Lessons:</span>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={includeAllLessons}
                  onChange={(e) => setIncludeAllLessons(e.target.checked)}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Include all lessons</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 2: Question Types */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-base font-bold text-slate-900">Question types</h2>
          </div>

          <div className="space-y-3">
            {/* MCQ Counter */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-bold text-slate-800">MCQ (Multiple Choice)</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMcqCount(Math.max(0, mcqCount - 1))}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-slate-900 font-mono">{mcqCount}</span>
                <button
                  type="button"
                  onClick={() => setMcqCount(mcqCount + 1)}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Structured Counter */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-bold text-slate-800">Structured Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStructuredCount(Math.max(0, structuredCount - 1))}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-slate-900 font-mono">{structuredCount}</span>
                <button
                  type="button"
                  onClick={() => setStructuredCount(structuredCount + 1)}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Essay Counter */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-bold text-slate-800">Essay Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEssayCount(Math.max(0, essayCount - 1))}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-slate-900 font-mono">{essayCount}</span>
                <button
                  type="button"
                  onClick={() => setEssayCount(essayCount + 1)}
                  className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Dotted Divider & Total Weightage */}
          <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              TOTAL WEIGHTAGE
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
              Approx. {totalMarks} Marks
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Difficulty, Language, Exam Mode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-base font-bold text-slate-900">Difficulty</h2>
          </div>

          <div className="space-y-2">
            {[
              { id: 'easy', label: 'easy' },
              { id: 'medium', label: 'medium' },
              { id: 'hard', label: 'hard' },
              { id: 'mixed', label: 'mixed' },
            ].map((item) => {
              const active = difficulty === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDifficulty(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold capitalize transition-all ${
                    active
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {active && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-base font-bold text-slate-900">Language</h2>
          </div>

          <div className="space-y-2">
            {[
              { id: 'Sinhala', label: 'Sinhala' },
              { id: 'English', label: 'English' },
              { id: 'Bilingual (Mixed)', label: 'Bilingual (Mixed)' },
            ].map((item) => {
              const active = quizLang === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuizLang(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                    active
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">SYLLABUS STANDARD</div>
                    </div>
                  </div>
                  <Languages className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Mode */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h2 className="text-base font-bold text-slate-900">Exam mode</h2>
          </div>

          <div className="space-y-3">
            {/* Timed Mode Card */}
            <label
              className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                timedExamMode
                  ? 'border-red-200 bg-red-50/40'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={timedExamMode}
                  onChange={(e) => setTimedExamMode(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>Timed Exam Mode</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Timer set to {estimatedMins} mins based on question volume.
                  </p>
                </div>
              </div>
            </label>

            {/* Paper Layout Card */}
            <label
              className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                paperLayout
                  ? 'border-blue-300 bg-blue-50/40'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={paperLayout}
                  onChange={(e) => setPaperLayout(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Paper Layout</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Simulate physical exam paper layout (best for structured/essay).
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Row 3: Floating Summary Card (Visily Page 8) */}
      <div className="bg-[#EDF2F9] rounded-2xl border border-blue-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Summary</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                Custom Session
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              {totalQuestions} questions · Approx. {estimatedMins} min · Units {selectedUnits.sort((a,b)=>a-b).join(', ')}
            </div>
            <div className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
              QUESTIONS FETCHED FROM APPROVED BANK, NOT YET SEEN.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Save Preset
          </button>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Start Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row 4: 3 Feature Info Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
            <Target className="w-3.5 h-3.5" />
            <span>SCOPE RETRIEVAL</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Toggle controls for unit-specific filtering or whole syllabus mock exams (recommended for final revision).
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            <span>TIME MANAGEMENT</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Exam mode adds a ticking clock. To practice without pressure, turn off 'Exam Mode' in the settings above.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-600 font-bold uppercase tracking-wider text-[11px]">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>DYNAMIC DIFFICULTY</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            'Mixed' difficulty balances easy and challenging questions to match the standard G.C.E. A/L distribution.
          </p>
        </div>
      </div>
    </div>
  );
};
