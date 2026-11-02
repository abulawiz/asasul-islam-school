import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, GraduationCap, Award, CheckCircle2, 
  Clock, Calendar, Cpu, Compass, ArrowRight, Brain, Lightbulb 
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { academicProgrammes } from '../data/schoolData';
import { Link } from 'react-router-dom';

export default function AcademicsPage() {
  const [activeSection, setActiveSection] = useState('all');

  const subjectsPrimary = [
    "Mathematics & Numerical Reasoning",
    "English Language, Phonics & Literacy",
    "General Basic Science & Technology",
    "Social Studies & Civic Education",
    "Tahfeez-ul-Qur'an (Memorization & Tajweed)",
    "Arabic Language & Penmanship",
    "Islamic Religious Studies (Tawheed, Fiqh, Seerah)",
    "Computer Science & Coding Fundamentals",
    "Creative Arts & Handcrafts",
    "Physical & Health Education"
  ];

  const subjectsSecondary = [
    "Pure Sciences: Physics, Chemistry, Biology, Further Maths",
    "General Mathematics & English Language",
    "Computer Studies & Data Processing",
    "Commerce, Accounting & Financial Economics",
    "Government, Literature in English & History",
    "Advanced Arabic Language & Literature",
    "Islamic Studies & Usul-ud-Deen",
    "Tahfeez & Contextual Tafseer Studies",
    "Technical Drawing & Visual Arts",
    "Civic Education & Leadership Mentorship"
  ];

  const methodologies = [
    {
      title: "Inquiry-Based Experiential Learning",
      description: "Students actively explore problems through laboratory experiments, robotics projects, and field research rather than rote memorization.",
      icon: Lightbulb
    },
    {
      title: "Harmonized Islamic Integration",
      description: "Every secular discipline connects to divine order—observing physics and biology as manifestations of divine design and wisdom.",
      icon: Compass
    },
    {
      title: "Differentiated Individual Mentorship",
      description: "With small classroom sizes capped at 18–20 pupils, teachers adapt instructional pacing to accommodate diverse learning styles.",
      icon: Brain
    },
    {
      title: "Computational & Digital Literacy",
      description: "Integrated coding, data literacy, and interactive smartboards prepare learners for success in an AI-driven global economy.",
      icon: Cpu
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Banner */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            Academic Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            World-Class Curriculum Rooted in Divine Wisdom
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Delivering the best of Cambridge International and National standards, seamlessly blended with rigorous Quranic memorization and Arabic fluency.
          </p>
        </div>
      </section>

      {/* 1. Academic Programmes Detailed Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Academic Tiers"
            arabicSubtitle="المَرَاحِلُ الدِّرَاسِيَّةُ"
            title="Comprehensive Educational Stages"
            subtitle="Tailored to each developmental phase, ensuring academic mastery, emotional balance, and spiritual growth."
          />

          <div className="space-y-16">
            {academicProgrammes.map((prog, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={prog.id}
                  id={prog.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm bg-stone-50/60 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-emerald-950/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs border border-amber-400/30">
                        {prog.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : ''}`}>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                      Stage 0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {prog.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                        Curricular Focus & Outcomes:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prog.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        to="/admissions"
                        className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Enrol for this Level</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Primary & Secondary Subject Outlines */}
      <section className="py-20 bg-stone-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Curricular Breadth"
            arabicSubtitle="المَنَاهِجُ الدِّرَاسِيَّةُ"
            title="Subjects & Integrated Disciplines"
            subtitle="Discover the rich subject offerings spanning sciences, humanities, modern technologies, and classical Islamic sciences."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Primary Subjects */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Primary School Core Subjects</h3>
                  <p className="text-xs text-slate-500">Grades 1 through 6 Curriculum</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjectsPrimary.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 text-xs text-slate-700 font-medium border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Subjects */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Secondary School Tracks</h3>
                  <p className="text-xs text-slate-500">Science, Commercial & Arts Streams (JSS & SSS)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjectsSecondary.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 text-xs text-slate-700 font-medium border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Tahfeez-ul-Qur'an Dedicated Section */}
      <section id="tahfeez" className="py-20 bg-emerald-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider inline-block">
                Tahfeez-ul-Qur'an Department
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Preserving the Sacred Text: Memorization with Understanding
              </h2>
              <p className="text-emerald-100 text-base leading-relaxed">
                The Holy Qur'an is the beating heart of Asasul Islam School. Our Tahfeez programme is not an extra-curricular addition; it is woven into the morning rhythm of every school day, ensuring optimal concentration when pupils' minds are freshest.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">Regular Tahfeez Track</h4>
                  <p className="text-xs text-emerald-100">Integrated into the regular academic timetable; pupils memorize between 5 to 15 Juz' by secondary graduation with immaculate Tajweed.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">Accelerated Intensive Huffaz Stream</h4>
                  <p className="text-xs text-emerald-100">An intensive, structured pathway for gifted memorizers aspiring to complete the full 30 Juz' with verified certification (Ijazah) before university entrance.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop"
                  alt="Quran recitation and Tajweed"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                  <span className="font-arabic text-2xl text-amber-300 block mb-1">
                    « خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ »
                  </span>
                  <p className="text-xs text-emerald-200">
                    "The best among you are those who learn the Qur'an and teach it." — Sahih Al-Bukhari
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Teaching Methodology */}
      <section id="methodology" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Pedagogy & Practice"
            arabicSubtitle="طُرُقُ التَّدْرِيسِ وَالمَنْهَجِيَّةُ"
            title="Our Teaching Methodology"
            subtitle="How our certified educators inspire curiosity, critical analysis, and profound moral consciousness."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologies.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  className="bg-stone-50 p-6 rounded-2xl border border-slate-200 hover:border-emerald-700/40 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Learning Environment & Co-Curricular */}
      <section className="py-20 bg-stone-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-amber-400/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Co-Curricular Clubs & Societies</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Holistic Growth Beyond the Blackboard
              </h3>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                Students participate in weekly clubs including Junior Engineers & Technologists (JETS), Literary & Debating Society, Red Cross First Aid, Young Entrepreneurs, Robotics Club, and Islamic Cultural Troupe.
              </p>
            </div>
            <Link
              to="/admissions"
              className="shrink-0 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm shadow-md transition-all"
            >
              Apply for 2026/2027 Session
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
