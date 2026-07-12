import { TutorialTopic } from './types';

export const reactTopics: TutorialTopic[] = [
  {
    id: 'react-jsx',
    category: 'React Fundamentals',
    title: 'What is React & JSX',
    difficulty: 'Beginner',
    theory: [
      'React is a JavaScript library for building user interfaces using reusable components. Instead of writing raw HTML and JavaScript, React lets you describe what the UI should look like using a special syntax called JSX. JSX looks like HTML but runs inside JavaScript — it gets compiled into regular JavaScript function calls that create UI elements. React automatically manages updates to the DOM, only re-rendering parts that changed, which makes applications fast and responsive.',
      'JSX combines HTML and JavaScript in a way that feels natural to developers. When you write `<div>Hello</div>` in JSX, React converts it to a function call like `React.createElement("div", null, "Hello")`. This means you can embed JavaScript expressions inside JSX by wrapping them in curly braces: `<h1>Hello, {name}!</h1>`. JSX must return a single root element, and any component name must start with a capital letter to distinguish it from regular HTML tags.',
      'React works by creating a virtual representation of the UI in memory and efficiently syncing it with the real DOM. When state or props change, React re-renders the component, compares the new virtual DOM with the old one, and applies only the necessary changes to the actual DOM. This "reconciliation" process is what makes React fast even with complex interfaces. Understanding this mental model is key to writing React code that performs well and behaves predictably.'
    ],
    syntax: 'const element = <div className="box">Hello, {name}!</div>;',
    code: `import React from 'react';

export default function Welcome() {
  const name = 'Alice';
  const isLoggedIn = true;

  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>Hello, {name}!</p>
      <p>You are {isLoggedIn ? 'logged in' : 'logged out'}</p>
      <button>Click me</button>
    </div>
  );
}`,
    output: 'A page displaying "Welcome to React!" heading, greeting message, login status, and a clickable button.',
    notes: [
      'JSX elements are case-sensitive: <div> is an HTML tag, but <Welcome> is a component.',
      'Always wrap expressions in curly braces: {variable}, not {{variable}}.',
      'Use className instead of class for CSS classes in JSX.'
    ],
    xp: 15,
    practice: {
      title: 'Create Your First JSX Component',
      description: 'Write a React component that displays your name, age, and a fun fact about yourself. Use JSX to combine text and JavaScript variables.',
      startCode: `import React from 'react';

export default function AboutMe() {
  // Add your variables here

  return (
    <div>
      {/* Add JSX here */}
    </div>
  );
}`,
      hint: 'Create variables for name, age, and fact. Use curly braces to insert them into your JSX.',
      solution: `import React from 'react';

export default function AboutMe() {
  const name = 'Your Name';
  const age = 15;
  const fact = 'I love coding!';

  return (
    <div>
      <h1>About Me</h1>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Fun Fact: {fact}</p>
    </div>
  );
}`,
      expectedOutput: 'A page showing your name, age, and fun fact.'
    }
  },
  {
    id: 'react-components-props',
    category: 'React Fundamentals',
    title: 'Components & Props',
    difficulty: 'Beginner',
    theory: [
      'Components are reusable building blocks of a React application. A component is a JavaScript function that returns JSX. React has two types of components: functional components (functions that return JSX) and class components (we focus on functional components here). Functional components are simpler and recommended for modern React. Each component should do one thing well and be easy to test and reuse.',
      'Props (short for "properties") are how you pass data from a parent component to a child component. Props are read-only — a component cannot modify the props it receives. Instead of hard-coding values, you can make components flexible by accepting them as props. This makes components reusable across different parts of your app. Props flow down from parent to child, creating a unidirectional data flow that makes applications easier to reason about.',
      'Props are passed like HTML attributes. If a component receives an object of props, you can destructure them in the function signature for cleaner code. React re-renders a component whenever its props change, ensuring the UI stays in sync with the data. This predictable behavior is one of React\'s core strengths.'
    ],
    syntax: 'const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;',
    code: `import React from 'react';

function Card({ title, description, color }) {
  return (
    <div style={{ backgroundColor: color, padding: '20px', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Card
        title="React"
        description="A JavaScript library"
        color="lightblue"
      />
      <Card
        title="JSX"
        description="Mix HTML and JavaScript"
        color="lightgreen"
      />
    </div>
  );
}`,
    output: 'Two cards displayed with different titles, descriptions, and background colors.',
    notes: [
      'Props are immutable — never modify props directly inside a component.',
      'Destructure props in the function parameter for cleaner code: ({ title, color }) => ...',
      'If a prop is not passed, it will be undefined. Use default values or destructuring with defaults.'
    ],
    xp: 15,
    practice: {
      title: 'Create a Reusable Button Component',
      description: 'Build a Button component that accepts label and color as props. Render it three times with different props in App.',
      startCode: `import React from 'react';

function Button() {
  // Add props here
  return (
    <button>{/* Add label here */}</button>
  );
}

export default function App() {
  return (
    <div>
      {/* Render Button component 3 times with different props */}
    </div>
  );
}`,
      hint: 'Add label and color to the function parameter. Use inline style or className to apply the color.',
      solution: `import React from 'react';

function Button({ label, color }) {
  return (
    <button style={{ backgroundColor: color, padding: '10px 20px', color: 'white', border: 'none', borderRadius: '4px' }}>
      {label}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button label="Play" color="green" />
      <Button label="Pause" color="orange" />
      <Button label="Stop" color="red" />
    </div>
  );
}`,
      expectedOutput: 'Three buttons with different labels and background colors displayed on the page.'
    }
  },
  {
    id: 'react-usestate',
    category: 'State & Hooks',
    title: 'useState & Rendering',
    difficulty: 'Beginner',
    theory: [
      'State is data that changes over time in a React component. Unlike props (which come from the parent), state is local to a component and controlled by the component itself. The `useState` hook is the primary way to add state to functional components. When state updates, React automatically re-renders the component to reflect the new data. This reactive behavior is central to building interactive applications.',
      'The `useState` hook returns an array with two elements: the current state value and a function to update it. Call it at the top level of your component: `const [count, setCount] = useState(0)`. The argument to `useState` is the initial state value. Each component instance has its own independent state — changing state in one component doesn\'t affect others.',
      'When you call a setState function (like `setCount`), React schedules a re-render. React batches multiple state updates together for performance. Never mutate state directly; always use the setState function. If the new state depends on the old state, pass a function to setState: `setCount(prev => prev + 1)`.'
    ],
    syntax: 'const [count, setCount] = useState(0);',
    code: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Counter</h1>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
      <button onClick={increment} style={{ marginRight: '10px' }}>+</button>
      <button onClick={decrement} style={{ marginRight: '10px' }}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
    output: 'A counter displaying 0 initially. Clicking + increments it, - decrements it, and Reset sets it back to 0.',
    notes: [
      'useState must be called at the top level of a component, not inside loops or conditions.',
      'Each component instance has its own state — state is not shared between instances.',
      'Use setState functions, never mutate state directly.'
    ],
    xp: 15,
    practice: {
      title: 'Build a Toggle Switch',
      description: 'Create a component with a boolean state that toggles between true and false when a button is clicked. Display the current state.',
      startCode: `import React, { useState } from 'react';

export default function Toggle() {
  // Add useState here

  return (
    <div>
      {/* Display state and button here */}
    </div>
  );
}`,
      hint: 'Use useState(false) to initialize state. Create a toggle function that sets state to !state.',
      solution: `import React, { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Toggle Switch</h1>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle} style={{ padding: '10px 20px' }}>
        Toggle
      </button>
    </div>
  );
}`,
      expectedOutput: 'A button that toggles a display between "Status: ON" and "Status: OFF".'
    }
  },
  {
    id: 'react-events-forms',
    category: 'Interactivity',
    title: 'Handling Events & Forms',
    difficulty: 'Beginner',
    theory: [
      'React events work similarly to DOM events but with some differences. Instead of `onclick`, you use `onClick` (camelCase). Event handlers receive a synthetic event object that wraps the native browser event. Common events include `onClick`, `onChange`, `onSubmit`, `onFocus`, and `onBlur`. Attach event handlers as JSX attributes on elements: `<button onClick={handleClick}>Click me</button>`.',
      'Handling form inputs in React requires tracking the input value in state. When the user types in an input field, the `onChange` event fires and you update state with the new value. This creates a "controlled component" where React state is the single source of truth for the input value. To prevent the default form submission behavior, call `event.preventDefault()` in the `onSubmit` handler.',
      'Forms in React are "controlled" because React state controls the input values, not the DOM directly. When you need to read form data, retrieve it from state, not by querying the DOM. This pattern makes forms predictable and makes it easy to validate input or react to changes in real-time.'
    ],
    syntax: '<input onChange={(e) => setValue(e.target.value)} />',
    code: `import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setSubmitted(true);
      console.log('Login attempt:', email);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
      {submitted && <p>Login successful!</p>}
    </form>
  );
}`,
    output: 'A form with email and password inputs that clears and shows a success message on submission.',
    notes: [
      'Always call e.preventDefault() in form submission handlers to stop page reload.',
      'Use onChange to update state as the user types for real-time input handling.',
      'Never directly access DOM values; always read from React state.'
    ],
    xp: 15,
    practice: {
      title: 'Create a Todo Input Form',
      description: 'Build a form with a text input for new todos. When submitted, display the todo in a list below and clear the input.',
      startCode: `import React, { useState } from 'react';

export default function TodoApp() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    // Handle form submission
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <form onSubmit={handleSubmit}>
        {/* Add input and submit button */}
      </form>
      <ul>
        {/* Render todos here */}
      </ul>
    </div>
  );
}`,
      hint: 'In handleSubmit, add the input to the todos array and clear the input.',
      solution: `import React, { useState } from 'react';

export default function TodoApp() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          style={{ width: '80%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
    </div>
  );
}`,
      expectedOutput: 'A form where you type a todo and submit it, and it appears in a list below. The input clears after each submission.'
    }
  },
  {
    id: 'react-lists-keys',
    category: 'Rendering Patterns',
    title: 'Lists & Keys',
    difficulty: 'Intermediate',
    theory: [
      'Rendering lists in React is done using the `map()` function to transform an array of data into an array of JSX elements. Each element in a list should have a unique `key` prop to help React identify which items have changed. Keys help React match old elements with new ones during re-renders, which improves performance and prevents bugs with state. Without proper keys, React might render elements incorrectly or in the wrong order.',
      'The `key` should be a unique identifier that is stable across re-renders, like an ID from your data. Avoid using array indices as keys if the list can be reordered, sorted, or have items added/removed, because the index changes and React will lose track of component state. A good key comes from your data: `<li key={todo.id}>{todo.text}</li>`. Keys don\'t need to be globally unique, only unique among siblings.',
      'When rendering lists, always use the `key` prop on the outermost element being repeated. React uses keys to match elements across re-renders. Without keys, if your list state changes, React may re-render elements unnecessarily or mix up their internal state, causing bugs that are hard to debug.'
    ],
    syntax: '{items.map((item) => <li key={item.id}>{item.name}</li>)}',
    code: `import React, { useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', grade: '10' },
    { id: 2, name: 'Bob', grade: '9' },
    { id: 3, name: 'Charlie', grade: '11' }
  ]);

  const removeStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Students</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map((student) => (
          <li
            key={student.id}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{student.name} - Grade {student.grade}</span>
            <button onClick={() => removeStudent(student.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    output: 'A list of students with their grades. Each student can be removed by clicking a button.',
    notes: [
      'Always use a unique, stable key from your data, not array index.',
      'The key prop is not passed to the component; it\'s only used by React internally.',
      'Use the plural name for arrays: `students`, not `student`.'
    ],
    xp: 15,
    practice: {
      title: 'Display a List of Books',
      description: 'Create an array of book objects with title, author, and year. Render them as a list with proper keys.',
      startCode: `import React from 'react';

export default function BookList() {
  const books = [
    // Add book objects here
  ];

  return (
    <div>
      <h2>My Books</h2>
      <ul>
        {/* Render books with map and key */}
      </ul>
    </div>
  );
}`,
      hint: 'Create objects with id, title, author, and year properties. Use map to render them with key={book.id}.',
      solution: `import React from 'react';

export default function BookList() {
  const books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', year: 1997 },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
    { id: 3, title: 'Dune', author: 'Frank Herbert', year: 1965 }
  ];

  return (
    <div>
      <h2>My Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      expectedOutput: 'A list displaying three books with their titles, authors, and publication years.'
    }
  },
  {
    id: 'react-useeffect',
    category: 'State & Hooks',
    title: 'useEffect & Side Effects',
    difficulty: 'Intermediate',
    theory: [
      'The `useEffect` hook lets you perform side effects in functional components. Side effects are actions that interact with the outside world: fetching data, setting up timers, updating the document title, or subscribing to events. Side effects should not happen during rendering; they happen after the component renders. The `useEffect` hook runs after React updates the DOM. You can run effects after every render or only when dependencies change.',
      'Every `useEffect` call can have a dependency array as the second argument. If the array is omitted, the effect runs after every render. If the array is empty `[]`, the effect runs once when the component mounts. If the array contains values, the effect runs only when those values change. React compares the dependencies using strict equality, so include all values from the component scope that the effect uses.',
      'To clean up after side effects (like unsubscribing or canceling timers), return a cleanup function from `useEffect`. The cleanup function runs before the effect runs again and when the component unmounts. This prevents memory leaks and ensures your app doesn\'t perform duplicate operations.'
    ],
    syntax: 'useEffect(() => { /* effect */ }, [dependencies]);',
    code: `import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Timer</h1>
      <p style={{ fontSize: '32px' }}>{seconds}s</p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Resume'}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: '10px' }}>Reset</button>
    </div>
  );
}`,
    output: 'A timer that counts seconds and can be paused/resumed. The number increments every second.',
    notes: [
      'Always include a dependency array to prevent infinite re-renders.',
      'Return a cleanup function if your effect sets up subscriptions or timers.',
      'Be careful with async operations in useEffect; use a wrapper function or avoid top-level async.'
    ],
    xp: 15,
    practice: {
      title: 'Fetch and Display Data',
      description: 'Use useEffect to fetch a list of users from an API (use JSONPlaceholder /users endpoint) and display their names.',
      startCode: `import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users here
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {/* Render users */}
      </ul>
    </div>
  );
}`,
      hint: 'Use fetch() to get data from https://jsonplaceholder.typicode.com/users. Set loading to false when done.',
      solution: `import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
      expectedOutput: 'A list of user names fetched from JSONPlaceholder API, displayed after loading completes.'
    }
  },
  {
    id: 'react-conditional-rendering',
    category: 'Rendering Patterns',
    title: 'Conditional Rendering',
    difficulty: 'Intermediate',
    theory: [
      'Conditional rendering in React means showing different UI based on a condition. The most common approach is using JavaScript conditional operators like `if/else`, ternary operators `?:`, or logical `&&`. In JSX, you can\'t use `if` statements directly (JSX is an expression, not a statement), but you can use them in your component logic before the return statement. Use conditional expressions inside JSX: `{condition ? <ComponentA /> : <ComponentB />}`.',
      'The ternary operator `condition ? ifTrue : ifFalse` is perfect for choosing between two options. For showing or hiding a single element, use the logical AND operator: `{condition && <Component />}`. This works because if the left side is falsy, JavaScript short-circuits and doesn\'t render anything. Never return `false`, `null`, or `undefined` from JSX — React treats these as empty and renders nothing.',
      'Plan your conditional logic before writing JSX. If conditions are complex, extract them into helper variables or separate components for clarity. Avoid deeply nested conditionals in JSX; instead, create smaller, reusable components that each handle their own rendering logic.'
    ],
    syntax: '{isLoggedIn ? <Dashboard /> : <Login />}',
    code: `import React, { useState } from 'react';

export default function AuthComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');

  return (
    <div style={{ padding: '20px' }}>
      {isLoggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <p>Your role: {userRole}</p>
          {userRole === 'admin' && <p>You have admin privileges.</p>}
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please Login</h1>
          <button onClick={() => {
            setIsLoggedIn(true);
            setUserRole('user');
          }}>Login as User</button>
          <button onClick={() => {
            setIsLoggedIn(true);
            setUserRole('admin');
          }} style={{ marginLeft: '10px' }}>Login as Admin</button>
        </div>
      )}
    </div>
  );
}`,
    output: 'Shows a login prompt initially. After clicking login, shows a welcome message and a logout button. Admin users see an extra privileges message.',
    notes: [
      'Use ternary for two options, && for showing/hiding one element.',
      'Don\'t render false, null, or undefined; React renders nothing for these.',
      'Extract complex logic into helper functions for readability.'
    ],
    xp: 15,
    practice: {
      title: 'Build a Permission-Based UI',
      description: 'Create a component that shows different content based on a user\'s permission level (guest, user, premium).',
      startCode: `import React, { useState } from 'react';

export default function PermissionUI() {
  const [permission, setPermission] = useState('guest');

  return (
    <div>
      <h1>Content</h1>
      {/* Show different content based on permission */}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPermission('guest')}>Guest</button>
        <button onClick={() => setPermission('user')}>User</button>
        <button onClick={() => setPermission('premium')}>Premium</button>
      </div>
    </div>
  );
}`,
      hint: 'Use nested ternary or if/else to show different messages for each permission level.',
      solution: `import React, { useState } from 'react';

