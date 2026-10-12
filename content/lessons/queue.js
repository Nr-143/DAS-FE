/**
 * DSA Tracker — Lesson Content: Queue (Level 2)
 * ──────────────────────────────────────────────
 * Comprehensive interactive module: FIFO Concept, Front & Rear Pointers,
 * Circular Buffer Mechanics, Why Array.shift() is O(n), and Visualizer.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["queue"] = {
  id: "queue",
  title: "Queue",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master the FIFO (First In, First Out) principle, dual-ended Front and Rear pointers, why plain array shift() is O(n), and how circular buffers achieve true O(1) queue performance.",

  definitions: [
    {
      term: "Queue",
      def: "A linear data structure following the FIFO (First In, First Out) principle: elements enter at the back (REAR) and exit from the front (FRONT)."
    },
    {
      term: "FIFO (First In, First Out)",
      def: "The ordering principle where the first element added is the first one to be removed — identical to a real-world checkout counter or ticket queue."
    },
    {
      term: "Enqueue",
      def: "The operation that appends an element to the REAR of the queue."
    },
    {
      term: "Dequeue",
      def: "The operation that removes and returns the element at the FRONT of the queue."
    },
    {
      term: "Front & Rear Pointers",
      def: "The two index markers tracking queue boundaries: <code>front</code> tracks the next item to be served, while <code>rear</code> tracks the most recently arrived item."
    },
    {
      term: "Circular Queue",
      def: "An optimized queue implementation using a fixed-size array where pointers wrap around from the end back to index 0 using modulo arithmetic: <code>(index + 1) % capacity</code>, achieving true O(1) dequeue without element shifting."
    }
  ],

  howItWorksTogether: "In a naive JavaScript implementation using a plain array, <code>queue.push(item)</code> enqueues in O(1) time, but <code>queue.shift()</code> dequeues in O(n) time because every remaining element must shift left to fill the vacant index 0. For high-throughput applications, an optimal queue uses two pointers (front and rear) over a circular buffer or a linked list, enabling both enqueue and dequeue in guaranteed O(1) constant time without memory shifting.",

  whyMatters: "Queues are fundamental to system architectures: operating system CPU task scheduling (round-robin), printer job spooling, web server request queues, event-driven async message queues (Kafka, RabbitMQ), and Breadth-First Search (BFS) graph and tree traversals.",

  interactiveWidget: "queue",

  workedExample: {
    title: "Queue FIFO Execution & Circular Buffer",
    primitiveText: "<code>const q = new Queue();<br/><br/>q.enqueue(10); // FRONT: 10, REAR: 10<br/>q.enqueue(20); // FRONT: 10, REAR: 20<br/>q.enqueue(30); // FRONT: 10, REAR: 30<br/><br/>const served = q.dequeue(); // returns 10! FRONT moves to 20<br/>const nextInLine = q.peek(); // 20 (not removed)</code>",
    referenceText: "Notice that 10 was the FIRST item enqueued, and the FIRST item dequeued!"
  },

  codeSnippet: `// 1. NAIVE QUEUE using Array (Caution: shift() is O(n))
const naiveQueue = [];
naiveQueue.push(10); // enqueue: O(1)
naiveQueue.shift();  // dequeue: O(n) due to element shifting!

// 2. OPTIMIZED CIRCULAR QUEUE (Guaranteed O(1) Enqueue & Dequeue)
class CircularQueue {
  constructor(capacity = 5) {
    this.buffer = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(val) {
    if (this.size === this.capacity) return false; // Full
    this.buffer[this.rear] = val;
    this.rear = (this.rear + 1) % this.capacity; // wrap around!
    this.size++;
    return true;
  }

  dequeue() {
    if (this.size === 0) return null; // Empty
    const item = this.buffer[this.front];
    this.buffer[this.front] = null;
    this.front = (this.front + 1) % this.capacity; // wrap around!
    this.size--;
    return item;
  }

  peek() {
    return this.size === 0 ? null : this.buffer[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }
}`,

  complexityNotes: [
    "Enqueue (Circular / Linked List): O(1) Constant Time.",
    "Dequeue (Circular / Linked List): O(1) Constant Time.",
    "Dequeue (Naive Array.shift): O(n) Linear Time — shifts all remaining elements.",
    "Peek (Front): O(1) Constant Time.",
    "isEmpty(): O(1) Constant Time.",
    "Space Complexity: O(n) where n is the capacity or number of queued items."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Relying on Array.shift() in Performance-Critical Code",
      desc: "While <code>array.shift()</code> works for small lists, calling it 100,000 times inside a BFS or message queue forces the engine to perform billions of element memory shifts, causing severe performance degradation. Always use a pointer-based or linked queue for production systems."
    },
    {
      title: "Mistake 2: Confusing Queue (FIFO) with Stack (LIFO)",
      desc: "Enqueue adds at the REAR, dequeue removes from FRONT. Accidental removal from the rear turns the queue into a stack, completely inverting the arrival order."
    },
    {
      title: "Mistake 3: Forgetting Modulo Arithmetic in Circular Buffers",
      desc: "Without <code>(rear + 1) % capacity</code>, the rear pointer will march past the end of the array bounds and throw index errors instead of recycling the vacant front slots."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the fundamental ordering rule of a Queue?",
      options: [
        "A. LIFO (Last In, First Out)",
        "B. FIFO (First In, First Out)",
        "C. Highest Priority First",
        "D. Random Access"
      ],
      answer: "B",
      explanation: "A queue operates strictly on FIFO (First In, First Out). The earliest added item is always the first to be removed."
    },
    {
      question: "Q2. Why is a Circular Queue preferred over an Array with shift()?",
      options: [
        "A. Circular queues take O(1) for both enqueue and dequeue, avoiding array element shifting",
        "B. Circular queues allow searching in O(log n)",
        "C. Circular queues can store unlimited items without memory limits",
        "D. Circular queues automatically sort data"
      ],
      answer: "A",
      explanation: "A circular queue advances front and rear index pointers with modulo wrap-around, eliminating the need to physically shift elements down an index, guaranteeing O(1) dequeue."
    }
  ],

  practice: [
    {
      q: "How does Breadth-First Search (BFS) use a Queue to explore graphs level-by-level?",
      a: "BFS enqueues the starting node. While the queue is not empty, it dequeues the front node, processes it, and enqueues all its unvisited neighbors at the rear. Because FIFO preserves arrival order, all nodes at distance d are visited before any node at distance d + 1."
    },
    {
      q: "How can you implement a Queue using two Stacks (inStack and outStack)?",
      a: "Enqueue pushes items directly onto `inStack` in O(1) time. Dequeue checks `outStack`: if `outStack` is empty, pop all items from `inStack` and push them onto `outStack` (which reverses their order to FIFO!), then pop from `outStack`. Amortized cost for dequeue remains O(1)."
    }
  ],

  challenge: {
    titleText: "Challenge: Implement Queue using Stacks (LeetCode 232)",
    desc: "Implement a FIFO queue using only two standard LIFO stacks. You may only use push to top, peek/pop from top, size, and is empty operations. Ensure that each operation has an amortized O(1) time complexity!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 232 — Implement Queue using Stacks, then apply queues to Breadth-First Search in trees and graphs.",
    problems: [
      { num: 232, title: "Implement Queue using Stacks", concept: "Dual-Stack FIFO Transfer", slug: "implement-queue-using-stacks", isSuggestedStart: true, isImmediateNext: true },
      { num: 225, title: "Implement Stack using Queues", concept: "Queue Rotation", slug: "implement-stack-using-queues" },
      { num: 622, title: "Design Circular Queue", concept: "Modulo Pointer Wrap-around", slug: "design-circular-queue" }
    ]
  }
};
