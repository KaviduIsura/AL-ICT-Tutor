import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Globe, MonitorPlay } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('kavidu@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'student');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans">
      
      {/* Top Navbar matching Visily */}
      <header className="w-full bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white">
            <MonitorPlay className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="font-bold text-lg text-[#0F172A]">
            ICT Learning Platform
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-600">
          <Link to="/#how-it-works" className="hover:text-[#1E3A8A] transition-colors">How it works</Link>
          <Link to="/#features" className="hover:text-[#1E3A8A] transition-colors">Features</Link>
          <Link to="/teacher" className="hover:text-[#1E3A8A] transition-colors">For teachers</Link>
          <Link to="/help" className="hover:text-[#1E3A8A] transition-colors">Help</Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 px-2">Login</span>
          <Link
            to="/register"
            className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-md transition-colors shadow-xs"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Main Center Floating Card matching Visily Page 02 */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Graphic & Mastery Info (5 cols) */}
          <div className="md:col-span-5 bg-white p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/images/celebration.jpg"
                alt="Track Your Mastery"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                Track Your Mastery
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                Every session brings you closer to your goals. Log in to resume your A/L ICT syllabus journey.
              </p>
            </div>

            <div className="space-y-2.5 text-left text-xs text-slate-700 w-full max-w-[260px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Unit-by-unit progress tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Exam-style practice sets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center text-left">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                />
                <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 flex items-center justify-center gap-2 bg-[#23458F] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-3 bg-white text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  OR CONTINUE WITH
                </span>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => {
                  login('kavidu@example.com', 'student');
                  navigate('/app');
                }}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 rounded-lg shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.28-2.09 3.66-5.17 3.66-9.14z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.28 21.43 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.28 2.57 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Footer signup link */}
            <p className="mt-6 text-center text-xs text-slate-500">
              New to the platform?{' '}
              <Link to="/register" className="font-semibold text-[#1E3A8A] hover:underline">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar matching Visily Page 02 */}
      <footer className="w-full px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-200/60">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Available in English & Sinhala</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          <a href="#terms" className="hover:text-slate-600">Terms of Service</a>
          <a href="#support" className="hover:text-slate-600">Support</a>
        </div>
      </footer>

    </div>
  );
};
