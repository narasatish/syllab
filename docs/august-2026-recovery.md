# The August 2026 traffic collapse — what happened and what was done

Written 27 August 2026. Covers commits `d4343c7` … `cb85163` (v353 → v362).

## What happened

On 18 August, syllab.in went from 4,047 impressions and 47 clicks to 132 and 0,
overnight. Site-wide average position went from 12.1 to 68.

## What it actually was

Two independent measurements agree, and they rule out most of what was
initially suspected.

**Query level — impressions vanished while rank held:**

| query | impressions | average position |
|---|---|---|
| difference between weathering and erosion | 274 → **0** | 10.1 → **9.6** |
| class 7 english question paper with answer 2026 | 200 → **0** | 7.5 → **7.6** |
| which of the following is not a primary function of accounting | 109 → **0** | 4.5 → **4.3** |

Three of three queries that went to zero kept their position within half a
place. One improved.

**Coverage — indexed count fell, but nowhere near enough:**

| date | indexed | impressions |
|---|---|---|
| 14 Aug | **3,051** | 2,217 |
| 17 Aug | 2,813 | 4,047 |
| 18 Aug | **2,504** | **132** |

## CORRECTION (1 September) — the original reading of this was wrong

This document previously concluded, in bold:

> The pages were removed from the index. They were not re-ranked.

**That is false, and the arithmetic never supported it.** 547 pages of 3,051 is an
18% drop in indexed pages. An 18% drop cannot produce a 97% loss of impressions.
The question was never asked at the time.

Checked live on 1 September, against Google itself rather than an export:

- `site:syllab.in/sample-papers/class-7-english` returns the page, with its
  correct title and description. It is **indexed**.
- Searching its own query, *class 7 english question paper with answer 2026* —
  200 impressions at position 7.5 before the drop — page one is Scribd, Vedantu,
  Pinterest, Filo, StudiesToday, YouTube. **syllab.in is absent.**
- Searching *difference between weathering and erosion* — 274 impressions at
  position 9.6 before the drop — page one is BYJU'S, National Geographic,
  Vedantu, Howard Community College, Brainly. **syllab.in is absent.**

The pages are indexed and demoted. Not removed.

**Why "average position held" fooled me.** GSC averages position only over
impressions the page actually received. Lose the head terms, keep a handful of
long-tail variants still ranking around 9, and the average still reads 9 while
impressions collapse to 3% of before. Position holding steady was an artifact of
averaging over a collapsed sample — it was never evidence that ranking was intact.

**What this changes.** Requesting indexing for pages that are already indexed does
not help because they are missing; it helps only insofar as it makes Google
re-crawl the *fixed* version sooner. The recovery being waited on is a site-level
quality re-assessment, not re-inclusion.

## The most likely cause

From 25 June (`fb1253a`) every page shipped its entire body inside
`#prerender-seo` — `position:absolute`, 1×1, `clip:rect(0,0,0,0)`,
`aria-hidden="true"` — and React deleted the block on mount. Two violations at
once: hidden text under Google's spam policy, and a crawled-versus-rendered
mismatch of 8–17k characters on every one of 4,376 pages.

Google crawls and renders on separate schedules, and the render queue lags
crawling by days or weeks. Nothing happened for seven weeks; the site grew, and
17 August was its best impressions day in 92. Crawl stats show a surge over
14–17 August (762, 706, 595, 549 requests against a 50–230 baseline). The
render verdict landed across the whole site at once, and the traffic went the
next day.

This is a well-supported hypothesis, not proof. It fits every number available
and the alternatives were ruled out with evidence, but causation cannot be
proven from this side. The test is whether rankings recover as Google
re-renders.

## Ruled out, with evidence

- **Core Web Vitals.** CrUX is a 28-day rolling window, so the LCP 3.3s reading
  taken 21 August covers roughly 25 July to 21 August — the site's peak. The
  same LCP coexisted with position 12.1 and 47 clicks a day.
- **A crawl outage.** Claimed early and wrong: crawl stats show 595 and 549
  Googlebot requests on 16 and 17 August, not zero.
- **A new JavaScript library.** framer-motion has been in the project since the
  initial commit (4 May); the vendor-motion chunk since 9 May.
- **The noindex retirements.** Cross-referenced against Search Console: the
  noindexed set held 36% of impressions but only 2.8% of clicks. 96.9% of
  clicks come from pages that are still indexable, still return 200, and still
  carry a correct self-canonical.
- **The service worker.** Real bug, fixed in v356, but not this: the document
  reached the client from the network (transferSize 10,945) and was correct.

## What was fixed

