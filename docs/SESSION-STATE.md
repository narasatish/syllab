# Session state — as of v207 (2026-07-03)

Handoff memory from the long build session. Read once when resuming work.

## What is live (all verified on production)
- **Story lessons**: 569 lessons covering all 534 CBSE chapters (Classes 1–12), each taught BOTH ways (story beats + structured concept/formula/worked example, ~26+ slides; ~10 restored lessons are shallower by design — expansion agents kept mangling them). Single **Lesson** button per chapter opens them (uploaded-deck → story → PDF-deck fallback chain in Syllabus.tsx).
- **Perf**: Syllabus JS chunk 14MB → 435KB. Lessons fetched from `/story-lessons/class-{n}.json`, memoised per class (`loadStoryLesson` / `hasStoryLesson` in src/data/storyLessons.ts).
- **Voice-over**: 3,602 neural MP3s (en-IN-NeerjaNeural via free edge-tts) for ALL Class 1–5 slides at `/audio/story/{slug}/{index}.mp3` (0=cover). Viewer plays MP3, falls back to browser TTS (Classes 6–12 use fallback). Regen: `python scripts/gen-voice.py 1 2 3 4 5` (resumable, skips existing).
- **SEO package**: crawlable `<a>` links on Home/feature grid; /glossary/* + /difference-between/* detail pages pruned (noindex,follow + out of sitemap; sitemap 3520→3083); Course JSON-LD on class pages, DefinedTermSet on glossary hub, WebApplication on /mock-tests; 5 titles rewritten (gk-quiz, english, preparation, live-quiz, calculators).
- **/story-lessons** landing page (keyword wedge: "story based learning CBSE" — zero competitors). Footer-linked, sitemap 0.9, FAQPage+LearningResource schema.
- **Hubs**: HubNav.tsx mode-switcher on Quiz pages (daily/general_knowledge/quiz_duel/live_quiz) and College pages (colleges/medical_colleges/college_finder/college_predictor). URLs unchanged.
- **Story viewer**: short slides vertically centered (my-auto), big emoji, Listen (MP3/TTS), **PDF download** (exportArticleAsPDF, watermarked).
- **Study Room**: onboarding tour (localStorage syllab_sr_tour_v1), session goal 2 blocks+20 flashcards with celebration, one-tap Vibes (theme+ambience). Sahay voice tutor collapsed-by-default with ✕.
- **Misc**: draggable AI FAB (DraggableFab.tsx, smaller mobile); Pomodoro moved bottom-left + permanent-hide (localStorage syllab_pomodoro_hidden); footer Learning Hub 2-col; MotionConfig reducedMotion="user" wraps App; dead pages Leaderboard/ProgressHub deleted.
- Slide images: ~66% of slides have free Pexels/Wikimedia images (accurate Gemini-generated queries); newer expansion slides intentionally image-free (styled viewer). Image scripts: gen-image-queries.mjs → add-story-images.mjs (both skip already-tagged; Pexels caps 200/hr).

## Key scripts
- `scripts/integrate-story-lessons.mjs` — story-gen/*.json → public/story-lessons/ + index TS
- `scripts/_story_coverage.mjs` — 534/534 guard (reads public JSONs)
- `scripts/gen-voice.py` — edge-tts MP3 generation
- Expansion-era helpers (_story_fix_meta, _story_force_restore writes class-aaa-restore.json which wins dedup) — only needed if lesson data regenerates.
- Scheduled task `syllab-story-expansion-resume` exists but is DISABLED (expansion done).

## User's pending to-dos (remind if relevant)
1. GSC: Validate Fix on "Duplicate without user-selected canonical" (356) — pruning is live.
2. Firebase Console → Hosting → Release history → cap versions ~3 (deploys carry ~1GB audio).
3. FCM VAPID key needed to activate push nudges (scaffolding ready in src/lib/push.ts).
4. Newsletter: subscribers save to Firestore fine; SENDING needs syllab-backend repo + Resend key (not in this workspace).

## Open backlog (user-approved directions, not yet built)
- Voice for Classes 6–12 (~2.5GB more; decide hosting quota first).
- Deepen the ~10 shallow restored lessons.
- Backlinks (user-side): directories, teacher groups, r/CBSE.

## Done since v207 (committed, NOT yet deployed — bump CACHE_VERSION + deploy)
- **Chapter-wise important-questions pages** (commit 4782210): 14 substantive Class-10 Maths pages at `/important-questions/class-10/mathematics/{chapter}` — real exam questions (2/3/5-mark) from `generateExamQuestions()`, marks table, "how to prepare", prev/next, Article+BreadcrumbList JSON-LD, ~1200 words. Pilot only (March-2026 thin-content caution — measure in GSC before expanding to Science/other classes). Source list: `scripts/iq-pilot.mjs`. Prerender pulls SYLLABUS + generator from compiled SSR bundle (re-exported in `src/entry-server.tsx`).
- **Prev/next chapter nav** on NCERT-solutions prerender pages (same commit) — the deferred P2 item. ("Updated" stamp already existed via the tldrBlock byline — dateModified=build date.)
- Sitemap 3084 → 3098.

## Session lessons (avoid repeating mistakes)
- Agents writing lesson JSON: enforce exact count + JSON shape rules; validate + fix-meta + force-restore after; never trust self-reports — verify counts/images yourself.
- edge/agent claims about live SEO tags are often wrong — curl the live HTML before acting.
- Big generation runs hit API session limits — design resumable (skip-done) pipelines.
- npm builds: gate deploys on exit code; a build once failed transiently — retry before shipping.
