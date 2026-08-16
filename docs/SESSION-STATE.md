# Session state — as of v321 (2026-08-16)

Handoff memory. Read once when resuming work. Newest section first; older
history is kept below because it still explains why parts of the codebase look
the way they do.

Fastest sanity check that you are looking at the live build:

```bash
curl -sS https://syllab.in/sw.js | grep -oP "syllab-v[0-9]+[^']*" | head -1
```

---

# ⚠️ v321 IS COMMITTED BUT NOT DEPLOYED

Nine commits sit on `redesign-ui`, unpushed. Live is still v320, so **none of
what follows is visible to a single user yet.** CACHE_VERSION is already bumped
to `syllab-v321-2026-08-16-content-that-was-never-rendered`; deploying needs the
owner's explicit go-ahead, as always.

---

# CORRECTIONS TO THE v320 HANDOFF — read before trusting the sections below

Four claims in the previous handoff were acted on this session and found wrong.
They are corrected here because the wrong versions read authoritative.

**"That well is now dry" — it was not.** The v320 handoff listed
`/revision-notes`, `/english-writing`, `/formula-sheets`, `/concepts` and
`/gk-facts` as "verified as fully rendering what they have" and declared the
content-stored-but-never-rendered pattern exhausted. Four more instances turned
up the same day:

| what | stored | actually reaching a page |
|---|---|---|
| `generated-mcqs.json` | 27,143 questions | 1 of the 6 `/mcqs` pages that rank |
| `/hi` page template | intro + FAQs in `hindi-concepts.mjs` | no body-section support at ALL |
| `/revision-notes` | schema had no deep body | ~361 words/page |
| `studyClusters.mjs` projection | — | would have eaten `caseStudies` silently |

The last one is the warning worth keeping: **`studyClusters.mjs` projects a
fixed field list and drops anything not explicitly named.** Add a field to a
content bank and it will load correctly in dev, pass every test, and never
reach a built page. Check that projection whenever you extend a bank.

**"/hi — 17 pages at 23 words. Write real Hindi, or noindex."** Both halves
wrong. It is **14 pages at 124-239 words**, and the 2026-08-13 export shows two
of them on **page one**: `ohmic-non-ohmic-conductors` at position 6.2 (72
impressions), `power-of-a-lens` at 9.4 (62). Noindexing them, as that line
advised, would have destroyed the only Hindi traction the site has. They were
deepened instead (230→590 and 190→520 words). Ranking that well on 200 words
says these queries are barely contested — this is the cheapest depth on the
site, not the most disposable.

**"/mcqs curriculum — 81 pages named for the OLD NCERT syllabus."** The naming
mismatch is real, but the fix is not renaming: `mcq-chapter-map.mjs` now
supports merging several bank chapters into one page and filtering within a
chapter. Its exclusions list is mostly CORRECT and must not be "helpfully"
mapped — Olympiad and case-study pages promise a specific kind of question, and
filling them with ordinary chapter MCQs misrepresents the page to a student.
Two entries there were wrong and are now resolved (nutrition merge, Mole
Concept filter); the rest stand.

**"/revision-notes — 119 pages, 15.60% CTR, best converter on the site."** True
but thinner than it sounds: that rate is 17 clicks on 109 impressions, and only
**10 of the 119 pages register any impressions at all**. Treat it as directional.

---

# CURRENT — v320, deployed and verified live

## The one pattern that produced almost every gain: content stored but never rendered

Five separate instances found in one day. Every one returned HTTP 200, every
build was green, nothing ever errored. **This is the single most valuable check
to run on this codebase:** for each data file, compare bytes stored against
words actually reaching a built page.

| what | was | now |
|---|---|---|
| NCERT solutions — `getNcertChapters()` read the file and kept only `count`, discarding 2,207 answers | 536 w/page | **2,235** |
| A missing `else` truncated every solution to 500 chars behind "Showing 6 of 10" | — | full text |
| 11,623 MCQs in `generated-mcqs.json` under keys nothing looked up | — | 4,822 surfaced |
| Blog: 83 `/updates/<slug>` pages emitted `summary` only | 156 w | **397 avg** |
| `/coding`: syntax regex dropped code examples | 349 pages w/ code | **484** |

