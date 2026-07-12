/**
 * PageHero — the site's standard branded page header. 2026 refresh: drifting
 * aurora glow + a fine dot-grid texture + a soft top sheen, with a gentle
 * entrance. API is unchanged so all 45 pages that use it upgrade automatically.
 * Motion is CSS transform/opacity only and respects prefers-reduced-motion.
 */
import { cn } from '../lib/utils';

interface PageHeroProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  /** Tailwind gradient stops; defaults to the brand emerald→teal. */
  gradient?: string;
  /** Optional right-aligned content (e.g. a stat chip or CTA). */
  aside?: React.ReactNode;
  className?: string;
}

export default function PageHero({
  emoji,
  title,
  subtitle,
  gradient = 'from-emerald-500 via-emerald-600 to-teal-700',
  aside,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'app-card-in relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-6 sm:p-9 text-white',
        gradient,
        className,
      )}
      style={{ boxShadow: '0 18px 50px -12px rgba(16,185,129,.45)' }}
    >
      {/* drifting aurora glow */}
      <div className="aurora" aria-hidden="true">
        <span className="aurora-blob" style={{ top: '-30%', right: '-10%', width: '60%', height: '140%', background: 'radial-gradient(circle, rgba(255,255,255,.5), transparent 60%)' }} />
        <span className="aurora-blob" style={{ bottom: '-40%', left: '-8%', width: '50%', height: '130%', background: 'radial-gradient(circle, rgba(45,212,191,.55), transparent 62%)', animationDelay: '-6s' }} />
      </div>
      {/* fine dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '22px 22px' }}
        aria-hidden="true"
      />
      {/* top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-sm sm:text-[2rem] sm:leading-[1.1]">
            {emoji ? <span className="mr-1.5">{emoji}</span> : null}
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2.5 max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  );
}
