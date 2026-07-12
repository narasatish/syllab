import { TutorialTopic } from './types';

export const graphicDesignTopics: TutorialTopic[] = [
  {
    id: 'gd-design-fundamentals',
    category: 'Graphic Design',
    title: 'Design Basics & Why It Matters + Intro to Canva',
    difficulty: 'Beginner',
    theory: [
      'Graphic design is the art of communicating ideas through visual elements. Whether you are making social media posts, resumes, posters, or business cards, good design gets your message noticed and remembered. Poor design distracts, confuses, or loses your audience; great design guides their eye exactly where it needs to go and makes your content feel professional and intentional.',
      'Canva is a free, browser-based design tool that makes professional design accessible to everyone. Unlike expensive software like Adobe Photoshop or Illustrator, Canva provides pre-made templates, a vast library of images and fonts, and drag-and-drop simplicity. You do not need design experience to create beautiful graphics — Canva handles the technical complexity so you can focus on your message.',
      'Design is everywhere in India\'s digital world: Instagram posts get more likes with eye-catching graphics, resume graphics with color and hierarchy beat plain text in competitive exams, and small business owners use design to stand out online. Learning design skills gives you a competitive edge in school projects, college portfolios, freelance work, and building your personal brand.'
    ],
    code: `Step-by-step: Get started with Canva
1. Go to canva.com and sign up with email or Google account (free plan is enough).
2. Click "Create a design" and choose a template (Instagram post, poster, resume, thumbnail, etc.).
3. Explore the left sidebar: Templates, Elements, Text, Uploads, Brand Kit.
4. Customize the template: change colors, swap images, edit text, move elements around.
5. Download: click Share → Download → PNG (for social media) or PDF (for printing).

Core design words you will hear:
- Contrast: differences in color, size, or tone that make elements stand out.
- Hierarchy: the order in which your eye reads elements (biggest/boldest = most important).
- Alignment: lining up text and elements so the design looks organized and intentional.
- Proximity: grouping related elements close together to show they belong.`,
    notes: [
      'Canva\'s free plan lets you download unlimited designs; you do not need Premium unless you want AI tools or brand kits.',
      'Always check font readability on mobile — if you can\'t read it at thumbnail size, neither can your audience.',
      'Design takes practice: look at designs you like, try to recreate them in Canva, and experiment with colors and layouts.'
    ],
    xp: 50,
    practice: {
      title: 'Create Your First Canva Post',
      description: 'Make a simple Instagram post or poster about something you care about (a hobby, a subject you study, or a cause). Use at least one image, one headline, and a short description.',
      hint: 'Start with a template, not a blank canvas. Templates give you a head start on layout and hierarchy.',
      solution: 'A well-designed post will have: (1) a clear headline that stands out, (2) a complementary image, (3) short body text that is easy to read, (4) colors that do not clash, (5) proper spacing so nothing feels cramped.',
      expectedOutput: 'Download your post as PNG and save it. You should see a professional-looking graphic with clear hierarchy and good spacing.'
    }
  },
  {
    id: 'gd-design-elements',
    category: 'Graphic Design',
    title: 'The Elements of Design: Line, Shape, Color, Space, Texture',
    difficulty: 'Beginner',
    theory: [
      'Every design is made of building blocks called design elements. These elements are the tools designers use to communicate emotion, guide the eye, and create visual interest. The five core elements are: line (straight, curved, thick, thin), shape (circles, rectangles, triangles, organic forms), color (hue, saturation, brightness), space (empty room in a design; also called "whitespace"), and texture (visual or tactile patterns that create depth). Understanding these elements helps you recognize what makes a design work or fail.',
      'Lines create direction and energy. Horizontal lines suggest calm and stability; diagonal lines suggest movement and drama; vertical lines suggest strength. Shapes organize space and represent objects or concepts. Circles feel friendly and inclusive, rectangles feel organized and formal, triangles feel dynamic and unstable. Color triggers emotion before words are read. Warm colors (red, orange, yellow) energize; cool colors (blue, green, purple) calm. Saturation (brightness) and value (darkness) change how bold or soft a color feels.',
      'Space, or whitespace, is not empty — it is part of the design. Generous spacing makes text readable and gives a design a premium, breathable feel. Crowded designs feel chaotic or cheap, even if the individual elements are beautiful. Texture adds visual interest and depth. In digital design, texture often comes from images, gradients, or subtle patterns. Understanding how these five elements work together is the foundation of all design thinking.'
    ],
    code: `Quick reference: Design elements in Canva
LINE:
  - Use the Elements tab → search "line" to add lines to your design.
  - Diagonal lines create energy (for action buttons, quotes); horizontal lines create calm.
  - Thickness: thicker lines feel bold and solid; thin lines feel delicate.

SHAPE:
  - Elements tab → Shapes. Add circles (friendly), squares/rectangles (formal, organized), triangles (dynamic).
  - Use shapes as backgrounds, icons, or visual breaks between text sections.

COLOR:
  - Click any element → pick a color from the color picker.
  - Try: one bold accent color + neutral background (black, white, gray). Too many colors = chaos.

SPACE (WHITESPACE):
  - Do not fill every pixel. Let elements breathe.
  - Tip: use a grid or alignment guides (View → Grids & Guides) to space elements consistently.

TEXTURE:
  - Upload your own images (Photos tab) or use Canva\'s library.
  - Add subtle patterns: Elements tab → search "pattern" for overlays or backgrounds.`,
    notes: [
      'Do not use more than 2–3 colors per design unless you are intentionally creating a colorful, playful feel.',
      'Contrast makes elements readable: dark text on light background (or vice versa). Never put dark text on a dark background.',
      'Whitespace is not wasted space — it is a design choice that makes your work look intentional.'
    ],
    xp: 50,
    practice: {
      title: 'Design a Poster Using All Five Elements',
      description: 'Create a poster or flyer for a made-up event (school fair, movie night, study session, etc.) that deliberately includes: one line element, two shapes, at least two colors, clear whitespace, and one image or texture.',
      hint: 'Use the grid feature (View → Grids & Guides) to help you space elements evenly.',
      solution: 'Your poster should show: (1) a strong hierarchy (headline is biggest/boldest), (2) intentional use of lines or shapes (not just text and image), (3) consistent spacing and alignment, (4) a clear color scheme, (5) an image or texture that supports the message.',
      expectedOutput: 'A visually balanced poster that uses each of the five elements deliberately. When you look at it, you should feel that every element is there for a reason.'
    }
  },
  {
    id: 'gd-color-theory',
    category: 'Graphic Design',
    title: 'Color Theory & Choosing Palettes',
    difficulty: 'Beginner',
    theory: [
      'Color theory is the science behind how colors work together. The color wheel organizes hues in a circle: reds, oranges, yellows, greens, blues, and purples. Colors next to each other on the wheel are called analogous (they harmonize); colors opposite each other are called complementary (they contrast and pop). Understanding these relationships helps you choose colors that feel intentional, not random. Warm colors (reds, oranges, yellows) convey energy, passion, and urgency. Cool colors (blues, greens, purples) convey calm, trust, and professionalism. Neutral colors (black, white, gray, beige, brown) ground a design and let bold colors shine.',
      'A color palette is a curated set of 2–5 colors that form the backbone of your design. Indian brands often use bold, warm palettes that reflect the vibrancy of Indian culture (think bright pinks, golds, and deep blues). A simple formula: pick one bold accent color, one neutral background (usually white or light gray), one darker neutral for text (usually dark gray or black), and optionally one complementary or analogous color for variety. Saturation (intensity) and value (lightness) matter as much as hue. A pale pastel blue feels very different from a deep navy, even though both are "blue".',
      'Online color tools like Coolors.co, Adobe Color Wheel, and Canva\'s color palette suggestions help you generate palettes instantly. Most palettes follow a ratio: 60% dominant color (usually neutral), 30% secondary color, 10% accent color. This ratio ensures your design is not visually exhausting. In Canva, use the Brand Kit feature to save your custom colors so they stay consistent across all your designs.'
    ],
    code: `Color palette formula for Indian designs:
Palette 1 (Vibrant & Bold):
  - Dominant: Warm white or cream (background)
  - Secondary: Deep indigo or forest green (text)
  - Accent: Bright saffron (#FF9F1C) or hot pink (#E81B23)
  - Use for: posters, event graphics, personal branding.

Palette 2 (Professional & Modern):
  - Dominant: Light gray (#F5F5F5)
  - Secondary: Charcoal gray (#333333, text)
  - Accent: Teal or deep blue (#0066CC)
  - Use for: resumes, business posts, educational content.

Palette 3 (Calm & Inclusive):
  - Dominant: Off-white (#FFFAF0)
  - Secondary: Slate blue (#475569)
  - Accent: Soft sage green (#A7D129)
  - Use for: wellness, community, blog posts.

Steps to apply in Canva:
1. Design → Brand Kit → click "+" to create a new brand kit.
2. Add your 3–5 colors by hex code (copy from Coolors or color picker).
3. Every design you create will suggest these colors automatically.
4. Use the same palette across all your designs for brand consistency.`,
    notes: [
      'Never use pure black (#000000) as a text color on white — it is harsh. Use dark gray (#333333 or #1F2937) instead for easier reading.',
      'Test color contrast: make sure dark text on light background (or vice versa) is readable. Tools like WebAIM Contrast Checker validate this.',
      'Colors mean different things in different cultures. In India, saffron is patriotic, green is peace and growth, red is energy and celebration. Be mindful of these meanings.'
    ],
    xp: 50,
    practice: {
      title: 'Create a Color Palette & Design a Card',
      description: 'Generate a custom color palette (using Coolors.co, Adobe Color Wheel, or Canva\'s suggestions), then design a simple business card, greeting card, or social media post using only those colors.',
      hint: 'Stick to your 3–5 colors. Resist the urge to add more colors just because they look nice. Constraint breeds better design.',
      solution: 'A successful design will have: (1) a clear dominant, secondary, and accent color (roughly 60–30–10 ratio), (2) high contrast so text is readable, (3) consistent color use across elements (e.g., all headings are the same color), (4) no more than 5 colors total.',
      expectedOutput: 'A card or graphic that feels cohesive because every color supports the overall mood and message.'
    }
  },
  {
    id: 'gd-typography',
    category: 'Graphic Design',
    title: 'Typography: Pairing & Using Fonts Well',
    difficulty: 'Beginner',
    theory: [
      'Typography is the art of making text readable and beautiful. A font is a set of letters, numbers, and symbols with a consistent style. The two main font families are serif (letters have small decorative lines, like Times New Roman) and sans-serif (letters have no lines, like Arial). Serifs feel traditional, formal, and trustworthy; sans-serifs feel modern, clean, and approachable. Your font choices shape how viewers feel about your message before they even read it.',
      'Font pairing means choosing two fonts that work together: usually a serif or bold sans-serif for headlines (to grab attention) and a simple, readable sans-serif for body text (for easy reading). Poor pairings feel random or chaotic; good pairings feel intentional and professional. A classic Indian design approach pairs a bold, decorative font for headlines with a clean, neutral font for body text. Avoid using more than two fonts in one design — more fonts = more chaos. Also avoid using all caps for long body text; it is harder to read. All caps works for short headlines and buttons.',
      'Font size, weight (boldness), and line height (spacing between lines) are as important as which font you choose. A headline needs contrast: make it bigger and bolder so it stands out from body text. Body text should be 14–16 pixels or larger on screen (readable without squinting). Line height of 1.5 or more makes text breathable and easier to scan. Canva\'s built-in fonts are carefully curated and pair well; start there before hunting for custom fonts.'
    ],
    code: `Font pairing checklist for Canva:
HEADLINES: Pick ONE bold or decorative font
  - Option 1: Sans-serif + bold weight (e.g., "Poppins Bold", "Montserrat Black")
  - Option 2: Serif + decorative (e.g., "Playfair Display", "Lora")
  - Make it 36–72px, bold or extra-bold, with high contrast color.

BODY TEXT: Pick ONE clean, readable sans-serif
  - Use: "Open Sans", "Roboto", "Inter", or "Lato"
  - Size: 14–18px (on screen), 11–14pt (in print)
  - Weight: regular or light (not bold)
  - Line height: at least 1.5 (more breathing room)

STEPS in Canva:
1. Select your headline text → Font menu → search for a bold sans-serif or display font.
2. Increase size to 48–72px, adjust weight to Bold or Extra-Bold.
3. Select body text → switch to a clean, neutral sans-serif at 16–18px, regular weight.
4. Never mix serif body text with serif headlines (boring). Pair serif headline + sans-serif body, or vice versa.
5. Test readability: at phone size (thumbnail), can you still read it? If not, increase size.`,
    notes: [
      'Do not use decorative fonts for body text. They look nice but are painful to read. Save them for short headlines and titles.',
      'Alignment matters: left-align most body text for readability. Center-align headings or short calls-to-action. Never center long paragraphs.',
      'Letter-spacing (distance between letters): add a tiny bit of letter-spacing to uppercase headlines (+1–3px) to make them feel more intentional. Leave body text at default.'
    ],
    xp: 50,
    practice: {
      title: 'Design a Flyer with Good Typography',
      description: 'Create a flyer (for a class event, study group, or local service) that demonstrates good font pairing. Use one bold font for the headline and one clean font for the body text. Include a call-to-action (e.g., "Sign up here", "Call or message").',
      hint: 'Test your fonts at small sizes (phone screen) before settling. A beautiful headline font might be unreadable when shrunk down.',
      solution: 'A good typography flyer will have: (1) a clear contrast between headline font (bold, bigger, eye-catching) and body font (clean, readable), (2) proper size hierarchy (headline much larger than body), (3) adequate line-height so text is not cramped, (4) high contrast color so text pops against the background, (5) left-aligned or center-aligned text that looks intentional.',
      expectedOutput: 'A flyer that feels polished and professional because the typography choices support the hierarchy and message.'
    }
  },
  {
    id: 'gd-layout-hierarchy',
    category: 'Graphic Design',
    title: 'Layout, Alignment, Hierarchy & the Grid',
    difficulty: 'Beginner',
    theory: [
      'Layout is how you arrange elements (text, images, shapes) in a design. A strong layout guides the viewer\'s eye through your message in a logical order: they see the headline first, then the supporting image, then the body text, then the call-to-action. This is hierarchy — using size, color, position, and weight to signal what is most important. The viewer\'s eye naturally goes to the largest, brightest, or most contrasting element first. If your layout does not have a clear hierarchy, the viewer feels lost and leaves. In Indian education, hierarchy is especially important because students and teachers scan designs quickly looking for key information (due date, topic, grade). A bad layout buries the due date in small gray text; a good layout puts it front and center in a bold color.',
      'Alignment means lining up elements on invisible columns and rows so the design looks organized and intentional. A misaligned design feels sloppy or unfinished, even if the individual elements are beautiful. Most professional designs use a grid: an invisible structure of evenly spaced columns and rows. Canva\'s "Grids & Guides" feature (View → Grids & Guides) reveals these grids so you can snap elements to them. Left-aligning most elements is safe; center alignment works for headlines and short content; right-alignment is rare. When you align multiple elements to the same invisible line, they feel like a unit.',
      'The rule of thirds is a popular layout hack: divide your space into nine equal sections (3 columns × 3 rows) and place important elements where the lines intersect. This creates a balanced, visually appealing composition. Another approach: the Z-pattern, where the viewer\'s eye naturally travels in a Z shape (top-left → top-right → middle-left → middle-right → bottom-left → bottom-right). Position your most important elements along this Z path.'
    ],
    code: `Layout & alignment steps in Canva:
STEP 1: Set up a grid
  - View → Grids & Guides → turn on "Snap to Grid"
  - Choose your grid size (10px is common for precision).

STEP 2: Plan your hierarchy
  - What is the most important thing? Make it biggest and boldest (headline).
  - What is secondary? (image, supporting text) Make it medium size or secondary color.
  - What is least important? (footer text, fine print) Keep it small or light gray.

STEP 3: Apply alignment
  - Left-align: most elements (text blocks, lists) for a clean, scannable feel.
  - Center-align: headlines, logos, or important CTAs.
  - Avoid center-aligning body text (hard to scan).

STEP 4: Use consistent spacing
  - Between headline and body: at least 20–30px gap.
  - Between sections: larger gaps (40–60px) to show separation.
  - Use the same gaps throughout for a professional, polished feel.

RULE OF THIRDS (visual balance):
  - Imagine 3 columns and 3 rows on your canvas.
  - Place your focal point (main image or headline) on one of the intersections.
  - Avoid centering everything; slight offset feels more dynamic.

Z-PATTERN (where eye travels):
  - Top-left: headline or logo
  - Top-right: important info or CTA
  - Middle: supporting image or text
  - Bottom: call-to-action or footer`,
    notes: [
      'Use Canva\'s alignment tools (right panel, "Arrange") to align selected elements to each other or to the canvas center.',
      'Negative space is your friend. Do not cram every pixel. White space around elements makes them feel more important.',
      'Mobile-first thinking: design for phone size first, then see how it looks on desktop. If it works small, it will work big.'
    ],
    xp: 50,
    practice: {
      title: 'Redesign a Layout with Clear Hierarchy',
      description: 'Take an existing design (a book cover, event poster, social media post) and redesign it with a clear hierarchy: headline must be most prominent, supporting image secondary, body text small and readable, CTA bold and clickable-looking.',
      hint: 'Use Canva\'s grid feature while designing. It forces you to align elements intentionally instead of eyeballing it.',
      solution: 'A well-laid-out design will have: (1) a clear hierarchy (biggest element is headline, not image), (2) consistent alignment (every element snapped to grid or intentionally offset), (3) generous spacing between sections, (4) the viewer\'s eye naturally travels from headline → image → body → CTA.',
      expectedOutput: 'A redesigned poster or post where every element has a purpose and the layout is clean and organized.'
    }
  },
  {
    id: 'gd-canva-tools',
    category: 'Graphic Design',
    title: 'Working in Canva: Templates, Elements, Brand Kit & Export',
    difficulty: 'Beginner',
    theory: [
      'Canva is a design platform, not just a tool. It provides three main workflows: (1) templates — pre-designed layouts you customize, (2) blank designs — you build from scratch, (3) brand kit — a saved set of colors, fonts, and logos that keep your work consistent. Most beginners should start with templates because they teach you good layout and hierarchy. Over time, you will graduate to blank designs and custom brand kits. Canva\'s free plan includes millions of images, thousands of fonts, and thousands of templates. The paid plan (Canva Pro) adds video, brand kits, resizable designs, and early access to new features — but the free plan is enough to create professional graphics.',
      'Templates are pre-built designs for every use case: Instagram posts, posters, resumes, business cards, presentations, YouTube thumbnails, etc. When you choose a template, Canva gives you a starting point with placeholder text, images, and layout. You customize by: changing text, swapping images, adjusting colors, and moving elements. Templates are not cheating — they are how real designers work. The key skill is knowing how to customize a template so it feels like your own, not like a generic template everyone else is using.',
      'Export is where the magic becomes real. Canva supports PNG, PDF, and video formats. PNG is for screen (social media, email, website); PDF is for printing (posters, flyers, business cards). Always choose the right format: PNG loses quality at large sizes, so if you are printing a poster, use PDF or request the original high-res file from Canva Pro. Download settings matter too: make sure the resolution is at least 72 DPI for screen, 300 DPI for print.'
    ],
    code: `Canva workflow: from template to download
STEP 1: Choose a template
  - Create a design → search "Instagram post" (or your format) → click a template you like.
  - Canva suggests layouts, colors, and fonts that work well together.

STEP 2: Customize
  - Text: double-click text boxes to edit. Change headlines, body text, CTAs.
  - Images: click any image placeholder → Upload an image or search Canva\'s library.
  - Colors: click any element → adjust color in the right panel.
  - Elements: add more shapes, icons, or photos from the Elements tab.
  - Alignment: use View → Grids & Guides to align everything to a grid.

STEP 3: Brand Kit (if you work on multiple designs)
  - Design → Brand Kit → click "+" → upload your logo, add your colors, add your fonts.
  - Now every new design will suggest your brand colors and fonts automatically.
  - Use the same brand kit across all your designs (posts, resume, portfolio) for consistency.

STEP 4: Download & export
  - Share button (top right) → Download.
  - Choose format: PNG (for social media, web) or PDF (for printing).
  - PNG: 72 DPI for social, 300 DPI for high-quality prints.
  - Click Download. Your file is ready!

TIPS:
  - Always work at the intended size (Canva auto-sizes to format, e.g., Instagram 1080×1350px).
  - Before you download, view your design at 50% zoom to see how it looks at small size.
  - Save your Canva file (it auto-saves) so you can edit it later if needed.`,
    notes: [
      'Do not be afraid to deviate from the template. Use it as a starting point, not a cage. Change colors, swap layouts, add your own images.',
      'Canva free plan has usage limits on some premium elements, but there are plenty of free options. Look for the "free" label on any element.',
      'Brand consistency: if you are making multiple designs (posts, flyers, posts), create a brand kit with your logos, colors, and fonts. Use it every time.'
    ],
    xp: 50,
    practice: {
      title: 'Create & Export a Multi-Piece Brand Set',
      description: 'Choose a brand or cause you care about (a school club, a study group, a hobby, a social cause). Create three designs using the same template-based workflow: an Instagram post, a poster, and a simple thumbnail. Use the same colors and fonts across all three to practice brand consistency.',
      hint: 'Create a brand kit first (3–5 colors, 1–2 fonts, optional logo) and apply it to all three designs. This teaches consistency.',
      solution: 'Three successful designs will have: (1) consistent color palette across all three, (2) consistent font choices (same headline font, same body font), (3) each design properly sized for its format (1080×1350px for Instagram, standard print size for poster, etc.), (4) all three exported as PNG or PDF.',
      expectedOutput: 'A set of three designs that feel like they belong to the same brand or organization because they share the same visual language.'
    }
  },
  {
    id: 'gd-social-media-design',
    category: 'Graphic Design',
    title: 'Designing for Social Media: Sizes, Instagram, Thumbnails',
    difficulty: 'Beginner',
    theory: [
      'Social media has changed how and where people consume content. Posts are now vertical (portrait, optimized for phone screens), not horizontal (landscape). Different platforms have different ideal sizes: Instagram posts are 1080×1350 pixels (portrait) or 1080×1080 pixels (square); Stories are 1080×1920 pixels (full height); YouTube thumbnails are 1280×720 pixels. When you design for social media, you are designing for a phone screen first. Text should be bold and large, images should be eye-catching, and the message should be clear in the first second. A social media post has about 2–3 seconds to grab attention before the user scrolls past. Indian social media users are extremely visual — the best posts combine high-quality images, bold typography, and strategic color.',
      'Instagram is Syllab\'s core platform for reaching Indian students. A successful Instagram grid (collection of posts) has visual consistency: the same color palette, the same fonts, and images that feel like they belong together. Each post should stand alone but also feel like part of a series. Captions matter, but the image must speak first. Instagram Stories (temporary 24-hour posts) are more casual but still benefit from hierarchy and readability. Instagram Reels (short videos) are Canva\'s newest feature and require even tighter messaging (viewers will skip after 1 second if not hooked).',
      'Thumbnails for YouTube and blog posts are 1280×720 pixels and typically feature one bold, centered focal point (often a face or object) with large, readable text overlaid. Successful thumbnails use high contrast and saturation to stand out in a grid of other videos. Text should be readable even at 100×100 pixels (the size it appears in search results or recommendations).'
    ],
    code: `Social media design sizes & best practices
INSTAGRAM POST:
  - Size: 1080×1350px (portrait, "Feed")
  - Or: 1080×1080px (square)
  - Best for: photos, quotes, educational tips, reels.
  - Design tip: Fit text within 20px margin on all sides so it is not cut off on phones.

INSTAGRAM STORY:
  - Size: 1080×1920px (full vertical)
  - Best for: announcements, behind-the-scenes, quick tips.
  - Design tip: Put important info above 300px from the bottom (phone UI hides it).

YOUTUBE THUMBNAIL:
  - Size: 1280×720px (landscape)
  - Best for: video previews.
  - Design tip: ONE bold focal point (face, object, text) in the center. High contrast.

TWITTER/X POST:
  - Size: up to 1024×512px (landscape or portrait).
  - Best for: text + image, news, links.

CANVA WORKFLOW for social media:
1. Create a design → type "Instagram post" → pick a template.
2. Customize: text should be 48–72px for headlines, 24–32px for body.
3. Images: use high-quality, eye-catching photos. Avoid blurry or low-contrast images.
4. Export: Download as PNG, 72 DPI.
5. Upload to platform: Instagram, YouTube, etc.

COLOR & CONTRAST RULE:
  - Use a bold accent color against a neutral or contrasting background.
  - Avoid: pastel on pastel (low contrast, unreadable on phone).
  - Test: view your design on your actual phone before posting.`,
    notes: [
      'Social media algorithms favor posts with high engagement. High-contrast, bold designs get more clicks and likes than subtle designs.',
      'Text on images should have a background shape (semi-transparent rectangle) for readability, especially if the image is busy or colorful.',
      'Vertical video (Stories, Reels) is now more important than horizontal. Design with phones first, always.'
    ],
    xp: 60,
    practice: {
      title: 'Create an Instagram Post Series',
      description: 'Plan and design 3 Instagram posts for a cause, skill, or topic you care about (study tips, wellness, local culture, art, etc.). Each post should be 1080×1350px and use the same color palette and fonts (brand consistency). Include a headline, body text or tip, and a compelling image.',
      hint: 'Create your brand kit first (3–5 colors, 2 fonts), then use it for all three posts. Consistency makes your profile look professional.',
      solution: 'Three successful social posts will have: (1) consistent brand identity across all three (same colors, fonts), (2) clear hierarchy (headline readable at thumb-size), (3) high-contrast text that pops against the image, (4) each properly sized (1080×1350px), (5) room for captions (do not place critical text in the bottom 20% where captions appear).',
      expectedOutput: 'Three post graphics that could be posted immediately to Instagram without any further editing.'
    }
  },
  {
    id: 'gd-resume-poster-logo',
    category: 'Graphic Design',
    title: 'Creating a Resume, Poster & Simple Logo',
    difficulty: 'Intermediate',
    theory: [
      'A resume is more than a list of qualifications — it is a design document. A well-designed resume uses hierarchy to guide recruiters to your strongest achievements, white space to make it scannable, and subtle color to show personality without being unprofessional. Indian students entering college or competing for internships are discovering that resumes with design (color, icons, strategic layout) stand out. A traditional resume is one column of text; a modern resume uses sections, icons, and color to organize information and make key achievements pop. Canva offers resume templates that balance professional structure with visual interest.',
      'A poster communicates a single message to a large audience (from far away, at small sizes on a phone). Effective posters use one bold visual (image or shape), a short headline (5–10 words max), and minimal body text. Posters for events need: date, time, location, and a call-to-action (sign up, buy tickets, learn more). Posters for causes (environmental, social) need a clear message and a path to action. Indian schools and colleges rely on posters for everything from fundraisers to study group announcements. A poorly designed poster gets torn down or ignored; a well-designed poster stops students mid-hallway.',
      'A logo is a simple, memorable symbol that represents a brand, organization, or person. Logos do not need to be complex — the most memorable logos (Apple, Nike, McDonald\'s) are extremely simple. A logo should work at any size (from favicon on a website to large print) and in one color (black and white) or multiple colors. A simple way to start: combine a shape (circle, square, triangle) with a letter or icon. Canva is not ideal for logos (it lacks advanced features), but it is fine for beginners learning logo design principles.'
    ],
    code: `Design checklist for resume, poster & logo
RESUME DESIGN:
  1. Choose a template with clear hierarchy (headline, sections, achievements).
  2. Use 1–2 complementary fonts (one for headings, one for body).
  3. Add subtle color: a sidebar or accent color for section headers, but keep it professional (navy, teal, deep gray).
  4. Organize content in reverse chronological order: most recent/important first.
  5. Include: headline (name + title/goal), education, experience, skills, projects (2–3 best projects, not all 10).
  6. Export as PDF so formatting does not shift when sent to recruiters.
  7. Print test: does it look good on paper at 8.5"×11"? Text readable? Not cramped?

POSTER DESIGN:
  1. Start with a template or blank canvas (usually A3, A2, or 27"×40" for large prints).
  2. ONE bold image or shape (focal point) — this grabs attention first.
  3. Headline: big, bold, 5–10 words max. Example: "Free JEE Mock Test Saturday 2 PM".
  4. Supporting text (small, under the headline): what, when, where, why.
  5. Call-to-action (button or bold text): "Sign Up", "Learn More", "Share with Friends".
  6. Color: 2–3 colors max. Use one accent color for CTAs.
  7. Test readability: at phone size (thumbnail), can you read the headline? If not, it is too small.
  8. Export as PDF for printing (300 DPI) or PNG for digital sharing (72 DPI).

LOGO DESIGN:
  1. Sketch ideas on paper first (what shape, what initials or icons represent the brand?).
  2. In Canva: start with a shape (circle, square) from Elements.
  3. Add text (initials or name) or an icon (search Elements for icons).
  4. Keep it simple: 1–2 colors, simple shapes, no gradients (gradients don't scale well).
  5. Test sizes: how does it look at 16×16px (favicon)? 500×500px (social profile)? Both should be recognizable.
  6. Save versions: one color version, one black & white version (for embroidery, fax, print).
  7. Logo should work alone (without text) or with text beside it.`,
    notes: [
      'Recruiters spend 5–7 seconds scanning a resume. Design it so your strongest achievements are visible in those 5 seconds.',
      'Posters are read from 10 feet away. Headline font must be ≥48pt. Test by printing and stepping back.',
      'Logos are tiny sometimes. Avoid thin lines or small details that disappear at small sizes.'
    ],
    xp: 75,
    practice: {
      title: 'Design Your Resume or a Poster',
      description: 'Choose one: (1) Design a one-page resume for yourself or a fictional student (with real or invented accomplishments). Or (2) Design a poster for a real or fictional event (school fair, study session, fundraiser, local event). Follow the checklists above. Include all required information and test readability at small sizes.',
      hint: 'For resume: use a Canva resume template and customize it with your info and brand colors. For poster: start with a blank canvas and build hierarchy from scratch.',
      solution: 'A successful resume will have: clear hierarchy (name/headline prominent, sections easy to scan), 1–2 complementary fonts, subtle professional color, fits on one page, exports cleanly to PDF. A successful poster will have: one bold focal point, headline readable at small size (50% zoom), clear CTA, organized information, 2–3 colors max.',
      expectedOutput: 'A resume or poster that looks professional and is ready to share (print, email, or post online) without further design.'
    }
  },
  {
    id: 'gd-design-checklist',
    category: 'Graphic Design',
    title: 'Design Principles Checklist, Exporting & Portfolio Project',
    difficulty: 'Intermediate',
    theory: [
      'CRAP (Contrast, Repetition, Alignment, Proximity) is a legendary framework for evaluating design quality. Contrast makes your design visually interesting and guides the eye to what matters (big text vs. small, bold vs. light, hot color vs. cool). Repetition builds cohesion: if your headings are all the same font and color, the design feels intentional and organized. Alignment means nothing is randomly placed; every element snaps to an invisible grid or line. Proximity means related elements are grouped close together; unrelated elements are separated. Master these four principles and you can design anything. Many amateur designs fail on alignment or proximity — elements feel scattered. Professional designs nail all four.',
      'Exporting is the final step that translates digital into physical or published. The wrong export settings destroy all your hard work: low resolution, wrong color mode, compressed quality, oversized file. PNG is raster (pixels) and ideal for screen; PDF is vector-friendly and ideal for print. For screen: 72 DPI, RGB color, 1–2 MB max (for fast loading). For print: 300 DPI, CMYK color, any size (resolution matters more than file size). Canva handles most of this, but you must choose the right format when exporting.',
      'A design portfolio showcases your best work and tells the story of your growth as a designer. Whether you are applying for a design job, freelance gigs, or just building your personal brand, a portfolio is your proof of skill. A good portfolio includes 5–10 pieces that show range: different styles, different challenges, different media (social, print, digital). Each piece should include a brief explanation: what was the challenge, what did you design, what feedback did you get? A portfolio can be a Canva presentation, a website (built in Wix, WordPress, etc.), or an Instagram grid.'
    ],
    code: `CRAP principle checklist (use before finalizing any design):
☐ CONTRAST: Does your design have visual interest?
  - Is the headline clearly different from body text (size, weight, color)?
  - Are important elements visually distinct from less important ones?
  - Is there enough color difference between text and background (high contrast)?

☐ REPETITION: Does your design feel intentional and organized?
  - Are all headings the same font, size, and color?
  - Are bulleted lists, sections, or repeated elements consistent?
  - Do accent colors appear in multiple places (not just once)?

☐ ALIGNMENT: Is everything organized?
  - Do elements snap to an invisible grid?
  - Is text left-aligned, center-aligned, or right-aligned consistently?
  - Are shapes, images, and text blocks aligned to each other?
  - (Use View → Grids & Guides in Canva to verify alignment)

☐ PROXIMITY: Are related elements grouped together?
  - Is text close to its related image?
  - Are related sections separated from other sections by white space?
  - Does the layout show which elements belong together and which are separate?

EXPORT SETTINGS:
  For social media (PNG):
    - Resolution: 72 DPI
    - Color mode: RGB
    - File format: PNG (smaller, web-friendly)
    - File size: under 2 MB (for fast loading)

  For print (PDF or high-res PNG):
    - Resolution: 300 DPI
    - Color mode: CMYK (for accurate printing)
    - File format: PDF (preserves fonts and layout)
    - File size: does not matter (will be printed)

PORTFOLIO STRUCTURE:
  - 5–10 best designs (mix of styles and media)
  - For each: title, date, brief context (what was the assignment?), what you learned
  - Format: Canva presentation, website, or Instagram grid
  - Share with: teachers, friends, potential employers, mentors for feedback`,
    notes: [
      'Before you call a design "done," step away for 24 hours and look again with fresh eyes. You will spot issues you missed.',
      'Ask for feedback: "Does the headline stand out?" "Can you read this on your phone?" "What is the most important thing in this design?" Real feedback is gold.',
      'Portfolio is not just for designers seeking jobs. It is for anyone building a personal brand or learning design. Start building yours now.'
    ],
    xp: 100,
    practice: {
      title: 'Design & Export a Multi-Piece Portfolio Project',
      description: 'Design a small portfolio: choose a fictional brand (student study club, small business, personal coaching service, nonprofit) and create 3–4 designs for it: a social post, a poster, a simple logo, and optionally a business card. Save all files with correct settings. Write a brief portfolio description for each: title, format, what you designed, and one challenge you overcame.',
      hint: 'Before exporting: run through the CRAP checklist. Screenshot your design and ask a friend: "What is the most important thing here?" If they don\'t guess right, hierarchy needs work.',
      solution: 'A strong portfolio project will have: (1) 3–4 cohesive designs (same brand identity, colors, fonts), (2) each exported with correct settings (PNG for social, PDF for print), (3) a portfolio writeup explaining the project and design choices, (4) clear evidence of hierarchy, alignment, repetition, and proximity in each design, (5) readability tested on mobile.',
      expectedOutput: 'A complete, exportable portfolio project with multiple designs and written descriptions. Ready to share, print, or present to teachers/mentors.'
    }
  }
];
