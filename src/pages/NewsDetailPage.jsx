import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, ArrowLeft, Share2, 
  Tag, Bell, CheckCircle2, BookOpen 
} from 'lucide-react';
import { newsAndEvents } from '../data/schoolData';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = newsAndEvents.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The news article or announcement you are searching for does not exist or has been archived.</p>
        <Link
          to="/news"
          className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          Return to News & Events
        </Link>
      </div>
    );
  }

  const relatedArticles = newsAndEvents.filter((item) => item.id !== article.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Announcements</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-emerald-50 transition"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Share Story</span>
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          
          {/* Hero Banner */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
            
            <div className="absolute top-6 left-6">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-900/90 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-amber-400/40">
                {article.category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {article.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {article.venue}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-8 sm:p-12 space-y-6">
            
            <div className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-emerald-800 text-slate-800 text-sm sm:text-base font-medium italic leading-relaxed">
              "{article.excerpt}"
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{article.content}</p>
              
              <p>
                Asasul Islam School continues to champion high-impact learning opportunities where students express both their technical rigor and authentic spiritual commitment. The administration congratulates all educators, parents, and learners actively participating in making these occasions fruitful.
              </p>

              <p>
                For further inquiries, seat reservations, or volunteering opportunities connected to this event, please reach out to the school administrative desk via <a href="mailto:info@asasulislam.edu" className="text-emerald-800 font-bold underline">info@asasulislam.edu</a>.
              </p>
            </div>

            {/* Action Bottom */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/admissions"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition text-center"
              >
                Apply for 2026/2027 Admissions
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition text-center"
              >
                Contact Admissions Office
              </Link>
            </div>

          </div>

        </article>

        {/* Related Announcements */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">
              More News & Announcements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-700/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center justify-between">
                    <span>{rel.date}</span>
                    <span>Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
