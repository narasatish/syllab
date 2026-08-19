#!/usr/bin/env node
/**
 * gen-hindi-pages.mjs — builds the Hindi (हिन्दी) concept pages as standalone
 * static HTML (like the formula posters). Firebase Hosting serves the physical
 * file directly, so users AND crawlers get real Hindi content — no SPA i18n, no
 * cloaking. Each page carries reciprocal hreflang with its English counterpart.
 *
 * Output: public/hi/concepts/{slug}/index.html  →  served at /hi/concepts/{slug}
 * Regenerate after editing hindi-concepts.mjs:  node scripts/gen-hindi-pages.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HINDI_CONCEPTS } from './hindi-concepts.mjs';
import { HINDI_BOARDS } from './hindi-boards.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://syllab.in';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildPage(c) {
  const hiUrl = `${SITE}/hi/concepts/${c.slug}`;
  const enUrl = `${SITE}/concepts/${c.slug}`;
  const faqHtml = c.faqs.map((f) => `
      <div class="faq">
        <h3>${esc(f.q)}</h3>
        <p>${esc(f.a)}</p>
      </div>`).join('');
  // Optional teaching body. These pages carried only an intro and FAQs — about
  // 200 words — yet two of them hold page-one positions in the 2026-08-13 GSC
  // export (ohmic-non-ohmic-conductors at 6.2, power-of-a-lens at 9.4). Ranking
  // that well on that little says the Hindi queries are barely contested, so
  // depth here is worth more than anywhere else on the site.
  const sectionsHtml = (c.sections || []).map((s) => `
      <section>
        <h2>${esc(s.h)}</h2>
        ${(s.paras || []).map((p) => `<p>${esc(p)}</p>`).join('')}
        ${(s.points || []).length ? `<ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      </section>`).join('');
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'LearningResource',
      name: c.title, description: c.intro,
      educationalLevel: c.level, inLanguage: 'hi-IN', isAccessibleForFree: true,
      learningResourceType: 'Concept explainer', url: hiUrl,
      provider: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      inLanguage: 'hi-IN',
      mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)} (${esc(c.level)}) — मुफ़्त हिन्दी नोट्स | Syllab.in</title>
<meta name="description" content="${esc(c.intro.slice(0, 155))}">
<meta name="keywords" content="${esc(c.title)}, ${esc(c.subject)} ${esc(c.level)} हिन्दी नोट्स, ${esc(c.slug.replace(/-/g, ' '))} in hindi">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${hiUrl}">
<link rel="alternate" hreflang="hi-IN" href="${hiUrl}">
<link rel="alternate" hreflang="en-IN" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta property="og:title" content="${esc(c.title)} — मुफ़्त हिन्दी नोट्स">
<meta property="og:description" content="${esc(c.intro.slice(0, 155))}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:url" content="${hiUrl}">
<meta property="og:type" content="article">
<meta property="og:locale" content="hi_IN">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans', 'Segoe UI', system-ui, sans-serif; background: #f8fafc; color: #0f172a; line-height: 1.7; }
  .bar { background: #059669; color: #fff; padding: 10px 16px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .bar a { color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; }
  .bar .sp { flex: 1; }
  .bar .en { background: #fff; color: #047857; padding: 6px 12px; border-radius: 8px; font-size: 13px; }
  main { max-width: 760px; margin: 0 auto; background: #fff; padding: 22px 20px 40px; }
  .crumb { font-size: 13px; color: #64748b; margin-bottom: 10px; }
  .crumb a { color: #0891b2; text-decoration: none; }
  h1 { font-size: 26px; color: #065f46; line-height: 1.35; margin-bottom: 6px; }
  .meta { font-size: 13px; color: #64748b; margin-bottom: 16px; }
  .lead { font-size: 16px; background: #ecfdf5; border-right: 4px solid #059669; padding: 12px 14px; border-radius: 8px; margin-bottom: 22px; }
  h2 { font-size: 20px; color: #0f172a; margin: 24px 0 10px; }
  .faq { margin-bottom: 16px; }
  .faq h3 { font-size: 16px; color: #065f46; margin-bottom: 4px; }
  .faq p { font-size: 15px; color: #334155; }
  .note { margin-top: 26px; padding: 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; font-size: 14px; }
  .note a { color: #1d4ed8; font-weight: 700; }
  footer { max-width: 760px; margin: 0 auto; padding: 16px 20px 34px; font-size: 13px; color: #64748b; }
  footer a { color: #0891b2; }
</style>
</head>
<body>
<div class="bar">
  <a href="/">🎓 Syllab.in</a>
  <span class="sp"></span>
  <a class="en" href="/concepts/${c.slug}">Read in English</a>
</div>
<main>
  <nav class="crumb"><a href="/">होम</a> › <a href="/hi/concepts">हिन्दी कॉन्सेप्ट</a> › ${esc(c.title)}</nav>
  <h1>${esc(c.title)}</h1>
  <p class="meta">${esc(c.subject)} · ${esc(c.level)} · मुफ़्त हिन्दी नोट्स (NCERT आधारित)</p>
  <p class="lead">${esc(c.intro)}</p>${sectionsHtml}
  <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
  ${faqHtml}
  <div class="note">
    📘 <strong>पूरी पढ़ाई मुफ़्त:</strong> Syllab.in पर कक्षा 1–12 के लिए मुफ़्त NCERT नोट्स, मॉक टेस्ट, प्रैक्टिस और AI ट्यूटर उपलब्ध हैं।
    <a href="/concepts/${c.slug}">इस टॉपिक को अंग्रेज़ी में विस्तार से पढ़ें →</a>
  </div>
</main>
<footer>
  <strong>Syllab.in</strong> — भारतीय विद्यार्थियों के लिए मुफ़्त शिक्षा (कक्षा 1–12)।
  <a href="/hi/concepts">सभी हिन्दी कॉन्सेप्ट देखें</a> · <a href="/">मुख्य वेबसाइट</a>
</footer>
</body>
</html>
`;
}

// Hindi concepts index/hub page (links every Hindi page — crawl + UX).
function buildHub() {
  const items = HINDI_CONCEPTS.map((c) => `<li><a href="/hi/concepts/${c.slug}">${esc(c.title)}</a> <span>(${esc(c.subject)}, ${esc(c.level)})</span></li>`).join('');
  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>मुफ़्त हिन्दी कॉन्सेप्ट नोट्स (कक्षा 9–10 विज्ञान) | Syllab.in</title>
<meta name="description" content="कक्षा 9 और 10 विज्ञान के महत्वपूर्ण कॉन्सेप्ट हिन्दी में — संक्षारण, अम्ल-क्षार, लेंस की क्षमता, फ्यूज़ और भू-संपर्कण, प्रिज़्म से अपवर्तन आदि, सरल भाषा और FAQ के साथ। मुफ़्त।">
<meta name="robots" content="index,follow,max-snippet:-1">
<link rel="canonical" href="${SITE}/hi/concepts">
<link rel="alternate" hreflang="hi-IN" href="${SITE}/hi/concepts">
<link rel="alternate" hreflang="en-IN" href="${SITE}/concepts">
<link rel="alternate" hreflang="x-default" href="${SITE}/concepts">
<style>
  body { font-family: 'Noto Sans','Segoe UI',system-ui,sans-serif; background:#f8fafc; color:#0f172a; line-height:1.7; margin:0; }
  .bar { background:#059669; color:#fff; padding:10px 16px; } .bar a { color:#fff; text-decoration:none; font-weight:700; }
  main { max-width:760px; margin:0 auto; background:#fff; padding:22px 20px 40px; }
  h1 { font-size:26px; color:#065f46; } p.sub { color:#475569; margin:6px 0 18px; }
  ul { list-style:none; padding:0; } li { padding:12px 0; border-bottom:1px solid #e2e8f0; }
  li a { color:#0891b2; text-decoration:none; font-weight:700; font-size:17px; } li span { color:#64748b; font-size:13px; }
</style>
</head>
<body>
<div class="bar"><a href="/">🎓 Syllab.in</a></div>
<main>
  <h1>हिन्दी में मुफ़्त पढ़ाई</h1>
  <p class="sub">राज्य बोर्ड गाइड और कक्षा 9–10 विज्ञान के महत्वपूर्ण कॉन्सेप्ट सरल हिन्दी में, FAQ के साथ। सभी मुफ़्त।</p>
  <h2 style="font-size:18px;color:#065f46;margin:18px 0 6px;">राज्य बोर्ड (State Boards)</h2>
  <ul>${HINDI_BOARDS.map((b) => `<li><a href="/hi/${b.slug}">${esc(b.title)}</a> <span>कक्षा 10 व 12 — पैटर्न, अंक, तैयारी</span></li>`).join('')}</ul>
  <h2 style="font-size:18px;color:#065f46;margin:22px 0 6px;">कॉन्सेप्ट नोट्स (Concepts)</h2>
  <ul>${items}</ul>
</main>
</body>
</html>
`;
}

// Hindi state-board guide pages (/hi/{board-slug}).
function buildBoardPage(b) {
  const url = `${SITE}/hi/${b.slug}`;
  const secHtml = b.sections.map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.body)}</p>`).join('');
  const faqHtml = b.faqs.map((f) => `<div class="faq"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('');
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'LearningResource', name: b.heading, description: b.intro, inLanguage: 'hi-IN', isAccessibleForFree: true, learningResourceType: 'Exam guide', url, provider: { '@type': 'Organization', name: 'Syllab.in', url: SITE } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: 'hi-IN', mainEntity: b.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];
  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(b.heading)} | Syllab.in</title>
<meta name="description" content="${esc(b.intro.slice(0, 155))}">
<meta name="keywords" content="${esc(b.title)}, ${esc(b.slug.replace('-', ' '))} class 10, ${esc(b.slug.replace('-', ' '))} class 12, हिन्दी नोट्स, exam pattern, passing marks">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${url}">
<!-- No hreflang: these board pages have no English counterpart, and a lone
     self-referencing hi-IN tag is a self-only cluster — it tells Google nothing
     and reads as a broken annotation. <html lang="hi"> already states the
     language. -->
<meta property="og:title" content="${esc(b.heading)}">
<meta property="og:description" content="${esc(b.intro.slice(0, 155))}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:locale" content="hi_IN">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Noto Sans','Segoe UI',system-ui,sans-serif; background:#f8fafc; color:#0f172a; line-height:1.7; }
  .bar { background:#059669; color:#fff; padding:10px 16px; display:flex; gap:12px; flex-wrap:wrap; }
  .bar a { color:#fff; text-decoration:none; font-weight:700; font-size:14px; } .bar .sp { flex:1; }
  main { max-width:760px; margin:0 auto; background:#fff; padding:22px 20px 40px; }
  .crumb { font-size:13px; color:#64748b; margin-bottom:10px; } .crumb a { color:#0891b2; text-decoration:none; }
  h1 { font-size:25px; color:#065f46; line-height:1.35; margin-bottom:8px; }
  .meta { font-size:13px; color:#64748b; margin-bottom:16px; }
  .lead { font-size:16px; background:#ecfdf5; border-right:4px solid #059669; padding:12px 14px; border-radius:8px; margin-bottom:20px; }
  h2 { font-size:19px; color:#0f172a; margin:22px 0 8px; }
  p { font-size:15px; color:#334155; margin-bottom:10px; }
  .faq h3 { font-size:16px; color:#065f46; margin:14px 0 4px; }
  .note { margin-top:24px; padding:14px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; font-size:14px; }
  .note a { color:#1d4ed8; font-weight:700; }
</style>
</head>
<body>
<div class="bar"><a href="/">🎓 Syllab.in</a><span class="sp"></span><a href="/hi/concepts">सभी हिन्दी पेज</a></div>
<main>
  <nav class="crumb"><a href="/">होम</a> › <a href="/hi/concepts">हिन्दी</a> › ${esc(b.title)}</nav>
  <h1>${esc(b.heading)}</h1>
  <p class="meta">राज्य बोर्ड गाइड · मुफ़्त · आधिकारिक स्रोत: ${esc(b.official)}</p>
  <p class="lead">${esc(b.intro)}</p>
  ${secHtml}
  <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
  ${faqHtml}
  <div class="note">📘 <strong>ध्यान दें:</strong> परीक्षा पैटर्न और तिथियाँ बदल सकती हैं — नवीनतम जानकारी के लिए आधिकारिक वेबसाइट (${esc(b.official)}) अवश्य देखें। NCERT आधारित मुफ़्त हल व नोट्स के लिए <a href="/ncert-solutions">NCERT Solutions</a> और <a href="/hi/concepts">हिन्दी कॉन्सेप्ट</a> देखें।</div>
</main>
</body>
</html>
`;
}

let n = 0;
for (const c of HINDI_CONCEPTS) {
  const dir = path.join(ROOT, 'public', 'hi', 'concepts', c.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), buildPage(c));
  n++;
}
let nb = 0;
for (const b of HINDI_BOARDS) {
  const dir = path.join(ROOT, 'public', 'hi', b.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), buildBoardPage(b));
  nb++;
}
const hubDir = path.join(ROOT, 'public', 'hi', 'concepts');
mkdirSync(hubDir, { recursive: true });
writeFileSync(path.join(hubDir, 'index.html'), buildHub());
console.log(`✅ ${n} Hindi concept pages + ${nb} board pages + 1 hub written to public/hi/`);
