/**
 * DSA Tracker — Lesson Content: Algorithmic Patterns (Level 7)
 * Covers: Two Pointers, Sliding Window, Prefix Sum, Backtracking,
 * Greedy Algorithms, DP (1D & 2D), Bit Manipulation
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// Two Pointers
window.LESSONS_CONTENT["two-pointers"] = {
  id: "two-pointers",
  title: "Two Pointers",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Optimize nested array traversals from O(n²) to O(n) by using two pointer references moving towards each other or in lockstep.",

  definitions: [
    { term: "Two Pointers", def: "A pattern using two index variables to scan data sequentially from opposite ends or at different speeds." }
  ],

  howItWorksTogether: "In sorted arrays, placing left at index 0 and right at index n-1 allows sum checking in O(n) time.",
  whyMatters: "Essential for Two Sum II, Container With Most Water, 3Sum, and Palindrome verification.",

  workedExample: {
    title: "Two Sum II (Sorted Array)",
    primitiveText: "<code>function twoSum(nums, target) {<br/>  let L = 0, R = nums.length - 1;<br/>  while (L < R) {<br/>    let sum = nums[L] + nums[R];<br/>    if (sum === target) return [L + 1, R + 1];<br/>    if (sum < target) L++;<br/>    else R--;<br/>  }<br/>}</code>"
  },

  codeSnippet: `function isPalindrome(s) {
  let clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let L = 0, R = clean.length - 1;
  while (L < R) {
    if (clean[L] !== clean[R]) return false;
    L++; R--;
  }
  return true;
}`,

  complexityNotes: ["Time: O(n).", "Space: O(1)."],
  commonMistakes: [{ title: "Mistake 1: Unsorted array assumption", desc: "Opposite-end Two Pointers only works if array is sorted." }],
  miniQuiz: [{ question: "Q1. What is the time complexity of Two Pointers on a sorted array?", options: ["A. O(1)", "B. O(n)", "C. O(n²)", "D. O(n log n)"], answer: "B", explanation: "Scans array in a single linear pass." }],
  practice: [{ q: "When should fast & slow pointers be used?", a: "For cycle detection in linked lists (Floyd's Cycle Finding Algorithm) or finding middle nodes." }]
};

// Sliding Window
window.LESSONS_CONTENT["sliding-window"] = {
  id: "sliding-window",
  title: "Sliding Window",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Convert subsegment/contiguous subarray problems from O(n²) to O(n) by maintaining a dynamic window.",

  definitions: [
    { term: "Sliding Window", def: "A technique maintaining a contiguous subarray window defined by start and end indices." }
  ],

  howItWorksTogether: "Instead of recalculating window totals from scratch, add the incoming element at R and subtract the outgoing element at L.",
  whyMatters: "Used for Maximum Subarray of size K, Longest Substring Without Repeating Characters, and Minimum Window Substring.",

  workedExample: {
    title: "Max Sum Subarray of Size K",
    primitiveText: "<code>function maxSubarraySum(arr, k) {<br/>  let maxSum = 0, windowSum = 0;<br/>  for (let i = 0; i < k; i++) windowSum += arr[i];<br/>  maxSum = windowSum;<br/>  for (let i = k; i < arr.length; i++) {<br/>    windowSum += arr[i] - arr[i - k];<br/>    maxSum = Math.max(maxSum, windowSum);<br/>  }<br/>  return maxSum;<br/>}</code>"
  },

  codeSnippet: `function lengthOfLongestSubstring(s) {
  let set = new Set();
  let L = 0, maxLen = 0;
  for (let R = 0; R < s.length; R++) {
    while (set.has(s[R])) {
      set.delete(s[L]);
      L++;
    }
    set.add(s[R]);
    maxLen = Math.max(maxLen, R - L + 1);
  }
  return maxLen;
}`,

  complexityNotes: ["Time: O(n).", "Space: O(k) or O(1)."],
  commonMistakes: [{ title: "Mistake 1: Using on non-contiguous subsegments", desc: "Sliding window only applies to contiguous subarrays or substrings." }],
  miniQuiz: [{ question: "Q1. What type of problems benefit from Sliding Window?", options: ["A. Disjoint sets", "B. Contiguous subarray / substring problems", "C. Sorting numbers", "D. Tree traversal"], answer: "B", explanation: "Sliding window operates over contiguous subsegments of linear data." }],
  practice: [{ q: "What is the difference between fixed and variable size sliding windows?", a: "Fixed windows maintain size K; variable windows grow/shrink based on condition criteria." }]
};

// Prefix Sum
window.LESSONS_CONTENT["prefix-sum"] = {
  id: "prefix-sum",
  title: "Prefix Sum",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Precompute cumulative sum arrays to answer range sum queries in O(1) time.",

  definitions: [
    { term: "Prefix Sum", def: "An array where prefix[i] stores the sum of elements from index 0 to i." }
  ],

  howItWorksTogether: "Sum of subarray between indices L and R is computed as prefix[R] - prefix[L - 1] in O(1) time.",
  whyMatters: "Power Range Sum Queries, Subarray Sum Equals K, and 2D matrix sum queries.",

  workedExample: {
    title: "Range Sum Query",
    primitiveText: "<code>nums = [2, 4, 1, 3, 5]<br/>prefix = [2, 6, 7, 10, 15]<br/>sum(1..3) = prefix[3] - prefix[0] = 10 - 2 = 8</code>"
  },

  codeSnippet: `class NumArray {
  constructor(nums) {
    this.prefix = [0];
    for (let n of nums) {
      this.prefix.push(this.prefix[this.prefix.length - 1] + n);
    }
  }

  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}`,

  complexityNotes: ["Preprocessing: O(n) time.", "Query: O(1) time.", "Space: O(n)."],
  commonMistakes: [{ title: "Mistake 1: Off-by-one errors", desc: "Using a 1-indexed prefix sum array simplifies range calculations `P[R+1] - P[L]`." }],
  miniQuiz: [{ question: "Q1. What is the time complexity of a range sum query with Prefix Sum?", options: ["A. O(1)", "B. O(n)", "C. O(log n)", "D. O(n²)"], answer: "A", explanation: "Answering precomputed range queries takes constant O(1) time." }],
  practice: [{ q: "How can Prefix Sum combined with Hash Map solve 'Subarray Sum Equals K' in O(n)?", a: "By storing prefix sum counts in a map and checking if `(currentPrefix - K)` exists in the map." }]
};

// Backtracking
window.LESSONS_CONTENT["backtracking"] = {
  id: "backtracking",
  title: "Backtracking",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Systematically explore all potential candidates to build solutions, pruning paths that fail constraints.",

  definitions: [
    { term: "Backtracking", def: "A recursive depth-first search approach that builds candidates incrementally and abandons ('backtracks') when a candidate cannot lead to a valid solution." }
  ],

  howItWorksTogether: "Recursively chooses an option, explores further, then un-chooses (backtracks) to try alternate branches.",
  whyMatters: "Used for Subsets, Permutations, Combinations, N-Queens, Sudoku Solver, and Word Search.",

  workedExample: {
    title: "Subsets (Power Set)",
    primitiveText: "<code>function subsets(nums) {<br/>  const res = [];<br/>  function backtrack(start, path) {<br/>    res.push([...path]);<br/>    for (let i = start; i < nums.length; i++) {<br/>      path.push(nums[i]);     // Choose<br/>      backtrack(i + 1, path); // Explore<br/>      path.pop();             // Un-choose (Backtrack)<br/>    }<br/>  }<br/>  backtrack(0, []);<br/>  return res;<br/>}</code>"
  },

  codeSnippet: `function permute(nums) {
  const res = [];
  function backtrack(path, used) {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      backtrack(path, used);
      path.pop(); used[i] = false;
    }
  }
  backtrack([], []);
  return res;
}`,

  complexityNotes: ["Time: Exponential / Combinatorial O(2ⁿ) or O(n!).", "Space: O(n) stack space."],
  commonMistakes: [{ title: "Mistake 1: Forgetting to undo choice", desc: "Forgetting `path.pop()` or resetting state causes state corruption across recursive calls." }],
  miniQuiz: [{ question: "Q1. What is the key step in backtracking after exploring a recursive branch?", options: ["A. Break loop", "B. Un-choose / undo the change", "C. Return null", "D. Throw error"], answer: "B", explanation: "Backtracking requires restoring state before trying the next branch option." }],
  practice: [{ q: "What is pruning in backtracking?", a: "Early termination of a recursive path when constraints indicate it cannot produce a valid solution." }]
};

// Greedy Algorithms
window.LESSONS_CONTENT["greedy-algorithms"] = {
  id: "greedy-algorithms",
  title: "Greedy Algorithms",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Make locally optimal choices at each step with the hope of finding a global optimum.",

  definitions: [
    { term: "Greedy Choice Property", def: "A global optimum can be reached by making locally optimal (greedy) choices at each step." }
  ],

  howItWorksTogether: "Selects the best available option without revisiting past decisions.",
  whyMatters: "Used in Activity Selection / Non-overlapping Intervals, Jump Game, Huffman Coding, and Minimum Spanning Trees.",

  workedExample: {
    title: "Jump Game",
    primitiveText: "<code>function canJump(nums) {<br/>  let maxReach = 0;<br/>  for (let i = 0; i < nums.length; i++) {<br/>    if (i > maxReach) return false;<br/>    maxReach = Math.max(maxReach, i + nums[i]);<br/>  }<br/>  return true;<br/>}</code>"
  },

  codeSnippet: `function eraseOverlapIntervals(intervals) {
  if (!intervals.length) return 0;
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time
  let count = 0, prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      count++; // Remove overlapping
    } else {
      prevEnd = intervals[i][1];
    }
  }
  return count;
}`,

  complexityNotes: ["Time: Usually O(n log n) due to sorting, or O(n) single pass.", "Space: O(1)."],
  commonMistakes: [{ title: "Mistake 1: Applying Greedy when Dynamic Programming is required", desc: "Greedy choices don't work for 0/1 Knapsack—local optimum does not yield global optimum." }],
  miniQuiz: [{ question: "Q1. Does a Greedy choice always yield the global optimal solution?", options: ["A. Yes, always", "B. No, only if the problem exhibits greedy choice property", "C. Never", "D. Only for trees"], answer: "B", explanation: "Greedy only works for problems where local choices guarantee global optimality." }],
  practice: [{ q: "Why sorting intervals by end time is key for interval scheduling?", a: "Finishing earlier leaves maximum room for remaining non-overlapping intervals." }]
};

// Dynamic Programming (1D)
window.LESSONS_CONTENT["dynamic-programming-1d"] = {
  id: "dynamic-programming-1d",
  title: "Dynamic Programming (1D)",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Solve complex optimization problems by breaking them down into 1D subproblems and storing results (Memoization / Tabulation).",

  definitions: [
    { term: "Optimal Substructure", def: "An optimal solution to the problem contains optimal solutions to its subproblems." },
    { term: "Overlapping Subproblems", def: "The same subproblems are solved repeatedly during execution." },
    { term: "Tabulation (Bottom-Up)", def: "Filling a 1D DP table iteratively from base cases to the final answer." }
  ],

  howItWorksTogether: "Stores already calculated subproblem answers in an array `dp[]` to reduce time complexity from exponential O(2ⁿ) to linear O(n).",
  whyMatters: "Powers Climbing Stairs, Coin Change, House Robber, and Longest Increasing Subsequence.",

  workedExample: {
    title: "Climbing Stairs (1D DP)",
    primitiveText: "<code>function climbStairs(n) {<br/>  if (n <= 2) return n;<br/>  const dp = new Array(n + 1);<br/>  dp[1] = 1; dp[2] = 2;<br/>  for (let i = 3; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];<br/>  return dp[n];<br/>}</code>"
  },

  codeSnippet: `function rob(nums) {
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];
  let prev2 = 0, prev1 = 0;
  for (let num of nums) {
    let curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,

  complexityNotes: ["Time: O(n).", "Space: O(n) tabulation, optimized to O(1) using two variables."],
  commonMistakes: [{ title: "Mistake 1: Incorrect recurrence relation", desc: "Always clearly define what `dp[i]` represents before writing loops." }],
  miniQuiz: [{ question: "Q1. What are the two necessary properties for a DP solution?", options: ["A. Sorting & Searching", "B. Optimal Substructure & Overlapping Subproblems", "C. Stack & Queue", "D. Recursion & Loops"], answer: "B", explanation: "DP requires optimal substructure and overlapping subproblems." }],
  practice: [{ q: "How do you optimize 1D DP space from O(n) to O(1)?", a: "By keeping track of only the previous 1 or 2 state values needed for computation." }]
};

// Dynamic Programming (2D)
window.LESSONS_CONTENT["dynamic-programming-2d"] = {
  id: "dynamic-programming-2d",
  title: "Dynamic Programming (2D)",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Solve complex grid and multi-sequence problems using 2D DP matrices.",

  definitions: [
    { term: "2D DP", def: "A DP technique where state is represented by two variables `dp[i][j]`." }
  ],

  howItWorksTogether: "Fills a 2D matrix where state `dp[i][j]` depends on neighboring cells `dp[i-1][j]`, `dp[i][j-1]`, or `dp[i-1][j-1]`.",
  whyMatters: "Used for 0/1 Knapsack, Longest Common Subsequence (LCS), Edit Distance, and Unique Paths in grids.",

  workedExample: {
    title: "Unique Paths in a Grid",
    primitiveText: "<code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>"
  },

  codeSnippet: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`,

  complexityNotes: ["Time: O(m × n).", "Space: O(m × n)."],
  commonMistakes: [{ title: "Mistake 1: Matrix dimensions off-by-one", desc: "Creating `(m+1) × (n+1)` matrices simplifies base case initialization at index 0." }],
  miniQuiz: [{ question: "Q1. What is the time complexity of 0/1 Knapsack with N items and capacity W?", options: ["A. O(N * W)", "B. O(2ᴺ)", "C. O(N)", "D. O(W²)"], answer: "A", explanation: "State depends on item index and remaining weight capacity, yielding O(N * W) pseudo-polynomial time." }],
  practice: [{ q: "What does Edit Distance measure?", a: "The minimum number of operations (insert, delete, replace) required to convert one string into another." }]
};

// Bit Manipulation
window.LESSONS_CONTENT["bit-manipulation"] = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  levelTitle: "Level 7 — Algorithmic Patterns",
  summary: "Manipulate individual bits directly using bitwise operators (`AND`, `OR`, `XOR`, `NOT`, bit shifts) for lightning-fast O(1) arithmetic.",

  definitions: [
    { term: "Bitwise Operators", def: "Operators performing operations on binary numbers: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (Left Shift), `>>` (Right Shift)." }
  ],

  howItWorksTogether: "Key XOR identities: `x ^ x = 0`, `x ^ 0 = x`. Clearing lowest set bit: `n & (n - 1)`.",
  whyMatters: "Used in Single Number, Counting Bits, Bitmasking state representation, and low-level system optimizations.",

  workedExample: {
    title: "Single Number (XOR Property)",
    primitiveText: "<code>function singleNumber(nums) {<br/>  let result = 0;<br/>  for (let num of nums) result ^= num;<br/>  return result;<br/>}</code>"
  },

  codeSnippet: `// Count set bits (Brian Kernighan's Algorithm)
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // clears lowest set bit
    count++;
  }
  return count;
}`,

  complexityNotes: ["Time: O(1) or O(32) constant time.", "Space: O(1)."],
  commonMistakes: [{ title: "Mistake 1: Operator Precedence", desc: "Bitwise operators have lower precedence than arithmetic/comparison operators! Always wrap bitwise expressions in parentheses e.g. `(n & 1) === 0`." }],
  miniQuiz: [{ question: "Q1. What is the result of `x ^ x`?", options: ["A. x", "B. 0", "C. 1", "D. 2x"], answer: "B", explanation: "Any number XORed with itself is 0." }],
  practice: [{ q: "How do you check if a number is a power of 2 using bit manipulation?", a: "Check `n > 0 && (n & (n - 1)) === 0`." }]
};
