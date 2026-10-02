import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  RotateCcw, 
  ChevronRight,
  MonitorPlay,
  KeyRound
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-left">
      
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
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-[#1E3A8A] px-2">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-md transition-colors shadow-xs"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Header Section matching Visily Page 06 */}
        <div className="space-y-2">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-[#EA580C] bg-orange-50 border border-orange-200">
            SECURITY PORTAL
          </span>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Account Recovery & Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Follow these steps to restore access to your ICT Learning Platform account. Our multi-layered verification ensures your syllabus progress remains secure.
          </p>
        </div>

        {/* 3 Step Cards Grid matching Visily Page 06 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Forgot Password */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  Forgot password
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Enter your email and we'll send you a recovery link.
              </p>

              <div className="pt-2">
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
                    className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep1Done(true)}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-[#23458F] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>Send reset link</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Set New Password */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  Set new password
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Create a secure password with at least 8 characters.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep2Done(true)}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-[#23458F] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>Save new password</span>
                <KeyRound className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>SECURITY CHECK: All sessions will be logged out upon update.</span>
            </div>
          </div>

          {/* Card 3: Verify Email */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  Verify email
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Confirm your identity to finalize account changes.
              </p>

              {/* Sent Callout Box */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A]">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Verification link sent</span>
                </div>
                <p className="text-[11px] text-slate-600 pl-6">
                  We sent a link to <span className="font-semibold text-slate-800">you@mail.com</span>. Please check your inbox and spam folder.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className="py-2 px-3 border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Resend</span>
                </button>
                <button
                  type="button"
                  className="py-2 px-3 border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg transition-colors"
                >
                  Change email
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Link expires in 15 mins</span>
              <a href="#help" className="text-[#1E3A8A] font-semibold hover:underline flex items-center gap-0.5">
                <span>Need help?</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Security Guidelines + Having trouble? Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          
          {/* Left: Security Guidelines (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <h3 className="text-base font-extrabold text-[#0F172A]">
              Security Guidelines
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    Encrypted Sessions
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    All password resets are handled via secure, end-to-end encrypted tokens that expire after a set time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    Multi-Factor Readiness
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Verification links match your registered device profile for added protection against unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Having Trouble? Box (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl border-2 border-dashed border-blue-200 bg-white text-center space-y-4">
            <h3 className="text-base font-extrabold text-[#0F172A]">
              Having trouble?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Our academic support team is available 24/7 to help you restore access to your learning materials.
            </p>

            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href="#contact"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs transition-colors"
              >
                Contact Support
              </a>
              <a
                href="#faqs"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
              >
                View FAQs
              </a>
            </div>

            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pt-2">
              RESPONSE TIME: UNDER 15 MINUTES
            </div>
          </div>

        </div>

      </main>

      {/* Footer matching Visily Page 06 */}
      <footer className="w-full px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 border-t border-slate-200 bg-white gap-2">
        <div>© 2026 ICT Learning Platform. Secure Auth Module v2.4</div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-slate-600">Privacy & Terms</Link>
          <a href="#guardian" className="hover:text-slate-600">Guardian Consent</a>
          <a href="#status" className="hover:text-slate-600">System Status</a>
        </div>
      </footer>

    </div>
  );
};
