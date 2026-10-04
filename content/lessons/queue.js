/**
 * DSA Tracker — Lesson Content: Queue
 * ─────────────────────────────────────
 * Independent content module adhering to schema.
 * Includes interactive Queue widget configuration (rendered by app.js).
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["queue"] = {
  id: "queue",
  title: "Queue",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master the FIFO (First In, First Out) data structure — enqueue, dequeue, front/rear — and see how it contrasts with a stack's LIFO order.",

  definitions: [
    {
      term: "Queue",
      def: "A linear structure that follows FIFO (First In, First Out): the earliest added item is the first one removed."
    },
    {
      term: "Enqueue",
      def: "Adds an item to the back (rear) of the queue."
    },
    {
      term: "Dequeue",
      def: "Removes and returns the item from the front of the queue."
    },
    {
      term: "Front / Rear",
      def: "The two different ends of a queue: items are added at the rear, removed from the front."
    }
  ],

  howItWorksTogether: "A queue uses two different ends — one for adding, one for removing — the opposite of a stack's single end. That's exactly why it comes out FIFO instead of LIFO, just like a real line: the first person to join is the first one served.",

  // Flag for app.js to render the interactive Queue widget
  interactiveWidget: "queue",

  visual: {
    caption: "Figure 1: Queue — FIFO order. Enqueue adds at the rear (right), Dequeue removes from the front (left).",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="220" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">Queue: FIFO — First In, First Out</text>
        
        <g transform="translate(100, 55)">
          <text x="-5" y="-8" fill="#EF4444" font-size="11" font-weight="bold">FRONT</text>
          <text x="460" y="-8" fill="#10B981" font-size="11" font-weight="bold">REAR</text>
          
          <rect x="0" y="0" width="500" height="70" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10"/>
          
          <rect x="15" y="12" width="90" height="46" fill="rgba(239,68,68,0.15)" stroke="#EF4444" stroke-width="2" rx="6"/>
          <text x="60" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">1</text>
          
          <rect x="120" y="12" width="90" height="46" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="1.5" rx="6"/>
          <text x="165" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">2</text>
          
          <rect x="225" y="12" width="90" height="46" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="1.5" rx="6"/>
          <text x="270" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">3</text>
          
          <rect x="330" y="12" width="90" height="46" fill="rgba(16,185,129,0.2)" stroke="#10B981" stroke-width="2" rx="6"/>
          <text x="375" y="40" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">4</text>
        </g>
        
        <g transform="translate(25, 72)">
          <text x="0" y="0" fill="#EF4444" font-size="12" font-weight="bold">dequeue()</text>
          <text x="0" y="15" fill="#EF4444" font-size="11">→ returns 1</text>
        </g>
        
        <g transform="translate(610, 72)">
          <text x="0" y="0" fill="#10B981" font-size="12" font-weight="bold">enqueue(5)</text>
          <text x="0" y="15" fill="#10B981" font-size="11">← adds here</text>
        </g>
        
        <g transform="translate(100, 145)">
          <rect width="500" height="50" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8"/>
          <text x="20" y="20" fill="#EF4444" font-size="12" font-weight="bold">dequeue → removes from FRONT</text>
          <text x="20" y="38" fill="var(--text-secondary)" font-size="11">First person in line served first (FIFO).</text>
          <text x="290" y="20" fill="#10B981" font-size="12" font-weight="bold">enqueue → adds to REAR</text>
          <text x="290" y="38" fill="var(--text-secondary)" font-size="11">New arrivals join at the back of the line.</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Queue using a plain JavaScript array</span>
<span class="kw">const</span> queue = [];

queue.<span class="fn">push</span>(<span class="num">1</span>);
queue.<span class="fn">push</span>(<span class="num">2</span>);
queue.<span class="fn">push</span>(<span class="num">3</span>);  <span class="cm">// enqueue: queue is [1, 2, 3]</span>

queue.<span class="fn">shift</span>();   <span class="cm">// dequeue: returns 1 → queue is [2, 3]</span>

<span class="cm">// Note: shift() is O(n) on arrays — every element shifts down.</span>
<span class="cm">// For performance-critical code, use a linked-list-based queue.</span>`,

  complexityNotes: [
    "enqueue (push to rear): O(1) Constant Time with array push().",
    "dequeue (shift from front): O(n) with array shift() — every remaining element shifts.",
    "peek (front): O(1) Constant Time — queue[0].",
    "For O(1) dequeue, use a linked list or circular buffer instead of a plain array."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Using push()/shift() on a plain array for performance-critical queues",
      desc: "While functionally correct, <code>shift()</code> is O(n) since every remaining element shifts down an index. For large or frequent dequeues, use a linked-list-based queue for O(1) dequeue."
    },
    {
      title: "Mistake 2: Mixing up front and rear",
      desc: "Enqueue always adds at the rear, dequeue always removes from the front. Swapping them turns a queue into a stack by accident."
    }
  ],

  practice: [
    {
      q: "Question 1: Enqueue 1, 2, 3, then dequeue once — what comes out, what's left?",
      a: "Dequeue returns 1 (the first item added — FIFO). The queue is left with [2, 3]."
    },
    {
      q: "Question 2: Why is shift() a performance concern for an array-based queue?",
      a: "`shift()` removes the first element and must shift every remaining element down by one index — that's O(n). For a queue with frequent dequeues, this overhead adds up. A linked list can dequeue in O(1) by just moving the head pointer."
    }
  ],

  challenge: {
    titleText: "Challenge: Queue Using Two Stacks",
    desc: "Implement a queue using two stacks, and explain why it works. Hint: one stack handles enqueue, the other handles dequeue. When the dequeue stack is empty, transfer all items from the enqueue stack (reversing the order)."
  }
};
