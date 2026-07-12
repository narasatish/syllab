/**
 * PushReminderOptIn — a small, self-contained opt-in for daily study reminders
 * (Web Push / FCM). Renders nothing unless push is configured (VAPID key set) AND
 * the browser supports FCM web push, so it never disrupts unsupported clients.
 * The token is stored in `pushTokens`; actual delivery is handled server-side by a
 * backend cron (syllab-backend) that reads that collection.
 */
import { useEffect, useState } from 'react';
import { Bell, BellRing, Check } from 'lucide-react';
import { isPushSupported, enablePush } from '../lib/push';
import type { User as FirebaseUser } from 'firebase/auth';

export default function PushReminderOptIn({ currentUser }: { currentUser?: FirebaseUser | null }) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'on' | 'denied' | 'error'>('idle');

  useEffect(() => { isPushSupported().then(setSupported).catch(() => setSupported(false)); }, []);
  useEffect(() => {
    if (supported && typeof Notification !== 'undefined' && Notification.permission === 'granted') setStatus('on');
  }, [supported]);

  if (!supported) return null;

  const enable = async () => {
    setStatus('loading');
    const r = await enablePush(currentUser?.uid);
    setStatus(r.ok ? 'on' : r.reason === 'denied' ? 'denied' : 'error');
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
      <BellRing size={20} className="shrink-0 text-amber-600" />
      <div className="min-w-[180px] flex-1">
        <p className="text-sm font-black text-amber-900 dark:text-amber-200">Daily study reminders</p>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300/80">Get a gentle nudge for your daily challenge &amp; revision streak.</p>
      </div>
      {status === 'on' ? (
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"><Check size={14} /> Reminders on</span>
      ) : (
        <button
          type="button"
          onClick={enable}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
        >
          <Bell size={15} />
          {status === 'loading' ? 'Enabling…' : status === 'denied' ? 'Blocked — allow in browser' : status === 'error' ? 'Try again' : 'Turn on reminders'}
        </button>
      )}
    </div>
  );
}
