/**
 * DSA Tracker — Lesson Content: Selection Sort
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["selection-sort"] = {
  id: "selection-sort",
  title: "Selection Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand selection-based sorting: finding the minimum item in the unsorted portion and swapping it into place at most once per pass.",

  definitions: [
    {
      term: "Selection Sort",
      def: "Repeatedly finds the minimum of the unsorted portion and swaps it into place at the front."
    },
    {
      term: "Unsorted Portion",
      def: "The shrinking sub-array to the right that has not yet been scanned and placed."
    },
    {
      term: "One Swap Per Pass",
      def: "Performs at most one swap per pass (at most n-1 total swaps), minimizing memory writes compared to bubble sort."
    }
  ],

  howItWorksTogether: "Splits the array into sorted (front) and unsorted (rest); each pass scans the whole unsorted portion for its minimum, then swaps it into the boundary position. Still O(n²) comparisons overall, but minimizes actual swaps to O(n) total.",

  interactiveWidget: "selection-sort",

  visual: {
    caption: "Figure 1: Selection Sort scanning unsorted portion to find minimum value 1, then swapping it with front index 0.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Selection Sort: Scanning Unsorted Portion for Minimum</text>
        
        <g transform="translate(60, 60)">
          <!-- Sorted boundary -->
          <rect x="0" y="30" width="70" height="65" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="35" y="68" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">1</text>
          <text x="35" y="112" fill="#10B981" font-size="10" font-weight="500" text-anchor="middle">SORTED</text>

          <!-- Unsorted Item 1 -->
          <rect x="85" y="10" width="70" height="85" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="120" y="58" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">5</text>

          <!-- Unsorted Item 2: Minimum found -->
          <rect x="170" y="45" width="70" height="50" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="205" y="75" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">2</text>
          <text x="205" y="112" fill="#F59E0B" font-size="10" font-weight="500" text-anchor="middle">MIN FOUND</text>

          <!-- Unsorted Item 3 -->
          <rect x="255" y="20" width="70" height="75" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="290" y="62" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">4</text>

          <!-- Unsorted Item 4 -->
          <rect x="340" y="0" width="70" height="95" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="375" y="52" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">8</text>
        </g>

        <path d="M 180 180 L 260 180" stroke="var(--accent-primary)" stroke-width="1.5" marker-end="url(#sel-arrow)"/>
        <text x="350" y="184" fill="var(--accent-primary)" font-size="11" font-weight="500">Scan rest of array ➔ 1 swap per pass</text>
        
        <defs>
          <marker id="sel-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-primary)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">selectionSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length - <span class="num">1</span>; i++) {
    <span class="kw">let</span> minIndex = i;
    <span class="kw">for</span> (<span class="kw">let</span> j = i + <span class="num">1</span>; j &lt; arr.length; j++) {
      <span class="kw">if</span> (arr[j] &lt; arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  <span class="kw">return</span> arr;
}`,

  complexityNotes: [
    "Time Complexity: O(n²) in ALL cases (best, average, worst) because it scans the remaining sub-array fully.",
    "Space Complexity: O(1) auxiliary space (in-place sort).",
    "Swaps: O(n) total swaps (at most n-1 swaps across the entire sort)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing selection sort with bubble sort",
      desc: "Bubble sort swaps constantly during a pass; selection sort scans first and performs at most one swap per pass."
    },
    {
      title: "Mistake 2: Assuming selection sort has a fast best case",
      desc: "Assuming it has a fast best case — it doesn't. Even on sorted arrays, selection sort still performs all O(n²) comparisons."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the maximum number of swaps Selection Sort performs in the worst case?",
      a: "At most n - 1 swaps in total, because it only performs one swap at the end of each pass."
    },
    {
      q: "Question 2: Is Selection Sort's best-case time complexity faster than its worst-case time complexity?",
      a: "No. Selection Sort is O(n²) in all cases because it must always scan the entire unsorted portion to confirm the minimum element."
    }
  ],

  challenge: {
    titleText: "Challenge: Max Selection Sort",
    desc: "Modify Selection Sort to find the maximum element each pass, building the sorted array from the back."
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
