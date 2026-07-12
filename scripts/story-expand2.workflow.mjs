export const meta = {
  name: 'story-expand-2',
  description: 'Expand remaining story lessons to teach each topic both ways (preserve images; new slides stay imageless)',
  phases: [{ title: 'Expand', detail: 'one agent per pending <=3-lesson file' }],
};

const FILES = ["class-xp-053.json","class-xp-061.json","class-xp-062.json","class-xp-173.json"];
const DIR = 'C:/Users/naras/OneDrive/Desktop/syllab/src/data/story-gen/';

const prompt = (f) => [
  'Expand existing Syllab story-lessons so each topic is taught BOTH ways (narrative + structured), richer and deeper.',
  'FILE: ' + DIR + f + ' — a JSON array of up to 3 StoryLesson objects.',
  'For EACH lesson, expand to 26-34 slides (currently ~10):',
  '1. PRESERVE every existing slide EXACTLY, copying its existing "image" field character-for-character. Never modify or drop an existing slide or its image.',
  '2. ADD new slides so every key sub-topic is taught in BOTH styles with NO repeated content: a story beat (narrative, recurring Indian characters) AND a concept slide (definition/formula/structured breakdown) AND a worked example for important ideas, plus 1-2 challenge slides. Interleave story -> concept -> example. Keep one title, one recap.',
  '3. CRITICAL: do NOT add any "image" field to the NEW slides you create, and never invent/guess an image URL. New slides must have NO image key at all (the viewer styles them). Only the original slides keep their images.',
  '4. Curriculum-accurate; no filler, no padding, no duplicated text.',
  'SCHEMA per slide: { "kind":"title|story|concept|example|challenge|recap", "title", "storyContext"?, "points"?:[{"label"?,"text"}], "example"?:{"problem","solution"}, "inSimpleWords"?, "emoji"? } (plus "image" ONLY on preserved original slides). Keep each lesson slug, classLevel, subject, chapter, title, hook, characters UNCHANGED.',
  'JSON CORRECTNESS: inSimpleWords is a STRING ending quote+comma (never quote+brace); example is an object closed brace+comma; emoji is a sibling key; no trailing commas; double quotes; escape inner quotes.',
  'Use the Write tool to OVERWRITE the same file with the updated JSON array. ONLY valid JSON, no fences/prose. Verify JSON.parse succeeds and each lesson now has >=26 slides. Return one line: per-lesson before->after counts.'
].join(String.fromCharCode(10,10));

phase('Expand');
log('Expanding ' + FILES.length + ' remaining lesson files');
const results = await parallel(FILES.map((f) => () =>
  agent(prompt(f), { label: 'expand:' + f, phase: 'Expand', agentType: 'general-purpose' })
    .then(() => ({ f, ok: true })).catch(() => ({ f, ok: false }))
));
return { attempted: results.length, failed: results.filter((r) => !r.ok).map((r) => r.f) };
