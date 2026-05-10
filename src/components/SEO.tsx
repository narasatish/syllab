import SEO, { SEOProps } from '../seo/SEO';

type LegacySEOProps = Omit<SEOProps, 'url'> & {
  url?: string;
};

export default function LegacySEO({ url = 'https://YOUR_DOMAIN_HERE/', ...props }: LegacySEOProps) {
  // TODO: Add /og-image.png before production and pass it as image where appropriate.
  return <SEO url={url} {...props} />;
}
