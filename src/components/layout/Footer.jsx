import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, CheckCircle2 
} from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

const currentYear = 2026;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-emerald-950 text-slate-300 pt-16 border-t-4 border-amber-500/80">
      
      {/* Top Banner: Prophetic Hadith on Ilm */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border border-amber-400/30 p-6 md:p-8 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-amber-400/5 blur-2xl"></div>
          <div className="relative z-10">
            <span className="font-arabic text-xl md:text-2xl text-amber-300 font-bold tracking-wide block mb-2">
              « مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الجَنَّةِ »
            </span>
            <p className="text-emerald-100 text-sm md:text-base font-medium max-w-2xl mx-auto italic">
              "Whoever takes a path upon which he seeks knowledge, Allah makes a path to Paradise easy for him."
            </p>
            <span className="text-xs text-amber-400/80 font-semibold tracking-wider uppercase mt-1 block">
              — Sahih Muslim 2699
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: School Overview & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 border border-amber-400/40 flex items-center justify-center p-2 shadow-sm">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
                  <path d="M50 20 C34 32 30 46 30 72 C38 68 45 68 50 71 C55 68 62 68 70 72 C70 46 66 32 50 20 Z" fill="#047857" stroke="#fde047" strokeWidth="2"/>
                  <polygon points="50,26 52,31 57,31 53,34 55,39 50,36 45,39 47,34 43,31 48,31" fill="#fde047"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">ASASUL ISLAM SCHOOL</h3>
                <p className="text-xs text-amber-300 font-medium">International Islamic Education</p>
              </div>
            </div>

            <p className="text-sm text-slate-300/90 leading-relaxed pr-4">
              Dedicated to academic excellence, foundational moral character, and authentic Islamic scholarship. Preparing visionary leaders for success in this world and the Hereafter.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-2">Accreditations & Affiliations</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-900/80 border border-emerald-700/60 text-emerald-200">
                  National Ministry of Education
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-900/80 border border-emerald-700/60 text-emerald-200">
                  Cambridge Curriculum Standard
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-900/80 border border-emerald-700/60 text-emerald-200">
                  Al-Azhar Integrated Syllabus
                </span>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-3">
              <a href={schoolInfo.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={schoolInfo.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={schoolInfo.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={schoolInfo.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Our School</Link>
              </li>
              <li>
                <Link to="/about#vision" className="hover:text-amber-300 transition-colors">Vision, Mission & Values</Link>
              </li>
              <li>
                <Link to="/about#principal" className="hover:text-amber-300 transition-colors">Principal's Address</Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-amber-300 transition-colors">Academic Programmes</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-300 transition-colors">Admission Procedures</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-amber-300 transition-colors">News & Announcements</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors">Campus Photo Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Campus Location & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Academics & Sections */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Programmes
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/academics#early-years" className="hover:text-amber-300 transition-colors">Early Childhood & Creche</Link>
              </li>
              <li>
                <Link to="/academics#primary-school" className="hover:text-amber-300 transition-colors">Primary School (Grades 1-6)</Link>
              </li>
              <li>
                <Link to="/academics#secondary" className="hover:text-amber-300 transition-colors">Junior Secondary (JSS 1-3)</Link>
              </li>
              <li>
                <Link to="/academics#secondary" className="hover:text-amber-300 transition-colors">Senior Secondary (SSS 1-3)</Link>
              </li>
              <li>
                <Link to="/academics#tahfeez" className="hover:text-amber-300 transition-colors">Intensive Tahfeez Track</Link>
              </li>
              <li>
                <Link to="/academics#methodology" className="hover:text-amber-300 transition-colors">Teaching Methodology</Link>
              </li>
              <li>
                <Link to="/admissions#faqs" className="hover:text-amber-300 transition-colors">Admissions FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info & Bulletin */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{schoolInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{schoolInfo.contact.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{schoolInfo.contact.emailAdmissions}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p>{schoolInfo.contact.workingHours}</p>
                  <p className="text-amber-300/80">{schoolInfo.contact.fridayHours}</p>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-5 pt-4 border-t border-emerald-900">
              <span className="text-xs font-semibold text-white block mb-1.5">
                School Termly Bulletin
              </span>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter parent email..."
                    className="w-full px-3 py-2 text-xs bg-emerald-900/60 border border-emerald-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3 py-2 rounded-r-lg text-xs font-bold transition-colors"
                  >
                    Join
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-amber-300 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Thank you! Subscribed to termly updates.
                  </p>
                )}
              </form>
            </div>

          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} ASASUL ISLAM SCHOOL. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/about" className="hover:text-amber-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-amber-300">Terms of Enrollment</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-300">Staff Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
