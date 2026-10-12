/**
 * OneStep Journey — Linked List (Singly & Doubly) Interactive Visualizer
 * ───────────────────────────────────────────────────────────────────────
 * Full pointer manipulation visualizer:
 * - Singly Linked List: Head, next pointers, insert at head/tail/pos,
 *   read, search, traverse, update, delete head/tail/val, empty/single-node.
 * - Doubly Linked List: Head, Tail, prev & next pointers (distinct colors),
 *   bidirectional traversal, 4-way pointer reconnects on middle insert/delete.
 */

(function () {
  /* ────────────────────────────────────────────
     SINGLY LINKED LIST STEPS
  ──────────────────────────────────────────── */
  function getSinglyOperations() {
    return [
      { id: 'insert-head', label: '1. Insert Head (5)', icon: '<iconify-icon icon="lucide:arrow-up-to-line"></iconify-icon>' },
      { id: 'insert-pos', label: '2. Insert @ Pos 2 (25)', icon: '<iconify-icon icon="lucide:map-pin"></iconify-icon>' },
      { id: 'insert-tail', label: '3. Insert Tail (40)', icon: '<iconify-icon icon="lucide:arrow-down-to-line"></iconify-icon>' },
      { id: 'read-pos', label: '4. Read Pos 2', icon: '<iconify-icon icon="lucide:search"></iconify-icon>' },
      { id: 'search-val', label: '5. Search 20', icon: '<iconify-icon icon="lucide:file-search"></iconify-icon>' },
      { id: 'delete-head', label: '6. Delete Head', icon: '<iconify-icon icon="lucide:minus-circle"></iconify-icon>' },
      { id: 'delete-mid', label: '7. Delete Node (20)', icon: '<iconify-icon icon="lucide:trash-2"></iconify-icon>' },
      { id: 'edge-empty', label: '8. Edge: Empty List', icon: '<iconify-icon icon="lucide:alert-circle"></iconify-icon>' }
    ];
  }

  function generateSinglySteps(opId) {
    const baseList = [
      { val: 10, next: 1 },
      { val: 20, next: 2 },
      { val: 30, next: null }
    ];

    if (opId === 'insert-head') {
      const code = [
        'function insertHead(val) {',
        '  const newNode = new Node(val); // 1. Allocate node',
        '  newNode.next = this.head;      // 2. Link to old head FIRST',
        '  this.head = newNode;           // 3. Move head pointer',
        '}'
      ];
      const steps = [
        {
          desc: 'Goal: Insert <strong>5</strong> at the beginning. Currently <code>head</code> points to node <strong>10</strong>.',
          codeLine: 1,
          vars: { head: 10, newValue: 5 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          pendingNode: null,
          pointerRedirect: null
        },
        {
          desc: 'Step 1: Allocate <code>newNode = new Node(5)</code> in memory. Notice its <code>next</code> is currently <code>null</code>.',
          codeLine: 2,
          vars: { newNode: 5, 'newNode.next': 'null' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          pendingNode: { val: 5, connectsTo: null }
        },
        {
          desc: 'Step 2: <strong>Critical ordering!</strong> Connect <code>newNode.next = this.head</code> (points 5 to 10) BEFORE moving head.',
          codeLine: 3,
          vars: { 'newNode.next': 10, head: 10 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          pendingNode: { val: 5, connectsTo: 0 }
        },
        {
          desc: 'Step 3: Redirect <code>this.head = newNode</code>. Node 5 is now the new head of the list! Operation is O(1).',
          codeLine: 4,
          vars: { head: 5, listLength: 4, time: 'O(1) Constant Time' },
          nodes: [{ val: 5 }, { val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          pendingNode: null,
          highlightIdx: 0,
          output: 'Head: 5'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'insert-pos') {
      const code = [
        'function insertAt(pos, val) {',
        '  let curr = this.head;',
        '  for (let i = 0; i < pos - 1; i++) curr = curr.next; // walk',
        '  const newNode = new Node(val);',
        '  newNode.next = curr.next; // connect successor FIRST',
        '  curr.next = newNode;      // then redirect predecessor',
        '}'
      ];
      const steps = [
        {
          desc: 'Insert <strong>25</strong> at position 2 (between 20 and 30). Must traverse from head to predecessor (node 20).',
          codeLine: 2,
          vars: { targetPos: 2, val: 25, curr: 10 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Walk to index 1: <code>curr = curr.next</code> moves to node <strong>20</strong>.',
          codeLine: 3,
          vars: { i: 1, curr: 20, 'curr.next': 30 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1
        },
        {
          desc: 'Create <code>newNode = new Node(25)</code>.',
          codeLine: 4,
          vars: { newNode: 25 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1,
          pendingNode: { val: 25, connectsTo: null }
        },
        {
          desc: 'Link successor: <code>newNode.next = curr.next</code> connects 25 to 30 BEFORE breaking 20\'s pointer!',
          codeLine: 5,
          vars: { 'newNode.next': 30, 'curr.next': 30 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1,
          pendingNode: { val: 25, connectsTo: 2 }
        },
        {
          desc: 'Redirect predecessor: <code>curr.next = newNode</code> rewires 20 to point to 25. Complete!',
          codeLine: 6,
          vars: { '20.next': 25, '25.next': 30, time: 'O(n) Traversal' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 25 }, { val: 30 }],
          headIdx: 0,
          highlightIdx: 2,
          pendingNode: null,
          output: '10 -> 20 -> 25 -> 30 -> null'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'insert-tail') {
      const code = [
        'function insertTail(val) {',
        '  let curr = this.head;',
        '  while (curr.next) curr = curr.next; // walk to last node',
        '  curr.next = new Node(val);',
        '}'
      ];
      const steps = [
        {
          desc: 'Insert <strong>40</strong> at the tail. Starting traversal from head (node 10).',
          codeLine: 2,
          vars: { val: 40, curr: 10 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Advance: <code>curr = curr.next</code> moves to node 20.',
          codeLine: 3,
          vars: { curr: 20 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1
        },
        {
          desc: 'Advance: <code>curr = curr.next</code> reaches tail node 30 (its <code>next</code> is null).',
          codeLine: 3,
          vars: { curr: 30, 'curr.next': 'null' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 2
        },
        {
          desc: 'Attach new tail: <code>curr.next = new Node(40)</code>. Node 30 points to 40, 40 points to null.',
          codeLine: 4,
          vars: { '30.next': 40, '40.next': 'null', time: 'O(n) without tail pointer' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }, { val: 40 }],
          headIdx: 0,
          highlightIdx: 3,
          output: 'Tail: 40'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'read-pos') {
      const code = [
        'function get(index) {',
        '  let curr = this.head;',
        '  for (let i = 0; i < index; i++) {',
        '    curr = curr.next; // must walk sequentially!',
        '  }',
        '  return curr.value;',
        '}'
      ];
      const steps = [
        {
          desc: 'Read element at position 2. Unlike arrays, cannot jump directly; must walk from head.',
          codeLine: 2,
          vars: { targetPos: 2, curr: 10, i: 0 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Step 1: Walk to index 1 (node 20).',
          codeLine: 4,
          vars: { i: 1, curr: 20 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1
        },
        {
          desc: 'Step 2: Walk to index 2 (node 30). Target reached!',
          codeLine: 6,
          vars: { i: 2, curr: 30, value: 30, time: 'O(n) Sequential' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          highlightIdx: 2,
          output: 30
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'search-val') {
      const code = [
        'function search(target) {',
        '  let curr = this.head, index = 0;',
        '  while (curr) {',
        '    if (curr.value === target) return index;',
        '    curr = curr.next; index++;',
        '  }',
        '  return -1;',
        '}'
      ];
      const steps = [
        {
          desc: 'Searching for value <strong>20</strong> starting at head.',
          codeLine: 2,
          vars: { target: 20, curr: 10, index: 0 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Compare: <code>10 !== 20</code>. Advance to next node.',
          codeLine: 5,
          vars: { target: 20, match: false, curr: 20, index: 1 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 1
        },
        {
          desc: 'Compare: <code>20 === 20</code>. <strong>Match found at index 1!</strong>',
          codeLine: 4,
          vars: { target: 20, match: true, foundAt: 1, time: 'O(n)' },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          highlightIdx: 1,
          output: 'Found at index 1'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'delete-head') {
      const code = [
        'function deleteHead() {',
        '  if (!this.head) return null;',
        '  const removed = this.head;',
        '  this.head = this.head.next; // repoint head',
        '  return removed.value;',
        '}'
      ];
      const steps = [
        {
          desc: 'Delete head node (node 10).',
          codeLine: 3,
          vars: { head: 10, 'head.next': 20 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Repoint head: <code>this.head = this.head.next</code>. Head now points directly to node 20.',
          codeLine: 4,
          vars: { newHead: 20, detachedNode: 10, time: 'O(1) Instant' },
          nodes: [{ val: 20 }, { val: 30 }],
          headIdx: 0,
          highlightIdx: 0,
          output: 'Deleted: 10'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'delete-mid') {
      const code = [
        'function deleteNode(val) {',
        '  let curr = this.head;',
        '  while (curr.next && curr.next.value !== val) curr = curr.next;',
        '  if (curr.next) {',
        '    curr.next = curr.next.next; // bypass target node',
        '  }',
        '}'
      ];
      const steps = [
        {
          desc: 'Delete middle node <strong>20</strong>. Must find predecessor (node 10) to bypass 20.',
          codeLine: 2,
          vars: { target: 20, curr: 10 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Predecessor identified: node 10. Target node to remove is <code>curr.next</code> (node 20).',
          codeLine: 3,
          vars: { predecessor: 10, targetToDelete: 20, successor: 30 },
          nodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          headIdx: 0,
          activeIdx: 0
        },
        {
          desc: 'Bypass pointer: <code>curr.next = curr.next.next</code> rewires node 10 directly to 30. Node 20 is orphaned!',
          codeLine: 5,
          vars: { '10.next': 30, orphaned: 20, time: 'O(n)' },
          nodes: [{ val: 10 }, { val: 30 }],
          headIdx: 0,
          highlightIdx: 0,
          output: '10 -> 30 -> null'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'edge-empty') {
      const code = [
        'function checkEmpty(head) {',
        '  if (!head) {',
        '    console.log("List is empty");',
        '    return true;',
        '  }',
        '  return false;',
        '}'
      ];
      const steps = [
        {
          desc: 'Boundary check: An empty linked list has <code>head === null</code>. Traversal loop terminates immediately without errors.',
          codeLine: 2,
          vars: { head: 'null', length: 0, isEmpty: true },
          nodes: [],
          headIdx: -1,
          output: 'List is empty (null)'
        }
      ];
      return { code, steps, complexity: 'O(1) Edge Case' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  /* ────────────────────────────────────────────
     DOUBLY LINKED LIST STEPS
  ──────────────────────────────────────────── */
  function getDoublyOperations() {
    return [
      { id: 'dll-insert-mid', label: '1. Insert Between (25)', icon: '<iconify-icon icon="lucide:split"></iconify-icon>' },
      { id: 'dll-traverse-fwd', label: '2. Traverse Forward', icon: '<iconify-icon icon="lucide:arrow-right"></iconify-icon>' },
      { id: 'dll-traverse-bwd', label: '3. Traverse Backward', icon: '<iconify-icon icon="lucide:arrow-left"></iconify-icon>' },
      { id: 'dll-delete-mid', label: '4. Delete Middle (20)', icon: '<iconify-icon icon="lucide:trash-2"></iconify-icon>' },
      { id: 'dll-insert-head', label: '5. Insert Head (5)', icon: '<iconify-icon icon="lucide:arrow-up-to-line"></iconify-icon>' }
    ];
  }

  function generateDoublySteps(opId) {
    if (opId === 'dll-insert-mid') {
      const code = [
        'function insertAfter(node, val) {',
        '  const newNode = new DNode(val);',
        '  newNode.next = node.next;',
        '  newNode.prev = node;',
        '  if (node.next) node.next.prev = newNode;',
        '  node.next = newNode;',
        '}'
      ];
      const steps = [
        {
          desc: 'Insert <strong>25</strong> after node <strong>20</strong> in a doubly linked list. Requires 4 pointer updates!',
          codeLine: 1,
          vars: { targetNode: 20, newValue: 25 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          pendingNode: null
        },
        {
          desc: 'Step 1: Allocate <code>newNode = new DNode(25)</code>.',
          codeLine: 2,
          vars: { newNode: 25 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          pendingNode: { val: 25 }
        },
        {
          desc: 'Step 2: <code>newNode.next = node.next</code> (connects 25 next → 30).',
          codeLine: 3,
          vars: { '25.next': 30 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          pendingNode: { val: 25, next: 2 }
        },
        {
          desc: 'Step 3: <code>newNode.prev = node</code> (connects 25 prev ← 20).',
          codeLine: 4,
          vars: { '25.prev': 20, '25.next': 30 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          pendingNode: { val: 25, prev: 1, next: 2 }
        },
        {
          desc: 'Step 4: <code>node.next.prev = newNode</code> (updates 30 prev ← 25).',
          codeLine: 5,
          vars: { '30.prev': 25 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          pendingNode: { val: 25, prev: 1, next: 2 }
        },
        {
          desc: 'Step 5: <code>node.next = newNode</code> (updates 20 next → 25). All 4 pointers safely connected!',
          codeLine: 6,
          vars: { '20.next': 25, '25.next': 30, '30.prev': 25, time: 'O(1) given node' },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 25 }, { val: 30 }],
          activeIdx: -1,
          highlightIdx: 2,
          pendingNode: null,
          output: '10 <-> 20 <-> 25 <-> 30'
        }
      ];
      return { code, steps, complexity: 'O(1) Time with ref | O(1) Space' };
    }

    if (opId === 'dll-traverse-fwd') {
      const code = [
        'let curr = this.head;',
        'while (curr) {',
        '  console.log(curr.value);',
        '  curr = curr.next; // follow NEXT pointer',
        '}'
      ];
      const steps = [
        {
          desc: 'Forward traversal starting at HEAD (node 10) following <code>next</code> pointers.',
          codeLine: 1,
          vars: { direction: 'FORWARD (next)', curr: 10 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 0,
          output: '10'
        },
        {
          desc: 'Follow <code>next</code>: Move from node 10 → node 20.',
          codeLine: 4,
          vars: { curr: 20 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          output: '10 -> 20'
        },
        {
          desc: 'Follow <code>next</code>: Move from node 20 → node 30 (TAIL).',
          codeLine: 4,
          vars: { curr: 30, atTail: true },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 2,
          output: '10 -> 20 -> 30'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'dll-traverse-bwd') {
      const code = [
        'let curr = this.tail;',
        'while (curr) {',
        '  console.log(curr.value);',
        '  curr = curr.prev; // follow PREV pointer!',
        '}'
      ];
      const steps = [
        {
          desc: 'Backward traversal starting at TAIL (node 30) following <code>prev</code> pointers!',
          codeLine: 1,
          vars: { direction: 'BACKWARD (prev)', curr: 30 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 2,
          output: '30'
        },
        {
          desc: 'Follow <code>prev</code>: Move backward from node 30 → node 20.',
          codeLine: 4,
          vars: { curr: 20 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1,
          output: '30 -> 20'
        },
        {
          desc: 'Follow <code>prev</code>: Move backward from node 20 → node 10 (HEAD).',
          codeLine: 4,
          vars: { curr: 10, atHead: true },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 0,
          output: '30 -> 20 -> 10'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'dll-delete-mid') {
      const code = [
        'function removeNode(node) {',
        '  node.prev.next = node.next; // bypass right',
        '  node.next.prev = node.prev; // bypass left',
        '  node.prev = null; node.next = null;',
        '}'
      ];
      const steps = [
        {
          desc: 'Removing middle node <strong>20</strong>. Thanks to <code>prev</code> pointer, no search is required!',
          codeLine: 1,
          vars: { node: 20, 'node.prev': 10, 'node.next': 30 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1
        },
        {
          desc: 'Step 1: <code>node.prev.next = node.next</code> (node 10 now points next to 30).',
          codeLine: 2,
          vars: { '10.next': 30 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1
        },
        {
          desc: 'Step 2: <code>node.next.prev = node.prev</code> (node 30 now points prev to 10).',
          codeLine: 3,
          vars: { '30.prev': 10 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 1
        },
        {
          desc: 'Node 20 cleanly removed in O(1) time without searching!',
          codeLine: 4,
          vars: { time: 'O(1) with node reference' },
          dnodes: [{ val: 10 }, { val: 30 }],
          activeIdx: -1,
          output: '10 <-> 30'
        }
      ];
      return { code, steps, complexity: 'O(1) Time with ref | O(1) Space' };
    }

    if (opId === 'dll-insert-head') {
      const code = [
        'function insertHead(val) {',
        '  const newNode = new DNode(val);',
        '  newNode.next = this.head;',
        '  if (this.head) this.head.prev = newNode;',
        '  this.head = newNode;',
        '}'
      ];
      const steps = [
        {
          desc: 'Insert <strong>5</strong> at head of Doubly Linked List.',
          codeLine: 2,
          vars: { val: 5, head: 10 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 0
        },
        {
          desc: 'Link pointers: <code>newNode.next = head</code> and <code>head.prev = newNode</code>.',
          codeLine: 4,
          vars: { '5.next': 10, '10.prev': 5 },
          dnodes: [{ val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 0,
          pendingNode: { val: 5, next: 0 }
        },
        {
          desc: 'Update head pointer: <code>this.head = newNode</code>. Node 5 is new head.',
          codeLine: 5,
          vars: { head: 5, time: 'O(1)' },
          dnodes: [{ val: 5 }, { val: 10 }, { val: 20 }, { val: 30 }],
          activeIdx: 0,
          highlightIdx: 0,
          pendingNode: null,
          output: 'Head: 5'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  /* ────────────────────────────────────────────
     RENDERERS
  ──────────────────────────────────────────── */
  function renderSinglyVisual(container, step) {
    if (!container || !step) return;
    const nodes = step.nodes || [];

    let nodesHtml = '';
    if (nodes.length === 0) {
      nodesHtml = '<div class="ll-empty-notice">List is Empty (head = null)</div>';
    } else {
      nodesHtml = nodes.map((n, idx) => {
        const isHead = idx === 0;
        const isTail = idx === nodes.length - 1;
        const isActive = idx === step.activeIdx;
        const isHighlight = idx === step.highlightIdx;

        let nodeClass = 'll-node';
        if (isActive) nodeClass += ' ll-node--active';
        if (isHighlight) nodeClass += ' ll-node--highlight';

        return `
          <div class="ll-node-wrapper">
            <div class="ll-pointer-tags">
              ${isHead ? '<span class="ll-tag ll-tag--head">HEAD</span>' : ''}
              ${isTail ? '<span class="ll-tag ll-tag--tail">TAIL</span>' : ''}
            </div>
            <div class="${nodeClass}">
              <div class="ll-val-part">${n.val}</div>
              <div class="ll-ptr-part">
                <span class="ll-ptr-label">next</span>
                <span class="ll-ptr-bullet">•</span>
              </div>
            </div>
            <div class="ll-arrow-connector">
              <svg width="36" height="24" viewBox="0 0 36 24">
                <line x1="2" y1="12" x2="28" y2="12" stroke="var(--accent-primary)" stroke-width="2.5" />
                <polygon points="28,8 36,12 28,16" fill="var(--accent-primary)" />
              </svg>
            </div>
          </div>
        `;
      }).join('');
      nodesHtml += '<div class="ll-null-node">null</div>';
    }

    let pendingHtml = '';
    if (step.pendingNode) {
      pendingHtml = `
        <div class="ll-pending-card">
          <div class="ll-pending-label">Allocated Node (in heap):</div>
          <div class="ll-node ll-node--pending">
            <div class="ll-val-part">${step.pendingNode.val}</div>
            <div class="ll-ptr-part">
              <span class="ll-ptr-label">next</span>
              <span class="ll-ptr-bullet">•</span>
            </div>
          </div>
          ${step.pendingNode.connectsTo !== null && step.pendingNode.connectsTo !== undefined ? `
            <div class="ll-pending-arrow-desc">↳ Points to node [${step.pendingNode.connectsTo}]</div>
          ` : '<div class="ll-pending-arrow-desc">↳ next: null</div>'}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="ll-visual-canvas">
        <div class="ll-track">
          ${nodesHtml}
        </div>
        ${pendingHtml}
      </div>
    `;
  }

  function renderDoublyVisual(container, step) {
    if (!container || !step) return;
    const nodes = step.dnodes || [];

    const nodesHtml = nodes.map((n, idx) => {
      const isHead = idx === 0;
      const isTail = idx === nodes.length - 1;
      const isActive = idx === step.activeIdx;
      const isHighlight = idx === step.highlightIdx;

      let nodeClass = 'dll-node';
      if (isActive) nodeClass += ' dll-node--active';
      if (isHighlight) nodeClass += ' dll-node--highlight';

      return `
        <div class="dll-node-wrapper">
          <div class="ll-pointer-tags">
            ${isHead ? '<span class="ll-tag ll-tag--head">HEAD</span>' : ''}
            ${isTail ? '<span class="ll-tag ll-tag--tail">TAIL</span>' : ''}
          </div>
          <div class="${nodeClass}">
            <div class="dll-prev-part" title="prev pointer">
              <span class="dll-ptr-label">prev</span>
              <span class="dll-ptr-bullet" style="color:#F59E0B">←</span>
            </div>
            <div class="dll-val-part">${n.val}</div>
            <div class="dll-next-part" title="next pointer">
              <span class="dll-ptr-label">next</span>
              <span class="dll-ptr-bullet" style="color:#00C9A7">→</span>
            </div>
          </div>
          ${!isTail ? `
            <div class="dll-double-connector">
              <div class="dll-arrow-next" title="next link">→</div>
              <div class="dll-arrow-prev" title="prev link">←</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="ll-visual-canvas">
        <div class="ll-legend-row">
          <span class="dll-legend-pill" style="color:#00C9A7">→ next (forward)</span>
          <span class="dll-legend-pill" style="color:#F59E0B">← prev (backward)</span>
        </div>
        <div class="ll-track">
          <div class="ll-null-node">null ←</div>
          ${nodesHtml}
          <div class="ll-null-node">→ null</div>
        </div>
      </div>
    `;
  }

  /* ────────────────────────────────────────────
     MOUNTERS
  ──────────────────────────────────────────── */
  function mountSinglyLinkedListVisualizer(container) {
    container.innerHTML = '';
    const operations = getSinglyOperations();
    let currentOpId = 'insert-head';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Singly Linked List Pointer Mechanics',
      operations
    });

    let { code, steps, complexity } = generateSinglySteps(currentOpId);

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderSinglyVisual(ui.visualCanvas, step);

        if (step.output !== null && step.output !== undefined) {
          ui.outputCard.style.display = 'flex';
          ui.outputVal.textContent = String(step.output);
        } else {
          ui.outputCard.style.display = 'none';
        }
      },
      onPlayStateChange: (isPlaying) => {
        window.ExecutionEngine.updatePlayBtn(ui.playBtn, isPlaying);
      }
    });

    ui.complexityPill.textContent = complexity;
    player.reset();

    ui.playBtn.addEventListener('click', () => {
      if (player.isPlaying) player.pause();
      else player.play();
    });

    ui.stepBtn.addEventListener('click', () => player.stepForward());
    ui.stepBackBtn.addEventListener('click', () => player.stepBackward());
    ui.resetBtn.addEventListener('click', () => player.reset());

    ui.speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ui.speedBtns.forEach(b => b.classList.remove('exec-speed-btn--active'));
        btn.classList.add('exec-speed-btn--active');
        player.setSpeed(parseInt(btn.getAttribute('data-speed'), 10));
      });
    });

    ui.opTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const opId = tab.getAttribute('data-op-id');
        if (opId === currentOpId) return;
        currentOpId = opId;
        ui.opTabs.forEach(t => t.classList.remove('exec-op-tab--active'));
        tab.classList.add('exec-op-tab--active');

        const bundle = generateSinglySteps(currentOpId);
        code = bundle.code;
        ui.complexityPill.textContent = bundle.complexity;
        player.setSteps(bundle.steps);
      });
    });

    return () => {
      player.destroy();
      container.innerHTML = '';
    };
  }

  function mountDoublyLinkedListVisualizer(container) {
    container.innerHTML = '';
    const operations = getDoublyOperations();
    let currentOpId = 'dll-insert-mid';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Doubly Linked List Bidirectional Pointer Visualizer',
      operations
    });

    let { code, steps, complexity } = generateDoublySteps(currentOpId);

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderDoublyVisual(ui.visualCanvas, step);

        if (step.output !== null && step.output !== undefined) {
          ui.outputCard.style.display = 'flex';
          ui.outputVal.textContent = String(step.output);
        } else {
          ui.outputCard.style.display = 'none';
        }
      },
      onPlayStateChange: (isPlaying) => {
        window.ExecutionEngine.updatePlayBtn(ui.playBtn, isPlaying);
      }
    });

    ui.complexityPill.textContent = complexity;
    player.reset();

    ui.playBtn.addEventListener('click', () => {
      if (player.isPlaying) player.pause();
      else player.play();
    });

    ui.stepBtn.addEventListener('click', () => player.stepForward());
    ui.stepBackBtn.addEventListener('click', () => player.stepBackward());
    ui.resetBtn.addEventListener('click', () => player.reset());

    ui.speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ui.speedBtns.forEach(b => b.classList.remove('exec-speed-btn--active'));
        btn.classList.add('exec-speed-btn--active');
        player.setSpeed(parseInt(btn.getAttribute('data-speed'), 10));
      });
    });

    ui.opTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const opId = tab.getAttribute('data-op-id');
        if (opId === currentOpId) return;
        currentOpId = opId;
        ui.opTabs.forEach(t => t.classList.remove('exec-op-tab--active'));
        tab.classList.add('exec-op-tab--active');

        const bundle = generateDoublySteps(currentOpId);
        code = bundle.code;
        ui.complexityPill.textContent = bundle.complexity;
        player.setSteps(bundle.steps);
      });
    });

    return () => {
      player.destroy();
      container.innerHTML = '';
    };
  }

  window.mountSinglyLinkedListVisualizer = mountSinglyLinkedListVisualizer;
  window.mountDoublyLinkedListVisualizer = mountDoublyLinkedListVisualizer;
})();
