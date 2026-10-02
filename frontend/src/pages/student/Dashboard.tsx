import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Search, 
  BookOpen, 
  ArrowRight,
  TrendingDown,
  FileText,
  MessageSquare,
  Lock
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const StudentDashboard: React.FC = () => {
  const { user } = useAppStore();
  const [askQuery, setAskQuery] = useState('');
  const navigate = useNavigate();

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(askQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-150">
      
      {/* TOP ROW: Welcome Banner + Today Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Welcome Back Card - 8 Cols */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-md">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Welcome back, {user?.name?.split(' ')[0] || 'Kavidu'}!
              </h1>
              <p className="text-sm text-slate-500 font-normal">
                You've covered <span className="font-bold text-[#1E3A8A]">64%</span> of the ICT syllabus. Keep the momentum!
              </p>
              
              <div className="pt-2">
                <Link
                  to="/units/4"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs transition-colors"
                >
                  <span>Resume: Unit 4 › Normalization</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Illustration Graphic matching Visily Page 4 */}
            <div className="w-36 h-36 shrink-0 rounded-xl overflow-hidden self-center sm:self-auto">
              <img
                src="/images/celebration.jpg"
                alt="Student studying with high achievement"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Today Card - 4 Cols */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
            <Clock className="w-4 h-4" />
            <span>Today</span>
          </div>

          <div className="space-y-4 my-auto pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Flashcards due</span>
              <span className="font-extrabold text-base text-[#0F172A]">12</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Mistakes to revise</span>
              <span className="font-extrabold text-base text-[#0F172A]">5</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Current Streak</span>
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Hot
                </span>
              </div>
              <span className="font-extrabold text-base text-rose-600">6 days</span>
            </div>
          </div>
        </div>

      </div>

      {/* SYLLABUS-WIDE SEARCH BAR */}
      <form onSubmit={handleAskSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={askQuery}
            onChange={(e) => setAskQuery(e.target.value)}
            placeholder="Ask anything about the whole syllabus... (e.g., Explain 1NF with an example)"
            className="w-full pl-11 pr-28 py-3.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-xs"
          >
            Ask Tutor
          </button>
        </div>
      </form>

      {/* UNIT PROGRESS SECTION - Visily Page 4 exact */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
            <h2 className="text-base font-extrabold text-[#0F172A] tracking-tight">
              Unit Progress
            </h2>
          </div>
          <Link
            to="/units/4"
            className="text-xs font-semibold text-[#1E3A8A] hover:underline"
          >
            View all units +
          </Link>
        </div>

        {/* 4 Unit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Unit 1 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">UNIT 1</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Core</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] truncate">Data Representation</h3>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-400 uppercase font-bold">MASTERY</span>
                  <span className="font-extrabold text-slate-700">72%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <Link to="/chat?unit=1" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Ask
              </Link>
              <Link to="/chat?unit=1&mode=discuss" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Discuss
              </Link>
              <Link to="/quiz/new?unit=1" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Quiz
              </Link>
            </div>
          </div>

          {/* Unit 2 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">UNIT 2</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Core</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] truncate">Computer Architecture</h3>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-400 uppercase font-bold">MASTERY</span>
                  <span className="font-extrabold text-slate-700">58%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <Link to="/chat?unit=2" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Ask
              </Link>
              <Link to="/chat?unit=2&mode=discuss" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Discuss
              </Link>
              <Link to="/quiz/new?unit=2" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Quiz
              </Link>
            </div>
          </div>

          {/* Unit 3 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">UNIT 3</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Core</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] truncate">Operating Systems</h3>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-400 uppercase font-bold">MASTERY</span>
                  <span className="font-extrabold text-slate-700">81%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <Link to="/chat?unit=3" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Ask
              </Link>
              <Link to="/chat?unit=3&mode=discuss" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Discuss
              </Link>
              <Link to="/quiz/new?unit=3" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Quiz
              </Link>
            </div>
          </div>

          {/* Unit 4 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">UNIT 4</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Core</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] truncate">Database Systems</h3>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-400 uppercase font-bold">MASTERY</span>
                  <span className="font-extrabold text-slate-700">44%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '44%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <Link to="/chat?unit=4" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Ask
              </Link>
              <Link to="/chat?unit=4&mode=discuss" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Discuss
              </Link>
              <Link to="/quiz/new?unit=4" className="text-center py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded">
                Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM 3 COLUMNS: Weak Topics, Assignments, Recent Chats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Column 1: Weak Topics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm mb-1">
              <TrendingDown className="w-4 h-4" />
              <span>Weak Topics</span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Focus on these to boost your grade
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">SQL Joins</span>
                  <span className="text-rose-600 font-bold">38% Mastery</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A]" style={{ width: '38%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Subnetting</span>
                  <span className="text-rose-600 font-bold">41% Mastery</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A]" style={{ width: '41%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Boolean Algebra</span>
                  <span className="text-rose-600 font-bold">45% Mastery</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A8A]" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              to="/mistakes"
              className="w-full block py-2.5 text-center text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50/50 border border-rose-200 rounded-lg transition-colors"
            >
              Practise Weak Areas
            </Link>
          </div>
        </div>

        {/* Column 2: Assignments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm mb-1">
              <FileText className="w-4 h-4 text-[#1E3A8A]" />
              <span>Assignments</span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Pending tasks from your teacher
            </p>

            <div className="space-y-3">
              {/* Task 1 */}
              <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#0F172A]">Networking Quiz</h4>
                  <p className="text-[11px] text-slate-500">Due Friday, 11:59 PM</p>
                </div>
                <Link
                  to="/quiz/new?unit=5"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors"
                >
                  Start
                </Link>
              </div>

              {/* Task 2 */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-600">Database Design Lab</h4>
                  <p className="text-[11px] text-slate-400">Due next Monday</p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-400 bg-white border border-slate-200 rounded-lg">
                  <Lock className="w-3 h-3" />
                  Locked
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Recent Chats */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-rose-500 font-bold text-sm mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Recent Chats</span>
            </div>

            <div className="space-y-3 mt-4">
              <Link to="/chat?q=Normalization+Forms" className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-bold text-[#0F172A]">Normalization Forms</span>
                  <span className="text-[10px] text-slate-400">2m ago</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Kavidu: Let's review the 3rd normal form...
                </p>
              </Link>

              <Link to="/chat?q=TCP+vs+UDP+Protocols" className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-bold text-[#0F172A]">TCP vs UDP Protocols</span>
                  <span className="text-[10px] text-slate-400">1h ago</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Ama: Let's review the 3rd normal form...
                </p>
              </Link>

              <Link to="/chat?q=Python+Loop+Logic" className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-bold text-[#0F172A]">Python Loop Logic</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Tutor Sam: Let's review the 3rd normal form.
                </p>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/chat"
              className="text-xs font-semibold text-[#1E3A8A] hover:underline"
            >
              Open Chat Center
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER METADATA - Visily Page 4 exact */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 border-t border-slate-200/60 gap-3">
        <div>ICT LEARNING PLATFORM · STUDENT PORTAL V2.4.0</div>
        <div className="flex items-center gap-6">
          <a href="#report" className="hover:text-slate-600">Report a Bug</a>
          <a href="#syllabus" className="hover:text-slate-600">Syllabus Guide</a>
          <a href="#support" className="hover:text-slate-600">Platform Support</a>
        </div>
      </div>

    </div>
  );
};
