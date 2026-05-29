/**
 * Content generator — uses Gemini to produce post text for a given template.
 * Falls back to a curated static pool if no API key is set (offline mode).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = JSON.parse(readFileSync(path.join(__dirname, 'post-templates.json'), 'utf8')).templates;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-latest';

/* ───── Fallback content pools (used when GEMINI_API_KEY is not set) ───── */
const FALLBACK_CONTENT = {
  question: {
    classLevel: 8,
    subject: 'Maths',
    question: 'What is the value of √144 + √169?',
    a: '23',
    b: '25',
    c: '27',
    d: '29',
    answer: 'B',
    explanation: '√144 = 12, √169 = 13. So 12 + 13 = 25.',
  },
  puzzle: {
    puzzle: 'If two pencils cost ₹15, three notebooks cost ₹90, and one eraser costs ₹5, how much for 4 pencils + 2 notebooks + 3 erasers?',
    hint: 'Find per-unit price first, then multiply.',
    solution: 'Pencil = ₹7.50, Notebook = ₹30, Eraser = ₹5. Total = 30 + 60 + 15 = ₹105.',
  },
  gk: {
    question: 'Who designed the Indian National Flag?',
    a: 'Pingali Venkayya',
    b: 'Mahatma Gandhi',
    c: 'Rabindranath Tagore',
    d: 'Bal Gangadhar Tilak',
    answer: 'A',
    fact: 'Pingali Venkayya, an Andhra Pradesh native, designed the Indian flag in 1921. The Ashoka Chakra was added later in 1947.',
  },
  info: {
    subject: 'Biology',
    tip: 'Draw every NCERT diagram by hand TWICE — once while reading, once during revision. Label every part in pencil first, then ink.',
    why: 'Boards give 2-3 marks for labelled diagrams. Visual memory is 65% stronger than text-only memory.',
  },
  news: {
    headline: 'CBSE confirms two-board-exam policy for 2026',
    summary: 'Class 10 students will now have two attempts — February and May. Best score of the two will be considered.',
    action: 'Plan your study schedule for both windows. Focus on weak chapters between attempts.',
  },
  motivation: {
    headline: 'Your weakest subject is your biggest opportunity',
    body: 'A topper isn\'t someone who\'s good at every subject — they\'re someone who refused to stay weak at any. The chapter you avoid is the chapter that\'s holding back your rank.',
    action: 'Pick your weakest subject. Spend 30 minutes on it RIGHT NOW.',
  },
  coding: {
    language: 'Python',
    tip: 'Use f-strings (formatted strings) — cleaner and faster than .format() or +.',
    code: 'name = "Priya"\nmarks = 92\nprint(f"{name} scored {marks}%")',
    prevents: 'Confusing concatenation bugs when mixing strings and numbers.',
  },
};

/**
 * Call Gemini API to generate content for a given template.
 * Returns parsed JSON matching template's caption variables.
 */
async function callGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not set');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const fullPrompt = `${prompt}\n\nReturn ONLY a JSON object with the required keys. No markdown fences, no commentary.`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature: 0.9, responseMimeType: 'application/json' },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  try {
    return JSON.parse(text.trim().replace(/^```json\n?|\n?```$/g, ''));
  } catch (e) {
    throw new Error(`Failed to parse Gemini JSON output: ${text.slice(0, 200)}`);
  }
}

/**
 * Pick a template by id, or a random one if id not given.
 */
export function pickTemplate(id) {
  if (id) return TEMPLATES.find((t) => t.id === id);
  return TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
}

/**
 * Generate content for a template. Returns { template, content, caption }.
 */
export async function generateContent(templateOrId) {
  const template = typeof templateOrId === 'string' ? pickTemplate(templateOrId) : (templateOrId || pickTemplate());
  if (!template) throw new Error('No template found');

  let content;
  if (GEMINI_API_KEY) {
    try {
      // Replace placeholders in prompt with random concrete values
      const classLevel = 5 + Math.floor(Math.random() * 8); // 5-12
      const subjects = ['Maths', 'Science', 'English', 'Social Studies'];
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const filledPrompt = template.prompt
        .replace(/{classLevel}/g, String(classLevel))
        .replace(/{subject}/g, subject);
      content = await callGemini(filledPrompt);
      console.log(`[content] Generated via Gemini for ${template.id}`);
    } catch (err) {
      console.warn('[content] Gemini failed, using fallback:', err.message);
      content = FALLBACK_CONTENT[template.type] || FALLBACK_CONTENT.question;
    }
  } else {
    console.log(`[content] No GEMINI_API_KEY — using fallback for ${template.id}`);
    content = FALLBACK_CONTENT[template.type] || FALLBACK_CONTENT.question;
  }

  // Build caption by filling template
  let caption = template.captionTemplate;
  for (const [key, value] of Object.entries(content)) {
    caption = caption.split(`{${key}}`).join(String(value));
  }

  return { template, content, caption };
}

// CLI test
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const id = process.argv[2];
  generateContent(id).then((r) => {
    console.log('Template:', r.template.id);
    console.log('Content:', JSON.stringify(r.content, null, 2));
    console.log('\nCaption:\n', r.caption);
  }).catch((e) => console.error('Error:', e.message));
}
