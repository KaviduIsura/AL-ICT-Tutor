import React from 'react';
import { ShieldCheck, Search, Filter } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const logs = [
    { id: 'log_01', time: '10:45:12 AM', actor: 'Mr. Wijesinghe (Teacher)', action: 'MARK_OVERRIDE', target: 'Student: Kasun Perera (Q3 DBMS)', ip: '192.168.1.12' },
    { id: 'log_02', time: '10:30:00 AM', actor: 'Admin', action: 'PROMPT_DEPLOY', target: 'system_prompt_v2.1 deployed', ip: '127.0.0.1' },
    { id: 'log_03', time: '09:15:44 AM', actor: 'Ingestion Service', action: 'CHUNK_INGEST', target: '24 chunks added to Unit 4', ip: 'internal-worker' },
    { id: 'log_04', time: '08:52:10 AM', actor: 'Kasun Perera (Student)', action: 'USER_LOGIN', target: 'Web Client Session Start', ip: '175.157.8.44' },
  ];

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Security & Audit Trail</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Immutable audit logs of mark modifications, prompt updates, and security events.
        </p>
      </div>

      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-900">
            Real-time Audit Stream
          </span>
          <span className="text-xs text-slate-500 font-mono">Retention: 365 Days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Target / Details</th>
                <th className="px-6 py-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400">{log.time}</td>
                  <td className="px-6 py-4 font-bold text-white">{log.actor}</td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-md border border-indigo-900">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{log.target}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
