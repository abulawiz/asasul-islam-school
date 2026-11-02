import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Bell } from 'lucide-react';
import { newsAndEvents } from '../../data/schoolData';
import SectionHeader from '../common/SectionHeader';

export default function NewsPreview() {
  const latestItems = newsAndEvents.slice(0, 3);

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-900 border border-emerald-200 mb-3">
              <Bell className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
              <span>Campus Happenings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Latest News & Announcements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Stay informed on upcoming Qur'an recitals, academic conferences, STEM exhibitions, and key termly milestones.
            </p>
          </div>

          <Link
            to="/news"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-800 text-emerald-900 hover:bg-emerald-800 hover:text-white font-bold text-xs transition-all"
          >
            <span>View All News & Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestItems.map((item) => (
            <article
              key={item.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-slate-200/90 hover:border-emerald-700/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-emerald-900/90 text-amber-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="truncate">{item.venue}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                </div>

                <Link
                  to={`/news/${item.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-600 hover:underline pt-2 border-t border-slate-200/80"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
