/**
 * Syllab Reddit Bot
 * Posts Syllab.in to relevant Indian education subreddits.
 * Uses official Reddit API (OAuth2) — no scraping, no bans.
 *
 * SPAM FILTER STRATEGY:
 *   - Post bodies contain NO hyperlinks (plain text only) — avoids auto-removal
 *   - Bot immediately comments on its own post with the actual link
 *   - 30s delay between posts to avoid rate limits
 *
 * Setup:
 *   1. Go to https://old.reddit.com/prefs/apps → "Create Another App"
 *   2. Type: script | Name: SyllabBot | Redirect URI: http://localhost:8080
 *   3. Copy client_id (short string under app name) and client_secret
 *   4. Add to .env.local:
 *        REDDIT_CLIENT_ID=...
 *        REDDIT_CLIENT_SECRET=...
 *        REDDIT_USERNAME=your_reddit_username
 *        REDDIT_PASSWORD=your_reddit_password
 *   5. npm run reddit:dry-run   ← preview only, no actual posts
 *      npm run reddit:post      ← go live
 */

import 'dotenv/config';

const DRY_RUN = process.argv.includes('--dry-run');

const { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD } = process.env;

if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_USERNAME || !REDDIT_PASSWORD) {
  console.error('Missing Reddit credentials in .env.local');
  console.error('Need: REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD');
  process.exit(1);
}

const UA = `SyllabBot/1.0 by ${REDDIT_USERNAME}`;

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function getToken() {
  const creds = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
    body: new URLSearchParams({ grant_type: 'password', username: REDDIT_USERNAME, password: REDDIT_PASSWORD }),
  });
  const d = await res.json();
  if (!d.access_token) throw new Error('Auth failed: ' + JSON.stringify(d));
  console.log('Authenticated as', REDDIT_USERNAME);
  return d.access_token;
}

// ─── Submit post ──────────────────────────────────────────────────────────────
async function submitPost(token, subreddit, title, text) {
  if (DRY_RUN) {
    console.log(`\n[DRY RUN] r/${subreddit}`);
    console.log(`  Title: ${title}`);
    console.log(`  Body: ${text.slice(0, 100)}...`);
    return 'dryrun_fullname';
  }
  const res = await fetch('https://oauth.reddit.com/api/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
    body: new URLSearchParams({ sr: subreddit, kind: 'self', title, text, resubmit: 'true', nsfw: 'false', spoiler: 'false' }),
  });
  const d = await res.json();
  if (d.json?.errors?.length) throw new Error(JSON.stringify(d.json.errors));
  const postName = d.json?.data?.name;   // e.g. "t3_abc123"
  const postUrl  = d.json?.data?.url ?? '(no url)';
  console.log(`  Posted: ${postUrl}`);
  return postName;
}

// ─── Add comment ──────────────────────────────────────────────────────────────
async function addComment(token, postFullname, text) {
  if (DRY_RUN) { console.log(`  Comment: ${text.slice(0, 80)}...`); return; }
  await new Promise(r => setTimeout(r, 3000)); // small gap before comment
  const res = await fetch('https://oauth.reddit.com/api/comment', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
    body: new URLSearchParams({ thing_id: postFullname, text }),
  });
  const d = await res.json();
  if (d.json?.errors?.length) console.warn('  Comment warning:', d.json.errors);
  else console.log('  Comment added with link.');
}

