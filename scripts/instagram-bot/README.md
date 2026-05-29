# Syllab.in Instagram Auto-Poster

Daily automated Instagram posts for **@syllab.in** — generates content with AI, renders a branded image, picks trending hashtags, and publishes via Instagram's official Graph API.

## What it posts

Seven post types rotate daily (one per weekday):

| Day | Type | Example |
|-----|------|---------|
| Sun | GK Question | "Who designed the Indian National Flag?" with 4 options |
| Mon | Daily Brain Teaser | Class 8 Maths MCQ |
| Tue | Coding Tip | Python f-strings explained |
| Wed | Logic Puzzle | "If 2 pencils cost ₹15..." with hint |
| Thu | Exam Update | "CBSE confirms two-board policy for 2026" |
| Fri | NCERT Study Hack | "Draw every Biology diagram twice" |
| Sat | Motivation | "Your weakest subject is your biggest opportunity" |

Each post: 1080×1080 branded gradient image, 100-180 word caption, 20-25 hashtags.

## Quick start (DRY RUN — no posting)

This runs the full pipeline locally and saves the image without actually posting:

```bash
cd scripts/instagram-bot
DRY_RUN=true node post-daily.mjs
```

Output goes to `.instagram-bot-output/` in the repo root:
- `<template>-<timestamp>.png` — the rendered image
- `audit.jsonl` — log of what would have been posted

Force a specific template:
```bash
DRY_RUN=true node post-daily.mjs --type=daily-question
DRY_RUN=true node post-daily.mjs --type=puzzle
DRY_RUN=true node post-daily.mjs --type=gk-fact
DRY_RUN=true node post-daily.mjs --type=ncert-tip
DRY_RUN=true node post-daily.mjs --type=exam-update
DRY_RUN=true node post-daily.mjs --type=motivation
DRY_RUN=true node post-daily.mjs --type=coding-tip
```

## Going live — Instagram Graph API setup

**Why not username + password?** Instagram detects automated logins within days and bans accounts. The Graph API is the official, safe way and is **free**.

### One-time setup (15 minutes)

1. **Convert your Instagram to a Business or Creator account**
   - Open Instagram → Profile → Menu (☰) → Settings → Account → "Switch to professional account"
   - Pick "Creator" or "Business" — either works. Free.

2. **Link to a Facebook Page**
   - Create a Facebook Page at facebook.com/pages/create (free) — pick "Education"
   - Instagram app → Settings → Account Center → Link Facebook account → connect the new Page

3. **Create a Meta Developer App**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Click "My Apps" → "Create App"
   - App type: "Business" → fill name, email
   - Add "Instagram Graph API" product to the app

4. **Get an access token**
   - In Meta Developer → your app → Tools → Graph API Explorer
   - Add permissions: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`
   - Generate User Access Token → click "Generate Access Token" — copy it
   - **Convert short-lived to long-lived** (lasts 60 days):
     ```bash
     curl -X GET "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
     ```
   - **Get a never-expiring Page token** from that long-lived token:
     ```bash
     curl "https://graph.facebook.com/v21.0/me/accounts?access_token=LONG_LIVED_USER_TOKEN"
     ```
     The `access_token` field on your Page object is the one you want.

5. **Get your Instagram Business Account ID**
   ```bash
   curl "https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=PAGE_TOKEN"
   ```
   The `instagram_business_account.id` field is what you need.

6. **Set the environment variables**
   Create `.env` (or use GitHub Actions secrets):
   ```
   IG_BUSINESS_ACCOUNT_ID=17841401234567890
   IG_ACCESS_TOKEN=EAAJZAa...                  # the Page token from step 4
   GEMINI_API_KEY=AIza...                       # optional but recommended
   ```

### Test a real post

Once env vars are set:
```bash
node scripts/instagram-bot/post-daily.mjs --type=motivation
```

You should see the post appear on @syllab.in within ~10 seconds.

## Schedule daily posts

### Option A: GitHub Actions (free, recommended)

Create `.github/workflows/instagram-daily.yml`:

```yaml
name: Instagram Daily Post
on:
  schedule:
    - cron: '30 3 * * *'   # 9:00 AM IST every day (3:30 UTC)
  workflow_dispatch:        # also runs manually from GitHub UI

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: node scripts/instagram-bot/post-daily.mjs
        env:
          IG_BUSINESS_ACCOUNT_ID: ${{ secrets.IG_BUSINESS_ACCOUNT_ID }}
          IG_ACCESS_TOKEN: ${{ secrets.IG_ACCESS_TOKEN }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

Add the secrets at GitHub → Settings → Secrets and variables → Actions.

### Option B: Render cron job

If you already deploy to Render, add a Cron Job service:
- Schedule: `30 3 * * *`
- Command: `node scripts/instagram-bot/post-daily.mjs`
- Add the same env vars under "Environment"

### Option C: Local cron (your own server)

```bash
# crontab -e
30 3 * * * cd /path/to/syllab && IG_BUSINESS_ACCOUNT_ID=... IG_ACCESS_TOKEN=... node scripts/instagram-bot/post-daily.mjs >> /var/log/syllab-ig.log 2>&1
```

## File layout

```
scripts/instagram-bot/
├── README.md              ← you are here
├── post-daily.mjs         ← main entry point
├── content-generator.mjs  ← Gemini-powered content writer
├── image-generator.mjs    ← SVG → 1080×1080 PNG renderer
├── hashtag-picker.mjs     ← rotates 20-25 trending edu hashtags
├── instagram-api.mjs      ← Graph API client (post + publish)
└── post-templates.json    ← 7 template recipes
```

## Customising

- **Add a new post type** → edit `post-templates.json` (add a new entry)
- **Change visual style** → edit `image-generator.mjs` (`buildSvg`)
- **Update hashtags** → edit `hashtag-picker.mjs`
- **Different daily rotation** → edit `WEEKDAY_TYPES` in `post-daily.mjs`

## Troubleshooting

- **`Container create failed (400)`** → image URL not reachable or caption too long (max 2200 chars)
- **`Permissions error`** → access token missing scopes; regenerate with all 4 scopes
- **Token expired** → Page tokens are valid until you revoke them, BUT user tokens expire in 60 days. Use Page tokens (step 4 in setup).
- **Posts not appearing** → check that Instagram account is Business/Creator (Personal accounts cannot use the API)

## Audit log

Every run (dry or real) appends to `.instagram-bot-output/audit.jsonl`. Each line is one JSON record with timestamp, template, post ID, and full caption.

## Safety

- Bot **never logs in with username/password** — uses official Graph API tokens
- Bot **never deletes or comments** on posts — only publishes new ones
- Bot **never auto-replies** to DMs or comments
- Manual review encouraged — set `DRY_RUN=true` to inspect first
