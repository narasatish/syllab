/**
 * MedicalColleges — free MBBS/BDS medical college directory (NEET → college).
 * /medical-colleges (index) → /medical-colleges/<state> → /medical-colleges/<state>/<college>.
 * Indicative NEET cutoffs, MBBS fees & seats (verify on official/MCC sites). Generated
 * banners (no copyrighted photos). Links to the NEET predictor, NEET PYQ & state boards.
 */
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, MapPin, Wallet, Users, Stethoscope, Globe, GraduationCap, Building2, ClipboardList } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HubNav, { HubNavItem } from '../components/HubNav';
import { usePathname } from '../lib/isomorphic';
import {
  MEDICAL_STATE_INFO, MEDICAL_COLLEGES, medCollegesByState, findMedCollege, medFullCourse,
  type MedicalCollege,
} from '../data/medicalColleges';

const SITE = 'https://syllab.in';
const navTo = (href: string) => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }); };

// Deterministic gradient banner from the college name (no external images).
function banner(seed: string) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 38%), hsl(${(h + 40) % 360} 65% 28%))`;
}
const initials = (s: string) => s.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 3).map((w) => w[0]).join('').toUpperCase();

export default function MedicalColleges() {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = useCallback((to: string) => {
    if (window.location.pathname !== to) window.history.pushState({ syllabNav: true }, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const goBack = useCallback((parent: string) => {
    const st = window.history.state as { syllabNav?: boolean } | null;
    if (st && st.syllabNav && window.history.length > 1) window.history.back();
    else go(parent);
  }, [go]);

  const parts = path.split('/').filter(Boolean); // ['medical-colleges', state, college]
  const stateSlug = parts[1];
  const collegeSlug = parts[2];

  if (stateSlug && collegeSlug) {
    const c = findMedCollege(collegeSlug);
    if (c) return <Detail c={c} go={go} goBack={goBack} />;
  }
  if (stateSlug) {
    const info = MEDICAL_STATE_INFO.find((s) => s.slug === stateSlug);
    if (info) return <StateView stateSlug={stateSlug} go={go} goBack={goBack} />;
  }
  return <Index go={go} />;
}

function Index({ go }: { go: (to: string) => void }) {
  const featured = [...MEDICAL_COLLEGES].sort((a, b) => (a.nirf || 999) - (b.nirf || 999)).slice(0, 8);
  const collegeHubItems: HubNavItem[] = [
    { label: 'Engineering', emoji: '🏛️', path: '/colleges', tab: 'colleges' },
    { label: 'Medical', emoji: '🩺', path: '/medical-colleges', tab: 'medical_colleges' },
    { label: 'College Finder', emoji: '🔎', path: '/best-colleges', tab: 'college_finder' },
    { label: 'Predictor', emoji: '🎯', path: '/college-predictor', tab: 'college_predictor' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Top Medical Colleges in India (MBBS/BDS) — NEET Cutoffs, Fees & Admission | Syllab.in"
        description="Browse the top medical colleges in India by state — AIIMS, JIPMER and the best government & private MBBS colleges. Compare NEET cutoffs, MBBS fees, seats and the full admission process. Free."
        keywords="top medical colleges India, MBBS colleges by state, NEET cutoff colleges, AIIMS MBBS fees, best government medical colleges, private MBBS colleges fees, NEET college list, MBBS admission process"
        url={`${SITE}/medical-colleges`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Top Medical Colleges in India', url: `${SITE}/medical-colleges`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <HubNav items={collegeHubItems} active="medical_colleges" label="College Hub" />
      <PageHero emoji="🩺" title="Top Medical Colleges in India" subtitle="MBBS & BDS colleges by state — AIIMS, govt & private. NEET cutoffs, fees, seats & full admission process." className="mb-6" />
      <div className="mb-2 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <span>NEET cutoffs, fees & seats are <strong>indicative</strong> — always confirm on the official college / MCC counselling website.</span>
      </div>
      <h2 className="mb-3 mt-6 text-sm font-black uppercase tracking-widest text-slate-400">Browse by state</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MEDICAL_STATE_INFO.map((s) => (
          <button key={s.slug} onClick={() => go(`/medical-colleges/${s.slug}`)}
            className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
            <div className="text-2xl">{s.emoji}</div>
            <div className="mt-2 font-black text-slate-800 dark:text-slate-100">{s.name}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{medCollegesByState(s.slug).length} colleges</div>
          </button>
        ))}
      </div>
      <h2 className="mb-3 mt-8 text-sm font-black uppercase tracking-widest text-slate-400">Featured top colleges</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {featured.map((c) => <Card key={c.slug} c={c} go={go} />)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={() => navTo('/college-predictor/neet')} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-600">NEET College Predictor</button>
        <button onClick={() => navTo('/previous-year-papers/neet')} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">NEET Previous Year Papers</button>
      </div>
    </div>
  );
}

function Card({ c, go }: { c: MedicalCollege; go: (to: string) => void }) {
  return (
    <button onClick={() => go(`/medical-colleges/${MEDICAL_STATE_INFO.find((s) => s.name === c.state)?.slug || ''}/${c.slug}`)}
      className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white" style={{ background: banner(c.name) }}>{initials(c.shortName || c.name)}</div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-slate-900 dark:text-slate-100">{c.shortName || c.name}</h3>
          <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{c.city} · {c.type}{c.nirf ? ` · NIRF #${c.nirf}` : ''}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
        <div className="rounded-lg bg-emerald-50 px-2 py-1 dark:bg-emerald-950"><p className="font-bold uppercase text-emerald-600/70 dark:text-emerald-400">Fees/yr</p><p className="font-black text-emerald-700 dark:text-emerald-300">{c.feesPerYear}</p></div>
        <div className="rounded-lg bg-blue-50 px-2 py-1 dark:bg-blue-950"><p className="font-bold uppercase text-blue-600/70 dark:text-blue-400">Seats</p><p className="font-black text-blue-700 dark:text-blue-300">{c.mbbsSeats}</p></div>
        <div className="rounded-lg bg-violet-50 px-2 py-1 dark:bg-violet-950"><p className="font-bold uppercase text-violet-600/70 dark:text-violet-400">Type</p><p className="truncate font-black text-violet-700 dark:text-violet-300">{c.type.split('/')[0]}</p></div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400"><span className="font-black text-slate-600 dark:text-slate-300">NEET:</span> {c.neetCutoff}</p>
    </button>
  );
}

