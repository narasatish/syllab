/**
 * Career Guides — programmatic SEO cluster. One rich, indexable page per career guide
 * (/career/{slug}) plus an index (/career). Renders detailed career guidance content
 * (high-intent "how to become X in India", "careers after 12th" searches) and links
 * to the career & college predictor. All free, all static data, India-specific.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { CAREER_GUIDES } from '../data/careerGuides';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/career\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}

export default function CareerGuides({ setTab }: { setTab: (tab: string) => void }) {
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

  const slug = parseSlug(path);
  const guide = slug ? CAREER_GUIDES.find((g) => g.slug === slug) : null;

  // ── Index ──
  if (!guide) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="Career Guidance for Students — Streams, Courses & Roadmaps (Free) | Syllab.in"
          description="Free career guidance for Indian students — choose the right stream after 10th/12th, explore careers (engineer, doctor, data scientist, IAS), view roadmaps, salaries, and entrance exams."
          keywords="career guidance for students, careers after 12th, stream selection, how to become engineer, how to become doctor, IAS preparation, career roadmap, entrance exams, salary guide"
          url={`${SITE}/career`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Career Guidance for Students', url: `${SITE}/career`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="🎯" title="Career Guidance for Students" subtitle="Free guides to choose the right stream, explore careers, and plan your future." className="mb-6" />
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {CAREER_GUIDES.map((g) => (
            <button
              key={g.slug}
              onClick={() => go(`/career/${g.slug}`)}
              className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-primary hover:bg-emerald-50"
            >
              <div className="text-2xl">{g.emoji}</div>
              <div className="mt-2 font-black text-slate-800">{g.title}</div>
              <div className="mt-1 line-clamp-2 text-xs text-slate-500">{g.overview}</div>
            </button>
          ))}
        </div>
        <button
          onClick={() => setTab('career')}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600"
        >
          <TrendingUp size={16} /> Try the Career & College Predictor
        </button>
      </div>
    );
  }

  // ── Guide page ──
  const relatedGuides = CAREER_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const breadcrumbs = [
    { name: 'Career Guidance', url: `${SITE}/career` },
    { name: guide.title, url: `${SITE}/career/${guide.slug}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${guide.title} | Syllab.in`}
        description={guide.overview}
        keywords={`${guide.title.toLowerCase()}, careers in india, entrance exams, salary guide, career roadmap, indian students`}
        url={`${SITE}/career/${guide.slug}`}
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

      <button onClick={() => go('/career')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> All career guides
      </button>

      <PageHero emoji={guide.emoji} title={guide.title} subtitle={guide.overview} className="mb-6" />

      {/* ── Overview ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Overview</h2>
        <p className="leading-relaxed text-slate-700">{guide.overview}</p>
      </section>

      {/* ── Who Should Choose ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Who Should Choose This Path?</h2>
        <p className="leading-relaxed text-slate-700">{guide.whoShouldChoose}</p>
      </section>

      {/* ── Subjects ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Key Subjects to Focus On</h2>
        <div className="flex flex-wrap gap-2">
          {guide.subjects.map((s) => (
            <span key={s} className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-800">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Courses Available</h2>
        <ul className="space-y-2">
          {guide.coursesAfter.map((course) => (
            <li key={course} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
              <span className="text-slate-700">{course}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Entrance Exams ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Relevant Entrance Exams</h2>
        <ul className="space-y-2">
          {guide.entranceExams.map((exam) => (
            <li key={exam} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
              <span className="text-slate-700">{exam}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Skills ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Skills You'll Need</h2>
        <div className="flex flex-wrap gap-2">
          {guide.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-teal-100 px-3 py-1.5 text-sm font-bold text-teal-800">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ── Salary Range ── */}
      <section className="mb-8 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <DollarSign size={20} className="mt-0.5 flex-shrink-0 text-emerald-600" />
          <div>
            <h2 className="font-black text-slate-900">Indicative Salary Range</h2>
            <p className="mt-1 text-slate-700">{guide.salaryRange}</p>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Your Career Roadmap</h2>
        <ol className="space-y-3">
          {guide.roadmap.map((step, idx) => (
            <li key={idx} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
                {idx + 1}
              </div>
              <p className="py-0.5 leading-relaxed text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── FAQs ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {guide.faqs.map((faq, idx) => (
            <details key={idx} className="rounded-2xl border border-slate-100 bg-white p-4">
              <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary">{faq.q}</summary>
              <p className="mt-3 leading-relaxed text-slate-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-900">Disclaimer</p>
        <p className="mt-2 text-sm text-amber-900">
          The information provided on this page is for general guidance only. Eligibility criteria, exam patterns, salary ranges, and career outcomes may change.
          Always verify details from official government websites, college admission portals, and professional bodies before making decisions. Salary figures are
          indicative and vary based on company, location, specialization, and individual performance.
        </p>
      </section>

      {/* ── Related Guides ── */}
      {relatedGuides.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-black text-slate-900">Related Career Guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((g) => (
              <button
                key={g.slug}
                onClick={() => go(`/career/${g.slug}`)}
                className="rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:border-primary hover:bg-emerald-50"
              >
                <div className="text-xl">{g.emoji}</div>
                <div className="mt-2 font-bold text-slate-800">{g.title}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
        <p className="flex-1 text-sm font-bold text-emerald-800">Not sure which path fits you best? Try our AI-powered Career & College Predictor!</p>
        <button
          onClick={() => setTab('career')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"
        >
          Take the Quiz <ArrowRight size={15} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="mt-6 border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">Other Career Guides</p>
        <div className="flex flex-wrap gap-2">
          {CAREER_GUIDES.filter((g) => g.slug !== guide.slug)
            .slice(0, 8)
            .map((g) => (
              <button
                key={g.slug}
                onClick={() => go(`/career/${g.slug}`)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                {g.emoji} {g.title.split(' ').slice(0, 3).join(' ')}
              </button>
            ))}
        </div>
      </nav>
    </div>
  );
}
