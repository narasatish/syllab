import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1'} />
      <link rel="canonical" href={url} />

      {/* hreflang for localization */}
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Syllab.in" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@syllabdotin" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="author" content="Syllab.in" />

      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      ) : null}
    </Helmet>
  );
}
