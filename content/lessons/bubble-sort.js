/**
 * DSA Tracker — Lesson Content: Bubble Sort (Level 3 — Topic 20)
 * ─────────────────────────────────────────────────────────────
 * Complete, beginner-friendly guide to Bubble Sort:
 * Concepts, Neighbor Swaps, Passes, Early-Exit Optimization,
 * Step-by-Step Animations, Exact JavaScript Code, Complexity Analysis,
 * Comparison Table, Real-World Use, and Practice Challenges.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["bubble-sort"] = {
  id: "bubble-sort",
  title: "Bubble Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the classic neighbor-comparison sorting algorithm that floats the largest unsorted values to the end of the array on each pass.",

  definitions: [
    {
      term: "Sorting",
      def: "The algorithmic process of rearranging a collection of items into a systematic order (most commonly ascending numerical or alphabetical order) so data can be searched and processed efficiently."
    },
    {
      term: "Bubble Sort",
      def: "A comparison-based sorting algorithm that repeatedly walks through the array, compares adjacent neighboring elements, and swaps them if they are in the wrong order."
    },
    {
      term: "Pass",
      def: "One complete iteration through the unsorted portion of the array. During each pass, the largest unsorted element \"bubbles up\" to its final sorted position at the right."
    },
    {
      term: "Neighbor Swapping",
      def: "Bubble Sort only ever compares elements directly adjacent to each other: <code>arr[j]</code> and <code>arr[j + 1]</code>. If <code>arr[j] > arr[j + 1]</code>, their positions are swapped."
    },
    {
      term: "Early-Exit Optimization",
      def: "By tracking a boolean flag <code>swapped</code> during each pass, the algorithm can terminate immediately if a full pass completes with zero swaps, proving the array is already sorted in <strong>O(n)</strong> time."
    },
    {
      term: "Time & Space Complexity",
      def: "Best Case: <strong>O(n)</strong> (when already sorted with early exit). Average Case: <strong>O(n²)</strong>. Worst Case: <strong>O(n²)</strong> (reverse-sorted array). Auxiliary Space: <strong>O(1)</strong> (in-place)."
    }
  ],

  howItWorksTogether: "Bubble Sort operates by repeatedly comparing adjacent neighbors from left to right. Whenever a left element is larger than its right neighbor, they swap places. By the end of Pass 1, the largest element in the entire array is guaranteed to have floated to the very last index (n - 1). On Pass 2, the second-largest element settles at index n - 2, and so forth. With each pass, the unsorted window shrinks by 1 element. If a pass finishes without performing any swaps, the array is already sorted and the algorithm terminates immediately.",

  whyMatters: "While Bubble Sort is rarely used in large-scale production due to its O(n²) worst-case runtime, it is the foundational algorithm for teaching sorting concepts. It clearly demonstrates key computer science principles: adjacent comparisons, loop invariants, state flags, and early-termination optimizations. For tiny arrays (less than 10 items) that are already almost sorted, an optimized Bubble Sort can finish in a single quick O(n) pass.",

  analogy: {
    title: "Real-World Analogy: Carbonated Bubbles in Soda",
    text: "Think of carbonated bubbles rising through a glass of soda. Larger bubbles are more buoyant and naturally push past smaller ones to float to the top of the glass first. Similarly, on each pass of Bubble Sort, the heaviest (largest) numbers float past their lighter neighbors until they settle at the top (the end) of the array!"
  },

  interactiveWidget: "bubble-sort",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: `<code>// Initial Array: [8, 3, 7, 4, 2, 6, 1, 5]
// Pass 1:
// Compare [8, 3]: 8 > 3 -> SWAP -> [3, 8, 7, 4, 2, 6, 1, 5]
// Compare [8, 7]: 8 > 7 -> SWAP -> [3, 7, 8, 4, 2, 6, 1, 5]
// Compare [8, 4]: 8 > 4 -> SWAP -> [3, 7, 4, 8, 2, 6, 1, 5]
// Compare [8, 2]: 8 > 2 -> SWAP -> [3, 7, 4, 2, 8, 6, 1, 5]
// Compare [8, 6]: 8 > 6 -> SWAP -> [3, 7, 4, 2, 6, 8, 1, 5]
// Compare [8, 1]: 8 > 1 -> SWAP -> [3, 7, 4, 2, 6, 1, 8, 5]
// Compare [8, 5]: 8 > 5 -> SWAP -> [3, 7, 4, 2, 6, 1, 5, 8]
// Result of Pass 1: Element 8 is locked at index 7!
//
// Passes continue until all elements settle or swapped === false.
// Final Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8]</code>`,
    referenceText: "Notice how 8, the maximum number, walked step-by-step from index 0 all the way to index 7 in a single pass. Subsequent passes will float 7 to index 6, 6 to index 5, and so on."
  },

  visual: {
    caption: "Figure 1: Bubble Sort adjacent comparison and bubbling mechanism on [8, 3, 7, 4, 2, 6, 1, 5].",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="230" fill="var(--bg-body)" rx="12" />
        <text x="380" y="26" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Bubble Sort: Neighbor Comparison &amp; Floating Max</text>
        
        <g transform="translate(40, 55)">
          <!-- Bar 0 (3) -->
          <g transform="translate(0, 40)">
            <rect width="64" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">3</text>
            <text x="32" y="80" fill="var(--text-muted)" font-size="10" text-anchor="middle">[0]</text>
          </g>

          <!-- Bar 1 (7) -->
          <g transform="translate(80, 20)">
            <rect width="64" height="80" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="46" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">7</text>
            <text x="32" y="100" fill="var(--text-muted)" font-size="10" text-anchor="middle">[1]</text>
          </g>

          <!-- Bar 2 (8: active compare) -->
          <g transform="translate(160, 0)">
            <rect width="64" height="100" fill="rgba(245,158,11,0.22)" stroke="#F59E0B" stroke-width="2" rx="6"/>
            <text x="32" y="56" fill="#F59E0B" font-size="18" font-weight="800" text-anchor="middle">8</text>
            <text x="32" y="120" fill="#F59E0B" font-size="10" font-weight="700" text-anchor="middle">[2] CMP</text>
          </g>

          <!-- Bar 3 (4: active compare) -->
          <g transform="translate(240, 50)">
            <rect width="64" height="50" fill="rgba(245,158,11,0.22)" stroke="#F59E0B" stroke-width="2" rx="6"/>
            <text x="32" y="32" fill="#F59E0B" font-size="18" font-weight="800" text-anchor="middle">4</text>
            <text x="32" y="70" fill="#F59E0B" font-size="10" font-weight="700" text-anchor="middle">[3] CMP</text>
          </g>

          <!-- Bar 4 (2) -->
          <g transform="translate(320, 60)">
            <rect width="64" height="40" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="26" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">2</text>
            <text x="32" y="60" fill="var(--text-muted)" font-size="10" text-anchor="middle">[4]</text>
          </g>

          <!-- Bar 5 (6) -->
          <g transform="translate(400, 30)">
            <rect width="64" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="42" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">6</text>
            <text x="32" y="90" fill="var(--text-muted)" font-size="10" text-anchor="middle">[5]</text>
          </g>

          <!-- Bar 6 (1) -->
          <g transform="translate(480, 70)">
            <rect width="64" height="30" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="22" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">1</text>
            <text x="32" y="50" fill="var(--text-muted)" font-size="10" text-anchor="middle">[6]</text>
          </g>

          <!-- Bar 7 (5) -->
          <g transform="translate(560, 35)">
            <rect width="64" height="65" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="38" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">5</text>
            <text x="32" y="85" fill="var(--text-muted)" font-size="10" text-anchor="middle">[7]</text>
          </g>
        </g>

        <path d="M 230 190 Q 270 170 310 190" stroke="#8B5CF6" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        <text x="380" y="210" fill="#F59E0B" font-size="11" font-weight="600" text-anchor="middle">8 &gt; 4 is TRUE &rarr; Swap positions so 8 keeps floating right</text>
      </svg>
    `
  },

  codeSnippet: `function bubbleSort(arr) {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] =
          [result[j + 1], result[j]];

        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return result;
}`,

  codeExplanation: [
    {
      line: "Line 2: const result = [...arr];",
      desc: "Creates a shallow clone of the input array. This preserves pure function behavior by avoiding direct mutations to the caller's original array."
    },
    {
      line: "Line 4: for (let i = 0; i < result.length - 1; i++)",
      desc: "The outer loop controls the passes. Each pass places the next largest unsorted element into its final position at the end. After n - 1 passes, the entire array is guaranteed to be sorted."
    },
    {
      line: "Line 5: let swapped = false;",
      desc: "Initializes the early-exit optimization flag at the start of each pass. If no adjacent elements are out of order during this pass, swapped remains false."
    },
    {
      line: "Line 7: for (let j = 0; j < result.length - i - 1; j++)",
      desc: "The inner loop walks through the unsorted portion of the array. The bound `length - i - 1` ensures we do not waste comparisons on elements that already settled at the right end."
    },
    {
      line: "Line 8–12: if (result[j] > result[j + 1]) { ... }",
      desc: "Compares neighboring elements. If the left element is larger than the right element, swaps them using ES6 array destructuring and marks `swapped = true`."
    },
    {
      line: "Line 15: if (!swapped) break;",
      desc: "The early-exit condition: if an entire pass finished without a single swap, the array is already sorted. The loop terminates immediately, achieving O(n) best-case time!"
    },
    {
      line: "Line 18: return result;",
      desc: "Returns the sorted array copy."
    }
  ],

  complexityNotes: [
    "Best-Case Time Complexity: O(n) — occurs when the input array is already completely sorted. With the early-exit flag, the inner loop runs once (n - 1 comparisons), detects 0 swaps, and terminates immediately.",
    "Average-Case Time Complexity: O(n²) — on random data, elements are out of order throughout the array, requiring ~(n²)/4 comparisons and ~(n²)/4 swaps.",
    "Worst-Case Time Complexity: O(n²) — occurs when the array is completely reversed (e.g. [8, 7, 6, 5, 4, 3, 2, 1]). Requires (n × (n - 1)) / 2 = 28 comparisons and 28 swaps for 8 items.",
    "Auxiliary Space Complexity: O(1) Auxiliary Space — Bubble Sort executes strictly in-place, requiring only a few scalar variables (i, j, swapped). Cloning `[...arr]` in the wrapper is an implementation preference for data immutability."
  ],

  tradeOffs: {
    title: "Bubble Sort: Advantages and Limitations",
    corePoint: "Bubble Sort trades runtime efficiency for absolute conceptual simplicity and zero extra memory.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Extremely easy to understand, implement, and visualize.</li>
            <li>Stable sorting algorithm: preserves relative order of equal elements.</li>
            <li>O(1) auxiliary space (operates in-place).</li>
            <li>Adaptive: detects already-sorted data in O(n) time with early-exit flag.</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Limitations:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>O(n²) time complexity scales terribly for large datasets.</li>
            <li>Performs many excessive memory writes (swaps) compared to Selection Sort.</li>
            <li>Much slower than O(n log n) algorithms like Merge Sort and Quick Sort.</li>
            <li>Unsuitable for production use except for tiny or nearly sorted arrays.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "When to use: Educational demonstrations, tiny embedded datasets with severe memory constraints, or sanity checks where code brevity is paramount."
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
            <tr style="background:rgba(99,102,241,0.08);">
              <td><strong>Bubble Sort (Active)</strong></td>
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
            <tr>
              <td><strong>Insertion Sort</strong></td>
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
        <p><strong>* Bubble Sort O(n) Best Case:</strong> Assumes the early-exit optimization flag (<code>swapped</code>) is implemented. Without this check, unoptimized Bubble Sort takes O(n²) even on an already sorted array!</p>
        <p><strong>Auxiliary Space vs. Implementation Copying:</strong> Algorithmic auxiliary space refers solely to the additional working memory required by the sorting logic itself. In pure algorithms, Bubble Sort is in-place (O(1)). In JavaScript, functions often clone inputs (<code>[...arr]</code>) to avoid mutating caller data, which is an application design choice rather than an algorithmic memory requirement.</p>
      </div>
    `
  },

  commonMistakes: [
    {
      title: "Mistake 1: Omitting the Early-Exit Flag",
      desc: "Forgetting the <code>let swapped = false;</code> flag and <code>if (!swapped) break;</code> check causes the algorithm to execute all n - 1 passes even when the array is already sorted, degrading best-case time from O(n) to O(n²)."
    },
    {
      title: "Mistake 2: Scanning Already Sorted Elements in the Inner Loop",
      desc: "Using <code>j < result.length - 1</code> instead of <code>j < result.length - i - 1</code> in the inner loop wastefully re-compares the elements at the end of the array that have already settled into their final positions."
    },
    {
      title: "Mistake 3: Off-By-One Index Errors",
      desc: "Using <code>j <= result.length - 1</code> inside the loop leads to checking <code>result[j + 1]</code> out of bounds, comparing against <code>undefined</code> and introducing subtle bugs."
    }
  ],

  practice: [
    {
      q: "Question 1: Why does Bubble Sort's inner loop stop at `length - i - 1` instead of `length - 1`?",
      a: "Because after `i` passes, the largest `i` elements have already floated to their permanent sorted positions at the end of the array. Comparing them again is redundant and wasteful."
    },
    {
      q: "Question 2: What enables Bubble Sort to achieve O(n) best-case time complexity?",
      a: "The early-exit boolean flag `swapped`. If pass 1 completes with zero swaps, `swapped` remains false and the algorithm terminates immediately after n - 1 comparisons."
    },
    {
      q: "Question 3: Is Bubble Sort a stable sorting algorithm? Why?",
      a: "Yes! Because elements only swap when `arr[j] > arr[j + 1]` (strictly greater). Equal elements are never swapped, preserving their original relative order."
    }
  ],

  generalSortingPractice: {
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Sorting", slug: "merge-sorted-array" },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Sorting Algorithms", slug: "sort-an-array" },
      { num: 75, title: "Sort Colors", difficulty: "Medium", concept: "Three Pointers / In-place Sort", slug: "sort-colors" }
    ]
  }
};
