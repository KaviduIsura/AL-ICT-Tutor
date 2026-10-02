import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-700 font-black text-2xl flex items-center justify-center mb-4">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">පිටුව සොයාගත නොහැක</h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
        The page you are looking for does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};
