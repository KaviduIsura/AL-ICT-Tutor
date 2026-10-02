import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Flame, 
  Globe, 
  UserCheck, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  UserCog, 
  Search,
  MessageSquare
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { role, setRole, language, setLanguage, user, sidebarCollapsed } = useAppStore();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'student') navigate('/app');
    else if (newRole === 'teacher') navigate('/teacher');
    else if (newRole === 'admin') navigate('/admin');
  };

  const getRoleBadgeStyle = (currentRole: UserRole) => {
    switch (currentRole) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'teacher':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'admin':
        return 'bg-indigo-900/60 text-indigo-300 border-indigo-700';
    }
  };

  return (
    <header className={`h-16 sticky top-0 z-30 transition-all duration-300 flex items-center justify-between px-6 border-b ${
      role === 'admin' 
        ? 'bg-[#090D16]/90 border-slate-800 backdrop-blur-md text-white' 
        : role === 'teacher'
        ? 'bg-white/95 border-teal-100 backdrop-blur-md'
        : 'bg-white/95 border-slate-200 backdrop-blur-md'
    }`}>
      {/* Search / Context bar */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className={`relative w-full ${role === 'admin' ? 'text-slate-400' : 'text-slate-500'}`}>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={
              language === 'si'
                ? 'විෂය නිර්දේශයේ ඕනෑම මාතෘකාවක්, විමසුමක් සොයන්න...'
                : 'Search units, lessons, past papers...'
            }
            className={`w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border transition-all outline-none ${
              role === 'admin'
                ? 'bg-slate-900 border-slate-700/80 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                : role === 'teacher'
                ? 'bg-teal-50/50 border-teal-200 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Streak (Student only) */}
        {role === 'student' && user?.streakDays && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{user.streakDays} {language === 'si' ? 'දින අඛණ්ඩ' : 'Days Streak'}</span>
          </div>
        )}

        {/* ROLE SWITCHER DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-xs transition-all ${getRoleBadgeStyle(role)}`}
            title="Switch demo role to preview colors"
          >
            {role === 'student' && <GraduationCap className="w-4 h-4 text-blue-600" />}
            {role === 'teacher' && <UserCheck className="w-4 h-4 text-teal-600" />}
            {role === 'admin' && <UserCog className="w-4 h-4 text-indigo-400" />}
            <span className="capitalize">{role} Theme</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {roleMenuOpen && (
            <div className={`absolute right-0 mt-2 w-52 rounded-xl shadow-xl border p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
              role === 'admin' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                භූමිකාව තෝරන්න (Change Theme)
              </div>
              <button
                onClick={() => handleRoleChange('student')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  role === 'student' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div>
                  <div className="font-semibold">Student (ශිෂ්‍ය)</div>
                  <div className="text-[10px] text-slate-500">Visily Blue Palette</div>
                </div>
              </button>

              <button
                onClick={() => handleRoleChange('teacher')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  role === 'teacher' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                <div>
                  <div className="font-semibold">Teacher (ගුරු)</div>
                  <div className="text-[10px] text-slate-500">Teal Palette</div>
                </div>
              </button>

              <button
                onClick={() => handleRoleChange('admin')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  role === 'admin' ? 'bg-indigo-950 text-indigo-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <div>
                  <div className="font-semibold">Admin (පරිපාලක)</div>
                  <div className="text-[10px] text-slate-400">Rich Dark Mode</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div className={`flex items-center p-0.5 rounded-lg border text-xs font-bold ${
          role === 'admin' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <button
            onClick={() => setLanguage('si')}
            className={`px-2 py-1 rounded-md transition-all ${
              language === 'si'
                ? role === 'admin'
                  ? 'bg-indigo-600 text-white font-bold'
                  : role === 'teacher'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-blue-600 text-white font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            සිං
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded-md transition-all ${
              language === 'en'
                ? role === 'admin'
                  ? 'bg-indigo-600 text-white font-bold'
                  : role === 'teacher'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-blue-600 text-white font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            EN
          </button>
        </div>

        {/* Notifications */}
        <button className={`p-2 rounded-xl border relative transition-colors ${
          role === 'admin' 
            ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300' 
            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
        }`}>
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
        </button>

        {/* User Profile Mini */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src={user?.avatar || '/images/avatar_default.jpg'}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold truncate max-w-[130px] leading-tight">
              {user?.name.split(' ')[0]}
            </div>
            <div className="text-[10px] text-slate-400 capitalize">
              {role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
