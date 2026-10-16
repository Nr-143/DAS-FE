/**
 * DSA Tracker — Lesson Content: Linear Search (Level 3)
 * ──────────────────────────────────────────────────────
 * Comprehensive beginner-friendly guide to Linear Search:
 * Concepts, Internal Mechanics, Worked Examples, Complexity Analysis,
 * Interactive Visualizer, Comparison with Binary Search, and Practice.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linear-search"] = {
  id: "linear-search",
  title: "Linear Search",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the fundamental sequential searching algorithm: scanning elements one-by-one from index 0 to the end until finding the target or confirming its absence.",

  definitions: [
    {
      term: "Searching",
      def: "The algorithmic process of locating a specific target value within a collection of data, returning either its index/position if present, or an indicator (commonly <code>-1</code>) if absent."
    },
    {
      term: "Linear Search (Sequential Search)",
      def: "The simplest searching technique that starts at the first element and inspects each element one-by-one in sequential order until a match is found or the collection is exhausted."
    },
    {
      term: "Why Check One by One?",
      def: "In an unsorted collection, elements have no predefined order or positional relationship. The computer cannot predict where a value lives without physically inspecting each cell."
    },
    {
      term: "Internal Working Mechanism",
      def: "Initializes pointer <code>i = 0</code>. At each iteration, evaluates condition <code>arr[i] === target</code>. If true, terminates immediately and returns <code>i</code>. Otherwise increments <code>i++</code>. If loop completes without a match, returns <code>-1</code>."
    },
    {
      term: "Unsorted Array Compatibility",
      def: "Linear Search makes zero assumptions about element ordering. It works equally well on unsorted, sorted, reverse-sorted, or completely random arrays."
    },
    {
      term: "Time & Space Complexity",
      def: "Best Case: <strong>O(1)</strong> (target is at index 0). Average Case: <strong>O(n)</strong> (~n/2 checks). Worst Case: <strong>O(n)</strong> (target is at the last index or missing). Auxiliary Space: <strong>O(1)</strong> (in-place, requires only an index variable)."
    }
  ],

  howItWorksTogether: "Linear search is universally applicable because it requires no preconditions — your data does not need to be sorted. It iterates through indices 0, 1, 2, ..., n-1 in sequence. If target is found, it exits early with the index. If absent, it verifies every single item before returning -1. While simple and memory-friendly (O(1) auxiliary space), its O(n) scan time becomes a bottleneck on large datasets compared to divide-and-conquer methods like Binary Search.",

  whyMatters: "Linear search is the baseline against which every other searching algorithm is measured. While advanced algorithms like Binary Search are asymptotically faster, Linear Search is actually faster for tiny datasets (less than 15-20 items) due to zero setup overhead and optimal CPU cache locality. It is also the only viable search option for unordered streams, singly linked lists where random indexing is impossible, and one-off lookups where sorting the data first (costing O(n log n)) would be wasteful.",

  interactiveWidget: "linear-search",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array",
    primitiveText: "<code>// Sample Input:<br/>const numbers = [8, 3, 7, 4, 2, 6, 1, 5];<br/>const target = 6;<br/><br/>// Execution Trace:<br/>// Step 1: Check index 0 -> numbers[0] is 8. 8 === 6 is FALSE.<br/>// Step 2: Check index 1 -> numbers[1] is 3. 3 === 6 is FALSE.<br/>// Step 3: Check index 2 -> numbers[2] is 7. 7 === 6 is FALSE.<br/>// Step 4: Check index 3 -> numbers[3] is 4. 4 === 6 is FALSE.<br/>// Step 5: Check index 4 -> numbers[4] is 2. 2 === 6 is FALSE.<br/>// Step 6: Check index 5 -> numbers[5] is 6. 6 === 6 is TRUE! MATCH!<br/>// Output: Target found at index 5 in 6 comparisons.</code>",
    referenceText: "Notice how the algorithm methodically moves forward index-by-index until element 6 is encountered at index 5. If the target were 99, it would check all 8 elements before reporting -1."
  },

  visual: {
    caption: "Figure 1: Linear Search inspecting array [8, 3, 7, 4, 2, 6, 1, 5] sequentially from left to right until finding target 6 at index 5.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="230" fill="var(--bg-body)" rx="12" />
        <text x="380" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Linear Search Step-by-Step Inspection (Target = 6)</text>
        
        <g transform="translate(30, 60)">
          <!-- Cell 0: Checked -->
          <g transform="translate(0, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8" opacity="0.6"/>
            <text x="38" y="28" fill="var(--text-muted)" font-size="16" font-weight="700" text-anchor="middle">8</text>
            <text x="38" y="48" fill="#EF4444" font-size="10" font-weight="600" text-anchor="middle">[0] 8≠6 ✗</text>
          </g>

          <!-- Cell 1: Checked -->
          <g transform="translate(86, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8" opacity="0.6"/>
            <text x="38" y="28" fill="var(--text-muted)" font-size="16" font-weight="700" text-anchor="middle">3</text>
            <text x="38" y="48" fill="#EF4444" font-size="10" font-weight="600" text-anchor="middle">[1] 3≠6 ✗</text>
          </g>

          <!-- Cell 2: Checked -->
          <g transform="translate(172, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8" opacity="0.6"/>
            <text x="38" y="28" fill="var(--text-muted)" font-size="16" font-weight="700" text-anchor="middle">7</text>
            <text x="38" y="48" fill="#EF4444" font-size="10" font-weight="600" text-anchor="middle">[2] 7≠6 ✗</text>
          </g>

          <!-- Cell 3: Checked -->
          <g transform="translate(258, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8" opacity="0.6"/>
            <text x="38" y="28" fill="var(--text-muted)" font-size="16" font-weight="700" text-anchor="middle">4</text>
            <text x="38" y="48" fill="#EF4444" font-size="10" font-weight="600" text-anchor="middle">[3] 4≠6 ✗</text>
          </g>

          <!-- Cell 4: Checked -->
          <g transform="translate(344, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8" opacity="0.6"/>
            <text x="38" y="28" fill="var(--text-muted)" font-size="16" font-weight="700" text-anchor="middle">2</text>
            <text x="38" y="48" fill="#EF4444" font-size="10" font-weight="600" text-anchor="middle">[4] 2≠6 ✗</text>
          </g>

          <!-- Cell 5: MATCH FOUND -->
          <g transform="translate(430, 0)">
            <rect width="82" height="64" x="-3" y="-2" fill="rgba(16,185,129,0.22)" stroke="#10B981" stroke-width="2.5" rx="8"/>
            <text x="38" y="28" fill="#10B981" font-size="18" font-weight="800" text-anchor="middle">6</text>
            <text x="38" y="50" fill="#10B981" font-size="11" font-weight="700" text-anchor="middle">[5] MATCH ✓</text>
          </g>

          <!-- Cell 6: Unchecked -->
          <g transform="translate(522, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.5" rx="8"/>
            <text x="38" y="28" fill="var(--text-secondary)" font-size="16" font-weight="600" text-anchor="middle">1</text>
            <text x="38" y="48" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[6] skipped</text>
          </g>

          <!-- Cell 7: Unchecked -->
          <g transform="translate(608, 0)">
            <rect width="76" height="60" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.5" rx="8"/>
            <text x="38" y="28" fill="var(--text-secondary)" font-size="16" font-weight="600" text-anchor="middle">5</text>
            <text x="38" y="48" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[7] skipped</text>
          </g>
        </g>

        <!-- Progress bar and direction indicator -->
        <g transform="translate(40, 155)">
          <line x1="0" y1="10" x2="440" y2="10" stroke="var(--accent-primary)" stroke-width="2.5" marker-end="url(#arrowhead)" />
          <text x="220" y="32" fill="var(--accent-primary)" font-size="12" font-weight="600" text-anchor="middle">Sequential scan direction: 6 comparisons to reach index 5</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `function linearSearch(arr, target) {
  // Loop sequentially through each index from 0 to arr.length - 1
  for (let i = 0; i < arr.length; i++) {
    // If the element matches the target value, return its index immediately
    if (arr[i] === target) {
      return i;
    }
  }

  // If the loop finishes without finding the target, return -1
  return -1;
}`,

  complexityNotes: [
    "Best-Case Time Complexity: O(1) — occurs when the target is located at index 0. Only a single comparison is needed.",
    "Average-Case Time Complexity: O(n) — on average, the target appears near the middle, requiring ~n/2 comparisons, which reduces asymptotically to O(n).",
    "Worst-Case Time Complexity: O(n) — occurs when the target is at the very last index (n - 1) or completely absent from the array, forcing all n elements to be inspected.",
    "Space Complexity: O(1) Auxiliary Space — requires only a single index variable i, executing completely in-place without auxiliary memory."
  ],

  tradeOffs: {
    title: "Linear Search: Strengths and Trade-offs",
    corePoint: "Linear Search trades asymptotic execution speed for universal applicability and absolute simplicity.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>No sorted order required — operates on raw, chaotic data.</li>
            <li>Zero memory overhead — O(1) space.</li>
            <li>Extremely easy to write, debug, and reason about.</li>
            <li>Fast for small arrays due to hardware cache line prefetching.</li>
            <li>Supports data streams and singly linked lists where random indexing is absent.</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Disadvantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>O(n) time scales linearly — scanning 1,000,000 items takes 1,000,000 steps.</li>
            <li>Infeasible for frequent repeated queries on large datasets.</li>
            <li>Does not leverage existing ordering even if data happens to be sorted.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "If you have an unsorted dataset and only need to perform a single lookup, Linear Search in O(n) is actually faster than sorting the array first (which costs O(n log n)) and then running Binary Search!"
  },

  comparison: {
    title: "Linear Search vs. Binary Search",
    html: `
      <p style="color:var(--text-secondary); margin-bottom:14px; line-height:1.6;">
        The fundamental difference between Linear Search and Binary Search lies in how they navigate through data. While Linear Search checks elements sequentially one-by-one, Binary Search repeatedly cuts the remaining candidates in half.
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
              <td>Checks elements sequentially one-by-one</td>
              <td>Repeatedly halves the search space (divide-and-conquer)</td>
            </tr>
            <tr>
              <td><strong>Sorted Input Required?</strong></td>
              <td><span style="color:#10B981; font-weight:700;">No</span> (works on any data)</td>
              <td><span style="color:#EF4444; font-weight:700;">Yes</span> (mandatory precondition)</td>
            </tr>
            <tr>
              <td><strong>Best-Case Time</strong></td>
              <td>O(1) (target at index 0)</td>
              <td>O(1) (target at initial midpoint)</td>
            </tr>
            <tr>
              <td><strong>Average-Case Time</strong></td>
              <td>O(n) (proportional to array size)</td>
              <td>O(log n) (proportional to powers of 2)</td>
            </tr>
            <tr>
              <td><strong>Worst-Case Time</strong></td>
              <td>O(n) (target at end or missing)</td>
              <td>O(log n) (window shrinks to 1)</td>
            </tr>
            <tr>
              <td><strong>Iterative Space</strong></td>
              <td>O(1) (constant extra space)</td>
              <td>O(1) (constant extra space)</td>
            </tr>
            <tr>
              <td><strong>Supported Structures</strong></td>
              <td>Arrays, Linked Lists, Streams</td>
              <td>Arrays & random-access collections only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background:var(--bg-surface); padding:16px 20px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
        💡 <strong>Understanding Complexity Notation in Plain English:</strong><br/>
        • <strong>O(1) Constant Time:</strong> Takes the exact same instant whether the array has 10 items or 10 billion items.<br/>
        • <strong>O(n) Linear Time:</strong> If the data doubles from 1,000 to 2,000 items, the worst-case search time also doubles from 1,000 to 2,000 checks.<br/>
        • <strong>O(log n) Logarithmic Time:</strong> Every comparison cuts the problem size in half. An array of 1,000,000 items takes at most <strong>20 comparisons</strong> (because 2²⁰ ≈ 1,048,576)!
      </div>
    `,
    interactiveWidget: "search-comparison"
  },

  commonMistakes: [
    {
      title: "Mistake 1: Returning -1 Inside the For Loop",
      desc: "Placing <code>return -1;</code> inside the body of the <code>for</code> loop instead of after it causes the algorithm to terminate after inspecting only the very first element (index 0). <code>return -1;</code> must be placed outside the loop so all elements can be checked first."
    },
    {
      title: "Mistake 2: Forgetting That Linear Search Is Zero-Indexed",
      desc: "Remember that array indices run from <code>0</code> to <code>length - 1</code>. Using <code>i <= arr.length</code> will check an out-of-bounds index <code>arr[length]</code>, which evaluates to <code>undefined</code>."
    },
    {
      title: "Mistake 3: Sorting an Array Just for a Single Linear Search",
      desc: "Sorting takes <code>O(n log n)</code> time. If you only need to search for one element once, running a single Linear Search in <code>O(n)</code> is far faster than sorting and then running Binary Search."
    }
  ],

  realWorldDsa: [
    {
      item: "Ctrl+F In a Text Document",
      structure: "Linear String Pattern Search",
      note: "Unsorted text files must be scanned sequentially from start to end to locate word occurrences."
    },
    {
      item: "Finding a Contact by Nickname",
      structure: "Linear Search on Object Attributes",
      note: "If contacts are sorted by Last Name, searching by an un-indexed field like 'Phone Number' or 'Nickname' requires inspecting contact cards one-by-one."
    },
    {
      item: "JavaScript Array.prototype.indexOf()",
      structure: "Standard Library Linear Search",
      note: "Native JS methods like <code>indexOf</code>, <code>includes</code>, and <code>find</code> all implement Linear Search internally."
    }
  ],

  historyFact: "Sequential search is the oldest and most natural search algorithm in human history, dating back to ancient library catalog scrolls and physical filing cabinets. It was first formalized mathematically for electronic computers by John von Neumann and early ENIAC programmers in the 1940s.",

  languageAgnostic: {
    title: "Linear Search Across Different Languages",
    text: "Whether written in JavaScript, Python, C++, Java, or Rust, Linear Search is conceptually identical: an iterator advances a index offset across memory and compares the value stored at that address with the target. Built-in functions like Python's <code>in</code> operator, Java's <code>ArrayList.contains()</code>, and C++'s <code>std::find()</code> all implement this exact sequential algorithm."
  },

  // Questions Tab
  questionSuite: [
    {
      id: "ls-q1",
      difficulty: "Easy",
      title: "Best-Case Scenario for Linear Search",
      prompt: "What is the best-case time complexity of Linear Search, and under what condition does it occur?",
      options: [
        "O(n) when target is at the end",
        "O(1) when target is at index 0",
        "O(log n) when the array is sorted",
        "O(n/2) when target is in the middle"
      ],
      correct: 1,
      explanation: "In the best-case scenario, the target element happens to be at index 0. The very first comparison matches, and the algorithm returns immediately in O(1) constant time."
    },
    {
      id: "ls-q2",
      difficulty: "Easy",
      title: "Preconditions for Linear Search",
      prompt: "Does Linear Search require the input array to be sorted before searching?",
      options: [
        "Yes, it requires ascending order",
        "Yes, it requires descending order",
        "No, it works on both sorted and unsorted data",
        "Only if the array contains more than 100 elements"
      ],
      correct: 2,
      explanation: "No sorting is required. Linear Search inspects each element one-by-one independently, so the relative ordering of elements does not affect its ability to find the target."
    },
    {
      id: "ls-q3",
      difficulty: "Medium",
      title: "Worst-Case Comparison Count",
      prompt: "For an array with 50 elements, how many comparisons does Linear Search make if the target is NOT present?",
      options: [
        "25 comparisons",
        "50 comparisons",
        "log₂(50) ≈ 6 comparisons",
        "0 comparisons"
      ],
      correct: 1,
      explanation: "When the target is not present, Linear Search must check every single element in the array from index 0 to 49 to confirm absence, making exactly 50 comparisons (O(n))."
    },
    {
      id: "ls-q4",
      difficulty: "Hard",
      title: "Linear Search vs. Sorting + Binary Search",
      prompt: "You have an unsorted array of n elements and only need to find a target value once. Which approach is faster asymptotically?",
      options: [
        "Sort the array with Merge Sort (O(n log n)) then use Binary Search (O(log n))",
        "Run Linear Search directly on the unsorted array (O(n))",
        "Both approaches take the exact same time",
        "Binary Search without sorting"
      ],
      correct: 1,
      explanation: "For a single query, Linear Search takes O(n), whereas sorting first costs O(n log n) + O(log n) = O(n log n). Since O(n) < O(n log n), running Linear Search directly is asymptotically faster."
    },
    {
      id: "ls-q5",
      difficulty: "Interview",
      title: "Multiple Target Occurrences",
      prompt: "How can Linear Search be modified to return the indices of ALL occurrences of a target rather than stopping at the first?",
      options: [
        "Use Binary Search instead",
        "Collect matching indices into an output array and continue iterating until the end of the array",
        "Restart the loop from 0 each time a match is found",
        "Linear Search cannot find duplicate elements"
      ],
      correct: 1,
      explanation: "By replacing the early `return i` with `results.push(i)` and letting the loop run to completion (index n-1), Linear Search collects all matching indices in a single O(n) pass."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What value does standard linearSearch(arr, target) return when the target is absent?",
      options: ["null", "undefined", "false", "-1"],
      answer: 3,
      explanation: "In standard algorithm design, returning -1 indicates that no valid array index (which are non-negative integers 0, 1, 2...) contained the target."
    },
    {
      question: "Q2. In the sample array [8, 3, 7, 4, 2, 6, 1, 5], how many comparisons are made to find target = 6?",
      options: ["3 comparisons", "5 comparisons", "6 comparisons", "8 comparisons"],
      answer: 2,
      explanation: "Elements 8, 3, 7, 4, 2 are checked first (5 comparisons). Then element 6 at index 5 matches (6th comparison). Total: 6 comparisons."
    },
    {
      question: "Q3. What is the auxiliary space complexity of iterative Linear Search?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2,
      explanation: "Linear Search requires only a single loop counter variable (i), consuming O(1) constant auxiliary memory."
    }
  ],

  predictOutput: [
    {
      title: "Prediction 1: First Element Match",
      code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

const res = linearSearch([99, 10, 20, 30], 99);
console.log(res);`,
      options: ["0", "1", "99", "-1"],
      answer: 0,
      explanation: "Value 99 is at index 0. The first loop iteration matches immediately, returning 0."
    },
    {
      title: "Prediction 2: Missing Element",
      code: `const data = [5, 12, 8, 130, 44];
console.log(linearSearch(data, 100));`,
      options: ["undefined", "-1", "null", "false"],
      answer: 1,
      explanation: "Target 100 is not in the array. The loop inspects all 5 elements and exits, returning -1."
    }
  ],

  practice: [
    {
      q: "Question 1: Why is Linear Search considered an O(n) algorithm even though it might stop early?",
      a: "Big-O notation describes upper-bound asymptotic behavior. In the worst-case scenario (target at the very end or absent), the algorithm must check all n elements, yielding O(n)."
    },
    {
      q: "Question 2: In what scenario would Linear Search be preferred over Binary Search?",
      a: "When the array is unsorted and you only need to search once, or when the data structure does not support random indexing (such as a Singly Linked List)."
    }
  ],

  challenge: {
    titleText: "Challenge: Global Linear Search with Counts",
    desc: "Write a function <code>countOccurrences(arr, target)</code> that uses Linear Search to count how many times target appears in arr, returning both the count and an array of all indices."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Reinforce linear scanning and sequential array traversal with these beginner-friendly problems.",
    problems: [
      { num: 1295, title: "Find Numbers with Even Number of Digits", difficulty: "Easy", slug: "find-numbers-with-even-number-of-digits", isSuggestedStart: true, roadmapStep: 1, isImmediateNext: true },
      { num: 1346, title: "Check If N and Its Double Exist", difficulty: "Easy", slug: "check-if-n-and-its-double-exist" },
      { num: 268, title: "Missing Number", difficulty: "Easy", slug: "missing-number" },
      { num: 1, title: "Two Sum (Brute Force Linear Scan)", difficulty: "Easy", slug: "two-sum" }
    ]
  }
};
