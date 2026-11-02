import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, GraduationCap, BookOpen, 
  Sparkles, Award, Shield, ArrowRight, Calendar, Info, PhoneCall
} from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location]);

  // Track scroll state for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-900/10' 
        : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Islamic Crest Icon */}
            <div className="relative w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center p-1.5 shadow-md group-hover:bg-emerald-800 transition-colors border border-amber-400/40">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
                <path d="M50 20 C34 32 30 46 30 72 C38 68 45 68 50 71 C55 68 62 68 70 72 C70 46 66 32 50 20 Z" fill="#047857" stroke="#fde047" strokeWidth="2"/>
                <polygon points="50,26 52,31 57,31 53,34 55,39 50,36 45,39 47,34 43,31 48,31" fill="#fde047"/>
                <line x1="50" y1="36" x2="50" y2="70" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-emerald-950 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                  ASASUL ISLAM
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  EST. 2008
                </span>
              </div>
              <span className="text-xs font-semibold tracking-widest text-emerald-700 uppercase leading-tight mt-0.5">
                School · International
              </span>
              <span className="font-arabic text-[11px] text-slate-500 leading-none mt-0.5">
                {schoolInfo.arabicName}
              </span>
            </div>
          </Link>

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
                          ? 'text-emerald-800 bg-emerald-50/80 font-bold' 
                          : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-50'
                        }
                      `}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:rotate-180 transition-transform duration-200" />
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-lg text-sm font-semibold transition-all inline-block
                      ${isActive 
                        ? 'text-emerald-800 bg-emerald-50/80 font-bold' 
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-50'
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && dropdownOpen === link.name && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 space-y-1">
                      {link.items.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            className="flex items-center gap-3 p-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors group/item"
                          >
                            <div className="w-7 h-7 rounded-md bg-emerald-100/60 text-emerald-800 flex items-center justify-center group-hover/item:bg-emerald-800 group-hover/item:text-amber-300 transition-colors">
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

          {/* Right Header Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/admissions"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-950/10 hover:shadow-emerald-900/20 active:scale-95 transition-all border border-amber-400/30 group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/admissions"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 bg-amber-300 hover:bg-amber-400 transition shadow-xs"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name} className="py-1">
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen === link.name ? 'rotate-180 text-emerald-800' : 'text-slate-400'
                      }`} />
                    </button>

                    {dropdownOpen === link.name && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1 border-l-2 border-emerald-700">
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-emerald-900 hover:underline"
                        >
                          Overview of {link.name} →
                        </Link>
                        {link.items.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-emerald-800"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      block px-3 py-2.5 rounded-lg text-base font-semibold transition
                      ${isActive 
                        ? 'bg-emerald-800 text-white' 
                        : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-900'
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-900 text-white font-bold text-center text-sm shadow-md hover:bg-emerald-800 transition flex items-center justify-center gap-2"
              >
                <span>Complete Admission Application</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-center text-sm hover:bg-slate-50 transition"
              >
                Schedule Campus Visit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
