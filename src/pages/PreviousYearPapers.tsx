/**
 * Previous Year Questions (PYQ) & Sample Papers — programmatic SEO cluster.
 * Index at /previous-year-papers + one rich, indexable page per exam/board
 * (/previous-year-papers/{slug}). Targets high-volume India searches like
 * "CBSE Class 10 previous year question papers" and "JEE Main PYQ". All free,
 * static data; links to Syllab's free mock tests + important questions for practice.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ListChecks, Lightbulb, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { PAPER_GUIDES, PAPERS_DISCLAIMER } from '../data/previousYearPapers';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/previous-year-papers\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}

export default function PreviousYearPapers({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navTo = (item: { label: string; tab?: string; href?: string }) => {
    if (item.tab) setTab(item.tab);
    else if (item.href) {
      window.history.pushState({}, '', item.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const slug = parseSlug(path);
  const guide = slug ? PAPER_GUIDES.find((g) => g.slug === slug) : null;

  // ── Index ──
  if (!guide) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="Previous Year Question Papers & Sample Papers (Free) — CBSE, JEE, NEET, EAMCET | Syllab.in"
          description="Free guides to previous year question papers (PYQ) & sample papers for CBSE Class 10 & 12, JEE Main, NEET and EAMCET — exam pattern, high-weightage topics, how to use PYQs, plus free mock tests for Indian students."
          keywords="previous year question papers, sample papers, cbse class 10 previous year papers, cbse class 12 previous year papers, jee main pyq, neet previous year papers, eamcet previous papers, pyq free download"
          url={`${SITE}/previous-year-papers`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Previous Year Question Papers & Sample Papers', url: `${SITE}/previous-year-papers`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="📑" title="Previous Year Papers & Sample Papers" subtitle="Free PYQ guides — exam pattern, high-weightage topics, and how to use previous year papers to score more." className="mb-6" />
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {PAPER_GUIDES.map((g) => (
            <button
              key={g.slug}
              onClick={() => go(`/previous-year-papers/${g.slug}`)}
              className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-primary hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <div className="text-2xl">{g.emoji}</div>
              <div className="mt-2 font-black text-slate-800 dark:text-slate-100">{g.exam}</div>
              <div className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{g.intro}</div>
            </button>
          ))}
        </div>
        <button
          onClick={() => setTab('mock_tests')}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600"
        >
          <ListChecks size={16} /> Practise free mock tests
        </button>
      </div>
    );
  }

  // ── Guide page ──
  const related = PAPER_GUIDES.filter((g) => g.slug !== guide.slug);
  const breadcrumbs = [
    { name: 'Previous Year Papers', url: `${SITE}/previous-year-papers` },
    { name: guide.exam, url: `${SITE}/previous-year-papers/${guide.slug}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${guide.title} | Syllab.in`}
        description={guide.intro.slice(0, 155)}
        keywords={`${guide.exam.toLowerCase()} previous year papers, ${guide.exam.toLowerCase()} pyq, ${guide.exam.toLowerCase()} sample papers, ${guide.exam.toLowerCase()} question paper, ${guide.exam.toLowerCase()} exam pattern`}
        url={`${SITE}/previous-year-papers/${guide.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: item.name,
              item: item.url,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guide.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
        ]}
      />

      <button onClick={() => go('/previous-year-papers')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> All previous year papers
      </button>

      <PageHero emoji={guide.emoji} title={guide.title} subtitle={guide.intro} className="mb-6" />

      {/* ── Exam pattern ── */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-slate-100"><ListChecks size={18} className="text-primary" /> Exam Pattern</h2>
        <ul className="space-y-2">
          {guide.pattern.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
              <span className="text-slate-700 dark:text-slate-300">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── High-weightage topics ── */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-slate-100"><BookOpen size={18} className="text-primary" /> Most Important / Repeated Topics</h2>
        <div className="space-y-2">
          {guide.keyTopics.map((kt) => (
            <div key={kt.subject} className="rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="font-black text-slate-800 dark:text-slate-100">{kt.subject}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{kt.topics}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to use PYQs ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">How to Use Previous Year Papers</h2>
        <ol className="space-y-3">
          {guide.howToUse.map((step, idx) => (
            <li key={idx} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">{idx + 1}</div>
              <p className="py-0.5 leading-relaxed text-slate-700 dark:text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Tips ── */}
      <section className="mb-8 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <h2 className="mb-2 flex items-center gap-2 font-black text-slate-900 dark:text-slate-100"><Lightbulb size={18} className="text-emerald-600" /> Scoring Tips</h2>
        <ul className="space-y-2">
          {guide.tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Practice CTA (internal links) ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Practise on Syllab (Free)</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {guide.practice.map((p) => (
            <button
              key={p.label}
              onClick={() => navTo(p)}
              className="flex items-center justify-between gap-2 rounded-2xl bg-primary px-4 py-3 text-left text-sm font-black text-white hover:bg-emerald-600"
            >
              {p.label} <ArrowRight size={15} className="flex-shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {guide.faqs.map((faq, idx) => (
            <details key={idx} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{faq.q}</summary>
              <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-amber-300">Disclaimer</p>
        <p className="mt-2 text-sm text-amber-900 dark:text-amber-200">{PAPERS_DISCLAIMER}</p>
      </section>

      {/* ── Related ── */}
      <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">Other Previous Year Paper Guides</p>
        <div className="flex flex-wrap gap-2">
          {related.map((g) => (
            <button
              key={g.slug}
              onClick={() => go(`/previous-year-papers/${g.slug}`)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {g.emoji} {g.exam}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
