import React from 'react';
import { Users, Plus, KeyRound, Copy, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ClassRosterPage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  const classes = [
    { name: 'Grade 13 ICT - Class A', students: 34, code: 'ROYAL-2026-A', activeAssignments: 2 },
    { name: 'Grade 13 ICT - Class B', students: 30, code: 'ROYAL-2026-B', activeAssignments: 1 },
    { name: 'Grade 12 ICT - Batch 2027', students: 22, code: 'ROYAL-2027-X', activeAssignments: 3 },
  ];

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isSin ? 'පන්ති සහ කණ්ඩායම් (Classes & Groups)' : 'Class Roster & Groups'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {isSin ? 'ඔබගේ පාසල් පන්ති සහ ශිෂ්‍ය ආරාධනා කේත කළමනාකරණය.' : 'Manage student batches and class invite codes.'}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all">
          <Plus className="w-4 h-4" />
          <span>{isSin ? 'නව පන්තියක් සාදන්න' : 'Create New Class'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-teal-100 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {cls.students} {isSin ? 'සිසුන්' : 'Students'}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{cls.activeAssignments} Active Quizzes</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{cls.name}</h3>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">{isSin ? 'ශිෂ්‍ය ආරාධනා කේතය:' : 'Student Invite Code:'}</div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs font-bold text-slate-800">{cls.code}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(cls.code)}
                  className="p-1 hover:text-teal-700 transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
