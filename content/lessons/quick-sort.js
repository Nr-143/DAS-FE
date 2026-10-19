/**
 * DSA Tracker — Lesson Content: Quick Sort (Level 3 — Topic 24)
 * ─────────────────────────────────────────────────────────────
 * Complete, beginner-friendly guide to Quick Sort:
 * Divide and Conquer, Pivot Selection, Lomuto Partitioning Scheme,
 * In-Place Subarray Swapping, Step-by-Step Animations, Exact Code,
 * Complexity Analysis, Comparison Table, and Practice Questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["quick-sort"] = {
  id: "quick-sort",
  title: "Quick Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the industry-standard in-place divide-and-conquer algorithm: selecting a pivot, partitioning elements smaller to the left and larger to the right, and sorting partitions recursively.",

  definitions: [
    {
      term: "Quick Sort",
      def: "An efficient, in-place, divide-and-conquer sorting algorithm that selects an element as a <strong>pivot</strong> and partitions the surrounding array into elements strictly smaller than the pivot and elements greater than or equal to the pivot."
    },
    {
      term: "The Pivot",
      def: "A reference value chosen from the subarray around which all other elements are partitioned. In Lomuto's scheme, the last element (<code>arr[high]</code>) is deterministically selected as the pivot."
    },
    {
      term: "Partitioning",
      def: "The core rearrangement subroutine: iterates through the subarray, swapping values smaller than the pivot to the left side. At the end, the pivot is swapped into the boundary position between the two partitions, locking it into its <strong>permanent sorted index</strong>."
    },
    {
      term: "Lomuto Partition Scheme",
      def: "A clean, beginner-friendly partitioning algorithm that maintains a boundary pointer <code>i</code>. Elements at <code>j < high</code> smaller than the pivot swap with <code>arr[i]</code>, advancing <code>i++</code>. Finally, the pivot swaps with <code>arr[i]</code>."
    },
    {
      term: "Time & Space Complexity",
      def: "Best & Average Case: <strong>O(n log n)</strong> time. Worst Case: <strong>O(n²)</strong> (unbalanced partitions). Auxiliary Space: <strong>O(log n)</strong> average call stack (up to O(n) worst-case recursion depth)."
    }
  ],

  howItWorksTogether: "Quick Sort operates in two repeating stages: 1) <strong>Partition:</strong> Choose a pivot (here, the last element `result[high]`). Walk through the range from `low` to `high - 1`. Whenever an element is smaller than the pivot, swap it into the left partition (`result[i]`) and increment `i`. At the end, swap the pivot into index `i`. That pivot is now in its permanent final position! 2) <strong>Recursive Sort:</strong> Recursively call `sort(low, pivotIndex - 1)` on the left partition and `sort(pivotIndex + 1, high)` on the right partition. Because each partition excludes the locked pivot, the subarrays shrink until `low >= high` (the base case).",

  whyMatters: "Quick Sort is arguably the most widely used general-purpose comparison sort in software engineering. When implemented well (with median-of-three or randomized pivots), its cache locality and in-place swapping make it approximately 2x to 3x faster in practice than Merge Sort and Heapsort, despite sharing the same O(n log n) average asymptotic bound. It forms the core of many standard library sorting routines (such as C's `qsort` and C++ `std::sort`).",

  analogy: {
    title: "Real-World Analogy: Organizing Books by a Divider Marker",
    text: "Imagine you have a messy stack of 50 books and want to sort them by page count. You pick one book off the top and say: 'This is my pivot: it has 300 pages.' You quickly split the remaining books into two piles: thinner books (< 300 pages) on the left table, and thicker books (&ge; 300 pages) on the right table. You now place the 300-page book permanently right in the middle between the two tables. Then you repeat the exact same process on both tables until every book is in order!"
  },

  interactiveWidget: "quick-sort",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: `<code>// Initial Array: [8, 3, 7, 4, 2, 6, 1, 5]
// Range [0..7]: Pivot is last element = 5. Boundary i = 0.
//
// Walk j from 0 to 6:
//   arr[0] = 8 < 5 -> FALSE (stays right)
//   arr[1] = 3 < 5 -> TRUE -> Swap arr[i=0](8) with arr[j=1](3) -> i=1 -> [3, 8, 7, 4, 2, 6, 1, 5]
//   arr[2] = 7 < 5 -> FALSE
//   arr[3] = 4 < 5 -> TRUE -> Swap arr[i=1](8) with arr[j=3](4) -> i=2 -> [3, 4, 7, 8, 2, 6, 1, 5]
//   arr[4] = 2 < 5 -> TRUE -> Swap arr[i=2](7) with arr[j=4](2) -> i=3 -> [3, 4, 2, 8, 7, 6, 1, 5]
//   arr[5] = 6 < 5 -> FALSE
//   arr[6] = 1 < 5 -> TRUE -> Swap arr[i=3](8) with arr[j=6](1) -> i=4 -> [3, 4, 2, 1, 7, 6, 8, 5]
//
// End of loop: Swap pivot 5 with arr[i=4](7):
// Array becomes: [3, 4, 2, 1 | 5 | 6, 8, 7]
// PIVOT 5 IS NOW LOCKED AT INDEX 4!
// Left: [3, 4, 2, 1] (all < 5)  |  Right: [6, 8, 7] (all >= 5)
//
// Recursively sort left and right partitions:
// Final Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8]</code>`,
    referenceText: "Notice how Lomuto partitioning neatly separates smaller elements to the left of the pivot and larger elements to the right in a single linear pass of comparisons and swaps."
  },

  visual: {
    caption: "Figure 1: Quick Sort partitioning range [0..7] around pivot 5, locking 5 at index 4 with smaller items on the left.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="230" fill="var(--bg-body)" rx="12" />
        <text x="380" y="24" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Quick Sort: Lomuto Partitioning Around Pivot (5)</text>
        
        <g transform="translate(40, 55)">
          <!-- Left Partition (3, 4, 2, 1) < 5 -->
          <g transform="translate(0, 0)">
            <rect width="64" height="60" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">3</text>
            <text x="32" y="80" fill="#6366F1" font-size="10" font-weight="600" text-anchor="middle">&lt; Pivot</text>
          </g>

          <g transform="translate(80, 0)">
            <rect width="64" height="60" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">4</text>
            <text x="32" y="80" fill="#6366F1" font-size="10" font-weight="600" text-anchor="middle">&lt; Pivot</text>
          </g>

          <g transform="translate(160, 0)">
            <rect width="64" height="60" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">2</text>
            <text x="32" y="80" fill="#6366F1" font-size="10" font-weight="600" text-anchor="middle">&lt; Pivot</text>
          </g>

          <g transform="translate(240, 0)">
            <rect width="64" height="60" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">1</text>
            <text x="32" y="80" fill="#6366F1" font-size="10" font-weight="600" text-anchor="middle">&lt; Pivot</text>
          </g>

          <!-- LOCKED PIVOT (5) -->
          <g transform="translate(320, -10)">
            <rect width="68" height="80" fill="rgba(16,185,129,0.25)" stroke="#10B981" stroke-width="2.5" rx="6"/>
            <text x="34" y="46" fill="#10B981" font-size="20" font-weight="800" text-anchor="middle">5</text>
            <text x="34" y="100" fill="#10B981" font-size="10" font-weight="700" text-anchor="middle">[4] PIVOT LOCKED</text>
          </g>

          <!-- Right Partition (6, 8, 7) >= 5 -->
          <g transform="translate(400, 0)">
            <rect width="64" height="60" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">6</text>
            <text x="32" y="80" fill="#F59E0B" font-size="10" font-weight="600" text-anchor="middle">&ge; Pivot</text>
          </g>

          <g transform="translate(480, 0)">
            <rect width="64" height="60" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">8</text>
            <text x="32" y="80" fill="#F59E0B" font-size="10" font-weight="600" text-anchor="middle">&ge; Pivot</text>
          </g>

          <g transform="translate(560, 0)">
            <rect width="64" height="60" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="1.5" rx="6"/>
            <text x="32" y="36" fill="var(--text-primary)" font-size="16" font-weight="700" text-anchor="middle">7</text>
            <text x="32" y="80" fill="#F59E0B" font-size="10" font-weight="600" text-anchor="middle">&ge; Pivot</text>
          </g>
        </g>

        <text x="380" y="215" fill="var(--text-secondary)" font-size="12" font-weight="600" text-anchor="middle">Recursive step: QuickSort(left [0..3]) and QuickSort(right [5..7])</text>
      </svg>
    `
  },

  codeSnippet: `function quickSort(arr) {
  const result = [...arr];

  function partition(low, high) {
    const pivot = result[high];
    let i = low;

    for (let j = low; j < high; j++) {
      if (result[j] < pivot) {
        [result[i], result[j]] =
          [result[j], result[i]];

        i++;
      }
    }

    [result[i], result[high]] =
      [result[high], result[i]];

    return i;
  }

  function sort(low, high) {
    if (low >= high) return;

    const pivotIndex = partition(low, high);

    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, result.length - 1);
  return result;
}`,

  codeExplanation: [
    {
      line: "Line 2: const result = [...arr];",
      desc: "Creates a copy of the input array so the algorithm modifies its own internal array in-place without mutating the original argument."
    },
    {
      line: "Line 4: function partition(low, high) { ... }",
      desc: "The partitioning engine. Arranges elements in subarray range `[low..high]` relative to the selected pivot."
    },
    {
      line: "Line 5: const pivot = result[high];",
      desc: "Chooses the last element in the current subarray range as the pivot."
    },
    {
      line: "Line 6: let i = low;",
      desc: "Tracks the boundary where the next smaller element will be placed. Elements with indices `< i` are strictly `< pivot`."
    },
    {
      line: "Line 8–15: for (let j = low; j < high; j++) { ... }",
      desc: "Inspects elements from `low` to `high - 1`. If `result[j] < pivot`, swaps `result[i]` with `result[j]` and advances `i++`."
    },
    {
      line: "Line 17–18: [result[i], result[high]] = [result[high], result[i]];",
      desc: "Swaps the pivot into its final rightful spot at index `i`. All elements to its left are `< pivot`, and all elements to its right are `>= pivot`."
    },
    {
      line: "Line 20: return i;",
      desc: "Returns the locked pivot index to caller so recursion knows where to partition."
    },
    {
      line: "Line 23–24: if (low >= high) return;",
      desc: "Base case: a subarray of 0 or 1 element is already sorted."
    },
    {
      line: "Line 28–29: sort(low, pivotIndex - 1); sort(pivotIndex + 1, high);",
      desc: "Recursively sorts the left and right partitions independently, strictly excluding `pivotIndex` which is already settled."
    }
  ],

  complexityNotes: [
    "Best-Case Time Complexity: O(n log n) — occurs when the pivot consistently divides subarrays into roughly equal halves, producing a balanced recursion tree of height log₂(n).",
    "Average-Case Time Complexity: O(n log n) — with random data, partitions average a 1:3 to 1:1 split, retaining O(n log n) execution time with small constant factors.",
    "Worst-Case Time Complexity: O(n²) — occurs when the chosen pivot is consistently the absolute smallest or largest element (such as an already sorted array with last-element pivot). This creates an unbalanced, degenerated recursion tree of height n.",
    "Auxiliary Space Complexity: O(log n) average recursion call stack space. In the worst-case unbalanced tree, the call stack can reach O(n) depth.",
    "Stability: Unstable — long-distance swaps during partitioning can alter the relative order of identical elements."
  ],

  tradeOffs: {
    title: "Quick Sort: Strengths and Trade-offs",
    corePoint: "Quick Sort is the fastest in-place general-purpose sort in practice, but requires careful pivot selection to avoid O(n²) worst-case degradation.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Fastest practical comparison sorting algorithm for random in-memory data.</li>
            <li>In-place sorting: O(1) auxiliary heap space, O(log n) stack space.</li>
            <li>Cache-friendly sequential scanning during partitioning.</li>
            <li>Subproblems are partitioned before recursion (tail-call optimizable).</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Limitations:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>O(n²) worst-case time on adverse or pre-sorted input if naive pivots are used.</li>
            <li>Unstable sorting algorithm.</li>
            <li>Recursive call stack can reach O(n) depth in degenerate scenarios.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "When to use: Large in-memory datasets where maximum sorting speed is critical and memory footprint must remain minimal."
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
            <tr style="background:rgba(99,102,241,0.08);">
              <td><strong>Quick Sort (Active)</strong></td>
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
        <p><strong>Quick Sort Call Stack Space:</strong> Unlike Merge Sort which creates new arrays in memory (O(n) auxiliary heap space), Quick Sort moves elements directly inside the existing array. Its only memory overhead is the call stack frames created by recursive function invocations: <code>O(log n)</code> on average, but up to <code>O(n)</code> if the pivot splits elements into 0 and n - 1 items every time.</p>
        <p><strong>Mitigating Worst Case in Production:</strong> Industrial sorting implementations avoid the O(n²) worst-case by using randomized pivot selection or the 'median-of-three' rule (picking the median of first, middle, and last elements), making degenerate O(n²) cases virtually impossible.</p>
      </div>
    `
  },

  commonMistakes: [
    {
      title: "Mistake 1: Missing Base Case `low >= high`",
      desc: "Forgetting the base case check or using `low > high` instead of `>=` leads to infinite recursion when partitioning subarrays of length 1."
    },
    {
      title: "Mistake 2: Including the Pivot in Recursive Calls",
      desc: "Calling `sort(low, pivotIndex)` or `sort(pivotIndex, high)` will re-process the pivot indefinitely and cause stack overflow. The pivot is already at its final position and must be strictly excluded: `pivotIndex - 1` and `pivotIndex + 1`."
    },
    {
      title: "Mistake 3: Swapping Pivot to Index `j` Instead of `i`",
      desc: "At the end of partitioning, swapping the pivot with `result[j]` instead of `result[i]` places the pivot at an incorrect position, breaking the invariant that elements to the left are smaller."
    }
  ],

  practice: [
    {
      q: "Question 1: What does it mean when we say an element is 'in its final sorted position' after Quick Sort's partition step?",
      a: "It means every element to its left is smaller than it, and every element to its right is greater than or equal to it. Even though the left and right sides are not yet sorted among themselves, the pivot itself will never need to move again!"
    },
    {
      q: "Question 2: Under what conditions does Quick Sort degrade to O(n²) worst-case time?",
      a: "When the selected pivot is always the extreme minimum or maximum of the subarray (for example, using the last element as pivot on an already sorted or reverse-sorted array). This creates 1-element and (n-1)-element partitions, yielding a recursion depth of n."
    },
    {
      q: "Question 3: Why is Quick Sort generally preferred over Merge Sort for sorting arrays in memory?",
      a: "Because Quick Sort operates in-place without allocating O(n) auxiliary memory buffers, and its tight inner loop exhibits superior CPU cache line reuse."
    }
  ],

  generalSortingPractice: {
    problems: [
      { num: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", concept: "Quickselect / Partitioning", slug: "kth-largest-element-in-an-array" },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Quick Sort / Divide and Conquer", slug: "sort-an-array" },
      { num: 75, title: "Sort Colors", difficulty: "Medium", concept: "3-Way Partitioning (Dutch National Flag)", slug: "sort-colors" }
    ]
  }
};