export default function PermissionUI() {
  const [permission, setPermission] = useState('guest');

  return (
    <div>
      <h1>Content</h1>
      {permission === 'guest' && <p>You can view this content.</p>}
      {permission === 'user' && <p>You can view and download content.</p>}
      {permission === 'premium' && <p>You can view, download, and access exclusive content.</p>}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPermission('guest')}>Guest</button>
        <button onClick={() => setPermission('user')}>User</button>
        <button onClick={() => setPermission('premium')}>Premium</button>
      </div>
    </div>
  );
}`,
      expectedOutput: 'Three buttons that change the permission level. The displayed message changes based on the selected permission.'
    }
  },
  {
    id: 'react-usecontext',
    category: 'Advanced',
    title: 'useContext & Lifting State',
    difficulty: 'Intermediate',
    theory: [
      'As React apps grow, passing props through many levels of components becomes tedious ("prop drilling"). The Context API and `useContext` hook solve this by letting you share state across many components without passing it explicitly. Create a context with `React.createContext()`, provide it with a value using `<ContextProvider>`, and consume it in child components using the `useContext` hook. Context is useful for global state like themes, user authentication, or language preferences.',
      '"Lifting state up" is a React pattern where you move state from child components to a parent component so multiple children can share it. The parent owns the state and passes it down as props. This makes your app\'s data flow predictable and easier to debug. However, if you need to share state across many levels, Context is better than prop drilling.',
      'Context is useful for moderately global data but not a replacement for state management libraries like Redux for very large apps. Create custom hooks that use `useContext` to make consumption cleaner. Avoid using Context for frequently-changing data (like animation values), as Context causes all consumers to re-render when the value changes.'
    ],
    syntax: 'const value = useContext(MyContext);',
    code: `import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <header style={{
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#000',
      padding: '20px'
    }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}`,
    output: 'A header with a theme toggle button. Clicking it switches between dark and light backgrounds.',
    notes: [
      'Create Context outside components to avoid recreating it on every render.',
      'Wrap your app or a subtree with a Provider component to make context available.',
      'Use useContext to consume context values in any child component.'
    ],
    xp: 15,
    practice: {
      title: 'Create a Language Context',
      description: 'Build a language context that switches between English and Spanish. Display a greeting in the selected language.',
      startCode: `import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Add state for language

  return (
    <LanguageContext.Provider value={/* value */}>
      {children}
    </LanguageContext.Provider>
  );
}

