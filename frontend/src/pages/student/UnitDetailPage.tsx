import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  ArrowRight, 
  ChevronRight, 
  ExternalLink,
  Info,
  PlayCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const UnitDetailPage: React.FC = () => {
  const { setSelectedUnitId } = useAppStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lessons' | 'ask' | 'discuss' | 'quiz' | 'past_papers'>('lessons');

  const lessons = [
    { id: '4.1', title: 'Data models', mastery: 70 },
    { id: '4.2', title: 'Normalization', mastery: 40 },
    { id: '4.3', title: 'SQL basics', mastery: 25 },
    { id: '4.4', title: 'ER diagrams', mastery: 0 },
  ];

  const starterQuestions = [
    'What is a primary key?',
    'Explain 1NF',
    'SQL SELECT syntax',
    'Relationship types',
  ];

  const keyTerms = [
    'Primary key',
    'Foreign key',
    'Normalization',
    'Relationship',
    'Attribute',
  ];

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-150">
      
      {/* Top Breadcrumb matching Visily Page 05 */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/units/4" className="hover:text-slate-800 transition-colors">
          Units
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-700">Unit 4: Database Management Systems</span>
      </div>

      {/* Unit Header Bar matching Visily Page 05 */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Unit 4: Database Systems
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">AVERAGE MASTERY</span>
                <span className="font-extrabold text-[#1E3A8A]">44%</span>
              </div>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1E3A8A]" style={{ width: '44%' }}></div>
              </div>
            </div>

            <div className="border-l border-slate-200 pl-6">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">UNITS COMPLETED</span>
              <span className="font-bold text-[#0F172A]">1 / 4 Lessons</span>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Visily Page 05 */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/chat?unit=4"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Assistant</span>
          </Link>

          <Link
            to="/chat?unit=4&mode=discuss"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Start Review</span>
          </Link>

          <Link
            to="/quiz/new?unit=4"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Full Quiz</span>
          </Link>
        </div>
      </div>

      {/* Tabs Row matching Visily Page 05 */}
      <div className="flex items-center gap-8 border-b border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 px-1">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'lessons' ? 'border-[#1E3A8A] text-[#1E3A8A]' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lessons</span>
        </button>

        <button
          onClick={() => navigate('/chat?unit=4&mode=ask')}
          className="pb-3 border-b-2 border-transparent hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask</span>
        </button>

        <button
          onClick={() => navigate('/chat?unit=4&mode=discuss')}
          className="pb-3 border-b-2 border-transparent hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Discuss</span>
        </button>

        <button
          onClick={() => navigate('/quiz/new?unit=4')}
          className="pb-3 border-b-2 border-transparent hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Quiz</span>
        </button>

        <button
          onClick={() => navigate('/past-papers')}
          className="pb-3 border-b-2 border-transparent hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Past papers</span>
        </button>
      </div>

      {/* Main Grid: Left 2/3 (Lessons) + Right 1/3 (Starters, Terms, Material) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lessons Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-[#0F172A] tracking-tight">
                Unit Lessons
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                4 Total Sessions
              </span>
            </div>

            <div className="space-y-6 divide-y divide-slate-100">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#0F172A]">{lesson.id}</span>
                      <h3 className="font-bold text-sm text-[#0F172A]">{lesson.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-36 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E3A8A]" style={{ width: `${lesson.mastery}%` }}></div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        mastery {lesson.mastery}%
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/chat?unit=4&q=${encodeURIComponent(`Explain key concepts for Unit 4 Lesson ${lesson.id} ${lesson.title}`)}`}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors shrink-0"
                  >
                    Summary
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Step Callout */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]">
                Recommended next step
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                You've shown strong results in <span className="font-semibold text-[#1E3A8A]">Data Models</span>. We suggest moving on to <span className="font-semibold text-[#1E3A8A]">Normalization</span> to maintain your 6–day learning streak.
              </p>
            </div>
          </div>
        </div>

        {/* Right 4 Columns */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Starter Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Starter questions
            </h3>
            <p className="text-xs text-slate-400">
              Unsure where to begin? Try these common queries:
            </p>

            <div className="space-y-2 pt-1">
              {starterQuestions.map((q, idx) => (
                <Link
                  key={idx}
                  to={`/chat?unit=4&q=${encodeURIComponent(q)}`}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#1E3A8A] hover:bg-blue-50/30 text-xs font-medium text-slate-700 transition-colors"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Key Terms */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Key terms
            </h3>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {keyTerms.map((term, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md"
                >
                  {term}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/glossary"
                className="w-full block py-2 text-center text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
              >
                Full Unit Glossary
              </Link>
            </div>
          </div>

          {/* 3. Study Material */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Study Material
            </h3>

            <div className="space-y-2 pt-1">
              <a
                href="#pdf"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  <span>Syllabus PDF</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="#video"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#1E3A8A]" />
                  <span>Video Summary</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
