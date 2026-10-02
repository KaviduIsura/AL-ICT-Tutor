import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Layers, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Plus, 
  Upload, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const isSin = language === 'si';

  // Weak units bar chart data matching Visily Page 17
  const weakUnits = [
    { unit: 'Unit 2', name: 'Computer Architecture', mastery: 45, isLow: false },
    { unit: 'Unit 4', name: 'Database Systems', mastery: 35, isLow: true },
    { unit: 'Unit 5', name: 'Operating Systems', mastery: 70, isLow: false },
    { unit: 'Unit 6', name: 'Computer Networks', mastery: 42, isLow: false },
    { unit: 'Unit 8', name: 'Programming Concepts', mastery: 85, isLow: false },
  ];

  const deadlines = [
    { title: 'Networking quiz', due: 'Due Friday, 11:59 PM', urgency: 'high' },
    { title: 'Unit 4 past paper review', due: 'Due Mon, 8:00 AM', urgency: 'medium' },
    { title: 'Database Essay', due: 'Due Wed, Oct 12', urgency: 'medium' },
    { title: 'Logic Gates MCQ', due: 'Due Next Thu', urgency: 'high' },
  ];

  const recentActivity = [
    { title: 'Nimal completed Quiz U2 (70%)', time: '2M AGO' },
    { title: 'Question reported: Q-132 (Database)', time: '1H AGO' },
    { title: 'New student registration: Kavidu P.', time: 'YESTERDAY' },
    { title: 'Syllabus chunk processed: Unit 5.2', time: '2 DAYS AGO' },
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Title & Top Action Bar matching Visily Page 17 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062D2C]">
            Teacher Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor class performance, review pending tasks, and manage syllabus content.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-2 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Term 2 View</span>
          </button>
          <button 
            onClick={() => navigate('/quiz/new')}
            className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards matching Visily Page 17 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* STUDENTS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              STUDENTS
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">
              86
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* CLASSES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              CLASSES
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">
              3
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* 1 PENDING REVIEWS */}
        <div 
          onClick={() => navigate('/teacher/review')}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors"
        >
          <div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>PENDING REVIEWS</span>
            </div>
            <div className="text-3xl font-black text-amber-500 mt-1">
              14
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* FLAGGED ANSWERS */}
        <div 
          onClick={() => navigate('/teacher/review')}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-rose-300 transition-colors"
        >
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              FLAGGED ANSWERS
            </div>
            <div className="text-3xl font-black text-rose-500 mt-1">
              6
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Middle Row: Weak Units Chart (Left 2 cols) & Upcoming Deadlines (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 2 WEAK UNITS ACROSS CLASSES */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
                2
              </span>
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                WEAK UNITS ACROSS CLASSES
              </h2>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
              AVERAGE MASTERY %
            </span>
          </div>

          {/* Bar Chart matching Visily Page 17 */}
          <div className="h-52 flex items-end justify-around gap-4 pt-6 px-4 border-b border-slate-100">
            {weakUnits.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 max-w-[64px] h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
                  {item.mastery}%
                </span>
                <div 
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    item.isLow 
                      ? 'bg-[#1E3A8A] opacity-90' 
                      : 'bg-[#1E3A8A]'
                  } group-hover:brightness-110`}
                  style={{ height: `${item.mastery * 1.8}px` }}
                ></div>
                <span className="text-xs font-bold text-slate-700 mt-1">
                  {item.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Chart note */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-rose-500 text-base leading-none">〰</span>
            <span>Units with sub-40% mastery require focused revision or supplementary materials.</span>
          </div>
        </div>

        {/* Right: 3 UPCOMING DEADLINES */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
                3
              </span>
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                UPCOMING DEADLINES
              </h2>
            </div>

            <div className="space-y-3">
              {deadlines.map((dl, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {dl.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {dl.due}
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                    dl.urgency === 'high'
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {dl.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <button 
              onClick={() => navigate('/teacher/classes')}
              className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
            >
              <span>MANAGE ALL DEADLINES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Row: 4 RECENT ACTIVITY & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 4 RECENT ACTIVITY */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
              4
            </span>
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              RECENT ACTIVITY
            </h2>
          </div>

          <div className="space-y-3.5">
            {recentActivity.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">
                    {act.title}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                    {act.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: QUICK ACTIONS */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              QUICK ACTIONS
            </h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
              SHORTCUT MENU
            </span>
          </div>

          {/* 3 Large Action Tiles matching Visily Page 17 */}
          <div className="grid grid-cols-3 gap-3">
            <div 
              onClick={() => navigate('/teacher/content')}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 bg-white hover:bg-teal-50/20 transition-all cursor-pointer text-center space-y-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                UPLOAD CONTENT
              </div>
            </div>

            <div 
              onClick={() => navigate('/teacher/review')}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 bg-white hover:bg-teal-50/20 transition-all cursor-pointer text-center space-y-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                REVIEW QUEUE
              </div>
            </div>

            <div 
              onClick={() => navigate('/quiz/new')}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 bg-white hover:bg-teal-50/20 transition-all cursor-pointer text-center space-y-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                NEW ASSIGNMENT
              </div>
            </div>
          </div>

          {/* Bottom status line */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>SYNC ACTIVE</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-semibold">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>12 REPORTS READY</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom 2 Cards matching Visily Page 17 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: ELEMENTS & ACTIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs text-slate-600">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            ELEMENTS & ACTIONS
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <p className="leading-snug">
                Counters link straight to the review queue for pending tasks.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <p className="leading-snug">
                Weak-unit chart guides what to teach next based on mastery.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                3
              </span>
              <p className="leading-snug">
                Deadlines for assigned quizzes show priority level.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                4
              </span>
              <p className="leading-snug">
                Activity feed shows real-time student reports and completions.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: PRO TIP Class Comparison (Deep Card) */}
        <div className="bg-[#062D2C] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between space-y-4">
          <Layers className="w-32 h-32 absolute -right-6 -bottom-6 text-white/5 pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-extrabold tracking-wider uppercase text-amber-300">
              PRO TIP
            </span>
            <h4 className="text-xl font-extrabold text-white">
              Class Comparison
            </h4>
            <p className="text-xs text-teal-100/90 leading-relaxed">
              "Your 'Class B' is currently outperforming 'Class A' in Unit 4 by 12%. Consider sharing the supplementary notes from Class B with others."
            </p>
          </div>

          <button
            onClick={() => navigate('/teacher/analytics')}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors relative z-10 uppercase tracking-wider"
          >
            VIEW DETAILED COMPARISON
          </button>
        </div>

      </div>

      {/* Page Footer matching Visily Page 17 */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span className="tracking-wide uppercase font-semibold">
          ICT LEARNING PLATFORM · TEACHER PORTAL V3.8.2
        </span>
        <div className="flex items-center gap-4">
          <button className="hover:text-slate-600 transition-colors">CURRICULUM MAPPING</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">SYLLABUS GUIDE</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">PLATFORM SUPPORT</button>
        </div>
      </div>

    </div>
  );
};
