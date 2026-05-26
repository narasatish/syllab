import { TutorialTopic } from './types';

export const appDevTopics: TutorialTopic[] = [
  {
    id: 'app-what-is-an-app',
    category: 'App Dev Basics',
    title: 'What is an App?',
    difficulty: 'Beginner',
    theory: [
      'An app (application) is a software program designed to perform specific tasks for users on devices like phones, tablets, or computers.',
      'Apps can be native (built for a specific OS like iOS or Android), web-based (running in a browser), or hybrid (combining both approaches).',
      'Every app has a frontend (what users see and interact with) and often a backend (server logic and databases).',
      'Modern apps are built using programming languages, frameworks, and tools that streamline development and deployment.',
      'Understanding what kind of app you want to build helps you choose the right technology stack from the start.',
    ],
    code: `// Types of Apps
// 1. Native App (iOS/Android) — e.g., built with Swift or Kotlin
// 2. Web App — runs in a browser, built with HTML/CSS/JS
// 3. Hybrid App — uses web tech wrapped in a native shell (e.g., React Native)
// 4. Desktop App — runs on Windows/macOS/Linux (e.g., built with Electron)

// Basic anatomy of an app:
const app = {
  frontend: "What users see — UI, buttons, forms",
  backend: "Server logic, databases, APIs",
  database: "Stores user data persistently",
  api: "Bridge between frontend and backend",
};

console.log("App components:", app);`,
    output: 'App components: { frontend: "What users see — UI, buttons, forms", backend: "Server logic, databases, APIs", database: "Stores user data persistently", api: "Bridge between frontend and backend" }',
    notes: [
      'Web apps are the easiest to get started with — no installation required.',
      'Most beginners start with HTML, CSS, and JavaScript before moving to frameworks.',
    ],
    practice: {
      title: 'Identify App Types',
      description: 'List 3 apps you use daily. For each, identify whether it is a native, web, or hybrid app, and describe one feature it has.',
      startCode: '',
      hint: 'Think about whether the app is installed from an app store (native), opened in a browser (web), or both.',
      solution: `// Example answers:
// 1. YouTube — Hybrid App — Feature: video streaming
// 2. Google Docs — Web App — Feature: real-time collaboration
// 3. Instagram — Native App — Feature: camera filters`,
    },
  },
  {
    id: 'app-ui-ux-basics',
    category: 'App Dev Basics',
    title: 'UI/UX Design Basics',
    difficulty: 'Beginner',
    theory: [
      'UI (User Interface) refers to the visual elements of an app — buttons, colors, fonts, and layout.',
      'UX (User Experience) refers to how a user feels when interacting with an app — ease of use, flow, and satisfaction.',
      'Good UI/UX design makes apps intuitive and enjoyable to use, which keeps users coming back.',
      'Key UX principles include consistency, feedback, simplicity, and accessibility.',
      'Designers often use tools like Figma or Adobe XD to prototype interfaces before coding begins.',
    ],
    code: `// UI/UX Principles in Practice (JavaScript concepts)

const uiPrinciples = {
  consistency: "Use the same colors, fonts, and button styles throughout the app",
  feedback: "Show users what happened after they click — loading spinners, success messages",
  simplicity: "Remove unnecessary elements; every screen has one primary action",
  accessibility: "Ensure all users, including those with disabilities, can use the app",
  hierarchy: "Use size and color to guide the user's eye to what matters most",
};

// Good UX example: a login form
const loginFormUX = {
  label: "Always label your inputs",
  placeholder: "Show example input (e.g., 'Enter your email')",
  errorMessage: "Tell users exactly what went wrong",
  successFeedback: "Redirect or show confirmation after login",
};

console.log(uiPrinciples);`,
    notes: [
      'Always design for mobile first — most users are on phones.',
      'Test your app with real users to find UX problems you might miss as a developer.',
    ],
    practice: {
      title: 'Critique an App',
      description: 'Open any app on your phone or browser. Write down 2 things the UI does well and 2 things that could be improved from a UX perspective.',
      startCode: '',
      hint: 'Focus on clarity, ease of navigation, and whether actions have clear feedback.',
    },
  },
  {
    id: 'app-wireframing',
    category: 'App Dev Basics',
    title: 'Wireframing Your App',
    difficulty: 'Beginner',
    theory: [
      'A wireframe is a simple, low-fidelity sketch of an app\'s layout, showing where elements like buttons, text, and images will be placed.',
      'Wireframes are created before writing any code to plan the structure and flow of your app.',
      'They help developers, designers, and clients agree on the layout without getting distracted by colors or details.',
      'Tools like Figma, Balsamiq, or even paper and pencil are commonly used for wireframing.',
      'A good wireframe includes all key screens and shows how users navigate between them.',
    ],
    code: `// Wireframe described as a data structure (pseudo-wireframe)

const appWireframe = {
  screens: [
    {
      name: "Home Screen",
      elements: ["Logo", "Navigation Bar", "Hero Banner", "Feature Cards", "Footer"],
    },
    {
      name: "Login Screen",
      elements: ["Email Input", "Password Input", "Login Button", "Forgot Password Link"],
    },
    {
      name: "Dashboard",
      elements: ["User Greeting", "Stats Cards", "Recent Activity List", "Settings Icon"],
    },
  ],
  navigation: {
    "Home → Login": "Click 'Sign In' button",
    "Login → Dashboard": "After successful authentication",
    "Dashboard → Home": "Click logo or back button",
  },
};

console.log("App wireframe:", JSON.stringify(appWireframe, null, 2));`,
    notes: [
      'Keep wireframes grayscale — color decisions come later in the design phase.',
      'Focus on layout and user flow, not aesthetics.',
    ],
    practice: {
      title: 'Wireframe a Simple App',
      description: 'Sketch (on paper or digitally) a wireframe for a simple notes app. Include at least 3 screens: Home, New Note, and View Note.',
      startCode: '',
      hint: 'Think about what buttons, inputs, and text areas each screen needs.',
    },
  },
  {
    id: 'app-html-structure',
    category: 'Web App Basics',
    title: 'HTML Structure for Apps',
    difficulty: 'Beginner',
    theory: [
      'HTML (HyperText Markup Language) is the skeleton of every web app, defining content and structure.',
      'Modern web apps use semantic HTML elements like <header>, <nav>, <main>, <section>, and <footer> for better readability and accessibility.',
      'The <div> element is a generic container used to group content for styling or scripting purposes.',
      'Attributes like id and class are used to target elements with CSS and JavaScript.',
      'A well-structured HTML document makes styling and scripting much easier and more maintainable.',
    ],
    syntax: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- Content goes here -->
  </body>
</html>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Web App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f0f4f8; color: #333; }
    header { background: #4f46e5; color: white; padding: 16px 24px; }
    nav a { color: white; margin-right: 16px; text-decoration: none; font-weight: bold; }
    main { padding: 24px; max-width: 800px; margin: auto; }
    section { background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
    footer { text-align: center; padding: 16px; color: #888; font-size: 0.9em; }
  </style>
</head>
<body>
  <header>
    <h1>My Web App</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Welcome!</h2>
      <p>This is the main content area of your app. Add your features here.</p>
    </section>
    <section>
      <h2>Features</h2>
      <ul>
        <li>Fast and responsive</li>
        <li>Easy to customize</li>
        <li>Built with semantic HTML</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 My Web App. All rights reserved.</p>
  </footer>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Always include the viewport meta tag for mobile responsiveness.',
      'Use semantic elements to improve accessibility and SEO.',
    ],
    practice: {
      title: 'Build an App Shell',
      description: 'Create an HTML page for a recipe app. Include a header with the app name and navigation (Home, Recipes, About), a main section with a welcome message, and a footer.',
      startCode: '',
      hint: 'Use <header>, <nav>, <main>, <section>, and <footer> tags.',
    },
  },
  {
    id: 'app-css-styling',
    category: 'Web App Basics',
    title: 'Styling Apps with CSS',
    difficulty: 'Beginner',
    theory: [
      'CSS (Cascading Style Sheets) controls the visual appearance of your app — colors, fonts, spacing, and layout.',
      'Modern CSS uses Flexbox and Grid for creating responsive, well-aligned layouts.',
      'CSS variables (custom properties) allow you to define reusable values like brand colors and spacing scales.',
      'The cascade and specificity rules determine which styles are applied when multiple rules target the same element.',
      'A consistent design system with defined colors, fonts, and spacing makes your app look professional.',
    ],
    syntax: `/* CSS Variable */
:root { --primary: #4f46e5; }

/* Flexbox Layout */
.container { display: flex; gap: 16px; }

/* Grid Layout */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CSS Styling Demo</title>
  <style>
    :root {
      --primary: #4f46e5;
      --secondary: #06b6d4;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #1e293b;
      --radius: 12px;
      --shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); padding: 24px; }
    h1 { color: var(--primary); margin-bottom: 24px; }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 20px;
      box-shadow: var(--shadow);
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-4px); }
    .card h2 { color: var(--secondary); margin-bottom: 8px; }
    .badge {
      display: inline-block;
      background: var(--primary);
      color: white;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.75em;
      margin-top: 10px;
    }
    button {
      margin-top: 24px;
      padding: 12px 24px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      font-size: 1em;
      cursor: pointer;
    }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <h1>App Dashboard</h1>
  <div class="card-grid">
    <div class="card">
      <h2>Users</h2>
      <p>Track your active users and growth.</p>
      <span class="badge">1,240 active</span>
    </div>
    <div class="card">
      <h2>Revenue</h2>
      <p>Monitor sales and subscriptions.</p>
      <span class="badge">$8,400</span>
    </div>
    <div class="card">
      <h2>Tasks</h2>
      <p>Manage your project tasks.</p>
      <span class="badge">12 open</span>
    </div>
  </div>
  <button>View Full Report</button>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Use CSS variables to maintain a consistent design system.',
      'Flexbox is great for 1D layouts; Grid is better for 2D layouts.',
    ],
    practice: {
      title: 'Style a Profile Card',
      description: 'Create a styled profile card using CSS. Include a name, role, short bio, and a "Follow" button. Use at least 3 CSS variables.',
      startCode: '',
      hint: 'Use flexbox to center the card, CSS variables for colors, and a hover effect on the button.',
    },
  },
  {
    id: 'app-js-interactivity',
    category: 'Web App Basics',
    title: 'JavaScript Interactivity',
    difficulty: 'Intermediate',
    theory: [
      'JavaScript makes web apps dynamic by responding to user actions like clicks, input, and scrolling.',
      'The DOM (Document Object Model) is a tree representation of your HTML that JavaScript can read and modify.',
      'Event listeners let you run code when specific user interactions occur.',
      'You can update element content, styles, classes, and attributes dynamically using JavaScript.',
      'Modern JavaScript uses querySelector, addEventListener, and template literals for clean, readable code.',
    ],
    syntax: `// Select an element
const btn = document.querySelector('#myBtn');

// Listen for a click
btn.addEventListener('click', () => {
  document.querySelector('#output').textContent = 'Clicked!';
});`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>JS Interactivity</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f0f4f8; }
    .counter-box {
      background: white; border-radius: 12px; padding: 32px;
      text-align: center; max-width: 320px; margin: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 16px; color: #4f46e5; }
    #count { font-size: 3em; font-weight: bold; color: #1e293b; margin: 16px 0; }
    .btn-group { display: flex; gap: 12px; justify-content: center; }
    button {
      padding: 10px 20px; border: none; border-radius: 8px;
      font-size: 1em; cursor: pointer; transition: opacity 0.2s;
    }
    button:hover { opacity: 0.85; }
    #decBtn { background: #ef4444; color: white; }
    #incBtn { background: #22c55e; color: white; }
    #resetBtn { background: #6b7280; color: white; }
    #message { margin-top: 12px; font-size: 0.9em; color: #64748b; min-height: 20px; }
  </style>
</head>
<body>
  <div class="counter-box">
    <h2>Counter App</h2>
    <div id="count">0</div>
    <div class="btn-group">
      <button id="decBtn">− Decrease</button>
      <button id="incBtn">+ Increase</button>
    </div>
    <button id="resetBtn" style="margin-top:12px; width:100%;">Reset</button>
    <div id="message"></div>
  </div>

  <script>
    let count = 0;
    const countEl = document.querySelector('#count');
    const msgEl = document.querySelector('#message');

    function updateDisplay(msg) {
      countEl.textContent = count;
      msgEl.textContent = msg;
      countEl.style.color = count < 0 ? '#ef4444' : count > 0 ? '#22c55e' : '#1e293b';
    }

    document.querySelector('#incBtn').addEventListener('click', () => {
      count++;
      updateDisplay('Incremented!');
    });

    document.querySelector('#decBtn').addEventListener('click', () => {
      count--;
      updateDisplay('Decremented!');
    });

    document.querySelector('#resetBtn').addEventListener('click', () => {
      count = 0;
      updateDisplay('Reset to zero.');
    });
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Always use addEventListener instead of inline onclick attributes for cleaner code.',
      'Separate your JavaScript logic from DOM manipulation for easier debugging.',
    ],
    practice: {
      title: 'Color Switcher',
      description: 'Build a page with 3 buttons (Red, Green, Blue). When clicked, each button changes the background color of the page.',
      startCode: '',
      hint: 'Use document.body.style.backgroundColor inside each event listener.',
      solution: `<!DOCTYPE html>
<html><head><title>Color Switcher</title></head>
<body>
  <button id="r">Red</button>
  <button id="g">Green</button>
  <button id="b">Blue</button>
  <script>
    document.querySelector('#r').addEventListener('click', () => document.body.style.backgroundColor = 'red');
    document.querySelector('#g').addEventListener('click', () => document.body.style.backgroundColor = 'green');
    document.querySelector('#b').addEventListener('click', () => document.body.style.backgroundColor = 'blue');
  </script>
</body></html>`,
    },
  },
  {
    id: 'app-forms-input',
    category: 'Web App Basics',
    title: 'Forms and User Input',
    difficulty: 'Intermediate',
    theory: [
      'Forms are the primary way users send data to an app — used for login, registration, search, and more.',
      'HTML form elements include <input>, <textarea>, <select>, and <button>, each with specific types and attributes.',
      'Client-side validation using JavaScript checks input before sending it to a server, improving user experience.',
      'The FormData API and event.preventDefault() are used to handle form submissions with JavaScript.',
      'Always validate and sanitize input on the server side too — never trust client-side validation alone.',
    ],
    syntax: `form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page reload
  const value = document.querySelector('#input').value.trim();
  if (!value) return alert('Field is required');
});`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Forms Demo</title>
  <style>
    body { font-family: sans-serif; background: #f0f4f8; padding: 32px; }
    .form-card {
      background: white; max-width: 420px; margin: auto;
      border-radius: 12px; padding: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2 { margin-bottom: 20px; color: #4f46e5; }
    .field { margin-bottom: 16px; }
    label { display: block; font-size: 0.875em; font-weight: 600; margin-bottom: 6px; color: #374151; }
    input, select, textarea {
      width: 100%; padding: 10px 12px; border: 1.5px solid #d1d5db;
      border-radius: 8px; font-size: 1em; outline: none;
      transition: border-color 0.2s;
    }
    input:focus, select:focus, textarea:focus { border-color: #4f46e5; }
    .error { color: #ef4444; font-size: 0.8em; margin-top: 4px; display: none; }
    button {
      width: 100%; padding: 12px; background: #4f46e5; color: white;
      border: none; border-radius: 8px; font-size: 1em; cursor: pointer;
    }
    #result { margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px; display: none; color: #166534; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2>Register</h2>
    <form id="regForm">
      <div class="field">
        <label for="name">Full Name</label>
        <input type="text" id="name" placeholder="Jane Doe" />
        <div class="error" id="nameErr">Name is required.</div>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="jane@example.com" />
        <div class="error" id="emailErr">Valid email is required.</div>
      </div>
      <div class="field">
        <label for="role">Role</label>
        <select id="role">
          <option value="">Select role...</option>
          <option>Developer</option>
          <option>Designer</option>
          <option>Manager</option>
        </select>
        <div class="error" id="roleErr">Please select a role.</div>
      </div>
      <button type="submit">Register</button>
    </form>
    <div id="result"></div>
  </div>

  <script>
    document.querySelector('#regForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const role = document.querySelector('#role').value;
      let valid = true;

      document.querySelectorAll('.error').forEach(el => el.style.display = 'none');

      if (!name) { document.querySelector('#nameErr').style.display = 'block'; valid = false; }
      if (!email || !email.includes('@')) { document.querySelector('#emailErr').style.display = 'block'; valid = false; }
      if (!role) { document.querySelector('#roleErr').style.display = 'block'; valid = false; }

      if (valid) {
        const result = document.querySelector('#result');
        result.style.display = 'block';
        result.textContent = \`Registered: \${name} (\${role}) — \${email}\`;
      }
    });
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Use type="email" and type="number" to get built-in browser validation.',
      'Always call event.preventDefault() to stop the default form submission page reload.',
    ],
    practice: {
      title: 'Contact Form',
      description: 'Build a contact form with Name, Email, and Message fields. Validate that all fields are filled before showing a success message.',
      startCode: '',
      hint: 'Check each field in the submit handler and display individual error messages below each input.',
    },
  },
  {
    id: 'app-localstorage',
    category: 'Data Storage',
    title: 'LocalStorage',
    difficulty: 'Intermediate',
    theory: [
      'LocalStorage is a browser API that lets you store key-value data persistently in the user\'s browser.',
      'Data in LocalStorage survives page refreshes and browser restarts, unlike session data.',
      'LocalStorage can only store strings, so objects must be serialized with JSON.stringify() and parsed with JSON.parse().',
      'It has a storage limit of about 5–10 MB per origin and is not suitable for sensitive data.',
      'Common uses include saving user preferences, draft content, shopping cart items, and app state.',
    ],
    syntax: `// Store data
localStorage.setItem('key', JSON.stringify(value));

// Retrieve data
const value = JSON.parse(localStorage.getItem('key'));

// Remove item
localStorage.removeItem('key');

// Clear all
localStorage.clear();`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>LocalStorage Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f0f4f8; }
    .card { background: white; max-width: 420px; margin: auto; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h2 { color: #4f46e5; margin-bottom: 16px; }
    input { width: 100%; padding: 10px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 1em; margin-bottom: 12px; box-sizing: border-box; }
    .btn-row { display: flex; gap: 8px; }
    button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9em; }
    #saveBtn { background: #4f46e5; color: white; }
    #clearBtn { background: #ef4444; color: white; }
    #output { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 0.9em; color: #374151; min-height: 40px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>LocalStorage Note Saver</h2>
    <input type="text" id="noteInput" placeholder="Type a note to save..." />
    <div class="btn-row">
      <button id="saveBtn">Save Note</button>
      <button id="clearBtn">Clear Saved</button>
    </div>
    <div id="output">No saved note yet.</div>
  </div>

  <script>
    const noteInput = document.querySelector('#noteInput');
    const output = document.querySelector('#output');

    // Load saved note on page load
    const saved = localStorage.getItem('myNote');
    if (saved) output.textContent = 'Saved note: ' + saved;

    document.querySelector('#saveBtn').addEventListener('click', () => {
      const note = noteInput.value.trim();
      if (!note) return;
      localStorage.setItem('myNote', note);
      output.textContent = 'Saved note: ' + note;
      noteInput.value = '';
    });

    document.querySelector('#clearBtn').addEventListener('click', () => {
      localStorage.removeItem('myNote');
      output.textContent = 'Note cleared.';
    });
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Never store passwords or sensitive tokens in LocalStorage — it is accessible via JavaScript and vulnerable to XSS.',
      'Use sessionStorage for data that should only last for the current browser tab session.',
    ],
    practice: {
      title: 'Persistent Theme Switcher',
      description: 'Create a dark/light mode toggle that saves the user\'s preference in LocalStorage. When the page reloads, it should restore their saved preference.',
      startCode: '',
      hint: 'Store the theme as "dark" or "light" using localStorage.setItem, and apply it on page load with localStorage.getItem.',
    },
  },
  {
    id: 'app-responsive-design',
    category: 'Web App Basics',
    title: 'Responsive Design',
    difficulty: 'Intermediate',
    theory: [
      'Responsive design ensures your app looks and works well on all screen sizes — phones, tablets, and desktops.',
      'Media queries in CSS allow you to apply different styles based on the device\'s screen width.',
      'The mobile-first approach means designing for small screens first, then adding complexity for larger screens.',
      'CSS Flexbox and Grid are the main tools for creating flexible, responsive layouts.',
      'The viewport meta tag is required for responsive design to work correctly on mobile devices.',
    ],
    syntax: `/* Mobile first: default styles for small screens */
.container { flex-direction: column; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { flex-direction: row; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: auto; }
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Design</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f0f4f8; }

    /* Header */
    header {
      background: #4f46e5; color: white; padding: 16px 24px;
      display: flex; flex-direction: column; gap: 12px;
    }
    @media (min-width: 768px) {
      header { flex-direction: row; align-items: center; justify-content: space-between; }
    }
    nav { display: flex; gap: 16px; flex-wrap: wrap; }
    nav a { color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 500; }

    /* Card Grid */
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 24px;
      max-width: 1100px;
      margin: auto;
    }
    @media (min-width: 600px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }

    .card {
      background: white; border-radius: 12px; padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .card h3 { color: #4f46e5; margin-bottom: 8px; }
    .card p { color: #64748b; font-size: 0.9em; line-height: 1.5; }
    .tag {
      display: inline-block; margin-top: 10px;
      background: #e0e7ff; color: #4338ca;
      padding: 3px 10px; border-radius: 999px; font-size: 0.75em;
    }

    .info {
      text-align: center; padding: 16px; background: #fef9c3;
      font-size: 0.85em; color: #854d0e;
    }
  </style>
</head>
<body>
  <p class="info">Resize the window to see the responsive grid change!</p>
  <header>
    <h1>AppName</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <div class="grid">
    <div class="card"><h3>Feature One</h3><p>A great feature that helps users accomplish their goals faster.</p><span class="tag">New</span></div>
    <div class="card"><h3>Feature Two</h3><p>Seamlessly integrates with your existing workflow.</p><span class="tag">Popular</span></div>
    <div class="card"><h3>Feature Three</h3><p>Secure and privacy-first by design.</p><span class="tag">Secure</span></div>
    <div class="card"><h3>Feature Four</h3><p>Works offline with Progressive Web App support.</p><span class="tag">PWA</span></div>
    <div class="card"><h3>Feature Five</h3><p>Accessible to all users, including those using screen readers.</p><span class="tag">a11y</span></div>
    <div class="card"><h3>Feature Six</h3><p>Lightning fast with optimized assets and lazy loading.</p><span class="tag">Fast</span></div>
  </div>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Use relative units (%, em, rem) instead of fixed pixels for flexible layouts.',
      'Test your app at 320px (small phone), 768px (tablet), and 1200px (desktop).',
    ],
    practice: {
      title: 'Responsive Navigation',
      description: 'Build a navigation bar that shows links horizontally on desktop but stacks them vertically on mobile (below 600px).',
      startCode: '',
      hint: 'Use a media query with max-width: 600px and set flex-direction: column for the nav.',
    },
  },
  {
    id: 'app-navigation-spa',
    category: 'Web App Basics',
    title: 'Single Page Navigation',
    difficulty: 'Advanced',
    theory: [
      'A Single Page Application (SPA) loads a single HTML page and dynamically updates content as the user navigates.',
      'Instead of loading new pages, SPAs swap content in and out using JavaScript, making transitions instant.',
      'Hash-based routing (#home, #about) or the History API (pushState) are the two main approaches to SPA routing.',
      'Each "page" or "view" in a SPA is a JavaScript function or component that renders HTML into a container element.',
      'SPAs provide an app-like experience in the browser but require JavaScript to function.',
    ],
    syntax: `// Hash-based routing
window.addEventListener('hashchange', () => {
  const page = location.hash.slice(1) || 'home';
  renderPage(page);
});`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SPA Navigation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f0f4f8; }
    nav {
      background: #4f46e5; padding: 0 24px;
      display: flex; gap: 4px; align-items: center;
    }
    nav h1 { color: white; padding: 16px 0; margin-right: 24px; font-size: 1.1em; }
    nav a {
      color: rgba(255,255,255,0.75); text-decoration: none;
      padding: 18px 16px; font-weight: 500; transition: all 0.2s;
    }
    nav a.active, nav a:hover { color: white; background: rgba(255,255,255,0.15); }
    #app { max-width: 700px; margin: 40px auto; padding: 0 24px; }
    .page { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    h2 { color: #4f46e5; margin-bottom: 12px; }
    p { color: #374151; line-height: 1.6; }
    .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  </style>
</head>
<body>
  <nav>
    <h1>MySPA</h1>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <div id="app"></div>

  <script>
    const pages = {
      home: '<div class="card page"><h2>Home</h2><p>Welcome to our Single Page App! Navigation happens instantly without page reloads.</p></div>',
      about: '<div class="card page"><h2>About</h2><p>This SPA uses hash-based routing to switch views dynamically using JavaScript.</p></div>',
      contact: '<div class="card page"><h2>Contact</h2><p>Reach us at hello@example.com. We respond within 24 hours.</p></div>',
    };

    function renderPage() {
      const hash = location.hash.slice(1) || 'home';
      const page = pages[hash] || '<div class="card page"><h2>404</h2><p>Page not found.</p></div>';
      document.querySelector('#app').innerHTML = page;

      document.querySelectorAll('nav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + hash);
      });
    }

    window.addEventListener('hashchange', renderPage);
    renderPage();
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'For production SPAs, consider using the History API with pushState for cleaner URLs without the # symbol.',
      'Frameworks like React, Vue, and Angular have built-in routers (React Router, Vue Router) for SPAs.',
    ],
    practice: {
      title: 'Add a Blog Page',
      description: 'Extend the SPA example by adding a fourth page — "Blog" — with 2–3 fake article titles listed on it.',
      startCode: '',
      hint: 'Add a new entry to the pages object and a new <a href="#blog"> link in the nav.',
    },
  },
  {
    id: 'app-todo-list',
    category: 'Projects',
    title: 'Building a To-Do List App',
    difficulty: 'Intermediate',
    theory: [
      'A to-do list app is a classic beginner project that combines forms, DOM manipulation, and data persistence.',
      'The app needs to create, read, update (complete/incomplete), and delete tasks — this is the CRUD pattern.',
      'Each task is stored as an object in an array, and the array is rendered to the DOM dynamically.',
      'Using LocalStorage ensures tasks persist between sessions without a backend.',
      'This project reinforces event handling, array methods, and template literals in JavaScript.',
    ],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>To-Do App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f0f4f8; padding: 32px 16px; }
    .app { max-width: 480px; margin: auto; }
    h1 { color: #4f46e5; margin-bottom: 20px; text-align: center; }
    .input-row { display: flex; gap: 8px; margin-bottom: 20px; }
    input[type="text"] {
      flex: 1; padding: 12px; border: 1.5px solid #d1d5db;
      border-radius: 8px; font-size: 1em; outline: none;
    }
    input[type="text"]:focus { border-color: #4f46e5; }
    .add-btn {
      padding: 12px 18px; background: #4f46e5; color: white;
      border: none; border-radius: 8px; font-size: 1em; cursor: pointer;
    }
    .todo-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .todo-item {
      display: flex; align-items: center; gap: 12px;
      background: white; padding: 14px 16px; border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    }
    .todo-item.done span { text-decoration: line-through; color: #9ca3af; }
    .todo-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; accent-color: #4f46e5; }
    .todo-item span { flex: 1; font-size: 0.95em; color: #1e293b; }
    .del-btn {
      background: none; border: none; cursor: pointer;
      color: #ef4444; font-size: 1.2em; padding: 4px;
    }
    .empty { text-align: center; color: #9ca3af; margin-top: 24px; }
    .stats { text-align: center; font-size: 0.85em; color: #64748b; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="app">
    <h1>To-Do List</h1>
    <div class="input-row">
      <input type="text" id="taskInput" placeholder="Add a new task..." />
      <button class="add-btn" id="addBtn">Add</button>
    </div>
    <ul class="todo-list" id="todoList"></ul>
    <div class="stats" id="stats"></div>
  </div>

  <script>
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

    function render() {
      const list = document.querySelector('#todoList');
      const stats = document.querySelector('#stats');
      if (tasks.length === 0) {
        list.innerHTML = '<li class="empty">No tasks yet. Add one above!</li>';
        stats.textContent = '';
        return;
      }
      list.innerHTML = tasks.map((t, i) => \`
        <li class="todo-item \${t.done ? 'done' : ''}">
          <input type="checkbox" \${t.done ? 'checked' : ''} onchange="toggle(\${i})" />
          <span>\${t.text}</span>
          <button class="del-btn" onclick="remove(\${i})">✕</button>
        </li>
      \`).join('');
      const done = tasks.filter(t => t.done).length;
      stats.textContent = \`\${done} of \${tasks.length} tasks completed\`;
    }

    function addTask() {
      const input = document.querySelector('#taskInput');
      const text = input.value.trim();
      if (!text) return;
      tasks.unshift({ text, done: false });
      input.value = '';
      save(); render();
    }

    function toggle(i) { tasks[i].done = !tasks[i].done; save(); render(); }
    function remove(i) { tasks.splice(i, 1); save(); render(); }

    document.querySelector('#addBtn').addEventListener('click', addTask);
    document.querySelector('#taskInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addTask();
    });

    render();
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'This project uses the CRUD pattern: Create (add), Read (render), Update (toggle), Delete (remove).',
      'Tasks are stored in LocalStorage so they persist after page refresh.',
    ],
    practice: {
      title: 'Add Task Priority',
      description: 'Extend the to-do app to support priority levels (Low, Medium, High). Add a dropdown next to the input and display the priority as a colored badge on each task.',
      startCode: '',
      hint: 'Add a priority property to each task object and use CSS classes or inline styles for the badge color.',
    },
  },
  {
    id: 'app-weather-api',
    category: 'API Integration',
    title: 'Using APIs (Weather App)',
    difficulty: 'Advanced',
    theory: [
      'An API (Application Programming Interface) allows your app to communicate with external services to get or send data.',
      'The fetch() function in JavaScript is used to make HTTP requests to APIs and returns a Promise.',
      'Most APIs return data in JSON format, which you parse using response.json().',
      'API keys are unique identifiers that authenticate your requests — never expose them in public frontend code.',
      'Error handling with try/catch and loading states are essential for a good user experience when using APIs.',
    ],
    syntax: `async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Weather App (API Demo)</title>
  <style>
    body { font-family: sans-serif; background: linear-gradient(135deg, #667eea, #764ba2); min-height: 100vh; padding: 32px 16px; }
    .app { max-width: 420px; margin: auto; }
    h1 { color: white; text-align: center; margin-bottom: 24px; font-size: 1.6em; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; }
    input {
      flex: 1; padding: 12px 16px; border: none; border-radius: 10px;
      font-size: 1em; background: rgba(255,255,255,0.95);
    }
    button {
      padding: 12px 18px; background: #f59e0b; color: white;
      border: none; border-radius: 10px; font-size: 1em; cursor: pointer; font-weight: bold;
    }
    .card {
      background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
      border-radius: 16px; padding: 28px; color: white; text-align: center;
    }
    .city { font-size: 1.4em; font-weight: bold; margin-bottom: 4px; }
    .temp { font-size: 4em; font-weight: 300; margin: 8px 0; }
    .desc { font-size: 1.1em; opacity: 0.9; text-transform: capitalize; }
    .details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
    .detail { background: rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; }
    .detail-label { font-size: 0.75em; opacity: 0.8; }
    .detail-value { font-size: 1.1em; font-weight: bold; }
    #status { text-align: center; color: rgba(255,255,255,0.8); padding: 16px; }
  </style>
</head>
<body>
  <div class="app">
    <h1>Weather App</h1>
    <div class="search-row">
      <input type="text" id="cityInput" placeholder="Enter city name..." value="London" />
      <button id="searchBtn">Search</button>
    </div>
    <div id="status">Enter a city and press Search.</div>
    <div id="weatherCard" style="display:none"></div>
  </div>

  <script>
    // NOTE: In a real app, use your own API key from openweathermap.org
    // This demo uses a mock response to simulate API behavior.

    async function fetchWeather(city) {
      document.querySelector('#status').textContent = 'Loading...';
      document.querySelector('#weatherCard').style.display = 'none';

      // Simulated API response (replace with real fetch in production)
      await new Promise(r => setTimeout(r, 800)); // simulate network delay

      const mockData = {
        London: { temp: 15, feels: 13, humidity: 78, wind: 5.2, desc: 'overcast clouds', icon: '☁️' },
        Paris: { temp: 18, feels: 17, humidity: 65, wind: 3.5, desc: 'partly cloudy', icon: '⛅' },
        Tokyo: { temp: 24, feels: 26, humidity: 80, wind: 4.1, desc: 'light rain', icon: '🌧️' },
        Sydney: { temp: 22, feels: 21, humidity: 60, wind: 6.0, desc: 'clear sky', icon: '☀️' },
      };

      const key = Object.keys(mockData).find(k => k.toLowerCase() === city.toLowerCase());
      if (!key) throw new Error('City not found');
      return { name: key, ...mockData[key] };
    }

    async function search() {
      const city = document.querySelector('#cityInput').value.trim();
      if (!city) return;
      try {
        const w = await fetchWeather(city);
        document.querySelector('#status').style.display = 'none';
        const card = document.querySelector('#weatherCard');
        card.style.display = 'block';
        card.innerHTML = \`
          <div class="card">
            <div class="city">\${w.icon} \${w.name}</div>
            <div class="temp">\${w.temp}°C</div>
            <div class="desc">\${w.desc}</div>
            <div class="details">
              <div class="detail"><div class="detail-label">Feels Like</div><div class="detail-value">\${w.feels}°C</div></div>
              <div class="detail"><div class="detail-label">Humidity</div><div class="detail-value">\${w.humidity}%</div></div>
              <div class="detail"><div class="detail-label">Wind</div><div class="detail-value">\${w.wind} m/s</div></div>
              <div class="detail"><div class="detail-label">City</div><div class="detail-value">\${w.name}</div></div>
            </div>
          </div>
        \`;
      } catch (err) {
        document.querySelector('#status').textContent = 'City not found. Try London, Paris, Tokyo, or Sydney.';
        document.querySelector('#status').style.display = 'block';
      }
    }

    document.querySelector('#searchBtn').addEventListener('click', search);
    document.querySelector('#cityInput').addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
    search();
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'To use a real weather API, sign up at openweathermap.org and replace the mock function with a real fetch call.',
      'Never expose API keys in frontend code — use a backend proxy or environment variables.',
    ],
    practice: {
      title: 'Add a 5-Day Forecast',
      description: 'Extend the weather app to show a simulated 5-day forecast below the current weather card using mock data.',
      startCode: '',
      hint: 'Create an array of 5 objects with day name, temperature, and condition. Render them in a horizontal row using flexbox.',
    },
  },
  {
    id: 'app-debugging',
    category: 'Tools & Workflow',
    title: 'Debugging with DevTools',
    difficulty: 'Intermediate',
    theory: [
      'Browser DevTools are built-in tools for inspecting, debugging, and profiling web apps — accessed with F12.',
      'The Console panel lets you log values, run JavaScript, and see errors with file and line number references.',
      'The Elements panel shows the live DOM and lets you inspect and edit HTML and CSS in real time.',
      'The Network panel records all HTTP requests, showing status codes, response data, and timing.',
      'Breakpoints in the Sources panel let you pause JavaScript execution and step through code line by line.',
    ],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Debugging Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f0f4f8; }
    .card { background: white; max-width: 500px; margin: auto; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h2 { color: #4f46e5; margin-bottom: 12px; }
    button { padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 6px 4px; }
    #output { margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 0.9em; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Debugging Practice</h2>
    <p style="color:#64748b;margin-bottom:16px">Open DevTools (F12) and watch the Console as you click each button.</p>
    <button onclick="logBasic()">console.log</button>
    <button onclick="logTable()">console.table</button>
    <button onclick="logGroup()">console.group</button>
    <button onclick="triggerError()">Trigger Error</button>
    <button onclick="measureTime()">Measure Time</button>
    <div id="output">Click a button to see output in the Console.</div>
  </div>

  <script>
    const output = document.querySelector('#output');

    function logBasic() {
      const user = { name: 'Alice', age: 28, role: 'Developer' };
      console.log('User object:', user);
      console.warn('This is a warning');
      console.info('This is info');
      output.textContent = 'Check the Console for log, warn, and info messages.';
    }

    function logTable() {
      const users = [
        { name: 'Alice', role: 'Dev' },
        { name: 'Bob', role: 'Designer' },
        { name: 'Carol', role: 'PM' },
      ];
      console.table(users);
      output.textContent = 'Check the Console — data shown as a table!';
    }

    function logGroup() {
      console.group('App Startup');
      console.log('Loading config...');
      console.log('Connecting to DB...');
      console.log('Starting server...');
      console.groupEnd();
      output.textContent = 'Check the Console for grouped log messages.';
    }

    function triggerError() {
      try {
        const obj = null;
        console.log(obj.name); // This will throw
      } catch (err) {
        console.error('Caught error:', err.message);
        output.textContent = 'Error caught: ' + err.message + '\\nCheck Console for full stack trace.';
      }
    }

    function measureTime() {
      console.time('calculation');
      let sum = 0;
      for (let i = 0; i < 1000000; i++) sum += i;
      console.timeEnd('calculation');
      output.textContent = 'Result: ' + sum + '\\nCheck Console for timing.';
    }
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Use console.table() for arrays and objects — much easier to read than console.log.',
      'Right-click an element in the browser and choose "Inspect" to jump straight to it in the Elements panel.',
    ],
    practice: {
      title: 'Debug a Broken Calculator',
      description: 'The following code has 3 bugs. Use console.log statements and DevTools to find and fix them: a function that should add two numbers returns NaN, a button click does nothing, and a result display never updates.',
      startCode: '',
      hint: 'Check if inputs are converted to numbers with Number() or parseInt(). Verify event listener selectors match element IDs. Confirm the output element ID is correct.',
    },
  },
  {
    id: 'app-version-control',
    category: 'Tools & Workflow',
    title: 'Git & GitHub for Apps',
    difficulty: 'Intermediate',
    theory: [
      'Git is a version control system that tracks changes to your code, allowing you to revert mistakes and collaborate with others.',
      'A repository (repo) is a project folder tracked by Git; commits are snapshots of your code at a point in time.',
      'Branches allow you to develop new features without affecting the main codebase.',
      'GitHub is a cloud platform that hosts Git repositories and enables team collaboration via pull requests.',
      'A typical workflow: create a branch, make changes, commit, push to GitHub, open a pull request, merge.',
    ],
    syntax: `# Initialize a repo
git init

# Stage and commit changes
git add .
git commit -m "feat: add login form"

# Create and switch to a new branch
git checkout -b feature/signup

# Push to GitHub
git push origin feature/signup`,
    code: `# === Complete Git Workflow for an App Project ===

# 1. Set up your project
mkdir my-app && cd my-app
git init
echo "# My App" > README.md

# 2. Make your first commit
git add README.md
git commit -m "initial commit"

# 3. Create a feature branch
git checkout -b feature/homepage

# 4. Add files and commit
# (create index.html, styles.css, app.js)
git add .
git commit -m "feat: add homepage HTML, CSS, and JS"

# 5. View your commit history
git log --oneline

# 6. Push to GitHub
git remote add origin https://github.com/yourusername/my-app.git
git push -u origin feature/homepage

# 7. Merge the feature branch into main
git checkout main
git merge feature/homepage

# 8. Useful everyday commands
git status          # See changed files
git diff            # See exact changes
git stash           # Save changes temporarily
git stash pop       # Restore stashed changes
git pull            # Fetch latest changes from remote

# === Commit message best practices ===
# feat:     New feature
# fix:      Bug fix
# style:    Formatting, no logic change
# refactor: Code restructuring
# docs:     Documentation only
# test:     Adding or updating tests`,
    notes: [
      'Commit often with clear messages — small commits are easier to review and revert.',
      'Never commit .env files or API keys — add them to .gitignore.',
    ],
    practice: {
      title: 'Set Up a Repo',
      description: 'Initialize a new Git repository for a simple project. Create an index.html file, make an initial commit, then create a feature branch called "feature/navbar", add a nav element to the HTML, and commit the change.',
      startCode: '',
      hint: 'Use git init, git add, git commit -m, and git checkout -b commands in sequence.',
    },
  },
  {
    id: 'app-auth-basics',
    category: 'Advanced Topics',
    title: 'User Authentication Basics',
    difficulty: 'Advanced',
    theory: [
      'Authentication verifies who a user is; authorization determines what they are allowed to do.',
      'Passwords must always be hashed (not stored as plain text) on the server using algorithms like bcrypt.',
      'JSON Web Tokens (JWT) are commonly used to maintain authenticated sessions — the server issues a token that the client sends with each request.',
      'OAuth 2.0 allows users to log in with existing accounts (Google, GitHub) instead of creating new credentials.',
      'Security best practices include HTTPS, rate limiting login attempts, and short-lived tokens with refresh mechanisms.',
    ],
    syntax: `// JWT-based auth flow (conceptual)
// 1. User submits credentials
// 2. Server verifies and returns JWT
const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });

// 3. Client stores token and sends it with requests
fetch('/api/data', {
  headers: { Authorization: 'Bearer ' + token }
});`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Auth Demo (Client-Side Simulation)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f0f4f8; padding: 32px 16px; }
    .container { max-width: 420px; margin: auto; }
    .card { background: white; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h2 { color: #4f46e5; margin-bottom: 20px; }
    .field { margin-bottom: 16px; }
    label { display: block; font-size: 0.85em; font-weight: 600; color: #374151; margin-bottom: 6px; }
    input { width: 100%; padding: 10px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 1em; }
    button { width: 100%; padding: 12px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-size: 1em; cursor: pointer; margin-top: 4px; }
    #error { color: #ef4444; font-size: 0.85em; margin-top: 12px; display: none; }
    #dashboard { display: none; }
    .user-info { background: #f0fdf4; border-radius: 10px; padding: 16px; margin-bottom: 16px; color: #166534; }
    .logout-btn { background: #ef4444; }
    .token-preview { background: #fef9c3; border-radius: 8px; padding: 10px; font-size: 0.75em; color: #854d0e; word-break: break-all; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div id="loginCard" class="card">
      <h2>Sign In</h2>
      <div class="field">
        <label>Email</label>
        <input type="email" id="email" placeholder="user@example.com" value="user@example.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="password" placeholder="••••••••" value="secret123" />
      </div>
      <button id="loginBtn">Sign In</button>
      <div id="error">Invalid credentials. Try user@example.com / secret123</div>
    </div>

    <div id="dashboard" class="card">
      <h2>Dashboard</h2>
      <div class="user-info" id="userInfo"></div>
      <p style="color:#64748b;font-size:0.9em">You are now authenticated. In a real app, this token would be sent with every API request.</p>
      <div class="token-preview" id="tokenPreview"></div>
      <button class="logout-btn" id="logoutBtn" style="margin-top:16px">Sign Out</button>
    </div>
  </div>

  <script>
    // Simulated user database (in real apps, this lives on the server)
    const USERS = [{ email: 'user@example.com', password: 'secret123', name: 'Alice Developer' }];

    function generateFakeToken(email) {
      // Simulate a JWT-like token (NOT a real JWT)
      const header = btoa('{"alg":"HS256"}');
      const payload = btoa(JSON.stringify({ email, exp: Date.now() + 3600000 }));
      return header + '.' + payload + '.SIGNATURE';
    }

    document.querySelector('#loginBtn').addEventListener('click', () => {
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;
      const user = USERS.find(u => u.email === email && u.password === password);

      if (!user) {
        document.querySelector('#error').style.display = 'block';
        return;
      }

      const token = generateFakeToken(email);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      document.querySelector('#loginCard').style.display = 'none';
      document.querySelector('#dashboard').style.display = 'block';
      document.querySelector('#userInfo').textContent = \`Welcome, \${user.name}! You are signed in as \${user.email}\`;
      document.querySelector('#tokenPreview').textContent = 'Token: ' + token;
    });

    document.querySelector('#logoutBtn').addEventListener('click', () => {
      sessionStorage.clear();
      document.querySelector('#loginCard').style.display = 'block';
      document.querySelector('#dashboard').style.display = 'none';
    });
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'This is a simulation only — never do authentication entirely on the client side in production.',
      'Real auth uses services like Firebase Auth, Auth0, Supabase, or a custom server with hashed passwords.',
    ],
    practice: {
      title: 'Add a Registration Flow',
      description: 'Extend the auth demo to include a registration form. When submitted, add the new user to the USERS array (simulated). Then automatically log them in.',
      startCode: '',
      hint: 'Add a "Register" tab that toggles a registration form, then push the new user to the USERS array and call the login logic.',
    },
  },
  {
    id: 'app-firebase-database',
    category: 'Data Storage',
    title: 'Firebase Firestore Database',
    difficulty: 'Advanced',
    theory: [
      'Firebase Firestore is a cloud-hosted NoSQL database from Google, ideal for real-time web and mobile apps.',
      'Firestore stores data as documents inside collections — similar to JSON objects in folders.',
      'The Firebase SDK allows you to add, read, update, and delete data directly from the frontend with minimal setup.',
      'Real-time listeners (onSnapshot) automatically update your UI when data changes in the database.',
      'Firebase also provides Authentication, Hosting, and Storage, making it a complete backend-as-a-service solution.',
    ],
    syntax: `// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a document
await addDoc(collection(db, "notes"), { text: "Hello", createdAt: new Date() });

// Read documents
const snapshot = await getDocs(collection(db, "notes"));
snapshot.forEach(doc => console.log(doc.id, doc.data()));`,
    code: `// Firebase Firestore — Conceptual Code (requires Firebase project setup)
// Steps to use in a real project:
// 1. Go to console.firebase.google.com
// 2. Create a project and add a Web App
// 3. Copy your firebaseConfig
// 4. Install: npm install firebase

// === firebaseConfig.js ===
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};

// === app.js ===
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, getDocs,
  deleteDoc, doc, onSnapshot, orderBy, query
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCol = collection(db, "notes");

// CREATE — Add a note
async function addNote(text) {
  await addDoc(notesCol, { text, createdAt: new Date() });
}

// READ — Get all notes once
async function getNotes() {
  const q = query(notesCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// REAL-TIME — Listen for changes
function subscribeToNotes(callback) {
  const q = query(notesCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(notes);
  });
}

// DELETE — Remove a note
async function deleteNote(id) {
  await deleteDoc(doc(db, "notes", id));
}

// Usage
const unsubscribe = subscribeToNotes((notes) => {
  console.log("Notes updated:", notes);
  // Update your UI here
});

// Later, stop listening
// unsubscribe();`,
    notes: [
      'Use Firestore Security Rules to control who can read and write data.',
      'onSnapshot is more efficient than polling — it only sends data when something changes.',
    ],
    practice: {
      title: 'Design a Firestore Data Model',
      description: 'Design the Firestore collection and document structure for a simple blog app with users and posts. Each post should have a title, content, author ID, and timestamp.',
      startCode: '',
      hint: 'Think in terms of collections (users, posts) and documents (individual user/post records). Consider what fields each document needs.',
    },
  },
  {
    id: 'app-pwa',
    category: 'Deployment',
    title: 'Progressive Web Apps (PWA)',
    difficulty: 'Advanced',
    theory: [
      'A Progressive Web App (PWA) is a web app that uses modern web APIs to deliver app-like experiences on any device.',
      'PWAs can be installed on a user\'s home screen, work offline, send push notifications, and load instantly.',
      'A Service Worker is a JavaScript file that runs in the background, intercepting network requests and enabling offline caching.',
      'The Web App Manifest is a JSON file that defines how the app looks when installed (name, icon, colors, display mode).',
      'PWAs must be served over HTTPS and meet Lighthouse\'s installability criteria to be installable.',
    ],
    syntax: `// Register a Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}`,
    code: `// === manifest.json ===
{
  "name": "My PWA App",
  "short_name": "MyApp",
  "description": "A Progressive Web App example",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f4f8",
  "theme_color": "#4f46e5",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

// === sw.js (Service Worker) ===
const CACHE_NAME = 'myapp-v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];

// Install: cache key assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// === index.html (register SW) ===
// <link rel="manifest" href="/manifest.json">
// <script>
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js');
//   }
// </script>`,
    notes: [
      'Use Lighthouse in DevTools to audit your PWA and get a step-by-step improvement checklist.',
      'The Cache API can store HTML, CSS, JS, and images for complete offline functionality.',
    ],
    practice: {
      title: 'Create a Manifest File',
      description: 'Write a complete manifest.json for a recipe app called "RecipeBox". Include a name, short_name, theme color (#ff6b35), background color, standalone display mode, and at least two icon entries.',
      startCode: '',
      hint: 'The manifest must be linked in your HTML with <link rel="manifest" href="/manifest.json"> to take effect.',
    },
  },
  {
    id: 'app-performance-optimize',
    category: 'Advanced Topics',
    title: 'App Performance Optimization',
    difficulty: 'Advanced',
    theory: [
      'Performance optimization ensures your app loads fast and runs smoothly, directly impacting user retention.',
      'Key metrics include First Contentful Paint (FCP), Time to Interactive (TTI), and Cumulative Layout Shift (CLS).',
      'Lazy loading defers loading of non-critical resources (images, modules) until they are needed.',
      'Minification and bundling reduce file sizes; compression (gzip/Brotli) reduces transfer sizes.',
      'Debouncing and throttling limit how often expensive functions run in response to frequent events.',
    ],
    syntax: `// Debounce: delay execution until user stops typing
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// Lazy load an image
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" />`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Performance Optimization Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f0f4f8; }
    .card { background: white; max-width: 600px; margin: 0 auto 20px; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    h2 { color: #4f46e5; margin-bottom: 10px; }
    h3 { color: #374151; margin-bottom: 8px; font-size: 1em; }
    input { width: 100%; padding: 10px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 1em; margin-bottom: 8px; box-sizing: border-box; }
    #searchOutput, #scrollOutput { padding: 8px 12px; background: #f8fafc; border-radius: 6px; font-size: 0.85em; color: #374151; min-height: 28px; }
    .perf-tip { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px; border-radius: 0 8px 8px 0; margin-bottom: 12px; font-size: 0.9em; color: #166534; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Performance Optimization</h2>

    <h3>1. Debounced Search Input</h3>
    <p style="font-size:0.85em;color:#64748b;margin-bottom:8px">Without debounce: fires on every keystroke. With debounce: fires 300ms after typing stops.</p>
    <input type="text" id="searchInput" placeholder="Type to search (debounced)..." />
    <div id="searchOutput">Waiting for input...</div>
  </div>

  <div class="card">
    <h3>2. Throttled Scroll Event</h3>
    <p style="font-size:0.85em;color:#64748b;margin-bottom:8px">Scroll events fire hundreds of times per second. Throttling limits to once per 100ms.</p>
    <div id="scrollOutput">Scroll the page to see throttled output.</div>
  </div>

  <div class="card">
    <h3>3. Performance Tips</h3>
    <div class="perf-tip">Use loading="lazy" on images to defer off-screen image loading.</div>
    <div class="perf-tip">Avoid layout thrashing: batch DOM reads before writes.</div>
    <div class="perf-tip">Use requestAnimationFrame for smooth animations instead of setInterval.</div>
    <div class="perf-tip">Minify CSS and JS files in production to reduce file sizes.</div>
    <div class="perf-tip">Use a CDN to serve static assets closer to the user geographically.</div>
  </div>

  <script>
    // Debounce implementation
    function debounce(fn, delay) {
      let timer;
      return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
    }

    // Throttle implementation
    function throttle(fn, limit) {
      let last = 0;
      return (...args) => {
        const now = Date.now();
        if (now - last >= limit) { last = now; fn(...args); }
      };
    }

    // Debounced search
    const searchOutput = document.querySelector('#searchOutput');
    let searchCount = 0;
    const handleSearch = debounce((value) => {
      searchCount++;
      searchOutput.textContent = \`Search #\${searchCount}: "\${value}" — fired after 300ms idle\`;
    }, 300);
    document.querySelector('#searchInput').addEventListener('input', (e) => handleSearch(e.target.value));

    // Throttled scroll
    const scrollOutput = document.querySelector('#scrollOutput');
    let scrollCount = 0;
    const handleScroll = throttle(() => {
      scrollCount++;
      scrollOutput.textContent = \`Scroll event #\${scrollCount} at Y: \${Math.round(window.scrollY)}px\`;
    }, 100);
    window.addEventListener('scroll', handleScroll);
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Run Lighthouse in Chrome DevTools to get a performance score and specific improvement recommendations.',
      'Use the Performance tab in DevTools to record and analyze slow operations.',
    ],
    practice: {
      title: 'Implement Lazy Loading',
      description: 'Create an HTML page with 10 images. Use the loading="lazy" attribute and the Intersection Observer API to add a "visible" class to each image as it enters the viewport.',
      startCode: '',
      hint: 'Create an IntersectionObserver that adds a CSS class when entries[0].isIntersecting is true.',
    },
  },
  {
    id: 'app-accessibility',
    category: 'Advanced Topics',
    title: 'Accessibility (a11y)',
    difficulty: 'Intermediate',
    theory: [
      'Web accessibility (a11y) ensures people with disabilities can use your app effectively using assistive technologies.',
      'The WCAG (Web Content Accessibility Guidelines) define standards across four principles: Perceivable, Operable, Understandable, and Robust.',
      'Semantic HTML (using <button> instead of <div onclick>, <label> for inputs) provides accessibility for free.',
      'ARIA (Accessible Rich Internet Applications) attributes like aria-label, aria-hidden, and role enhance accessibility for complex UI patterns.',
      'Keyboard navigation (Tab, Enter, Space, arrow keys) must work fully without a mouse for all interactive elements.',
    ],
    syntax: `<!-- Bad: no semantics or label -->
<div onclick="submit()">Submit</div>

<!-- Good: semantic, labeled, keyboard accessible -->
<button type="submit" aria-label="Submit form">Submit</button>
<label for="email">Email address</label>
<input type="email" id="email" required aria-describedby="emailHelp" />
<span id="emailHelp">We'll never share your email.</span>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Accessibility Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f0f4f8; }
    .card { background: white; max-width: 540px; margin: auto; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h1 { color: #4f46e5; margin-bottom: 20px; }
    .field { margin-bottom: 20px; }
    label { display: block; font-weight: 600; margin-bottom: 6px; color: #374151; }
    input, select {
      width: 100%; padding: 10px 12px; border: 2px solid #d1d5db;
      border-radius: 8px; font-size: 1em;
    }
    input:focus, select:focus, button:focus {
      outline: 3px solid #4f46e5; outline-offset: 2px;
    }
    .hint { font-size: 0.8em; color: #6b7280; margin-top: 4px; }
    .error { color: #dc2626; font-size: 0.85em; margin-top: 4px; display: none; }
    button {
      padding: 12px 24px; background: #4f46e5; color: white;
      border: none; border-radius: 8px; font-size: 1em; cursor: pointer;
    }
    .skip-link {
      position: absolute; top: -100px; left: 8px; padding: 8px 16px;
      background: #4f46e5; color: white; border-radius: 4px; text-decoration: none;
    }
    .skip-link:focus { top: 8px; }
    .a11y-tip { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-top: 16px; font-size: 0.85em; color: #1e40af; }
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <div class="card">
    <main id="main">
      <h1>Accessible Form Demo</h1>
      <form aria-label="Contact form" novalidate>
        <div class="field">
          <label for="fullName">Full Name <span aria-hidden="true">*</span></label>
          <input type="text" id="fullName" name="fullName" required
            aria-required="true" aria-describedby="nameHelp nameError"
            autocomplete="name" />
          <div class="hint" id="nameHelp">Enter your first and last name.</div>
          <div class="error" id="nameError" role="alert" aria-live="polite">Name is required.</div>
        </div>

        <div class="field">
          <label for="userEmail">Email Address <span aria-hidden="true">*</span></label>
          <input type="email" id="userEmail" name="email" required
            aria-required="true" aria-describedby="emailHelp emailError"
            autocomplete="email" />
          <div class="hint" id="emailHelp">We'll never share your email.</div>
          <div class="error" id="emailError" role="alert" aria-live="polite">Valid email required.</div>
        </div>

        <div class="field">
          <label for="topic">Topic</label>
          <select id="topic" name="topic" aria-label="Select a topic">
            <option value="">Choose a topic...</option>
            <option>General Inquiry</option>
            <option>Technical Support</option>
            <option>Feedback</option>
          </select>
        </div>

        <button type="submit">Send Message</button>
      </form>

      <div class="a11y-tip" role="note">
        <strong>a11y features here:</strong> Skip link, semantic labels, aria-describedby hints, aria-live error alerts, visible focus outlines, autocomplete attributes, and role="alert" for dynamic errors.
      </div>
    </main>
  </div>

  <script>
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#fullName');
      const email = document.querySelector('#userEmail');
      let valid = true;

      if (!name.value.trim()) {
        document.querySelector('#nameError').style.display = 'block';
        name.setAttribute('aria-invalid', 'true');
        name.focus();
        valid = false;
      } else {
        document.querySelector('#nameError').style.display = 'none';
        name.removeAttribute('aria-invalid');
      }

      if (!email.value.includes('@')) {
        document.querySelector('#emailError').style.display = 'block';
        email.setAttribute('aria-invalid', 'true');
        if (valid) email.focus();
        valid = false;
      } else {
        document.querySelector('#emailError').style.display = 'none';
        email.removeAttribute('aria-invalid');
      }
    });
  </script>
</body>
</html>`,
    livePreview: true,
    notes: [
      'Test keyboard navigation by using Tab, Shift+Tab, Enter, and Space only — no mouse.',
      'Run the axe DevTools browser extension to automatically find accessibility issues.',
    ],
    practice: {
      title: 'Make a Modal Accessible',
      description: 'Create a button that opens a modal dialog. Ensure the modal traps keyboard focus inside it, has an aria-modal="true" attribute, and closes when Escape is pressed.',
      startCode: '',
      hint: 'Listen for keydown events, check if e.key === "Escape", and use tabIndex and focus() to trap focus.',
    },
  },
  {
    id: 'app-testing-basics',
    category: 'Tools & Workflow',
    title: 'Testing Your App',
    difficulty: 'Advanced',
    theory: [
      'Testing verifies that your app behaves correctly, catches bugs early, and prevents regressions when code changes.',
      'Unit tests check individual functions in isolation; integration tests check how components work together; end-to-end (E2E) tests simulate real user interactions.',
      'Jest is a popular JavaScript testing framework with built-in assertions, mocking, and coverage reporting.',
      'Test-Driven Development (TDD) means writing tests before writing the code they test.',
      'Automated testing is essential for maintaining code quality in teams and CI/CD pipelines.',
    ],
    syntax: `// Jest unit test example
import { add, formatDate } from './utils';

test('add returns correct sum', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

test('formatDate formats correctly', () => {
  expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
});`,
    code: `// === utils.js — Functions to test ===
function add(a, b) { return a + b; }

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function filterByRole(users, role) {
  return users.filter(u => u.role === role);
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

module.exports = { add, capitalize, filterByRole, calculateTotal };

// === utils.test.js — Jest Tests ===
const { add, capitalize, filterByRole, calculateTotal } = require('./utils');

describe('add()', () => {
  test('adds positive numbers', () => expect(add(2, 3)).toBe(5));
  test('handles negatives', () => expect(add(-1, 1)).toBe(0));
  test('handles floats', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
});

describe('capitalize()', () => {
  test('capitalizes first letter', () => expect(capitalize('hello')).toBe('Hello'));
  test('lowercases rest', () => expect(capitalize('WORLD')).toBe('World'));
  test('handles empty string', () => expect(capitalize('')).toBe(''));
});

describe('filterByRole()', () => {
  const users = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' },
    { name: 'Carol', role: 'admin' },
  ];
  test('filters by role', () => expect(filterByRole(users, 'admin')).toHaveLength(2));
  test('returns empty for no matches', () => expect(filterByRole(users, 'guest')).toEqual([]));
});

describe('calculateTotal()', () => {
  test('calculates correct total', () => {
    const cart = [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }];
    expect(calculateTotal(cart)).toBe(35);
  });
  test('returns 0 for empty cart', () => expect(calculateTotal([])).toBe(0));
});

// Run with: npx jest utils.test.js`,
    notes: [
      'Aim for 80%+ test coverage on critical business logic.',
      'Use describe() to group related tests and test() or it() for individual cases.',
    ],
    practice: {
      title: 'Write Tests for a Validator',
      description: 'Write Jest tests for a validateEmail(email) function that returns true for valid emails and false for invalid ones. Test at least 4 cases.',
      startCode: '',
      hint: 'Test cases: "user@example.com" (valid), "notanemail" (invalid), "" (invalid), "a@b.co" (valid).',
    },
  },
  {
    id: 'app-publishing',
    category: 'Deployment',
    title: 'Publishing Your App (Vercel/Netlify)',
    difficulty: 'Intermediate',
    theory: [
      'Deploying your app means putting it on the internet so anyone can access it via a URL.',
      'Vercel and Netlify are platforms that make deploying web apps extremely simple — often with a single command or git push.',
      'Both platforms offer free tiers, automatic HTTPS, global CDN distribution, and CI/CD from GitHub.',
      'A custom domain can be added through the platform\'s dashboard by updating DNS records with your domain registrar.',
      'Environment variables (API keys, config) should be set in the platform\'s dashboard, not committed to your repo.',
    ],
    syntax: `# Deploy with Vercel CLI
npm install -g vercel
vercel login
vercel          # Deploy (follow prompts)
vercel --prod   # Deploy to production

# Deploy with Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --dir=.  # Preview deploy
netlify deploy --prod   # Production deploy`,
    code: `# === Complete Deployment Workflow ===

# --- Method 1: Vercel via CLI ---
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Navigate to your project folder
cd my-app

# 4. Deploy (first time — answers prompts)
vercel

# 5. Deploy to production
vercel --prod

# --- Method 2: Netlify via CLI ---
npm install -g netlify-cli
netlify login
netlify deploy --dir=dist   # Preview deployment
netlify deploy --dir=dist --prod   # Production

# --- Method 3: GitHub + Auto Deploy (recommended) ---
# 1. Push your code to GitHub
git push origin main

# 2. Go to vercel.com or netlify.com
# 3. Click "New Project" / "Add New Site"
# 4. Connect your GitHub repo
# 5. Set build command (e.g., npm run build)
# 6. Set output directory (e.g., dist or build)
# 7. Click Deploy

# After that, every git push auto-deploys!

# --- Environment Variables ---
# In Vercel dashboard: Settings > Environment Variables
# In Netlify: Site settings > Build & deploy > Environment

# Never do this:
# const API_KEY = "sk-abc123"; // committed to git ❌

# Do this instead:
const API_KEY = process.env.API_KEY; // from platform env vars ✅

# --- Custom Domain ---
# 1. Buy a domain (Namecheap, GoDaddy, etc.)
# 2. In Vercel/Netlify: Domains > Add Domain
# 3. Update your DNS records with provided values
# 4. Wait up to 48 hours for propagation`,
    notes: [
      'Vercel is optimized for Next.js and frontend frameworks; Netlify also supports serverless functions.',
      'Use Preview Deployments to test changes before they go live — each PR gets its own URL.',
    ],
    practice: {
      title: 'Deploy a Static App',
      description: 'Create a simple HTML/CSS/JS app locally, push it to a GitHub repository, then connect the repo to Vercel or Netlify for automatic deployment.',
      startCode: '',
      hint: 'Start with a single index.html file. After linking to Vercel/Netlify, every push to main will trigger a new deployment.',
    },
  },
  {
    id: 'app-react-intro',
    category: 'Frameworks',
    title: 'Introduction to React',
    difficulty: 'Advanced',
    theory: [
      'React is a JavaScript library for building user interfaces using a component-based architecture.',
      'React uses a virtual DOM to efficiently update only the parts of the real DOM that have changed.',
      'JSX (JavaScript XML) is React\'s syntax extension that allows you to write HTML-like code inside JavaScript.',
      'React apps are built by composing small, reusable components that manage their own state and props.',
      'Create React App and Vite are the most common tools for bootstrapping a new React project.',
    ],
    syntax: `// JSX — looks like HTML but is JavaScript
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Render to the DOM
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Greeting name="World" />);`,
    code: `// === Setting up React with Vite ===
// Run these commands in your terminal:
// npm create vite@latest my-react-app -- --template react
// cd my-react-app
// npm install
// npm run dev

// === src/App.jsx ===
import { useState } from 'react';

// A simple functional component
function Greeting({ name, role }) {
  return (
    <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '8px', marginBottom: '12px' }}>
      <h2 style={{ color: '#4f46e5' }}>Hello, {name}!</h2>
      <p>Role: <strong>{role}</strong></p>
    </div>
  );
}

// A component with state
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ fontSize: '2em' }}>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '8px' }}>Decrement</button>
    </div>
  );
}

// Main App component
export default function App() {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
  ];

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#4f46e5', marginBottom: '24px' }}>React Intro</h1>

      {/* Render a list of components */}
      {users.map(user => (
        <Greeting key={user.id} name={user.name} role={user.role} />
      ))}

      <Counter />
    </div>
  );
}`,
    notes: [
      'Always add a unique key prop when rendering lists of elements.',
      'Components should be pure — given the same props, they should always render the same output.',
    ],
    practice: {
      title: 'Build a Profile Card Component',
      description: 'Create a React component called ProfileCard that accepts name, job, and bio as props. Render 3 ProfileCard components in your App with different data.',
      startCode: '',
      hint: 'Define the ProfileCard function, use destructured props, and render <ProfileCard name="Alice" job="Dev" bio="..." /> three times in App.',
    },
  },
  {
    id: 'app-react-components',
    category: 'Frameworks',
    title: 'React Components & Props',
    difficulty: 'Advanced',
    theory: [
      'Components are the building blocks of a React app — each is a reusable, self-contained piece of UI.',
      'Props (properties) are how parent components pass data down to child components.',
      'Props are read-only — a component must never modify the props it receives.',
      'Destructuring props in the function signature makes components cleaner and easier to read.',
      'The children prop allows components to accept and render nested JSX content.',
    ],
    syntax: `// Parent passes props
<Button color="blue" size="large" onClick={handleClick}>Click Me</Button>

// Child receives them
function Button({ color, size, onClick, children }) {
  return (
    <button style={{ background: color }} className={\`btn-\${size}\`} onClick={onClick}>
      {children}
    </button>
  );
}`,
    code: `// === React Component Composition Example ===

// Icon component
function Icon({ emoji, label }) {
  return <span role="img" aria-label={label}>{emoji}</span>;
}

// Badge component
function Badge({ label, color = '#4f46e5' }) {
  return (
    <span style={{
      background: color, color: 'white',
      padding: '2px 10px', borderRadius: '999px',
      fontSize: '0.75em', fontWeight: 'bold',
    }}>
      {label}
    </span>
  );
}

// Card component using children prop
function Card({ title, children }) {
  return (
    <div style={{
      background: 'white', borderRadius: '12px',
      padding: '20px', marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <h3 style={{ color: '#4f46e5', marginBottom: '12px' }}>{title}</h3>
      {children}
    </div>
  );
}

// FeatureItem component
function FeatureItem({ icon, label, description, badge }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
      <Icon emoji={icon} label={label} />
      <div>
        <strong>{label}</strong>
        {badge && <Badge label={badge} color="#22c55e" style={{ marginLeft: '8px' }} />}
        <p style={{ color: '#64748b', fontSize: '0.9em', margin: '4px 0 0' }}>{description}</p>
      </div>
    </div>
  );
}

// App
export default function App() {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      <h1 style={{ color: '#1e293b' }}>React Components & Props</h1>

      <Card title="App Features">
        <FeatureItem icon="⚡" label="Fast" description="Optimized for speed." badge="Popular" />
        <FeatureItem icon="🔒" label="Secure" description="Built with security in mind." />
        <FeatureItem icon="📱" label="Responsive" description="Works on all screen sizes." badge="New" />
      </Card>

      <Card title="Component Nesting">
        <p style={{ color: '#374151' }}>
          This is the <strong>children</strong> prop in action — the Card component renders whatever you nest inside it.
        </p>
        <Badge label="Composable" />
      </Card>
    </div>
  );
}`,
    notes: [
      'Keep components small and focused on a single responsibility.',
      'Use defaultProps or default parameter values to provide fallback values for optional props.',
    ],
    practice: {
      title: 'Build a Pricing Card',
      description: 'Create a PricingCard component that accepts plan (string), price (number), features (array of strings), and highlighted (boolean) as props. Render 3 plans: Free, Pro, Enterprise.',
      startCode: '',
      hint: 'Map over the features array to render list items. Use highlighted prop to apply a different background or border style.',
    },
  },
  {
    id: 'app-react-state',
    category: 'Frameworks',
    title: 'React State & Hooks',
    difficulty: 'Advanced',
    theory: [
      'State is data that changes over time within a component, triggering a re-render when updated.',
      'The useState hook returns a state value and a setter function: const [value, setValue] = useState(initial).',
      'The useEffect hook runs side effects (data fetching, subscriptions) after render, with an optional dependency array.',
      'Rules of Hooks: only call hooks at the top level, never inside loops or conditions, and only in React functions.',
      'Lifting state up means moving shared state to the closest common ancestor so multiple child components can access it.',
    ],
    syntax: `// useState
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // functional update

// useEffect
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // runs when count changes

// useEffect cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // cleanup on unmount
}, []);`,
    code: `// === React State & Hooks — Interactive Demo ===
import { useState, useEffect } from 'react';

// Child component — receives state via props
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 16px', background: 'white', borderRadius: '8px',
      marginBottom: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      opacity: task.done ? 0.6 : 1,
    }}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)}
        style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }} />
      <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none', color: '#1e293b' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}
        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.1em' }}>
        ✕
      </button>
    </div>
  );
}

// Main App — owns the state
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React hooks', done: true },
    { id: 2, text: 'Build a project', done: false },
    { id: 3, text: 'Deploy to Vercel', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // useEffect: update document title when tasks change
  useEffect(() => {
    const pending = tasks.filter(t => !t.done).length;
    document.title = pending > 0 ? \`(\${pending}) Tasks\` : 'All done!';
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const filtered = tasks.filter(t =>
    filter === 'active' ? !t.done : filter === 'done' ? t.done : true
  );

  const btnStyle = (f) => ({
    padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer',
    background: filter === f ? '#4f46e5' : '#e2e8f0',
    color: filter === f ? 'white' : '#374151', fontWeight: '500',
  });

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      <h1 style={{ color: '#4f46e5' }}>Task Manager</h1>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Pending: <strong>{tasks.filter(t => !t.done).length}</strong> / {tasks.length}
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..." style={{
            flex: 1, padding: '10px 12px', border: '1.5px solid #d1d5db',
            borderRadius: '8px', fontSize: '1em',
          }} />
        <button onClick={addTask} style={{
          padding: '10px 16px', background: '#4f46e5', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
        }}>Add</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button style={btnStyle('all')} onClick={() => setFilter('all')}>All</button>
        <button style={btnStyle('active')} onClick={() => setFilter('active')}>Active</button>
        <button style={btnStyle('done')} onClick={() => setFilter('done')}>Done</button>
      </div>

      {filtered.map(task => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </div>
  );
}`,
    notes: [
      'Never mutate state directly — always create a new array or object with the updated value.',
      'The dependency array in useEffect controls when the effect runs — an empty [] means run once on mount.',
    ],
    practice: {
      title: 'Add a useEffect Timer',
      description: 'Add a live timer to the task app that shows how many seconds since the page loaded. Use useEffect with setInterval and clean up the interval properly.',
      startCode: '',
      hint: 'Use useState for seconds, useEffect with setInterval to increment it, and return a cleanup function that calls clearInterval.',
    },
  },
  {
    id: 'app-final-project',
    category: 'Projects',
    title: 'Final Project: Build Your Own App',
    difficulty: 'Advanced',
    theory: [
      'The final project brings together everything you have learned — HTML, CSS, JavaScript, APIs, and optionally React.',
      'Start by defining your app\'s purpose, target users, and core features before writing any code.',
      'Break the project into milestones: wireframe, UI build, functionality, data persistence, and deployment.',
      'Use version control (Git) throughout and deploy your app so others can use it.',
      'Real projects always encounter unexpected challenges — persistence and iteration are what turn ideas into working apps.',
    ],
    code: `// === Final Project Planning Template ===

const myProject = {
  // 1. DEFINE YOUR APP
  name: "MyApp",
  description: "A one-sentence description of what your app does and who it helps",
  targetUsers: "Who will use this? Students, developers, travelers, etc.",

  // 2. CORE FEATURES (choose 3-5 for your MVP)
  features: [
    "Feature 1: [describe it]",
    "Feature 2: [describe it]",
    "Feature 3: [describe it]",
  ],

  // 3. TECH STACK
  techStack: {
    frontend: "HTML + CSS + JavaScript (or React)",
    storage: "LocalStorage (or Firebase for real-time/multi-user)",
    deployment: "Vercel or Netlify",
    apis: "Any external APIs you'll use",
  },

  // 4. MILESTONES
  milestones: [
    { week: 1, goal: "Wireframe all screens, set up Git repo, create HTML shell" },
    { week: 2, goal: "Build and style all UI components (no JS logic yet)" },
    { week: 3, goal: "Add interactivity, forms, and core JavaScript logic" },
    { week: 4, goal: "Add data persistence (LocalStorage or Firebase)" },
    { week: 5, goal: "Polish UI, fix bugs, add loading/error states" },
    { week: 6, goal: "Deploy to Vercel/Netlify, test on mobile, share with users" },
  ],

  // 5. CHECKLIST BEFORE LAUNCH
  launchChecklist: [
    "App works on mobile (375px) and desktop (1200px)",
    "All forms have validation and error messages",
    "No console errors in production",
    "Loading states shown during API calls",
    "Accessibility: keyboard navigation works, labels on inputs",
    "HTTPS enabled (automatic on Vercel/Netlify)",
    "API keys are in environment variables, not in code",
    "README written with setup instructions",
  ],
};

// === Suggested Project Ideas ===
const projectIdeas = [
  { name: "Habit Tracker", features: ["Add habits", "Daily check-in", "Streak counter", "LocalStorage"] },
  { name: "Budget Tracker", features: ["Add income/expenses", "Category filters", "Monthly summary chart"] },
  { name: "Flashcard App", features: ["Create decks", "Quiz mode", "Score tracking", "LocalStorage"] },
  { name: "Recipe Book", features: ["Add recipes", "Search by ingredient", "Favorites list"] },
  { name: "Movie Watchlist", features: ["Search TMDB API", "Save to watchlist", "Mark as watched"] },
  { name: "Pomodoro Timer", features: ["25-min work / 5-min break", "Session counter", "Custom durations"] },
];

console.log("Choose a project and start building!");
console.log("Remember: a finished simple app beats an unfinished complex app.");`,
    notes: [
      'Start with a Minimum Viable Product (MVP) — the simplest version that delivers core value.',
      'Share your app with real users as early as possible to get feedback and stay motivated.',
    ],
    practice: {
      title: 'Plan and Build Your App',
      description: 'Choose one of the project ideas (or create your own), fill out the planning template above, and build a working MVP. Deploy it and share the live URL.',
      startCode: '',
      hint: 'Pick the simplest idea that excites you. Start with the HTML structure, then add CSS, then JavaScript. Commit to Git after each milestone.',
      solution: `// There's no single solution here — your app is your solution!
// Key steps:
// 1. git init && create index.html
// 2. Build the UI with HTML/CSS
// 3. Add JavaScript for interactivity
// 4. Persist data with LocalStorage or Firebase
// 5. Deploy to Vercel: vercel --prod
// 6. Share your live URL!`,
    },
  },
];
