import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Eye, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  Info 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface DocItem {
  id: string;
  title: string;
  type: string;
  unit: string;
  status: 'Ready' | 'Processing...' | 'Failed';
  chunks: string;
}

const INITIAL_DOCS: DocItem[] = [
  { id: '1', title: 'Unit 4 notes', type: 'Notes', unit: '4', status: 'Ready', chunks: '42' },
  { id: '2', title: '2023 Paper II', type: 'Past paper', unit: '-', status: 'Processing...', chunks: '-' },
  { id: '3', title: 'Scan 07', type: 'Notes', unit: '3', status: 'Failed', chunks: '-' },
  { id: '4', title: 'Networking Intro', type: 'Video Transcript', unit: '5', status: 'Ready', chunks: '18' },
  { id: '5', title: 'AL 2024 Prep', type: 'Mock Paper', unit: 'All', status: 'Ready', chunks: '56' },
];

export const ContentUploadPage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS);
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('Notes');
  const [year, setYear] = useState('2024');
  const [unit, setUnit] = useState('4');
  const [lesson, setLesson] = useState('2');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocItem = {
        id: Date.now().toString(),
        title: title,
        type: docType,
        unit: unit,
        status: 'Processing...',
        chunks: '-',
      };
      setDocs([newDoc, ...docs]);
      setTitle('');
      setSelectedFile(null);
      setIsUploading(false);

      // Simulate completed processing after 3 seconds
      setTimeout(() => {
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'Ready', chunks: '36' } : d));
      }, 3000);
    }, 1200);
  };

  const handleRetry = (id: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'Processing...' } : d));
    setTimeout(() => {
      setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'Ready', chunks: '28' } : d));
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      
      {/* Breadcrumb & Title matching Visily Page 18 */}
      <div className="space-y-1">
        <div className="text-xs font-semibold text-slate-400">
          Teacher &gt; Content Upload &amp; Ingestion
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062D2C]">
          Content Upload &amp; Ingestion
        </h1>
      </div>

      {/* Top Row: 1 Upload & Tagging (Left) and 2 Ingestion Rules (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 1 Upload & Tagging */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
              1
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Upload &amp; Tagging
            </h2>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            {/* Drag & Drop Zone matching Visily Page 18 */}
            <div 
              onClick={() => setSelectedFile('unit_04_normalization_advanced.pdf')}
              className="border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-2xl p-8 sm:p-10 text-center bg-slate-50/50 hover:bg-teal-50/20 transition-all cursor-pointer space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-slate-900">
                  {selectedFile || 'Drop PDF / notes / past paper here'}
                </div>
                <div className="text-xs text-slate-400">
                  or click to browse from your computer
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                  PDF
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                  DOCX
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                  MAX 20MB
                </span>
              </div>
            </div>

            {/* TITLE Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter material title (e.g., Unit 4 normalization notes)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
              />
            </div>

            {/* 4 Metadata Dropdowns Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* TYPE */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  TYPE
                </label>
                <div className="relative">
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-600 focus:bg-white pr-8"
                  >
                    <option value="Notes">Notes</option>
                    <option value="Past paper">Past paper</option>
                    <option value="Mock Paper">Mock Paper</option>
                    <option value="Video Transcript">Video Transcript</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* YEAR */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  YEAR
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-600 focus:bg-white pr-8"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* UNIT */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  UNIT
                </label>
                <div className="relative">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-600 focus:bg-white pr-8"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="All">All</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* LESSON */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  LESSON
                </label>
                <div className="relative">
                  <select
                    value={lesson}
                    onChange={(e) => setLesson(e.target.value)}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-600 focus:bg-white pr-8"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="All">All</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Upload Button matching Visily Page 18 */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 rounded-xl bg-[#0D1B3E] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <span>+ Upload &amp; Process</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: 2 Ingestion Rules */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
                2
              </span>
              <h2 className="text-base font-extrabold text-slate-900">
                Ingestion Rules
              </h2>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  OCR is automatically performed for scanned documents and handwriting.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Check copyright permissions before uploading shared materials.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Metadata tagging (Type, Unit, Lesson) drives our unit-filtered search algorithm.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Processed chunks are used by the AI Tutor to generate unit-specific answers.
                </p>
              </div>
            </div>
          </div>

          {/* QUALITY WARNING Box matching Visily Page 18 */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>QUALITY WARNING</span>
            </div>
            <p className="text-[11px] text-rose-900 leading-relaxed">
              Poor scan quality (under 300 DPI) significantly impacts Sinhala OCR accuracy. Ensure clear lighting and flat positioning.
            </p>
          </div>
        </div>

      </div>

      {/* Middle Section: 3 Documents & processing status */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-xs">
              3
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Documents &amp; processing status
            </h2>
          </div>

          <button 
            onClick={() => {}}
            className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Status</span>
          </button>
        </div>

        {/* Table matching Visily Page 18 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider font-extrabold text-slate-600">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Chunks</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-teal-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {doc.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {doc.unit}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-bold">
                      {doc.status === 'Ready' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-emerald-700">Ready</span>
                        </>
                      )}
                      {doc.status === 'Processing...' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                          <span className="text-blue-700">Processing...</span>
                        </>
                      )}
                      {doc.status === 'Failed' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span className="text-rose-700">Failed</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {doc.chunks}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {doc.status === 'Ready' && (
                      <button 
                        onClick={() => alert(`Previewing ${doc.chunks} chunks for "${doc.title}"`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview chunks</span>
                      </button>
                    )}
                    {doc.status === 'Failed' && (
                      <button 
                        onClick={() => handleRetry(doc.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    )}
                    {doc.status === 'Processing...' && (
                      <span className="text-slate-400 font-medium text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Info & Pagination */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
          <span>Last automated sync check: 2 minutes ago</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-slate-500 hover:text-slate-800 disabled:opacity-40">Previous</button>
            <span className="w-6 h-6 rounded bg-slate-100 font-bold text-slate-800 flex items-center justify-center">1</span>
            <button className="px-2 py-1 text-slate-500 hover:text-slate-800 disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards matching Visily Page 18 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: UPLOAD TIPS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs text-slate-600">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            UPLOAD TIPS
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <p className="leading-snug">
                Metadata tagging (type, year, unit, lesson) is CRITICAL for search.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <p className="leading-snug">
                Use clear, descriptive titles to help students locate materials quickly.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                3
              </span>
              <p className="leading-snug">
                Status table updates automatically as the ingestion pipeline completes.
              </p>
            </div>
          </div>
        </div>

        {/* Right: LEGAL NOTICE (Deep Navy Card) */}
        <div className="bg-[#0D1B3E] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between space-y-4">
          <ShieldCheck className="w-32 h-32 absolute -right-6 -bottom-6 text-white/5 pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEGAL NOTICE</span>
            </div>
            <p className="text-xs text-blue-100/90 leading-relaxed">
              By uploading these documents, you confirm that you have the right to distribute this academic content on the ICT Learning Platform.
            </p>
          </div>

          <button
            onClick={() => alert('Opening IP Guidelines & NIE distribution license terms...')}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors relative z-10 uppercase tracking-wider"
          >
            REVIEW IP GUIDELINES
          </button>
        </div>

      </div>

      {/* Page Footer matching Visily Page 18 */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span className="tracking-wide uppercase font-semibold">
          ICT LEARNING PLATFORM · INGESTION ENGINE V4.2.1
        </span>
        <div className="flex items-center gap-4">
          <button className="hover:text-slate-600 transition-colors">Ingestion Guide</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">System Logs</button>
          <span>|</span>
          <button className="hover:text-slate-600 transition-colors">Admin Support</button>
        </div>
      </div>

    </div>
  );
};
