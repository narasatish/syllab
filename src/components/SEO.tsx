import SEO, { SEOProps } from '../seo/SEO';

type LegacySEOProps = Omit<SEOProps, 'url'> & {
  url?: string;
};

export default function LegacySEO({ url = 'https://syllab.in/', ...props }: LegacySEOProps) {
  // og:image defaults to https://syllab.in/og-image.png (PNG, 1200×630) in ../seo/SEO;
  // pages can override via the `image` prop (per-section OG PNGs).
  return <SEO url={url} {...props} />;
}