function StateView({ stateSlug, go, goBack }: { stateSlug: string; go: (to: string) => void; goBack: (p: string) => void }) {
  const info = MEDICAL_STATE_INFO.find((s) => s.slug === stateSlug)!;
  const colleges = medCollegesByState(stateSlug).sort((a, b) => (a.nirf || 999) - (b.nirf || 999));
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title={`Top Medical Colleges in ${info.name} (MBBS) — NEET Cutoffs & Fees 2026 | Syllab.in`}
        description={`Best MBBS medical colleges in ${info.name} — NEET cutoffs, MBBS fees, seats and admission process. ${info.blurb}`}
        keywords={`medical colleges in ${info.name}, MBBS colleges ${info.name}, NEET cutoff ${info.name}, ${info.name} government medical colleges, MBBS fees ${info.name}`}
        url={`${SITE}/medical-colleges/${info.slug}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Medical Colleges in ${info.name}`, url: `${SITE}/medical-colleges/${info.slug}`, inLanguage: 'en-IN' }}
      />
      <button onClick={() => goBack('/medical-colleges')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All states</button>
      <PageHero emoji={info.emoji} title={`Medical Colleges in ${info.name}`} subtitle={`${colleges.length} top MBBS colleges — NEET cutoffs, fees, seats & admission.`} className="mb-6" />
      <div className="grid gap-3 sm:grid-cols-2">{colleges.map((c) => <Card key={c.slug} c={c} go={go} />)}</div>
    </div>
  );
}

