/**
 * DSA Tracker — Lesson Content: Time Complexity (Big-O)
 * ──────────────────────────────────────────────────────
 * Redesigned from zero: Beginner-friendly, zero math assumed,
 * highly visual, interactive diagrams, code analysis playground,
 * complexity comparison tool, and 25+ categorized practice questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["time-complexity"] = {
  id: "time-complexity",
  title: "Time Complexity (Big-O)",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn to measure how code efficiency scales as your input grows — explained from absolute zero with visual intuition, step-by-step examples, interactive charts, and practice.",

  sections: [
    {
      id: "sec-hero",
      tocTitle: "1. Intro & Hero",
      title: "1. Time Complexity: How Code Scales",
      contentHtml: `
        <div class="tc-hero-card">
          <div class="tc-hero-badge">FOUNDATION</div>
          <h2 class="tc-hero-headline">How does your code behave when the input gets bigger?</h2>
          <p class="tc-hero-sub">Learn to measure how the work of an algorithm grows as dataset sizes explode from 10 items to 10,000,000 items.</p>
          
          <div class="tc-flowchart">
            <div class="tc-flow-step">Input gets bigger</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step">Algorithm does more work</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step">How quickly does that work grow?</div>
            <div class="tc-flow-arrow">&darr;</div>
            <div class="tc-flow-step tc-flow-highlight">Big-O helps us describe it</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-why",
      tocTitle: "2. Why We Care",
      title: "2. First: Why Do We Care About Time Complexity?",
      contentHtml: `
        <div class="tc-card">
          <p>Imagine you are searching for a user named <strong>"Nirmal"</strong> in a database table.</p>

          <div class="tc-example-box">
            <div class="tc-example-title">The Search Problem</div>
            <p>If you have <strong>10 names</strong>, checking names one by one takes a tiny fraction of a millisecond. Easy.</p>
            <p>Now imagine your website grows and you have <strong>10,000,000 names</strong>. Will your search still feel instant, or will the server freeze?</p>
          </div>

          <div class="tc-scale-list">
            <div class="tc-scale-item"><span class="tc-scale-num">10</span> items &rarr; instant response (checks &le; 10 names)</div>
            <div class="tc-scale-item"><span class="tc-scale-num">100</span> items &rarr; instant response</div>
            <div class="tc-scale-item"><span class="tc-scale-num">1,000</span> items &rarr; imperceptible delay</div>
            <div class="tc-scale-item"><span class="tc-scale-num">1,000,000</span> items &rarr; noticeable slowdown if using a slow algorithm</div>
            <div class="tc-scale-item tc-scale-warn"><span class="tc-scale-num">10,000,000</span> items &rarr; server timeout if using $O(n^2)$ vs 24 checks with $O(\\log n)$!</div>
          </div>

          <blockquote class="tc-quote">
            <strong>The Core Question:</strong> Time complexity doesn't count execution speed in exact milliseconds (which depends on CPU speed). Instead, it answers: <em>How does the amount of work grow as the input grows?</em>
          </blockquote>
        </div>
      `
    },
    {
      id: "sec-what-is-n",
      tocTitle: "3. What is n?",
      title: "3. What is 'n'?",
      contentHtml: `
        <div class="tc-card">
          <p>In Data Structures &amp; Algorithms, <strong><code>n</code></strong> is simply a shorthand name for <em>how much input data you give to your function</em>.</p>
          
          <div class="tc-grid-3">
            <div class="tc-mini-box">
              <div class="tc-mini-head">Array of 5 numbers</div>
              <code>[10, 20, 30, 40, 50]</code>
              <div class="tc-mini-foot">n = 5</div>
            </div>
            <div class="tc-mini-box">
              <div class="tc-mini-head">Array of 1,000 users</div>
              <code>[{id:1}, ... 1,000 items]</code>
              <div class="tc-mini-foot">n = 1,000</div>
            </div>
            <div class="tc-mini-box">
              <div class="tc-mini-head">String of 20 chars</div>
              <code>"hello world welcome!"</code>
              <div class="tc-mini-foot">n = 20</div>
            </div>
          </div>

          <div class="tc-callout">
            <span class="tc-callout-icon">&#128161;</span>
            <div><strong>Note for Beginners:</strong> <code>n</code> is NOT a special JavaScript keyword or reserved variable. It is standard mathematical shorthand used by software engineers to represent input length or size.</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-what-is-big-o",
      tocTitle: "4. What is Big-O?",
      title: "4. What is Big-O Notation?",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead"><strong>Big-O notation</strong> describes the upper bound (worst-case growth pattern) of how much work code performs as the input size <code>n</code> gets larger.</p>

          <p>We write Big-O with an <code>O</code> followed by parentheses containing a growth pattern formula. Here are the 10 growth classes we will unlock step-by-step:</p>

          <div class="tc-growth-tags">
            <span class="tc-tag tc-t1">O(1) Constant</span>
            <span class="tc-tag tc-t2">O(log n) Logarithmic</span>
            <span class="tc-tag tc-t3">O(&radic;n) Square Root</span>
            <span class="tc-tag tc-t4">O(n) Linear</span>
            <span class="tc-tag tc-t5">O(n log n) Linearithmic</span>
            <span class="tc-tag tc-t6">O(n&sup2;) Quadratic</span>
            <span class="tc-tag tc-t7">O(n&sup3;) Cubic</span>
            <span class="tc-tag tc-t8">O(2&#8319;) Exponential</span>
            <span class="tc-tag tc-t9">O(3&#8319;) Ternary Exp</span>
            <span class="tc-tag tc-t10">O(n!) Factorial</span>
          </div>
        </div>
      `
    },
    {
      id: "sec-growth-visual",
      tocTitle: "5. Growth Chart",
      title: "5. Interactive Growth Visualization",
      contentHtml: `
        <div class="tc-card">
          <p>Toggle individual complexity curves below to see how work increases as input size <code>n</code> grows on the X-axis:</p>
          
          <div class="tc-chart-controls" id="tc-chart-controls">
            <button class="tc-chart-btn active" data-curve="all">Show All</button>
            <button class="tc-chart-btn" data-curve="o1">O(1)</button>
            <button class="tc-chart-btn" data-curve="ologn">O(log n)</button>
            <button class="tc-chart-btn" data-curve="osqrtn">O(&radic;n)</button>
            <button class="tc-chart-btn" data-curve="on">O(n)</button>
            <button class="tc-chart-btn" data-curve="onlogn">O(n log n)</button>
            <button class="tc-chart-btn" data-curve="on2">O(n&sup2;)</button>
            <button class="tc-chart-btn" data-curve="on3">O(n&sup3;)</button>
            <button class="tc-chart-btn" data-curve="o2n">O(2&#8319;)</button>
            <button class="tc-chart-btn" data-curve="onfact">O(n!)</button>
          </div>

          <div class="tc-svg-container">
            <svg viewBox="0 0 700 360" class="tc-chart-svg" id="tc-growth-svg">
              <rect width="700" height="360" fill="var(--bg-body)" rx="10"/>
              <!-- Grid lines -->
              <line x1="60" y1="300" x2="660" y2="300" stroke="var(--border-default)" stroke-width="1.5"/>
              <line x1="60" y1="40" x2="60" y2="300" stroke="var(--border-default)" stroke-width="1.5"/>
              <text x="360" y="340" fill="var(--text-secondary)" font-size="12" font-weight="600" text-anchor="middle">Input Size (n) &rarr;</text>
              <text x="25" y="170" fill="var(--text-secondary)" font-size="12" font-weight="600" text-anchor="middle" transform="rotate(-90 25 170)">Work / Operations &uarr;</text>

              <!-- Curves -->
              <!-- O(1) -->
              <path class="tc-curve curve-o1" d="M 60 290 L 650 290" stroke="#34D399" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-o1" x="600" y="282" fill="#34D399" font-size="11" font-weight="bold">O(1)</text>

              <!-- O(log n) -->
              <path class="tc-curve curve-ologn" d="M 60 290 Q 250 270 650 250" stroke="#2DD4BF" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-ologn" x="600" y="240" fill="#2DD4BF" font-size="11" font-weight="bold">O(log n)</text>

              <!-- O(sqrt n) -->
              <path class="tc-curve curve-osqrtn" d="M 60 290 Q 300 240 650 190" stroke="#38BDF8" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-osqrtn" x="600" y="180" fill="#38BDF8" font-size="11" font-weight="bold">O(&radic;n)</text>

              <!-- O(n) -->
              <path class="tc-curve curve-on" d="M 60 290 L 580 120" stroke="#60A5FA" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-on" x="540" y="110" fill="#60A5FA" font-size="11" font-weight="bold">O(n)</text>

              <!-- O(n log n) -->
              <path class="tc-curve curve-onlogn" d="M 60 290 Q 300 210 460 50" stroke="#A78BFA" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-onlogn" x="430" y="45" fill="#A78BFA" font-size="11" font-weight="bold">O(n log n)</text>

              <!-- O(n^2) -->
              <path class="tc-curve curve-on2" d="M 60 290 Q 180 260 270 40" stroke="#FBBF24" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-on2" x="250" y="35" fill="#FBBF24" font-size="11" font-weight="bold">O(n&sup2;)</text>

              <!-- O(n^3) -->
              <path class="tc-curve curve-on3" d="M 60 290 Q 130 250 180 40" stroke="#F97316" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-on3" x="165" y="35" fill="#F97316" font-size="11" font-weight="bold">O(n&sup3;)</text>

              <!-- O(2^n) -->
              <path class="tc-curve curve-o2n" d="M 60 290 Q 100 240 125 40" stroke="#F87171" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-o2n" x="110" y="35" fill="#F87171" font-size="11" font-weight="bold">O(2&#8319;)</text>

              <!-- O(n!) -->
              <path class="tc-curve curve-onfact" d="M 60 290 Q 78 240 92 40" stroke="#EC4899" stroke-width="3" fill="none"/>
              <text class="tc-curve-label curve-onfact" x="78" y="35" fill="#EC4899" font-size="11" font-weight="bold">O(n!)</text>
            </svg>
          </div>

          <p class="tc-chart-caption"><em>Key Takeaway:</em> The higher the curve rises, the faster the work grows as input size <code>n</code> increases.</p>
        </div>
      `
    },
    {
      id: "sec-cheat-sheet",
      tocTitle: "6. Cheat Sheet",
      title: "6. Big-O Speed Cheat Sheet",
      contentHtml: `
        <div class="tc-card">
          <p>From fastest (most efficient) to slowest (least efficient as <code>n</code> becomes large):</p>
          
          <div class="tc-cheat-ladder">
            <div class="tc-ladder-row r1"><span>O(1)</span> <strong>Constant</strong> &mdash; Excellent / Ideal</div>
            <div class="tc-ladder-row r2"><span>O(log n)</span> <strong>Logarithmic</strong> &mdash; Excellent / Scalable</div>
            <div class="tc-ladder-row r3"><span>O(&radic;n)</span> <strong>Square Root</strong> &mdash; Very Good</div>
            <div class="tc-ladder-row r4"><span>O(n)</span> <strong>Linear</strong> &mdash; Fair / Normal</div>
            <div class="tc-ladder-row r5"><span>O(n log n)</span> <strong>Linearithmic</strong> &mdash; Good for Sorting</div>
            <div class="tc-ladder-row r6"><span>O(n&sup2;)</span> <strong>Quadratic</strong> &mdash; Slow for large n</div>
            <div class="tc-ladder-row r7"><span>O(n&sup3;)</span> <strong>Cubic</strong> &mdash; Very Slow</div>
            <div class="tc-ladder-row r8"><span>O(2&#8319;)</span> <strong>Exponential</strong> &mdash; Impractical for n > 30</div>
            <div class="tc-ladder-row r9"><span>O(3&#8319;)</span> <strong>Ternary Exp</strong> &mdash; Impractical</div>
            <div class="tc-ladder-row r10"><span>O(n!)</span> <strong>Factorial</strong> &mdash; Extremely slow for n > 12</div>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;"><em>Note:</em> This ranking reflects asymptotic growth as $n \to \infty$, not guaranteed exact CPU timing for tiny $n$.</p>
        </div>
      `
    },
    {
      id: "sec-o1",
      tocTitle: "7. O(1) Constant",
      title: "7. O(1) — Constant Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(1) Constant Time</strong> means execution takes approximately the same amount of work, regardless of whether input size <code>n</code> is 10 or 10,000,000.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">getFirstItem</span>(arr) {
  <span class="kw">return</span> arr[<span class="num">0</span>]; <span class="cm">// O(1) - single direct access</span>
}</code></pre>

          <div class="tc-visual-dots">
            <div class="tc-dot-row"><span>10 items:</span> <span class="tc-dot active">&bull;</span></div>
            <div class="tc-dot-row"><span>1,000 items:</span> <span class="tc-dot active">&bull;</span></div>
            <div class="tc-dot-row"><span>1,000,000 items:</span> <span class="tc-dot active">&bull;</span></div>
          </div>

          <div class="tc-analogy">
            <strong>Real-World Analogy:</strong> You know someone's house number is #25. You walk straight to house #25. You don't need to knock on house #1, #2, #3... first!
          </div>
        </div>
      `
    },
    {
      id: "sec-on",
      tocTitle: "8. O(n) Linear",
      title: "8. O(n) — Linear Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n) Linear Time</strong> means work grows in direct 1:1 proportion with the size of the input <code>n</code>.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">printAll</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++) {
    console.<span class="fn">log</span>(arr[i]); <span class="cm">// Runs n times</span>
  }
}</code></pre>

          <div class="tc-visual-dots">
            <div class="tc-dot-row"><span>5 items:</span> <span class="tc-dot">&bull; &bull; &bull; &bull; &bull;</span> (5 checks)</div>
            <div class="tc-dot-row"><span>10 items:</span> <span class="tc-dot">&bull; &bull; &bull; &bull; &bull; &bull; &bull; &bull; &bull; &bull;</span> (10 checks)</div>
          </div>

          <div class="tc-analogy">
            <strong>Real-World Analogy:</strong> A teacher checking the attendance of every student in a classroom one by one. If 30 students, 30 checks. If 60 students, 60 checks.
          </div>
        </div>
      `
    },
    {
      id: "sec-on2",
      tocTitle: "9. O(n²) Quadratic",
      title: "9. O(n²) — Quadratic Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n²) Quadratic Time</strong> occurs when code contains nested loops iterating over the input. The work equals <code>n &times; n</code>.</p>

          <div class="tc-analogy" style="margin-bottom:14px;">
            <strong>Real-World Analogy:</strong> 5 students enter a room. Every student must shake hands with every other student. Student 1 shakes 5 hands, Student 2 shakes 5 hands... total ~25 handshakes!
          </div>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">printAllPairs</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++) {
    <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; arr.length; j++) {
      console.<span class="fn">log</span>(arr[i], arr[j]); <span class="cm">// Runs n * n times</span>
    }
  }
}</code></pre>

          <div class="tc-matrix-title">Visualizing n = 4 (4 &times; 4 = 16 operations):</div>
          <div class="tc-matrix">
            <div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div>
            <div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div>
            <div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div>
            <div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div><div class="tc-m-cell">&bull;</div>
          </div>

          <div class="tc-scale-list" style="margin-top:12px;">
            <div class="tc-scale-item">n = 100 &rarr; 10,000 operations</div>
            <div class="tc-scale-item tc-scale-warn">n = 1,000 &rarr; 1,000,000 operations!</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-on3",
      tocTitle: "10. O(n³) Cubic",
      title: "10. O(n³) — Cubic Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n³) Cubic Time</strong> happens when you nest 3 loops over the input length <code>n</code>.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">threeNestedLoops</span>(n) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) {
    <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; n; j++) {
      <span class="kw">for</span> (<span class="kw">let</span> k = <span class="num">0</span>; k &lt; n; k++) {
        <span class="cm">// work</span>
      }
    }
  }
}</code></pre>

          <div class="tc-calc-box">
            <div>2 &times; 2 &times; 2 = <strong>8</strong> operations</div>
            <div>5 &times; 5 &times; 5 = <strong>125</strong> operations</div>
            <div>10 &times; 10 &times; 10 = <strong>1,000</strong> operations</div>
            <div style="color:#F87171;">1,000 &times; 1,000 &times; 1,000 = <strong>1,000,000,000</strong> operations!</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-ologn",
      tocTitle: "11. O(log n) Logarithmic",
      title: "11. O(log n) — Logarithmic Time",
      contentHtml: `
        <div class="tc-card">
          <p class="tc-lead">Beginners often fear logarithms, but the concept is simple: <strong>Every step cuts the remaining search space roughly in half!</strong></p>

          <div class="tc-analogy">
            <strong>The Number Guessing Game:</strong> I pick a secret number between 1 and 100.<br/>
            Instead of guessing 1, 2, 3, 4... (linear search), you guess <strong>50</strong>.<br/>
            I say <em>"Too High!"</em> Now you eliminate 50..100 instantly!<br/>
            You guess <strong>25</strong>... <strong>37</strong>... In just 7 guesses, you find the secret out of 100 numbers!
          </div>

          <div class="tc-halving-flow">
            <span class="tc-h-step">100</span> &rarr;
            <span class="tc-h-step">50</span> &rarr;
            <span class="tc-h-step">25</span> &rarr;
            <span class="tc-h-step">12</span> &rarr;
            <span class="tc-h-step">6</span> &rarr;
            <span class="tc-h-step">3</span> &rarr;
            <span class="tc-h-step">1</span>
          </div>

          <p>Notice how 100 items took only 6-7 steps. That's why $\\log_2(n)$ growth is super fast!</p>
          <p>Math definition: $\\log_2(8) = 3$ because $2 \\times 2 \\times 2 = 8$. (We multiplied 2 three times to get 8).</p>
        </div>
      `
    },
    {
      id: "sec-binary-search",
      tocTitle: "12. Binary Search Demo",
      title: "12. Practical Example: Binary Search",
      contentHtml: `
        <div class="tc-card">
          <p>Binary search is the ultimate $O(\\log n)$ algorithm. Watch how searching for target <strong>13</strong> in a sorted array of 8 elements shrinks the search window:</p>

          <div class="tc-bs-visual" id="tc-bs-visual">
            <div class="tc-bs-step">
              <div class="tc-bs-label">Step 1: Check mid (7) &rarr; 13 is greater &rarr; Discard left half</div>
              <div class="tc-bs-array">[ 1, 3, 5, 7, | <strong class="hi">9, 11, 13, 15</strong> ]</div>
            </div>
            <div class="tc-bs-step">
              <div class="tc-bs-label">Step 2: Check mid (11) &rarr; 13 is greater &rarr; Discard left half</div>
              <div class="tc-bs-array">[ 9, 11, | <strong class="hi">13, 15</strong> ]</div>
            </div>
            <div class="tc-bs-step">
              <div class="tc-bs-label">Step 3: Check mid (13) &rarr; Target Found!</div>
              <div class="tc-bs-array">[ <strong class="found">13</strong> ]</div>
            </div>
          </div>
          <p>Only 3 steps for 8 items ($\\\\log_2(8) = 3$). For 1,000,000 items, Binary Search takes at most 20 steps!</p>
        </div>
      `
    },
    {
      id: "sec-osqrtn",
      tocTitle: "13. O(√n) Square Root",
      title: "13. O(&radic;n) — Square Root Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(&radic;n) Square Root Time</strong> occurs when algorithms iterate up to the square root of <code>n</code>.</p>

          <div class="tc-analogy">
            <strong>Perfect Square Intuition:</strong> $4 \\times 4 = 16$, so $\\sqrt{16} = 4$.
          </div>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">isPrime</span>(n) {
  <span class="kw">if</span> (n &lt; <span class="num">2</span>) <span class="kw">return</span> <span class="kw">false</span>;
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">2</span>; i * i &lt;= n; i++) {
    <span class="kw">if</span> (n % i === <span class="num">0</span>) <span class="kw">return</span> <span class="kw">false</span>;
  }
  <span class="kw">return</span> <span class="kw">true</span>;
}</code></pre>

          <p>Why stop at <code>i * i &lt;= n</code>? Because if $n$ has a factor larger than $\\sqrt{n}$, its matching factor must be smaller than $\\sqrt{n}$. For $n = 100$, checking up to $i = 10$ is sufficient!</p>
        </div>
      `
    },
    {
      id: "sec-onlogn",
      tocTitle: "14. O(n log n)",
      title: "14. O(n log n) — Linearithmic Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n log n)</strong> comes from doing <code>n</code> work across <code>log n</code> levels of recursive splitting or tree height.</p>

          <div class="tc-analogy">
            <strong>Merge Sort Tree Intuition:</strong><br/>
            An array of 8 elements is split in half down to 1-element arrays ($\\\\log_2 8 = 3$ levels of depth).<br/>
            At each level, we merge back 8 elements total ($n$ work per level).
          </div>

          <div class="tc-tree-box">
            <div>Level 0: [8 3 7 4 2 6 1 5] (8 elements)</div>
            <div>Level 1: [8 3 7 4] &nbsp; [2 6 1 5] (8 elements merged)</div>
            <div>Level 2: [8 3] [7 4] &nbsp; [2 6] [1 5] (8 elements merged)</div>
            <div>Level 3: [8] [3] [7] [4] [2] [6] [1] [5] (base cases)</div>
          </div>
          <p>Total work: $n \\times \\log n = 8 \\times 3 = 24$ operations.</p>
        </div>
      `
    },
    {
      id: "sec-o2n",
      tocTitle: "15. O(2ⁿ) Exponential",
      title: "15. O(2&#8319;) — Exponential Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(2&#8319;) Exponential Time</strong> doubles the number of operations with every single element added to <code>n</code>.</p>

          <pre class="code-block"><code><span class="kw">function</span> <span class="fn">fibonacci</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> n;
  <span class="kw">return</span> <span class="fn">fibonacci</span>(n - <span class="num">1</span>) + <span class="fn">fibonacci</span>(n - <span class="num">2</span>);
}</code></pre>

          <div class="tc-scale-list">
            <div class="tc-scale-item">n = 1 &rarr; 1 call</div>
            <div class="tc-scale-item">n = 5 &rarr; 32 calls</div>
            <div class="tc-scale-item">n = 10 &rarr; 1,024 calls</div>
            <div class="tc-scale-item tc-scale-warn">n = 30 &rarr; 1,073,741,824 calls! (Hangs the browser)</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-o3n",
      tocTitle: "16. O(3ⁿ) Ternary Exp",
      title: "16. O(3&#8319;) — Ternary Exponential Time",
      contentHtml: `
        <div class="tc-card">
          <p>Similar to $O(2^n)$, but each step branches 3 ways instead of 2!</p>
          <div class="tc-calc-box">
            <div>n = 1 &rarr; 3</div>
            <div>n = 2 &rarr; 9</div>
            <div>n = 3 &rarr; 27</div>
            <div>n = 5 &rarr; 243</div>
            <div style="color:#EF4444;">n = 10 &rarr; 59,049 operations</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-onfact",
      tocTitle: "17. O(n!) Factorial",
      title: "17. O(n!) — Factorial Time",
      contentHtml: `
        <div class="tc-card">
          <p><strong>O(n!) Factorial Time</strong> represents generating all permutations of <code>n</code> items.</p>

          <div class="tc-analogy">
            Arranging 3 people (A, B, C) in a row:<br/>
            ABC, ACB, BAC, BCA, CAB, CBA &rarr; $3! = 3 \\times 2 \\times 1 = 6$ arrangements.
          </div>

          <div class="tc-scale-list" style="margin-top:10px;">
            <div class="tc-scale-item">4! = 24</div>
            <div class="tc-scale-item">5! = 120</div>
            <div class="tc-scale-item">10! = 3,628,800</div>
            <div class="tc-scale-item tc-scale-warn">13! = 6,227,020,800!</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-rules",
      tocTitle: "18. Big-O Rules",
      title: "18. Rules for Analyzing Code Complexity",
      contentHtml: `
        <div class="tc-card">
          <div class="tc-rule-box">
            <div class="tc-rule-num">Rule 1</div>
            <div><strong>Drop Constants:</strong> $O(2n + 5)$ simplifies to <strong>$O(n)$</strong>. We focus on growth rate, not constant multipliers.</div>
          </div>
          <div class="tc-rule-box">
            <div class="tc-rule-num">Rule 2</div>
            <div><strong>Sequential Loops Add:</strong> Two sequential loops running $n$ times is $O(n + n) = O(2n) \to$ <strong>$O(n)$</strong>.</div>
          </div>
          <div class="tc-rule-box">
            <div class="tc-rule-num">Rule 3</div>
            <div><strong>Nested Loops Multiply:</strong> A loop running $n$ times inside another loop running $n$ times is $O(n \times n) \to$ <strong>$O(n^2)$</strong>.</div>
          </div>
          <div class="tc-rule-box">
            <div class="tc-rule-num">Rule 4</div>
            <div><strong>Different Inputs Stay Separate:</strong> Iterating over array <code>a</code> of length $A$ and array <code>b</code> of length $B$ is <strong>$O(A + B)$</strong>.</div>
          </div>
          <div class="tc-rule-box">
            <div class="tc-rule-num">Rule 5</div>
            <div><strong>Keep the Dominant Term:</strong> $O(n^2 + n + 500)$ simplifies to <strong>$O(n^2)$</strong> because $n^2$ completely dominates as $n$ grows.</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-mistakes",
      tocTitle: "19. Common Mistakes",
      title: "19. Common Big-O Mistakes to Avoid",
      contentHtml: `
        <div class="tc-card">
          <div class="tc-mistake-item">
            <strong>&times; Mistake 1:</strong> Thinking every loop is $O(n)$.<br/>
            <em>Correction:</em> A loop running a fixed 5 times (<code>for(let i=0; i&lt;5; i++)</code>) is $O(1)$ constant time!
          </div>
          <div class="tc-mistake-item">
            <strong>&times; Mistake 2:</strong> Thinking two separate loops are $O(n^2)$.<br/>
            <em>Correction:</em> Two sequential loops are $O(n + n) = O(n)$. Only nested loops multiply into $O(n^2)$.
          </div>
          <div class="tc-mistake-item">
            <strong>&times; Mistake 3:</strong> Assuming array <code>.includes()</code> or <code>.indexOf()</code> is $O(1)$.<br/>
            <em>Correction:</em> JS array search methods scan under the hood, making them $O(n)$ operations!
          </div>
        </div>
      `
    },
    {
      id: "sec-playground",
      tocTitle: "20. Code Playground",
      title: "20. Interactive Code Analysis Playground",
      contentHtml: `
        <div class="tc-card">
          <p>Test your intuition! What is the Big-O time complexity of this code snippet?</p>
          
          <div class="tc-quiz-box" id="tc-playground-box">
            <div class="tc-quiz-code" id="tc-quiz-code-text"></div>
            <div class="tc-quiz-opts" id="tc-quiz-opts">
              <button class="tc-q-opt" data-ans="O(1)">O(1)</button>
              <button class="tc-q-opt" data-ans="O(log n)">O(log n)</button>
              <button class="tc-q-opt" data-ans="O(n)">O(n)</button>
              <button class="tc-q-opt" data-ans="O(n^2)">O(n²)</button>
            </div>
            <div class="tc-quiz-fb" id="tc-quiz-fb" style="display:none;"></div>
            <button class="tc-chart-btn" id="tc-quiz-next-btn" style="margin-top:12px; display:none;">Next Question &rarr;</button>
          </div>
        </div>
      `
    },
    {
      id: "sec-comparison",
      tocTitle: "21. Comparison Tool",
      title: "21. Approximate Operations Comparison Tool",
      contentHtml: `
        <div class="tc-card">
          <p>Select an input size <code>n</code> to compare the approximate operations across all complexity classes:</p>
          
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <button class="tc-chart-btn active tc-comp-n" data-n="10">n = 10</button>
            <button class="tc-chart-btn tc-comp-n" data-n="100">n = 100</button>
            <button class="tc-chart-btn tc-comp-n" data-n="1000">n = 1,000</button>
          </div>

          <table class="tc-comp-table">
            <thead>
              <tr><th>Complexity Class</th><th>Approx. Operations</th><th>Verdict</th></tr>
            </thead>
            <tbody id="tc-comp-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">*Approximate operations illustrated for learning growth patterns.</p>
        </div>
      `
    },
    {
      id: "sec-summary",
      tocTitle: "22. Summary & Next",
      title: "22. Time Complexity Complete",
      contentHtml: `
        <div class="tc-card" style="text-align:center; padding:32px 20px;">
          <div style="font-size:2.5rem; margin-bottom:10px;">🎉</div>
          <h3 style="font-size:1.4rem; color:var(--text-primary); margin-bottom:12px;">You've Unlocked Time Complexity!</h3>
          <p style="color:var(--text-secondary); max-width:600px; margin:0 auto 20px auto; line-height:1.6;">
            You can now recognize how code scales, analyze loops, understand Big-O growth curves, and avoid runtime bottlenecks.
          </p>
          <div style="display:inline-flex; gap:12px; flex-wrap:wrap; justify-content:center;">
            <button class="btn btn--primary" id="btn-goto-questions" style="padding:10px 20px; font-weight:600; border-radius:20px;">
              Practice Questions Tab &rarr;
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
      question: "What does 'n' represent in Big-O time complexity analysis?",
      options: [
        "A. The number of memory gigabytes used",
        "B. The CPU clock speed in GHz",
        "C. The size or length of the input data",
        "D. The number of functions in JavaScript"
      ],
      answer: "C",
      explanation: "In Big-O analysis, 'n' represents the quantity or size of the input data given to an algorithm."
    },
    {
      difficulty: "Easy",
      question: "What is the time complexity of accessing an array element by index: `const item = arr[5];`?",
      options: [
        "A. O(1) Constant",
        "B. O(n) Linear",
        "C. O(log n) Logarithmic",
        "D. O(n²) Quadratic"
      ],
      answer: "A",
      explanation: "Direct index lookup accesses memory in a single step regardless of array size, making it O(1) constant time."
    },
    {
      difficulty: "Easy",
      question: "What is the Big-O time complexity of a simple single loop iterating over an array of size n?",
      code: "for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "The loop executes once for each element in the array, making its total operations directly proportional to n (O(n))."
    },
    {
      difficulty: "Easy",
      question: "How does Big-O handle constant multipliers according to Rule 1 (e.g. O(3n))?",
      options: [
        "A. Keeps constant 3: O(3n)",
        "B. Drops constant 3: O(n)",
        "C. Squares it: O(n³)",
        "D. Multiplies by 2: O(6n)"
      ],
      answer: "B",
      explanation: "Big-O focuses strictly on growth rate trends as input approaches infinity, so constant multipliers are dropped (O(3n) -> O(n))."
    },
    {
      difficulty: "Easy",
      question: "What is the Big-O complexity of two separate, non-nested loops running sequentially over array length n?",
      code: "for (let i = 0; i < n; i++) {}\nfor (let j = 0; j < n; j++) {}",
      options: [
        "A. O(n²)",
        "B. O(2n)",
        "C. O(n)",
        "D. O(1)"
      ],
      answer: "C",
      explanation: "Sequential loops add: O(n + n) = O(2n). Dropping the constant gives O(n)."
    },
    {
      difficulty: "Medium",
      question: "What is the time complexity of two nested loops each running n times?",
      code: "for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    // work\n  }\n}",
      options: [
        "A. O(n)",
        "B. O(2n)",
        "C. O(n²)",
        "D. O(n log n)"
      ],
      answer: "C",
      explanation: "Nested loops multiply their iterations: n * n = n², resulting in O(n²) quadratic time."
    },
    {
      difficulty: "Medium",
      question: "Why is Binary Search considered O(log n) time complexity?",
      options: [
        "A. It checks every item in order",
        "B. It divides the search space in half at each step",
        "C. It uses two nested loops",
        "D. It generates all permutations"
      ],
      answer: "B",
      explanation: "Each step of Binary Search cuts the remaining search window in half, resulting in log₂(n) operations."
    },
    {
      difficulty: "Medium",
      question: "Simplify the expression O(n² + 50n + 1000):",
      options: [
        "A. O(1000)",
        "B. O(50n)",
        "C. O(n²)",
        "D. O(n³)"
      ],
      answer: "C",
      explanation: "Rule 5 states that we drop lower-order terms and constants, retaining only the dominant term O(n²)."
    },
    {
      difficulty: "Medium",
      question: "What is the time complexity of checking if a number n is prime using `i * i <= n`?",
      options: [
        "A. O(1)",
        "B. O(√n)",
        "C. O(n)",
        "D. O(n²)"
      ],
      answer: "B",
      explanation: "Stopping when i * i > n means the loop runs at most √n times, yielding O(√n) square root time."
    },
    {
      difficulty: "Medium",
      question: "What is the time complexity of standard Merge Sort algorithm?",
      options: [
        "A. O(n)",
        "B. O(n²)",
        "C. O(n log n)",
        "D. O(2ⁿ)"
      ],
      answer: "C",
      explanation: "Merge Sort splits arrays into log n levels of depth and performs n work merging at each level, taking O(n log n) time."
    },
    {
      difficulty: "Medium",
      question: "What is the time complexity of this function with two separate input arrays of length A and B?",
      code: "function compare(a, b) {\n  for(let x of a) console.log(x);\n  for(let y of b) console.log(y);\n}",
      options: [
        "A. O(n)",
        "B. O(n²)",
        "C. O(A + B)",
        "D. O(A * B)"
      ],
      answer: "C",
      explanation: "When inputs are separate and unnested, their complexities add independently: O(A + B)."
    },
    {
      difficulty: "Hard",
      question: "What is the time complexity of naive recursive Fibonacci `fib(n)`?",
      code: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
      options: [
        "A. O(n)",
        "B. O(n²)",
        "C. O(2ⁿ)",
        "D. O(n!)"
      ],
      answer: "C",
      explanation: "Each call spawns 2 sub-calls, doubling the work at each recursion depth level, resulting in O(2ⁿ) exponential time."
    },
    {
      difficulty: "Hard",
      question: "What is the time complexity of calculating all permutations of an array of length n?",
      options: [
        "A. O(n²)",
        "B. O(2ⁿ)",
        "C. O(n!)",
        "D. O(n log n)"
      ],
      answer: "C",
      explanation: "Generating all unique ordered arrangements of n elements yields n! permutations (Factorial Time)."
    },
    {
      difficulty: "Hard",
      question: "What is the time complexity of a loop where i is multiplied by 2 in each iteration?",
      code: "for (let i = 1; i < n; i = i * 2) {\n  console.log(i);\n}",
      options: [
        "A. O(n)",
        "B. O(log n)",
        "C. O(n²)",
        "D. O(1)"
      ],
      answer: "B",
      explanation: "Multiplying i by 2 doubles i each step, so it reaches n in log₂(n) iterations (Logarithmic Time)."
    },
    {
      difficulty: "Hard",
      question: "What is the overall complexity of a loop running n times containing a Binary Search of size n inside?",
      options: [
        "A. O(n)",
        "B. O(n log n)",
        "C. O(n²)",
        "D. O(log n)"
      ],
      answer: "B",
      explanation: "The outer loop runs n times and the inner Binary Search takes O(log n). Multiplying gives O(n log n)."
    },
    {
      difficulty: "Interview",
      question: "An interviewer asks why `arr.unshift(item)` is O(n) while `arr.push(item)` is O(1) in JavaScript. What is the correct answer?",
      options: [
        "A. unshift is slower because of JavaScript garbage collection",
        "B. push modifies memory in-place, but unshift creates a new object",
        "C. unshift inserts at index 0, requiring V8 to re-index and shift every element right by 1 position (O(n) operations)",
        "D. Both are actually O(1)"
      ],
      answer: "C",
      explanation: "push appends at the end in O(1). unshift inserts at index 0, requiring the JS engine to shift all n existing items right by 1 index."
    },
    {
      difficulty: "Interview",
      question: "In technical interviews, what does Big-O specifically measure?",
      options: [
        "A. Best-case execution speed on fast hardware",
        "B. Average CPU temperature",
        "C. Worst-case asymptotic growth rate of work as input size approaches infinity",
        "D. Exact memory usage in bytes"
      ],
      answer: "C",
      explanation: "Big-O provides a hardware-independent mathematical upper bound for algorithm growth in the worst case."
    },
    {
      difficulty: "Interview",
      question: "What is the time complexity of finding an item in an unsorted array vs a JavaScript Set?",
      options: [
        "A. Array: O(1), Set: O(n)",
        "B. Array: O(n), Set: O(1)",
        "C. Both are O(1)",
        "D. Both are O(n)"
      ],
      answer: "B",
      explanation: "Unsorted array search requires scanning items one by one (O(n)). JS Set uses a hash table providing average O(1) lookup."
    },
    {
      difficulty: "Interview",
      question: "What is the time complexity of this code?",
      code: "for (let i = 0; i < n; i++) {\n  for (let j = i; j < n; j++) {\n    // inner work\n  }\n}",
      options: [
        "A. O(n)",
        "B. O(n log n)",
        "C. O(n²)",
        "D. O(n³)"
      ],
      answer: "C",
      explanation: "Inner iterations sum to n + (n-1) + (n-2)... + 1 = n(n+1)/2 = 0.5n² + 0.5n. Dropping constants gives O(n²)."
    },
    {
      difficulty: "Interview",
      question: "Which growth class is strictly FASTER for very large n?",
      options: [
        "A. O(n²)",
        "B. O(n log n)",
        "C. O(2ⁿ)",
        "D. O(n³)"
      ],
      answer: "B",
      explanation: "O(n log n) grows significantly slower than quadratic O(n²), cubic O(n³), or exponential O(2ⁿ) as n becomes large."
    },
    {
      difficulty: "Easy",
      question: "Is O(1000) considered O(1) constant time?",
      options: [
        "A. No, 1000 is too large",
        "B. Yes, because 1000 does not depend on input size n",
        "C. It is O(n)",
        "D. It is O(1000n)"
      ],
      answer: "B",
      explanation: "Fixed constant operation counts independent of n simplify to O(1)."
    },
    {
      difficulty: "Medium",
      question: "What is the complexity of string concatenation `str += char` inside a loop of size n in JS?",
      options: [
        "A. O(1)",
        "B. O(n) or O(n²) depending on engine optimization due to string immutability",
        "C. O(log n)",
        "D. O(n!)"
      ],
      answer: "B",
      explanation: "Because strings are immutable, creating new strings can take linear time per step, leading up to O(n²) unless optimized into arrays."
    },
    {
      difficulty: "Hard",
      question: "What is the time complexity of generating all subsets of a set of size n (Power Set)?",
      options: [
        "A. O(n)",
        "B. O(n²)",
        "C. O(2ⁿ)",
        "D. O(n!)"
      ],
      answer: "C",
      explanation: "A set of size n has 2ⁿ total subsets (each element is either included or excluded), resulting in O(2ⁿ) time."
    },
    {
      difficulty: "Interview",
      question: "If an algorithm takes 1 millisecond for n = 1000, and 1000 milliseconds for n = 1,000,000, what is its growth pattern?",
      options: [
        "A. O(1)",
        "B. O(log n)",
        "C. O(n)",
        "D. O(n²)"
      ],
      answer: "C",
      explanation: "The input increased 1000x and runtime increased 1000x (1:1 ratio), demonstrating linear O(n) growth."
    },
    {
      difficulty: "Interview",
      question: "True or False: An O(n²) algorithm can run faster than an O(n) algorithm for tiny input sizes (e.g. n = 2).",
      options: [
        "A. True",
        "B. False"
      ],
      answer: "A",
      explanation: "True! Big-O measures asymptotic growth as n -> infinity. For tiny n, constant factors can make an O(n²) routine execute in fewer CPU cycles."
    }
  ],

  // Interactive Mount Handler for Playground, Graph Toggles, and Comparison Tool
  onMount: function (container) {
    // 1. Chart Curve Toggle Buttons
    const controls = container.querySelector('#tc-chart-controls');
    const svg = container.querySelector('#tc-growth-svg');
    if (controls && svg) {
      controls.querySelectorAll('.tc-chart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          controls.querySelectorAll('.tc-chart-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const curve = btn.getAttribute('data-curve');

          const allCurves = svg.querySelectorAll('.tc-curve, .tc-curve-label');
          if (curve === 'all') {
            allCurves.forEach(el => { el.style.opacity = '1'; el.style.strokeWidth = '3'; });
          } else {
            allCurves.forEach(el => { el.style.opacity = '0.12'; });
            const activeEls = svg.querySelectorAll(`.curve-${curve}`);
            activeEls.forEach(el => { el.style.opacity = '1'; el.style.strokeWidth = '4.5'; });
          }
        });
      });
    }

    // 2. Interactive Playground Questions Data
    const playgroundData = [
      {
        code: "function getFirst(arr) {\n  return arr[0];\n}",
        answer: "O(1)",
        explanation: "Direct index lookup takes constant O(1) time regardless of array length."
      },
      {
        code: "function printItems(arr) {\n  for (let x of arr) console.log(x);\n}",
        answer: "O(n)",
        explanation: "The loop runs n times for an array of length n, making it O(n) linear."
      },
      {
        code: "function printPairs(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length; j++) {\n      console.log(arr[i], arr[j]);\n    }\n  }\n}",
        answer: "O(n^2)",
        explanation: "Nested loops over the same array length result in n * n = O(n²) quadratic time."
      },
      {
        code: "function halveNumber(n) {\n  while (n > 1) {\n    n = Math.floor(n / 2);\n  }\n}",
        answer: "O(log n)",
        explanation: "Halving n each step takes log₂(n) iterations, making it O(log n) logarithmic."
      }
    ];

    let pIdx = 0;
    const playBox = container.querySelector('#tc-playground-box');
    if (playBox) {
      const codeEl = playBox.querySelector('#tc-quiz-code-text');
      const optsEl = playBox.querySelector('#tc-quiz-opts');
      const fbEl = playBox.querySelector('#tc-quiz-fb');
      const nextBtn = playBox.querySelector('#tc-quiz-next-btn');

      function loadPlaygroundQ(idx) {
        const item = playgroundData[idx];
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

      loadPlaygroundQ(0);

      optsEl.querySelectorAll('.tc-q-opt').forEach(b => {
        b.addEventListener('click', () => {
          const selected = b.getAttribute('data-ans');
          const currentItem = playgroundData[pIdx];
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
        pIdx = (pIdx + 1) % playgroundData.length;
        loadPlaygroundQ(pIdx);
      });
    }

    // 3. Comparison Table Populator
    const tbody = container.querySelector('#tc-comp-tbody');
    const compBtns = container.querySelectorAll('.tc-comp-n');
    if (tbody && compBtns.length > 0) {
      function updateTable(n) {
        const rows = [
          { name: 'O(1) Constant', ops: 1, verdict: '<span style="color:#34D399;font-weight:700;">Instant</span>' },
          { name: 'O(log n) Logarithmic', ops: Math.ceil(Math.log2(n)), verdict: '<span style="color:#2DD4BF;font-weight:700;">Lightning Fast</span>' },
          { name: 'O(√n) Square Root', ops: Math.ceil(Math.sqrt(n)), verdict: '<span style="color:#38BDF8;font-weight:700;">Very Fast</span>' },
          { name: 'O(n) Linear', ops: n, verdict: '<span style="color:#60A5FA;font-weight:700;">Fast</span>' },
          { name: 'O(n log n) Linearithmic', ops: Math.ceil(n * Math.log2(n)), verdict: '<span style="color:#A78BFA;font-weight:700;">Good</span>' },
          { name: 'O(n²) Quadratic', ops: n * n, verdict: n >= 1000 ? '<span style="color:#EF4444;font-weight:700;">Slow!</span>' : '<span style="color:#FBBF24;font-weight:700;">Moderate</span>' },
          { name: 'O(n³) Cubic', ops: n * n * n, verdict: n >= 100 ? '<span style="color:#EF4444;font-weight:700;">Very Slow!</span>' : '<span style="color:#F97316;font-weight:700;">Slow</span>' },
          { name: 'O(2ⁿ) Exponential', ops: n > 30 ? '1.07B+' : Math.pow(2, n).toLocaleString(), verdict: '<span style="color:#F87171;font-weight:700;">Extreme Bottleneck</span>' },
          { name: 'O(n!) Factorial', ops: n >= 10 ? '3.62M+' : '362,880', verdict: '<span style="color:#EC4899;font-weight:700;">Impractical</span>' }
        ];

        tbody.innerHTML = rows.map(r => `
          <tr>
            <td><strong>${r.name}</strong></td>
            <td><code>${typeof r.ops === 'number' ? r.ops.toLocaleString() : r.ops}</code> ops</td>
            <td>${r.verdict}</td>
          </tr>
        `).join('');
      }

      updateTable(10);

      compBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          compBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const n = parseInt(btn.getAttribute('data-n'), 10);
          updateTable(n);
        });
      });
    }

    // Bind footer button for switching to questions tab
    const gotoQ = container.querySelector('#btn-goto-questions');
    if (gotoQ) {
      gotoQ.addEventListener('click', () => {
        const qTabBtn = container.querySelector('.tab-btn[data-tab="questions"]');
        if (qTabBtn) qTabBtn.click();
      });
    }
  }
};
