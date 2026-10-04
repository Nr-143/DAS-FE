/**
 * DSA Tracker — Lesson Content: Control Flow
 * ────────────────────────────────────────────
 * Independent content module adhering to Schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["control-flow"] = {
  id: "control-flow",
  title: "Control Flow",
  levelTitle: "Level 1 — Foundations",
  summary: "Master conditionals, loops, truthy/falsy coercion, short-circuit evaluation, and execution branching in JavaScript.",

  definitions: [
    {
      term: "Control Flow",
      def: "The order in which a program's individual statements and instructions are actually executed; normally top-to-bottom, but conditionals and loops let a program branch or repeat instead of always running straight through."
    },
    {
      term: "Conditional Statement",
      def: "A statement that runs different code depending on whether a condition is true or false (<code>if</code> / <code>else if</code> / <code>else</code>, and <code>switch</code>)."
    },
    {
      term: "Loop (Iteration)",
      def: "A control structure that repeats a block of code while a condition holds (<code>for</code>, <code>while</code>, <code>do...while</code>, <code>for...of</code>, <code>for...in</code>)."
    },
    {
      term: "Truthy / Falsy",
      def: "In a conditional context, JavaScript converts any value to <code>true</code> or <code>false</code>. The <strong>only</strong> falsy values are: <code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code> (empty string), <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Every other value — including <code>[]</code> (empty array) and <code>{}</code> (empty object) — is truthy (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"primitives\">Primitives</a> lesson for how each primitive type coerces)."
    },
    {
      term: "Short-Circuit Evaluation",
      def: "The behavior of <code>&&</code> and <code>||</code>: with <code>&&</code>, if the first operand is falsy, the second is never evaluated (the whole expression is already known to be falsy); with <code>||</code>, if the first operand is truthy, the second is never evaluated."
    }
  ],

  howItWorksTogether: "Control flow is how a program decides what to do next instead of just running every line in order. Conditionals (<code>if</code>/<code>switch</code>) pick a branch to run based on whether a value is truthy or falsy — and JavaScript's truthy/falsy rules matter here because <code>if (someValue)</code> doesn't check 'is this <code>true</code>', it checks 'does this coerce to <code>true</code>'. Loops repeat a block while a condition stays truthy. Short-circuit evaluation is control flow too, just more compact — <code>condition && doSomething()</code> only calls <code>doSomething()</code> if <code>condition</code> is truthy, which is why it's often used as a shorthand for a simple <code>if</code>.",

  whyItMatters: "Every algorithm — from simple array searches to complex graph traversals — relies on control flow to decide what happens next. Mastering branching and looping is the prerequisite for understanding every data structure operation and algorithmic pattern that follows.",

  workedExample: {
    title: "Conditionals, Loops, and Short-Circuit Execution Traces",
    primitiveText: "<strong>1. Conditional Branching — if / else if / else:</strong><br/><code>function classify(n) {<br/>  if (n &lt; 0) return \"negative\";<br/>  else if (n === 0) return \"zero\";<br/>  else return \"positive\";<br/>}<br/><br/>classify(-5);  // \"negative\" — first branch taken<br/>classify(0);   // \"zero\"     — second branch taken<br/>classify(42);  // \"positive\" — else branch taken</code><br/><br/><strong>2. Switch Statement (needs <code>break</code>, or falls through):</strong><br/><code>function dayName(day) {<br/>  switch (day) {<br/>    case 0: return \"Sunday\";<br/>    case 1: return \"Monday\";<br/>    case 2: return \"Tuesday\";<br/>    default: return \"Unknown day\";<br/>  }<br/>}<br/><br/>dayName(0);  // \"Sunday\"<br/>dayName(5);  // \"Unknown day\"</code>",
    referenceText: "<strong>3. for...of vs for...in on arrays:</strong><br/><code>const arr = [10, 20, 30];<br/><br/>for (const value of arr) console.log(value);<br/>// Output: 10, 20, 30 — actual values<br/><br/>for (const index in arr) console.log(index);<br/>// Output: \"0\", \"1\", \"2\" — keys as strings, NOT values</code><br/><br/><em>Tip:</em> Use <code>for...of</code> for array values. <code>for...in</code> is designed for iterating over <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Object</a> keys — using it on arrays gives you string indices, which is almost never what you want.<br/><br/><strong>4. Short-Circuit Evaluation:</strong><br/><code>const user = null;<br/>const name = user && user.name;<br/>// user is null (falsy) → && short-circuits<br/>// user.name is NEVER evaluated → no TypeError<br/>// name === null</code>"
  },

  visual: {
    caption: "Figure 1: Execution flow chart — how the JavaScript engine branches through an if / else if / else conditional, evaluating each condition in order until one is truthy.",
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

        <text x="510" y="75" fill="#EF4444" font-size="11" font-weight="700">FALSY (8 values only):</text>
        <text x="510" y="95" fill="var(--text-secondary)" font-size="10">false, 0, -0, 0n</text>
        <text x="510" y="112" fill="var(--text-secondary)" font-size="10">"" (empty string)</text>
        <text x="510" y="129" fill="var(--text-secondary)" font-size="10">null, undefined, NaN</text>

        <line x1="510" y1="142" x2="665" y2="142" stroke="var(--border-default)" stroke-width="1"/>

        <text x="510" y="164" fill="#10B981" font-size="11" font-weight="700">TRUTHY (everything else):</text>
        <text x="510" y="184" fill="var(--text-secondary)" font-size="10">true, 1, -1, 3.14</text>
        <text x="510" y="201" fill="var(--text-secondary)" font-size="10">"hello", "0", "false"</text>
        <text x="510" y="218" fill="var(--text-secondary)" font-size="10">[] (empty array!)</text>
        <text x="510" y="235" fill="var(--text-secondary)" font-size="10">{} (empty object!)</text>
        <text x="510" y="252" fill="var(--text-secondary)" font-size="10">function() {}</text>
        <text x="510" y="269" fill="var(--text-secondary)" font-size="10">Infinity, -Infinity</text>

        <text x="510" y="300" fill="var(--text-muted)" font-size="9" font-style="italic">Tip: if ([]) runs the truthy branch!</text>

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
  <span class="kw">if</span> (n &lt; <span class="num">0</span>)       <span class="kw">return</span> <span class="str">"negative"</span>;  <span class="cm">// Branch A</span>
  <span class="kw">else if</span> (n === <span class="num">0</span>) <span class="kw">return</span> <span class="str">"zero"</span>;      <span class="cm">// Branch B</span>
  <span class="kw">else</span>              <span class="kw">return</span> <span class="str">"positive"</span>;  <span class="cm">// Branch C (default)</span>
}

<span class="cm">// ─── 2. CONDITIONAL: switch (needs break or return!) ───</span>
<span class="kw">function</span> <span class="fn">dayName</span>(day) {
  <span class="kw">switch</span> (day) {
    <span class="kw">case</span> <span class="num">0</span>: <span class="kw">return</span> <span class="str">"Sunday"</span>;
    <span class="kw">case</span> <span class="num">1</span>: <span class="kw">return</span> <span class="str">"Monday"</span>;
    <span class="kw">case</span> <span class="num">2</span>: <span class="kw">return</span> <span class="str">"Tuesday"</span>;
    <span class="kw">case</span> <span class="num">3</span>: <span class="kw">return</span> <span class="str">"Wednesday"</span>;
    <span class="kw">case</span> <span class="num">4</span>: <span class="kw">return</span> <span class="str">"Thursday"</span>;
    <span class="kw">case</span> <span class="num">5</span>: <span class="kw">return</span> <span class="str">"Friday"</span>;
    <span class="kw">case</span> <span class="num">6</span>: <span class="kw">return</span> <span class="str">"Saturday"</span>;
    <span class="kw">default</span>: <span class="kw">return</span> <span class="str">"Unknown day"</span>;
  }
}

<span class="cm">// ─── 3. LOOPS: for / while / do...while ───</span>

<span class="cm">// Standard for loop — runs 3 times (i = 0, 1, 2)</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; <span class="num">3</span>; i++) {
  <span class="fn">console.log</span>(i);  <span class="cm">// 0, 1, 2</span>
}

<span class="cm">// while — checks condition BEFORE each iteration</span>
<span class="kw">let</span> i = <span class="num">0</span>;
<span class="kw">while</span> (i &lt; <span class="num">3</span>) {
  <span class="fn">console.log</span>(i);  <span class="cm">// 0, 1, 2</span>
  i++;
}

<span class="cm">// do...while — runs body ONCE first, THEN checks condition</span>
<span class="kw">let</span> j = <span class="num">10</span>;
<span class="kw">do</span> {
  <span class="fn">console.log</span>(j);  <span class="cm">// 10 (runs once even though 10 &lt; 3 is false)</span>
  j++;
} <span class="kw">while</span> (j &lt; <span class="num">3</span>);

<span class="cm">// ─── 4. LOOPS: for...of (values) vs for...in (keys) ───</span>
<span class="kw">const</span> arr = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];

<span class="kw">for</span> (<span class="kw">const</span> value <span class="kw">of</span> arr)  <span class="fn">console.log</span>(value);   <span class="cm">// 10, 20, 30 (values!)</span>
<span class="kw">for</span> (<span class="kw">const</span> index <span class="kw">in</span> arr)  <span class="fn">console.log</span>(index);   <span class="cm">// "0", "1", "2" (string keys!)</span>

<span class="cm">// ─── 5. break & continue ───</span>
<span class="kw">for</span> (<span class="kw">let</span> k = <span class="num">0</span>; k &lt; <span class="num">5</span>; k++) {
  <span class="kw">if</span> (k === <span class="num">2</span>) <span class="kw">continue</span>;  <span class="cm">// skip iteration when k is 2</span>
  <span class="kw">if</span> (k === <span class="num">4</span>) <span class="kw">break</span>;     <span class="cm">// stop loop entirely at k = 4</span>
  <span class="fn">console.log</span>(k);          <span class="cm">// prints: 0, 1, 3</span>
}

<span class="cm">// ─── 6. SHORT-CIRCUIT EVALUATION ───</span>
<span class="kw">const</span> user = <span class="kw">null</span>;
<span class="kw">const</span> name = user && user.name;
<span class="cm">// user is null (falsy) → && short-circuits immediately</span>
<span class="cm">// user.name is NEVER evaluated → no TypeError!</span>
<span class="cm">// name === null</span>

<span class="kw">const</span> fallback = <span class="str">""</span> || <span class="str">"default"</span>;
<span class="cm">// "" is falsy → || evaluates right operand</span>
<span class="cm">// fallback === "default"</span>`,

  complexityNotes: [
    "Single if/else if/else: O(1) time — only one branch is evaluated.",
    "switch with n cases: O(1) time — JS engines often optimize with jump tables.",
    "for/while loop running n iterations: O(n) time.",
    "Nested loops (loop inside loop): O(n × m) time — commonly O(n²) when m = n."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming [] or {} are falsy",
      desc: "Empty arrays <code>[]</code> and empty objects <code>{}</code> are <strong>truthy</strong>. Only the 8 specific falsy values (<code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>) are falsy. <code>if ([])</code> always runs the truthy branch."
    },
    {
      title: "Mistake 2: Using for...in on arrays expecting values",
      desc: "<code>for...in</code> gives you the <strong>keys/indices as strings</strong> (<code>\"0\"</code>, <code>\"1\"</code>, ...), not the values. Use <code>for...of</code> when you want the actual array values. <code>for...in</code> is designed for iterating over <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Object</a> keys."
    },
    {
      title: "Mistake 3: Forgetting break in switch",
      desc: "Without <code>break</code> (or <code>return</code>), execution 'falls through' into the next <code>case</code> block — running code you didn't intend. Always include <code>break</code> unless intentional fall-through is explicitly desired."
    },
    {
      title: "Mistake 4: Using == instead of === in conditions",
      desc: "The loose equality operator <code>==</code> applies type coercion before comparing, which can produce surprising truthy/falsy results (e.g. <code>0 == \"\"</code> is <code>true</code>, <code>null == undefined</code> is <code>true</code>). Always prefer <code>===</code> for strict type-safe comparisons."
    }
  ],

  practice: [
    {
      q: "Question 1: What does `if ([]) { console.log(\"truthy\"); } else { console.log(\"falsy\"); }` print, and why?",
      a: "It prints \"truthy\". An empty array `[]` is NOT one of the 8 falsy values — it is an object, and all objects are truthy in JavaScript, even when empty."
    },
    {
      q: "Question 2: What's the difference between what `for...of` and `for...in` give you when looping over an array?",
      a: "`for...of` gives you the actual values (e.g. 10, 20, 30). `for...in` gives you the keys/indices as strings (e.g. \"0\", \"1\", \"2\"). `for...in` is designed for object property enumeration, not array iteration."
    },
    {
      q: "Question 3: What happens if a `case` in a `switch` statement is missing its `break`?",
      a: "Execution 'falls through' — it continues running the code in the next `case` block(s) below it until it hits a `break`, a `return`, or the end of the switch. This is almost always a bug unless intentional fall-through is explicitly desired and commented."
    }
  ],

  challenge: {
    titleText: "Challenge: FizzBuzz with Control Flow",
    desc: "Write a <code>fizzBuzz()</code> function that prints numbers from 1 to 20, but for multiples of 3 print <code>\"Fizz\"</code>, for multiples of 5 print <code>\"Buzz\"</code>, and for multiples of both 3 and 5 print <code>\"FizzBuzz\"</code>. Use a <code>for</code> loop plus <code>if / else if / else</code> branching. Add a comment explaining why the 'both' check (<code>n % 3 === 0 && n % 5 === 0</code>) must come <strong>first</strong> — hint: if you check <code>n % 3</code> first, multiples of 15 would match that branch and never reach the combined check."
  }
};
