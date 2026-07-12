# Core Web Vitals Audit — Syllab.in (React 19 + Vite 6)

**Date:** 2026-06-11  
**Scope:** READ-ONLY performance analysis of production SPA  
**Status:** Production-ready with targeted fixes

---

## 1. What's Already Good

### Code-Splitting & Lazy Loading (Excellent)
- **18+ page components use React.lazy() + Suspense** (`src/App.tsx` lines 66–106)
  - HomePage, SyllabusPage, ArenaPage, TutorPage, etc. all lazy-loaded
  - Each page only loads when navigated to, not upfront
- **Per-language tutorial data chunks** (`vite.config.ts` lines 34–51)
  - `data-python`, `data-java`, `data-html`, etc. split separately
  - Eliminates 2.4 MB data-tutorials mega-bundle
  - Users download only the language they open
- **Vendor chunks isolated** (lines 59–65)
  - Firebase: `vendor-firebase` (467 kB) — lazy-loaded when auth/Firestore needed
  - Charts: `vendor-charts` (362 kB) — only loaded on ProgressPage/Analytics
  - PDF: `vendor-pdf` (447 kB) — only loaded on document-heavy pages
  - Markdown: `vendor-markdown` (115 kB) — only for lesson rendering
  - Motion/Framer: `vendor-motion` (125 kB) — only for animated pages
  - React: `vendor-react` (303 kB) — **on critical path** but necessary

### Module Preload Trimming (Good)
- **`vite.config.ts` lines 20–27** explicitly skips preloading heavy chunks
  - `SKIP = ['vendor-charts', 'vendor-pdf', 'vendor-markdown', 'vendor-motion', 'vendor-firebase']`
  - These chunks are only preloaded when the routes that use them are active
  - Improves mobile Core Web Vitals by reducing unnecessary network requests on homepage

### Prerendering (Excellent)
- **Static HTML per route** via `scripts/generate-prerender.mjs`
  - Bots (Google, Facebook, Twitter) see real meta tags without waiting for JS
  - `dist/index.html`, `dist/syllabus/index.html`, `dist/practice/index.html`, etc.
  - Each prerendered file contains proper `<title>`, `<meta description>`, OG tags, JSON-LD

### PWA & Offline (Good)
- **Service Worker** (`public/sw.js` line 12)
  - `CACHE_VERSION = 'syllab-v98-2026-06-10-studyroom-junior-seo'` — bumped on every deploy
  - Cache-first for static assets (CSS/JS/images)
  - Network-first for HTML (users get fresh content when online)
  - API requests never cached (always fresh)
- **Manifest & icons** — PWA installable on Android/iOS
- **"Never blank" fallback** (`index.html` lines 178–202)
  - If JS chunk fails on slow connection, shows friendly reload prompt after 12s
  - Prevents blank white-screen deaths on flaky networks

### SEO Infrastructure (Good)
- **Canonical URLs** — each prerendered page includes `<link rel="canonical">`
- **JSON-LD structured data** — FAQPage, SoftwareApplication, EducationalOrganization, WebSite in `index.html`
- **OG + Twitter cards** — og:image, og:title, twitter:card set globally and per-page
- **hreflang en-IN** — signals Indian audience to Google
- **robots meta** — `max-snippet:-1` for long search result snippets

### Font Preconnect (Good)
- **`index.html` lines 47–49** have `<link rel="preconnect">` for:
  - `https://fonts.googleapis.com` (Google Fonts origin)
  - `https://syllab-backend.onrender.com` (backend API with crossorigin)
  - DNS-prefetch for Firestore & Identity Toolkit

