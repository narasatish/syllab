/**
 * CareerCompass — the signature hero for the Career & Colleges "zone". A distinct
 * deep-navy → indigo theme with gold accents (vs the green study theme) that frames
 * the section as an aspirational, guided journey: Discover → Decide → Get In.
 * Each step is a button wired by the host page (to a tab switch or a route).
 */
import { Compass, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export interface CompassStep {
  n: number;
  label: string;       // Discover / Decide / Get In
  title: string;
  desc: string;
  cta: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function CareerCompass({ subtitle, steps }: { subtitle: string; steps: CompassStep[] }) {
  return (
    <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-7">
      <div className="flex items-center gap-2 text-amber-300">
        <Compass size={16} />
        <span className="text-xs font-black uppercase tracking-[0.2em]">Career Compass</span>
      </div>
      <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">Your future, mapped in 3 steps</h1>
      <p className="mt-1.5 max-w-xl text-sm text-white/70">{subtitle}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {steps.map((s) => (
          <button
            key={s.n}
            onClick={s.onClick}
            className="group rounded-2xl bg-white/5 p-4 text-left ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:ring-amber-300/40"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-slate-900">{s.n}</span>
              <span className="text-white/40 transition-colors group-hover:text-amber-300">{s.icon}</span>
            </div>
            <p className="mt-2.5 text-[11px] font-black uppercase tracking-widest text-amber-300/80">{s.label}</p>
            <h3 className="font-black text-white">{s.title}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-white/60">{s.desc}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-black text-amber-300">{s.cta} <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
          </button>
        ))}
      </div>
    </section>
  );
}
