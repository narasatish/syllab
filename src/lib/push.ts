/**
 * push.ts — Web Push (Firebase Cloud Messaging) opt-in for streak / daily-challenge
 * reminders. INERT by design until you finish the one-time setup below, so importing
 * or calling these never breaks anything in production.
 *
 * ── Activation (one-time, your side) ───────────────────────────────────────────
 *   1. Firebase console → Project settings → Cloud Messaging → Web Push certificates
 *      → "Generate key pair". Copy the PUBLIC key.
 *   2. Add to your build env:  VITE_FIREBASE_VAPID_KEY=<that public key>
 *   3. Generate the messaging service worker from your env:  node scripts/gen-messaging-sw.mjs
 *      (writes public/firebase-messaging-sw.js with your PUBLIC firebase config).
 *   4. Add a Firestore rule so devices can register their token, e.g.:
 *        match /pushTokens/{token} { allow write: if true; allow read: if false; }
 *   5. A backend cron reads `pushTokens` and sends reminders via the FCM HTTP v1 API.
 *      (This client only handles permission + token registration + receiving.)
 *
 * Until VITE_FIREBASE_VAPID_KEY is set, isPushConfigured() === false and the UI
 * should hide the opt-in entirely.
 */
import { getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const VAPID = (import.meta.env.VITE_FIREBASE_VAPID_KEY || '').trim();

/** True only when the VAPID key is configured at build time. */
export function isPushConfigured(): boolean {
  return VAPID.length > 0;
}

/** True when push is configured AND this browser actually supports FCM web push. */
export async function isPushSupported(): Promise<boolean> {
  try {
    return isPushConfigured() && typeof Notification !== 'undefined' && (await isSupported());
  } catch {
    return false;
  }
}

export type EnablePushResult = { ok: boolean; reason?: 'unsupported' | 'denied' | 'no-token' | 'error'; token?: string };

/** Ask permission, register the messaging SW, fetch + persist the FCM token. */
export async function enablePush(uid?: string): Promise<EnablePushResult> {
  try {
    if (!(await isPushSupported())) return { ok: false, reason: 'unsupported' };
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return { ok: false, reason: 'denied' };

    const messaging = getMessaging(getApp());
    const reg =
      (await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js')) ||
      (await navigator.serviceWorker.register('/firebase-messaging-sw.js'));

    const token = await getToken(messaging, { vapidKey: VAPID, serviceWorkerRegistration: reg });
    if (!token) return { ok: false, reason: 'no-token' };

    // Persist so a backend can target this device. Best-effort; token is returned regardless.
    try {
      const db = getFirestore(getApp());
      await setDoc(
        doc(db, 'pushTokens', token),
        { token, uid: uid ?? null, ua: navigator.userAgent, updatedAt: serverTimestamp() },
        { merge: true },
      );
    } catch { /* saving is best-effort */ }

    return { ok: true, token };
  } catch {
    return { ok: false, reason: 'error' };
  }
}

/** Show a toast etc. when a push arrives while the app is in the foreground. */
export async function listenForegroundPush(cb: (title: string, body: string) => void): Promise<void> {
  if (!(await isPushSupported())) return;
  onMessage(getMessaging(getApp()), (payload) => {
    cb(payload.notification?.title || 'Syllab', payload.notification?.body || '');
  });
}
