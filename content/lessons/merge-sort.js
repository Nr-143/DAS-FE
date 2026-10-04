/**
 * DSA Tracker — Lesson Content: Merge Sort
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["merge-sort"] = {
  id: "merge-sort",
  title: "Merge Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Master guaranteed O(n log n) divide-and-conquer sorting by recursively splitting arrays in half and merging sorted halves.",

  definitions: [
    {
      term: "Merge Sort",
      def: "Divide-and-conquer: recursively splits the array in half until each piece has one element, then merges pieces back in sorted order."
    },
    {
      term: "Divide and Conquer",
      def: "Break into subproblems, solve each recursively, and combine sub-results (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> lesson)."
    },
    {
      term: "Merge Step",
      def: "Combines two sorted lists into one by repeatedly comparing their front elements in linear O(n) time."
    }
  ],

  howItWorksTogether: "Relies on recursion (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> lesson) to keep splitting — a single element is trivially sorted — and the real work happens merging two sorted halves in linear time. O(log n) split levels × O(n) merge work per level = **O(n log n)**, reliably fast even on poorly-ordered data.",

  interactiveWidget: "merge-sort",

  visual: {
    caption: "Figure 1: Merge Sort recursive split tree down to single elements, followed by bottom-up 2-way merging.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Merge Sort: Recursive Split &amp; Merge Tree</text>
        
        <!-- Level 0: Full Array -->
        <g transform="translate(230, 45)">
          <rect width="240" height="35" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2" rx="6"/>
          <text x="120" y="22" fill="var(--text-primary)" font-size="13" font-weight="600" text-anchor="middle">[5, 2, 4, 1, 3]</text>
        </g>

        <!-- Split arrows down -->
        <path d="M 310 82 L 210 105" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#mg-arrow)"/>
        <path d="M 390 82 L 490 105" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#mg-arrow)"/>

        <!-- Level 1: Split Halves -->
        <g transform="translate(130, 108)">
          <rect width="140" height="30" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="5"/>
          <text x="70" y="20" fill="var(--text-secondary)" font-size="12" font-weight="500" text-anchor="middle">[5, 2, 4]</text>
        </g>
        <g transform="translate(430, 108)">
          <rect width="140" height="30" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="5"/>
          <text x="70" y="20" fill="var(--text-secondary)" font-size="12" font-weight="500" text-anchor="middle">[1, 3]</text>
        </g>

        <!-- Merge arrows down -->
        <path d="M 200 142 L 310 170" stroke="#10B981" stroke-width="2" marker-end="url(#mg-arrow-g)"/>
        <path d="M 500 142 L 390 170" stroke="#10B981" stroke-width="2" marker-end="url(#mg-arrow-g)"/>

        <!-- Level 2: Merged Result -->
        <g transform="translate(230, 175)">
          <rect width="240" height="35" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="120" y="22" fill="var(--text-primary)" font-size="13" font-weight="600" text-anchor="middle">[1, 2, 3, 4, 5] ✓</text>
        </g>

        <defs>
          <marker id="mg-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)"/>
          </marker>
          <marker id="mg-arrow-g" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">mergeSort</span>(arr) {
  <span class="kw">if</span> (arr.length &lt;= <span class="num">1</span>) <span class="kw">return</span> arr;              <span class="cm">// base case</span>
  <span class="kw">const</span> mid = Math.<span class="fn">floor</span>(arr.length / <span class="num">2</span>);
  <span class="kw">const</span> left = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(<span class="num">0</span>, mid));     <span class="cm">// recursive case</span>
  <span class="kw">const</span> right = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(mid));
  <span class="kw">return</span> <span class="fn">merge</span>(left, right);
}

<span class="kw">function</span> <span class="fn">merge</span>(left, right) {
  <span class="kw">const</span> result = [];
  <span class="kw">let</span> i = <span class="num">0</span>, j = <span class="num">0</span>;
  <span class="kw">while</span> (i &lt; left.length &amp;&amp; j &lt; right.length) {
    result.<span class="fn">push</span>(left[i] &lt;= right[j] ? left[i++] : right[j++]);
  }
  <span class="kw">return</span> [...result, ...left.<span class="fn">slice</span>(i), ...right.<span class="fn">slice</span>(j)];
}`,

  complexityNotes: [
    "Time Complexity: O(n log n) in ALL cases (best, average, worst).",
    "Space Complexity: O(n) auxiliary space (not in-place, allocates temporary arrays during merge).",
    "Stability: Stable sort (preserves relative order of duplicate elements)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting O(n) auxiliary space cost",
      desc: "Assuming Merge Sort is in-place. It allocates temporary array slices during each merge step."
    },
    {
      title: "Mistake 2: Assuming better Big-O always wins in practice",
      desc: "For tiny arrays, simpler O(n²) sorts can actually be faster due to lower recursive call stack overhead."
    }
  ],

  practice: [
    {
      q: "Question 1: Why is Merge Sort's time complexity O(n log n) instead of O(n²)?",
      a: "The array is divided in half log n times (tree depth), and at each level of the tree, merging the subarrays takes O(n) total comparisons."
    },
    {
      q: "Question 2: What is Merge Sort's auxiliary space complexity?",
      a: "O(n) auxiliary space because temporary arrays must be allocated during the merge step."
    }
  ],

  challenge: {
    titleText: "Challenge: Split and Merge Trace",
    desc: "Trace how <code>[5, 2, 4, 1, 3]</code> splits down to single elements and merges back in sorted order."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 88 — Merge Sorted Array to understand merging two sorted sequences.",
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Sorting", slug: "merge-sorted-array", isSuggestedStart: true, roadmapStep: 13 },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Divide & Conquer / Merge Sort", slug: "sort-an-array" },
      { num: 148, title: "Sort List", difficulty: "Medium", concept: "Linked List + Merge Sort", slug: "sort-list" }
    ]
  },

  generalSortingPractice: {
    problems: [
      { num: 88, title: "Merge Sorted Array", difficulty: "Easy", concept: "Two Pointers / Sorting", slug: "merge-sorted-array", roadmapStep: 13 },
      { num: 912, title: "Sort an Array", difficulty: "Medium", concept: "Sorting Algorithms", slug: "sort-an-array" },
      { num: 169, title: "Majority Element", difficulty: "Easy", concept: "Sorting / Hash Map", slug: "majority-element" },
      { num: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", concept: "Quickselect / Heap / Sorting", slug: "kth-largest-element-in-an-array" },
      { num: 75, title: "Sort Colors", difficulty: "Medium", concept: "Three Pointers / Sorting", slug: "sort-colors" }
    ]
  }
};
