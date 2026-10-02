import React from 'react';
import { Settings, User, Bell, Globe, Palette, Save, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { UserRole } from '../../types';

export const SettingsPage: React.FC = () => {
  const { role, setRole, language, setLanguage, user } = useAppStore();
  const isSin = language === 'si';

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isSin ? 'පද්ධති සැකසුම් (Settings)' : 'Profile & App Settings'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isSin ? 'ඔබගේ පුද්ගලික ගිණුම් විස්තර, භූමිකාව සහ අතුරුමුහුණත් වර්ණ තෝරන්න.' : 'Manage profile, role color themes, and notification preferences.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Profile Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Profile Details</span>
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || '/images/avatar_default.jpg'}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-xs"
            />
            <div>
              <div className="font-bold text-base text-slate-900">{user?.name}</div>
              <div className="text-xs text-slate-500">{user?.email}</div>
              <div className="text-[11px] text-blue-600 font-semibold mt-0.5">{user?.school}</div>
            </div>
          </div>
        </div>

        {/* Role Theme Palette Selector */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600" />
            <span>{isSin ? 'භූමිකා තේමා වර්ණ (Role Theme Switcher)' : 'Active Role & Theme Palette'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setRole('student')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                role === 'student'
                  ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-900">Student Theme</span>
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              </div>
              <p className="text-[11px] text-slate-500">Deep Navy & Slate Light</p>
            </button>

            <button
              onClick={() => setRole('teacher')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                role === 'teacher'
                  ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-teal-900">Teacher Theme</span>
                <span className="w-3 h-3 rounded-full bg-teal-600"></span>
              </div>
              <p className="text-[11px] text-slate-500">Emerald & Teal Accents</p>
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                role === 'admin'
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Admin Theme</span>
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              </div>
              <p className="text-[11px] text-slate-400">Rich Dark Glassmorphism</p>
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{isSin ? 'භාෂා මනාපය (Language)' : 'Default Interface Language'}</span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage('si')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                language === 'si'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              සිංහල (Sinhala)
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              English Medium
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
