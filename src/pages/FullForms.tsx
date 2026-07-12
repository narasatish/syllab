/**
 * FullForms — "Full Form" cluster. Index at /full-forms + /full-forms/{slug}.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Hash } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { FULL_FORMS, getFullForm, type FullForm } from '../data/fullForms';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/full-forms\/([a-z0-9-]+)/); return m ? m[1] : null; };

export default function FullForms({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const ff = slug ? getFullForm(slug) : null;

  // All hooks must run before any early return (consistent hook count).
  const cats = useMemo(() => [...new Set(FULL_FORMS.map((f) => f.category))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? FULL_FORMS.filter((f) => f.term.toLowerCase().includes(q) || f.fullForm.toLowerCase().includes(q)) : FULL_FORMS), [q]);

  if (ff) return <Detail ff={ff} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Full Forms — A to Z List for Students (NCERT, CPU, NEET…) | Syllab.in"
        description={`Free A-to-Z full forms list for students — ${FULL_FORMS.length}+ abbreviations across education, computer, science, medical and banking with meanings. NCERT, CBSE, CPU, RAM, NEET, IFSC and more.`}
        keywords="full form, full forms list, NCERT full form, CPU full form, NEET full form, CBSE full form, RAM full form, IFSC full form, abbreviations for students"
        url={`${SITE}/full-forms`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Full Forms for Students', url: `${SITE}/full-forms`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🔤" title="Full Forms" subtitle="The abbreviations students search most — with clear meanings and where they're used. From NCERT to CPU to IFSC." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. NCERT, RAM, IFSC…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, FullForm[]][] : cats.map((c) => [c, filtered.filter((f) => f.category === c)] as [string, FullForm[]])).map(([cat, list]) => (
        list.length ? (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((f) => (
                <button key={f.slug} onClick={() => go(`/full-forms/${f.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span><span className="text-sm font-black text-slate-800 dark:text-slate-100">{f.term}</span> <span className="text-xs text-slate-500"> — {f.fullForm}</span></span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No full form found for “{query}”.</p>}
    </div>
  );
}

function Detail({ ff, go, setTab }: { ff: FullForm; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = ff.related.map((r) => FULL_FORMS.find((f) => f.term === r)).filter(Boolean) as FullForm[];
  const faqQ = `What is the full form of ${ff.term}?`;
  const faqA = `The full form of ${ff.term} is ${ff.fullForm}. ${ff.description}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${ff.term} Full Form — ${ff.fullForm} | Syllab.in`}
        description={`${ff.term} full form is ${ff.fullForm}. ${ff.description}`}
        keywords={`${ff.term.toLowerCase()} full form, full form of ${ff.term.toLowerCase()}, what is ${ff.term.toLowerCase()}, ${ff.fullForm.toLowerCase()}`}
        url={`${SITE}/full-forms/${ff.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Full Forms', item: `${SITE}/full-forms` },
            { '@type': 'ListItem', position: 2, name: `${ff.term} Full Form`, item: `${SITE}/full-forms/${ff.slug}` },
          ] },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: faqQ, acceptedAnswer: { '@type': 'Answer', text: faqA } }] },
        ]}
      />
      <button onClick={() => go('/full-forms')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All full forms</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><Hash size={13} /> {ff.category}</div>
      <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">{ff.term} Full Form</h1>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-md">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-50/80">{ff.term} stands for</div>
        <div className="mt-1 text-xl font-black sm:text-2xl">{ff.fullForm}</div>
      </div>
      <p className="mt-5 leading-relaxed text-slate-700 dark:text-slate-300">{ff.description}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" />
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Have a doubt? Syllab's free AI Tutor explains any concept.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Ask AI Tutor <ArrowRight size={15} /></button>
      </div>
      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">Related full forms</p>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <button key={r.slug} onClick={() => go(`/full-forms/${r.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{r.term}</button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
