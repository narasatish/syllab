# Syllab.in — Google Search Console Indexing Checklist

> **Why this exists:** On-page/technical SEO is done (1,166-URL sitemap + lastmod,
> prerender, full schema, hreflang, robots, llms.txt). The #1 remaining reach
> bottleneck is **getting Google to actually crawl & index those pages**. A new
> site doesn't get indexed automatically — you have to nudge the highest-value
> pages by hand, then let the sitemap carry the long tail.

---

## 0. One-time setup (do once)

1. Go to **https://search.google.com/search-console** → add property **`https://syllab.in`** (Domain property via DNS TXT is best; URL-prefix works too).
2. **Sitemaps** → submit: `sitemap.xml` (also `sitemap-images.xml` if listed).
3. **Settings → Crawl stats** — confirm Googlebot can reach the site (no host errors).
4. Repeat the whole flow on **Bing Webmaster Tools** (https://www.bing.com/webmasters) — you can *import* the property straight from GSC in one click.

---

## 1. Request Indexing — Tier 1 money pages (do these FIRST, in order)

GSC → **URL Inspection** (top search bar) → paste URL → **Request Indexing**.
Limit is ~10–12 manual requests/day, so spread Tier 1 over 2–3 days.

| # | URL | Why |
|---|-----|-----|
| 1 | https://syllab.in/ | Homepage — brand + SearchAction |
| 2 | https://syllab.in/mock-tests | High-intent hub |
| 3 | https://syllab.in/mock-tests/jee-main | Top exam search |
| 4 | https://syllab.in/mock-tests/neet | Top exam search |
| 5 | https://syllab.in/college-predictor | High-intent, low competition |
| 6 | https://syllab.in/college-predictor/jee-main | "jee rank college predictor" |
| 7 | https://syllab.in/college-predictor/neet | "neet college predictor" |
| 8 | https://syllab.in/ncert-solutions | Evergreen, huge volume |
| 9 | https://syllab.in/worksheets | Linkable asset |
| 10 | https://syllab.in/calculators | Linkable asset (5 tools) |
| 11 | https://syllab.in/class-10 | Board class = highest intent |
| 12 | https://syllab.in/class-12 | Board class = highest intent |

## 2. Request Indexing — Tier 2 (next 2–3 days)

| URL | Why |
|-----|-----|
| https://syllab.in/class-9 | Board feeder |
| https://syllab.in/class-11 | Board feeder |
| https://syllab.in/important-questions | High-intent revision searches |
| https://syllab.in/english-grammar | Cluster index |
| https://syllab.in/career | Career Compass hub |
| https://syllab.in/career/which-stream-after-10th | Top career query |
| https://syllab.in/career/which-stream-after-12th | Top career query |
| https://syllab.in/colleges | Colleges hub |
| https://syllab.in/colleges/telangana | Home-state intent |
| https://syllab.in/colleges/andhra-pradesh | Regional intent |
| https://syllab.in/colleges/tamil-nadu | Regional intent |
| https://syllab.in/colleges/karnataka | Regional intent |
| https://syllab.in/colleges/maharashtra | Regional intent |
| https://syllab.in/study-room | Linkable asset |
| https://syllab.in/kids | Syllab Junior (parent searches) |

## 2b. NEW pages (added June 2026 — request these next)

Site is now ~1,330 prerendered URLs. The NCERT cluster (154 chapter pages) + PYQ
cluster are fresh — request the hubs + a few flagship chapters; the rest flow via
sitemap + the new static link hub on /ncert-solutions.

| URL | Why |
|-----|-----|
| https://syllab.in/previous-year-papers | New PYQ/sample-papers hub (high India volume) |
| https://syllab.in/previous-year-papers/cbse-class-10 | "cbse class 10 previous year papers" |
| https://syllab.in/previous-year-papers/jee-main | "jee main pyq" |
| https://syllab.in/ncert-solutions/class-10/mathematics/quadratic-equations | Flagship Class 10 Maths |
| https://syllab.in/ncert-solutions/class-12/physics/current-electricity | Flagship Class 12 Physics |
| https://syllab.in/ncert-solutions/class-12/mathematics/integrals | Flagship Class 12 Maths |
| https://syllab.in/ncert-solutions/class-11/physics/laws-of-motion | Flagship Class 11 Physics |
| https://syllab.in/ncert-solutions/class-10/biology/life-processes | Flagship Class 10 Bio |

> Tip: don't hand-request all 154 NCERT chapters — request the hub + these flagships,
> then in GSC use **Sitemaps → ncert pages** coverage to watch the rest get indexed.
> The new static link hub on /ncert-solutions now exposes all 154 to crawlers.

## 3. The long tail (Class 1–8, all 16 cities, every exam/topic/guide)

**Do NOT hand-request these.** The submitted `sitemap.xml` carries all 1,166 URLs.
Once Tier 1+2 are indexed and earning impressions, Google crawls the rest on its
own. Just keep the sitemap fresh (it regenerates on every `npm run build`).

---

## 4. Weekly cadence (15 min/week)

- **Pages report** → watch "Not indexed" reasons. The two that matter:
  - *"Discovered – currently not indexed"* = Google knows but hasn't crawled →
    Request Indexing on the most valuable ones.
  - *"Crawled – currently not indexed"* = thin/duplicate signal → improve content
    or internal links to that page.
- **Performance report** → sort by Impressions, low CTR + high impressions = a
  title/description worth rewriting (in `App.tsx` PAGE_SEO).
- After any deploy that adds new routes: re-submit `sitemap.xml` (re-submitting is
  free and re-triggers a crawl).

---

## 5. Bing / IndexNow

### IndexNow — ✅ DONE (no login, already working)
The key file is live at `https://syllab.in/a3f9c1e7b8d24f06a1c5e9d3b7f08c42.txt`
(HTTP 200) and **all 1,166 URLs have been submitted to Bing + Yandex** (accepted
HTTP 200), with the 27 money pages submitted first.

**Re-run after every deploy** (instant, free, no login):
```
node scripts/indexnow.mjs                 # whole sitemap
node scripts/indexnow.mjs /new-page /x    # just specific new URLs
```

### Bing Webmaster (optional, ~5 min, needs your Microsoft login)
- https://www.bing.com/webmasters → **Import from GSC** (one click) or add the site.
- This gives you Bing's index coverage report; IndexNow above already feeds Bing the
  URLs, so this is just for visibility/analytics — not required for indexing.

---

## 6. What moves the needle after indexing (off-page)

Indexing gets you *eligible* to rank; **backlinks + engagement** decide *where*.
See `docs/outreach-pack.md` (templates + prospect queries) and
`docs/seo-strategy.md` Part 6 (7-tier backlink plan). Fastest wins:
1. Answer real questions on r/CBSE, r/JEE, Quora → cite the exact free tool/page.
2. Submit to free-tool directories (Product Hunt, AlternativeTo, Saashub).
3. Pitch the worksheets + calculators to school `.edu.in` "resources" pages.
