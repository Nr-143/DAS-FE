/**
 * DSA Tracker — Lesson Content: Arrays (Level 2)
 * ───────────────────────────────────────────────
 * Comprehensive interactive module: Concept, Operations (CRUD),
 * Internal Memory Models, Visualizer integration, and Practice.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["arrays"] = {
  id: "arrays",
  title: "Arrays",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master contiguous indexing, O(1) random access by memory offset calculation, shifting costs on insert/delete, and how JavaScript's dynamic arrays work under the hood.",

  definitions: [
    {
      term: "Array",
      def: "A linear data structure consisting of a collection of elements identified by index, stored in contiguous memory locations so that the position of each element can be calculated directly via mathematical offset."
    },
    {
      term: "Zero-based Index",
      def: "A numbering system starting at 0 representing the distance or 'offset' from the beginning of the array. The first element is at offset 0, second at offset 1."
    },
    {
      term: "Contiguous Memory & Random Access",
      def: "Memory cells located sequentially right next to each other. Because each cell has a uniform size, address of index i is computed directly as <code>BaseAddress + (i * ElementSize)</code> in O(1) time without visiting any preceding elements."
    },
    {
      term: "Dynamic Array vs. Static Array",
      def: "Static arrays (C, Java) have a fixed size allocated at creation. JavaScript arrays are dynamic: they automatically resize by allocating a larger memory buffer (usually 1.5x or 2x) and copying existing elements when capacity is exceeded."
    },
    {
      term: "Element Shifting",
      def: "When inserting or deleting at any position other than the very end, all subsequent elements must physically move one index right or left to maintain contiguous sequential order — an O(n) linear time operation."
    }
  ],

  howItWorksTogether: "Arrays provide instantaneous O(1) read and write access because the computer can calculate any element's memory address with a single multiplication and addition. However, this contiguous arrangement creates a trade-off: inserting or removing elements in the middle or beginning forces every element to shift, taking O(n) time. Dynamic arrays mitigate reallocation overhead using amortized O(1) append operations at the end.",

  whyMatters: "Arrays are the most ubiquitous foundation in computer science. Hash tables, heaps, circular queues, dynamic programming tables, and matrix representations are all built directly on top of arrays. Understanding when array operations are fast (end operations, index access) versus slow (unshift, middle splice) is essential for writing performant software.",

  interactiveWidget: "array-visualizer",

  workedExample: {
    title: "Array Memory Offset Math & CRUD Operations",
    primitiveText: "<code>// Memory Calculation Formula:<br/>// Address(arr[i]) = BaseAddress + (i * ElementSize)<br/>const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];<br/><br/>// 1. Read: originalArray[2] → 7 (O(1))<br/>// 2. Add: originalArray.push(9) → [..., 9] (O(1) amortized)<br/>// 3. Insert: insert 10 at index 3 → shifts indices 3..7 right (O(n))<br/>// 4. Update: originalArray[4] = 99 (O(1))<br/>// 5. Delete: delete index 2 → shifts remaining elements left (O(n))</code>",
    referenceText: "Notice that accessing index 7 takes the exact same single instruction as accessing index 0 — no scanning required!"
  },

  codeSnippet: `// Standard Array Operations in JavaScript
const originalArray = [8, 3, 7, 4, 2, 6, 1, 5];

// 1. READ / ACCESS — O(1)
const val = originalArray[2]; // 7

// 2. TRAVERSE / SEARCH — O(n)
for (let i = 0; i < originalArray.length; i++) {
  if (originalArray[i] === 4) console.log("Found at index", i);
}

// 3. ADD TO END (push) — O(1) amortized
originalArray.push(9); // [8, 3, 7, 4, 2, 6, 1, 5, 9]

// 4. INSERT AT INDEX (splice) — O(n) due to shifting
originalArray.splice(3, 0, 10); // inserts 10 at index 3

// 5. UPDATE ELEMENT — O(1) in-place rewrite
originalArray[4] = 99;

// 6. DELETE BY INDEX — O(n) due to left shifting
const removed = originalArray.splice(2, 1); // removes index 2`,

  complexityNotes: [
    "Access by Index: O(1) Constant Time — direct hardware pointer arithmetic.",
    "Search (Unsorted): O(n) Linear Time — must check elements one by one.",
    "Append at End (push): O(1) Amortized Constant Time.",
    "Insert at Index / unshift: O(n) Linear Time — shifts elements to the right.",
    "Delete at Index / shift: O(n) Linear Time — shifts elements to the left.",
    "Space Complexity: O(n) contiguous memory allocation."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing Array Index with Array Length (Off-by-One)",
      desc: "Because arrays are zero-indexed, an array with <code>n</code> items has valid indices from <code>0</code> to <code>n - 1</code>. Accessing <code>arr[arr.length]</code> is always outside bounds and returns <code>undefined</code>."
    },
    {
      title: "Mistake 2: Using unshift() or shift() in loops",
      desc: "<code>unshift()</code> and <code>shift()</code> operate at index 0, requiring every single existing element to shift right or left. Calling <code>shift()</code> inside a loop of size n results in disastrous <code>O(n²)</code> quadratic time!"
    },
    {
      title: "Mistake 3: Believing array copy is in-place with assignment",
      desc: "Doing <code>const b = arr;</code> creates a reference copy pointing to the same memory on the heap, NOT an independent clone. Modifying <code>b</code> mutates <code>arr</code>. Use spread <code>const b = [...arr];</code> for a shallow clone."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What allows an array to achieve O(1) constant time access for any index?",
      options: [
        "A. Mathematical offset calculation from contiguous memory layout",
        "B. Pointers stored inside each node pointing to the next node",
        "C. Binary search executed on the CPU",
        "D. Dynamic resizing buffers"
      ],
      answer: "A",
      explanation: "Because elements are stored contiguously in memory and each item is the same byte size, memory address = Base + (Index * Size), which evaluates in a single arithmetic CPU instruction."
    },
    {
      question: "Q2. If an array has 1,000 elements, inserting a new element at index 0 requires how many elements to shift?",
      options: [
        "A. 0 elements",
        "B. 1 element",
        "C. 1,000 elements",
        "D. 500 elements"
      ],
      answer: "C",
      explanation: "Inserting at index 0 requires all 1,000 existing elements (indices 0 through 999) to shift right by one index to create a vacant slot at index 0, costing O(n) time."
    }
  ],

  practice: [
    {
      q: "Why is push() considered O(1) amortized instead of pure O(1)?",
      a: "Most push operations simply place the element into the pre-allocated capacity buffer in O(1) time. However, when the buffer is completely full, the runtime must allocate a new buffer (e.g., double the size) and copy all N existing elements over, taking O(n) time. Because doubling occurs infrequently, the average cost over many appends is O(1) amortized."
    },
    {
      q: "What is the difference between accessing an element, searching for an element, and traversing an array?",
      a: "Accessing looks up an element when the index is already known (O(1)). Searching inspects values sequentially to find where a target value lives (O(n)). Traversing visits every single element in the array to process, transform, or print them (O(n))."
    }
  ],

  challenge: {
    titleText: "Challenge: In-Place Array Rotation by K",
    desc: "Given an array, rotate it to the right by <code>k</code> steps in-place with O(1) extra space. For example, <code>[8, 3, 7, 4, 2, 6, 1, 5]</code> rotated by 3 becomes <code>[6, 1, 5, 8, 3, 7, 4, 2]</code>. Hint: Reverse the entire array, reverse the first k elements, then reverse the remaining elements!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    twoSumNote: true,
    suggestedStartingNote: "Start with Two Sum (1). Understand the brute force O(n²) array nested loop first, then learn how hash maps optimize lookups to O(n).",
    problems: [
      { num: 1, title: "Two Sum", concept: "Array + Hash Map", slug: "two-sum", isSuggestedStart: true, roadmapStep: 2, isImmediateNext: true },
      { num: 121, title: "Best Time to Buy and Sell Stock", concept: "Array Sliding / Greedy", slug: "best-time-to-buy-and-sell-stock", roadmapStep: 4, isImmediateNext: true },
      { num: 217, title: "Contains Duplicate", concept: "Array + Hash Set", slug: "contains-duplicate", roadmapStep: 3, isImmediateNext: true },
      { num: 268, title: "Missing Number", concept: "Array + Math / XOR", slug: "missing-number" },
      { num: 136, title: "Single Number", concept: "Array + XOR Bitmask", slug: "single-number" }
    ]
  }
};
