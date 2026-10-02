import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Activity, 
  Users, 
  Layers, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  Sparkles, 
  Server,
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminDashboard: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      
      {/* 1. TOP ADMIN BANNER (Rich Dark Aesthetic with Glowing Borders) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Operations & RAG Infrastructure</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              A/L ICT System Control Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              FastAPI 0.115 • Supabase pgvector • BGE-M3 Embeddings • RAG Triad Evaluator
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/prompts"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Terminal className="w-4 h-4" />
              <span>Prompt Engine (v2.1)</span>
            </Link>
            <Link
              to="/admin/quality"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 shadow-xs transition-colors"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>RAG Triad Triangulation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. SYSTEM KPIS (Rich Dark Glassmorphism) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Users */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Active Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">1,484</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>1,420 Students • 64 Teachers</span>
          </div>
        </div>

        {/* RAG Stream Latency */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>LLM Stream Latency</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">820 ms</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Time to first token (TTFT)
          </div>
        </div>

        {/* Triad Quality Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>RAG Groundedness</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">0.94 / 1.0</div>
          <div className="text-[11px] text-slate-400 font-medium">
            0.8% Hallucination rate
          </div>
        </div>

        {/* Vector Chunks */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Curriculum Chunks</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">2,840</div>
          <div className="text-[11px] text-indigo-400 font-medium">
            1024-dim BGE-M3 Indexed
          </div>
        </div>

      </div>

      {/* 3. SYSTEM HEALTH & INGESTION PIPELINE STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Service Health Cards */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-400" />
              <span>Microservices & Backend Health</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
              All Systems Operational
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'FastAPI REST & SSE Gateway', port: ':8000', status: 'Healthy', ping: '12ms', color: 'text-emerald-400' },
              { name: 'Supabase Postgres (pgvector)', port: ':5432', status: 'Connected', ping: '24ms', color: 'text-emerald-400' },
              { name: 'BGE-M3 Embedding Engine', type: 'Local / ONNX', status: 'Ready', ping: '45ms', color: 'text-emerald-400' },
              { name: 'Groq / Llama 3 70B Versatile', provider: 'API Cloud', status: 'Active', ping: '220ms', color: 'text-emerald-400' },
            ].map((svc, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-200">{svc.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{svc.port || svc.provider || svc.type}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${svc.color}`}>{svc.status}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{svc.ping}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Admin Shortcuts */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 text-white">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Core Administration Portals</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/users"
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left space-y-1.5 group"
            >
              <Users className="w-5 h-5 text-indigo-400 group-hover:scale-105 transition-transform" />
              <div className="font-bold text-xs text-slate-200">User Management</div>
              <div className="text-[10px] text-slate-500">Roles, passwords & access</div>
            </Link>

            <Link
              to="/admin/curriculum"
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left space-y-1.5 group"
            >
              <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="font-bold text-xs text-slate-200">Curriculum Chunks</div>
              <div className="text-[10px] text-slate-500">Vector indexing status</div>
            </Link>

            <Link
              to="/admin/prompts"
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left space-y-1.5 group"
            >
              <Terminal className="w-5 h-5 text-amber-400 group-hover:scale-105 transition-transform" />
              <div className="font-bold text-xs text-slate-200">Prompt Engineering</div>
              <div className="text-[10px] text-slate-500">A/B Testing & versions</div>
            </Link>

            <Link
              to="/admin/audit"
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left space-y-1.5 group"
            >
              <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
              <div className="font-bold text-xs text-slate-200">Security Audit Logs</div>
              <div className="text-[10px] text-slate-500">Overrides & logins trail</div>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
