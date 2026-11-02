import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center">
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 max-h-[72vh] flex items-center justify-center bg-black">
          <img
            src={currentImage.image}
            alt={currentImage.title}
            className="max-h-[72vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Caption & Category */}
        <div className="mt-4 text-white max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-800 text-amber-300 font-semibold uppercase tracking-wider">
              {currentImage.category}
            </span>
            <span className="text-xs text-white/60">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">{currentImage.title}</h3>
          {currentImage.caption && (
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
