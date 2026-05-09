import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_IMAGE = 'https://syllab.in/manifest-icon-512.png';
const DEFAULT_URL = 'https://syllab.in/';

export default function SEO({ title, description, keywords, image = DEFAULT_IMAGE, url = DEFAULT_URL, type = 'website' }: SEOProps) {
  React.useEffect(() => {
    const finalTitle = title.toLowerCase().includes('syllab') ? title : `${title} | Syllab`;
    document.title = finalTitle;

    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
        document.head.appendChild(tag);
        return;
      }
      Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' });

    if (keywords) {
      setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    }

    setMeta('meta[property="og:title"]', { property: 'og:title', content: finalTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: finalTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

  }, [title, description, keywords, image, url, type]);

  return null;
}
