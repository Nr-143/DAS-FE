/**
 * DSA Tracker — Lesson Content: Variables & Memory
 * ──────────────────────────────────────────────────
 * Independent content module adhering to Schema (Task 1 & Task 2).
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["variables-and-memory"] = {
  id: "variables-and-memory",
  title: "Variables & Memory",
  levelTitle: "Level 1 — Foundations",
  summary: "Master variable declarations (var, let, const), memory allocation, stack vs heap, and reference mutability.",

  // Task 2: Definition-Style Format
  definitions: [
    {
      term: "Variable",
      def: "A named reference that points to a value stored in memory."
    },
    {
      term: "Stack",
      def: "Fast, fixed-size memory that stores primitive values and function call frames; cleared automatically when a scope ends."
    },
    {
      term: "Heap",
      def: "Larger, flexible memory that stores objects, arrays, and functions; managed by the garbage collector."
    },
    {
      term: "Primitive",
      def: "A value type (number, string, boolean, null, undefined, symbol, bigint) copied by value wherever it is assigned."
    },
    {
      term: "Reference",
      def: "An object, array, or function; variables holding these store a pointer to the heap, not the value itself."
    }
  ],

  // Task 2: Combined Flow Explanation ("How it all works together")
  howItWorksTogether: "When you write <code>let x = 5</code>, JavaScript stores <code>5</code> directly on the stack under the name <code>x</code>. When you write <code>let obj = { a: 1 }</code>, the object <code>{ a: 1 }</code> is created on the heap, and the stack only stores a reference (an address) pointing to it. This is why copying <code>obj</code> to another variable copies the <em>reference</em>, not the object — both variables end up pointing at the same heap location.",

  // Additional Structured Content
  whyItMatters: "Mastering variable allocation prevents unpredictable state bugs and memory leaks. It explains why mutating an object in one function alters it everywhere, why <code>const</code> allows array property modifications, and how closure variable references persist in memory.",

  workedExample: {
    title: "Primitive Copy (Stack Value) vs Reference Copy (Heap Pointer)",
    primitiveText: "<code>let score1 = 100; let score2 = score1; score2 = 200;</code><br/>Result: <code>score1</code> remains <code>100</code> because <code>score2</code> received an independent copy of the value on the Stack.",
    referenceText: "<code>let user1 = { name: 'Alice' }; let user2 = user1; user2.name = 'Bob';</code><br/>Result: <code>user1.name</code> becomes <code>'Bob'</code>! Both variables hold identical heap pointers (e.g. <code>0x00FF</code>) pointing to the same object."
  },

  visual: {
    caption: "Figure 1: Primitive values reside directly in Stack slots. References store dynamic 64-bit pointers pointing to Heap memory locations.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <g transform="translate(30, 25)">
          <rect width="280" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="140" y="30" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">STACK MEMORY (Static)</text>
          <rect x="20" y="50" width="240" height="36" fill="rgba(108,99,255,0.1)" stroke="var(--border-accent)" rx="6"/>
          <text x="35" y="73" fill="var(--text-primary)" font-size="13" font-weight="600">score1: 100</text>
          <rect x="20" y="96" width="240" height="36" fill="rgba(0,201,167,0.1)" stroke="var(--accent-secondary)" rx="6"/>
          <text x="35" y="119" fill="var(--text-primary)" font-size="13" font-weight="600">user1: 0x1A4F</text>
          <rect x="20" y="142" width="240" height="36" fill="rgba(0,201,167,0.1)" stroke="var(--accent-secondary)" rx="6"/>
          <text x="35" y="165" fill="var(--text-primary)" font-size="13" font-weight="600">user2: 0x1A4F</text>
        </g>
        <g transform="translate(315, 110)">
          <path d="M 0 10 Q 40 -10 65 15" stroke="var(--accent-secondary)" stroke-width="3" fill="none" marker-end="url(#arrow)" />
          <path d="M 0 55 Q 40 40 65 25" stroke="var(--accent-secondary)" stroke-width="3" fill="none" marker-end="url(#arrow)" />
        </g>
        <g transform="translate(390, 25)">
          <rect width="280" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="140" y="30" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">HEAP MEMORY (Dynamic)</text>
          <rect x="25" y="60" width="230" height="100" fill="rgba(0,201,167,0.15)" stroke="var(--accent-secondary)" stroke-width="2" rx="8" />
          <text x="40" y="88" fill="var(--text-primary)" font-size="12" font-weight="bold">Address: 0x1A4F</text>
          <text x="40" y="115" fill="var(--text-primary)" font-size="13" font-family="monospace">Object {</text>
          <text x="60" y="135" fill="var(--accent-primary)" font-size="13" font-family="monospace">name: "Bob"</text>
          <text x="40" y="150" fill="var(--text-primary)" font-size="13" font-family="monospace">}</text>
        </g>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-secondary)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Scope & Temporal Dead Zone (TDZ)</span>
<span class="kw">function</span> <span class="fn">demoTDZ</span>() {
  <span class="cm">// console.log(a); // Error: ReferenceError</span>
  <span class="kw">let</span> a = <span class="num">10</span>;
  
  <span class="kw">if</span> (<span class="kw">true</span>) {
    <span class="kw">var</span> globalScoped = <span class="str">"var leaks outside if block"</span>;
    <span class="kw">let</span> blockScoped = <span class="str">"let stays inside if block"</span>;
  }
  <span class="fn">console.log</span>(globalScoped); <span class="cm">// "var leaks outside if block"</span>
}

<span class="cm">// 2. Const Binding vs Object Mutability</span>
<span class="kw">const</span> person = { name: <span class="str">"Alice"</span> };
person.name = <span class="str">"Bob"</span>; <span class="cm">// Valid! Mutating heap contents.</span>

<span class="cm">// 3. Freezing Heap Objects</span>
<span class="kw">const</span> frozenPerson = Object.<span class="fn">freeze</span>({ name: <span class="str">"Alice"</span> });`,

  complexityNotes: [
    "Stack Variable Access: O(1) Constant Time.",
    "Heap Pointer Dereferencing: O(1) Constant Time.",
    "Shallow Copy (Object.assign / Spread): O(n) Linear Time relative to keys.",
    "Deep Clone (structuredClone / JSON.parse): O(N) where N is total nested object nodes."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Believing const makes objects immutable",
      desc: "<code>const</code> only locks the variable binding (Stack reference pointer). Object contents in Heap memory can still be mutated freely."
    },
    {
      title: "Mistake 2: Assuming var respects block scope ({ })",
      desc: "<code>var</code> is function-scoped. Declaring a <code>var</code> inside an <code>if</code> block or <code>for</code> loop leaks it into the surrounding function context."
    },
    {
      title: "Mistake 3: Accessing let/const before declaration",
      desc: "Unlike <code>var</code> (which hoists as <code>undefined</code>), <code>let</code> and <code>const</code> enter the Temporal Dead Zone (TDZ) and throw a <code>ReferenceError</code>."
    }
  ],

  practice: [
    {
      q: "Question 1: What happens when you run `const arr = [1, 2]; arr.push(3);`?",
      a: "It succeeds without error! `arr` becomes `[1, 2, 3]`. `push()` mutates array contents in Heap memory. The Stack reference in `const arr` remains unchanged."
    },
    {
      q: "Question 2: What is the value of `x` after: `let x = 5; let y = x; y += 5;`?",
      a: "`x` remains `5`. Numbers are primitives stored by value in Stack memory. Assigning `y = x` creates an independent copy."
    },
    {
      q: "Question 3: Why does `console.log(a)` output `undefined` before `var a = 10`, but throws `ReferenceError` before `let a = 10`?",
      a: "`var` is hoisted and initialized with `undefined`. `let` is hoisted into the Temporal Dead Zone (TDZ) and remains uninitialized until execution reaches declaration."
    }
  ],

  challenge: {
    titleText: "Challenge: Shallow vs Deep Comparison",
    desc: "Write a JavaScript function <code>shallowEqual(obj1, obj2)</code> that compares two objects for equality of primitive values without mutating either object or throwing errors on null inputs."
  }
};
