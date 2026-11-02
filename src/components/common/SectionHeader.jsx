import React from 'react';

export default function SectionHeader({
  badge,
  arabicSubtitle,
  title,
  subtitle,
  center = true,
  light = false
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
          light 
            ? 'bg-emerald-800/60 text-amber-300 border border-amber-300/30' 
            : 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-xs'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          {badge}
        </div>
      )}

      {arabicSubtitle && (
        <div className={`font-arabic text-xl md:text-2xl mb-2 font-medium ${
          light ? 'text-amber-300/90' : 'text-emerald-800'
        }`}>
          {arabicSubtitle}
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>

      {/* Decorative Islamic arch divider */}
      <div className={`flex items-center gap-2 my-4 ${center ? 'justify-center' : 'justify-start'}`}>
        <span className={`h-px w-10 ${light ? 'bg-amber-400/40' : 'bg-emerald-800/30'}`}></span>
        <div className={`w-2 h-2 rotate-45 ${light ? 'bg-amber-400' : 'bg-amber-600'}`}></div>
        <span className={`h-px w-16 ${light ? 'bg-amber-400/70' : 'bg-amber-600'}`}></span>
        <div className={`w-2 h-2 rotate-45 ${light ? 'bg-amber-400' : 'bg-amber-600'}`}></div>
        <span className={`h-px w-10 ${light ? 'bg-amber-400/40' : 'bg-emerald-800/30'}`}></span>
      </div>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          light ? 'text-emerald-100/90' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
