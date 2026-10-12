/**
 * DSA Tracker — Lesson Content: Doubly Linked List (Level 2)
 * ────────────────────────────────────────────────────────────
 * Comprehensive interactive module: Concept, Bidirectional Pointers,
 * 4-Way Pointer Reconnects, Memory Trade-offs, and Visualizer.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linked-list-doubly"] = {
  id: "linked-list-doubly",
  title: "Linked List (Doubly)",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master bidirectional node chains, prev and next pointers, O(1) removal of known nodes, 4-way pointer reconnect mechanics, and memory trade-offs.",

  definitions: [
    {
      term: "Doubly Linked List (DLL)",
      def: "A linear data structure where each node stores two directional references: <code>next</code> pointing to the successor node and <code>prev</code> pointing to the predecessor node, allowing traversal in both directions."
    },
    {
      term: "Prev Pointer",
      def: "The backward reference pointer in each node. For the head node, <code>prev === null</code>. It enables bidirectional traversal and O(1) predecessor access without walking from head."
    },
    {
      term: "Head & Tail Pointers",
      def: "A doubly linked list typically maintains direct references to both the first node (<code>head</code>) and the last node (<code>tail</code>), making operations at both ends O(1) constant time."
    },
    {
      term: "4-Way Pointer Reconnect",
      def: "When inserting a node between two existing nodes A and B, 4 pointer links must be established: <code>newNode.prev = A</code>, <code>newNode.next = B</code>, <code>A.next = newNode</code>, and <code>B.prev = newNode</code>."
    },
    {
      term: "Memory Trade-off",
      def: "Each doubly linked list node must store two 64-bit pointers (prev and next) in addition to its value, requiring ~50% more reference memory per node than a singly linked list."
    }
  ],

  howItWorksTogether: "In a singly linked list, removing a known node or inserting before a node requires walking from the head in O(n) time just to discover the predecessor. A doubly linked list solves this: because every node already knows its predecessor via <code>node.prev</code>, you can disconnect and remove any node in pure O(1) time: <code>node.prev.next = node.next; node.next.prev = node.prev;</code>. The trade-off is higher memory consumption and the discipline to always update BOTH pointers on mutation — failing to update <code>prev</code> will corrupt backward traversal while forward traversal appears to work normally.",

  whyMatters: "Doubly linked lists power critical systems abstractions: browser Forward/Back navigation history, audio playlist queues, LRU (Least Recently Used) cache algorithms (paired with a Hash Map for O(1) get and put), and operating system thread schedulers.",

  interactiveWidget: "doubly-linked-list-visualizer",

  workedExample: {
    title: "Doubly Linked List Node & 4-Way Pointer Reconnect",
    primitiveText: "<code>class DNode {<br/>  constructor(val) {<br/>    this.val = val;<br/>    this.prev = null;<br/>    this.next = null;<br/>  }<br/>}<br/><br/>// Inserting newNode between nodeA and nodeB:<br/>newNode.prev = nodeA;<br/>newNode.next = nodeB;<br/>nodeB.prev = newNode;<br/>nodeA.next = newNode;</code>",
    referenceText: "Notice that both forward and backward connections must be established!"
  },

  codeSnippet: `class DNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 1. INSERT AT HEAD — O(1)
  insertHead(val) {
    const newNode = new DNode(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // 2. INSERT AT TAIL — O(1) with tail reference
  insertTail(val) {
    const newNode = new DNode(val);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // 3. INSERT BETWEEN TWO NODES — O(1) given predecessor
  insertAfter(node, val) {
    if (!node) return;
    const newNode = new DNode(val);
    newNode.next = node.next;
    newNode.prev = node;
    if (node.next) node.next.prev = newNode;
    else this.tail = newNode;
    node.next = newNode;
    this.size++;
  }

  // 4. REMOVE A KNOWN NODE — O(1) without search!
  removeNode(node) {
    if (!node) return;
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next; // was head

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev; // was tail

    node.prev = null;
    node.next = null;
    this.size--;
  }

  // 5. BACKWARD TRAVERSAL (from Tail to Head)
  printBackward() {
    let curr = this.tail;
    while (curr) {
      console.log(curr.val);
      curr = curr.prev; // follow PREV pointer!
    }
  }
}`,

  complexityNotes: [
    "Insert at Head / Tail: O(1) Constant Time.",
    "Remove Known Node: O(1) Constant Time — prev pointer eliminates backward search.",
    "Access / Search by Index: O(n) Linear Time (can optimize to O(n/2) by starting at tail if index > size / 2).",
    "Forward / Backward Traversal: O(n) Linear Time.",
    "Space Overhead: O(2n) reference pointers (2 pointers per node) — higher memory cost than singly linked lists."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Half-Connected Links (Updating next but forgetting prev)",
      desc: "Updating <code>A.next = B</code> without also setting <code>B.prev = A</code> creates a partially broken list. Forward traversal appears to work, but backward traversal will skip nodes or throw <code>null</code> pointer exceptions."
    },
    {
      title: "Mistake 2: Boundary Head & Tail Disconnections",
      desc: "When deleting the head node, <code>head.prev</code> is null. When deleting the tail, <code>tail.next</code> is null. Attempting <code>node.prev.next</code> when <code>node.prev === null</code> throws a fatal runtime crash. Always guard boundary edges."
    },
    {
      title: "Mistake 3: Assuming Doubly Linked is Always Superior to Singly Linked",
      desc: "The bidirectional prev pointer carries non-trivial memory overhead. For applications that only need FIFO queueing or linear streaming, a singly linked list is more cache-friendly and uses less heap allocation."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. Why does removing a known node from a doubly linked list take O(1) time, while in a singly linked list it takes O(n)?",
      options: [
        "A. Doubly linked lists are stored in contiguous memory",
        "B. The node already has a prev pointer to its predecessor, eliminating the need to walk from the head",
        "C. JavaScript optimizes two-way pointers in the V8 engine",
        "D. Doubly linked lists use binary search"
      ],
      answer: "B",
      explanation: "In a singly linked list, removing a node requires traversing from the head to find the node's predecessor. In a doubly linked list, node.prev directly references the predecessor, allowing immediate O(1) link bypassing."
    },
    {
      question: "Q2. How many pointer references must be updated when inserting a new node between two existing nodes in a doubly linked list?",
      options: [
        "A. 1 pointer",
        "B. 2 pointers",
        "C. 4 pointers",
        "D. 8 pointers"
      ],
      answer: "C",
      explanation: "You must configure 4 pointers: newNode.prev, newNode.next, predecessor.next, and successor.prev."
    }
  ],

  practice: [
    {
      q: "How does an LRU (Least Recently Used) cache use a Doubly Linked List with a Hash Map?",
      a: "The Hash Map provides O(1) key-to-node lookups. When an item is accessed or updated, the Doubly Linked List unlinks the node in O(1) time using its prev and next pointers and moves it to the head (most recently used). When the cache is full, the tail node (least recently used) is evicted in O(1) time."
    },
    {
      q: "Can search in a doubly linked list be optimized compared to a singly linked list?",
      a: "Yes. If accessing an element by index `i` in a list of size `n`, you can check if `i < n / 2`. If `i` is in the first half, traverse forward from `head`. If `i` is in the second half, traverse backward from `tail`, cutting the average search steps in half (O(n/2))."
    }
  ],

  challenge: {
    titleText: "Challenge: Design an LRU Cache Eviction Policy",
    desc: "Explain how to combine a JavaScript `Map` and a Doubly Linked List to implement `get(key)` and `put(key, value)` so that both operations run in strict O(1) average time, automatically evicting the least recently accessed item when capacity is reached."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 146 — LRU Cache. It is the premier real-world demonstration of Doubly Linked Lists in system design and algorithmic interviews.",
    problems: [
      { num: 146, title: "LRU Cache", concept: "Doubly Linked List + Hash Map", slug: "lru-cache", isSuggestedStart: true, isImmediateNext: true },
      { num: 430, title: "Flatten a Multilevel Doubly Linked List", concept: "DLL + DFS / Stack", slug: "flatten-a-multilevel-doubly-linked-list" },
      { num: 707, title: "Design Linked List", concept: "SLL vs DLL Implementation", slug: "design-linked-list" }
    ]
  }
};
