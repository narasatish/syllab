/**
 * youtube.mjs — upload a generated reel to YouTube as a Short (#5 gap: a second
 * free channel; Shorts rank in Google video carousels and pull big edu traffic).
 *
 * Uses the YouTube Data API v3 (resumable upload) via plain fetch — no SDK.
 * One-time setup (then it's automatic):
 *   1. Google Cloud Console → enable "YouTube Data API v3".
 *   2. Create an OAuth client (Desktop), get CLIENT_ID + CLIENT_SECRET.
 *   3. Do the consent flow once to get a long-lived REFRESH_TOKEN
 *      (scope: https://www.googleapis.com/auth/youtube.upload).
 *   4. Set env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 * Without these, isYouTubeReady() is false and the pipeline simply skips YouTube.
 *
 * Reels are already 1080×1920 ≤60s MP4 → valid Shorts. We append #Shorts to the
 * title/description so YouTube classifies them as Shorts.
 */
import { readFileSync, statSync } from 'node:fs';

const ENV = () => ({
  id: (process.env.YT_CLIENT_ID || '').trim(),
  secret: (process.env.YT_CLIENT_SECRET || '').trim(),
  refresh: (process.env.YT_REFRESH_TOKEN || '').trim(),
});

export function isYouTubeReady() {
  const e = ENV();
  return !!(e.id && e.secret && e.refresh);
}

async function accessToken() {
  const e = ENV();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: e.id, client_secret: e.secret, refresh_token: e.refresh, grant_type: 'refresh_token' }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) throw new Error(`YT token failed: ${JSON.stringify(data).slice(0, 200)}`);
  return data.access_token;
}

/**
 * Upload one MP4 as a YouTube Short.
 * @returns {Promise<{videoId:string, url:string}>}
 */
export async function uploadShort(videoPath, { title, description, tags = [] }) {
  const token = await accessToken();
  const fileSize = statSync(videoPath).size;
  const meta = {
    snippet: {
      title: `${title} #Shorts`.slice(0, 100),
      description: `${description}\n\n#Shorts #Syllab #freelearning`.slice(0, 4900),
      tags: [...tags, 'shorts', 'cbse', 'ncert', 'study', 'syllab'].slice(0, 30),
      categoryId: '27', // Education
    },
    status: { privacyStatus: 'public', selfDeclaredMadeForKids: false },
  };

  // 1) Start a resumable session.
  const init = await fetch(
    'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Length': String(fileSize),
        'X-Upload-Content-Type': 'video/mp4',
      },
      body: JSON.stringify(meta),
    },
  );
  if (!init.ok) throw new Error(`YT init failed: ${init.status} ${(await init.text()).slice(0, 200)}`);
  const uploadUrl = init.headers.get('location');
  if (!uploadUrl) throw new Error('YT init: no upload URL');

  // 2) Upload the bytes.
  const res = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(fileSize) }, body: readFileSync(videoPath) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.id) throw new Error(`YT upload failed: ${res.status} ${JSON.stringify(data).slice(0, 200)}`);
  return { videoId: data.id, url: `https://youtube.com/shorts/${data.id}` };
}
