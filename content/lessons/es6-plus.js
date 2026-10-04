/**
 * DSA Tracker — Lesson Content: ES6+
 * ──────────────────────────────────────────────
 * Independent content module adhering to schema.
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
      def: "The umbrella term for the modern JavaScript syntax introduced starting with ES6 (2015) and every yearly update since. It doesn't add new capabilities so much as cleaner, shorter ways to write things that were possible but clunkier before."
    },
    {
      term: "Arrow Function",
      def: "A shorter function syntax using `=>`. Unlike a regular function, it does **not** have its own `this` — it uses `this` from the surrounding (enclosing) scope instead."
    },
    {
      term: "Template Literal",
      def: "A string written with backticks (\\`) that supports embedded expressions via `\\${...}` and multi-line text, without manual string concatenation."
    },
    {
      term: "Destructuring",
      def: "Syntax for unpacking values out of an array, or properties out of an object, into individual variables in a single step."
    },
    {
      term: "Spread / Rest Operator",
      def: "The same `...` syntax used in two opposite directions: **spread** expands an array/object out into individual elements (e.g. copying or merging); **rest** collects multiple individual values back together into a single array or object (e.g. extra function arguments)."
    },
    {
      term: "Default Parameters",
      def: "Function parameters that automatically fall back to a specified value if no argument (or `undefined`) is passed for them."
    },
    {
      term: "Optional Chaining (`?.`)",
      def: "Safely reads a nested property, returning `undefined` instead of throwing an error if something in the middle of the chain is `null` or `undefined`."
    },
    {
      term: "Nullish Coalescing (`??`)",
      def: "Returns the right-hand value only when the left-hand value is specifically `null` or `undefined` — unlike `||`, it does **not** fall back on other falsy values like `0`, `\"\"`, or `false`."
    }
  ],

  howItWorksTogether: "These features are mostly about writing the same logic more clearly and with less repetition. A single modern function might combine several of them at once: destructuring to pull values straight out of its parameters, default values for anything missing, and a template literal to build its return string — all in a few lines that would have taken noticeably more pre-ES6 code. Spread and rest look identical (`...`) but point in opposite directions — which one you're using depends on whether the `...` is producing a collection or expanding one.",

  whyItMatters: "Modern JavaScript relies heavily on ES6+. Using <code>let</code>/<code>const</code> (see <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"variables-and-memory\">Variables & Memory</a>) is essential for proper scoping. Destructuring is most commonly used on <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Objects</a> to unpack properties cleanly. Arrow functions and default parameters change how <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"function-calls\">Function Calls</a> are written and called, making callbacks and argument handling much more elegant.",

  workedExample: {
    title: "ES6+ Feature Comparison",
    primitiveText: "<code>// Old vs New<br/>var name = obj.name; // Pre-ES6<br/>const { name } = obj; // ES6+<br/><br/>var copy = arr.slice(); // Pre-ES6<br/>const copy = [...arr]; // ES6+</code>",
    referenceText: "Notice how the syntax is significantly shorter and more readable."
  },

  visual: {
    caption: "Figure 1: Spread expands collections out, while Rest gathers individual values in.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <g transform="translate(100, 40)">
          <rect width="200" height="120" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="100" y="30" fill="var(--text-primary)" font-size="16" font-weight="bold" text-anchor="middle">Spread (OUT)</text>
          <text x="100" y="65" fill="var(--accent-secondary)" font-size="18" font-family="monospace" text-anchor="middle">[...[1, 2]]</text>
          <text x="100" y="95" fill="var(--text-primary)" font-size="14" text-anchor="middle">Produces: 1, 2</text>
        </g>
        <g transform="translate(400, 40)">
          <rect width="200" height="120" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="100" y="30" fill="var(--text-primary)" font-size="16" font-weight="bold" text-anchor="middle">Rest (IN)</text>
          <text x="100" y="65" fill="var(--accent-primary)" font-size="18" font-family="monospace" text-anchor="middle">f(...args)</text>
          <text x="100" y="95" fill="var(--text-primary)" font-size="14" text-anchor="middle">Collects into array</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Arrow functions — shorter syntax, no own \`this\`</span>
<span class="kw">const</span> <span class="fn">square</span> = n =&gt; n * n;
<span class="kw">const</span> <span class="fn">add</span> = (a, b) =&gt; a + b;

<span class="cm">// Template literals — embedded expressions, no + concatenation</span>
<span class="kw">const</span> name = <span class="str">"Sam"</span>;
console.<span class="fn">log</span>(<span class="str">\`Hello, \${name}! 2 + 2 = \${2 + 2}\`</span>);

<span class="cm">// Destructuring — unpack in one step</span>
<span class="kw">const</span> [first, second] = [<span class="num">10</span>, <span class="num">20</span>];
<span class="kw">const</span> { name: userName, age } = { name: <span class="str">"Alex"</span>, age: <span class="num">30</span> };

<span class="cm">// Spread — expands values OUT</span>
<span class="kw">const</span> combined = [...[<span class="num">1</span>, <span class="num">2</span>], ...[<span class="num">3</span>, <span class="num">4</span>]];      <span class="cm">// [1, 2, 3, 4]</span>
<span class="kw">const</span> merged = { ...{ a: <span class="num">1</span> }, ...{ b: <span class="num">2</span> } };  <span class="cm">// { a: 1, b: 2 }</span>

<span class="cm">// Rest — collects values IN</span>
<span class="kw">function</span> <span class="fn">sum</span>(...nums) {
  <span class="kw">return</span> nums.<span class="fn">reduce</span>((total, n) =&gt; total + n, <span class="num">0</span>);
}
<span class="fn">sum</span>(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>); <span class="cm">// 6</span>

<span class="cm">// Default parameters</span>
<span class="kw">function</span> <span class="fn">greet</span>(name = <span class="str">"friend"</span>) {
  <span class="kw">return</span> <span class="str">\`Hi, \${name}\`</span>;
}
<span class="fn">greet</span>(); <span class="cm">// "Hi, friend"</span>

<span class="cm">// Optional chaining + nullish coalescing</span>
<span class="kw">const</span> user = { profile: <span class="kw">null</span> };
<span class="kw">const</span> city = user.profile?.address?.city ?? <span class="str">"Unknown"</span>;`,

  complexityNotes: [
    "Most ES6+ features do not change inherent time or space complexity; they reduce boilerplate.",
    "Spread operations like <code>[...arr]</code> or <code>{...obj}</code> create a shallow copy, which takes O(n) Time and Space."
  ],

  commonMistakes: [
    {
      title: "Using an arrow function as an object method when `this` needs to refer to that object",
      desc: "Arrow functions don't have their own <code>this</code>, so <code>this</code> inside one refers to whatever scope it was defined in, not the object calling the method. Use a regular function for methods that need <code>this</code>."
    },
    {
      title: "Confusing spread and rest because they look identical",
      desc: "Spread is on the <em>producing</em> side (building/passing a collection: <code>[...arr]</code>, <code>f(...args)</code>), rest is on the <em>receiving</em> side (a function's parameter list or a destructuring pattern collecting the leftovers: <code>function f(...args)</code>)."
    },
    {
      title: "Using `||` instead of `??` for a default value",
      desc: "<code>someValue || fallback</code> incorrectly falls back even when <code>someValue</code> is legitimately <code>0</code>, <code>\"\"</code>, or <code>false</code>. <code>??</code> only falls back for <code>null</code>/<code>undefined</code>, which is usually what's actually intended."
    }
  ],

  practice: [
    {
      q: "Question 1: What's different about `this` inside an arrow function compared to a regular function?",
      a: "An arrow function does not have its own `this`; it inherits `this` from the surrounding (enclosing) scope, whereas a regular function gets its own `this` based on how it is called."
    },
    {
      q: "Question 2: In `function f(...args) {}` and `[...arr1, ...arr2]`, which use of `...` is spread and which is rest?",
      a: "In `function f(...args) {}`, it is **rest** (collecting multiple arguments into an array). In `[...arr1, ...arr2]`, it is **spread** (expanding arrays into individual elements)."
    },
    {
      q: "Question 3: What does `0 || \"default\"` evaluate to, and how does that differ from `0 ?? \"default\"`?",
      a: "`0 || \"default\"` evaluates to `\"default\"` because `0` is falsy. `0 ?? \"default\"` evaluates to `0` because `??` only falls back for `null` or `undefined`."
    }
  ],

  challenge: {
    titleText: "Challenge: Refactor pre-ES6 code",
    desc: "Take a pre-ES6-style function (using the <code>function</code> keyword, manual string concatenation with <code>+</code>, and manual handling of missing arguments) and rewrite it using arrow functions, template literals, destructuring, and default parameters."
  }
};
