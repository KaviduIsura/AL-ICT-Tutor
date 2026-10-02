import React, { useState } from 'react';
import { 
  CheckSquare, 
  Check, 
  X, 
  Sparkles, 
  Award, 
  MessageSquare, 
  User, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ReviewQueuePage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  const [activeItem, setActiveItem] = useState(0);
  const [overrideMark, setOverrideMark] = useState('13');
  const [teacherNote, setTeacherNote] = useState('Good explanation of 3NF transitive dependencies. Awarded +1 additional point for ER diagram cardinality.');
  const [submitted, setSubmitted] = useState(false);

  const queue = [
    {
      id: 'rev_01',
      student: 'කසුන් පෙරේරා (Kasun Perera)',
      unit: 'Unit 4: Database Systems',
      question: 'දත්ත සාමාන්‍යකරණයේ 1NF, 2NF සහ 3NF වෙනස්කම් සහ ඇතුළත් කිරීමේ විෂමතා (Insertion Anomalies) පැහැදිලි කරන්න.',
      studentAnswer: `දත්ත සාමාන්‍යකරණය යනු අනුපිටපත් දත්ත ඉවත් කර දත්ත අඛණ්ඩතාව පවත්වා ගැනීමේ ක්‍රමයයි. 
1NF: සියලුම අගයන් පරමාණුක (atomic) විය යුතුය.
2NF: 1NF හි තිබිය යුතු අතර composite key එකක කොටසකට පමණක් dependency තිබෙන partial dependency ඉවත් කළ යුතුය.
3NF: transitive dependency ඉවත් කළ යුතුය.
Insertion Anomaly: නව ශිෂ්‍යයෙක් එකතු කිරීමට පාඨමාලාවක් නොමැතිව නොහැකි වීම.`,
      aiScore: '12 / 15',
      aiRationale: 'Strong explanation of 1NF and 2NF. 3NF explanation is brief. Mentioned insertion anomaly with suitable student example.',
      reason: isSin ? 'ශිෂ්‍ය විරෝධතාව (Student requested teacher review)' : 'Student requested teacher review',
    },
    {
      id: 'rev_02',
      student: 'චතුරංග සිල්වා (Chathuranga Silva)',
      unit: 'Unit 5: Computer Networking',
      question: 'IP ලිපිනයක Subnet Mask එකක් මගින් Network ID සහ Host ID වෙන්කරගන්නා අයුරු උදාහරණයක් සහිතව පෙන්වන්න.',
      studentAnswer: 'Class C ලිපිනයක 255.255.255.0 මගින් මුල් 24 bits network එකටත් ඉතිරි 8 bits host එකටත් වෙන් කරයි.',
      aiScore: '3 / 5',
      aiRationale: 'Partially correct explanation. Missing binary AND operation step.',
      reason: isSin ? 'AI අඩු විශ්වාසනීයත්ව සීමාව (Low confidence 0.64)' : 'AI Low Confidence (0.64)',
    },
  ];

  const current = queue[activeItem];

  const handleApprove = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (activeItem < queue.length - 1) setActiveItem(activeItem + 1);
    }, 1200);
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isSin ? 'ශිෂ්‍ය පිළිතුරු සමාලෝචන පෝලිම' : 'Subjective Review Queue'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isSin 
            ? 'AI විසින් ලකුණු ලබාදුන් රචනා හා ව්‍යුහගත පිළිතුරු ගුරු පරීක්ෂාව සහ ලකුණු අනුමත කිරීම.'
            : 'Human-in-the-loop review for subjective essay answers and student dispute appeals.'}
        </p>
      </div>

      {/* Main Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Queue List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isSin ? 'පොරොත්තු සමාලෝචන (Queue)' : 'Pending Submissions'}
          </h3>

          <div className="space-y-2">
            {queue.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(idx);
                  setSubmitted(false);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                  activeItem === idx
                    ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 text-teal-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.student.split(' ')[0]}</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold">
                    {item.reason.split('(')[0]}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{item.question}</div>
                <div className="text-[10px] text-teal-700 font-mono font-semibold">AI: {item.aiScore}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detailed Grading Workspace */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-teal-100 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                {current.unit}
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1">{current.student}</div>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {current.reason}
            </span>
          </div>

          {/* Question */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase">Question Statement</div>
            <div className="text-sm font-bold text-slate-900 leading-relaxed">{current.question}</div>
          </div>

          {/* Student Answer */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase">Student Raw Submission</div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {current.studentAnswer}
            </div>
          </div>

          {/* AI Tutor Score & Rationale */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-teal-950">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>AI Automated Assessment</span>
              </span>
              <span className="font-mono text-sm">{current.aiScore}</span>
            </div>
            <p className="text-teal-900/90 leading-relaxed">{current.aiRationale}</p>
          </div>

          {/* Teacher Adjustment Controls */}
          <div className="p-4 rounded-2xl bg-white border-2 border-teal-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {isSin ? 'ගුරුතුමාගේ අවසාන ලකුණු (Final Mark Override):' : 'Final Mark Override:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={overrideMark}
                  onChange={(e) => setOverrideMark(e.target.value)}
                  className="w-16 px-3 py-1.5 text-center font-bold text-sm rounded-xl border border-teal-300 focus:outline-none focus:border-teal-600 bg-teal-50/40 text-teal-950 font-mono"
                />
                <span className="text-xs font-bold text-slate-500">/ 15 Points</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isSin ? 'ශිෂ්‍යයාට උපදෙස් සටහන (Teacher Feedback Note):' : 'Feedback to Student:'}
              </label>
              <textarea
                rows={2}
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-600"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleApprove}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isSin ? 'ලකුණු අනුමත කර ශිෂ්‍යයාට යවන්න' : 'Approve & Release Mark'}</span>
              </button>
            </div>
          </div>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mark overridden and recorded in gradebook successfully!</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
