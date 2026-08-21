# Backlinks — tracked register

Backlinks are the one traffic input this repo cannot measure for itself. There
is no API here: Search Console's Links report has no public API, and Ahrefs,
Moz and Semrush are paid. So this file is the register, and it is maintained by
hand on purpose — a number in a dashboard nobody updates is worse than a short
list somebody does.

`scripts/traffic-health.mjs` reports backlinks as **needs external data** rather
than passing, so the gap stays visible instead of looking healthy.

## How to refresh this (about 5 minutes, monthly)

1. Search Console → **Links** (bottom of the left nav)
2. Note **Total external links** and the top linking sites
3. Update the table below, with the date
4. If a previously listed domain has disappeared, say so — a lost link is worth
   more attention than a new one

## Current state

| date | total external links | top linking domains | notes |
|---|---|---|---|
| _not yet recorded_ | — | — | Run the steps above and fill this in. |

## What the site already does to earn links

These exist and work; they are the assets a link would point at.

| asset | url | why it is linkable |
|---|---|---|
| Embed badges | `/embed` | Ready-made HTML for schools and blogs to link back with |
| Formula posters | `/formula-sheets` | Printable A4 PDFs, free to share in classrooms |
| Free tools | `/tools` | Calculators and converters — the classic link magnet |
| Full A–Z reference | `/full-forms`, `/glossary` | Reference pages get cited |
| Web Stories | `/web-stories` | 183 AMP stories, a Discover surface |

## Rules for pursuing links

Written down because the temptation runs the other way when traffic is down.

- **Never buy links, never exchange them in bulk, never post to directories that
  exist only for links.** A manual action for link spam costs more than the
  links are worth, and this site currently has a clean record (verified 21
  August 2026: no manual actions).
- **Prefer one link from a school, board or teacher community over fifty from
  anywhere else.** Relevance is the whole value.
- **The best link-earning work is the content work.** The pages here that draw
  links are the free printable posters and the reference tables, not the
  marketing pages.

## Related

- `scripts/traffic-health.mjs` — the standing check across every traffic input
- `scripts/gsc-report.mjs` — what Search Console says is actually earning
- `docs/traffic-playbook.md` — what to do when traffic moves
