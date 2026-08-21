/**
 * posters.mjs — the curated list of printable formula POSTERS (linkable assets).
 * One poster per high-demand whole-subject formula sheet — teachers print/share
 * them and bloggers link to them. Shared by gen-formula-poster.mjs (builds the
 * static HTML), generate-sitemap.mjs (adds the URLs) and generate-prerender.mjs
 * (promotes them from /formula-sheets). Slugs MUST match formulaSheets.ts.
 */
export const POSTER_SHEETS = [
  { slug: 'class-10-maths', label: 'Class 10 Maths', level: 'Class 10' },
  { slug: 'class-10-science', label: 'Class 10 Science (Physics)', level: 'Class 10' },
  { slug: 'class-11-maths', label: 'Class 11 Maths', level: 'Class 11' },
  { slug: 'class-11-physics', label: 'Class 11 Physics', level: 'Class 11' },
  { slug: 'class-11-chemistry', label: 'Class 11 Chemistry', level: 'Class 11' },
  { slug: 'class-12-maths', label: 'Class 12 Maths', level: 'Class 12' },
  { slug: 'class-12-physics', label: 'Class 12 Physics', level: 'Class 12' },
  { slug: 'class-12-chemistry', label: 'Class 12 Chemistry', level: 'Class 12' },
];

/**
 * Clean URL, no .html.
 *
 * Firebase serves this project with cleanUrls, so /posters/x-formulas.html is a
 * 301 to /posters/x-formulas. The eight links on /formula-sheets therefore each
 * sent readers and Googlebot through a redirect for no reason. The sitemap was
 * never affected — writeSitemap strips a trailing .html before emitting a <loc>,
 * which is why every one of the 2,741 sitemap URLs already returns 200.
 *
 * The file on disk keeps its .html name; only the link does not say so.
 */
export const posterHref = (slug) => `/posters/${slug}-formulas`;
