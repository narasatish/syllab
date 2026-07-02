/**
 * Story-based lessons — narrative teaching where recurring characters go on a
 * journey and each concept is taught through a real story beat. Modelled on the
 * "We the Travellers" sample. These are hand/AI-authored DATA (frontend, no
 * backend needed); the StoryLessonViewer renders them. The same schema is what
 * the backend generation prompt (docs/story-lesson-backend-prompt.md) emits, so
 * authored lessons and AI-generated ones render identically.
 */

import { STORY_LESSONS_INDEX } from './storyLessonsIndex';

export interface StoryCharacter {
  name: string;
  emoji?: string;
  /** One line: who they are. */
  role: string;
}

export interface StoryPoint {
  /** Optional mini-heading, e.g. "At home", "At school", "On the road". */
  label?: string;
  text: string;
}

export interface StorySlide {
  kind: 'title' | 'story' | 'concept' | 'example' | 'challenge' | 'recap';
  title: string;
  /** Narrative beat that frames the concept (the "story" part). */
  storyContext?: string;
  /** Teaching points, optionally labelled. */
  points?: StoryPoint[];
  /** A worked example tied to the story. */
  example?: { problem: string; solution: string };
  /** The one-line "In simple words:" takeaway. */
  inSimpleWords?: string;
  /** Optional illustrative image (real photo or AI image) — prompt is for gen. */
  image?: { url?: string; alt?: string; prompt?: string };
  emoji?: string;
}

export interface StoryLesson {
  /** `class-{n}-{subjectSlug}-{chapterSlug}` — matches the chapter it teaches. */
  slug: string;
  classLevel: string;
  subject: string;
  chapter: string;
  /** Other chapter titles this lesson should also attach to (board naming varies). */
  chapterAliases?: string[];
  /** The story's title, e.g. "We the Travellers". */
  title: string;
  /** One-line premise shown on the cover. */
  hook: string;
  characters: StoryCharacter[];
  slides: StorySlide[];
}

export const STORY_LESSONS: StoryLesson[] = [
  {
    slug: 'class-6-maths-knowing-our-numbers',
    classLevel: '6',
    subject: 'Mathematics',
    chapter: 'Knowing Our Numbers',
    chapterAliases: ['Large Numbers', 'Numbers', 'Whole Numbers', 'Number System', 'Knowing our Numbers', 'Patterns in Mathematics'],
    title: 'We the Travellers',
    hook: 'A story-based journey with Anaya, Ravi and a village bus map.',
    characters: [
      { name: 'Anaya', emoji: '👧', role: 'A curious student who loves maps' },
      { name: 'Ravi', emoji: '👦', role: 'Her friend who is great with numbers' },
    ],
    slides: [
      {
        kind: 'story',
        title: 'Story Time: The Village Trip',
        storyContext: 'Anaya and Ravi live in a village near Rajahmundry. Their school is planning a trip to a science fair.',
        points: [
          { label: 'Their mission', text: 'They must read distances, compare routes and find the total journey.' },
          { label: 'Why math?', text: 'Numbers become useful when we use them for real travel plans.' },
        ],
        inSimpleWords: 'Math helps us plan real journeys.',
        emoji: '🧳',
      },
      {
        kind: 'concept',
        title: 'The Travel Board',
        storyContext: 'At the bus stand, Anaya reads a big board full of numbers.',
        points: [
          { label: 'Distance to town', text: '25 km' },
          { label: 'Distance to Hyderabad', text: '420 km' },
          { label: 'People at the fair', text: '1,00,000' },
          { label: 'Tickets sold', text: '25,000' },
        ],
        inSimpleWords: 'A big number tells us “how many” or “how far”.',
        emoji: '🚏',
      },
      {
        kind: 'concept',
        title: 'Big Numbers in a Journey',
        storyContext: 'Ravi wonders — why do we even need lakhs?',
        points: [
          { label: 'At home', text: 'Amma says: “More than 1,00,000 people may visit the fair!”' },
          { label: 'At school', text: 'Teacher writes: 25,000 students joined the road-safety rally.' },
          { label: 'On the road', text: 'The distance board says: Delhi 1,562 km.' },
        ],
        inSimpleWords: 'Lakhs help us talk about very large counts.',
        emoji: '🔢',
      },
      {
        kind: 'concept',
        title: 'The Place Value House',
        storyContext: 'Anaya draws a house where every digit gets its own room.',
        points: [
          { text: 'Lakhs · Ten-Thousands · Thousands · Hundreds · Tens · Ones' },
          { text: 'In 1,25,436 → 1 lakh, 2 ten-thousands, 5 thousands, 4 hundreds, 3 tens, 6 ones.' },
        ],
        example: { problem: 'What does 1,25,436 mean?', solution: 'One lakh, twenty-five thousand, four hundred thirty-six.' },
        inSimpleWords: 'Place value tells the value of each digit.',
        emoji: '🏠',
      },
      {
        kind: 'concept',
        title: 'Read Numbers Like a Traveller',
        storyContext: 'Ravi reads the festival figures out loud, slowly.',
        points: [
          { label: '25,000', text: 'Twenty-five thousand students visited the exhibition.' },
          { label: '1,00,000', text: 'One lakh people came to the festival ground.' },
          { label: '4,20,000', text: 'Four lakh twenty thousand tickets were printed.' },
        ],
        inSimpleWords: 'Commas make large Indian numbers easy to read.',
        emoji: '🗣️',
      },
      {
        kind: 'example',
        title: 'Subtracting Distances',
        storyContext: 'Halfway through, Anaya asks: how much of the trip is left?',
        example: { problem: 'The fair is 145 km away. The bus has covered 60 km. How far is left?', solution: '145 − 60 = 85 km left.' },
        inSimpleWords: 'Subtract to find what is still left.',
        emoji: '➖',
      },
      {
        kind: 'challenge',
        title: 'Village Market Challenge',
        storyContext: 'Help Ravi pick the shorter route to the market.',
        points: [
          { label: 'Route A', text: 'Village → Bridge → Market = 18 km + 12 km = 30 km' },
          { label: 'Route B', text: 'Village → Temple → Market = 20 km + 8 km = 28 km' },
        ],
        example: { problem: 'Which route is shorter?', solution: 'Route B (28 km) is shorter than Route A (30 km).' },
        inSimpleWords: 'Compare totals to choose the shorter route.',
        emoji: '🛒',
      },
      {
        kind: 'recap',
        title: 'Journey Complete!',
        storyContext: 'Anaya and Ravi reach the science fair — and look how much maths they used.',
        points: [
          { text: 'Large numbers help describe big journeys.' },
          { text: 'Place value helps us read numbers.' },
          { text: 'Addition and subtraction solve route problems.' },
          { text: 'Comparing totals helps us choose the best route.' },
        ],
        inSimpleWords: 'Travelling becomes easier when we understand numbers.',
        emoji: '🎉',
      },
    ],
  },
];

