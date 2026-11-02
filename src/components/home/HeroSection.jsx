import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Award, 
  Users, GraduationCap, BookOpen, FlaskConical, Sparkles, CheckCircle2 
} from 'lucide-react';
import { heroSlides, schoolInfo } from '../../data/schoolData';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div 
      className="relative bg-emerald-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Viewport */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Multi-layer Gradient */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
                />
                {/* Rich Islamic Emerald & Black Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-900/40"></div>
                <div className="absolute inset-0 bg-radial-at-c from-transparent via-emerald-950/40 to-emerald-950"></div>
              </div>

              {/* Slide Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-20 lg:py-28">
                <div className="max-w-2xl lg:max-w-3xl space-y-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
                    {slide.subtitle}
                  </p>

                  {/* Key Highlights Quick Bullets */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-emerald-200/90 font-medium pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Cambridge & National Standard</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Structured Tahfeez & Tajweed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Holistic Tarbiyah Mentorship</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      to={slide.ctaPrimaryLink}
                      className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-emerald-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20 active:scale-95 transition-all inline-flex items-center gap-2 group"
                    >
                      <span>{slide.ctaPrimary}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-950 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to={slide.ctaSecondaryLink}
                      className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white hover:text-amber-300 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/50 backdrop-blur-xs transition-all inline-flex items-center gap-2"
                    >
                      <span>{slide.ctaSecondary}</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="absolute right-6 bottom-28 sm:bottom-24 z-30 flex items-center gap-2.5">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-emerald-900/70 hover:bg-emerald-800 text-white border border-amber-400/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-amber-300" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-emerald-900/70 hover:bg-emerald-800 text-white border border-amber-400/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-amber-300" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute left-6 bottom-28 sm:bottom-24 z-30 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats Bar (Overlap bottom of Hero) */}
      <div className="relative z-30 bg-emerald-900/95 border-t border-amber-400/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/60">
            {schoolInfo.quickStats.map((stat, idx) => (
              <div key={idx} className={`text-center px-2 py-1 ${idx > 0 ? 'pt-3 sm:pt-0' : ''}`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 font-medium leading-tight mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
