# Syllab.in Instagram Automation — 10 posts/day

End-to-end, fully automated Instagram content engine for **@syllab.in**. Every day
it generates **10 unique posts** — **5 Reels, 3 Carousels, 2 Images** — from real
Syllab website content (never repeated), writes algorithm-optimized captions +
hashtags, and publishes via Instagram's **official Graph API**.

> **TL;DR:** `npm run ig:dry` → previews today's 10 posts (media in
> `.instagram-bot-output/<date>/`, zero cost, no token needed). Add your Meta
> token + flip `DRY_RUN` off to go live.

---

## What it makes, every day

| # | Format | Count | Source | Why |
|---|--------|-------|--------|-----|
| 1–5 | **Reel** (1080×1920 MP4) | 5 | GK quiz, PYQ, fun fact, full-forms | Video = widest reach |
| 6–8 | **Carousel** (1080×1350 ×N) | 3 | PYQ solution, quiz reveal, fact deep-dive | Highest saves/shares |
| 9–10 | **Image** (1080×1350 PNG) | 2 | Fun fact, GK | Fast scroll-stoppers |

Content is mined from **1,300+ atoms** across the site (fun facts, 180 GK MCQs,
670+ PYQs, 470+ full-forms) and **deduped forever** — no post is ever repeated.

## Architecture

```
run-daily.mjs                 ← orchestrator (plan → generate → publish → audit)
lib/
  data-loader.mjs             ← mines src/data/*.ts via esbuild (real site content)
  dedup.mjs                   ← persistent registry → never repeats a post
  content-engine.mjs          ← builds the 10-post plan (slides + reel scenes + caption)
  hashtags.mjs                ← 2026 relevance-mix hashtag strategy (+ first comment)
  renderer.mjs                ← branded SVG → PNG (themes, page dots, branding)
  media-generators.mjs        ← image / carousel / reel (ffmpeg) generation
  media-host.mjs              ← uploads media to a public URL (Firebase or 0x0.st)
  publisher.mjs               ← Graph API: IMAGE / CAROUSEL / REELS publishing
```

## Quick start (DRY RUN — no token, no cost)

```bash
npm run ig:dry                 # preview ALL 10 posts → .instagram-bot-output/<date>/
node scripts/instagram-bot/run-daily.mjs --dry --max=2   # quick 2-post smoke
node scripts/instagram-bot/run-daily.mjs --dry --type=reel   # only reels
```

## Going live (one-time Meta setup)

1. Convert @syllab.in to an **Instagram Business/Creator** account and link it to a
   **Facebook Page**.
2. Create an app at [developers.facebook.com](https://developers.facebook.com) →
   add **Instagram Graph API** → generate a **long-lived Page access token** with
   scopes: `instagram_basic`, `instagram_content_publish`, `pages_show_list`,
   `pages_read_engagement`.
3. Get your **Instagram Business Account ID** (Graph API Explorer →
   `me/accounts` → `instagram_business_account`).
4. Set env vars (locally) **or** GitHub repo secrets (for the scheduled workflow):

```
IG_BUSINESS_ACCOUNT_ID=1784xxxxxxxxxxx
IG_ACCESS_TOKEN=EAAG...               # long-lived
# RECOMMENDED — free Pexels key → real photo backgrounds (the @information_unlocked
# look). Without it, posts use premium gradients (still on-brand). Get one at
# https://www.pexels.com/api/  (free, instant):
PEXELS_API_KEY=563492ad...
# optional — host media on your own bucket instead of the free 0x0.st:
FIREBASE_STORAGE_BUCKET=gen-lang-client-0838820295.appspot.com
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
```

> **Design note:** the poster engine (`lib/renderer.mjs`) is the "factsdailyy /
> @information_unlocked" style — real Pexels photo + dark scrim + bold **Anton**
> headline + accent chip + branded CTA slide. Fonts live in `assets/fonts/`.
>
> **Reels:** with `PEXELS_API_KEY` set, fact/GK/timeline reels use **real looping
> stock VIDEO** behind the text (highest reach); without it they use a photo/
> gradient slideshow. Formula/code/MCQ reels always use clean static cards.
> Slides are paced slow (min 2.8s) for readability; each reel gets a different
> calm track from `assets/music/`. Mix is **6 reels + 3 carousels + 2 images**
> (tune via `IG_REELS` / `IG_CAROUSELS` / `IG_IMAGES`).

5. Post for real: `npm run ig:run`

## Scheduling (automatic)

`.github/workflows/instagram-daily.yml` runs **5 times/day at IST peak hours**
(07:30, 12:30, 16:00, 19:30, 21:30) — **2 posts per slot** for maximum reach and
natural spacing. The dedup registry + day-plan are committed back so the slots
share one plan and content never repeats. The workflow is **skipped until
`IG_ACCESS_TOKEN` is set**, so it never fails before setup. Trigger a manual dry
run anytime from the **Actions tab → Run workflow**.

## Algorithm strategy baked in

- **Formats by reach:** Reels weighted highest (5/10), carousels for saves (3/10).
- **Hooks:** first line of every caption is a scroll-stopper (the first ~125 chars
  are what Instagram shows).
- **Engagement prompts:** every post ends with a question + a "Save 🔖 & share" +
  follow CTA → drives comments/saves/shares (the strongest ranking signals).
- **Hashtags:** relevance-first pyramid (2 broad + 5 medium + 5 niche + 1 branded)
  in-caption, **rotated per post** (identical blocks get throttled); a deeper set
  is posted as the **first comment**.
- **Timing:** 5 peak-hour slots spread across the day.
- **Consistency:** 10/day, every day, forever — the single biggest growth lever.

## Customisation

- **Music for reels:** drop any `.mp3` into `scripts/instagram-bot/assets/music/`
  — it's used automatically (otherwise reels ship a silent track). ⚠️ Instagram's
  Graph API **cannot** attach its *trending/licensed* audio to API-posted reels;
  only audio embedded in the video file is allowed. For trending-audio reels,
  post by hand.
- **Themes / branding:** edit `lib/renderer.mjs` (`THEMES`, footer, layout).
- **Content mix / sources:** edit `lib/content-engine.mjs` (`buildDayPlan`) and
  `lib/data-loader.mjs` (`loadAtoms`).

## Limits & safety

- Instagram allows **25 published posts / 24h** per account; we post 10. ✓
- DRY_RUN is the default for previews — **zero API calls, zero cost.**
- The old single-post bot (`post-daily.mjs`) is kept for reference; `run-daily.mjs`
  supersedes it.
