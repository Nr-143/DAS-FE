/**
 * DSA Tracker — Lesson Content: Quick Sort
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["quick-sort"] = {
  id: "quick-sort",
  title: "Quick Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Master in-place divide-and-conquer sorting with pivot selection and partitioning.",

  definitions: [
    {
      term: "Quick Sort",
      def: "Divide-and-conquer: picks a pivot, partitions so smaller elements go left and larger go right, recursively sorts each side."
    },
    {
      term: "Pivot",
      def: "The chosen partition element; choice directly affects performance."
    },
    {
      term: "Partition",
      def: "Rearranging elements around the pivot in place so smaller items come before larger items."
    }
  ],

  howItWorksTogether: "Unlike merge sort, the main work happens in-place during partitioning rather than in a separate merge step — so quick sort is typically in-place (O(log n) auxiliary stack space from <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a>, not O(n)). Average time O(n log n), same as merge sort, but a poor pivot choice (e.g. always the first element on sorted input) degrades it to O(n²) worst case.",

  interactiveWidget: "quick-sort",

  visual: {
    caption: "Figure 1: Quick Sort partitioning around pivot 3. Items < 3 go left, items > 3 go right, placing 3 in its final position.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Quick Sort: Lomuto Partitioning Around Pivot</text>
        
        <g transform="translate(60, 60)">
          <!-- Elements < Pivot -->
          <rect x="0" y="30" width="70" height="60" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="35" y="65" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">1</text>

          <rect x="80" y="20" width="70" height="70" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="115" y="60" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">2</text>
          
          <!-- PIVOT: Settled in place -->
          <rect x="160" y="10" width="75" height="80" fill="rgba(108,99,255,0.22)" stroke="var(--accent-primary)" stroke-width="2.5" rx="6"/>
          <text x="197" y="55" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">3</text>
          <text x="197" y="108" fill="var(--accent-primary)" font-size="10" font-weight="600" text-anchor="middle">PIVOT ✓</text>

          <!-- Elements > Pivot -->
          <rect x="245" y="0" width="70" height="90" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="280" y="50" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">5</text>

          <rect x="325" y="15" width="70" height="75" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="360" y="58" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">4</text>
        </g>

        <text x="115" y="180" fill="#10B981" font-size="11" font-weight="500" text-anchor="middle">Left side (&lt; 3)</text>
        <text x="360" y="180" fill="#F59E0B" font-size="11" font-weight="500" text-anchor="middle">Right side (&gt; 3)</text>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">quickSort</span>(arr, low = <span class="num">0</span>, high = arr.length - <span class="num">1</span>) {
  <span class="kw">if</span> (low &lt; high) {
    <span class="kw">const</span> p = <span class="fn">partition</span>(arr, low, high);
    <span class="fn">quickSort</span>(arr, low, p - <span class="num">1</span>);
    <span class="fn">quickSort</span>(arr, p + <span class="num">1</span>, high);
  }
  <span class="kw">return</span> arr;
}

<span class="kw">function</span> <span class="fn">partition</span>(arr, low, high) {
  <span class="kw">const</span> pivot = arr[high];
  <span class="kw">let</span> i = low - <span class="num">1</span>;
  <span class="kw">for</span> (<span class="kw">let</span> j = low; j &lt; high; j++) {
    <span class="kw">if</span> (arr[j] &lt; pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  }
  [arr[i + <span class="num">1</span>], arr[high]] = [arr[high], arr[i + <span class="num">1</span>]];
  <span class="kw">return</span> i + <span class="num">1</span>;
}`,

  complexityNotes: [
    "Average Time Complexity: O(n log n)",
    "Worst-case Time Complexity: O(n²) (triggered by bad pivot choices on sorted/reverse-sorted inputs)",
    "Space Complexity: O(log n) auxiliary call-stack space on average."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming Quick Sort is always O(n log n)",
      desc: "Assuming it's always O(n log n) — the worst case is real and triggered by predictable bad-pivot patterns on sorted data."
    },
    {
      title: "Mistake 2: Confusing in-place nature with Merge Sort space",
      desc: "Confusing its in-place nature with Merge Sort's O(n) auxiliary space requirements."
    }
  ],

  practice: [
    {
      q: "Question 1: What causes Quick Sort to degrade to its O(n²) worst-case performance?",
      a: "Consistently picking an extreme element (smallest or largest) as the pivot, which occurs on sorted inputs when using a naive first/last element pivot strategy."
    },
    {
      q: "Question 2: How does Quick Sort differ from Merge Sort in memory usage?",
      a: "Quick Sort partitions in-place requiring only O(log n) call stack space, whereas Merge Sort requires O(n) auxiliary array space."
    }
  ],

  challenge: {
    titleText: "Challenge: Partition Trace",
    desc: "Trace Quick Sort on <code>[5, 2, 4, 1, 3]</code> using the last element as pivot each time."
  },

  leetcodePractice: {
    showProcessCallout: true
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
