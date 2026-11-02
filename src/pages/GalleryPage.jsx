import React, { useState } from 'react';
import { Eye, Filter, Sparkles, Image as ImageIcon } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Lightbox from '../components/gallery/Lightbox';
import { galleryItems } from '../data/schoolData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const categories = [
    'All',
    'Campus Life',
    'Tahfeez & Islamic Life',
    'STEM & Laboratories',
    'Classroom Activities',
    'Sports & Athletics',
    'Events & Celebrations'
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % filteredItems.length);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Banner */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            Visual Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            School Activities & Campus Life Gallery
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Take a visual tour through our daily routines, learning moments, laboratory experiments, sports competitions, and Qur'an recitals.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-black"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />

              {/* Default Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-amber-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs border border-amber-400/30">
                  {item.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <h3 className="text-base sm:text-lg font-bold leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {item.caption}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Eye className="w-4 h-4" />
                  <span>Click to expand image</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          images={filteredItems}
          currentIndex={currentIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

    </div>
  );
}