function Detail({ c, go, goBack }: { c: MedicalCollege; go: (to: string) => void; goBack: (p: string) => void }) {
  const sSlug = MEDICAL_STATE_INFO.find((s) => s.name === c.state)?.slug || '';
  const similar = MEDICAL_COLLEGES.filter((x) => x.state === c.state && x.slug !== c.slug).slice(0, 4);
  const url = `${SITE}/medical-colleges/${sSlug}/${c.slug}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${c.name} — MBBS Fees, NEET Cutoff, Seats & Admission | Syllab.in`}
        description={`${c.name}, ${c.city}: MBBS fees ${c.feesPerYear}/yr, ${c.neetCutoff}, ${c.mbbsSeats} seats${c.nirf ? `, NIRF #${c.nirf}` : ''}. Admission via NEET UG. Full admission process, courses, internship & hostel.`}
        keywords={`${c.name} fees, ${c.shortName} NEET cutoff, ${c.name} MBBS admission, ${c.name} seats, ${c.city} medical college, NEET counselling`}
        url={url}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: c.name,
          foundingDate: String(c.established), url: `https://${c.website}`, sameAs: `https://${c.website}`,
          address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.state, addressCountry: 'IN' },
        }}
      />
      <button onClick={() => goBack(`/medical-colleges/${sSlug}`)} className="mb-3 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> Back</button>

      {/* Generated banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg" style={{ background: banner(c.name) }}>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-black backdrop-blur">{initials(c.shortName || c.name)}</div>
          <div>
            <h1 className="text-xl font-black leading-tight sm:text-2xl">{c.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin size={12} />{c.city}, {c.state} · {c.type} · Est. {c.established}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat icon={<Wallet size={14} />} label="MBBS fees/yr" value={c.feesPerYear} />
        <Stat icon={<Users size={14} />} label="MBBS seats" value={String(c.mbbsSeats)} />
        <Stat icon={<Stethoscope size={14} />} label="NIRF" value={c.nirf ? `#${c.nirf}` : '—'} />
        <Stat icon={<GraduationCap size={14} />} label="Exam" value={c.exams.join('/')} />
      </div>

      <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-black text-primary hover:underline dark:text-emerald-400"><Globe size={12} />{c.website}</a>

      <Section title="About"><p className="leading-relaxed text-slate-700 dark:text-slate-300">{c.about}</p></Section>

      <Section title="NEET Cutoff (indicative)"><p className="rounded-xl bg-slate-50 p-3 font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">{c.neetCutoff}</p></Section>

      <Section title="Fees & Seats">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Detail2 label="Per year" value={c.feesPerYear} /><Detail2 label="Full course" value={medFullCourse(c) ?? '—'} /><Detail2 label="MBBS seats" value={String(c.mbbsSeats)} />
        </div>
      </Section>

      <Section title="Courses Offered"><div className="flex flex-wrap gap-2">{c.courses.map((x) => <span key={x} className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">{x}</span>)}</div></Section>

      <Section title="Admission Process (NEET UG)">
        <ol className="space-y-2">{c.admissionSteps.map((s, i) => (
          <li key={i} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">{i + 1}</div>
            <p className="py-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{s}</p>
          </li>))}
        </ol>
      </Section>

      <Section title="Internship & Hostel">
        <p className="text-sm text-slate-700 dark:text-slate-300"><Building2 size={13} className="mr-1 inline text-primary" />{c.accommodation}</p>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300"><Stethoscope size={13} className="mr-1 inline text-primary" />{c.internship}</p>
      </Section>

      {/* Internal links / next steps */}
      <Section title="Plan your NEET admission">
        <div className="grid gap-2 sm:grid-cols-3">
          <button onClick={() => navTo('/college-predictor/neet')} className="rounded-xl bg-primary px-3 py-2.5 text-xs font-black text-white hover:bg-emerald-600">NEET College Predictor</button>
          <button onClick={() => navTo('/previous-year-papers/neet')} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">NEET Previous Papers</button>
          <button onClick={() => navTo('/mock-tests/neet')} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">Free NEET Mock Test</button>
        </div>
      </Section>

      <p className="mt-6 rounded-xl bg-amber-50 p-3 text-[11px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">All figures are indicative for guidance — confirm fees, cutoffs and seats on {c.website} / the MCC counselling site before any decision.</p>

      {similar.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More medical colleges in {c.state}</p>
          <div className="flex flex-wrap gap-2">{similar.map((x) => (
            <button key={x.slug} onClick={() => go(`/medical-colleges/${sSlug}/${x.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{x.shortName || x.name}</button>))}
          </div>
        </nav>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6"><h2 className="mb-2 flex items-center gap-2 text-base font-black text-slate-900 dark:text-slate-100"><ClipboardList size={16} className="text-primary" />{title}</h2>{children}</section>;
}
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-xl border border-slate-100 bg-white p-2.5 text-center dark:border-slate-700 dark:bg-slate-800"><div className="mx-auto mb-1 flex justify-center text-primary">{icon}</div><p className="text-[11px] font-bold uppercase text-slate-500">{label}</p><p className="text-sm font-black text-slate-800 dark:text-slate-100">{value}</p></div>;
}
function Detail2({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="text-[11px] font-bold uppercase text-slate-500">{label}</p><p className="mt-0.5 font-black text-slate-800 dark:text-slate-100">{value}</p></div>;
}
