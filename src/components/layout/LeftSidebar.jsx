// src/components/layout/LeftSidebar.jsx - Functional Left-Hand Navigation Sidebar
import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Home, Building2, GraduationCap, ClipboardCheck, Newspaper, 
  Image as ImageIcon, PhoneCall, ShieldCheck, X, Sun, Moon, 
  ArrowRight, Phone, Mail, MapPin, Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function LeftSidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      desc: 'Campus overview & foundational pillars'
    },
    {
      name: 'About School',
      path: '/about',
      icon: Building2,
      desc: 'History, vision, moral values & leadership'
    },
    {
      name: 'Academics',
      path: '/academics',
      icon: GraduationCap,
      desc: 'Early Years, Primary, Secondary & Tahfeez'
    },
    {
      name: 'Admissions & Tracker',
      path: '/admissions',
      icon: ClipboardCheck,
      desc: 'Apply online & live applicant tracking'
    },
    {
      name: 'News & Announcements',
      path: '/news',
      icon: Newspaper,
      desc: 'Termly bulletins, events & press releases'
    },
    {
      name: 'Campus Gallery',
      path: '/gallery',
      icon: ImageIcon,
      desc: 'Infrastructure, laboratories & sports grounds'
    },
    {
      name: 'Contact & Tour',
      path: '/contact',
      icon: PhoneCall,
      desc: 'Admissions helpline & campus walkthrough'
    },
    {
      name: 'EduPortal System',
      path: '/portal',
      icon: ShieldCheck,
      desc: 'Student report cards, Tahfeez log & admin desk',
      highlight: true
    }
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Left Sidebar Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 sm:w-96 bg-white dark:bg-[#071510] text-slate-800 dark:text-slate-100 shadow-2xl border-r border-slate-200 dark:border-emerald-900/40 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-stone-50 dark:bg-slate-900/60">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
            {/* School Crest Emblem */}
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center p-1 shadow-md border border-amber-400/40">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
                <path d="M50 20 C34 32 30 46 30 72 C38 68 45 68 50 71 C55 68 62 68 70 72 C70 46 66 32 50 20 Z" fill="#047857" stroke="#fde047" strokeWidth="2"/>
                <polygon points="50,26 52,31 57,31 53,34 55,39 50,36 45,39 47,34 43,31 48,31" fill="#fde047"/>
                <line x1="50" y1="36" x2="50" y2="70" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-emerald-950 dark:text-white leading-tight">
                  ASASUL ISLAM
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50">
                  EST. 2008
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                Nigeria · Faith & Knowledge
              </p>
            </div>
          </Link>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close navigation sidebar"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Main Navigation List */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-emerald-800 dark:text-amber-400 uppercase tracking-widest">
                Navigation Directory
              </span>
              <span className="text-[10px] text-slate-400 font-mono">8 Modules</span>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-emerald-900 text-white shadow-md shadow-emerald-950/20 font-bold'
                        : item.highlight
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-900/80'
                    }`}
                  >
                    {/* Icon Badge */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-amber-400 text-emerald-950'
                        : item.highlight
                        ? 'bg-amber-200/80 dark:bg-amber-900/80 text-amber-950 dark:text-amber-300'
                        : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold truncate">
                          {item.name}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                        )}
                        {item.highlight && !isActive && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-300 font-bold">
                            Login
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${
                        isActive ? 'text-emerald-200' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Settings & Theme */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <span className="px-3 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Preferences & Quick Actions
            </span>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-slate-800 text-emerald-800 dark:text-amber-300 flex items-center justify-center">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-800" />}
                </div>
                <span>Theme Mode</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300">
                {theme === 'dark' ? 'Dark Active 🌙' : 'Light Active ☀️'}
              </span>
            </button>

            {/* Direct Admissions CTA */}
            <Link
              to="/admissions"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md border border-amber-400/40 transition active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apply for 2026/2027 Session</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>

          {/* Contact Details Snippet */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-400 shrink-0" />
              <a href="tel:+2348031234567" className="font-semibold text-slate-800 dark:text-slate-200 hover:underline">
                +234 (0) 803 123 4567
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-400 shrink-0" />
              <a href="mailto:info@asasulislam.edu.ng" className="hover:underline truncate">
                info@asasulislam.edu.ng
              </a>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>Plot 14, Al-Nur Educational Blvd, New GRA, Nigeria</span>
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-stone-50 dark:bg-slate-900/80 text-center">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            © 2026 ASASUL ISLAM SCHOOL
          </p>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
            Ministry of Education Accredited · Nigeria
          </p>
        </div>
      </aside>
    </>
  );
}
