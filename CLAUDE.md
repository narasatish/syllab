# Syllab.in — project memory (keep this short; details in docs/SESSION-STATE.md)

Free AI learning platform for Indian students (CBSE/NCERT Class 1–12, JEE/NEET).
React 19 + Vite 6 + TS + Tailwind v4 SPA · Firebase Hosting (project `gen-lang-client-0838820295`) · live at https://syllab.in · currently **v231**.

## Hard rules
- **Deploy needs my explicit go-ahead each time.** Bump `CACHE_VERSION` in `public/sw.js` on EVERY deploy (`syllab-vNNN-date-slug`).
- Build+deploy gate: `npm run build` must exit 0 AND print "SEO audit passed"; story coverage (`node scripts/_story_coverage.mjs`) must show 534/534 before deploying lesson-data changes.
- QA-manager check (haiku, diff-only, seconds) before reporting any change set done.
- No fabricated content. Never commit secrets (`GEMINI_API_KEY` in .env; `PEXELS_API_KEY` in scripts/instagram-bot/.env).
- SEO: no mass programmatic pages (March-2026 thin-content penalty). New route ⇒ update generate-sitemap.mjs + generate-prerender.mjs + PAGE_SEO in App.tsx.
- `public/audio/story/` is gitignored (859MB MP3s, regenerable via `python scripts/gen-voice.py`); it still deploys via dist.
- Story lessons: full data in `public/story-lessons/class-{n}.json` (fetched on demand — NEVER re-import into the JS bundle); tiny index in `src/data/storyLessonsIndex.ts`; source of truth `src/data/story-gen/*.json` + `scripts/integrate-story-lessons.mjs`.

## Current state + backlog
Read `docs/SESSION-STATE.md` when starting substantial work.
