import React from 'react';
import { BookOpen, HelpCircle, MapPinned, SearchCheck } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../seo/StructuredData';
import { FAQ_SCHEMA, PREP_ARTICLES } from '../lib/seoData';

interface PrepHubProps {
  setTab: (tab: string) => void;
}

export default function PrepHubPage({ setTab }: PrepHubProps) {
  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="JEE, NEET, EAMCET and Board Exam Preparation Hub"
        description="Read preparation strategies, chapter-wise weightage guides, JEE syllabus notes, EAMCET practice plans, NEET Biology chapters, and board exam study tips."
        keywords="JEE syllabus, EAMCET practice, NEET preparation, chapter wise weightage, board exam preparation, study strategies"
        url="https://syllab.in/preparation"
      />
      <StructuredData data={FAQ_SCHEMA} />

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-primary">
            <SearchCheck size={14} />
            SEO learning hub
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-5xl">Preparation Guides</h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
            Long-tail exam guides built for students searching for chapter weightage, practice strategy, and exam-specific study plans.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PREP_ARTICLES.map((article) => (
          <article key={article.slug} className="flex min-h-[260px] flex-col rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-primary">
              <BookOpen size={22} />
            </div>
            <h2 className="text-xl font-black leading-tight text-slate-900">{article.title}</h2>
            <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-500">{article.summary}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-3 text-[11px] font-black uppercase tracking-widest text-slate-500">
              Target: {article.keyword}
            </div>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl">
          <MapPinned className="mb-4 text-primary" size={28} />
          <h2 className="text-2xl font-black">Internal Learning Paths</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">
            Move students from informational pages into syllabus exploration, daily practice, and AI doubt solving.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => setTab('syllabus')} className="rounded-2xl bg-white px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-900">
              Syllabus
            </button>
            <button onClick={() => setTab('daily')} className="rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
              Daily Dose
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black text-slate-900">
            <HelpCircle className="text-primary" size={24} />
            Student FAQs
          </h2>
          <div className="space-y-4">
            {FAQ_SCHEMA.mainEntity.map((item) => (
              <details key={item.name} className="rounded-2xl bg-slate-50 p-4">
                <summary className="cursor-pointer text-sm font-black text-slate-900">{item.name}</summary>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
          <button onClick={() => setTab('daily')} className="mt-5 text-xs font-black uppercase tracking-widest text-primary">
            Practice daily questions
          </button>
        </div>
      </section>
    </main>
  );
}
