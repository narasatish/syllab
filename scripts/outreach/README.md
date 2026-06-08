# Syllab Outreach Pipeline

A local, draft-only outreach system for reaching journalists, bloggers, app directories, and media contacts about Syllab.

**IMPORTANT:** This pipeline generates DRAFT text files only. It does NOT send emails, hit any APIs, or make network requests. All outreach is manual and requires explicit review before sending.

## Quick Start

```bash
node scripts/outreach/generate-pitches.mjs
```

This generates 22 draft files in `scripts/outreach/drafts/`:
- 10 directory listing templates (Product Hunt, G2, AlternativeTo, etc.)
- 5 guest post pitch emails (for Indian parenting blogs, CBSE prep sites, etc.)
- 6 HARO/journalist response templates (Featured.com, Qwoted, #journorequest, etc.)
- 1 INDEX.md summarizing all targets and a suggested weekly cadence

## Files

### Core Configuration

- **`targets.json`** — Structured list of outreach targets
  - `directories[]` — App/product directories (10 targets)
  - `guestPosts[]` — Blog/publication opportunities (5 targets)
  - `haroAndPR[]` — Journalist/media sources (6 targets)
  - Each target includes URL, notes, action steps, and `verify: true` flags for URLs needing confirmation

- **`boilerplate.json`** — Reusable descriptions and messaging
  - `oneLiner` — 120-character pitch
  - `fiftyWord` — 50-word description (directories)
  - `hundredWord` — 100-word description (guest posts, expert responses)
  - `authorBio` — Founder bio template
  - `tags[]` — 16 SEO/social tags
  - `keyMessages[]` — 8 core brand messages (free, NCERT, AI, etc.)
  - `socialProof` — User/content metrics

- **`generate-pitches.mjs`** — ESM script that reads the above and generates drafts
  - Creates `drafts/` directory
  - Generates individual draft files per target
  - Produces `INDEX.md` with summary and weekly cadence

### Generated Drafts (in `drafts/` directory)

- **`DIRECTORY_*.txt`** (10 files)
  - One per directory listing (Product Hunt, G2, AlternativeTo, etc.)
  - Contains one-liner, 50-word desc, tags, action steps, logo links
  - **How to use:** Copy/paste boilerplate into each directory's web interface

- **`GUEST_POST_*.txt`** (5 files)
  - One per guest post target (parenting blogs, CBSE prep sites, teacher newsletters, etc.)
  - Contains email subject, pitch, article outline, author bio
  - **How to use:** Personalize [brackets], send email to editor

- **`HARO_*.txt`** (6 files)
  - One per journalist query source (Featured.com, Qwoted, #journorequest, etc.)
  - Contains monitoring instructions and response template
  - **How to use:** Watch for queries, personalize response, submit

- **`INDEX.md`** (1 file)
  - Summary of all 21 targets
  - Suggested 4-week cadence + ongoing approach
  - Key messaging and tracking instructions

## Workflow

### Weekly Cadence (Suggested)

| Week | Action | Targets | Time | Goal |
|------|--------|---------|------|------|
| 1 | Submit directory listings | 2–3 directories (AlternativeTo, G2, Capterra) | ~15 min each | Free visibility in app stores |
| 2 | Guest post pitches (Round 1) | 2 parenting/education blogs | ~20 min each | Backlinks + credibility |
| 3 | Monitor HARO daily | All 6 sources | ~5 min per response | Get quoted in mainstream media |
| 4 | Guest post pitches (Round 2) + follow-up | 2 board-prep/career blogs | ~20 min each | Diversify audience |
| Ongoing | Repeat cycle, track progress | 1 dir + 1 guest + 2–3 HARO per week | Variable | Compound reach over months |

### Per-Draft Checklist

For every draft before sending:

1. **Review** — Read the entire draft for tone and accuracy
2. **Personalize** — Fill in all `[bracket]` placeholders:
   - `[Parenting Blog Name]` → actual blog name
   - `[Editor Name]` → verified editor's real name
   - `[Publication Name]` → actual publication
   - `[Your Name]`, `[Your Title]` → your actual name/role
3. **Verify URLs** — Any field marked `"verify": true` in `targets.json` needs manual URL confirmation:
   - Check that submission forms/emails are current
   - Guest post blogs may have changed editors or submission guidelines
4. **Customize pitch** — Guest posts especially should reference:
   - Recent blog posts from that publication
   - Specific audience pain points
   - Unique angle (e.g., "Why teachers are adopting free AI tutoring")
5. **Track status** — Update the `[ ] Not started  [ ] Draft sent  [ ] Confirmed` checklist
6. **Send manually** — Copy/paste into email, directory form, or response thread
7. **Log result** — After publication, save URL to `scripts/outreach/published.log` (format: `YYYY-MM-DD | [type] | [target] | [URL]`)

## Targets at a Glance

### Directories (10)
Product Hunt, AlternativeTo, GetApp, Capterra, G2, BetaList, Crunchbase, Wellfound, YourStory, Startup India

**Why:** Students search for free alternatives; high intent, low conversion friction.

### Guest Posts (5)
- Indian parenting blogs (tech-savvy parents)
- CBSE/board-prep blogs (exam-prep audience)
- Teacher/educator newsletters (partnership potential)
- Education magazines (credibility + reach)
- Career blogs (secondary angle: exam prep → college → career)

**Why:** Backlinks + credibility; direct audience engagement; founder visibility.

### HARO/PR (6)
Featured.com, Qwoted, SourceBottle, Help a B2B Writer, Twitter #journorequest, LinkedIn groups

**Why:** Zero-cost media coverage; journalists actively seeking edtech experts; real-time opportunities.

## Important Notes

### ⚠️ Draft Mode Only
- The script DOES NOT send emails
- The script DOES NOT hit any APIs
- The script DOES NOT make network requests
- All outreach is manual and explicitly under your control

### ⚠️ Personalization Required
Every draft contains `[brackets]` for customization. Before sending, fill in:
- Blog/publication names
- Editor names and emails
- Your name and title
- Specific recent articles or trends the publication covers

### ⚠️ URL Verification
Targets marked `"verify": true` need manual confirmation:
- Submission URLs may change
- Editors may rotate
- Guest post guidelines may update
Check the publication's current contact/submission page before pitching.

### ⚠️ Brand Consistency
All drafts use `boilerplate.json` for consistent messaging. To update:
1. Edit `boilerplate.json` (oneLiner, fiftyWord, hundredWord, keyMessages, etc.)
2. Re-run `node scripts/outreach/generate-pitches.mjs`
3. All drafts regenerate with new boilerplate

## Regenerating Drafts

If you update `targets.json` or `boilerplate.json`:

```bash
node scripts/outreach/generate-pitches.mjs
```

This overwrites all files in `scripts/outreach/drafts/`. Any tracking notes (STATUS fields) will be lost—save them elsewhere if needed.

## Tools & Commands

```bash
# Generate or regenerate all drafts
node scripts/outreach/generate-pitches.mjs

# Validate script syntax
node --check scripts/outreach/generate-pitches.mjs

# View a specific draft
cat scripts/outreach/drafts/DIRECTORY_product_hunt.txt

# Count generated files
ls scripts/outreach/drafts | wc -l
```

## Metrics to Track

After sending each pitch, note in `published.log`:

```
2026-06-15 | directory | Product Hunt | https://producthunt.com/posts/syllab
2026-06-18 | guest_post | Indian parenting blog | https://blog.example.com/article
2026-06-20 | haro | #journorequest | https://twitter.com/...
```

Track:
- **Clicks/visits** from each channel (use UTM params if possible)
- **Conversion to signups** (students, educators, parents)
- **Backlink quality** (guest posts especially)
- **Media mentions** (HARO responses that get published)

## Scaling

As outreach grows:
1. Add more targets to `targets.json` (follow the schema)
2. Expand guest post categories (e.g., "STEM teacher blogs", "rural education initiatives")
3. Add HARO sources (follow industry boards, journalist associations)
4. Increase cadence (2 directories + 2 guest posts + 5 HARO responses per week)

## Support

All drafts are self-contained. If a draft is confusing:
- Check `INDEX.md` for context
- Review `boilerplate.json` for brand messaging
- See `targets.json` for notes on why each target matters

---

**Generated by:** `node scripts/outreach/generate-pitches.mjs`
**Last updated:** See `INDEX.md` for generation date
**Status:** Draft mode — manual review and sending required
