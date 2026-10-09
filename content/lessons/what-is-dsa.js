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
  interactiveWidget: "dsa-intro-visualizer",

  whyMatters: "DSA shows up constantly in real software work and in how software engineers are hired. It's widely regarded as one of the most heavily tested areas in technical interviews, across companies of every size. But the bigger reason to actually learn it well: the difference between an O(n²) function and an O(n log n) one isn't academic — it's the difference between a feature that feels instant and one that visibly slows down or times out as real data grows. You already saw this on this exact page: 1,000 operations vs. ~10, for the same task.",

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

  bigPicture: {
    title: "The Big Picture: What You're Actually Building Toward",
    familiesHeading: "Data structures roughly split into two families:",
    linearText: "<strong>Linear</strong> — elements arranged one after another in a sequence: <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"arrays\">Array</a>, String, <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"linked-list-singly\">Linked List</a>, Stack, Queue. <em>(Level 2 on the roadmap.)</em>",
    nonlinearText: "<strong>Non-linear</strong> — elements arranged in branching or networked relationships rather than a straight line: Trees, Graphs, Hash Tables. <em>(Levels 4–6, locked.)</em>",
    categoriesHeading: "The algorithms you'll build on top of these fall into a few recurring categories:",
    searchSortText: "<strong>Searching & Sorting</strong> — finding and ordering data. <em>(<a href=\"#\" class=\"lesson-cross-link\" data-topic=\"binary-search\">Binary Search</a> is Level 3 on the roadmap.)</em>",
    recursionText: "<strong>Recursion & Divide-and-Conquer</strong> — breaking a problem into smaller versions of itself. <em>(<a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> is Level 1, and resurfaces directly in Merge Sort and Quick Sort.)</em>",
    patternsText: "<strong>Algorithmic Patterns</strong> — reusable strategies like Two Pointers, Sliding Window, Backtracking, Greedy, and Dynamic Programming, which combine the structures and basic algorithms above to solve more complex problems. <em>(Level 7, locked.)</em>",
    closingText: "This page is the entry point; everything else on the roadmap is really just going deeper into one of these families or categories."
  },

  workedExample: {
    title: "Searching for a Contact: Unsorted Array vs. Sorted Array with Binary Search",
    primitiveText: "<strong>Scenario A (Unsorted Array):</strong> Searching for a name among 1,000 unsorted contacts requires linear search, checking up to 1,000 entries one by one.",
    referenceText: "<strong>Scenario B (Sorted Array + Binary Search):</strong> Storing those 1,000 names in a sorted array enables Binary Search, which checks the middle element and discards half the list each time — taking at most ~10 checks (log₂ 1000 ≈ 10). Same data, same task, wildly different speed because of the data structure + algorithm chosen together.",
    selfCheckPrompt: "Before scrolling further — which do you think is faster for finding a name among 1,000 sorted entries?",
    selfCheckExplanation: "Binary Search — at most ~10 checks (log₂ 1000 ≈ 10) vs. up to 1,000 for Linear Search, exactly like Figure 1 above."
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
            <rect x="0" y="0" width="45" height="40" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" rx="4"/>
            <text x="22.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#1</text>
            
            <rect x="52" y="0" width="45" height="40" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" rx="4"/>
            <text x="74.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#2</text>
            
            <rect x="104" y="0" width="45" height="40" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" rx="4"/>
            <text x="126.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#3</text>
            
            <text x="175" y="24" fill="var(--text-muted)" font-size="14">...</text>
            
            <rect x="205" y="0" width="55" height="40" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" rx="4"/>
            <text x="232.5" y="24" fill="var(--text-primary)" font-size="11" text-anchor="middle">#1000</text>
          </g>
          <text x="150" y="155" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Worst case: 1,000 operations</text>
        </g>
        
        <g transform="translate(370, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">SORTED ARRAY (Binary Search)</text>
          <text x="150" y="50" fill="var(--text-muted)" font-size="11" text-anchor="middle">Eliminates half remaining options each step</text>
          
          <g transform="translate(20, 75)">
            <rect x="0" y="0" width="260" height="35" fill="rgba(45,138,104,0.12)" stroke="#2d8a68" rx="6"/>
            <line x1="130" y1="0" x2="130" y2="35" stroke="#2d8a68" stroke-width="2" stroke-dasharray="3,3"/>
            <text x="65" y="22" fill="var(--text-muted)" font-size="11" text-anchor="middle">Discard 500</text>
            <text x="195" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Keep 500</text>
          </g>
          <text x="150" y="155" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Worst case: ~10 operations (log₂ n)</text>
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

  tradeOffs: {
    title: "Trade-offs: There's No Single 'Best' Data Structure",
    corePoint: "Every data structure makes a trade-off — usually between how fast you can access an element, how fast you can insert or delete one, and how much memory it uses. There's no data structure that wins at everything.",
    comparisonText: "For example, an <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"arrays\">Array</a> gives O(1) access by index but costs O(n) to insert at the front, since everything after has to shift. A <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"linked-list-singly\">Linked List</a> flips that trade-off: O(1) insertion at the front, but O(n) just to reach a given position, since there's no direct index to jump to.",
    closingText: "The skill this course is actually teaching isn't memorizing structures in isolation — it's learning to match a structure's trade-offs to what a specific problem actually needs most (fast lookups? frequent insertions? order that matters?)."
  },

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

  realWorldDsa: [
    {
      item: "A browser's Back button",
      structure: "Stack (LIFO)",
      note: "the exact structure already unlocked on this roadmap."
    },
    {
      item: "A printer's print queue",
      structure: "Queue (FIFO)",
      note: "also already unlocked."
    },
    {
      item: "Autocomplete / spell-check suggestions",
      structure: "Trie (prefix tree)",
      note: "coming up later in Level 5 (Trees)."
    },
    {
      item: "A map app finding the shortest route",
      structure: "Graph algorithms",
      note: "coming up in Level 6 (Graphs)."
    },
    {
      item: "Fast lookups in a database or in-memory cache",
      structure: "Hash Tables",
      note: "coming up in Level 4 (Hashing)."
    }
  ],

  historyFact: "The word \"algorithm\" itself comes from the name of Muhammad ibn Musa al-Khwarizmi, a 9th-century Persian mathematician whose work on step-by-step methods for solving equations was hugely influential — his name, Latinized, is where \"algorithm\" comes from.",

  languageAgnostic: {
    title: "DSA Is Language-Agnostic",
    text: "The concepts on this page — arrays, stacks, recursion, Big-O — are universal across virtually every programming language. This course teaches them in JavaScript because it's visual and accessible, but the same thinking applies directly in Python, Java, C++, Go, or anything else. Only the exact syntax changes from language to language; the underlying ideas don't."
  },

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
