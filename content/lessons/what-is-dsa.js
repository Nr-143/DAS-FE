/**
 * DSA Tracker — Lesson Content: What is DSA?
 * ──────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["what-is-dsa"] = {
  id: "what-is-dsa",
  title: "What is DSA?",
  levelTitle: "Level 1 — Foundations",
  summary: "Understand what Data Structures and Algorithms are, how they work together, and why picking the right combination matters.",

  definitions: [
    {
      term: "Data Structure",
      def: "A way of organizing and storing data so it can be accessed and changed efficiently (e.g. array, linked list, stack, queue, tree, graph, hash map). Plain-language analogy: think of it like choosing the right container — a shelf, a filing cabinet, a queue at a counter — for the type of stuff you're storing."
    },
    {
      term: "Algorithm",
      def: "A finite, step-by-step procedure for solving a problem or performing a computation. Plain-language analogy: a recipe — a fixed sequence of steps that always produces the result if followed correctly."
    },
    {
      term: "DSA",
      def: "The combined study of how data is organized (data structures) and the step-by-step processes used to work with that data efficiently (algorithms). Plain-language analogy: pairing the right container with the right recipe to get your task done as fast as possible."
    }
  ],

  howItWorksTogether: "A data structure is the container you choose for your data. An algorithm is the set of instructions you run on that container. DSA is about picking the right container AND the right instructions together — because the same task can be fast or painfully slow depending on that combination. For example, finding a name in an unsorted list means checking every entry one by one. Store the same names in a sorted structure instead, and you can use a much faster search algorithm (binary search) that eliminates half the remaining options at every step. Learn more in <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"time-complexity\">Time Complexity (Big-O)</a>.",

  whyItMatters: "Software engineering at scale relies on choosing optimal data organization and computation paths. Using the wrong combination can turn an application taking milliseconds into one that hangs for minutes as data grows.",

  workedExample: {
    title: "Searching for a Contact: Unsorted Array vs. Sorted Array with Binary Search",
    primitiveText: "<strong>Scenario A (Unsorted Array):</strong> Searching for a name among 1,000 unsorted contacts requires linear search, checking up to 1,000 entries one by one.",
    referenceText: "<strong>Scenario B (Sorted Array + Binary Search):</strong> Storing those 1,000 names in a sorted array enables Binary Search, which checks the middle element and discards half the list each time — taking at most ~10 checks (log₂ 1000 ≈ 10). Same data, same task, wildly different speed because of the data structure + algorithm chosen together."
  },

  visual: {
    caption: "Figure 1: Comparing Linear Search on an unsorted structure (scanning every element) vs Binary Search on a sorted structure (halving search space).",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <g transform="translate(30, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">UNSORTED ARRAY (Linear Search)</text>
          <text x="150" y="50" fill="var(--text-muted)" font-size="11" text-anchor="middle">Checks up to 1,000 entries one-by-one</text>
          
          <g transform="translate(20, 75)">
            <rect x="0" y="0" width="45" height="40" fill="rgba(239,68,68,0.2)" stroke="#EF4444" rx="4"/>
            <text x="22.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#1</text>
            
            <rect x="52" y="0" width="45" height="40" fill="rgba(239,68,68,0.2)" stroke="#EF4444" rx="4"/>
            <text x="74.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#2</text>
            
            <rect x="104" y="0" width="45" height="40" fill="rgba(239,68,68,0.2)" stroke="#EF4444" rx="4"/>
            <text x="126.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#3</text>
            
            <text x="175" y="24" fill="var(--text-muted)" font-size="14">...</text>
            
            <rect x="205" y="0" width="55" height="40" fill="rgba(239,68,68,0.2)" stroke="#EF4444" rx="4"/>
            <text x="232.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#1000</text>
          </g>
          <text x="150" y="155" fill="#EF4444" font-size="12" font-weight="bold" text-anchor="middle">Worst case: 1,000 operations</text>
        </g>
        
        <g transform="translate(370, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">SORTED ARRAY (Binary Search)</text>
          <text x="150" y="50" fill="var(--text-muted)" font-size="11" text-anchor="middle">Eliminates half remaining options each step</text>
          
          <g transform="translate(20, 75)">
            <rect x="0" y="0" width="260" height="35" fill="rgba(16,185,129,0.15)" stroke="#10B981" rx="6"/>
            <line x1="130" y1="0" x2="130" y2="35" stroke="#10B981" stroke-width="2" stroke-dasharray="3,3"/>
            <text x="65" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">Discard 500</text>
            <text x="195" y="22" fill="#10B981" font-size="11" font-weight="bold" text-anchor="middle">Keep 500</text>
          </g>
          <text x="150" y="155" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">Worst case: ~10 operations (log₂ n)</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Unsorted Array — Linear Search Algorithm (O(n))</span>
<span class="kw">function</span> <span class="fn">linearSearch</span>(names, target) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; names.length; i++) {
    <span class="kw">if</span> (names[i] === target) <span class="kw">return</span> i; <span class="cm">// Checks up to n items</span>
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}

<span class="cm">// 2. Sorted Array — Binary Search Algorithm (O(log n))</span>
<span class="kw">function</span> <span class="fn">binarySearch</span>(sortedNames, target) {
  <span class="kw">let</span> low = <span class="num">0</span>, high = sortedNames.length - <span class="num">1</span>;
  <span class="kw">while</span> (low &lt;= high) {
    <span class="kw">let</span> mid = Math.<span class="fn">floor</span>((low + high) / <span class="num">2</span>);
    <span class="kw">if</span> (sortedNames[mid] === target) <span class="kw">return</span> mid;
    <span class="kw">if</span> (sortedNames[mid] &lt; target) low = mid + <span class="num">1</span>;
    <span class="kw">else</span> high = mid - <span class="num">1</span>;
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}`,

  complexityNotes: [
    "Linear Search on Unsorted Array: O(n) Time — checks up to n elements.",
    "Binary Search on Sorted Array: O(log n) Time — divides search space in half at each step.",
    "Data Structure choice dictates available Algorithms: sorting data enables logarithmic lookup algorithms."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Memorizing solutions instead of patterns",
      desc: "Memorizing individual solved problems instead of recognizing the underlying pattern (e.g. 'this is a two-pointer problem') that lets you solve new, unseen problems."
    },
    {
      title: "Mistake 2: Forcing everything into an array out of habit",
      desc: "Ignoring which data structure actually fits the problem and forcing everything into an array out of habit, missing out on hash map constant lookups or stack LIFO ordering."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the main difference between a Data Structure and an Algorithm?",
      a: "A Data Structure is the container used to organize and store data in memory (e.g., an array or hash map). An Algorithm is the step-by-step set of instructions performed on that data to accomplish a task."
    },
    {
      q: "Question 2: Why can binary search NOT be performed on an unsorted array?",
      a: "Binary search relies on comparing the target value against the middle element to determine whether the target lies in the left or right half. If the array is unsorted, eliminating half the array could throw away the target."
    },
    {
      q: "Question 3: If an unsorted array contains 1,000,000 elements, how many checks might linear search require compared to binary search on a sorted array?",
      a: "Linear search requires up to 1,000,000 checks (O(n)). Binary search on a sorted array requires at most 20 checks (log₂ 1,000,000 ≈ 19.93)."
    }
  ],

  challenge: {
    titleText: "Challenge: Choosing Container & Algorithm",
    desc: "Suppose you are building a real-time spell checker with 500,000 valid dictionary words. Explain why storing words in a plain unsorted array and checking input words via linear search is unusable, and propose a data structure + algorithm pair that yields instantaneous lookups."
  }
};
