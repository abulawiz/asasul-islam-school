import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Award } from 'lucide-react';
import { leadership } from '../../data/schoolData';

export default function PrincipalMessage() {
  const principal = leadership[0];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden shadow-2xl border border-amber-400/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left: Administration Crest & Hall */}
            <div className="lg:col-span-5 relative h-full min-h-[360px] sm:min-h-[440px] flex items-center justify-center bg-emerald-950 overflow-hidden">
              <img
                src={principal.image}
                alt="Office of the Principal - Asasul Islam School"
                className="w-full h-full object-cover opacity-40 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40"></div>

              {/* Central Executive Insignia */}
              <div className="relative z-10 text-center flex flex-col items-center p-6">
                <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-300 border-2 border-amber-400/50 flex items-center justify-center mb-3 shadow-2xl backdrop-blur-xs">
                  <Award className="w-10 h-10 text-amber-300" />
                </div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-emerald-900/90 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-sm">
                  Executive Seal
                </span>
                <h4 className="font-extrabold text-base text-white mt-3">{principal.name}</h4>
                <p className="text-xs text-emerald-200 mt-0.5">{principal.role}</p>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-emerald-900/80 backdrop-blur-md py-2 px-3 rounded-xl border border-amber-400/30 text-center z-10">
                <p className="text-[11px] text-amber-200/90 font-medium">ABU Zaria · 24+ Years Institutional Leadership</p>
              </div>
            </div>

            {/* Right: Message Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
              
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-5 h-5 rotate-180 text-amber-400" />
                <span>Message from the Principal's Desk</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                "Our Solemn Pledge: Guarding Faith While Inspiring World-Class Achievement in Nigeria."
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                Peace, mercy, and blessings be upon you. Welcome to Asasul Islam School. Every child entrusted to our care represents a sacred trust (<em className="text-amber-200">Amanah</em>). In a rapidly modernizing Nigerian society, parents often face an agonizing compromise between moral integrity and academic competitiveness.
              </p>

              <p className="text-emerald-200/90 text-sm leading-relaxed">
                At Asasul Islam School, we prove daily that no such compromise is required. Our Nigerian students dissect biological organisms in contemporary laboratories, code algorithms, and master algebra—all while carrying the words of Allah in their hearts and exhibiting exemplary Islamic adab.
              </p>

              {/* Principal's credentials bullet */}
              <div className="bg-emerald-900/60 rounded-xl p-4 border border-emerald-800/80 text-xs text-emerald-200 space-y-1">
                <div className="font-semibold text-amber-300">Scholastic Leadership:</div>
                <p>{principal.qualifications}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about#principal"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition shadow-md inline-flex items-center gap-2"
                >
                  <span>Read Full Welcome Address</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
                >
                  Book a Consultation
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
