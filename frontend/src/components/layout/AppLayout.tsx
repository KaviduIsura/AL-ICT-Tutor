import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../../store/useAppStore';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed, role } = useAppStore();

  return (
    <div className={`min-h-screen flex ${role === 'admin' ? 'bg-[#090D16] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Dynamic Role Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header />
        
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
