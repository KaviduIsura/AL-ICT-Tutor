import React from 'react';
import { BarChart3, TrendingUp, Users, Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ClassAnalyticsPage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isSin ? 'පන්ති ප්‍රගති විශ්ලේෂණය (Class Analytics)' : 'Classroom Performance Analytics'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isSin 
            ? 'පන්ති සාමාන්‍යය, ප්‍රශ්නාවලි සහභාගීත්වය සහ දුර්වලතා විශ්ලේෂණය.'
            : 'Aggregated analytics across all 3 enrolled classes.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Class Average</div>
          <div className="text-3xl font-black text-teal-800 mt-1">74.2%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-2">+5.4% improvement this month</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Quiz Completion Rate</div>
          <div className="text-3xl font-black text-teal-800 mt-1">89%</div>
          <div className="text-xs text-slate-500 mt-2">78 of 86 students submitted</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Top Performing Unit</div>
          <div className="text-3xl font-black text-emerald-700 mt-1">Unit 11</div>
          <div className="text-xs text-slate-500 mt-2">90% class mastery in Business ICT</div>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="bg-white rounded-3xl border border-teal-100 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          {isSin ? 'ශිෂ්‍ය ලකුණු ව්‍යාප්තිය (Grade Distribution)' : 'Grade Prediction Distribution'}
        </h2>
        <div className="grid grid-cols-5 gap-3 text-center">
          {[
            { grade: 'A (>75%)', count: 28, pct: 33, color: 'bg-emerald-500' },
            { grade: 'B (65-74%)', count: 32, pct: 37, color: 'bg-teal-500' },
            { grade: 'C (55-64%)', count: 16, pct: 19, color: 'bg-blue-500' },
            { grade: 'S (40-54%)', count: 8, pct: 9, color: 'bg-amber-500' },
            { grade: 'F (<40%)', count: 2, pct: 2, color: 'bg-rose-500' },
          ].map((b, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700">{b.grade}</div>
              <div className="text-xl font-black text-slate-900">{b.count}</div>
              <div className="text-[11px] text-slate-500">{b.pct}% of class</div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
