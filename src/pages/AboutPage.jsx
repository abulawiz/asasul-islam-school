import React from 'react';
import { 
  History, Sparkles, Target, Compass, Award, ShieldCheck, 
  HeartHandshake, BookOpen, Heart, Users, CheckCircle2 
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { leadership, coreValues, schoolInfo } from '../data/schoolData';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  BookOpen: BookOpen,
  Heart: Heart,
  Target: Target
};

export default function AboutPage() {
  const principal = leadership[0];

  const milestones = [
    {
      year: "2008",
      title: "The Vision Takes Root",
      description: "Founded by a committee of dedicated Muslim educationists and professionals with an initial cohort of 45 pupils in pre-primary and basic classes."
    },
    {
      year: "2013",
      title: "Accreditation & Expansion",
      description: "Obtained full Ministry of Education licensing and inaugurated the primary school wing with dedicated Tahfeez halaqahs."
    },
    {
      year: "2018",
      title: "Secondary School & Modern Labs",
      description: "Commissioned the state-of-the-art Secondary School campus, featuring modern Biology, Chemistry, and Physics laboratories and an 800-seat central Masjid."
    },
    {
      year: "2023",
      title: "International Benchmarking & STEM Integration",
      description: "Integrated Cambridge IGCSE syllabi and inaugurated the Robotics & Coding Centre, graduating our 10th batch of certified Huffaz."
    },
    {
      year: "Present",
      title: "A Beacon of Dual Scholastic Excellence",
      description: "Over 1,200 active learners, a thriving alumni network enrolled in top global universities, and recognized as a leading Islamic institution."
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Page Header Banner */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            About Asasul Islam School
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Heritage, Values & Scholastic Vision
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Nurturing generations of upright, intellectually accomplished Muslims equipped with the wisdom of the Qur'an and the skills of the modern world.
          </p>
        </div>
      </section>

      {/* 1. School Profile & Overview */}
      <section id="profile" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                Institutional Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                A Holistic Community Dedicated to Taqwa & Intellectual Rigor
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {schoolInfo.description}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our educational philosophy bridges the false dichotomy between secular proficiency and spiritual cultivation. We hold that learning mathematics, physical sciences, literature, and social sciences is an act of observing the signs of the Creator (<em>Ayatullah</em>) when conducted through an ethical framework.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 border border-slate-200">
                  <div className="text-2xl font-black text-emerald-800">100%</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">WAEC & NECO Pass Rate</div>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-slate-200">
                  <div className="text-2xl font-black text-amber-600">320+</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">Certified Quran Huffaz</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                  alt="Asasul Islam School Students in Class"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-arabic text-xl text-amber-300 block mb-1">
                    « رَبِّ زِدْنِي عِلْمًا »
                  </span>
                  <p className="text-xs text-emerald-100 font-medium">
                    "My Lord, increase me in knowledge." — Surah Ta-Ha [20:114]
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Vision, Mission & Philosophy */}
      <section id="vision" className="py-20 bg-emerald-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Institutional Philosophy"
            arabicSubtitle="رُؤْيَتُنَا وَرِسَالَتُنَا"
            title="Vision & Mission"
            subtitle="The strategic North Star guiding every pedagogical decision, moral standard, and student support mechanism."
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <div className="bg-emerald-900/70 border border-amber-400/40 rounded-3xl p-8 sm:p-10 relative overflow-hidden backdrop-blur-xs flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Our Aspiration</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                  The Vision
                </h3>
                <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                  "To be a premier global Islamic citadel of learning that produces scholarly, visionary leaders possessing uncompromising integrity, world-class academic competence, and profound devotion to Allah and the welfare of society."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-800 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Nurturing tomorrow's ethical problem solvers</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-emerald-900/70 border border-amber-400/40 rounded-3xl p-8 sm:p-10 relative overflow-hidden backdrop-blur-xs flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mb-6">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Our Daily Commitment</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                  The Mission
                </h3>
                <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                  "To provide a rigorous, stimulating dual curriculum that inspires critical inquiry and scientific innovation while embedding the Noble Qur'an, prophetic character (Sunnah), and compassionate civic responsibility in every learner."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-800 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Excellence in intellect, morals, and spiritual fortitude</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Moral Foundation"
            arabicSubtitle="قِيَمُنَا الأَسَاسِيَّةُ"
            title="Our Guiding Core Values"
            subtitle="The foundational ethos inculcated into every lesson, assembly, and interpersonal relationship on our campus."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const Icon = iconMap[val.icon] || HeartHandshake;
              return (
                <div
                  key={val.id}
                  className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-emerald-700/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-arabic text-lg text-emerald-800 font-bold">
                      {val.arabic}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mb-2">
                    {val.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. School History Timeline */}
      <section id="history" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Our Journey"
            arabicSubtitle="تَارِيخُ المَدْرَسَةِ"
            title="The History of Asasul Islam School"
            subtitle="A humble beginning fueled by sincere intention, evolving into a distinguished institution of learning."
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-emerald-700/30 pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-12">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-emerald-800 text-amber-300 border-4 border-white shadow-md flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>

                  <div className="bg-stone-50 p-6 rounded-2xl border border-slate-200/90 group-hover:border-emerald-700/40 group-hover:shadow-md transition-all">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Principal's Detailed Message */}
      <section id="principal" className="py-20 bg-stone-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Photo & Bio Column */}
              <div className="lg:col-span-4 bg-emerald-950 p-8 text-white flex flex-col justify-between">
                <div>
                  <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-lg mb-6">
                    <img
                      src={principal.image}
                      alt={principal.name}
                      className="w-full h-80 object-cover object-top"
                    />
                  </div>

                  <h3 className="text-xl font-extrabold text-white">{principal.name}</h3>
                  <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mt-1">{principal.role}</p>

                  <div className="mt-5 pt-4 border-t border-emerald-800/80 text-xs text-emerald-200/90 space-y-2">
                    <div>
                      <span className="text-white font-semibold">Qualifications:</span>
                      <p>{principal.qualifications}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 text-xs text-emerald-300 italic">
                  "Education without moral integrity is like a ship without a compass."
                </div>
              </div>

              {/* Message Column */}
              <div className="lg:col-span-8 p-8 sm:p-12 space-y-5">
                <div className="font-arabic text-xl text-emerald-800">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Welcome from the Principal & Director of Academics
                </h2>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Respected Parents, Guardians, Benefactors, and Esteemed Visitors,
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  It gives me unbounded joy to welcome you to the official portal of Asasul Islam School. As we navigate the complex currents of the twenty-first century, the responsibility of nurturing the next generation has never been more consequential. Today's youth are confronted with dizzying technological advancements alongside pervasive cultural turbulence.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  At Asasul Islam School, we approach education not as a conveyor belt of examinations, but as a holistic cultivation of intellect, character, and spirit. We create a sanctuary where a child can develop a passion for coding, master calculus, explore molecular science, and simultaneously recite the Quran with melodious Tajweed, embodying humility and noble conduct in daily life.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Our faculty members are not merely instructors; they are Murabbis—spiritual mentors and academic coaches who lead by exemplary conduct. Whether you are prospective parents looking for a school where your child's faith and future will both thrive, or an existing family reaffirming our partnership, we welcome you with open arms and sincere prayers.
                </p>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-serif italic text-lg text-emerald-900 font-bold">
                      Dr. Ustadh Ibrahim Al-Mansoor
                    </div>
                    <div className="text-xs text-slate-500">Principal, Asasul Islam School</div>
                  </div>
                  <div className="font-arabic text-emerald-800 text-base">
                    والسلام عليكم ورحمة الله وبركاته
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. School Leadership Team */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Educational Stewardship"
            arabicSubtitle="إِدَارَةُ المَدْرَسَةِ"
            title="School Leadership & Academic Heads"
            subtitle="Meet our dedicated team of administrators, curriculum leaders, and scholars who steer our educational standards."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-700/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                      {leader.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold mb-3">
                      {leader.qualifications}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
