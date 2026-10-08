/**
 * DSA Tracker — Lesson Content: Space Complexity
 * ─────────────────────────────────────────────
 * Redesigned from zero: Beginner-friendly, zero math assumed,
 * visual intuition, input vs auxiliary space, recursion call stack space,
 * interactive memory visualizer, space playground, and 25 practice questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["space-complexity"] = {
  id: "space-complexity",
  title: "Space Complexity",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn how algorithms consume extra memory during execution — from variables and arrays to call stack frames and time-space trade-offs.",

  sections: [
    {
      id: "sec-sc-hero",
      tocTitle: "1. Intro & Hero",
      title: "1. Space Complexity: Extra Memory Growth",
      contentHtml: `
        <div class="tc-hero-card" style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(108, 99, 255, 0.1) 100%);">
          <div class="tc-hero-badge" style="background: rgba(56, 189, 248, 0.2); color: #38BDF8; border-color: rgba(56, 189, 248, 0.4);">MEMORY ANALYSIS</div>
          <h2 class="tc-hero-headline">How much extra memory does your algorithm need?</h2>
          <p class="tc-hero-sub">Learn how variables, new arrays, matrix allocations, recursion stacks, and copy operations consume RAM as your code runs.</p>

          <div class="tc-flowchart">
            <div class="tc-flow-step">Program Executes</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step">Allocates variables, arrays &amp; stack frames</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step">How much EXTRA memory was added?</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step tc-flow-highlight">Auxiliary Space Complexity</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-what-is",
      tocTitle: "2. Time vs Space",
      title: "2. What Does 'Space' Mean?",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead">While <strong>Time Complexity</strong> counts how many steps code performs, <strong>Space Complexity</strong> measures how much additional memory (RAM) code consumes while running.</p>

          <div class="tc-grid-2">
            <div class="tc-comp-card">
              <div class="tc-comp-head" style="color:#60A5FA;">&#9201; TIME COMPLEXITY</div>
              <div class="tc-comp-body">How many total execution steps or operations does the CPU perform?</div>
              <div class="tc-comp-foot">Focus: CPU Cycles &amp; Speed</div>
            </div>
            <div class="tc-comp-card">
              <div class="tc-comp-head" style="color:#34D399;">&#128190; SPACE COMPLEXITY</div>
              <div class="tc-comp-body">How much extra memory (variables, arrays, objects, call stack) is allocated in RAM?</div>
              <div class="tc-comp-foot">Focus: Memory Footprint &amp; RAM</div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-memory-basics",
      tocTitle: "3. Memory Basics",
      title: "3. Memory Basics: Where Space Is Spent",
      contentHtml: `
        <div class="tc-card">
          <p>When your code runs, JavaScript allocates memory across two main areas:</p>

          <div class="tc-mem-split">
            <div class="tc-mem-box">
              <div class="tc-mem-head">&#9889; STACK MEMORY</div>
              <ul>
                <li>Function call frames</li>
                <li>Primitive variables (numbers, booleans)</li>
                <li>Temporary loop pointers (e.g. <code>i</code>, <code>total</code>)</li>
              </ul>
            </div>
            <div class="tc-mem-box">
              <div class="tc-mem-head">&#128230; HEAP MEMORY</div>
              <ul>
                <li>Dynamic data structures</li>
                <li>Arrays (e.g. <code>const copy = [...]</code>)</li>
                <li>Objects, HashMaps, Sets</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-input-vs-aux",
      tocTitle: "4. Input vs Auxiliary Space",
      title: "4. Input Space vs. Auxiliary Space",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead">This is one of the most vital distinctions in technical interviews!</p>

          <div class="tc-rule-box" style="border-left-color:#38BDF8;">
            <div class="tc-rule-num" style="background:#38BDF8; color:#fff;">INPUT SPACE</div>
            <div>The memory required to store the initial input passed into your function. This data already exists before your function starts running.</div>
          </div>

          <div class="tc-rule-box" style="border-left-color:#34D399; margin-top:12px;">
            <div class="tc-rule-num" style="background:#34D399; color:#fff;">AUXILIARY SPACE</div>
            <div>The <strong>extra temporary memory</strong> created by your algorithm while running (new arrays, objects, stack frames).</div>
          </div>

          <blockquote class="tc-quote" style="margin-top:14px;">
            <strong>Standard Convention:</strong> Unless specified otherwise, when engineers ask for "Space Complexity", they mean <strong>Auxiliary Space</strong>!
          </blockquote>
        </div>
      `
    },
    {
      id: "sec-sc-o1",
      tocTitle: "5. O(1) Space",
      title: "5. O(1) Constant Auxiliary Space",
      contentHtml: `
        <div class="tc-card">
          <p>An algorithm has <strong>O(1) Space Complexity</strong> if the extra memory it allocates stays fixed and constant regardless of input size <code>n</code>.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">sumArray</span>(arr) {
  <span class="kw">let</span> total = <span class="num">0</span>; <span class="cm">// 1 variable allocated</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++) { <span class="cm">// 1 index variable</span>
    total += arr[i];
  }
  <span class="kw">return</span> total;
}</code></pre>

          <p>Whether <code>arr</code> has 10 elements or 1,000,000 elements, we only allocate <code>total</code> and <code>i</code>. Thus, auxiliary space is <strong>O(1)</strong>.</p>
        </div>
      `
    },
    {
      id: "sec-sc-on",
      tocTitle: "6. O(n) Space",
      title: "6. O(n) Linear Auxiliary Space",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n) Space Complexity</strong> happens when the extra memory created by your code grows in direct proportion to input size <code>n</code>.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">doubleValues</span>(arr) {
  <span class="kw">const</span> result = []; <span class="cm">// Creates a brand new array of size n</span>
  <span class="kw">for</span> (<span class="kw">let</span> x <span class="kw">of</span> arr) {
    result.<span class="fn">push</span>(x * <span class="num">2</span>);
  }
  <span class="kw">return</span> result; <span class="cm">// O(n) extra heap memory</span>
}</code></pre>

          <div class="tc-matrix-title">Memory Allocation Visual:</div>
          <div class="tc-scale-list">
            <div class="tc-scale-item">n = 5 &rarr; 5 new slots allocated in Heap</div>
            <div class="tc-scale-item">n = 1,000 &rarr; 1,000 new slots allocated in Heap</div>
            <div class="tc-scale-item tc-scale-warn">n = 1,000,000 &rarr; 1,000,000 new slots allocated in Heap (O(n) Space)</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-recursion-on",
      tocTitle: "7. O(n) Recursion Space",
      title: "7. Call Stack Memory: O(n) Recursion Space",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead">Critical Lesson: Code doesn't have to create a new array to consume memory! Recursion uses stack frames.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">countDown</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">0</span>) <span class="kw">return</span>;
  <span class="fn">countDown</span>(n - <span class="num">1</span>); <span class="cm">// Pushes stack frame!</span>
}</code></pre>

          <div class="tc-stack-visual">
            <div class="tc-stack-frame f4">countDown(1) [Frame 4]</div>
            <div class="tc-stack-frame f3">countDown(2) [Frame 3]</div>
            <div class="tc-stack-frame f2">countDown(3) [Frame 2]</div>
            <div class="tc-stack-frame f1">countDown(4) [Frame 1]</div>
          </div>

          <p style="margin-top:10px;">At depth <code>n</code>, there are <code>n</code> active call frames alive simultaneously in Stack memory. Thus, auxiliary space is <strong>O(n)</strong>.</p>
        </div>
      `
    },
    {
      id: "sec-sc-ologn",
      tocTitle: "8. O(log n) Space",
      title: "8. O(log n) Space: Divide-and-Conquer Call Stack",
      contentHtml: `
        <div class="tc-card">
          <p>Recursive binary search or divide-and-conquer algorithms cut problem size in half at each step. The maximum call stack depth is $\\log_2(n)$.</p>
          <div class="tc-scale-list">
            <div class="tc-scale-item">n = 8 &rarr; max 3 stack frames active</div>
            <div class="tc-scale-item">n = 1,024 &rarr; max 10 stack frames active</div>
            <div class="tc-scale-item">n = 1,000,000 &rarr; max 20 stack frames active (O(log n) Space)</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-on2",
      tocTitle: "9. O(n²) Space",
      title: "9. O(n²) Space: 2D Matrices & Grid Storage",
      contentHtml: `
        <div class="tc-card">
          <p>Creating a 2D matrix of dimensions <code>n &times; n</code> allocates <code>n&sup2;</code> memory slots in Heap memory.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">createGrid</span>(n) {
  <span class="kw">const</span> matrix = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) {
    matrix[i] = <span class="kw">new</span> Array(n).<span class="fn">fill</span>(<span class="num">0</span>); <span class="cm">// n * n slots</span>
  }
  <span class="kw">return</span> matrix;
}</code></pre>

          <p>For $n = 1,000$, a 2D grid allocates $1,000,000$ memory slots ($O(n^2)$ Space).</p>
        </div>
      `
    },
    {
      id: "sec-sc-copy-ref",
      tocTitle: "10. Copy vs Reference",
      title: "10. Copy vs. Reference Memory Impact",
      contentHtml: `
        <div class="tc-card">
          <p>In JavaScript, assigning an existing object or array to a new variable does NOT create a new copy in memory!</p>

          <div class="tc-grid-2">
            <div class="tc-mini-box">
              <div class="tc-mini-head">Reference Assignment (O(1) Space)</div>
              <code>const b = a;</code>
              <p style="font-size:0.8rem; margin-top:4px;">Both <code>a</code> and <code>b</code> point to the SAME array in Heap memory. 0 extra space!</p>
            </div>
            <div class="tc-mini-box">
              <div class="tc-mini-head">Spread Copy (O(n) Space)</div>
              <code>const b = [...a];</code>
              <p style="font-size:0.8rem; margin-top:4px;">Allocates a BRAND NEW array copy of length n. O(n) extra space!</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-shallow-deep",
      tocTitle: "11. Shallow vs Deep Copy",
      title: "11. Shallow vs. Deep Copy Space Impact",
      contentHtml: `
        <div class="tc-card">
          <p><strong>Shallow Copy</strong> (<code>[...arr]</code> or <code>Object.assign({}, obj)</code>) duplicates outer containers ($O(n)$ outer space), but nested objects still share inner reference memory.</p>
          <p><strong>Deep Copy</strong> (<code>structuredClone(obj)</code>) recursively duplicates all nested objects and arrays, using additional heap memory for every single nested item.</p>
        </div>
      `
    },
    {
      id: "sec-sc-time-vs-space",
      tocTitle: "12. Time vs Space Example",
      title: "12. Comparing Time vs. Space for the Same Code",
      contentHtml: `
        <div class="tc-card">
          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">sumArray</span>(arr) {
  <span class="kw">let</span> sum = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> x <span class="kw">of</span> arr) {
    sum += x;
  }
  <span class="kw">return</span> sum;
}</code></pre>

          <div class="tc-grid-2">
            <div class="tc-comp-card">
              <div class="tc-comp-head" style="color:#60A5FA;">Time Complexity</div>
              <div style="font-size:1.4rem; font-weight:800; color:#60A5FA; margin:8px 0;">O(n)</div>
              <div class="tc-comp-body">Loop runs n times</div>
            </div>
            <div class="tc-comp-card">
              <div class="tc-comp-head" style="color:#34D399;">Space Complexity</div>
              <div style="font-size:1.4rem; font-weight:800; color:#34D399; margin:8px 0;">O(1)</div>
              <div class="tc-comp-body">Only 1 variable <code>sum</code> allocated</div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-tradeoffs",
      tocTitle: "13. Trade-offs",
      title: "13. Time &amp; Space Trade-offs",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead">In software engineering, you will often trade extra memory (Space) to gain dramatically faster execution speed (Time).</p>

          <div class="tc-example-box">
            <div class="tc-example-title">Example: Array Search vs. Set Lookup</div>
            <p>Checking if items exist in an array takes $O(n)$ Time, $O(1)$ Extra Space.</p>
            <p>If we build a <code>Set(arr)</code> lookup table, checking existence drops to <strong>$O(1)$ Time</strong>, but costs <strong>$O(n)$ Extra Space</strong> to store the Set!</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-visualizer",
      tocTitle: "14. Memory Visualizer",
      title: "14. Interactive Memory Visualizer",
      contentHtml: `
        <div class="tc-card">
          <p>Select input size <code>n</code> to observe memory block growth across auxiliary space classes:</p>
          
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <button class="tc-chart-btn active tc-mem-n" data-n="4">n = 4</button>
            <button class="tc-chart-btn tc-mem-n" data-n="16">n = 16</button>
            <button class="tc-chart-btn tc-mem-n" data-n="64">n = 64</button>
          </div>

          <div class="tc-mem-grid-display" id="tc-mem-display">
            <!-- Dynamically populated -->
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-playground",
      tocTitle: "15. Space Playground",
      title: "15. Interactive Space Complexity Playground",
      contentHtml: `
        <div class="tc-card">
          <p>Analyze this code! What is its <strong>Auxiliary Space Complexity</strong>?</p>
          
          <div class="tc-quiz-box" id="sc-playground-box">
            <div class="tc-quiz-code" id="sc-quiz-code-text"></div>
            <div class="tc-quiz-opts" id="sc-quiz-opts">
              <button class="tc-q-opt" data-ans="O(1)">O(1)</button>
              <button class="tc-q-opt" data-ans="O(log n)">O(log n)</button>
              <button class="tc-q-opt" data-ans="O(n)">O(n)</button>
              <button class="tc-q-opt" data-ans="O(n^2)">O(n²)</button>
            </div>
            <div class="tc-quiz-fb" id="sc-quiz-fb" style="display:none;"></div>
            <button class="tc-chart-btn" id="sc-quiz-next-btn" style="margin-top:12px; display:none;">Next Question &rarr;</button>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-mistakes",
      tocTitle: "16. Common Mistakes",
      title: "16. Common Space Complexity Mistakes",
      contentHtml: `
        <div class="tc-card">
          <div class="tc-mistake-item">
            <strong>&times; Mistake 1:</strong> "The input array has n elements, so space complexity must be O(n)."<br/>
            <em>Correction:</em> Input space doesn't count as auxiliary space unless your algorithm creates a new copy!
          </div>
          <div class="tc-mistake-item">
            <strong>&times; Mistake 2:</strong> "Recursion doesn't use memory because no arrays were created."<br/>
            <em>Correction:</em> Every active recursive call frame takes memory on the Call Stack!
          </div>
          <div class="tc-mistake-item">
            <strong>&times; Mistake 3:</strong> "Declaring 3 variables means O(3) space."<br/>
            <em>Correction:</em> Fixed variables independent of n simplify to O(1) constant space!
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-cheat-sheet",
      tocTitle: "17. Space Cheat Sheet",
      title: "17. Space Complexity Cheat Sheet",
      contentHtml: `
        <div class="tc-card">
          <div class="tc-cheat-ladder">
            <div class="tc-ladder-row r1"><span>O(1)</span> <strong>Constant Space</strong> &mdash; Fixed variables / In-place mutations</div>
            <div class="tc-ladder-row r2"><span>O(log n)</span> <strong>Logarithmic Space</strong> &mdash; Divide-and-conquer call stack</div>
            <div class="tc-ladder-row r4"><span>O(n)</span> <strong>Linear Space</strong> &mdash; New array copy or n recursive call frames</div>
            <div class="tc-ladder-row r6"><span>O(n&sup2;)</span> <strong>Quadratic Space</strong> &mdash; 2D matrix or grid storage</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-sc-summary",
      tocTitle: "18. Summary & Next",
      title: "18. Space Complexity Complete",
      contentHtml: `
        <div class="tc-card" style="text-align:center; padding:32px 20px;">
          <div style="font-size:2.5rem; margin-bottom:10px;">🎓</div>
          <h3 style="font-size:1.4rem; color:var(--text-primary); margin-bottom:12px;">Space Complexity Mastered!</h3>
          <p style="color:var(--text-secondary); max-width:600px; margin:0 auto 20px auto; line-height:1.6;">
            You can now reason about extra memory consumption, call stack recursion limits, in-place vs copy algorithms, and time-space trade-offs.
          </p>
          <div style="display:inline-flex; gap:12px; flex-wrap:wrap; justify-content:center;">
            <button class="btn btn--primary" id="btn-sc-goto-questions" style="padding:10px 20px; font-weight:600; border-radius:20px;">
              Practice Space Questions Tab &rarr;
            </button>
          </div>
        </div>
      `
    }
  ],

  // 25 Categorized Questions for Questions Tab
  questionSuite: [
    {
      difficulty: "Easy",
      question: "What is Auxiliary Space Complexity?",
      options: [
        "A. The hard drive disk space required to install Node.js",
        "B. The extra temporary memory allocated by an algorithm during execution",
        "C. The size of the original input data",
        "D. The speed of the CPU processor"
      ],
      answer: "B",
      explanation: "Auxiliary space measures only the extra temporary memory created by an algorithm beyond the input itself."
    },
    {
      difficulty: "Easy",
      question: "What is the auxiliary space complexity of a function using 3 fixed variables regardless of input size?",
      code: "function sum(arr) {\n  let total = 0;\n  for(let i=0; i<arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(3)"
      ],
      answer: "A",
      explanation: "The extra memory allocated (total, i) stays constant regardless of array size n, so auxiliary space is O(1)."
    },
    {
      difficulty: "Easy",
      question: "What is the space complexity of creating a new array copy of length n?",
      code: "const copy = [...arr];",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "Creating a new array of length n allocates n heap slots, using O(n) auxiliary space."
    },
    {
      difficulty: "Easy",
      question: "Does assigning `const b = a;` create a new array in Heap memory?",
      options: [
        "A. Yes, it duplicates all elements in O(n) space",
        "B. No, it only copies the memory reference (O(1) auxiliary space)",
        "C. It depends on CPU architecture",
        "D. Yes, but only in strict mode"
      ],
      answer: "B",
      explanation: "Reference assignment simply points variable b to the existing array in memory without allocating a new array."
    },
    {
      difficulty: "Medium",
      question: "Why does recursive function `countDown(n)` use O(n) space even if it doesn't create any array?",
      code: "function countDown(n) {\n  if (n <= 0) return;\n  countDown(n - 1);\n}",
      options: [
        "A. Because JavaScript arrays take extra space",
        "B. Because each recursive call adds a stack frame to the Call Stack until base case is reached",
        "C. It uses O(1) space, not O(n)",
        "D. Because n is an integer"
      ],
      answer: "B",
      explanation: "Each active recursive call pushes a frame onto the Call Stack. At depth n, there are n active call frames in RAM."
    },
    {
      difficulty: "Medium",
      question: "What is the auxiliary space complexity of creating an n x n 2D matrix?",
      code: "const matrix = Array(n).fill(null).map(() => Array(n).fill(0));",
      options: [
        "A. O(n)",
        "B. O(2n)",
        "C. O(n²)",
        "D. O(1)"
      ],
      answer: "C",
      explanation: "Storing n rows by n columns requires n * n = n² memory slots in Heap memory."
    },
    {
      difficulty: "Medium",
      question: "What is the space complexity of an in-place array swap algorithm?",
      code: "function reverse(arr) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    [arr[l], arr[r]] = [arr[r], arr[l]];\n    l++; r--;\n  }\n  return arr;\n}",
      options: [
        "A. O(n)",
        "B. O(1)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "In-place algorithms modify the input array directly without allocating new arrays, using O(1) auxiliary space."
    },
    {
      difficulty: "Medium",
      question: "What is the maximum call stack depth (and space complexity) of recursive Binary Search on an array of size n?",
      options: [
        "A. O(1)",
        "B. O(log n)",
        "C. O(n)",
        "D. O(n²)"
      ],
      answer: "B",
      explanation: "Recursive binary search halves problem size at each level, reaching maximum stack depth of log₂(n) call frames."
    },
    {
      difficulty: "Hard",
      question: "What is the Time vs Space complexity of building a `Set(arr)` to check element existence?",
      options: [
        "A. Time: O(1) lookup, Space: O(n) extra space",
        "B. Time: O(n) lookup, Space: O(1) extra space",
        "C. Time: O(n²) lookup, Space: O(n²) extra space",
        "D. Time: O(1) lookup, Space: O(1) extra space"
      ],
      answer: "A",
      explanation: "Building a Set trades O(n) extra space to achieve ultra-fast O(1) average lookup time."
    },
    {
      difficulty: "Hard",
      question: "What is the space complexity of iterative Fibonacci vs recursive Fibonacci?",
      options: [
        "A. Both are O(n)",
        "B. Iterative: O(1) space, Recursive: O(n) call stack space",
        "C. Iterative: O(n) space, Recursive: O(1) space",
        "D. Both are O(1)"
      ],
      answer: "B",
      explanation: "Iterative Fibonacci reuses 2 scalar variables (O(1)). Naive recursive Fibonacci builds n stack frames (O(n))."
    },
    {
      difficulty: "Interview",
      question: "What is the main danger of a recursive function with O(n) space complexity when n = 1,000,000?",
      options: [
        "A. Syntax error",
        "B. Call stack overflow crash (`RangeError: Maximum call stack size exceeded`)",
        "C. CPU throttling",
        "D. Network timeout"
      ],
      answer: "B",
      explanation: "JavaScript engines cap call stack depth (typically around 10,000 frames). Exceeding it throws Maximum Call Stack Size Exceeded."
    },
    {
      difficulty: "Interview",
      question: "True or False: Input space is included in Auxiliary space calculations.",
      options: [
        "A. True",
        "B. False"
      ],
      answer: "B",
      explanation: "False! Auxiliary space specifically isolates extra temporary memory created by the algorithm beyond input."
    },
    {
      difficulty: "Easy",
      question: "What type of JavaScript memory stores primitive values and active function call frames?",
      options: [
        "A. Heap memory",
        "B. Stack memory",
        "C. Disk cache",
        "D. GPU VRAM"
      ],
      answer: "B",
      explanation: "Stack memory holds call frames and local primitive variables."
    },
    {
      difficulty: "Medium",
      question: "What is the space complexity of `arr.slice(0, n)`?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "`arr.slice()` creates and returns a new shallow array copy of length n, consuming O(n) auxiliary heap space."
    },
    {
      difficulty: "Hard",
      question: "What is the auxiliary space complexity of iterative Merge Sort if array buffer of size n is used?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(n log n)"
      ],
      answer: "B",
      explanation: "Merge Sort uses a temporary helper buffer array of size n to merge sorted sub-halves (O(n) auxiliary space)."
    },
    {
      difficulty: "Interview",
      question: "Why does Quick Sort use O(log n) auxiliary space on average even though it sorts array in-place?",
      options: [
        "A. Because of string operations",
        "B. Because recursive calls add O(log n) call stack frames on average",
        "C. It actually uses O(1) space",
        "D. Because it creates temporary matrices"
      ],
      answer: "B",
      explanation: "Even though array partition swaps in-place, recursive Quick Sort call stack reaches depth log n on average."
    },
    {
      difficulty: "Easy",
      question: "What is the space complexity of returning a single number `return a + b;`?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(2)",
        "D. O(n²)"
      ],
      answer: "A",
      explanation: "Returning a primitive scalar uses O(1) constant auxiliary space."
    },
    {
      difficulty: "Medium",
      question: "What is the space complexity of `arr.map(x => x * 2)`?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "`.map()` constructs and returns a brand-new array of equal length n, allocating O(n) space."
    },
    {
      difficulty: "Medium",
      question: "What is the space complexity of `arr.filter(x => x > 5)` in the worst case?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(0)"
      ],
      answer: "B",
      explanation: "In worst case (all elements pass filter), `.filter()` allocates a new array of length n (O(n) space)."
    },
    {
      difficulty: "Hard",
      question: "What is the space complexity of an adjacency matrix representation for a graph with V vertices?",
      options: [
        "A. O(V)",
        "B. O(V²)",
        "C. O(V + E)",
        "D. O(1)"
      ],
      answer: "B",
      explanation: "An adjacency matrix stores a V x V grid of connections, requiring O(V²) space."
    },
    {
      difficulty: "Interview",
      question: "If an algorithm trades memory for speed, what engineering concept is being applied?",
      options: [
        "A. Garbage collection",
        "B. Time-Space Trade-off",
        "C. Infinite loop optimization",
        "D. Deadlock"
      ],
      answer: "B",
      explanation: "Using extra space (like HashMaps/Sets/caching) to reduce execution steps is a classic Time-Space trade-off."
    },
    {
      difficulty: "Easy",
      question: "Where are objects and arrays stored in JavaScript memory?",
      options: [
        "A. Stack memory",
        "B. Heap memory",
        "C. CPU register",
        "D. DOM node"
      ],
      answer: "B",
      explanation: "Reference types (Objects, Arrays) are stored in Heap memory."
    },
    {
      difficulty: "Medium",
      question: "What is the space complexity of String `split('')` on a string of length n?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "`split('')` creates an array containing n character strings, using O(n) auxiliary space."
    },
    {
      difficulty: "Hard",
      question: "What is the call stack space complexity of tail-call optimized recursion in engines that support TCO?",
      options: [
        "A. O(n)",
        "B. O(1)",
        "C. O(n²)",
        "D. O(2ⁿ)"
      ],
      answer: "B",
      explanation: "Tail-Call Optimization (TCO) reuses the current stack frame for the tail recursive call, reducing stack space to O(1)."
    },
    {
      difficulty: "Interview",
      question: "Why does `JSON.parse(JSON.stringify(obj))` consume extra space?",
      options: [
        "A. It does not use extra space",
        "B. It serializes and parses the object, constructing a completely new deep copy in Heap memory (O(n) space)",
        "C. It deletes the original object",
        "D. It operates in O(1) space"
      ],
      answer: "B",
      explanation: "JSON deep cloning allocates entirely new memory structures for every node, using O(n) auxiliary space."
    }
  ],

  // Interactive Mount Handler for Space Playground & Memory Visualizer
  onMount: function (container) {
    // 1. Interactive Memory Visualizer
    const memDisplay = container.querySelector('#tc-mem-display');
    const memBtns = container.querySelectorAll('.tc-mem-n');
    if (memDisplay && memBtns.length > 0) {
      function renderMemVisual(n) {
        let blocks = '';
        const count = Math.min(n, 32);
        for (let i = 0; i < count; i++) {
          blocks += `<div class="tc-m-block">&bull;</div>`;
        }
        memDisplay.innerHTML = `
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); margin-bottom:8px;">Allocated Heap Memory Blocks (n = ${n}):</div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
            ${blocks}
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">O(1): 1 fixed block | O(n): ${n} blocks allocated | O(n²): ${n * n} blocks allocated</div>
        `;
      }

      renderMemVisual(4);

      memBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          memBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const n = parseInt(btn.getAttribute('data-n'), 10);
          renderMemVisual(n);
        });
      });
    }

    // 2. Interactive Space Playground Questions Data
    const spacePlayData = [
      {
        code: "function sum(arr) {\n  let total = 0;\n  for(let x of arr) total += x;\n  return total;\n}",
        answer: "O(1)",
        explanation: "Only scalar variable 'total' is allocated. Auxiliary space is O(1)."
      },
      {
        code: "function copyArray(arr) {\n  return [...arr];\n}",
        answer: "O(n)",
        explanation: "Constructs a brand-new array copy of size n in Heap memory (O(n) Space)."
      },
      {
        code: "function createMatrix(n) {\n  return Array(n).fill().map(() => Array(n));\n}",
        answer: "O(n^2)",
        explanation: "Allocates an n x n 2D grid in Heap memory (O(n²) Space)."
      },
      {
        code: "function recurse(n) {\n  if (n <= 0) return;\n  recurse(n - 1);\n}",
        answer: "O(n)",
        explanation: "Recursion depth n builds n active call frames on the Call Stack (O(n) Space)."
      }
    ];

    let spIdx = 0;
    const spBox = container.querySelector('#sc-playground-box');
    if (spBox) {
      const codeEl = spBox.querySelector('#sc-quiz-code-text');
      const optsEl = spBox.querySelector('#sc-quiz-opts');
      const fbEl = spBox.querySelector('#sc-quiz-fb');
      const nextBtn = spBox.querySelector('#sc-quiz-next-btn');

      function loadSpacePlayQ(idx) {
        const item = spacePlayData[idx];
        codeEl.textContent = item.code;
        fbEl.style.display = 'none';
        nextBtn.style.display = 'none';
        optsEl.querySelectorAll('.tc-q-opt').forEach(b => {
          b.style.background = 'var(--bg-body)';
          b.style.borderColor = 'var(--border-default)';
          b.style.color = 'var(--text-primary)';
          b.style.pointerEvents = 'auto';
        });
      }

      loadSpacePlayQ(0);

      optsEl.querySelectorAll('.tc-q-opt').forEach(b => {
        b.addEventListener('click', () => {
          const selected = b.getAttribute('data-ans');
          const currentItem = spacePlayData[spIdx];
          const isCorrect = selected === currentItem.answer;

          optsEl.querySelectorAll('.tc-q-opt').forEach(optBtn => {
            optBtn.style.pointerEvents = 'none';
            if (optBtn.getAttribute('data-ans') === currentItem.answer) {
              optBtn.style.background = 'rgba(16, 185, 129, 0.2)';
              optBtn.style.borderColor = '#10B981';
              optBtn.style.color = '#10B981';
            }
          });

          if (!isCorrect) {
            b.style.background = 'rgba(239, 68, 68, 0.2)';
            b.style.borderColor = '#EF4444';
            b.style.color = '#EF4444';
          }

          fbEl.style.display = 'block';
          fbEl.style.padding = '10px 14px';
          fbEl.style.borderRadius = '8px';
          fbEl.style.marginTop = '10px';
          fbEl.style.background = isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
          fbEl.style.color = 'var(--text-primary)';
          fbEl.innerHTML = `<strong>${isCorrect ? 'Correct! 🎉' : 'Incorrect ❌'}</strong> ${currentItem.explanation}`;

          nextBtn.style.display = 'inline-block';
        });
      });

      nextBtn.addEventListener('click', () => {
        spIdx = (spIdx + 1) % spacePlayData.length;
        loadSpacePlayQ(spIdx);
      });
    }

    // Bind footer button for switching to questions tab
    const gotoScQ = container.querySelector('#btn-sc-goto-questions');
    if (gotoScQ) {
      gotoScQ.addEventListener('click', () => {
        const qTabBtn = container.querySelector('.tab-btn[data-tab="questions"]');
        if (qTabBtn) qTabBtn.click();
      });
    }
  }
};
