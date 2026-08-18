/**
 * aiHubTopics.mjs — single source of truth for the /ai-hub guide slugs used by
 * the sitemap + prerender scripts. Reads src/data/aiHub.ts (whose AI_TOPICS
 * array body is valid JSON) so the build can never drift from the app's actual
 * AI-hub pages. Returns [{ slug, title, desc }].
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function getAiHubTopics(root) {
  const file = path.join(root, 'src', 'data', 'aiHub.ts');
  const ts = readFileSync(file, 'utf8');
  const marker = 'AI_TOPICS: AiTopic[] = ';
  const s = ts.indexOf(marker);
  if (s < 0) return [];
  const from = s + marker.length;
  const e = ts.indexOf('\n];', from);
  if (e < 0) return [];
  const json = ts.slice(from, e + 2).trim(); // "[ ... ]"
  let arr;
  try { arr = JSON.parse(json); } catch { return []; }
    // Carry the WHOLE record. This used to project { slug, title, desc } only, so
  // 19 guides shipped their title and first sentence while 59,789 characters of
  // authored sections and their FAQs stayed in the file. The bank is valid JSON,
  // so there was never a parsing reason to drop them.
  return arr
    .filter((t) => t && t.slug)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      desc: String(t.intro || '').slice(0, 300),
      intro: t.intro || '',
      emoji: t.emoji || '',
      category: t.category || '',
      sections: Array.isArray(t.sections) ? t.sections : [],
      faqs: Array.isArray(t.faqs) ? t.faqs : [],
    }));
}
