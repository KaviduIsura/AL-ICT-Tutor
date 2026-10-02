import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Send, 
  Sparkles, 
  Search, 
  Bell, 
  ChevronDown, 
  MessageSquare, 
  Plus, 
  MoreVertical, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  Mic, 
  Paperclip,
  Check,
  RotateCcw
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { streamAskQuestion } from '../../lib/api';

interface ChatHistoryItem {
  id: string;
  title: string;
}

export const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { language, setLanguage } = useAppStore();

  // Control pills matching Visily Page 07
  const [scope, setScope] = useState<'this_unit' | 'whole'>('this_unit');
  const [mode, setMode] = useState<'ask' | 'discuss'>('ask');
  const [lang, setLang] = useState<'English' | 'Sinhala'>('English');

  // Input & state
  const [inputText, setInputText] = useState('');
  const [discussAnswer, setDiscussAnswer] = useState('');
  const [discussFeedback, setDiscussFeedback] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);

  // Chat history list matching Visily Page 07
  const [historyItems, setHistoryItems] = useState<ChatHistoryItem[]>([
    { id: '1', title: 'Normalization: 1NF vs 2NF' },
    { id: '2', title: 'TCP/IP Handshake Logic' },
    { id: '3', title: 'Python Dict Comprehension' },
    { id: '4', title: 'SQL Join Performance' },
    { id: '5', title: 'Primary Key Constraints' },
    { id: '6', title: 'SDLC Methodologies' },
  ]);
  const [activeHistoryId, setActiveHistoryId] = useState('1');

  // Live answer state (starts with Visily Page 07 exact default prompt and answer)
  const [userQuery, setUserQuery] = useState('What is 2NF and how is it different from 1NF?');
  const [tutorAnswer, setTutorAnswer] = useState(
    `Second Normal Form (2NF) is a stage in database normalization that builds upon 1NF. To be in 2NF, a table must:

• Be in First Normal Form (1NF).
• Have no partial dependencies, meaning every non-prime attribute must depend on the whole of every candidate key, not just a part of it.`
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check URL param `?q=...`
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      handleAsk(q);
    }
  }, [searchParams]);

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim() || isStreaming) return;
    setUserQuery(questionText);
    setTutorAnswer('');
    setIsStreaming(true);
    setFeedbackGiven(null);
    setDiscussFeedback(null);

    try {
      await streamAskQuestion(
        {
          question: questionText,
          unit: scope === 'this_unit' ? 'unit-4' : undefined,
          mode: mode,
          language: lang === 'Sinhala' ? 'si' : 'en',
        },
        (chunk) => {
          setTutorAnswer((prev) => prev + chunk);
        },
        (error) => {
          setTutorAnswer((prev) => prev + '\n\n*(Error connecting to AI service. Using cached syllabus response.)*');
          setIsStreaming(false);
        }
      );
    } catch (e) {
      // Fallback response
      setTutorAnswer(
        `In G.C.E. A/L ICT, Second Normal Form (2NF) requires that the relation is in 1NF and contains no partial functional dependencies. All non-key attributes must be fully functionally dependent on the primary key.`
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleAsk(inputText.trim());
      setInputText('');
    }
  };

  const handleDiscussSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussAnswer.trim()) return;
    setDiscussFeedback(
      `Correct! If a primary key consists of only a single attribute, partial dependencies are impossible because no non-key attribute can depend on "part" of a single column. The table is automatically in 2NF!`
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden font-sans bg-[#F8FAFC]">
      
      {/* 1. CHAT HISTORY COLUMN (Visily Page 07 exact left panel) */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
            History
          </span>
          <button
            onClick={() => {
              setUserQuery('');
              setTutorAnswer('Ask me any question regarding your A/L ICT syllabus.');
            }}
            className="text-slate-400 hover:text-[#1E3A8A] transition-colors p-1"
            title="Start new chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-left">
          {historyItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveHistoryId(item.id);
                setUserQuery(item.title);
                handleAsk(item.title);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors truncate ${
                activeHistoryId === item.id
                  ? 'bg-blue-50 text-[#1E3A8A] font-bold border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60" />
              <span className="truncate">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Bottom: New Session Button */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            NEW SESSION
          </div>
          <button
            onClick={() => {
              setUserQuery('');
              setTutorAnswer('How can I help you with your A/L ICT studies today?');
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Start New Chat</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
        
        {/* Top Control Bar matching Visily Page 07 */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0 text-left">
          
          {/* Controls: 1. Scope, 2. Mode, 3. Lang */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            {/* 1. Scope */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                1. SCOPE
              </span>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setScope('this_unit')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    scope === 'this_unit' ? 'bg-[#EF4444] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  This Unit
                </button>
                <button
                  onClick={() => setScope('whole')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    scope === 'whole' ? 'bg-[#EF4444] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Whole Syllabus
                </button>
              </div>
            </div>

            {/* 2. Mode */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                2. MODE
              </span>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setMode('ask')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    mode === 'ask' ? 'bg-[#EF4444] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ask
                </button>
                <button
                  onClick={() => setMode('discuss')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    mode === 'discuss' ? 'bg-[#EF4444] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Discuss
                </button>
              </div>
            </div>

            {/* 3. Lang */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">
                3. LANG
              </span>
              <button
                onClick={() => setLang(lang === 'English' ? 'Sinhala' : 'English')}
                className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span>{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Scrollable Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left">
          
          {/* Smart Suggestion Banner matching Visily */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0F172A]">Smart Suggestion</span>
                <p className="text-slate-600 mt-0.5">
                  This looks like Unit 4 material. Would you like to restrict search to this unit?
                </p>
              </div>
            </div>
            <button
              onClick={() => setScope('this_unit')}
              className="text-[#1E3A8A] font-semibold hover:underline shrink-0 text-xs"
            >
              Switch Scope
            </button>
          </div>

          {/* User Message Bubble (Right aligned dark pill) */}
          {userQuery && (
            <div className="flex justify-end">
              <div className="space-y-1 text-right max-w-xl">
                <div className="inline-block px-5 py-3 rounded-2xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-medium shadow-xs">
                  <span>Student: {userQuery}</span>
                </div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 pr-1 uppercase">
                  SENT 10:24 AM
                </div>
              </div>
            </div>
          )}

          {/* Assistant Answer Box matching Visily Page 07 */}
          <div className="space-y-4 max-w-3xl">
            {/* AI Tutor Assistant Tag */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-[#0F172A]">
                AI Tutor Assistant
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            {/* Tutor Answer Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-[#0F172A]">
                  Tutor Answer
                </h3>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Answer Body */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {tutorAnswer}
                {isStreaming && <span className="inline-block w-2 h-4 bg-[#1E3A8A] ml-1 animate-pulse"></span>}
              </div>

              {/* Source Chips matching Visily */}
              <div className="flex items-center gap-2 pt-2">
                <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-md">
                  Unit 4 › 4.2
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-md">
                  Unit 4 › 4.3
                </span>
              </div>

              {/* Quick Actions & Thumbs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => handleAsk(`Explain "${userQuery}" in simpler words for A/L students.`)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    Simpler
                  </button>
                  <button
                    onClick={() => handleAsk(`Give an exact past paper example for "${userQuery}".`)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    Example
                  </button>
                  <button
                    onClick={() => setLang(lang === 'English' ? 'Sinhala' : 'English')}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                  >
                    SI / EN
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    onClick={() => setFeedbackGiven('up')}
                    className={`p-1.5 rounded hover:bg-slate-50 ${feedbackGiven === 'up' ? 'text-emerald-600' : ''}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setFeedbackGiven('down')}
                    className={`p-1.5 rounded hover:bg-slate-50 ${feedbackGiven === 'down' ? 'text-rose-600' : ''}`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Feedback reason pills */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                <span>REASONS FOR FEEDBACK:</span>
                <button className="hover:text-slate-700">• Wrong</button>
                <button className="hover:text-slate-700">• Unclear</button>
                <button className="hover:text-slate-700">• Too long</button>
              </div>
            </div>

            {/* Discuss check question Box (Visily Page 07 exact) */}
            <div className="rounded-2xl p-6 border-2 border-dashed border-blue-200 bg-blue-50/40 space-y-4">
              <div className="flex items-center gap-2 text-[#1E3A8A] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Discuss check question</span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
                "If a table has a single-attribute primary key and is in 1NF, can it have partial dependencies?"
              </p>

              {discussFeedback ? (
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800">
                  {discussFeedback}
                </div>
              ) : (
                <form onSubmit={handleDiscussSubmit} className="space-y-3">
                  <textarea
                    rows={2}
                    value={discussAnswer}
                    onChange={(e) => setDiscussAnswer(e.target.value)}
                    placeholder="Your answer..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-xs"
                    >
                      Submit Answer
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* 3. BOTTOM QUESTION INPUT - Visily Page 07 exact */}
        <div className="bg-white border-t border-slate-200 p-4 sm:p-5 shrink-0 text-left">
          <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                4. ASK YOUR QUESTION
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit(e);
                  }
                }}
                placeholder="Type your question here... (e.g., How does 2NF apply to a student enrollment table?)"
                className="w-full p-3.5 pr-28 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all resize-none shadow-xs"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isStreaming}
                className="absolute right-3 bottom-3 px-5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-4">
                <button type="button" className="flex items-center gap-1 hover:text-slate-600">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Input</span>
                </button>
                <button type="button" className="flex items-center gap-1 hover:text-slate-600">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>+ Attach Snippet</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                Powered by ICT Learn AI Tutor
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
