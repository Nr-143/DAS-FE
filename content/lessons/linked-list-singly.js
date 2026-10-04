/**
 * DSA Tracker — Lesson Content: Linked List (Singly)
 * ────────────────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linked-list-singly"] = {
  id: "linked-list-singly",
  title: "Linked List (Singly)",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Understand singly linked lists: node-based storage, pointer traversal, O(1) front insertion, and how they compare to arrays.",

  definitions: [
    {
      term: "Linked List",
      def: "A linear structure made of nodes, where each node holds a value and a pointer to the next node, instead of living in one indexable block like an array."
    },
    {
      term: "Node",
      def: "A single element containing a value and a pointer (next) to the following node."
    },
    {
      term: "Head",
      def: "The reference to the first node; the entry point for traversal."
    },
    {
      term: "Tail (node)",
      def: "The last node, whose next is null, marking the end of the list."
    }
  ],

  howItWorksTogether: "A linked list doesn't need its elements laid out together — each node can live anywhere and just points to the next one. That makes inserting at the front O(1) (just repoint <code>head</code>), but reaching any element by position is O(n), since you must walk pointer by pointer from <code>head</code> — there's no index-based jump like an array has.",

  visual: {
    caption: "Figure 1: Singly Linked List — each node holds a value and a next pointer. Traversal follows pointers from head to tail.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="200" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">Singly Linked List: Head → Node → Node → Tail (null)</text>
        
        <g transform="translate(20, 55)">
          <text x="45" y="-5" fill="#10B981" font-size="11" font-weight="bold">HEAD</text>
          <rect x="0" y="0" width="90" height="55" fill="rgba(16,185,129,0.2)" stroke="#10B981" stroke-width="2" rx="8"/>
          <text x="45" y="22" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">10</text>
          <text x="45" y="42" fill="var(--text-muted)" font-size="10" text-anchor="middle">next →</text>
        </g>
        
        <line x1="115" y1="82" x2="155" y2="82" stroke="var(--accent-primary)" stroke-width="2.5" marker-end="url(#sll-arrow)"/>
        
        <g transform="translate(160, 55)">
          <rect x="0" y="0" width="90" height="55" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="2" rx="8"/>
          <text x="45" y="22" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">20</text>
          <text x="45" y="42" fill="var(--text-muted)" font-size="10" text-anchor="middle">next →</text>
        </g>
        
        <line x1="255" y1="82" x2="295" y2="82" stroke="var(--accent-primary)" stroke-width="2.5" marker-end="url(#sll-arrow)"/>
        
        <g transform="translate(300, 55)">
          <rect x="0" y="0" width="90" height="55" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="2" rx="8"/>
          <text x="45" y="22" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">30</text>
          <text x="45" y="42" fill="var(--text-muted)" font-size="10" text-anchor="middle">next →</text>
        </g>
        
        <line x1="395" y1="82" x2="435" y2="82" stroke="var(--accent-primary)" stroke-width="2.5" marker-end="url(#sll-arrow)"/>
        
        <g transform="translate(440, 55)">
          <text x="45" y="-5" fill="#EF4444" font-size="11" font-weight="bold">TAIL</text>
          <rect x="0" y="0" width="90" height="55" fill="rgba(239,68,68,0.15)" stroke="#EF4444" stroke-width="2" rx="8"/>
          <text x="45" y="22" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">40</text>
          <text x="45" y="42" fill="var(--text-muted)" font-size="10" text-anchor="middle">next: null</text>
        </g>
        
        <g transform="translate(30, 135)">
          <rect width="630" height="45" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8"/>
          <text x="20" y="18" fill="#10B981" font-size="12" font-weight="bold">addFirst() → O(1)</text>
          <text x="20" y="35" fill="var(--text-secondary)" font-size="11">Just create new node, point it at old head, update head.</text>
          <text x="350" y="18" fill="#EF4444" font-size="12" font-weight="bold">Access by position → O(n)</text>
          <text x="350" y="35" fill="var(--text-secondary)" font-size="11">Must walk pointer by pointer from head — no index jump.</text>
        </g>
        
        <defs>
          <marker id="sll-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-primary)"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Singly Linked List — Node class and basic operations</span>
<span class="kw">class</span> <span class="fn">Node</span> {
  <span class="fn">constructor</span>(value) {
    <span class="kw">this</span>.value = value;
    <span class="kw">this</span>.next = <span class="kw">null</span>;
  }
}

<span class="kw">class</span> <span class="fn">LinkedList</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.head = <span class="kw">null</span>; }
  
  <span class="fn">addFirst</span>(value) {
    <span class="kw">const</span> node = <span class="kw">new</span> <span class="fn">Node</span>(value);
    node.next = <span class="kw">this</span>.head;
    <span class="kw">this</span>.head = node;        <span class="cm">// O(1)</span>
  }
  
  <span class="fn">print</span>() {
    <span class="kw">let</span> current = <span class="kw">this</span>.head;
    <span class="kw">while</span> (current) {        <span class="cm">// O(n) traversal</span>
      <span class="fn">console.log</span>(current.value);
      current = current.next;
    }
  }
}`,

  complexityNotes: [
    "Insert at Head: O(1) Constant Time — just repoint head.",
    "Insert at Tail (no tail ref): O(n) — must walk to end first.",
    "Access by Position: O(n) Linear Time — no index, must traverse.",
    "Delete at Head: O(1) — just set head = head.next."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Overwriting next before saving a reference",
      desc: "Overwriting a <code>next</code> pointer before saving a reference to what it pointed to loses the rest of the list. Save it to a temp variable first when inserting/deleting mid-list."
    },
    {
      title: "Mistake 2: Forgetting to update head when inserting at the front",
      desc: "If you create a new node and set its <code>next</code> but forget to update <code>head</code> to point at the new node, the new node becomes unreachable."
    }
  ],

  practice: [
    {
      q: "Question 1: Why is inserting at the front O(1) for a linked list but O(n) for an array?",
      a: "In a linked list, inserting at the front just creates a new node and repoints `head` — no other nodes move. In an array, every existing element must shift right by one index to make room at position 0."
    },
    {
      q: "Question 2: What happens if you forget to set a new node's next before changing head?",
      a: "If you set `head = newNode` before `newNode.next = head`, you lose the reference to the old head. The rest of the list becomes unreachable (lost)."
    }
  ],

  challenge: {
    titleText: "Challenge: Reverse a Singly Linked List In Place",
    desc: "Reverse a singly linked list in place — without creating a new list. Walk through the list, flipping each node's <code>next</code> pointer to point backward. Use three pointers: <code>prev</code>, <code>current</code>, and <code>next</code>."
  },

  leetcodePractice: {
    showProcessCallout: true,
    solvingOrder: "876 → 206 → 21 → 141 → 19",
    solvingOrderNote: "Reverse Linked List (206) is especially important. You should be able to understand: <code>1 → 2 → 3 → 4 → null</code> becomes <code>4 → 3 → 2 → 1 → null</code>.",
    problems: [
      { num: 141, title: "Linked List Cycle", concept: "Fast + Slow Pointer", slug: "linked-list-cycle", roadmapStep: 11 },
      { num: 206, title: "Reverse Linked List", concept: "Pointer manipulation", slug: "reverse-linked-list", roadmapStep: 9 },
      { num: 21, title: "Merge Two Sorted Lists", concept: "Linked List", slug: "merge-two-sorted-lists", roadmapStep: 10 },
      { num: 876, title: "Middle of the Linked List", concept: "Fast + Slow", slug: "middle-of-the-linked-list", roadmapStep: 8 },
      { num: 19, title: "Remove Nth Node From End of List", concept: "Two Pointers", slug: "remove-nth-node-from-end-of-list", roadmapStep: 12 }
    ]
  }
};
