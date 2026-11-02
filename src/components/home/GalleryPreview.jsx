import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import { galleryItems } from '../../data/schoolData';
import SectionHeader from '../common/SectionHeader';
import Lightbox from '../gallery/Lightbox';

export default function GalleryPreview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const previewItems = galleryItems.slice(0, 6);

  const openLightbox = (index) => {
    setSelectedIdx(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + previewItems.length) % previewItems.length);
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % previewItems.length);
  };

  return (
    <section className="py-20 bg-stone-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Moments & Memories"
          arabicSubtitle="مَعْرِضُ الصُّوَرِ"
          title="Glimpses of Vibrant Campus Life"
          subtitle="Explore the lively atmosphere of our daily assemblies, Tajweed halaqahs, lab discoveries, and athletic triumphs."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {previewItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold leading-snug">
                  {item.title}
                </h4>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/80">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-800 text-emerald-900 hover:text-white border border-emerald-800 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>Explore Complete Photo Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <Lightbox
          images={previewItems}
          currentIndex={selectedIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
