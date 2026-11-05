import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Search, 
  ArrowRight, Filter 
} from 'lucide-react';
import { newsAndEvents } from '../data/schoolData';

export default function NewsEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academic', 'Islamic Events', 'Sports', 'Announcements'];

  const filteredNews = newsAndEvents.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 dark:bg-[#05100c] min-h-screen transition-colors duration-300">
      
      {/* Banner */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            School Bulletin
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            News, Events & Academic Highlights
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Stay abreast of the latest milestones, competition victories, holiday schedules, and vibrant campus activities in Nigeria.
          </p>
        </div>
      </section>

      {/* Official Announcements Alert Strip */}
      <div className="bg-amber-400 dark:bg-amber-500 text-emerald-950 font-medium py-3 px-4 border-b border-amber-500/40 text-xs sm:text-sm shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-extrabold uppercase bg-emerald-950 text-amber-300 px-2.5 py-0.5 rounded text-[11px] shrink-0">
              Notice
            </span>
            <span className="truncate">
              Registration ongoing for Entrance Examinations into 2026/2027 Academic Session.
            </span>
          </div>
          <Link to="/admissions" className="font-bold underline shrink-0 hover:text-emerald-900">
            Apply Now →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Search & Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 dark:bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-900 dark:hover:text-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news or events..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-700/40 dark:hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo Banner */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded bg-emerald-900/90 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-amber-400/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-1 text-emerald-800 dark:text-amber-300 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors mb-2.5 leading-snug">
                      <Link to={`/news/${item.id}`}>
                        {item.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 bg-stone-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="truncate">{item.venue}</span>
                    </div>
                  </div>

                  <Link
                    to={`/news/${item.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-50 dark:bg-slate-800 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-emerald-900 dark:text-amber-300 hover:text-white border border-slate-200 dark:border-slate-700 hover:border-emerald-800 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No announcements match your search</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try selecting another category or clearing your search query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-800 dark:bg-emerald-700 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
