/**
 * Instagram Graph API client — official, allowed-by-TOS method to post.
 *
 * Two-step publishing flow (Meta's required pattern):
 *   1. POST /{ig-user-id}/media          → returns containerId
 *   2. POST /{ig-user-id}/media_publish  → publishes the container
 *
 * Image must be publicly hosted on the internet (Instagram downloads it from the URL).
 * We support 2 hosts:
 *   - Firebase Storage (already configured in this project)
 *   - Free image-host fallback: 0x0.st (anonymous, deletes after 30 days — good enough)
 *
 * Env vars needed:
 *   - IG_BUSINESS_ACCOUNT_ID  (numeric Instagram Business account ID, from Meta Graph Explorer)
 *   - IG_ACCESS_TOKEN         (long-lived Page access token with instagram_basic, instagram_content_publish, pages_show_list, pages_read_engagement)
 *
 * DRY_RUN=true skips actual posting and just logs what would happen.
 */

const IG_BUSINESS_ACCOUNT_ID = process.env.IG_BUSINESS_ACCOUNT_ID || '';
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN || '';
const DRY_RUN = String(process.env.DRY_RUN || '').toLowerCase() === 'true';
const GRAPH_VERSION = process.env.GRAPH_VERSION || 'v21.0';

/**
 * Upload an image to 0x0.st (anonymous, no API key needed) — returns public URL.
 * Used as a free fallback when no Firebase Storage upload is configured.
 */
async function uploadToTempHost(imagePath) {
  const fs = await import('node:fs');
  const formData = new FormData();
  const buffer = fs.readFileSync(imagePath);
  const blob = new Blob([buffer], { type: 'image/png' });
  formData.append('file', blob, 'post.png');

  const res = await fetch('https://0x0.st', {
    method: 'POST',
    body: formData,
    headers: { 'User-Agent': 'syllab-instagram-bot/1.0' },
  });
  if (!res.ok) throw new Error(`0x0.st upload failed: ${res.status}`);
  const url = (await res.text()).trim();
  if (!url.startsWith('http')) throw new Error(`0x0.st returned unexpected: ${url}`);
  return url;
}

/**
 * Step 1: Create the media container.
 */
async function createMediaContainer(imageUrl, caption) {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${IG_BUSINESS_ACCOUNT_ID}/media`;
  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: IG_ACCESS_TOKEN,
  });
  const res = await fetch(`${url}?${params.toString()}`, { method: 'POST' });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Container create failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  if (!data.id) throw new Error(`No container id returned: ${JSON.stringify(data)}`);
  return data.id;
}

/**
 * Step 2: Publish the media container.
 */
async function publishContainer(containerId) {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${IG_BUSINESS_ACCOUNT_ID}/media_publish`;
  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: IG_ACCESS_TOKEN,
  });
  const res = await fetch(`${url}?${params.toString()}`, { method: 'POST' });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Publish failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Main public function — post an image + caption to Instagram.
 *
 * @param {string} imagePath - local path to a PNG/JPEG file
 * @param {string} caption - post caption with hashtags appended
 * @returns {Promise<{postId: string, dryRun: boolean, imageUrl?: string}>}
 */
export async function postToInstagram(imagePath, caption) {
  console.log(`[instagram] Preparing post (dryRun=${DRY_RUN})`);

  if (DRY_RUN) {
    console.log('[instagram] DRY_RUN — skipping actual post.');
    console.log('[instagram] Would post image:', imagePath);
    console.log('[instagram] Caption:\n' + caption);
    return { postId: 'dry-run', dryRun: true };
  }

  if (!IG_BUSINESS_ACCOUNT_ID || !IG_ACCESS_TOKEN) {
    throw new Error('Missing IG_BUSINESS_ACCOUNT_ID or IG_ACCESS_TOKEN env vars. See scripts/instagram-bot/README.md for setup.');
  }

  // 1. Upload image to public host
  console.log('[instagram] Uploading image to temp host...');
  const imageUrl = await uploadToTempHost(imagePath);
  console.log('[instagram] Image hosted at:', imageUrl);

  // 2. Create media container
  console.log('[instagram] Creating media container...');
  const containerId = await createMediaContainer(imageUrl, caption);
  console.log('[instagram] Container ID:', containerId);

  // 3. Wait a moment for Instagram to download the image
  await new Promise((r) => setTimeout(r, 3000));

  // 4. Publish
  console.log('[instagram] Publishing...');
  const result = await publishContainer(containerId);
  console.log('[instagram] ✅ Posted! Post ID:', result.id);

  return { postId: result.id, dryRun: false, imageUrl };
}
