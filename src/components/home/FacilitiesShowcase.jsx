import React, { useState } from 'react';
import { facilities } from '../../data/schoolData';
import SectionHeader from '../common/SectionHeader';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FacilitiesShowcase() {
  const [activeTab, setActiveTab] = useState(facilities[0].id);
  const currentFacility = facilities.find(f => f.id === activeTab) || facilities[0];

  return (
    <section className="py-20 bg-stone-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Learning Environment"
          arabicSubtitle="المَرَافِقُ المَدْرَسِيَّةُ"
          title="Designed for Academic & Spiritual Flourishing"
          subtitle="Explore our purpose-built campus infrastructure equipped with modern science laboratories, quiet Quranic sanctuaries, and recreational arenas."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {facilities.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setActiveTab(fac.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === fac.id
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200'
              }`}
            >
              {fac.category}
            </button>
          ))}
        </div>

        {/* Active Facility Featured Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
              <img
                src={currentFacility.image}
                alt={currentFacility.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-emerald-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs border border-amber-400/40">
                {currentFacility.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {currentFacility.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentFacility.description}
              </p>

              {/* Facility features list */}
              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Key Specifications:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentFacility.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 uppercase tracking-wider"
                >
                  <span>Schedule an in-person campus walkthrough</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
