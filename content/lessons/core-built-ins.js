/**
 * DSA Tracker — Lesson Content: Core Built-ins
 * ──────────────────────────────────────────────
 * Independent content module adhering to Schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["core-builtins"] = {
  id: "core-builtins",
  title: "Core Built-ins",
  levelTitle: "Level 1 — Foundations",
  summary: "Master JavaScript's essential built-in objects and methods — Array, String, Math, JSON, Map, and Set — so you never reinvent common operations by hand.",

  definitions: [
    {
      term: "Built-in Object",
      def: "An object provided by the JavaScript language itself, ready to use without defining it yourself (e.g. <code>Math</code>, <code>JSON</code>, <code>Array</code>, <code>String</code>, <code>Map</code>, <code>Set</code>)."
    },
    {
      term: "Array Methods",
      def: "Built-in functions on arrays for iterating, transforming, and searching without writing manual loops (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>find</code>, <code>includes</code>, <code>sort</code>, <code>slice</code>, <code>splice</code>, <code>indexOf</code>, and more)."
    },
    {
      term: "String Methods",
      def: "Built-in functions on strings for reading and reshaping text (<code>slice</code>, <code>split</code>, <code>includes</code>, <code>indexOf</code>, <code>toUpperCase</code>/<code>toLowerCase</code>, <code>trim</code>, <code>replace</code>, and more)."
    },
    {
      term: "Math Object",
      def: "A built-in object providing mathematical constants and functions (<code>Math.max</code>, <code>Math.min</code>, <code>Math.floor</code>, <code>Math.random</code>, <code>Math.abs</code>, <code>Math.pow</code>, <code>Math.sqrt</code>)."
    },
    {
      term: "JSON",
      def: "A built-in object for converting between JavaScript values and JSON text: <code>JSON.stringify()</code> turns a value into a JSON string, <code>JSON.parse()</code> turns a JSON string back into a JavaScript value."
    },
    {
      term: "Map",
      def: "A built-in key-value collection where keys can be <em>any</em> type (unlike plain <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Objects</a>, which coerce keys to strings), and insertion order is preserved."
    },
    {
      term: "Set",
      def: "A built-in collection that only stores unique values — adding a duplicate value has no effect."
    }
  ],

  howItWorksTogether: "These built-ins exist so you don't have to reinvent common operations by hand every time. Array and String methods cover most everyday data transformations — filtering, mapping, searching — without writing manual loops. <code>Math</code> covers common numeric operations. <code>JSON</code> is how data gets converted to and from text, which matters constantly when working with APIs or storage. <code>Map</code> and <code>Set</code> are specialized collections: <code>Map</code> when you need arbitrary keys (not just strings) with insertion order preserved, <code>Set</code> when you specifically need to guarantee uniqueness. You'll rely on these constantly once you get into real data structure and algorithm problems — for example, <code>Set</code> is the simplest way to check for duplicates in an array, and <code>Map</code> is closely related to how a Hash Table (an upcoming topic in Level 4) actually works under the hood.",

  whyItMatters: "Almost every algorithm and data-structure operation you'll encounter uses these built-ins. Knowing which method mutates vs returns a new value, and what time complexity each one has, prevents bugs and helps you write concise, efficient solutions.",

  workedExample: {
    title: "Array, String, Math, JSON, Map & Set in Action",
    primitiveText: "<strong>1. Array Methods — Transform, Filter, Accumulate:</strong><br/><code>const nums = [5, 3, 8, 1];<br/><br/>nums.map(n =&gt; n * 2);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [10, 6, 16, 2] — NEW array<br/>nums.filter(n =&gt; n &gt; 3);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [5, 8] — NEW array<br/>nums.reduce((sum, n) =&gt; sum + n, 0); // 17 — single value<br/>nums.find(n =&gt; n &gt; 4);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 5 — first match<br/>nums.includes(3);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// true<br/><br/>nums.sort((a, b) =&gt; a - b);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [1, 3, 5, 8]<br/>// WARNING: sort() MUTATES the original array!</code><br/><br/><strong>2. String Methods:</strong><br/><code>\"Hello World\".toLowerCase();&nbsp;&nbsp;// \"hello world\"<br/>\"&nbsp; trim me &nbsp;\".trim();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// \"trim me\"<br/>\"a,b,c\".split(\",\");&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [\"a\", \"b\", \"c\"]<br/>\"hello\".slice(1, 3);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// \"el\"</code>",
    referenceText: "<strong>3. Math Object:</strong><br/><code>Math.max(1, 5, 3);&nbsp;&nbsp;// 5<br/>Math.floor(4.7);&nbsp;&nbsp;&nbsp;&nbsp;// 4<br/>Math.random();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// random number, 0 &lt;= x &lt; 1</code><br/><br/><strong>4. JSON — Serialize &amp; Deserialize:</strong><br/><code>JSON.stringify({ a: 1 });&nbsp;&nbsp;// '{\"a\":1}'<br/>JSON.parse('{\"a\":1}');&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// { a: 1 }</code><br/><br/><strong>5. Map &amp; Set:</strong><br/><code>const unique = new Set([1, 2, 2, 3]);<br/>// Set(3) {1, 2, 3} — duplicates removed<br/><br/>const scores = new Map();<br/>scores.set(\"alex\", 90);<br/>scores.get(\"alex\"); // 90<br/>scores.has(\"alex\"); // true</code><br/><br/><em>Note:</em> <code>Map</code> keys can be any type (objects, functions, numbers), unlike plain <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"objects\">Objects</a> which coerce all keys to strings."
  },

  visual: {
    caption: "Figure 1: Array methods at a glance — which ones mutate the original array vs which ones return a new array and leave the original untouched.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="300" fill="var(--bg-body)" rx="12" />

        <!-- Left panel: MUTATING -->
        <g transform="translate(20, 15)">
          <rect width="310" height="270" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <rect x="0" y="0" width="310" height="40" fill="rgba(239,68,68,0.12)" stroke="#EF4444" stroke-width="2" rx="10" ry="10"/>
          <text x="155" y="27" fill="#EF4444" font-size="14" font-weight="bold" text-anchor="middle">MUTATES Original Array</text>

          <rect x="25" y="55" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="85" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.sort()</text>

          <rect x="165" y="55" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="225" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.splice()</text>

          <rect x="25" y="97" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="85" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.reverse()</text>

          <rect x="165" y="97" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="225" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.push()</text>

          <rect x="25" y="139" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="85" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.pop()</text>

          <rect x="165" y="139" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="225" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.shift()</text>

          <rect x="25" y="181" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="85" y="202" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.unshift()</text>

          <rect x="165" y="181" width="120" height="32" fill="rgba(239,68,68,0.08)" stroke="#EF4444" rx="6"/>
          <text x="225" y="202" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.fill()</text>

          <text x="155" y="245" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">Changes the array in place.</text>
          <text x="155" y="260" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">The original variable is modified!</text>
        </g>

        <!-- Right panel: NON-MUTATING -->
        <g transform="translate(370, 15)">
          <rect width="310" height="270" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <rect x="0" y="0" width="310" height="40" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="2" rx="10" ry="10"/>
          <text x="155" y="27" fill="#10B981" font-size="14" font-weight="bold" text-anchor="middle">Returns NEW Array (Safe)</text>

          <rect x="25" y="55" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="85" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.map()</text>

          <rect x="165" y="55" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="225" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.filter()</text>

          <rect x="25" y="97" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="85" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.slice()</text>

          <rect x="165" y="97" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="225" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.concat()</text>

          <rect x="25" y="139" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="85" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.flat()</text>

          <rect x="165" y="139" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="225" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.flatMap()</text>

          <rect x="25" y="181" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="85" y="202" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.toSorted()</text>

          <rect x="165" y="181" width="120" height="32" fill="rgba(16,185,129,0.08)" stroke="#10B981" rx="6"/>
          <text x="225" y="202" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.toReversed()</text>

          <text x="155" y="245" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">Original array stays unchanged.</text>
          <text x="155" y="260" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">Returns a brand-new copy.</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// ─── 1. ARRAY METHODS: Transform, Filter, Accumulate ───</span>
<span class="kw">const</span> nums = [<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>];

<span class="cm">// map — creates a NEW array by transforming each element</span>
nums.<span class="fn">map</span>(n =&gt; n * <span class="num">2</span>);             <span class="cm">// [10, 6, 16, 2]</span>

<span class="cm">// filter — creates a NEW array with elements that pass a test</span>
nums.<span class="fn">filter</span>(n =&gt; n &gt; <span class="num">3</span>);          <span class="cm">// [5, 8]</span>

<span class="cm">// reduce — boils array down to a SINGLE accumulated value</span>
nums.<span class="fn">reduce</span>((sum, n) =&gt; sum + n, <span class="num">0</span>); <span class="cm">// 17</span>

<span class="cm">// find — returns the FIRST element that matches</span>
nums.<span class="fn">find</span>(n =&gt; n &gt; <span class="num">4</span>);            <span class="cm">// 5</span>

<span class="cm">// includes — returns true/false if value exists</span>
nums.<span class="fn">includes</span>(<span class="num">3</span>);                 <span class="cm">// true</span>

<span class="cm">// sort — MUTATES! Needs a compare function for numbers!</span>
nums.<span class="fn">sort</span>((a, b) =&gt; a - b);       <span class="cm">// [1, 3, 5, 8]</span>
<span class="cm">// Without compare: [10, 1, 2].sort() → [1, 10, 2] (alphabetic!)</span>

<span class="cm">// ─── 2. STRING METHODS ───</span>
<span class="str">"Hello World"</span>.<span class="fn">toLowerCase</span>();      <span class="cm">// "hello world"</span>
<span class="str">"  trim me  "</span>.<span class="fn">trim</span>();             <span class="cm">// "trim me"</span>
<span class="str">"a,b,c"</span>.<span class="fn">split</span>(<span class="str">","</span>);               <span class="cm">// ["a", "b", "c"]</span>
<span class="str">"hello"</span>.<span class="fn">slice</span>(<span class="num">1</span>, <span class="num">3</span>);             <span class="cm">// "el"</span>
<span class="str">"hello"</span>.<span class="fn">includes</span>(<span class="str">"ell"</span>);         <span class="cm">// true</span>
<span class="str">"hello"</span>.<span class="fn">indexOf</span>(<span class="str">"l"</span>);            <span class="cm">// 2 (first occurrence index)</span>

<span class="cm">// ─── 3. MATH OBJECT ───</span>
Math.<span class="fn">max</span>(<span class="num">1</span>, <span class="num">5</span>, <span class="num">3</span>);    <span class="cm">// 5</span>
Math.<span class="fn">min</span>(<span class="num">1</span>, <span class="num">5</span>, <span class="num">3</span>);    <span class="cm">// 1</span>
Math.<span class="fn">floor</span>(<span class="num">4.7</span>);      <span class="cm">// 4 — rounds DOWN</span>
Math.<span class="fn">ceil</span>(<span class="num">4.1</span>);       <span class="cm">// 5 — rounds UP</span>
Math.<span class="fn">abs</span>(-<span class="num">7</span>);         <span class="cm">// 7 — absolute value</span>
Math.<span class="fn">random</span>();        <span class="cm">// random float, 0 &lt;= x &lt; 1</span>

<span class="cm">// ─── 4. JSON: Serialize & Deserialize ───</span>
<span class="kw">const</span> obj = { a: <span class="num">1</span>, b: <span class="str">"hi"</span> };
<span class="kw">const</span> jsonStr = JSON.<span class="fn">stringify</span>(obj);  <span class="cm">// '{"a":1,"b":"hi"}'</span>
<span class="kw">const</span> parsed  = JSON.<span class="fn">parse</span>(jsonStr);  <span class="cm">// { a: 1, b: "hi" }</span>

<span class="cm">// ─── 5. MAP: Any-Type Keys, Ordered ───</span>
<span class="kw">const</span> scores = <span class="kw">new</span> <span class="fn">Map</span>();
scores.<span class="fn">set</span>(<span class="str">"alex"</span>, <span class="num">90</span>);
scores.<span class="fn">set</span>(<span class="str">"jordan"</span>, <span class="num">85</span>);
scores.<span class="fn">get</span>(<span class="str">"alex"</span>);     <span class="cm">// 90</span>
scores.<span class="fn">has</span>(<span class="str">"jordan"</span>);   <span class="cm">// true</span>
scores.size;              <span class="cm">// 2</span>

<span class="cm">// ─── 6. SET: Unique Values Only ───</span>
<span class="kw">const</span> unique = <span class="kw">new</span> <span class="fn">Set</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">3</span>]);
<span class="cm">// Set(3) {1, 2, 3} — duplicates auto-removed</span>
unique.<span class="fn">add</span>(<span class="num">4</span>);      <span class="cm">// Set(4) {1, 2, 3, 4}</span>
unique.<span class="fn">has</span>(<span class="num">2</span>);      <span class="cm">// true</span>
unique.size;         <span class="cm">// 4</span>

<span class="cm">// Quick trick: remove duplicates from any array</span>
<span class="kw">const</span> deduped = [...<span class="kw">new</span> <span class="fn">Set</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>])]; <span class="cm">// [1, 2, 3]</span>`,

  complexityNotes: [
    "map / filter / forEach / find: O(n) — iterates every element once.",
    "reduce: O(n) — single pass through the array (callback complexity may add more).",
    "includes / indexOf: O(n) — linear scan (worst case: element at end or not found).",
    "sort: O(n log n) — V8 uses TimSort internally.",
    "Set.has / Map.get / Map.has: O(1) average — hash-based lookup.",
    "JSON.stringify / JSON.parse: O(n) — must visit every key-value pair."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: sort() without a compare function for numbers",
      desc: "Without a compare function, <code>sort()</code> converts elements to strings and sorts alphabetically, so <code>[10, 1, 2].sort()</code> gives <code>[1, 10, 2]</code>, not <code>[1, 2, 10]</code>. Always pass a compare function like <code>(a, b) =&gt; a - b</code> for numeric sorting."
    },
    {
      title: "Mistake 2: Confusing mutating vs non-mutating methods",
      desc: "Methods that <strong>mutate</strong> the original array: <code>sort</code>, <code>splice</code>, <code>reverse</code>, <code>push</code>/<code>pop</code>/<code>shift</code>/<code>unshift</code>. Methods that <strong>return a new array</strong> and leave the original untouched: <code>map</code>, <code>filter</code>, <code>slice</code>, <code>concat</code>. Mixing these up causes subtle bugs when you didn't intend to modify the original."
    },
    {
      title: "Mistake 3: Using JSON deep clone on complex objects",
      desc: "Using <code>JSON.parse(JSON.stringify(obj))</code> as a general 'deep clone' works for plain, simple data, but silently drops <code>functions</code>, <code>undefined</code> values, and <code>Symbol</code>s, breaks on circular references, and converts special types like <code>Date</code> into plain strings (losing their <code>Date</code> behavior) and <code>Map</code>/<code>Set</code> into <code>{}</code>."
    }
  ],

  practice: [
    {
      q: "Question 1: What does `[10, 1, 2].sort()` output with no compare function, and why?",
      a: "It outputs `[1, 10, 2]`. Without a compare function, `sort()` converts elements to strings first, then sorts alphabetically. The string \"10\" comes before \"2\" because \"1\" < \"2\" in character code order."
    },
    {
      q: "Question 2: Which of these mutate the original array: `map`, `sort`, `filter`, `splice`, `slice`?",
      a: "Only `sort` and `splice` mutate the original array. `map`, `filter`, and `slice` all return new arrays and leave the original untouched."
    },
    {
      q: "Question 3: Name one real limitation of using `JSON.parse(JSON.stringify(x))` to clone an object.",
      a: "It silently drops functions, `undefined` values, and Symbols. It also breaks on circular references (throws an error), and converts Dates into plain strings, losing their Date prototype methods. Map and Set become empty objects `{}`."
    }
  ],

  challenge: {
    titleText: "Challenge: Array Built-ins Pipeline",
    desc: "Given an array of student objects (e.g. <code>[{ name: \"A\", score: 80 }, { name: \"B\", score: 45 }, { name: \"C\", score: 92 }]</code>), use only array built-ins (<code>filter</code>, <code>map</code>, <code>reduce</code> — no manual <code>for</code> loop) to: 1) filter students who scored above 50, 2) extract their scores with <code>map</code>, and 3) compute the average passing score with <code>reduce</code>. Chain all three calls into a single expression."
  }
};
