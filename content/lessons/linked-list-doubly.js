/**
 * DSA Tracker — Lesson Content: Linked List (Doubly)
 * ────────────────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["linked-list-doubly"] = {
  id: "linked-list-doubly",
  title: "Linked List (Doubly)",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Understand doubly linked lists: bidirectional traversal, O(1) removal of known nodes, and the memory trade-off of an extra pointer per node.",

  definitions: [
    {
      term: "Doubly Linked List",
      def: "A linked list where each node holds a pointer to both the next node AND the previous node, allowing traversal in both directions."
    },
    {
      term: "Prev Pointer",
      def: "The pointer referencing the node before the current one (the feature that distinguishes it from a singly linked list)."
    },
    {
      term: "Tail Reference (list-level)",
      def: "Doubly linked lists commonly keep a direct pointer to the last node too, so operations at the end are also O(1)."
    }
  ],

  howItWorksTogether: "The extra <code>prev</code> pointer costs more memory per node, but it makes operations like \"remove this specific node\" or \"insert before a given node\" O(1) instead of O(n) — you no longer need to walk from the head just to find the node pointing at the one you're changing.",

  visual: {
    caption: "Figure 1: Doubly Linked List — each node has both next and prev pointers, enabling bidirectional traversal.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="200" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">Doubly Linked List: ← prev | next →</text>
        
        <g transform="translate(50, 55)">
          <text x="50" y="-5" fill="#34d399" font-size="11" font-weight="bold">HEAD</text>
          <rect x="0" y="0" width="100" height="60" fill="rgba(45,138,104,0.12)" stroke="#2d8a68" stroke-width="2" rx="8"/>
          <text x="50" y="20" fill="var(--text-muted)" font-size="9" text-anchor="middle">prev: null</text>
          <text x="50" y="38" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">10</text>
          <text x="50" y="54" fill="var(--text-muted)" font-size="9" text-anchor="middle">next →</text>
        </g>
        
        <line x1="155" y1="78" x2="195" y2="78" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#dll-arrow)"/>
        <line x1="195" y1="92" x2="155" y2="92" stroke="#9a642b" stroke-width="2" marker-end="url(#dll-arrow-prev)"/>
        
        <g transform="translate(200, 55)">
          <rect x="0" y="0" width="100" height="60" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" stroke-width="2" rx="8"/>
          <text x="50" y="20" fill="var(--text-muted)" font-size="9" text-anchor="middle">← prev</text>
          <text x="50" y="38" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">20</text>
          <text x="50" y="54" fill="var(--text-muted)" font-size="9" text-anchor="middle">next →</text>
        </g>
        
        <line x1="305" y1="78" x2="345" y2="78" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#dll-arrow)"/>
        <line x1="345" y1="92" x2="305" y2="92" stroke="#9a642b" stroke-width="2" marker-end="url(#dll-arrow-prev)"/>
        
        <g transform="translate(350, 55)">
          <rect x="0" y="0" width="100" height="60" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" stroke-width="2" rx="8"/>
          <text x="50" y="20" fill="var(--text-muted)" font-size="9" text-anchor="middle">← prev</text>
          <text x="50" y="38" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">30</text>
          <text x="50" y="54" fill="var(--text-muted)" font-size="9" text-anchor="middle">next →</text>
        </g>
        
        <line x1="455" y1="78" x2="495" y2="78" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#dll-arrow)"/>
        <line x1="495" y1="92" x2="455" y2="92" stroke="#9a642b" stroke-width="2" marker-end="url(#dll-arrow-prev)"/>
        
        <g transform="translate(500, 55)">
          <text x="50" y="-5" fill="#f87171" font-size="11" font-weight="bold">TAIL</text>
          <rect x="0" y="0" width="100" height="60" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" stroke-width="2" rx="8"/>
          <text x="50" y="20" fill="var(--text-muted)" font-size="9" text-anchor="middle">← prev</text>
          <text x="50" y="38" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">40</text>
          <text x="50" y="54" fill="var(--text-muted)" font-size="9" text-anchor="middle">next: null</text>
        </g>
        
        <g transform="translate(50, 140)">
          <rect width="600" height="40" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="1.5" rx="8"/>
          <text x="20" y="16" fill="#34d399" font-size="12" font-weight="bold">Remove known node → O(1)</text>
          <text x="20" y="32" fill="var(--text-secondary)" font-size="11">With prev pointer, no need to search for the preceding node.</text>
          <text x="360" y="16" fill="#fbbf24" font-size="12" font-weight="bold">Trade-off: extra memory per node</text>
          <text x="360" y="32" fill="var(--text-secondary)" font-size="11">Each node stores an additional prev pointer.</text>
        </g>
        
        <defs>
          <marker id="dll-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-primary)"/>
          </marker>
          <marker id="dll-arrow-prev" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a642b"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Doubly Linked List — DNode class and addLast</span>
<span class="kw">class</span> <span class="fn">DNode</span> {
  <span class="fn">constructor</span>(value) {
    <span class="kw">this</span>.value = value;
    <span class="kw">this</span>.next = <span class="kw">null</span>;
    <span class="kw">this</span>.prev = <span class="kw">null</span>;
  }
}

<span class="kw">class</span> <span class="fn">DoublyLinkedList</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.head = <span class="kw">null</span>;
    <span class="kw">this</span>.tail = <span class="kw">null</span>;
  }
  
  <span class="fn">addLast</span>(value) {
    <span class="kw">const</span> node = <span class="kw">new</span> <span class="fn">DNode</span>(value);
    <span class="kw">if</span> (!<span class="kw">this</span>.tail) {
      <span class="kw">this</span>.head = <span class="kw">this</span>.tail = node;
    } <span class="kw">else</span> {
      node.prev = <span class="kw">this</span>.tail;
      <span class="kw">this</span>.tail.next = node;
      <span class="kw">this</span>.tail = node;      <span class="cm">// O(1) — tail reference kept</span>
    }
  }
}`,

  complexityNotes: [
    "Insert at Head or Tail: O(1) — both ends have direct references.",
    "Remove Known Node: O(1) — prev pointer eliminates backward search.",
    "Access by Position: O(n) — still must traverse, same as singly linked.",
    "Memory: Higher per node than singly linked — each node stores an extra prev pointer."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Updating next but forgetting the matching prev",
      desc: "When inserting or removing, you must update <em>both</em> <code>next</code> and <code>prev</code> pointers. Forgetting one silently breaks traversal in one direction."
    },
    {
      title: "Mistake 2: Assuming doubly linked is simply \"better\"",
      desc: "The bidirectional benefit costs real memory per node. If you never need backward traversal or O(1) removal of known nodes, a singly linked list is more memory-efficient."
    }
  ],

  practice: [
    {
      q: "Question 1: What extra pointer does a doubly linked list node have?",
      a: "A `prev` pointer — it points to the node before the current one, enabling backward traversal. Singly linked list nodes only have `next`."
    },
    {
      q: "Question 2: Why is removing a known node O(1) in a doubly linked list but O(n) in a singly linked one?",
      a: "In a doubly linked list, the node you're removing already has a `prev` pointer to its predecessor — so you can update the predecessor's `next` directly. In a singly linked list, you must walk from head to find the predecessor, which takes O(n)."
    }
  ],

  challenge: {
    titleText: "Challenge: Traverse Backward from Tail",
    desc: "Traverse and print a doubly linked list backward, starting from the tail. Use the <code>prev</code> pointers to walk from the last node to the first."
  }
};
