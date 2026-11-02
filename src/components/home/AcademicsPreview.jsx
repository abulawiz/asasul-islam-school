import React from 'react';
import { Link } from 'react-router-dom';
import { academicProgrammes } from '../../data/schoolData';
import SectionHeader from '../common/SectionHeader';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AcademicsPreview() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Academic Excellence"
          arabicSubtitle="بَرَامِجُنَا الأَكَادِيمِيَّةُ"
          title="Progressive Learning Pathways"
          subtitle="From early childhood discovery to senior college preparatory tracks, our academic framework nurtures each pupil's intellectual and spiritual evolution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {academicProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="flex flex-col bg-stone-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-700/50 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-2.5 py-1 rounded bg-amber-400 text-emerald-950 text-xs font-bold uppercase tracking-wider inline-block">
                    {prog.subtitle.split('|')[0].trim()}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="space-y-1.5 border-t border-slate-200/80 pt-3 mb-4">
                    {prog.highlights.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/academics#${prog.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-800 text-emerald-900 hover:text-white border border-slate-200 hover:border-emerald-800 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Programme Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Special Tahfeez Focus Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 text-white p-6 sm:p-8 border border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-wider">
              Signature Department
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Specialized Tahfeez-ul-Qur'an & Tajweed Academy
            </h3>
            <p className="text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              We offer both regular classroom memorization tracks and an accelerated intensive Huffaz stream mentored by certified scholars holding authentic Sanad / Ijazah.
            </p>
          </div>
          <Link
            to="/academics#tahfeez"
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-md transition-colors"
          >
            Learn About Tahfeez
          </Link>
        </div>

      </div>
    </section>
  );
}
