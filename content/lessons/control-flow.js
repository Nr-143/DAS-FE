/**
 * DSA Tracker — Lesson Content: Control Flow
 * ────────────────────────────────────────────
 * Complete, beginner-friendly guide covering conditionals, loops,
 * truthy/falsy coercion, ternary operators, short-circuit evaluation,
 * and interactive execution step-through visualizers.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["control-flow"] = {
  id: "control-flow",
  title: "Control Flow",
  levelTitle: "Level 1 — Foundations",
  summary: "Master conditionals, loops, truthy/falsy coercion, ternary operators, for...of vs for...in, and execution branching in JavaScript.",
  interactiveWidget: "control-flow-visualizer",

  definitions: [
    {
      term: "Control Flow",
      def: "The order in which a program's individual statements and instructions are executed. By default, code executes sequentially top-to-bottom, but control flow structures let a program branch or repeat."
    },
    {
      term: "Sequential Execution",
      def: "The baseline mode of execution where lines of code execute one after another in exact order from top to bottom."
    },
    {
      term: "Conditional Branching",
      def: "A structure that evaluates a boolean condition and executes different code blocks depending on whether the result is true or false (<code>if</code>, <code>else if</code>, <code>else</code>, <code>switch</code>)."
    },
    {
      term: "Loop (Iteration)",
      def: "A control structure that repeats a block of code multiple times while a condition stays true (<code>for</code>, <code>while</code>, <code>do...while</code>, <code>for...of</code>, <code>for...in</code>)."
    },
    {
      term: "Truthy / Falsy Coercion",
      def: "In JavaScript, any value evaluated inside a condition is automatically converted to <code>true</code> or <code>false</code>. The <strong>only 8 falsy values</strong> are: <code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code> (empty string), <code>null</code>, <code>undefined</code>, and <code>NaN</code>. All other values—including <code>[]</code> (empty array) and <code>{}</code> (empty object)—are truthy."
    },
    {
      term: "Ternary Operator",
      def: "A compact single-line conditional operator with three operands: <code>condition ? expressionIfTrue : expressionIfFalse</code>."
    },
    {
      term: "Short-Circuit Evaluation",
      def: "Logical operators (<code>&&</code> and <code>||</code>) stop evaluation as soon as the result is known. <code>&&</code> stops if the left side is falsy; <code>||</code> stops if the left side is truthy."
    }
  ],

  howItWorksTogether: "Control flow gives a program the intelligence to make decisions and automate repetitive tasks. Conditionals (<code>if</code>/<code>switch</code>) choose which branch of code to run based on whether an expression evaluates to a truthy or falsy value. Loops repeat operations—like iterating over an array or searching for an item—until a exit condition is met. Short-circuit operators allow quick inline guards without writing nested <code>if</code> statements.",

  whyMatters: "Every algorithm—from searching an array to traversing a tree or finding the shortest path in a graph—relies heavily on control flow. Understanding exact condition evaluation, loop lifecycles, and truthy/falsy behavior is essential before tackling Data Structures & Algorithms.",

  bigPicture: {
    title: "Control Flow Roadmap in DSA",
    familiesHeading: "Core Control Flow Pillars:",
    linearText: "<strong>Decision Making:</strong> <code>if / else if / else</code> and <code>switch</code> direct problem-solving logic.",
    nonlinearText: "<strong>Repetition & Traversal:</strong> <code>for</code>, <code>while</code>, and <code>for...of</code> loops power array traversal, binary search, and graph algorithms.",
    categoriesHeading: "How Control Flow Maps to DSA Algorithms:",
    searchSortText: "<strong>Searching & Sorting:</strong> Linear Search and Binary Search use <code>while</code> loops and condition branching to narrow down search ranges.",
    recursionText: "<strong>Recursion & Stack:</strong> Functions calling themselves rely on base-case <code>if</code> conditions to break out of recursion.",
    patternsText: "<strong>Two Pointers & Sliding Window:</strong> Algorithmic patterns use <code>while</code> loops with pointer updates to solve problems in O(n) time.",
    closingText: "Mastering control flow guarantees you can implement any algorithm cleanly without infinite loops or unexpected logic bugs."
  },

  workedExample: {
    title: "Conditionals, Loops, and Loop Comparison Traces",
    primitiveText: "<strong>1. Conditional Branching (if / else if / else):</strong><br/><code>function classify(n) {<br/>  if (n &lt; 0) return \"negative\";       // Evaluated first<br/>  else if (n === 0) return \"zero\";     // Evaluated second if n &lt; 0 is false<br/>  else return \"positive\";              // Default fallback<br/>}<br/><br/>classify(-5); // \"negative\" (Branch 1 taken)<br/>classify(0);  // \"zero\"     (Branch 2 taken)<br/>classify(42); // \"positive\" (Branch 3 taken)</code><br/><br/><strong>2. Switch Statement (requires break to avoid fall-through):</strong><br/><code>function getDayName(day) {<br/>  switch (day) {<br/>    case 0: return \"Sunday\";<br/>    case 1: return \"Monday\";<br/>    case 5: return \"Friday\";<br/>    default: return \"Unknown day\";<br/>  }<br/>}</code>",
    referenceText: "<strong>3. Loop Mechanics (for vs while vs do...while):</strong><br/><code>// for loop: initialization → condition check → body → update<br/>for (let i = 1; i &lt;= 3; i++) {<br/>  console.log(i); // Outputs: 1, 2, 3<br/>}<br/><br/>// for...of (values) vs for...in (keys)<br/>const arr = [10, 20, 30];<br/>for (const val of arr) console.log(val); // 10, 20, 30 (actual values)<br/>for (const idx in arr) console.log(idx); // \"0\", \"1\", \"2\" (string keys/indices)</code>"
  },

  visual: {
    caption: "Figure 1: Decision Flowchart — How the JavaScript engine branches through an if / else if / else conditional, evaluating each condition in sequence.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="340" fill="var(--bg-body)" rx="12" />

        <!-- START node -->
        <rect x="275" y="10" width="150" height="36" fill="rgba(108,99,255,0.2)" stroke="var(--accent-primary)" stroke-width="2" rx="18"/>
        <text x="350" y="33" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">classify(n)</text>

        <!-- Arrow down -->
        <line x1="350" y1="46" x2="350" y2="70" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#cf-arrow)"/>

        <!-- Diamond: n < 0 -->
        <polygon points="350,70 440,105 350,140 260,105" fill="rgba(239,68,68,0.12)" stroke="#EF4444" stroke-width="2"/>
        <text x="350" y="110" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">n &lt; 0 ?</text>

        <!-- TRUE branch left -->
        <line x1="260" y1="105" x2="120" y2="105" stroke="#10B981" stroke-width="2" marker-end="url(#cf-arrow)"/>
        <text x="190" y="98" fill="#10B981" font-size="10" font-weight="bold">TRUE</text>
        <rect x="20" y="88" width="100" height="34" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2" rx="6"/>
        <text x="70" y="110" fill="var(--text-primary)" font-size="11" font-weight="600" text-anchor="middle">"negative"</text>

        <!-- FALSE branch down -->
        <line x1="350" y1="140" x2="350" y2="170" stroke="#EF4444" stroke-width="2" marker-end="url(#cf-arrow)"/>
        <text x="362" y="160" fill="#EF4444" font-size="10" font-weight="bold">FALSE</text>

        <!-- Diamond: n === 0 -->
        <polygon points="350,170 440,205 350,240 260,205" fill="rgba(59,130,246,0.12)" stroke="#3B82F6" stroke-width="2"/>
        <text x="350" y="210" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">n === 0 ?</text>

        <!-- TRUE branch left -->
        <line x1="260" y1="205" x2="120" y2="205" stroke="#10B981" stroke-width="2" marker-end="url(#cf-arrow)"/>
        <text x="190" y="198" fill="#10B981" font-size="10" font-weight="bold">TRUE</text>
        <rect x="20" y="188" width="100" height="34" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2" rx="6"/>
        <text x="70" y="210" fill="var(--text-primary)" font-size="11" font-weight="600" text-anchor="middle">"zero"</text>

        <!-- FALSE branch down -->
        <line x1="350" y1="240" x2="350" y2="270" stroke="#EF4444" stroke-width="2" marker-end="url(#cf-arrow)"/>
        <text x="362" y="260" fill="#EF4444" font-size="10" font-weight="bold">FALSE</text>

        <!-- else block -->
        <rect x="275" y="270" width="150" height="36" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2" rx="6"/>
        <text x="350" y="293" fill="var(--text-primary)" font-size="12" font-weight="600" text-anchor="middle">"positive"</text>

        <!-- Right side: Truthy / Falsy reference table -->
        <rect x="490" y="20" width="195" height="300" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10"/>
        <text x="587" y="48" fill="var(--accent-primary)" font-size="13" font-weight="bold" text-anchor="middle">Truthy / Falsy Table</text>

        <text x="510" y="75" fill="#EF4444" font-size="11" font-weight="700">FALSY (Only 8 values):</text>
        <text x="510" y="95" fill="var(--text-secondary)" font-size="10">false, 0, -0, 0n</text>
        <text x="510" y="112" fill="var(--text-secondary)" font-size="10">"" (empty string)</text>
        <text x="510" y="129" fill="var(--text-secondary)" font-size="10">null, undefined, NaN</text>

        <line x1="510" y1="142" x2="665" y2="142" stroke="var(--border-default)" stroke-width="1"/>

        <text x="510" y="164" fill="#10B981" font-size="11" font-weight="700">TRUTHY (Everything else):</text>
        <text x="510" y="184" fill="var(--text-secondary)" font-size="10">true, 1, -1, 3.14</text>
        <text x="510" y="201" fill="var(--text-secondary)" font-size="10">"hello", "0", "false"</text>
        <text x="510" y="218" fill="var(--text-secondary)" font-size="10">[] (empty array!)</text>
        <text x="510" y="235" fill="var(--text-secondary)" font-size="10">{} (empty object!)</text>
        <text x="510" y="252" fill="var(--text-secondary)" font-size="10">function() {}</text>
        <text x="510" y="269" fill="var(--text-secondary)" font-size="10">Infinity, -Infinity</text>

        <text x="510" y="300" fill="var(--text-muted)" font-size="9" font-style="italic">Tip: if ([]) runs truthy branch!</text>

        <defs>
          <marker id="cf-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// ─── 1. CONDITIONALS: if / else if / else ───</span>
<span class="kw">function</span> <span class="fn">classify</span>(n) {
  <span class="kw">if</span> (n &lt; <span class="num">0</span>)       <span class="kw">return</span> <span class="str">"negative"</span>;  <span class="cm">// Checked 1st</span>
  <span class="kw">else if</span> (n === <span class="num">0</span>) <span class="kw">return</span> <span class="str">"zero"</span>;      <span class="cm">// Checked 2nd</span>
  <span class="kw">else</span>              <span class="kw">return</span> <span class="str">"positive"</span>;  <span class="cm">// Fallback</span>
}

<span class="cm">// ─── 2. TERNARY OPERATOR ───</span>
<span class="kw">const</span> status = age &gt;= <span class="num">18</span> ? <span class="str">"Adult"</span> : <span class="str">"Minor"</span>;

<span class="cm">// ─── 3. CONDITIONAL: switch (requires break or return!) ───</span>
<span class="kw">function</span> <span class="fn">dayName</span>(day) {
  <span class="kw">switch</span> (day) {
    <span class="kw">case</span> <span class="num">0</span>: <span class="kw">return</span> <span class="str">"Sunday"</span>;
    <span class="kw">case</span> <span class="num">1</span>: <span class="kw">return</span> <span class="str">"Monday"</span>;
    <span class="kw">case</span> <span class="num">2</span>: <span class="kw">return</span> <span class="str">"Tuesday"</span>;
    <span class="kw">default</span>: <span class="kw">return</span> <span class="str">"Unknown day"</span>;
  }
}

<span class="cm">// ─── 4. LOOPS: for, while, do...while ───</span>
<span class="cm">// Standard for loop — runs 3 times (i = 1, 2, 3)</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i &lt;= <span class="num">3</span>; i++) {
  <span class="fn">console.log</span>(i);  <span class="cm">// 1, 2, 3</span>
}

<span class="cm">// while loop — checks condition BEFORE each iteration</span>
<span class="kw">let</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">3</span>) {
  <span class="fn">console.log</span>(count);
  count++;
}

<span class="cm">// do...while — executes body ONCE first, THEN checks condition</span>
<span class="kw">let</span> x = <span class="num">10</span>;
<span class="kw">do</span> {
  <span class="fn">console.log</span>(x); <span class="cm">// Prints 10 once even though 10 &lt; 3 is false</span>
} <span class="kw">while</span> (x &lt; <span class="num">3</span>);

<span class="cm">// ─── 5. for...of (values) vs for...in (keys) ───</span>
<span class="kw">const</span> arr = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>];
<span class="kw">for</span> (<span class="kw">const</span> fruit <span class="kw">of</span> arr)  <span class="fn">console.log</span>(fruit);  <span class="cm">// "apple", "banana", "cherry" (values)</span>
<span class="kw">for</span> (<span class="kw">const</span> index <span class="kw">in</span> arr)  <span class="fn">console.log</span>(index);  <span class="cm">// "0", "1", "2" (string keys)</span>

<span class="cm">// ─── 6. break & continue ───</span>
<span class="kw">for</span> (<span class="kw">let</span> k = <span class="num">0</span>; k &lt; <span class="num">5</span>; k++) {
  <span class="kw">if</span> (k === <span class="num">2</span>) <span class="kw">continue</span>; <span class="cm">// skip iteration when k is 2</span>
  <span class="kw">if</span> (k === <span class="num">4</span>) <span class="kw">break</span>;    <span class="cm">// terminate loop completely at k = 4</span>
  <span class="fn">console.log</span>(k);         <span class="cm">// prints: 0, 1, 3</span>
}`,

  complexityNotes: [
    "if / else if / else: O(1) time — only the matching branch is executed.",
    "switch with n cases: O(1) time — engines optimize switch statements using jump tables.",
    "for / while loop with n iterations: O(n) time — linear iteration.",
    "Nested loops (loop inside a loop): O(n × m) time — if both loops run n times, total complexity is O(n²)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming empty arrays [] or objects {} are falsy",
      desc: "Empty arrays <code>[]</code> and objects <code>{}</code> are <strong>truthy</strong> in JavaScript! Only the 8 falsy values (<code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>) evaluate to false. <code>if ([])</code> will always execute its true branch."
    },
    {
      title: "Mistake 2: Using for...in on arrays expecting values",
      desc: "<code>for...in</code> iterates over <strong>object keys/indices as strings</strong> (<code>\"0\"</code>, <code>\"1\"</code>, ...), not the actual array values. Always use <code>for...of</code> for arrays."
    },
    {
      title: "Mistake 3: Forgetting break in switch cases",
      desc: "Without <code>break</code> (or <code>return</code>), execution 'falls through' into the next case statement, executing unintended code."
    },
    {
      title: "Mistake 4: Infinite loops due to missing counter updates",
      desc: "In <code>while</code> loops, forgetting to increment/update the loop counter (e.g. <code>i++</code>) results in an infinite loop that freezes the browser tab."
    },
    {
      title: "Mistake 5: Using loose equality == instead of strict === in conditions",
      desc: "The loose equality operator <code>==</code> applies unpredictable type coercion (e.g. <code>0 == \"\"</code> is <code>true</code>). Always use <code>===</code> for strict, type-safe comparison."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What does `if ([]) { console.log('A'); } else { console.log('B'); }` print?",
      options: ["A. A", "B. B", "C. TypeError", "D. undefined"],
      answer: "A",
      explanation: "An empty array `[]` is truthy in JavaScript! Only 8 specific values are falsy."
    },
    {
      question: "Q2. What is the difference between `for...of` and `for...in` on an array?",
      options: [
        "A. `for...of` gives string indices; `for...in` gives values",
        "B. `for...of` gives values; `for...in` gives string indices/keys",
        "C. They are identical",
        "D. `for...of` only works on objects"
      ],
      answer: "B",
      explanation: "`for...of` iterates over array values; `for...in` enumerates keys/indices as strings."
    },
    {
      question: "Q3. Which loop is guaranteed to execute its code body at least once?",
      options: ["A. for loop", "B. while loop", "C. do...while loop", "D. for...of loop"],
      answer: "C",
      explanation: "`do...while` executes its body first before evaluating the condition."
    },
    {
      question: "Q4. What does the `continue` keyword do inside a loop?",
      options: [
        "A. Exits the loop completely",
        "B. Restarts the whole loop from i = 0",
        "C. Skips the rest of the current iteration and moves to the next iteration",
        "D. Pauses execution for 1 second"
      ],
      answer: "C",
      explanation: "`continue` skips the rest of the current iteration and jumps to the update/condition check for the next iteration."
    }
  ],

  predictOutput: [
    {
      code: "let x = 0;\nif (x) {\n  console.log('Yes');\n} else {\n  console.log('No');\n}",
      options: ["Yes", "No", "0", "TypeError"],
      answer: "No",
      explanation: "0 is one of the 8 falsy values in JavaScript, so the else branch executes."
    },
    {
      code: "let sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  if (i === 2) continue;\n  sum += i;\n}\nconsole.log(sum);",
      options: ["6", "4", "3", "5"],
      answer: "4",
      explanation: "When i = 2, continue skips adding 2. So sum = 1 + 3 = 4."
    },
    {
      code: "const arr = [10, 20];\nfor (const k in arr) {\n  console.log(typeof k);\n}",
      options: ["number", "string", "object", "undefined"],
      answer: "string",
      explanation: "`for...in` enumerates array indices as string keys (\"0\", \"1\")."
    }
  ],

  practice: [
    {
      q: "Question 1: Explain why `0 == ''` is true, but `0 === ''` is false.",
      a: "`==` performs implicit type coercion, converting both `0` and `''` to numbers (0). `===` checks both value and type without coercion (number vs string), returning false."
    },
    {
      q: "Question 2: How do you prevent an infinite loop when writing a while loop?",
      a: "Ensure the loop variable is initialized before the loop, modified inside the loop body toward termination, and that the loop condition will eventually evaluate to false."
    },
    {
      q: "Question 3: When should you use a switch statement over multiple if...else if statements?",
      a: "Use `switch` when comparing a single variable against multiple discrete constant values (e.g. status codes, days of the week) for cleaner readability and potential jump-table optimizations."
    }
  ],

  challenge: {
    titleText: "Challenge: FizzBuzz with Control Flow",
    desc: "Write a <code>fizzBuzz(n)</code> function that prints numbers from 1 to <code>n</code>. For multiples of 3, print <code>\"Fizz\"</code>. For multiples of 5, print <code>\"Buzz\"</code>. For multiples of both 3 and 5, print <code>\"FizzBuzz\"</code>. Add a comment explaining why checking <code>n % 3 === 0 && n % 5 === 0</code> must come FIRST."
  }
};