// ─── Posts ────────────────────────────────────────────────────────────────────
// Body: plain text only (no hyperlinks) — avoids Reddit spam filter
// Comment: added immediately after with the actual link
const POSTS = [
  {
    subreddit: 'CBSE',
    title: 'Free CBSE practice site with AI tutor — no paywall, works on any phone browser',
    body: `My cousin failed Class 10 twice — not because she was dumb, but because tuitions in our town cost Rs 3,000/month per subject and she couldn't afford them.

I spent the last year building Syllab (syllab.in) — completely free, no paywalls.

What it has:
- Chapter-wise MCQ practice for Classes 5-12 (CBSE)
- AI tutor that explains WHY your answer was wrong, not just marks it
- Full mock tests for JEE, NEET, EAMCET, WBJEE, KCET, MHT-CET (10 papers each)
- Daily challenges with leaderboards
- Coding lab (Python, JS, HTML/CSS)
- GK Quiz (30+ questions per category, generates new sets so you never repeat)
- Works on any phone browser — no app install needed

No login needed to browse. Login only to save progress.

Would love honest feedback — what subjects or chapters need more questions?`,
    comment: `Link: https://syllab.in\nMock tests: https://syllab.in/mock-tests`,
  },
  {
    subreddit: 'JEEpreparation',
    title: 'Free JEE mock test site — 10 full papers each for JEE Main, BITSAT, EAMCET, WBJEE and 9 more exams',
    body: `Built Syllab (syllab.in/mock-tests) — free mock papers for:

JEE Main, NEET, BITSAT, VIT, EAMCET/APEAMCET, KCET, MHT-CET, WBJEE, TNEA, UPSEE, COMEDK, GUJCET, OJEE

10 papers per exam. Timer, score, section-wise analysis after each test.

Also has chapter-wise MCQ practice with an AI that explains wrong answers — not just shows the answer key, but explains the actual concept you got wrong.

Completely free. No Byjus subscription, no Toppr paywall.

Drop a comment if a paper has errors or if you want a specific state exam added.`,
    comment: `Mock tests: https://syllab.in/mock-tests\nFull platform: https://syllab.in`,
  },
  {
    subreddit: 'neetpreparation',
    title: 'Free NEET practice — AI explains WHY your answer is wrong with the actual biology/chemistry concept',
    body: `Most NEET platforms mark your wrong answers and move on. That doesn't help when you need to understand WHY the Krebs cycle has 8 steps or why that hormone does what it does.

Built Syllab (syllab.in) — free NEET prep platform:

- Chapter-wise Biology, Physics, Chemistry MCQ practice
- AI tutor explains wrong answers with the actual biological/chemical concept behind it
- 10 full free NEET mock papers
- Works on any phone browser, no download needed

NEET Biology is 50% of your marks and needs deep conceptual clarity, not just memorization. The AI explanation is specifically built for this.

Completely free. Feedback welcome on which chapters need more questions.`,
    comment: `Link: https://syllab.in\nNEET mocks: https://syllab.in/mock-tests`,
  },
  {
    subreddit: 'indianteens',
    title: 'Anyone else frustrated that every "free" study app has a paywall after 2 questions? Built one that\'s actually free',
    body: `I close any app the second it says "Unlock Premium to see the answer."

Spent a year building syllab.in where everything is actually free:

- MCQ practice for Classes 5-12 (CBSE), chapter-wise
- AI tutor that explains wrong answers
- Mock tests for JEE, NEET, and state exams (10 papers each)
- Daily challenges with leaderboard
- Coding lab — Python, JS, HTML/CSS tutorials + 200 challenges
- GK Quiz with 180+ questions that generates new random sets so you never repeat
- Fun Facts section that actually makes GK interesting

Login only needed to save progress — you can practice without an account.

Honest question: what would make you actually keep using something like this?`,
    comment: `Site: https://syllab.in`,
  },
  {
    subreddit: 'india',
    title: 'Built a free study platform for Indian students — Class 5 to JEE/NEET, no paywall, no pro tier',
    body: `Coaching costs Rs 2,000-8,000/month per subject. For families with 2-3 kids studying, that's completely out of reach.

Built Syllab (syllab.in) for this gap. Everything free:

- CBSE chapter-wise practice (Classes 5-12) with AI explanations
- JEE Main, NEET, BITSAT, EAMCET, WBJEE, KCET + 8 more state mock tests (10 papers each)
- Coding lab — Python, JavaScript, HTML/CSS tutorials
- GK Quiz — 180+ questions across History, Geography, Polity, Science, Current Affairs
- Parent dashboard — create custom tests for your child, track their progress
- Works on any Android phone browser, no install needed

No paid plan. No pro tier. No investor pushing me to monetize yet.

Happy to answer questions about what's there and what's still missing.`,
    comment: `Link: https://syllab.in\nParent dashboard: https://syllab.in/dashboard`,
  },
  {
    subreddit: 'learnprogramming',
    title: 'Free coding platform for Indian school students — Python/JS/HTML tutorials, 200+ challenges, mini projects',
    body: `Built Syllab coding lab (syllab.in/coding) for students who want to learn CS but can't afford paid platforms.

What's there:
- Python, JavaScript, HTML/CSS, Java, SQL, React tutorials with a live in-browser code editor
- 200+ coding challenges from beginner to advanced
- Mini project gallery — guided step-by-step builds (web apps, Python scripts, data projects)
- Aptitude prep for campus placements
- AI tutor to explain errors in your code

Aimed at Class 8-12 students and engineering freshers in India. Works entirely in browser, no install.

The same platform also covers board exam prep (CBSE, JEE, NEET) — useful for students who need to manage both academics and coding together.

Completely free.`,
    comment: `Coding lab: https://syllab.in/coding\nFull platform: https://syllab.in`,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nSyllab Reddit Bot ${DRY_RUN ? '(DRY RUN — no actual posts)' : '(LIVE)'}`);
  console.log('='.repeat(55));

  const token = await getToken();
  const results = [];

  for (let i = 0; i < POSTS.length; i++) {
    const { subreddit, title, body, comment } = POSTS[i];
    console.log(`\n[${i + 1}/${POSTS.length}] Posting to r/${subreddit}...`);

    try {
      if (i > 0 && !DRY_RUN) {
        console.log('  Waiting 30s between posts...');
        await new Promise(r => setTimeout(r, 30000));
      }
      const postName = await submitPost(token, subreddit, title, body);
      if (comment && postName) await addComment(token, postName, comment);
      results.push({ subreddit, status: 'ok' });
    } catch (err) {
      console.error(`  FAILED r/${subreddit}:`, err.message);
      results.push({ subreddit, status: 'error', error: err.message });
    }
  }

  console.log('\n' + '='.repeat(55));
  console.log('Summary:');
  for (const r of results) {
    console.log(`  ${r.status === 'ok' ? 'OK' : 'FAIL'} r/${r.subreddit}${r.error ? ' — ' + r.error : ''}`);
  }
  const ok = results.filter(r => r.status === 'ok').length;
  console.log(`\n${ok}/${results.length} posts successful.`);
  if (!DRY_RUN) console.log('Posts may take a few minutes to appear after Reddit review.');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
