/**
 * DSA Tracker — Lesson Content: Singly Linked List (Level 2)
 * ────────────────────────────────────────────────────────────
 * Comprehensive interactive module: Concept, Node Models, Pointer
 * Mechanics, CRUD Operations, Visualizer integration, and Practice.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linked-list-singly"] = {
  id: "linked-list-singly",
  title: "Linked List (Singly)",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Understand node-based memory architectures, pointer chains, O(1) front insertion/deletion, why random access requires O(n) traversal, and critical pointer update sequencing.",

  definitions: [
    {
      term: "Singly Linked List",
      def: "A linear data structure where elements are stored in separate node objects scattered throughout heap memory, connected together by directional reference pointers (<code>next</code>)."
    },
    {
      term: "Node",
      def: "The fundamental building block of a linked list. Each node contains two fields: <code>value</code> (the payload data) and <code>next</code> (a memory reference pointing to the succeeding node or <code>null</code>)."
    },
    {
      term: "Head Pointer",
      def: "A reference variable pointing to the first node of the list. If <code>head === null</code>, the list is empty. All sequential operations must enter through the head."
    },
    {
      term: "Tail Node",
      def: "The final node in the list. Its <code>next</code> pointer is always <code>null</code>, marking the termination boundary of traversal."
    },
    {
      term: "Sequential vs. Random Access",
      def: "Because nodes are scattered in memory without uniform mathematical address offsets, reaching node <code>k</code> requires walking pointer-by-pointer from <code>head</code> in O(n) time — there is no direct indexing like arrays provide."
    }
  ],

  howItWorksTogether: "Unlike an array, which requires a single continuous block of memory, each linked list node is independently allocated on the heap wherever memory is available. Inserting at the head requires simply pointing the new node's <code>next</code> to the current head and moving the head pointer — an instantaneous O(1) operation with zero element shifting. However, finding any element by index requires traversing every single pointer sequentially from the beginning (O(n)). The sequencing of pointer assignments is critical: you must always connect a new node to its successor before redirecting the predecessor's pointer, or the rest of the list becomes unreachable and lost to garbage collection.",

  whyMatters: "Linked lists illustrate the foundations of pointer and reference manipulation in memory. Stacks, queues, adjacency lists in graphs, and hash table collision chains (separate chaining) rely heavily on linked list architectures. Solving linked list problems in interviews demonstrates deep mastery of reference variables, edge case handling, and avoiding pointer disconnection bugs.",

  interactiveWidget: "singly-linked-list-visualizer",

  workedExample: {
    title: "Singly Linked List Node Structure & Operations",
    primitiveText: "<code>class Node {<br/>  constructor(value) {<br/>    this.value = value;<br/>    this.next = null;<br/>  }<br/>}<br/><br/>// 1. Insert Head: newNode.next = head; head = newNode; (O(1))<br/>// 2. Insert Pos 2: newNode.next = curr.next; curr.next = newNode; (O(n))<br/>// 3. Read Pos 2: walk 2 pointers from head (O(n))<br/>// 4. Delete Head: head = head.next; (O(1))<br/>// 5. Delete Mid: prev.next = curr.next; (O(n))</code>",
    referenceText: "Notice that inserting at the head never shifts other nodes, unlike an array unshift!"
  },

  codeSnippet: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 1. INSERT AT HEAD — O(1)
  insertHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head; // connect successor FIRST
    this.head = newNode;      // redirect head
    this.size++;
  }

  // 2. INSERT AT TAIL — O(n) without tail pointer, O(1) with
  insertTail(value) {
    const newNode = new Node(value);
    if (!this.head) { this.head = newNode; this.size++; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = newNode;
    this.size++;
  }

  // 3. INSERT AT POSITION — O(n) traversal + O(1) link
  insertAt(pos, value) {
    if (pos === 0) return this.insertHead(value);
    let curr = this.head;
    for (let i = 0; i < pos - 1; i++) {
      if (!curr) return;
      curr = curr.next;
    }
    const newNode = new Node(value);
    newNode.next = curr.next; // CRITICAL: Link successor first!
    curr.next = newNode;      // Redirect predecessor
    this.size++;
  }

  // 4. READ / GET BY INDEX — O(n) sequential walk
  get(index) {
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      if (!curr) return null;
      curr = curr.next;
    }
    return curr ? curr.value : null;
  }

  // 5. DELETE HEAD — O(1)
  deleteHead() {
    if (!this.head) return null;
    const removed = this.head.value;
    this.head = this.head.next; // garbage collector reclaims old head
    this.size--;
    return removed;
  }

  // 6. DELETE BY VALUE — O(n)
  delete(value) {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let curr = this.head;
    while (curr.next && curr.next.value !== value) curr = curr.next;
    if (curr.next) {
      curr.next = curr.next.next; // bypass target node
      this.size--;
      return true;
    }
    return false;
  }
}`,

  complexityNotes: [
    "Insert at Head: O(1) Constant Time — only re-points 2 references.",
    "Delete at Head: O(1) Constant Time — just head = head.next.",
    "Insert at Tail (with tail ref): O(1) Constant Time; without tail ref: O(n).",
    "Access / Read by Index: O(n) Linear Time — must traverse pointer-by-pointer.",
    "Search for Value: O(n) Linear Time — sequential scan from head.",
    "Memory Overhead: O(n) extra reference pointers (1 pointer per node) compared to plain arrays."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Losing the Reference Chain by Overwriting Pointers in Wrong Order",
      desc: "When inserting at position <code>k</code>, writing <code>curr.next = newNode</code> BEFORE setting <code>newNode.next = curr.next</code> destroys the reference to the rest of the list! The remaining nodes become unreferenced and lost."
    },
    {
      title: "Mistake 2: Forgetting Edge Cases (Empty List and Single-Node List)",
      desc: "Always check what happens when <code>head === null</code> or when <code>head.next === null</code>. Code that accesses <code>curr.next.value</code> without checking if <code>curr.next</code> exists will throw a <code>TypeError: Cannot read properties of null</code>."
    },
    {
      title: "Mistake 3: Infinite Loops Due to Unintended Cycles",
      desc: "Accidentally pointing a node's <code>next</code> back to an earlier node creates a circular cycle, causing <code>while (curr)</code> loops to hang indefinitely. Use Floyd's Cycle Detection algorithm (Fast & Slow pointers) to test for cycles."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. Why is inserting at the beginning of a singly linked list O(1), but O(n) for an array?",
      options: [
        "A. Linked list nodes reside in cache while arrays do not",
        "B. Linked list insert only re-points head and new node's next, whereas arrays must shift all elements right",
        "C. JavaScript compiles linked lists to assembly instructions",
        "D. Linked lists pre-allocate empty slots"
      ],
      answer: "B",
      explanation: "Inserting at the head of a linked list only rewires two pointer references (newNode.next = head; head = newNode), which executes in O(1) time regardless of list size. An array must shift every existing element right by one index, taking O(n) time."
    },
    {
      question: "Q2. When inserting node B between node A and node C, what must occur first?",
      options: [
        "A. A.next must point to B",
        "B. B.next must point to C before A.next is redirected",
        "C. Head must be set to null",
        "D. Node C must be copied"
      ],
      answer: "B",
      explanation: "If A.next is overwritten first, the reference to C is lost. You must always link B.next = C (successor) first, then redirect A.next = B."
    }
  ],

  practice: [
    {
      q: "How does Floyd's Tortoise and Hare algorithm detect a cycle in a linked list in O(n) time and O(1) space?",
      a: "Initialize two pointers at head: `slow` (moves 1 step at a time) and `fast` (moves 2 steps at a time). If the list is acyclic, `fast` reaches null. If a cycle exists, `fast` enters the loop and will eventually lap and meet `slow` (`slow === fast`)."
    },
    {
      q: "How can you find the middle of a singly linked list in a single pass?",
      a: "Use Fast and Slow pointers. Advance `slow` by 1 node and `fast` by 2 nodes on each loop iteration. When `fast` reaches the tail (or null), `slow` will be pointing precisely at the middle node."
    }
  ],

  challenge: {
    titleText: "Challenge: Reverse a Singly Linked List In-Place",
    desc: "Reverse a singly linked list in-place using three pointers (<code>prev</code>, <code>curr</code>, <code>next</code>) without allocating new nodes. Transform <code>1 -> 2 -> 3 -> null</code> into <code>3 -> 2 -> 1 -> null</code> in O(n) time and O(1) extra space!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    solvingOrder: "876 → 206 → 21 → 141 → 19",
    suggestedStartingNote: "Start with 876 — Middle of the Linked List to master Fast/Slow pointers, followed immediately by 206 — Reverse Linked List.",
    problems: [
      { num: 876, title: "Middle of the Linked List", concept: "Fast + Slow Pointers", slug: "middle-of-the-linked-list", roadmapStep: 8, isSuggestedStart: true, isImmediateNext: true },
      { num: 206, title: "Reverse Linked List", concept: "3-Pointer In-Place Reversal", slug: "reverse-linked-list", roadmapStep: 9, isImmediateNext: true },
      { num: 21, title: "Merge Two Sorted Lists", concept: "Dummy Node + Pointer Splice", slug: "merge-two-sorted-lists", roadmapStep: 10 },
      { num: 141, title: "Linked List Cycle", concept: "Floyd's Tortoise & Hare", slug: "linked-list-cycle", roadmapStep: 11 },
      { num: 19, title: "Remove Nth Node From End of List", concept: "Two Pointers with Gap", slug: "remove-nth-node-from-end-of-list", roadmapStep: 12 }
    ]
  }
};
