import React, { useState } from 'react';
import { Phone, Mail, Clock, ShieldCheck, UserCheck, X } from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export default function TopBar() {
  const [showPortalModal, setShowPortalModal] = useState(false);

  return (
    <>
      <div className="bg-emerald-950 text-emerald-100 text-xs border-b border-emerald-900/60 transition-colors">
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
                <span>Mon – Fri: 7:30 AM – 3:30 PM</span>
              </div>
            </div>

            {/* Right: Islamic motto & Portal Access */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="hidden sm:flex items-center gap-2 text-amber-300/90 font-medium">
                <span className="font-arabic text-sm">العِلْمُ نُورٌ</span>
                <span className="text-emerald-700">·</span>
                <span>Knowledge is Light</span>
              </div>

              <div className="flex items-center gap-2 ml-auto md:ml-0">
                <button
                  onClick={() => setShowPortalModal(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-amber-300 hover:text-white border border-emerald-700/60 text-xs font-medium transition-all"
                  title="School Management Portal Login"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Portal Login</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Portal Demonstration Modal */}
      {showPortalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-slate-800">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Asasul Islam EduPortal</h3>
                  <p className="text-xs text-emerald-200">Parent, Student & Staff Secure Gateway</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPortalModal(false)}
                className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Welcome to the student information system. Log in to access termly report sheets, attendance, Tahfeez logbooks, and fee status.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Portal ID / Admission Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AIS/2026/0842" 
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Access PIN / Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded text-emerald-700 focus:ring-emerald-700" />
                    Remember me
                  </label>
                  <button type="button" className="text-emerald-800 hover:underline">Forgot credentials?</button>
                </div>

                <button 
                  onClick={() => {
                    alert("This is a frontend demonstration. In the live production portal, authenticated users proceed to their personalized dashboard.");
                    setShowPortalModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm shadow-md transition-colors"
                >
                  Sign In to Portal
                </button>

                <p className="text-center text-xs text-slate-400 pt-2">
                  New student? Your credentials are provided upon admission confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