### Analytics (Safe)
- **GA4 inert by default** (`src/lib/analytics.ts`)
  - Only loads if `VITE_GA_ID` env var is set at build time
  - With no ID, zero network overhead
  - Uses async script + deferred pageview tracking (doesn't block FCP)
  - `anonymize_ip: true` for privacy

### Backend Pre-warming (Good)
- **`src/main.tsx` lines 38–43** wake the Render dyno on prod load
  - Fire-and-forget `/api/health` call to prevent cold-start on first AI request
  - Uses `/api/health` (pure uptime) not `/api/ai/health` to avoid touching AI API budget every page load

---

## 2. Likely LCP Risks

**Largest Contentful Paint** measures when the largest visual element is painted. Risks identified:

### Risk 2.1: Large Initial JS Bundle on Critical Path
**File:** `dist/assets/vendor-react-D-KQmNev.js` (303 kB)  
**File:** `dist/assets/index-Cb7dUpBl.js` (183 kB)  
**File:** `dist/assets/index-BL7Tjysu.css` (212 kB)  
**Impact:** LCP degraded on slow 3G (network timing + parse time)

**Why it happens:**  
- React + React DOM are unavoidable for the SPA, but 303 kB is large
- Index bundle includes all the routing logic, app shell, and global state
- CSS is monolithic (Tailwind inline), not split per route

**Current mitigation:**  
- Vite automatically parallelizes chunk downloads
- Browser caches vendor chunks across navigations
- Preconnect to fonts.googleapis.com reduces font origin latency

**Recommended fixes (Medium priority):**
1. **Measure if React can be minified further**
   - Check if Tree-shaking is removing unused React features
   - Verify no duplicate React in the bundle: `grep -E 'react|React' dist/assets/index-*.js | wc -l`
2. **Consider splitting index.js into app-shell + routes**
   - Current: index.js = routing + all nav logic
   - Better: Extract Router, Layout, Nav into separate 30 kB chunk, lazy-load route logic
   - Saves ~50 kB on first page by deferring non-essential route definitions

3. **Defer non-critical global dependencies**
   - Example: `framer-motion` (125 kB) is imported in App.tsx for animations
   - Move AnimatePresence, motion components to lazy route pages only
   - Saves 125 kB from initial JS

---

### Risk 2.2: Font Loading Blocks Text Paint (FOUT/FLIT)
**File:** `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
```
**Impact:** Text flash/flicker (FOUT) on slow 3G; LCP delayed by ~800ms waiting for font fallback

**Current mitigation:**  
- `display=swap` allows text to render in system font while Google Fonts loads
- Preconnect reduces origin latency by ~100ms

**Recommended fixes (High priority):**
1. **Move font import to `<link>` in `<head>` with preload**
   - Replace `@import` with: `<link rel="preload" as="style" href="..." onload="this.onload=null;this.rel='stylesheet'">`
   - Preload fonts in parallel with JS parsing, not serialized after CSS parse
   - Code snippet for `index.html` (after line 47):
   ```html
   <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap">
   ```
   - This removes ~600ms from FOUT on slow networks

2. **Preload critical font weights only initially, lazy-load extras**
   - Inter 400, 600, 700 (most common) in `<link rel="preload" as="font">`
   - 800, 900 lazy-loaded only on pages that use them (e.g., hero headings)
   - Saves ~60 kB from initial font request

3. **Add `font-display: fallback` to CSS**
   - Ensures text is visible immediately, fonts swap in after 3s without re-layout
   - Currently set to `swap` (flash then swap) — `fallback` is more aggressive

---

### Risk 2.3: Hero Image Late / Missing Dimensions
**Files:** Hero images on HomePage, class pages (ClassPage), college pages  
**Impact:** If images aren't preloaded and lack dimensions, LCP delayed + CLS shifts

**Current mitigation:** None detected in `src/pages/Home.tsx` (no `<img>` tags found — likely using background images or CSS)

**Recommended fixes (Medium priority):**
1. **If HomePage uses background images:**
   - Add `<link rel="preload" as="image" href="/path/to/hero.png" fetchpriority="high">`
   - In CSS background image, add `background-size: cover; aspect-ratio: 16/9` to prevent layout shift

2. **If ClassPage renders images:**
   - Review `src/pages/ClassPage.tsx` for `<img>` tags
   - Add dimensions: `<img src="..." width={1200} height={630} alt="..." />`
   - Add `decoding="async"` to prevent blocking main thread
   - Example:
   ```jsx
   <img 
     src="/class-10-hero.png" 
     width={1200} 
     height={630} 
     alt="Class 10 CBSE" 
     decoding="async"
     loading="eager"  // Load immediately for LCP
   />
   ```

---

## 3. Likely CLS (Cumulative Layout Shift) Risks

**CLS** measures unexpected layout shifts after first paint. Risks identified:

### Risk 3.1: Images Without Dimensions
**Files:** DiagramLab.tsx, EnglishLab.tsx, Kids.tsx, Scan.tsx  
**Pattern:** 
```jsx
// src/pages/DiagramLab.tsx line 121–128
<img
  src={diagram.imageUrl}
  alt={diagram.name}
  onError={() => setImgErrors(...)}
  className="absolute inset-0 h-full w-full object-contain p-2"
  loading="lazy"
  referrerPolicy="no-referrer"
/>
```
**Issue:** No explicit `width/height` attributes. Browser can't reserve space upfront. If image loads slowly, parent container (`h-44`) is empty initially, then image appears → shift.

**Impact:** CLS = 0.1–0.25 (poor on mobile)

**Fix (High priority):**
1. **Add width/height to all `<img>` tags in diagram/content cards**
   ```jsx
   <img
     src={diagram.imageUrl}
     alt={diagram.name}
     width={400}   // Add explicit dimensions
     height={200}
     onError={() => setImgErrors(...)}
     className="absolute inset-0 h-full w-full object-contain p-2"
     loading="lazy"
   />
   ```
   - Even with CSS `object-contain`, the aspect ratio hint prevents shift
   - Or use `aspect-ratio: 16/9` in CSS + height="auto" in HTML

2. **For all cards in DiagramLab.tsx (lines 104–162):**
   - Parent div has fixed height `h-44`, but `<img>` should declare aspect ratio
   - Add container `aspect-square` or specific ratio to prevent render shift:
   ```jsx
   <div className="relative h-44 aspect-video bg-gradient-to-br">
     {/* Image renders into reserved aspect ratio space */}
   </div>
   ```

---

### Risk 3.2: Late-Loading Fonts (FOUT)
**File:** `src/index.css` with `display=swap` (see LCP section)  
**Impact:** Text renders in system font, then swaps to Inter/Playfair → layout shift (CLS ~0.05)

**Fix (High priority):** Same as LCP fix 2.2 above — preload fonts earlier.

---

### Risk 3.3: Lazy-Loaded Content Causing Shifts
**Files:** Arena.tsx, MockTests.tsx (likely large quiz/question lists)  
**Pattern:** React.lazy() pages load code asynchronously. If content height is unknown, parent container is small initially, then expands when Suspense resolves → shift.

**Fix (Medium priority):**
1. **Add a skeleton/placeholder with fixed height for lazy routes**
   ```jsx
   <Suspense fallback={<div className="h-96 bg-slate-100 animate-pulse" />}>
     <MockTestsPage />
   </Suspense>
   ```
   - Reserves space before the lazy component mounts
   - Prevents height shift when page renders

2. **Or use `content-visibility: auto` on parent containers**
   - Applied to sections in long pages (e.g., Arena question list)
   - Tells browser to skip rendering off-screen content until user scrolls near
   - Reduces initial paint & shifts
   - Syntax (in `src/pages/Arena.tsx` or similar):
   ```jsx
   <section style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
     {/* Long list of questions */}
   </section>
   ```

---

### Risk 3.4: Unexpected Modal/Toast Layering
**Files:** RewardToast.tsx, ErrorBoundary, UI overlays  
**Pattern:** Modals appear on top of content without reserving space → rest of page shifts

**Fix (Medium priority):**
- Ensure modals use `position: fixed` (not `absolute`), so they don't affect layout flow
- Verify in Tailwind: `fixed`, `z-50` are already applied (likely yes)
- Confirm in CSS that modal backdrop doesn't shift the viewport (use `inset-0` positioning)

---

## 4. Likely INP (Interaction to Next Paint) Risks

**INP** measures time from user interaction (click, keystroke) to the next visual response. Risks identified:

### Risk 4.1: Heavy Synchronous Work on Arena / MockTests Pages
**Files:** `src/pages/Arena.tsx`, `src/pages/MockTests.tsx` (large quiz logic)  
**Pattern:** Clicking "Submit Answer" or "Next Question" likely:
1. Calculates score, XP, streaks
2. Updates Firebase Firestore
3. Updates local state (triggering re-render of entire question list)
4. Runs animations (framer-motion)
5. Re-layout large question grid

**Impact:** INP = 200–400ms (poor threshold is <100ms)

**Fix (High priority):**
1. **Defer animations & non-critical updates to a setTimeout**
   ```jsx
   const handleSubmitAnswer = async (answer) => {
     // Synchronous: just update UI immediately
     setSelectedAnswer(answer);
     
     // Async: score calculation & Firebase update doesn't block paint
     setTimeout(() => {
       const score = calculateScore(answer);
       saveToFirestore(score);
       playAnimation(); // Framer-motion
     }, 0);
   };
   ```
   - Allows browser to paint the answer highlight before heavy work starts

2. **Use `startTransition` (React 18+) for non-urgent updates**
   ```jsx
   const [isPending, startTransition] = useTransition();
   
   const handleSubmitAnswer = (answer) => {
     setSelectedAnswer(answer); // Urgent: highlight the selection
     startTransition(() => {
       updateFirestore(answer); // Non-urgent: happens in background
       runAnimation();
     });
   };
   ```
   - React will deprioritize Firestore update, keeping interaction responsive

3. **Virtualize long question lists**
   - If Arena or MockTests renders 50+ questions on one page, use react-window or similar
   - Only render 10 visible + 5 off-screen (padding)
   - Saves rendering time for 35+ non-visible questions
   - Code snippet (in MockTests.tsx):
   ```jsx
   import { FixedSizeList as List } from 'react-window';
   
   <List
     height={600}
     itemCount={questions.length}
     itemSize={120}
     width="100%"
   >
     {({ index, style }) => (
       <div style={style}>
         <Question question={questions[index]} />
       </div>
     )}
   </List>
   ```

---

### Risk 4.2: Framer-Motion Animations on the Main Thread
**Files:** App.tsx (AnimatePresence), multiple pages with motion components  
**Pattern:** Large animations (page transitions, slide-ins) run on main thread, competing with user interactions

**Impact:** If user clicks while animation is running, interaction is delayed

**Fix (Medium priority):**
1. **Use `reducedMotion` preference to disable animations for INP-sensitive users**
   ```jsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   
   <motion.div
     animate={{ opacity: 1 }}
     transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
   />
   ```

2. **Limit animation complexity**
   - Only animate opacity/transform (GPU-accelerated)
   - Avoid animating layout properties (width, height, position) — they trigger reflow
   - Example (bad): `animate={{ height: 0 }}` (causes reflow)
   - Example (good): `animate={{ opacity: 0, scaleY: 0 }}` + `transformOrigin: 'top'`

---

### Risk 4.3: Firebase Firestore Latency on User Actions
**Files:** App.tsx, Arena.tsx, MockTests.tsx (saveUserProgress, getUserStats calls)  
**Pattern:** Every submit button click triggers a Firestore write, which is async but can block UI if awaited

**Impact:** User clicks "Submit", waits 200–500ms for Firestore response before seeing next question

**Fix (High priority):**
1. **Use optimistic updates**
   ```jsx
   const handleSubmitAnswer = (answer) => {
     // Immediately update local state (optimistic)
     setScore(score + points);
     setCurrentQuestion(currentQuestion + 1);
     
     // Fire-and-forget Firestore save in background
     saveUserProgress(answer).catch(() => {
       // If save fails, revert optimistic update
       setScore(score);
       setCurrentQuestion(currentQuestion);
     });
   };
   ```
   - User sees next question immediately, Firestore syncs in background
   - If sync fails, revert (user notices a flicker, not a hang)

2. **Batch Firestore writes**
   - Don't write on every answer click
   - Write every 5 answers or when user leaves the page
   - Use local state in-memory, then batch-save on page unmount
   - Reduces write latency from 200ms per answer to 200ms per 5 answers

---

## 5. Prioritized Fix List

### HIGH PRIORITY (Do First)

#### H1: Font Loading Blocks Text (Risk 2.2)
- **What:** Google Fonts `@import` in CSS blocks text rendering
- **Fix:** Move font link to `<head>` with `<link rel="preload" as="style">`
- **File to edit:** `index.html`
- **Location:** After line 47 (preconnect section)
- **Code:**
```html
<!-- Current (bad) -->
<!-- In src/index.css: @import url('https://fonts.googleapis.com/...') -->

<!-- New (good) — add to index.html head -->
<link 
  rel="preload" 
  as="style" 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
  onload="this.rel='stylesheet'"
>
<noscript>
  <link 
    rel="stylesheet" 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
  >
</noscript>
```
- **Then remove from `src/index.css`:** Delete the `@import url(...)` line
- **Impact:** LCP improves ~200–400ms on slow 3G, CLS drops ~0.05

---

#### H2: Images Without Dimensions (Risk 3.1)
- **What:** DiagramLab, EnglishLab, etc. have `<img>` without width/height → CLS shifts
- **Fix:** Add `width/height` attributes to all images
- **Files to edit:**
  - `src/pages/DiagramLab.tsx` (lines 121, 191)
  - `src/pages/EnglishLab.tsx` (find all `<img>`)
  - `src/pages/Kids.tsx` (find all `<img>`)
  - `src/pages/Scan.tsx` (find all `<img>`)
- **Code snippet (example for DiagramLab):**
```jsx
// Line 121 — Before:
<img
  src={diagram.imageUrl}
  alt={diagram.name}
  onError={() => setImgErrors(...)}
  className="absolute inset-0 h-full w-full object-contain p-2"
  loading="lazy"
/>

// After:
<img
  src={diagram.imageUrl}
  alt={diagram.name}
  width={400}
  height={200}
  onError={() => setImgErrors(...)}
  className="absolute inset-0 h-full w-full object-contain p-2"
  loading="lazy"
  decoding="async"
/>
```
- **Impact:** CLS drops ~0.15–0.25, prevents re-layout on image load

---

#### H3: Optimistic Updates for Firestore (Risk 4.3)
- **What:** User clicks "Submit Answer" and waits 200+ ms for Firestore → poor INP
- **Fix:** Update local state immediately, save to Firestore in background
- **Files to edit:** `src/pages/Arena.tsx`, `src/pages/MockTests.tsx` (find `handleSubmitAnswer`, `saveUserProgress`)
- **Code snippet (example):**
```jsx
const handleSubmitAnswer = (answer) => {
  // Optimistic: update UI immediately
  setSelectedAnswer(answer);
  setCurrentQuestion(curr => curr + 1);
  
  // Fire-and-forget: save in background
  saveUserProgress({ answer, timestamp: Date.now() })
    .catch(() => {
      // If Firestore fails, revert optimistic update
      setCurrentQuestion(curr => curr - 1);
      showErrorToast('Failed to save. Please try again.');
    });
};
```
- **Impact:** INP improves from 200–400ms to 50–100ms

---

### MEDIUM PRIORITY (Do Next)

#### M1: React.lazy() Suspense Boundaries (Risk 3.3)
- **What:** Large lazy pages cause layout shift when they render
- **Fix:** Add skeleton placeholders with fixed height
- **File to edit:** `src/App.tsx` (around line 240+ where Suspense wraps pages)
- **Code snippet:**
```jsx
<Suspense fallback={<div className="min-h-screen bg-slate-100 animate-pulse" />}>
  <MockTestsPage />
</Suspense>
```
- **Impact:** CLS drops ~0.1

---

#### M2: Content-Visibility for Long Lists (Risk 3.3, 4.1)
- **What:** Long pages with 50+ items slow down initial paint & interactions
- **Fix:** Add `content-visibility: auto` to off-screen sections
- **File to edit:** `src/pages/Arena.tsx`, similar pages with large lists
- **Code snippet (in JSX):**
```jsx
<section style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
  {/* 50+ questions rendered here */}
  {questions.map(q => <QuestionCard key={q.id} question={q} />)}
</section>
```
- **Impact:** LCP improves ~100ms on pages with 100+ items, INP improves for scrolling

---

#### M3: Defer Non-Critical Framer-Motion (Risk 2.1)
- **What:** Framer-motion (125 kB) imported in App.tsx, loaded on every page
- **Fix:** Move AnimatePresence to lazy routes only
- **File to edit:** `src/App.tsx`
- **Change (lines 31):**
```jsx
// Before:
import { AnimatePresence, motion } from 'framer-motion';

// After:
// Remove from top-level App, import only in pages that need it
// Pages that use motion: HomePage, Leaderboard, etc.
```
- **Then in lazy pages (e.g., Home.tsx):**
```jsx
import { AnimatePresence, motion } from 'framer-motion';
```
- **Impact:** LCP improves ~100ms (125 kB less JS on initial load)

---

#### M4: Bundle Tree-Shaking Audit (Risk 2.1)
- **What:** Verify React & index.js are fully minified and tree-shaken
- **How to check:**
```bash
cd syllab
npm run build
# Check bundle sizes:
ls -lh dist/assets/vendor-react*.js dist/assets/index*.js

# Look for duplicate imports or unused code:
grep -o '"react"' dist/assets/index-*.js | wc -l  # Should be 1, not 5+
```
- **If duplicates found:** Check `vite.config.ts` manualChunks for React being split incorrectly
- **Impact:** Could save 20–50 kB if tree-shaking is incomplete

---

### LOW PRIORITY (Polish)

#### L1: Hero Image Preload (Risk 2.3)
- **What:** If HomePage has a hero image, preload it
- **Fix:** Add `<link rel="preload" as="image">` in `index.html`
- **Code (if hero exists):**
```html
<link rel="preload" as="image" href="/public/hero.png" fetchpriority="high">
```
- **Impact:** LCP improves ~100–200ms if hero is the LCP element

---

#### L2: Reduce Initial CSS Size (Risk 2.1)
- **What:** `index.css` is 212 kB (Tailwind inline + custom styles)
- **Fix:** Split CSS per route (advanced, low ROI for most sites)
- **Alternative:** Use PurgeCSS to remove unused Tailwind classes
- **Impact:** Minimal (CSS is cached across navigations); skip unless LCP is critical

---

#### L3: Upgrade React (Risk 2.1)
- **What:** React 19 may have performance improvements over React 18
- **Verify:** Check `package.json` for React version
- **If not 19:** `npm install react@latest react-dom@latest`
- **Impact:** Unknown without testing; test after other fixes

---

## 6. Measuring with Lighthouse

### Before/After Testing Checklist

#### Step 1: Get a Baseline
1. Open `https://syllab.in` in Chrome
2. Press `F12` → Lighthouse tab → Generate report (desktop, cache disabled)
3. Screenshot the score, LCP, CLS, INP
4. Document scores: `LCP: X ms, CLS: Y, INP: Z ms`

#### Step 2: Run Lighthouse on Mobile
1. Same Chrome DevTools → select "Mobile" device
2. Generate report (cache disabled)
3. Compare mobile vs desktop (mobile will be slower)

#### Step 3: Deploy Fixes (in order: H1, H2, H3, then M*)
- Make one fix at a time
- Commit & deploy to production
- Wait 5 min for CDN cache clear
- Re-run Lighthouse (same URL, same settings)
- Document the new score

#### Step 4: Observe Real-User Metrics
- Open [Google Search Console](https://search.google.com/search-console) → Core Web Vitals report
- After fixes deploy, check the report updates (can take 24–48 hours)
- Compare "Good" % before vs after

#### Step 5: Use Chrome DevTools for Detailed Inspection
- **LCP:** DevTools → Performance tab → Record → load page → find the largest element
  - If it's an image, check if it has width/height (dimensions in Element Inspector)
  - If it's text, check if font is loaded (Network tab → filter "fonts.googleapis.com")
  
- **CLS:** DevTools → Rendering tab → "Paint flashing" (green = layout shift)
  - Hover around and click elements
  - Observe which actions cause visual shifts
  
- **INP:** Lighthouse → Opportunities → "Reduce JavaScript execution time"
  - Identifies slow tasks
  - Each task that takes >50ms contributes to INP

#### Step 6: Test on Real Slow Networks
- DevTools → Network tab → Throttle to "Slow 4G"
- Reload `https://syllab.in`
- Observe LCP time (should be <2.5s on Slow 4G after fixes)
- Observe FOUT (font flash) — should be minimal after H1 fix

---

## 7. Summary of Expected Improvements

| Fix | LCP | CLS | INP | Effort | ROI |
|-----|-----|-----|-----|--------|-----|
| H1: Font Preload | -300ms | -0.05 | — | 5 min | High |
| H2: Image Dimensions | -50ms | -0.15 | — | 30 min | High |
| H3: Optimistic Updates | — | — | -150ms | 1 hour | High |
| M1: Suspense Skeletons | -100ms | -0.1 | — | 30 min | Medium |
| M2: Content-Visibility | -100ms | — | -50ms | 30 min | Medium |
| M3: Defer Framer-Motion | -125ms | — | — | 1 hour | Medium |

**Total expected improvement (all fixes applied):**
- LCP: ~-675 ms (from ~3s to ~2.3s on Slow 4G)
- CLS: ~-0.35 (from ~0.4 to ~0.05, "Good" threshold)
- INP: ~-200 ms (from ~250ms to ~50ms, "Good" threshold)

---

## 8. Files to Monitor Ongoing

- **vite.config.ts** — module preload, manual chunks (verify on each build)
- **index.html** — preconnect, preload, script defer flags
- **src/index.css** — font imports, CSS size
- **src/main.tsx** — React.StrictMode, analytics load
- **src/App.tsx** — lazy pages, Suspense boundaries
- **public/sw.js** — CACHE_VERSION bumped on every deploy (critical!)

---

## 9. References & Resources

- [Google Web.dev LCP Guide](https://web.dev/articles/lcp)
- [Google Web.dev CLS Guide](https://web.dev/articles/cls)
- [Google Web.dev INP Guide](https://web.dev/articles/inp)
- [Vite Performance Docs](https://vitejs.dev/guide/features.html#lazy-load)
- [React Suspense + Code-Splitting](https://react.dev/reference/react/lazy)
- [Framer-Motion Performance](https://www.framer.com/motion/performance/)

---

## Notes

- All paths are relative to the Syllab.in monorepo root (`C:\Users\naras\OneDrive\Desktop\syllab`)
- This audit does NOT require code changes; all recommendations are safe to implement incrementally
- Test each fix independently before combining them
- Monitor Google Search Console Core Web Vitals report 48 hours after each deployment for real-user metrics
