import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Menu, ChevronDown, GraduationCap, BookOpen, 
  Sparkles, Award, Shield, ArrowRight, Info, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Track scroll state for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      items: [
        { name: 'School Profile & History', path: '/about#history', icon: BookOpen },
        { name: 'Vision, Mission & Values', path: '/about#vision', icon: Sparkles },
        { name: "Principal's Welcome", path: '/about#principal', icon: Award },
        { name: 'School Leadership', path: '/about#leadership', icon: Shield }
      ]
    },
    { 
      name: 'Academics', 
      path: '/academics',
      hasDropdown: true,
      items: [
        { name: 'Early Childhood & Nursery', path: '/academics#early-years', icon: Sparkles },
        { name: 'Primary Education', path: '/academics#primary-school', icon: BookOpen },
        { name: 'Junior & Senior Secondary', path: '/academics#secondary', icon: GraduationCap },
        { name: 'Tahfeez & Islamic Sciences', path: '/academics#tahfeez', icon: Award }
      ]
    },
    { 
      name: 'Admissions', 
      path: '/admissions',
      hasDropdown: true,
      items: [
        { name: 'Admission Overview', path: '/admissions#overview', icon: Info },
        { name: 'Entry Requirements', path: '/admissions#requirements', icon: Shield },
        { name: 'Application Form', path: '/admissions#apply', icon: GraduationCap },
        { name: 'Frequently Asked Questions', path: '/admissions#faqs', icon: BookOpen }
      ]
    },
    { name: 'News & Events', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-emerald-900/10 dark:border-emerald-800/30' 
        : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Left: Sidebar Toggle Button & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Sidebar Toggle Button on the Left-Hand Side */}
            <button
              onClick={onOpenSidebar}
              aria-label="Open Left Navigation Sidebar"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-900 dark:text-amber-300 border border-emerald-200 dark:border-emerald-800 transition-all shadow-xs active:scale-95 group focus:outline-none"
              title="Open Navigation Sidebar with Icons"
            >
              <Menu className="w-5 h-5 text-emerald-800 dark:text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black tracking-wider uppercase text-emerald-950 dark:text-amber-300">
                Menu
              </span>
            </button>

            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              {/* Islamic Crest Icon */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-900 flex items-center justify-center p-1.5 shadow-md group-hover:bg-emerald-800 transition-colors border border-amber-400/40 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
                  <path d="M50 20 C34 32 30 46 30 72 C38 68 45 68 50 71 C55 68 62 68 70 72 C70 46 66 32 50 20 Z" fill="#047857" stroke="#fde047" strokeWidth="2"/>
                  <polygon points="50,26 52,31 57,31 53,34 55,39 50,36 45,39 47,34 43,31 48,31" fill="#fde047"/>
                  <line x1="50" y1="36" x2="50" y2="70" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl text-emerald-950 dark:text-emerald-100 tracking-tight leading-none group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors">
                    ASASUL ISLAM
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/50">
                    EST. 2008
                  </span>
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase leading-tight mt-0.5">
                  School · Nigeria
                </span>
                <span className="hidden md:inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                  Excellence in Faith & Knowledge
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(link.name)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(null)}
              >
                {link.hasDropdown ? (
                  <div className="flex items-center">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => `
                        px-3 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-1
                        ${isActive 
                          ? 'text-emerald-800 dark:text-amber-300 bg-emerald-50/80 dark:bg-emerald-950/60 font-bold' 
                          : 'text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }
                      `}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-amber-300 group-hover:rotate-180 transition-transform duration-200" />
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-lg text-sm font-semibold transition-all inline-block
                      ${isActive 
                        ? 'text-emerald-800 dark:text-amber-300 bg-emerald-50/80 dark:bg-emerald-950/60 font-bold' 
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && dropdownOpen === link.name && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 space-y-1">
                      {link.items.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={() => setDropdownOpen(null)}
                            className="flex items-center gap-3 p-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-900 dark:hover:text-amber-300 transition-colors group/item"
                          >
                            <div className="w-7 h-7 rounded-md bg-emerald-100/60 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center group-hover/item:bg-emerald-800 group-hover/item:text-amber-300 transition-colors">
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Header Action & Dark/Light Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-amber-300 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-800 animate-in spin-in-180 duration-300" />
              )}
            </button>

            <Link
              to="/portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-400" />
              <span>EduPortal</span>
            </Link>

            <Link
              to="/admissions"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-950/10 hover:shadow-emerald-900/20 active:scale-95 transition-all border border-amber-400/30 group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Quick Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/admissions"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 bg-amber-300 hover:bg-amber-400 transition shadow-xs"
            >
              Apply
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
