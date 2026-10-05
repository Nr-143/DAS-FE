/**
 * DSA Tracker — Lesson Content: Time Complexity (Big-O)
 * ──────────────────────────────────────────────────────
 * Independent content module with per-notation interactive data schema (Task 1 & Task 3).
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["time-complexity"] = {
  id: "time-complexity",
  title: "Time Complexity (Big-O)",
  levelTitle: "Level 1 — Foundations",
  summary: "Master Big-O notation, asymptotic analysis, and interactively explore all 7 canonical growth classes.",

  // Task 2: Definition-Style Format
  definitions: [
    {
      term: "Big-O Notation",
      def: "A mathematical notation describing the upper bound (worst-case) growth rate of an algorithm's runtime or space as input size n approaches infinity."
    },
    {
      term: "Time Complexity",
      def: "The computational time an algorithm takes to run as a function of input length n, measured in fundamental operations."
    },
    {
      term: "Space Complexity",
      def: "The total memory space (stack frames + heap allocations) an algorithm consumes during execution."
    },
    {
      term: "Asymptotics",
      def: "Evaluating algorithm efficiency for very large input sizes n, ignoring constant multipliers and non-dominant terms."
    }
  ],

  howItWorksTogether: "Big-O notation gives engineers a standardized way to compare algorithms regardless of hardware speed. For instance, when searching for an element in an array of size <code>n</code>, a simple linear loop performs up to <code>n</code> operations (<code>O(n)</code>), whereas Binary Search divides the search space in half at each step, taking at most <code>log₂(n)</code> operations (<code>O(log n)</code>). As <code>n</code> grows to 1,000,000, <code>O(n)</code> takes 1,000,000 checks, while <code>O(log n)</code> requires only 20 checks.",

  // Task 3: Interactive Per-Notation Schema Array
  notations: [
    {
      id: "o-1",
      label: "O(1)",
      name: "Constant Time",
      color: "#2d8a68",
      basicFlow: "Execution time remains fixed and constant regardless of whether input size n is 1 or 1,000,000.",
      realExample: "Accessing a book directly from a shelf slot when you already know its exact index number.",
      code: `function getItem(arr, index) {\n  return arr[index];\n}`,
      animType: "single-box",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Faint Reference Line O(n) -->
          <line x1="40" y1="160" x2="340" y2="40" stroke="var(--border-default)" stroke-dasharray="4,4" stroke-width="1.5"/>
          <!-- Active Curve O(1) -->
          <line x1="40" y1="140" x2="360" y2="140" stroke="#2d8a68" stroke-width="3.5"/>
          <text x="320" y="130" fill="#34d399" font-size="12" font-weight="bold">O(1)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-log-n",
      label: "O(log n)",
      name: "Logarithmic Time",
      color: "#2b8a88",
      basicFlow: "Each operation step eliminates half of the remaining items, so execution time grows very slowly relative to input size.",
      realExample: "Looking up a word in a printed dictionary by repeatedly opening to the middle page and discarding half the book.",
      code: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
      animType: "halving-boxes",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Faint Reference Line O(n) -->
          <line x1="40" y1="160" x2="340" y2="40" stroke="var(--border-default)" stroke-dasharray="4,4" stroke-width="1.5"/>
          <!-- Active Curve O(log n) -->
          <path d="M 40 160 Q 150 140 360 120" stroke="#2b8a88" stroke-width="3.5" fill="none"/>
          <text x="320" y="110" fill="#2dd4bf" font-size="12" font-weight="bold">O(log n)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-n",
      label: "O(n)",
      name: "Linear Time",
      color: "#3b629b",
      basicFlow: "Execution time grows in direct 1:1 proportion with the input size n.",
      realExample: "Reading a book page by page from start to finish to find a specific quote.",
      code: `function findSum(arr) {\n  let total = 0;\n  for (let num of arr) total += num;\n  return total;\n}`,
      animType: "sequential-boxes",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Faint Reference Line O(n^2) -->
          <path d="M 40 160 Q 140 140 200 20" stroke="var(--border-default)" stroke-dasharray="4,4" stroke-width="1.5" fill="none"/>
          <!-- Active Curve O(n) -->
          <line x1="40" y1="160" x2="340" y2="40" stroke="#3b629b" stroke-width="3.5"/>
          <text x="310" y="30" fill="#60a5fa" font-size="12" font-weight="bold">O(n)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-n-log-n",
      label: "O(n log n)",
      name: "Linearithmic Time",
      color: "#6d4c9a",
      basicFlow: "Performs a logarithmic operation (dividing problem into halves) n times.",
      realExample: "Sorting a deck of cards by splitting into smaller sub-piles, sorting each, and merging them back.",
      code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`,
      animType: "divide-merge",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Active Curve O(n log n) -->
          <path d="M 40 160 Q 200 120 300 30" stroke="#6d4c9a" stroke-width="3.5" fill="none"/>
          <text x="270" y="25" fill="#c084fc" font-size="12" font-weight="bold">O(n log n)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-n-2",
      label: "O(n²)",
      name: "Quadratic Time",
      color: "#9a642b",
      basicFlow: "Execution time grows quadratically because an inner loop runs n times for every iteration of an outer loop.",
      realExample: "Comparing every student in a classroom against every other student to find all unique pairs.",
      code: `function hasDuplicates(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}`,
      animType: "grid-matrix",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Active Curve O(n^2) -->
          <path d="M 40 160 Q 140 140 200 20" stroke="#9a642b" stroke-width="3.5" fill="none"/>
          <text x="180" y="20" fill="#fbbf24" font-size="12" font-weight="bold">O(n²)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-2-n",
      label: "O(2ⁿ)",
      name: "Exponential Time",
      color: "#b84a4a",
      basicFlow: "Execution time doubles with every single additional element added to input size n.",
      realExample: "Calculating every possible subset combination of characters for a password via brute force.",
      code: `function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}`,
      animType: "binary-tree",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Active Curve O(2^n) -->
          <path d="M 40 160 Q 90 140 120 20" stroke="#b84a4a" stroke-width="3.5" fill="none"/>
          <text x="110" y="20" fill="#f87171" font-size="12" font-weight="bold">O(2ⁿ)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    },
    {
      id: "o-n-factorial",
      label: "O(n!)",
      name: "Factorial Time",
      color: "#9a3b6d",
      basicFlow: "Execution time grows proportionally to the product of all positive integers up to n.",
      realExample: "Calculating every possible ordering route to visit n cities (Traveling Salesperson Problem).",
      code: `function getPermutations(arr) {\n  if (arr.length === 0) return [[]];\n  const res = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    for (let p of getPermutations(rest)) res.push([arr[i], ...p]);\n  }\n  return res;\n}`,
      animType: "factorial-tree",
      chartSvg: `
        <svg viewBox="0 0 400 200" class="notation-chart-svg">
          <rect width="400" height="200" fill="var(--bg-body)" rx="8"/>
          <line x1="40" y1="160" x2="360" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="160" stroke="var(--text-muted)" stroke-width="1.5"/>
          <!-- Active Curve O(n!) -->
          <path d="M 40 160 Q 60 140 75 20" stroke="#9a3b6d" stroke-width="3.5" fill="none"/>
          <text x="65" y="20" fill="#f472b6" font-size="12" font-weight="bold">O(n!)</text>
          <text x="200" y="185" fill="var(--text-muted)" font-size="10" text-anchor="middle">Input Size (n) →</text>
        </svg>
      `
    }
  ],

  // All 7 Curves Combined Chart
  combinedChartSvg: `
    <svg class="diagram-svg" viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="340" fill="var(--bg-body)" rx="12"/>
      <line x1="60" y1="280" x2="680" y2="280" stroke="var(--text-muted)" stroke-width="2"/>
      <line x1="60" y1="40" x2="60" y2="280" stroke="var(--text-muted)" stroke-width="2"/>
      <text x="370" y="315" fill="var(--text-secondary)" font-size="12" font-weight="bold">Input Size (n) →</text>
      <text x="25" y="160" fill="var(--text-secondary)" font-size="12" font-weight="bold" transform="rotate(-90,25,160)">Operations →</text>
      
      <path d="M 60 270 L 670 270" stroke="#2d8a68" stroke-width="3" fill="none"/>
      <text x="610" y="260" fill="#34d399" font-size="11" font-weight="bold">O(1)</text>

      <path d="M 60 270 Q 200 250 670 230" stroke="#2b8a88" stroke-width="3" fill="none"/>
      <text x="610" y="220" fill="#2dd4bf" font-size="11" font-weight="bold">O(log n)</text>

      <path d="M 60 270 L 600 120" stroke="#3b629b" stroke-width="3" fill="none"/>
      <text x="560" y="110" fill="#60a5fa" font-size="11" font-weight="bold">O(n)</text>

      <path d="M 60 270 Q 300 200 480 50" stroke="#6d4c9a" stroke-width="3" fill="none"/>
      <text x="440" y="45" fill="#c084fc" font-size="11" font-weight="bold">O(n log n)</text>

      <path d="M 60 270 Q 200 240 280 40" stroke="#9a642b" stroke-width="3" fill="none"/>
      <text x="250" y="35" fill="#fbbf24" font-size="11" font-weight="bold">O(n²)</text>

      <path d="M 60 270 Q 120 250 160 40" stroke="#b84a4a" stroke-width="3" fill="none"/>
      <text x="145" y="35" fill="#f87171" font-size="11" font-weight="bold">O(2ⁿ)</text>

      <path d="M 60 270 Q 85 240 105 40" stroke="#9a3b6d" stroke-width="3" fill="none"/>
      <text x="80" y="35" fill="#f472b6" font-size="11" font-weight="bold">O(n!)</text>
    </svg>
  `,

  complexityNotes: [
    "Rule 1: Drop Constants. O(2n + 5) simplifies to O(n).",
    "Rule 2: Drop Non-Dominant Terms. O(n² + 100n + 5000) simplifies to O(n²).",
    "Rule 3: Add for Sequential Steps, Multiply for Nested Loops."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing two sequential loops with O(n²)",
      desc: "Two separate loops running sequentially is <code>O(n + n) = O(2n) = O(n)</code>. Only nested loops multiply into <code>O(n²)</code>."
    },
    {
      title: "Mistake 2: Dropping the wrong term in O(n² + n)",
      desc: "Always drop lower-order terms. <code>O(n² + n)</code> simplifies to <code>O(n²)</code>, NOT <code>O(n)</code>."
    },
    {
      title: "Mistake 3: Assuming array methods like .includes() are O(1)",
      desc: "JS built-ins like <code>.includes()</code> and <code>.unshift()</code> iterate under the hood, making them <code>O(n)</code> linear operations."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the Big-O time complexity of `function check(arr) { for (let x of arr) { if (x === 5) return true; } return false; }`?",
      a: "Worst case is `O(n)` linear time. If target `5` is missing, the loop runs `n` times."
    },
    {
      q: "Question 2: Simplify the expression `O(4n³ + 300n² + 8000)`:",
      a: "`O(n³)`. Drop coefficient `4`, constant `8000`, and lower-order term `300n²`."
    },
    {
      q: "Question 3: Why is `arr.unshift(item)` O(n) while `arr.push(item)` is O(1)?",
      a: "`push()` appends at the end. `unshift()` inserts at index 0, requiring V8 to shift every element's memory index right by 1 (`O(n)` operations)."
    }
  ],

  challenge: {
    titleText: "Challenge: Recursive vs Iterative Space Complexity",
    desc: "Compare Binary Search implemented iteratively vs recursively. What is the Space Complexity of each? (Iterative: <code>O(1)</code> space. Recursive: <code>O(log n)</code> space due to call stack frames)."
  }
};
