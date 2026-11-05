import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, UserCheck } from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export default function TopBar() {
  return (
    <div className="bg-emerald-950 text-emerald-100 text-xs border-b border-emerald-900/60 dark:border-emerald-800/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-2">
          
          {/* Left: Contact quick links */}
          <div className="flex items-center flex-wrap gap-4 text-emerald-200/90 text-xs">
            <a 
              href={`tel:${schoolInfo.contact.phonePrimary.replace(/[^0-9+]/g, '')}`} 
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.contact.phonePrimary}</span>
            </a>
            <span className="hidden sm:inline text-emerald-700">|</span>
            <a 
              href={`mailto:${schoolInfo.contact.emailAdmissions}`} 
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.contact.emailAdmissions}</span>
            </a>
            <span className="hidden md:inline text-emerald-700">|</span>
            <div className="hidden lg:inline-flex items-center gap-1.5 text-emerald-300/80">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Mon – Fri: 7:30 AM – 3:30 PM (Nigeria)</span>
            </div>
          </div>

          {/* Right: Motto & Portal Access */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden sm:flex items-center gap-2 text-amber-300 font-semibold tracking-wide">
              <span>Faith · Knowledge · Character</span>
            </div>

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <Link
                to="/portal"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 hover:text-white border border-emerald-700/60 text-xs font-semibold transition-all shadow-xs"
                title="Open School EduPortal (Students, Parents & Admin)"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>EduPortal Login</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
