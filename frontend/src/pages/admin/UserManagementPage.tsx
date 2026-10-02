import React, { useState } from 'react';
import { Users, Search, UserCheck, Shield, Key, Plus, Trash2 } from 'lucide-react';
import type { UserRole } from '../../types';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'කසුන් පෙරේරා', email: 'kasun@alict.lk', role: 'student', school: 'Ananda College', status: 'Active' },
    { id: '2', name: 'චතුරංග සිල්වා', email: 'chathuranga@alict.lk', role: 'student', school: 'Royal College', status: 'Active' },
    { id: '3', name: 'ඩී. විජේසිංහ ගුරුතුමා', email: 'teacher@alict.lk', role: 'teacher', school: 'Royal College', status: 'Active' },
    { id: '4', name: 'පී. බණ්ඩාර ගුරුතුමිය', email: 'bandara@alict.lk', role: 'teacher', school: 'Visakha Vidyalaya', status: 'Active' },
    { id: '5', name: 'පද්ධති පරිපාලක', email: 'admin@alict.lk', role: 'admin', school: 'System Operations', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            RBAC role assignment (Student, Teacher, Admin), school affiliations, and credential resets.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md">
          <Plus className="w-4 h-4" />
          <span>Add System User</span>
        </button>
      </div>

      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, school..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold">{filtered.length} Users</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">School / Institute</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      u.role === 'admin' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700' :
                      u.role === 'teacher' ? 'bg-teal-900/60 text-teal-300 border border-teal-700' :
                      'bg-blue-900/60 text-blue-300 border border-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{u.school}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
                      Edit Role
                    </button>
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
