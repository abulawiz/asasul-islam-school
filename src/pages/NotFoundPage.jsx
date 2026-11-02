import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-5">
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-emerald-800 animate-spin-slow" />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-emerald-950 font-heading">404</span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">Page Not Found</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
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
