import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MonitorPlay, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const { language, setLanguage, role, setRole } = useAppStore();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Visily exact: [Monitor Icon] ICT Learning Platform */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#172554] transition-colors">
            <MonitorPlay className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#0F172A]">
            ICT Learning Platform
          </span>
        </Link>

        {/* Center Navigation Links - Visily exact: How it works, Features, For teachers, Help */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-600">
          <a 
            href="#how-it-works" 
            className="transition-colors hover:text-[#1E3A8A]"
          >
            How it works
          </a>
          <a 
            href="#features" 
            className="transition-colors hover:text-[#1E3A8A]"
          >
            Features
          </a>
          <Link 
            to="/teacher" 
            className="transition-colors hover:text-[#1E3A8A]"
          >
            For teachers
          </Link>
          <a 
            href="#help" 
            className="transition-colors hover:text-[#1E3A8A]"
          >
            Help
          </a>
        </nav>

        {/* Right Actions: Optional discreet language pill, Login text button, Register solid navy button */}
        <div className="flex items-center gap-4">
          {/* Quick Language Toggle */}
          <div className="hidden sm:flex items-center text-xs font-semibold bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-white text-[#1E3A8A] shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('si')}
              className={`px-2 py-0.5 rounded ${language === 'si' ? 'bg-white text-[#1E3A8A] shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              SI
            </button>
          </div>

          {/* Login text button */}
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-[#1E3A8A] transition-colors px-2 py-1.5"
          >
            Login
          </Link>

          {/* Register solid navy button */}
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-md shadow-xs transition-colors"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
};

