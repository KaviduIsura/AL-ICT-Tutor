import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Edit3, 
  BookOpen, 
  Trophy, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface PlanTask {
  id: string;
  badge: 'NOTE' | 'QUIZ' | 'FLASHCARDS' | 'DISCUSSION';
  title: string;
  unit: string;
  link: string;
  completed?: boolean;
}

interface DayPlan {
  dayName: string;
  tasks: PlanTask[];
  progressPercent: number;
}

export const PlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const isSin = language === 'si';

  const [examDate, setExamDate] = useState('2024-11-25');
  const [studyHours, setStudyHours] = useState('12 Hours');
  const [isGenerating, setIsGenerating] = useState(false);

  // 7-day schedule matching Visily Page 16
  const [weekSchedule, setWeekSchedule] = useState<DayPlan[]>([
    {
      dayName: 'MON',
      progressPercent: 100,
      tasks: [
        { id: 't1', badge: 'NOTE', title: 'Database Normalization Notes', unit: 'Unit 4', link: '/units/4', completed: true },
      ],
    },
    {
      dayName: 'TUE',
      progressPercent: 100,
      tasks: [
        { id: 't2', badge: 'QUIZ', title: 'Architecture Quiz (Unit 2)', unit: 'Unit 2', link: '/quiz/new', completed: true },
      ],
    },
    {
      dayName: 'WED',
      progressPercent: 0,
      tasks: [
        { id: 't3', badge: 'FLASHCARDS', title: 'Networking Flashcards', unit: 'Unit 5', link: '/flashcards', completed: false },
      ],
    },
    {
      dayName: 'THU',
      progressPercent: 0,
      tasks: [
        { id: 't4', badge: 'DISCUSSION', title: '6.1 Discuss with Tutor', unit: 'Unit 6', link: '/chat', completed: false },
      ],
    },
    {
      dayName: 'FRI',
      progressPercent: 0,
      tasks: [
        { id: 't5', badge: 'NOTE', title: 'Review Past Paper Mistakes', unit: 'Unit 4', link: '/mistakes', completed: false },
      ],
    },
    {
      dayName: 'SAT',
      progressPercent: 0,
      tasks: [
        { id: 't6', badge: 'QUIZ', title: 'Whole Syllabus Mock Quiz', unit: 'All Units', link: '/quiz/new', completed: false },
        { id: 't7', badge: 'DISCUSSION', title: 'Mastery Review session', unit: 'Unit 1 & 2', link: '/chat', completed: false },
      ],
    },
    {
      dayName: 'SUN',
      progressPercent: 0,
      tasks: [
        { id: 't8', badge: 'NOTE', title: 'Rest & Planning', unit: 'Global', link: '/app', completed: false },
      ],
    },
  ]);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const getBadgeStyle = (badge: PlanTask['badge']) => {
    switch (badge) {
      case 'NOTE':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'QUIZ':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'FLASHCARDS':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DISCUSSION':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Title & Subtitle matching Visily Page 16 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E3A8A] shrink-0">
          <Calendar className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">
            {isSin ? 'අධ්‍යයන සැලසුම්කරු (Study Planner)' : 'Study Planner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isSin 
              ? 'දත්ත මත පදනම් වූ පුද්ගලාරෝපිත කාලසටහනක් සමඟින් උසස් පෙළ ICT ඉලක්කය සපුරාගන්න.' 
              : 'Strategize your path to G.C.E. A/L ICT success with a data-driven schedule.'}
          </p>
        </div>
      </div>

      {/* Top 2 Cards: Plan Setup & Priority Units matching Visily Page 16 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: 1 Plan Setup */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-extrabold flex items-center justify-center text-xs">
              1
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Plan Setup
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Left Column: Form Inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  TARGET EXAM DATE
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  STUDY HOURS PER WEEK
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:bg-white"
                  >
                    <option value="8 Hours">8 Hours</option>
                    <option value="12 Hours">12 Hours</option>
                    <option value="15 Hours">15 Hours</option>
                    <option value="20 Hours">20 Hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Remaining Days & Generate Button */}
            <div className="p-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 text-center space-y-3">
              <div>
                <span className="text-xs text-slate-500 font-medium">Remaining Time</span>
                <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] mt-0.5 tracking-tight">
                  64 Days
                </div>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0D1B3E] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isGenerating ? 'Generating...' : 'Generate Weekly Plan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: 2 Priority Units */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-extrabold flex items-center justify-center text-xs">
                2
              </span>
              <h2 className="text-base font-extrabold text-slate-900">
                Priority Units
              </h2>
            </div>

            <div className="space-y-2.5">
              {/* Unit 4 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Unit 4: Database Systems
                    </div>
                    <div className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">
                      WEAK MASTERY (44%)
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 uppercase">
                  HIGH
                </span>
              </div>

              {/* Unit 6 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Unit 6: Networking & Comms
                    </div>
                    <div className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">
                      COMPLEX STRUCTURED QS
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 uppercase">
                  HIGH
                </span>
              </div>

              {/* Unit 2 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Unit 2: Computer Architecture
                    </div>
                    <div className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                      REVISION REQUIRED
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 uppercase">
                  MEDIUM
                </span>
              </div>

              {/* Unit 1 */}
              <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Unit 1: Fundamentals
                    </div>
                    <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                      MASTERED (92%)
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 uppercase">
                  LOW
                </span>
              </div>
            </div>
          </div>

          <div className="text-right pt-2 border-t border-slate-100">
            <button 
              onClick={() => navigate('/progress')}
              className="text-xs font-bold text-[#1E3A8A] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Focus Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Middle Section: 3 Weekly plan (7 Columns matching Visily Page 16) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-extrabold flex items-center justify-center text-xs">
              3
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Weekly plan
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Plan</span>
            </button>
          </div>
        </div>

        {/* 7 Columns: MON to SUN */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 border-t border-slate-100 pt-4">
          {weekSchedule.map((col, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-3 flex flex-col justify-between space-y-3 min-h-[220px]"
            >
              <div className="space-y-3">
                {/* Day Header */}
                <div className="text-center font-extrabold text-xs text-slate-600 pb-2 border-b border-slate-200/70">
                  {col.dayName}
                </div>

                {/* Task Cards */}
                <div className="space-y-2">
                  {col.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => navigate(task.link)}
                      className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-2xs hover:border-[#1E3A8A] hover:shadow-xs transition-all cursor-pointer text-left space-y-1.5 group"
                    >
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${getBadgeStyle(task.badge)}`}>
                        {task.badge}
                      </span>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
                        {task.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{task.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column Footer Progress */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-400">PROGRESS</span>
                <span className={col.progressPercent > 0 ? 'text-emerald-600' : 'text-slate-400'}>
                  {col.progressPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom 3 Cards matching Visily Page 16 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: STUDY STREAK (Deep Navy Card) */}
        <div className="bg-[#0D1B3E] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between space-y-4">
          <Zap className="w-32 h-32 absolute -right-6 -bottom-6 text-white/5 pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              <Trophy className="w-3.5 h-3.5" />
              <span>STUDY STREAK</span>
            </div>
            <h4 className="text-2xl font-black text-white">
              6 Days Active
            </h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              You've completed 92% of tasks this week. Keep it up!
            </p>
          </div>

          <button
            onClick={() => navigate('/progress')}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors relative z-10"
          >
            View Analytics Report
          </button>
        </div>

        {/* Card 2: Missed Tasks (Dashed Border Card) */}
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 shadow-xs flex flex-col justify-between text-center space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              Missed Tasks
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              You have 2 pending tasks from last Sunday. Reschedule now?
            </p>
          </div>

          <button 
            onClick={() => alert('Tasks rescheduled to available study slots!')}
            className="text-xs font-bold text-[#1E3A8A] hover:underline"
          >
            Reschedule automatically
          </button>
        </div>

        {/* Card 3: PLATFORM GUIDE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs text-slate-600">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            PLATFORM GUIDE
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <p className="leading-snug">
                Enter target exam date and daily study capacity to initialize planner.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <p className="leading-snug">
                Priority units are identified via low mastery scores and weak topic areas.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                3
              </span>
              <p className="leading-snug">
                Generated weekly plan links directly to lessons, quizzes, and tasks.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                4
              </span>
              <p className="leading-snug">
                AI automatically suggests rescheduling if tasks are consistently missed.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Page Footer matching Visily Page 16 */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span className="tracking-wide uppercase font-semibold">
          ICT LEARNING PLATFORM · PLANNER ENGINE V4.2.1
        </span>
        <div className="flex items-center gap-4">
          <button className="hover:text-slate-600 transition-colors">Academic Ethics</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">Study Methods</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">System Support</button>
        </div>
      </div>

    </div>
  );
};
