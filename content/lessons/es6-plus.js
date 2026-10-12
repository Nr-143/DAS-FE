/**
 * DSA Tracker — Lesson Content: ES6+ (Level 1)
 * ─────────────────────────────────────────────
 * Comprehensive interactive module: Modern JavaScript Syntax,
 * Destructuring, Spread vs Rest, Arrow Function Lexical Scoping,
 * Optional Chaining, Nullish Coalescing, and Visualizer.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["es6-plus"] = {
  id: "es6-plus",
  title: "ES6+",
  levelTitle: "Level 1 — Foundations",
  summary: "Modern JavaScript syntax: Arrow functions, template literals, destructuring, spread/rest, default parameters, optional chaining, and nullish coalescing.",

  definitions: [
    {
      term: "ES6+ (ECMAScript 2015+)",
      def: "The umbrella term for modern JavaScript syntax introduced starting with ES6 (2015) and subsequent yearly specifications. It provides cleaner, shorter, more expressive paradigms for writing logic."
    },
    {
      term: "Arrow Function",
      def: "A compact function syntax using <code>=></code>. Unlike traditional <code>function</code> declarations, arrow functions do not bind their own <code>this</code>, <code>arguments</code>, or <code>super</code>; they inherit <code>this</code> lexically from their enclosing scope."
    },
    {
      term: "Template Literal",
      def: "Strings enclosed by backticks (<code>\`...\`</code>) allowing embedded expression interpolation via <code>\${...}</code> and multi-line strings without cumbersome <code>+</code> string concatenation."
    },
    {
      term: "Destructuring",
      def: "Syntax for extracting values from arrays by index position or from objects by property keys directly into distinct variables in a single expressive step."
    },
    {
      term: "Spread Operator (...)",
      def: "Expands an iterable collection (array or object) OUT into individual elements (e.g., shallow copies <code>[...arr]</code>, merging objects <code>{...a, ...b}</code>)."
    },
    {
      term: "Rest Parameter (...)",
      def: "Gathers multiple comma-separated function arguments IN into a single real JavaScript Array (e.g., <code>function sum(...numbers)</code>)."
    },
    {
      term: "Optional Chaining (?.)",
      def: "Safely accesses deeply nested properties, returning <code>undefined</code> instead of throwing a fatal <code>TypeError: Cannot read properties of null/undefined</code>."
    },
    {
      term: "Nullish Coalescing (??)",
      def: "A logical operator that returns its right-hand operand only when its left-hand operand is specifically <code>null</code> or <code>undefined</code>, avoiding false positives on valid falsy values like <code>0</code>, <code>''</code>, or <code>false</code>."
    }
  ],

  howItWorksTogether: "Modern JavaScript utilizes these syntax features in tandem: functions use destructuring in parameter lists with default fallback values, arrow functions preserve outer lexical context in callbacks, spread clones and merges collections immutably, and optional chaining prevents crashes when parsing API payloads.",

  whyMatters: "Almost all modern DSA problem solutions and production codebases (React, Node.js) rely heavily on ES6+. Using arrow functions, destructuring, and spread operators makes code concise and avoids subtle scoping and mutation bugs.",

  interactiveWidget: "es6-visualizer",

  workedExample: {
    title: "ES6+ Syntax Comparison",
    primitiveText: "<code>// Destructuring:<br/>const [a, b] = [10, 20];<br/>const { name, role } = { name: 'Alex', role: 'Dev' };<br/><br/>// Spread vs Rest:<br/>const clone = [...arr]; // SPREAD: expands out<br/>function logAll(...args) {} // REST: gathers in<br/><br/>// Safe Navigation:<br/>const city = user?.address?.city ?? 'Unknown';</code>",
    referenceText: "Notice how optional chaining eliminates multiple nested if-checks!"
  },

  codeSnippet: `// Modern ES6+ Features
// 1. Arrow functions — Lexical 'this'
const double = n => n * 2;

// 2. Destructuring — Array & Object
const [first, second] = [10, 20];
const { name, age } = { name: "Sam", age: 25 };

// 3. Spread (out) & Rest (in)
const combined = [...[1, 2], ...[3, 4]]; // [1, 2, 3, 4]
function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

// 4. Default parameters
function greet(user = "Guest") {
  return \`Welcome, \${user}!\`;
}

// 5. Optional Chaining & Nullish Coalescing
const response = { data: null };
const count = response.data?.stats?.count ?? 0;`,

  complexityNotes: [
    "Most ES6+ syntax features are compile-time sugar with zero performance penalty.",
    "Spread operations ([...arr] / {...obj}) perform a shallow copy taking O(n) Time and Memory proportional to collection size."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Using Arrow Functions for Object Methods that Require 'this'",
      desc: "Arrow functions do not bind their own <code>this</code>. If an object method uses an arrow function, <code>this</code> will point to the outer window or module, NOT the object calling the method."
    },
    {
      title: "Mistake 2: Confusing || with ?? for Default Values",
      desc: "<code>value || fallback</code> evaluates to fallback if value is <code>0</code>, <code>''</code>, or <code>false</code>. If 0 is a valid number, use <code>value ?? fallback</code> instead."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What does the expression 0 ?? 'fallback' evaluate to?",
      options: [
        "A. 0",
        "B. 'fallback'",
        "C. undefined",
        "D. NaN"
      ],
      answer: "A",
      explanation: "Nullish coalescing (??) only falls back when the left operand is null or undefined. Since 0 is defined, it evaluates to 0."
    },
    {
      question: "Q2. In 'function fn(...args) {}' and '[...arr]', which use of '...' is rest and which is spread?",
      options: [
        "A. Both are spread",
        "B. Both are rest",
        "C. fn(...args) is rest (gather), and [...arr] is spread (expand)",
        "D. fn(...args) is spread, and [...arr] is rest"
      ],
      answer: "C",
      explanation: "Rest collects multiple function arguments into an array. Spread expands an array out into individual elements."
    }
  ],

  practice: [
    {
      q: "Why do arrow functions make callback functions in Array methods (.map, .filter) much safer?",
      a: "Because arrow functions inherit lexical `this` from the outer class or component scope, avoiding the classic bug where regular callbacks lose their `this` context."
    }
  ],

  challenge: {
    titleText: "Challenge: Deep Clone vs Shallow Spread",
    desc: "Explain why `const copy = {...obj}` only creates a shallow clone, and what happens when an inner nested object `obj.settings.theme` is mutated on the copy."
  }
};
