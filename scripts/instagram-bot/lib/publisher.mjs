/**
 * publisher.mjs — Instagram Graph API publisher for IMAGE, CAROUSEL and REELS.
 *
 * Meta's required flow is always: create container(s) → (poll if video) → publish.
 *   IMAGE    : /media (image_url) → /media_publish
 *   CAROUSEL : N× /media (image_url, is_carousel_item) → /media (media_type=CAROUSEL,
 *              children=ids) → /media_publish
 *   REELS    : /media (media_type=REELS, video_url) → poll status_code=FINISHED →
 *              /media_publish
 *
 * Env: IG_BUSINESS_ACCOUNT_ID, IG_ACCESS_TOKEN (long-lived). DRY_RUN=true skips all
 * network calls and just reports the plan. Respects a per-run post cap (IG allows
 * 25 published posts / 24h per account; we post 10).
 */
import { hostMedia } from './media-host.mjs';

const IG_ID = process.env.IG_BUSINESS_ACCOUNT_ID || '';
const TOKEN = process.env.IG_ACCESS_TOKEN || '';
const GRAPH = process.env.GRAPH_VERSION || 'v21.0';
const BASE = `https://graph.facebook.com/${GRAPH}`;
// Read at call time so a CLI `--dry` flag (which sets process.env.DRY_RUN) is honoured.
const isDryRun = () => String(process.env.DRY_RUN || '').toLowerCase() === 'true';

async function igPost(pathPart, params) {
  const url = `${BASE}/${IG_ID}/${pathPart}`;
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = await fetch(url, { method: 'POST', body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    throw new Error(`IG ${pathPart} failed: ${res.status} ${JSON.stringify(data.error || data).slice(0, 300)}`);
  }
  return data;
}

async function getContainerStatus(id) {
  const url = `${BASE}/${id}?fields=status_code,status&access_token=${TOKEN}`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  return data.status_code || 'UNKNOWN';
}

/** Wait until a (video) container is FINISHED processing. */
async function waitForContainer(id, { tries = 30, intervalMs = 5000 } = {}) {
  for (let i = 0; i < tries; i++) {
    const status = await getContainerStatus(id);
    if (status === 'FINISHED') return true;
    if (status === 'ERROR' || status === 'EXPIRED') throw new Error(`Container ${id} status ${status}`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Container ${id} not FINISHED after ${tries} tries`);
}

async function publish(creationId) {
  const data = await igPost('media_publish', { creation_id: creationId });
  return data.id;
}

/**
 * Publish one post.
 * @param {{type:'IMAGE'|'CAROUSEL'|'REELS', files:string[]}} media
 * @param {string} caption
 * @param {string} [firstComment] - optional extra hashtags to post as first comment
 */
export async function publishPost(media, caption, firstComment) {
  if (isDryRun()) {
    console.log(`   [DRY_RUN] would publish ${media.type} (${media.files.length} file(s))`);
    return { postId: 'dry-run', dryRun: true };
  }
  if (!IG_ID || !TOKEN) throw new Error('Missing IG_BUSINESS_ACCOUNT_ID / IG_ACCESS_TOKEN');

  let creationId;
  if (media.type === 'IMAGE') {
    const imageUrl = await hostMedia(media.files[0]);
    creationId = (await igPost('media', { image_url: imageUrl, caption })).id;
  } else if (media.type === 'CAROUSEL') {
    const childIds = [];
    for (const f of media.files) {
      const imageUrl = await hostMedia(f);
      const child = await igPost('media', { image_url: imageUrl, is_carousel_item: 'true' });
      childIds.push(child.id);
    }
    creationId = (await igPost('media', { media_type: 'CAROUSEL', children: childIds.join(','), caption })).id;
  } else if (media.type === 'REELS') {
    const videoUrl = await hostMedia(media.files[0]);
    creationId = (await igPost('media', { media_type: 'REELS', video_url: videoUrl, caption, share_to_feed: 'true' })).id;
    await waitForContainer(creationId); // video must finish processing before publish
  } else {
    throw new Error(`Unknown media type ${media.type}`);
  }

  const postId = await publish(creationId);

  // Optional first comment with extra hashtags.
  if (firstComment && postId) {
    try {
      await fetch(`${BASE}/${postId}/comments`, {
        method: 'POST',
        body: new URLSearchParams({ message: firstComment, access_token: TOKEN }),
      });
    } catch (e) { console.warn('   first-comment failed (non-fatal):', e.message); }
  }
  return { postId, dryRun: false };
}
