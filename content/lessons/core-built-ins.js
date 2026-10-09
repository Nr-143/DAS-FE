/**
 * DSA Tracker — Lesson Content: Core Built-ins
 * ──────────────────────────────────────────────
 * Standardized 12-stage beginner-friendly lesson for JavaScript built-ins.
 * Uses ONE SHARED SAMPLE ARRAY across all relevant Array, Math, Map, and Set demos:
 * const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

const coreBuiltInsContent = {
  id: "core-builtins",
  title: "Core Built-ins",
  levelTitle: "Level 1 — Foundations",
  summary: "Master JavaScript's essential built-in objects — Array, String, Math, JSON, Map, Set, and Number helpers — using a consistent shared dataset [8, 3, 7, 4, 2, 6, 1, 5].",
  interactiveWidget: "core-builtins-visualizer",

  definitions: [
    {
      term: "Shared Benchmark Dataset",
      def: "All array method demonstrations in this topic start from a fresh copy of <code>const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];</code> so you can directly compare how each method behaves."
    },
    {
      term: "Array Mutating vs Non-Mutating",
      def: "<strong>Mutating methods</strong> (<code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>) modify the working array in place. <strong>Non-mutating methods</strong> (<code>slice</code>, <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, <code>includes</code>) return a <em>new array or value</em>, leaving the original array untouched."
    },
    {
      term: "String Methods & Immutability",
      def: "Strings in JavaScript are immutable (read-only). Methods like <code>slice</code>, <code>split</code>, <code>trim</code>, <code>replace</code>, <code>toLowerCase</code>, and <code>toUpperCase</code> return new string values without modifying the original string."
    },
    {
      term: "Math Object",
      def: "A static built-in utility object for mathematical calculations, including <code>Math.min(...originalArray)</code>, <code>Math.max(...originalArray)</code>, <code>Math.floor</code>, <code>Math.ceil</code>, <code>Math.round</code>, <code>Math.trunc</code>, <code>Math.abs</code>, <code>Math.sqrt</code>, <code>Math.pow</code>, and <code>Math.random()</code>."
    },
    {
      term: "JSON (Serialization & Deserialization)",
      def: "<code>JSON.stringify()</code> converts JavaScript objects or arrays into JSON text; <code>JSON.parse()</code> parses JSON text back into JavaScript data structures."
    },
    {
      term: "Map & Set (Lookup & Deduplication)",
      def: "<code>Set</code> stores unique elements, allowing instant duplicate removal (e.g. <code>[...new Set(numbersWithDuplicates)]</code>). <code>Map</code> stores key-value pairs with arbitrary key types in $O(1)$ average time."
    },
    {
      term: "Number & Parsing Helpers",
      def: "Functions for parsing numbers and validating values: <code>parseInt()</code>, <code>parseFloat()</code>, <code>Number()</code>, and <code>Number.isNaN()</code>."
    }
  ],

  howItWorksTogether: "By using the shared sample array <code>[8, 3, 7, 4, 2, 6, 1, 5]</code> across every demonstration, you can see exactly how operations differ. <code>map()</code> transforms every element into <code>[16, 6, 14, 8, 4, 12, 2, 10]</code>, <code>filter()</code> extracts elements <code>> 4</code> to produce <code>[8, 7, 6, 5]</code>, <code>reduce()</code> sums all elements to <code>36</code>, <code>Math.min()</code> finds <code>1</code>, and <code>Math.max()</code> finds <code>8</code>. Each operation starts from <code>const workingArray = [...originalArray]</code> so your starting state is always consistent.",

  whyMatters: "Almost every Data Structure & Algorithm problem relies on these core built-ins. Knowing whether a method mutates in-place, what it returns, and its time complexity ($O(1)$ vs $O(n)$ vs $O(n \\log n)$) prevents bugs and helps you write optimal interview solutions.",

  bigPicture: {
    title: "Core Built-ins in DSA Problem Solving",
    familiesHeading: "Shared Dataset Benchmark: [8, 3, 7, 4, 2, 6, 1, 5]",
    linearText: "<strong>Array Transformation:</strong> <code>map()</code> doubles values, <code>filter()</code> selects subsets, <code>reduce()</code> accumulates sums, and <code>sort((a,b)=>a-b)</code> sorts elements into <code>[1, 2, 3, 4, 5, 6, 7, 8]</code>.",
    nonlinearText: "<strong>Hash Maps & Sets:</strong> Using a derived array with duplicates <code>[...originalArray, 3, 5, 3]</code>, <code>Set</code> instantly removes duplicates to restore unique items in $O(n)$ time.",
    categoriesHeading: "How Built-ins Map to Classic Patterns:",
    searchSortText: "<strong>Index Calculations:</strong> <code>Math.floor((low + high) / 2)</code> calculates array midpoints in Binary Search.",
    recursionText: "<strong>Divide & Conquer:</strong> <code>slice(0, mid)</code> and <code>slice(mid)</code> split arrays into subproblems for Merge Sort.",
    patternsText: "<strong>Frequency Counting:</strong> <code>Map</code> counts element frequencies in $O(n)$ time for Two Sum and Anagram problems.",
    closingText: "Mastering built-ins allows you to focus on high-level algorithmic logic rather than rewriting manual loops."
  },

  workedExample: {
    title: "Master Reference using Shared Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: "<strong>1. Shared Initial Array:</strong><br/><code>const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];</code><br/><br/><strong>2. Basic Operations (Fresh Copy Each Time):</strong><br/><code>let arr = [...originalArray];<br/>arr.length;        // 8<br/>arr.push(9);       // returns 9 (new length), arr becomes [8, 3, 7, 4, 2, 6, 1, 5, 9]<br/>arr.pop();        // returns 9, arr becomes [8, 3, 7, 4, 2, 6, 1, 5]<br/>arr.shift();      // returns 8, arr becomes [3, 7, 4, 2, 6, 1, 5]<br/>arr.unshift(99);  // returns 8 (new length), arr becomes [99, 3, 7, 4, 2, 6, 1, 5]</code><br/><br/><strong>3. Slice vs Splice:</strong><br/><code>// slice — NON-MUTATING (returns copy)<br/>originalArray.slice(1, 4); // [3, 7, 4] (originalArray is UNCHANGED)<br/><br/>// splice — MUTATING (modifies array in place)<br/>let work = [...originalArray];<br/>work.splice(2, 3); // removes 3 items at idx 2 -> returns [7, 4, 2], work is now [8, 3, 6, 1, 5]</code>",
    referenceText: "<strong>4. Transformation & Filtering (Shared Dataset):</strong><br/><code>originalArray.map(x => x * 2);           // [16, 6, 14, 8, 4, 12, 2, 10]<br/>originalArray.filter(x => x > 4);        // [8, 7, 6, 5]<br/>originalArray.reduce((acc, x) => acc + x, 0); // 36<br/>originalArray.find(x => x < 4);          // 3 (first matching item)<br/>originalArray.findIndex(x => x === 7);   // 2<br/>originalArray.includes(7);               // true<br/>originalArray.indexOf(6);                // 5<br/>originalArray.some(x => x > 7);          // true (8 is > 7)<br/>originalArray.every(x => x > 0);         // true (all are > 0)<br/>Array.isArray(originalArray);            // true</code><br/><br/><strong>5. Numeric Sorting:</strong><br/><code>[...originalArray].sort((a, b) => a - b); // [1, 2, 3, 4, 5, 6, 7, 8] (Ascending)<br/>[...originalArray].sort((a, b) => b - a); // [8, 7, 6, 5, 4, 3, 2, 1] (Descending)<br/>// WARNING: [8, 3, 7, 4, 2, 6, 1, 5].sort() without comparator sorts strings alphabetically!</code><br/><br/><strong>6. String Methods (Example Text):</strong><br/><code>const text = \"  Learn JavaScript with DSA  \";<br/>text.trim();            // \"Learn JavaScript with DSA\"<br/>text.toLowerCase();     // \"  learn javascript with dsa  \"<br/>text.split(\" \");        // [\"\", \"\", \"Learn\", \"JavaScript\", \"with\", \"DSA\", \"\", \"\"]<br/>text.includes(\"DSA\");   // true</code><br/><br/><strong>7. Math & JSON Utilities:</strong><br/><code>Math.min(...originalArray); // 1<br/>Math.max(...originalArray); // 8<br/>Math.floor(7.9);            // 7<br/>Math.ceil(7.1);             // 8<br/>Math.round(7.5);            // 8<br/>Math.trunc(7.9);            // 7<br/><br/>JSON.stringify(originalArray); // '[8,3,7,4,2,6,1,5]'<br/>JSON.parse('[8,3,7,4,2,6,1,5]'); // [8, 3, 7, 4, 2, 6, 1, 5]</code><br/><br/><strong>8. Set & Map Duplicate Removal:</strong><br/><code>const numbersWithDuplicates = [...originalArray, 3, 5, 3];<br/>const uniqueSet = new Set(numbersWithDuplicates);<br/>const cleanArray = [...uniqueSet]; // [8, 3, 7, 4, 2, 6, 1, 5] (duplicates removed)</code>"
  },

  visual: {
    caption: "Figure 1: Core Built-ins Classification — Mutating vs Non-Mutating Methods on [8, 3, 7, 4, 2, 6, 1, 5].",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="300" fill="var(--bg-body)" rx="12" />

        <!-- Left panel: MUTATING -->
        <g transform="translate(20, 15)">
          <rect width="310" height="270" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <rect x="0" y="0" width="310" height="40" fill="rgba(239,68,68,0.12)" stroke="#EF4444" stroke-width="2" rx="10" ry="10"/>
          <text x="155" y="27" fill="#EF4444" font-size="14" font-weight="bold" text-anchor="middle">MUTATES Working Array</text>

          <rect x="25" y="55" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="85" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.sort()</text>

          <rect x="165" y="55" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="225" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.splice()</text>

          <rect x="25" y="97" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="85" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.push()</text>

          <rect x="165" y="97" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="225" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.pop()</text>

          <rect x="25" y="139" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="85" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.shift()</text>

          <rect x="165" y="139" width="120" height="32" fill="rgba(239,68,68,0.06)" stroke="#EF4444" rx="6"/>
          <text x="225" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.unshift()</text>

          <text x="155" y="245" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">Modifies array in-place.</text>
        </g>

        <!-- Right panel: NON-MUTATING -->
        <g transform="translate(370, 15)">
          <rect width="310" height="270" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <rect x="0" y="0" width="310" height="40" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="2" rx="10" ry="10"/>
          <text x="155" y="27" fill="#10B981" font-size="14" font-weight="bold" text-anchor="middle">Returns NEW Copy / Value</text>

          <rect x="25" y="55" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="85" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.map()</text>

          <rect x="165" y="55" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="225" y="76" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.filter()</text>

          <rect x="25" y="97" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="85" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.slice()</text>

          <rect x="165" y="97" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="225" y="118" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.concat()</text>

          <rect x="25" y="139" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="85" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.reduce()</text>

          <rect x="165" y="139" width="120" height="32" fill="rgba(16,185,129,0.06)" stroke="#10B981" rx="6"/>
          <text x="225" y="160" fill="var(--text-primary)" font-size="12" font-weight="700" text-anchor="middle">.find()</text>

          <text x="155" y="245" fill="var(--text-muted)" font-size="10" font-style="italic" text-anchor="middle">Original array remains untouched.</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// ─── 1. SHARED SAMPLE DATASET ───</span>
<span class="kw">const</span> originalArray = [<span class="num">8</span>, <span class="num">3</span>, <span class="num">7</span>, <span class="num">4</span>, <span class="num">2</span>, <span class="num">6</span>, <span class="num">1</span>, <span class="num">5</span>];

<span class="cm">// ─── 2. TRANSFORMATIONS & FILTERING ───</span>
<span class="kw">const</span> doubled  = originalArray.<span class="fn">map</span>(x => x * <span class="num">2</span>);        <span class="cm">// [16, 6, 14, 8, 4, 12, 2, 10]</span>
<span class="kw">const</span> gt4      = originalArray.<span class="fn">filter</span>(x => x > <span class="num">4</span>);     <span class="cm">// [8, 7, 6, 5]</span>
<span class="kw">const</span> totalSum = originalArray.<span class="fn">reduce</span>((sum, x) => sum + x, <span class="num">0</span>); <span class="cm">// 36</span>

<span class="cm">// ─── 3. SEARCHING & CHECKING ───</span>
<span class="kw">const</span> firstSmall = originalArray.<span class="fn">find</span>(x => x < <span class="num">4</span>);     <span class="cm">// 3</span>
<span class="kw">const</span> idxOfSeven = originalArray.<span class="fn">findIndex</span>(x => x === <span class="num">7</span>); <span class="cm">// 2</span>
<span class="kw">const</span> hasSeven   = originalArray.<span class="fn">includes</span>(<span class="num">7</span>);          <span class="cm">// true</span>

<span class="cm">// ─── 4. NUMERIC SORTING ───</span>
<span class="kw">const</span> sortedAsc  = [...originalArray].<span class="fn">sort</span>((a, b) => a - b); <span class="cm">// [1, 2, 3, 4, 5, 6, 7, 8]</span>
<span class="kw">const</span> sortedDesc = [...originalArray].<span class="fn">sort</span>((a, b) => b - a); <span class="cm">// [8, 7, 6, 5, 4, 3, 2, 1]</span>

<span class="cm">// ─── 5. MATH & DEDUPLICATION ───</span>
<span class="kw">const</span> minVal = Math.<span class="fn">min</span>(...originalArray); <span class="cm">// 1</span>
<span class="kw">const</span> maxVal = Math.<span class="fn">max</span>(...originalArray); <span class="cm">// 8</span>

<span class="kw">const</span> numbersWithDuplicates = [...originalArray, <span class="num">3</span>, <span class="num">5</span>, <span class="num">3</span>];
<span class="kw">const</span> deduped = [...<span class="kw">new</span> <span class="fn">Set</span>(numbersWithDuplicates)]; <span class="cm">// [8, 3, 7, 4, 2, 6, 1, 5]</span>`,

  complexityNotes: [
    "map / filter / reduce / forEach / find / includes: O(n) time — single pass over the array.",
    "slice: O(k) time where k is slice length.",
    "splice / shift / unshift: O(n) time because remaining elements must be re-indexed in memory.",
    "sort: O(n log n) time — V8 engine uses TimSort.",
    "Set.has / Set.add / Map.get / Map.set: O(1) average time complexity."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing slice() vs splice()",
      desc: "<code>slice(start, end)</code> returns a <strong>new copy</strong> without altering the original array. <code>splice(start, deleteCount, ...items)</code> <strong>mutates the original array in place</strong> by removing or replacing items."
    },
    {
      title: "Mistake 2: Calling sort() on numbers without a comparator",
      desc: "Calling <code>[8, 3, 7, 4, 2, 6, 1, 5].sort()</code> converts elements to strings and compares alphabetically. Always pass a comparison function: <code>(a, b) => a - b</code> for numeric sorting."
    },
    {
      title: "Mistake 3: Expecting string methods to mutate the original string",
      desc: "Strings are immutable. Writing <code>str.trim()</code> or <code>str.toUpperCase()</code> returns a new string; it does not change <code>str</code> in place."
    },
    {
      title: "Mistake 4: Using JSON.stringify() to deep clone objects with functions or undefined",
      desc: "<code>JSON.stringify()</code> silently omits functions, <code>undefined</code> values, and <code>Symbol</code>s, and converts <code>Map</code> and <code>Set</code> objects into empty objects."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. Given originalArray = [8, 3, 7, 4, 2, 6, 1, 5], what does originalArray.filter(x => x > 4) return?",
      options: ["A. [8, 7, 6, 5]", "B. [8, 3, 7]", "C. [5, 6, 7, 8]", "D. [4, 5, 6, 7, 8]"],
      answer: "A",
      explanation: "filter() returns a new array with elements strictly greater than 4: [8, 7, 6, 5]."
    },
    {
      question: "Q2. What does originalArray.reduce((sum, x) => sum + x, 0) return for [8, 3, 7, 4, 2, 6, 1, 5]?",
      options: ["A. 36", "B. 32", "C. 40", "D. 8"],
      answer: "A",
      explanation: "The total sum of 8 + 3 + 7 + 4 + 2 + 6 + 1 + 5 is 36."
    },
    {
      question: "Q3. Which of these methods mutates the working array in place?",
      options: ["A. slice()", "B. splice()", "C. map()", "D. filter()"],
      answer: "B",
      explanation: "splice() mutates the original array in place; slice(), map(), and filter() return new copies."
    },
    {
      question: "Q4. How do you remove duplicate numbers from [...originalArray, 3, 5, 3] in one line?",
      options: [
        "A. [...new Set(numbersWithDuplicates)]",
        "B. numbersWithDuplicates.sort()",
        "C. numbersWithDuplicates.slice()",
        "D. JSON.stringify(numbersWithDuplicates)"
      ],
      answer: "A",
      explanation: "Passing the array to new Set() filters duplicates in O(n) time, and spreading [...Set] converts it back to an array."
    }
  ],

  predictOutput: [
    {
      code: "const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];\nconst res = originalArray.slice(1, 4);\nconsole.log(res);",
      options: ["[3, 7, 4]", "[8, 3, 7]", "[3, 7, 4, 2]", "[7, 4, 2]"],
      answer: "[3, 7, 4]",
      explanation: "slice(1, 4) extracts elements from index 1 up to (but excluding) index 4: [3, 7, 4]."
    },
    {
      code: "const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];\nconsole.log(Math.min(...originalArray));",
      options: ["1", "8", "0", "NaN"],
      answer: "1",
      explanation: "Math.min spreads the array elements and returns the smallest value, which is 1."
    },
    {
      code: "const str = '  Learn DSA  ';\nstr.trim();\nconsole.log(str.length);",
      options: ["13", "9", "11", "0"],
      answer: "13",
      explanation: "Strings are immutable. str.trim() returns a new trimmed string, but str itself remains 13 characters long."
    }
  ],

  practice: [
    {
      q: "Question 1: Explain why every demonstration for Core Built-ins starts with const workingArray = [...originalArray].",
      a: "Starting each demo with a fresh shallow copy `[...originalArray]` guarantees that running a mutating method (like `splice` or `sort`) never alters the starting state for other method demonstrations."
    },
    {
      q: "Question 2: What is the difference between Math.floor(), Math.ceil(), and Math.trunc()?",
      a: "`Math.floor()` rounds down toward negative infinity; `Math.ceil()` rounds up toward positive infinity; `Math.trunc()` truncates the decimal portion completely."
    },
    {
      q: "Question 3: Why is Map preferred over plain Objects for frequency counting in DSA?",
      a: "`Map` supports keys of any type, maintains insertion order, provides an $O(1)$ size property (`map.size`), and avoids prototype inheritance clashes."
    }
  ],

  challenge: {
    titleText: "Challenge: Core Built-ins Pipeline",
    desc: "Starting with <code>const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];</code>, chain array built-ins (<code>filter</code>, <code>map</code>, <code>reduce</code> — no manual loops) to: 1) filter numbers <code>> 3</code>, 2) double each number, and 3) compute the final sum. The result should be <code>60</code>."
  }
};

window.LESSONS_CONTENT["core-builtins"] = coreBuiltInsContent;
window.LESSONS_CONTENT["core-built-ins"] = coreBuiltInsContent;