**~~That well is now dry.~~ WRONG — see the corrections block at the top of this
file.** Four more instances were found on 2026-08-16, including in
`/revision-notes`, which this very sentence listed as verified. The list below
means "these five were checked once, in one way" — it does not mean the pattern
is exhausted. Re-check rather than trusting it:
`/revision-notes`, `/english-writing`, `/formula-sheets`, `/concepts`,
`/gk-facts`.

## Also fixed in v309–v320

- **17 `/difference-between` pages to 3,227 words avg (95% of BYJU'S 3,432)**,
  all illustrated. Blocks: explainers, sections, worked examples, common
  mistakes, applications, numericals, board questions w/ model answers, CBSE
  assertion-reason, glossary, revision recap. Source: `public/diff-deep.json`.
- **Inline-SVG diagram system**, 17 diagrams, 2.4–3.6 KB each vs ~80 KB PNG.
  Theme via CSS vars on `.dark` — **NOT `prefers-color-scheme`**; this site is
  class-based (`index.css` line 5). Contrast 6.09–7.26:1 both themes.
- **`/profile/**` and `/parent/**` robots-blocked.** They rewrite to
  `/index.html`, so ANY invented path returned 200 with the homepage canonical
  — an unlimited duplicate factory. GSC Coverage showed 1,289 pages as
  "Duplicate without user-selected canonical" (56% of all non-indexed).
- **MCQ quality gate** (`mcqIsSound`) — rejects unanswerable questions,
  duplicate options, leaked model reasoning. Removed 15 broken live questions.
- **`generate-trending-blogs.mjs` was DELETING hand-written posts** on every
  build via a full `writeFile`. Now merges; generated posts carry
  `generated: true`, hand-written are preserved.
- **`scripts/check-test-coverage.mjs`** — vitest's pool silently drops test
  files while exiting 0 (ran **4 of 59** under memory pressure). This guard
  diffs files-that-ran against files-on-disk and retries sequentially.
  **A green `npm test` without this is not evidence the suite ran.**

---

# NEXT — blocked on the user, not on code

1. **DEPLOY v321.** Nine commits, none live. Everything below assumes it ships.
2. **PSI API key.** Still the only blocker on all performance work. CWV last
   known **FAILING** (mobile LCP 3.5s, desktop CLS 0.11), now 20+ deploys
   unmeasured. Keyless PSI returns 429 — confirmed a THIRD time on 2026-08-16.
   `npm run cwv` is wired and `.env` carries a documented empty `PSI_API_KEY`
   slot. The API is free and needs no billing account:
   https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com
3. **Run a stored-vs-rendered sweep across every bank.** This is the highest
   value work available and the v320 handoff wrongly called it finished. For
   each data file, compare what is STORED against words actually reaching a
   built page. Four hits in one session; there is no reason to think the last
   one has been found. Include the `studyClusters.mjs` projection in the check.
4. **`/full-forms` + `/glossary`** — 249 pages, 69,773 impressions, **38
   clicks**. Already `noindex,follow` and correctly decaying. Zero-click
   intent; more words will not help. Leave alone or prune; do NOT "fix".
5. **~7 more `/mcqs` pages carry impressions** and have not been touched. The
   machinery is in place now — check `mcqBankFor()` resolves before authoring
   anything by hand, because the bank usually already has the questions.
6. **`/coding` consolidation.** The tail is noindexed (see below) but the 873
   topic pages still EXIST at 245 words each. Consolidating into 80–120 real
   lessons remains undone; noindex bought time, it did not fix the content.
7. **ITER/CET hostel fees + branch-wise cutoff percentiles** — the queries ask
   for exactly this (`iter fees for 4 years btech with hostel`, 283 impr,
   0.35% CTR). Do NOT invent figures a family budgets on.

## What NOT to do next

- **Do not deepen the remaining 109 `/revision-notes` pages.** They have zero
  impressions between them. The constraint there is indexation and authority,
  not word count, and adding words to pages nobody sees is exactly the
  mass-production Google penalises.
- **Do not map the excluded `/mcqs` pages.** See `mcq-chapter-map.mjs`. Olympiad
  and case-study pages promise a specific kind of question; ordinary chapter
  MCQs would misrepresent them to a student.

## Authoring backlog, re-measured 2026-08-16

| cluster | pages | now | note |
|---|---|---|---|
| `/revision-notes` | 119 | 10 done at **5,127 w**, 109 at ~326 w | only 10 have ANY impressions |
| `/mcqs` | 139 | 6 done, ~7 more with impressions | bank usually has the questions already |
| `/english-writing` | 94 | 102 w | only 33 words of source per entry — check the bank first |
| `/medical-colleges` | 88 | 178 w | |
| `/important-questions` | 50 | 97 w | |
| `/hi` | 14 | 2 done at ~555 w, 12 at ~180 w | page-one positions; cheapest depth on the site |

**The lesson that should drive the next session:** before authoring anything,
check whether the content already exists somewhere the page does not read from.
Four times out of four this session, it did.

---

# WHAT v321 SHIPPED (committed 2026-08-16, not yet deployed)

| ver | commit | what |
|---|---|---|
| v321 | `62b126b` | 10 `/revision-notes` chapters: 3,608 → **51,265** crawlable words |
| v321 | `77d834a` | classLevel stored two ways; Class 11 photosynthesis on a Class 7 page |
| v321 | `23fa8b2` | build restamped 54 unchanged blog posts with today's date |
| v321 | `2c849a0` | the two Hindi pages that rank had no room to say anything |
| v321 | `559f1af` | 27,143 MCQs reached 1 page in 6; `/coding` tail noindexed |
| v321 | `13c2a3a` | sitemap 3,564 → 2,693; `npm run cwv` |
| v321 | `b8176dc` | Olympiad / case-study / Class 8 Cell authored properly |

Detail worth carrying forward:

- **`public/rn-deep.json` (306 KB) is FETCHED, never imported.** Same contract
  as `diff-deep.json`. The prerenderer reads the same file so crawled and
  hydrated DOM match; breaking that is cloaking. Shared plumbing now lives in
  `src/components/deepContent.ts` with the quiz in `QuizItem.tsx` — split
  across two files because a module exporting both a component and plain
  functions breaks Fast Refresh.
- **Self-check answers must be spread across A–D.** The first draft keyed 45 of
  50 to B or C, which is guessable without reading the question. A vitest guard
  now enforces the spread. Same for assertion-reason: it ran 24 (a) and one (b)
  before rebalancing to one of each code per chapter.
- **CBSE case studies need a passage.** `McqCaseStudy` was added for this. The
  `DANGLING` guard used to reject any question mentioning "the passage"; it now
  enforces the real rule — such a reference is allowed only when it resolves to
  a real passage of 40+ words that is actually used.
- **`/coding` tail ships `noindex, follow`.** `CODING_KEEP_INDEXED` protects the
  two topic URLs with data. **`generate-sitemap.mjs` is a SEPARATE script** and
  carries a duplicate keep-set — if the two ever disagree, the site tells Google
  "index this" in the sitemap and "don't" in the page. Keep them in step.
- **Blog dates now move only when content moves.** No extra state file: the
  previous date already lives in the file the merge step reads.

---

# HOW TO NOT REPEAT MY MISTAKES

From v321, all four caught only by checking the real artifact:

- **Know which container holds the body before counting words.** Measured "0
  crawlable words" on pages that were fine three times running — `/revision-notes`
  uses `<article>`, `/hi` pages are standalone with `<main>`, and the SPA shell
  has neither. The count was wrong, not the page.
- **Two `<h1>` and 7,042 words looked like duplicated content.** It is the
  intentional `#prerender-seo` block: a 1×1 clipped `aria-hidden` sibling
  carrying the crawlable copy. A user sees one `h1`. Do not "fix" it.
- **Dark-mode contrast measured 1.03 and looked catastrophic.** That was an
  artifact of forcing `.dark` via JS before React applied its theme. Through the
  app's own toggle it is near-white on dark slate. Toggle the way a user does.
- **A scan is only as good as the fields it reads.** Scanned `intro` + `sections`
  for off-syllabus terms, declared it fixed, and the built HTML still had ATP and
  NADPH — in an FAQ the scan never looked at. Name the fields you checked.
- **Match `id`, not a field that may not exist.** Diffed `autoBlogs.json` by
  `slug`; posts have no `slug`, so every lookup returned entry zero and the diff
  claimed 56 hand-written posts had been overwritten. Nothing had. Verify the
  join key exists before trusting any diff built on it.

Six errors from v320, all caught by checking the built artifact:

- **Measure ONLY after a clean `npm run build`.** Running
  `generate-prerender.mjs` standalone over an already-prerendered `dist`
  double-counts. I reported 1,990 (true: 1,594), then 517 (true: 245). Twice.
- **Never subtract aggregates to count defects.** "497 have syntax − 484
  render = 13 broken" was wrong; measured file-by-file it was **2**.
- **Verify the artifact, never the diff.** A "route collision" was a missing
  `else`; "missing titles" were my own regex failing on a newline.
- **Do not auto-fix what a guard flags.** The content guards over-flag: "Draw
  the graph of x + y = 4" is an instruction, not a dangling figure; "sin 30° =
  1/2" is complete, not thin. Inspect before editing.
- **Never run two builds concurrently.** One wipes `dist/index.html` under the
  other and the build dies with a misleading error.

## Environment gotchas

- Build needs **>2 GB free RAM**. Below ~1 GB it dies mid-transform (exit 127)
  or the test pool drops most files. Other projects' builds were the real hog,
  not this one.
- `public/feed.xml` intermittently locks (OneDrive sync) → transient
  ENOENT/UNKNOWN. Retry.
- The in-app browser **cannot load localhost** ("Not allowed to load local
  resource"), so dev-server visual checks are unavailable. Verify from
  `dist/` files or the live domain.

## Never eye-checked

Everything from this session is measured, none of it seen. Nobody has looked
at the 17 diagrams or the 3 new blog posts rendered. Worth 30 seconds on
`/updates/jee-main-percentile-vs-rank-explained` and any difference-between
page.

---

# Session state — as of v288 (2026-08-04)

Handoff memory. Read once when resuming work. Newest section first; older history
is kept below because it still explains why parts of the codebase look the way
they do.

---

# CURRENT — v288, deployed and live

Everything from v280 up is verified live on https://syllab.in. The live SW
version string is the fastest sanity check:

```bash
curl -sS https://syllab.in/sw.js | grep -oP "syllab-v[0-9]+[^']*" | head -1
```

## 🔴 v288 — the homepage was serving a permanent spinner to every visitor

Found 2026-08-04 while auditing something else. **Every user landing on
syllab.in got a loading spinner that never resolved.** In real Chrome, fresh
load, no service worker: `<main>` held 17 characters and only 6 JS files loaded
— the lazy Home chunk was never requested.

Cause: `src/entry-server.tsx` uses `prerender()` from `react-dom/static`, which
its own comment claims resolves every Suspense/React.lazy boundary. It was
POSTPONING the homepage route boundary instead — shipped HTML carried
`<!--$~-->` + `<template id="B:0">` around the spinner, with the real content
parked in hidden `<div id="S:0"/"S:1">`. **A postponed boundary in a prelude can
only be finished by a server-side `resume()`; the client cannot resolve it.** So
React hydrated, sat on the fallback forever, and never rendered the lazy child.

Crawlers were unaffected — the content is present in those hidden divs — which
is exactly why GSC never flagged it and why it survived so long. Do not trust
"GSC looks fine" as evidence that users can see a page.

Fix (v288, `aba7a4f`): `DEFAULT_SSR_ROUTES = []` in generate-prerender.mjs —
SSR off for every route. `/` falls back to the static prerendered body + normal
client render. Verified live in real Chrome: `<main>` 17 → 9,529 chars, spinner
gone, h1 = "Learn smarter with AI by your side", Home chunk fetched, 16 JS files.

**Re-enabling SSR:** fix the postponement first (`renderToReadableStream` +
await `allReady`, or root-cause what suspends), then confirm `<main>` renders
real content IN A REAL BROWSER before restoring `['/']`. The LCP gain is not
worth shipping a blank homepage.

Two lessons worth keeping:
- **Grepping built HTML is not verification.** The markup looked fine — 1 `<h1>`,
  1 canonical, valid JSON-LD, "SEO audit passed". Only loading the page in a
  real browser exposed it.
- **The headless preview harness is not a real browser** (it reports no paint
  timing at all), but here it was right and I nearly dismissed it as an artifact.
  Confirm in real Chrome rather than assuming either way.

## ⛔ THE ONE BLOCKER — read this first

**There is no free-tier Gemini key on this machine, and it blocks two finished
features from producing any content.**

`.env` has only `GEMINI_API_KEY`. By this repo's own convention
(`syllab-backend/aiService.js:24-25`) **that is the PAID key**; the free one is
`GEMINI_API_KEY_FREE`.

Six generator scripts used to read `GEMINI_API_KEY` while documenting
`ALLOW_PAID_GEMINI=1` as "the way to run this for free" — so the documented
invocation billed every call. All six are now free-key-first and refuse to touch
the paid key unless `GEMINI_API_KEY_FREE` is set or you opt in explicitly:

    generate-ncert-solutions.ts   generate-chapter-mcqs.ts   generate-mcqs.ts
    generate-coding-mcqs.ts       generate-slides.ts         growth-agent.mjs

`generate-slides.ts` mattered most — it calls Imagen.

**To unblock:** create a Google AI Studio project with **no billing linked** and
put its key in `.env` as `GEMINI_API_KEY_FREE`. That single step unblocks BOTH
pending content jobs below. Check whether the deployed backend already has one —
an earlier "₹0 spend verified" run implies it exists somewhere.

### Pending job 1 — Commerce NCERT solutions (74 chapters)
Accountancy / Business Studies / Economics for Class 11–12 are in `SYLLABUS` and
visible in the syllabus tracker, but have **zero `/ncert-solutions` pages**.
Those routes are built from the generated bank (`scripts/ncertChapters.mjs` reads
`public/data/ncert-solutions.json`), NOT from `SYLLABUS` — so no thin pages can
ship before content exists. Verified: no `accountancy` / `business-studies` /
`economics` directories under `dist/ncert-solutions/`.

```bash
npx tsx scripts/generate-ncert-solutions.ts --subject Accountancy
```

### Pending job 2 — MCQ bank expansion
`/mcqs` is the **highest-CTR section on the site (14.78%)** and Class 11/12 have
30 and 20 questions against Class 10's 442.

The reason it never grew: **nothing wrote to that bank.** `generate-mcqs.ts`
sounds like it does but writes `public/data/generated-mcqs.json` — a *different*
bank feeding practice/daily-challenges. `src/data/chapterMcqs.ts` had no
generator at all. Now it does:

```bash
npx tsx scripts/generate-chapter-mcqs.ts --dry-run          # no key needed
npx tsx scripts/generate-chapter-mcqs.ts --class 12 --limit 3
```

Start with `--limit 3` and READ the questions before a full run. ~182 calls
covers Classes 11–12; free-tier rate limits mean spreading it over a day.

Gap (dry run against the real 83-chapter / 806-question bank, target 10/chapter):
Class 11 → 91 chapters short, Class 12 → 91. **Class 11–12 figures are
trustworthy** (subject names align between SYLLABUS and the bank). **Class 10's
is inflated** — SYLLABUS splits Physics/Chemistry/Biology while the bank only has
"Science", so they don't match. Don't act on Class 10 without reconciling the
taxonomy first.

## What shipped this session

| Ver | Commit | What |
|-----|--------|------|
| v280 | `380b851` | Question Paper Generator — `/question-paper-generator` |
| v281 | `d842500` | 806 MCQ explanations that were silently dropped; subject names unified |
| v282 | `e1c5f10` | Chapter-level syllabus tracker in the Study Planner |
| v283 | `f6ece35` | CBSE Commerce stream (74 chapters) + free-key guard |
| v284 | `62e416d` | Firebase SDK off the critical path (LCP) |
| v285 | `b142505` | MCQ bank generator + free-key-first across all Gemini scripts |
| v286 | `dae2c70` | 192 canonicals pointing at redirecting URLs |
| v287 | `6e75adc` | site-wide JSON-LD scoped to the home page + HSTS includeSubDomains |
| v288 | `aba7a4f` | **homepage spinner fix — SSR disabled** (see top of file) |

Detail worth carrying forward:

- **v280** builds MCQ *practice* papers, deliberately NOT "CBSE sample papers".
  A real board paper needs 1/2/3/5-mark written questions and there is no verified
  bank of those; generating them would put fabricated exam content in front of
  students. The page says so plainly. Logic is pure + seeded
  (`src/lib/questionPaper.ts`) so a paper is reproducible.
- **v281 was a silent bug, not missing content.** `mcqBody()` in the prerender
  read `m.exp`; the field is `explanation`. Optional chaining meant zero errors —
  just a heading promising "MCQs with Answers & Explanations" above no
  explanations, on all 83 pages. 806 explanations now render; median `/mcqs` page
  ~500 → 699 words. `Arena.tsx` always read the right field, so only the
  crawlable HTML was affected.
- **v281 also unified subject names.** `Maths`/`Mathematics` and `Social
  Studies`/`Social Science` both existed. Subject is the grouping key
  (`classLevel|subject`), so every cluster was split in half — "More Class 10 …"
  linked only half the chapters and the Question Paper Generator listed subjects
  twice. Normalised to CBSE's names across 5 data files. **URLs unchanged** —
  subject is never used to build a path.
- **v282 reuses the existing shared study memory** (`studyPlan.ts`) for chapter
  completion — the same store the Study Room's flashcards write to. Do not add a
  second completion store. Kept as a mode on `/study-planner` rather than a new
  `/syllabus-tracker` route, to avoid splitting the timetable intent.
- **v284**: critical JS 1,138 KB → 611 KB. The subtle part: App.tsx imported
  `DEFAULT_USER_STATS` / `getStoredRole` from the firebase modules; those are a
  plain object and a localStorage read, but importing them dragged in the whole
  519 KB SDK. Split into `src/lib/userDefaults.ts` (re-exported, so no other
  importer changed). Auth now boots from `requestIdleCallback` behind a
  `cancelled` guard. **`vendor-motion` (125 KB) is deliberately still eager** —
  `MotionConfig reducedMotion="user"` is what makes the motion library respect
  prefers-reduced-motion, the CSS block at `index.css:461` only covers named CSS
  animations, and lazy-loading the provider changes the element type above the
  router and remounts the whole tree. Not worth it.
- **v286**: all 183 AMP web stories + 9 posters declared canonicals ending in
  `.html`. `cleanUrls` 301s `/x.html` → `/x` and the sitemap lists the clean form,
  so canonical ≠ sitemap on every one. Editing the three generators fixed only
  183 — `gen-formula-poster.mjs` is **not run by the build**; the 8 formula
  posters are committed artifacts under `public/` copied into `dist`, and had to
  be regenerated with `node scripts/gen-formula-poster.mjs`.

## GSC read (export through 2026-08-02)

**This window predates v281–v286 and cannot measure them.** Re-pull around
2026-08-10; `/mcqs` impressions will show whether the explanation fix moved
anything.

Corrected trend — an earlier read of "impressions declining" was five days of
noise:

| Month | Clicks | Impressions | CTR | Avg pos |
|-------|-------:|------------:|----:|--------:|
| June  | 194 | 84,316 | 0.23% | **40.6** |
| July  | 776 | 94,574 | 0.82% | 12.7 |
| Aug (2d) | 58 | 5,121 | **1.13%** | 13.2 |

Weekly clicks 129 → 121 → 150 → 131 → 218 → 233. June's spike was 84k impressions
at position **40.6** (page four) from mass-indexed thin pages. Shedding those is
why impressions fell while position went 40.6 → 12.7 and clicks doubled. **The
prune is working.**

Clicks per page — the "should we build more of these" metric:

| Section | Pages | CTR | Clicks/page |
|---------|------:|----:|------------:|
| `/mcqs` | 83 | **14.78%** | 1.31 |
| `/pyqs` | 12 | **13.71%** | 2.25 |
| `/revision-notes` | 9 | **10.99%** | 1.11 |
| `/sample-papers` | 50 | 3.96% | **7.65** |
| `/state-board-solutions` | 49 | 5.45% | 2.18 |
| `/ncert-solutions` | ~300 | 3.34% | 1.87 |
| `/colleges` | 114 | 0.30% | 0.68 |
| `/difference-between` | 171 | 0.40% | 0.91 |

`/full-forms` (471 pages) and `/glossary` (154) are **already `noindex,follow`** —
40% of impressions, 36 clicks, correctly decaying. Not a bug; don't "fix" them.

### Open issues NOT fixed
- **Web Stories return ~nothing**: `Search appearance` shows Web Story = 7
  impressions, 0 clicks over 91 days, across 183 stories. **Caveat:** the export
  is filtered `Search type: Web`, and stories mostly surface in **Discover**,
  which is excluded. Check the Discover report before writing them off.
- `/colleges` — 25,675 impressions at 0.30%. Fee titles landed Jul 12 so most of
  the window predates them. Unresolved, not yet judged.
- `/concepts` 0.16%, `/maths-tables` 0.19% — indexed, decent position, no clicks.
- Average position 12.9 — the site mostly sits on page two.

### Never checked (do not claim these are clean)
Index coverage (**the biggest blind spot** — a Performance export says nothing
about what Google actually indexed), Core Web Vitals field data (so v284's LCP
work is unmeasured against real users), rich-results / structured-data validity,
manual actions, cannibalisation, accessibility, security headers, cross-browser,
real devices, load testing, content accuracy across ~4,000 pages.

## Verification commands that earn their keep

```bash
npm run build                                   # must exit 0 AND print "SEO audit passed"
CI=true npx vitest run --no-file-parallelism    # 688 tests / 50 files
node scripts/_story_coverage.mjs                # 534/534 before lesson-data deploys
npx tsx scripts/generate-chapter-mcqs.ts --dry-run
```

`audit-seo.mjs` gates: exactly one title/description/canonical in sampled pages,
og:title present, no HTML-escaped JSON-LD, no self-only hreflang, every sitemap
URL prerendered, and **no canonical ending in `.html`** (added v286 — walks every
built file, not the 300-page sample, because stories/posters are standalone).

## User's pending actions
1. **Add `GEMINI_API_KEY_FREE`** — unblocks both content jobs above.
2. **Rotate the `AIzaSy…` key** still in `syllab-backend` git history.
3. Export the GSC **Coverage** report — the standing blind spot.
4. Firebase Console → Hosting → Release history → cap versions ~3 (deploys carry
   ~1GB audio).
5. Backend sender for FCM push + newsletter (separate `syllab-backend` repo).

## Hard-won lessons from this session
- **A generator edit does not change already-generated files.** Bit me on the 8
  formula posters. Re-check the built artifact, never the source edit.
- **`Number(null) === 0`.** A test caught that a model omitting `correct` would
  validate as "option A is right" and ship a wrong answer key. Validators must
  reject before coercing.
- **Grep for the real tag shape.** `<meta name="robots"` missed
  `<meta data-rh="true" name="robots"`, which led to briefly declaring 471
  already-pruned pages an unfixed problem.
- **Read the whole export.** `Search appearance.csv` sat unopened until asked
  directly, and it held the Web Stories finding.
- **Never answer "is it all good?" with a yes.** State what was checked, what was
  not, and what class of bug the check could never surface.
- QA subagents review a *described* diff — they cannot see whitespace, computed
  CSS, or tag counts. An APPROVED verdict on an unverified claim is worth nothing.

---

# HISTORY (pre-v280) — kept for context

## What is live (verified on production)
- **Story lessons**: 569 lessons covering all 534 CBSE chapters (Classes 1–12),
  each taught BOTH ways (story beats + structured concept/formula/worked example,
  ~26+ slides). Single **Lesson** button per chapter (uploaded-deck → story →
  PDF-deck fallback in Syllabus.tsx).
- **Perf**: Syllabus JS chunk 14MB → 435KB. Lessons fetched from
  `/story-lessons/class-{n}.json`, memoised per class.
- **Voice-over**: 3,602 neural MP3s (en-IN-NeerjaNeural via free edge-tts) for all
  Class 1–5 slides at `/audio/story/{slug}/{index}.mp3`. Classes 6–12 use browser
  TTS fallback. Regen: `python scripts/gen-voice.py 1 2 3 4 5` (resumable).
- **Hubs**: HubNav.tsx mode-switcher on Quiz and College pages.
- **Study Room**: onboarding tour, session goals, one-tap Vibes, Sahay voice tutor.
- Slide images: ~66% of slides carry free Pexels/Wikimedia images.

## Key scripts
- `scripts/integrate-story-lessons.mjs` — story-gen/*.json → public/story-lessons/
- `scripts/_story_coverage.mjs` — 534/534 guard
- `scripts/gen-voice.py` — edge-tts MP3 generation
- Scheduled task `syllab-story-expansion-resume` exists but is DISABLED.

## Earlier SEO milestones
- **v208**: chapter-level important-questions pages (Class 10 Maths pilot, 14
  pages at `/important-questions/class-10/mathematics/{chapter}`). Pilot only,
  under the March-2026 thin-content caution.
- **v209**: cross-cluster internal-link mesh (503 chapter pages) + first printable
  formula poster + CWV code-split.
- **v210**: all college detail pages deepened with fee tables, cutoff, placements,
  FAQPage schema; CTR titles ("Fees 2026").
- **v211–v214**: 17 GSC-proven difference-between winners re-indexed; 7
  striking-distance concept pages deepened; poster library (8 subjects) +
  llms.txt; Hindi pilot with reciprocal hreflang.
- **v245**: FCM push client live (VAPID key, messaging SW, opt-in card, Firestore
  rule). **Backend sender still missing** — separate repo. Spec: scheduled cron
  ~7pm IST reading `pushTokens` via Admin SDK, `sendEachForMulticast`, pruning
  `messaging/registration-token-not-registered`.
- **v276**: real 404s — `firebase.json` uses 7 explicit rewrites so unknown URLs
  fall through to `public/404.html` instead of a soft-404.
- **v277–v279**: charts off the critical path; thin blogs noindexed with honest
  read times; `/class-N` made real hubs linking into their own chapter pages.

## Standing architecture gotchas
- **react-helmet-async v3 is incompatible with React 19** — both emit head tags,
  duplicating every one. `src/seo/SEO.tsx` was rewritten to an imperative upsert
  that returns `null`.
- **Rollup `manualChunks`: naming a lazy-only package forces it to become a static
  entry import**, overriding `React.lazy` boundaries.
- `modulePreload.resolveDependencies` SKIP removes preload *hints*, not downloads.
- Firebase Hosting `cleanUrls` 301s `/x.html` → `/x`; rewrites always return 200.
- `public/audio/story/` is gitignored (859MB) but still deploys via dist.
- Story lesson data lives in `public/story-lessons/class-{n}.json`, fetched on
  demand — **never re-import it into the JS bundle**.
- `/skills-lab/*` 301s to `/coding/*` (intentional rename); Google still holds the
  old URLs at deep positions. Not a bug.

## Older session lessons
- Agents writing lesson JSON: enforce exact count + JSON shape; validate
  afterwards; never trust self-reports.
- Agent claims about live SEO tags are often wrong — curl the live HTML.
- Big generation runs hit API session limits — design resumable pipelines.
- Gate deploys on build exit code; a build once failed transiently.
