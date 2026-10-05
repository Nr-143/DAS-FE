/**
 * DSA Tracker — Lesson Content: Arrays
 * ──────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["arrays"] = {
  id: "arrays",
  title: "Arrays",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Understand how arrays provide O(1) random access, how insert/delete costs differ by position, and how JavaScript's dynamic arrays work under the hood.",

  definitions: [
    {
      term: "Array",
      def: "An ordered, indexable collection of elements, accessed by a numeric position (index) starting at 0."
    },
    {
      term: "Index",
      def: "The numeric position of an element in an array, starting at 0, not 1."
    },
    {
      term: "Contiguous-style Access",
      def: "An array's layout lets the position of any element be calculated directly from its index, which is what makes direct access O(1)."
    },
    {
      term: "Dynamic Array",
      def: "The kind JavaScript uses: it automatically grows/shrinks as elements are added or removed, unlike a fixed-size array in lower-level languages."
    }
  ],

  howItWorksTogether: "Arrays give O(1) random access because any element's position is directly computable from its index — no searching required. But inserting or removing anywhere except the very end is O(n), because every element after that point has to shift to a new index.",

  visual: {
    caption: "Figure 1: Array index layout — each element maps to a numeric index starting at 0. Access by index is O(1); insertion at the start requires shifting every element.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <text x="350" y="30" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">Array: O(1) Access by Index</text>
        
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="100" height="50" fill="rgba(45,138,104,0.12)" stroke="#2d8a68" stroke-width="2" rx="6"/>
          <text x="50" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">index 0</text>
          <text x="50" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">"apple"</text>
          
          <rect x="110" y="0" width="100" height="50" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" stroke-width="2" rx="6"/>
          <text x="160" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">index 1</text>
          <text x="160" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">"banana"</text>
          
          <rect x="220" y="0" width="100" height="50" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" stroke-width="2" rx="6"/>
          <text x="270" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">index 2</text>
          <text x="270" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">"cherry"</text>
          
          <rect x="330" y="0" width="100" height="50" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" stroke-width="2" rx="6"/>
          <text x="380" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">index 3</text>
          <text x="380" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">"date"</text>
          
          <rect x="440" y="0" width="100" height="50" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" stroke-width="2" rx="6" stroke-dasharray="5,3"/>
          <text x="490" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">index 4</text>
          <text x="490" y="40" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">undefined</text>
        </g>
        
        <g transform="translate(50, 120)">
          <rect width="600" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8"/>
          <text x="20" y="25" fill="#34d399" font-size="12" font-weight="bold">arr[0] → O(1)</text>
          <text x="20" y="45" fill="var(--text-secondary)" font-size="11">Direct jump — no scanning needed. Position computed from index.</text>
          <text x="320" y="25" fill="#f87171" font-size="12" font-weight="bold">arr.unshift("kiwi") → O(n)</text>
          <text x="320" y="45" fill="var(--text-secondary)" font-size="11">Every element must shift right to make room at index 0.</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Array basics — access, push, unshift, splice</span>
<span class="kw">const</span> fruits = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>];

fruits[<span class="num">0</span>];               <span class="cm">// "apple" — O(1) access</span>
fruits.<span class="fn">push</span>(<span class="str">"date"</span>);     <span class="cm">// add to end — O(1) amortized</span>
fruits.<span class="fn">unshift</span>(<span class="str">"kiwi"</span>);  <span class="cm">// add to start — O(n), everything shifts</span>
fruits.<span class="fn">splice</span>(<span class="num">1</span>, <span class="num">1</span>);     <span class="cm">// remove index 1 — O(n), everything after shifts</span>`,

  complexityNotes: [
    "Access by Index: O(1) Constant Time.",
    "push() / pop() (end): O(1) Amortized Time.",
    "unshift() / shift() (start): O(n) Linear Time — every element shifts.",
    "Search (unsorted): O(n) Linear Time — must scan element by element."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming insert/delete anywhere is O(1) like access is",
      desc: "Only end operations (<code>push</code>/<code>pop</code>) are fast. Inserting or removing at any other position is <code>O(n)</code> because every element after that point has to shift to a new index."
    },
    {
      title: "Mistake 2: Off-by-one errors with array indices",
      desc: "An array of length <code>n</code> has valid indices <code>0</code> to <code>n - 1</code>, never <code>n</code>. Accessing <code>arr[arr.length]</code> returns <code>undefined</code>, not the last element."
    }
  ],

  practice: [
    {
      q: "Question 1: What's the time complexity of `arr[5]` vs. inserting at `arr[0]`?",
      a: "`arr[5]` is O(1) — direct index access. Inserting at `arr[0]` (e.g. `unshift()`) is O(n) — every existing element must shift right by one index."
    },
    {
      q: "Question 2: Why is `push()` fast but `unshift()` slow?",
      a: "`push()` appends to the end — no other elements need to move, so it's O(1) amortized. `unshift()` inserts at index 0, forcing every element to shift right by one position — O(n)."
    }
  ],

  challenge: {
    titleText: "Challenge: Rotate Array Left by K",
    desc: "Write a function that rotates an array left by <code>k</code> positions. For example, rotating <code>[1, 2, 3, 4, 5]</code> left by 2 gives <code>[3, 4, 5, 1, 2]</code>. Try to do it in-place with O(1) extra space."
  },

  leetcodePractice: {
    showProcessCallout: true,
    twoSumNote: true,
    suggestedStartingNote: "Start with Two Sum (1) as your first problem. Try solving it with brute-force loops first; later, once you've covered Hash Tables, you'll learn how to optimize it from O(n²) → O(n).",
    problems: [
      { num: 1, title: "Two Sum", concept: "Array + Hash Map", slug: "two-sum", isSuggestedStart: true, roadmapStep: 2, isImmediateNext: true },
      { num: 121, title: "Best Time to Buy and Sell Stock", concept: "Array", slug: "best-time-to-buy-and-sell-stock", roadmapStep: 4, isImmediateNext: true },
      { num: 217, title: "Contains Duplicate", concept: "Array + Set", slug: "contains-duplicate", roadmapStep: 3, isImmediateNext: true },
      { num: 268, title: "Missing Number", concept: "Array", slug: "missing-number" },
      { num: 136, title: "Single Number", concept: "Array + XOR", slug: "single-number" }
    ]
  }
};
