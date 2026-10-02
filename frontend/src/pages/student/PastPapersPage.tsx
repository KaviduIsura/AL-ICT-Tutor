import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Download, 
  Zap, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PastPapersPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();

  const [yearFilter, setYearFilter] = useState('All Years');
  const [unitFilter, setUnitFilter] = useState('All Units');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selectedPaper, setSelectedPaper] = useState('2024 Paper I / II');

  const questions = [
    { id: '2024-Q3', type: 'Structured', unit: 'Database Systems', difficulty: 'Medium', diffColor: 'text-amber-500', marks: 10 },
    { id: '2024-Q8', type: 'Essay', unit: 'Networking & Comms', difficulty: 'Hard', diffColor: 'text-rose-500', marks: 15 },
    { id: '2023-Q1', type: 'MCQ', unit: 'Data Representation', difficulty: 'Easy', diffColor: 'text-emerald-500', marks: 1 },
    { id: '2023-Q5', type: 'Structured', unit: 'Operating Systems', difficulty: 'Medium', diffColor: 'text-amber-500', marks: 8 },
    { id: '2022-Q12', type: 'Essay', unit: 'Python Programming', difficulty: 'Hard', diffColor: 'text-rose-500', marks: 20 },
  ];

  const years = [
    '2024 Paper I / II',
    '2023 Paper I / II',
    '2022 Paper I / II',
    '2021 Paper I / II',
    '2020 Paper I / II',
    '2019 Paper I / II',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">Past Papers Repository</h1>
        <p className="text-sm text-slate-500 mt-1">
          Access G.C.E. A/L ICT papers from 2011 to 2024. Analyze trends and attempt structured questions.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 min-w-[140px]"
        >
          <option>All Years</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>

        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 min-w-[140px]"
        >
          <option>All Units</option>
          <option>Unit 1: Fundamentals</option>
          <option>Unit 2: Architecture</option>
          <option>Unit 3: Operating Systems</option>
          <option>Unit 4: Database Systems</option>
          <option>Unit 5: Networking</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 min-w-[140px]"
        >
          <option>All Types</option>
          <option>MCQ</option>
          <option>Structured</option>
          <option>Essay</option>
        </select>

        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Filter Results</span>
        </button>
      </div>

      {/* Grid: Papers List & Unit Frequency Trends (Visily Page 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: 1 Papers */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900">Papers</h2>
          </div>

          <div className="space-y-1">
            {years.map((p) => {
              const isSelected = selectedPaper === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPaper(p)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/50 text-blue-900 shadow-xs' 
                      : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{p}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Card: 2 Unit Frequency Trends */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-slate-900">Unit Frequency Trends</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              QUESTIONS PER UNIT BY YEAR
            </span>
          </div>

          {/* Grouped Bar Chart Visual */}
          <div className="h-48 border-b border-slate-100 flex items-end justify-between px-6 pt-6 pb-2">
            {[
              { year: '2020', bars: [45, 65, 55, 80] },
              { year: '2021', bars: [50, 70, 45, 70] },
              { year: '2022', bars: [60, 50, 65, 85] },
              { year: '2023', bars: [52, 78, 50, 60] },
              { year: '2024', bars: [68, 55, 75, 95] },
            ].map((group) => (
              <div key={group.year} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-36">
                  {/* Database (navy) */}
                  <div className="w-3 rounded-t bg-[#1E3A8A]" style={{ height: `${group.bars[0]}%` }} />
                  {/* Networking (red) */}
                  <div className="w-3 rounded-t bg-[#EF4444]" style={{ height: `${group.bars[1]}%` }} />
                  {/* Architecture (blue) */}
                  <div className="w-3 rounded-t bg-[#60A5FA]" style={{ height: `${group.bars[2]}%` }} />
                  {/* Programming (peach) */}
                  <div className="w-3 rounded-t bg-[#FCA5A5]" style={{ height: `${group.bars[3]}%` }} />
                </div>
                <span className="text-[11px] font-bold text-slate-600">{group.year}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
              <span>Database</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span>Networking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" />
              <span>Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCA5A5]" />
              <span>Programming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Question Repository */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Question Repository</h2>
            <p className="text-xs text-slate-500">
              Detailed breakdown of available questions across all selected years.
            </p>
          </div>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Q-ID</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Unit / Lesson</th>
                <th className="py-3 px-3">Difficulty</th>
                <th className="py-3 px-3">Marks</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-blue-700 font-mono">
                    {q.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px]">
                      {q.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">
                    {q.unit}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className={`text-base leading-none ${q.diffColor}`}>●</span>
                      <span className="text-slate-700">{q.difficulty}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {q.marks}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => navigate('/quiz/run')}
                      className="px-3 py-1.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                    >
                      <Zap className="w-3 h-3 fill-white" />
                      <span>Attempt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span>Total available questions match the current filter: 42</span>
          <div className="flex items-center gap-2 font-medium">
            <span className="cursor-pointer hover:text-slate-800">Previous</span>
            <span className="w-6 h-6 rounded bg-[#1E3A8A] text-white flex items-center justify-center font-bold">1</span>
            <span className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center cursor-pointer">2</span>
            <span className="cursor-pointer hover:text-slate-800">Next</span>
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards (Visily Page 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Exam Strategy (Dark Navy #0B132B) */}
        <div className="bg-[#0B132B] rounded-2xl p-6 text-white space-y-4 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h3 className="text-amber-400 text-base font-extrabold">Exam Strategy</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trend analysis shows that <strong className="text-white font-bold">Database Normalization</strong> and <strong className="text-white font-bold">Subnetting</strong> have appeared in 90% of the papers since 2018. Focus on these for high weightage.
            </p>
          </div>

          <button
            type="button"
            className="relative z-10 px-4 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-900 border border-blue-500/30 text-white font-bold text-xs transition-colors"
          >
            View Comprehensive Analysis
          </button>
        </div>

        {/* Right Card: Platform Guide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            PLATFORM GUIDE
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>Browse by year, unit, and question type using the centralized filter bar.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>Frequency chart highlights which units appear most frequently in recent papers.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>Attempting a question opens the practice environment with a simulated marking scheme.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <span>ICT LEARNING PLATFORM · PAPER ENGINE V3.4</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600">Marking Scheme Help</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Syllabus Mapping</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-600">Academic Ethics</a>
        </div>
      </div>
    </div>
  );
};
