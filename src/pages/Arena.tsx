// ONLY SHOWING CRITICAL CHANGE PART

import { generateQuestions } from "../lib/api";

/* REMOVE THIS ENTIRE BLOCK
const API_BASE = (() => {...})
*/

async function fetchAIBatch(
  classLevel,
  subject,
  chapterTitle,
  chapterId,
  difficulty,
  count,
  onProgress
) {
  const CHUNK = 10;
  const chunks = [];
  let remaining = count;

  while (remaining > 0) {
    chunks.push(Math.min(CHUNK, remaining));
    remaining -= CHUNK;
  }

  let done = 0;

  const results = await Promise.all(
    chunks.map(async (size) => {
      try {
        const data = await generateQuestions({
          classLevel,
          subject,
          chapter: chapterTitle,
          chapterId,
          difficulty,
          count: size,
        });

        done++;
        onProgress?.(done, chunks.length);

        return data.questions || [];
      } catch (err) {
        done++;
        onProgress?.(done, chunks.length);
        console.error("Chunk failed:", err);
        return [];
      }
    })
  );

  return results.flat();
}