| fix | evidence |
|---|---|
| Hidden page body — now plain visible content | browser-verified, guard added |
| 1,291 URLs of index bloat under `/profile`, `/parent` | `noindex` header + robots.txt unblocked |
| `/admin` rewrite, same shape, found by audit | `noindex` header |
| Service worker served one page's HTML for another URL | live cache inspected |
| `www.syllab.in` had no valid certificate | TLS valid, 301 to apex |
| Sitemap missing 74 URLs (code committed, artefact never regenerated) | restored |
| Duplicate pages: two URLs per chapter, both indexable | retired by Search Console earnings |
| 263 KB of render-blocking CSS | mobile Performance 85 → 94 |
| 249 titles truncating in results | 646 → 397 over 65 characters |
| Snippets that answered the query in the SERP | 40 pages rewritten |
| Feeder links into converting clusters | 93 blocks, 342 links |

## The build gates now standing

Eleven, each tested against a deliberately broken build before being trusted:

    page body is visible, not hidden      the regression that cost the rankings
    sitemap URL count holds               a >2% drop fails; 18 Aug was 2.8%
    canonical is self-referential         had NO coverage before
    first viewport paints real text       guards the LCP fix
    no duplicate sitemap URLs
    robots.txt advertises real sitemaps
    no indexable page blocked by robots.txt
    no sitemap URL blocked by robots.txt
    www redirects to the apex             a TLS failure here is invisible elsewhere
    apex DNS points at hosting
    domain verification TXT + MX intact

They have already earned it: the duplicate-title gate blocked a deploy and
exposed duplicate pages that predated the whole incident.

## Two things that nearly went wrong

**Retiring the wrong duplicate.** Instinct said keep the tidy `-maths-` slug
over `-mathematics-`. Search Console said the tidy one had 0 impressions and
the awkward one had 307. Retiring by convention would have suppressed the only
page of the pair that earns — the mistake recorded three times at the top of
`RETIRED_SLUGS`.

**A check that validated nothing.** The MCQ answer-integrity check read
`chap.questions` where the field is `chap.mcqs`, compared ZERO questions, and
printed "PASS". It now exits non-zero when the comparison count is zero.

## What was got wrong along the way

Recorded because the pattern matters more than the individual errors:

- asserted a crawl outage that did not exist
- blamed the service worker for the SSR failure — diagnosed from a symptom
- predicted an LCP fix three times, wrong twice
- shipped a data check that compared zero records and reported success
- analysed the Coverage export, called it complete, and missed its largest
  number (1,291 pages) because it sat in an empty CSV

Every one was caught by measuring. What was measured held up; what was asserted
did not.

## Still open

- **Rankings.** Not recovered. This is a site-wide algorithmic demotion, not a
  deindexing and not a manual action — the Manual Actions panel reads "no issues
  detected" (checked 1 Sep), and no Google update was confirmed for 18 August.
  Pages stay indexed and lose their head terms. Gated on Google re-crawling
  ~4,300 pages at ~130/day and re-assessing site quality; algorithmic demotions
  typically take weeks to months to lift after the cause is removed. URL
  Inspection helps only to get the fixed version crawled sooner.
- **Mobile field LCP.** CrUX is a fixed 28-day window. v357 shipped 25 August,
  so the field number cannot move before roughly 22 September regardless of
  what anyone does.
- **SSR.** Disabled. The postponement bug is fixed (`renderToPipeableStream`
  + `onAllReady`). Scale was investigated on 27 August and RULED OUT — the
  earlier "1 route works, 931 fails" reading was an uncontrolled comparison of
  two channels running DIFFERENT client bundles. With the bundle held constant,
  a 2-route build fails exactly as a 931-route build does. Also ruled out:
  the prerenderer (output byte-identical at 2 and 931 routes from clean bases),
  the service worker (reproduced with the fixed v362), Firebase serving (the
  correct 60,052-byte document is returned), and chunk loading (the route chunk
  downloads, no console error). The remaining variable is the CLIENT BUNDLE:
  `index-DftKMM-N.js` renders correctly and `index-Bq-mRYwj.js` does not. Start
  there, and hold every other variable fixed — three of the wrong turns here
  came from comparing two things that differed in more than one way.
- **397 long titles.** Genuinely long source templates; shortening them further
  trades indexed keywords for characters.

## What to watch, and what not to

Watch the **indexed count** in Page Indexing, and **impressions on specific
pages**. Recovery is indexed pages returning first, impressions second, clicks
last.

Do not watch site-wide average position. It is impression-weighted, so it moves
when the MIX of queries changes even though no page moved — which is exactly
what made this collapse look like a demotion for three days.

Also: **"Duplicate without user-selected canonical"** should fall from 1,291.
When it does, re-add the `Disallow` lines for `/profile` and `/parent` — the
note is in `robots.txt` and `firebase.json`.
