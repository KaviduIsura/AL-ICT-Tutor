import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Database, 
  Code2, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Lock,
  MessageSquare,
  FileSpreadsheet,
  MonitorPlay,
  UserCheck,
  Compass,
  MessagesSquare,
  Award
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      <Navbar />

      {/* HERO SECTION - Visily Page 1 exact */}
      <section className="pt-16 pb-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-semibold uppercase tracking-wider">
                SYLLABUS–GROUNDED LEARNING
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0F172A] leading-[1.12]">
                Master A/L ICT with <br />
                Precision and Clarity
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                The comprehensive platform for Advanced Level students to excel in Information & Communication Technology. Access structured lessons, practice real-world coding, and join a community of scholars.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
                >
                  Login to Portal
                </Link>
              </div>

              {/* Checkmark Bullets */}
              <div className="flex items-center gap-6 pt-3 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Unit-wise content</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Exam-style quizzes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image matching Visily */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <img
                  src="/images/coding_hero.jpg"
                  alt="Student mastering A/L ICT at computer"
                  className="w-full h-auto object-cover max-h-[360px]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - Visily Page 1 exact */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            How it works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Four simple steps to transform your ICT knowledge from theory to mastery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <UserCheck className="w-10 h-10 text-[#1E3A8A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">1. Sign up</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Create your academic profile to track your syllabus progress.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Compass className="w-10 h-10 text-[#1E3A8A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">2. Pick a unit</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Choose from Database Systems, Networking, or Programming units.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <MessagesSquare className="w-10 h-10 text-[#1E3A8A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">3. Ask or Discuss</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Engage with peers and tutors to clarify complex ICT concepts.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Award className="w-10 h-10 text-[#1E3A8A]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">4. Practise & review</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Take timed quizzes and review past papers with detailed marking schemes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS PLATFORM SECTION - Visily Page 1 exact */}
      <section id="features" className="py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C]">
                WHY THIS PLATFORM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1.5 tracking-tight">
                Designed for Academic Excellence
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Unlike generic tutorials, our platform is built specifically for the A/L ICT curriculum requirements, ensuring every minute you spend is relevant to your exams.
              </p>
            </div>
            <a
              href="#syllabus"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:underline shrink-0"
            >
              <span>Explore all features</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Syllabus-based answers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                All answers are verified against the national curriculum guidelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Unit or whole syllabus
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Study deep into specific modules or take a full-scale mock exam.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                MCQ · Structured · Essay
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Practice every question format found in the national papers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Track weak topics
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Our AI identifies areas where you need more focus and practice.
              </p>
            </div>
          </div>

          {/* 3 Audience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* For Students */}
            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">
                  For students
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Join thousands of students who are already using our platform to boost their ICT grades.
                </p>
              </div>
              <Link
                to="/register"
                className="mt-6 inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors text-center"
              >
                Register as Student
              </Link>
            </div>

            {/* For Teachers */}
            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">
                  For teachers
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Manage your classes, assign quizzes, and monitor student progress in real-time.
                </p>
              </div>
              <Link
                to="/teacher"
                className="mt-6 inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors text-center"
              >
                Request Teacher Access
              </Link>
            </div>

            {/* Safe & Private */}
            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">
                  Safe & Private
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  We prioritize student data privacy and maintain a secure environment for all users.
                </p>
              </div>
              <a
                href="#privacy"
                className="mt-6 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors text-center"
              >
                Learn about Privacy
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CORE MODULES COVERED - Visily Page 1 Dark Navy Section exact */}
      <section id="syllabus" className="py-20 bg-[#0B132B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Core Modules Covered
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Our content is meticulously organized following the G.C.E. A/L ICT Syllabus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Data Communication */}
            <div className="bg-[#111C44]/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 text-blue-400 flex items-center justify-center mb-4">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-6">
                  Data Communication
                </h3>
              </div>
              <Link
                to="/units/5"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-slate-700 rounded-lg transition-colors text-center"
              >
                View Module
              </Link>
            </div>

            {/* Card 2: Database Management */}
            <div className="bg-[#111C44]/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 text-blue-400 flex items-center justify-center mb-4">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-6">
                  Database Management
                </h3>
              </div>
              <Link
                to="/units/4"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-slate-700 rounded-lg transition-colors text-center"
              >
                Explore DB
              </Link>
            </div>

            {/* Card 3: Programming (Python) */}
            <div className="bg-[#111C44]/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 text-blue-400 flex items-center justify-center mb-4">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-6">
                  Programming (Python)
                </h3>
              </div>
              <Link
                to="/units/8"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-slate-700 rounded-lg transition-colors text-center"
              >
                Try Demo
              </Link>
            </div>

            {/* Card 4: Systems Analysis */}
            <div className="bg-[#111C44]/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 text-blue-400 flex items-center justify-center mb-4">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-6">
                  Systems Analysis
                </h3>
              </div>
              <Link
                to="/units/6"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-slate-700 rounded-lg transition-colors text-center"
              >
                Read Summary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Visily Page 1 exact */}
      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white">
              <MonitorPlay className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="font-bold text-base text-[#0F172A]">
              ICT Learning Platform
            </span>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-500">
            <a href="#how-it-works" className="hover:text-[#1E3A8A] transition-colors">How it works</a>
            <a href="#features" className="hover:text-[#1E3A8A] transition-colors">Features</a>
            <Link to="/teacher" className="hover:text-[#1E3A8A] transition-colors">For teachers</Link>
            <a href="#help" className="hover:text-[#1E3A8A] transition-colors">Help</a>
          </div>

          {/* Right Copyright */}
          <div className="text-xs text-slate-400">
            © 2026 ICT Learning Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
