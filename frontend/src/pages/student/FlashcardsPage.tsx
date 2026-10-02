import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  MoreVertical, 
  RotateCw, 
  Zap, 
  Check, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const FlashcardsPage: React.FC = () => {
  const { language } = useAppStore();
  const [selectedDeck, setSelectedDeck] = useState('Unit 4: Database Systems');
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(3); // Card 3 / 12

  const decks = [
    { title: 'Unit 1: Fundamentals', due: 5 },
    { title: 'Unit 2: Architecture', due: 3 },
    { title: 'Unit 3: Networking', due: 0 },
    { title: 'Unit 4: Database Systems', due: 4 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      {/* Grid: Left Decks & Right Flashcard Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (span 4): Decks List & Mastery Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. DECKS
              </span>
              <button type="button" className="text-blue-700 hover:text-blue-900">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {decks.map((deck) => {
                const isSelected = selectedDeck === deck.title;
                return (
                  <button
                    key={deck.title}
                    type="button"
                    onClick={() => {
                      setSelectedDeck(deck.title);
                      setIsFlipped(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-bold shadow-xs'
                        : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold">{deck.title}</div>
                      {deck.due > 0 && (
                        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {deck.due}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                      {deck.due} CARDS DUE
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Bottom Card: Streak & Mastery Stats */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
            {/* Streak */}
            <div className="p-3.5 rounded-xl bg-[#0D1B3E] text-white space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>6 DAY STREAK</span>
              </div>
              <p className="text-[11px] text-slate-300">
                15 more cards today to keep the flame alive!
              </p>
            </div>

            {/* Mastery Stats */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                MASTERY STATS
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">New Cards</span>
                <span className="font-bold text-slate-900 font-mono">124</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Learning</span>
                <span className="font-bold text-slate-900 font-mono">42</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Mastered</span>
                <span className="font-bold text-slate-900 font-mono">85</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (span 8): Interactive Card Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Card {cardIndex} / 12</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Reviewing: {selectedDeck}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Options</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Session Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>SESSION PROGRESS</span>
              <span>25%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: '25%' }} />
            </div>
          </div>

          {/* Flashcard Box (Visily Page 14) */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <Zap className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  UNIT 4
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  NORMALIZATION
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  LEVEL: MEDIUM
                </span>
              </div>
            </div>

            {/* Question Text Centered */}
            <div className="my-auto py-8 text-center space-y-4">
              {!isFlipped ? (
                <h2 className="text-xl sm:text-2xl font-black text-[#0D1B3E] max-w-lg mx-auto leading-relaxed">
                  What is 2NF and what does it aim to eliminate?
                </h2>
              ) : (
                <div className="text-left max-w-lg mx-auto space-y-3 bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-900">Answer:</h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    A relation is in <strong>Second Normal Form (2NF)</strong> if and only if it is in 1NF and every non-prime attribute is fully functionally dependent on the candidate key. It aims to eliminate <strong>partial functional dependencies</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <RotateCw className="w-3.5 h-3.5" />
              <span>CLICK TO FLIP CARD</span>
            </div>
          </div>

          {/* Flip Card Action Button */}
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full py-3.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <RotateCw className="w-4 h-4" />
            <span>Flip Card</span>
          </button>

          {/* Bottom SRS Notice */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              <span>Cards are automatically prioritized based on your past quiz mistakes and syllabus weightage.</span>
            </div>
            <a href="#" className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1">
              <span>Adjust SRS algorithm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
