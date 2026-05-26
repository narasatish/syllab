import type { TutorialTopic } from './types';

export const htmlTopics: TutorialTopic[] = [
  {
    id: 'html-intro',
    category: 'Getting Started',
    title: 'Introduction to HTML',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `HTML (HyperText Markup Language) is the standard language for creating web pages. Every website you visit is built with HTML. It describes the structure and content of a page using tags enclosed in angle brackets.`,
      `HTML is NOT a programming language — it's a markup language. You use it to tell the browser what content to show: headings, paragraphs, images, links, tables, forms, and much more.`,
      `A basic HTML document has a DOCTYPE declaration, an html root element, a head (metadata) and body (visible content). Browsers read this and render the visual page.`,
    ],
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <!-- content goes here -->
  </body>
</html>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>

  <h1>Welcome to My Website 🌐</h1>
  <p>This is my first web page, built with HTML!</p>

  <h2>About Me</h2>
  <p>My name is <strong>Arjun Sharma</strong>. I am a <em>Class 11</em> student.</p>
  <p>I am learning web development at <mark>Syllab.in</mark>!</p>

  <hr>

  <h3>My Favourite Things</h3>
  <p>I love coding, cricket, and <b>mango ice cream</b>. 🥭</p>

</body>
</html>`,
    notes: [
      `Tags come in pairs: opening <p> and closing </p>. Self-closing tags like <br> and <img> don't need a closing tag.`,
      `The <head> contains metadata (not visible). The <body> contains everything users see.`,
      `Always include DOCTYPE and charset for correct rendering across all browsers.`,
    ],
    practice: {
      title: 'Personal Bio Page',
      description: `Create an HTML page with: a heading with your name, a paragraph about yourself, bold and italic text for emphasis, a horizontal rule, and a sub-heading with your hobbies.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About Me</title>
</head>
<body>

  <h1>Your Name Here</h1>
  <p>Write a short bio about yourself here.</p>

  <p>My favourite subject is <strong>_____</strong> and I enjoy <em>_____</em>.</p>

  <hr>

  <h2>My Hobbies</h2>
  <p>Add your hobbies here!</p>

</body>
</html>`,
      hint: `Use <strong> for bold, <em> for italic, <hr> for a horizontal line, <h1>...<h6> for headings.`,
    },
  },

  {
    id: 'html-links-images',
    category: 'Getting Started',
    title: 'Links & Images',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `Links (<a>) connect pages together — they are the foundation of the web. The href attribute specifies the destination URL. Use target="_blank" to open in a new tab.`,
      `Images (<img>) display pictures. The src attribute is the image source (URL or file path). The alt attribute is mandatory — it describes the image for screen readers and shows when the image fails to load.`,
      `Images and links can be combined: wrap an <img> inside an <a> to create a clickable image link.`,
    ],
    syntax: `<a href="https://url.com">Link Text</a>
<a href="url" target="_blank">New Tab</a>

<img src="image.jpg" alt="Description" width="300">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Links & Images</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    img { border-radius: 8px; }
    a { color: #10b981; font-weight: bold; }
  </style>
</head>
<body>

  <h1>Links & Images Demo</h1>

  <!-- External link -->
  <p>Visit <a href="https://syllab.in" target="_blank">Syllab.in</a> to learn more!</p>

  <!-- Internal link (anchor to section on same page) -->
  <p><a href="#section2">Jump to Section 2 ↓</a></p>

  <!-- Image from URL -->
  <h2>A Beautiful Landscape</h2>
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
    alt="Mountain landscape"
    width="500"
    style="max-width:100%"
  >

  <!-- Clickable image link -->
  <h2>Clickable Image</h2>
  <a href="https://www.nasa.gov" target="_blank">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png"
      alt="NASA Logo"
      width="100"
    >
  </a>
  <p>Click the NASA logo to visit NASA's website!</p>

  <div id="section2">
    <h2>Section 2</h2>
    <p>You jumped here from the anchor link above! 🎉</p>
  </div>

</body>
</html>`,
    notes: [
      `Always add alt text to images for accessibility and SEO. Missing alt is bad practice.`,
      `Use relative URLs (/about, ../images/photo.jpg) for same-site links. Use full URLs for external sites.`,
      `href="#id" creates an anchor link to an element with that id on the same page.`,
    ],
    practice: {
      title: 'Navigation Page',
      description: `Create an HTML page with: 3 external links to your favourite websites, one image with alt text, and one clickable image that links somewhere. Style it with a little inline CSS.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Favourite Links</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; }
    a { color: #2563eb; display: block; margin: 8px 0; }
  </style>
</head>
<body>
  <h1>My Favourite Websites 🔗</h1>

  <a href="https://syllab.in" target="_blank">Syllab.in — AI Learning</a>
  <a href="" target="_blank">Add your second favourite site</a>
  <a href="" target="_blank">Add your third favourite site</a>

  <h2>My Favourite Image</h2>
  <img src="https://picsum.photos/400/200" alt="Random beautiful photo" style="width:100%;border-radius:8px">

</body>
</html>`,
      hint: `Use target="_blank" to open links in a new tab. The src attribute holds the image URL.`,
    },
  },

  {
    id: 'html-lists',
    category: 'Content Elements',
    title: 'Lists',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `HTML has three types of lists: unordered lists (<ul>) show bullet points, ordered lists (<ol>) show numbered items, and description lists (<dl>) show term-definition pairs.`,
      `Each list item uses the <li> tag. Lists can be nested (list inside a list) to create sub-items — great for menus, outlines, and hierarchies.`,
      `Lists are one of the most used HTML elements for navigation menus, feature lists, FAQs, and structured content.`,
    ],
    syntax: `<ul><li>Bullet item</li></ul>      <!-- unordered -->
<ol><li>Numbered item</li></ol>   <!-- ordered -->
<dl>
  <dt>Term</dt><dd>Definition</dd>
</dl>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Lists</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; }
    h2 { color: #10b981; }
  </style>
</head>
<body>

  <h1>HTML Lists Demo</h1>

  <!-- Unordered list (bullets) -->
  <h2>🟢 My Subjects (Unordered)</h2>
  <ul>
    <li>Mathematics</li>
    <li>Physics</li>
    <li>Chemistry</li>
    <li>Computer Science</li>
  </ul>

  <!-- Ordered list (numbered) -->
  <h2>📋 Steps to Study (Ordered)</h2>
  <ol>
    <li>Read the chapter once</li>
    <li>Note down key points</li>
    <li>Solve practice problems</li>
    <li>Revise next day</li>
  </ol>

  <!-- Nested list -->
  <h2>🌳 Nested List</h2>
  <ul>
    <li>Science Stream
      <ul>
        <li>Physics</li>
        <li>Chemistry</li>
        <li>Biology / Maths</li>
      </ul>
    </li>
    <li>Commerce Stream
      <ul>
        <li>Accounts</li>
        <li>Business Studies</li>
        <li>Economics</li>
      </ul>
    </li>
  </ul>

  <!-- Description list -->
  <h2>📖 Glossary (Description List)</h2>
  <dl>
    <dt><strong>HTML</strong></dt>
    <dd>HyperText Markup Language — the structure of web pages.</dd>
    <dt><strong>CSS</strong></dt>
    <dd>Cascading Style Sheets — controls appearance and design.</dd>
    <dt><strong>JavaScript</strong></dt>
    <dd>Programming language that adds interactivity to pages.</dd>
  </dl>

</body>
</html>`,
    notes: [
      `You can change the list style with CSS: list-style-type: disc | circle | square | none for <ul>, and decimal | upper-roman | lower-alpha for <ol>.`,
      `Navigation menus are typically built with <ul> + <li> + <a> styled with CSS.`,
      `Nesting more than 3 levels deep is generally considered bad practice for readability.`,
    ],
    practice: {
      title: 'Course Curriculum Page',
      description: `Create an HTML page with: an unordered list of 4 subjects you study, an ordered list of 5 steps to prepare for exams, and a nested list showing at least 2 main topics each with 3 sub-topics.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Curriculum</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; line-height: 1.8; }
    h2 { color: #6366f1; }
  </style>
</head>
<body>
  <h1>My Study Plan 📚</h1>

  <h2>My Subjects</h2>
  <ul>
    <li>Add subject 1</li>
    <!-- Add more subjects -->
  </ul>

  <h2>Exam Preparation Steps</h2>
  <ol>
    <li>Step 1</li>
    <!-- Add more steps -->
  </ol>

  <h2>Topics & Sub-topics</h2>
  <ul>
    <li>Topic 1
      <ul>
        <li>Sub-topic 1.1</li>
        <li>Sub-topic 1.2</li>
      </ul>
    </li>
  </ul>
</body>
</html>`,
      hint: `Nest a <ul> inside an <li> to create a sub-list.`,
    },
  },

  {
    id: 'html-tables',
    category: 'Content Elements',
    title: 'Tables',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `Tables organize data in rows and columns. The main tags: <table> (container), <tr> (table row), <th> (header cell — bold & centered by default), <td> (data cell).`,
      `colspan merges cells across columns; rowspan merges cells across rows. <thead>, <tbody>, and <tfoot> give semantic structure to large tables.`,
      `Use CSS to make tables look great: add borders, alternate row colors (zebra striping), hover effects, and responsive behavior.`,
    ],
    syntax: `<table>
  <tr>
    <th>Header</th>   <!-- column header -->
  </tr>
  <tr>
    <td>Data</td>     <!-- data cell -->
  </tr>
</table>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Tables</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
    th { background-color: #10b981; color: white; padding: 10px; text-align: left; }
    td { border: 1px solid #e2e8f0; padding: 10px; }
    tr:nth-child(even) { background-color: #f8fafc; }
    tr:hover { background-color: #ecfdf5; }
  </style>
</head>
<body>

  <h1>Student Results Table</h1>

  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Maths</th>
        <th>Science</th>
        <th>English</th>
        <th>Total</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Priya Sharma</td>
        <td>98</td>
        <td>95</td>
        <td>92</td>
        <td>285</td>
        <td>A+</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Arjun Kumar</td>
        <td>94</td>
        <td>91</td>
        <td>89</td>
        <td>274</td>
        <td>A</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Kavya Reddy</td>
        <td>88</td>
        <td>93</td>
        <td>86</td>
        <td>267</td>
        <td>A</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5"><strong>Class Average</strong></td>
        <td colspan="2"><strong>275</strong></td>
      </tr>
    </tfoot>
  </table>

  <h2>colspan Example</h2>
  <table>
    <tr>
      <th colspan="3">School Timetable</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>Maths, Physics</td>
      <td>9:00 - 11:00</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td colspan="2">Chemistry Lab (Full Day)</td>
    </tr>
  </table>

</body>
</html>`,
    notes: [
      `border-collapse: collapse in CSS removes the double border between cells.`,
      `tr:nth-child(even) creates zebra-striped rows — a common pattern for readability.`,
      `Tables should only be used for tabular data, NOT for page layout. Use CSS Flexbox/Grid for layouts.`,
    ],
    practice: {
      title: 'Timetable Creator',
      description: `Create an HTML table showing a weekly school timetable (5 days × 6 periods). Use proper headers, colspan for breaks, and style it with CSS colors and borders.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>School Timetable</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th { background: #6366f1; color: white; padding: 10px; }
    td { border: 1px solid #e2e8f0; padding: 8px; text-align: center; }
    .break { background: #fef3c7; font-style: italic; }
  </style>
</head>
<body>
  <h1>Class 11A — Weekly Timetable</h1>
  <table>
    <tr>
      <th>Period</th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
    <tr>
      <td>1 (9-10)</td>
      <td>Maths</td>
      <td>Physics</td>
      <td>Maths</td>
      <td>Chemistry</td>
      <td>Maths</td>
    </tr>
    <tr>
      <td colspan="6" class="break">☕ Break (10-10:30)</td>
    </tr>
    <!-- Add more rows for other periods -->
  </table>
</body>
</html>`,
      hint: `Use colspan="6" for a row that spans all columns (like a break). Use background-color in CSS to color specific cells.`,
    },
  },

  {
    id: 'html-forms',
    category: 'Interactive Elements',
    title: 'Forms & Inputs',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `Forms (<form>) collect user input and send it to a server. They contain input elements: text fields, checkboxes, radio buttons, dropdowns, and buttons. Every input should have a <label> for accessibility.`,
      `The action attribute on <form> specifies where data is sent. The method attribute is GET (visible in URL) or POST (hidden). Input types: text, email, password, number, date, checkbox, radio, file, submit.`,
      `The name attribute on inputs is the key used when form data is submitted. Validation attributes: required, min, max, minlength, pattern.`,
    ],
    syntax: `<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Submit</button>
</form>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Registration Form</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 30px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; color: #374151; }
    input, select, textarea {
      width: 100%; padding: 10px; border: 2px solid #e2e8f0;
      border-radius: 8px; font-size: 14px; box-sizing: border-box;
    }
    input:focus, select:focus { border-color: #10b981; outline: none; }
    button {
      width: 100%; padding: 12px; background: #10b981; color: white;
      border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;
    }
    button:hover { background: #059669; }
    .radio-group { display: flex; gap: 20px; }
  </style>
</head>
<body>

  <h1>📝 Student Registration</h1>

  <form action="#" method="POST">

    <div class="form-group">
      <label for="fullname">Full Name *</label>
      <input type="text" id="fullname" name="fullname" placeholder="Arjun Sharma" required>
    </div>

    <div class="form-group">
      <label for="email">Email Address *</label>
      <input type="email" id="email" name="email" placeholder="arjun@school.in" required>
    </div>

    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone" placeholder="9876543210">
    </div>

    <div class="form-group">
      <label for="class">Class *</label>
      <select id="class" name="class" required>
        <option value="">Select class...</option>
        <option value="9">Class 9</option>
        <option value="10">Class 10</option>
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
      </select>
    </div>

    <div class="form-group">
      <label>Stream</label>
      <div class="radio-group">
        <label><input type="radio" name="stream" value="science"> Science</label>
        <label><input type="radio" name="stream" value="commerce"> Commerce</label>
        <label><input type="radio" name="stream" value="arts"> Arts</label>
      </div>
    </div>

    <div class="form-group">
      <label for="dob">Date of Birth</label>
      <input type="date" id="dob" name="dob">
    </div>

    <div class="form-group">
      <label for="about">Tell us about yourself</label>
      <textarea id="about" name="about" rows="3" placeholder="Write a short bio..."></textarea>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" name="agree" required>
        I agree to the Terms & Conditions
      </label>
    </div>

    <button type="submit">Register Now 🚀</button>

  </form>

</body>
</html>`,
    notes: [
      `Always pair every input with a <label>. Use the for attribute (matching the input's id) for accessibility.`,
      `type="email" and type="number" add built-in browser validation. required makes the field mandatory.`,
      `<textarea> is for multi-line text input. <select> creates a dropdown menu.`,
    ],
    practice: {
      title: 'Contact Us Form',
      description: `Build a "Contact Us" form with: name (text, required), email (email, required), subject dropdown (General/Technical/Billing), message textarea, and a styled submit button.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
    label { display: block; font-weight: bold; margin: 12px 0 4px; }
    input, select, textarea { width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; box-sizing: border-box; }
    button { margin-top: 15px; padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
  </style>
</head>
<body>
  <h1>📬 Contact Us</h1>
  <form>
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required placeholder="Your name">

    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required placeholder="you@email.com">

    <!-- Add subject dropdown and message textarea here -->

    <button type="submit">Send Message</button>
  </form>
</body>
</html>`,
      hint: `Use <select> with multiple <option> tags for the dropdown. Use <textarea rows="4"> for the message.`,
    },
  },

  {
    id: 'html-semantic',
    category: 'Modern HTML',
    title: 'Semantic HTML5',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `Semantic HTML uses meaningful tag names that describe their purpose: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. This makes code readable for humans and search engines alike.`,
      `Before HTML5, developers used <div id="header"> everywhere. Now we have specific tags. Search engines like Google give higher ranking to pages using semantic HTML correctly.`,
      `Screen readers (used by visually impaired users) rely on semantic tags to navigate content. Good semantics = good accessibility = more users.`,
    ],
    syntax: `<header>   <!-- site header/logo/nav -->
<nav>      <!-- navigation links -->
<main>     <!-- primary content -->
<section>  <!-- themed content group -->
<article>  <!-- independent content -->
<aside>    <!-- sidebar content -->
<footer>   <!-- bottom of page -->`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic HTML Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #1f2937; }

    header { background: #10b981; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: white; text-decoration: none; margin-left: 20px; font-weight: bold; }
    nav a:hover { text-decoration: underline; }

    main { max-width: 900px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }

    section h2 { color: #10b981; margin-bottom: 16px; }
    article { background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #10b981; }
    article h3 { margin-bottom: 8px; }
    article p { color: #6b7280; line-height: 1.6; }

    aside { background: #fef9ec; border-radius: 12px; padding: 20px; height: fit-content; }
    aside h3 { color: #d97706; margin-bottom: 12px; }
    aside ul { padding-left: 20px; line-height: 2; }

    footer { background: #1e293b; color: #94a3b8; text-align: center; padding: 20px; margin-top: 40px; }
  </style>
</head>
<body>

  <header>
    <h1>📚 Syllab News</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Courses</a>
      <a href="#">Blog</a>
      <a href="#">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Latest Articles</h2>

      <article>
        <h3>Python Now #1 Language for Class 12 CS</h3>
        <p>CBSE has officially introduced Python as the primary language for Class 11 and 12 Computer Science curriculum. Students across India are enrolling in Python courses.</p>
      </article>

      <article>
        <h3>JEE Advanced 2026 Results Announced</h3>
        <p>IIT JEE Advanced 2026 results are out! Over 40,000 students qualified this year, with Kota producing the highest number of top rankers.</p>
      </article>

      <article>
        <h3>AI Tools for Students: What You Need to Know</h3>
        <p>Artificial intelligence is transforming education. Learn how tools like Syllab AI Tutor can help you study smarter, not harder.</p>
      </article>
    </section>

    <aside>
      <h3>🔥 Trending Topics</h3>
      <ul>
        <li>Python Basics</li>
        <li>JEE Maths Tips</li>
        <li>NEET Biology</li>
        <li>Class 10 Boards</li>
        <li>AI in Education</li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Syllab.in — Free AI Learning for Every Indian Student</p>
  </footer>

</body>
</html>`,
    notes: [
      `<div> is still fine for generic layout containers. Use semantic tags for meaningful content areas.`,
      `<article> should be self-contained content that makes sense on its own (blog post, news article).`,
      `<section> groups related content with a heading. <aside> is for supplementary content (sidebar, ads, related links).`,
    ],
    practice: {
      title: 'Portfolio Page Layout',
      description: `Build a personal portfolio page using semantic HTML5: header with your name and nav, a main with two sections (About Me + Projects), an aside with skills list, and a footer with contact info.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; }
    header { background: #1e293b; color: white; padding: 20px; }
    nav a { color: #10b981; margin-left: 15px; text-decoration: none; }
    main { max-width: 900px; margin: 20px auto; padding: 20px; display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    aside { background: #f1f5f9; padding: 20px; border-radius: 8px; }
    footer { background: #1e293b; color: #94a3b8; text-align: center; padding: 20px; }
  </style>
</head>
<body>
  <header>
    <h1>Your Name</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
    </nav>
  </header>

  <main>
    <div>
      <section id="about">
        <h2>About Me</h2>
        <p>Write about yourself here...</p>
      </section>

      <section id="projects">
        <h2>My Projects</h2>
        <article>
          <h3>Project 1</h3>
          <p>Describe your project...</p>
        </article>
      </section>
    </div>

    <aside>
      <h3>Skills</h3>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>Python</li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>Contact: your@email.com</p>
  </footer>
</body>
</html>`,
      hint: `Use grid-template-columns: 2fr 1fr on main to split content into a 2/3 main area and 1/3 sidebar.`,
    },
  },

  {
    id: 'html-meta-seo',
    category: 'Modern HTML',
    title: 'Meta Tags & SEO Basics',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `Meta tags in the <head> provide information about the page to browsers, search engines, and social media. They are invisible to users but critical for SEO (Search Engine Optimization).`,
      `The most important meta tags: charset (encoding), viewport (mobile responsiveness), description (shown in Google results), keywords (less important now), and Open Graph tags (for social media previews).`,
      `The title tag (in <head>) is the most important SEO element — it appears in browser tabs and as the blue link in Google search results. Keep it under 60 characters.`,
    ],
    syntax: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description (max 160 chars)">
<meta property="og:title" content="Social media title">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding — always first! -->
  <meta charset="UTF-8">

  <!-- Mobile responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Browser tab title + Google search result title -->
  <title>Free AI Learning for Class 5-12 | Syllab.in</title>

  <!-- Google search result description (max 160 chars) -->
  <meta name="description"
    content="Syllab.in is a free AI learning platform for Class 5 to 12. Study CBSE NCERT with AI summaries, MCQs, mock tests, and AI tutor.">

  <!-- Keywords (less important in 2026, but still used) -->
  <meta name="keywords" content="NCERT, CBSE, JEE, NEET, free learning, Class 10, Class 12">

  <!-- Tell bots to index this page -->
  <meta name="robots" content="index, follow">

  <!-- Open Graph — how page looks when shared on WhatsApp/Twitter -->
  <meta property="og:title" content="Syllab.in — Free AI Learning">
  <meta property="og:description" content="Free CBSE NCERT learning with AI tutor, MCQs, and mock tests.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://syllab.in">

  <!-- Theme color for mobile browser -->
  <meta name="theme-color" content="#10b981">

  <!-- Favicon (browser tab icon) -->
  <link rel="icon" href="favicon.ico">

  <!-- Canonical URL — tells Google the preferred URL -->
  <link rel="canonical" href="https://syllab.in/">
</head>
<body>
  <h1>Page Content Here</h1>
  <p>The important stuff is all in the &lt;head&gt;!</p>
  <p>Right-click → View Page Source to see the meta tags.</p>

  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
  </style>

  <h2>SEO Checklist ✅</h2>
  <ul>
    <li>✅ charset UTF-8</li>
    <li>✅ viewport for mobile</li>
    <li>✅ Unique, descriptive title (under 60 chars)</li>
    <li>✅ Meta description (under 160 chars)</li>
    <li>✅ Open Graph tags</li>
    <li>✅ Canonical URL</li>
  </ul>
</body>
</html>`,
    notes: [
      `Google ignores the keywords meta tag now. Focus on title and description.`,
      `The description tag doesn't directly affect ranking, but a good description increases click-through rate from search results.`,
      `Always add lang="en" (or the appropriate language) to the <html> tag for accessibility and SEO.`,
    ],
    practice: {
      title: 'SEO-Optimized Page',
      description: `Create an HTML page about your school with all proper SEO meta tags: charset, viewport, title (under 60 chars), description (under 160 chars), keywords, OG tags, and canonical URL.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Write a good title (under 60 chars) -->
  <title>Your School Name — Nurturing Excellence Since ____</title>

  <!-- Write a good description (under 160 chars) -->
  <meta name="description" content="Add your school description here. Should be under 160 characters and describe what the page is about.">

  <meta name="keywords" content="school, education, your city, CBSE">

  <!-- Open Graph -->
  <meta property="og:title" content="Your School Name">
  <meta property="og:description" content="Short description for social sharing">
  <meta property="og:type" content="website">

  <link rel="canonical" href="https://yourschool.ac.in/">
</head>
<body>
  <h1>Welcome to Our School</h1>
  <p>Add content about your school here.</p>
</body>
</html>`,
      hint: `Keep the title under 60 characters and description under 160 characters. Open Graph tags start with og: prefix.`,
    },
  },

  {
    id: 'html-media',
    category: 'Content Elements',
    title: 'HTML Media (Video & Audio)',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `HTML5 introduced native <video> and <audio> elements — no more Flash plugins needed! Browsers can now play media directly.`,
      `The <video> element accepts MP4, WebM, and OGG formats. Add multiple <source> elements for cross-browser compatibility. The controls attribute shows play/pause/volume UI.`,
      `The <iframe> element embeds external content like YouTube videos, Google Maps, and other websites. Use it to embed YouTube by replacing /watch?v= with /embed/.`,
    ],
    syntax: `<video controls width="400">
  <source src="video.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>

<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Media</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; margin: 30px auto; padding: 20px; }
    h2 { color: #10b981; margin-top: 30px; }
    video, iframe { border-radius: 12px; max-width: 100%; }
  </style>
</head>
<body>

  <h1>🎬 HTML Media Elements</h1>

  <!-- Embedded YouTube Video (most common use) -->
  <h2>YouTube Embed</h2>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media"
    allowfullscreen
    style="max-width:100%"
  ></iframe>

  <!-- HTML5 Video (from URL) -->
  <h2>HTML5 Video</h2>
  <video
    controls
    width="560"
    style="max-width:100%"
    poster="https://via.placeholder.com/560x315?text=Video+Thumbnail"
  >
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <!-- Video attributes demo -->
  <h2>Autoplay + Muted + Loop</h2>
  <video autoplay muted loop width="300" style="max-width:100%">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  </video>

  <!-- Google Maps Embed -->
  <h2>Google Maps Embed</h2>
  <iframe
    src="https://maps.google.com/maps?q=New+Delhi,India&output=embed"
    width="100%"
    height="300"
    frameborder="0"
    style="border-radius:12px"
  ></iframe>

</body>
</html>`,
    notes: [
      `Always add autoplay muted together — most browsers block autoplay with sound. muted allows it.`,
      `The poster attribute on <video> shows a thumbnail before the video plays.`,
      `For YouTube: replace youtube.com/watch?v=ID with youtube.com/embed/ID.`,
    ],
    practice: {
      title: 'Video Gallery Page',
      description: `Create an HTML page with a YouTube video embed (any educational video), an HTML5 video with controls, and a Google Maps embed of your city. Style it nicely.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Video Gallery</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; margin: 30px auto; padding: 20px; }
    h2 { color: #6366f1; }
    iframe, video { border-radius: 10px; width: 100%; margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>🎬 My Media Gallery</h1>

  <h2>Educational Video</h2>
  <!-- Replace VIDEO_ID with a real YouTube video ID -->
  <iframe height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    allowfullscreen frameborder="0">
  </iframe>

  <h2>Sample Video</h2>
  <video controls>
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  </video>

  <h2>My City on the Map</h2>
  <!-- Change New+Delhi to your city name -->
  <iframe height="300"
    src="https://maps.google.com/maps?q=Hyderabad,India&output=embed"
    frameborder="0">
  </iframe>

</body>
</html>`,
      hint: `Find a YouTube video, copy its URL, take the part after v= and put it in /embed/THAT_PART.`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'html-attributes',
    category: 'HTML Fundamentals',
    title: 'HTML Attributes In-Depth',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Attributes provide extra information about HTML elements. Always placed inside the opening tag in name="value" form.',
      'Global attributes work on any element: id (unique on page), class (group elements for CSS), title (tooltip), hidden (hides element), data-* (store custom data).',
      'Some attributes are boolean — just their presence means true: disabled, readonly, required, checked, autoplay, muted.',
      'The id must be unique. The class can be shared. href gives links destinations. src gives media their source.',
    ],
    syntax: `<tag attribute="value">content</tag>

<div id="hero" class="card highlight" title="Tooltip">
<input type="text" required disabled placeholder="Enter name">
<img src="photo.jpg" alt="Description" width="300">
<a href="https://syllab.in" target="_blank" rel="noopener">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .card { border: 2px solid #3b82f6; border-radius: 12px; padding: 15px; margin:10px 0; }
    .highlight { background: #fef3c7; }
    [data-role="admin"] { color: #dc2626; font-weight: bold; }
    [data-role="student"] { color: #2563eb; }
  </style>
</head>
<body>
  <div id="main-card" class="card highlight">
    <p title="Hover me for tooltip!">Hover over me for a tooltip!</p>
  </div>
  <input type="text" placeholder="Required field" required>
  <input type="text" placeholder="Disabled" disabled value="Cannot edit">
  <br><br>
  <p data-role="admin">👑 Priya (Admin)</p>
  <p data-role="student">📚 Rahul (Student)</p>
  <img src="https://via.placeholder.com/200x80/3b82f6/white?text=Syllab.in" alt="Syllab.in logo" width="200">
  <br>
  <a href="https://syllab.in" target="_blank" rel="noopener">Open Syllab.in ↗</a>
</body>
</html>`,
    practice: {
      title: 'Student Profile Card',
      description: `Create a student profile card using attributes:
- A div with id="profile" and class="card"
- An img with alt text, width=100
- An h2 with a title attribute (shows tooltip on hover)
- A disabled input showing student roll number
- A checked checkbox for "Active student"
- A link with target="_blank"`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    .card { border: 2px solid #3b82f6; border-radius:12px; padding:20px; max-width:300px; }
    body { font-family: Arial; padding:20px; }
  </style>
</head>
<body>
  <!-- Build your profile card here using HTML attributes -->
</body>
</html>`,
      hint: 'Use id="profile" on the div, title="..." on h2, disabled on roll number input.',
    },
  },

  {
    id: 'html-colors-bg',
    category: 'HTML & Styling Basics',
    title: 'HTML Colors & Backgrounds',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Colors can be: named (red, royalblue), hex (#3b82f6), RGB (rgb(59,130,246)), RGBA (adds opacity 0–1), or HSL.',
      'Hex codes use 6 hex digits #RRGGBB. Short #RGB also works: #f00 = #ff0000.',
      'RGBA fourth value controls transparency: rgba(0,0,0,0.5) = 50% transparent black.',
      'linear-gradient() creates smooth transitions between colors for backgrounds.',
    ],
    syntax: `<p style="color: crimson;">Named color</p>
<p style="color: #3b82f6;">Hex color</p>
<p style="color: rgb(59,130,246);">RGB color</p>
<div style="background:rgba(59,130,246,0.3);">RGBA 30% opacity</div>
<div style="background:linear-gradient(135deg,#6366f1,#ec4899);">Gradient</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .swatch { display:inline-block; width:90px; height:50px; border-radius:8px; margin:4px;
              display:inline-flex; align-items:center; justify-content:center;
              font-size:10px; font-weight:bold; color:white; }
  </style>
</head>
<body>
  <h1>Color Formats</h1>
  <p style="color:crimson">Crimson text (named)</p>
  <p style="color:#3b82f6">Blue text (hex)</p>
  <p style="background:gold; padding:5px; border-radius:6px">Gold background</p>

  <h2>Hex Swatches</h2>
  <div class="swatch" style="background:#ef4444">#ef4444</div>
  <div class="swatch" style="background:#3b82f6">#3b82f6</div>
  <div class="swatch" style="background:#10b981">#10b981</div>
  <div class="swatch" style="background:#f59e0b">#f59e0b</div>
  <div class="swatch" style="background:#8b5cf6">#8b5cf6</div>

  <h2>RGBA Opacity</h2>
  <div style="background:rgba(59,130,246,1.0);color:white;padding:10px;margin:3px;border-radius:6px">Opacity 1.0</div>
  <div style="background:rgba(59,130,246,0.5);padding:10px;margin:3px;border-radius:6px">Opacity 0.5</div>
  <div style="background:rgba(59,130,246,0.2);padding:10px;margin:3px;border-radius:6px">Opacity 0.2</div>

  <h2>Gradient Banner</h2>
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);color:white;padding:20px;border-radius:12px;text-align:center">
    <strong>Gradient Banner!</strong>
  </div>
</body>
</html>`,
    practice: {
      title: 'Themed Color Card',
      description: `Create a "Syllab.in" themed card:
- A header div with blue-to-purple gradient
- White bold heading inside the header
- A body section with light gray (#f8fafc) background
- Three subject badges using different color formats (hex, rgb, named)
- A semi-transparent overlay effect using rgba`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .card { max-width:350px; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1); }
    .badge { display:inline-block; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:bold; color:white; margin:3px; }
  </style>
</head>
<body>
  <div class="card">
    <!-- Add gradient header, body, and colored badges here -->
  </div>
</body>
</html>`,
      hint: 'Use background: linear-gradient(135deg, #3b82f6, #8b5cf6) for the header.',
    },
  },

  {
    id: 'html-block-inline',
    category: 'HTML Fundamentals',
    title: 'Block vs Inline Elements',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Block elements start on a new line and take full width: div, p, h1-h6, ul, ol, li, table, form, header, footer.',
      'Inline elements flow in text and take only necessary width: span, a, strong, em, img, input, button, code.',
      'Inline-block keeps elements in the flow but respects width/height — perfect for navigation items, buttons, badges.',
      'Change display with CSS: display: block, inline, inline-block, flex, grid.',
    ],
    syntax: `<!-- Block elements: each on new line -->
<div>Block element</div>
<p>Paragraph (block)</p>

<!-- Inline elements: flow in text -->
<p>Text with <strong>bold</strong> and <em>italic</em> inline.</p>

<!-- Change display type -->
<span style="display: block;">Now a block!</span>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .block { background:#dbeafe; border:2px solid #3b82f6; padding:8px; margin:4px 0; }
    .inline-demo { background:#fef3c7; border:1px solid #f59e0b; padding:2px 6px; }
    .badge { display:inline-block; background:#ef4444; color:white; padding:4px 12px;
             border-radius:999px; font-size:12px; font-weight:bold; margin:3px; }
  </style>
</head>
<body>
  <h2>Block Elements (full width)</h2>
  <div class="block">div — takes full width</div>
  <p class="block">p — paragraph, new line</p>

  <h2>Inline Elements (flow in text)</h2>
  <p>Text with <span class="inline-demo">span</span>,
     <strong class="inline-demo">bold</strong>, and
     <a href="#" class="inline-demo">a link</a> — all in one line.</p>

  <h2>Inline-Block: Subject Badges</h2>
  <span class="badge">Python</span>
  <span class="badge" style="background:#3b82f6">HTML</span>
  <span class="badge" style="background:#10b981">CSS</span>
  <span class="badge" style="background:#8b5cf6">JavaScript</span>

  <h2>Changing Display Behaviour</h2>
  <span style="display:block; background:#e0e7ff; padding:8px;">Span → display:block</span>
  <div style="display:inline; background:#fce7f3; padding:4px;">Div → display:inline</div>
</body>
</html>`,
    practice: {
      title: 'Navigation Bar with Inline-Block',
      description: `Build a navigation bar:
- nav element with dark background (#1e293b)
- 4 links (Home, Syllabus, Skills Lab, Updates)
- Each link: display:inline-block, white text, padding, no underline
- Active link (Home): green background (#10b981)
- All links change color on hover`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; margin: 0; }
    nav { background: #1e293b; padding: 8px 20px; }
    nav a {
      display: inline-block;
      /* Add your styles here */
    }
    nav a:hover { /* hover styles */ }
    nav a.active { /* active styles */ }
  </style>
</head>
<body>
  <nav>
    <a href="#" class="active">Home</a>
    <a href="#">Syllabus</a>
    <a href="#">Skills Lab</a>
    <a href="#">Updates</a>
  </nav>
  <p style="padding:20px">Page content here.</p>
</body>
</html>`,
      hint: 'Add color:white, padding:10px 16px, text-decoration:none to nav a. Background: #10b981 for .active.',
    },
  },

  {
    id: 'html-input-types',
    category: 'HTML Forms',
    title: 'Input Types & Validation',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'HTML5 input types provide built-in validation and mobile-friendly keyboards: email, number, date, tel, url, range, color, time, search.',
      'Validation attributes: required (must fill), minlength/maxlength, min/max, pattern (regex), step.',
      'type="email" automatically validates email format. type="tel" with pattern="[6-9][0-9]{9}" validates Indian phone numbers.',
      'Always pair inputs with labels using for/id — this improves accessibility and usability.',
    ],
    syntax: `<input type="email" required placeholder="email@example.com">
<input type="number" min="1" max="100">
<input type="date">
<input type="range" min="0" max="100" step="5">
<input type="color" value="#3b82f6">
<input type="tel" pattern="[6-9][0-9]{9}" placeholder="Indian phone">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 500px; }
    .form-group { margin: 15px 0; }
    label { display:block; font-weight:bold; margin-bottom:5px; color:#334155; }
    input, select { width:100%; padding:8px 12px; border:2px solid #cbd5e1;
                   border-radius:8px; font-size:14px; box-sizing:border-box; }
    input:valid { border-color: #10b981; }
    input:invalid:not(:placeholder-shown) { border-color: #ef4444; }
    button { background:#3b82f6; color:white; border:none; padding:10px 24px;
             border-radius:8px; cursor:pointer; }
    #range-val { font-weight:bold; color:#3b82f6; }
  </style>
</head>
<body>
  <h1>HTML5 Input Types</h1>
  <form>
    <div class="form-group">
      <label for="email">Email (auto-validates)</label>
      <input type="email" id="email" placeholder="student@school.in" required>
    </div>
    <div class="form-group">
      <label for="age">Age (10–100)</label>
      <input type="number" id="age" min="10" max="100" placeholder="15">
    </div>
    <div class="form-group">
      <label for="dob">Date of Birth</label>
      <input type="date" id="dob">
    </div>
    <div class="form-group">
      <label for="phone">Indian Phone Number</label>
      <input type="tel" id="phone" pattern="[6-9][0-9]{9}" placeholder="9876543210">
    </div>
    <div class="form-group">
      <label>Marks: <span id="range-val">50</span>/100</label>
      <input type="range" min="0" max="100" value="50"
        oninput="document.getElementById('range-val').textContent=this.value">
    </div>
    <div class="form-group">
      <label for="color">Favourite Color</label>
      <input type="color" id="color" value="#3b82f6">
    </div>
    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
    practice: {
      title: 'Student Registration Form',
      description: `Build a student registration form with:
- Name (text, required, minlength=2)
- Email (type="email", required)
- Class (number, min=5, max=12)
- Date of birth (type="date")
- Subject preference (select: Maths/Science/History/English)
- Roll number (pattern="[A-Z]{2}[0-9]{3}", placeholder="AB123")
- Submit button with green background`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family:Arial; padding:20px; max-width:450px; }
    .form-group { margin:12px 0; }
    label { display:block; font-weight:bold; margin-bottom:4px; }
    input, select { width:100%; padding:8px; border:2px solid #cbd5e1; border-radius:6px; box-sizing:border-box; }
    button { background:#10b981; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; width:100%; margin-top:10px; }
  </style>
</head>
<body>
  <h1>Student Registration</h1>
  <form>
    <!-- Add your form fields here -->
    <button type="submit">Register</button>
  </form>
</body>
</html>`,
      hint: 'Use pattern="[A-Z]{2}[0-9]{3}" for roll number. Type="email" validates email automatically.',
    },
  },

  {
    id: 'html-data-storage',
    category: 'HTML Advanced',
    title: 'localStorage & Web Storage',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'localStorage stores data permanently in the browser (survives tab close). sessionStorage lasts only for the current session.',
      'API: setItem(key, value), getItem(key), removeItem(key), clear(). Values must be strings — use JSON.stringify() for objects.',
      'Storage limit ~5MB per origin. Never store passwords or sensitive data here.',
      'Perfect for: user preferences, saved progress, offline-first features, shopping carts.',
    ],
    syntax: `localStorage.setItem('name', 'Priya');
localStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }));
const name = localStorage.getItem('name');
const prefs = JSON.parse(localStorage.getItem('prefs'));
localStorage.removeItem('name');
localStorage.clear();`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family:Arial; padding:20px; max-width:500px; }
    .section { background:#f8fafc; border:2px solid #e2e8f0; border-radius:12px; padding:15px; margin:15px 0; }
    input { padding:8px; border:2px solid #cbd5e1; border-radius:6px; width:200px; }
    button { padding:8px 16px; background:#3b82f6; color:white; border:none; border-radius:6px; cursor:pointer; margin:4px; }
    .danger { background:#ef4444; }
    #output { background:#1e293b; color:#10b981; padding:12px; border-radius:8px; font-family:monospace; font-size:13px; margin-top:10px; min-height:60px; }
  </style>
</head>
<body>
  <h1>🗄️ localStorage Demo</h1>
  <div class="section">
    <h2>Save Student Preferences</h2>
    <input type="text" id="name-input" placeholder="Your name">
    <select id="subject">
      <option>Maths</option><option>Science</option><option>English</option>
    </select><br><br>
    <button onclick="saveData()">💾 Save</button>
    <button onclick="loadData()">📂 Load</button>
    <button class="danger" onclick="clearData()">🗑️ Clear</button>
  </div>
  <div class="section">
    <h2>Auto-saving Note</h2>
    <textarea rows="4" style="width:100%;padding:8px;border:2px solid #cbd5e1;border-radius:6px"
      oninput="localStorage.setItem('note',this.value)"
      placeholder="Type a note — auto-saved!"></textarea>
  </div>
  <div id="output">Output will appear here...</div>
  <script>
    window.onload = () => {
      const saved = localStorage.getItem('prefs');
      if (saved) {
        const p = JSON.parse(saved);
        document.getElementById('output').textContent = \`Loaded: \${p.name} | Subject: \${p.subject}\`;
      }
      const note = localStorage.getItem('note') || '';
      document.querySelector('textarea').value = note;
    };
    function saveData() {
      const data = { name: document.getElementById('name-input').value, subject: document.getElementById('subject').value };
      localStorage.setItem('prefs', JSON.stringify(data));
      document.getElementById('output').textContent = \`Saved: \${JSON.stringify(data)}\`;
    }
    function loadData() {
      const d = localStorage.getItem('prefs');
      document.getElementById('output').textContent = d ? \`Loaded: \${d}\` : 'No data yet.';
    }
    function clearData() {
      localStorage.clear();
      document.getElementById('output').textContent = '🗑️ Data cleared.';
      document.querySelector('textarea').value = '';
    }
  </script>
</body>
</html>`,
    practice: {
      title: 'Marks Tracker with Persistence',
      description: `Build a marks tracker:
1. Inputs for 5 subjects (Maths, Science, English, History, Computer)
2. "Save Marks" button → saves all to localStorage as JSON
3. "Load Marks" button → fills inputs from localStorage
4. Shows total and average after loading
5. Data persists after page refresh!`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family:Arial; padding:20px; max-width:400px; }
    .row { display:flex; gap:10px; align-items:center; margin:8px 0; }
    input[type="number"] { width:80px; padding:6px; border:2px solid #cbd5e1; border-radius:6px; }
    button { padding:10px 20px; background:#3b82f6; color:white; border:none; border-radius:6px; cursor:pointer; margin:5px; }
  </style>
</head>
<body>
  <h1>📊 Marks Tracker</h1>
  <div class="row"><label>Maths:</label><input type="number" id="maths" min="0" max="100"></div>
  <div class="row"><label>Science:</label><input type="number" id="science" min="0" max="100"></div>
  <div class="row"><label>English:</label><input type="number" id="english" min="0" max="100"></div>
  <div class="row"><label>History:</label><input type="number" id="history" min="0" max="100"></div>
  <div class="row"><label>Computer:</label><input type="number" id="computer" min="0" max="100"></div>
  <button onclick="saveMarks()">💾 Save</button>
  <button onclick="loadMarks()">📂 Load</button>
  <p id="result" style="font-weight:bold;color:#1e293b"></p>
  <script>
    const SUBJECTS = ['maths','science','english','history','computer'];
    function saveMarks() {
      const marks = {};
      SUBJECTS.forEach(s => marks[s] = +document.getElementById(s).value || 0);
      localStorage.setItem('marks', JSON.stringify(marks));
      document.getElementById('result').textContent = '✅ Marks saved!';
    }
    function loadMarks() {
      const data = localStorage.getItem('marks');
      if (!data) { document.getElementById('result').textContent = '❌ No saved marks.'; return; }
      const marks = JSON.parse(data);
      SUBJECTS.forEach(s => document.getElementById(s).value = marks[s]);
      const total = Object.values(marks).reduce((a,b) => a+b, 0);
      document.getElementById('result').textContent = \`Total: \${total} | Average: \${(total/5).toFixed(1)}\`;
    }
  </script>
</body>
</html>`,
      hint: 'Collect all values as an object, JSON.stringify it, and setItem. On load, parse and set each input.value.',
    },
  },

  {
    id: 'html-headings-paragraphs',
    category: 'HTML Fundamentals',
    title: 'Headings & Paragraphs',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Headings (h1 to h6) structure content hierarchically. h1 is the main title, h2 for sections, h3 for subsections, etc.',
      'Use only one h1 per page for SEO. Paragraphs (p) group related sentences into blocks of text.',
      'Semantic structure helps screen readers and search engines understand your content importance.',
    ],
    syntax: `<h1>Page Title</h1>
<h2>Main Section</h2>
<p>Paragraph text goes here.</p>
<h3>Subsection</h3>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Headings Demo</title>
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    h1 { color: #1e293b; border-bottom: 4px solid #10b981; padding-bottom: 10px; }
    h2 { color: #10b981; margin-top: 25px; }
    h3 { color: #475569; }
    p { line-height: 1.8; color: #475569; }
  </style>
</head>
<body>
  <h1>Web Development Basics</h1>
  <p>Learn the foundations of modern web development with HTML, CSS, and JavaScript.</p>

  <h2>Getting Started</h2>
  <p>The first step is understanding HTML. HyperText Markup Language is the skeleton of every webpage. It provides structure and meaning to content.</p>

  <h2>Core Concepts</h2>
  <h3>Semantic HTML</h3>
  <p>Writing semantic HTML means using tags that clearly describe their content. This helps both humans and machines understand your page.</p>

  <h3>Document Structure</h3>
  <p>Every HTML document has a doctype, html element, head, and body. Understanding this structure is crucial.</p>

  <h2>Next Steps</h2>
  <p>After mastering HTML, move on to CSS for styling and JavaScript for interactivity.</p>
</body>
</html>`,
    practice: {
      title: 'Study Guide Page',
      description: `Create a study guide with proper heading hierarchy:
- h1: Your School Name
- h2: Science Chapter 5: Forces
- h3: Definition of Force
- p: Explain force concept
- h3: Types of Forces
- p: Describe different types
- h2: Mathematics
- Proper structure with h3 and p tags`,
      startCode: ``,
      hint: 'Use h1 once at the top. Use h2 for main topics, h3 for subtopics, and p for explanations.',
    },
  },

  {
    id: 'html-text-formatting',
    category: 'HTML Fundamentals',
    title: 'Text Formatting Tags',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Text formatting tags add meaning and styling: <strong> (important), <em> (emphasis), <mark> (highlighted), <small> (fine print), <code> (programming), <kbd> (keyboard input).',
      '<b> and <i> are purely visual. <strong> and <em> are semantic and better for accessibility.',
      'Use <sup> for superscript (E=mc²) and <sub> for subscript (H₂O). <del> shows deleted text, <ins> shows inserted text.',
    ],
    syntax: `<strong>Important text</strong>
<em>Emphasized text</em>
<mark>Highlighted text</mark>
<code>var x = 5;</code>
<small>Fine print</small>
<sup>Superscript</sup> <sub>Subscript</sub>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Formatting</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 30px auto; padding: 20px; }
    .demo { background: #f8fafc; padding: 12px; margin: 10px 0; border-left: 4px solid #3b82f6; border-radius: 6px; }
    code { background: #1e293b; color: #10b981; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    mark { background: #fef3c7; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Text Formatting Demo</h1>

  <div class="demo">
    <p>The formula for energy is <strong>E = mc²</strong>, where E is energy, m is mass, and c is the <em>speed of light</em>.</p>
  </div>

  <div class="demo">
    <p>Water is <mark>H<sub>2</sub>O</mark>, a <strong>crucial molecule</strong> for all <em>living organisms</em>.</p>
  </div>

  <div class="demo">
    <p><strong>Important:</strong> Complete your homework by tomorrow. <small>Extra credit available for early submission.</small></p>
  </div>

  <div class="demo">
    <p>To print "Hello", use: <code>print("Hello")</code> in Python or <code>console.log("Hello")</code> in JavaScript.</p>
  </div>

  <div class="demo">
    <p>Press <kbd>Ctrl+S</kbd> to save your work. The original text was <del>incorrect</del> but the <ins>new text</ins> is accurate.</p>
  </div>
</body>
</html>`,
    practice: {
      title: 'Science Fact Sheet',
      description: `Create a fact sheet with formatting:
- Title about an element (Iron, Gold, Oxygen)
- Use <strong> for key facts
- Use <em> for emphasis
- Use <mark> for important definitions
- Include chemical formulas with <sub>
- Use <code> for chemical notation`,
      startCode: ``,
      hint: 'Use <strong> for importance, <em> for emphasis, <mark> for highlights, <sub> for subscripts.',
    },
  },

  {
    id: 'html-lists-ordered-unordered',
    category: 'Content Elements',
    title: 'Ordered & Unordered Lists',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Unordered lists (<ul>) show items with bullet points. Ordered lists (<ol>) show numbered items. Description lists (<dl>) pair terms with definitions.',
      'Each list item is wrapped in <li>. Lists can be nested infinitely deep for hierarchies.',
      'Style lists with CSS: change list-style-type to disc, circle, square for bullets, or decimal, roman, alpha for numbers.',
    ],
    syntax: `<ul>
  <li>Item 1</li>
</ul>
<ol>
  <li>First</li>
  <li>Second</li>
</ol>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 600px; margin: 30px auto; padding: 20px; }
    h2 { color: #10b981; }
    ul { list-style-type: disc; }
    .custom-list { list-style-type: none; padding: 0; }
    .custom-list li { padding: 8px; background: #f0fdf4; margin: 4px 0; border-radius: 6px; border-left: 4px solid #10b981; }
  </style>
</head>
<body>
  <h1>List Examples</h1>

  <h2>Unordered List: Skills</h2>
  <ul>
    <li>HTML & CSS</li>
    <li>JavaScript</li>
    <li>Python Programming</li>
    <li>Database Design</li>
  </ul>

  <h2>Ordered List: Steps</h2>
  <ol>
    <li>Read the chapter carefully</li>
    <li>Take notes on key concepts</li>
    <li>Solve practice problems</li>
    <li>Review and revise</li>
  </ol>

  <h2>Custom Styled List</h2>
  <ul class="custom-list">
    <li>✅ Project 1 completed</li>
    <li>✅ Project 2 completed</li>
    <li>⏳ Project 3 in progress</li>
  </ul>
</body>
</html>`,
    practice: {
      title: 'Class Schedule',
      description: `Create a weekly schedule with lists:
- Unordered list: 5 subjects you study
- Ordered list: 6 periods per day with subjects
- Custom styled list with emojis for status (✅ complete, ⏳ pending)`,
      startCode: ``,
      hint: 'Use <ul> for bullets, <ol> for numbers. Apply custom CSS for unique styling.',
    },
  },

  {
    id: 'html-links-anchors',
    category: 'Content Elements',
    title: 'Links & Internal Anchors',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Links (<a>) create navigation. href attribute is the destination. target="_blank" opens in new tab. rel="noopener" is security best practice.',
      'Anchor links jump to sections: <a href="#section-id"> links to <div id="section-id">.',
      'Use descriptive link text, not "click here". SEO benefits from meaningful anchor text.',
    ],
    syntax: `<a href="https://syllab.in">External Link</a>
<a href="/page" target="_blank">New Tab</a>
<a href="#top">Jump to Top</a>
<div id="top">Content here</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; line-height: 1.8; }
    nav { background: #10b981; padding: 16px; position: sticky; top: 0; }
    nav a { color: white; margin-right: 20px; text-decoration: none; font-weight: bold; }
    nav a:hover { text-decoration: underline; }
    section { padding: 40px 20px; min-height: 300px; margin: 20px auto; max-width: 700px; border-bottom: 2px solid #e2e8f0; }
    section h2 { color: #10b981; }
    .top-btn { position: fixed; bottom: 20px; right: 20px; background: #10b981; color: white; padding: 10px 16px; border-radius: 50%; text-decoration: none; display: none; }
  </style>
</head>
<body>
  <nav>
    <a href="#intro">Intro</a>
    <a href="#concepts">Concepts</a>
    <a href="#tips">Tips</a>
    <a href="https://syllab.in" target="_blank" rel="noopener">Syllab.in ↗</a>
  </nav>

  <section id="intro">
    <h2>Introduction to Links</h2>
    <p>Links are the foundation of the web. They connect pages and sites together. This page demonstrates internal anchor links.</p>
  </section>

  <section id="concepts">
    <h2>Key Concepts</h2>
    <p>1. Absolute links go to external sites: https://example.com</p>
    <p>2. Relative links go to pages in your site: /about or ../images/photo.jpg</p>
    <p>3. Anchor links jump to sections on the same page using #id.</p>
  </section>

  <section id="tips">
    <h2>Best Practices</h2>
    <p>Always use descriptive link text. Instead of "click here", say "Learn about HTML" or "Read full article".</p>
    <p><a href="#intro">↑ Back to Introduction</a></p>
  </section>

  <a href="#top" class="top-btn">↑</a>
</body>
</html>`,
    practice: {
      title: 'Table of Contents',
      description: `Create a page with:
- A <nav> with links to 4 sections
- Each section with an id matching the nav link
- Internal anchor links (#section-id) between sections
- A "Back to Top" link at the bottom`,
      startCode: ``,
      hint: 'Use href="#section-id" to link to <div id="section-id">. Test clicking the navigation.',
    },
  },

  {
    id: 'html-images-alt',
    category: 'Content Elements',
    title: 'Images with Alt Text',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'The alt attribute is mandatory — it describes the image for screen readers and shows when the image fails to load.',
      'alt text should be descriptive and concise: "Two students studying together" not just "students" or "image".',
      'Use responsive images with max-width: 100% and style="width:100%" to scale on mobile.',
    ],
    syntax: `<img src="photo.jpg" alt="Description of image" width="300">
<img src="icon.png" alt="Clock icon" style="width:100%; max-width:400px">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
    .gallery-item { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .gallery-item img { width: 100%; display: block; }
    .gallery-item figcaption { padding: 12px; background: #f8fafc; font-size: 14px; }
    .responsive-img { width: 100%; max-width: 500px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Image Best Practices</h1>

  <h2>Responsive Image</h2>
  <img src="https://via.placeholder.com/500x300/3b82f6/white?text=Study+Group" alt="Group of students studying together in library" class="responsive-img">

  <h2>Image Gallery</h2>
  <div class="gallery">
    <div class="gallery-item">
      <img src="https://via.placeholder.com/300x200/10b981/white?text=HTML" alt="HTML code on screen">
      <figcaption>Learning HTML Fundamentals</figcaption>
    </div>
    <div class="gallery-item">
      <img src="https://via.placeholder.com/300x200/3b82f6/white?text=CSS" alt="CSS styling showcase">
      <figcaption>Beautiful CSS Designs</figcaption>
    </div>
    <div class="gallery-item">
      <img src="https://via.placeholder.com/300x200/8b5cf6/white?text=JavaScript" alt="JavaScript programming">
      <figcaption>Interactive JavaScript</figcaption>
    </div>
    <div class="gallery-item">
      <img src="https://via.placeholder.com/300x200/ec4899/white?text=Responsive" alt="Responsive web design">
      <figcaption>Mobile-First Design</figcaption>
    </div>
  </div>

  <h2>Alt Text Tips</h2>
  <ul>
    <li>✅ Good: "Student solving math problem on whiteboard"</li>
    <li>❌ Bad: "image" or "pic"</li>
    <li>✅ Good: "India flag in office lobby"</li>
    <li>❌ Bad: "flag"</li>
  </ul>
</body>
</html>`,
    practice: {
      title: 'Photo Essay',
      description: `Create a page with:
- 5 images from unsplash.com
- Each with meaningful alt text
- Responsive styling (max-width: 100%)
- Grid layout with captions
- Proper semantic figcaption elements`,
      startCode: ``,
      hint: 'Write alt text as if describing to someone who cannot see the image. Be specific and descriptive.',
    },
  },

  {
    id: 'html-special-characters',
    category: 'HTML Fundamentals',
    title: 'HTML Special Characters & Entities',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'HTML entities display special characters: &nbsp; (space), &amp; (&), &lt; (<), &gt; (>), &copy; (©), &euro; (€).',
      'Use entities for symbols your keyboard cannot produce. Common ones: &quot; ("), &apos; (\'), &deg; (°).',
      'Numeric entities: &#169; for ©, &#8364; for €, &#163; for £.',
    ],
    syntax: `<p>&copy; 2026 MySchool.in</p>
<p>5&deg;C temperature</p>
<p>Price: &pound;50</p>
<p>5 &times; 3 = 15</p>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 600px; margin: 30px auto; padding: 20px; }
    .entity-demo { background: #f0fdf4; padding: 12px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #10b981; }
    .symbol { font-size: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <h1>HTML Special Characters & Entities</h1>

  <div class="entity-demo">
    <p><span class="symbol">&copy;</span> Copyright: &copy; 2026 Syllab.in — All Rights Reserved</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&nbsp;</span> Non-breaking Space: Use &nbsp; for fixed spaces</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&amp;</span> Ampersand: &amp; should not be written as &</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&deg;</span> Degrees: Water freezes at 0&deg;C and boils at 100&deg;C</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&times;</span> Multiplication: 7 &times; 8 = 56</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&divide;</span> Division: 100 &divide; 4 = 25</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&pound;</span> British Pound: Price is &pound;99</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&euro;</span> Euro: Cost is &euro;50</p>
  </div>

  <div class="entity-demo">
    <p><span class="symbol">&hearts;</span> Heart: I &hearts; HTML!</p>
  </div>

  <h2>Common Entities Reference</h2>
  <ul>
    <li>&lt; (less than)</li>
    <li>&gt; (greater than)</li>
    <li>&quot; (quote)</li>
    <li>&apos; (apostrophe)</li>
  </ul>
</body>
</html>`,
    practice: {
      title: 'Copyright & Math Symbols',
      description: `Create a page with:
- Copyright notice using &copy;
- Temperature with &deg;
- Math symbols: &times;, &divide;, &plus;
- Currency: &pound;, &euro;
- Non-breaking spaces in specific places
- At least 5 different special characters`,
      startCode: ``,
      hint: 'Use &copy; for ©, &deg; for degree, &times; for multiplication. Look up entities online when needed.',
    },
  },

  {
    id: 'html-inline-styles-colors',
    category: 'Styling Basics',
    title: 'Inline Styles & Colors',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Inline styles use the style attribute directly on elements: <p style="color: red; font-size: 18px;">.',
      'While inline styles work, it is better practice to use <style> tags or external CSS files for maintainability.',
      'Common CSS properties: color (text), background (bg), padding, margin, border, font-size, text-align.',
    ],
    syntax: `<p style="color: red; font-size: 18px;">Red text</p>
<div style="background: blue; color: white; padding: 20px;">Blue box</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Inline Styles Demo</title>
</head>
<body style="font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px;">

  <h1 style="color: #1e293b; text-align: center; border-bottom: 4px solid #10b981; padding-bottom: 15px;">Inline Styles Demo</h1>

  <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0;">
    <h2 style="color: #1e40af; margin-top: 0;">Blue Alert Box</h2>
    <p style="color: #1e40af; font-weight: bold;">This is important information styled with inline CSS.</p>
  </div>

  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin-top: 0;">⚠️ Warning Message</h3>
    <p style="color: #b45309;">Make sure you understand this concept before moving forward.</p>
  </div>

  <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 15px 0;">
    <p style="color: #16a34a; font-size: 16px;"><strong>✅ Success!</strong> Your changes have been saved.</p>
  </div>

  <p style="text-align: center; margin-top: 30px;">
    <span style="font-size: 18px; color: #6366f1; font-weight: bold;">Beautiful inline styling</span> <span style="color: #ec4899;">is possible</span> <span style="color: #f59e0b;">with CSS!</span>
  </p>

</body>
</html>`,
    practice: {
      title: 'Alert Boxes',
      description: `Create 3 alert boxes with inline styles:
- Success box: green background, green text
- Warning box: yellow background, dark text
- Error box: red background, white text
- Each with padding, border-radius, and a border-left`,
      startCode: ``,
      hint: 'Use style="background: #color; color: #text; padding: 15px; border-radius: 8px; border-left: 4px solid;"',
    },
  },

  {
    id: 'html-forms-input-submit',
    category: 'HTML Forms',
    title: 'Forms, Inputs & Submit Buttons',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Forms (<form>) collect data. Input elements capture it. The submit button sends the data. action attribute is where data goes.',
      'Common input types: text, email, password, number, date, checkbox, radio. Each must have a <label>.',
      'The name attribute identifies each input when data is submitted. Use required to make fields mandatory.',
    ],
    syntax: `<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Submit</button>
</form>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 500px; margin: 30px auto; padding: 20px; }
    .form-container { background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px solid #e2e8f0; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; color: #334155; margin-bottom: 5px; }
    input[type="text"],
    input[type="email"],
    input[type="password"],
    textarea,
    select { width: 100%; padding: 10px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
    input:focus, textarea:focus, select:focus { border-color: #10b981; outline: none; box-shadow: 0 0 5px rgba(16,185,129,0.3); }
    button { width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; }
    button:hover { background: #059669; }
  </style>
</head>
<body>

  <div class="form-container">
    <h1>Contact Form</h1>
    <form action="#" method="POST">

      <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required>
      </div>

      <div class="form-group">
        <label for="subject">Subject *</label>
        <select id="subject" name="subject" required>
          <option value="">Select a subject...</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="4" placeholder="Your message here..." required></textarea>
      </div>

      <button type="submit">Send Message</button>

    </form>
  </div>

</body>
</html>`,
    practice: {
      title: 'Feedback Form',
      description: `Build a feedback form with:
- Name input (text, required)
- Email input (email type, required)
- Rating dropdown (1-5 stars)
- Comments textarea
- Styled submit button
- All inputs paired with labels`,
      startCode: ``,
      hint: 'Every input needs a <label> with for="id" matching the input id. Use required attribute.',
    },
  },

  {
    id: 'html-input-types',
    category: 'HTML Forms',
    title: 'Advanced Input Types',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'HTML5 input types provide built-in validation and mobile keyboards: range, color, date, time, week, month.',
      'type="range" creates sliders. type="color" shows a color picker. type="date" opens date picker on mobile.',
      'Each type has attributes: min, max, step, value. They work independently without JavaScript.',
    ],
    syntax: `<input type="range" min="0" max="100" value="50">
<input type="color" value="#3b82f6">
<input type="time">
<input type="date">
<input type="week">
<input type="month">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 600px; margin: 30px auto; padding: 20px; }
    .input-demo { background: #f8fafc; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
    label { display: block; font-weight: bold; margin-bottom: 8px; color: #334155; }
    input { margin: 5px 0; }
    input[type="range"] { width: 100%; }
    input[type="color"] { width: 80px; height: 40px; cursor: pointer; border: 2px solid #cbd5e1; border-radius: 6px; }
    input[type="date"],
    input[type="time"],
    input[type="week"],
    input[type="month"] { padding: 8px; border: 2px solid #cbd5e1; border-radius: 6px; }
    #range-val { font-weight: bold; color: #3b82f6; }
    #color-val { font-family: monospace; }
  </style>
</head>
<body>
  <h1>Advanced Input Types</h1>

  <div class="input-demo">
    <label for="slider">Score (0-100): <span id="range-val">50</span></label>
    <input type="range" id="slider" min="0" max="100" value="50" step="5" oninput="document.getElementById('range-val').textContent=this.value">
  </div>

  <div class="input-demo">
    <label for="color-pick">Pick Your Favourite Colour</label>
    <input type="color" id="color-pick" value="#3b82f6" oninput="document.getElementById('color-val').textContent=this.value">
    <p>Selected: <span id="color-val">#3b82f6</span></p>
  </div>

  <div class="input-demo">
    <label for="birthday">Date of Birth</label>
    <input type="date" id="birthday" value="2010-05-15">
  </div>

  <div class="input-demo">
    <label for="time-pick">Appointment Time</label>
    <input type="time" id="time-pick" value="14:30">
  </div>

  <div class="input-demo">
    <label for="week-pick">Week Selection</label>
    <input type="week" id="week-pick" value="2026-W20">
  </div>

  <div class="input-demo">
    <label for="month-pick">Month Selection</label>
    <input type="month" id="month-pick" value="2026-05">
  </div>

  <div class="input-demo">
    <label for="temp">Temperature (0-40°C):</label>
    <input type="number" id="temp" min="0" max="40" step="0.5" value="20" style="width:100px; padding:8px; border:2px solid #cbd5e1; border-radius:6px;">
  </div>

</body>
</html>`,
    practice: {
      title: 'Student Survey',
      description: `Build a survey with:
- Range slider for satisfaction (1-10)
- Color picker for mood
- Date input for last study session
- Time input for usual study time
- Month input for favorite month
- Display selected values in real-time`,
      startCode: ``,
      hint: 'Use oninput event to update display values in real-time. Set min/max/step attributes.',
    },
  },

  {
    id: 'html-select-textarea',
    category: 'HTML Forms',
    title: 'Select Dropdowns & Textarea',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '<select> creates dropdown menus with <option> elements. <optgroup> groups related options. <textarea> is for multi-line text input.',
      'Use name and id on both select and textarea for form submission. Add size, disabled, readonly, and required attributes.',
      'Style <select> and <textarea> like text inputs. Textarea can have rows and cols attributes.',
    ],
    syntax: `<select id="subject" name="subject">
  <option value="math">Mathematics</option>
  <option value="science">Science</option>
</select>

<textarea id="feedback" name="feedback" rows="4" cols="50"></textarea>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 600px; margin: 30px auto; padding: 20px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; font-weight: bold; color: #334155; margin-bottom: 6px; }
    select, textarea { width: 100%; padding: 10px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: Arial; box-sizing: border-box; }
    select:focus, textarea:focus { border-color: #10b981; outline: none; }
    option { padding: 8px; }
    textarea { resize: vertical; }
  </style>
</head>
<body>
  <h1>Select & Textarea Demo</h1>

  <form>
    <div class="form-group">
      <label for="stream">Select Your Stream</label>
      <select id="stream" name="stream" required>
        <option value="">-- Choose an option --</option>
        <optgroup label="Science">
          <option value="pcm">Physics, Chemistry, Maths</option>
          <option value="pcb">Physics, Chemistry, Biology</option>
        </optgroup>
        <optgroup label="Commerce">
          <option value="commerce">Accounts, Economics, Business</option>
        </optgroup>
        <optgroup label="Arts">
          <option value="arts">History, Geography, English</option>
        </optgroup>
      </select>
    </div>

    <div class="form-group">
      <label for="city">Your City</label>
      <select id="city" name="city" required>
        <option value="">Select city...</option>
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="bangalore">Bangalore</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="pune">Pune</option>
      </select>
    </div>

    <div class="form-group">
      <label for="feedback">Your Feedback</label>
      <textarea id="feedback" name="feedback" rows="5" placeholder="Tell us what you think about our platform..."></textarea>
    </div>

    <div class="form-group">
      <label for="essay">Write a Short Essay (max 500 words)</label>
      <textarea id="essay" name="essay" rows="8" maxlength="500" placeholder="Your essay here..." style="resize: both;"></textarea>
    </div>

    <div class="form-group">
      <label for="readonly-info">Read-Only Information</label>
      <textarea id="readonly-info" readonly rows="3">Registration Number: CLASS11-2026-042
School: Central Public School
Registered Date: 2026-01-15</textarea>
    </div>

  </form>

</body>
</html>`,
    practice: {
      title: 'Subject Registration Form',
      description: `Create a form with:
- Select dropdown for class (9-12)
- Select dropdown with optgroup for subjects (Science/Commerce/Arts)
- Textarea for reason of subject selection
- Textarea for additional notes (readonly example)
- Proper labels and styling`,
      startCode: ``,
      hint: 'Use <optgroup label=""> to group related options. Add rows="4" to textarea for height.',
    },
  },

  {
    id: 'html-form-validation-attrs',
    category: 'HTML Forms',
    title: 'Form Validation Attributes',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'HTML5 validation: required (mandatory), minlength/maxlength, min/max, pattern (regex), email auto-validates, number auto-validates.',
      'Validation happens before form submission. Invalid inputs show browser default error messages.',
      'pattern attribute uses regular expressions: [0-9]{10} for 10 digits, [A-Z]{2}[0-9]{3} for codes.',
    ],
    syntax: `<input type="text" minlength="3" maxlength="20" required>
<input type="email" required>
<input type="number" min="0" max="100">
<input type="tel" pattern="[0-9]{10}">
<input type="text" pattern="[A-Z]{2}[0-9]{3}" title="Format: AB123">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 500px; margin: 30px auto; padding: 20px; }
    .form-container { background: #f8fafc; padding: 20px; border-radius: 12px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; color: #334155; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
    input:valid { border-color: #10b981; }
    input:invalid:not(:placeholder-shown) { border-color: #ef4444; }
    input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 5px rgba(59,130,246,0.3); }
    .hint { font-size: 12px; color: #6b7280; margin-top: 4px; }
    button { width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>Student Registration Validation</h1>
    <form>

      <div class="form-group">
        <label for="name">Full Name (3-50 chars) *</label>
        <input type="text" id="name" name="name" minlength="3" maxlength="50" required placeholder="John Doe">
        <div class="hint">Must be between 3 and 50 characters</div>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required placeholder="student@school.in">
        <div class="hint">Must be a valid email format</div>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number (10 digits) *</label>
        <input type="tel" id="phone" name="phone" pattern="[6-9][0-9]{9}" required placeholder="9876543210">
        <div class="hint">Must be 10 digits starting with 6-9</div>
      </div>

      <div class="form-group">
        <label for="age">Age (13-25) *</label>
        <input type="number" id="age" name="age" min="13" max="25" required placeholder="15">
        <div class="hint">Must be between 13 and 25</div>
      </div>

      <div class="form-group">
        <label for="roll">Roll Number (Format: AB123) *</label>
        <input type="text" id="roll" name="roll" pattern="[A-Z]{2}[0-9]{3}" required placeholder="AB123" title="Format: Two capital letters followed by 3 digits">
        <div class="hint">Format: AB123 (2 letters + 3 digits)</div>
      </div>

      <div class="form-group">
        <label for="password">Password (min 8 chars) *</label>
        <input type="password" id="password" name="password" minlength="8" required placeholder="••••••••">
        <div class="hint">Minimum 8 characters</div>
      </div>

      <button type="submit">Register</button>

    </form>
  </div>

</body>
</html>`,
    practice: {
      title: 'Exam Registration Form',
      description: `Build a form with validation:
- Name: minlength=2, maxlength=40
- Email: type="email"
- Phone: pattern for Indian numbers
- Marks: type="number", min=0, max=100
- Exam Code: pattern="[A-Z0-9]{4}"
- All fields required
- Submit button`,
      startCode: ``,
      hint: 'Use :valid and :invalid CSS selectors for visual feedback. Pattern [0-9]{10} for 10 digits.',
    },
  },

  {
    id: 'html-tables-basic',
    category: 'Content Elements',
    title: 'Basic Tables Structure',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Tables organize data: <table>, <tr> (row), <th> (header), <td> (cell). <thead>, <tbody>, <tfoot> organize large tables.',
      'border-collapse: collapse in CSS removes double borders. Use padding for cell spacing.',
      'Never use tables for page layout — only for data. Use CSS Grid/Flex for layouts.',
    ],
    syntax: `<table>
  <thead>
    <tr><th>Column 1</th><th>Column 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td><td>Data</td></tr>
  </tbody>
</table>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th { background: #10b981; color: white; padding: 12px; text-align: left; font-weight: bold; }
    td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background: #f8fafc; }
    tr:hover { background: #ecfdf5; }
  </style>
</head>
<body>
  <h1>Class 11 Marks</h1>

  <table>
    <thead>
      <tr>
        <th>Roll No</th>
        <th>Name</th>
        <th>Maths</th>
        <th>Physics</th>
        <th>Chemistry</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Priya Sharma</td>
        <td>95</td>
        <td>92</td>
        <td>88</td>
        <td>275</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Arjun Kumar</td>
        <td>88</td>
        <td>90</td>
        <td>92</td>
        <td>270</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Kavya Singh</td>
        <td>92</td>
        <td>94</td>
        <td>90</td>
        <td>276</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Rahul Patel</td>
        <td>78</td>
        <td>82</td>
        <td>85</td>
        <td>245</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2"><strong>Class Average</strong></td>
        <td><strong>88</strong></td>
        <td><strong>90</strong></td>
        <td><strong>89</strong></td>
        <td><strong>266</strong></td>
      </tr>
    </tfoot>
  </table>

</body>
</html>`,
    practice: {
      title: 'School Activity Table',
      description: `Create a table showing:
- 5 columns: Date, Activity, Organizer, Participants, Status
- 5 rows of school activities
- Proper thead, tbody, tfoot
- Styled with colors and borders
- Hover effect on rows`,
      startCode: ``,
      hint: 'Use <thead> for headers, <tbody> for data, <tfoot> for summary. Style th with background color.',
    },
  },

  {
    id: 'html-tables-colspan-rowspan',
    category: 'Content Elements',
    title: 'Tables with colspan & rowspan',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'colspan merges cells horizontally. rowspan merges cells vertically. Use them for complex table layouts.',
      'colspan="2" means the cell spans 2 columns. rowspan="3" means it spans 3 rows.',
      'Plan your table carefully — merge cells last after getting the basic structure right.',
    ],
    syntax: `<tr>
  <td colspan="2">Spans 2 columns</td>
  <td rowspan="2">Spans 2 rows</td>
</tr>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 2px solid #cbd5e1; padding: 12px; text-align: center; }
    th { background: #6366f1; color: white; font-weight: bold; }
    tr:nth-child(even) { background: #f8fafc; }
    .header { background: #3b82f6; color: white; }
    .category { background: #dbeafe; font-weight: bold; }
  </style>
</head>
<body>
  <h1>School Timetable (with merged cells)</h1>

  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th colspan="5">Monday - Friday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="category">9:00-10:00</td>
        <td>Maths</td>
        <td>Physics</td>
        <td>Maths</td>
        <td>Chemistry</td>
        <td>Biology</td>
      </tr>
      <tr>
        <td class="category">10:00-11:00</td>
        <td>English</td>
        <td>Chemistry</td>
        <td>Physics</td>
        <td>Biology</td>
        <td>Maths</td>
      </tr>
      <tr>
        <td colspan="6" style="background: #fef3c7; font-style: italic;">☕ Break (11:00-11:30)</td>
      </tr>
      <tr>
        <td class="category">11:30-12:30</td>
        <td>PE</td>
        <td>Arts</td>
        <td>Computer</td>
        <td>PE</td>
        <td>Arts</td>
      </tr>
      <tr>
        <td class="category">12:30-1:30</td>
        <td colspan="5">Lunch Break</td>
      </tr>
    </tbody>
  </table>

  <h2>Lab Schedule (with rowspan)</h2>
  <table>
    <thead>
      <tr>
        <th>Lab</th>
        <th>Monday</th>
        <th>Wednesday</th>
        <th>Friday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2" style="background: #ecfdf5; font-weight: bold;">Physics Lab</td>
        <td>Class 11A</td>
        <td>Class 11B</td>
        <td>Class 11C</td>
      </tr>
      <tr>
        <td>2:00-3:30</td>
        <td>2:00-3:30</td>
        <td>2:00-3:30</td>
      </tr>
      <tr>
        <td rowspan="2" style="background: #fef3c7; font-weight: bold;">Chemistry Lab</td>
        <td>Class 12A</td>
        <td>Class 12B</td>
        <td>Class 12C</td>
      </tr>
      <tr>
        <td>3:30-5:00</td>
        <td>3:30-5:00</td>
        <td>3:30-5:00</td>
      </tr>
    </tbody>
  </table>

</body>
</html>`,
    practice: {
      title: 'Complex Schedule Table',
      description: `Create a table with:
- 5 periods with time column
- Monday to Friday columns
- Use colspan="5" for a break row (spanning all 5 days)
- Use rowspan="2" for lunch break in time column
- Proper styling with borders and backgrounds`,
      startCode: ``,
      hint: 'Sketch your table on paper first. Use colspan for horizontal merges, rowspan for vertical merges.',
    },
  },

  {
    id: 'html-semantic-structure',
    category: 'Modern HTML',
    title: 'Semantic HTML Structure',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Semantic HTML describes meaning: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. Screen readers and SEO benefit.',
      '<header> is page/section intro. <nav> is navigation. <main> is primary content. <section> groups related content. <article> is standalone.',
      '<aside> is supplementary (sidebar). <footer> is page/section end. Never use empty divs when semantic tags fit.',
    ],
    syntax: `<header><h1>Site Title</h1><nav>...</nav></header>
<main>
  <section><h2>Topic</h2><p>...</p></section>
  <article><h3>Post</h3><p>...</p></article>
  <aside>Sidebar</aside>
</main>
<footer>Copyright</footer>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial; background: #f1f5f9; }
    header { background: #10b981; color: white; padding: 20px; text-align: center; }
    nav { background: #059669; padding: 12px; }
    nav a { color: white; margin: 0 15px; text-decoration: none; font-weight: bold; }
    nav a:hover { text-decoration: underline; }
    main { max-width: 1000px; margin: 20px auto; display: grid; grid-template-columns: 2fr 1fr; gap: 20px; padding: 20px; }
    section { background: white; padding: 20px; border-radius: 12px; }
    article { background: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; border-radius: 6px; margin-bottom: 15px; }
    article h3 { color: #059669; }
    aside { background: white; padding: 20px; border-radius: 12px; height: fit-content; }
    aside h3 { color: #10b981; margin-bottom: 10px; }
    aside ul { padding-left: 20px; }
    footer { background: #1e293b; color: #94a3b8; text-align: center; padding: 20px; margin-top: 40px; }
  </style>
</head>
<body>

  <header>
    <h1>📚 Education Hub</h1>
    <p>Learn web development and more</p>
  </header>

  <nav>
    <a href="#home">Home</a>
    <a href="#courses">Courses</a>
    <a href="#resources">Resources</a>
    <a href="#about">About</a>
  </nav>

  <main>
    <div>
      <section>
        <h2>Welcome to Web Development</h2>
        <p>This is the introduction section. It provides overview of what students will learn.</p>
      </section>

      <section>
        <h2>Latest Articles</h2>
        <article>
          <h3>Understanding HTML Semantics</h3>
          <p>Learn why semantic HTML is important for accessibility and SEO. Proper use of tags like header, nav, main, section, and footer...</p>
        </article>
        <article>
          <h3>CSS Flexbox Complete Guide</h3>
          <p>Master CSS Flexbox with practical examples. Understand flex-direction, justify-content, align-items, and gap...</p>
        </article>
        <article>
          <h3>JavaScript Promises Explained</h3>
          <p>A deep dive into JavaScript Promises, async/await, and how to handle asynchronous operations...</p>
        </article>
      </section>
    </div>

    <aside>
      <h3>🔥 Trending</h3>
      <ul>
        <li>HTML5 New Features</li>
        <li>CSS Grid Mastery</li>
        <li>React Hooks</li>
        <li>Web Performance</li>
        <li>API Design</li>
      </ul>

      <h3 style="margin-top: 20px;">📖 Categories</h3>
      <ul>
        <li>Beginner</li>
        <li>Intermediate</li>
        <li>Advanced</li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Education Hub. All rights reserved.</p>
  </footer>

</body>
</html>`,
    practice: {
      title: 'News Website Layout',
      description: `Build a semantic page layout:
- <header> with logo and title
- <nav> with 4 navigation links
- <main> with grid: 2 columns
- <section> for featured stories
- Multiple <article> elements with titles and summaries
- <aside> with trending topics list
- <footer> with copyright`,
      startCode: ``,
      hint: 'Use semantic tags for meaning, not divs. Header for top, nav for navigation, main for content.',
    },
  },

  {
    id: 'html-article-section-aside',
    category: 'Modern HTML',
    title: 'Article, Section & Aside Tags',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '<article> is self-contained content: blog post, news article, forum post. <section> groups related content with a heading.',
      '<aside> is for supplementary content: sidebars, ads, related links, footnotes.',
      '<article> can contain multiple <section>s. <section> should have a heading. Use semantic tags correctly for accessibility.',
    ],
    syntax: `<article>
  <h2>Article Title</h2>
  <section><h3>Introduction</h3></section>
  <section><h3>Main Content</h3></section>
</article>

<aside>Related Links</aside>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 900px; margin: 30px auto; padding: 20px; display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    main { grid-column: 1; }
    aside { grid-column: 2; }
    article { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    article h2 { color: #1e293b; border-bottom: 3px solid #10b981; padding-bottom: 10px; }
    section { margin: 15px 0; }
    section h3 { color: #475569; }
    aside { background: #f8fafc; padding: 20px; border-radius: 12px; height: fit-content; }
    aside h3 { color: #10b981; margin-bottom: 15px; }
    .related { background: #ecfdf5; padding: 10px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #10b981; }
  </style>
</head>
<body>

  <main>
    <article>
      <h2>Understanding Climate Change</h2>
      <p>Posted on May 24, 2026 | By Climate Team</p>

      <section>
        <h3>What is Climate Change?</h3>
        <p>Climate change refers to long-term shifts in global temperatures and weather patterns. The Earth's climate has changed many times in the past, driven by natural causes. Today, climate change is primarily caused by human activities, especially the emission of greenhouse gases.</p>
      </section>

      <section>
        <h3>Causes of Climate Change</h3>
        <p>The primary cause is greenhouse gas emissions from burning fossil fuels (coal, oil, gas). These gases trap heat in the atmosphere. Other causes include deforestation, industrial processes, and agriculture.</p>
      </section>

      <section>
        <h3>Effects and Solutions</h3>
        <p>Effects include rising sea levels, extreme weather, ecosystem disruption. Solutions include renewable energy, conservation, and sustainable practices.</p>
      </section>
    </article>

    <article>
      <h2>Renewable Energy Explained</h2>
      <p>Posted on May 23, 2026 | By Energy Experts</p>

      <section>
        <h3>Types of Renewable Energy</h3>
        <p>1. Solar Energy - Energy from the sun. 2. Wind Energy - Energy from wind turbines. 3. Hydroelectric - Energy from flowing water. 4. Geothermal - Heat from Earth's interior.</p>
      </section>

      <section>
        <h3>Benefits</h3>
        <p>Renewable energy is clean, sustainable, reduces carbon footprint, and becomes increasingly affordable.</p>
      </section>
    </article>
  </main>

  <aside>
    <h3>Related Articles</h3>
    <div class="related">
      <strong>The Paris Climate Agreement</strong>
      <p>Understanding global climate commitments and targets.</p>
    </div>
    <div class="related">
      <strong>Electric Vehicles</strong>
      <p>How EVs are transforming transportation.</p>
    </div>
    <div class="related">
      <strong>Green Building Design</strong>
      <p>Sustainable architecture for the future.</p>
    </div>

    <h3 style="margin-top: 20px;">📌 Categories</h3>
    <ul style="padding-left: 20px;">
      <li>Environment</li>
      <li>Energy</li>
      <li>Sustainability</li>
      <li>Innovation</li>
    </ul>
  </aside>

</body>
</html>`,
    practice: {
      title: 'Blog Post Layout',
      description: `Create a blog post with:
- <article> container
- <h2> as article title
- 3 <section> elements (Intro, Body, Conclusion) each with h3 and p
- <aside> with related articles
- Proper styling with borders and backgrounds
- Grid layout with sidebar`,
      startCode: ``,
      hint: 'Each <section> should have a heading. <article> contains all sections. <aside> is sidebar content.',
    },
  },

  {
    id: 'html-divs-spans',
    category: 'HTML Fundamentals',
    title: 'Divs & Spans: Generic Containers',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '<div> is a block-level container with no semantic meaning. <span> is inline with no semantic meaning. Use them when no semantic tag fits.',
      'Divs create layout blocks. Spans wrap inline text for styling. Both use class and id for CSS targeting.',
      'Prefer semantic tags (<header>, <section>, <article>) when available. Use div/span only for layout or styling needs.',
    ],
    syntax: `<div class="container">
  <h1>Title</h1>
  <p>Text with <span class="highlight">highlighted part</span>.</p>
</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    .container { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 15px 0; }
    .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 3px; color: #92400e; }
    .success { background: #ecfdf5; color: #059669; padding: 4px 8px; border-radius: 4px; }
    .error { background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 4px; }
    .box-row { display: flex; gap: 15px; margin: 15px 0; }
    .box { flex: 1; background: white; padding: 15px; border: 2px solid #cbd5e1; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>

  <h1>Div & Span Examples</h1>

  <div class="container">
    <h2>Basic Container</h2>
    <p>This is a <span class="highlight">highlighted</span> portion of text. The div wraps multiple elements.</p>
  </div>

  <div class="container">
    <h2>Status Messages</h2>
    <p>Form submission: <span class="success">✅ Success</span></p>
    <p>Validation error: <span class="error">❌ Invalid email</span></p>
  </div>

  <div class="box-row">
    <div class="box">
      <h3>Feature 1</h3>
      <p>Using divs to create a grid layout</p>
    </div>
    <div class="box">
      <h3>Feature 2</h3>
      <p>Each box is a separate div</p>
    </div>
    <div class="box">
      <h3>Feature 3</h3>
      <p>Styled with CSS classes</p>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 12px; text-align: center;">
    <h2>Styled Division</h2>
    <p>This div has <span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">inline span styling</span> applied.</p>
  </div>

</body>
</html>`,
    practice: {
      title: 'Dashboard Cards',
      description: `Create a dashboard with:
- Outer <div class="dashboard">
- 4 inner <div class="card"> elements
- Each card has h3 title and p content
- Cards arranged in 2x2 grid
- Styled with borders, padding, shadows
- Use span for icon/badge text inside cards`,
      startCode: ``,
      hint: 'Use display: grid or flex on outer div. Class="card" on each inner div. Span for inline styling.',
    },
  },

  {
    id: 'html-css-classes-ids',
    category: 'HTML & CSS Basics',
    title: 'Classes & IDs for Styling',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'class attribute: reusable, multiple per element, styled with .classname. id attribute: unique, one per element, styled with #idname.',
      'Use classes for repeated styles (buttons, cards). Use ids for unique elements (main content, nav). Specificity: id > class > tag.',
      'CSS selectors: .class { }, #id { }, element.class { }, #id .child { }, .class1.class2 { } (both classes).',
    ],
    syntax: `<h1 id="hero">Main Title</h1>
<p class="intro">Introduction paragraph</p>
<button class="btn btn-primary">Click Me</button>
<style>
  #hero { color: blue; }
  .intro { font-size: 16px; }
  .btn { padding: 10px; }
  .btn-primary { background: blue; }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial; padding: 20px; background: #f1f5f9; }

    /* ID selector - unique */
    #main-header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 12px; margin-bottom: 20px; }

    /* Class selectors - reusable */
    .card { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card h3 { color: #10b981; margin-bottom: 10px; }

    .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin: 5px; }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-success { background: #10b981; color: white; }
    .btn-danger { background: #ef4444; color: white; }
    .btn:hover { opacity: 0.8; }

    .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .badge-new { background: #dbeafe; color: #1e40af; }
    .badge-popular { background: #fef3c7; color: #92400e; }

    /* Combining classes */
    .large-text { font-size: 18px; }
    .center { text-align: center; }
  </style>
</head>
<body>

  <div id="main-header">
    <h1>Learning Dashboard</h1>
    <p>Master web development with classes and IDs</p>
  </div>

  <div class="card">
    <h3>HTML Fundamentals <span class="badge badge-new">NEW</span></h3>
    <p>Learn the basics of HTML structure and semantic markup.</p>
    <button class="btn btn-primary">Start Learning</button>
  </div>

  <div class="card">
    <h3>CSS Styling <span class="badge badge-popular">POPULAR</span></h3>
    <p>Master CSS selectors, layouts, and responsive design.</p>
    <button class="btn btn-success">Enroll Now</button>
  </div>

  <div class="card">
    <h3>JavaScript Basics</h3>
    <p>Interactive web pages with JavaScript programming.</p>
    <button class="btn btn-primary">Explore</button>
  </div>

  <div class="card large-text center">
    <p>Multiple classes can be combined: <code>class="large-text center"</code></p>
    <button class="btn btn-danger">Remove</button>
  </div>

</body>
</html>`,
    practice: {
      title: 'Product Showcase',
      description: `Create a page with:
- id="page-title" for main heading
- 3 <div class="product"> cards
- Each product has: h3, description, price, button
- 3 button classes: btn-buy (green), btn-info (blue), btn-remove (red)
- Badge class for "Bestseller" or "Sale"
- Combine multiple classes on elements`,
      startCode: ``,
      hint: 'Use id for unique elements, class for reusable styles. Combine classes: class="btn btn-primary".',
    },
  },

  {
    id: 'html-css-box-model',
    category: 'CSS Layout',
    title: 'CSS Box Model: Margin, Padding, Border',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Box model: content (inner), padding (inside border), border (outline), margin (outside). All are important for spacing.',
      'padding: 10px adds space inside. margin: 10px adds space outside. border: 2px solid creates outline.',
      'box-sizing: border-box makes width/height include border and padding. Always use this property globally.',
    ],
    syntax: `<style>
  * { box-sizing: border-box; }
  .box {
    width: 200px;
    padding: 20px;
    border: 2px solid blue;
    margin: 15px;
  }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; background: #f1f5f9; }
    h1 { color: #1e293b; }
    .demo { margin: 20px 0; }
    .box-example { background: white; border: 2px solid #cbd5e1; text-align: center; font-weight: bold; }
    .no-spacing { padding: 0; margin: 0; }
    .small-space { padding: 10px; margin: 5px; }
    .medium-space { padding: 20px; margin: 10px; }
    .large-space { padding: 30px; margin: 20px; }
    .colorful { border: 3px solid #10b981; background: #ecfdf5; }
    .labels { color: #475569; font-size: 12px; margin-top: 5px; }
  </style>
</head>
<body>
  <h1>Box Model Visualization</h1>

  <div class="demo">
    <h2>No Spacing</h2>
    <div class="box-example no-spacing">Content only</div>
    <div class="labels">padding: 0; margin: 0;</div>
  </div>

  <div class="demo">
    <h2>Small Spacing</h2>
    <div class="box-example small-space">With padding & margin</div>
    <div class="labels">padding: 10px; margin: 5px;</div>
  </div>

  <div class="demo">
    <h2>Medium Spacing</h2>
    <div class="box-example medium-space">More breathing room</div>
    <div class="labels">padding: 20px; margin: 10px;</div>
  </div>

  <div class="demo">
    <h2>Large Spacing + Green Border</h2>
    <div class="box-example large-space colorful">Maximum spacing with colored border</div>
    <div class="labels">padding: 30px; margin: 20px; border: 3px solid green;</div>
  </div>

  <div class="demo">
    <h2>Box Model Shorthand</h2>
    <p style="background: #dbeafe; padding: 15px; margin: 15px 0; border-radius: 8px;">
      <code>padding: 10px 20px 15px 5px;</code> = top right bottom left<br>
      <code>margin: 20px auto;</code> = vertical horizontal<br>
      <code>border: 2px solid #3b82f6;</code> = width style color
    </p>
  </div>

</body>
</html>`,
    practice: {
      title: 'Card Styling',
      description: `Create 3 cards demonstrating box model:
- Card 1: padding=10px, margin=5px, border=1px
- Card 2: padding=20px, margin=10px, border=2px
- Card 3: padding=30px, margin=15px, border=3px solid colored
- Each card has h3, paragraph, button
- Use box-sizing: border-box on all`,
      startCode: ``,
      hint: 'Always use * { box-sizing: border-box; }. Padding is inside, margin is outside the border.',
    },
  },

  {
    id: 'html-css-flexbox',
    category: 'CSS Layout',
    title: 'CSS Flexbox Layout',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Flexbox: display: flex on parent. Children flex automatically. justify-content (horizontal), align-items (vertical), gap (spacing).',
      'flex-direction: row (default) or column. flex-wrap: wrap for multi-line. flex: 1 on children for equal width.',
      'Perfect for navbars, card layouts, button groups. Responsive by default.',
    ],
    syntax: `<style>
  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  .flex-item { flex: 1; }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 900px; margin: 30px auto; padding: 20px; }

    /* Horizontal Flex */
    .flex-row { display: flex; gap: 15px; margin: 20px 0; }
    .flex-item { flex: 1; background: #dbeafe; padding: 20px; border-radius: 8px; text-align: center; }

    /* Navigation Flex */
    nav { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 15px; color: white; border-radius: 8px; margin: 20px 0; }
    nav a { color: white; text-decoration: none; margin: 0 10px; }
    nav a:hover { color: #10b981; }

    /* Centered Flex */
    .flex-center { display: flex; justify-content: center; align-items: center; height: 150px; background: #f0fdf4; border-radius: 8px; margin: 20px 0; }

    /* Flex Column */
    .flex-column { display: flex; flex-direction: column; gap: 10px; background: #fef3c7; padding: 20px; border-radius: 8px; }

    /* Flex Wrap */
    .flex-wrap { display: flex; flex-wrap: wrap; gap: 10px; background: #fee2e2; padding: 15px; border-radius: 8px; }
    .flex-wrap-item { background: #ef4444; color: white; padding: 10px 20px; border-radius: 6px; }
  </style>
</head>
<body>

  <h1>Flexbox Layout Examples</h1>

  <h2>Navigation Bar (flex, justify-content: space-between)</h2>
  <nav>
    <h3>Logo</h3>
    <div>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </nav>

  <h2>Three Equal Columns (flex: 1 on children)</h2>
  <div class="flex-row">
    <div class="flex-item">
      <h3>Feature 1</h3>
      <p>Equal width columns</p>
    </div>
    <div class="flex-item">
      <h3>Feature 2</h3>
      <p>Responsive layout</p>
    </div>
    <div class="flex-item">
      <h3>Feature 3</h3>
      <p>Gap between items</p>
    </div>
  </div>

  <h2>Centered Content (justify-content + align-items: center)</h2>
  <div class="flex-center">
    <div style="text-align: center;">
      <h3>🎯 Centered Box</h3>
      <p>Using flexbox to center</p>
    </div>
  </div>

  <h2>Column Layout (flex-direction: column)</h2>
  <div class="flex-column">
    <h3>Menu Item 1</h3>
    <h3>Menu Item 2</h3>
    <h3>Menu Item 3</h3>
  </div>

  <h2>Wrapping (flex-wrap: wrap)</h2>
  <div class="flex-wrap">
    <span class="flex-wrap-item">Tag 1</span>
    <span class="flex-wrap-item">Tag 2</span>
    <span class="flex-wrap-item">Tag 3</span>
    <span class="flex-wrap-item">Tag 4</span>
    <span class="flex-wrap-item">Tag 5</span>
  </div>

</body>
</html>`,
    practice: {
      title: 'Navigation & Product Grid',
      description: `Create:
- Flexbox navigation bar (logo left, links right)
- Flexbox product grid (3 columns)
- Each product card with flex-direction: column
- Use gap for spacing between items
- Make it responsive with flex-wrap`,
      startCode: ``,
      hint: 'Parent: display: flex. Children: flex: 1 for equal width. justify-content and align-items for positioning.',
    },
  },

  {
    id: 'html-css-grid',
    category: 'CSS Layout',
    title: 'CSS Grid Layout',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS Grid: display: grid creates rows and columns. grid-template-columns defines column widths. grid-template-rows defines row heights.',
      'Auto-fit and auto-fill for responsive grids. fr unit for fractions: 1fr 2fr = 1:2 ratio.',
      'Grid handles complex layouts better than flexbox. grid-gap (now gap) for spacing.',
    ],
    syntax: `<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 1000px; margin: 30px auto; padding: 20px; }

    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
    .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }

    .grid-item { background: #dbeafe; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #3b82f6; }

    .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin: 20px 0; }
    .sidebar { background: #f8fafc; padding: 20px; border-radius: 8px; }

    .complex-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
    .featured { grid-column: span 2; grid-row: span 2; background: #fef3c7; padding: 30px; }
  </style>
</head>
<body>

  <h1>CSS Grid Examples</h1>

  <h2>3-Column Grid</h2>
  <div class="grid-3">
    <div class="grid-item">Item 1</div>
    <div class="grid-item">Item 2</div>
    <div class="grid-item">Item 3</div>
    <div class="grid-item">Item 4</div>
    <div class="grid-item">Item 5</div>
    <div class="grid-item">Item 6</div>
  </div>

  <h2>2-Column with Sidebar</h2>
  <div class="grid-2-1">
    <div>
      <h3>Main Content Area</h3>
      <p>This is the larger content area (2fr). Articles and main information goes here.</p>
    </div>
    <div class="sidebar">
      <h3>Sidebar (1fr)</h3>
      <p>Supplementary content like ads or links.</p>
    </div>
  </div>

  <h2>Responsive Auto-Fit Grid</h2>
  <div class="grid-auto">
    <div class="grid-item">Card 1</div>
    <div class="grid-item">Card 2</div>
    <div class="grid-item">Card 3</div>
    <div class="grid-item">Card 4</div>
    <div class="grid-item">Card 5</div>
  </div>

  <h2>Complex Grid with Spanning</h2>
  <div class="complex-grid">
    <div class="featured">Featured Item (spans 2×2)</div>
    <div class="grid-item">Item 2</div>
    <div class="grid-item">Item 3</div>
    <div class="grid-item">Item 4</div>
    <div class="grid-item">Item 5</div>
    <div class="grid-item">Item 6</div>
  </div>

</body>
</html>`,
    practice: {
      title: 'Dashboard Layout',
      description: `Create a dashboard with:
- Header spanning full width
- Main content (2 columns)
- Sidebar (right column)
- 4 widget boxes in main area
- Footer spanning full width
- Use grid-template-columns and grid-column: span`,
      startCode: ``,
      hint: 'Use display: grid. grid-template-columns: 2fr 1fr for main+sidebar. grid-column: span 2 to merge columns.',
    },
  },

  {
    id: 'html-css-typography',
    category: 'CSS Styling',
    title: 'CSS Typography: Fonts & Text Styling',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'font-family: serif, sans-serif, monospace. Common safe fonts: Arial, Times New Roman, Georgia, Courier New.',
      'font-size (px, em, rem), font-weight (normal, bold, 400-900), line-height (1.5 is good), letter-spacing.',
      'text-align, text-transform (uppercase, lowercase), text-decoration (underline, overline, line-through).',
    ],
    syntax: `<style>
  body { font-family: 'Arial', sans-serif; font-size: 16px; line-height: 1.6; }
  h1 { font-size: 32px; font-weight: bold; }
  code { font-family: 'Courier New', monospace; }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Typography</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; line-height: 1.8; color: #333; max-width: 800px; margin: 30px auto; padding: 20px; }

    h1 { font-size: 36px; font-weight: 900; letter-spacing: 1px; margin-bottom: 20px; }
    h2 { font-size: 28px; font-weight: 700; margin-top: 30px; margin-bottom: 15px; }
    h3 { font-size: 22px; font-weight: 600; }

    .serif { font-family: 'Georgia', serif; }
    .monospace { font-family: 'Courier New', monospace; background: #f1f5f9; padding: 2px 6px; }
    .uppercase { text-transform: uppercase; letter-spacing: 2px; }
    .lowercase { text-transform: lowercase; }
    .capitalize { text-transform: capitalize; }

    .text-styles { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    .underline { text-decoration: underline; }
    .strikethrough { text-decoration: line-through; }

    .line-height-1 { line-height: 1; margin: 10px 0; }
    .line-height-1-5 { line-height: 1.5; margin: 10px 0; }
    .line-height-2 { line-height: 2; margin: 10px 0; }
  </style>
</head>
<body>

  <h1>Typography & Text Styling</h1>

  <h2>Font Families</h2>
  <p>Default sans-serif font like Arial or Segoe UI is easy to read on screens.</p>
  <p class="serif">This uses Georgia serif font, more formal and traditional looking.</p>
  <p class="monospace">This uses Courier New monospace, great for code.</p>

  <h2>Text Transformations</h2>
  <p class="uppercase">this text is uppercase with letter spacing</p>
  <p class="lowercase">THIS TEXT IS LOWERCASE</p>
  <p class="capitalize">this text is capitalized</p>

  <h2>Text Styles</h2>
  <div class="text-styles">
    <p><span class="bold">Bold text</span> for emphasis</p>
    <p><span class="italic">Italic text</span> for slight emphasis</p>
    <p><span class="underline">Underlined text</span> for links</p>
    <p><span class="strikethrough">Strikethrough text</span> for deleted content</p>
  </div>

  <h2>Line Height Impact</h2>
  <p class="line-height-1">Line height 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
  <p class="line-height-1-5">Line height 1.5: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
  <p class="line-height-2">Line height 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>

  <h2>Font Sizes & Weights</h2>
  <p style="font-size: 12px; color: #6b7280;">Small text (12px) - fine print</p>
  <p style="font-size: 16px;">Regular text (16px) - body</p>
  <p style="font-size: 20px; font-weight: 600;">Large bold (20px, 600) - section</p>
  <p style="font-size: 32px; font-weight: 900;">Huge bold (32px, 900) - heading</p>

</body>
</html>`,
    practice: {
      title: 'Blog Post Styling',
      description: `Create a blog post with:
- h1 title (36px, bold, letter-spacing)
- h2 section headings (28px)
- body text (16px, line-height: 1.8)
- code snippets (monospace background)
- Bold, italic, and underlined text for emphasis
- Quote with serif font and different styling`,
      startCode: ``,
      hint: 'Use font-size, font-weight, line-height, letter-spacing for typography. line-height: 1.6+ for readability.',
    },
  },

  {
    id: 'html-css-colors-backgrounds',
    category: 'CSS Styling',
    title: 'Advanced CSS Colors & Gradients',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Colors: hex (#RGB, #RRGGBB), rgb(r,g,b), rgba(r,g,b,a), hsl(h,s,l). RGBA adds transparency.',
      'Gradients: linear-gradient(direction, color1, color2), radial-gradient(color1, color2).',
      'background-image, background-size (cover, contain, 100px), background-position.',
    ],
    syntax: `<style>
  .gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .overlay { background: rgba(0, 0, 0, 0.5); }
  .image-bg { background: url(image.jpg) center/cover; }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 900px; margin: 30px auto; padding: 20px; }
    .demo { padding: 40px; margin: 20px 0; border-radius: 12px; color: white; text-align: center; }

    /* Linear gradients */
    .gradient-1 { background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%); }
    .gradient-2 { background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); }
    .gradient-3 { background: linear-gradient(45deg, #fbbf24 0%, #f97316 50%, #ef4444 100%); }

    /* Radial gradient */
    .gradient-radial { background: radial-gradient(circle, #fff5e6, #ff6b6b); }

    /* RGBA transparency */
    .color-overlay { background: rgba(59, 130, 246, 0.7); }
    .dark-overlay { background: rgba(0, 0, 0, 0.6); }

    /* Multiple color stops */
    .gradient-stops { background: linear-gradient(to right, red 0%, yellow 50%, green 100%); }

    .text-overlay { position: relative; }
    .text-overlay p { position: relative; z-index: 1; }

    .color-palette { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 20px 0; }
    .color-box { padding: 40px; text-align: center; color: white; font-weight: bold; border-radius: 8px; }
  </style>
</head>
<body>

  <h1>Colors & Gradients</h1>

  <h2>Linear Gradients</h2>
  <div class="demo gradient-1">
    <h3>Horizontal: Blue to Green</h3>
    <p>linear-gradient(90deg, #3b82f6, #10b981)</p>
  </div>

  <div class="demo gradient-2">
    <h3>Diagonal: Purple to Pink</h3>
    <p>linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)</p>
  </div>

  <div class="demo gradient-3">
    <h3>Warm: Yellow to Red</h3>
    <p>linear-gradient(45deg, #fbbf24, #f97316, #ef4444)</p>
  </div>

  <h2>Radial Gradient</h2>
  <div class="demo gradient-radial">
    <h3>From Center Outward</h3>
    <p>radial-gradient(circle, center color, outer color)</p>
  </div>

  <h2>RGBA Transparency</h2>
  <div class="demo color-overlay">
    <h3>50% Opacity Blue</h3>
    <p>rgba(59, 130, 246, 0.7)</p>
  </div>

  <div class="demo dark-overlay">
    <h3>Dark Overlay</h3>
    <p>rgba(0, 0, 0, 0.6) — great for text over images</p>
  </div>

  <h2>Color Stops</h2>
  <div class="demo gradient-stops">
    <h3>Rainbow: Red, Yellow, Green</h3>
    <p>linear-gradient(to right, red 0%, yellow 50%, green 100%)</p>
  </div>

  <h2>Color Palette</h2>
  <div class="color-palette">
    <div class="color-box" style="background: #ef4444;">#ef4444</div>
    <div class="color-box" style="background: #f97316;">#f97316</div>
    <div class="color-box" style="background: #eab308;">#eab308</div>
    <div class="color-box" style="background: #22c55e;">#22c55e</div>
    <div class="color-box" style="background: #06b6d4;">#06b6d4</div>
  </div>

</body>
</html>`,
    practice: {
      title: 'Gradient Button Set',
      description: `Create 5 buttons with different gradients:
- Primary (blue-green)
- Success (green)
- Warning (yellow-orange)
- Danger (red-orange)
- Dark (dark gradient)
- Each with hover effect (darker gradient)`,
      startCode: ``,
      hint: 'Use linear-gradient(direction, color1, color2). Add :hover for interactive effect.',
    },
  },

  {
    id: 'html-css-hover-transitions',
    category: 'CSS Interactivity',
    title: 'CSS Hover Effects & Transitions',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      ':hover pseudo-class triggers on mouse over. transition property animates changes smoothly over time.',
      'transition: property duration timing-function. Example: transition: all 0.3s ease-in-out.',
      'Common effects: color change, background change, scale (transform: scale), shadow effects.',
    ],
    syntax: `<style>
  .btn { transition: all 0.3s ease; }
  .btn:hover { background: blue; transform: scale(1.05); }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; }

    /* Hover Color Change */
    .btn { padding: 12px 24px; margin: 8px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-primary:hover { background: #1e40af; }

    /* Hover Scale */
    .btn-scale { padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; transition: transform 0.2s ease; }
    .btn-scale:hover { transform: scale(1.1); }

    /* Hover Shadow */
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s ease, transform 0.3s ease; margin: 15px 0; }
    .card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.2); transform: translateY(-4px); }

    /* Hover Color + Border */
    .link-style { color: #3b82f6; text-decoration: none; border-bottom: 2px solid transparent; transition: all 0.3s ease; padding-bottom: 2px; }
    .link-style:hover { color: #1e40af; border-bottom-color: #1e40af; }

    /* Hover Rotate */
    .icon { font-size: 32px; display: inline-block; transition: transform 0.4s ease; cursor: pointer; }
    .icon:hover { transform: rotate(360deg); }

    /* Hover Background Slide */
    .btn-slide { padding: 12px 24px; background: linear-gradient(to right, #3b82f6 0%, #3b82f6 100%); background-size: 200% 100%; background-position: left; color: white; border: none; border-radius: 6px; cursor: pointer; transition: background-position 0.3s ease; }
    .btn-slide:hover { background-position: right; }

    .demo { margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
  </style>
</head>
<body>

  <h1>Hover Effects & Transitions</h1>

  <div class="demo">
    <h2>Color Change on Hover</h2>
    <button class="btn btn-primary">Hover Me (Color)</button>
    <p>transition: all 0.3s ease;</p>
  </div>

  <div class="demo">
    <h2>Scale on Hover</h2>
    <button class="btn-scale">Hover Me (Scale)</button>
    <p>transform: scale(1.1);</p>
  </div>

  <div class="demo">
    <h2>Hover Card Effect</h2>
    <div class="card">
      <h3>Hover this card</h3>
      <p>Notice the shadow grows and the card lifts up slightly. Uses box-shadow and transform: translateY().</p>
    </div>
  </div>

  <div class="demo">
    <h2>Link with Bottom Border</h2>
    <a href="#" class="link-style">Hover me for border effect</a>
    <p>border-bottom transitions from transparent to color.</p>
  </div>

  <div class="demo">
    <h2>Spinning Icon</h2>
    <span class="icon">🎉</span>
    <p>Hover the icon for 360° rotation</p>
  </div>

  <div class="demo">
    <h2>Background Slide Effect</h2>
    <button class="btn-slide">Hover for Slide</button>
    <p>background-position animates left to right</p>
  </div>

</body>
</html>`,
    practice: {
      title: 'Interactive Button Set',
      description: `Create 5 interactive buttons with different hover effects:
- Color change (background color)
- Scale effect (transform: scale)
- Shadow effect (box-shadow)
- Slide background (background-position)
- Rotate icon effect
- All with smooth transitions (0.3s ease)`,
      startCode: ``,
      hint: 'Use transition: all 0.3s ease on base element. Apply :hover styles. Use transform and box-shadow.',
    },
  },

  {
    id: 'html-css-media-queries',
    category: 'Responsive Design',
    title: 'CSS Media Queries for Responsive Design',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Media queries adjust styles for different screen sizes: @media (max-width: 768px) { }.',
      'Mobile-first approach: write mobile styles first, then add tablet/desktop with min-width queries.',
      'Common breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop).',
    ],
    syntax: `@media (max-width: 768px) {
  .container { width: 100%; }
  .sidebar { display: none; }
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; margin: 0; padding: 20px; }

    .container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    main { background: white; padding: 20px; border-radius: 8px; }
    aside { background: #f8fafc; padding: 20px; border-radius: 8px; }

    .nav { display: flex; gap: 20px; background: #1e293b; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .nav a { color: white; text-decoration: none; }

    .content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
    .card { background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center; }

    .hamburger { display: none; background: none; border: none; color: white; font-size: 24px; cursor: pointer; }

    /* Tablet: 768px and below */
    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; }
      .content-grid { grid-template-columns: repeat(2, 1fr); }
      .nav { flex-wrap: wrap; }
      aside { order: -1; }
    }

    /* Mobile: 480px and below */
    @media (max-width: 480px) {
      body { padding: 10px; }
      .container { gap: 10px; }
      main, aside { padding: 15px; }
      .content-grid { grid-template-columns: 1fr; }
      .nav { display: none; }
      .nav.active { display: flex; flex-direction: column; }
      .hamburger { display: block; }
    }
  </style>
</head>
<body>

  <h1 style="text-align: center;">Responsive Design Demo</h1>
  <p style="text-align: center; color: #6b7280;">Resize your browser to see responsive changes</p>

  <button class="hamburger" onclick="document.querySelector('.nav').classList.toggle('active')">☰</button>

  <nav class="nav">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>

  <div class="container">
    <main>
      <h2>Responsive Content</h2>
      <p>On large screens, this is 2/3 width with sidebar. On tablets, full width stacked. On mobile, hamburger menu appears.</p>

      <h3>Content Grid</h3>
      <div class="content-grid">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
        <div class="card">Card 4</div>
        <div class="card">Card 5</div>
        <div class="card">Card 6</div>
      </div>
    </main>

    <aside>
      <h3>Sidebar</h3>
      <p>On desktop: right sidebar. On tablet: moves below main. On mobile: hidden.</p>
      <ul style="padding-left: 20px;">
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </aside>
  </div>

</body>
</html>`,
    practice: {
      title: 'Responsive Dashboard',
      description: `Build a responsive layout:
- Desktop (1024px): 2-column grid (main + sidebar)
- Tablet (768px): 1 column, sidebar below main
- Mobile (480px): Full width, hamburger menu, 1 column grid
- Header navigation that hides on mobile
- Use @media queries for breakpoints`,
      startCode: ``,
      hint: 'Mobile-first: write mobile styles, then @media (min-width: 768px) for larger screens.',
    },
  },

  {
    id: 'html-audio-video',
    category: 'Media Elements',
    title: 'HTML5 Audio & Video',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '<audio> and <video> elements play media natively without plugins. Use controls, autoplay, muted, loop attributes.',
      'Multiple <source> elements for browser compatibility. poster attribute shows thumbnail for video.',
      'Formats: MP4, WebM, Ogg for video; MP3, WAV, OGG for audio.',
    ],
    syntax: `<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>

<video controls width="400" poster="thumb.jpg">
  <source src="video.mp4" type="video/mp4">
</video>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; }
    h2 { color: #10b981; }
    .media-box { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; }
    audio, video { width: 100%; max-width: 600px; border-radius: 8px; }
  </style>
</head>
<body>

  <h1>HTML5 Audio & Video</h1>

  <div class="media-box">
    <h2>🎵 Audio Player</h2>
    <audio controls>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>

  <div class="media-box">
    <h2>🎬 Video Player</h2>
    <video controls width="600" poster="https://via.placeholder.com/600x400/3b82f6/white?text=Video+Thumbnail">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video element.
    </video>
  </div>

  <div class="media-box">
    <h2>🔁 Video with Autoplay & Loop</h2>
    <video autoplay muted loop width="600" style="background: #1e293b;">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <p>autoplay muted loop — good for background videos</p>
  </div>

  <div class="media-box">
    <h2>Audio with Download Link</h2>
    <audio controls>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg">
    </audio>
    <p><a href="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" download>⬇️ Download Audio</a></p>
  </div>

</body>
</html>`,
    practice: {
      title: 'Media Library',
      description: `Create a page with:
- 2 audio players (different songs/podcasts)
- 2 videos with poster images and controls
- 1 looping background video (muted, autoplay)
- Download links for audio files
- Proper responsive sizing (width: 100%, max-width: 600px)`,
      startCode: ``,
      hint: 'Use <audio controls> and <video controls>. Add poster attribute to video. Use https:// URLs.',
    },
  },

  {
    id: 'html-iframe-embed',
    category: 'Media Elements',
    title: 'iFrames & Embedded Content',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '<iframe> embeds external content: YouTube, Google Maps, other websites. src attribute is the URL.',
      'frameborder="0" removes borders. allowfullscreen enables full-screen mode. Use responsive sizing with CSS.',
      'Security: use sandbox attribute to limit iframe capabilities.',
    ],
    syntax: `<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
<iframe src="https://maps.google.com/maps?q=City&output=embed"></iframe>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 900px; margin: 30px auto; padding: 20px; }
    h2 { color: #10b981; }
    .embed-container { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; }
    iframe { width: 100%; height: 400px; border-radius: 8px; border: none; }
    .full-width-iframe { width: 100%; min-height: 500px; }
  </style>
</head>
<body>

  <h1>iFrame & Embedded Content</h1>

  <div class="embed-container">
    <h2>YouTube Video Embed</h2>
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
  </div>

  <div class="embed-container">
    <h2>Google Maps Embed</h2>
    <iframe src="https://maps.google.com/maps?q=New+Delhi,India&output=embed"></iframe>
  </div>

  <div class="embed-container">
    <h2>Twitter Tweet Embed</h2>
    <blockquote class="twitter-tweet">
      <p lang="en" dir="ltr">Example tweet would go here</p>
    </blockquote>
  </div>

  <div class="embed-container">
    <h2>Google Slides Presentation</h2>
    <iframe class="full-width-iframe" src="https://docs.google.com/presentation/d/e/2PACX-1vS_example/embed" frameborder="0"></iframe>
  </div>

  <div class="embed-container">
    <h2>Responsive Embed Wrapper</h2>
    <p>For videos, use aspect-ratio CSS to maintain proportions:</p>
    <div style="aspect-ratio: 16/9; background: #1e293b; border-radius: 8px; overflow: hidden;">
      <iframe style="width: 100%; height: 100%;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
    </div>
  </div>

</body>
</html>`,
    practice: {
      title: 'Resource Dashboard',
      description: `Embed 4 different resources:
- YouTube video (educational content)
- Google Maps (location)
- Google Forms (feedback form)
- External website (sandbox attribute)
- Each with proper responsive sizing
- All with border-radius and spacing`,
      startCode: ``,
      hint: 'Use width: 100% and max-width for responsive. YouTube embed: /embed/VIDEO_ID. Maps: output=embed.',
    },
  },

  {
    id: 'html-meta-tags-seo',
    category: 'HTML Head & SEO',
    title: 'Meta Tags & SEO Optimization',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Meta tags provide metadata: charset (UTF-8), viewport (mobile responsive), description (Google snippet), keywords, Open Graph (social).',
      'Title tag is the most important SEO element. Keep under 60 chars. Description under 160 chars.',
      '<canonical> tells search engines the preferred URL. robots meta controls indexing.',
    ],
    syntax: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title (under 60 chars)</title>
