import React from 'react';
import { SYLLABUS } from '../data/syllabus';
import { Map, Link as LinkIcon, ExternalLink, ChevronRight } from 'lucide-react';

export default function SitemapPage({ setTab }: { setTab: (tab: string) => void }) {
  const subjects = Array.from(new Set(SYLLABUS.map(s => s.subject)));
  const classes = Array.from(new Set(SYLLABUS.map(s => s.classLevel))).sort();

  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
          <Map size={14} /> Global Taxonomy
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight italic-serif">Sitemap Explorer</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">
          An organized directory of all subjects, chapters, and competitive modules hosted on the Syllab platform.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Core Pages */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <LinkIcon size={20} className="text-primary" /> Platform Core
          </h2>
          <ul className="space-y-4">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'syllabus', label: 'Syllabus Explorer' },
              { id: 'arena', label: 'Practice Arena' },
              { id: 'study_arena', label: 'Focus & Study Mode' },
              { id: 'tutor', label: 'AI Mentoring Engine' },
              { id: 'leaderboard', label: 'Global Champions League' },
              { id: 'dashboard', label: 'Intelligence Profile' },
              { id: 'about', label: 'About Syllab' },
              { id: 'contact', label: 'Contact & Support' },
              { id: 'admin_pipeline', label: 'Neural Ingestion (Admin)' },
            ].map(page => (
              <li key={page.id}>
                <button 
                  onClick={() => setTab(page.id)}
                  className="group flex items-center justify-between w-full text-slate-600 hover:text-primary transition-all font-bold"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" /> {page.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Subjects & Chapters */}
        {classes.map(cls => (
          <section key={cls} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 space-y-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">C{cls}</span>
              Class {cls} Directory
            </h2>
            
            {subjects.map(subject => {
              const chapterCount = SYLLABUS.filter(s => s.classLevel === cls && s.subject === subject).length;
              if (chapterCount === 0) return null;

              return (
                <div key={subject} className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center justify-between underline decoration-slate-100 decoration-2 underline-offset-4">
                    {subject} <span>{chapterCount} Chapters</span>
                  </h3>
                  <ul className="space-y-2">
                    {SYLLABUS.filter(s => s.classLevel === cls && s.subject === subject).map(chapter => (
                      <li key={chapter.id}>
                        <button 
                          onClick={() => {
                            // In a real app we might link to a specific chapter URL
                            setTab('syllabus');
                          }}
                          className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                          {chapter.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        ))}

        {/* External Resources */}
        <section className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl space-y-6">
          <h2 className="text-xl font-black flex items-center gap-3 italic-serif text-emerald-400">
            <ExternalLink size={20} /> Academic Assets
          </h2>
          <ul className="space-y-6">
            <li>
              <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noreferrer" className="group space-y-2 block">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Official Repo</div>
                <div className="font-bold flex items-center justify-between group-hover:text-emerald-400 transition-colors">
                  NCERT Textbooks <ExternalLink size={14} />
                </div>
              </a>
            </li>
            <li>
              <div className="group space-y-2 block opacity-50 cursor-not-allowed">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upcoming</div>
                <div className="font-bold flex items-center justify-between">
                  JEE Previous Year Papers <ExternalLink size={14} />
                </div>
              </div>
            </li>
            <li>
              <div className="group space-y-2 block opacity-50 cursor-not-allowed">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upcoming</div>
                <div className="font-bold flex items-center justify-between">
                  NEET Strategy Guides <ExternalLink size={14} />
                </div>
              </div>
            </li>
          </ul>
          <div className="pt-8 mt-12 border-t border-white/10 text-center">
             <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
               Index updated daily by AI Syllab Engine
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}
