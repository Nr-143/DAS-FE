/**
 * DSA Tracker — Lesson Content: Trees (Level 5)
 * Covers: Binary Trees, Binary Search Tree (BST), Heaps, and Trie
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// ==========================================
// 1. BINARY TREES & TRAVERSALS (UNLOCKED)
// ==========================================
window.LESSONS_CONTENT["binary-trees"] = {
  id: "binary-trees",
  title: "Binary Trees & Traversals",
  levelTitle: "Level 5 — Trees",
  summary: "Master hierarchical non-linear structures: parent-child pointers, depth and height metrics, and systematic traversals (Inorder, Preorder, Postorder, and BFS Level-order).",

  definitions: [
    {
      term: "Binary Tree",
      def: "A hierarchical non-linear data structure where each node contains at most two children: designated as the left child and the right child."
    },
    {
      term: "Root, Parent, Child, Leaf",
      def: "The <strong>Root</strong> is the topmost entry node without a parent. A <strong>Parent</strong> has links to descendant <strong>Children</strong>. A <strong>Leaf</strong> is a terminal node with no children (<code>left === null && right === null</code>)."
    },
    {
      term: "Depth vs. Height",
      def: "<strong>Depth</strong> is the number of edges from the root down to a specific node (root has depth 0). <strong>Height</strong> is the number of edges on the longest path from a node down to a leaf."
    },
    {
      term: "Depth-First Search (DFS) Traversals",
      def: "Recursive traversals visiting subtrees deeply before backtracking: <strong>Preorder</strong> (Node → Left → Right), <strong>Inorder</strong> (Left → Node → Right), and <strong>Postorder</strong> (Left → Right → Node)."
    },
    {
      term: "Breadth-First Search (BFS) / Level-Order",
      def: "A horizontal traversal visiting every node level by level from top to bottom, left to right, implemented using a FIFO Queue."
    }
  ],

  howItWorksTogether: "Linear structures like arrays and linked lists have a single predecessor and successor. Trees represent hierarchical, branching data. Because each node can branch into two subproblems (left and right), tree algorithms rely on recursion. In DFS traversals, the call stack implicitly tracks backtracking; in BFS, an explicit Queue maintains the frontier of nodes to visit on each depth level.",

  whyMatters: "Trees model DOM nodes in browsers, abstract syntax trees (ASTs) in compilers, hierarchical file systems on disk, JSON object trees, and form the foundation for decision trees in machine learning.",

  interactiveWidget: "binary-trees-visualizer",

  workedExample: {
    title: "Tree Node & 4 Traversal Orders",
    primitiveText: "<code>       20<br/>      /  \\<br/>    10    30<br/>    / \\   / \\<br/>   5  15 25 35<br/><br/>// 1. Inorder (L-N-R):   [5, 10, 15, 20, 25, 30, 35]<br/>// 2. Preorder (N-L-R):  [20, 10, 5, 15, 30, 25, 35]<br/>// 3. Postorder (L-R-N): [5, 15, 10, 25, 35, 30, 20]<br/>// 4. Level-Order (BFS): [20, 10, 30, 5, 15, 25, 35]</code>",
    referenceText: "Notice how Inorder traversal on a binary search tree naturally yields sorted ascending values!"
  },

  codeSnippet: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 1. INORDER TRAVERSAL (Left -> Node -> Right)
function inorderTraversal(root, result = []) {
  if (!root) return result;
  inorderTraversal(root.left, result);  // Left
  result.push(root.val);                // Node
  inorderTraversal(root.right, result); // Right
  return result;
}

// 2. PREORDER TRAVERSAL (Node -> Left -> Right)
function preorderTraversal(root, result = []) {
  if (!root) return result;
  result.push(root.val);                 // Node FIRST
  preorderTraversal(root.left, result);  // Left
  preorderTraversal(root.right, result); // Right
  return result;
}

// 3. LEVEL-ORDER TRAVERSAL (BFS with Queue)
function levelOrder(root) {
  if (!root) return [];
  const queue = [root], result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,

  complexityNotes: [
    "Traversal Time (all methods): O(n) — visits every node exactly once.",
    "DFS Traversal Space: O(h) where h is tree height (call stack frames).",
    "Balanced Tree Height: h = O(log n); Degenerate Tree Height: h = O(n).",
    "BFS Level-Order Space: O(w) where w is the maximum width of the tree (up to n/2 nodes at leaf level)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting Base Case in Tree Recursion",
      desc: "Forgetting <code>if (!root) return;</code> causes infinite recursive calls and stack overflow errors on leaf node children (where left or right is null)."
    },
    {
      title: "Mistake 2: Confusing Inorder, Preorder, and Postorder sequence",
      desc: "Preorder processes the current node BEFORE recursing into children; Inorder processes between left and right; Postorder processes AFTER both children have returned."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the visit order for Inorder Traversal?",
      options: [
        "A. Left subtree, current Node, Right subtree",
        "B. Current Node, Left subtree, Right subtree",
        "C. Left subtree, Right subtree, current Node",
        "D. Level by level from top to bottom"
      ],
      answer: "A",
      explanation: "Inorder traversal visits the Left child first, then the current Node, then the Right child (L-N-R)."
    },
    {
      question: "Q2. Which traversal strategy is implemented using a FIFO Queue?",
      options: [
        "A. Inorder",
        "B. Preorder",
        "C. Level-Order (BFS)",
        "D. Postorder"
      ],
      answer: "C",
      explanation: "Level-Order traversal uses a Queue to process all nodes at level d before any nodes at level d + 1."
    }
  ],

  practice: [
    {
      q: "What does Inorder Traversal produce when executed on a Binary Search Tree?",
      a: "It produces the node values in sorted ascending order."
    },
    {
      q: "How can you compute the maximum depth (height) of a binary tree recursively?",
      a: "If `root === null`, return 0. Otherwise, return `1 + Math.max(maxDepth(root.left), maxDepth(root.right))`."
    }
  ],

  challenge: {
    titleText: "Challenge: Maximum Depth of Binary Tree (LeetCode 104)",
    desc: "Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from root down to the farthest leaf node."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 104 — Maximum Depth of Binary Tree and 94 — Binary Tree Inorder Traversal.",
    problems: [
      { num: 104, title: "Maximum Depth of Binary Tree", concept: "DFS Recursion Height", slug: "maximum-depth-of-binary-tree", isSuggestedStart: true, isImmediateNext: true },
      { num: 94, title: "Binary Tree Inorder Traversal", concept: "Inorder L-N-R", slug: "binary-tree-inorder-traversal", isImmediateNext: true },
      { num: 102, title: "Binary Tree Level Order Traversal", concept: "BFS Queue Level by Level", slug: "binary-tree-level-order-traversal" },
      { num: 226, title: "Invert Binary Tree", concept: "Recursive Child Swap", slug: "invert-binary-tree" }
    ]
  }
};

// ==========================================
// 2. BINARY SEARCH TREE (BST) (UNLOCKED)
// ==========================================
window.LESSONS_CONTENT["binary-search-tree"] = {
  id: "binary-search-tree",
  title: "Binary Search Tree (BST)",
  levelTitle: "Level 5 — Trees",
  summary: "Master the BST ordering rule (left < root < right), logarithmic search & insertion, and the three cases of node deletion including in-order successor swaps.",

  definitions: [
    {
      term: "Binary Search Tree (BST)",
      def: "A binary tree property where for every node: all values in its left subtree are strictly LESS than the node's value, and all values in its right subtree are strictly GREATER."
    },
    {
      term: "O(log n) Search Performance",
      def: "Because half of the remaining tree is eliminated at each comparison step, searching a balanced BST runs in logarithmic time proportional to tree height."
    },
    {
      term: "In-Order Successor",
      def: "The node with the smallest value that is strictly greater than the target node. It is found by stepping to the target's right child, then walking left as far as possible."
    },
    {
      term: "The 3 Deletion Cases",
      def: "1. <strong>Leaf Node:</strong> Simply set parent's pointer to null.<br/>2. <strong>One Child:</strong> Parent adopts the single child.<br/>3. <strong>Two Children:</strong> Find in-order successor, copy its value to the target, then delete the successor leaf."
    },
    {
      term: "Degenerate / Skewed Tree",
      def: "When numbers are inserted in already-sorted order (1, 2, 3, 4, 5), an unbalanced BST degrades into a linear linked list with O(n) search time unless self-balanced (AVL or Red-Black tree)."
    }
  ],

  howItWorksTogether: "BSTs combine the fast O(log n) search capability of a sorted array with the dynamic pointer-based insertion and deletion capability of a linked list. During insertion or search, each comparison (`target < node.val` or `target > node.val`) halves the remaining search space. Deletion is the most intricate operation: deleting a node with two children requires replacing it with its in-order successor (the minimum node in its right subtree) to guarantee the ordering rule remains unbroken.",

  whyMatters: "BSTs form the backbone of database indexing engines (B-Trees, B+ Trees), ordered dictionary collections in standard libraries (`std::map`, Java `TreeMap`), autocomplete priority structures, and interval trees.",

  interactiveWidget: "bst-visualizer",

  workedExample: {
    title: "BST Search & 3 Deletion Cases",
    primitiveText: "<code>Search for 25 in root 20:<br/>1. 25 > 20 → branch RIGHT to 30<br/>2. 25 < 30 → branch LEFT to 25<br/>3. 25 === 25 → FOUND in 2 comparisons! (O(log n))<br/><br/>Delete 20 (has two children 10 and 30):<br/>- Inorder successor is 25 (min in right subtree)<br/>- Copy 25 into root<br/>- Delete leaf 25 from right subtree</code>",
    referenceText: "Notice how the in-order successor preserves left < root < right!"
  },

  codeSnippet: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 1. SEARCH BST — O(log n) average
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}

// 2. INSERT BST — O(log n) average
function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insertBST(root.left, val);
  else if (val > root.val) root.right = insertBST(root.right, val);
  return root;
}

// 3. DELETE NODE — Handles all 3 cases
function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    // Case 1 & 2: 0 or 1 child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3: 2 children — Find in-order successor
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.val = succ.val; // copy successor value
    root.right = deleteNode(root.right, succ.val); // delete successor leaf
  }
  return root;
}`,

  complexityNotes: [
    "Search: O(log n) Average (Balanced); O(n) Worst (Skewed).",
    "Insert: O(log n) Average (Balanced); O(n) Worst (Skewed).",
    "Delete: O(log n) Average (Balanced); O(n) Worst (Skewed).",
    "Space Complexity: O(h) where h is tree height for recursive call stack."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Degenerate Skewed Trees from Sorted Data",
      desc: "Inserting already-sorted numbers (<code>1, 2, 3, 4, 5</code>) into a basic BST produces a single long right branch, turning the tree into a linked list with <code>O(n)</code> search time. Production databases use self-balancing trees (AVL or Red-Black)."
    },
    {
      title: "Mistake 2: Picking an Invalid Successor on 2-Child Delete",
      desc: "When deleting a node with two children, you MUST pick either the in-order successor (minimum in right subtree) OR the in-order predecessor (maximum in left subtree). Picking an arbitrary child breaks the BST ordering condition."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the average time complexity to search in a balanced Binary Search Tree?",
      options: [
        "A. O(1)",
        "B. O(log n)",
        "C. O(n)",
        "D. O(n log n)"
      ],
      answer: "B",
      explanation: "Each comparison eliminates half of the remaining nodes, yielding O(log n) time."
    },
    {
      question: "Q2. When deleting a node with two children, what is used to replace its value?",
      options: [
        "A. Any random leaf node",
        "B. The root of the tree",
        "C. The in-order successor (minimum value in its right subtree)",
        "D. Null"
      ],
      answer: "C",
      explanation: "The in-order successor is the smallest value greater than the node, guaranteeing all left descendants remain smaller and all right descendants remain larger."
    }
  ],

  practice: [
    {
      q: "How do you find the minimum and maximum values in a BST?",
      a: "Minimum: Start at root and traverse `node.left` continuously until `node.left === null`. Maximum: Start at root and traverse `node.right` continuously until `node.right === null`."
    },
    {
      q: "How can you validate whether an arbitrary binary tree is a valid BST?",
      a: "Perform a recursive check passing valid range boundaries: `isValidBST(node, min, max)`. At each node, verify `min < node.val < max`, then recurse: `isValidBST(node.left, min, node.val)` and `isValidBST(node.right, node.val, max)`."
    }
  ],

  challenge: {
    titleText: "Challenge: Validate Binary Search Tree (LeetCode 98)",
    desc: "Given the root of a binary tree, determine if it is a valid Binary Search Tree (BST). Remember that every node in the entire left subtree must be smaller than the root, not just the immediate child!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 700 — Search in a Binary Search Tree, followed by 98 — Validate Binary Search Tree.",
    problems: [
      { num: 700, title: "Search in a Binary Search Tree", concept: "BST Left/Right Navigation", slug: "search-in-a-binary-search-tree", isSuggestedStart: true, isImmediateNext: true },
      { num: 98, title: "Validate Binary Search Tree", concept: "Min/Max Boundary Recursion", slug: "validate-binary-search-tree", isImmediateNext: true },
      { num: 450, title: "Delete Node in a BST", concept: "3-Case Node Removal", slug: "delete-node-in-a-bst" },
      { num: 235, title: "Lowest Common Ancestor of a BST", concept: "BST Split Point", slug: "lowest-common-ancestor-of-a-binary-search-tree" }
    ]
  }
};

// ==========================================
// 3. HEAPS & TRIE (PRESERVED - LOCKED TOPICS)
// ==========================================
window.LESSONS_CONTENT["heaps"] = {
  id: "heaps",
  title: "Heaps & Priority Queue",
  levelTitle: "Level 5 — Trees",
  summary: "Learn Min-Heaps and Max-Heaps for efficient O(1) access to min/max elements and O(log n) insertions/removals.",
  definitions: [
    { term: "Heap", def: "A complete binary tree satisfying the heap property (Min-Heap: parent ≤ children; Max-Heap: parent ≥ children)." }
  ]
};

window.LESSONS_CONTENT["trie"] = {
  id: "trie",
  title: "Trie (Prefix Tree)",
  levelTitle: "Level 5 — Trees",
  summary: "Master prefix trees for fast string autocomplete, dictionary searches, and prefix matching.",
  definitions: [
    { term: "Trie", def: "A tree structure where each node represents a character of a string, enabling fast prefix-based retrieval." }
  ]
};
