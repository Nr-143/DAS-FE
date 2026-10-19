/**
 * DSA Tracker — Lesson Content: Insertion Sort (Level 3 — Topic 22)
 * ─────────────────────────────────────────────────────────────────
 * Complete, beginner-friendly guide to Insertion Sort:
 * Playing Cards Analogy, Sorted vs. Unsorted Hand, Key Element,
 * Backward Shifting, Step-by-Step Animations, Exact JavaScript Code,
 * Complexity Analysis, Comparison Table, and Practice Questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["insertion-sort"] = {
  id: "insertion-sort",
  title: "Insertion Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand incremental insertion sorting: building a sorted list one element at a time by picking up a 'key' and shifting larger elements to the right to make room.",

  definitions: [
    {
      term: "Insertion Sort",
      def: "A simple, adaptive comparison-based sorting algorithm that builds the final sorted array one item at a time by consuming one input element per iteration and inserting it into its correct position within the already sorted portion."
    },
    {
      term: "The `key` Element",
      def: "The value currently being placed into the sorted sublist. It is temporarily extracted from index <code>i</code> so that elements to its left can shift into its spot."
    },
    {
      term: "Shifting vs. Swapping",
      def: "Insertion Sort does <strong>not</strong> swap elements pairwise. Instead, it copies elements one cell to the right (<code>arr[j + 1] = arr[j]</code>) to create an empty vacancy, then assigns <code>key</code> directly into that vacancy (<code>arr[j + 1] = key</code>)."
    },
    {
      term: "Online / Adaptive Algorithm",
      def: "Insertion Sort is an online algorithm: it can sort data as it receives it in a live stream without needing the full dataset up front. It is also adaptive: runs in <strong>O(n)</strong> time when data is already or nearly sorted."
    },
    {
      term: "Time & Space Complexity",
      def: "Best Case: <strong>O(n)</strong> (nearly or fully sorted). Average Case: <strong>O(n²)</strong>. Worst Case: <strong>O(n²)</strong> (reverse-sorted). Auxiliary Space: <strong>O(1)</strong> (in-place)."
    }
  ],

  howItWorksTogether: "Insertion Sort treats index 0 as an initially sorted sub-array of length 1. Starting at index `i = 1`, it saves `arr[i]` into a temporary variable called `key`. It then initializes a pointer `j = i - 1` and walks backwards towards index 0. For each element `arr[j]` that is strictly greater than `key`, it shifts `arr[j]` one position right into `arr[j + 1]`. As soon as it encounters an element `<= key` (or reaches the beginning of the array), the shifting stops, and `key` is inserted into `arr[j + 1]`. The sorted portion now spans from 0 to `i`.",

  whyMatters: "Despite its O(n²) worst-case bound, Insertion Sort is one of the most practically useful elementary sorting algorithms in computing. High-performance hybrid algorithms like V8's Timsort and introsort switch to Insertion Sort for subarrays smaller than 16–32 items because its low overhead, cache-friendly sequential memory access, and O(n) performance on nearly sorted data outperform divide-and-conquer methods at small scale.",

  analogy: {
    title: "Real-World Analogy: Sorting Playing Cards in Your Hand",
    text: "Imagine being dealt playing cards one by one. You hold the cards you've already received in a sorted fan in your left hand. When you draw a new card from the table (the 'key'), you look at your fan from right to left, slide the higher cards over to make space, and slip the new card directly into its correct numerical slot. That is exactly how Insertion Sort works!"
  },

  interactiveWidget: "insertion-sort",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: `<code>// Initial Array: [8, 3, 7, 4, 2, 6, 1, 5]
// Index 0 ([8]) is initially sorted.
//
// Iteration 1 (i = 1, key = 3):
// Compare arr[0] (8) > 3 -> TRUE -> Shift 8 right to index 1 -> [8, 8, 7, ...]
// j reaches -1 -> Insert key 3 at index 0 -> [3, 8, 7, 4, 2, 6, 1, 5]
//
// Iteration 2 (i = 2, key = 7):
// Compare arr[1] (8) > 7 -> TRUE -> Shift 8 right to index 2 -> [3, 8, 8, ...]
// Compare arr[0] (3) > 7 -> FALSE -> Stop shifting!
// Insert key 7 at index 1 -> [3, 7, 8, 4, 2, 6, 1, 5]
//
// Iterations continue:
// Final Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8]</code>`,
    referenceText: "Notice how elements shift right via single assignments rather than reciprocal swaps. Once the proper slot is found, the key is inserted directly."
  },

  visual: {
    caption: "Figure 1: Insertion Sort picking key 4, shifting 8 and 7 right, and inserting 4 at index 1.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="230" fill="var(--bg-body)" rx="12" />
        <text x="380" y="26" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Insertion Sort: Extracting Key &amp; Backward Shifting</text>
        
        <g transform="translate(40, 55)">
          <!-- Sorted Region (3, 7, 8) -->
          <g transform="translate(0, 30)">
            <rect width="64" height="60" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">3</text>
            <text x="32" y="78" fill="#10B981" font-size="10" font-weight="600" text-anchor="middle">SORTED</text>
          </g>

          <!-- Shifted 7 -->
          <g transform="translate(80, 20)">
            <rect width="64" height="70" fill="rgba(6,182,212,0.18)" stroke="#06B6D4" stroke-width="1.5" rx="6"/>
            <text x="32" y="42" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">7</text>
            <text x="32" y="90" fill="#06B6D4" font-size="10" font-weight="600" text-anchor="middle">SHIFT &rarr;</text>
          </g>

          <!-- Shifted 8 -->
          <g transform="translate(160, 0)">
            <rect width="64" height="90" fill="rgba(6,182,212,0.18)" stroke="#06B6D4" stroke-width="1.5" rx="6"/>
            <text x="32" y="52" fill="var(--text-primary)" font-size="18" font-weight="800" text-anchor="middle">8</text>
            <text x="32" y="110" fill="#06B6D4" font-size="10" font-weight="600" text-anchor="middle">SHIFT &rarr;</text>
          </g>

          <!-- Extracted Key (4) floating above -->
          <g transform="translate(240, -15)">
            <rect width="64" height="50" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="2.5" rx="6"/>
            <text x="32" y="32" fill="#F59E0B" font-size="18" font-weight="800" text-anchor="middle">4</text>
            <text x="32" y="70" fill="#F59E0B" font-size="10" font-weight="700" text-anchor="middle">KEY [i=3]</text>
          </g>

          <!-- Unsorted Items -->
          <g transform="translate(320, 45)">
            <rect width="64" height="45" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="28" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">2</text>
            <text x="32" y="65" fill="var(--text-muted)" font-size="10" text-anchor="middle">[4]</text>
          </g>

          <g transform="translate(400, 20)">
            <rect width="64" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="42" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">6</text>
            <text x="32" y="90" fill="var(--text-muted)" font-size="10" text-anchor="middle">[5]</text>
          </g>

          <g transform="translate(480, 55)">
            <rect width="64" height="35" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="24" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">1</text>
            <text x="32" y="55" fill="var(--text-muted)" font-size="10" text-anchor="middle">[6]</text>
          </g>

          <g transform="translate(560, 25)">
            <rect width="64" height="65" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="38" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">5</text>
            <text x="32" y="85" fill="var(--text-muted)" font-size="10" text-anchor="middle">[7]</text>
          </g>
        </g>

        <!-- Insertion path -->
        <path d="M 272 80 Q 200 40 112 85" stroke="#F59E0B" stroke-width="2" fill="none" stroke-dasharray="4 4" marker-end="url(#arrowhead)"/>
        <text x="380" y="210" fill="#06B6D4" font-size="11" font-weight="600" text-anchor="middle">8 and 7 shift right to vacancies &rarr; Key 4 inserts at index 1</text>
      </svg>
    `
  },

  codeSnippet: `function insertionSort(arr) {
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = key;
  }

  return result;
}`,

  codeExplanation: [
    {
      line: "Line 2: const result = [...arr];",
      desc: "Clones the input array to avoid in-place mutation of the input argument."
    },
    {
      line: "Line 4: for (let i = 1; i < result.length; i++)",
      desc: "Starts at index 1 because a single-element array `[result[0]]` is already trivially sorted. The outer loop will insert elements `result[1]` through `result[n - 1]` one by one."
    },
    {
      line: "Line 5: const key = result[i];",
      desc: "Saves the value of `result[i]` in `key`. Because this slot will be overwritten during shifting, copying it first is essential."
    },
    {
      line: "Line 6: let j = i - 1;",
      desc: "Initializes pointer `j` to the rightmost index of the already sorted sub-array. Comparisons and shifts will proceed backwards towards 0."
    },
    {
      line: "Line 8: while (j >= 0 && result[j] > key)",
      desc: "The inner loop condition: while `j` is within bounds AND the element in the sorted hand is strictly larger than our `key`, we need to make room."
    },
    {
      line: "Line 9–10: result[j + 1] = result[j]; j--;",
      desc: "Shifts the larger element one position to the right into index `j + 1`, and moves pointer `j` one step to the left."
    },
    {
      line: "Line 13: result[j + 1] = key;",
      desc: "Once the while loop terminates (either because an element `<= key` was found or `j` reached -1), the vacant slot at index `j + 1` is exactly where `key` belongs!"
    },
    {
      line: "Line 16: return result;",
      desc: "Returns the fully sorted array copy."
    }
  ],

  complexityNotes: [
    "Best-Case Time Complexity: O(n) — occurs when the array is already sorted. The `while (result[j] > key)` condition fails on the very first comparison for every element, resulting in only n - 1 comparisons and 0 shifts.",
    "Average-Case Time Complexity: O(n²) — on random data, each key shifts through approximately half of the sorted sub-array, requiring ~(n²)/4 comparisons and shifts.",
    "Worst-Case Time Complexity: O(n²) — occurs when the array is reverse sorted. Every new key must shift past every single element in the sorted hand, requiring n(n - 1) / 2 comparisons and shifts.",
    "Auxiliary Space Complexity: O(1) Auxiliary Space — executes strictly in-place with just two index variables (`i`, `j`) and a scalar `key`.",
    "Stability: Stable — equal elements do not trigger `result[j] > key`, so identical elements never jump past each other."
  ],

  tradeOffs: {
    title: "Insertion Sort: Advantages and Limitations",
    corePoint: "Insertion Sort is exceptionally fast for small or nearly sorted arrays and operates efficiently in memory streams.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Extremely efficient for small arrays (n &lt; 20).</li>
            <li>Adaptive: O(n) runtime on already or partially sorted data.</li>
            <li>Stable sorting algorithm.</li>
            <li>Online algorithm: can sort items as they arrive in real-time.</li>
            <li>Low constant overhead compared to Merge Sort and Quick Sort.</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Limitations:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>O(n²) worst-case runtime makes it impractical for large datasets.</li>
            <li>Performs many write operations (shifts) when data is in reverse order.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "When to use: Small collections (n &lt; 20), data streams that arrive sequentially, or as the base-case cutoff inside advanced algorithms like Timsort and Introsort."
  },

  comparison: {
    title: "Sorting Algorithms Comparison Matrix (Section 9)",
    html: `
      <p style="color:var(--text-secondary); margin-bottom:14px; line-height:1.6;">
        Below is the comprehensive complexity and resource matrix comparing all five Level 3 sorting algorithms.
      </p>

      <div class="concept-table-responsive">
        <table class="concept-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best Case</th>
              <th>Average Case</th>
              <th>Worst Case</th>
              <th>Extra Space (Auxiliary)</th>
              <th>Stability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bubble Sort</strong></td>
              <td>O(n)*</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Stable</td>
            </tr>
            <tr>
              <td><strong>Selection Sort</strong></td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Unstable</td>
            </tr>
            <tr style="background:rgba(99,102,241,0.08);">
              <td><strong>Insertion Sort (Active)</strong></td>
              <td>O(n)</td>
              <td>O(n²)</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Stable</td>
            </tr>
            <tr>
              <td><strong>Merge Sort</strong></td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Stable</td>
            </tr>
            <tr>
              <td><strong>Quick Sort</strong></td>
              <td>O(n log n)</td>
              <td>O(n log n)</td>
              <td>O(n²)</td>
              <td>O(log n) stack (O(n) worst)</td>
              <td>Unstable</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background:var(--bg-surface); padding:16px 20px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
        <p><strong>Why Insertion Sort is the Small-Array Champion:</strong> Even though asymptotically O(n²), Insertion Sort has the smallest constant factors of any comparison sorting algorithm. Modern standard library sorts (like Java's Dual-Pivot QuickSort and Python/V8's TimSort) literally switch to Insertion Sort once subarrays fall below 16–32 elements!</p>
      </div>
    `
  },

  commonMistakes: [
    {
      title: "Mistake 1: Swapping Instead of Shifting",
      desc: "Using full 3-line swaps inside the <code>while</code> loop instead of simple right-shifts (<code>result[j + 1] = result[j]</code>) triples the memory write overhead. Copying right and inserting `key` once at the end is twice as fast."
    },
    {
      title: "Mistake 2: Forgetting the Boundary Check `j >= 0`",
      desc: "Omitting <code>j >= 0</code> in the while condition causes `result[-1]` to be checked, reading `undefined` and causing comparison errors or infinite loops."
    },
    {
      title: "Mistake 3: Overwriting the Key",
      desc: "Failing to store <code>const key = result[i]</code> before shifting begins will cause the key to be permanently overwritten by the first element that shifts right!"
    }
  ],

  practice: [
    {
      q: "Question 1: What is the best-case time complexity of Insertion Sort and when does it occur?",
      a: "O(n) time. It occurs when the array is already sorted. The condition `result[j] > key` immediately evaluates to false for each element, requiring only 1 comparison per element and 0 shifts."
    },
    {
      q: "Question 2: Why is Insertion Sort preferred over Quick Sort or Merge Sort for tiny arrays (e.g. n < 16)?",
      a: "Because Insertion Sort has virtually zero setup overhead, excellent CPU cache locality, and requires no recursive call stacks or auxiliary buffers."
    },
    {
      q: "Question 3: Why is the key placed at index `j + 1` rather than index `j`?",
      a: "Because `j` was decremented one step past the valid insertion spot inside the loop, or because `result[j]` is the first element smaller than or equal to `key`, so `key` belongs immediately after it."
    }
  ],

  generalSortingPractice: {
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Insertion", slug: "merge-sorted-array" },
      { num: 147, title: "Insertion Sort List", difficulty: "Medium", concept: "Linked List / Insertion Sort", slug: "insertion-sort-list" },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Sorting Algorithms", slug: "sort-an-array" }
    ]
  }
};
