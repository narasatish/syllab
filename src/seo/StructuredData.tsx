/**
 * JSON-LD as plain JSX — see the note in SEO.tsx. Using react-helmet-async
 * alongside React 19 emitted every tag twice; React 19 renders and manages this
 * script itself. JSON-LD is valid anywhere in the document, so it does not need
 * to be hoisted into <head>.
 */
interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON.stringify output of our own data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
