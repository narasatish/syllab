/**
 * AiHub — free "AI for Students" guides (what is AI/ChatGPT, AI study tools, AI careers).
 * Index at /ai-hub + one indexable guide per /ai-hub/{slug}. Rides the booming "AI"
 * search interest and serves as linkable reference content. All free, static data.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { AI_TOPICS } from '../data/aiHub';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/ai-hub\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}

export default function AiHub({ setTab }: { setTab: (tab: string) => void }) {
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
  const topic = slug ? AI_TOPICS.find((t) => t.slug === slug) : null;

  // ── Index ──
  if (!topic) {
    const cats = [...new Set(AI_TOPICS.map((t) => t.category))];
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="AI for Students — Free Guides: ChatGPT, AI Tools, AI Careers | Syllab.in"
          description="Free, simple AI guides for students & teachers — what is AI & ChatGPT, best free AI study tools 2026, AI prompts for studying, is AI cheating, and how to become an AI engineer in India."
          keywords="AI for students, what is ChatGPT, best free AI tools for students, AI prompts for studying, how to become AI engineer India, what is artificial intelligence, generative AI explained, AI vs machine learning"
          url={`${SITE}/ai-hub`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI for Students Hub', url: `${SITE}/ai-hub`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="🤖" title="AI for Students" subtitle="Simple, honest guides to AI, ChatGPT and the best free AI study tools — learn to use AI to study smarter (the right way)." className="mb-6" />

        {/* Quick actions: use AI to study vs learn to build it */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <button onClick={() => setTab('learning_lab')} className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-left text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="text-2xl">🎓</div>
            <div className="mt-1.5 text-sm font-black">AI Tuition Teacher</div>
            <div className="text-[11px] font-medium text-white/85">Free daily homework, marked instantly</div>
          </button>
          <button onClick={() => setTab('learning_lab')} className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-left text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="text-2xl">💬</div>
            <div className="mt-1.5 text-sm font-black">Ask the AI Tutor</div>
            <div className="text-[11px] font-medium text-white/85">Instant doubt-solving, 24/7</div>
          </button>
          <button onClick={() => setTab('skills_lab')} className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-left text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="text-2xl">⚙️</div>
            <div className="mt-1.5 text-sm font-black">Build AI (learn to code)</div>
            <div className="text-[11px] font-medium text-white/85">Free Python &amp; AI/ML course →</div>
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          📚 <b className="text-slate-900 dark:text-slate-100">{AI_TOPICS.length} free guides</b> on using AI the smart way — what it is, the best free tools, studying with AI, staying safe, and AI careers in India.
        </div>

        {cats.map((cat) => (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {AI_TOPICS.filter((t) => t.category === cat).map((t) => (
                <button key={t.slug} onClick={() => go(`/ai-hub/${t.slug}`)}
                  className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-2xl">{t.emoji}</div>
                  <div className="mt-2 font-black text-slate-800 dark:text-slate-100">{t.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{t.intro}</div>
                </button>
              ))}
            </div>
          </section>
        ))}
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600">
          <Sparkles size={16} /> Try Syllab's free AI Tutor
        </button>
      </div>
    );
  }

  // ── Topic page ──
  const related = AI_TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 4);
  const breadcrumbs = [
    { name: 'AI for Students', url: `${SITE}/ai-hub` },
    { name: topic.title, url: `${SITE}/ai-hub/${topic.slug}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${topic.title} | AI for Students — Syllab.in`}
        description={topic.intro.slice(0, 155)}
        keywords={`${topic.title.toLowerCase()}, AI for students, ${topic.category.toLowerCase()} AI, artificial intelligence students india`}
        url={`${SITE}/ai-hub/${topic.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: topic.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />
      <button onClick={() => go('/ai-hub')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> All AI guides
      </button>
      <PageHero emoji={topic.emoji} title={topic.title} subtitle={topic.intro} className="mb-6" />

      <article className="space-y-6">
        {topic.sections.map((s, i) => (
          <section key={i}>
            <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">{s.heading}</h2>
            <p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">{s.body}</p>
          </section>
        ))}
      </article>

      {topic.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {topic.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" />
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Want to try AI for studying right now? Syllab's AI Tutor is free.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Open AI Tutor <ArrowRight size={15} /></button>
      </div>

      <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More AI guides</p>
        <div className="flex flex-wrap gap-2">
          {related.map((t) => (
            <button key={t.slug} onClick={() => go(`/ai-hub/${t.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              {t.emoji} {t.title}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