<meta name="description" content="Page description (under 160 chars)">
<meta property="og:title" content="Social title">
<link rel="canonical" href="https://example.com/">`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character Encoding (MUST be first) -->
  <meta charset="UTF-8">

  <!-- Mobile Responsive -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Browser Tab Title (most important SEO) -->
  <title>Learn Web Development | Syllab.in — Free AI Tutor</title>

  <!-- Google Search Result Description (under 160 chars) -->
  <meta name="description" content="Master HTML, CSS, and JavaScript with free interactive tutorials. AI-powered learning for Class 5-12.">

  <!-- Keywords (less important, but helpful) -->
  <meta name="keywords" content="web development, HTML, CSS, JavaScript, free learning, online tutorials">

  <!-- Open Graph (Facebook, WhatsApp, Twitter) -->
  <meta property="og:title" content="Learn Web Development Free">
  <meta property="og:description" content="Interactive web development tutorials for beginners.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://syllab.in">
  <meta property="og:image" content="https://syllab.in/og-image.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Learn Web Dev Free">
  <meta name="twitter:description" content="Interactive tutorials for beginners.">

  <!-- Mobile Theme Color -->
  <meta name="theme-color" content="#10b981">

  <!-- Canonical URL (prevent duplicate content) -->
  <link rel="canonical" href="https://syllab.in/tutorials/web-dev">

  <!-- Favicon (browser tab icon) -->
  <link rel="icon" href="/favicon.ico">

  <!-- Robots (control search engine crawling) -->
  <meta name="robots" content="index, follow">

  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    .meta-info { background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>

  <h1>SEO Meta Tags Reference</h1>

  <div class="meta-info">
    <h3>✅ Title Tag (under 60 chars)</h3>
    <code>&lt;title&gt;Learn Web Development | Syllab.in&lt;/title&gt;</code>
    <p>Appears in browser tab and Google search results. Most important SEO element.</p>
  </div>

  <div class="meta-info">
    <h3>✅ Meta Description (under 160 chars)</h3>
    <code>&lt;meta name="description" content="..."&gt;</code>
    <p>Appears below title in Google search. Influences click-through rate.</p>
  </div>

  <div class="meta-info">
    <h3>✅ Viewport (Mobile Responsive)</h3>
    <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
    <p>Tells mobile browsers to use device width and zoom properly.</p>
  </div>

  <div class="meta-info">
    <h3>✅ Open Graph Tags (Social Sharing)</h3>
    <code>og:title, og:description, og:image, og:url</code>
    <p>Controls how your page looks when shared on Facebook, WhatsApp, Twitter.</p>
  </div>

  <div class="meta-info">
    <h3>✅ Canonical URL</h3>
    <code>&lt;link rel="canonical" href="https://example.com"&gt;</code>
    <p>Tells Google the preferred URL (prevents duplicate content issues).</p>
  </div>

  <div class="meta-info">
    <h3>SEO Checklist</h3>
    <ul>
      <li>✅ Unique, descriptive title (under 60 chars)</li>
      <li>✅ Meta description (under 160 chars)</li>
      <li>✅ Charset UTF-8</li>
      <li>✅ Viewport for mobile</li>
      <li>✅ One h1 per page</li>
      <li>✅ Descriptive headings (h2, h3)</li>
      <li>✅ Alt text on images</li>
      <li>✅ Open Graph tags</li>
      <li>✅ Canonical URL</li>
      <li>✅ Fast page load (optimize images)</li>
    </ul>
  </div>

</body>
</html>`,
    practice: {
      title: 'SEO-Optimized School Website',
      description: `Create an HTML page with all SEO meta tags:
- Title (under 60 chars) about your school
- Description (under 160 chars)
- Viewport for mobile
- Keywords
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- favicon link
- Theme color
- Proper h1 on page`,
      startCode: ``,
      hint: 'Title and description are most important. Keep them concise and descriptive. Use exact word counts.',
    },
  },

  {
    id: 'html-data-attributes',
    category: 'HTML Advanced',
    title: 'HTML5 Data Attributes',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'data-* attributes store custom data on elements. Example: <div data-user-id="123" data-role="admin">.',
      'Access with JavaScript: element.dataset.userId or element.getAttribute("data-user-id").',
      'Great for storing metadata without changing element behavior.',
    ],
    syntax: `<div id="user" data-id="42" data-name="Priya" data-role="student">
  User Info
</div>

<script>
  const user = document.getElementById('user');
  console.log(user.dataset.id);      // "42"
  console.log(user.dataset.name);    // "Priya"
  console.log(user.dataset.role);    // "student"
</script>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    .student { padding: 15px; margin: 10px 0; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .student[data-status="active"] { background: #ecfdf5; border-left: 4px solid #10b981; }
    .student[data-status="inactive"] { background: #fee2e2; border-left: 4px solid #ef4444; }
    .student:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    #output { background: #1e293b; color: #10b981; padding: 15px; border-radius: 8px; font-family: monospace; margin-top: 20px; }
  </style>
</head>
<body>

  <h1>Data Attributes Demo</h1>

  <div class="student" data-id="101" data-name="Priya Sharma" data-class="11" data-status="active" data-score="95">
    <strong>Priya Sharma</strong><br>
    Class 11 | Status: Active
  </div>

  <div class="student" data-id="102" data-name="Arjun Kumar" data-class="11" data-status="active" data-score="88">
    <strong>Arjun Kumar</strong><br>
    Class 11 | Status: Active
  </div>

  <div class="student" data-id="103" data-name="Kavya Singh" data-class="10" data-status="inactive" data-score="92">
    <strong>Kavya Singh</strong><br>
    Class 10 | Status: Inactive
  </div>

  <h2>Click a student to see their data attributes</h2>
  <div id="output">Click on a student card to display their data</div>

  <script>
    const students = document.querySelectorAll('.student');
    students.forEach(student => {
      student.addEventListener('click', function() {
        const output = document.getElementById('output');
        output.textContent = \`
Student ID: \${this.dataset.id}
Name: \${this.dataset.name}
Class: \${this.dataset.class}
Status: \${this.dataset.status}
Score: \${this.dataset.score}
        \`;
      });
    });

    // Click first student automatically
    students[0].click();
  </script>

</body>
</html>`,
    practice: {
      title: 'Product List with Data',
      description: `Create a product list with data attributes:
- 5 product cards, each with:
  - data-id (product ID)
  - data-name (product name)
  - data-price (price)
  - data-category (category)
  - data-stock (in stock: true/false)
- Click to display product data
- Style based on data-stock attribute
- Use JavaScript to access dataset properties`,
      startCode: ``,
      hint: 'Add data-* attributes to elements. Access with element.dataset.attributeName. Style with [data-attr="value"].',
    },
  },

  {
    id: 'html-details-summary',
    category: 'Interactive Elements',
    title: 'HTML Details & Summary',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '<details> creates collapsible content. <summary> is the clickable header. Content inside details expands/collapses on click.',
      'No JavaScript needed — native browser functionality. open attribute expands it by default.',
      'Perfect for FAQs, accordions, and collapsible sections.',
    ],
    syntax: `<details>
  <summary>Click to expand</summary>
  <p>Hidden content here</p>
</details>

<details open>
  <summary>Expanded by default</summary>
  <p>Already visible</p>
</details>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    details { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 8px; border: 2px solid #e2e8f0; }
    summary { cursor: pointer; font-weight: bold; color: #10b981; padding: 10px; }
    summary:hover { background: #ecfdf5; border-radius: 6px; }
    details[open] { border-color: #10b981; }
    details[open] summary { color: #059669; }
  </style>
</head>
<body>

  <h1>Details & Summary FAQ</h1>

  <details>
    <summary>📚 What is HTML?</summary>
    <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides structure and meaning to web content using tags.</p>
  </details>

  <details>
    <summary>🎨 What is CSS?</summary>
    <p>CSS (Cascading Style Sheets) is used to style and layout web pages — like colors, fonts, spacing, and responsive design. It works alongside HTML.</p>
  </details>

  <details>
    <summary>⚡ What is JavaScript?</summary>
    <p>JavaScript is a programming language that makes web pages interactive. It can update content, control multimedia, animate images, and much more.</p>
  </details>

  <details>
    <summary>🌐 How do I deploy a website?</summary>
    <p>To deploy a website: 1) Get a domain name, 2) Get web hosting, 3) Upload your files via FTP or git, 4) Configure DNS settings to point to your host.</p>
  </details>

  <details open>
    <summary>✅ How do I learn web development?</summary>
    <p>Start with HTML basics, then learn CSS for styling, then JavaScript for interactivity. Practice building projects, read documentation, and join communities. Consistency is key!</p>
  </details>

  <h2>Nested Details (Accordion-style)</h2>
  <details>
    <summary>Getting Started</summary>
    <details style="margin: 10px 0;">
      <summary>Step 1: HTML Basics</summary>
      <p>Learn HTML tags, structure, and semantic markup.</p>
    </details>
    <details style="margin: 10px 0;">
      <summary>Step 2: CSS Styling</summary>
      <p>Learn selectors, properties, and responsive design.</p>
    </details>
  </details>

</body>
</html>`,
    practice: {
      title: 'Course FAQ Accordion',
      description: `Create an FAQ section with:
- 5 <details> elements, each with one <summary>
- Different topics/questions
- At least one details open by default
- Styled with padding, borders, background colors
- Hover effects on summary
- Optional: nested details for sub-questions`,
      startCode: ``,
      hint: 'Use <details> with <summary> inside. Add open attribute to expand by default. Style with CSS.',
    },
  },

  {
    id: 'html-progress-meter',
    category: 'Interactive Elements',
    title: 'Progress & Meter Elements',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '<progress> shows task progress: 0-100%. Attributes: value (current), max (total). Example: <progress value="70" max="100"></progress>.',
      '<meter> shows a scalar measurement (0-100%): volume, disk usage, temperature. Attributes: value, min, max, low, high, optimum.',
      'Use CSS to style both. Both are accessible without JavaScript.',
    ],
    syntax: `<progress value="70" max="100"></progress>  <!-- 70% complete -->
<meter value="7" min="0" max="10">7/10</meter>  <!-- Rating -->`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 700px; margin: 30px auto; padding: 20px; }
    .demo { background: #f8fafc; padding: 20px; margin: 15px 0; border-radius: 8px; }
    progress { width: 100%; height: 25px; border-radius: 8px; }
    meter { width: 100%; height: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: bold; }
  </style>
</head>
<body>

  <h1>Progress & Meter Elements</h1>

  <div class="demo">
    <h2>📊 Progress Bars</h2>

    <label>HTML Course - 30%</label>
    <progress value="30" max="100"></progress>

    <label style="margin-top: 15px;">CSS Course - 60%</label>
    <progress value="60" max="100"></progress>

    <label style="margin-top: 15px;">JavaScript Course - 90%</label>
    <progress value="90" max="100"></progress>

    <label style="margin-top: 15px;">Portfolio Project - 100%</label>
    <progress value="100" max="100"></progress>
  </div>

  <div class="demo">
    <h2>📈 Meter Elements (Measurements)</h2>

    <label>Disk Usage: 45%</label>
    <meter value="45" min="0" max="100" low="33" high="66" optimum="25"></meter>

    <label style="margin-top: 15px;">Memory Usage: 75%</label>
    <meter value="75" min="0" max="100" low="33" high="66" optimum="25"></meter>

    <label style="margin-top: 15px;">CPU Usage: 20%</label>
    <meter value="20" min="0" max="100" low="33" high="66" optimum="25"></meter>

    <label style="margin-top: 15px;">Temperature: 65°C</label>
    <meter value="65" min="0" max="100" low="35" high="75" optimum="30"></meter>

    <label style="margin-top: 15px;">Student Rating: 8/10</label>
    <meter value="8" min="0" max="10" low="3" high="7" optimum="9"></meter>
  </div>

  <div class="demo">
    <h2>📲 Dynamic Progress Example</h2>
    <p>File Download Progress:</p>
    <progress id="download" value="0" max="100"></progress>
    <span id="percent">0%</span>

    <button onclick="simulateDownload()" style="margin-top: 15px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Start Download</button>
  </div>

  <script>
    function simulateDownload() {
      const progress = document.getElementById('download');
      const percent = document.getElementById('percent');
      let value = 0;

      const interval = setInterval(() => {
        value += Math.random() * 15;
        if (value > 100) value = 100;
        progress.value = value;
        percent.textContent = Math.round(value) + '%';

        if (value === 100) {
          clearInterval(interval);
          percent.textContent = '✅ Complete!';
        }
      }, 300);
    }
  </script>

</body>
</html>`,
    practice: {
      title: 'Study Progress Dashboard',
      description: `Create a dashboard with:
- 5 <progress> bars for different subjects (0-100%)
- 3 <meter> elements (disk space, battery, rating)
- Styled with colors and height
- Button to simulate progress update
- Display percentage text next to bars
- Use JavaScript to animate progress`,
      startCode: ``,
      hint: 'Progress: value="50" max="100". Meter: value="5" min="0" max="10". Use JavaScript for dynamic updates.',
    },
  },

  {
    id: 'html-css-animations',
    category: 'CSS Advanced',
    title: 'CSS Keyframe Animations',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '@keyframes defines animation steps. animation property applies it: animation: name duration timing-function repeat.',
      'Keyframes: 0% (start), 50% (middle), 100% (end). Use transform, opacity, color, etc.',
      'animation-delay delays start. animation-iteration-count controls repeats (infinite).',
    ],
    syntax: `@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(200px); }
}

