/**
 * Colleges.tsx — SEO college directory:
 *   /colleges                       → states grid (+ featured top colleges)
 *   /colleges/:state                → colleges in that state (Top list)
 *   /colleges/:state/:collegeSlug   → full college detail
 *
 * Routing is path-driven (the app resolves any /colleges* path to this page).
 * Internal links use history.pushState so deep links are shareable & prerendered.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from '../lib/isomorphic';
import {
  MapPin, ArrowLeft, GraduationCap, Wallet, BedDouble,
  Briefcase, TrendingUp, CalendarClock, ChevronRight, AlertCircle, Globe, Compass,
} from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HubNav, { HubNavItem } from '../components/HubNav';
import CollegeExplorer from '../components/CollegeExplorer';
import {
  COLLEGE_STATE_INFO, COLLEGES, getStateInfo, getCollegesByState,
  getCollegeBySlug, stateSlugForCollege, getRankings, getStateRank, getNationalRank,
  TOTAL_COLLEGES, getCitiesWithColleges, getCollegesByCity, cityInfoForSlug, type CollegeFull,
} from '../data/colleges';

const SITE = 'https://syllab.in';

function useCollegePath() {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    window.addEventListener('syllab:navigate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('syllab:navigate', onPop);
    };
  }, []);
  // How many hops we've pushed *inside* the colleges section this visit. Only
  // when this is > 0 is the previous history entry guaranteed to be a colleges
  // page — so history.back() is safe. Otherwise we landed directly (e.g. from
  // the AI Tutor page) and must navigate to the parent path explicitly, NOT
  // history.back() (which would jump back to wherever we came from).
  const depthRef = React.useRef(0);
  const go = useCallback((to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({ syllabNav: true }, '', to);
      depthRef.current += 1;
    }
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  /**
   * "Up/back" navigation. If we pushed in-section history, pop it with a real
   * history.back() (clean back stack). On a direct landing (depth 0) navigate
   * to the parent path explicitly so Back never escapes the colleges section.
   */
  const goBack = useCallback((parent: string) => {
    if (depthRef.current > 0) {
      depthRef.current -= 1;
      window.history.back();
    } else {
      if (window.location.pathname !== parent) window.history.pushState({ syllabNav: true }, '', parent);
      setPath(parent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  return { path, go, goBack };
}

const typeColor: Record<string, string> = {
  IIT: 'bg-rose-100 text-rose-700',
  'NIT/IIIT': 'bg-amber-100 text-amber-700',
  Government: 'bg-emerald-100 text-emerald-700',
  'Private/Deemed': 'bg-indigo-100 text-indigo-700',
};

const Disclaimer = () => (
  <div className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950 px-4 py-3 text-xs text-amber-800 dark:text-amber-200">
    <AlertCircle size={16} className="shrink-0 mt-0.5" />
    <span>Fees, NIRF ranks, cutoffs and placement figures are <strong>indicative</strong> (2024) for guidance. Always confirm on the official college / counselling website before any decision.</span>
  </div>
);

export default function Colleges() {
  const { path, go, goBack } = useCollegePath();
  const parts = path.split('/').filter(Boolean); // ['colleges', state?, slug?]
  const stateSlug = parts[1];
  const collegeSlug = parts[2];

  // /colleges/city/{citySlug} — "Top Engineering Colleges in {City}"
  if (stateSlug === 'city' && collegeSlug) {
    if (cityInfoForSlug(collegeSlug)) return <CityColleges citySlug={collegeSlug} go={go} goBack={goBack} />;
  }
  if (collegeSlug) {
    const college = getCollegeBySlug(collegeSlug);
    if (college) return <CollegeDetail college={college} go={go} goBack={goBack} />;
  }
  if (stateSlug) {
    const info = getStateInfo(stateSlug);
    if (info) return <StateColleges stateSlug={stateSlug} go={go} goBack={goBack} />;
  }
  return <CollegesIndex go={go} />;
}

/* ─── Index: states grid ────────────────────────────────────────────────────*/
function CollegesIndex({ go }: { go: (to: string) => void }) {
  const featured = [...COLLEGES].sort((a, b) => (a.nirf ?? 999) - (b.nirf ?? 999)).slice(0, 6);
  const collegeHubItems: HubNavItem[] = [
    { label: 'Engineering', emoji: '🏛️', path: '/colleges', tab: 'colleges' },
    { label: 'Medical', emoji: '🩺', path: '/medical-colleges', tab: 'medical_colleges' },
    { label: 'College Finder', emoji: '🔎', path: '/best-colleges', tab: 'college_finder' },
    { label: 'Predictor', emoji: '🎯', path: '/college-predictor', tab: 'college_predictor' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Top Engineering Colleges in India 2026 — Fees, NIRF Rank, Cutoffs & Admission | Syllab.in"
        description="Browse top engineering colleges across India by state — IITs, NITs and the best government & private colleges in Tamil Nadu, Karnataka, Maharashtra, Telangana, Andhra Pradesh, Delhi-NCR & West Bengal. Compare fees, NIRF rank, cutoffs, placements and the full admission process. Free."
        keywords="top engineering colleges India 2026, best engineering colleges by state, engineering college fees, NIRF ranking engineering, college cutoff 2026, engineering admission process, IIT NIT cutoff, college predictor India"
        url={`${SITE}/colleges`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'CollectionPage',
          name: 'Top Engineering Colleges in India', url: `${SITE}/colleges`,
          isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE },
        }}
      />
      <HubNav items={collegeHubItems} active="colleges" label="College Hub" />
      <PageHero
        emoji="🏛️"
        title="Top Engineering Colleges in India"
        subtitle="Pick a state to see the best colleges — fees, NIRF rank, cutoffs, placements & admission process."
        aside={<span className="hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-black sm:inline-block">{TOTAL_COLLEGES}+ colleges</span>}
        className="mb-5"
      />
      <Disclaimer />

      <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Browse by state</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COLLEGE_STATE_INFO.map(s => {
          const count = getCollegesByState(s.slug).length;
          return (
            <button key={s.slug} onClick={() => go(`/colleges/${s.slug}`)}
              className="text-left rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">{count} colleges</span>
              </div>
              <h3 className="mt-2 text-base font-black text-slate-900 dark:text-slate-100">{s.name}</h3>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{s.blurb}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-primary">View colleges <ChevronRight size={12} /></span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-8 mb-3 text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Browse by city</h2>
      <div className="flex flex-wrap gap-2">
        {getCitiesWithColleges().map((c) => (
          <button key={c.slug} onClick={() => go(`/colleges/city/${c.slug}`)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-primary hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {c.city} <span className="text-slate-400">({c.count})</span>
          </button>
        ))}
      </div>

      <button onClick={() => go('/career-predictor')} className="mt-6 flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 text-left text-white shadow-md ring-1 ring-amber-300/20 transition hover:scale-[1.01]">
        <span>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300"><Compass size={13} /> Career Compass</span>
          <span className="mt-1 block text-sm font-black">Not sure which college you'll get? Predict your JEE/NEET rank → see the colleges you can target.</span>
        </span>
        <ChevronRight size={20} className="shrink-0 text-amber-300" />
      </button>

      <h2 className="mt-8 text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Featured top colleges</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {featured.map(c => <CollegeCard key={c.slug} college={c} go={go} />)}
      </div>

      <h2 className="mt-8 mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
        <Compass size={14} className="text-indigo-700" /> Browse &amp; compare all colleges
      </h2>
      <CollegeExplorer colleges={COLLEGES} go={go} />
    </div>
  );
}

/* ─── City view: "Top Engineering Colleges in {City}" ───────────────────────*/
function CityColleges({ citySlug, go, goBack }: { citySlug: string; go: (to: string) => void; goBack: (parent: string) => void }) {
  const info = cityInfoForSlug(citySlug)!;
  const colleges = getCollegesByCity(citySlug);
  const otherCities = getCitiesWithColleges().filter((c) => c.slug !== citySlug).slice(0, 12);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title={`Top ${colleges.length} Engineering Colleges in ${info.city} 2026 — Fees, Cutoff & Ranking | Syllab.in`}
        description={`Best engineering colleges in ${info.city}, ${info.state} (2026) — NIRF rank, B.Tech fees, cutoffs, placements and admission process. Compare the top engineering colleges in ${info.city}. Free.`}
        keywords={`top engineering colleges in ${info.city}, best engineering colleges in ${info.city}, engineering colleges in ${info.city} fees, ${info.city} btech admission, ${info.city} college cutoff 2026`}
        url={`${SITE}/colleges/city/${citySlug}`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'ItemList',
          name: `Top Engineering Colleges in ${info.city}`,
          itemListElement: colleges.map((c, i) => ({
            '@type': 'ListItem', position: i + 1, name: c.name,
            url: `${SITE}/colleges/${stateSlugForCollege(c)}/${c.slug}`,
          })),
        }}
      />
      <button onClick={() => goBack('/colleges')} className="mb-3 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary dark:text-slate-400">
        <ArrowLeft size={14} /> All colleges
      </button>
      <PageHero
        emoji="🏙️"
        title={`Top Engineering Colleges in ${info.city}`}
        subtitle={`${colleges.length} top colleges in ${info.city}, ${info.state} — fees, NIRF rank, cutoffs, placements & admission.`}
        className="mb-5"
      />
      <Disclaimer />
      <div className="grid gap-3 sm:grid-cols-2">
        {colleges.map((c) => <CollegeCard key={c.slug} college={c} go={go} />)}
      </div>
      {otherCities.length ? (
        <nav className="mt-8 border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">Engineering colleges in other cities</p>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <button key={c.slug} onClick={() => go(`/colleges/city/${c.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">{c.city}</button>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}

/* ─── State view: colleges in a state ───────────────────────────────────────*/
function StateColleges({ stateSlug, go, goBack }: { stateSlug: string; go: (to: string) => void; goBack: (parent: string) => void }) {
  const info = getStateInfo(stateSlug)!;
  const colleges = getCollegesByState(stateSlug);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title={`Top ${colleges.length} Engineering Colleges in ${info.name} 2026 — Fees, Cutoff & Ranking | Syllab.in`}
        description={`Best engineering colleges in ${info.name} 2026 — NIRF rank, B.Tech fees, ${info.exams.join('/')} cutoffs, placements and admission process. ${info.blurb}`}
        keywords={`top engineering colleges ${info.name}, best engineering colleges ${info.name} 2026, ${info.name} engineering college fees, ${info.exams.join(' ')} cutoff, engineering admission ${info.name}`}
        url={`${SITE}/colleges/${stateSlug}`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'ItemList',
          name: `Top Engineering Colleges in ${info.name}`,
          itemListElement: colleges.map((c, i) => ({
            '@type': 'ListItem', position: i + 1, name: c.name,
            url: `${SITE}/colleges/${stateSlug}/${c.slug}`,
          })),
        }}
      />
      <button onClick={() => goBack('/colleges')} className="mb-3 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> All states
      </button>
      <PageHero
        emoji={info.emoji}
        title={`Top Engineering Colleges in ${info.name}`}
        subtitle={info.blurb}
        className="mb-4"
        aside={<span className="hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-black sm:inline-block">{colleges.length} colleges</span>}
      />
      <div className="mb-4 flex flex-wrap gap-1.5">
        {info.exams.map(e => <span key={e} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{e}</span>)}
      </div>
      <Disclaimer />
      {colleges.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {colleges.map(c => <CollegeCard key={c.slug} college={c} go={go} />)}
        </div>
      ) : <p className="text-sm text-slate-500 dark:text-slate-400">Colleges for this state are being added.</p>}
    </div>
  );
}

/* ─── College card ──────────────────────────────────────────────────────────*/
function CollegeCard({ college: c, go }: { college: CollegeFull; go: (to: string) => void }) {
  const stateSlug = stateSlugForCollege(c);
  return (
    <button onClick={() => go(`/colleges/${stateSlug}/${c.slug}`)}
      className="text-left rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-black text-primary">#{getStateRank(c.slug)} in state</span>
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight truncate">{c.shortName || c.name}</h3>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500"><MapPin size={11} />{c.city}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${typeColor[c.type]}`}>{c.type}</span>
          {c.nirf && <span className="text-[10px] font-black text-slate-500">NIRF #{c.nirf}</span>}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 px-2 py-1"><p className="text-[9px] font-bold text-emerald-600/70 dark:text-emerald-400 uppercase">Fees/yr</p><p className="font-black text-emerald-700 dark:text-emerald-300">{c.feesPerYear}</p></div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 px-2 py-1"><p className="text-[9px] font-bold text-blue-600/70 dark:text-blue-400 uppercase">Avg package</p><p className="font-black text-blue-700 dark:text-blue-300">{c.placementAvg}</p></div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400"><span className="font-black text-slate-600 dark:text-slate-300">Cutoff:</span> {c.cutoff}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-primary">Full details <ChevronRight size={12} /></span>
    </button>
  );
}

/* ─── College detail ────────────────────────────────────────────────────────*/
function CollegeDetail({ college: c, go, goBack }: { college: CollegeFull; go: (to: string) => void; goBack: (parent: string) => void }) {
  const stateSlug = stateSlugForCollege(c);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title={`${c.shortName || c.name} — Fees, Cutoff, Placements & Admission 2026 | Syllab.in`}
        description={`${c.name}, ${c.city}: B.Tech fees ${c.feesPerYear}/yr, ${c.cutoff}, NIRF ${c.nirf ? '#' + c.nirf : 'ranked'}, average package ${c.placementAvg}. Admission via ${c.exams.join('/')}. Full admission process, hostel & placements.`}
        keywords={`${c.name} fees, ${c.shortName || c.name} cutoff 2026, ${c.shortName || c.name} placements, ${c.name} admission process, ${c.name} hostel, ${c.city} engineering college, ${c.exams.join(' ')}`}
        url={`${SITE}/colleges/${stateSlug}/${c.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org', '@type': 'CollegeOrUniversity',
            name: c.name, url: `${SITE}/colleges/${stateSlug}/${c.slug}`,
            foundingDate: String(c.established),
            address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.state, addressCountry: 'IN' },
            sameAs: `https://${c.website}`,
          },
          {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${SITE}/colleges` },
              { '@type': 'ListItem', position: 3, name: c.state, item: `${SITE}/colleges/${stateSlug}` },
              { '@type': 'ListItem', position: 4, name: c.shortName || c.name, item: `${SITE}/colleges/${stateSlug}/${c.slug}` },
            ],
          },
        ]}
      />
      {/* Breadcrumb */}
      <nav className="mb-3 flex flex-wrap items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
        <button onClick={() => go('/colleges')} className="hover:text-primary">Colleges</button>
        <ChevronRight size={11} />
        <button onClick={() => goBack(`/colleges/${stateSlug}`)} className="hover:text-primary">{c.state}</button>
        <ChevronRight size={11} />
        <span className="text-slate-600">{c.shortName || c.name}</span>
      </nav>

      {/* Header — navy (already dark, keep as-is) */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black">{c.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/70"><MapPin size={12} />{c.city}, {c.state} · Est. {c.established}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-black text-white">🏆 #{getStateRank(c.slug)} in {c.state}</span>
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-black text-white">🇮🇳 #{getNationalRank(c.slug)} of {TOTAL_COLLEGES} (Syllab rank)</span>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${typeColor[c.type]}`}>{c.type}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <Stat icon={<GraduationCap size={14} />} label="NIRF" value={c.nirf ? `#${c.nirf}` : '—'} />
          <Stat icon={<Wallet size={14} />} label="Fees/yr" value={c.feesPerYear} />
          <Stat icon={<TrendingUp size={14} />} label="Avg pkg" value={c.placementAvg} />
          <Stat icon={<Briefcase size={14} />} label="Placed" value={c.placementRate} />
        </div>
      </div>

      <Disclaimer />

      <Section title="About">
        <p className="text-sm text-slate-600">{c.about}</p>
        <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs font-black text-primary dark:text-emerald-400 hover:underline"><Globe size={12} />{c.website}</a>
      </Section>

      {getRankings(c).length > 0 && (
        <Section title="Rankings (top sources)">
          <div className="flex flex-wrap gap-2">
            {getRankings(c).map(r => (
              <div key={r.source} className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 px-3 py-1.5 text-center">
                <p className="text-sm font-black text-amber-700 dark:text-amber-300">{r.rank}</p>
                <p className="text-[10px] font-bold text-amber-600/70 dark:text-amber-400 uppercase tracking-wide">{r.source}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">Indicative — confirm on each ranking body's official list.</p>
        </Section>
      )}

      <Section title="Top branches">
        <div className="flex flex-wrap gap-1.5">
          {c.topBranches.map(b => <span key={b} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">{b}</span>)}
        </div>
      </Section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Section title="Fees (B.Tech)">
          <Detail label="Per year" value={c.feesPerYear} />
          <Detail label="Total (4 yrs)" value={c.feesTotal} />
          <Detail label="Hostel / year" value={c.hostelPerYear} />
        </Section>
        <Section title="Admission">
          <Detail label="Exam(s)" value={c.exams.join(', ')} />
          <Detail label="Indicative cutoff" value={c.cutoff} />
        </Section>
      </div>

      <Section title={<span className="flex items-center gap-1.5"><BedDouble size={14} /> Accommodation</span>}>
        <p className="text-sm text-slate-600">{c.accommodation}</p>
      </Section>

      <Section title={<span className="flex items-center gap-1.5"><TrendingUp size={14} /> Placements</span>}>
        <div className="grid grid-cols-3 gap-2 text-center">
          <PlaceStat label="Average" value={c.placementAvg} />
          <PlaceStat label="Highest" value={c.placementHighest} />
          <PlaceStat label="Placement rate" value={c.placementRate} />
        </div>
        <p className="mt-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Top recruiters</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {c.recruiters.map(r => <span key={r} className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{r}</span>)}
        </div>
      </Section>

      <Section title={<span className="flex items-center gap-1.5"><CalendarClock size={14} /> Admission process (step by step)</span>}>
        <ol className="space-y-2">
          {c.admissionSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Other colleges in state */}
      <Section title={`More colleges in ${c.state}`}>
        <div className="flex flex-wrap gap-1.5">
          {getCollegesByState(stateSlug).filter(o => o.slug !== c.slug).slice(0, 8).map(o => (
            <button key={o.slug} onClick={() => go(`/colleges/${stateSlug}/${o.slug}`)}
              className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition">
              {o.shortName || o.name}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ─── Small UI bits ─────────────────────────────────────────────────────────*/
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-2 py-2">
      <p className="flex items-center justify-center gap-1 text-[10px] font-bold text-white/60 uppercase">{icon}{label}</p>
      <p className="mt-0.5 text-sm font-black text-white">{value}</p>
    </div>
  );
}
function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
      <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-2">{title}</h2>
      {children}
    </section>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1 border-b border-slate-50 dark:border-slate-700 last:border-0">
      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{label}</span>
      <span className="text-xs font-black text-slate-700 dark:text-slate-200 text-right">{value}</span>
    </div>
  );
}
function PlaceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-700 px-2 py-2">
      <p className="text-sm font-black text-slate-800 dark:text-slate-100">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{label}</p>
    </div>
  );
}
