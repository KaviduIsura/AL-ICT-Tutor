import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  MonitorPlay,
  GraduationCap
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('Kavidu Perera');
  const [email, setEmail] = useState('kavidu@example.com');
  const [grade, setGrade] = useState('Grade 13');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [studyLanguage, setStudyLanguage] = useState<'Sinhala' | 'English' | 'Mixed'>('English');
  const [inviteCode, setInviteCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

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
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-[#1E3A8A] px-2">
            Login
          </Link>
          <span className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1E3A8A] rounded-md shadow-xs">
            Register
          </span>
        </div>
      </header>

      {/* Main Center Floating Card matching Visily Page 03 */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Why Join Us info (5 cols) */}
          <div className="md:col-span-5 bg-white p-8 sm:p-10 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between space-y-6 text-left">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                Why join us?
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Join the most comprehensive platform designed specifically for Sri Lankan A/L students.
              </p>

              {/* Photo matching Visily */}
              <div className="w-full rounded-xl overflow-hidden shadow-xs border border-slate-100 my-5">
                <img
                  src="/images/study_group.jpg"
                  alt="Students studying collaboratively"
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Key Features list */}
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Syllabus Mastery</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Structured lessons covering the entire G.C.E. A/L ICT curriculum.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Exam Readiness</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Practice with real past papers and automated MCQ marking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Collaborative Learning</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Engage in discussions with top ICT tutors and fellow scholars.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Alert Box at bottom of left column */}
            <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-rose-800 leading-tight">
                Your data is encrypted and managed according to academic privacy standards.
              </p>
            </div>
          </div>

          {/* Right Column: Create Account Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center text-left">
            <div className="mb-5">
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Create account
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Step into a better way of learning ICT. No credit card required for basic access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Kavidu Perera"
                    required
                    className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                  />
                </div>
              </div>

              {/* Email & Grade (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      placeholder="kavidu@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade
                  </label>
                  <div className="relative flex items-center">
                    <GraduationCap className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Grade 12">Grade 12 (2027 A/L)</option>
                      <option value="Grade 13">Grade 13 (2026 A/L)</option>
                      <option value="Repeat">Repeat / Revision Candidate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-9 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-9 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferred Study Language Radio Group matching Visily */}
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Preferred Study Language
                </label>
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="studyLang"
                      value="Sinhala"
                      checked={studyLanguage === 'Sinhala'}
                      onChange={() => setStudyLanguage('Sinhala')}
                      className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span>Sinhala</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="studyLang"
                      value="English"
                      checked={studyLanguage === 'English'}
                      onChange={() => setStudyLanguage('English')}
                      className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span>English</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="studyLang"
                      value="Mixed"
                      checked={studyLanguage === 'Mixed'}
                      onChange={() => setStudyLanguage('Mixed')}
                      className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span>Mixed (English/Sinhala)</span>
                  </label>
                </div>
              </div>

              {/* Teacher invite code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teacher invite code <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="e.g. TR-NAV-2024"
                  className="w-full px-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Using an invite code allows your teacher to view your progress and assign tasks.
                </p>
              </div>

              {/* Accept Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
                  I accept the <a href="#privacy" className="text-[#1E3A8A] underline">Privacy Policy</a> & <a href="#terms" className="text-[#1E3A8A] underline">Terms of Service</a>. I confirm that I have guardian consent if I am under 18 years of age.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 flex items-center justify-center gap-2 bg-[#23458F] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>Create account</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-[#1E3A8A] hover:underline">
                Login to your account
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar matching Visily Page 03 */}
      <footer className="w-full px-6 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-200/60 bg-white">
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            SERVER STATUS: ONLINE
          </span>
          <span>PLATFORM VERSION: 2.4.0–BUILD</span>
        </div>

        <div className="flex items-center gap-5 text-[11px]">
          <a href="#help" className="hover:text-slate-600">HELP CENTER</a>
          <a href="#privacy" className="hover:text-slate-600">PRIVACY</a>
          <a href="#terms" className="hover:text-slate-600">TERMS</a>
          <a href="#req" className="hover:text-slate-600">SYSTEM REQUIREMENTS</a>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>SECURED BY</span>
          <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">SSL-AUTH</span>
          <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">AES-256</span>
        </div>
      </footer>

    </div>
  );
};
