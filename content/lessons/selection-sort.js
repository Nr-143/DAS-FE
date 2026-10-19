/**
 * DSA Tracker — Lesson Content: Selection Sort (Level 3 — Topic 21)
 * ─────────────────────────────────────────────────────────────────
 * Complete, beginner-friendly guide to Selection Sort:
 * Finding Minimums, Unsorted Window Scanning, One-Swap-Per-Pass,
 * Step-by-Step Visualizations, Exact JavaScript Code, Complexity Analysis,
 * Comparison Table, and Practice Questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["selection-sort"] = {
  id: "selection-sort",
  title: "Selection Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand selection-based sorting: methodically scanning the unsorted portion of an array to locate the minimum element and swapping it into place at most once per pass.",

  definitions: [
    {
      term: "Selection Sort",
      def: "An in-place comparison sort that divides the array into a sorted sublist (left) and an unsorted sublist (right). Each pass searches the unsorted sublist for the smallest element and swaps it with the leftmost unsorted element."
    },
    {
      term: "Minimum Element Index (`minIndex`)",
      def: "A tracking pointer storing the index of the smallest value found so far during the current scan of the unsorted sublist."
    },
    {
      term: "One Swap Per Pass",
      def: "Unlike Bubble Sort which swaps constantly whenever adjacent items are inverted, Selection Sort performs at most <strong>one swap per pass</strong> (at most n - 1 swaps total), drastically reducing memory writes."
    },
    {
      term: "Sorted vs. Unsorted Regions",
      def: "The sorted region begins empty on the left and expands by 1 element with each pass. The unsorted region occupies the remaining right portion and shrinks by 1 element each pass."
    },
    {
      term: "Time & Space Complexity",
      def: "Best, Average, and Worst Case: <strong>O(n²)</strong> time. Auxiliary Space: <strong>O(1)</strong> (in-place). Total Swaps: <strong>O(n)</strong>."
    }
  ],

  howItWorksTogether: "Selection Sort operates in systematic passes. On pass i (from index 0 to n - 2), it designates index i as the target destination. It assumes the element at index i is the initial minimum (`minIndex = i`). It then scans the rest of the array (`j = i + 1` to n - 1), updating `minIndex` whenever a smaller value is discovered. Once the scan is complete, it swaps `arr[i]` with `arr[minIndex]` if a smaller value was found. The sorted boundary now expands to include index i.",

  whyMatters: "Selection Sort's primary architectural advantage is that it minimizes memory writes. Because it executes at most n - 1 swaps across its entire execution (O(n) swaps compared to Bubble Sort's O(n²) swaps), it is useful in hardware environments where flash memory or EEPROM writes are computationally expensive or physically degrade the storage medium.",

  analogy: {
    title: "Real-World Analogy: Selecting the Shortest Student for a Photo",
    text: "Imagine arranging a class of students in height order for a school photo. You look across all the students standing in line, pick out the absolute shortest student, and invite them to take the first spot on the left. Then you scan the remaining students, find the shortest among them, and place them in the second spot. You repeat this until everyone is in order. You only moved each person at most once!"
  },

  interactiveWidget: "selection-sort",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: `<code>// Initial Array: [8, 3, 7, 4, 2, 6, 1, 5]
// Pass 1 (i = 0):
// Target spot: index 0. Initial minIndex = 0 (val 8).
// Scan j = 1..7:
//   arr[1]=3 < 8 -> minIndex=1 (val 3)
//   arr[2]=7 >= 3
//   arr[3]=4 >= 3
//   arr[4]=2 < 3 -> minIndex=4 (val 2)
//   arr[5]=6 >= 2
//   arr[6]=1 < 2 -> minIndex=6 (val 1)
//   arr[7]=5 >= 1
// End of pass: minIndex is 6 (val 1). Swap arr[0] and arr[6].
// Array becomes: [1 | 3, 7, 4, 2, 6, 8, 5] (1 is locked at index 0)
//
// Passes continue until sorted:
// Final Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8]</code>`,
    referenceText: "Notice the clear distinction between finding the minimum (scanning indices 1 through 7) and moving it (performing exactly one swap at the end of the pass)."
  },

  visual: {
    caption: "Figure 1: Selection Sort scanning unsorted portion to find minimum value 1, then swapping it with front index 0.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="230" fill="var(--bg-body)" rx="12" />
        <text x="380" y="26" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Selection Sort: Scanning Unsorted Region for Minimum Candidate</text>
        
        <g transform="translate(40, 55)">
          <!-- Cell 0 (Target i = 0, current val 8) -->
          <g transform="translate(0, 0)">
            <rect width="64" height="90" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="2" rx="6"/>
            <text x="32" y="46" fill="#6366F1" font-size="18" font-weight="800" text-anchor="middle">8</text>
            <text x="32" y="110" fill="#6366F1" font-size="10" font-weight="700" text-anchor="middle">[0] TARGET i</text>
          </g>

          <!-- Cell 1 (3) -->
          <g transform="translate(80, 20)">
            <rect width="64" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="40" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">3</text>
            <text x="32" y="90" fill="var(--text-muted)" font-size="10" text-anchor="middle">[1]</text>
          </g>

          <!-- Cell 2 (7) -->
          <g transform="translate(160, 10)">
            <rect width="64" height="80" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="46" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">7</text>
            <text x="32" y="100" fill="var(--text-muted)" font-size="10" text-anchor="middle">[2]</text>
          </g>

          <!-- Cell 3 (4) -->
          <g transform="translate(240, 30)">
            <rect width="64" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">4</text>
            <text x="32" y="80" fill="var(--text-muted)" font-size="10" text-anchor="middle">[3]</text>
          </g>

          <!-- Cell 4 (2) -->
          <g transform="translate(320, 45)">
            <rect width="64" height="45" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="28" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">2</text>
            <text x="32" y="65" fill="var(--text-muted)" font-size="10" text-anchor="middle">[4]</text>
          </g>

          <!-- Cell 5 (6) -->
          <g transform="translate(400, 20)">
            <rect width="64" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="42" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">6</text>
            <text x="32" y="90" fill="var(--text-muted)" font-size="10" text-anchor="middle">[5]</text>
          </g>

          <!-- Cell 6 (1: MIN FOUND) -->
          <g transform="translate(480, 55)">
            <rect width="64" height="35" fill="rgba(236,72,153,0.25)" stroke="#EC4899" stroke-width="2.5" rx="6"/>
            <text x="32" y="24" fill="#EC4899" font-size="18" font-weight="800" text-anchor="middle">1</text>
            <text x="32" y="55" fill="#EC4899" font-size="10" font-weight="700" text-anchor="middle">[6] MIN</text>
          </g>

          <!-- Cell 7 (5) -->
          <g transform="translate(560, 25)">
            <rect width="64" height="65" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="32" y="38" fill="var(--text-primary)" font-size="15" font-weight="700" text-anchor="middle">5</text>
            <text x="32" y="85" fill="var(--text-muted)" font-size="10" text-anchor="middle">[7]</text>
          </g>
        </g>

        <!-- Swap curve -->
        <path d="M 72 195 Q 296 230 520 195" stroke="#8B5CF6" stroke-width="2" fill="none" stroke-dasharray="4 4" marker-end="url(#arrowhead)"/>
        <text x="380" y="215" fill="#8B5CF6" font-size="11" font-weight="600" text-anchor="middle">Single Swap at End of Pass: arr[0] (8) &harr; arr[6] (1)</text>
      </svg>
    `
  },

  codeSnippet: `function selectionSort(arr) {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [result[i], result[minIndex]] =
        [result[minIndex], result[i]];
    }
  }

  return result;
}`,

  codeExplanation: [
    {
      line: "Line 2: const result = [...arr];",
      desc: "Creates a fresh clone of the input array so the original parameter is not mutated."
    },
    {
      line: "Line 4: for (let i = 0; i < result.length - 1; i++)",
      desc: "The outer loop tracks `i`, which is the boundary between the sorted portion [0..i-1] and the unsorted portion [i..n-1]. Index `i` is the target destination where the smallest unsorted element will be placed."
    },
    {
      line: "Line 5: let minIndex = i;",
      desc: "Initializes `minIndex` to `i`, tentatively assuming the first element in the unsorted region is the smallest until proven otherwise."
    },
    {
      line: "Line 7: for (let j = i + 1; j < result.length; j++)",
      desc: "The inner loop variable `j` inspects every subsequent element in the unsorted region to find if any element is smaller than `arr[minIndex]`."
    },
    {
      line: "Line 8–10: if (result[j] < result[minIndex]) { minIndex = j; }",
      desc: "If element at index `j` is strictly smaller than the current minimum, updates `minIndex = j`. Notice: no swaps happen here, only the index pointer is updated!"
    },
    {
      line: "Line 13–16: if (minIndex !== i) { ... }",
      desc: "After the inner loop finishes scanning the entire unsorted region, if `minIndex` changed, swaps `result[i]` with `result[minIndex]`. This limits swaps to at most 1 per pass!"
    },
    {
      line: "Line 19: return result;",
      desc: "Returns the fully sorted array copy."
    }
  ],

  complexityNotes: [
    "Best-Case Time Complexity: O(n²) — even if the array is already sorted, the inner loop still must scan every single element to confirm that no smaller value exists. There is no natural early-termination in standard Selection Sort.",
    "Average-Case Time Complexity: O(n²) — requires (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2 comparisons on average.",
    "Worst-Case Time Complexity: O(n²) — requires n(n - 1) / 2 comparisons regardless of whether the array is random or reverse sorted.",
    "Total Swaps: O(n) — performs at most n - 1 swaps in total. This is significantly fewer than Bubble Sort or Insertion Sort, which can perform up to O(n²) swaps/shifts.",
    "Auxiliary Space Complexity: O(1) Auxiliary Space — executes in-place, requiring only pointer variables (i, j, minIndex)."
  ],

  tradeOffs: {
    title: "Selection Sort: Strengths and Trade-offs",
    corePoint: "Selection Sort performs O(n²) comparisons in all cases, but guarantees at most O(n) total memory swaps.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Performs at most n - 1 swaps total (optimal memory write efficiency).</li>
            <li>In-place algorithm requiring O(1) auxiliary space.</li>
            <li>Easy to reason about and teach step-by-step.</li>
            <li>Performance is deterministic (always exactly the same number of comparisons).</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Limitations:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>O(n²) time in ALL cases (does not adapt to already-sorted input).</li>
            <li>Unstable sort by default (long-distance swaps can reorder identical elements).</li>
            <li>Much slower than O(n log n) algorithms for datasets larger than ~50 items.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "When to use: When writing to memory is vastly more expensive than reading from memory (such as write-constrained EEPROM or Flash drives)."
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
            <tr style="background:rgba(99,102,241,0.08);">
              <td><strong>Selection Sort (Active)</strong></td>
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
        <p><strong>Why Selection Sort is O(n²) in the Best Case:</strong> Unlike Bubble Sort and Insertion Sort which can terminate early when data is sorted, Selection Sort has no mechanism to know if smaller items remain without inspecting the entire unsorted region.</p>
        <p><strong>Why Selection Sort is Unstable:</strong> Long-distance swaps can jump an element over identical elements. For example, sorting <code>[4a, 4b, 2]</code> swaps <code>4a</code> with <code>2</code>, resulting in <code>[2, 4b, 4a]</code>, inverting the original relative order of <code>4a</code> and <code>4b</code>.</p>
      </div>
    `
  },

  commonMistakes: [
    {
      title: "Mistake 1: Swapping Inside the Inner Loop",
      desc: "A common beginner error is swapping <code>arr[i]</code> with <code>arr[j]</code> immediately inside the <code>for (j)</code> loop. That turns the algorithm into a slow variation of Bubble Sort! The inner loop should only update <code>minIndex</code>; the swap must occur strictly after the inner loop finishes."
    },
    {
      title: "Mistake 2: Storing the Minimum Value Instead of Its Index",
      desc: "Storing <code>let minVal = arr[i]</code> makes it impossible to know where to perform the swap later. You must store <code>minIndex</code>."
    },
    {
      title: "Mistake 3: Starting the Inner Loop from Index 0 or i",
      desc: "Starting <code>j</code> from <code>0</code> or <code>i</code> wastes comparisons. Since index <code>i</code> is already considered the tentative minimum, <code>j</code> should always start at <code>i + 1</code>."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the maximum number of swaps Selection Sort will perform on an array of length n?",
      a: "At most n - 1 swaps. Each of the n - 1 outer passes performs at most one swap."
    },
    {
      q: "Question 2: Why does Selection Sort take O(n²) time even if the array is already sorted?",
      a: "Because the inner loop scans every element in the remaining unsorted sublist regardless of data order. It cannot know if a smaller number exists without checking every single cell."
    },
    {
      q: "Question 3: Why is Selection Sort considered an unstable sorting algorithm?",
      a: "Because its swap moves an element across arbitrary distances, which can push an earlier duplicate behind a later identical element (e.g. [5a, 5b, 1] becomes [1, 5b, 5a])."
    }
  ],

  generalSortingPractice: {
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Sorting", slug: "merge-sorted-array" },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Sorting Algorithms", slug: "sort-an-array" },
      { num: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", concept: "Selection / Quickselect", slug: "kth-largest-element-in-an-array" }
    ]
  }
};
