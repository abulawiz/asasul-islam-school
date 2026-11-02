import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, CheckCircle2, FileText, PhoneCall } from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export default function AdmissionCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      
      {/* Decorative Islamic Arch Geometric accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-emerald-900/60 border border-amber-400/30 p-8 sm:p-12 lg:p-16 backdrop-blur-md shadow-2xl">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Enrollment Now Open for 2026/2027 Academic Year</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Give Your Child the Foundation of Knowledge, Faith & Future Leadership
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Seats are limited in our classrooms to preserve our intimate teacher-to-student ratio and individualized Tahfeez mentorship. Begin your application today.
            </p>

            {/* Quick Benefits Ticker */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-amber-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Zero Application Fee for Early Birds
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Flexible Fee Installment Plans
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Merit Tahfeez Scholarships
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/admissions#apply"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 active:scale-95 transition-all inline-flex items-center gap-2 group"
              >
                <span>Apply Online Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Talk to Admissions: {schoolInfo.contact.phonePrimary}</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
