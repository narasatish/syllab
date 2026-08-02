/**
 * SEO.tsx — single source of truth for a page's head tags on the CLIENT.
 *
 * Why this is imperative instead of JSX/Helmet:
 *   Every page is prerendered, and the prerender injects a complete static head
 *   block (title, description, canonical, OG, Twitter…). Anything that *renders*
 *   metadata — react-helmet-async, or React 19's native <title>/<meta> hoisting —
 *   does not know those static tags exist, so it ADDS a second copy of each. With
 *   Helmet AND React 19 both doing it, a real session ended up with 2 <title>,
 *   3 <meta name="description"> and 2 <link rel="canonical">, which external SEO
 *   auditors flag as critical duplicate-metadata errors.
 *
 *   Upserting by selector fixes it at the root: we look for the existing tag and
 *   UPDATE it, only creating one if it is genuinely absent. Prerendered HTML stays
 *   authoritative for crawlers that do not run JS, the client keeps it in sync on
 *   SPA navigation, and there is always exactly one of each tag.
 *
 * Renders nothing. Runs only in the browser (no-op during SSR/prerender, which is
 * correct — the prerender writes the head itself).
 */
import { useEffect } from 'react';

export type SEOType = 'website' | 'article';

export interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: SEOType;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const DEFAULT_IMAGE = 'https://syllab.in/og-image.png';

/** Update the tag matching `selector`, creating it (with `create`) only if missing. */
function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

function meta(attr: 'name' | 'property', key: string, content: string) {
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    },
    (el) => el.setAttribute('content', content),
  );
}

function link(rel: string, href: string) {
  upsert(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    },
    (el) => el.setAttribute('href', href),
  );
}

export default function SEO({
  title,
  description,
  url,
  image,
  type = 'website',
  keywords,
  jsonLd,
  noindex = false,
}: SEOProps) {
  const finalTitle = title.toLowerCase().includes('syllab') ? title : `${title} | Syllab`;
  const finalImage = image || DEFAULT_IMAGE;
  const imageAlt = `${finalTitle} — Syllab.in`;
  const serialisedLd = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = finalTitle;

    meta('name', 'description', description);
    if (keywords) meta('name', 'keywords', keywords);
    meta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1');
    meta('name', 'author', 'Syllab.in');
    link('canonical', url);

    meta('property', 'og:title', finalTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('property', 'og:type', type);
    meta('property', 'og:site_name', 'Syllab.in');
    meta('property', 'og:locale', 'en_IN');
    meta('property', 'og:image', finalImage);
    meta('property', 'og:image:width', '1200');
    meta('property', 'og:image:height', '630');
    meta('property', 'og:image:type', 'image/png');
    meta('property', 'og:image:alt', imageAlt);

    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', finalTitle);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', finalImage);
    meta('name', 'twitter:image:alt', imageAlt);

    // Page-level JSON-LD gets its own slot so it replaces (never stacks with) the
    // previous page's block. Prerendered JSON-LD without this id is left alone.
    const existing = document.head.querySelector('script[data-seo-jsonld]');
    if (serialisedLd) {
      if (existing) existing.textContent = serialisedLd;
      else {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-jsonld', '');
        s.textContent = serialisedLd;
        document.head.appendChild(s);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [finalTitle, description, url, finalImage, imageAlt, type, keywords, noindex, serialisedLd]);

  return null;
}
