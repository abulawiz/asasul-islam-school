import React from 'react';
import { BookOpen, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeBanner() {
  return (
    <section className="py-16 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Islamic Bismillah Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="font-arabic text-2xl sm:text-3xl text-emerald-800 mb-3 tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Welcome to Asasul Islam School
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
            Cultivating Scholarly Minds, Virtuous Hearts, and Exemplary Leaders
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            At Asasul Islam School, we believe that true education nurtures the intellect alongside the soul. Our integrated learning model delivers world-class academic preparation while grounding every student in God-consciousness (Taqwa), benevolence (Ihsan), and service to humanity.
          </p>
        </div>

        {/* 3 Core Highlight Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="p-6 rounded-2xl bg-stone-50 border border-slate-200/80 hover:border-emerald-700/40 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Harmonized Curriculum
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              A balanced synthesis of national STEM/humanities benchmarks, Cambridge international requirements, and authentic Islamic religious sciences.
            </p>
            <Link to="/academics" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-600">
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-slate-200/80 hover:border-emerald-700/40 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-5 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Tahfeez & Tarbiyah Focus
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Dedicated Quran memorization tracks guided by certified Azhari scholars, complemented by daily character building and Islamic etiquettes.
            </p>
            <Link to="/about#vision" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-600">
              <span>Our Values & Tarbiyah</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-slate-200/80 hover:border-emerald-700/40 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-5 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Future-Ready STEM Labs
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Hands-on robotics, computer coding, advanced science labs, and interactive smart classrooms that empower 21st-century problem solvers.
            </p>
            <Link to="/academics#methodology" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-600">
              <span>Methodology & Labs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
