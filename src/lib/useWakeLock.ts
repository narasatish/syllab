/**
 * useWakeLock — keep the screen awake while `active` is true (so the phone/laptop
 * doesn't dim or lock mid-focus). Re-acquires automatically when the tab becomes
 * visible again (the OS drops the lock when you switch away). No-ops gracefully
 * where the Screen Wake Lock API isn't supported.
 */
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Sentinel = any;

export function useWakeLock(active: boolean): void {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    if (!active || !nav?.wakeLock?.request) return;

    let sentinel: Sentinel = null;
    let released = false;

    const acquire = async () => {
      try {
        sentinel = await nav.wakeLock.request('screen');
        sentinel.addEventListener?.('release', () => { sentinel = null; });
      } catch { /* user denied / unsupported — fine */ }
    };
    const onVisible = () => { if (document.visibilityState === 'visible' && !sentinel && !released) void acquire(); };

    void acquire();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', onVisible);
      try { sentinel?.release?.(); } catch { /* ignore */ }
      sentinel = null;
    };
  }, [active]);
}
