/**
 * DSA Tracker — Lesson Content: Trees (Level 5)
 * Covers: Binary Trees, Binary Search Tree (BST), Heaps, and Trie
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// Binary Trees & Traversals
window.LESSONS_CONTENT["binary-trees"] = {
  id: "binary-trees",
  title: "Binary Trees & Traversals",
  levelTitle: "Level 5 — Trees",
  summary: "Understand non-linear tree structures, node pointers, and depth-first (Inorder, Preorder, Postorder) and breadth-first traversals.",

  definitions: [
    {
      term: "Binary Tree",
      def: "A hierarchical tree structure where each node has at most two children: a left child and a right child."
    },
    {
      term: "Root Node",
      def: "The topmost node of the tree from which all traversals begin."
    },
    {
      term: "Traversals",
      def: "Methods for visiting every node in a tree systematically: Preorder (N-L-R), Inorder (L-N-R), Postorder (L-R-N), and Level-Order (BFS)."
    }
  ],

  howItWorksTogether: "Trees represent hierarchical data like file systems or DOM nodes. Traversals allow algorithms to visit each node to process values.",
  whyMatters: "Tree traversals are fundamental to searching, decision trees, and expression parsing.",

  workedExample: {
    title: "Tree Node & Inorder Traversal",
    primitiveText: "<code>class TreeNode {<br/>  constructor(val) {<br/>    this.val = val;<br/>    this.left = null;<br/>    this.right = null;<br/>  }<br/>}</code>"
  },

  codeSnippet: `function inorderTraversal(root, result = []) {
  if (!root) return result;
  inorderTraversal(root.left, result);  // Left
  result.push(root.val);                // Node
  inorderTraversal(root.right, result); // Right
  return result;
}`,

  complexityNotes: [
    "Traversal Time: O(n) — visits every node once.",
    "Space: O(h) where h is tree height (call stack space)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting base case",
      desc: "Forgetting `if (!root) return` leads to infinite call stack errors on leaf children."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the visit order for Inorder Traversal?",
      options: ["A. Left, Node, Right", "B. Node, Left, Right", "C. Left, Right, Node", "D. Node, Right, Left"],
      answer: "A",
      explanation: "Inorder traversal visits Left subtree, then current Node, then Right subtree."
    }
  ],

  practice: [
    {
      q: "What does Inorder Traversal on a Binary Search Tree produce?",
      a: "It produces the node values in sorted ascending order."
    }
  ]
};

// Binary Search Tree (BST)
window.LESSONS_CONTENT["binary-search-tree"] = {
  id: "binary-search-tree",
  title: "Binary Search Tree (BST)",
  levelTitle: "Level 5 — Trees",
  summary: "Master Binary Search Trees where left child < root < right child for fast O(log n) searching, insertion, and deletion.",

  definitions: [
    {
      term: "Binary Search Tree (BST)",
      def: "A binary tree property where for every node, all left descendants are smaller and all right descendants are larger."
    },
    {
      term: "O(log n) Search",
      def: "By discarding half the tree at each step, BST search takes logarithmic time on balanced trees."
    }
  ],

  howItWorksTogether: "BSTs combine the fast O(log n) searching of sorted arrays with the dynamic insertion/deletion capabilities of linked lists.",
  whyMatters: "BSTs form the basis for self-balancing trees (AVL, Red-Black trees) used in database indexes and standard libraries.",

  workedExample: {
    title: "BST Search Function",
    primitiveText: "<code>function searchBST(root, target) {<br/>  if (!root || root.val === target) return root;<br/>  if (target < root.val) return searchBST(root.left, target);<br/>  return searchBST(root.right, target);<br/>}</code>"
  },

  codeSnippet: `class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) { this.root = newNode; return; }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = newNode; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = newNode; break; }
        curr = curr.right;
      }
    }
  }
}`,

  complexityNotes: [
    "Search/Insert/Delete: O(log n) average (balanced), O(n) worst-case (skewed tree)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Degenerate (skewed) trees",
      desc: "Inserting sorted numbers into a BST creates a linked list with O(n) performance unless self-balancing."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the average search time in a balanced BST?",
      options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n²)"],
      answer: "B",
      explanation: "Each comparison eliminates half of the remaining nodes, giving O(log n) time."
    }
  ],

  practice: [
    {
      q: "How do you find the minimum value in a BST?",
      a: "Traverse continuously to the leftmost node until node.left is null."
    }
  ]
};

// Heaps & Priority Queue
window.LESSONS_CONTENT["heaps"] = {
  id: "heaps",
  title: "Heaps & Priority Queue",
  levelTitle: "Level 5 — Trees",
  summary: "Learn Min-Heaps and Max-Heaps for efficient O(1) access to min/max elements and O(log n) insertions/removals.",

  definitions: [
    {
      term: "Heap",
      def: "A complete binary tree satisfying the heap property (Min-Heap: parent ≤ children; Max-Heap: parent ≥ children)."
    },
    {
      term: "Priority Queue",
      def: "An abstract data type where elements are served based on priority rather than insertion order."
    }
  ],

  howItWorksTogether: "Heaps are usually stored as continuous arrays where left child is at index 2i+1 and right child is at 2i+2. Heapify operations restore order after insert/extract.",
  whyMatters: "Heaps power Dijkstra's algorithm, Top K elements problems, and task schedulers.",

  workedExample: {
    title: "Min Heap Array Storage",
    primitiveText: "<code>Array: [10, 15, 20, 30, 40]<br/>Parent at index i → Left child: 2i + 1, Right child: 2i + 2</code>"
  },

  codeSnippet: `class MinHeap {
  constructor() { this.heap = []; }
  peek() { return this.heap[0]; }
  
  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }
}`,

  complexityNotes: [
    "Get Min/Max: O(1).",
    "Insert / Extract Min: O(log n).",
    "Build Heap: O(n)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing Heap with BST",
      desc: "A Heap does not enforce left < right. It only guarantees parent priority over children."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the time complexity to insert into a Heap?",
      options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n log n)"],
      answer: "B",
      explanation: "Bubble-up takes logarithmic time relative to heap height."
    }
  ],

  practice: [
    {
      q: "Why are arrays preferred over node pointers for storing Heaps?",
      a: "Because a heap is a complete binary tree, parent/child relationships can be computed mathematically without pointer overhead."
    }
  ]
};

// Trie (Prefix Tree)
window.LESSONS_CONTENT["trie"] = {
  id: "trie",
  title: "Trie (Prefix Tree)",
  levelTitle: "Level 5 — Trees",
  summary: "Master prefix trees for fast string autocomplete, dictionary searches, and prefix matching.",

  definitions: [
    {
      term: "Trie",
      def: "A tree structure where each node represents a character of a string, enabling fast prefix-based retrieval."
    },
    {
      term: "Prefix Matching",
      def: "Finding all words starting with a prefix in O(k) time where k is prefix length."
    }
  ],

  howItWorksTogether: "Nodes contain a map of child characters and an `isEndOfWord` boolean flag. Searching or inserting a word of length k takes O(k) time independent of total words stored.",
  whyMatters: "Tries power search engine autocomplete, spell checkers, and IP routing tables.",

  workedExample: {
    title: "Trie Structure Example",
    primitiveText: "<code>root -> 'c' -> 'a' -> 't' (isEndOfWord = true)<br/>           └ -> 'r' (isEndOfWord = true)</code>"
  },

  codeSnippet: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}`,

  complexityNotes: [
    "Insert: O(k) time where k is word length.",
    "Search / Prefix Check: O(k) time."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Memory overhead",
      desc: "Creating many TrieNode objects can use significant memory if keys have large alphabets."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the lookup time for a word of length L in a Trie with N words?",
      options: ["A. O(N)", "B. O(log N)", "C. O(L)", "D. O(N * L)"],
      answer: "C",
      explanation: "Trie lookup depends only on the length L of the search word, not total number of stored words N."
    }
  ],

  practice: [
    {
      q: "Where are Tries commonly used in real-world applications?",
      a: "In search engine auto-complete suggestions, spell checkers, and T9 predictive texting."
    }
  ]
};
