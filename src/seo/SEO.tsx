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

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Syllab" />
      <meta property="og:locale" content="en_IN" />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}

      <meta name="author" content="Syllab.in" />
      <meta property="og:site_name" content="Syllab.in" />
      {!image ? <meta property="og:image" content="https://syllab.in/og-image.svg" /> : null}
      {!image ? <meta name="twitter:image" content="https://syllab.in/og-image.svg" /> : null}

      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ) : null}
    </Helmet>
  );
}
