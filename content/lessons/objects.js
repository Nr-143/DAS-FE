/**
 * DSA Tracker — Lesson Content: Objects
 * ──────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["objects"] = {
  id: "objects",
  title: "Objects",
  levelTitle: "Level 1 — Foundations",
  summary: "Master JavaScript objects, key-value property structures, reference memory, mutation, and copying behavior.",

  definitions: [
    {
      term: "Object",
      def: "A collection of key-value pairs (properties) used to group related data and behavior together. Plain-language analogy: like a labeled folder holding several related pieces of information at once."
    },
    {
      term: "Property",
      def: "A single key-value pair belonging to an object. Plain-language analogy: a single labeled slot inside the folder, like 'name': 'Alex'."
    },
    {
      term: "Method",
      def: "A property whose value is a function, giving an object behavior (something it can 'do'), not just data. Plain-language analogy: a built-in instruction inside the folder, like a calculator button that performs an action when pressed."
    },
    {
      term: "Reference",
      def: "Objects live in the heap (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"variables-and-memory\">Variables & Memory</a> lesson); a variable holding an object actually stores a reference (an address) pointing to that heap location, not the object's contents directly. Plain-language analogy: like writing down a home address on a card — passing the card gives someone access to the house, not a physical duplicate of the house."
    },
    {
      term: "Mutation",
      def: "Changing a property's value inside an existing object without creating a brand-new object. Plain-language analogy: repainting a wall inside an existing house rather than building a brand new house."
    }
  ],

  howItWorksTogether: "Because objects are stored by reference, assigning an object to a new variable copies the reference, not the object itself. Both variables now point to the exact same object in memory — so mutating the object through one variable is visible through the other, immediately. This is the direct opposite of how primitives behave (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"primitives\">Primitives</a> lesson).",

  whyItMatters: "Understanding heap references and object aliasing prevents shared-state mutation bugs where modifying a parameter inside a helper function silently alters state in the caller context.",

  workedExample: {
    title: "Object Reference Aliasing vs Shallow Copying",
    primitiveText: "<code>const user = { name: \"Alex\" };<br/>const alias = user;      // alias points to the SAME object as user<br/>alias.name = \"Sam\";<br/>console.log(user.name);  // \"Sam\" — both variables see the change</code>",
    referenceText: "To actually copy an object's properties into a brand new object: <code>const shallowCopy = { ...user }; // new object, one level deep</code>."
  },

  visual: {
    caption: "Figure 1: Variables user and alias hold identical Heap reference pointers (0x4B2). Mutating alias changes the shared Heap object.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <g transform="translate(30, 25)">
          <rect width="280" height="180" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="140" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">STACK MEMORY (Pointers)</text>
          
          <rect x="20" y="55" width="240" height="40" fill="rgba(0,201,167,0.1)" stroke="var(--accent-secondary)" rx="6"/>
          <text x="35" y="80" fill="var(--text-primary)" font-size="13" font-weight="600">user: 0x4B2</text>
          
          <rect x="20" y="110" width="240" height="40" fill="rgba(0,201,167,0.1)" stroke="var(--accent-secondary)" rx="6"/>
          <text x="35" y="135" fill="var(--text-primary)" font-size="13" font-weight="600">alias: 0x4B2</text>
        </g>
        
        <g transform="translate(315, 95)">
          <path d="M 0 10 Q 40 -10 65 15" stroke="var(--accent-secondary)" stroke-width="3" fill="none" marker-end="url(#arrow-obj)" />
          <path d="M 0 55 Q 40 40 65 25" stroke="var(--accent-secondary)" stroke-width="3" fill="none" marker-end="url(#arrow-obj)" />
        </g>
        
        <g transform="translate(390, 25)">
          <rect width="280" height="180" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="140" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">HEAP MEMORY (Single Object)</text>
          
          <rect x="25" y="55" width="230" height="100" fill="rgba(0,201,167,0.15)" stroke="var(--accent-secondary)" stroke-width="2" rx="8" />
          <text x="40" y="80" fill="var(--text-primary)" font-size="11" font-weight="bold">Address: 0x4B2</text>
          <text x="40" y="105" fill="var(--text-primary)" font-size="13" font-family="monospace">Object {</text>
          <text x="60" y="125" fill="var(--accent-primary)" font-size="13" font-family="monospace">name: "Sam"</text>
          <text x="40" y="142" fill="var(--text-primary)" font-size="13" font-family="monospace">}</text>
        </g>
        
        <defs>
          <marker id="arrow-obj" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-secondary)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Object Reference Aliasing & Mutation</span>
<span class="kw">const</span> user = { name: <span class="str">"Alex"</span> };
<span class="kw">const</span> alias = user;      <span class="cm">// alias points to the SAME object as user</span>
alias.name = <span class="str">"Sam"</span>;
console.<span class="fn">log</span>(user.name);  <span class="cm">// "Sam" — both variables see the change</span>

<span class="cm">// 2. Shallow Copy using Spread ({ ...obj })</span>
<span class="kw">const</span> shallowCopy = { ...user }; <span class="cm">// new object, one level deep</span>
shallowCopy.name = <span class="str">"Jordan"</span>;
console.<span class="fn">log</span>(user.name);        <span class="cm">// "Sam" (top-level primitive property is independent)</span>

<span class="cm">// 3. Nested Object Reference Trap (Shallow Copy Limit)</span>
<span class="kw">const</span> original = { info: { age: <span class="num">25</span> } };
<span class="kw">const</span> copy = { ...original };
copy.info.age = <span class="num">30</span>;
console.<span class="fn">log</span>(original.info.age); <span class="cm">// 30! Nested objects are still shared references!</span>

<span class="cm">// 4. Reference Equality vs Content Comparison</span>
console.<span class="fn">log</span>({ a: <span class="num">1</span> } === { a: <span class="num">1</span> }); <span class="cm">// false! Different heap memory addresses</span>`,

  complexityNotes: [
    "Property Lookup & Key Assignment: O(1) Average Time.",
    "Spread Operator ({ ...obj }): O(k) Time where k is number of top-level keys.",
    "Reference Equality Check (obj1 === obj2): O(1) Time (compares memory address pointers)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming spread ({ ...obj }) creates a full deep copy",
      desc: "Assuming <code>{ ...obj }</code> (spread) creates a full deep copy — it only copies one level deep; any nested objects/arrays inside are still shared references between the original and the copy."
    },
    {
      title: "Mistake 2: Comparing two objects with ===",
      desc: "Comparing two objects with <code>===</code> expecting it to check their contents — it actually checks whether they're the exact same reference in memory, so two separate objects with identical properties are still <code>!==</code> each other."
    }
  ],

  practice: [
    {
      q: "Question 1: Why does `console.log({ id: 10 } === { id: 10 })` output `false`?",
      a: "The `===` operator compares memory references for objects. Creating two object literals allocates two distinct objects at different Heap addresses, so their pointers are not equal (`!==`)."
    },
    {
      q: "Question 2: If `const a = { x: 1 }; const b = a; b.x = 99;`, what is `a.x`?",
      a: "`a.x` is `99`. Variable `b` was assigned the reference to object `a`. Both variables point to the exact same Heap memory location, so mutating property `x` through `b` is reflected when accessing `a`."
    },
    {
      q: "Question 3: Does `const copy = { ...original }` safely clone nested objects?",
      a: "No. The spread operator performs a shallow copy. Top-level primitive properties are duplicated, but nested objects/arrays are copied by reference and remain shared."
    }
  ],

  challenge: {
    titleText: "Challenge: Deep Object Equality Checker",
    desc: "Write a function <code>deepEqual(obj1, obj2)</code> that compares two objects for deep structural equality across all nested levels, returning <code>true</code> if all properties and nested values match, even if they occupy separate Heap memory addresses."
  }
};
