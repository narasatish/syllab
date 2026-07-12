# Story-PPT image spec (v2) — one unique image per slide

The Class 1 v1 batch had great layout + story text, but every 20-slide deck reused
only **3 background images**. To match the "We the Travellers" sample, each slide needs
its **own illustration generated from that slide's specific concept**.

## The rule
For every **content slide**, generate a UNIQUE image whose subject is the concrete thing
that slide teaches — not a generic classroom scene.

- Slide says "Anu has 3 mangoes, Ravi gives 2 more = 5" → image of **3 mangoes beside 2 mangoes** on a table.
- Slide about "put together" → image of **two small groups of objects being combined**.
- Slide "Shapes around us" → image of **a circle, square and triangle as real objects** (plate, window, slice).

Derive a 1-line visual prompt from the slide's own `Example` / `Story point` text.

## Fixed style suffix (append to EVERY image prompt — keeps the deck cohesive)
```
flat children's storybook illustration, soft warm colors, simple shapes,
Indian village/classroom setting, friendly characters Anu/Ravi/Meera/Tara,
NO text in the image, clean background, 16:9
```

## Per-slide-type guidance
| Slide type | Image subject |
|---|---|
| Title (slide 1) | the chapter theme as a wide scene (a background is fine here) |
| Story friends (slide 2) | the 4 characters together (one recurring scene OK here only) |
| Concept / Idea slides | UNIQUE image of that exact concept/example — the important ones |
| Story question slides | the specific situation the question describes |
| Recap / "Great work" | the chapter's objects gathered together |

So: ~2 scene images per deck are fine; the other ~18 must be concept-unique.

## How to generate the images
1. **AI image model per slide** (DALL·E / Imagen / SDXL) with `concept prompt + style suffix`.
   This is the only way to get the sample's look. ~18 unique images/deck.
2. Keep a **fixed seed/style** so characters and color palette stay consistent across slides.
3. Embed the generated image into that slide (replace the reused background).

## Practical note on volume
21 decks × ~18 concept images ≈ **380 images/class**. If your ChatGPT image quota makes
that slow/expensive, the alternative is: keep sending the PPTX (layout + text are good),
and Syllab generates the per-concept images centrally via Imagen (needs Google Cloud
billing enabled) and composites them in. Either path produces the same result.

## What stays the same (already good — don't change)
- 20-slide structure, story text, simple Indian examples, Syllab branding, clean layout.
- Filenames `01_{Subject}_{Chapter}.pptx` mapping to docs/syllabus-chapters.csv. Keep this.
