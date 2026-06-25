/**
 * scrollReveal.ts — tiny, dependency-free scroll-in animations.
 *
 * Any element with class `reveal` / `reveal-zoom` / `reveal-stagger` fades/slides
 * into view once when it enters the viewport (CSS does the motion via `.is-visible`;
 * see index.css). Uses ONE shared IntersectionObserver + a MutationObserver so it
 * keeps working across SPA route changes without re-wiring per page.
 *
 * Performance: observers are passive and cheap; animations are transform/opacity
 * only (GPU-composited). Respects prefers-reduced-motion (reveals immediately).
 */

const SELECTOR = '.reveal, .reveal-zoom, .reveal-stagger';

let io: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.classList.add('is-visible');
  io?.unobserve(el);
}

function observeAll(root: ParentNode = document) {
  if (!io) return;
  root.querySelectorAll?.(SELECTOR).forEach((el) => {
    if (!el.classList.contains('is-visible')) io!.observe(el);
  });
}

export function initScrollReveal() {
  if (typeof window === 'undefined' || io) return; // run once, browser only

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (reduce || !('IntersectionObserver' in window)) {
    // No motion (or no IO support): reveal everything immediately, now and forever.
    document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('is-visible'));
    new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => {
        if (n.nodeType === 1) {
          const el = n as Element;
          if (el.matches?.(SELECTOR)) el.classList.add('is-visible');
          el.querySelectorAll?.(SELECTOR).forEach((c) => c.classList.add('is-visible'));
        }
      });
    }).observe(document.body, { childList: true, subtree: true });
    return;
  }

  // Belt-and-suspenders: the inline head script normally sets this pre-paint, but
  // ensure the hidden-gate is on so reveals can animate even if that was stripped.
  document.documentElement.classList.add('js-reveal');

  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );

  observeAll();

  // Failsafe: if anything is still hidden a few seconds after load (IO missed it,
  // tab backgrounded, etc.), reveal it so content is never stuck invisible.
  const revealRemaining = () => document.querySelectorAll(`${SELECTOR}:not(.is-visible)`).forEach(reveal);
  window.addEventListener('load', () => setTimeout(revealRemaining, 2500), { once: true });

  // Pick up elements added by client-side navigation / lazy sections.
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        const el = n as Element;
        if (el.matches?.(SELECTOR) && !el.classList.contains('is-visible')) io!.observe(el);
        observeAll(el);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
