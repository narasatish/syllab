# Story-Based Lesson — Backend Generation Prompt

Drop this into the `syllab-backend` PPT/lesson generator so **every chapter** can
produce a story-based lesson. The output JSON must match the frontend
`StoryLesson` schema (see `src/data/storyLessons.ts`) so authored and
AI-generated lessons render identically in `StoryLessonViewer`.

Add a new endpoint (e.g. `POST /api/story-lesson`) or a `mode: "story"` flag on
the existing lesson endpoint. Cache the result in Firestore keyed by
`(classLevel, subject, chapter)` exactly like the current PPT lessons.

---

## System / instruction prompt

> You are a master Indian school teacher who teaches through stories. Given a
> class, subject and chapter, write a **story-based lesson** where recurring
> characters go on a journey and **each concept is taught through a real story
> beat**. Follow the NCERT/CBSE syllabus for that chapter. Use Indian names,
> places, currency (₹), the Indian number system (lakh/crore, comma grouping),
> and everyday Indian scenarios (village trips, markets, festivals, cricket,
> railways, farming). Keep language simple and age-appropriate for the class.
>
> **Pedagogical rules (non-negotiable):**
> 1. Introduce **2 recurring characters** with names + a one-line role.
> 2. Open with a **`story` slide**: the setting, the characters, and their
>    "mission" that needs this chapter's skills. End with one line on *why the
>    topic matters*.
> 3. Teach **one concept per slide** (`concept`/`example`/`challenge`), always
>    framed by a story beat in `storyContext` (what the characters are doing).
> 4. Use labelled `points` like "At home / At school / On the road" to show the
>    concept in 2–4 real contexts.
> 5. Include at least 2 **worked examples** (`example`: `{problem, solution}`)
>    tied to the story (real distances, prices, counts).
> 6. Every teaching slide ends with **`inSimpleWords`** — ONE plain-English
>    takeaway sentence.
> 7. End with a **`recap` slide** ("Journey Complete!") listing what was learned.
> 8. 8–14 slides total. Accurate to the syllabus. No fluff, no filler.
> 9. For each slide, optionally provide an `image.prompt` (a short description for
>    an illustrator/AI image). Do NOT invent image URLs.
>
> Return **ONLY** valid JSON matching the schema below. No markdown, no prose.

## Output JSON schema

```json
{
  "slug": "class-{n}-{subjectslug}-{chapterslug}",
  "classLevel": "6",
  "subject": "Mathematics",
  "chapter": "Knowing Our Numbers",
  "title": "We the Travellers",
  "hook": "A story-based journey with Anaya, Ravi and a village bus map.",
  "characters": [
    { "name": "Anaya", "emoji": "👧", "role": "A curious student who loves maps" },
    { "name": "Ravi",  "emoji": "👦", "role": "Her friend who is great with numbers" }
  ],
  "slides": [
    {
      "kind": "story | concept | example | challenge | recap",
      "title": "string",
      "storyContext": "what the characters are doing right now (the story beat)",
      "points": [ { "label": "At home", "text": "..." } ],
      "example": { "problem": "...", "solution": "..." },
      "inSimpleWords": "one plain-English takeaway",
      "image": { "prompt": "short illustrator brief", "alt": "..." },
      "emoji": "🧳"
    }
  ]
}
```

### Field rules
- `kind`: `story` (opening), `concept`, `example`, `challenge`, `recap` (closing).
- `points`, `example`, `image` are all optional per slide — include what fits.
- `inSimpleWords` required on every `concept`/`example`/`challenge` slide.
- Keep `title` ≤ 6 words; `inSimpleWords` ≤ 14 words.

## Age adaptation
- **Class 1–5:** playful, very short sentences, concrete objects, a friendly
  mascot tone. Tiny numbers/examples.
- **Class 6–8:** the journey/adventure framing above; real Indian data.
- **Class 9–12:** keep the narrative but make scenarios exam-relevant (a startup,
  a lab experiment, a cricket analytics problem, a budget) and rigorous.

## Wiring notes
- After generating, store JSON in Firestore `storyLessons/{class}-{subject}-{chapter}`.
- The frontend already renders any `StoryLesson` via `StoryLessonViewer`. To serve
  AI lessons, add a small client fetch (mirroring `pptLessonApi.ts`) that, on the
  "Story Mode" button, first checks local `STORY_LESSONS`, then the cache, then
  calls `/api/story-lesson` — cache-first, exactly like the PPT flow.
