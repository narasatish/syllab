import { Helmet } from 'react-helmet-async';

export type SEOType = 'website' | 'article';

export interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: SEOType;
  keywords?: string;
}

export default function SEO({
  title,
  description,
  url,
  image,
  type = 'website',
  keywords,
}: SEOProps) {
  const finalTitle = title.toLowerCase().includes('syllab') ? title : `${title} | Syllab`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  );
}
