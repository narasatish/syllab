/**
 * deepContent — shared loader for the "deep body" content blocks used by the
 * /difference-between and /revision-notes clusters.
 *
 * The content itself lives in public/*.json and is FETCHED, never imported:
 * bundling it would put hundreds of KB of prose into a page chunk for every
 * visitor, including the ones who only open the hub. The prerenderer reads the
 * same files at build time, so the crawled HTML and the hydrated page show the
 * same content — a mismatch there would be cloaking, and would also throw away
 * the dwell time this content exists to earn.
 *
 * No JSX here on purpose: a module that exports both components and plain
 * functions breaks Fast Refresh, so the quiz component lives in QuizItem.tsx.
 */
import { useEffect, useState } from 'react';

export interface DeepQuiz { q: string; options: string[]; correct: number; why: string; }

export interface DeepTopic {
  ncertRef?: string;
  explainers?: { term: string; paras: string[] }[];
  sections?: { h: string; paras?: string[]; bullets?: string[] }[];
  examples?: { t: string; d: string }[];
  mistakes?: string[];
  diagrams?: { title: string; caption: string; alt: string; svg: string }[];
  applications?: { h: string; d: string }[];
  numericals?: { q: string; steps: string[]; answer: string }[];
  boardQuestions?: { q: string; marks: string; a: string }[];
  assertionReason?: { assertion: string; reason: string; answer: string; why: string }[];
  quiz?: DeepQuiz[];
  glossary?: { term: string; def: string }[];
  revision?: string[];
  extraFaqs?: { q: string; a: string }[];
}

type DeepMap = Record<string, DeepTopic>;

// Cached per URL so the two clusters never fetch each other's file, and so a
// second visit to any detail page in the same session costs no request.
const caches: Record<string, DeepMap> = {};
const promises: Record<string, Promise<DeepMap>> = {};

export function loadDeep(url: string): Promise<DeepMap> {
  if (caches[url]) return Promise.resolve(caches[url]);
  promises[url] ??= fetch(url)
    .then((r) => (r.ok ? r.json() : { topics: {} }))
    .then((j) => { caches[url] = j.topics || {}; return caches[url]; })
    .catch(() => ({}));
  return promises[url];
}

/** The deep entry for one slug, or null while loading / when there is none. */
export function useDeep(url: string, slug: string): DeepTopic | null {
  const [deep, setDeep] = useState<DeepTopic | null>(() => caches[url]?.[slug] ?? null);
  useEffect(() => {
    let live = true;
    loadDeep(url).then((all) => { if (live) setDeep(all[slug] ?? null); });
    return () => { live = false; };
  }, [url, slug]);
  return deep;
}
