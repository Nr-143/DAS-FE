/**
 * DSA Tracker — Lesson Content: Binary Search
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["binary-search"] = {
  id: "binary-search",
  title: "Binary Search",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Master logarithmic searching on sorted data by repeatedly dividing the search space in half.",

  definitions: [
    {
      term: "Binary Search",
      def: "Finds a target in sorted data by checking the middle element and eliminating half the remaining range each step."
    },
    {
      term: "Precondition",
      def: "Data must already be sorted in order before Binary Search can be applied."
    },
    {
      term: "Midpoint Formula",
      def: "Calculated as low + Math.floor((high - low) / 2) to safely prevent potential integer overflow."
    },
    {
      term: "Search Space",
      def: "The current range [low..high] still being considered, halving in size at every iteration."
    }
  ],

  howItWorksTogether: "Because the data is sorted, comparing the target to the middle tells you which half it must be in — so the other half is safely discarded every time. This halving gives O(log n), versus linear search's O(n).",

  interactiveWidget: "binary-search",

  visual: {
    caption: "Figure 1: Binary Search checking midpoint 23. Discards the lower half [4, 7, 12] instantly because 23 > 12.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Binary Search: Search Space Halving</text>
        
        <g transform="translate(50, 65)">
          <!-- Faded eliminated left portion -->
          <g opacity="0.3">
            <rect x="0" y="0" width="75" height="55" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="37" y="32" fill="var(--text-muted)" font-size="13" font-weight="400" text-anchor="middle">4</text>
            
            <rect x="85" y="0" width="75" height="55" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="122" y="32" fill="var(--text-muted)" font-size="13" font-weight="400" text-anchor="middle">7</text>
            
            <rect x="170" y="0" width="75" height="55" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
            <text x="207" y="32" fill="var(--text-muted)" font-size="13" font-weight="400" text-anchor="middle">12</text>
          </g>

          <!-- Midpoint: checked -->
          <rect x="255" y="0" width="75" height="55" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" stroke-width="2" rx="6"/>
          <text x="292" y="32" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">18</text>
          <text x="292" y="73" fill="#F59E0B" font-size="11" font-weight="500" text-anchor="middle">MID</text>

          <!-- Right portion: active search space -->
          <rect x="340" y="0" width="75" height="55" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="377" y="32" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">23</text>
          <text x="377" y="73" fill="#10B981" font-size="11" font-weight="500" text-anchor="middle">TARGET ✓</text>

          <rect x="425" y="0" width="75" height="55" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="462" y="32" fill="var(--text-secondary)" font-size="13" font-weight="400" text-anchor="middle">34</text>
          <text x="462" y="73" fill="var(--text-muted)" font-size="11" font-weight="400" text-anchor="middle">HIGH</text>
        </g>

        <path d="M 120 150 Q 200 180 280 150" stroke="#EF4444" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
        <text x="200" y="185" fill="#EF4444" font-size="11" font-weight="500" text-anchor="middle">Eliminated half (18 &lt; 23)</text>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">binarySearch</span>(arr, target) {
  <span class="kw">let</span> low = <span class="num">0</span>, high = arr.length - <span class="num">1</span>;
  <span class="kw">while</span> (low &lt;= high) {
    <span class="kw">const</span> mid = low + Math.<span class="fn">floor</span>((high - low) / <span class="num">2</span>);
    <span class="kw">if</span> (arr[mid] === target) <span class="kw">return</span> mid;
    <span class="kw">if</span> (arr[mid] &lt; target) low = mid + <span class="num">1</span>;
    <span class="kw">else</span> high = mid - <span class="num">1</span>;
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}`,

  complexityNotes: [
    "Time Complexity: O(log n) in average and worst cases — halving search space each step.",
    "Space Complexity: O(1) auxiliary space for iterative version; O(log n) call stack space for recursive version.",
    "Precondition: Data MUST be sorted prior to binary search."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Running binary search on unsorted data",
      desc: "Running on unsorted data produces incorrect or random results because halving assumptions fail."
    },
    {
      title: "Mistake 2: Off-by-one errors in low/high updates",
      desc: "Setting <code>low = mid</code> instead of <code>low = mid + 1</code> causing infinite loops or missed elements."
    }
  ],

  practice: [
    {
      q: "Question 1: Why must the array be sorted before performing Binary Search?",
      a: "Because comparing against the middle element relies on relative order to guarantee which half can be safely discarded."
    },
    {
      q: "Question 2: What is the time complexity of Binary Search and why?",
      a: "O(log n), because dividing the array in half at each step reduces an n-element search space to 1 in log₂ n steps."
    }
  ],

  challenge: {
    titleText: "Challenge: Recursive Binary Search",
    desc: "Implement Binary Search recursively instead of using an iterative <code>while</code> loop."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "You already know the algorithm, so 704 — Binary Search should be your first LeetCode problem.",
    problems: [
      { num: 704, title: "Binary Search", difficulty: "Easy", slug: "binary-search", isSuggestedStart: true, roadmapStep: 1, isImmediateNext: true },
      { num: 35, title: "Search Insert Position", difficulty: "Easy", slug: "search-insert-position" },
      { num: 34, title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", slug: "find-first-and-last-position-of-element-in-sorted-array" },
      { num: 69, title: "Sqrt(x)", difficulty: "Easy", slug: "sqrtx" },
      { num: 278, title: "First Bad Version", difficulty: "Easy", slug: "first-bad-version" }
    ]
  }
};
