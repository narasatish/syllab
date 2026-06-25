/**
 * Lightweight Google Analytics 4 wrapper.
 *
 * INERT until you set the env var `VITE_GA_ID` (e.g. "G-XXXXXXXXXX") at build time
 * (Firebase Hosting build env / GitHub Actions secret / .env). With no ID set,
 * nothing loads — zero network, zero cookies, no effect. So this can ship safely
 * now and "turn on" the moment you add your Measurement ID.
 *
 * SPA note: we disable GA's automatic page_view and send virtual pageviews on
 * route change ourselves (see trackPageview), because this app is a client-routed
 * SPA — otherwise GA only ever records the first page.
 */
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
let loaded = false;

export function isAnalyticsEnabled(): boolean {
  return !!GA_ID && import.meta.env.PROD;
}

export function initAnalytics(): void {
  if (loaded || typeof window === 'undefined') return;
  if (!isAnalyticsEnabled() && !isClarityEnabled()) return;
  loaded = true;

  if (isAnalyticsEnabled()) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    // anonymize_ip for privacy; send_page_view:false because we send them manually.
    w.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true });
  }

  initClarity();
  // Because init is deferred to idle, the app's first route effect may have fired
  // before gtag existed — record the landing pageview now so it isn't lost.
  try { trackPageview(window.location.pathname + window.location.search); } catch { /* ignore */ }
}

// ── Microsoft Clarity (free heatmaps + session replay) ───────────────────────
// INERT until you set VITE_CLARITY_ID (your Clarity project id). Ships safely now.
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;
function isClarityEnabled(): boolean { return !!CLARITY_ID && import.meta.env.PROD; }
function initClarity(): void {
  if (!isClarityEnabled() || typeof window === 'undefined') return;
  // Official Clarity snippet (typed, no inline string eval).
  const w = window as unknown as Record<string, unknown> & { clarity?: (...a: unknown[]) => void };
  w.clarity = w.clarity || function (...args: unknown[]) { (w.clarity as unknown as { q: unknown[] }).q = (w.clarity as unknown as { q?: unknown[] }).q || []; ((w.clarity as unknown as { q: unknown[] }).q).push(args); };
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
}

/** Record a virtual pageview on client-side route change. */
export function trackPageview(path: string): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Optional: track a custom event (e.g. 'mock_completed', 'doubt_solved'). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag('event', name, params || {});
}
