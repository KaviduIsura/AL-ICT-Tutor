import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Check, 
  ChevronDown, 
  Info, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface GlossaryTerm {
  id: string;
  termSi: string;
  termEn: string;
  definition: string;
  unit: number;
  inFlashcards?: boolean;
}

const INITIAL_TERMS: GlossaryTerm[] = [
  {
    id: 't-1',
    termSi: 'දත්ත සාමාන්‍යකරණය',
    termEn: 'Normalization',
    definition: 'The process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing a database into two or more tables and defining relationships between them.',
    unit: 4,
    inFlashcards: false,
  },
  {
    id: 't-2',
    termSi: 'ප්‍රාථමික යතුර',
    termEn: 'Primary Key',
    definition: 'A specific choice of a minimal set of attributes that uniquely specifies a tuple in a relation. It is a unique identifier for a database record.',
    unit: 4,
    inFlashcards: false,
  },
  {
    id: 't-3',
    termSi: 'පෙරළැක්වුම',
    termEn: 'Router',
    definition: 'A networking device that forwards data packets between computer networks. Routers perform the traffic directing functions on the Internet.',
    unit: 3,
    inFlashcards: false,
  },
  {
    id: 't-4',
    termSi: 'ප්‍රොටෝකෝලය',
    termEn: 'Protocol',
    definition: 'A set of rules or procedures for transmitting data between electronic devices, such as computers.',
    unit: 3,
    inFlashcards: false,
  },
  {
    id: 't-5',
    termSi: 'බූලීය වීජ ගණිතය',
    termEn: 'Boolean Algebra',
    definition: 'A branch of algebra in which the values of the variables are the truth values true and false, usually denoted 1 and 0 respectively.',
    unit: 1,
    inFlashcards: false,
  },
  {
    id: 't-6',
    termSi: 'විදේශ යතුර',
    termEn: 'Foreign Key',
    definition: 'A field (or collection of fields) in one table that uniquely identifies a row of another table or the same table.',
    unit: 4,
    inFlashcards: true,
  },
  {
    id: 't-7',
    termSi: 'මතක ධාරිතාව',
    termEn: 'Cache Memory',
    definition: 'High-speed auxiliary memory between CPU registers and main RAM to accelerate frequent instruction fetch cycles.',
    unit: 2,
    inFlashcards: false,
  },
];

export const GlossaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const isSin = language === 'si';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('A-Z');
  const [terms, setTerms] = useState<GlossaryTerm[]>(INITIAL_TERMS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleFlashcard = (id: string) => {
    setTerms(prev => prev.map(t => t.id === id ? { ...t, inFlashcards: !t.inFlashcards } : t));
  };

  const filtered = terms.filter(t => {
    const matchesSearch = 
      t.termSi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = selectedUnit === 'all' || t.unit.toString() === selectedUnit;
    return matchesSearch && matchesUnit;
  }).sort((a, b) => {
    if (sortOrder === 'A-Z') return a.termEn.localeCompare(b.termEn);
    return b.termEn.localeCompare(a.termEn);
  });

  const pageSize = 5;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Title & Subtitle matching Visily Page 15 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
          <BookOpen className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E]">
            {isSin ? 'පාරිභාෂික ශබ්දකෝෂය (Glossary)' : 'Glossary'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isSin 
              ? 'තොරතුරු හා සන්නිවේදන තාක්ෂණ විෂය නිර්දේශයේ ද්විභාෂා පාරිභාෂික පද මාලාව.' 
              : 'Bilingual reference tool for Information and Communication Technology terminology.'}
          </p>
        </div>
      </div>

      {/* Filter Row matching Visily Page 15 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* 1. SEARCH */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              1. SEARCH SINHALA OR ENGLISH TERM
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Type term here..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 2. UNIT */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              2. UNIT
            </label>
            <div className="relative">
              <select
                value={selectedUnit}
                onChange={(e) => { setSelectedUnit(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#1E3A8A] focus:bg-white pr-9"
              >
                <option value="all">All Units</option>
                <option value="1">Unit 1: Fundamentals</option>
                <option value="2">Unit 2: Architecture</option>
                <option value="3">Unit 3: Operating Systems</option>
                <option value="4">Unit 4: Database Systems</option>
                <option value="5">Unit 5: Computer Networking</option>
                <option value="6">Unit 6: Web Development</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. ALPHABETICAL */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              3. ALPHABETICAL
            </label>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#1E3A8A] focus:bg-white pr-9"
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Table Section matching Visily Page 15 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider font-extrabold text-slate-600">
                <th className="py-3.5 px-5">SINHALA TERM</th>
                <th className="py-3.5 px-5">ENGLISH TERM</th>
                <th className="py-3.5 px-5 max-w-md">DEFINITION</th>
                <th className="py-3.5 px-4 text-center">UNIT</th>
                <th className="py-3.5 px-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 text-sm">
                    {item.termSi}
                  </td>
                  <td className="py-4 px-5 font-extrabold text-[#1E3A8A] text-sm">
                    {item.termEn}
                  </td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed max-w-md">
                    {item.definition}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                      {item.unit}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => toggleFlashcard(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        item.inFlashcards
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                      }`}
                    >
                      {item.inFlashcards ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to flashcards</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Bottom: Info & Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 border-t border-slate-100 text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Displaying {filtered.length} terms matching filters.</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 3 Cards matching Visily Page 15 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: ELEMENTS & ACTIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ELEMENTS & ACTIONS
          </h3>
          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <p className="leading-relaxed">
                Bilingual term lookup; ICT students mix languages, so both are searchable.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <p className="leading-relaxed">
                Add to flashcards creates spaced-repetition review cards for memorization.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <p className="leading-relaxed">
                Unit filters allow you to focus on terminology relevant to your current lesson.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: MASTERY INSIGHTS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              MASTERY INSIGHTS
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Total Terms Indexed</span>
                <span className="font-extrabold text-slate-900 text-sm">1,248</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Terms Mastered</span>
                <span className="font-extrabold text-emerald-600 text-sm">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Unit 4 Terms</span>
                <span className="font-extrabold text-[#1E3A8A] text-sm">85</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/planner')}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2 group"
          >
            <span>View Study Plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Card 3: STUDY TIP (Deep Navy Card) */}
        <div className="bg-[#0D1B3E] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between space-y-4">
          <BookOpen className="w-32 h-32 absolute -right-6 -bottom-6 text-white/5 pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] font-extrabold tracking-wider uppercase text-blue-300">
              STUDY TIP
            </span>
            <h4 className="text-base font-bold text-white">
              Effective Memorization
            </h4>
            <p className="text-xs text-blue-100/80 italic leading-relaxed">
              "For complex ICT concepts like Normalization, try associating the Sinhala term with its English functional definition to build deeper neural connections."
            </p>
          </div>

          <button
            onClick={() => navigate('/flashcards')}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors relative z-10"
          >
            Open Flashcard Center
          </button>
        </div>

      </div>

      {/* Page Footer matching Visily Page 15 */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span className="tracking-wide uppercase font-semibold">
          ICT LEARNING PLATFORM · GLOSSARY ENGINE V2.4.0
        </span>
        <div className="flex items-center gap-4">
          <button className="hover:text-slate-600 transition-colors">Term Submission</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">Syllabus Guide</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">Academic Ethics</button>
        </div>
      </div>

    </div>
  );
};
