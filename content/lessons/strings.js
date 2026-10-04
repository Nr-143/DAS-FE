/**
 * DSA Tracker — Lesson Content: Strings
 * ──────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["strings"] = {
  id: "strings",
  title: "Strings",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Understand string immutability, index-based character access, and why building strings efficiently matters for performance.",

  definitions: [
    {
      term: "String",
      def: "An ordered sequence of characters."
    },
    {
      term: "Immutability",
      def: "Once created, a string's characters can't be changed in place; any \"modification\" actually produces a brand-new string."
    },
    {
      term: "Index",
      def: "A string's characters can be accessed by position, starting at 0, the same as an array."
    },
    {
      term: "String vs. Array",
      def: "Strings share indexing/length/iteration with arrays but are not true arrays and don't have array methods like push/splice directly."
    }
  ],

  howItWorksTogether: "Because strings are immutable, anything that looks like it's \"editing\" a string is really building a new one. That matters for performance: repeatedly concatenating onto a string inside a loop creates a new copy every single time, which can become slow for large inputs — collecting pieces and joining once at the end avoids that.",

  visual: {
    caption: "Figure 1: String immutability — every operation produces a new string object. The original is never modified.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">String Immutability: Every "Change" Creates a New String</text>
        
        <g transform="translate(40, 50)">
          <rect width="280" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10"/>
          <text x="140" y="24" fill="var(--text-muted)" font-size="11" text-anchor="middle">Original String (unchanged)</text>
          <g transform="translate(15, 35)">
            <rect x="0" y="0" width="35" height="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" rx="4"/>
            <text x="17" y="19" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">"h"</text>
            <rect x="40" y="0" width="35" height="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" rx="4"/>
            <text x="57" y="19" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">"e"</text>
            <rect x="80" y="0" width="35" height="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" rx="4"/>
            <text x="97" y="19" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">"l"</text>
            <rect x="120" y="0" width="35" height="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" rx="4"/>
            <text x="137" y="19" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">"l"</text>
            <rect x="160" y="0" width="35" height="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" rx="4"/>
            <text x="177" y="19" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">"o"</text>
          </g>
          <text x="240" y="58" fill="var(--text-muted)" font-size="10">s</text>
        </g>
        
        <g transform="translate(370, 58)">
          <path d="M 0 30 L 50 30" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arr-arrow)"/>
          <text x="25" y="20" fill="var(--accent-primary)" font-size="10" text-anchor="middle">.toUpperCase()</text>
        </g>
        
        <g transform="translate(440, 50)">
          <rect width="220" height="70" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="2" rx="10"/>
          <text x="110" y="24" fill="#10B981" font-size="11" text-anchor="middle" font-weight="bold">NEW String Created</text>
          <text x="110" y="55" fill="var(--text-primary)" font-size="16" font-weight="bold" text-anchor="middle">"HELLO"</text>
        </g>
        
        <g transform="translate(40, 145)">
          <rect width="620" height="65" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8"/>
          <text x="20" y="22" fill="#EF4444" font-size="12" font-weight="bold">⚠ s[0] = "H" → silently does nothing</text>
          <text x="20" y="42" fill="var(--text-secondary)" font-size="11">Strings are immutable. Index assignment is ignored. You must create a new string to change characters.</text>
        </g>
        
        <defs>
          <marker id="arr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-primary)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// String basics — access, immutability, concatenation</span>
<span class="kw">const</span> s = <span class="str">"hello"</span>;

s[<span class="num">0</span>];             <span class="cm">// "h" — index access, like an array</span>
s.<span class="fn">toUpperCase</span>();  <span class="cm">// "HELLO" — a NEW string, s itself is unchanged</span>
s + <span class="str">" world"</span>;     <span class="cm">// "hello world" — concatenation creates a new string</span>

<span class="cm">// Inefficient at scale — each += copies the whole string so far:</span>
<span class="kw">let</span> result = <span class="str">""</span>;
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) result += <span class="str">"x"</span>;

<span class="cm">// Better: collect in array, join once</span>
<span class="kw">const</span> parts = [];
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) parts.<span class="fn">push</span>(<span class="str">"x"</span>);
<span class="kw">const</span> efficient = parts.<span class="fn">join</span>(<span class="str">""</span>);`,

  complexityNotes: [
    "Character Access by Index: O(1) Constant Time.",
    "String Concatenation (a + b): O(a.length + b.length) — creates a new string.",
    "Repeated += in a Loop: Can degrade to O(n²) total due to repeated copying.",
    "Array.join(): O(n) total — collects all pieces and concatenates once."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Trying s[0] = \"H\" expecting it to mutate",
      desc: "String index assignment silently does nothing in JavaScript. Strings are immutable — you must create a new string instead."
    },
    {
      title: "Mistake 2: Building large strings with repeated += in a loop",
      desc: "Each <code>+=</code> creates a brand-new string copy. For large inputs, collect pieces in an array and <code>.join()</code> once at the end for O(n) performance instead of O(n²)."
    }
  ],

  practice: [
    {
      q: "Question 1: Why doesn't `s[0] = \"X\"` change `s`?",
      a: "Strings are immutable in JavaScript. Index assignment is silently ignored — it doesn't throw an error, but it doesn't modify the string either. Any 'change' must create a new string."
    },
    {
      q: "Question 2: What's a more efficient way to build a large string than repeated `+=`?",
      a: "Collect pieces in an array using `push()`, then call `.join(\"\")` once at the end. This avoids creating intermediate string copies on every iteration."
    }
  ],

  challenge: {
    titleText: "Challenge: Palindrome Check Without Reverse",
    desc: "Write a palindrome check without using a built-in reverse method. Compare characters from both ends moving inward. For example, <code>\"racecar\"</code> is a palindrome, <code>\"hello\"</code> is not."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 125 — Valid Palindrome as your introduction to two-pointers.",
    problems: [
      { num: 125, title: "Valid Palindrome", concept: "Two Pointers", slug: "valid-palindrome", isSuggestedStart: true, roadmapStep: 5, isImmediateNext: true },
      { num: 242, title: "Valid Anagram", concept: "String + Hash Map", slug: "valid-anagram", roadmapStep: 6 },
      { num: 20, title: "Valid Parentheses", concept: "Stack", slug: "valid-parentheses", roadmapStep: 7 },
      { num: 387, title: "First Unique Character in a String", concept: "Hash Map", slug: "first-unique-character-in-a-string" },
      { num: 14, title: "Longest Common Prefix", concept: "String", slug: "longest-common-prefix" }
    ]
  }
};
