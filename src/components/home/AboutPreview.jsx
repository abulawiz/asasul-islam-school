import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

export default function AboutPreview() {
  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Badge */}
          <div className="lg:col-span-6 relative">
            
            {/* Primary Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
                alt="Students at Asasul Islam School"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
              
              {/* Bottom Card Inside Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Islamic Tarbiyah</div>
                  <div className="text-sm font-extrabold text-slate-900">Holistic Moral Mentorship</div>
                </div>
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -right-4 sm:-right-6 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 rounded-2xl shadow-xl border-2 border-amber-400 max-w-[170px] text-center hidden sm:block">
              <span className="block text-3xl font-extrabold text-amber-300 font-heading">16+</span>
              <span className="text-xs font-semibold text-emerald-100 leading-tight block mt-1">
                Years of Academic & Moral Distinction
              </span>
            </div>

            {/* Decorative Islamic Geometric Frame Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl border-4 border-amber-400/30 -z-10 hidden sm:block"></div>
          </div>

          {/* Right Column: Detailed School Overview */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              About Our Institution
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              An Educational Haven Where Modern Intellect Meets Divine Guidance
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Founded in 2008, <strong className="text-emerald-900 font-semibold">ASASUL ISLAM SCHOOL</strong> was conceived out of a profound aspiration: to provide Muslim children with premier, non-compromising 21st-century academic training while deeply grounding them in the noble Quran, prophetic traditions (Sunnah), and high ethical standards.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              Our campus provides an enriching environment free from moral compromises, where students discover their academic strengths, hone analytical problem-solving abilities, and memorize the Noble Qur’an with Tajweed.
            </p>

            {/* Key Value Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  <strong>Integrated Dual Curriculum:</strong> National syllabus and Cambridge standard combined with authentic Arabic & Islamic disciplines.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  <strong>Dedicated Tahfeez Faculty:</strong> Certified Huffaz providing individualized memorization tracking and Tajweed recitation.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  <strong>Personalized Character Mentorship:</strong> Daily prayers, moral reflection halaqahs, and small classes capped at 18–20 students.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/about"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-md inline-flex items-center gap-2 group"
              >
                <span>Read Full School History</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about#principal"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 hover:border-emerald-700 transition-all inline-flex items-center gap-2"
              >
                <span>Principal's Message</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
