/**
 * revealPrerendered.ts — show the reader what the crawler was already getting.
 *
 * Every page ships its body inside #prerender-seo: position:absolute, 1x1,
 * clip:rect(0,0,0,0), aria-hidden="true". That block exists so a crawler without
 * JavaScript can read the page (SSR was switched off in v288 because it shipped
 * a permanent spinner — see DEFAULT_SSR_ROUTES in generate-prerender.mjs), and
 * main.tsx used to delete it on mount.
 *
 * Deleting it meant every authored paragraph that the React components do not
 * happen to render themselves was visible to Googlebot and to nobody else.
 * Measured: 4,521 paragraphs across 1,880 pages exist nowhere in the client
 * bundle, so the app cannot be rendering them (scripts/audit-user-visible.mjs).
 * On /best-colleges/cse that is 1,726 crawler words against 791 the reader sees
 * — the rankings reach the reader, the explanation and the FAQs do not.
 *
 * So: keep the content, and put it on the page.
 *
 * Only the sections the app does NOT already show are kept. Each <h2> section is
 * tested against the visible text, so the college table the app renders itself
 * is dropped and "Choosing a Branch, Not Just a College" is kept. Without that
 * test this would double every listing on the site.
 *
 * Inline styles are stripped rather than carried over. The prerendered markup
 * hard-codes light-theme colours (color:#333 on white), and an inline style
 * beats any stylesheet — in dark mode the block would have been near-black text
 * on a near-black background. Styling comes from .prerender-prose in index.css
 * instead, which also gives wide tables their own horizontal scroll rather than
 * letting a 7-column table decide the page width on a phone.
 */

const norm = (s: string | null) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Run once the React tree is actually on the page.
 *
 * createRoot().render() commits asynchronously, so a setTimeout(0) callback
 * runs while #root still holds only the boot skeleton. Revealing then did two
 * wrong things at once: every section looked "not already visible" because
 * nothing was visible yet, and the section was appended into #root a moment
 * before React replaced #root's children and threw it away. The net effect was
 * indistinguishable from the old delete-and-forget behaviour, which is why it
 * took a browser to notice.
 *
 * Polling for the app's own <footer> is the signal that the commit has landed.
 * setTimeout rather than requestAnimationFrame: rAF is suspended while a tab is
 * hidden, and a page opened in a background tab must not be left with an
 * invisible block in the DOM until someone focuses it.
 */
export function revealPrerenderedProseWhenReady(tries = 40): void {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('prerender-seo')) return;
  if (document.querySelector('#root footer') || tries <= 0) {
    revealPrerenderedProse();
    return;
  }
  setTimeout(() => revealPrerenderedProseWhenReady(tries - 1), 100);
}

export function revealPrerenderedProse(): void {
  const block = document.getElementById('prerender-seo');
  if (!block) return;

  try {
    const source: Element = block.querySelector('article') || block;

    // What a reader can already see — everything except the hidden block.
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelector('#prerender-seo')?.remove();
    const visible = norm(clone.textContent);

    /**
     * Split the prerendered body into <h2> sections.
     *
     * Walk from each <h2> along its own siblings, rather than over the
     * article's direct children. buildBodyContent wraps richContent in a
     * plain <div>, so on most pages no <h2> is a child of <article> at all —
     * splitting at that level found zero sections, kept nothing, and silently
     * deleted the block exactly as before. Anchoring on the headings
     * themselves works whatever they are nested in.
     */
    type Section = { heading: string; nodes: Node[] };
    const sections: Section[] = [];
    for (const h of Array.from(source.querySelectorAll('h2'))) {
      const nodes: Node[] = [h];
      let sib = h.nextSibling;
      while (sib) {
        if (sib.nodeType === 1 && (sib as Element).tagName === 'H2') break;
        nodes.push(sib);
        sib = sib.nextSibling;
      }
      sections.push({ heading: norm(h.textContent), nodes });
    }

    // Drop anything the reader already has, and anything too short to identify.
    const keep = sections.filter((s) => s.heading.length > 3 && !visible.includes(s.heading));

    block.remove();
    if (!keep.length) return;

    const wrap = document.createElement('section');
    wrap.className = 'prerender-prose';
    wrap.setAttribute('aria-label', 'More about this page');
    for (const s of keep) for (const n of s.nodes) wrap.appendChild(n);

    // Inline styles carry the prerenderer's light-theme palette; drop them.
    wrap.removeAttribute('style');
    wrap.querySelectorAll<HTMLElement>('[style]').forEach((el) => el.removeAttribute('style'));

    // A wide table scrolls inside its own box instead of widening the page.
    wrap.querySelectorAll('table').forEach((t) => {
      const scroller = document.createElement('div');
      scroller.className = 'prerender-prose__scroll';
      t.parentNode?.insertBefore(scroller, t);
      scroller.appendChild(t);
    });

    // Below the app's own content, above its footer — appending after the
    // footer would put body copy underneath the site furniture.
    const footer = document.querySelector('#root footer');
    if (footer?.parentElement) footer.parentElement.insertBefore(wrap, footer);
    else document.getElementById('root')?.appendChild(wrap);
  } catch {
    // Never let a presentation nicety break the page: fall back to the old
    // behaviour of simply removing the block.
    document.getElementById('prerender-seo')?.remove();
  }
}
