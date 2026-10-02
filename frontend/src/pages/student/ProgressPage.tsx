import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  Filter, 
  ArrowRight, 
  Clock, 
  Award, 
  Target,
  FileText
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ProgressPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();

  // Heatmap data 5 units x 8 lessons
  const heatmapData = [
    ['#E2E8F0', '#E2E8F0', '#93C5FD', '#60A5FA', '#3B82F6', '#1E3A8A', '#E2E8F0', '#F8FAFC'],
    ['#E2E8F0', '#93C5FD', '#60A5FA', '#3B82F6', '#1E3A8A', '#E2E8F0', '#F8FAFC', '#F8FAFC'],
    ['#93C5FD', '#60A5FA', '#1E3A8A', '#E2E8F0', '#E2E8F0', '#F8FAFC', '#93C5FD', '#60A5FA'],
    ['#60A5FA', '#1E3A8A', '#F8FAFC', '#E2E8F0', '#F8FAFC', '#93C5FD', '#3B82F6', '#1E3A8A'],
    ['#93C5FD', '#3B82F6', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC'],
  ];

  const weakTopics = [
    { lesson: '4.2 Normalization', mastery: 40, last: '3 days ago' },
    { lesson: '6.1 Subnetting', mastery: 41, last: '1 week ago' },
    { lesson: '5.3 TCP/IP Model', mastery: 38, last: '2 days ago' },
    { lesson: '2.4 ALU Operations', mastery: 45, last: '4 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/app" className="hover:text-blue-700 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Progress Analysis</span>
      </div>

      {/* Title & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">Academic Performance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprehensive tracking of your mastery across the G.C.E. A/L ICT syllabus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Last 30 Days</span>
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Full Report</span>
          </button>
        </div>
      </div>

      {/* Top 3 Visual Analytics Cards (Visily Page 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Mastery Heatmap */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900">Mastery heatmap (unit x lesson)</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>● LOW</span>
              <span>● HIGH</span>
            </div>
          </div>

          {/* Grid */}
          <div className="space-y-1.5 pt-2">
            {heatmapData.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 w-12 shrink-0">
                  UNIT {rIdx + 1}
                </span>
                <div className="grid grid-cols-8 gap-1.5 flex-1">
                  {row.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="h-5 rounded-md transition-transform hover:scale-110 cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Column labels L1 - L8 */}
            <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-400">
              <span className="w-12 shrink-0" />
              <div className="grid grid-cols-8 gap-1.5 flex-1 text-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i}>L{i + 1}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Score Over Time */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">Score over time</h2>
          </div>

          {/* SVG Line Chart */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-dashed border-slate-200 pb-1">
              <span>85</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-dashed border-slate-200 py-3">
              <span>75</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-dashed border-slate-200 py-3">
              <span>65</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-dashed border-slate-200 py-3">
              <span>55</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-dashed border-slate-200 py-3">
              <span>45</span>
            </div>

            {/* Simulated curve overlay */}
            <svg className="absolute inset-0 w-full h-full pt-4 pointer-events-none" viewBox="0 0 300 130" preserveAspectRatio="none">
              <path
                d="M 10 115 Q 40 95, 70 100 T 130 80 T 180 88 T 230 50 T 290 20"
                fill="none"
                stroke="#1E3A8A"
                strokeWidth="2.5"
              />
              <circle cx="10" cy="115" r="3" fill="#1E3A8A" />
              <circle cx="70" cy="100" r="3" fill="#1E3A8A" />
              <circle cx="130" cy="80" r="3" fill="#1E3A8A" />
              <circle cx="180" cy="88" r="3" fill="#1E3A8A" />
              <circle cx="230" cy="50" r="3" fill="#1E3A8A" />
              <circle cx="290" cy="20" r="3" fill="#1E3A8A" />
            </svg>

            {/* X-axis labels */}
            <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 pt-2">
              <span>Oct 01</span>
              <span>Oct 08</span>
              <span>Oct 15</span>
              <span>Oct 22</span>
              <span>Oct 29</span>
              <span>Nov 05</span>
              <span>Nov 19</span>
            </div>
          </div>
        </div>

        {/* Card 3: Accuracy By Type */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Accuracy by type</h2>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>MCQ</span>
                  <span>82%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>STRUCTURED</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>ESSAY</span>
                  <span>44%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '44%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 text-[11px] text-slate-600 leading-relaxed">
            <strong>Tip:</strong> Your essay scores are below average. Try using the "Discuss" mode in Ask/Discuss to practice structured explanations.
          </div>
        </div>
      </div>

      {/* Middle Section: Weak Topics (Visily Page 12) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-base font-bold text-slate-900">Weak topics</h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <button type="button" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
              <span>Filter by Unit</span>
              <Filter className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300">|</span>
            <Link to="/mistakes" className="text-blue-700 hover:text-blue-800 flex items-center gap-1">
              <span>View Mistake Notebook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">LESSON</th>
                <th className="py-3 px-3">MASTERY</th>
                <th className="py-3 px-3">LAST PRACTISED</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {weakTopics.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {item.lesson}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.mastery}%` }} />
                      </div>
                      <span className="font-bold text-rose-600">{item.mastery}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.last}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => navigate('/quiz/new')}
                      className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs"
                    >
                      Practise
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Load More Topics ⁝
          </button>
        </div>
      </div>

      {/* Bottom 3 Cards (Visily Page 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Achievement (Dark Navy #0D1B3E) */}
        <div className="bg-[#0D1B3E] rounded-2xl p-6 text-white space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>ACHIEVEMENT</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">6–Day Streak!</h3>
            <p className="text-xs text-slate-300">
              Maintaining momentum in Database Systems.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-900 border border-blue-400/30 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              VIEW PROGRESS LOG
            </button>
          </div>
        </div>

        {/* Card 2: Goal Exam Readiness */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Goal: Exam Readiness</h3>
            <p className="text-xs text-slate-500">
              Target Score: 85%. Current: 64%.
            </p>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden max-w-xs">
            <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '64%' }} />
          </div>
        </div>

        {/* Card 3: Platform Guide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            PLATFORM GUIDE
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>Heatmap shows strong and weak lessons at a glance.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>Trend shows improvement over time via line charts.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>Weak topics link to targeted practice sessions.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <span>ICT LEARNING PLATFORM · PERFORMANCE ANALYTICS V2.4.0</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600">Analytics Guide</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Platform Status</a>
        </div>
      </div>
    </div>
  );
};
