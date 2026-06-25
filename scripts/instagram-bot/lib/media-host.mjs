/**
 * media-host.mjs — uploads a local media file to a PUBLIC URL so the Instagram
 * Graph API can fetch it (the API never accepts raw uploads — only public URLs).
 *
 * Default host: 0x0.st (anonymous, no key, auto-expires ~30 days — long enough).
 * If FIREBASE_STORAGE_BUCKET + GOOGLE_APPLICATION_CREDENTIALS are set, uploads to
 * Firebase Storage instead (permanent, your own infra). Only invoked in live mode.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4' };

async function uploadTo0x0(filePath) {
  const buffer = readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const form = new FormData();
  form.append('file', new Blob([buffer], { type: MIME[ext] || 'application/octet-stream' }), path.basename(filePath));
  const res = await fetch('https://0x0.st', {
    method: 'POST', body: form, headers: { 'User-Agent': 'syllab-instagram-bot/2.0' },
  });
  if (!res.ok) throw new Error(`0x0.st upload failed: ${res.status} ${(await res.text().catch(() => '')).slice(0, 120)}`);
  const url = (await res.text()).trim();
  if (!url.startsWith('http')) throw new Error(`0x0.st returned unexpected: ${url.slice(0, 120)}`);
  return url;
}

let _bucket = null;
async function getFirebaseBucket() {
  if (_bucket) return _bucket;
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName || !process.env.GOOGLE_APPLICATION_CREDENTIALS) return null;
  const admin = await import('firebase-admin');
  if (!admin.apps?.length) admin.initializeApp({ storageBucket: bucketName });
  _bucket = admin.storage().bucket();
  return _bucket;
}

async function uploadToFirebase(filePath) {
  const bucket = await getFirebaseBucket();
  if (!bucket) return null;
  const ext = path.extname(filePath).toLowerCase();
  const dest = `instagram/${Date.now()}-${path.basename(filePath)}`;
  await bucket.upload(filePath, { destination: dest, metadata: { contentType: MIME[ext] || 'application/octet-stream' } });
  const file = bucket.file(dest);
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${dest}`;
}

/** Upload a local file → public URL (Firebase if configured, else 0x0.st). */
export async function hostMedia(filePath) {
  const fb = await uploadToFirebase(filePath).catch((e) => { console.warn('[host] Firebase upload failed, falling back:', e.message); return null; });
  if (fb) return fb;
  return uploadTo0x0(filePath);
}
