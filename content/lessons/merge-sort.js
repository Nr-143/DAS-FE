/**
 * DSA Tracker — Lesson Content: Merge Sort (Level 3 — Topic 23)
 * ─────────────────────────────────────────────────────────────
 * Complete, beginner-friendly guide to Merge Sort:
 * Divide and Conquer, Recursive Division, Two-Pointer Merge Step,
 * Split-and-Merge Visualizations, Exact JavaScript Code,
 * Complexity Analysis, Comparison Table, and Practice Questions.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["merge-sort"] = {
  id: "merge-sort",
  title: "Merge Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the premier divide-and-conquer sorting algorithm: recursively halving the array into single-element bases, then zipping sorted halves together in guaranteed O(n log n) time.",

  definitions: [
    {
      term: "Merge Sort",
      def: "A divide-and-conquer, comparison-based sorting algorithm that recursively breaks an array down into two halves until individual single-element arrays remain, and then repeatedly merges those sorted halves into larger sorted arrays."
    },
    {
      term: "Divide and Conquer",
      def: "An algorithmic paradigm that solves a complex problem by: 1) <strong>Divide</strong> the problem into smaller subproblems; 2) <strong>Conquer</strong> the subproblems recursively; 3) <strong>Combine</strong> (merge) their solutions to solve the original problem."
    },
    {
      term: "Base Case (`arr.length <= 1`)",
      def: "An array of 0 or 1 element is already inherently sorted by definition. This serves as the stopping condition for recursion."
    },
    {
      term: "The Merge Step",
      def: "The core sub-routine that takes two pre-sorted arrays (<code>left</code> and <code>right</code>), compares their heads using two pointers (<code>i</code> and <code>j</code>), and appends the smaller value into a merged result buffer in linear <strong>O(n)</strong> time."
    },
    {
      term: "Time & Space Complexity",
      def: "Best, Average, and Worst Case: <strong>O(n log n)</strong> time (guaranteed). Auxiliary Space: <strong>O(n)</strong> (for temporary merge arrays)."
    }
  ],

  howItWorksTogether: "Merge Sort operates in two distinct phases: 1) <strong>The Divide Phase:</strong> The algorithm finds the midpoint `mid = Math.floor(arr.length / 2)` and splits the array into `left` and `right` halves. It recursively calls `mergeSort` on both halves until single-element arrays are reached. 2) <strong>The Merge Phase:</strong> As recursive calls return from the leaves of the tree, the `merge(left, right)` helper compares the front elements of both sorted halves, moving the smaller element into a new buffer. Once one half is exhausted, any remaining elements from the other half are appended. The merged array returns up the recursion chain until the entire array is sorted.",

  whyMatters: "Merge Sort guarantees O(n log n) time in all circumstances — best, average, and worst case. Unlike Quick Sort, Merge Sort is immune to degenerate worst-case inputs and never degrades to O(n²). Because it is stable and accesses data sequentially rather than via random access, Merge Sort is the algorithm of choice for sorting linked lists and massive external datasets that exceed available RAM (external sorting).",

  analogy: {
    title: "Real-World Analogy: Sorting Exam Papers with an Assistant",
    text: "Imagine a teacher with a messy stack of 100 exam papers to sort alphabetically. Instead of sorting all 100 alone, the teacher cuts the stack in half (50 and 50) and gives one half to a teaching assistant. Each person repeatedly halves their stack until holding stacks of 1 paper. Because a single paper is already sorted, you now just compare the top of both small stacks, take whichever comes first alphabetically, and stack them neatly. Merging two pre-sorted stacks is vastly easier than sorting from scratch!"
  },

  interactiveWidget: "merge-sort",

  workedExample: {
    title: "Step-by-Step Execution Trace on Sample Array [8, 3, 7, 4, 2, 6, 1, 5]",
    primitiveText: `<code>// Initial Array: [8, 3, 7, 4, 2, 6, 1, 5]
//
// PHASE 1: DIVIDE (Tree Depth = log2(8) = 3)
// Level 0: [8, 3, 7, 4, 2, 6, 1, 5]
// Level 1: [8, 3, 7, 4]  and  [2, 6, 1, 5]
// Level 2: [8, 3]  [7, 4]  and  [2, 6]  [1, 5]
// Level 3 (Base Cases): [8], [3], [7], [4], [2], [6], [1], [5]
//
// PHASE 2: MERGE (Combine sorted pairs upwards)
// Merge [8] and [3] -> [3, 8]
// Merge [7] and [4] -> [4, 7]
// Merge [3, 8] and [4, 7] -> [3, 4, 7, 8]
//
// Merge [2] and [6] -> [2, 6]
// Merge [1] and [5] -> [1, 5]
// Merge [2, 6] and [1, 5] -> [1, 2, 5, 6]
//
// Final Merge:
// Merge [3, 4, 7, 8] and [1, 2, 5, 6] -> [1, 2, 3, 4, 5, 6, 7, 8]</code>`,
    referenceText: "At each of the 3 levels of the tree, merging the elements takes a total of 8 operations. Total work = 8 × 3 = 24 operations &rarr; n × log₂(n)."
  },

  visual: {
    caption: "Figure 1: Merge Sort recursion tree showing recursive division and subsequent pairwise merging.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="250" fill="var(--bg-body)" rx="12" />
        <text x="380" y="24" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Merge Sort Divide &amp; Conquer Tree: Halving to Base &amp; Merging</text>
        
        <!-- Root [8,3,7,4 | 2,6,1,5] -->
        <g transform="translate(240, 42)">
          <rect width="280" height="30" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="140" y="20" fill="var(--text-primary)" font-size="13" font-weight="700" text-anchor="middle">[8, 3, 7, 4, 2, 6, 1, 5]</text>
        </g>

        <!-- Divide lines -->
        <line x1="320" y1="72" x2="200" y2="100" stroke="var(--accent-primary)" stroke-width="1.5" />
        <line x1="440" y1="72" x2="560" y2="100" stroke="var(--accent-primary)" stroke-width="1.5" />

        <!-- Level 1 Halves -->
        <g transform="translate(120, 100)">
          <rect width="160" height="28" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="5"/>
          <text x="80" y="19" fill="#6366F1" font-size="12" font-weight="700" text-anchor="middle">Left: [8, 3, 7, 4]</text>
        </g>
        <g transform="translate(480, 100)">
          <rect width="160" height="28" fill="rgba(99,102,241,0.18)" stroke="#6366F1" stroke-width="1.5" rx="5"/>
          <text x="80" y="19" fill="#6366F1" font-size="12" font-weight="700" text-anchor="middle">Right: [2, 6, 1, 5]</text>
        </g>

        <!-- Divide lines to base -->
        <line x1="160" y1="128" x2="110" y2="155" stroke="var(--border-default)" stroke-width="1.5" />
        <line x1="240" y1="128" x2="290" y2="155" stroke="var(--border-default)" stroke-width="1.5" />
        <line x1="520" y1="128" x2="470" y2="155" stroke="var(--border-default)" stroke-width="1.5" />
        <line x1="600" y1="128" x2="650" y2="155" stroke="var(--border-default)" stroke-width="1.5" />

        <!-- Level 2 Pairs -->
        <g transform="translate(60, 155)">
          <rect width="100" height="26" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="4"/>
          <text x="50" y="18" fill="var(--text-secondary)" font-size="11" font-weight="600" text-anchor="middle">[8, 3]</text>
        </g>
        <g transform="translate(240, 155)">
          <rect width="100" height="26" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="4"/>
          <text x="50" y="18" fill="var(--text-secondary)" font-size="11" font-weight="600" text-anchor="middle">[7, 4]</text>
        </g>
        <g transform="translate(420, 155)">
          <rect width="100" height="26" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="4"/>
          <text x="50" y="18" fill="var(--text-secondary)" font-size="11" font-weight="600" text-anchor="middle">[2, 6]</text>
        </g>
        <g transform="translate(600, 155)">
          <rect width="100" height="26" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="4"/>
          <text x="50" y="18" fill="var(--text-secondary)" font-size="11" font-weight="600" text-anchor="middle">[1, 5]</text>
        </g>

        <!-- Merge direction text -->
        <path d="M 110 190 Q 380 230 650 190" stroke="#10B981" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        <text x="380" y="235" fill="#10B981" font-size="12" font-weight="700" text-anchor="middle">&uarr; Conquer: 2-Pointer Merge into Sorted Array &uarr;</text>
      </svg>
    `
  },

  codeSnippet: `function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}`,

  codeExplanation: [
    {
      line: "Line 2–4: if (arr.length <= 1) return arr;",
      desc: "Base case of recursion: an array with 0 or 1 item is already sorted. Returning it terminates recursive halving."
    },
    {
      line: "Line 6: const mid = Math.floor(arr.length / 2);",
      desc: "Computes the exact midpoint to partition the array evenly into left and right halves."
    },
    {
      line: "Line 8–9: const left = mergeSort(...); const right = mergeSort(...);",
      desc: "Recursively divides each half. `left` will receive the sorted first half; `right` will receive the sorted second half."
    },
    {
      line: "Line 11: return merge(left, right);",
      desc: "Calls the helper function to merge the two sorted halves and returns the resulting combined sorted array."
    },
    {
      line: "Line 14–17: function merge(left, right) { ... }",
      desc: "Initializes a `result` buffer and two pointers: `i` tracking `left` and `j` tracking `right`."
    },
    {
      line: "Line 19–26: while (i < left.length && j < right.length) { ... }",
      desc: "Compares the current heads: if `left[i] <= right[j]`, pushes `left[i]` and increments `i`. Otherwise pushes `right[j]` and increments `j`. Using `<=` ensures the sort is stable!"
    },
    {
      line: "Line 29: return result.concat(left.slice(i), right.slice(j));",
      desc: "Once one array is exhausted, appends whichever remaining elements are left in the other array."
    }
  ],

  complexityNotes: [
    "Best-Case Time Complexity: O(n log n) — even if the array is already sorted, Merge Sort consistently divides down to single items and re-merges, guaranteeing predictable logarithmic depth.",
    "Average-Case Time Complexity: O(n log n) — tree height is always log₂(n), and at every depth level, merging all subarrays takes linear O(n) total comparisons. n × log₂(n) = O(n log n).",
    "Worst-Case Time Complexity: O(n log n) — identical to best case. Unlike Quick Sort, Merge Sort cannot be forced into O(n²) by adversarial input.",
    "Auxiliary Space Complexity: O(n) — requires extra memory buffers during the merge phase to hold the merged elements before writing them back. This is why Merge Sort is not purely in-place on arrays.",
    "Stability: Stable — because `left[i] <= right[j]` prefers elements from the left subarray when values are equal, the original order of duplicate keys is perfectly preserved."
  ],

  tradeOffs: {
    title: "Merge Sort: Advantages and Limitations",
    corePoint: "Merge Sort trades O(n) auxiliary memory for rock-solid, guaranteed O(n log n) performance and stability.",
    comparisonText: `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:rgba(16,185,129,0.08); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <strong style="color:#10B981;">Advantages:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Guaranteed O(n log n) runtime in ALL cases (immune to worst-case slowdowns).</li>
            <li>Stable sorting algorithm.</li>
            <li>Ideal for Linked Lists (merges with O(1) auxiliary space without random access).</li>
            <li>Well-suited for external sorting of files that exceed available RAM.</li>
          </ul>
        </div>
        <div style="background:rgba(239,68,68,0.08); padding:14px; border-radius:8px; border:1px solid rgba(239,68,68,0.3);">
          <strong style="color:#EF4444;">Limitations:</strong>
          <ul style="margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li>Requires O(n) auxiliary memory for buffer allocations.</li>
            <li>Higher constant factor and memory allocations than Quick Sort.</li>
            <li>Not adaptive: still does full O(n log n) work on already sorted data.</li>
          </ul>
        </div>
      </div>
    `,
    closingText: "When to use: When predictable worst-case performance is required (mission-critical systems), when sorting linked lists, or when stability is mandatory."
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
            <tr style="background:rgba(99,102,241,0.08);">
              <td><strong>Merge Sort (Active)</strong></td>
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
        <p><strong>Why Merge Sort is Always O(n log n):</strong> Dividing an array of size n in half repeatedly forms a balanced binary recursion tree of depth <code>log₂(n)</code>. At each level of the tree, merging all elements takes exactly <code>n</code> operations. Multiplying tree depth by per-level work yields <code>n × log₂(n)</code> regardless of the initial order of elements.</p>
        <p><strong>Memory Footprint:</strong> Unlike Quick Sort which partitions in-place, standard array Merge Sort requires temporary arrays to hold elements during merging, demanding O(n) auxiliary memory.</p>
      </div>
    `
  },

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting the Base Case",
      desc: "Omitting <code>if (arr.length <= 1) return arr;</code> will cause infinite recursion and crash with a `Maximum call stack size exceeded` error."
    },
    {
      title: "Mistake 2: Using `<` Instead of `<=` in the Merge Loop",
      desc: "Using <code>if (left[i] < right[j])</code> instead of <code><=</code> causes ties to pick from the right subarray first, breaking algorithm stability and swapping identical elements."
    },
    {
      title: "Mistake 3: Forgetting Remaining Elements",
      desc: "Failing to append remaining elements after the `while` loop finishes (via `.concat(left.slice(i), right.slice(j))`) will drop remaining values from whichever subarray was longer."
    }
  ],

  practice: [
    {
      q: "Question 1: Why does Merge Sort have a guaranteed worst-case time complexity of O(n log n)?",
      a: "Because it always divides subarrays exactly in half, guaranteeing a recursion tree of height log₂(n). At each of the log₂(n) levels, merging all elements requires O(n) comparisons and copies, giving O(n log n) total work."
    },
    {
      q: "Question 2: What is the primary disadvantage of Merge Sort compared to Quick Sort?",
      a: "Merge Sort requires O(n) auxiliary memory to hold the merged elements, whereas Quick Sort sorts in-place using only O(log n) call stack space."
    },
    {
      q: "Question 3: Why is Merge Sort especially suited for sorting Singly Linked Lists?",
      a: "Because merging two linked lists does not require random array indexing or extra memory buffers — pointers can simply be re-linked in-place in O(1) auxiliary space!"
    }
  ],

  generalSortingPractice: {
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Merge Step", slug: "merge-sorted-array" },
      { num: 148, title: "Sort List", difficulty: "Medium", concept: "Linked List / Merge Sort", slug: "sort-list" },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Divide and Conquer", slug: "sort-an-array" }
    ]
  }
};
