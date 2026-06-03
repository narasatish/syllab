/**
 * PageHero — the site's standard branded page header (emerald/teal gradient,
 * rounded-3xl, soft decorative circles). Use at the top of a page so every page
 * shares one visual language instead of a plain <h1>.
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
        'relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/20',
        gradient,
        className,
      )}
    >
      {/* soft decorative circles — the site's hero motif */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            {emoji ? <span className="mr-1">{emoji}</span> : null}
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  );
}
