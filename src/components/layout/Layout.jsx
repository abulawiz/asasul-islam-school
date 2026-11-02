import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import { ArrowUp, GraduationCap } from 'lucide-react';

export default function Layout() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800 antialiased font-sans">
      <ScrollToTop />
      
      {/* Top Notification Bar */}
      <TopBar />

      {/* Main Header / Sticky Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Floating Quick Admission Pill */}
        {location.pathname !== '/admissions' && (
          <Link
            to="/admissions"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all border border-amber-400/50 text-xs font-bold hover:scale-105 active:scale-95 group"
          >
            <GraduationCap className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">2026/2027 Admissions Open</span>
            <span className="sm:hidden">Admissions</span>
          </Link>
        )}

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-10 h-10 rounded-full bg-white text-emerald-900 border border-slate-200 shadow-lg hover:bg-emerald-50 hover:text-emerald-950 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-5 h-5 text-emerald-800" />
          </button>
        )}
      </div>
    </div>
  );
}
