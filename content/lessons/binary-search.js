/**
 * DSA Tracker — Lesson Content: Binary Search (Level 3)
 * ──────────────────────────────────────────────────────
 * Comprehensive beginner-friendly guide to Binary Search:
 * Core Concept, Search Range Halving, The Meaning of low/high/mid,
 * Why Sorting is Mandatory, Iterative Implementation, Complexity Analysis,
 * Interactive Visualizer, Comparison with Linear Search, and Practice.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["binary-search"] = {
  id: "binary-search",
  title: "Binary Search",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Master logarithmic divide-and-conquer searching on sorted data by repeatedly halving the search space in O(log n) time.",

  definitions: [
    {
      term: "Binary Search",
      def: "An efficient searching algorithm that operates on sorted collections by repeatedly dividing the search space in half until the target is found or the search window collapses."
    },
    {
      term: "Mandatory Precondition: Sorted Data",
      def: "Binary Search strictly requires the input array to be sorted (typically in ascending order). If the data is unordered, comparing against the middle element gives no guarantee about which half contains the target, rendering the algorithm invalid."
    },
    {
      term: "The Boundaries: low and high",
      def: "<code>low</code> represents the starting index and <code>high</code> represents the ending index of the active search range still under consideration. Initially, <code>low = 0</code> and <code>high = arr.length - 1</code>."
    },
    {
      term: "The Midpoint: mid",
      def: "The index calculated at each step as <code>mid = Math.floor((low + high) / 2)</code>. In languages with fixed 32-bit integers, written as <code>low + Math.floor((high - low) / 2)</code> to prevent numeric overflow."
    },
    {
      term: "Search Space Halving",
      def: "If <code>arr[mid] === target</code>, the search succeeds. If <code>arr[mid] < target</code>, the target can only exist in the right half, so <code>low = mid + 1</code>. If <code>arr[mid] > target</code>, the target can only exist in the left half, so <code>high = mid - 1</code>."
    },
    {
      term: "Loop Condition: low <= high",
      def: "The search continues as long as <code>low <= high</code>. When <code>low === high</code>, exactly one candidate element remains. If that element also fails to match, <code>low</code> exceeds <code>high</code>, the loop ends, and the function returns <code>-1</code>."
    }
  ],

  howItWorksTogether: "Binary Search works through divide-and-conquer: because all elements are sorted in ascending order, inspecting the middle value arr[mid] reveals everything about the two halves. If arr[mid] is smaller than the target, every item to the left of mid is guaranteed to be even smaller, so the entire left half [low..mid] is safely discarded in a single operation. Conversely, if arr[mid] is larger than the target, the entire right half [mid..high] is eliminated. This halving reduces an n-element search space to 1 in roughly log₂(n) steps — turning millions of checks into a handful.",

  whyMatters: "Binary Search is the cornerstone of logarithmic efficiency in computer science. Without it, databases could not query millions of indexed rows in milliseconds, Git could not pinpoint regressions via `git bisect`, and operating system memory allocators could not find free blocks quickly. Understanding how binary search halves search intervals is the fundamental stepping stone to Balanced Binary Search Trees (AVL, Red-Black), B-Trees, and Advanced Binary Search on Answer Spaces.",

  interactiveWidget: "binary-search",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sorted Sample Array",
    primitiveText: "<code>// Sorted Input Array (Ascending):<br/>const numbers = [1, 2, 3, 4, 5, 6, 7, 8];<br/>const target = 6;<br/><br/>// Step 1: Initialize boundaries<br/>// low = 0, high = 7<br/>// mid = Math.floor((0 + 7) / 2) = 3<br/>// Middle element: numbers[3] is 4.<br/>// Compare: 4 === 6 is FALSE. 4 < 6 is TRUE.<br/>// Action: Discard left half [0..3]. Set low = mid + 1 = 4.<br/><br/>// Step 2: Recalculate for remaining range [4..7]<br/>// low = 4, high = 7<br/>// mid = Math.floor((4 + 7) / 2) = 5<br/>// Middle element: numbers[5] is 6.<br/>// Compare: 6 === 6 is TRUE! MATCH FOUND!<br/><br/>// Result: Found target 6 at index 5 in only 2 comparisons!</code>",
    referenceText: "Notice that Linear Search took 6 comparisons on the same target (Section 18). Binary Search found it in only 2 comparisons because it eliminated 4 elements on Step 1 alone!"
  },

  visual: {
    caption: "Figure 1: Binary Search on sorted array [1, 2, 3, 4, 5, 6, 7, 8] looking for target 6. Step 1 compares mid element 4, immediately eliminating the entire left half [1, 2, 3, 4].",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="250" fill="var(--bg-body)" rx="12" />
        <text x="380" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Binary Search: Halving the Search Window (Target = 6)</text>
        
        <g transform="translate(30, 65)">
          <!-- Eliminated Left Half [0..3] -->
          <g opacity="0.3">
            <rect x="0" y="0" width="76" height="58" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="38" y="32" fill="var(--text-muted)" font-size="15" font-weight="600" text-anchor="middle">1</text>
            <text x="38" y="50" fill="var(--text-muted)" font-size="10" text-anchor="middle">[0]</text>

            <rect x="86" y="0" width="76" height="58" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="124" y="32" fill="var(--text-muted)" font-size="15" font-weight="600" text-anchor="middle">2</text>
            <text x="124" y="50" fill="var(--text-muted)" font-size="10" text-anchor="middle">[1]</text>

            <rect x="172" y="0" width="76" height="58" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="210" y="32" fill="var(--text-muted)" font-size="15" font-weight="600" text-anchor="middle">3</text>
            <text x="210" y="50" fill="var(--text-muted)" font-size="10" text-anchor="middle">[2]</text>

            <rect x="258" y="0" width="76" height="58" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" stroke-width="2" rx="6"/>
            <text x="296" y="32" fill="var(--text-muted)" font-size="15" font-weight="700" text-anchor="middle">4</text>
            <text x="296" y="50" fill="#F59E0B" font-size="10" font-weight="700" text-anchor="middle">MID 1</text>
          </g>

          <!-- Active Right Half [4..7] -->
          <g transform="translate(344, 0)">
            <!-- Index 4 -->
            <rect x="0" y="0" width="76" height="58" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="1.5" rx="6"/>
            <text x="38" y="32" fill="var(--text-primary)" font-size="15" font-weight="600" text-anchor="middle">5</text>
            <text x="38" y="50" fill="#38BDF8" font-size="10" font-weight="700" text-anchor="middle">LOW (4)</text>

            <!-- Index 5 (MATCH) -->
            <rect x="86" y="0" width="82" height="62" x="83" y="-2" fill="rgba(16,185,129,0.22)" stroke="#10B981" stroke-width="2.5" rx="6"/>
            <text x="124" y="32" fill="#10B981" font-size="16" font-weight="800" text-anchor="middle">6</text>
            <text x="124" y="50" fill="#10B981" font-size="10" font-weight="800" text-anchor="middle">TARGET ✓</text>

            <!-- Index 6 -->
            <rect x="172" y="0" width="76" height="58" fill="rgba(56,189,248,0.08)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="210" y="32" fill="var(--text-secondary)" font-size="15" font-weight="600" text-anchor="middle">7</text>
            <text x="210" y="50" fill="var(--text-muted)" font-size="10" text-anchor="middle">[6]</text>

            <!-- Index 7 -->
            <rect x="258" y="0" width="76" height="58" fill="rgba(168,85,247,0.12)" stroke="#C084FC" stroke-width="1.5" rx="6"/>
            <text x="296" y="32" fill="var(--text-primary)" font-size="15" font-weight="600" text-anchor="middle">8</text>
            <text x="296" y="50" fill="#C084FC" font-size="10" font-weight="700" text-anchor="middle">HIGH (7)</text>
          </g>
        </g>

        <!-- Elimination annotation -->
        <g transform="translate(160, 160)">
          <path d="M 0 0 C 40 30, 140 30, 180 0" stroke="#EF4444" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
          <text x="90" y="38" fill="#EF4444" font-size="11" font-weight="600" text-anchor="middle">Left half discarded in 1 step because 4 &lt; 6</text>
        </g>

        <!-- Right arrow to active range -->
        <g transform="translate(480, 160)">
          <text x="40" y="38" fill="var(--accent-primary)" font-size="11" font-weight="600" text-anchor="middle">New search range: [4 .. 7] (mid = 5 ➔ 6 matches!)</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid!
    }

    if (arr[mid] < target) {
      low = mid + 1;  // Target is in the right half; discard left
    } else {
      high = mid - 1; // Target is in the left half; discard right
    }
  }

  return -1; // Target not found after window collapsed
}`,

  complexityNotes: [
    "Best-Case Time Complexity: O(1) — occurs when the target is located right at the very first calculated midpoint.",
    "Average-Case Time Complexity: O(log n) — at every comparison step, the search window is cut in half. Reducing n to 1 takes roughly log₂ n steps.",
    "Worst-Case Time Complexity: O(log n) — occurs when the target is at the extreme ends or absent, requiring log₂(n) + 1 steps until low > high.",
    "Auxiliary Space Complexity: O(1) — the iterative while-loop implementation maintains only low, high, and mid index variables in-place without call stack growth.",
    "Recursive Space Complexity: O(log n) call stack space if implemented recursively instead of iteratively."
  ],

  tradeOffs: {
    title: "Binary Search: Strengths and Trade-offs",
    corePoint: "Binary Search delivers blazingly fast logarithmic speed, but demands strictly sorted random-access data as an unavoidable prerequisite.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Extremely fast: searches 1 billion items in at most 30 comparisons!</li>
            <li>Predictable O(log n) worst-case performance.</li>
            <li>O(1) auxiliary space for iterative version.</li>
            <li>Versatile: can find first occurrence, last occurrence, and insertion points.</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Disadvantages & Constraints:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Requires sorted data: running on unsorted input produces invalid results.</li>
            <li>Requires O(1) random access: cannot be efficiently applied to Linked Lists (which take O(n) to reach midpoint).</li>
            <li>Sorting first costs O(n log n), which is not worth it for a single lookup on unsorted data.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "Binary Search shines brightest when data is sorted once and queried repeatedly (e.g. database lookups, static dictionaries, and lookup tables)."
  },

  comparison: {
    title: "Linear Search vs. Binary Search: The Complete Comparison",
    html: `
      <p style="color:var(--text-secondary); margin-bottom:14px; line-height:1.6;">
        Compare the two fundamental search paradigms side-by-side. Notice how logarithmic division scales dramatically better as input size grows:
      </p>

      <div class="concept-table-responsive">
        <table class="concept-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Linear Search</th>
              <th>Binary Search</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Search Method</strong></td>
              <td>Checks elements one by one</td>
              <td>Repeatedly halves the search range</td>
            </tr>
            <tr>
              <td><strong>Sorted Input Required?</strong></td>
              <td><span style="color:#10B981; font-weight:700;">No</span></td>
              <td><span style="color:#EF4444; font-weight:700;">Yes</span> (for the standard algorithm)</td>
            </tr>
            <tr>
              <td><strong>Best-Case Time</strong></td>
              <td>O(1)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td><strong>Average-Case Time</strong></td>
              <td>O(n)</td>
              <td>O(log n)</td>
            </tr>
            <tr>
              <td><strong>Worst-Case Time</strong></td>
              <td>O(n)</td>
              <td>O(log n)</td>
            </tr>
            <tr>
              <td><strong>Iterative Extra Space</strong></td>
              <td>O(1)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td><strong>Comparison Count for N = 1,024</strong></td>
              <td>Up to 1,024 comparisons</td>
              <td>At most 10 comparisons (2¹⁰ = 1024)</td>
            </tr>
            <tr>
              <td><strong>Comparison Count for N = 1,000,000</strong></td>
              <td>Up to 1,000,000 comparisons</td>
              <td>At most 20 comparisons (2²⁰ ≈ 10⁶)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background:var(--bg-surface); padding:16px 20px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
        💡 <strong>The Power of Halving:</strong> When an algorithm cuts the search space in half at every step, doubling the size of the array only adds <em>one additional comparison</em>! For example, an array of 500,000 elements needs ~19 comparisons; double it to 1,000,000 elements, and it only needs 20 comparisons!
      </div>
    `,
    interactiveWidget: "search-comparison"
  },

  commonMistakes: [
    {
      title: "Mistake 1: Running Binary Search on Unsorted Data",
      desc: "If elements are not strictly sorted, the premise that all values left of mid are smaller is false. The target could easily be in the discarded half, causing Binary Search to wrongly return -1."
    },
    {
      title: "Mistake 2: Writing low = mid or high = mid (Infinite Loop Trap)",
      desc: "If you write <code>low = mid</code> instead of <code>low = mid + 1</code>, when <code>low</code> and <code>high</code> become adjacent, <code>Math.floor((low + high) / 2)</code> will forever equal <code>low</code>, locking the program in an infinite while-loop."
    },
    {
      title: "Mistake 3: Using while (low < high) Instead of while (low <= high)",
      desc: "Using <code>low < high</code> terminates prematurely when only one element remains (<code>low === high</code>). If that single remaining element happens to be the target, the algorithm will miss it and return -1."
    },
    {
      title: "Mistake 4: Integer Overflow in Fixed-Bit Languages",
      desc: "In languages like Java or C++, computing <code>(low + high) / 2</code> when both numbers are near 2³¹ - 1 can overflow to negative numbers. Use <code>low + Math.floor((high - low) / 2)</code> instead."
    }
  ],

  realWorldDsa: [
    {
      item: "Database B-Tree Index Lookups",
      structure: "Multi-Way Binary Search",
      note: "Relational databases (PostgreSQL, MySQL) store primary key indices in sorted B+ Trees and use Binary Search within each block to retrieve records in microseconds."
    },
    {
      item: "Git Bisect Bug Tracking",
      structure: "Binary Search on Commit History",
      note: "<code>git bisect</code> uses binary search across chronological commit hashes to locate the exact commit that introduced a software bug."
    },
    {
      item: "Physical Dictionary / Book Lookup",
      structure: "Human Binary Search Heuristic",
      note: "When looking up a word in a printed dictionary, you flip to the middle, check the letter, and discard the unneeded half of pages."
    }
  ],

  historyFact: "Although the concept of binary search has existed in human mathematics for centuries, getting the computer implementation completely bug-free proved notoriously difficult. In 1946, John Mauchly mentioned it, but it was not until 1962 that Derrick Henry Lehmer published a completely correct implementation. In fact, a hidden integer overflow bug existed in Sun Microsystems' Java standard library implementation of binary search for over 9 years before being discovered by Joshua Bloch in 2006!",

  languageAgnostic: {
    title: "Binary Search in Standard Libraries",
    text: "Because binary search is so vital, standard libraries provide battle-tested implementations: C++ has <code>std::binary_search</code> and <code>std::lower_bound</code>; Java provides <code>Arrays.binarySearch()</code>; Python includes the <code>bisect</code> module (<code>bisect_left</code>, <code>bisect_right</code>); and Go offers <code>sort.Search()</code>."
  },

  // Questions Tab
  questionSuite: [
    {
      id: "bs-q1",
      difficulty: "Easy",
      title: "Core Precondition for Binary Search",
      prompt: "What condition MUST be satisfied before standard Binary Search can be applied to an array?",
      options: [
        "The array must contain only unique values",
        "The array must be sorted",
        "The array must have an even length",
        "The array must be stored on a stack"
      ],
      correct: 1,
      explanation: "Standard Binary Search strictly requires sorted input. Its decision to discard half of the array relies entirely on the guarantee that elements follow a strict monotonic order."
    },
    {
      id: "bs-q2",
      difficulty: "Easy",
      title: "Time Complexity of Binary Search",
      prompt: "What is the worst-case time complexity of Binary Search on an array of n elements?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      correct: 2,
      explanation: "Since the search range is divided by 2 at each comparison, an array of n elements is reduced to 1 in at most ⌊log₂ n⌋ + 1 steps, yielding O(log n)."
    },
    {
      id: "bs-q3",
      difficulty: "Medium",
      title: "Proper Boundary Updates",
      prompt: "In a standard ascending Binary Search, what update is made when arr[mid] < target?",
      options: [
        "high = mid - 1",
        "low = mid + 1",
        "low = mid",
        "high = mid"
      ],
      correct: 1,
      explanation: "If arr[mid] is smaller than target, the target must lie to the right of mid. Since mid itself is already checked and not a match, we advance the lower bound to low = mid + 1."
    },
    {
      id: "bs-q4",
      difficulty: "Medium",
      title: "Comparison Count for 16 Elements",
      prompt: "For the sorted array [1, 2, 3, 4, 5, 6, 7, 8], how many comparisons does Binary Search take to find target = 4?",
      options: [
        "1 comparison (O(1) best case)",
        "2 comparisons",
        "4 comparisons",
        "8 comparisons"
      ],
      correct: 0,
      explanation: "With low = 0 and high = 7, mid = Math.floor((0 + 7) / 2) = 3. arr[3] is exactly 4! The target matches on the very first midpoint calculation (1 comparison)."
    },
    {
      id: "bs-q5",
      difficulty: "Hard",
      title: "Binary Search on Linked Lists",
      prompt: "Why is Binary Search generally impractical on a standard Singly Linked List even if the list is sorted?",
      options: [
        "Linked lists cannot store numbers",
        "Linked lists do not support O(1) random access to the midpoint; finding mid costs O(n)",
        "Linked lists cannot be sorted",
        "Binary Search requires contiguous heap memory"
      ],
      correct: 1,
      explanation: "Binary Search relies on jumping directly to arr[mid] in O(1) time. In a linked list, finding the middle node requires traversing n/2 pointers from the head, which takes O(n) time, making the total search time O(n) anyway."
    },
    {
      id: "bs-q6",
      difficulty: "Interview",
      title: "Safe Midpoint Calculation",
      prompt: "Why do competitive programmers often write mid = low + Math.floor((high - low) / 2) instead of (low + high) / 2?",
      options: [
        "It runs twice as fast",
        "It prevents potential 32-bit integer overflow when low + high exceeds 2³¹ - 1",
        "It rounds towards high instead of low",
        "It handles negative numbers better"
      ],
      correct: 1,
      explanation: "When low and high are very large positive integers, their sum low + high can exceed 2,147,483,647 in fixed 32-bit integer languages, wrapping around to a negative number. Writing low + (high - low) / 2 mathematically computes the same value while avoiding overflow."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the loop termination condition in iterative Binary Search?",
      options: ["low < high", "low <= high", "low > high", "mid === target"],
      answer: 1,
      explanation: "Using low <= high ensures that when low === high (a single element remaining), that last element is evaluated before concluding the target is absent."
    },
    {
      question: "Q2. In [1, 2, 3, 4, 5, 6, 7, 8], searching for target = 6 takes how many comparisons?",
      options: ["1 comparison", "2 comparisons", "3 comparisons", "6 comparisons"],
      answer: 1,
      explanation: "Comparison 1 checks mid=3 (value 4 < 6 ➔ low becomes 4). Comparison 2 checks mid=5 (value 6 === 6 ➔ MATCH!). Total: 2 comparisons."
    },
    {
      question: "Q3. How many maximum comparisons does Binary Search need for an array of 1,000,000 items?",
      options: ["1,000,000", "500,000", "20", "100"],
      answer: 2,
      explanation: "Because 2²⁰ = 1,048,576 > 1,000,000, Binary Search requires at most 20 comparisons to search through 1,000,000 elements!"
    }
  ],

  predictOutput: [
    {
      title: "Prediction 1: Target at Midpoint",
      code: `const arr = [10, 20, 30, 40, 50, 60, 70];
// low = 0, high = 6
// mid = Math.floor((0 + 6) / 2) = 3
console.log(binarySearch(arr, 40));`,
      options: ["3", "4", "40", "-1"],
      answer: 0,
      explanation: "Index 3 contains value 40. Target matches on the first iteration, returning 3."
    },
    {
      title: "Prediction 2: Absent Element Below Minimum",
      code: `const arr = [10, 20, 30, 40, 50];
console.log(binarySearch(arr, 5));`,
      options: ["0", "-1", "undefined", "null"],
      answer: 1,
      explanation: "Target 5 is smaller than all elements. The search window shrinks until low > high, returning -1."
    }
  ],

  practice: [
    {
      q: "Question 1: If an array has 32 sorted items, what is the maximum number of comparisons Binary Search can make?",
      a: "At most 5 comparisons, because log₂(32) = 5 (32 -> 16 -> 8 -> 4 -> 2 -> 1)."
    },
    {
      q: "Question 2: What would happen if you ran Binary Search on the unsorted array [8, 3, 7, 4, 2, 6, 1, 5] looking for 6?",
      a: "It would compare mid=3 (value 4). Since 4 < 6, it would discard the left half [8, 3, 7, 4]. While 6 happens to be in the right half by chance in this case, searching for 8 (which is in the left half!) would fail completely and return -1. Binary search is completely invalid on unsorted data."
    }
  ],

  challenge: {
    titleText: "Challenge: Find First and Last Position",
    desc: "Extend Binary Search to find both the first and last index of a target that appears multiple times in a sorted array (e.g. <code>[5, 7, 7, 8, 8, 10]</code>, target 8 ➔ <code>[3, 4]</code>)."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Binary Search is one of the most tested patterns in technical interviews. Start with LeetCode 704 to master the canonical while-loop template.",
    problems: [
      { num: 704, title: "Binary Search", difficulty: "Easy", slug: "binary-search", isSuggestedStart: true, roadmapStep: 1, isImmediateNext: true },
      { num: 35, title: "Search Insert Position", difficulty: "Easy", slug: "search-insert-position" },
      { num: 34, title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", slug: "find-first-and-last-position-of-element-in-sorted-array" },
      { num: 69, title: "Sqrt(x)", difficulty: "Easy", slug: "sqrtx" },
      { num: 278, title: "First Bad Version", difficulty: "Easy", slug: "first-bad-version" }
    ]
  }
};
