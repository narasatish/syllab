import { readFileSync, writeFileSync } from 'node:fs';
const chunks = JSON.parse(readFileSync('src/data/story-gen/_chunks.json', 'utf8'));
const NL = 'String.fromCharCode(10,10)';
const body = `export const meta = {
  name: 'story-lessons-bulk',
  description: 'Author remaining CBSE/NCERT story lessons for classes 1-12 (345 chapters)',
  phases: [{ title: 'Author', detail: 'one agent per <=7-chapter chunk writes a JSON file' }],
};

const CHUNKS = ${JSON.stringify(chunks)};
const SPEC = 'C:/Users/naras/OneDrive/Desktop/syllab/scripts/story-author-spec.md';
const OUTDIR = 'C:/Users/naras/OneDrive/Desktop/syllab/src/data/story-gen/';

const prompt = (c) => [
  'Read the spec at ' + SPEC + ' and follow it EXACTLY.',
  'Author story lessons for Class ' + c.cls + ', subject "' + c.subject + '" (CBSE/NCERT). Use REAL curriculum-accurate content with the right rigor for the class (lower classes simple and playful; classes 9-12 full rigor with real definitions, formulas, and worked examples). No generic filler.',
  'The JSON array MUST contain EXACTLY ' + c.chapters.length + ' lesson objects, one per chapter below, in order. Do NOT merge chapters into one lesson. Do NOT add extras. 9-11 slides each, recurring Indian characters, Indian daily-life examples.',
  'Chapters (' + c.chapters.length + '): ' + JSON.stringify(c.chapters),
  'slug = class-' + c.cls + '-' + c.subjectSlug + '-{chapterSlug}; subject EXACTLY "' + c.subject + '"; chapter EXACTLY as written.',
  'JSON CORRECTNESS: each slide object has keys kind,title,storyContext,points,example,inSimpleWords,emoji. inSimpleWords is a STRING (ends with quote then comma, never quote then brace); example is an object closed with brace then comma; emoji is a sibling key of the slide (not inside example or points); no trailing commas; double quotes only; escape any inner double-quote with a backslash.',
  'Use the Write tool to save the SINGLE valid JSON array to ' + OUTDIR + c.file + ' — ONLY the JSON array, no fences, no prose. Verify JSON.parse would succeed and the array length equals ' + c.chapters.length + '. Return one line: count + filename.'
].join(${NL});

phase('Author');
log('Authoring ' + CHUNKS.length + ' chunks (' + CHUNKS.reduce((n,c)=>n+c.chapters.length,0) + ' chapters)');
const results = await parallel(CHUNKS.map((c) => () =>
  agent(prompt(c), { label: 'author:' + c.file, phase: 'Author', agentType: 'general-purpose' })
    .then(() => ({ file: c.file, ok: true }))
    .catch(() => ({ file: c.file, ok: false }))
));
const failed = results.filter((r) => !r.ok).map((r) => r.file);
return { attempted: results.length, failedLaunch: failed };
`;
writeFileSync('scripts/story-bulk.workflow.mjs', body);
console.log('written bytes:', body.length);
