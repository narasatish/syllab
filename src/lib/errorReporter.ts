/**
 * errorReporter — sends client-side errors to the backend so the owner gets an
 * email alert the moment a page/tool breaks for a real user. Fire-and-forget,
 * throttled, and never throws (it must never make things worse).
 */
import { API_URL } from './api';

let lastSent = 0;
const sentKeys = new Set<string>();

export function reportClientError(info: { message: string; source?: string; stack?: string }): void {
  try {
    const key = (info.message || '').slice(0, 80);
    if (!key) return;
    if (sentKeys.has(key)) return; // dedupe identical errors per session
    const now = Date.now();
    if (now - lastSent < 3000) return; // throttle: at most ~1 report / 3s
    lastSent = now;
    sentKeys.add(key);
    if (sentKeys.size > 50) sentKeys.clear();

    const payload = JSON.stringify({
      message: info.message,
      source: info.source || 'app',
      stack: (info.stack || '').slice(0, 1500),
      url: typeof location !== 'undefined' ? location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    });
    fetch(`${API_URL}/api/client-error`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => { /* fire-and-forget */ });
  } catch { /* never throw from the reporter */ }
}

/** Capture uncaught JS errors + promise rejections globally. */
export function installGlobalErrorReporting(): void {
  if (typeof window === 'undefined') return;
  window.addEventListener('error', (e: ErrorEvent) => {
    // Only JS errors (have a message); ignore resource-load (img/script) noise.
    if (e && e.message) {
      reportClientError({ message: e.message, source: 'window.onerror', stack: e.error?.stack });
    }
  });
  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    const r = e?.reason;
    const message = (r && (r.message || String(r))) || 'Unhandled promise rejection';
    reportClientError({ message, source: 'unhandledrejection', stack: r?.stack });
  });
}