.box { animation: slide 2s ease-in-out infinite; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 900px; margin: 30px auto; padding: 20px; }

    /* Fade In Animation */
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    /* Slide Animation */
    @keyframes slideRight {
      0% { transform: translateX(-100px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }

    /* Bounce Animation */
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    /* Spin Animation */
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Pulse Animation */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .demo { background: #f8fafc; padding: 40px; text-align: center; margin: 20px 0; border-radius: 8px; }

    .fade-in { animation: fadeIn 2s ease-in; }

    .slide-in { animation: slideRight 1.5s ease-out; }

    .bounce-box { width: 80px; height: 80px; background: #3b82f6; border-radius: 8px; margin: 20px auto; animation: bounce 1s infinite; }

    .spinner { width: 60px; height: 60px; border: 6px solid #e2e8f0; border-top-color: #10b981; border-radius: 50%; margin: 20px auto; animation: spin 1s linear infinite; }

    .pulse-text { font-size: 24px; font-weight: bold; color: #ec4899; animation: pulse 1s ease-in-out infinite; }

    .delay-1 { animation-delay: 0.2s; }
    .delay-2 { animation-delay: 0.4s; }
    .delay-3 { animation-delay: 0.6s; }
  </style>
</head>
<body>

  <h1>CSS Keyframe Animations</h1>

  <div class="demo">
    <h2>Fade In Animation</h2>
    <p class="fade-in">This text fades in when the page loads</p>
  </div>

  <div class="demo">
    <h2>Slide In Animation</h2>
    <p class="slide-in">This text slides in from the left</p>
  </div>

  <div class="demo">
    <h2>Bounce Animation</h2>
    <div class="bounce-box"></div>
    <p>This box bounces up and down</p>
  </div>

  <div class="demo">
    <h2>Spinning Loader</h2>
    <div class="spinner"></div>
    <p>Loading animation with border-top-color change</p>
  </div>

  <div class="demo">
    <h2>Pulse Animation</h2>
    <p class="pulse-text">Pulsing text for attention</p>
  </div>

  <div class="demo">
    <h2>Staggered Animation (with delays)</h2>
    <div style="display: flex; justify-content: center; gap: 15px;">
      <div class="bounce-box delay-1" style="width: 50px; height: 50px; background: #ef4444;"></div>
      <div class="bounce-box delay-2" style="width: 50px; height: 50px; background: #f97316;"></div>
      <div class="bounce-box delay-3" style="width: 50px; height: 50px; background: #10b981;"></div>
    </div>
  </div>

</body>
</html>`,
    practice: {
      title: 'Loading Animation Page',
      description: `Create animations for:
- Fade-in heading
- Slide-in paragraph
- Bouncing button
- Spinning loader (border rotation)
- Pulsing text (for CTAs)
- Staggered animation (3 boxes with delays)
- Mix of @keyframes: opacity, transform, rotate`,
      startCode: ``,
      hint: '@keyframes name { 0% { } 100% { } }. animation: name duration timing repeat. Use transform, opacity, rotate.',
    },
  },

  {
    id: 'html-css-variables',
    category: 'CSS Advanced',
    title: 'CSS Custom Properties (Variables)',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'CSS variables: --name: value; Access with var(--name). Reduce repetition, enable dynamic theming.',
      'Scope: :root { } makes global. Can scope to elements. Inheritance works like normal CSS.',
      'JavaScript can update: element.style.setProperty("--name", "value");',
    ],
    syntax: `<style>
  :root {
    --primary: #3b82f6;
    --spacing: 16px;
  }

  .button {
    background: var(--primary);
    padding: var(--spacing);
  }
</style>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --primary-color: #3b82f6;
      --success-color: #10b981;
      --danger-color: #ef4444;
      --warning-color: #f97316;
      --spacing: 16px;
      --border-radius: 8px;
      --transition: 0.3s ease;
    }

    * { box-sizing: border-box; }
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: var(--spacing); }

    h1 { color: var(--primary-color); margin-bottom: var(--spacing); }
    h2 { color: var(--success-color); }

    .btn { padding: var(--spacing); border: none; border-radius: var(--border-radius); cursor: pointer; font-weight: bold; transition: all var(--transition); }
    .btn-primary { background: var(--primary-color); color: white; }
    .btn-primary:hover { background: #1e40af; }
    .btn-success { background: var(--success-color); color: white; }
    .btn-danger { background: var(--danger-color); color: white; }

    .card { background: #f8fafc; padding: var(--spacing); border-radius: var(--border-radius); margin: var(--spacing) 0; border: 2px solid var(--primary-color); }

    .alert { padding: var(--spacing); border-radius: var(--border-radius); margin: var(--spacing) 0; }
    .alert-success { background: #ecfdf5; border-left: 4px solid var(--success-color); color: var(--success-color); }
    .alert-danger { background: #fee2e2; border-left: 4px solid var(--danger-color); color: var(--danger-color); }

    .theme-selector { margin: 20px 0; }
    .theme-btn { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>

  <h1>CSS Custom Properties (Variables)</h1>

  <div class="theme-selector">
    <h3>🎨 Change Theme:</h3>
    <button class="theme-btn" onclick="setTheme('blue', '#3b82f6', '#1e40af')" style="background: #3b82f6; color: white;">Blue Theme</button>
    <button class="theme-btn" onclick="setTheme('purple', '#8b5cf6', '#7c3aed')" style="background: #8b5cf6; color: white;">Purple Theme</button>
    <button class="theme-btn" onclick="setTheme('pink', '#ec4899', '#db2777')" style="background: #ec4899; color: white;">Pink Theme</button>
    <button class="theme-btn" onclick="setTheme('green', '#10b981', '#059669')" style="background: #10b981; color: white;">Green Theme</button>
  </div>

  <div class="card">
    <h2>Reusable Styles</h2>
    <p>All styles use CSS variables from :root. Change one variable and it updates everywhere!</p>
  </div>

  <div class="alert alert-success">
    ✅ Success: This alert uses --success-color variable
  </div>

  <div class="alert alert-danger">
    ❌ Error: This alert uses --danger-color variable
  </div>

  <div style="display: flex; gap: var(--spacing);">
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-success">Success Button</button>
    <button class="btn btn-danger">Danger Button</button>
  </div>

  <h2>How It Works</h2>
  <div class="card">
    <code>:root { --primary-color: #3b82f6; }</code><br><br>
    <code>.button { background: var(--primary-color); }</code><br><br>
    <p>Change --primary-color once and all buttons update!</p>
  </div>

  <script>
    function setTheme(name, primary, dark) {
      document.documentElement.style.setProperty('--primary-color', primary);
      document.querySelector('.btn-primary').style.background = primary;
    }
  </script>

</body>
</html>`,
    practice: {
      title: 'Theming System',
      description: `Create a theme system with:
- 5+ CSS variables in :root (colors, spacing, border-radius)
- Multiple button styles using variables
- Cards using spacing/border-radius variables
- Alerts with color variables
- JavaScript button to change theme
- Demonstrate variable inheritance and reuse`,
      startCode: ``,
      hint: ':root { --name: value; }. Access with var(--name). Use JavaScript to update: document.documentElement.style.setProperty(...)',
    },
  },

  {
    id: 'html-css-pseudo-classes',
    category: 'CSS Advanced',
    title: 'CSS Pseudo-classes & Pseudo-elements',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Pseudo-classes: :hover, :active, :focus, :visited, :nth-child, :first-child, :last-child, :empty.',
      'Pseudo-elements: ::before, ::after, ::first-letter, ::selection, ::placeholder.',
      'Pseudo-elements add virtual elements. Useful for decorations without extra HTML.',
    ],
    syntax: `a:visited { color: purple; }
li:nth-child(2n) { background: gray; }
p::first-letter { font-size: 2em; font-weight: bold; }
input::placeholder { color: #ccc; }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; max-width: 800px; margin: 30px auto; padding: 20px; }

    /* Pseudo-classes */
    a { color: #3b82f6; text-decoration: none; transition: color 0.2s; }
    a:hover { color: #1e40af; text-decoration: underline; }
    a:active { color: #059669; }
    a:visited { color: #8b5cf6; }

    button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s; margin: 5px; }
    button:hover { background: #1e40af; }
    button:active { transform: scale(0.98); }
    button:focus { outline: 3px solid #10b981; }

    input { padding: 8px; border: 2px solid #cbd5e1; border-radius: 4px; }
    input:focus { border-color: #3b82f6; outline: none; }

    /* List styling with nth-child */
    ul { list-style: none; padding: 0; }
    li { padding: 10px; margin: 5px 0; border-radius: 6px; }
    li:nth-child(odd) { background: #dbeafe; }
    li:nth-child(even) { background: #ecfdf5; }
    li:first-child { background: #fef3c7; font-weight: bold; }
    li:last-child { border-bottom: 3px solid #ef4444; }

    /* Pseudo-elements */
    p { position: relative; }
    p::first-letter { font-size: 24px; font-weight: bold; color: #10b981; }

    .quote::before { content: '"'; color: #cbd5e1; font-size: 32px; }
    .quote::after { content: '"'; color: #cbd5e1; font-size: 32px; }

    input::placeholder { color: #94a3b8; font-style: italic; }

    ::selection { background: #3b82f6; color: white; }

    .card::after { content: ""; display: block; width: 100%; height: 4px; background: linear-gradient(90deg, #3b82f6, #10b981); margin-top: 15px; }
  </style>
</head>
<body>

  <h1>Pseudo-classes & Pseudo-elements</h1>

  <h2>Links (Pseudo-classes)</h2>
  <p>
    <a href="https://syllab.in">Unvisited Link</a> |
    <a href="#">Hover over link</a> |
    <a href="#">Click link for active state</a>
  </p>

  <h2>Buttons (Hover, Active, Focus)</h2>
  <button>Hover me</button>
  <button>Click me</button>
  <button>Tab to focus</button>

  <h2>Input Focus</h2>
  <input type="text" placeholder="Click me to focus">

  <h2>List with nth-child</h2>
  <ul>
    <li>First Item (special background)</li>
    <li>Second Item (even background)</li>
    <li>Third Item (odd background)</li>
    <li>Fourth Item (even background)</li>
    <li>Fifth Item (last item, red border)</li>
  </ul>

  <h2>Pseudo-elements (::before, ::after)</h2>
  <p class="quote">This quote has decorative quotes added with ::before and ::after</p>

  <h2>First Letter Styling</h2>
  <p>This paragraph has the first letter styled larger and green using ::first-letter pseudo-element.</p>

  <h2>Selection Color</h2>
  <p>Try selecting this text — it uses ::selection pseudo-element to change highlight color.</p>

  <div class="card" style="background: #f8fafc; padding: 20px; border-radius: 8px;">
    <h3>Card with Decorative Line</h3>
    <p>This card has a gradient line added with ::after pseudo-element.</p>
  </div>

</body>
</html>`,
    practice: {
      title: 'Interactive Form Page',
      description: `Create a page with:
- Links showing :hover, :active, :visited states
- Buttons with :hover and :active effects
- Input fields with :focus styling
- List with :nth-child(odd/even) for striping
- :first-child and :last-child special styling
- ::before and ::after for decorative elements
- ::selection for text highlight color
- ::placeholder for input placeholder text`,
      startCode: ``,
      hint: 'Pseudo-classes: :hover, :focus, :nth-child. Pseudo-elements: ::before, ::after, ::first-letter.',
    },
  },

  {
    id: 'html-project-profile-card',
    category: 'Projects',
    title: 'Project: Build a Profile Card',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Profile cards combine HTML, CSS, and layout skills. Include image, name, title, bio, social links, and styling.',
      'Use flexbox or grid for layout. Apply box-shadow for depth. Use gradients for headers.',
      'Perfect beginner project to apply all learned HTML/CSS concepts.',
    ],
    syntax: `<!-- Simple profile card structure -->
<div class="card">
  <img src="profile.jpg" alt="Profile">
  <h2>Name</h2>
  <p>Title</p>
  <p>Bio</p>
  <a href="#">Social Links</a>
</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; justify-content: center; align-items: center; }

    .profile-card {
      background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); width: 350px; text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .profile-card:hover { transform: translateY(-10px); box-shadow: 0 30px 80px rgba(0,0,0,0.4); }

    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 120px; }

    .avatar { width: 120px; height: 120px; border-radius: 50%; border: 5px solid white; margin-top: -60px; background: white; object-fit: cover; }

    .content { padding: 30px 20px 20px; }
    .content h2 { font-size: 24px; color: #1e293b; margin-bottom: 5px; }
    .content .title { color: #667eea; font-weight: bold; margin-bottom: 15px; }
    .content p { color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }

    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px; }
    .stat { padding: 15px; }
    .stat-number { font-size: 20px; font-weight: bold; color: #667eea; display: block; }
    .stat-label { font-size: 12px; color: #94a3b8; }

    .social-links { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
    .social-link { width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; text-decoration: none; color: #667eea; transition: all 0.2s; }
    .social-link:hover { background: #667eea; color: white; }

    .btn-follow { width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
    .btn-follow:hover { opacity: 0.9; }
  </style>
</head>
<body>

  <div class="profile-card">
    <div class="header"></div>

    <img src="https://via.placeholder.com/120x120/667eea/white?text=Avatar" alt="Profile Avatar" class="avatar">

    <div class="content">
      <h2>Priya Sharma</h2>
      <div class="title">Full Stack Developer</div>
      <p>Passionate about web development and AI. Currently learning at Syllab.in and building amazing projects.</p>

      <div class="stats">
        <div class="stat">
          <span class="stat-number">12</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat">
          <span class="stat-number">450</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat-number">89</span>
          <span class="stat-label">Following</span>
        </div>
      </div>

      <div class="social-links">
        <a href="#" class="social-link" title="GitHub">🔗</a>
        <a href="#" class="social-link" title="LinkedIn">💼</a>
        <a href="#" class="social-link" title="Twitter">🐦</a>
        <a href="#" class="social-link" title="Email">📧</a>
      </div>

      <button class="btn-follow">Follow</button>
    </div>
  </div>

</body>
</html>`,
    practice: {
      title: 'Your Profile Card',
      description: `Build your own profile card with:
- Gradient header background
- Circular avatar image
- Your name and title
- Short bio (3-4 lines)
- Stats (projects, followers, etc)
- Social media links (4-5)
- Follow button
- Hover effect (lift card)
- Responsive design`,
      startCode: ``,
      hint: 'Use avatar with negative margin to overlap header. Flexbox for social links. Gradient for header and button.',
    },
  },

  {
    id: 'html-project-pricing-table',
    category: 'Projects',
    title: 'Project: Pricing Table',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Pricing tables compare plans side-by-side. Use grid or flexbox for columns. Highlight the recommended plan.',
      'Include plan name, price, features list, and CTA button. Use checkmarks for included features.',
      'Make responsive: stack on mobile, side-by-side on desktop.',
    ],
    syntax: `<div class="pricing-table">
  <div class="plan">
    <h3>Starter</h3>
    <p class="price">$9/month</p>
    <ul class="features">
      <li>✅ Feature 1</li>
      <li>✅ Feature 2</li>
    </ul>
    <button>Get Started</button>
  </div>
</div>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #f1f5f9; padding: 40px 20px; }

    .container { max-width: 1200px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 50px; }
    .header h1 { font-size: 36px; color: #1e293b; margin-bottom: 10px; }
    .header p { color: #475569; font-size: 18px; }

    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 50px; }

    .plan { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; }
    .plan:hover { transform: translateY(-10px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }

    .plan.featured { border: 3px solid #667eea; transform: scale(1.05); }
    .plan.featured:hover { transform: scale(1.05) translateY(-10px); }

    .plan-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
    .plan.featured .plan-header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

    .plan-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .plan-price { font-size: 48px; font-weight: bold; }
    .plan-price span { font-size: 18px; color: rgba(255,255,255,0.8); }

    .plan-body { padding: 30px 20px; }
    .features { list-style: none; margin-bottom: 25px; }
    .features li { padding: 12px 0; color: #475569; border-bottom: 1px solid #e2e8f0; }
    .features li:before { content: "✅ "; color: #10b981; font-weight: bold; margin-right: 8px; }
    .features li.disabled { opacity: 0.5; }
    .features li.disabled:before { content: "❌ "; color: #ef4444; }

    .plan-button { width: 100%; padding: 14px; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
    .plan-button { background: #f1f5f9; color: #667eea; }
    .plan-button:hover { background: #e2e8f0; }

    .plan.featured .plan-button { background: #10b981; color: white; }
    .plan.featured .plan-button:hover { background: #059669; }

    @media (max-width: 768px) {
      .pricing-grid { grid-template-columns: 1fr; }
      .plan.featured { transform: scale(1); }
      .plan.featured:hover { transform: translateY(-10px); }
      .header h1 { font-size: 28px; }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Syllab.in Pricing Plans</h1>
      <p>Choose the perfect plan for your learning journey</p>
    </div>

    <div class="pricing-grid">
      <!-- Starter Plan -->
      <div class="plan">
        <div class="plan-header">
          <div class="plan-name">Starter</div>
          <div class="plan-price"><span>₹</span>299<span>/month</span></div>
        </div>
        <div class="plan-body">
          <ul class="features">
            <li>5 courses access</li>
            <li>Community support</li>
            <li>Basic practice tests</li>
            <li class="disabled">Certificate of completion</li>
            <li class="disabled">1-on-1 mentoring</li>
          </ul>
          <button class="plan-button">Get Started</button>
        </div>
      </div>

      <!-- Professional Plan (Featured) -->
      <div class="plan featured">
        <div class="plan-header">
          <div class="plan-name">Professional</div>
          <div class="plan-price"><span>₹</span>799<span>/month</span></div>
        </div>
        <div class="plan-body">
          <ul class="features">
            <li>Unlimited courses</li>
            <li>Priority support</li>
            <li>Advanced practice tests</li>
            <li>Certificate of completion</li>
            <li class="disabled">1-on-1 mentoring</li>
          </ul>
          <button class="plan-button">Most Popular</button>
        </div>
      </div>

      <!-- Enterprise Plan -->
      <div class="plan">
        <div class="plan-header">
          <div class="plan-name">Enterprise</div>
          <div class="plan-price"><span>₹</span>1,999<span>/month</span></div>
        </div>
        <div class="plan-body">
          <ul class="features">
            <li>Unlimited everything</li>
            <li>24/7 dedicated support</li>
            <li>All test types</li>
            <li>Certificate + credentials</li>
            <li>1-on-1 mentoring</li>
          </ul>
          <button class="plan-button">Start Free Trial</button>
        </div>
      </div>
    </div>

    <div style="text-align: center; color: #475569;">
      <p>All plans include 7-day free trial. Cancel anytime. No credit card required.</p>
    </div>

  </div>

</body>
</html>`,
    practice: {
      title: 'Custom Pricing Table',
      description: `Build a pricing table with:
- 3 plans (Basic, Pro, Enterprise)
- Each with name, price, features list
- Highlight the recommended plan with border/scale
- Checkmarks (✅) for included features
- Crossed marks (❌) for missing features
- Styled buttons (different colors per plan)
- Responsive grid layout
- Hover effects (lift cards)`,
      startCode: ``,
      hint: 'Use grid with auto-fit. Featured plan: border or scale(1.05). Features: list-style-type: none.',
    },
  },

  {
    id: 'html-project-landing-page',
    category: 'Projects',
    title: 'Project: Landing Page',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'Landing pages convert visitors: strong headline, hero image, clear value proposition, CTA buttons, testimonials, footer.',
      'Use semantic HTML: header, nav, main, section, footer. CSS Grid/Flex for layout. Responsive design.',
      'Include forms, animations, and professional styling. This is a comprehensive project combining all skills.',
    ],
    syntax: `<header><nav></nav></header>
<section class="hero"></section>
<section class="features"></section>
<section class="testimonials"></section>
<footer></footer>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Syllab.in — Learn Web Development</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; }

    /* Navigation */
    header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    nav { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #10b981; }
    nav a { color: #333; text-decoration: none; margin: 0 20px; transition: color 0.2s; }
    nav a:hover { color: #10b981; }

    /* Hero Section */
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
    .hero h1 { font-size: 48px; margin-bottom: 20px; }
    .hero p { font-size: 20px; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .btn { padding: 14px 30px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
    .btn:hover { background: #059669; transform: translateY(-2px); }

    /* Features Section */
    .features { max-width: 1200px; margin: 80px auto; padding: 0 20px; }
    .features h2 { text-align: center; font-size: 36px; margin-bottom: 50px; color: #1e293b; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; }
    .feature-card { background: #f8fafc; padding: 30px; border-radius: 12px; text-align: center; }
    .feature-card h3 { font-size: 24px; margin-bottom: 15px; color: #10b981; }
    .feature-card p { color: #475569; line-height: 1.6; }

    /* Stats Section */
    .stats { background: #1e293b; color: white; padding: 60px 20px; }
    .stats-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; text-align: center; }
    .stat { }
    .stat-number { font-size: 48px; font-weight: bold; color: #10b981; }
    .stat-label { color: #cbd5e1; margin-top: 10px; }

    /* Footer */
    footer { background: #0f172a; color: #cbd5e1; padding: 40px 20px; text-align: center; }

    @media (max-width: 768px) {
      .hero h1 { font-size: 32px; }
      .hero p { font-size: 16px; }
      nav a { margin: 0 10px; }
    }
  </style>
</head>
<body>

  <header>
    <nav>
      <div class="logo">Syllab.in</div>
      <div>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>

  <section class="hero">
    <h1>Learn Web Development Your Way</h1>
    <p>Free AI-powered tutorials for HTML, CSS, JavaScript, and more. Master web development at your own pace.</p>
    <button class="btn">Start Learning Now</button>
  </section>

  <section class="features" id="features">
    <h2>Why Choose Syllab.in?</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>📚 Comprehensive</h3>
        <p>From beginner HTML to advanced JavaScript. Complete learning paths with projects.</p>
      </div>
      <div class="feature-card">
        <h3>🤖 AI-Powered</h3>
        <p>Get instant help with coding questions. AI tutor adapts to your learning pace.</p>
      </div>
      <div class="feature-card">
        <h3>🎯 Project-Based</h3>
        <p>Build real projects. Complete a portfolio while you learn. Impress employers.</p>
      </div>
      <div class="feature-card">
        <h3>💰 100% Free</h3>
        <p>No hidden fees. Quality education accessible to everyone. Forever free.</p>
      </div>
      <div class="feature-card">
        <h3>🌍 Community</h3>
        <p>Connect with learners worldwide. Share projects, get feedback, make friends.</p>
      </div>
      <div class="feature-card">
        <h3>📊 Progress Tracking</h3>
        <p>See your progress. Earn badges. Stay motivated with clear milestones.</p>
      </div>
    </div>
  </section>

  <section class="stats">
    <div class="stats-container">
      <div class="stat">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Students</div>
      </div>
      <div class="stat">
        <div class="stat-number">100+</div>
        <div class="stat-label">Courses</div>
      </div>
      <div class="stat">
        <div class="stat-number">1000+</div>
        <div class="stat-label">Tutorials</div>
      </div>
      <div class="stat">
        <div class="stat-number">99%</div>
        <div class="stat-label">Satisfaction</div>
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 Syllab.in. Free learning for every Indian student.</p>
  </footer>

</body>
</html>`,
    practice: {
      title: 'Your Landing Page',
      description: `Build a complete landing page with:
- Sticky navigation bar with logo and links
- Hero section (gradient bg, headline, CTA)
- 6 feature cards in grid layout
- Statistics section with numbers
- Professional footer
- Responsive design (mobile-first)
- Hover effects and transitions
- All semantic HTML (header, nav, section, footer)`,
      startCode: ``,
      hint: 'Use semantic HTML. Grid for features. Sticky positioning for nav. Gradient for hero. Media queries for mobile.',
    },
  },
  {
    id: 'html-local-storage',
    category: 'Intermediate',
    title: 'Local Storage and Session Storage',
    difficulty: 'Intermediate',
    theory: [
      'localStorage stores data persistently in the browser (survives refresh/close).',
      'sessionStorage stores data for one browser session (cleared on close).',
      'Both store key-value pairs as strings; use JSON.stringify() to store objects.',
      'Max storage: typically 5-10MB per domain; same-origin policy applies.',
      'Use localStorage for user preferences, sessionStorage for temporary session data.',
    ],
    code: `<!-- Storing and retrieving data from localStorage -->
<div class="container">
  <h1>Theme Preference Saver</h1>

  <label>
    <input type="radio" name="theme" value="light" id="lightMode"> Light Mode
  </label>
  <label>
    <input type="radio" name="theme" value="dark" id="darkMode"> Dark Mode
  </label>

  <p id="status">Current theme: <strong id="themeDisplay"></strong></p>
  <button onclick="clearStorage()">Clear Saved Data</button>
</div>

<style>
  body.light-theme { background-color: #fff; color: #000; }
  body.dark-theme { background-color: #333; color: #fff; }
  .container { max-width: 500px; margin: 50px auto; padding: 20px; }
  button { padding: 10px 20px; cursor: pointer; }
</style>

<script>
  // Save theme preference to localStorage
  document.getElementById('lightMode').addEventListener('change', function() {
    localStorage.setItem('theme', 'light');
    applyTheme('light');
    console.log('Saved theme:', localStorage.getItem('theme'));
  });

  document.getElementById('darkMode').addEventListener('change', function() {
    localStorage.setItem('theme', 'dark');
    applyTheme('dark');
    console.log('Saved theme:', localStorage.getItem('theme'));
  });

  // Apply theme based on stored preference
  function applyTheme(theme) {
    document.body.className = theme + '-theme';
    document.getElementById('themeDisplay').textContent = theme;
    if (theme === 'light') {
      document.getElementById('lightMode').checked = true;
    } else {
      document.getElementById('darkMode').checked = true;
    }
  }

  // Load saved theme on page load
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }

  // Clear localStorage
  function clearStorage() {
    localStorage.clear();
    console.log('localStorage cleared');
    window.location.reload();
  }

  // Initialize on load
  window.addEventListener('DOMContentLoaded', loadTheme);

  // Example: Store user profile as JSON
  const userProfile = { name: 'Alice', email: 'alice@example.com', age: 25 };
  localStorage.setItem('userProfile', JSON.stringify(userProfile));

  // Retrieve and parse JSON
  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  console.log('User:', savedProfile.name, 'Email:', savedProfile.email);

  // SessionStorage example: temporary form data
  document.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      sessionStorage.setItem(e.target.id, e.target.value);
    }
  });

  // Restore form data on page reload
  document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const element = document.getElementById(key);
      if (element) {
        element.value = sessionStorage.getItem(key);
      }
    }
  });
</script>`,
    output: `<!-- When you load the page with dark mode saved:
- Radio button "Dark Mode" is automatically checked
- Background turns dark, text turns light
- localStorage persists the choice across browser sessions
- sessionStorage stores temporary form input values during the session -->`,
    notes: [
      'Always use JSON.stringify() for objects and JSON.parse() to retrieve them.',
      'Check localStorage.getItem() returns null if key doesn\'t exist.',
      'Use localStorage.removeItem(key) to delete specific items, or .clear() for all.',
      'Private/Incognito mode may not allow localStorage; wrap in try-catch.',
    ],
    practice: {
      title: 'Todo App with localStorage',
      description: `Build a todo app that: (1) Lets users add/remove tasks. (2) Saves tasks to localStorage. (3) Loads tasks on page refresh. (4) Has a "Clear All" button. (5) Display count of completed vs remaining.`,
      startCode: '',
      hint: 'Use localStorage.setItem(\'todos\', JSON.stringify(todoArray)) after each change. On load, JSON.parse(localStorage.getItem(\'todos\')). Update display dynamically.',
    },
    livePreview: true,
  },
];
