/**
 * Pomodoro.tsx — free Pomodoro focus timer for studying. Alternates focus
 * sessions with short/long breaks, counts completed sessions, chimes at each
 * phase end (Web Audio, no asset), and remembers your settings on-device.
 * Pure client-side (lib/pomodoro.ts). Indexable SEO page.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { DEFAULT_SETTINGS, PHASE_LABEL, nextPhase, phaseMinutes, mmss, type Phase, type PomodoroSettings } from '../lib/pomodoro';
import { recordStat } from '../lib/toolStats';

const SITE = 'https://syllab.in';
const STORE_KEY = 'syllab_pomodoro_settings_v1';

const RING: Record<Phase, string> = { focus: 'text-primary', short: 'text-sky-500', long: 'text-violet-500' };
const BG: Record<Phase, string> = { focus: 'from-primary/10 to-emerald-100/40', short: 'from-sky-100/50 to-sky-50', long: 'from-violet-100/50 to-violet-50' };

function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; o.type = 'sine';
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    o.start(); o.stop(ctx.currentTime + 0.95);
  } catch { /* audio not available */ }
}

export default function Pomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>('focus');
  const [remaining, setRemaining] = useState(DEFAULT_SETTINGS.focus * 60);
  const [running, setRunning] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const tick = useRef<number | null>(null);

  // Load saved settings.
  useEffect(() => {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }; setSettings(s); setRemaining(s.focus * 60); } } catch { /* ignore */ }
  }, []);

  const advance = useCallback(() => {
    chime();
    // Record OUTSIDE the setPhase updater: recordStat increments on-device
    // counters and is not idempotent, so it must not run twice under StrictMode.
    if (phase === 'focus') recordStat('focus');
    setPhase((p) => {
      const doneFocus = p === 'focus' ? completedFocus + 1 : completedFocus;
      if (p === 'focus') setCompletedFocus(doneFocus);
      const np = nextPhase(p, doneFocus, settings.longEvery);
      setRemaining(phaseMinutes(np, settings) * 60);
      return np;
    });
    setRunning(false);
  }, [completedFocus, settings, phase]);

  // Ticking.
  useEffect(() => {
    if (!running) { if (tick.current) { clearInterval(tick.current); tick.current = null; } return; }
    tick.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { queueMicrotask(advance); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [running, advance]);

  // Reflect the countdown in the tab title.
  useEffect(() => { document.title = `${mmss(remaining)} · ${PHASE_LABEL[phase]} — Pomodoro | Syllab.in`; }, [remaining, phase]);

  const total = phaseMinutes(phase, settings) * 60;
  const pct = total > 0 ? (1 - remaining / total) : 0;

  const setToPhase = (p: Phase) => { setPhase(p); setRemaining(phaseMinutes(p, settings) * 60); setRunning(false); };
  const reset = () => { setRunning(false); setRemaining(phaseMinutes(phase, settings) * 60); };
  const changeSetting = (k: keyof PomodoroSettings, v: number) => {
    const s = { ...settings, [k]: Math.max(1, Math.min(k === 'longEvery' ? 12 : 90, v || 1)) };
    setSettings(s);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
    if (!running) setRemaining(phaseMinutes(phase, s) * 60);
  };

  const R = 130, C = 2 * Math.PI * R;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Free Pomodoro Timer for Studying — Focus Timer | Syllab.in"
        description="Free online Pomodoro timer to study with focus. 25-minute focus sessions with short and long breaks, session counter and a gentle chime. Customisable, saved on your device, no signup. Beat procrastination."
        keywords="pomodoro timer, study timer, focus timer, pomodoro technique, 25 minute timer, online timer for studying, productivity timer free, beat procrastination"
        url={`${SITE}/pomodoro`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Pomodoro Timer', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/pomodoro`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="⏳" title="Pomodoro Timer" subtitle="Study in focused 25-minute sprints with short breaks. Customisable, with a session counter and a gentle chime. Free, no signup." className="mb-6" />

      {/* Phase switcher */}
      <div className="flex justify-center gap-2">
        {(['focus', 'short', 'long'] as Phase[]).map((p) => (
          <button key={p} type="button" onClick={() => setToPhase(p)}
            className={`rounded-full px-4 py-1.5 text-xs font-black transition ${phase === p ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {PHASE_LABEL[p]}
          </button>
        ))}
      </div>

      {/* Timer dial */}
      <div className={`mt-5 rounded-3xl bg-gradient-to-br ${BG[phase]} dark:from-slate-800 dark:to-slate-800 border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center`}>
        <svg width="300" height="300" viewBox="0 0 300 300" className="max-w-full">
          <circle cx="150" cy="150" r={R} fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="12" />
          <circle cx="150" cy="150" r={R} fill="none" stroke="currentColor" className={RING[phase]} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 150 150)" style={{ transition: 'stroke-dashoffset 0.5s linear' }} />
          <text x="150" y="150" textAnchor="middle" dominantBaseline="central" className="fill-slate-900 dark:fill-slate-100" style={{ fontSize: '54px', fontWeight: 900 }}>{mmss(remaining)}</text>
          <text x="150" y="195" textAnchor="middle" className="fill-slate-400" style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{PHASE_LABEL[phase]}</text>
        </svg>

        <div className="mt-2 flex items-center gap-3">
          <button type="button" onClick={reset} aria-label="Reset" className="rounded-full bg-white/70 dark:bg-slate-700 p-3 text-slate-500 shadow hover:bg-white"><RotateCcw size={18} /></button>
          <button type="button" onClick={() => setRunning((r) => !r)} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-black text-white shadow-lg hover:opacity-90 transition">
            {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
          </button>
          <button type="button" onClick={advance} aria-label="Skip" className="rounded-full bg-white/70 dark:bg-slate-700 p-3 text-slate-500 shadow hover:bg-white"><SkipForward size={18} /></button>
        </div>
        <p className="mt-3 text-sm font-bold text-slate-500">✅ {completedFocus} focus session{completedFocus === 1 ? '' : 's'} done today</p>
      </div>

      {/* Settings */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([['focus', 'Focus (min)'], ['short', 'Short break'], ['long', 'Long break'], ['longEvery', 'Long every']] as [keyof PomodoroSettings, string][]).map(([k, label]) => (
          <label key={k} className="block">
            <span className="text-[11px] font-bold text-slate-500">{label}</span>
            <input type="number" min="1" value={settings[k]} onChange={(e) => changeSetting(k, Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
          </label>
        ))}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">How the Pomodoro technique works</h2>
        <p>The Pomodoro technique breaks study into focused 25-minute sprints separated by short 5-minute breaks, with a longer 15-minute break after every four sprints. Working against a ticking timer makes it far easier to start, blocks distractions, and prevents burnout — one of the simplest ways to beat procrastination and study for longer.</p>
        <p>Adjust the focus and break lengths to suit you, and the timer remembers your settings on this device. Pair it with the free <a href="/study-planner" className="font-bold text-primary hover:underline">study planner</a> and <a href="/flashcards" className="font-bold text-primary hover:underline">flashcards</a> for a complete study routine. Free, no sign-up.</p>
      </section>

      <ToolRelated current="/pomodoro" />
    </div>
  );
}