/*
 * PERF: generated lessons (~14MB of JSON) are NOT bundled. A tiny metadata index
 * (STORY_LESSONS_INDEX) answers "does this chapter have a story?" synchronously;
 * the full lesson is fetched from /story-lessons/class-{n}.json on demand and
 * memoised per class. Hand-authored STORY_LESSONS stay bundled (they're tiny).
 */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function matches(l: { classLevel: string; subject: string; chapter: string; chapterAliases?: string[] }, cls: string, subject?: string, chapter?: string): boolean {
  if (l.classLevel !== cls || !chapter) return false;
  const subjOk = !subject || norm(l.subject) === norm(subject) || norm(l.subject).startsWith(norm(subject).slice(0, 4));
  if (!subjOk) return false;
  return [l.chapter, ...(l.chapterAliases || [])].map(norm).includes(norm(chapter));
}

/** Synchronous: does a story lesson exist for this chapter? (index lookup) */
export function hasStoryLesson(classLevel?: string, subject?: string, chapter?: string): boolean {
  if (!classLevel || !chapter) return false;
  const cls = String(classLevel).replace(/[^0-9]/g, '');
  return STORY_LESSONS.some((l) => matches(l, cls, subject, chapter))
    || STORY_LESSONS_INDEX.some((l) => matches(l, cls, subject, chapter));
}

/** Memoised per-class fetch of the full lesson data. */
const classCache = new Map<string, Promise<StoryLesson[]>>();
function loadClass(cls: string): Promise<StoryLesson[]> {
  let p = classCache.get(cls);
  if (!p) {
    p = fetch(`/story-lessons/class-${cls}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<StoryLesson[]>) : []))
      .catch(() => { classCache.delete(cls); return []; });
    classCache.set(cls, p);
  }
  return p;
}

/** Async: load the full story lesson for a chapter (null if none). */
export async function loadStoryLesson(classLevel?: string, subject?: string, chapter?: string): Promise<StoryLesson | null> {
  if (!classLevel || !chapter) return null;
  const cls = String(classLevel).replace(/[^0-9]/g, '');
  const hand = STORY_LESSONS.find((l) => matches(l, cls, subject, chapter));
  if (hand) return hand;
  const entry = STORY_LESSONS_INDEX.find((l) => matches(l, cls, subject, chapter));
  if (!entry) return null;
  const lessons = await loadClass(cls);
  return lessons.find((l) => l.slug === entry.slug) || null;
}
