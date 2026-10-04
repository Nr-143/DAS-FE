/**
 * DSA Tracker — Lesson Content: Linear Search
 * ─────────────────────────────────────────────
 * Independent content module adhering to schema.
 * Configured with the shared Algorithm Visualizer widget.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linear-search"] = {
  id: "linear-search",
  title: "Linear Search",
  levelTitle: "Level 3 — Searching & Sorting",
  summary: "Understand the simplest searching algorithm: scanning elements sequentially from start to finish until the target is found or the collection ends.",

  definitions: [
    {
      term: "Linear Search",
      def: "Checks each element in order until the target is found or the list ends."
    },
    {
      term: "Best & Worst Case",
      def: "Best case O(1) (target is the very first element); worst case O(n) (target is at the end or missing)."
    },
    {
      term: "Precondition",
      def: "Works on sorted or unsorted data — makes no assumptions about element ordering."
    }
  ],

  howItWorksTogether: "Linear search needs no sorted data because it checks everything in sequence — that's why it's slow but universally applicable, unlike binary search which trades \"needs sorted data\" for real speed.",

  interactiveWidget: "linear-search",

  visual: {
    caption: "Figure 1: Linear Search sequentially examining array indices from left to right until finding target value 23.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="700" text-anchor="middle">Linear Search Step-by-Step Scan</text>
        
        <g transform="translate(60, 60)">
          <!-- Box 0: checked -->
          <rect x="0" y="0" width="70" height="60" fill="var(--bg-surface)" stroke="var(--text-muted)" stroke-width="1.5" rx="6" opacity="0.6"/>
          <text x="35" y="32" fill="var(--text-muted)" font-size="14" font-weight="500" text-anchor="middle">12</text>
          <text x="35" y="52" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[0] ✗</text>
          
          <!-- Box 1: checked -->
          <rect x="80" y="0" width="70" height="60" fill="var(--bg-surface)" stroke="var(--text-muted)" stroke-width="1.5" rx="6" opacity="0.6"/>
          <text x="115" y="32" fill="var(--text-muted)" font-size="14" font-weight="500" text-anchor="middle">45</text>
          <text x="115" y="52" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[1] ✗</text>

          <!-- Box 2: checked -->
          <rect x="160" y="0" width="70" height="60" fill="var(--bg-surface)" stroke="var(--text-muted)" stroke-width="1.5" rx="6" opacity="0.6"/>
          <text x="195" y="32" fill="var(--text-muted)" font-size="14" font-weight="500" text-anchor="middle">7</text>
          <text x="195" y="52" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[2] ✗</text>

          <!-- Box 3: Target Match -->
          <rect x="240" y="0" width="70" height="60" fill="rgba(16,185,129,0.18)" stroke="#10B981" stroke-width="2.5" rx="6"/>
          <text x="275" y="32" fill="var(--text-primary)" font-size="14" font-weight="600" text-anchor="middle">23</text>
          <text x="275" y="52" fill="#10B981" font-size="10" font-weight="500" text-anchor="middle">[3] ✓ MATCH</text>

          <!-- Box 4: Unchecked -->
          <rect x="320" y="0" width="70" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="355" y="32" fill="var(--text-secondary)" font-size="14" font-weight="500" text-anchor="middle">89</text>
          <text x="355" y="52" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[4]</text>

          <!-- Box 5: Unchecked -->
          <rect x="400" y="0" width="70" height="60" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="6"/>
          <text x="435" y="32" fill="var(--text-secondary)" font-size="14" font-weight="500" text-anchor="middle">34</text>
          <text x="435" y="52" fill="var(--text-muted)" font-size="10" font-weight="400" text-anchor="middle">[5]</text>
        </g>

        <!-- Scanning indicator arrow -->
        <g transform="translate(335, 140)">
          <text x="0" y="30" fill="var(--accent-primary)" font-size="12" font-weight="500" text-anchor="middle">Scan direction ➔ (O(n) worst case)</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="kw">function</span> <span class="fn">linearSearch</span>(arr, target) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++) {
    <span class="kw">if</span> (arr[i] === target) <span class="kw">return</span> i;
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}`,

  complexityNotes: [
    "Time Complexity (Best): O(1) when the target is at index 0.",
    "Time Complexity (Worst/Average): O(n) when target is at the end or absent.",
    "Space Complexity: O(1) auxiliary space — operates in-place without extra memory."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Using linear search on large sorted data",
      desc: "Using linear search when binary search is far faster (O(log n) vs O(n))."
    },
    {
      title: "Mistake 2: Forgetting to return -1 when target is missing",
      desc: "Forgetting to return -1 or handles missing target, leading to undefined returns or bugs."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the worst-case time complexity of Linear Search, and when does it occur?",
      a: "O(n), occurring when the target is at the very last index or not present in the array at all, forcing a check of all n items."
    },
    {
      q: "Question 2: Does Linear Search require the data to be sorted before searching?",
      a: "No. Linear Search works on both sorted and unsorted data because it inspects every element one by one."
    }
  ],

  challenge: {
    titleText: "Challenge: Return All Matching Indices",
    desc: "Modify Linear Search to return an array of <em>all</em> indices where the target appears, rather than stopping at the first match."
  }
};
