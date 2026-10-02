import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  MessageSquare,
  Trophy,
  History,
  TrendingUp,
  AlertCircle,
  CreditCard,
  Calendar,
  Settings,
  HelpCircle,
  UploadCloud,
  CheckSquare,
  Award,
  Users,
  Terminal,
  Activity,
  Sliders,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const { role, sidebarCollapsed, toggleSidebar, logout } = useAppStore();

  // Navigation Items matching Visily Page 04 & 15
  const studentNav = [
    { to: '/app', label: 'Dashboard', icon: LayoutGrid },
    { to: '/units/4', label: 'Units', icon: BookOpen },
    { to: '/chat', label: 'Ask / Discuss', icon: MessageSquare },
    { to: '/quiz/new', label: 'Quizzes', icon: Trophy },
    { to: '/past-papers', label: 'Past Papers', icon: History },
    { to: '/progress', label: 'Progress', icon: TrendingUp },
    { to: '/mistakes', label: 'Mistakes', icon: AlertCircle },
    { to: '/flashcards', label: 'Flashcards', icon: CreditCard },
    { to: '/glossary', label: 'Glossary', icon: BookOpen },
    { to: '/planner', label: 'Study Planner', icon: Calendar },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/help', label: 'Help', icon: HelpCircle },
  ];

  // Teacher navigation matching Visily Page 17 & 18
  const teacherNav = [
    { to: '/teacher', label: 'Dashboard', icon: LayoutGrid },
    { to: '/teacher/content', label: 'Content Upload', icon: UploadCloud },
    { to: '/teacher/review', label: 'Review Queue', icon: CheckSquare, badge: '14' },
    { to: '/teacher/marks', label: 'Mark Override', icon: Award },
    { to: '/teacher/classes', label: 'Classes', icon: Layers },
    { to: '/teacher/analytics', label: 'Analytics', icon: TrendingUp },
    { to: '/teacher/roster', label: 'Student Reports', icon: Users },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/help', label: 'Help', icon: HelpCircle },
  ];

  // Admin navigation matching Visily & Wireframes
  const adminNav = [
    { to: '/admin', label: 'Overview', icon: LayoutGrid },
    { to: '/admin/users', label: 'User Directory', icon: Users },
    { to: '/admin/curriculum', label: 'Curriculum RAG', icon: Layers },
    { to: '/admin/prompts', label: 'Prompt Versions', icon: Terminal, badge: 'v2.1' },
    { to: '/admin/quality', label: 'Triad Quality', icon: Activity },
    { to: '/admin/settings', label: 'System Settings', icon: Sliders },
    { to: '/admin/audit', label: 'Audit Logs', icon: ShieldCheck },
  ];

  const activeNav = role === 'student' ? studentNav : role === 'teacher' ? teacherNav : adminNav;

  // Sidebar styling per role
  const sidebarStyles = {
    student: {
      bg: 'bg-[#0D1B3E]',
      border: 'border-[#172554]',
      activeTab: 'bg-[#1E3A8A] text-white font-semibold',
      hoverTab: 'text-slate-300 hover:bg-[#1E293B] hover:text-white',
      badgeBg: 'bg-blue-500 text-white',
    },
    teacher: {
      bg: 'bg-[#062D2C]',
      border: 'border-teal-900',
      activeTab: 'bg-[#0D9488] text-white font-semibold',
      hoverTab: 'text-teal-100 hover:bg-teal-900/60 hover:text-white',
      badgeBg: 'bg-amber-500 text-slate-900 font-bold',
    },
    admin: {
      bg: 'bg-[#070A11]',
      border: 'border-slate-800',
      activeTab: 'bg-indigo-600 text-white font-semibold border-l-2 border-emerald-400',
      hoverTab: 'text-slate-400 hover:bg-slate-900 hover:text-white',
      badgeBg: 'bg-emerald-500 text-black font-bold',
    },
  }[role];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 flex flex-col ${
        sidebarStyles.bg
      } border-r ${sidebarStyles.border} ${
        sidebarCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className={`w-8 h-8 rounded-lg ${role === 'teacher' ? 'bg-[#0D9488]' : role === 'admin' ? 'bg-indigo-600' : 'bg-[#1E3A8A]'} flex items-center justify-center text-white shrink-0 shadow-xs`}>
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight truncate">
              ICT Learning Platform
            </span>
          </div>
        )}

        {sidebarCollapsed && (
          <div className={`w-8 h-8 mx-auto rounded-lg ${role === 'teacher' ? 'bg-[#0D9488]' : role === 'admin' ? 'bg-indigo-600' : 'bg-[#1E3A8A]'} flex items-center justify-center text-white`}>
            <BookOpen className="w-4 h-4" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors hidden lg:block"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List matching Visily */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1">
        {activeNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-[13px] transition-all duration-150 ${
                  isActive ? sidebarStyles.activeTab : sidebarStyles.hoverTab
                }`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              {!sidebarCollapsed && (
                <span className="truncate flex-1 font-medium">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sidebarStyles.badgeBg}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Footer Area - Status Card matching Visily Pages 04, 15, 17 */}
      {!sidebarCollapsed && role === 'student' && (
        <div className="p-3 mx-2.5 mb-2 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              CURRENT FOCUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <Link
            to="/units/4"
            className="flex items-center justify-between text-xs font-bold text-white mt-1 hover:text-blue-300 transition-colors"
          >
            <span>Unit 4: Databases</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </Link>
        </div>
      )}

      {!sidebarCollapsed && role === 'teacher' && (
        <div className="p-3 mx-2.5 mb-2 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
              PLATFORM STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[11px] text-teal-100/80 leading-snug">
            Syllabus intake active. 14 chunks pending review.
          </p>
        </div>
      )}

      {!sidebarCollapsed && role === 'admin' && (
        <div className="p-3 mx-2.5 mb-2 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
              SYSTEM HEALTH
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            All RAG pipelines operational. Latency 1.2s.
          </p>
        </div>
      )}

      {/* Logout button */}
      <div className="p-2.5 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};
