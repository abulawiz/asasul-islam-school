import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 dark:bg-[#05100c] px-4 py-16 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 border border-emerald-200 dark:border-emerald-800 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-emerald-800 dark:text-amber-400" />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-emerald-950 dark:text-white font-heading">404</span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">Page Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            The page you are looking for does not exist, has been moved, or the URL may have been typed incorrectly.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="w-full py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Return to School Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