function Greeting() {
  // Use context here
  return <h1>{/* greeting */}</h1>;
}

export default function App() {
  return (
    <LanguageProvider>
      <Greeting />
    </LanguageProvider>
  );
}`,
      hint: 'Store language in useState. Create a toggle function. Provide both language and toggle in the context value.',
      solution: `import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function Greeting() {
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const greeting = lang === 'en' ? 'Hello!' : 'Hola!';

  return (
    <div>
      <h1>{greeting}</h1>
      <button onClick={toggleLanguage}>Switch Language</button>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Greeting />
    </LanguageProvider>
  );
}`,
      expectedOutput: 'A greeting that says "Hello!" in English or "Hola!" in Spanish. A button toggles between the two.'
    }
  },
  {
    id: 'react-api-fetching',
    category: 'Advanced',
    title: 'Fetching Data from an API',
    difficulty: 'Intermediate',
    theory: [
      'APIs (Application Programming Interfaces) let your React app fetch data from servers. The most common way is using the `fetch()` function, which returns a Promise. Call fetch with a URL, chain `.then()` calls to parse the response and update state, and use `.catch()` to handle errors. For cleaner code, use `async/await` syntax inside useEffect. Always fetch data in useEffect, not during rendering, to avoid infinite loops.',
      'When fetching data, manage loading and error states. Start with `loading: true`, update it to `false` when data arrives, and show a loading message to the user. Also handle errors gracefully by catching them and displaying an error message. This creates a better user experience and makes debugging easier.',
      'REST APIs return data as JSON. Use `response.json()` to parse the JSON string into JavaScript objects. Some APIs require authentication headers or query parameters. Remember to include a dependency array `[]` in useEffect so the fetch only happens once when the component mounts, preventing multiple requests.'
    ],
    syntax: 'fetch(url).then(res => res.json()).then(data => setData(data));',
    code: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.7&longitude=77.1&current=temperature_2m,weather_code&timezone=auto')
      .then(res => res.json())
      .then(data => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch weather');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Weather in Delhi</h1>
      <p style={{ fontSize: '24px' }}>
        Temperature: {weather.temperature_2m}°C
      </p>
      <p>Weather Code: {weather.weather_code}</p>
    </div>
  );
}`,
    output: 'Displays current temperature in Delhi fetched from a weather API. Shows loading text initially.',
    notes: [
      'Always use useEffect to fetch data, never fetch during render.',
      'Handle loading and error states for a better user experience.',
      'Use .catch() to handle network errors gracefully.'
    ],
    xp: 15,
    practice: {
      title: 'Fetch and Display Quotes',
      description: 'Fetch a random quote from an API (use quotable.io/api/random) and display it. Add a button to fetch a new quote.',
      startCode: `import React, { useState } from 'react';

export default function QuoteApp() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    // Fetch and set quote
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Random Quotes</h1>
      {quote && (
        <div>
          <p>"{quote.content}"</p>
          <p>- {quote.author}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <button onClick={fetchQuote}>Get Quote</button>
    </div>
  );
}`,
      hint: 'Use fetch() to get data from https://api.quotable.io/api/random. Set loading state before and after fetching.',
      solution: `import React, { useState, useEffect } from 'react';

export default function QuoteApp() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    fetch('https://api.quotable.io/api/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Random Quotes</h1>
      {quote && (
        <div style={{ fontSize: '18px', marginBottom: '20px' }}>
          <p>"{quote.content}"</p>
          <p>- {quote.author}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <button onClick={fetchQuote} style={{ padding: '10px 20px' }}>Get Quote</button>
    </div>
  );
}`,
      expectedOutput: 'A quote and author displayed on page load. Clicking "Get Quote" fetches and displays a new random quote.'
    }
  },
  {
    id: 'react-build-deploy',
    category: 'React Fundamentals',
    title: 'Building & Deploying a React App (Vite)',
    difficulty: 'Beginner',
    theory: [
      'React apps are written in JSX and need to be compiled to regular JavaScript before browsers can run them. Vite is a modern build tool that compiles your code, optimizes it, and bundles it for production. During development, you run `npm run dev` to start a dev server with hot module replacement (changes appear instantly). For deployment, you run `npm run build` to create a optimized `dist` folder containing production-ready files.',
      'Vite is much faster than older tools like Create React App because it uses ES modules and only bundles what\'s needed. The development server serves your app at `http://localhost:5173` by default. When you make code changes, Vite only recompiles the changed file, making development fast. The build step minifies your code, splits it into chunks, and optimizes assets like images.',
      'To deploy a React app, upload the contents of the `dist` folder to a web host (like Firebase Hosting, Vercel, or Netlify). The dist folder is self-contained and doesn\'t need Node.js to run — it\'s just HTML, CSS, and JavaScript. Configure your host to serve `index.html` for all routes so React Router works correctly. Always run `npm run build` locally before deploying to catch errors early.'
    ],
    syntax: 'npm run dev\nnpm run build\nnpm run preview',
    code: `// package.json
{
  "name": "my-react-app",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^6.0.0"
  }
}`,
    output: 'A configuration file that defines build scripts and dependencies for a React Vite project.',
    notes: [
      'Always run npm install before npm run dev to install dependencies.',
      'The dist folder is what gets deployed to production.',
      'Use npm run preview to test the production build locally before deploying.'
    ],
    xp: 10,
    practice: {
      title: 'Create and Build a React Project',
      description: 'Initialize a Vite React project, create a simple component, run it in development, and build it for production.',
      startCode: `// Follow these steps:
1. Open terminal in your project folder
2. Run: npm create vite@latest my-app -- --template react
3. Run: cd my-app
4. Run: npm install
5. Run: npm run dev
6. Open browser at http://localhost:5173
7. Edit src/App.jsx and see changes live
8. Run: npm run build
9. Check the dist folder for production files`,
      hint: 'Each step is a command to run in your terminal. After npm run build, the dist folder contains everything to deploy.',
      solution: `After following the steps:
- npm run dev starts a development server at http://localhost:5173
- Changes to src/App.jsx appear instantly (hot reload)
- npm run build creates the dist folder with optimized production code
- The dist folder is ready to upload to a web host`,
      expectedOutput: 'A working React development environment and a dist folder ready for deployment.'
    }
  }
];
