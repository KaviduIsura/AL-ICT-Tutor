import React, { useState } from 'react';
import { Award, Search, Edit3, Check, X, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MarkOverridePage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  const [students, setStudents] = useState([
    { id: 1, name: 'කසුන් පෙරේරා', index: 'RC-2026-104', a1: 85, a2: 78, mock: 82, modified: true },
    { id: 2, name: 'චතුරංග සිල්වා', index: 'RC-2026-105', a1: 64, a2: 70, mock: 68, modified: false },
    { id: 3, name: 'සඳුණි මෙන්ඩිස්', index: 'RC-2026-106', a1: 92, a2: 88, mock: 90, modified: false },
    { id: 4, name: 'දිනුක ජයසිංහ', index: 'RC-2026-107', a1: 58, a2: 62, mock: 60, modified: true },
    { id: 5, name: 'ඉසුරු ප්‍රනාන්දු', index: 'RC-2026-108', a1: 76, a2: 80, mock: 78, modified: false },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempMock, setTempMock] = useState<number>(85);

  const saveOverride = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, mock: tempMock, modified: true } : s))
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isSin ? 'ලකුණු සංශෝධනය (Mark Override & Gradebook)' : 'Class Gradebook & Mark Override'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isSin 
            ? 'සිසුන්ගේ AI මගින් ලබාදුන් ලකුණු ගුරු පරීක්ෂාවට ලක් කර සංශෝධනය කිරීමේ නිල ලේඛනය.'
            : 'Audit-logged gradebook allowing teachers to adjust automated AI marks with audit trails.'}
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-teal-100 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Royal College • Grade 13 ICT - Class A
          </span>
          <span className="text-xs text-slate-500">
            {students.length} {isSin ? 'සිසුන්' : 'Students Enrolled'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4">ශිෂ්‍යයා (Student Name)</th>
                <th className="px-6 py-4">විභාග අංකය (Index)</th>
                <th className="px-6 py-4">Unit 4 Quiz</th>
                <th className="px-6 py-4">Unit 5 Quiz</th>
                <th className="px-6 py-4">Mock Exam Score</th>
                <th className="px-6 py-4 text-right">සංශෝධනය (Override)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-teal-50/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{s.index}</td>
                  <td className="px-6 py-4 font-mono font-semibold">{s.a1}%</td>
                  <td className="px-6 py-4 font-mono font-semibold">{s.a2}%</td>
                  <td className="px-6 py-4">
                    {editingId === s.id ? (
                      <input
                        type="number"
                        value={tempMock}
                        onChange={(e) => setTempMock(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-teal-400 rounded-lg text-xs font-bold text-teal-950 font-mono"
                      />
                    ) : (
                      <span className="font-mono font-bold text-teal-800">
                        {s.mock}% {s.modified && <span className="text-[10px] text-amber-600 font-sans font-normal">(Overridden)</span>}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {editingId === s.id ? (
                      <button
                        onClick={() => saveOverride(s.id)}
                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(s.id);
                          setTempMock(s.mock);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                      >
                        Edit Mark
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
