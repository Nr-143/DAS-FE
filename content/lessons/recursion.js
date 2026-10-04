/**
 * DSA Tracker — Lesson Content: Recursion
 * ──────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["recursion"] = {
  id: "recursion",
  title: "Recursion",
  levelTitle: "Level 1 — Foundations",
  summary: "Master recursive problem solving, base cases, recursive steps, stack overflow errors, and memoization optimization.",

  definitions: [
    {
      term: "Recursion",
      def: "A technique where a function calls itself to solve a smaller version of the same problem. Plain-language analogy: like nesting Russian dolls — opening one doll reveals a smaller identical doll inside until you reach the tiny solid core."
    },
    {
      term: "Base Case",
      def: "The condition that stops the recursive calls; without one, the function would call itself forever. Plain-language analogy: the tiny solid innermost doll that cannot be opened any further, stopping the sequence."
    },
    {
      term: "Recursive Case",
      def: "The part of the function where it calls itself again, with an input that's smaller or simpler than before, moving it closer to the base case. Plain-language analogy: opening the current doll to inspect the smaller doll inside."
    },
    {
      term: "Stack Overflow",
      def: "An error that occurs when the call stack grows too large to handle, almost always because a base case is missing, wrong, or never reached. Plain-language analogy: piling so many cafeteria trays on top of each other that the stack hits the ceiling and crashes."
    }
  ],

  howItWorksTogether: "Every correct recursive function needs both a base case and a recursive case. Each recursive call pushes a new stack frame (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"function-calls\">Function Calls</a> lesson) on top of the call stack. Once the base case is finally reached, the calls stop growing and start returning — unwinding back down the stack in reverse order, from the most recent call back to the first. This is why tracing recursion often feels like going all the way down, then working all the way back up.",

  whyItMatters: "Recursion is the foundational technique behind trees, graphs, divide-and-conquer sorting (Merge Sort, Quick Sort), and dynamic programming. Mastering recursion enables solving complex hierarchical problems with concise code.",

  workedExample: {
    title: "Factorial Winding/Unwinding & Naive Fibonacci Subproblem Tree",
    primitiveText: "<code>function factorial(n) {<br/>  if (n <= 1) return 1;         // base case<br/>  return n * factorial(n - 1);  // recursive case — moves toward n <= 1<br/>}<br/><br/>factorial(4);<br/>// factorial(4) -> 4 * factorial(3)<br/>//              -> 4 * (3 * factorial(2))<br/>//              -> 4 * (3 * (2 * factorial(1)))<br/>//              -> 4 * (3 * (2 * 1)) = 24</code>",
    referenceText: "<strong>Second Example — Naive Recursive Fibonacci:</strong><br/><code>function fib(n) {<br/>  if (n <= 1) return n;<br/>  return fib(n - 1) + fib(n - 2);<br/>}</code><br/>Note that without memoization, naive Fibonacci re-solves identical subproblems repeatedly — this is the classic real-world example of the <code>O(2ⁿ)</code> complexity class from the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"time-complexity\">Time Complexity (Big-O)</a> lesson. Using memoization (storing past results) reduces time complexity to <code>O(n)</code> linear time."
  },

  visual: {
    caption: "Figure 1: Tracing factorial(4): 1) Call stack winds up to base case factorial(1). 2) Base case returns 1, unwinding back down stack.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <g transform="translate(30, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">1. WINDING UP (Pushing Frames)</text>
          
          <rect x="25" y="50" width="250" height="28" fill="rgba(239,68,68,0.15)" stroke="#EF4444" rx="4"/>
          <text x="35" y="69" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(1) → Returns 1 (Base Case!)</text>
          
          <rect x="25" y="82" width="250" height="28" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="4"/>
          <text x="35" y="101" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(2) → Calls factorial(1)</text>
          
          <rect x="25" y="114" width="250" height="28" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="4"/>
          <text x="35" y="133" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(3) → Calls factorial(2)</text>
          
          <rect x="25" y="146" width="250" height="28" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" rx="4"/>
          <text x="35" y="165" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(4) → Calls factorial(3)</text>
        </g>
        
        <g transform="translate(370, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">2. UNWINDING DOWN (Returning Values)</text>
          
          <rect x="25" y="50" width="250" height="28" fill="rgba(16,185,129,0.15)" stroke="#10B981" rx="4"/>
          <text x="35" y="69" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(1) returns 1</text>
          
          <rect x="25" y="82" width="250" height="28" fill="rgba(16,185,129,0.15)" stroke="#10B981" rx="4"/>
          <text x="35" y="101" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(2) returns 2 * 1 = 2</text>
          
          <rect x="25" y="114" width="250" height="28" fill="rgba(16,185,129,0.15)" stroke="#10B981" rx="4"/>
          <text x="35" y="133" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(3) returns 3 * 2 = 6</text>
          
          <rect x="25" y="146" width="250" height="28" fill="rgba(16,185,129,0.15)" stroke="#10B981" rx="4"/>
          <text x="35" y="165" fill="var(--text-primary)" font-size="11" font-weight="600">factorial(4) returns 4 * 6 = 24</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Factorial Recursion (O(n) time, O(n) call stack space)</span>
<span class="kw">function</span> <span class="fn">factorial</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> <span class="num">1</span>;         <span class="cm">// Base case</span>
  <span class="kw">return</span> n * <span class="fn">factorial</span>(n - <span class="num">1</span>);  <span class="cm">// Recursive case — moves toward base case</span>
}

<span class="cm">// 2. Naive Recursive Fibonacci (O(2ⁿ) exponential slowdown)</span>
<span class="kw">function</span> <span class="fn">fib</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> n;         <span class="cm">// Base case</span>
  <span class="kw">return</span> <span class="fn">fib</span>(n - <span class="num">1</span>) + <span class="fn">fib</span>(n - <span class="num">2</span>); <span class="cm">// Re-solves identical subproblems repeatedly</span>
}

<span class="cm">// 3. Optimized Fibonacci with Memoization (O(n) linear time)</span>
<span class="kw">function</span> <span class="fn">fibMemo</span>(n, memo = {}) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> n;
  <span class="kw">if</span> (n <span class="kw">in</span> memo) <span class="kw">return</span> memo[n];
  memo[n] = <span class="fn">fibMemo</span>(n - <span class="num">1</span>, memo) + <span class="fn">fibMemo</span>(n - <span class="num">2</span>, memo);
  <span class="kw">return</span> memo[n];
}`,

  complexityNotes: [
    "Factorial Recursive Time: O(n) Linear Time.",
    "Factorial Call Stack Space: O(n) Linear Space due to n stack frames.",
    "Naive Fibonacci Time: O(2ⁿ) Exponential Time — see Time Complexity (Big-O).",
    "Memoized Fibonacci Time: O(n) Linear Time and O(n) Space."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Missing or incorrect base case → Stack Overflow",
      desc: "Missing or incorrect base case → infinite recursion → stack overflow (<code>RangeError: Maximum call stack size exceeded</code>)."
    },
    {
      title: "Mistake 2: Recursive case doesn't move toward base case",
      desc: "Writing a base case that exists but is never actually reached because the recursive case doesn't move the input toward it (e.g. calling <code>factorial(n)</code> again instead of <code>factorial(n - 1)</code>)."
    },
    {
      title: "Mistake 3: Unmemoized recursion on overlapping subproblems",
      desc: "Using plain recursion for problems with overlapping subproblems (like naive Fibonacci) without memoization, causing exponential slowdowns — reference the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"time-complexity\">Big-O lesson's O(2ⁿ)</a> explanation here."
    }
  ],

  practice: [
    {
      q: "Question 1: What are the two mandatory parts of every valid recursive function?",
      a: "1) A Base Case (which stops recursion and returns a direct value), and 2) A Recursive Case (which calls the function with a reduced input moving closer to the base case)."
    },
    {
      q: "Question 2: What happens if you call `factorial(5)` with `return n * factorial(n);` instead of `factorial(n - 1)`?",
      a: "The argument passed to the recursive call is always `5`, so `n <= 1` is never satisfied. The call stack fills up until a `RangeError: Maximum call stack size exceeded` (Stack Overflow) is thrown."
    },
    {
      q: "Question 3: Why is naive `fib(n)` an example of O(2ⁿ) exponential time complexity?",
      a: "Each call to `fib(n)` spawns two more recursive calls (`fib(n-1)` and `fib(n-2)`), creating a binary tree of calls of depth `n`. Without memoization, duplicate subproblems are calculated repeatedly."
    }
  ],

  challenge: {
    titleText: "Challenge: Recursive Array Flattening",
    desc: "Write a recursive function <code>flattenArray(arr)</code> that takes a deeply nested array (e.g., <code>[1, [2, [3, 4]], 5]</code>) and returns a single flat array <code>[1, 2, 3, 4, 5]</code> without using standard <code>Array.prototype.flat()</code>."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 509 — Fibonacci Number to practice identifying base cases and recursive steps.",
    cautionNote: "Recursion creates new call stack frames on every call. Without a valid base case, you will trigger a Stack Overflow error (RangeError: Maximum call stack size exceeded).",
    cautionCode: "function recurse() { recurse(); } // Stack Overflow!",
    problems: [
      { num: 509, title: "Fibonacci Number", difficulty: "Easy", concept: "Recursion / DP", slug: "fibonacci-number", isSuggestedStart: true, roadmapStep: 14 },
      { num: 70, title: "Climbing Stairs", difficulty: "Easy", concept: "Recursion / DP", slug: "climbing-stairs", roadmapStep: 15 },
      { num: 50, title: "Pow(x, n)", difficulty: "Medium", concept: "Recursion / Fast Power", slug: "powx-n" },
      { num: 344, title: "Reverse String", difficulty: "Easy", concept: "Recursion / Two Pointers", slug: "reverse-string" }
    ]
  }
};
