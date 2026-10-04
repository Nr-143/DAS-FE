/**
 * DSA Tracker — Lesson Content: Bubble Sort
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["bubble-sort"] = {
  id: "bubble-sort",
  title: "Bubble Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the fundamental comparison sort that bubbles the largest unsorted value to the end of the array on each pass.",

  definitions: [
    {
      term: "Bubble Sort",
      def: "Repeatedly compares adjacent elements and swaps them if out of order, until no swaps are needed."
    },
    {
      term: "Pass",
      def: "One full walk through the array; the largest unsorted value \"bubbles\" to its correct end position each pass."
    },
    {
      term: "Neighbor Swaps",
      def: "Only ever compares and swaps adjacent neighboring elements."
    }
  ],

  howItWorksTogether: "Because it only compares/swaps neighbors, the largest remaining value bubbles to the end after each pass — hence the name. Up to n passes of up to n comparisons gives O(n²), simple but inefficient at scale.",

  interactiveWidget: "bubble-sort",

  visual: {
    caption: "Figure 1: Bubble Sort comparing adjacent elements (5, 8). 8 is larger so no swap occurs; next pair will bubble max value right.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Bubble Sort: Neighbor Comparisons &amp; Swaps</text>
        
        <g transform="translate(70, 60)">
          <!-- Bar 1 -->
          <rect x="0" y="40" width="60" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="30" y="80" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">2</text>
          
          <!-- Bar 2: comparing -->
          <rect x="75" y="10" width="60" height="100" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="105" y="65" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">5</text>
          
          <!-- Bar 3: comparing -->
          <rect x="150" y="0" width="60" height="110" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="180" y="60" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">8</text>

          <!-- Bar 4 -->
          <rect x="225" y="60" width="60" height="50" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="255" y="90" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">1</text>

          <!-- Bar 5: Settled -->
          <rect x="300" y="-10" width="60" height="120" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="330" y="55" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">9</text>
          <text x="330" y="130" fill="#10B981" font-size="10" font-weight="500" text-anchor="middle">SETTLED ✓</text>
        </g>

        <text x="210" y="190" fill="#F59E0B" font-size="11" font-weight="500" text-anchor="middle">Comparing neighbors (5 vs 8) ➔ No swap needed</text>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">bubbleSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length - <span class="num">1</span>; i++) {
    <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; arr.length - <span class="num">1</span> - i; j++) {
      <span class="kw">if</span> (arr[j] &gt; arr[j + <span class="num">1</span>]) {
        [arr[j], arr[j + <span class="num">1</span>]] = [arr[j + <span class="num">1</span>], arr[j]];
      }
    }
  }
  <span class="kw">return</span> arr;
}`,

  complexityNotes: [
    "Time Complexity (Average/Worst): O(n²) when array is unsorted or reverse-sorted.",
    "Time Complexity (Best): O(n) when array is already sorted AND early-exit optimization is used.",
    "Space Complexity: O(1) auxiliary space (in-place sorting algorithm)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Omitting the early-exit check",
      desc: "Omitting the early-exit check (no swaps this pass ➔ stop) makes best case O(n²) even on already sorted input."
    },
    {
      title: "Mistake 2: Using bubble sort on large production datasets",
      desc: "Using bubble sort on large datasets — it is intended for educational demonstration, not production scale."
    }
  ],

  practice: [
    {
      q: "Question 1: Why is Bubble Sort's time complexity O(n²) in the worst case?",
      a: "Because it makes up to n passes across the array, and each pass performs up to n comparisons and swaps, yielding n × n = O(n²) total steps."
    },
    {
      q: "Question 2: What optimization makes a best-case time complexity of O(n) possible for Bubble Sort?",
      a: "Adding an early-exit flag that monitors if any swaps occurred during a pass. If 0 swaps occurred, the array is sorted and sorting terminates after 1 pass."
    }
  ],

  challenge: {
    titleText: "Challenge: Early-Exit Optimization",
    desc: "Add a boolean flag <code>swapped</code> inside the outer loop to terminate Bubble Sort early when no swaps occur during a pass."
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
