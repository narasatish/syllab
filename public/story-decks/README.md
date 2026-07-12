# Story-PPT decks (owner uploads)

Each chapter's PPT, exported as slide images, lives in its own folder here. The build
step `scripts/ingest-story-decks.mjs` scans this folder and wires every deck to its
chapter's **Lesson** button on the Syllabus page (taking priority over the
auto-generated story lesson).

## Folder naming

```
public/story-decks/class-{n}-{chapter-slug}/Slide1.png, Slide2.png, …
```

Examples:
- `class-3-multiplication/`
- `class-6-lines-and-angles/`

The slug is the chapter name lowercased with hyphens (matches the Chapter Name column
in `docs/syllabus-chapters.csv`). Slide order is taken from the number in each filename
(`Slide1`, `Slide2`, … `Slide10`).

## How to export from PowerPoint

File → Export → Change File Type → **PNG** → **All Slides**. PowerPoint writes
`Slide1.PNG, Slide2.PNG, …` — drop that folder here (renamed `class-{n}-{slug}`).

PNG or JPG both work. Run `npm run build:decks` to refresh the manifest after adding decks.
