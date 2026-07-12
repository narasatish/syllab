# Story-lesson authoring spec (read fully before writing)

You author **real, curriculum-accurate, story-based lessons** for Syllab.in (free CBSE/NCERT
learning for Indian students). Output is DATA (a JSON array of `StoryLesson`) that a styled
viewer renders — you do NOT write UI. The viewer adds gradients, icons and color per slide,
so lessons look great **without** photos; your job is the CONTENT.

## Non-negotiable quality bar
- **Real subject matter, never filler.** Every concept slide must teach an ACTUAL sub-topic of
  the chapter with correct facts, definitions, formulas, and worked examples.
  BANNED: generic boilerplate like "This part explains X in the chapter. First understand the
  meaning, then look at the example." If a slide could be copy-pasted to any other chapter, it is wrong.
- **Curriculum-accurate to the class.** Use the real NCERT scope for that class & chapter.
  - Class 10 Real Numbers → Euclid's division lemma, Fundamental Theorem of Arithmetic, proving
    √2 irrational, HCF×LCM = product. With real numbers in examples.
  - Class 12 Physics Electric Charges → Coulomb's law with the formula F = k·q₁q₂/r², units, a
    solved numerical.
  - Class 1 Addition → 3 mangoes + 2 mangoes = 5, counting on fingers.
- **Age-scaled tone.**
  - Classes 1–2: very simple, playful, concrete, counting/observing, 1 idea per slide.
  - Classes 3–5: simple + light rigor, real-life Indian examples.
  - Classes 6–8: solid concepts, clear worked examples, some vocabulary.
  - Classes 9–10: full rigor, formulas, definitions, board-exam-style worked problems.
  - Classes 11–12: rigorous, real equations/reactions/derivations, exam-level solved examples.
- **Story-based.** Recurring Indian characters on a journey/situation; each concept arrives
  through a real story beat and a daily-life Indian example (village, market, festival, kitchen,
  cricket, railways, farming, etc.). Keep it warm and human like a good teacher.

## Slide plan (aim 9–12 slides per lesson)
1 `title` (chapter as the story's title) → 1 `story` (set the scene, characters, the mission) →
4–7 `concept` (each = ONE real sub-topic: teaching `points` + a worked `example` when it suits) →
1 `example` (a fuller solved problem) → 1 `challenge` (a problem for the student, with the answer
in `example.solution`) → 1 `recap` (bullet summary of what was learned).

## Schema (TypeScript — match EXACTLY)
```ts
StoryLesson {
  slug: string;          // EXACTLY: class-{n}-{subjectSlug}-{chapterSlug}
  classLevel: string;    // e.g. "10"
  subject: string;       // EXACT subject string given to you
  chapter: string;       // EXACT chapter title given to you
  chapterAliases?: string[];
  title: string;         // the story title
  hook: string;          // one-line premise for the cover
  characters: { name: string; emoji?: string; role: string }[];  // 2–3 recurring
  slides: StorySlide[];
}
StorySlide {
  kind: "title" | "story" | "concept" | "example" | "challenge" | "recap";
  title: string;
  storyContext?: string;                 // the narrative beat
  points?: { label?: string; text: string }[];   // teaching points
  example?: { problem: string; solution: string };
  inSimpleWords?: string;                // the "In simple words:" takeaway
  image?: { prompt?: string };           // concept-specific image idea (text only, optional)
  emoji?: string;                        // 1 relevant emoji
}
```
- `slug`: slugify = lowercase, non-alphanumerics → single `-`, trim. Subject "Social Science" →
  `social-science`; chapter "Pair of Linear Equations in Two Variables" →
  `pair-of-linear-equations-in-two-variables`. So slug = `class-10-mathematics-pair-of-linear-equations-in-two-variables`.
- Put a relevant `emoji` and an `inSimpleWords` on most slides. `image.prompt` should describe the
  exact concept (e.g. "two ripe mangoes beside three ripe mangoes on a wooden table") — never generic.

## Output format (CRITICAL)
- Write a SINGLE valid JSON array `[ {...}, {...} ]` of the lessons — one object per chapter given.
- **Use the Write tool** to save it to the exact path you are told. Output ONLY JSON in the file —
  no markdown fences, no prose, no comments.
- Valid JSON: double quotes everywhere; escape any `"` inside text as `\"`; NO trailing commas;
  NO single quotes. Prefer straight quotes; avoid characters that need escaping where you can
  (use "minus" or "−" rather than stray backslashes). Math like F = kq₁q₂/r² is fine as plain text.
- After writing, re-read your file mentally: does `JSON.parse` succeed? Every chapter present? Real content?
```
