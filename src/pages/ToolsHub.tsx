/**
 * ToolsHub.tsx — the /tools landing page: a single grid showcasing every free
 * student tool. Strong SEO hub ("free student tools") + a friendlier way to
 * discover the tools than the Explore dropdown. Cards are real crawlable links
 * that navigate within the SPA.
 */
import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { TOOLS } from '../data/toolsRegistry';
import { loadStats, streak, totals, lastDays, todayISO } from '../lib/toolStats';

const SITE = 'https://syllab.in';

/**
 * On-device study streak, built from work actually done in the tools (completed
 * Pomodoro focus sessions + flashcard reviews). Renders nothing until there is
 * something to show, so first-time visitors just see the tools.
 */
function StudyStreak() {
  const [data, setData] = useState(() => ({} as ReturnType<typeof loadStats>));
  useEffect(() => {
    const read = () => setData(loadStats());
    read();
    window.addEventListener('syllab:tool-stats-updated', read);
    return () => window.removeEventListener('syllab:tool-stats-updated', read);
  }, []);

  const today = todayISO();
  const days = lastDays(data, today, 7);
  const t = totals(data);
  const s = streak(data, today);
  if (t.focus + t.flashcard === 0) return null;

  const max = Math.max(1, ...days.map((d) => d.count));
  return (
    <div className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-50/50 dark:from-primary/15 dark:to-slate-800 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <div className="text-2xl font-black text-primary">🔥 {s}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">day streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.focus}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">focus sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.flashcard}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">cards reviewed</div>
          </div>
        </div>
        {/* last-7-days sparkline */}
        <div className="flex items-end gap-1" aria-label="Activity over the last 7 days">
          {days.map((d) => (
            <div key={d.date} title={`${d.date}: ${d.count}`} className="w-3 rounded-sm bg-primary/70"
              style={{ height: `${Math.max(4, Math.round((d.count / max) * 32))}px`, opacity: d.count ? 1 : 0.25 }} />
          ))}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">Tracked on this device from your Pomodoro sessions and flashcard reviews — nothing is uploaded.</p>
    </div>
  );
}

export default function ToolsHub({ navigate }: { navigate?: (path: string) => void }) {
  const go = (path: string) => {
    if (navigate) { navigate(path); return; }
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Free Student Tools — Calculators, Timers, Flashcards & More | Syllab.in"
        description="10 free tools for students in one place: percentage & CGPA calculators, unit converter, interactive periodic table, Pomodoro timer, marks tracker, study planner, spaced-repetition flashcards, AI answer evaluator and college predictors. No signup."
        keywords="free student tools, study tools online, student calculators, pomodoro timer, flashcards, study planner, periodic table, unit converter, marks tracker, college predictor, tools for CBSE JEE NEET students"
        url={`${SITE}/tools`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Student Tools', url: `${SITE}/tools`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🧰" title="Free Student Tools" subtitle="Every Syllab study tool in one place — calculators, timers, flashcards, converters and predictors. 100% free, no signup." className="mb-8" />

      <StudyStreak />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <a key={t.path} href={t.path} onClick={(e) => { e.preventDefault(); go(t.path); }}
            className="group rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition">
            <div className="text-3xl">{t.emoji}</div>
            <h2 className="mt-2 text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{t.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.desc}</p>
            <span className="mt-3 inline-block text-xs font-black text-primary">Open →</span>
          </a>
        ))}
      </div>

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Free tools for every Indian student</h2>
        <p>Syllab's free student tools cover the whole study workflow — crunch your marks and percentage, convert units for physics and chemistry, explore the periodic table, focus with a Pomodoro timer, build a revision timetable, memorise with spaced-repetition flashcards, and plan your college and career. Everything runs in your browser, works on mobile, is saved on your device where it matters, and needs no sign-up.</p>
        <p>Built for CBSE, NCERT, state boards, JEE and NEET students. Prefer guided learning? Explore free <a href="/syllabus" className="font-bold text-primary hover:underline">chapter lessons</a>, <a href="/mock-tests" className="font-bold text-primary hover:underline">mock tests</a> and <a href="/coding" className="font-bold text-primary hover:underline">coding courses</a> too.</p>
      </section>
    </div>
  );
}
