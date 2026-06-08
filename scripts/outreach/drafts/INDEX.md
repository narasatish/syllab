# Syllab Outreach Pipeline

**Generated:** 2026-06-08
**Status:** Draft mode — no emails sent, no network calls made.

---

## Quick Start

Each file in this directory is a ready-to-send draft. Review, personalize, and send manually.

### File Structure

- **DIRECTORY_*.txt** — Directory listing submissions (AlternativeTo, G2, Product Hunt, etc.)
- **GUEST_POST_*.txt** — Email pitches for guest articles on blogs and publications
- **HARO_*.txt** — Response templates for journalist queries and expert roundups

---

## Summary

| Type | Count | Notes |
|------|-------|-------|
| Directory Listings | 10 | Submit to app/product directories |
| Guest Post Pitches | 5 | Email to editors; target 800–2500 word pieces |
| HARO/PR Templates | 6 | Monitor sources; respond to journalist queries |
| **Total** | **21** | **Outreach opportunities** |

---

## Suggested Weekly Cadence

### Week 1: Directory Listings
- Submit 2–3 directory listings (AlternativeTo, GetApp, Capterra)
- Goal: Get listed on directories where students search for free alternatives
- Effort: ~15 min per listing (copy-paste boilerplate, create account if needed)

### Week 2: Guest Post Pitches (Round 1)
- Send 2 guest post pitches to Indian parenting/education blogs
- Goal: High-intent audience; backlinks + credibility
- Effort: ~20 min per pitch (personalize, send)

### Week 3: HARO Monitoring
- Monitor all HARO/journalist sources daily (5–10 min per day)
- Goal: Get quoted in mainstream media (zero cost, high ROI)
- Effort: Response template is pre-written; ~5 min per response

### Week 4: Guest Post Pitches (Round 2) + Follow-up
- Follow up on Week 2 pitches (non-pushy)
- Send 2 new pitches to board-prep or career blogs
- Goal: Diversify audience, increase backlinks
- Effort: ~20 min per pitch

### Ongoing: Repeat & Measure
- Aim for 1 directory listing + 1 guest post pitch + 2–3 HARO responses per week
- Track responses in the 'STATUS' field of each draft
- After publication, note the URL in `scripts/outreach/published.log`

---

## Key Messaging (Consistent Across All Pitches)

- Completely free—no hidden paywall, no premium tiers
- Built by educators and IITians; verified NCERT content
- AI tutoring responds in under 2 seconds, explains step-by-step
- Mock tests with instant feedback and analytics
- Personalized learning paths based on student performance
- Live quizzes for real-time engagement and gamified learning
- Accessible anywhere in India—works on low-bandwidth connections
- No ads, no distracting design; learning-first interface

---

## Targets by Type

### Directory Listings (10)

- **Product Hunt** → `DIRECTORY_product_hunt.txt`
- **AlternativeTo** → `DIRECTORY_alternativeto.txt`
- **GetApp (SoftwareSuggest)** → `DIRECTORY_getapp_softwaresuggest.txt`
- **Capterra** → `DIRECTORY_capterra.txt`
- **G2** → `DIRECTORY_g2.txt`
- **BetaList** → `DIRECTORY_betalist.txt`
- **Crunchbase** → `DIRECTORY_crunchbase.txt`
- **Wellfound** → `DIRECTORY_wellfound.txt`
- **YourStory** → `DIRECTORY_yourstory.txt`
- **Startup India** → `DIRECTORY_startup_india.txt`

### Guest Post Opportunities (5)

- **Indian parenting blogs - [Parenting Blog Name]** → `GUEST_POST_indian_parenting_blogs_parenting_blog_name.txt`
- **CBSE/board prep blogs - [Board Prep Blog Name]** → `GUEST_POST_cbse_board_prep_blogs_board_prep_blog_name.txt`
- **Teacher/educator newsletters - [EdTech Teacher Newsletter]** → `GUEST_POST_teacher_educator_newsletters_edtech_teacher_newsletter.txt`
- **Indian education magazines / e-zines - [EdTech Magazine]** → `GUEST_POST_indian_education_magazines_e_zines_edtech_magazine.txt`
- **Career/skill-building blogs - [Career Blog]** → `GUEST_POST_career_skill_building_blogs_career_blog.txt`

### HARO / Journalist Sources (6)

- **Featured.com** → `HARO_featured_com.txt`
- **Qwoted** → `HARO_qwoted.txt`
- **SourceBottle** → `HARO_sourcebottle.txt`
- **Help a B2B Writer** → `HARO_help_a_b2b_writer.txt`
- **Twitter #journorequest** → `HARO_twitter_journorequest.txt`
- **LinkedIn Journalist Groups** → `HARO_linkedin_journalist_groups.txt`

---

## Important Notes

1. **No automation:** This script generates drafts only. Each outreach must be reviewed and sent manually.
2. **No network calls:** Zero emails, zero API calls, zero external requests. Drafts only.
3. **Personalization required:** All [brackets] placeholders MUST be filled in before sending.
4. **Verify URLs:** Some targets require confirmation of exact submission/contact URLs (marked `verify: true`).
5. **Track responses:** Update the 'STATUS' field in each draft file as you progress.
6. **Publish log:** After a pitch is published, record the URL in `scripts/outreach/published.log`.

---

## Boilerplate Used

All drafts use consistent messaging from `boilerplate.json`:

**One-liner:**
Syllab is a free AI-powered learning platform for Indian students (Class 1–12), offering NCERT solutions, mock tests, AI tutoring, and live quizzes—completely free, no paywall.

**50 words:**
Syllab democratizes education for Indian students: free NCERT solutions, AI-powered tutoring in under 2 seconds, mock tests for JEE/NEET/board exams, live quizzes, and personalized learning paths. Built by educators and IITians. No paywall. No ads. Used by 500K+ students.

**100 words:**
Syllab is India's leading free learning platform for students (Class 1–12), from foundational NCERT chapters to advanced exam prep (JEE, NEET, state boards). Students access verified NCERT-aligned content, AI-powered tutoring that explains mistakes in under 2 seconds, mock tests with instant feedback, live quizzes, and gamified learning challenges. Built by former IITians and educators, Syllab combines pedagogical rigor with cutting-edge LLMs to personalize each student's path. Completely free—no subscription, no paywall, no ads—Syllab reaches students regardless of geography or income. Over 500,000 active learners trust Syllab for exam prep and skill-building.

---

## Scripts & Tools

- `scripts/outreach/targets.json` — List of all targets (directories, guest posts, HARO sources)
- `scripts/outreach/boilerplate.json` — Reusable descriptions, tags, key messages
- `scripts/outreach/generate-pitches.mjs` — This script (generates all drafts)
- `scripts/outreach/drafts/` — Generated draft files (this directory)

---

**Generated by:** `node scripts/outreach/generate-pitches.mjs`
**Next step:** Review drafts, personalize, and send manually.
