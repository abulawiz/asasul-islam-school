import React from 'react';
import { 
  Layers, BookMarked, Cpu, Compass, UserCheck, ShieldAlert 
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { whyChooseUs } from '../../data/schoolData';

const iconMap = {
  Layers: Layers,
  BookMarked: BookMarked,
  Cpu: Cpu,
  Compass: Compass,
  UserCheck: UserCheck,
  ShieldAlert: ShieldAlert
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-stone-50 dark:bg-[#071510] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Islamic Geometric Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-100/30 dark:bg-emerald-950/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          badge="The Asasul Islam Difference"
          arabicSubtitle="لِمَاذَا تَخْتَارُ مَدْرَسَتَنَا؟"
          title="Why Discerning Families Choose Us"
          subtitle="We combine academic rigor, moral rectitude, and forward-looking skills within a supportive Nigerian community dedicated to raising tomorrow's ethical pioneers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon] || Layers;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-700/40 dark:hover:border-emerald-500/40 transition-all duration-300 group relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Header with Icon & Counter */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-200 dark:text-slate-800 group-hover:text-amber-500/30 transition-colors font-heading">
                      0{item.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-900 dark:group-hover:text-amber-300 transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom border accent */}
                <div className="w-12 h-0.5 bg-slate-100 dark:bg-slate-800 group-hover:w-full group-hover:bg-amber-400 transition-all duration-300 mt-6"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
