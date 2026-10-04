/**
 * DSA Tracker — Lesson Content: Primitives
 * ──────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["primitives"] = {
  id: "primitives",
  title: "Primitives",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn JavaScript's 7 primitive data types, value immutability, pass-by-value assignment, and common language quirks.",

  definitions: [
    {
      term: "Primitive",
      def: "A basic value type that is not an object and has no methods of its own; primitives are immutable (can't be changed in place) and are copied by value when assigned. Plain-language analogy: like writing a number on a sticky note — copying it means writing the same number on a new sticky note, not pointing to the original."
    },
    {
      term: "Number",
      def: "Represents both whole and decimal numbers in JavaScript (there's only one general number type). Plain-language analogy: a single general counter handling both integers like 42 and decimals like 3.14."
    },
    {
      term: "String",
      def: "A sequence of characters representing text; once created, a string's contents cannot be changed (immutable) — operations that seem to modify a string actually create a new one. Plain-language analogy: like a printed strip of label tape — to change a word, you print a brand new label."
    },
    {
      term: "Boolean",
      def: "One of two values: true or false. Plain-language analogy: a simple light switch that is either ON (true) or OFF (false)."
    },
    {
      term: "Null",
      def: "Represents the intentional, explicit absence of a value (a developer set it to 'nothing' on purpose). Plain-language analogy: an empty box intentionally placed on a shelf with a label saying 'empty'."
    },
    {
      term: "Undefined",
      def: "The default value of a variable that has been declared but not yet assigned anything. Plain-language analogy: a blank slot where a variable tag exists, but nothing has been put inside yet."
    },
    {
      term: "Symbol",
      def: "A unique, immutable value, most commonly used to create unique object property keys that won't collide with other keys. Plain-language analogy: a unique serial code guaranteed never to match any other key."
    },
    {
      term: "BigInt",
      def: "Represents whole numbers larger than the regular number type can safely handle. Plain-language analogy: an extended counter for ultra-large integers exceeding standard number precision limits."
    }
  ],

  howItWorksTogether: "All seven primitive types share the same two rules: they're immutable, and they're copied by value. When you assign a primitive from one variable to another, JavaScript copies the actual value — the two variables become fully independent afterward. This is the opposite of how objects behave (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Objects</a> lesson), where assignment copies a reference, not the value itself.",

  whyItMatters: "Understanding primitive copy-by-value behavior prevents unexpected variable mutation side effects and ensures safe function parameter passing without altering caller variables.",

  workedExample: {
    title: "Primitive Copy by Value (Stack Value Allocation)",
    primitiveText: "<code>let a = 5;<br/>let b = a;   // b gets a COPY of the value 5<br/>b = 10;<br/>console.log(a); // 5 — unaffected, because a and b are independent<br/>console.log(b); // 10</code>",
    referenceText: "Because <code>a</code> holds a primitive number, assigning <code>b = a</code> writes a distinct value <code>5</code> into <code>b</code>'s Stack slot. Reassigning <code>b = 10</code> mutates only <code>b</code>."
  },

  visual: {
    caption: "Figure 1: Primitive values are stored directly in independent Stack slots. Copying a variable duplicates the value.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <g transform="translate(60, 25)">
          <rect width="260" height="170" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="130" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">Step 1: let b = a</text>
          
          <rect x="25" y="55" width="210" height="40" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="6"/>
          <text x="40" y="80" fill="var(--text-primary)" font-size="13" font-weight="600">a: 5</text>
          
          <rect x="25" y="105" width="210" height="40" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="6"/>
          <text x="40" y="130" fill="var(--text-primary)" font-size="13" font-weight="600">b: 5 (Copied value)</text>
        </g>
        
        <g transform="translate(380, 25)">
          <rect width="260" height="170" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="130" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">Step 2: b = 10</text>
          
          <rect x="25" y="55" width="210" height="40" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="6"/>
          <text x="40" y="80" fill="var(--text-primary)" font-size="13" font-weight="600">a: 5 (Unaffected!)</text>
          
          <rect x="25" y="105" width="210" height="40" fill="rgba(0,201,167,0.15)" stroke="var(--accent-secondary)" rx="6"/>
          <text x="40" y="130" fill="var(--text-primary)" font-size="13" font-weight="600">b: 10 (Reassigned)</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Primitive Copy by Value</span>
<span class="kw">let</span> a = <span class="num">5</span>;
<span class="kw">let</span> b = a;   <span class="cm">// b gets a COPY of the value 5</span>
b = <span class="num">10</span>;
console.<span class="fn">log</span>(a); <span class="cm">// 5 — unaffected, because a and b are independent</span>
console.<span class="fn">log</span>(b); <span class="cm">// 10</span>

<span class="cm">// 2. String Immutability Quirk</span>
<span class="kw">let</span> str = <span class="str">"hello"</span>;
str[<span class="num">0</span>] = <span class="str">"H"</span>;   <span class="cm">// Silently fails! Strings cannot be edited in place.</span>
console.<span class="fn">log</span>(str); <span class="cm">// "hello"</span>
str = <span class="str">"H"</span> + str.<span class="fn">slice</span>(<span class="num">1</span>); <span class="cm">// Correct: create a brand new string</span>

<span class="cm">// 3. NaN Comparison & Type Coercion</span>
console.<span class="fn">log</span>(NaN === NaN);            <span class="cm">// false! Use Number.isNaN()</span>
console.<span class="fn">log</span>(Number.<span class="fn">isNaN</span>(NaN));      <span class="cm">// true</span>
console.<span class="fn">log</span>(<span class="str">"5"</span> == <span class="num">5</span>);              <span class="cm">// true (type coercion)</span>
console.<span class="fn">log</span>(<span class="str">"5"</span> === <span class="num">5</span>);             <span class="cm">// false (strict equality)</span>

<span class="cm">// 4. Historical JS Quirk</span>
console.<span class="fn">log</span>(<span class="kw">typeof</span> <span class="kw">null</span>);            <span class="cm">// "object" (historical JS bug, null is still primitive)</span>`,

  complexityNotes: [
    "Primitive Assignment & Copy: O(1) Constant Time and Space.",
    "Primitive Strict Comparison (===): O(1) Constant Time.",
    "String Concatenation: O(n) Time where n is combined character length."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming a string can be edited in place",
      desc: "Assuming a string can be edited in place, e.g. <code>str[0] = 'X'</code> — this silently does nothing; strings are immutable, so you must create a new string instead."
    },
    {
      title: "Mistake 2: Comparing NaN with ===",
      desc: "Comparing <code>NaN</code> with <code>===</code> (e.g. <code>NaN === NaN</code> is <code>false</code>) — use <code>Number.isNaN(value)</code> to correctly check for <code>NaN</code>."
    },
    {
      title: "Mistake 3: Relying on == instead of ===",
      desc: "Relying on <code>==</code> instead of <code>===</code> and getting surprised by type coercion (e.g. <code>'5' == 5</code> is <code>true</code>, but <code>'5' === 5</code> is <code>false</code>)."
    },
    {
      title: "JavaScript Quirk: typeof null returns 'object'",
      desc: "Note as a known JavaScript quirk (not a mistake to fix, just to be aware of): <code>typeof null</code> returns <code>'object'</code> — this is a long-standing historical bug in the language kept for backward compatibility, <code>null</code> is still a primitive."
    }
  ],

  practice: [
    {
      q: "Question 1: What happens if you execute `let msg = 'cat'; msg[0] = 'b'; console.log(msg);`?",
      a: "`msg` remains `'cat'`. Strings are immutable primitives in JavaScript; attempting to modify an individual character silently fails. To change it, you must assign a new string: `msg = 'b' + msg.slice(1)`."
    },
    {
      q: "Question 2: Why does `NaN === NaN` return `false`, and what should be used instead?",
      a: "According to the IEEE 754 standard, `NaN` (Not-a-Number) is not equal to any value, including itself. To check for `NaN`, use `Number.isNaN(val)`."
    },
    {
      q: "Question 3: What is the output of `typeof null` and why?",
      a: "It returns `'object'`. This is a historical bug from the first version of JavaScript (where object tags shared bit representation with null pointers) kept for backward compatibility. `null` is actually a primitive."
    }
  ],

  challenge: {
    titleText: "Challenge: Primitive Value Guard",
    desc: "Write a function <code>isPrimitive(val)</code> that returns <code>true</code> for all 7 JavaScript primitives (including <code>null</code>) and <code>false</code> for objects, arrays, and functions."
  }
};
