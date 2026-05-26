import type { TutorialTopic } from './types';

export const javascriptTopics: TutorialTopic[] = [
  {
    id: 'js-intro',
    category: 'Getting Started',
    title: 'Introduction to JavaScript',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `JavaScript (JS) is the only programming language that runs natively in every web browser. It makes websites interactive — animations, form validation, live updates, games, and much more. Together with HTML and CSS, it forms the complete front-end trinity.`,
      `JavaScript can also run on the server side (Node.js), in mobile apps (React Native), and in desktop apps (Electron). Learning JS opens doors to full-stack development.`,
      `JS is dynamically typed, has first-class functions, and supports multiple programming paradigms (procedural, OOP, functional). Modern JS (ES6+) added classes, arrow functions, promises, and much more.`,
    ],
    syntax: `// In HTML file (inside <script> tag):
<script>
  console.log("Hello!");   // browser console
  alert("Popup!");          // browser alert
</script>

// Or in external file: <script src="app.js"></script>`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript Introduction</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    #output { background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px; font-family: monospace; }
    button { padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 5px; font-size: 14px; }
    button:hover { background: #059669; }
  </style>
</head>
<body>
  <h1>JavaScript in Action! ⚡</h1>
  <p>JavaScript runs in the browser and can change the page dynamically.</p>

  <button onclick="greet()">👋 Greet Me</button>
  <button onclick="showTime()">🕐 Show Time</button>
  <button onclick="changeColor()">🎨 Change Color</button>
  <button onclick="countDown()">⏱ Countdown</button>

  <div id="output">Click a button to see JavaScript in action!</div>

  <script>
    // Function 1: Greeting
    function greet() {
      const name = prompt("What's your name?");
      if (name) {
        document.getElementById("output").innerHTML =
          "Hello, <strong>" + name + "</strong>! Welcome to JavaScript 🎉";
      }
    }

    // Function 2: Show current time
    function showTime() {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      document.getElementById("output").textContent =
        "Current Date: " + date + "\\nCurrent Time: " + time;
    }

    // Function 3: Change background color
    const colors = ["#ecfdf5", "#eff6ff", "#fef9ec", "#fdf2f8", "#f0fdf4"];
    let colorIndex = 0;
    function changeColor() {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex];
      document.getElementById("output").textContent =
        "Background changed to: " + colors[colorIndex];
    }

    // Function 4: Simple countdown
    function countDown() {
      let count = 5;
      const output = document.getElementById("output");
      output.textContent = count;
      const timer = setInterval(() => {
        count--;
        if (count === 0) {
          output.textContent = "🚀 Go!";
          clearInterval(timer);
        } else {
          output.textContent = count;
        }
      }, 1000);
    }
  </script>
</body>
</html>`,
    notes: [
      `console.log() prints to the browser developer console (F12 → Console). Use it to debug.`,
      `JavaScript is case-sensitive: getElementById and getelementbyid are different (second won't work).`,
      `Place <script> tags just before </body> so HTML loads first, then JS runs.`,
    ],
    practice: {
      title: 'Interactive Button',
      description: `Create an HTML page with a button that, when clicked, asks for the user's name (using prompt), then displays a personalised welcome message on the page. Add a second button that changes the page's heading color to a random color each time it's clicked.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Interactive Page</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; text-align: center; }
    button { padding: 12px 24px; margin: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
    #message { margin-top: 20px; font-size: 18px; color: #374151; }
  </style>
</head>
<body>
  <h1 id="heading">Welcome!</h1>
  <button onclick="askName()">👋 Enter Name</button>
  <button onclick="randomColor()">🎨 Random Color</button>
  <div id="message"></div>

  <script>
    function askName() {
      const name = prompt("What is your name?");
      if (name) {
        document.getElementById("message").textContent = "Hello, " + name + "! 🎉";
      }
    }

    function randomColor() {
      // Generate a random hex color
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
      document.getElementById("heading").style.color = color;
    }
  </script>
</body>
</html>`,
      hint: `Math.random() gives a number between 0 and 1. Multiply by 16777215 (max hex color value) for random colors.`,
    },
  },

  {
    id: 'js-variables',
    category: 'Getting Started',
    title: 'Variables: var, let & const',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `JavaScript has 3 ways to declare variables: var (old, function-scoped, avoid), let (modern, block-scoped, can be reassigned), and const (modern, block-scoped, cannot be reassigned). Always prefer const, then let.`,
      `JavaScript data types: String, Number, Boolean, null, undefined, Object, Array, Function. Use typeof to check a variable's type.`,
      `Template literals (backticks \`\`) let you embed expressions: \`Hello \${name}\`. This replaces old string concatenation (+) and is much more readable.`,
    ],
    syntax: `const name = "Arjun";    // can't change
let age = 17;           // can change
var old = "avoid this"; // old style

typeof age   // → "number"
\`Hi \${name}\`  // template literal`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Variables</title>
  <style>
    body { font-family: monospace; max-width: 600px; margin: 30px auto; padding: 20px; }
    .output { background: #1e293b; color: #10b981; padding: 16px; border-radius: 8px; white-space: pre; }
  </style>
</head>
<body>
  <h1>JS Variables & Data Types</h1>
  <div id="out" class="output"></div>

  <script>
    let output = "";
    function log(text) {
      output += text + "\\n";
      document.getElementById("out").textContent = output;
    }

    // const — cannot be reassigned
    const PI = 3.14159;
    const schoolName = "Delhi Public School";
    log("PI = " + PI);
    log("School: " + schoolName);

    // let — can be reassigned
    let score = 0;
    score = 95;
    score += 5;  // now 100
    log("Score: " + score);

    // Data types
    const num = 42;          // Number
    const decimal = 3.14;    // Number (JS has ONE number type)
    const text = "Hello";    // String
    const isActive = true;   // Boolean
    const nothing = null;    // null (intentionally empty)
    let undef;               // undefined (not assigned yet)

    log("\\n--- typeof checks ---");
    log("typeof num: " + typeof num);
    log("typeof text: " + typeof text);
    log("typeof isActive: " + typeof isActive);
    log("typeof nothing: " + typeof nothing);
    log("typeof undef: " + typeof undef);

    // Template literals (backticks)
    const name = "Priya";
    const marks = 98;
    log("\\n--- Template Literals ---");
    log(\`Name: \${name}\`);
    log(\`Marks: \${marks}/100\`);
    log(\`Grade: \${marks >= 90 ? "A+" : "A"}\`);  // ternary in template!
    log(\`Pi to 2 places: \${PI.toFixed(2)}\`);

    // Type conversion
    log("\\n--- Type Conversion ---");
    log("Number('42'): " + Number("42"));
    log("String(100): " + String(100));
    log("Boolean(0): " + Boolean(0));
    log("Boolean('hello'): " + Boolean("hello"));
  </script>
</body>
</html>`,
    notes: [
      `Use const by default. Only use let if you need to reassign. Never use var.`,
      `null vs undefined: null is an intentional "no value". undefined means a variable was declared but not assigned.`,
      `NaN (Not a Number) occurs when math fails: Number("abc") → NaN. Check with isNaN().`,
    ],
    practice: {
      title: 'Student Report Variables',
      description: `Create JavaScript variables for a student profile (const for fixed data, let for changing data). Calculate percentage. Display everything using template literals in a styled div.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Report</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
    #report { background: #f1f5f9; border-radius: 12px; padding: 20px; font-size: 16px; line-height: 2; }
  </style>
</head>
<body>
  <div id="report"></div>
  <script>
    // Fixed data (use const)
    const studentName = "Arjun Kumar";
    const rollNumber = 42;
    const className = "11A";

    // Data that might change (use let)
    let maths = 92;
    let science = 88;
    let english = 79;

    // Calculate
    const total = maths + science + english;
    const percentage = (total / 300) * 100;
    const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : "B";

    // Display using template literals
    document.getElementById("report").innerHTML = \`
      <h2>📋 Report Card</h2>
      <p><b>Name:</b> \${studentName}</p>
      <p><b>Roll No:</b> \${rollNumber}</p>
      <p><b>Class:</b> \${className}</p>
      <hr>
      <p>Maths: \${maths} | Science: \${science} | English: \${english}</p>
      <p><b>Total:</b> \${total}/300</p>
      <p><b>Percentage:</b> \${percentage.toFixed(2)}%</p>
      <p><b>Grade:</b> \${grade}</p>
    \`;
  </script>
</body>
</html>`,
      hint: `Use const for data that never changes (name, roll) and let for marks that might be updated.`,
    },
  },

  {
    id: 'js-arrays',
    category: 'Data Structures',
    title: 'Arrays & Array Methods',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      `An array is an ordered list of values stored in a single variable. Arrays in JavaScript are zero-indexed and can hold mixed types (numbers, strings, objects, other arrays).`,
      `Essential array methods: push/pop (end), unshift/shift (start), splice (middle), slice (extract), indexOf/includes (find), sort, reverse. These modify or query the array.`,
      `Functional methods: map() transforms each item, filter() keeps matching items, reduce() accumulates to one value, forEach() runs a function on each item. These are essential for modern JS development.`,
    ],
    syntax: `const arr = [1, 2, 3];
arr.push(4);          // add to end
arr.pop();            // remove from end
arr.includes(2);      // → true
arr.map(x => x*2);   // → [2,4,6]
arr.filter(x => x>1); // → [2,3]`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Arrays</title>
  <style>
    body { font-family: monospace; max-width: 650px; margin: 30px auto; padding: 20px; }
    .out { background: #0f172a; color: #a3e635; padding: 16px; border-radius: 8px; white-space: pre; font-size: 13px; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>JavaScript Arrays</h1>
  <div id="out" class="out"></div>
  <script>
    let logs = [];
    const log = t => { logs.push(t); document.getElementById("out").textContent = logs.join("\\n"); };

    // Creating arrays
    const fruits = ["mango", "banana", "apple", "guava"];
    const marks = [85, 92, 78, 95, 88, 61];
    log("fruits: " + JSON.stringify(fruits));

    // Access
    log("First: " + fruits[0]);
    log("Last: " + fruits[fruits.length - 1]);
    log("Length: " + fruits.length);

    // Modify
    fruits.push("pineapple");        // add to end
    fruits.unshift("strawberry");    // add to start
    const removed = fruits.pop();    // remove from end
    log("\\nAfter changes: " + JSON.stringify(fruits));
    log("Removed: " + removed);

    // Useful methods
    log("\\n--- Methods ---");
    log("Includes banana: " + fruits.includes("banana"));
    log("Index of apple: " + fruits.indexOf("apple"));
    log("Sorted: " + [...marks].sort((a, b) => a - b));

    // Functional methods (modern JS - most important!)
    log("\\n--- Functional Methods ---");
    const doubled = marks.map(m => m * 2);
    log("map (double): " + doubled);

    const passing = marks.filter(m => m >= 80);
    log("filter (>=80): " + passing);

    const total = marks.reduce((sum, m) => sum + m, 0);
    log("reduce (sum): " + total);
    log("Average: " + (total / marks.length).toFixed(1));

    // Find
    const firstHigh = marks.find(m => m > 90);
    log("First > 90: " + firstHigh);

    // Every / Some
    log("All passing (>=60): " + marks.every(m => m >= 60));
    log("Some above 90: " + marks.some(m => m > 90));

    // Spread & destructuring
    log("\\n--- Modern JS ---");
    const [first, second, ...rest] = fruits;
    log("Destructure: first=" + first + ", rest=" + JSON.stringify(rest));
    const combined = [...fruits, ...["kiwi", "grapes"]];
    log("Spread: " + combined.length + " items");
  </script>
</body>
</html>`,
    notes: [
      `map, filter, reduce don't modify the original array — they return new arrays. Always prefer these over manual for-loops.`,
      `sort() without a comparator sorts alphabetically (wrong for numbers!). Use sort((a, b) => a - b) for ascending numbers.`,
      `Destructuring const [a, b, ...rest] = arr unpacks an array into variables in one line.`,
    ],
    practice: {
      title: 'Marks Dashboard',
      description: `Given a marks array, use array methods to: find the top 3 scores (sort + slice), calculate class average (reduce), find failing students (filter < 60), and display results in a styled HTML div.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Marks Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
    .card { background: #f1f5f9; border-radius: 12px; padding: 16px; margin: 10px 0; }
    .card h3 { color: #10b981; margin: 0 0 8px; }
    .fail { color: #ef4444; }
  </style>
</head>
<body>
  <h1>📊 Class Marks Dashboard</h1>
  <div id="dashboard"></div>

  <script>
    const marks = [72, 85, 45, 91, 63, 88, 52, 97, 76, 83];

    const sorted = [...marks].sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);
    const total = marks.reduce((sum, m) => sum + m, 0);
    const avg = (total / marks.length).toFixed(1);
    const failing = marks.filter(m => m < 60);
    const passing = marks.filter(m => m >= 60);

    document.getElementById("dashboard").innerHTML = \`
      <div class="card"><h3>👥 Total Students</h3><p>\${marks.length}</p></div>
      <div class="card"><h3>📈 Top 3 Scores</h3><p>\${top3.join(", ")}</p></div>
      <div class="card"><h3>📊 Class Average</h3><p>\${avg}%</p></div>
      <div class="card"><h3>✅ Passing</h3><p>\${passing.length} students</p></div>
      <div class="card"><h3 class="fail">❌ Failing (&lt;60)</h3><p class="fail">\${failing.length} students: \${failing.join(", ")}</p></div>
    \`;
  </script>
</body>
</html>`,
      hint: `Use [...marks].sort() to avoid modifying the original. sort((a,b) => b-a) sorts descending.`,
    },
  },

  {
    id: 'js-dom',
    category: 'Browser & DOM',
    title: 'DOM Manipulation',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `The DOM (Document Object Model) is the browser's representation of the HTML page as a tree of objects. JavaScript can read and modify any part of the DOM — changing text, styles, attributes, and structure.`,
      `Key methods: getElementById (by ID), querySelector (CSS selector, first match), querySelectorAll (all matches). To change content: innerHTML (HTML), textContent (plain text), value (inputs).`,
      `To change styles: element.style.property = "value". To add/remove CSS classes: classList.add(), classList.remove(), classList.toggle(). classList is preferred over direct style manipulation for maintainability.`,
    ],
    syntax: `const el = document.getElementById("id");
const el = document.querySelector(".class");
el.textContent = "New text";
el.innerHTML = "<b>Bold</b>";
el.style.color = "red";
el.classList.toggle("active");`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM Manipulation</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; padding: 20px; }
    .box { border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 10px 0; }
    .highlight { background: #fef9ec; border-color: #f59e0b; }
    .hidden { display: none; }
    button { padding: 8px 16px; margin: 4px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .btn-green { background: #10b981; color: white; }
    .btn-blue { background: #3b82f6; color: white; }
    .btn-red { background: #ef4444; color: white; }
    input { padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; margin: 4px; }
    #counter { font-size: 48px; font-weight: black; text-align: center; color: #6366f1; }
  </style>
</head>
<body>
  <h1>DOM Manipulation Demo</h1>

  <!-- Change text -->
  <div class="box">
    <h3>1. Change Text Content</h3>
    <p id="message">This text will change! 👆</p>
    <button class="btn-green" onclick="changeText()">Change Text</button>
    <button class="btn-blue" onclick="changeHTML()">Change HTML</button>
  </div>

  <!-- Change styles -->
  <div class="box" id="styleBox">
    <h3>2. Change Styles & Classes</h3>
    <p>Click buttons to style this box:</p>
    <button class="btn-green" onclick="document.getElementById('styleBox').classList.toggle('highlight')">Toggle Highlight</button>
    <button class="btn-blue" onclick="changeFont()">Bigger Font</button>
    <button class="btn-red" onclick="resetStyle()">Reset</button>
  </div>

  <!-- Counter -->
  <div class="box">
    <h3>3. Counter App</h3>
    <div id="counter">0</div>
    <button class="btn-red" onclick="updateCounter(-1)">−</button>
    <button class="btn-green" onclick="updateCounter(1)">+</button>
    <button onclick="resetCounter()">Reset</button>
  </div>

  <!-- Toggle visibility -->
  <div class="box">
    <h3>4. Toggle Visibility</h3>
    <button class="btn-blue" onclick="toggleSecret()">🔐 Reveal Secret</button>
    <p id="secret" class="hidden">🎉 You found the secret message! JavaScript is amazing!</p>
  </div>

  <!-- Input → live output -->
  <div class="box">
    <h3>5. Live Input</h3>
    <input type="text" id="nameInput" placeholder="Type your name..." oninput="updateGreeting()">
    <p id="greeting">Waiting for input...</p>
  </div>

  <script>
    // 1. Change text
    function changeText() {
      document.getElementById("message").textContent = "Text changed with JavaScript! 🎉";
    }
    function changeHTML() {
      document.getElementById("message").innerHTML = "This has <strong>bold</strong> and <em>italic</em> text!";
    }

    // 2. Style
    let fontSize = 16;
    function changeFont() {
      fontSize += 4;
      document.getElementById("styleBox").style.fontSize = fontSize + "px";
    }
    function resetStyle() {
      const box = document.getElementById("styleBox");
      box.classList.remove("highlight");
      fontSize = 16;
      box.style.fontSize = "";
    }

    // 3. Counter
    let count = 0;
    function updateCounter(delta) {
      count += delta;
      document.getElementById("counter").textContent = count;
      document.getElementById("counter").style.color = count < 0 ? "#ef4444" : count > 0 ? "#10b981" : "#6366f1";
    }
    function resetCounter() {
      count = 0;
      updateCounter(0);
    }

    // 4. Toggle
    function toggleSecret() {
      document.getElementById("secret").classList.toggle("hidden");
    }

    // 5. Live input
    function updateGreeting() {
      const name = document.getElementById("nameInput").value;
      document.getElementById("greeting").textContent =
        name ? \`Hello, \${name}! 👋\` : "Waiting for input...";
    }
  </script>
</body>
</html>`,
    notes: [
      `textContent is safer than innerHTML (prevents XSS attacks). Only use innerHTML when you need to insert HTML tags.`,
      `classList.toggle("class") adds the class if not present, removes if present — perfect for show/hide toggles.`,
      `querySelectorAll returns a NodeList (not an array). Convert with Array.from() to use .map() and .filter().`,
    ],
    practice: {
      title: 'Todo List App',
      description: `Build a simple Todo List: text input + Add button adds items to a list, each item has a Delete button. When list is empty, show "No tasks yet!" Count total tasks at the top.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 450px; margin: 40px auto; padding: 20px; }
    #input-row { display: flex; gap: 8px; margin-bottom: 20px; }
    #taskInput { flex: 1; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; }
    #addBtn { padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .task { display: flex; justify-content: space-between; align-items: center; padding: 12px; margin: 6px 0; background: #f8fafc; border-radius: 8px; }
    .del-btn { background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
    #count { color: #6b7280; font-size: 14px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h1>✅ Todo List</h1>
  <p id="count">0 tasks</p>
  <div id="input-row">
    <input id="taskInput" type="text" placeholder="Add a task...">
    <button id="addBtn" onclick="addTask()">Add</button>
  </div>
  <div id="taskList"><p style="color:#9ca3af">No tasks yet!</p></div>

  <script>
    const tasks = [];

    function addTask() {
      const input = document.getElementById("taskInput");
      const text = input.value.trim();
      if (!text) return;
      tasks.push(text);
      input.value = "";
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function renderTasks() {
      const list = document.getElementById("taskList");
      document.getElementById("count").textContent = tasks.length + " task(s)";
      if (tasks.length === 0) {
        list.innerHTML = "<p style='color:#9ca3af'>No tasks yet!</p>";
        return;
      }
      list.innerHTML = tasks.map((task, i) =>
        \`<div class="task">
          <span>\${task}</span>
          <button class="del-btn" onclick="deleteTask(\${i})">Delete</button>
        </div>\`
      ).join("");
    }

    // Allow Enter key to add task
    document.getElementById("taskInput").addEventListener("keypress", e => {
      if (e.key === "Enter") addTask();
    });
  </script>
</body>
</html>`,
      hint: `Use an array to store tasks, then re-render the entire list using .map() and .join(""). tasks.splice(index, 1) removes one item at that index.`,
    },
  },

  {
    id: 'js-events',
    category: 'Browser & DOM',
    title: 'Event Listeners',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      `Events are actions that happen in the browser: clicks, key presses, form submissions, mouse movements, etc. JavaScript responds to events using addEventListener(eventType, function).`,
      `The event object (e) passed to the handler has useful properties: e.target (element that triggered event), e.key (key pressed), e.preventDefault() (stop default behavior like form submit).`,
      `Event delegation: instead of adding listeners to each child, add one listener to the parent and check e.target. This is more efficient and works for dynamically added elements.`,
    ],
    syntax: `element.addEventListener("click", function(e) {
  // handle event
  console.log(e.target);  // element clicked
});

element.addEventListener("keydown", e => {
  if (e.key === "Enter") { ... }
});`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Listeners</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; padding: 20px; }
    .demo { border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 16px 0; }
    #colorBox { width: 200px; height: 100px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; margin: 10px 0; transition: all 0.3s; }
    #keyDisplay { background: #1e293b; color: #10b981; padding: 12px; border-radius: 8px; font-family: monospace; min-height: 40px; }
    button { padding: 8px 16px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 4px; }
    input { padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 14px; }
    #mouseTrack { height: 80px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body>
  <h1>⚡ Event Listeners Demo</h1>

  <!-- Click events -->
  <div class="demo">
    <h3>1. Click Events</h3>
    <div id="colorBox">Click me!</div>
    <p>Clicks: <strong id="clickCount">0</strong></p>
  </div>

  <!-- Keyboard events -->
  <div class="demo">
    <h3>2. Keyboard Events</h3>
    <input type="text" id="keyInput" placeholder="Type something...">
    <div id="keyDisplay">Press any key...</div>
  </div>

  <!-- Form prevent default -->
  <div class="demo">
    <h3>3. Form Validation (preventDefault)</h3>
    <form id="myForm">
      <input type="text" id="username" placeholder="Username (min 3 chars)">
      <button type="submit">Submit</button>
    </form>
    <p id="formMsg"></p>
  </div>

  <!-- Mouse events -->
  <div class="demo">
    <h3>4. Mouse Position</h3>
    <div id="mouseTrack">Move mouse here 🖱️</div>
  </div>

  <script>
    // 1. Click event + double click
    let clicks = 0;
    const colorBox = document.getElementById("colorBox");
    const colors = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#06b6d4"];

    colorBox.addEventListener("click", () => {
      clicks++;
      document.getElementById("clickCount").textContent = clicks;
      colorBox.style.background = colors[clicks % colors.length];
      colorBox.textContent = "Clicked " + clicks + " times!";
    });

    colorBox.addEventListener("dblclick", () => {
      clicks = 0;
      colorBox.style.background = "#e2e8f0";
      colorBox.textContent = "Reset!";
      document.getElementById("clickCount").textContent = 0;
    });

    // 2. Keyboard events
    document.getElementById("keyInput").addEventListener("keydown", (e) => {
      document.getElementById("keyDisplay").textContent =
        \`Key: "\${e.key}" | Code: \${e.code} | Ctrl: \${e.ctrlKey}\`;
    });

    // 3. Form submit with validation
    document.getElementById("myForm").addEventListener("submit", (e) => {
      e.preventDefault(); // stop page reload!
      const val = document.getElementById("username").value.trim();
      const msg = document.getElementById("formMsg");
      if (val.length < 3) {
        msg.style.color = "red";
        msg.textContent = "❌ Username must be at least 3 characters";
      } else {
        msg.style.color = "green";
        msg.textContent = \`✅ Welcome, \${val}!\`;
      }
    });

    // 4. Mouse move
    document.getElementById("mouseTrack").addEventListener("mousemove", (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      e.target.textContent = \`Mouse: x=\${x}, y=\${y}\`;
    });

    document.getElementById("mouseTrack").addEventListener("mouseleave", (e) => {
      e.target.textContent = "Move mouse here 🖱️";
    });
  </script>
</body>
</html>`,
    notes: [
      `Always use addEventListener instead of onclick in the HTML — it's cleaner and allows multiple listeners.`,
      `e.preventDefault() is essential for forms — without it, the form submits and reloads the page.`,
      `removeEventListener removes a listener. The function must be named (not anonymous) to remove it.`,
    ],
    practice: {
      title: 'Password Strength Checker',
      description: `Build a password input that shows strength in real-time as the user types: Weak (< 6 chars), Medium (6-9 chars with mix), Strong (10+ chars). Show a colored strength bar and hint text.`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Strength</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 400px; margin: 80px auto; padding: 20px; }
    input { width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
    #bar { height: 8px; border-radius: 4px; margin: 8px 0; width: 0; transition: all 0.3s; }
    #hint { font-size: 14px; color: #6b7280; }
  </style>
</head>
<body>
  <h2>🔐 Password Strength Checker</h2>
  <input type="password" id="pwd" placeholder="Enter password...">
  <div id="bar"></div>
  <p id="hint">Start typing to check strength</p>

  <script>
    document.getElementById("pwd").addEventListener("input", function() {
      const pwd = this.value;
      const bar = document.getElementById("bar");
      const hint = document.getElementById("hint");
      const hasUpper = /[A-Z]/.test(pwd);
      const hasNumber = /[0-9]/.test(pwd);
      const hasSpecial = /[!@#$%]/.test(pwd);

      if (pwd.length === 0) {
        bar.style.width = "0"; bar.style.background = "";
        hint.textContent = "Start typing to check strength";
      } else if (pwd.length < 6) {
        bar.style.width = "30%"; bar.style.background = "#ef4444";
        hint.textContent = "❌ Weak — too short (min 6 characters)";
      } else if (pwd.length < 10 || !(hasUpper && hasNumber)) {
        bar.style.width = "65%"; bar.style.background = "#f59e0b";
        hint.textContent = "⚠️ Medium — add uppercase, numbers";
      } else if (hasUpper && hasNumber && hasSpecial && pwd.length >= 10) {
        bar.style.width = "100%"; bar.style.background = "#10b981";
        hint.textContent = "✅ Strong password!";
      } else {
        bar.style.width = "80%"; bar.style.background = "#10b981";
        hint.textContent = "🟢 Good — add special chars (!@#$%) for strong";
      }
    });
  </script>
</body>
</html>`,
      hint: `Use /[A-Z]/.test(pwd) to check if string contains uppercase. length property gives string length.`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'js-functions',
    category: 'JavaScript Fundamentals',
    title: 'Functions & Arrow Functions',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Functions are reusable blocks of code. JavaScript has multiple ways to define them: function declarations, function expressions, and arrow functions (ES6+).',
      'Arrow functions (=>) are shorter and don\'t have their own this. For a single expression, the return is implicit: const add = (a, b) => a + b.',
      'Default parameters: function greet(name = "Student") — if name is not passed, "Student" is used.',
      'Rest parameters: function sum(...nums) collects all arguments into an array. The spread operator (...arr) does the opposite — expands an array into individual values.',
    ],
    syntax: `// Function declaration
function add(a, b) { return a + b; }

// Arrow function (short)
const multiply = (a, b) => a * b;

// Arrow with implicit return (no braces, no return keyword)
const square = n => n * n;

// Default parameter
function greet(name = "Student") { return \`Hello \${name}!\`; }

// Rest parameters
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .result { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 10px; margin: 8px 0; border-radius: 0 8px 8px 0; }
    button { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 4px; }
  </style>
</head>
<body>
  <h1>JavaScript Functions</h1>
  <div id="output"></div>
  <button onclick="runDemo()">Run Examples</button>

  <script>
    // 1. Function declaration
    function gradeCalc(marks) {
      if (marks >= 90) return "A+";
      if (marks >= 80) return "A";
      if (marks >= 70) return "B";
      if (marks >= 60) return "C";
      return "F";
    }

    // 2. Arrow function with default param
    const greet = (name = "Student", title = "") =>
      \`Hello\${title ? " " + title : ""} \${name}! 👋\`;

    // 3. Rest parameters
    const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
    const average = (...nums) => sum(...nums) / nums.length;

    // 4. Higher-order function (function returning function)
    const makeMultiplier = (factor) => (n) => n * factor;
    const double = makeMultiplier(2);
    const triple = makeMultiplier(3);

    function runDemo() {
      const results = [
        \`gradeCalc(92) = \${gradeCalc(92)}\`,
        \`gradeCalc(73) = \${gradeCalc(73)}\`,
        \`greet() = \${greet()}\`,
        \`greet("Priya", "Ms.") = \${greet("Priya", "Ms.")}\`,
        \`sum(10, 20, 30, 40) = \${sum(10, 20, 30, 40)}\`,
        \`average(85, 92, 78, 91) = \${average(85, 92, 78, 91).toFixed(1)}\`,
        \`double(5) = \${double(5)}\`,
        \`triple(7) = \${triple(7)}\`,
      ];
      document.getElementById('output').innerHTML =
        results.map(r => \`<div class="result">\${r}</div>\`).join('');
    }
    runDemo();
  </script>
</body>
</html>`,
    practice: {
      title: 'Grade Calculator',
      description: `Build an interactive grade calculator:
- Input: 5 marks (use a form)
- Function calculateStats(...marks) returns { total, average, highest, lowest, grade }
- grade: A+ >=90, A >=80, B >=70, C >=60, F otherwise
- Use arrow functions for helper functions
- Display results when "Calculate" is clicked`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 400px; }
    .row { display: flex; gap: 10px; align-items: center; margin: 8px 0; }
    input { width: 80px; padding: 6px; border: 2px solid #cbd5e1; border-radius: 6px; }
    button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
    #result { background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 12px; display: none; }
  </style>
</head>
<body>
  <h1>📊 Grade Calculator</h1>
  <div class="row"><label>Maths:</label><input type="number" id="m1" value="85"></div>
  <div class="row"><label>Science:</label><input type="number" id="m2" value="92"></div>
  <div class="row"><label>English:</label><input type="number" id="m3" value="78"></div>
  <div class="row"><label>History:</label><input type="number" id="m4" value="88"></div>
  <div class="row"><label>Computer:</label><input type="number" id="m5" value="95"></div>
  <button onclick="calculate()">Calculate</button>
  <div id="result"></div>
  <script>
    // Write your functions here
    const getGrade = (avg) => {
      // return grade based on avg
    };

    function calculateStats(...marks) {
      // return { total, average, highest, lowest, grade }
    }

    function calculate() {
      const marks = ['m1','m2','m3','m4','m5'].map(id => +document.getElementById(id).value);
      const stats = calculateStats(...marks);
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerHTML = \`
        <strong>Total:</strong> \${stats.total}/500<br>
        <strong>Average:</strong> \${stats.average}<br>
        <strong>Highest:</strong> \${stats.highest}<br>
        <strong>Lowest:</strong> \${stats.lowest}<br>
        <strong>Grade:</strong> \${stats.grade}
      \`;
    }
  </script>
</body>
</html>`,
      hint: 'calculateStats: total = marks.reduce((a,b)=>a+b,0). average = total/marks.length. Use Math.max(...marks) for highest.',
    },
  },

  {
    id: 'js-array-methods',
    category: 'JavaScript Fundamentals',
    title: 'Array Methods (map, filter, reduce)',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Modern JavaScript array methods process arrays without for loops. They are cleaner, more readable, and chainable.',
      'map() transforms each element and returns a NEW array. filter() keeps only elements that pass a test. reduce() accumulates all elements into a single value.',
      'find() returns the first matching element. some() checks if ANY element passes. every() checks if ALL pass. forEach() runs a function on each (no return).',
      'These methods can be chained: students.filter(s => s.marks >= 60).map(s => s.name) — get names of passing students.',
    ],
    syntax: `const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2)          // [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0) // [2, 4]
nums.reduce((sum, n) => sum + n, 0) // 15
nums.find(n => n > 3)         // 4
nums.some(n => n > 4)         // true
nums.every(n => n > 0)        // true`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .result { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 10px; margin: 8px 0; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
    th { background: #1e293b; color: white; padding: 8px 12px; }
    td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
    .pass { color: #10b981; font-weight: bold; }
    .fail { color: #ef4444; }
  </style>
</head>
<body>
  <h1>Array Methods Demo</h1>
  <div id="output"></div>

  <script>
    const students = [
      { name: "Priya", marks: 92, subject: "Maths" },
      { name: "Rahul", marks: 58, subject: "Science" },
      { name: "Sneha", marks: 85, subject: "Maths" },
      { name: "Arun", marks: 45, subject: "English" },
      { name: "Bhavna", marks: 78, subject: "Science" },
      { name: "Chetan", marks: 91, subject: "Maths" },
    ];

    // 1. map() — extract names
    const names = students.map(s => s.name);

    // 2. filter() — only passing students (>=60)
    const passing = students.filter(s => s.marks >= 60);

    // 3. reduce() — total marks
    const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);

    // 4. Chaining — names of failing students
    const failingNames = students.filter(s => s.marks < 60).map(s => s.name);

    // 5. find() — first student with 90+
    const topStudent = students.find(s => s.marks >= 90);

    // 6. some/every
    const anyAbove90 = students.some(s => s.marks >= 90);
    const allAbove40 = students.every(s => s.marks >= 40);

    // 7. Sort by marks (descending)
    const ranked = [...students].sort((a, b) => b.marks - a.marks);

    const out = document.getElementById('output');
    out.innerHTML = \`
      <div class="result"><strong>Names:</strong> \${names.join(', ')}</div>
      <div class="result"><strong>Passing (\${passing.length}):</strong> \${passing.map(s=>s.name).join(', ')}</div>
      <div class="result"><strong>Total Marks:</strong> \${totalMarks} | Average: \${(totalMarks/students.length).toFixed(1)}</div>
      <div class="result"><strong>Failing:</strong> \${failingNames.join(', ')}</div>
      <div class="result"><strong>First 90+ student:</strong> \${topStudent?.name} (\${topStudent?.marks})</div>
      <div class="result"><strong>Any above 90?</strong> \${anyAbove90} | <strong>All above 40?</strong> \${allAbove40}</div>
      <h2>Ranked Students</h2>
      <table>
        <tr><th>Rank</th><th>Name</th><th>Marks</th><th>Status</th></tr>
        \${ranked.map((s, i) => \`
          <tr>
            <td>\${i + 1}</td><td>\${s.name}</td><td>\${s.marks}</td>
            <td class="\${s.marks >= 60 ? 'pass' : 'fail'}">\${s.marks >= 60 ? '✅ Pass' : '❌ Fail'}</td>
          </tr>\`).join('')}
      </table>
    \`;
  </script>
</body>
</html>`,
    practice: {
      title: 'Product Dashboard',
      description: `Use array methods to build a product dashboard:
Given:
const products = [
  { name:"Laptop", price:45000, category:"Electronics", stock:5 },
  { name:"Pen", price:10, category:"Stationery", stock:500 },
  { name:"Notebook", price:120, category:"Stationery", stock:200 },
  { name:"Calculator", price:800, category:"Electronics", stock:30 },
  { name:"Backpack", price:1200, category:"Accessories", stock:15 },
];

Show: 1) Total inventory value (price × stock for all), 2) Only Electronics, 3) Names of items under ₹1000, 4) Most expensive item, 5) Sorted by price`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .stat { background: #f0f9ff; padding: 10px; border-radius: 8px; margin: 6px 0; }
  </style>
</head>
<body>
  <h1>🛒 Product Dashboard</h1>
  <div id="output"></div>
  <script>
    const products = [
      { name: "Laptop", price: 45000, category: "Electronics", stock: 5 },
      { name: "Pen", price: 10, category: "Stationery", stock: 500 },
      { name: "Notebook", price: 120, category: "Stationery", stock: 200 },
      { name: "Calculator", price: 800, category: "Electronics", stock: 30 },
      { name: "Backpack", price: 1200, category: "Accessories", stock: 15 },
    ];

    // 1. Total inventory value
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    // 2. Only Electronics
    const electronics = products.filter(/* your code */);

    // 3. Names under ₹1000
    const affordable = products.filter(/* */).map(/* */);

    // 4. Most expensive
    const mostExpensive = products.reduce(/* */);

    // 5. Sorted by price
    const byPrice = [...products].sort(/* */);

    document.getElementById('output').innerHTML = \`
      <div class="stat">Total inventory value: ₹\${totalValue.toLocaleString()}</div>
      <div class="stat">Electronics: \${electronics.map(p=>p.name).join(', ')}</div>
      <div class="stat">Under ₹1000: \${affordable.join(', ')}</div>
      <div class="stat">Most expensive: \${mostExpensive.name} (₹\${mostExpensive.price})</div>
      <div class="stat">By price: \${byPrice.map(p=>p.name).join(' → ')}</div>
    \`;
  </script>
</body>
</html>`,
      hint: 'filter(p => p.category === "Electronics"). reduce for most expensive: (max, p) => p.price > max.price ? p : max. sort: (a,b) => a.price - b.price.',
    },
  },

  {
    id: 'js-objects-destructuring',
    category: 'JavaScript Fundamentals',
    title: 'Objects & Destructuring',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'JavaScript objects store key-value pairs. You can read, add, update, and delete properties. Methods are functions stored as properties.',
      'Destructuring extracts values from objects or arrays into variables: const { name, age } = student instead of student.name, student.age.',
      'Spread operator (...) copies all properties of an object: const updated = { ...student, age: 16 } creates a new object with one property changed.',
      'Optional chaining (?.) safely accesses nested properties: user?.address?.city — returns undefined if any part is null/undefined instead of throwing an error.',
    ],
    syntax: `const student = { name: "Priya", age: 15, marks: 92 };

// Destructuring
const { name, marks } = student;
const { name: fullName, age = 16 } = student; // rename + default

// Spread to copy/update
const updated = { ...student, marks: 95 };

// Optional chaining
student.address?.city  // undefined (no error)
student?.guardian?.phone  // safe nested access

// Computed properties
const key = "marks";
student[key]  // 92`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; margin: 10px 0; }
    .badge { background: #10b981; color: white; padding: 2px 10px; border-radius: 999px; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Objects & Destructuring</h1>
  <div id="output"></div>

  <script>
    // Full student object with nested data
    const student = {
      name: "Priya Sharma",
      age: 16,
      class: 10,
      marks: { maths: 92, science: 88, english: 95, history: 78 },
      address: { city: "Mumbai", state: "Maharashtra" },
      hobbies: ["coding", "reading", "chess"],
    };

    // 1. Destructuring
    const { name, age, class: stdClass } = student;
    const { maths, science, english = 0 } = student.marks;
    const { city, state } = student.address;
    const [hobby1, hobby2] = student.hobbies;

    // 2. Computed total
    const total = Object.values(student.marks).reduce((a, b) => a + b, 0);
    const avg = (total / Object.keys(student.marks).length).toFixed(1);

    // 3. Spread to create updated object (immutable update)
    const promoted = {
      ...student,
      class: student.class + 1,
      marks: { ...student.marks, maths: 95 }
    };

    // 4. Optional chaining
    const phone = student?.guardian?.phone ?? "Not provided";
    const country = student?.address?.country ?? "India (default)";

    // 5. Object methods
    const keys = Object.keys(student.marks);
    const values = Object.values(student.marks);
    const entries = Object.entries(student.marks);

    document.getElementById('output').innerHTML = \`
      <div class="card">
        <strong>Destructured:</strong><br>
        Name: \${name} | Age: \${age} | Class: \${stdClass}<br>
        City: \${city}, \${state}<br>
        Hobbies: \${hobby1}, \${hobby2}
      </div>
      <div class="card">
        <strong>Marks:</strong> Maths \${maths} | Science \${science} | English \${english}<br>
        Total: \${total} | Average: \${avg} <span class="badge">\${avg >= 90 ? "A+" : avg >= 80 ? "A" : "B"}</span>
      </div>
      <div class="card">
        <strong>Promoted student:</strong> Class \${promoted.class} | Maths: \${promoted.marks.maths}
      </div>
      <div class="card">
        <strong>Optional chaining:</strong> Phone: \${phone} | Country: \${country}
      </div>
      <div class="card">
        <strong>Object.entries():</strong> \${entries.map(([k,v]) => \`\${k}:\${v}\`).join(' | ')}
      </div>
    \`;
  </script>
</body>
</html>`,
    practice: {
      title: 'School Report Generator',
      description: `Create a report generator using destructuring:

const teacher = { name: "Mrs. Patel", subject: "Maths", experience: 12 };
const classData = { grade: "10A", students: 35, passRate: 0.88 };

1. Destructure both objects
2. Create a merged report object using spread
3. Add a method generateReport() that returns a formatted string
4. Show the report in the page`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .report { background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 20px; font-family: monospace; white-space: pre-line; }
  </style>
</head>
<body>
  <h1>📋 School Report Generator</h1>
  <div id="output"></div>
  <script>
    const teacher = { name: "Mrs. Patel", subject: "Maths", experience: 12 };
    const classData = { grade: "10A", students: 35, passRate: 0.88 };

    // 1. Destructure
    const { name: teacherName, subject, experience } = teacher;
    const { grade, students, passRate } = classData;

    // 2. Merge with spread
    const report = {
      ...teacher,
      ...classData,
      passCount: Math.round(students * passRate),
      // 3. Add generateReport method
      generateReport() {
        return \`\`; // Build the report string here
      }
    };

    // Show report
    document.getElementById('output').innerHTML =
      \`<div class="report">\${report.generateReport()}</div>\`;
  </script>
</body>
</html>`,
      hint: 'In generateReport: use template literals to build a multi-line string with teacher name, class, pass count etc.',
    },
  },

  {
    id: 'js-promises-async',
    category: 'JavaScript Advanced',
    title: 'Promises & Async/Await',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'JavaScript is single-threaded. Asynchronous code (API calls, timers) uses callbacks or Promises to handle tasks that take time without blocking the page.',
      'A Promise is an object representing a future value. States: pending → resolved (then) or rejected (catch). Use .then() to handle success, .catch() for errors.',
      'async/await is syntactic sugar over Promises. An async function always returns a Promise. await pauses execution until the Promise resolves — making async code look synchronous.',
      'Promise.all([p1, p2, p3]) runs all promises in parallel and resolves when all are done. Promise.race() resolves/rejects as soon as the first one does.',
    ],
    syntax: `// Promise
const p = new Promise((resolve, reject) => {
  resolve(data);  // or reject(error)
});
p.then(data => console.log(data)).catch(err => console.error(err));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 600px; }
    .log { background: #1e293b; color: #10b981; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 13px; margin: 8px 0; }
    button { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 4px; }
    .error { color: #ef4444; }
    .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 12px; margin: 6px 0; }
  </style>
</head>
<body>
  <h1>Promises & Async/Await</h1>

  <h2>Simulated API Calls</h2>
  <button onclick="loadStudent(1)">Load Student 1</button>
  <button onclick="loadStudent(999)">Load Student 999 (will fail)</button>
  <button onclick="loadAll()">Load All (Parallel)</button>

  <div id="output"></div>

  <script>
    // Simulate API with Promise
    function fetchStudent(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const students = {
            1: { name: "Priya", marks: 92 },
            2: { name: "Rahul", marks: 85 },
            3: { name: "Sneha", marks: 78 },
          };
          const student = students[id];
          if (student) resolve(student);
          else reject(new Error(\`Student \${id} not found\`));
        }, 800);
      });
    }

    // Using async/await
    async function loadStudent(id) {
      const out = document.getElementById('output');
      out.innerHTML = '<div class="log">⏳ Loading student...</div>';
      try {
        const student = await fetchStudent(id);
        out.innerHTML = \`<div class="card">✅ Found: <strong>\${student.name}</strong> — Marks: \${student.marks}</div>\`;
      } catch (error) {
        out.innerHTML = \`<div class="log error">❌ Error: \${error.message}</div>\`;
      }
    }

    // Promise.all — load all in parallel
    async function loadAll() {
      const out = document.getElementById('output');
      out.innerHTML = '<div class="log">⏳ Loading all students...</div>';
      try {
        const [s1, s2, s3] = await Promise.all([
          fetchStudent(1), fetchStudent(2), fetchStudent(3)
        ]);
        out.innerHTML = [s1, s2, s3].map(s =>
          \`<div class="card">\${s.name}: \${s.marks}</div>\`
        ).join('');
      } catch (error) {
        out.innerHTML = \`<div class="log error">❌ \${error.message}</div>\`;
      }
    }
  </script>
</body>
</html>`,
    practice: {
      title: 'Fetch Real API Data',
      description: `Use fetch() with async/await to get data from a real public API:

URL: https://jsonplaceholder.typicode.com/users/1

1. Show a loading message while fetching
2. Display: name, email, company name from the response
3. Handle errors (use try/catch)
4. Add a "Fetch Another" button that loads a random user (id 1-10)`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 500px; }
    .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 10px 0; }
    button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .loading { color: #64748b; font-style: italic; }
    .error { color: #ef4444; }
  </style>
</head>
<body>
  <h1>👤 User Fetcher</h1>
  <button onclick="loadUser()">Fetch Random User</button>
  <div id="output"><p class="loading">Click the button to load a user.</p></div>
  <script>
    async function loadUser() {
      const out = document.getElementById('output');
      out.innerHTML = '<p class="loading">⏳ Loading...</p>';
      const randomId = Math.floor(Math.random() * 10) + 1;
      try {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${randomId}\`);
        if (!response.ok) throw new Error(\`HTTP error \${response.status}\`);
        const user = await response.json();
        out.innerHTML = \`
          <div class="card">
            <h2>\${user.name}</h2>
            <!-- Show more user details here -->
          </div>
        \`;
      } catch (error) {
        out.innerHTML = \`<p class="error">❌ \${error.message}</p>\`;
      }
    }
    loadUser(); // Load on page start
  </script>
</body>
</html>`,
      hint: 'user.email, user.company.name, user.address.city are available in the response. Check if (!response.ok) before parsing JSON.',
    },
  },

  {
    id: 'js-classes-modules',
    category: 'JavaScript Advanced',
    title: 'Classes & Modules',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'ES6 classes provide a clean syntax for object-oriented programming. They are syntactic sugar over JavaScript\'s prototype-based inheritance.',
      'extends creates inheritance. super() calls the parent constructor. Override parent methods to customise behaviour in child classes.',
      'static methods belong to the class itself, not instances. Call them as ClassName.method() not new ClassName().method().',
      'ES6 modules use export/import for code organisation. Named exports: export const x = 1. Default export: export default MyClass. Import: import MyClass from "./file.js".',
    ],
    syntax: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks!  Woof!\`; }
}

const dog = new Dog("Buddy");
dog.speak();  // "Buddy barks! Woof!"

// Static
Animal.create("Cat");`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; margin: 8px 0; }
    .badge { background: #3b82f6; color: white; padding: 2px 10px; border-radius: 999px; font-size: 11px; }
    .gold { background: #f59e0b; }
    button { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 4px; }
  </style>
</head>
<body>
  <h1>JavaScript Classes</h1>
  <div id="output"></div>
  <button onclick="runDemo()">Run Class Demo</button>

  <script>
    // Base class
    class Student {
      #password;  // Private field (ES2022)

      constructor(name, rollNo, marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
        this.#password = \`\${name}@\${rollNo}\`;
      }

      get grade() {
        if (this.marks >= 90) return "A+";
        if (this.marks >= 80) return "A";
        if (this.marks >= 70) return "B";
        return "C";
      }

      toString() {
        return \`\${this.name} (Roll: \${this.rollNo}) — \${this.marks}/100 [\${this.grade}]\`;
      }

      // Static factory method
      static fromData({ name, rollNo, marks }) {
        return new Student(name, rollNo, marks);
      }
    }

    // Subclass
    class ScholarStudent extends Student {
      constructor(name, rollNo, marks, scholarship) {
        super(name, rollNo, marks);
        this.scholarship = scholarship;
      }

      toString() {
        return super.toString() + \` 🏆 Scholar: \${this.scholarship}\`;
      }
    }

    function runDemo() {
      const s1 = new Student("Priya", 101, 92);
      const s2 = Student.fromData({ name: "Rahul", rollNo: 102, marks: 78 });
      const s3 = new ScholarStudent("Sneha", 103, 96, "Merit ₹10,000");

      const students = [s1, s2, s3];
      const avg = students.reduce((sum, s) => sum + s.marks, 0) / students.length;

      document.getElementById('output').innerHTML = \`
        \${students.map(s => \`
          <div class="card">
            \${s.toString()}
            <span class="badge \${s.grade === 'A+' ? 'gold' : ''}">\${s.grade}</span>
          </div>
        \`).join('')}
        <div class="card"><strong>Class Average:</strong> \${avg.toFixed(1)}</div>
      \`;
    }
    runDemo();
  </script>
</body>
</html>`,
    practice: {
      title: 'Library Management System',
      description: `Build a mini library system using classes:

class Book { constructor(title, author, year, copies) }
class Library {
  addBook(book)
  borrowBook(title) → decreases copies, throws if out of stock
  returnBook(title) → increases copies
  search(query) → returns books matching title or author
  get totalBooks() → total number of book titles
}

Demo: add 3 books, borrow one, return it, show search results`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; }
    .book { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 10px; margin: 6px 0; border-radius: 0 8px 8px 0; }
    .log { background: #1e293b; color: #10b981; padding: 10px; border-radius: 8px; font-family: monospace; margin: 6px 0; }
  </style>
</head>
<body>
  <h1>📚 Library System</h1>
  <div id="output"></div>
  <script>
    class Book {
      constructor(title, author, year, copies = 1) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.copies = copies;
      }
      toString() { return \`"\${this.title}" by \${this.author} (\${this.year}) — \${this.copies} copies\`; }
    }

    class Library {
      constructor() { this.books = []; }
      // Add methods: addBook, borrowBook, returnBook, search
    }

    const lib = new Library();
    lib.addBook(new Book("Python Crash Course", "Eric Matthes", 2019, 3));
    lib.addBook(new Book("Clean Code", "Robert Martin", 2008, 2));
    lib.addBook(new Book("Automate the Boring Stuff", "Al Sweigart", 2015, 1));

    const logs = [];
    lib.borrowBook("Clean Code");
    logs.push("Borrowed: Clean Code");
    lib.returnBook("Clean Code");
    logs.push("Returned: Clean Code");

    document.getElementById('output').innerHTML = \`
      <h2>All Books (\${lib.totalBooks})</h2>
      \${lib.books.map(b => \`<div class="book">\${b}</div>\`).join('')}
      <h2>Search "python"</h2>
      \${lib.search("python").map(b => \`<div class="book">\${b}</div>\`).join('')}
      <h2>Activity Log</h2>
      \${logs.map(l => \`<div class="log">\${l}</div>\`).join('')}
    \`;
  </script>
</body>
</html>`,
      hint: 'borrowBook: find book by title, check copies > 0, copies--. returnBook: find book, copies++. search: filter where title or author includes query (lowercase).',
    },
  },

  {
    id: 'js-local-storage',
    category: 'JavaScript Advanced',
    title: 'localStorage & State Management',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'localStorage allows JavaScript apps to persist data between sessions. Data survives tab close and browser restart. sessionStorage is similar but data is lost when tab closes.',
      'Both have the same API: setItem(key, value), getItem(key), removeItem(key), clear(). Values are always strings — use JSON.stringify and JSON.parse for objects.',
      'Custom events and state management patterns keep the UI in sync with stored data. When data changes, update both localStorage and the DOM.',
      'Common patterns: auto-save (store on every input event), hydration (load from localStorage on page start), undo/redo (store history array).',
    ],
    syntax: `// Save (always stringify objects)
localStorage.setItem('user', JSON.stringify({ name: 'Priya', score: 92 }));

// Load (always parse objects)
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Check if exists
if (localStorage.getItem('user')) { ... }

// Clear all
localStorage.clear();`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 500px; }
    .section { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 12px 0; }
    input, textarea { width: 100%; padding: 8px; border: 2px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; margin: 4px 0; }
    button { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 3px; }
    .danger { background: #ef4444; }
    .todo-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #e2e8f0; }
    .todo-item input[type=checkbox] { width: auto; }
    .done { text-decoration: line-through; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>📝 Persistent To-Do List</h1>
  <div class="section">
    <input type="text" id="todo-input" placeholder="Add a study task..." onkeyup="if(event.key==='Enter')addTodo()">
    <button onclick="addTodo()">+ Add</button>
  </div>
  <div id="todo-list"></div>
  <button class="danger" onclick="clearAll()">Clear All</button>
  <p id="stats" style="color:#64748b;margin-top:10px;font-size:14px"></p>

  <script>
    const STORAGE_KEY = 'syllab_todos';

    function loadTodos() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
    function saveTodos(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    function addTodo() {
      const input = document.getElementById('todo-input');
      const text = input.value.trim();
      if (!text) return;
      const todos = loadTodos();
      todos.push({ id: Date.now(), text, done: false });
      saveTodos(todos);
      input.value = '';
      render();
    }

    function toggleTodo(id) {
      const todos = loadTodos().map(t => t.id === id ? { ...t, done: !t.done } : t);
      saveTodos(todos);
      render();
    }

    function deleteTodo(id) {
      saveTodos(loadTodos().filter(t => t.id !== id));
      render();
    }

    function clearAll() {
      localStorage.removeItem(STORAGE_KEY);
      render();
    }

    function render() {
      const todos = loadTodos();
      const doneCount = todos.filter(t => t.done).length;
      document.getElementById('stats').textContent =
        \`\${todos.length} tasks · \${doneCount} completed · \${todos.length - doneCount} remaining\`;
      document.getElementById('todo-list').innerHTML = todos.length
        ? todos.map(t => \`
          <div class="todo-item">
            <input type="checkbox" \${t.done ? 'checked' : ''}
              onchange="toggleTodo(\${t.id})">
            <span class="\${t.done ? 'done' : ''}" style="flex:1">\${t.text}</span>
            <button class="danger" onclick="deleteTodo(\${t.id})" style="padding:2px 8px">✕</button>
          </div>\`).join('')
        : '<p style="color:#94a3b8">No tasks yet. Add one above!</p>';
    }

    render(); // Load on startup
  </script>
</body>
</html>`,
    practice: {
      title: 'Score Tracker Game',
      description: `Build a quiz score tracker that persists:
- 3 simple questions with 4 options each (Python facts)
- Track correct answers and score
- Save score + name to localStorage
- Show a leaderboard of past scores (up to 5 best)
- "Reset Leaderboard" button to clear all

On page load: show leaderboard from localStorage`,
      startCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; padding: 20px; max-width: 500px; }
    .question { background: #f8fafc; border-radius: 12px; padding: 16px; margin: 12px 0; }
    button { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 4px; }
    .option { display: block; width: 100%; text-align: left; background: #e2e8f0; color: #1e293b; margin: 4px 0; }
    .option.correct { background: #10b981; color: white; }
    .option.wrong { background: #ef4444; color: white; }
    .leaderboard { background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 15px; }
  </style>
</head>
<body>
  <h1>🧠 Python Quiz</h1>
  <div id="quiz"></div>
  <div id="leaderboard" class="leaderboard"></div>
  <script>
    const QUESTIONS = [
      { q: "What is the output of print(2**3)?", options: ["6","8","9","16"], correct: 1 },
      { q: "Which keyword is used for functions?", options: ["func","def","function","lambda"], correct: 1 },
      { q: "What does len([1,2,3]) return?", options: ["2","3","4","1"], correct: 1 },
    ];
    // Implement: render quiz, check answers, save score, show leaderboard
  </script>
</body>
</html>`,
      hint: 'Save leaderboard as JSON array. On correct answer, increment score. After quiz, push { name, score, date } and sort by score descending, keep top 5.',
    },
  },

  // ── Error Handling ────────────────────────────────────────────────────────────
  {
    id: 'js-error-handling',
    category: 'JavaScript Fundamentals',
    title: 'Error Handling — try/catch/finally & Custom Errors',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'JavaScript errors, if unhandled, crash the script and show confusing messages to users. Error handling with try/catch lets you gracefully manage failures and provide helpful feedback.',
      'try block contains code that might fail. catch(error) runs if an error occurs — error.message gives the description, error.name gives the type, error.stack gives the call trace. finally runs regardless of success or failure.',
      'Custom Error classes extend the built-in Error class, letting you create domain-specific errors with meaningful names (ValidationError, NetworkError, AuthError). This makes debugging much easier.',
      'Promise rejection and async errors: for async/await code, wrap in try/catch. For .then() chains, add .catch(). Unhandled promise rejections in Node.js cause the process to crash.',
    ],
    syntax: `try {
    // code that might throw
    const result = riskyOperation();
} catch (error) {
    console.error(error.message);  // what went wrong
    console.error(error.name);     // Error, TypeError, etc.
} finally {
    // always runs (cleanup)
    cleanup();
}

// Custom error:
class ValidationError extends Error {
    constructor(msg) { super(msg); this.name = 'ValidationError'; }
}`,
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .result { padding: 12px; border-radius: 8px; margin: 8px 0; }
    .success { background: #d1fae5; border: 1px solid #6ee7b7; color: #065f46; }
    .error   { background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; }
    .warning { background: #fef3c7; border: 1px solid #fcd34d; color: #78350f; }
    input, button { padding: 8px 12px; margin: 4px; border-radius: 6px; border: 1px solid #ccc; }
    button { background: #4f46e5; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <h2>🛡️ Error Handling Demo</h2>
  <div>
    <input id="age" type="text" placeholder="Enter age" />
    <input id="score" type="text" placeholder="Enter score (0-100)" />
    <button onclick="validateInput()">Validate</button>
  </div>
  <div id="output"></div>

  <script>
    // Custom error classes
    class ValidationError extends Error {
      constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
      }
    }

    class RangeError extends Error {
      constructor(message, min, max, actual) {
        super(message);
        this.name = 'RangeError';
        this.min = min; this.max = max; this.actual = actual;
      }
    }

    function validateAge(age) {
      const num = parseInt(age);
      if (isNaN(num)) throw new ValidationError('Age must be a number', 'age');
      if (num < 5 || num > 100)
        throw new RangeError(\`Age must be 5-100, got \${num}\`, 5, 100, num);
      return num;
    }

    function validateScore(score) {
      const num = parseFloat(score);
      if (isNaN(num)) throw new ValidationError('Score must be a number', 'score');
      if (num < 0 || num > 100)
        throw new RangeError(\`Score must be 0-100, got \${num}\`, 0, 100, num);
      return num;
    }

    function validateInput() {
      const output = document.getElementById('output');
      output.innerHTML = '';
      const ageInput = document.getElementById('age').value;
      const scoreInput = document.getElementById('score').value;

      // Age validation
      try {
        const age = validateAge(ageInput);
        output.innerHTML += \`<div class="result success">✅ Age: \${age} is valid</div>\`;
      } catch (e) {
        if (e instanceof ValidationError) {
          output.innerHTML += \`<div class="result error">❌ Validation: \${e.message} (field: \${e.field})</div>\`;
        } else if (e instanceof RangeError) {
          output.innerHTML += \`<div class="result warning">⚠️ Range: \${e.message}</div>\`;
        } else {
          output.innerHTML += \`<div class="result error">💥 Unexpected: \${e.message}</div>\`;
        }
      }

      // Score validation
      try {
        const score = validateScore(scoreInput);
        const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : 'C';
        output.innerHTML += \`<div class="result success">✅ Score: \${score} → Grade: \${grade}</div>\`;
      } catch (e) {
        output.innerHTML += \`<div class="result error">❌ Score error: \${e.message}</div>\`;
      } finally {
        // always runs — good for cleanup
        const timestamp = new Date().toLocaleTimeString();
        output.innerHTML += \`<div class="result" style="background:#f8f8f8">🕐 Validated at \${timestamp}</div>\`;
      }
    }
  </script>
</body>
</html>`,
    output: 'Interactive error handling form with custom validation errors',
    notes: [
      'instanceof checks the error type — essential for handling different errors differently (retry for NetworkError, show form hints for ValidationError).',
      'window.onerror and window.addEventListener("unhandledrejection") catch uncaught errors globally — good for logging to error tracking services (Sentry, LogRocket).',
      'In production apps, never show raw error messages to users (security risk). Log them server-side and show friendly messages in the UI.',
    ],
    practice: {
      title: 'Form Validator with Error Classes',
      description: 'Create a registration form validator with custom errors. Validate: username (3-20 chars, only letters/numbers), email (must contain @), password (min 8 chars, must have number). Display specific error messages for each field.',
      startCode: `<!DOCTYPE html>
<html>
<body>
  <input id="username" placeholder="Username" />
  <input id="email" placeholder="Email" />
  <input id="password" type="password" placeholder="Password" />
  <button onclick="register()">Register</button>
  <div id="result"></div>
  <script>
    class FieldError extends Error {
      constructor(msg, field) {
        super(msg);
        this.name = 'FieldError';
        this.field = field;
      }
    }

    function validateForm(username, email, password) {
      // YOUR CODE: validate each field, throw FieldError if invalid
      if (username.length < 3) throw new FieldError('...', 'username');
      // Add more validations...
    }

    function register() {
      const u = document.getElementById('username').value;
      const e = document.getElementById('email').value;
      const p = document.getElementById('password').value;
      const result = document.getElementById('result');
      try {
        validateForm(u, e, p);
        result.textContent = '✅ Registration successful!';
        result.style.color = 'green';
      } catch (err) {
        result.textContent = \`❌ \${err.field}: \${err.message}\`;
        result.style.color = 'red';
      }
    }
  </script>
</body>
</html>`,
      hint: 'For email: if (!email.includes("@")) throw new FieldError("Invalid email format", "email"). For password number: if (!/\\d/.test(password)) throw new FieldError("Must contain a number", "password").',
    },
  },

  // ── Fetch API & REST ──────────────────────────────────────────────────────────
  {
    id: 'js-fetch-api',
    category: 'JavaScript Advanced',
    title: 'Fetch API — Making HTTP Requests',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'The Fetch API is the modern way to make HTTP requests in JavaScript. It returns Promises, works with async/await, and replaces the older XMLHttpRequest. Used to load data from APIs, send form data, and interact with backends.',
      'HTTP methods: GET (retrieve data), POST (create), PUT/PATCH (update), DELETE (remove). REST APIs follow these conventions. Most public APIs return JSON data.',
      'Error handling: fetch() only rejects on network failure (no internet). For HTTP errors (404, 500), the promise RESOLVES but response.ok is false. Always check both: network catch AND response.ok.',
      'Headers and request options: set Content-Type for POST requests, Authorization for authenticated APIs, and body for request data. JSON.stringify() converts JavaScript objects to JSON for sending.',
    ],
    syntax: `// GET request:
const res = await fetch('https://api.example.com/data');
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();

// POST request:
const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Arjun', marks: 92 })
});`,
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; }
    .card { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 12px; padding: 16px; margin: 8px 0; }
    .loading { color: #6c757d; font-style: italic; }
    .error { color: #dc3545; }
    button { background: #0d6efd; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 4px; }
    button:hover { background: #0b5ed7; }
    #status { font-size: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <h2>🌐 Fetch API Demo</h2>
  <p id="status">Ready</p>

  <div>
    <button onclick="fetchUser()">Get Random User</button>
    <button onclick="fetchJoke()">Get a Joke</button>
    <button onclick="fetchPost()">Fetch a Post</button>
  </div>
  <div id="output"></div>

  <script>
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    function setLoading(msg) {
      status.textContent = msg;
      output.innerHTML = '<p class="loading">⏳ Loading...</p>';
    }

    // Fetch a random user from JSONPlaceholder API
    async function fetchUser() {
      const userId = Math.floor(Math.random() * 10) + 1;
      setLoading(\`Fetching user #\${userId}...\`);

      try {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);

        if (!response.ok) {
          throw new Error(\`HTTP Error: \${response.status} \${response.statusText}\`);
        }

        const user = await response.json();

        output.innerHTML = \`
          <div class="card">
            <h3>👤 \${user.name}</h3>
            <p>📧 \${user.email}</p>
            <p>🏙️ \${user.address.city}</p>
            <p>🌐 \${user.website}</p>
            <p>🏢 \${user.company.name}</p>
          </div>
        \`;
        status.textContent = \`Loaded user #\${userId} successfully\`;
      } catch (err) {
        output.innerHTML = \`<p class="error">❌ \${err.message}</p>\`;
        status.textContent = 'Request failed';
      }
    }

    // Fetch a dad joke
    async function fetchJoke() {
      setLoading('Fetching a joke...');
      try {
        const res = await fetch('https://icanhazdadjoke.com/', {
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();
        output.innerHTML = \`
          <div class="card" style="text-align:center; font-size:18px;">
            😂 \${data.joke}
          </div>
        \`;
        status.textContent = 'Joke loaded!';
      } catch (err) {
        output.innerHTML = \`<p class="error">❌ \${err.message}</p>\`;
      }
    }

    // Fetch a blog post
    async function fetchPost() {
      const postId = Math.floor(Math.random() * 100) + 1;
      setLoading(\`Fetching post #\${postId}...\`);
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(\`https://jsonplaceholder.typicode.com/posts/\${postId}\`),
          fetch(\`https://jsonplaceholder.typicode.com/posts/\${postId}/comments\`)
        ]);
        const post = await postRes.json();
        const comments = await commentsRes.json();
        output.innerHTML = \`
          <div class="card">
            <h3>\${post.title}</h3>
            <p>\${post.body}</p>
            <p style="color:#6c757d">💬 \${comments.length} comments</p>
          </div>
        \`;
        status.textContent = \`Post #\${postId} loaded (\${comments.length} comments)\`;
      } catch (err) {
        output.innerHTML = \`<p class="error">❌ \${err.message}</p>\`;
      }
    }
  </script>
</body>
</html>`,
    output: 'Interactive Fetch API demo that loads real data from public APIs',
    notes: [
      'Promise.all([fetch1, fetch2]) makes both requests simultaneously — much faster than sequential awaits.',
      'AbortController lets you cancel pending requests: const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort().',
      'For authentication: add Authorization header: headers: { Authorization: "Bearer " + token }. Never expose API keys in client-side JavaScript.',
    ],
    practice: {
      title: 'Student API Dashboard',
      description: 'Build a mini dashboard that fetches from JSONPlaceholder: when the page loads, fetch all users (https://jsonplaceholder.typicode.com/users). Show each user as a card with name and email. On click of a user card, fetch their posts and show count. Add a search box to filter by name.',
      startCode: `<!DOCTYPE html>
<html>
<body>
  <input id="search" placeholder="Search users..." oninput="filterUsers()" style="padding:8px;margin:8px;width:200px" />
  <div id="users"></div>
  <div id="detail"></div>
  <script>
    let allUsers = [];

    async function loadUsers() {
      // YOUR CODE: fetch from https://jsonplaceholder.typicode.com/users
      // store in allUsers, call renderUsers()
    }

    function renderUsers(users) {
      const div = document.getElementById('users');
      div.innerHTML = users.map(u => \`
        <div onclick="loadPosts(\${u.id})" style="border:1px solid #ccc;padding:12px;margin:6px;border-radius:8px;cursor:pointer">
          <b>\${u.name}</b><br/><small>\${u.email}</small>
        </div>
      \`).join('');
    }

    async function loadPosts(userId) {
      // YOUR CODE: fetch posts for this user and show count
    }

    function filterUsers() {
      const q = document.getElementById('search').value.toLowerCase();
      renderUsers(allUsers.filter(u => u.name.toLowerCase().includes(q)));
    }

    loadUsers();
  </script>
</body>
</html>`,
      hint: 'fetch("https://jsonplaceholder.typicode.com/users").then(r=>r.json()).then(users => { allUsers = users; renderUsers(users); }). For posts: fetch posts/${userId}/posts.',
    },
  },

  // ── Regular Expressions ───────────────────────────────────────────────────────
  {
    id: 'js-regex',
    category: 'JavaScript Fundamentals',
    title: 'Regular Expressions — Pattern Matching',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Regular Expressions (regex) are patterns used to match, search, and manipulate text. In JavaScript, regex literals are written between forward slashes: /pattern/flags.',
      'Core syntax: . (any character), * (0 or more), + (1 or more), ? (0 or 1), ^ (start), $ (end), [abc] (character class), [^abc] (not), \\d (digit), \\w (word char), \\s (whitespace), {n,m} (repeat n to m times).',
      'Flags: g (global — find all matches), i (case-insensitive), m (multiline). Methods: test() (returns boolean), match() (returns array), replace() (substitute), split() (divide by pattern), exec() (iterative matching).',
      'Common use cases: form validation (email, phone, password), data extraction (find all URLs in text), text formatting (add spaces to phone numbers), sanitisation (remove HTML tags).',
    ],
    syntax: `// Create regex:
const re = /pattern/flags;     // literal
const re = new RegExp("pat");  // constructor

// Test:
/\\d+/.test("abc123")    // → true

// Match:
"hello".match(/[aeiou]/g)   // → ['e', 'o']

// Replace:
"a1b2".replace(/\\d/g, '#') // → "a#b#"`,
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .demo { background: #f8f9fa; border-radius: 8px; padding: 12px; margin: 8px 0; }
    .match { background: #ffd700; padding: 0 2px; border-radius: 2px; }
    input, textarea { padding: 8px; width: 100%; margin: 4px 0; border: 1px solid #ccc; border-radius: 6px; }
    button { background: #4f46e5; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; margin: 4px; }
    .ok { color: #16a34a; } .fail { color: #dc2626; }
  </style>
</head>
<body>
  <h2>🔍 Regex Pattern Matcher</h2>

  <!-- Form Validator -->
  <div class="demo">
    <h3>✅ Form Validation</h3>
    <input id="email" placeholder="Enter email" oninput="validateAll()" />
    <input id="phone" placeholder="Enter Indian phone (10 digits)" oninput="validateAll()" />
    <input id="pincode" placeholder="Enter PIN code (6 digits)" oninput="validateAll()" />
    <div id="validation-result"></div>
  </div>

  <!-- Text Search -->
  <div class="demo">
    <h3>🔎 Find & Highlight</h3>
    <textarea id="text" rows="3" placeholder="Type some text here...">India launched ISRO mission on 2023-08-14. Contact: info@isro.gov.in or call +91-9876543210. Visit https://isro.gov.in for details.</textarea>
    <button onclick="findEmails()">Find Emails</button>
    <button onclick="findDates()">Find Dates</button>
    <button onclick="findURLs()">Find URLs</button>
    <button onclick="findPhones()">Find Phones</button>
    <div id="search-result"></div>
  </div>

  <script>
    const PATTERNS = {
      email: /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i,
      phone: /^[6-9]\\d{9}$/,
      pincode: /^\\d{6}$/
    };

    function validateAll() {
      const checks = [
        { id: 'email',   label: 'Email',    pat: PATTERNS.email },
        { id: 'phone',   label: 'Phone',    pat: PATTERNS.phone },
        { id: 'pincode', label: 'PIN Code', pat: PATTERNS.pincode }
      ];

      let html = '';
      checks.forEach(({ id, label, pat }) => {
        const val = document.getElementById(id).value;
        if (!val) return;
        const ok = pat.test(val);
        html += \`<span class="\${ok ? 'ok' : 'fail'}">\${ok ? '✅' : '❌'} \${label}: \${val}</span>  \`;
      });
      document.getElementById('validation-result').innerHTML = html;
    }

    function highlight(text, regex) {
      const matches = text.match(regex) || [];
      const highlighted = text.replace(regex, m => \`<mark class="match">\${m}</mark>\`);
      return { highlighted, count: matches.length, matches };
    }

    function findEmails() {
      const text = document.getElementById('text').value;
      const { highlighted, matches } = highlight(text, /[\\w.-]+@[\\w.-]+\\.[a-z]{2,}/gi);
      document.getElementById('search-result').innerHTML =
        \`<p>Found <b>\${matches.length}</b> email(s): \${matches.join(', ')}</p>\${highlighted}\`;
    }

    function findDates() {
      const text = document.getElementById('text').value;
      const { highlighted, matches } = highlight(text, /\\d{4}-\\d{2}-\\d{2}/g);
      document.getElementById('search-result').innerHTML =
        \`<p>Found <b>\${matches.length}</b> date(s): \${matches.join(', ')}</p>\${highlighted}\`;
    }

    function findURLs() {
      const text = document.getElementById('text').value;
      const { highlighted, matches } = highlight(text, /https?:\\/\\/[\\w./-]+/g);
      document.getElementById('search-result').innerHTML =
        \`<p>Found <b>\${matches.length}</b> URL(s)</p>\${highlighted}\`;
    }

    function findPhones() {
      const text = document.getElementById('text').value;
      const { highlighted, matches } = highlight(text, /\\+?91[\\s-]?[6-9]\\d{9}|[6-9]\\d{9}/g);
      document.getElementById('search-result').innerHTML =
        \`<p>Found <b>\${matches.length}</b> phone(s): \${matches.join(', ')}</p>\${highlighted}\`;
    }
  </script>
</body>
</html>`,
    output: 'Interactive regex demo with form validation and text pattern highlighting',
    notes: [
      'Regex101.com is the best tool for testing and debugging regex patterns — paste your pattern and test string for instant visual feedback.',
      'Lookahead (?=...) and lookbehind (?<=...) are zero-width assertions — they match positions, not characters: /\\d+(?= rupees)/ matches "100" in "100 rupees".',
      'For complex validation, consider using a validation library (Zod, Yup, Joi) instead of raw regex — they give better error messages and are easier to maintain.',
    ],
    practice: {
      title: 'Aadhaar & PAN Validator',
      description: 'Build a validator for Indian ID formats. Aadhaar: exactly 12 digits, can be space-separated in groups of 4 (e.g., "1234 5678 9012"). PAN: 5 uppercase letters + 4 digits + 1 uppercase letter (e.g., ABCDE1234F). Validate both and show results.',
      startCode: `<!DOCTYPE html>
<html>
<body>
  <input id="aadhaar" placeholder="Aadhaar (12 digits or XXXX XXXX XXXX)" />
  <input id="pan" placeholder="PAN (ABCDE1234F)" />
  <button onclick="validate()">Validate</button>
  <div id="result"></div>
  <script>
    // YOUR CODE: regex patterns
    const AADHAAR_RE = /YOUR_PATTERN/;
    const PAN_RE = /YOUR_PATTERN/;

    function validate() {
      const aadhaar = document.getElementById('aadhaar').value.trim();
      const pan = document.getElementById('pan').value.trim();
      let html = '';
      html += AADHAAR_RE.test(aadhaar) ? '✅ Valid Aadhaar' : '❌ Invalid Aadhaar';
      html += '<br>';
      html += PAN_RE.test(pan) ? '✅ Valid PAN' : '❌ Invalid PAN';
      document.getElementById('result').innerHTML = html;
    }
  </script>
</body>
</html>`,
      hint: 'Aadhaar: /^\\d{4}\\s?\\d{4}\\s?\\d{4}$/ allows optional spaces. PAN: /^[A-Z]{5}\\d{4}[A-Z]$/ — 5 uppercase, 4 digits, 1 uppercase.',
    },
  },

  // ── ES6+ Modern JavaScript ────────────────────────────────────────────────────
  {
    id: 'js-es6-modern',
    category: 'JavaScript Advanced',
    title: 'Modern JavaScript — ES6+ Features Every Dev Must Know',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'ES6 (2015) and later versions (ES7, ES8, ES2020...) introduced powerful features that make JavaScript much more concise and readable. Modern JS is nearly unrecognisable from the code written in 2010.',
      'Destructuring: extract values from arrays and objects into named variables in one line. Spread operator (...): expand arrays/objects. Rest parameters: collect remaining arguments into an array.',
      'Optional chaining (?.) safely accesses nested properties without null checks. Nullish coalescing (??) provides a default only for null/undefined (unlike || which also triggers for 0, "", false).',
      'Tagged template literals let functions process template strings. Computed property names dynamically create object keys. Symbol creates unique identifiers. WeakMap/WeakSet for memory-efficient mappings.',
    ],
    syntax: `// Destructuring:
const { name, age = 18 } = user;          // object (with default)
const [first, , third] = arr;              // array (skip element)

// Spread & Rest:
const merged = { ...obj1, ...obj2 };      // spread
function sum(...nums) { }                  // rest params

// Optional chaining & nullish coalescing:
const city = user?.address?.city ?? 'Unknown';`,
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a2e; color: #eee; }
    .section { background: #16213e; border-radius: 8px; padding: 14px; margin: 10px 0; }
    .label { color: #0f3460; background: #e94560; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    pre { margin: 8px 0; color: #a8ff78; }
  </style>
</head>
<body>
  <h2 style="color:#e94560">⚡ Modern JavaScript Features</h2>
  <div id="output"></div>
  <script>
    const out = [];
    const log = (label, content) => {
      out.push(\`<div class="section"><span class="label">\${label}</span><pre>\${JSON.stringify(content, null, 2)}</pre></div>\`);
    };

    // 1. Destructuring
    const student = { name: 'Arjun', marks: { maths: 92, science: 88 }, hobbies: ['cricket', 'coding'] };
    const { name, marks: { maths, science }, hobbies: [hobby1] } = student;
    log('Destructuring', { name, maths, science, hobby1 });

    // 2. Spread operator
    const class10 = ['Arjun', 'Priya', 'Rahul'];
    const class11 = ['Sneha', 'Vikram'];
    const allStudents = [...class10, 'NEW', ...class11];
    const updatedStudent = { ...student, marks: { ...student.marks, english: 79 } };
    log('Spread', { allStudents, updatedMarks: updatedStudent.marks });

    // 3. Rest parameters
    function topN(n, ...scores) {
      return scores.sort((a,b) => b-a).slice(0, n);
    }
    log('Rest Params', { top3: topN(3, 78, 92, 65, 88, 72, 95, 60) });

    // 4. Optional chaining & nullish coalescing
    const users = [
      { name: 'Arjun', address: { city: 'Delhi', pin: '110001' } },
      { name: 'Priya' },  // no address!
      null
    ];
    const cities = users.map(u => u?.address?.city ?? 'Unknown');
    log('Optional Chaining (?.) & Nullish (??)', cities);

    // 5. Computed property names
    const subjects = ['maths', 'science', 'english'];
    const scores = [92, 88, 79];
    const reportCard = Object.fromEntries(subjects.map((s, i) => [s, scores[i]]));
    log('Object.fromEntries', reportCard);

    // 6. Array methods (ES6+)
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    log('Array Methods', {
      flat: [[1,2],[3,4],[5]].flat(),
      findIndex: data.findIndex(x => x > 7),
      at: data.at(-1),          // last element
      includes: data.includes(7)
    });

    // 7. String methods
    log('String Methods', {
      padStart: '42'.padStart(5, '0'),      // "00042"
      trimStart: '  hello  '.trimStart(),
      replaceAll: 'a,b,a,c'.replaceAll('a', 'X')
    });

    document.getElementById('output').innerHTML = out.join('');
  </script>
</body>
</html>`,
    output: 'Interactive demo showing all modern ES6+ JavaScript features',
    notes: [
      'Object.entries() converts an object to [key, value] pairs. Object.fromEntries() does the reverse. Essential for data transformation.',
      'Proxy and Reflect (ES6): intercept and customise object operations. Used by Vue.js for reactivity and validation libraries.',
      'BigInt (ES2020): handles integers larger than Number.MAX_SAFE_INTEGER: const big = 9007199254740991n + 1n — the n suffix creates a BigInt.',
    ],
    practice: {
      title: 'Data Transformer',
      description: 'Using modern JS features, transform this data: students = [{id:1,name:"Arjun",marks:{m:92,s:88,e:75}},{id:2,name:"Priya",marks:{m:85,s:95,e:88}}]. (1) Use destructuring to extract each student\'s marks. (2) Use spread to add a "total" field. (3) Use optional chaining for a "city" field that may not exist. (4) Sort by total using Array.sort().',
      startCode: `<!DOCTYPE html>
<html>
<body>
  <div id="result"></div>
  <script>
    const students = [
      {id:1, name:"Arjun", marks:{m:92, s:88, e:75}},
      {id:2, name:"Priya", marks:{m:85, s:95, e:88}},
      {id:3, name:"Rahul", marks:{m:72, s:68, e:80}},
    ];

    // YOUR CODE:
    // 1. Destructure marks and add total using spread
    const enriched = students.map(student => {
      const { name, marks: { m, s, e }, address } = student;
      return {
        ...student,
        total: m + s + e,
        city: address?.city ?? 'Not provided'  // optional chaining
      };
    });

    // 2. Sort by total (highest first)
    const sorted = [...enriched].sort((a, b) => b.total - a.total);

    // 3. Display
    document.getElementById('result').innerHTML = sorted
      .map((s, i) => \`<p>#\${i+1} \${s.name}: \${s.total}/300 | City: \${s.city}</p>\`)
      .join('');
  </script>
</body>
</html>`,
      hint: 'The main patterns are shown. Try extending: add a rank property using the index, or use Array.at(-1) to get the lowest scorer.',
    },
  },

  // ── EXPANDED TOPICS ──────────────────────────────────────────────────────────

  {
    id: 'js-variables-let-const',
    category: 'Core Concepts',
    title: 'Variables: let, const & var',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '`var` is the old way to declare variables — it is function-scoped and hoisted (moved to the top internally). Avoid `var` in modern code.',
      '`let` is block-scoped. It can be reassigned but not re-declared in the same scope. Use `let` for values that change.',
      '`const` is block-scoped. It CANNOT be reassigned. Use `const` by default — change to `let` only when needed. `const` for objects/arrays doesn\'t make the contents immutable, just the binding.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Variables: let, const, var</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;"></div>
<script>
const log = s => document.getElementById('out').innerHTML += s + '<br>';

// const — cannot reassign
const PI = 3.14159;
log('PI = ' + PI);

// let — can reassign
let score = 100;
log('Initial score: ' + score);
score = 150;
log('Updated score: ' + score);

// Block scope
{
  let blockVar = 'I am inside a block';
  log(blockVar);
}
// log(blockVar); // ❌ Error: blockVar is not defined here

// const with object
const user = { name: 'Arjun', age: 16 };
user.age = 17; // ✅ OK — we're changing a property
log('User age: ' + user.age);
</script></body></html>`,
    practice: {
      title: 'Variables Practice',
      description: 'Create a program that declares your name with const, your score with let. Then update the score to 95 and display both using template literals.',
      startCode: '',
      solution: 'const name = "Arjun";\nlet score = 80;\nscore = 95;\nconsole.log(`${name} scored ${score}`);',
      hint: 'Use const for name (it won\'t change), let for score (it changes). Template literals use backticks.',
    },
  },

  {
    id: 'js-operators-all',
    category: 'Core Concepts',
    title: 'JavaScript Operators',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Arithmetic: + - * / % ** (exponent). Modulo (%) gives remainder: 10 % 3 = 1.',
      'Comparison: == (loose equal, ignores type), === (strict equal, checks type too). Always use ===. != loose, !== strict.',
      'Logical: && (AND), || (OR), ! (NOT). Short-circuit: a && b returns b if a is truthy, a if a is falsy.',
      'Assignment: = += -= *= /= **= ??= (nullish). Ternary: condition ? valueIfTrue : valueIfFalse.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>JS Operators</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Arithmetic
log('10 + 3 = ' + (10+3));
log('10 % 3 = ' + (10%3));   // remainder
log('2 ** 8 = ' + (2**8));   // power

// Comparison
log('5 == "5" : ' + (5=="5"));   // true (loose)
log('5 === "5": ' + (5==="5")); // false (strict)

// Logical
log('true && false: ' + (true && false));
log('true || false: ' + (true || false));
log('!true: ' + !true);

// Ternary
const age = 17;
const label = age >= 18 ? 'Adult' : 'Minor';
log('Label: ' + label);

// Nullish coalescing
const val = null ?? 'default';
log('null ?? "default": ' + val);
</script></body></html>`,
    practice: {
      title: 'Operators Practice',
      description: 'Write code that: checks if a number is even (using %), then uses ternary to display "Even" or "Odd". Test with numbers 14 and 7.',
      startCode: '',
      solution: '[14,7].forEach(n => console.log(n % 2 === 0 ? "Even" : "Odd"));',
      hint: 'Even: n % 2 === 0. Use ternary: condition ? "Even" : "Odd".',
    },
  },

  {
    id: 'js-strings-methods',
    category: 'Core Concepts',
    title: 'String Methods',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Strings in JS are immutable sequences of characters. Use single quotes, double quotes, or backticks (template literals).',
      'Key methods: `.length`, `.toUpperCase()`, `.toLowerCase()`, `.trim()` (remove spaces), `.split()`, `.join()`, `.includes()`, `.startsWith()`, `.endsWith()`.',
      'Slicing: `.slice(start, end)` — end not included. `.substring(start, end)` — similar. `.charAt(index)` or `str[index]`.',
      'Replace: `.replace(old, new)` — first occurrence only. `.replaceAll(old, new)` — all. `.repeat(n)` — repeat string n times.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>String Methods</h2>
<input id="inp" placeholder="Type something..." style="padding:8px;width:300px;border:1px solid #ccc;border-radius:6px">
<button onclick="analyze()" style="padding:8px 16px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:8px">Analyze</button>
<div id="out" style="margin-top:12px;font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
function analyze() {
  const str = document.getElementById('inp').value || 'Hello World';
  const out = document.getElementById('out');
  out.textContent = [
    'Original: ' + str,
    'Length: ' + str.length,
    'Upper: ' + str.toUpperCase(),
    'Lower: ' + str.toLowerCase(),
    'Trimmed: "' + str.trim() + '"',
    'Includes "World": ' + str.includes('World'),
    'Starts with "Hello": ' + str.startsWith('Hello'),
    'First 5 chars: ' + str.slice(0, 5),
    'Words: ' + str.split(' ').join(', '),
    'Reversed: ' + str.split('').reverse().join(''),
  ].join('\n');
}
analyze();
</script></body></html>`,
    practice: {
      title: 'String Manipulation',
      description: 'Write a function that takes a name (e.g., "  arjun sharma  "), trims spaces, capitalizes each word, and returns it.',
      startCode: '',
      solution: 'function capitalize(str) {\n  return str.trim().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");\n}\nconsole.log(capitalize("  arjun sharma  "));',
      hint: 'Chain: trim() → split(" ") → map(word → capitalize) → join(" ").',
    },
  },

  {
    id: 'js-arrays-basics',
    category: 'Core Concepts',
    title: 'Arrays',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Arrays store ordered lists of values. Created with `[]`. Access elements by index (0-based). `arr[0]` is first element.',
      'Mutating methods: `.push()` (add end), `.pop()` (remove end), `.unshift()` (add start), `.shift()` (remove start), `.splice()` (insert/remove at index).',
      'Non-mutating: `.slice()` (extract), `.concat()` (combine), `.indexOf()` (find index), `.includes()` (check existence).',
      '`arr.length` gives the count. Arrays can hold mixed types: `[1, "hello", true, {name: "Arjun"}]`.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>JavaScript Arrays</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

const fruits = ['apple', 'banana', 'mango'];
log('Array: ' + fruits);
log('Length: ' + fruits.length);
log('First: ' + fruits[0]);
log('Last: ' + fruits[fruits.length-1]);

fruits.push('orange');
log('After push: ' + fruits);

fruits.pop();
log('After pop: ' + fruits);

fruits.unshift('grapes');
log('After unshift: ' + fruits);

// Splice: remove 1 at index 1
fruits.splice(1, 1);
log('After splice(1,1): ' + fruits);

log('Includes mango: ' + fruits.includes('mango'));
log('Index of mango: ' + fruits.indexOf('mango'));
</script></body></html>`,
    practice: {
      title: 'Array Operations',
      description: 'Create an array of 5 subject names. Remove the last subject, add "Aptitude" to the beginning, then display the array and its length.',
      startCode: '',
      solution: 'const subjects = ["Maths","Science","English","Hindi","Social"];\nsubjects.pop();\nsubjects.unshift("Aptitude");\nconsole.log(subjects, subjects.length);',
      hint: 'pop() removes last element. unshift() adds to beginning.',
    },
  },

  {
    id: 'js-array-methods-functional',
    category: 'Core Concepts',
    title: 'Array Methods: map, filter, reduce',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '`.map(fn)` — creates a NEW array by applying fn to each element. Does not modify original.',
      '`.filter(fn)` — creates a NEW array with only elements where fn returns true.',
      '`.reduce(fn, initial)` — reduces array to a single value. fn receives (accumulator, currentValue).',
      '`.forEach(fn)` — like map but returns undefined (just runs side effects). `.find(fn)` — returns first matching element. `.every(fn)` / `.some(fn)` — all/any match.',
      '`.sort()` — sorts in-place. For numbers: `.sort((a,b) => a-b)` ascending.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Array Methods</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

const scores = [45, 78, 92, 55, 88, 34, 96];

const doubled = scores.map(s => s * 2);
log('Doubled: ' + doubled);

const passing = scores.filter(s => s >= 60);
log('Passing (≥60): ' + passing);

const total = scores.reduce((sum, s) => sum + s, 0);
log('Total: ' + total);
log('Average: ' + (total/scores.length).toFixed(1));

const highest = Math.max(...scores);
log('Highest: ' + highest);

const sorted = [...scores].sort((a,b) => a-b);
log('Sorted: ' + sorted);

const hasExcellent = scores.some(s => s >= 90);
log('Any ≥90? ' + hasExcellent);

const allPassed = scores.every(s => s >= 40);
log('All ≥40? ' + allPassed);
</script></body></html>`,
    practice: {
      title: 'Functional Array Methods',
      description: 'Given prices = [120, 85, 200, 65, 150]. Find: total price, prices above 100, and prices with 10% discount applied.',
      startCode: '',
      solution: 'const prices=[120,85,200,65,150];\nconsole.log(prices.reduce((s,p)=>s+p,0));\nconsole.log(prices.filter(p=>p>100));\nconsole.log(prices.map(p=>p*0.9));',
      hint: 'Use reduce() for total, filter() for >100, map() for discounts.',
    },
  },

  {
    id: 'js-objects',
    category: 'Core Concepts',
    title: 'Objects',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Objects store key-value pairs. Keys are strings (or Symbols), values can be any type including functions (then called methods).',
      'Access: `obj.key` (dot notation) or `obj["key"]` (bracket notation — useful with dynamic keys).',
      'Adding/updating: `obj.newKey = value`. Deleting: `delete obj.key`.',
      '`Object.keys(obj)` — array of keys. `Object.values(obj)` — array of values. `Object.entries(obj)` — array of [key,value] pairs.',
      'Spread to copy/merge: `const copy = {...original}`. `const merged = {...obj1, ...obj2}`.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>JavaScript Objects</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

const student = {
  name: 'Arjun',
  age: 16,
  class: 10,
  subjects: ['Maths', 'Science'],
  greet() {
    return \`Hi, I am \${this.name} from Class \${this.class}\`;
  }
};

log(student.greet());
log('Keys: ' + Object.keys(student));
log('Age: ' + student['age']);

student.score = 92;  // add new property
log('Score: ' + student.score);

// Destructuring
const { name, age, score } = student;
log(\`\${name}, age \${age}, score \${score}\`);

// Spread / copy
const clone = { ...student };
clone.name = 'Priya';
log('Original: ' + student.name);
log('Clone: ' + clone.name);
</script></body></html>`,
    practice: {
      title: 'Create an Object',
      description: 'Create a `product` object with name, price, category. Add a method `getInfo()` that returns a formatted string. Then make a discounted copy with 20% off.',
      startCode: '',
      solution: 'const product={name:"Pen",price:50,category:"Stationery",getInfo(){return `${this.name} (${this.category}): ₹${this.price}`}};\nconst discounted={...product,price:product.price*0.8};\nconsole.log(product.getInfo());\nconsole.log(discounted.price);',
      hint: 'Use ...spread to copy then override the price property.',
    },
  },

  {
    id: 'js-functions-deep',
    category: 'Core Concepts',
    title: 'Functions & Parameters',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Function declaration: `function name(params) { ... }` — hoisted, can be called before definition.',
      'Function expression: `const name = function(params) { ... }` — not hoisted.',
      'Arrow function: `const name = (params) => expression` — concise, no own `this`.',
      'Default parameters: `function greet(name="Student")` — used if argument is undefined.',
      'Rest parameters: `function sum(...nums)` — collects all arguments into an array.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Functions</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Function declaration
function greet(name = 'Student') {
  return \`Hello, \${name}!\`;
}
log(greet());
log(greet('Arjun'));

// Arrow function
const square = n => n * n;
log('Square of 7: ' + square(7));

// Rest parameters
function sum(...nums) {
  return nums.reduce((a,b) => a+b, 0);
}
log('Sum(1,2,3,4,5): ' + sum(1,2,3,4,5));

// Higher order functions
function applyTwice(fn, value) {
  return fn(fn(value));
}
log('applyTwice(square, 3): ' + applyTwice(square, 3));

// Immediately Invoked Function Expression (IIFE)
const result = (() => 'IIFE executed!')();
log(result);
</script></body></html>`,
    practice: {
      title: 'Function Practice',
      description: 'Write a function `calculateGrade(score)` that returns "A" (90+), "B" (80-89), "C" (70-79), "D" (60-69), or "F" (below 60).',
      startCode: '',
      solution: 'function calculateGrade(s){\n  if(s>=90)return"A";\n  if(s>=80)return"B";\n  if(s>=70)return"C";\n  if(s>=60)return"D";\n  return"F";\n}\nconsole.log(calculateGrade(85));',
      hint: 'Use if-else chain from highest score downward.',
    },
  },

  {
    id: 'js-loops-comprehensive',
    category: 'Core Concepts',
    title: 'Loops: for, while, for...of',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '`for` loop: `for(let i=0; i<n; i++)` — best when you know how many times to iterate.',
      '`while` loop: `while(condition)` — best when condition-based, number of iterations unknown.',
      '`do...while`: Runs at least once, then checks condition.',
      '`for...of`: Iterates over iterable values (arrays, strings). `for (const item of array)`.',
      '`for...in`: Iterates over object KEYS. `break` exits loop early. `continue` skips to next iteration.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>JavaScript Loops</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// for loop - multiplication table
log('=== 3 × table ===');
for (let i = 1; i <= 5; i++) {
  log(\`3 × \${i} = \${3*i}\`);
}

// for...of — iterate array values
const fruits = ['🍎', '🍌', '🥭'];
log('\n=== for...of ===');
for (const fruit of fruits) log(fruit);

// while — count down
log('\n=== while ===');
let count = 5;
while (count > 0) {
  if (count === 3) { count--; continue; }  // skip 3
  log('Count: ' + count);
  count--;
}

// for...in — object keys
const student = { name:'Arjun', score:92, class:10 };
log('\n=== for...in ===');
for (const key in student) {
  log(\`\${key}: \${student[key]}\`);
}
</script></body></html>`,
    practice: {
      title: 'Loop Practice',
      description: 'Write a program that prints all odd numbers from 1 to 20 using a for loop, and the sum of all even numbers from 1 to 100.',
      startCode: '',
      solution: 'for(let i=1;i<=20;i+=2)console.log(i);\nlet sum=0;\nfor(let i=2;i<=100;i+=2)sum+=i;\nconsole.log("Sum of evens:",sum);',
      hint: 'Odd: start at 1, step by 2. Even sum: start at 2, step by 2.',
    },
  },

  {
    id: 'js-dom-manipulation',
    category: 'DOM & Browser',
    title: 'DOM Manipulation',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'DOM (Document Object Model) is the browser\'s representation of the HTML page as a tree of objects. JS can read and modify it.',
      'Selecting elements: `getElementById()`, `querySelector()` (CSS selector), `querySelectorAll()` (all matches → NodeList).',
      'Changing content: `.textContent = "..."` (text only), `.innerHTML = "..."` (HTML allowed but be careful with XSS).',
      'Changing style: `.style.color = "red"`. Adding/removing classes: `.classList.add()`, `.classList.remove()`, `.classList.toggle()`.',
      'Creating elements: `document.createElement("div")`. Appending: `parent.appendChild(el)` or `parent.append(el)`.',
    ],
    code: `<!DOCTYPE html><html><body style="font-family:Arial;padding:20px">
<h2 id="title">DOM Manipulation Demo</h2>
<p id="para">This is a paragraph.</p>
<div id="box" style="width:100px;height:100px;background:coral;margin:10px 0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">Box</div>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
  <button onclick="changeText()">Change Text</button>
  <button onclick="toggleColor()">Toggle Color</button>
  <button onclick="addItem()">Add Item</button>
  <button onclick="removeBox()">Remove Box</button>
</div>
<ul id="list" style="margin-top:12px"></ul>
<script>
const colors = ['coral','#3b82f6','#10b981','#f59e0b'];
let colorIdx = 0, itemCount = 0;
function changeText() {
  document.getElementById('title').textContent = 'Title Changed! ✅';
  document.getElementById('para').innerHTML = '<strong>Paragraph updated</strong> with HTML!';
}
function toggleColor() {
  colorIdx = (colorIdx+1) % colors.length;
  document.getElementById('box').style.background = colors[colorIdx];
}
function addItem() {
  const li = document.createElement('li');
  li.textContent = 'Item ' + (++itemCount);
  li.style.padding = '4px 0';
  document.getElementById('list').appendChild(li);
}
function removeBox() {
  document.getElementById('box').remove();
}
</script></body></html>`,
    practice: {
      title: 'Build a Counter',
      description: 'Create a page with a number display (starting at 0), and three buttons: Increment (+1), Decrement (-1), Reset (back to 0). Style the number differently based on whether it\'s positive, negative, or zero.',
      startCode: '',
      solution: '// HTML:\n// <div id="count">0</div>\n// <button onclick="change(1)">+</button><button onclick="change(-1)">-</button><button onclick="reset()">Reset</button>\nlet n=0;\nfunction update(){const el=document.getElementById("count");el.textContent=n;el.style.color=n>0?"green":n<0?"red":"black";}\nfunction change(d){n+=d;update();}\nfunction reset(){n=0;update();}',
      hint: 'Track count in a variable. Update DOM on each button click. Use style.color based on value.',
    },
  },

  {
    id: 'js-events',
    category: 'DOM & Browser',
    title: 'Events & Event Listeners',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Events are things that happen: clicks, key presses, form submits, mouse moves, page loads.',
      'Adding listeners: `element.addEventListener("click", function)` — preferred. `element.onclick = function` — older way.',
      'Event object `e`: `e.target` is the element that triggered the event. `e.preventDefault()` stops default browser behavior (like form submit).',
      'Common events: `click`, `dblclick`, `keydown`, `keyup`, `input`, `change`, `submit`, `focus`, `blur`, `mouseover`, `mouseout`.',
      'Event delegation: Add ONE listener on a parent, use `e.target` to identify the clicked child. More efficient than many listeners.',
    ],
    code: `<!DOCTYPE html><html><body style="font-family:Arial;padding:20px">
<h2>Events Demo</h2>
<input id="inp" type="text" placeholder="Type here..." style="padding:8px;border:2px solid #ccc;border-radius:6px;width:250px">
<div id="key-info" style="margin:8px 0;color:#6b7280;font-size:14px">Press a key above...</div>
<button id="btn" style="padding:10px 20px;background:#3b82f6;color:white;border:none;border-radius:8px;cursor:pointer">Click Me</button>
<div id="btn-info" style="margin:8px 0;color:#6b7280;font-size:14px">Button not clicked yet</div>
<div id="box" style="width:200px;height:80px;background:#f1f5f9;border:2px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-top:12px;font-size:14px;color:#64748b">
  Hover over me
</div>
<script>
document.getElementById('inp').addEventListener('keyup', e => {
  document.getElementById('key-info').textContent =
    \`Key: "\${e.key}" | Code: \${e.code} | Value: "\${e.target.value}"\`;
});

const btn = document.getElementById('btn');
let clicks = 0;
btn.addEventListener('click', () => {
  clicks++;
  document.getElementById('btn-info').textContent = \`Clicked \${clicks} time(s)!\`;
});

const box = document.getElementById('box');
box.addEventListener('mouseover', () => { box.style.background='#dbeafe'; box.textContent='🎉 Mouse is here!'; });
box.addEventListener('mouseout', () => { box.style.background='#f1f5f9'; box.textContent='Hover over me'; });
</script></body></html>`,
    practice: {
      title: 'Event Listener Practice',
      description: 'Create a live character counter: as the user types in a textarea, display how many characters they\'ve typed and warn (red) if over 100.',
      startCode: '',
      solution: '// HTML: <textarea id="t"></textarea><div id="c">0/100</div>\ndocument.getElementById("t").addEventListener("input",e=>{\n  const n=e.target.value.length;\n  const el=document.getElementById("c");\n  el.textContent=n+"/100";\n  el.style.color=n>100?"red":"black";\n});',
      hint: 'Use "input" event on textarea. Get value.length. Toggle color based on count.',
    },
  },

  {
    id: 'js-conditionals',
    category: 'Core Concepts',
    title: 'if/else & switch Statements',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      '`if(condition)` — runs block if condition is truthy. `else if` — chain multiple conditions. `else` — runs if none match.',
      'Truthy vs Falsy: falsy values: `false, 0, "", null, undefined, NaN`. Everything else is truthy.',
      '`switch(value)` — matches value against `case` labels. Always add `break` after each case or they "fall through".',
      'Optional chaining: `user?.address?.city` — safely access nested properties without errors if any is null/undefined.',
    ],
    code: `<!DOCTYPE html><html><body style="padding:20px;font-family:Arial">
<h2>Conditionals</h2>
<input id="score" type="number" placeholder="Enter score (0-100)" style="padding:8px;border:1px solid #ccc;border-radius:6px;width:200px">
<button onclick="grade()" style="padding:8px 16px;background:#10b981;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:8px">Get Grade</button>
<div id="out" style="margin-top:12px;padding:16px;border-radius:8px;font-size:18px;font-weight:bold;background:#f1f5f9;display:none"></div>
<script>
function grade() {
  const score = parseInt(document.getElementById('score').value);
  const out = document.getElementById('out');
  out.style.display = 'block';

  if (isNaN(score) || score < 0 || score > 100) {
    out.textContent = '❌ Invalid score!';
    out.style.background = '#fee2e2';
    return;
  }

  let grade, color;
  if (score >= 90)      { grade = 'A+ — Outstanding! 🌟'; color = '#d1fae5'; }
  else if (score >= 75) { grade = 'B — Good work! 👍'; color = '#e0f2fe'; }
  else if (score >= 60) { grade = 'C — Keep trying! 📚'; color = '#fef9c3'; }
  else if (score >= 40) { grade = 'D — Need to improve'; color = '#ffedd5'; }
  else                  { grade = 'F — Please see teacher'; color = '#fee2e2'; }

  out.textContent = \`Score: \${score} → Grade: \${grade}\`;
  out.style.background = color;
}
</script></body></html>`,
    practice: {
      title: 'Day Name Finder',
      description: 'Write a function using switch that takes a day number (1-7) and returns the day name. Return "Invalid" for other numbers.',
      startCode: '',
      solution: 'function dayName(n){\n  switch(n){\n    case 1:return"Monday";\n    case 2:return"Tuesday";\n    case 3:return"Wednesday";\n    case 4:return"Thursday";\n    case 5:return"Friday";\n    case 6:return"Saturday";\n    case 7:return"Sunday";\n    default:return"Invalid";\n  }\n}\nconsole.log(dayName(5));',
      hint: 'switch(n) with cases 1-7. Don\'t forget break and default.',
    },
  },

  {
    id: 'js-destructuring',
    category: 'ES6+ Features',
    title: 'Destructuring',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Array destructuring: `const [a, b, c] = [1, 2, 3]`. Skip elements: `const [, second] = arr`. Default values: `const [a=0] = []`.',
      'Object destructuring: `const { name, age } = user`. Rename: `const { name: fullName } = user`. Default: `const { score=0 } = user`.',
      'Nested destructuring: `const { address: { city } } = user`.',
      'Function parameter destructuring: `function greet({ name, age })` — pass an object, extract properties directly.',
      'Swap variables: `[a, b] = [b, a]` — no temp variable needed!',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Destructuring</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Array destructuring
const [first, second, ...rest] = [10, 20, 30, 40, 50];
log(\`first=\${first}, second=\${second}, rest=[\${rest}]\`);

// Swap
let a = 5, b = 10;
[a, b] = [b, a];
log(\`After swap: a=\${a}, b=\${b}\`);

// Object destructuring
const student = { name: 'Arjun', age: 16, score: 92, city: 'Mumbai' };
const { name, score, city = 'Unknown' } = student;
log(\`\${name} from \${city}, score: \${score}\`);

// Rename on destructure
const { name: studentName, age: studentAge } = student;
log(\`\${studentName} is \${studentAge} years old\`);

// Nested
const school = { info: { name: 'DPS', city: 'Delhi' }, founded: 1949 };
const { info: { name: schoolName, city: schoolCity } } = school;
log(\`\${schoolName}, \${schoolCity}\`);

// In function params
function greet({ name, age = 18 }) {
  return \`Hello \${name}, age \${age}\`;
}
log(greet(student));
</script></body></html>`,
    practice: {
      title: 'Destructuring Practice',
      description: 'Given `const data = { user: { name: "Priya", scores: [85, 92, 78] }, rank: 5 }`. Extract name, first score, and rank using destructuring.',
      startCode: '',
      solution: 'const data={user:{name:"Priya",scores:[85,92,78]},rank:5};\nconst {user:{name,[scores:[first]},rank}=data;\nconsole.log(name,first,rank);\n// OR:\nconst {user:{name:n,scores:[s1]},rank:r}=data;\nconsole.log(n,s1,r);',
      hint: 'Nest destructuring: { user: { name, scores: [firstScore] }, rank }.',
    },
  },

  {
    id: 'js-classes-oop',
    category: 'Advanced',
    title: 'Classes & OOP',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'ES6 classes provide a clean syntax for creating objects with shared methods. Under the hood, they use JavaScript\'s prototype system.',
      '`class` keyword, `constructor()` for initialization. `this` refers to the instance.',
      'Inheritance: `class Child extends Parent`. Call parent constructor with `super()`.',
      'Private fields (ES2022): `#field` — accessible only inside the class.',
      'Static methods: `static method()` — called on the class itself, not on instances.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Classes & OOP</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

class Animal {
  #name;
  #sound;
  constructor(name, sound) {
    this.#name = name;
    this.#sound = sound;
  }
  speak() {
    return \`\${this.#name} says: \${this.#sound}\`;
  }
  static kingdom() { return 'Animalia'; }
  get name() { return this.#name; }
}

class Dog extends Animal {
  #breed;
  constructor(name, breed) {
    super(name, 'Woof!');
    this.#breed = breed;
  }
  info() {
    return \`\${this.name} is a \${this.#breed}\`;
  }
}

const dog = new Dog('Buddy', 'Labrador');
log(dog.speak());
log(dog.info());
log('Kingdom: ' + Animal.kingdom());

const cat = new Animal('Whiskers', 'Meow!');
log(cat.speak());
log(cat instanceof Animal);  // true
log(dog instanceof Animal);  // true (inherited)
</script></body></html>`,
    practice: {
      title: 'Class Practice',
      description: 'Create a `BankAccount` class with: constructor(owner, balance), methods: deposit(amount), withdraw(amount) (prevent overdraft), getBalance(). Test it.',
      startCode: '',
      solution: 'class BankAccount{\n  #balance;\n  constructor(owner,balance){\n    this.owner=owner;\n    this.#balance=balance;\n  }\n  deposit(a){this.#balance+=a;}\n  withdraw(a){if(a>this.#balance)return"Insufficient";this.#balance-=a;}\n  getBalance(){return this.#balance;}\n}\nconst acc=new BankAccount("Arjun",1000);\nacc.deposit(500);\nconsole.log(acc.getBalance());',
      hint: 'Use private field #balance. In withdraw(), check if amount > balance first.',
    },
  },

  {
    id: 'js-promises-async',
    category: 'Advanced',
    title: 'Promises & Async/Await',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'A Promise represents a future value. States: `pending`, `fulfilled` (resolved), `rejected`. `.then(fn)` for success, `.catch(fn)` for errors.',
      'Chaining: `.then().then().catch()` — each `.then()` can return a new value or Promise.',
      '`async/await`: Syntactic sugar over Promises. `async function` always returns a Promise. `await` pauses execution until Promise resolves.',
      '`Promise.all([p1,p2])` — waits for ALL to resolve (fails fast on any rejection). `Promise.race([p1,p2])` — resolves/rejects with first to settle.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Async/Await Demo</h2>
<button onclick="loadData()" style="padding:10px 20px;background:#3b82f6;color:white;border:none;border-radius:8px;cursor:pointer">Fetch Quote</button>
<div id="out" style="margin-top:12px;padding:16px;border-radius:8px;background:#f1f5f9;font-family:Arial;min-height:60px">Click the button...</div>
<script>
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fakeQuote() {
  const quotes = [
    'The only way to do great work is to love what you do.',
    'Believe you can and you\'re halfway there.',
    'In the middle of difficulty lies opportunity.',
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const q = quotes[Math.floor(Math.random()*quotes.length)];
      resolve({ text: q, author: 'Famous Person' });
    }, 800);
  });
}

async function loadData() {
  const out = document.getElementById('out');
  out.textContent = '⏳ Loading quote...';
  out.style.background = '#fef9c3';
  try {
    const data = await fakeQuote();
    out.innerHTML = \`<em>"\${data.text}"</em><br><strong>— \${data.author}</strong>\`;
    out.style.background = '#d1fae5';
  } catch (err) {
    out.textContent = '❌ Error: ' + err.message;
    out.style.background = '#fee2e2';
  }
}
</script></body></html>`,
    practice: {
      title: 'Async Practice',
      description: 'Create an async function that simulates fetching student data (use setTimeout 1s). Return an object {name, score}. Handle it with both .then() and async/await.',
      startCode: '',
      solution: 'function fetchStudent(){\n  return new Promise(r=>setTimeout(()=>r({name:"Arjun",score:92}),1000));\n}\n// .then:\nfetchStudent().then(d=>console.log(d));\n// async/await:\nasync function run(){const d=await fetchStudent();console.log(d);}\nrun();',
      hint: 'Wrap setTimeout in a Promise. Resolve with the data object after 1 second.',
    },
  },

  {
    id: 'js-json-localstorage',
    category: 'DOM & Browser',
    title: 'JSON & Local Storage',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'JSON (JavaScript Object Notation): text format for data exchange. `JSON.stringify(obj)` converts object to JSON string. `JSON.parse(str)` converts JSON string to object.',
      'Local Storage: browser storage that persists across sessions. `localStorage.setItem(key, value)`. `localStorage.getItem(key)`. `localStorage.removeItem(key)`.',
      'Since localStorage only stores strings, always stringify objects before storing and parse after reading.',
      '`sessionStorage` works the same way but is cleared when the browser tab is closed.',
    ],
    code: `<!DOCTYPE html><html><body style="padding:20px;font-family:Arial">
<h2>JSON & Local Storage</h2>
<input id="name" placeholder="Your name" style="padding:8px;border:1px solid #ccc;border-radius:6px;width:200px">
<input id="score" type="number" placeholder="Score" style="padding:8px;border:1px solid #ccc;border-radius:6px;width:100px;margin-left:8px">
<button onclick="saveScore()" style="padding:8px 16px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:8px">Save</button>
<button onclick="loadScores()" style="padding:8px 16px;background:#10b981;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:4px">Load All</button>
<button onclick="clearAll()" style="padding:8px 16px;background:#ef4444;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:4px">Clear</button>
<div id="out" style="margin-top:12px;padding:16px;border-radius:8px;background:#f1f5f9;font-family:monospace;white-space:pre"></div>
<script>
const KEY = 'demo_scores';
function getAll() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}
function saveScore() {
  const name = document.getElementById('name').value.trim();
  const score = parseInt(document.getElementById('score').value);
  if (!name || isNaN(score)) return alert('Please fill both fields');
  const all = getAll();
  all.push({ name, score, time: new Date().toLocaleTimeString() });
  localStorage.setItem(KEY, JSON.stringify(all));
  loadScores();
}
function loadScores() {
  const all = getAll();
  document.getElementById('out').textContent = all.length
    ? all.map(s => \`\${s.name}: \${s.score} (\${s.time})\`).join('\n')
    : 'No scores saved yet.';
}
function clearAll() {
  localStorage.removeItem(KEY);
  loadScores();
}
loadScores();
</script></body></html>`,
    practice: {
      title: 'LocalStorage Practice',
      description: 'Build a simple "Remember my name" feature: on first visit, ask for the name and save it. On return visits, greet the user by name. Add a "Forget me" button.',
      startCode: '',
      solution: 'const name = localStorage.getItem("user_name");\nif(name){\n  document.body.innerHTML=`Welcome back, ${name}! <button onclick="localStorage.removeItem(\'user_name\');location.reload()">Forget me</button>`;\n}else{\n  const n=prompt("What is your name?");\n  if(n){localStorage.setItem("user_name",n);location.reload();}\n}',
      hint: 'Check localStorage.getItem("name") on load. If exists, greet. If not, prompt and save.',
    },
  },

  {
    id: 'js-type-conversion',
    category: 'Core Concepts',
    title: 'Type Conversion & Coercion',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'JS has two kinds of type change: explicit conversion (you do it on purpose) and implicit coercion (JS does it automatically).',
      'String to Number: `Number("42")` → 42. `parseInt("42px")` → 42. `parseFloat("3.14")` → 3.14. `+"42"` → 42 (unary +).',
      'Number to String: `String(42)` → "42". `(42).toString()` → "42". Template literal: `\`${42}\``.',
      'To Boolean: `Boolean(0)` → false. `Boolean("")` → false. `Boolean(null)` → false. `Boolean([])` → TRUE (empty array is truthy!).',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Type Conversion</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// String → Number
log('Number("42"): ' + Number("42"));
log('Number("abc"): ' + Number("abc"));  // NaN
log('parseInt("42px"): ' + parseInt("42px"));
log('+"100": ' + +"100");

// Number → String
log('String(99): ' + (typeof String(99)));
log('(42).toString(): ' + (42).toString());

// To Boolean
log('\nTruthy/Falsy:');
[0, "", null, undefined, NaN, false, -0].forEach(v =>
  log(\`  Boolean(\${JSON.stringify(v)}): \${Boolean(v)}\`)
);
log('--- Truthy ---');
[1, "0", [], {}, " "].forEach(v =>
  log(\`  Boolean(\${JSON.stringify(v)}): \${Boolean(v)}\`)
);

// Coercion surprises
log('\nCoercion:');
log('"5" + 3 = ' + ("5" + 3));   // "53" (string concat)
log('"5" - 3 = ' + ("5" - 3));   // 2 (numeric)
</script></body></html>`,
    practice: {
      title: 'Type Conversion',
      description: 'Write code that safely converts user input (a string) to a number, checks if it\'s a valid number (not NaN), and calculates its square.',
      startCode: '',
      solution: 'function safeSquare(input){\n  const num = Number(input);\n  if(isNaN(num)) return "Invalid input";\n  return num * num;\n}\nconsole.log(safeSquare("9"));   // 81\nconsole.log(safeSquare("abc")); // Invalid',
      hint: 'Use Number() to convert, then isNaN() to validate.',
    },
  },

  {
    id: 'js-spread-rest',
    category: 'ES6+ Features',
    title: 'Spread & Rest Operators',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Spread `...` expands an iterable (array/string) into individual elements. Used in: function calls, array literals, object literals.',
      'Rest `...` collects remaining elements into an array. Used in: function parameters, destructuring.',
      'Copy array: `const copy = [...original]`. Merge arrays: `const merged = [...arr1, ...arr2]`.',
      'Copy object: `const copy = {...original}`. Override: `const updated = {...user, age: 20}`.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Spread & Rest</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Spread in function call
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
log('Max: ' + Math.max(...nums));
log('Min: ' + Math.min(...nums));

// Spread to copy/merge arrays
const a = [1, 2, 3], b = [4, 5, 6];
const merged = [...a, ...b, 7];
log('Merged: ' + merged);

// Spread to copy objects
const user = { name: 'Arjun', age: 16 };
const updatedUser = { ...user, age: 17, city: 'Mumbai' };
log('Updated: ' + JSON.stringify(updatedUser));

// Rest params
function sum(first, second, ...rest) {
  log(\`first=\${first}, second=\${second}, rest=[\${rest}]\`);
  return first + second + rest.reduce((a,b)=>a+b, 0);
}
log('Sum: ' + sum(1, 2, 3, 4, 5));

// Convert string to array
const chars = [..."Hello"];
log('Chars: ' + chars);
</script></body></html>`,
    practice: {
      title: 'Spread & Rest',
      description: 'Write a function `mergeStudents(...lists)` that accepts any number of student arrays and returns a single sorted merged array of unique names.',
      startCode: '',
      solution: 'function mergeStudents(...lists){\n  const all = [].concat(...lists);\n  return [...new Set(all)].sort();\n}\nconst list1=["Arjun","Priya"],list2=["Priya","Ravi"];\nconsole.log(mergeStudents(list1,list2));',
      hint: 'Use rest to collect arrays. Spread to flatten. Set to remove duplicates. Sort().',
    },
  },

  {
    id: 'js-closures-advanced',
    category: 'Advanced',
    title: 'Closures',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'A closure is when an inner function "remembers" the variables from its outer function even after the outer function has returned.',
      'Every function in JS forms a closure over its surrounding scope.',
      'Use cases: Data privacy (private variables), factory functions, memoization, event callbacks.',
      'Common pattern: outer function returns inner function. Inner function accesses outer\'s variable (the closure).',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Closures</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<button onclick="demo()" style="padding:8px 16px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;margin-top:8px">Run Demo</button>
<script>
function demo() {
const log = s => { document.getElementById('out').textContent += s + '\n'; };
document.getElementById('out').textContent = '';

// Basic closure
function makeCounter(start = 0) {
  let count = start;
  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; }
  };
}

const counter1 = makeCounter(10);
const counter2 = makeCounter(0);

counter1.increment();
counter1.increment();
counter2.increment();

log('Counter1: ' + counter1.value()); // 12
log('Counter2: ' + counter2.value()); // 1
log('(Each has its own private count!)');

// Closure for data privacy
function createStudent(name, initialScore) {
  let score = initialScore;  // private!
  return {
    addScore(pts) { score += pts; },
    getReport() { return \`\${name}: \${score} pts\`; }
  };
}
const student = createStudent('Arjun', 50);
student.addScore(25);
log(student.getReport()); // Arjun: 75 pts
}
demo();
</script></body></html>`,
    practice: {
      title: 'Closure Practice',
      description: 'Create a `makeMultiplier(factor)` function that returns a new function. The returned function takes a number and multiplies it by factor. Test: double = makeMultiplier(2); triple = makeMultiplier(3).',
      startCode: '',
      solution: 'function makeMultiplier(factor){\n  return n => n * factor;\n}\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\nconsole.log(double(5));  // 10\nconsole.log(triple(4));  // 12',
      hint: 'Outer function receives factor, inner function receives n and uses factor from closure.',
    },
  },

  {
    id: 'js-modules-import-export',
    category: 'Advanced',
    title: 'Modules: import & export',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'ES Modules let you split code into separate files. `export` makes variables/functions available to other files. `import` brings them in.',
      'Named export: `export const PI = 3.14; export function add(a,b){...}`. Import: `import { PI, add } from "./math.js"`.',
      'Default export: `export default function main(){...}`. Import: `import anything from "./module.js"` (any name).',
      'Re-export: `export { something } from "./other.js"`. Import all: `import * as utils from "./utils.js"`.',
      'In HTML: `<script type="module" src="app.js">`. Modules have strict mode by default and their own scope.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Modules Concept</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// In real projects:
// --- math.js ---
// export const PI = 3.14159;
// export function square(n) { return n * n; }
// export default function main() { ... }

// --- app.js ---
// import { PI, square } from './math.js';
// import main from './math.js';

// Simulating modules with objects (for this demo):
const mathModule = (() => {
  const PI = 3.14159;
  const square = n => n * n;
  const circle = r => ({ area: PI*r*r, circum: 2*PI*r });
  return { PI, square, circle };
})();  // IIFE creates module-like scope

const { PI, square, circle } = mathModule;
log('PI = ' + PI);
log('square(7) = ' + square(7));
const c = circle(5);
log(\`circle r=5: area=\${c.area.toFixed(2)}, circumference=\${c.circum.toFixed(2)}\`);

log('\nModule pattern benefits:');
log('✅ Encapsulation (private variables)');
log('✅ No global namespace pollution');
log('✅ Reusable across files');
</script></body></html>`,
    practice: {
      title: 'Module Pattern',
      description: 'Create a "calculator module" object with methods: add, subtract, multiply, divide. Division should handle division by zero. Then import (simulate) and use it.',
      startCode: '',
      solution: 'const calc = (()=>{\n  return{\n    add:(a,b)=>a+b,\n    subtract:(a,b)=>a-b,\n    multiply:(a,b)=>a*b,\n    divide:(a,b)=>b===0?"Cannot divide by zero":a/b,\n  };\n})();\nconsole.log(calc.add(10,5));\nconsole.log(calc.divide(10,0));',
      hint: 'Use IIFE pattern to create module scope. Return an object of methods.',
    },
  },

  {
    id: 'js-error-handling-advanced',
    category: 'Advanced',
    title: 'Error Handling & Debugging',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      '`try { ... } catch(err) { ... } finally { ... }` — try runs, catch handles errors, finally always runs (cleanup).',
      'Error properties: `err.name` (type), `err.message` (description), `err.stack` (trace).',
      'Custom errors: `throw new Error("message")`. Or custom class: `class ValidationError extends Error { ... }`.',
      'Common error types: `TypeError` (wrong type), `ReferenceError` (undefined variable), `SyntaxError` (invalid code), `RangeError` (out of range).',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Error Handling</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Custom error
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function processAge(age) {
  if (typeof age !== 'number') throw new TypeError('Age must be a number');
  if (age < 0 || age > 150) throw new ValidationError('age', \`Invalid age: \${age}\`);
  return \`Valid age: \${age}\`;
}

// Test various scenarios
[16, -5, 'twenty', 200].forEach(val => {
  try {
    log(processAge(val));
  } catch (err) {
    if (err instanceof ValidationError) {
      log(\`Validation [\${err.field}]: \${err.message}\`);
    } else if (err instanceof TypeError) {
      log(\`Type Error: \${err.message}\`);
    } else {
      log(\`Unexpected: \${err.message}\`);
    }
  } finally {
    log('--- processed ---');
  }
});
</script></body></html>`,
    practice: {
      title: 'Error Handling',
      description: 'Write a `safeDivide(a, b)` function that throws a custom `DivisionError` if b is 0. Wrap calls in try-catch and handle both DivisionError and other errors differently.',
      startCode: '',
      solution: 'class DivisionError extends Error{constructor(msg){super(msg);this.name="DivisionError";}}\nfunction safeDivide(a,b){if(b===0)throw new DivisionError("Cannot divide by zero");return a/b;}\ntry{console.log(safeDivide(10,2));console.log(safeDivide(5,0));}catch(e){if(e instanceof DivisionError)console.log("Division Error:",e.message);else console.log("Error:",e.message);}',
      hint: 'Extend Error class. Check `instanceof DivisionError` in catch.',
    },
  },

  {
    id: 'js-map-set',
    category: 'Advanced',
    title: 'Map & Set Collections',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Map: Like an object but keys can be ANY type (including objects/functions). Maintains insertion order. `.set(key,val)`, `.get(key)`, `.has(key)`, `.delete(key)`, `.size`.',
      'Set: Collection of UNIQUE values. `.add(val)`, `.has(val)`, `.delete(val)`, `.size`. Automatically removes duplicates.',
      'Iterate Map: `for(const [key,val] of map)`. Iterate Set: `for(const val of set)`.',
      'Use Map when: you need non-string keys, need ordered keys, or frequently add/delete. Use Set for: unique collections, removing duplicates.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Map & Set</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// === MAP ===
const studentMap = new Map();
studentMap.set('A001', { name: 'Arjun', score: 92 });
studentMap.set('A002', { name: 'Priya', score: 88 });
studentMap.set('A003', { name: 'Ravi', score: 76 });

log('=== Map ===');
log('Size: ' + studentMap.size);
log('Get A002: ' + JSON.stringify(studentMap.get('A002')));
log('Has A004: ' + studentMap.has('A004'));

for (const [id, student] of studentMap) {
  log(\`\${id}: \${student.name} - \${student.score}\`);
}

// === SET ===
log('\n=== Set ===');
const tags = new Set(['js', 'html', 'css', 'js', 'html', 'python']);
log('Unique tags: ' + [...tags]);
log('Size: ' + tags.size);

// Remove duplicates from array
const dupes = [1, 2, 3, 2, 1, 4, 3, 5];
const unique = [...new Set(dupes)];
log('Remove duplicates: ' + unique);
</script></body></html>`,
    practice: {
      title: 'Map & Set Practice',
      description: 'Given an array of words, use Map to count the frequency of each word. Then use Set to find how many unique words there are.',
      startCode: '',
      solution: 'const words=["cat","dog","cat","bird","dog","cat"];\nconst freq=new Map();\nwords.forEach(w=>freq.set(w,(freq.get(w)||0)+1));\nconsole.log([...freq.entries()]);\nconsole.log("Unique count:",new Set(words).size);',
      hint: 'Map.get(word)||0 to handle first occurrence. Increment by 1 each time.',
    },
  },

  {
    id: 'js-template-literals-advanced',
    category: 'ES6+ Features',
    title: 'Template Literals & Tagged Templates',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'Template literals use backticks `` ` ``. Allow multi-line strings and `${expression}` interpolation.',
      'Any valid JS expression works inside `${}`: variables, function calls, ternary, arithmetic.',
      'Tagged templates: `tag\`...\`` — function receives the string parts and interpolated values. Used in libraries like styled-components, SQL builders.',
      'Raw strings: `String.raw\`\n\`` — treats backslashes literally (no escape processing).',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Template Literals</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

const name = 'Arjun', score = 92, subject = 'Mathematics';

// Basic interpolation
log(\`Student: \${name}\`);
log(\`Score: \${score}/100 (\${score >= 90 ? 'A+' : 'B'})\`);

// Multi-line string
const report = \`
=== Report Card ===
Name   : \${name}
Subject: \${subject}
Score  : \${score}
Grade  : \${['F','D','C','B','A','A+'][Math.floor(score/20)]}
\`.trim();
log(report);

// Expressions in template literals
const nums = [85, 92, 78, 96, 88];
log(\`Average: \${(nums.reduce((a,b)=>a+b)/nums.length).toFixed(1)}\`);

// Tagged template (highlight function)
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] !== undefined ? \`[[\${values[i]}]]\` : ''), '');
}
log(highlight\`Hello \${name}, your score is \${score}!\`);
</script></body></html>`,
    practice: {
      title: 'Template Literals',
      description: 'Create a function `generateCard(student)` that takes {name, score, grade, subject} and returns a nicely formatted HTML string using template literals. Include conditional text for high scorers.',
      startCode: '',
      solution: 'function generateCard({name,score,grade,subject}){\n  return `<div><h2>${name}</h2><p>${subject}: ${score}/100</p><p>Grade: ${grade}</p>${score>=90?"<p>🌟 Top Performer!</p>":""}</div>`;\n}\nconsole.log(generateCard({name:"Arjun",score:95,grade:"A+",subject:"Maths"}));',
      hint: 'Use ${} for values and ${score>=90?"...":""} for conditional sections.',
    },
  },

  {
    id: 'js-mini-project-calculator',
    category: 'Mini Projects',
    title: 'Mini Project: Calculator',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'A calculator mini project practices: DOM manipulation, event listeners, string parsing, and UI feedback.',
      'Key concepts: evaluating expressions safely (avoid `eval()`), handling edge cases (divide by zero, multiple operators).',
      'Building UIs with CSS grid for button layout. Using button data attributes to identify clicked values.',
    ],
    code: `<!DOCTYPE html><html><head><style>
body { font-family: Arial; display: flex; justify-content: center; padding: 30px; background: #1e293b; }
.calc { background: #0f172a; border-radius: 16px; padding: 20px; width: 260px; box-shadow: 0 25px 50px rgba(0,0,0,.5); }
#screen { background: #1e293b; color: #a3e635; font-size: 24px; text-align: right; padding: 16px; border-radius: 8px; margin-bottom: 12px; min-height: 56px; word-break: break-all; }
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
button { padding: 14px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.1s; }
button:active { transform: scale(0.95); }
.num { background: #334155; color: white; }
.op  { background: #3b82f6; color: white; }
.eq  { background: #10b981; color: white; }
.cl  { background: #ef4444; color: white; }
</style></head><body>
<div class="calc">
  <div id="screen">0</div>
  <div class="buttons">
    <button class="cl" onclick="clear_()">C</button>
    <button class="cl" onclick="del()">⌫</button>
    <button class="op" onclick="inp('%')">%</button>
    <button class="op" onclick="inp('/')">÷</button>
    <button class="num" onclick="inp('7')">7</button>
    <button class="num" onclick="inp('8')">8</button>
    <button class="num" onclick="inp('9')">9</button>
    <button class="op" onclick="inp('*')">×</button>
    <button class="num" onclick="inp('4')">4</button>
    <button class="num" onclick="inp('5')">5</button>
    <button class="num" onclick="inp('6')">6</button>
    <button class="op" onclick="inp('-')">−</button>
    <button class="num" onclick="inp('1')">1</button>
    <button class="num" onclick="inp('2')">2</button>
    <button class="num" onclick="inp('3')">3</button>
    <button class="op" onclick="inp('+')">+</button>
    <button class="num" onclick="inp('0')" style="grid-column:span 2">0</button>
    <button class="num" onclick="inp('.')">.</button>
    <button class="eq" onclick="calc()">=</button>
  </div>
</div>
<script>
let expr = '', justCalc = false;
const screen = document.getElementById('screen');
function update(val) { screen.textContent = val || '0'; }
function inp(ch) {
  if (justCalc && !'+-*/'.includes(ch)) { expr = ''; }
  justCalc = false;
  expr += ch; update(expr);
}
function clear_() { expr = ''; update('0'); }
function del() { expr = expr.slice(0,-1); update(expr || '0'); }
function calc() {
  try {
    // Replace ÷ with /, % with /100 logic handled by JS
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) throw new Error('Division by zero');
    expr = String(result); update(expr); justCalc = true;
  } catch { update('Error'); expr = ''; }
}
</script></body></html>`,
    practice: {
      title: 'Extend the Calculator',
      description: 'Add a history feature to the calculator: keep the last 5 calculations in an array and display them below the calculator.',
      startCode: '',
      solution: '// After calc() runs: push to history array\nconst history = [];\n// In calc():\n// history.unshift(`${expr} = ${result}`);\n// if(history.length > 5) history.pop();\n// Render history in a div below the calculator\nconsole.log("Extend the live example above!");',
      hint: 'After getting result in calc(), store "expression = result" in an array. Render to a list element.',
    },
  },

  {
    id: 'js-mini-todo',
    category: 'Mini Projects',
    title: 'Mini Project: Todo List App',
    difficulty: 'Intermediate',
    livePreview: true,
    theory: [
      'A Todo app combines: array state management, DOM creation, event delegation, localStorage persistence.',
      'Key techniques: Rendering a list from an array (map → DOM), filtering (active vs completed), local storage for persistence.',
    ],
    code: `<!DOCTYPE html><html><head><style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial; background: #f1f5f9; min-height: 100vh; padding: 30px; }
.app { max-width: 400px; margin: 0 auto; }
h2 { text-align: center; color: #1e293b; margin-bottom: 20px; }
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; }
input:focus { outline: none; border-color: #3b82f6; }
button { padding: 12px 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
.todo { background: white; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.todo.done span { text-decoration: line-through; color: #94a3b8; }
.todo span { flex: 1; font-size: 15px; }
.del-btn { background: #fee2e2; color: #ef4444; border: none; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 12px; }
.stats { text-align: center; color: #64748b; font-size: 13px; margin-top: 12px; }
</style></head><body>
<div class="app">
  <h2>📝 Todo List</h2>
  <div class="input-row">
    <input id="inp" placeholder="Add a task..." onkeydown="if(event.key==='Enter')addTodo()">
    <button onclick="addTodo()">Add</button>
  </div>
  <div id="list"></div>
  <div class="stats" id="stats"></div>
</div>
<script>
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
function save() { localStorage.setItem('todos', JSON.stringify(todos)); }
function render() {
  const list = document.getElementById('list');
  list.innerHTML = todos.map((t,i) => \`
    <div class="todo \${t.done?'done':''}">
      <input type="checkbox" \${t.done?'checked':''} onchange="toggle(\${i})">
      <span>\${t.text}</span>
      <button class="del-btn" onclick="remove(\${i})">✕</button>
    </div>
  \`).join('');
  const done = todos.filter(t=>t.done).length;
  document.getElementById('stats').textContent =
    \`\${done}/\${todos.length} tasks completed\`;
}
function addTodo() {
  const inp = document.getElementById('inp');
  const text = inp.value.trim();
  if (!text) return;
  todos.unshift({ text, done: false });
  inp.value = ''; save(); render();
}
function toggle(i) { todos[i].done = !todos[i].done; save(); render(); }
function remove(i) { todos.splice(i, 1); save(); render(); }
render();
</script></body></html>`,
    practice: {
      title: 'Extend the Todo App',
      description: 'Add a "Clear completed" button that removes all done items. Also add a filter: show All / Active / Completed.',
      startCode: '',
      solution: '// Add to existing app:\n// clearCompleted(): todos = todos.filter(t => !t.done); save(); render();\n// Filter: let filter = "all"; render based on filter',
      hint: 'clearCompleted uses filter(). For filter UI: show subset of todos based on .done status.',
    },
  },

  {
    id: 'js-date-math',
    category: 'Core Concepts',
    title: 'Date & Math Objects',
    difficulty: 'Beginner',
    livePreview: true,
    theory: [
      'Math object: `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.abs()`, `Math.sqrt()`, `Math.pow()`, `Math.max()`, `Math.min()`, `Math.random()` (0 to 1).',
      'Random integer between a and b (inclusive): `Math.floor(Math.random() * (b-a+1)) + a`.',
      'Date object: `new Date()` — current date/time. `new Date("2024-01-15")` — specific date.',
      'Getting parts: `.getFullYear()`, `.getMonth()` (0-11), `.getDate()`, `.getHours()`, `.getDay()` (0=Sunday).',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Date & Math</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<button onclick="run()" style="padding:8px 16px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;margin-top:8px">Run</button>
<script>
function run() {
const log = s => { document.getElementById('out').textContent += s + '\n'; };
document.getElementById('out').textContent = '';

// Math
log('=== Math ===');
log('round(4.6): ' + Math.round(4.6));
log('floor(4.9): ' + Math.floor(4.9));
log('ceil(4.1): ' + Math.ceil(4.1));
log('abs(-15): ' + Math.abs(-15));
log('sqrt(144): ' + Math.sqrt(144));
log('random int 1-10: ' + (Math.floor(Math.random()*10)+1));

// Date
log('\n=== Date ===');
const now = new Date();
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
log('Date: ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear());
log('Time: ' + now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0'));
log('Day: ' + days[now.getDay()]);

// Calculate days until an event
const event = new Date('2026-12-31');
const diffMs = event - now;
const diffDays = Math.ceil(diffMs / (1000*60*60*24));
log('Days until Dec 31, 2026: ' + diffDays);
}
run();
</script></body></html>`,
    practice: {
      title: 'Date & Math',
      description: 'Create a function that returns a person\'s age in years given their birthdate as a string (e.g., "2008-05-15").',
      startCode: '',
      solution: 'function getAge(dob){\n  const birth = new Date(dob);\n  const today = new Date();\n  let age = today.getFullYear() - birth.getFullYear();\n  const m = today.getMonth() - birth.getMonth();\n  if(m<0||(m===0&&today.getDate()<birth.getDate()))age--;\n  return age;\n}\nconsole.log(getAge("2008-05-15"));',
      hint: 'Subtract birth year from current year. Adjust if birthday hasn\'t passed this year yet.',
    },
  },

  {
    id: 'js-higher-order-functions',
    category: 'Advanced',
    title: 'Higher-Order Functions',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'A Higher-Order Function (HOF) either takes a function as an argument OR returns a function (or both).',
      'Examples of built-in HOFs: `.map()`, `.filter()`, `.reduce()`, `.sort()`, `.forEach()`, `addEventListener()`.',
      'Currying: transforming a function with multiple arguments into a sequence of functions with one argument each.',
      'Function composition: `const compose = (f,g) => x => f(g(x))` — apply g first, then f.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Higher-Order Functions</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// HOF: function taking a function
function repeat(fn, times) {
  for (let i = 0; i < times; i++) fn(i);
}
repeat(i => log('Hello ' + i), 3);

// HOF: returning a function (currying)
function multiply(a) {
  return b => a * b;
}
const triple = multiply(3);
const double = multiply(2);
log('triple(7): ' + triple(7));
log('double(9): ' + double(9));

// Function composition
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const addTax = price => price * 1.18;
const applyDiscount = price => price * 0.9;
const formatINR = price => '₹' + price.toFixed(2);

const finalPrice = compose(formatINR, addTax, applyDiscount);
log('Final price (1000): ' + finalPrice(1000));

// Memoization
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) { log('(from cache)'); return cache.get(key); }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = memoize(n => { return n * n; });
log('slowSquare(7): ' + slowSquare(7));
log('slowSquare(7): ' + slowSquare(7));  // from cache
</script></body></html>`,
    practice: {
      title: 'HOF Practice',
      description: 'Create a `pipe` function that composes functions left-to-right (opposite of compose). Test: pipe(double, addOne, square) where double=x*2, addOne=x+1, square=x*x.',
      startCode: '',
      solution: 'const pipe = (...fns) => x => fns.reduce((acc,fn)=>fn(acc),x);\nconst double=x=>x*2;\nconst addOne=x=>x+1;\nconst square=x=>x*x;\nconst transform=pipe(double,addOne,square);\nconsole.log(transform(3));// (3*2+1)² = 7² = 49',
      hint: 'pipe uses reduce (left-to-right), compose uses reduceRight (right-to-left).',
    },
  },

  {
    id: 'js-generators-iterators',
    category: 'Advanced',
    title: 'Generators & Iterators',
    difficulty: 'Advanced',
    livePreview: true,
    theory: [
      'Iterators: Objects with a `next()` method that returns `{value, done}`. Arrays, strings, Maps, Sets are all iterables.',
      'Generators (`function*`): Functions that can be paused and resumed. `yield` pauses and returns a value. Calling the generator returns an iterator.',
      'Use cases: Lazy evaluation, infinite sequences, async flow control, custom iterables.',
      '`yield*` delegates to another iterable. Can receive values sent in via `generator.next(value)`.',
    ],
    code: `<!DOCTYPE html><html><body>
<h2>Generators</h2>
<div id="out" style="font-family:monospace;background:#1e293b;color:#a3e635;padding:16px;border-radius:8px;white-space:pre"></div>
<script>
const log = s => { document.getElementById('out').textContent += s + '\n'; };

// Basic generator
function* countdown(n) {
  while (n > 0) {
    yield n--;
  }
  return 'Done!';
}

const gen = countdown(5);
log('next(): ' + JSON.stringify(gen.next()));  // {value:5, done:false}
log('next(): ' + JSON.stringify(gen.next()));  // {value:4, done:false}

// Use in for...of
for (const n of countdown(3)) {
  log('Count: ' + n);
}

// Infinite sequence
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const nat = naturals();
const first10 = [];
for (let i = 0; i < 10; i++) first10.push(nat.next().value);
log('First 10 naturals: ' + first10);

// Fibonacci generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a+b];
  }
}

const fib = fibonacci();
const fibNums = Array.from({length: 10}, () => fib.next().value);
log('Fibonacci: ' + fibNums);
</script></body></html>`,
    practice: {
      title: 'Generator Practice',
      description: 'Create a generator `range(start, end, step=1)` that yields numbers from start to end (exclusive) with the given step. Use it to iterate over even numbers 0 to 10.',
      startCode: '',
      solution: 'function* range(start,end,step=1){\n  for(let i=start;i<end;i+=step)yield i;\n}\nfor(const n of range(0,11,2))console.log(n);',
      hint: 'Generator with for loop inside. yield each value. step=1 by default.',
    },
  },
];
