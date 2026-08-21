# Traffic playbook

Everything that brings traffic to syllab.in, what watches it, and what to do
when it moves. Written after a two-day crawl outage in August 2026 cost the site
its clicks and took nine days to diagnose.

## The one-line version

```bash
npm run traffic            # every check that can run offline
npm run traffic:live       # + live HTTP against production
```

Non-zero exit means something is costing traffic **today**. Warnings are worth
looking at; failures are not.

## When traffic drops, check in this order

The order matters. It is sorted by how fast the cause can kill traffic, and the
August 2026 collapse would have been found at step 2 in about a minute.

| # | check | where | what it looks like |
|---|---|---|---|
| 1 | Manual actions | GSC → Security & Manual Actions | A penalty. Rare. Rule it out first because it changes everything else. |
| 2 | **Crawl stats** | GSC → Settings → Crawl stats → Host status | **This is what bit us.** A day with zero crawl requests, or "robots.txt fetch: high fail rate". |
| 3 | Live serving | `npm run traffic:live` | robots.txt non-200, X-Robots-Tag, sitemap URLs redirecting. |
| 4 | Indexation | GSC → Pages, and a Coverage export | A jump in "Duplicate", "Excluded by noindex", "Discovered — not indexed". |
| 5 | The cliff shape | `node scripts/gsc-report.mjs <export.zip>` | It flags a same-day collapse automatically and tells you to go to step 2. |
| 6 | Rankings | the same report | Gradual decline, not a cliff — that is a ranking change, a different problem. |

**A same-day collapse is almost never a ranking change.** Rankings move over
days and weeks. If impressions fall off a cliff overnight, something stopped
Google reaching or trusting the pages.

## What runs on its own

| what | when | where |
|---|---|---|
| `traffic-health` | every CI run and every `npm test` | fails the build on a traffic-costing regression |
| Uptime + robots.txt monitor | every 6 hours | `.github/workflows/monitor.yml`, emails on failure |
| Post-deploy verification | every `npm run deploy` | deploy is followed immediately by the monitor |

**robots.txt is the highest-stakes file on the site.** A 404 there means "crawl
everything"; a 5xx or a timeout means Googlebot stops crawling the **whole
site**. It did, for two days. It is now checked for status, content type, and
that it is not the SPA rewrite answering with HTML.

## What needs a human, and how often

| task | frequency | how |
|---|---|---|
| Search Console export → report | monthly, or the moment traffic moves | `node scripts/gsc-report.mjs <zip> [older.zip]` |
| Core Web Vitals | monthly | GSC → Core Web Vitals, both Mobile **and** Desktop tabs |
| Backlinks | monthly | `docs/backlinks.md` has the steps |
| Coverage export | monthly | confirms indexation is not drifting |

CrUX is a rolling 28-day window. A fix deployed today does not show for about
four weeks — do not judge it sooner, and do not re-fix it in the meantime.

## Decisions this data has already settled

Recorded so they are not relitigated from scratch.

- **Impressions are not the goal.** `/full-forms` drew 66,595 impressions for 37
  clicks — 0.06% CTR — because Google answers "full form" queries inline.
  Re-indexing all 471 pages would have restored a third of the site's
  impressions and 2% of its clicks, and put 461 thin pages back in the index.
  Ten were re-indexed instead, chosen for having something to click through to.
- **Some noindexed pages are the best pages on the site.** 58
  `/difference-between` pages earned 94 clicks while noindexed, at a CTR
  matching the indexed set. They were deepened with FAQs and re-indexed.
  `/formula-sheets` and `/solved-examples` pages convert at 5–11%, far above the
  0.70% site average, and are still noindexed — the current best opportunity.
- **Deploy less often.** Both days with robots.txt failures carried many
  separate deploys. robots.txt is fetched only a few times a day, so a failure
  during a deploy window reads to Google as a high failure rate. Batch changes.

## The measurement rule

Every claim in this playbook came from a measurement, and several earlier
versions of those measurements were wrong in ways that looked right:

- A parity audit compared prerendered `<main>` against the whole SSR document
  and reported 43 gaps that were nav and footer text.
- A duplicate-page checker stemmed "forces" to "forc" but left "force" alone, so
  it passed a real duplicate.
- A contrast checker measured white text against a white background and reported
  4,358 failures that were white text on coloured panels.

So: **check the checker against a case whose answer you already know**, before
believing what it says about the cases you do not.
