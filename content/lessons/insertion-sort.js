/**
 * DSA Tracker — Lesson Content: Insertion Sort
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["insertion-sort"] = {
  id: "insertion-sort",
  title: "Insertion Sort",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand card-player sorting: building a sorted sub-array one element at a time by shifting elements to insert each item into place.",

  definitions: [
    {
      term: "Insertion Sort",
      def: "Builds a sorted portion one element at a time, inserting each new element into its correct place within it."
    },
    {
      term: "Sorted Portion",
      def: "The growing, always-sorted front part of the array."
    },
    {
      term: "Shifting vs Swapping",
      def: "Moving elements over to make room for insertion, rather than performing repeated 2-way swaps."
    }
  ],

  howItWorksTogether: "Works like sorting a hand of playing cards — each new card slots into its correct spot among the already-sorted ones, shifting others over as needed. Best case O(n) (already sorted, no shifting); worst case O(n²) (reverse-sorted, maximum shifting).",

  interactiveWidget: "insertion-sort",

  visual: {
    caption: "Figure 1: Insertion Sort inserting card 3 into sorted sub-array [2, 5]. 5 shifts right to make room for 3.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Insertion Sort: Shifting Elements to Open Slot</text>
        
        <g transform="translate(70, 60)">
          <!-- Sorted portion -->
          <rect x="0" y="30" width="60" height="60" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="30" y="65" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">2</text>

          <!-- Shifted element -->
          <rect x="75" y="10" width="60" height="80" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="105" y="55" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">5 ➔</text>

          <!-- Inserting item -->
          <rect x="150" y="40" width="60" height="50" fill="rgba(108,99,255,0.22)" stroke="var(--accent-primary)" stroke-width="2.5" rx="6"/>
          <text x="180" y="70" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">3</text>
          <text x="180" y="112" fill="var(--accent-primary)" font-size="10" font-weight="500" text-anchor="middle">INSERT</text>

          <!-- Rest of unsorted -->
          <rect x="225" y="0" width="60" height="90" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="255" y="50" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">8</text>

          <rect x="300" y="45" width="60" height="45" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="330" y="72" fill="var(--text-primary)" font-size="14" font-weight="500" text-anchor="middle">1</text>
        </g>

        <text x="210" y="185" fill="var(--accent-primary)" font-size="11" font-weight="500" text-anchor="middle">5 shifts right to index 2; 3 inserts into index 1</text>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">insertionSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i &lt; arr.length; i++) {
    <span class="kw">const</span> current = arr[i];
    <span class="kw">let</span> j = i - <span class="num">1</span>;
    <span class="kw">while</span> (j &gt;= <span class="num">0</span> &amp;&amp; arr[j] &gt; current) {
      arr[j + <span class="num">1</span>] = arr[j];
      j--;
    }
    arr[j + <span class="num">1</span>] = current;
  }
  <span class="kw">return</span> arr;
}`,

  complexityNotes: [
    "Time Complexity (Best): O(n) when array is already sorted (0 shifts required).",
    "Time Complexity (Worst/Average): O(n²) when array is reverse-sorted or randomly ordered.",
    "Space Complexity: O(1) auxiliary space (in-place)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing shifting with swapping",
      desc: "Shifting copies elements right once to open a slot; swapping repeatedly exchanges adjacent values."
    },
    {
      title: "Mistake 2: Overlooking its usefulness for nearly-sorted data",
      desc: "Overlooking that its strong O(n) best case makes it genuinely useful for nearly-sorted data, unlike bubble or selection sort."
    }
  ],

  practice: [
    {
      q: "Question 1: What input produces Insertion Sort's best-case time complexity? What produces its worst-case?",
      a: "Already-sorted input produces the best case O(n) (0 shifts). Reverse-sorted input produces the worst case O(n²) (maximum shifts)."
    },
    {
      q: "Question 2: How does shifting differ from swapping in Insertion Sort?",
      a: "Shifting copies elements one position to the right to open a gap for the target element, performing 1 write per element instead of 3 writes per swap."
    }
  ],

  challenge: {
    titleText: "Challenge: Trace Step-by-Step",
    desc: "Trace Insertion Sort step-by-step on <code>[5, 2, 4, 1, 3]</code> and write out the array state after inserting each element."
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
