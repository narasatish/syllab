import type { TutorialTopic } from './types';

export const cssTopics: TutorialTopic[] = [
  {
    id: 'css-intro',
    category: 'Getting Started',
    title: 'Introduction to CSS',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `CSS (Cascading Style Sheets) controls the visual appearance of HTML pages — colors, fonts, sizes, spacing, layout, and animations. Without CSS, every website would look like a plain text document.`,
      `There are 3 ways to add CSS: inline (style attribute on element), internal (<style> in <head>), and external (separate .css file linked with <link>). External is best for real projects.`,
      `"Cascading" means multiple styles can apply to the same element. The browser resolves conflicts using specificity (more specific selectors win) and order (last declaration wins if equal specificity).`,
    ],
    syntax: `/* Selector { property: value; } */

/* 1. Inline (avoid for large projects) */
<p style="color: red;">

/* 2. Internal */
<style> p { color: red; } </style>

/* 3. External */
<link rel="stylesheet" href="styles.css">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Introduction</title>
  <style>
    /* Universal selector — applies to ALL elements */
    * {
      box-sizing: border-box;  /* include padding in width */
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      padding: 30px;
      line-height: 1.6;
    }

    h1 {
      color: #10b981;           /* green color */
      font-size: 2rem;          /* relative unit */
      margin-bottom: 12px;
      letter-spacing: -1px;    /* tighter spacing */
    }

    h2 {
      color: #6366f1;
      font-size: 1.3rem;
      margin: 24px 0 8px;
      border-left: 4px solid #6366f1;
      padding-left: 12px;
    }

    p {
      color: #374151;
      margin-bottom: 12px;
      max-width: 600px;
    }

    /* Class selector — starts with dot */
    .highlight {
      background-color: #fef9ec;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 12px 16px;
      font-weight: bold;
    }

    /* ID selector — starts with hash (unique!) */
    #special-box {
      background: linear-gradient(135deg, #10b981, #6366f1);
      color: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      font-size: 1.2rem;
      margin-top: 20px;
    }

    /* Hover state */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #10b981;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 16px;
      font-weight: bold;
    }

    .btn:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  </style>
</head>
<body>

  <h1>Welcome to CSS! 🎨</h1>
  <p>CSS makes websites beautiful. Everything you see — colors, fonts, spacing, layout — is CSS.</p>

  <h2>Element Selector</h2>
  <p>This paragraph is styled by the <code>p</code> selector.</p>

  <h2>Class Selector (.highlight)</h2>
  <p class="highlight">This paragraph has the "highlight" class applied to it!</p>

  <div id="special-box">
    I'm styled with #special-box ID selector (gradient background!)
  </div>

  <div class="btn">Hover Over Me!</div>

</body>
</html>`,
    notes: [
      `Class selectors (.class) can be reused on multiple elements. ID selectors (#id) should be unique per page.`,
      `Specificity order (most to least): !important > inline style > #id > .class > element.`,
      `Use relative units (rem, em, %) over fixed pixels (px) for responsive designs.`,
    ],
    practice: {
      title: 'Style a Profile Card',
      description: `Create a profile card with: a colored header with name, a body with bio text, a blue button, and a footer. Use background colors, border-radius, padding, font sizes, and a hover effect on the button.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Profile Card</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; justify-content: center; padding: 40px; background: #f1f5f9; }

    .card {
      background: white;
      border-radius: 16px;
      width: 300px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .card-header {
      background: #6366f1;
      color: white;
      padding: 24px;
      text-align: center;
    }

    .card-header h2 { margin: 0; font-size: 1.5rem; }
    .card-header p { margin: 4px 0 0; opacity: 0.8; font-size: 0.9rem; }

    .card-body {
      padding: 20px;
    }

    .card-body p { color: #6b7280; line-height: 1.6; margin: 0 0 16px; }

    .btn {
      display: block;
      width: 100%;
      padding: 12px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h2>Arjun Sharma</h2>
      <p>Class 11 — Science Stream</p>
    </div>
    <div class="card-body">
      <p>Passionate about physics, coding, and cricket. Aspiring IIT student from Delhi.</p>
      <button class="btn">View Profile</button>
    </div>
  </div>
</body>
</html>`,
      hint: `Use border-radius: 16px for rounded corners, box-shadow for card shadow, and overflow: hidden to clip the header corners.`,
    },
  },

  {
    id: 'css-flexbox',
    category: 'Layout',
    title: 'CSS Flexbox',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `Flexbox (Flexible Box Layout) is the most powerful tool for creating one-dimensional layouts (row or column). Apply display: flex to a container and its children become flex items that can be arranged flexibly.`,
      `Key container properties: flex-direction (row/column), justify-content (horizontal alignment), align-items (vertical alignment), flex-wrap (wrap to next line), gap (space between items).`,
      `Key item properties: flex: 1 (item takes equal remaining space), flex-grow, flex-shrink, flex-basis, align-self (override container alignment for one item).`,
    ],
    syntax: `.container {
  display: flex;
  flex-direction: row;         /* row | column */
  justify-content: center;     /* main axis */
  align-items: center;         /* cross axis */
  gap: 16px;                   /* space between */
  flex-wrap: wrap;             /* wrap items */
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Flexbox</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    h2 { color: #6366f1; margin: 30px 0 10px; }
    .box { background: #6366f1; color: white; padding: 16px; border-radius: 8px; font-weight: bold; text-align: center; min-width: 60px; }
    .demo { background: #e0e7ff; border-radius: 12px; padding: 16px; margin-bottom: 10px; }
    label { font-size: 12px; color: #6b7280; font-weight: bold; display: block; margin-bottom: 8px; }

    /* ---- Demos ---- */
    .flex-row { display: flex; gap: 12px; }
    .flex-center { display: flex; justify-content: center; align-items: center; gap: 12px; min-height: 80px; }
    .flex-between { display: flex; justify-content: space-between; }
    .flex-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
    .flex-column { display: flex; flex-direction: column; gap: 8px; }

    /* Real-world: Navbar */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 16px 24px;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    .nav-logo { color: #10b981; font-size: 1.3rem; font-weight: black; }
    .nav-links { display: flex; gap: 20px; }
    .nav-links a { color: #94a3b8; text-decoration: none; }
    .nav-links a:hover { color: white; }

    /* Real-world: Card Grid */
    .card-grid { display: flex; flex-wrap: wrap; gap: 16px; }
    .card {
      flex: 1 1 200px;  /* grow, shrink, min-width */
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .card h3 { color: #10b981; margin: 0 0 8px; }
    .card p { color: #6b7280; margin: 0; font-size: 14px; }

    /* Equal-width items with flex: 1 */
    .flex-equal { display: flex; gap: 12px; }
    .flex-equal .box { flex: 1; }
  </style>
</head>
<body>
  <h1>CSS Flexbox Guide</h1>

  <!-- Basic row -->
  <h2>1. flex-direction: row (default)</h2>
  <div class="demo flex-row">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
  </div>

  <!-- Center -->
  <h2>2. justify-content: center + align-items: center</h2>
  <div class="demo flex-center">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
  </div>

  <!-- Space between -->
  <h2>3. justify-content: space-between</h2>
  <div class="demo flex-between">
    <div class="box">Left</div>
    <div class="box">Center</div>
    <div class="box">Right</div>
  </div>

  <!-- Flex wrap -->
  <h2>4. flex-wrap: wrap (many items)</h2>
  <div class="demo flex-wrap">
    <div class="box">1</div><div class="box">2</div><div class="box">3</div>
    <div class="box">4</div><div class="box">5</div><div class="box">6</div>
    <div class="box">7</div><div class="box">8</div>
  </div>

  <!-- Equal widths -->
  <h2>5. flex: 1 (equal widths)</h2>
  <div class="demo flex-equal">
    <div class="box">Equal</div>
    <div class="box">Equal</div>
    <div class="box">Equal</div>
    <div class="box">Equal</div>
  </div>

  <!-- Real-world: Navbar -->
  <h2>6. Real World: Navigation Bar</h2>
  <nav class="navbar">
    <div class="nav-logo">Syllab</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Learn</a>
      <a href="#">Practice</a>
      <a href="#">Blog</a>
    </div>
  </nav>

  <!-- Real-world: Card Grid -->
  <h2>7. Real World: Responsive Card Grid</h2>
  <div class="card-grid">
    <div class="card"><h3>Python 🐍</h3><p>Learn Python basics to advanced OOP</p></div>
    <div class="card"><h3>HTML 📄</h3><p>Build web pages from scratch</p></div>
    <div class="card"><h3>CSS 🎨</h3><p>Style beautiful, responsive sites</p></div>
    <div class="card"><h3>SQL 🗄️</h3><p>Query and manage databases</p></div>
  </div>
</body>
</html>`,
    notes: [
      `Flexbox is one-dimensional (row OR column). For 2D layouts (rows AND columns), use CSS Grid.`,
      `flex: 1 on items makes them share the available space equally. flex: 2 takes twice as much as flex: 1.`,
      `The most common Flexbox pattern: display: flex; justify-content: space-between; align-items: center; — used in virtually every navbar.`,
    ],
    practice: {
      title: 'Product Cards Layout',
      description: `Build a product listing page with a flex navbar (logo left, links right), and a responsive card grid using flexbox + flex-wrap. Cards should have image placeholder, title, price, and a button. Min 4 cards.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Cards</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f1f5f9; }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 16px 30px;
    }
    .logo { color: #10b981; font-size: 1.4rem; font-weight: bold; }
    .nav-links { display: flex; gap: 20px; }
    .nav-links a { color: #94a3b8; text-decoration: none; }

    .container { max-width: 1000px; margin: 30px auto; padding: 0 20px; }
    h1 { margin-bottom: 20px; }

    .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .product-card {
      flex: 1 1 200px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    .product-img { width: 100%; height: 140px; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
    .product-info { padding: 16px; }
    .product-name { font-weight: bold; margin-bottom: 6px; }
    .product-price { color: #10b981; font-size: 1.1rem; font-weight: bold; margin-bottom: 12px; }
    .add-btn { width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .add-btn:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">🛍️ ShopSyllab</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Products</a>
      <a href="#">Cart</a>
    </div>
  </nav>

  <div class="container">
    <h1>📦 Products</h1>
    <div class="card-grid">
      <div class="product-card">
        <div class="product-img">📚</div>
        <div class="product-info">
          <div class="product-name">NCERT Maths Book</div>
          <div class="product-price">₹199</div>
          <button class="add-btn">Add to Cart</button>
        </div>
      </div>
      <!-- Add 3 more cards -->
    </div>
  </div>
</body>
</html>`,
      hint: `flex: 1 1 200px means: grow to fill space, shrink if needed, minimum width 200px. Add more .product-card divs to fill the grid.`,
    },
  },

  {
    id: 'css-grid',
    category: 'Layout',
    title: 'CSS Grid',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `CSS Grid is a 2D layout system — it handles both rows AND columns simultaneously. It's the best tool for complex page layouts, dashboards, and magazine-style designs.`,
      `Apply display: grid to the container. Define columns with grid-template-columns and rows with grid-template-rows. Use fr (fraction) units to share available space: 1fr 1fr = two equal columns.`,
      `Items can span multiple cells using grid-column and grid-row. gap adds space between cells. Use grid-template-areas for named layout areas (very readable!).`,
    ],
    syntax: `.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 cols */
  grid-template-rows: auto;
  gap: 16px;
}
.span-2 { grid-column: span 2; } /* span 2 columns */`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Grid</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    h2 { color: #10b981; margin: 30px 0 10px; }
    .box { background: #10b981; color: white; padding: 16px; border-radius: 8px; font-weight: bold; text-align: center; }
    .box-purple { background: #6366f1; }
    .box-orange { background: #f59e0b; color: #1e293b; }

    /* Basic grid */
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }

    /* Asymmetric columns */
    .grid-asym { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 16px; }

    /* Auto-fill responsive */
    .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-bottom: 16px; }

    /* Spanning */
    .grid-span { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .span-full { grid-column: 1 / -1; }  /* span all columns */
    .span-2 { grid-column: span 2; }

    /* Page layout with named areas */
    .page-layout {
      display: grid;
      grid-template-columns: 200px 1fr 150px;
      grid-template-rows: 60px 1fr 50px;
      grid-template-areas:
        "header  header  header"
        "sidebar main    aside"
        "footer  footer  footer";
      gap: 10px;
      min-height: 350px;
    }
    .layout-header  { grid-area: header; background: #1e293b; color: white; display: flex; align-items: center; padding: 0 20px; border-radius: 8px; }
    .layout-sidebar { grid-area: sidebar; background: #e0e7ff; padding: 16px; border-radius: 8px; }
    .layout-main    { grid-area: main; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .layout-aside   { grid-area: aside; background: #fef9ec; padding: 16px; border-radius: 8px; }
    .layout-footer  { grid-area: footer; background: #1e293b; color: #94a3b8; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>CSS Grid Guide</h1>

  <h2>1. Equal 3-Column Grid</h2>
  <div class="grid-3">
    <div class="box">Col 1</div>
    <div class="box">Col 2</div>
    <div class="box">Col 3</div>
    <div class="box">Col 4</div>
    <div class="box">Col 5</div>
    <div class="box">Col 6</div>
  </div>

  <h2>2. Asymmetric (2fr + 1fr)</h2>
  <div class="grid-asym">
    <div class="box box-purple">Main Content (2fr)</div>
    <div class="box box-orange">Sidebar (1fr)</div>
  </div>

  <h2>3. Auto-Fill Responsive Grid</h2>
  <div class="grid-auto">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
    <div class="box">D</div>
    <div class="box">E</div>
    <div class="box">F</div>
  </div>

  <h2>4. Spanning Cells</h2>
  <div class="grid-span">
    <div class="box span-full box-orange">Header (spans all 3 columns)</div>
    <div class="box span-2">Spans 2 cols</div>
    <div class="box box-purple">1 col</div>
    <div class="box">Normal</div>
    <div class="box">Normal</div>
    <div class="box">Normal</div>
  </div>

  <h2>5. Full Page Layout (grid-template-areas)</h2>
  <div class="page-layout">
    <header class="layout-header">🌐 Syllab.in</header>
    <aside class="layout-sidebar"><b>Sidebar</b><br>Navigation</aside>
    <main class="layout-main"><b>Main Content</b><p>This is where your main content goes. The layout is fully controlled by CSS Grid areas!</p></main>
    <div class="layout-aside"><b>Ads / Info</b></div>
    <footer class="layout-footer">© 2026 Syllab.in</footer>
  </div>
</body>
</html>`,
    notes: [
      `fr (fraction) is a flexible unit. 1fr 2fr gives columns in 1:2 ratio. 1fr 1fr 1fr = three equal columns.`,
      `grid-column: 1 / -1 means "from column line 1 to the last column line" — always spans full width.`,
      `auto-fill vs auto-fit: auto-fill keeps empty columns; auto-fit collapses them. Use auto-fit for most responsive grids.`,
    ],
    practice: {
      title: 'Dashboard Layout',
      description: `Build a dashboard layout using CSS Grid: a header (full width), a sidebar (left, fixed 220px), main content area with a 2x2 stat card grid inside, and a footer. Use named grid areas.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f1f5f9; height: 100vh; }

    .dashboard {
      display: grid;
      grid-template-columns: 220px 1fr;
      grid-template-rows: 60px 1fr 50px;
      grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer";
      min-height: 100vh;
      gap: 0;
    }

    header { grid-area: header; background: #1e293b; color: white; display: flex; align-items: center; padding: 0 24px; font-size: 1.2rem; font-weight: bold; }
    aside  { grid-area: sidebar; background: #1e293b; color: #94a3b8; padding: 20px; }
    main   { grid-area: main; padding: 24px; }
    footer { grid-area: footer; background: #1e293b; color: #64748b; display: flex; align-items: center; justify-content: center; font-size: 14px; }

    aside nav a { display: block; color: #94a3b8; text-decoration: none; padding: 10px; border-radius: 8px; margin: 4px 0; }
    aside nav a:hover { background: #334155; color: white; }

    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .stat-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .stat-card h3 { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
    .stat-card .value { font-size: 2rem; font-weight: bold; color: #10b981; }
  </style>
</head>
<body>
  <div class="dashboard">
    <header>📊 Student Dashboard</header>
    <aside>
      <nav>
        <a href="#">🏠 Home</a>
        <a href="#">📚 Syllabus</a>
        <a href="#">🎯 Practice</a>
        <a href="#">📈 Progress</a>
      </nav>
    </aside>
    <main>
      <h2 style="margin-bottom:16px">Overview</h2>
      <div class="stats">
        <div class="stat-card"><h3>XP Points</h3><div class="value">1,240</div></div>
        <div class="stat-card"><h3>Chapters Done</h3><div class="value">28</div></div>
        <div class="stat-card"><h3>Accuracy</h3><div class="value">87%</div></div>
        <div class="stat-card"><h3>Streak</h3><div class="value">7 days</div></div>
      </div>
    </main>
    <footer>© 2026 Syllab.in</footer>
  </div>
</body>
</html>`,
      hint: `grid-template-areas lets you name sections visually. Each row is a string, columns are space-separated names.`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'css-box-model',
    category: 'CSS Fundamentals',
    title: 'Box Model',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Every HTML element is a rectangular box. The CSS box model describes how size is calculated: content → padding → border → margin.',
      'Content: the actual text/image area. Padding: space between content and border (inside). Border: the edge line. Margin: space outside the border (between elements).',
      'box-sizing: content-box (default) — padding and border add to the total size. box-sizing: border-box — padding and border are included in the declared width/height. Always use border-box!',
      'Use margin: auto on a block element with a declared width to center it horizontally.',
    ],
    syntax: `/* Box model properties */
.box {
  width: 300px;
  padding: 20px;         /* all sides */
  padding: 10px 20px;    /* top/bottom  left/right */
  border: 2px solid #3b82f6;
  margin: 15px auto;     /* vertical | horizontal (auto = center) */
  box-sizing: border-box; /* recommended! */
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; padding: 20px; background: #f1f5f9; }

    .content-box {
      width: 250px;
      padding: 20px;
      border: 4px solid #3b82f6;
      margin: 10px;
      background: #dbeafe;
    }
    .border-box {
      width: 250px;
      padding: 20px;
      border: 4px solid #10b981;
      margin: 10px;
      background: #d1fae5;
      box-sizing: border-box;
    }
    .visual-box {
      width: 250px; height: 120px;
      padding: 20px;
      border: 8px solid #8b5cf6;
      margin: 20px auto;
      background: #ede9fe;
      text-align: center;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold;
    }
    .centered {
      width: 300px;
      margin: 20px auto;
      background: #fef3c7;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #f59e0b;
    }
  </style>
</head>
<body>
  <h1>The CSS Box Model</h1>

  <div class="content-box">
    content-box (default)<br>
    Total width = 250 + 40 padding + 8 border = 298px
  </div>

  <div class="border-box">
    border-box<br>
    Total width = exactly 250px (padding + border INSIDE)
  </div>

  <div class="visual-box">
    Content Area<br>
    <small>padding: 20px | border: 8px</small>
  </div>

  <div class="centered">
    margin: auto centers me horizontally!<br>
    width must be set for this to work.
  </div>
</body>
</html>`,
    practice: {
      title: 'Card with Box Model',
      description: `Create a student card using the box model:
- Use box-sizing: border-box on *
- Card: width=320px, centered with margin:auto, padding:24px, border-radius:16px
- Inside: student name (h2), marks badge, and a "View Profile" button
- Add consistent spacing using margin and padding
- Add a colored left border using border-left: 4px solid #3b82f6`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial; padding: 20px; background: #f1f5f9; }
    .card {
      /* Add your box model styles */
    }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 999px; }
    button { margin-top: 12px; padding: 8px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Priya Sharma</h2>
    <p>Class 10 | Roll No: 21</p>
    <span class="badge">92/100</span><br>
    <button>View Profile</button>
  </div>
</body>
</html>`,
      hint: 'Set width:320px, margin:20px auto, padding:24px, border-radius:16px, background:white, border-left:4px solid #3b82f6 on .card.',
    },
  },

  {
    id: 'css-typography',
    category: 'CSS Fundamentals',
    title: 'Typography & Text Styling',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'CSS typography properties control how text looks: font-family, font-size, font-weight, font-style, line-height, letter-spacing, text-align, text-decoration, text-transform.',
      'Font sizes: px (fixed), em (relative to parent), rem (relative to root, recommended), % (percentage of parent), vw (viewport width).',
      'Good typography rule: body line-height 1.5–1.6 for readability. Use rem for font sizes so users can resize browser text.',
      'Google Fonts: add <link> tag in head to import custom fonts, then use font-family in CSS.',
    ],
    syntax: `body {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 16px;   /* base size */
  line-height: 1.6;  /* 1.6x the font size */
}
h1 { font-size: 2.5rem; font-weight: 900; }
p { font-size: 1rem; color: #334155; }
.label { text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; padding: 20px; max-width: 600px; color: #1e293b; }
    h1 { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 8px; }
    h2 { font-size: 1.5rem; font-weight: 600; margin: 20px 0 8px; }
    p { font-size: 1rem; line-height: 1.7; color: #475569; margin-bottom: 12px; }
    .label { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #10b981; }
    .big { font-size: 3rem; font-weight: 900; color: #3b82f6; }
    .italic { font-style: italic; }
    .strike { text-decoration: line-through; color: #94a3b8; }
    .underline { text-decoration: underline wavy #ef4444; }
    .centered { text-align: center; }
    .right { text-align: right; }
    blockquote {
      border-left: 4px solid #3b82f6; padding-left: 16px; margin: 12px 0;
      font-style: italic; color: #475569;
    }
  </style>
</head>
<body>
  <p class="label">Typography Demo</p>
  <h1>Beautiful Typography in CSS</h1>
  <p>Good typography makes text easy to read and visually appealing. Line height, font size, and spacing all matter.</p>

  <h2>Text Decorations</h2>
  <p><span class="italic">Italic text</span> · <span class="strike">Strikethrough</span> · <span class="underline">Wavy underline</span></p>

  <h2>Text Alignment</h2>
  <p>Left aligned (default)</p>
  <p class="centered">Center aligned</p>
  <p class="right">Right aligned</p>

  <h2>Font Sizes</h2>
  <div class="big">3rem</div>
  <p style="font-size:1.5rem">1.5rem · <span style="font-size:1rem">1rem</span> · <span style="font-size:0.8rem">0.8rem</span></p>

  <blockquote>"The best investment you can make is in yourself." — Warren Buffett</blockquote>
</body>
</html>`,
    practice: {
      title: 'Article Typography',
      description: `Style a class article using proper typography:
- Import a Google Font (Inter or Poppins)
- h1: large, bold, dark color
- A "CATEGORY" label above h1: small caps, uppercase, colored
- Paragraphs: 1rem, line-height 1.7, muted gray
- A blockquote with left border
- An author line: right-aligned, italic, small text`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; padding: 20px; max-width: 640px; color: #1e293b; }
    /* Add your typography styles here */
  </style>
</head>
<body>
  <p class="category">Study Tips</p>
  <h1>How to Score 90+ in Board Exams</h1>
  <p>Consistent revision is the key to success in board exams. Start early, plan well, and practice with past papers.</p>
  <blockquote>"Success is the sum of small efforts repeated day in and day out."</blockquote>
  <p>Focus on understanding concepts rather than memorising. Use mind maps, flashcards, and practice tests.</p>
  <p class="author">— Syllab Academic Team</p>
</body>
</html>`,
      hint: '.category: uppercase, letter-spacing:0.12em, font-size:0.75rem, color:#10b981. blockquote: border-left:4px solid #3b82f6. .author: text-align:right, font-style:italic.',
    },
  },

  {
    id: 'css-selectors',
    category: 'CSS Fundamentals',
    title: 'CSS Selectors',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS selectors target which HTML elements to style. Types: element (p), class (.card), id (#header), attribute ([type="email"]), descendant (div p), child (div > p), adjacent sibling (h2 + p).',
      'Pseudo-classes style elements in a specific state: :hover, :focus, :active, :first-child, :last-child, :nth-child(n), :not(selector).',
      'Pseudo-elements style specific parts of an element: ::before, ::after (insert content), ::first-line, ::first-letter, ::placeholder.',
      'Specificity order (highest wins): inline style > #id > .class > element. When specificity is equal, the last rule wins.',
    ],
    syntax: `/* Element, class, id */
p { }   .card { }   #header { }

/* Descendant, child, sibling */
div p { }     /* any p inside div */
div > p { }   /* direct child p of div */
h2 + p { }    /* p immediately after h2 */

/* Pseudo-classes */
a:hover { }   input:focus { }   li:nth-child(2) { }

/* Pseudo-elements */
p::first-line { }  .card::before { content: "★"; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }

    /* Element selector */
    p { color: #475569; margin: 8px 0; }

    /* Class selector */
    .highlight { background: #fef3c7; padding: 4px 8px; border-radius: 4px; }

    /* Attribute selector */
    input[type="email"] { border: 2px solid #3b82f6; }
    input[type="text"] { border: 2px solid #10b981; }

    /* Pseudo-classes */
    a:hover { color: #3b82f6; text-decoration: none; }
    li:first-child { font-weight: bold; color: #ef4444; }
    li:last-child { color: #8b5cf6; }
    li:nth-child(2) { font-style: italic; }
    li:not(.skip) { padding: 4px 0; }

    /* Pseudo-elements */
    .quote::before { content: '"'; font-size: 2rem; color: #3b82f6; }
    .quote::after { content: '"'; font-size: 2rem; color: #3b82f6; }

    /* Child selector */
    .nav > a { padding: 6px 12px; background: #1e293b; color: white;
               border-radius: 6px; text-decoration: none; margin-right: 5px; }
    .nav > a:hover { background: #3b82f6; }

    input { padding: 8px; border-radius: 6px; margin: 5px; }
    .subjects { list-style: none; padding: 0; }
    .subjects li { padding: 4px 0; border-bottom: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <h1>CSS Selectors</h1>

  <nav class="nav">
    <a href="#">Home</a>
    <a href="#">Learn</a>
    <a href="#">Test</a>
  </nav>

  <h2>List with :nth-child selectors</h2>
  <ul class="subjects">
    <li>Maths (first-child → bold red)</li>
    <li>Science (nth-child(2) → italic)</li>
    <li>English</li>
    <li class="skip">History</li>
    <li>Computer (last-child → purple)</li>
  </ul>

  <h2>Attribute Selectors on Inputs</h2>
  <input type="text" placeholder="text → green border">
  <input type="email" placeholder="email → blue border">

  <h2>Pseudo-element ::before/::after</h2>
  <p class="quote">Education is the most powerful weapon.</p>

  <p>This word is <span class="highlight">highlighted</span> using a class.</p>
</body>
</html>`,
    practice: {
      title: 'Zebra Table with Selectors',
      description: `Style a subjects table using only CSS selectors (no inline styles or classes on rows):
- Odd rows: white background
- Even rows: light blue background (#eff6ff)
- First row (header): dark background, white text
- Last row: italic, muted
- Hover on any row: slight yellow highlight
- Use tr:nth-child, tr:first-child, tr:last-child`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    td, th { padding: 12px 16px; text-align: left; }
    /* Add your selector styles below */

  </style>
</head>
<body>
  <table>
    <tr><th>Subject</th><th>Teacher</th><th>Marks</th></tr>
    <tr><td>Maths</td><td>Mrs. Sharma</td><td>92</td></tr>
    <tr><td>Science</td><td>Mr. Patel</td><td>87</td></tr>
    <tr><td>English</td><td>Ms. Nair</td><td>95</td></tr>
    <tr><td>History</td><td>Mr. Singh</td><td>78</td></tr>
    <tr><td>Average</td><td>—</td><td>88</td></tr>
  </table>
</body>
</html>`,
      hint: 'tr:first-child for header. tr:nth-child(even) for blue rows. tr:last-child for italic. tr:hover for hover effect.',
    },
  },

  {
    id: 'css-transitions-animations',
    category: 'CSS Effects',
    title: 'Transitions & Animations',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS transitions smoothly animate property changes (like hover effects). Syntax: transition: property duration timing-function delay.',
      'Timing functions: ease (default), linear, ease-in, ease-out, ease-in-out, cubic-bezier(). They control the speed curve of the animation.',
      'CSS animations (@keyframes) run automatically without user interaction. Define keyframes with from/to or percentages. Use animation property to apply.',
      'Properties that perform best (GPU-accelerated): transform, opacity. Avoid animating width, height, top, left — these cause layout recalculation (reflow) which is slow.',
    ],
    syntax: `/* Transition */
.button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.button:hover { background-color: #3b82f6; transform: scale(1.05); }

/* Keyframe animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card { animation: fadeIn 0.5s ease-out forwards; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; background: #f8fafc; }

    /* Hover button transitions */
    .btn {
      padding: 10px 24px; border: none; border-radius: 8px; cursor: pointer;
      font-weight: bold; margin: 6px;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    }
    .btn-blue { background: #3b82f6; color: white; }
    .btn-blue:hover { background: #1d4ed8; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(59,130,246,0.4); }
    .btn-green { background: #10b981; color: white; }
    .btn-green:hover { background: #059669; transform: scale(1.05); }

    /* Animated card entrance */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .card {
      background: white; border-radius: 12px; padding: 20px; margin: 10px 0;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      animation: slideUp 0.5s ease-out both;
    }
    .card:nth-child(2) { animation-delay: 0.1s; }
    .card:nth-child(3) { animation-delay: 0.2s; }

    /* Spinning loader */
    @keyframes spin { to { transform: rotate(360deg); } }
    .loader {
      width: 40px; height: 40px; border: 4px solid #e2e8f0;
      border-top-color: #3b82f6; border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 15px;
    }

    /* Pulsing badge */
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
    .badge {
      display: inline-block; background: #ef4444; color: white;
      padding: 6px 16px; border-radius: 999px; font-weight: bold;
      animation: pulse 1.5s ease-in-out infinite;
    }
  </style>
</head>
<body>
  <h1>Transitions & Animations</h1>

  <h2>Hover Transitions</h2>
  <button class="btn btn-blue">Hover me (lift effect)</button>
  <button class="btn btn-green">Hover me (scale effect)</button>

  <h2>Card Entrance Animation</h2>
  <div class="card">📚 Maths — 12 chapters</div>
  <div class="card">🔬 Science — 10 chapters</div>
  <div class="card">💻 Computer — 8 chapters</div>

  <h2>Loading Spinner</h2>
  <div class="loader"></div>

  <h2>Pulsing Badge</h2>
  <span class="badge">🔴 LIVE</span>
</body>
</html>`,
    practice: {
      title: 'Animated Subject Cards',
      description: `Create 3 subject cards with animations:
1. Cards fade in with a staggered delay (0s, 0.15s, 0.3s) using animation-delay
2. On hover: card lifts up (translateY(-6px)) and shadow deepens
3. Subject icon inside each card has a slow rotate animation (360deg, 3s, infinite)
4. A "NEW" badge pulses (scale 1 → 1.1 → 1)`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; background: #f8fafc; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.1); } }

    .cards { display: flex; gap: 15px; flex-wrap: wrap; }
    .card {
      background: white; border-radius: 16px; padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; width: 160px;
      /* Add animation here */
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    /* Add hover, icon spin, badge pulse here */
  </style>
</head>
<body>
  <div class="cards">
    <div class="card" style="animation-delay:0s">
      <div class="icon">🔢</div>
      <strong>Maths</strong>
      <span class="badge">NEW</span>
    </div>
    <div class="card" style="animation-delay:0.15s">
      <div class="icon">🔬</div>
      <strong>Science</strong>
    </div>
    <div class="card" style="animation-delay:0.3s">
      <div class="icon">💻</div>
      <strong>Computer</strong>
    </div>
  </div>
</body>
</html>`,
      hint: '.card: animation: fadeIn 0.5s ease-out both. .card:hover: transform:translateY(-6px). .icon: animation:spin 3s linear infinite. .badge: animation:pulse 1.5s ease-in-out infinite.',
    },
  },

  {
    id: 'css-transforms',
    category: 'CSS Effects',
    title: 'CSS Transforms',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS transforms move, rotate, scale, and skew elements without affecting document flow. The element moves visually but its space in the layout stays.',
      '2D transforms: translate(x,y) moves element, rotate(deg) rotates, scale(x,y) resizes, skewX/Y tilts. Combine with transform: translate() rotate() scale().',
      '3D transforms: rotateX/Y/Z, perspective, translateZ create 3D effects. Add perspective to the parent container.',
      'transform-origin sets the anchor point for transforms (default: center center). Use it to rotate around a corner or edge.',
    ],
    syntax: `/* 2D Transforms */
.move { transform: translate(50px, 20px); }
.rotate { transform: rotate(45deg); }
.scale { transform: scale(1.5); }
.skew { transform: skewX(15deg); }
.combined { transform: translate(10px, -5px) rotate(5deg) scale(1.1); }

/* 3D */
.flip { transform: rotateY(180deg); perspective: 800px; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 30px; background: #f8fafc; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
    .box {
      background: #3b82f6; color: white; border-radius: 12px; padding: 20px;
      text-align: center; font-weight: bold; cursor: pointer;
      transition: transform 0.3s ease;
    }
    .box:nth-child(2) { background: #10b981; }
    .box:nth-child(3) { background: #f59e0b; color: #1e293b; }
    .box:nth-child(4) { background: #ef4444; }
    .box:nth-child(5) { background: #8b5cf6; }
    .box:nth-child(6) { background: #ec4899; }

    /* Transform demos on hover */
    .translate:hover { transform: translate(10px, -10px); }
    .rotate:hover { transform: rotate(15deg); }
    .scale:hover { transform: scale(1.15); }
    .skew:hover { transform: skewX(-10deg); }
    .combined:hover { transform: translate(-5px,-5px) rotate(5deg) scale(1.05); }
    .origin {
      transform-origin: top left;
    }
    .origin:hover { transform: rotate(20deg); }

    /* Flip card 3D */
    .flip-container { perspective: 600px; width: 200px; height: 120px; margin: 20px auto; }
    .flip-card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s; }
    .flip-container:hover .flip-card { transform: rotateY(180deg); }
    .front, .back {
      position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
      display: flex; align-items: center; justify-content: center;
      border-radius: 12px; font-weight: bold;
    }
    .front { background: #3b82f6; color: white; }
    .back { background: #10b981; color: white; transform: rotateY(180deg); }
  </style>
</head>
<body>
  <h1>CSS Transforms (hover each box)</h1>
  <div class="grid">
    <div class="box translate">translate()<br>Move</div>
    <div class="box rotate">rotate(15deg)<br>Rotate</div>
    <div class="box scale">scale(1.15)<br>Scale</div>
    <div class="box skew">skewX(-10deg)<br>Skew</div>
    <div class="box combined">Combined<br>transforms</div>
    <div class="box origin">transform-origin<br>top left</div>
  </div>

  <h2>3D Flip Card (hover)</h2>
  <div class="flip-container">
    <div class="flip-card">
      <div class="front">📚 Front — Maths</div>
      <div class="back">✅ Score: 92/100</div>
    </div>
  </div>
</body>
</html>`,
    practice: {
      title: 'Animated Score Reveal',
      description: `Create 4 subject cards that flip on hover to reveal the score:
- Front: subject emoji + name, colored background
- Back: score + grade, different color
- Smooth 3D flip using rotateY
- Scales slightly when hovered (scale 1.05 on flip-container)
- Add transition and transform-style: preserve-3d

Subjects: Maths 92, Science 87, English 95, History 78`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 30px; background: #f1f5f9; }
    .cards { display: flex; gap: 15px; flex-wrap: wrap; }
    .flip-container {
      perspective: 600px;
      width: 150px; height: 150px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .flip-container:hover { transform: scale(1.05); }
    .flip-card {
      width: 100%; height: 100%;
      position: relative;
      /* Add transform-style and transition */
    }
    /* Flip on hover */
    .flip-container:hover .flip-card { /* rotateY */ }
    .front, .back {
      position: absolute; width: 100%; height: 100%;
      /* Add backface-visibility, flex centering, border-radius */
    }
    .back { /* Add rotateY(180deg) so it starts flipped */ }
  </style>
</head>
<body>
  <div class="cards">
    <div class="flip-container">
      <div class="flip-card">
        <div class="front" style="background:#3b82f6;color:white">🔢<br>Maths</div>
        <div class="back" style="background:#1d4ed8;color:white">92/100<br>Grade A+</div>
      </div>
    </div>
    <!-- Add 3 more cards for Science, English, History -->
  </div>
</body>
</html>`,
      hint: 'flip-card: transform-style:preserve-3d, transition:transform 0.6s. On hover: transform:rotateY(180deg). front,back: backface-visibility:hidden. back: transform:rotateY(180deg).',
    },
  },

  {
    id: 'css-variables',
    category: 'CSS Advanced',
    title: 'CSS Variables (Custom Properties)',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS Custom Properties (variables) let you store values and reuse them throughout your stylesheet. They start with -- and are accessed with var().',
      'Declare variables in :root to make them globally available. You can override them in specific selectors to create themes.',
      'Variables are inherited — a variable set on a parent is available to all its children. This makes theming very powerful.',
      'The second argument to var() is a fallback: var(--color, blue) uses blue if --color is not defined.',
    ],
    syntax: `/* Declare variables in :root (global scope) */
:root {
  --primary: #3b82f6;
  --radius: 12px;
  --font-size-base: 1rem;
}

/* Use with var() */
.card {
  background: var(--primary);
  border-radius: var(--radius);
  font-size: var(--font-size-base);
}

/* Override for dark theme */
[data-theme="dark"] { --primary: #60a5fa; }`,
    code: `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --primary: #3b82f6;
      --secondary: #10b981;
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #1e293b;
      --text-muted: #64748b;
      --radius: 12px;
      --shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    /* Dark theme overrides */
    [data-theme="dark"] {
      --bg: #0f172a;
      --surface: #1e293b;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --shadow: 0 2px 12px rgba(0,0,0,0.4);
    }

    body { font-family: Arial; background: var(--bg); color: var(--text);
           padding: 20px; transition: background 0.3s, color 0.3s; }
    .card {
      background: var(--surface); border-radius: var(--radius);
      box-shadow: var(--shadow); padding: 20px; margin: 12px 0;
    }
    h1 { color: var(--primary); }
    .badge { background: var(--secondary); color: white; padding: 4px 12px;
             border-radius: 999px; font-size: 12px; font-weight: bold; }
    .muted { color: var(--text-muted); font-size: 0.875rem; }
    button {
      padding: 10px 20px; background: var(--primary); color: white;
      border: none; border-radius: var(--radius); cursor: pointer;
      font-weight: bold; transition: opacity 0.2s;
    }
    button:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <h1>CSS Variables Demo</h1>
  <button onclick="toggleTheme()">Toggle Dark/Light Mode</button>

  <div class="card">
    <h2>Python <span class="badge">Beginner</span></h2>
    <p class="muted">Learn Python from basics to advanced with AI feedback.</p>
  </div>
  <div class="card">
    <h2>SQL <span class="badge">Intermediate</span></h2>
    <p class="muted">Master database queries with real-world examples.</p>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    }
  </script>
</body>
</html>`,
    practice: {
      title: 'Themeable Subject Cards',
      description: `Create a card layout using only CSS variables:
- Define at least 6 custom properties in :root: --primary, --bg, --card-bg, --text, --radius, --shadow
- A toggle button that switches between blue theme and purple theme (change --primary and related variables with JS dataset or different class)
- 3 subject cards that automatically update when theme changes
- All colors, radius, shadows must use var()`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --primary: #3b82f6;
      /* Add more variables */
    }
    .theme-purple {
      /* Override variables for purple theme */
    }
    body { font-family: Arial; background: var(--bg, #f8fafc); padding: 20px; }
    .card { /* Use var() for all styles */ }
  </style>
</head>
<body>
  <button onclick="document.body.classList.toggle('theme-purple')">Toggle Theme</button>
  <div class="card">📚 Maths — 12 chapters</div>
  <div class="card">🔬 Science — 10 chapters</div>
  <div class="card">💻 Computer — 8 chapters</div>
</body>
</html>`,
      hint: 'Define all colors as var() references. Toggle a class on body that overrides --primary and --bg. Everything updates automatically!',
    },
  },

  {
    id: 'css-responsive',
    category: 'CSS Advanced',
    title: 'Responsive Design & Media Queries',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Media queries apply CSS rules only when specific conditions are met — like screen width. This is how websites adapt to mobile, tablet, and desktop layouts.',
      'Mobile-first approach: write base styles for small screens, then add @media (min-width: ...) to enhance for larger screens. This is the recommended approach.',
      'Common breakpoints: 480px (small phone), 640px (large phone), 768px (tablet), 1024px (laptop), 1280px (desktop).',
      'Responsive units help: % (percentage of parent), vw/vh (viewport width/height), rem (root font size), min()/max()/clamp() for fluid sizing.',
    ],
    syntax: `/* Mobile-first base styles */
.container { padding: 16px; }

/* Tablet and above */
@media (min-width: 768px) {
  .container { max-width: 768px; margin: 0 auto; padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial; padding: 16px; background: #f8fafc; color: #1e293b; }

    /* Mobile first: 1 column */
    .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

    /* Tablet: 2 columns */
    @media (min-width: 640px) {
      .grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* Desktop: 3 columns */
    @media (min-width: 1024px) {
      .grid { grid-template-columns: repeat(3, 1fr); }
      body { padding: 32px; max-width: 1100px; margin: 0 auto; }
    }

    .card { background: white; border-radius: 12px; padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .card h2 { font-size: clamp(1rem, 2.5vw, 1.25rem); margin-bottom: 8px; }

    /* Responsive nav */
    nav { background: #1e293b; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; }
    .nav-links { display: flex; gap: 12px; flex-wrap: wrap; }
    .nav-links a { color: white; text-decoration: none; font-size: 14px;
                   padding: 6px 12px; border-radius: 6px; }
    .nav-links a:hover { background: rgba(255,255,255,0.15); }

    @media (max-width: 480px) {
      .nav-links { flex-direction: column; }
      .hide-mobile { display: none; }
    }

    /* Responsive text */
    h1 { font-size: clamp(1.5rem, 5vw, 2.5rem); margin-bottom: 16px; }

    .badge { font-size: 11px; background: #3b82f6; color: white;
             padding: 2px 10px; border-radius: 999px; }
  </style>
</head>
<body>
  <nav>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Syllabus</a>
      <a href="#">Skills Lab</a>
      <a href="#" class="hide-mobile">Updates</a>
      <a href="#" class="hide-mobile">About</a>
    </div>
  </nav>

  <h1>Responsive Subject Grid</h1>
  <p style="margin-bottom:16px;color:#64748b">Resize the window to see layout change!</p>

  <div class="grid">
    <div class="card"><h2>🔢 Maths <span class="badge">12 chapters</span></h2><p>Algebra, Geometry, Calculus</p></div>
    <div class="card"><h2>🔬 Science <span class="badge">10 chapters</span></h2><p>Physics, Chemistry, Biology</p></div>
    <div class="card"><h2>💻 Computer <span class="badge">8 chapters</span></h2><p>Programming, Networks, AI</p></div>
    <div class="card"><h2>📖 English <span class="badge">6 chapters</span></h2><p>Grammar, Literature, Writing</p></div>
    <div class="card"><h2>🌍 Social <span class="badge">9 chapters</span></h2><p>History, Geography, Civics</p></div>
    <div class="card"><h2>🎨 Art <span class="badge">4 chapters</span></h2><p>Drawing, Colour Theory</p></div>
  </div>
</body>
</html>`,
    practice: {
      title: 'Responsive Dashboard',
      description: `Build a fully responsive student dashboard:
- Mobile (<640px): 1-column grid, stacked nav
- Tablet (640px+): 2-column grid
- Desktop (1024px+): 3-column grid + sidebar
- Use clamp() for responsive heading size
- Hide non-essential nav links on mobile with display:none
- Cards have consistent padding using CSS variables`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial; padding: 16px; background: #f8fafc; }
    :root { --card-pad: 20px; --radius: 12px; }
    /* Mobile-first base styles */
    .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
    /* Add tablet and desktop breakpoints */
    /* @media (min-width: 640px) { ... } */
    /* @media (min-width: 1024px) { ... } */
    .card { background: white; border-radius: var(--radius); padding: var(--card-pad); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  </style>
</head>
<body>
  <h1>My Study Dashboard</h1>
  <div class="grid">
    <div class="card">📚 Maths — 12 chapters</div>
    <div class="card">🔬 Science — 10 chapters</div>
    <div class="card">💻 Computer — 8 chapters</div>
    <div class="card">📖 English — 6 chapters</div>
    <div class="card">🌍 Social Studies — 9 chapters</div>
    <div class="card">🎨 Arts — 4 chapters</div>
  </div>
</body>
</html>`,
      hint: '@media (min-width:640px) { .grid { grid-template-columns: repeat(2, 1fr); } }. clamp(1.5rem, 5vw, 2.5rem) for h1.',
    },
  },
];
