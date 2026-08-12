/**
 * Timelines — interactive History timelines. Index at /timelines, detail at
 * /timelines/:slug. Path-driven (pushState/popstate), matching the study clusters.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, History as HistoryIcon } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HistoryTimeline from '../components/HistoryTimeline';
import { TIMELINES, getTimeline } from '../data/timelines';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

export default function Timelines() {
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

  const slug = useMemo(() => {
    const m = path.match(/^\/timelines\/([^/]+)/);
    return m ? m[1] : null;
  }, [path]);
  const tl = slug ? getTimeline(slug) : null;

  if (tl) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`${tl.title} — Interactive Timeline | Syllab.in`}
          description={`${tl.intro} Free interactive, tap-to-expand timeline for ${tl.classLevel} ${tl.subject}.`.slice(0, 160)}
          keywords={`${tl.title.toLowerCase()}, ${tl.title.toLowerCase()} timeline, ${tl.title.toLowerCase()} important dates, history timeline class`}
          url={`${SITE}/timelines/${tl.slug}`}
          jsonLd={[
            { '@context': 'https://schema.org', '@type': 'LearningResource', name: tl.title, description: tl.intro, educationalLevel: tl.classLevel, inLanguage: 'en-IN', isAccessibleForFree: true, learningResourceType: 'Timeline', publisher: { '@type': 'Organization', name: 'Syllab.in' } },
            { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'History Timelines', item: `${SITE}/timelines` },
              { '@type': 'ListItem', position: 2, name: tl.title, item: `${SITE}/timelines/${tl.slug}` },
            ] },
          ]}
        />
        <button onClick={() => go('/timelines')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All timelines</button>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><HistoryIcon size={13} /> {tl.subject} · {tl.classLevel}</div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{tl.title}</h1>
        <p className="mb-6 mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{tl.intro}</p>

        <HistoryTimeline timeline={tl} />

        <div className="mt-8 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
          <span className="font-black">💡 Why this matters: </span>{tl.whyItMatters}
        </div>

        <h2 className="mb-3 mt-10 text-lg font-black text-slate-900 dark:text-slate-100">More timelines</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIMELINES.filter((t) => t.slug !== tl.slug).map((t) => (
            <button key={t.slug} onClick={() => go(`/timelines/${t.slug}`)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary">{t.subject}</p>
              <p className="mt-0.5 font-black text-slate-800 dark:text-slate-100">{t.title}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Interactive History Timelines for Students | Syllab.in"
        description="Free interactive, tap-to-expand history timelines — the Indian freedom struggle, the Mughal Empire and major events in Indian history. Learn dates and sequence the easy way."
        keywords="history timeline for students, indian freedom struggle timeline, mughal empire timeline, indian history important dates, interactive history CBSE"
        url={`${SITE}/timelines`}
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'History Timelines', description: 'Free interactive history timelines for school students.', url: `${SITE}/timelines`, isAccessibleForFree: true }]}
      />
      <PageHero emoji="🕰️" title="History Timelines" subtitle="See history in order — tap any event to learn more. Perfect for remembering dates and the big picture." className="mb-6" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TIMELINES.map((t) => (
          <button key={t.slug} onClick={() => go(`/timelines/${t.slug}`)} className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <HistoryIcon size={22} className="text-primary" />
            <p className="mt-3 text-[11px] font-black uppercase tracking-widest text-primary">{t.subject} · {t.classLevel}</p>
            <h2 className="mt-1 font-black text-slate-900 dark:text-slate-100">{t.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{t.intro}</p>
            <p className="mt-2 text-xs font-bold text-slate-400">{t.events.length} key events →</p>
          </button>
        ))}
      </div>
    </div>
  );
}
