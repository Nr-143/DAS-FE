/**
 * OneStep Journey — Lesson Content: Level 5 Trees
 * ──────────────────────────────────────────────────
 * Module 1: Introduction to Trees & Terminology (tree-intro)
 * Module 2: Binary Trees & Types (binary-tree-types)
 * Module 3: Binary Tree Traversals (binary-tree-traversals)
 * Module 4: Binary Tree Operations & Interview Problems (binary-tree-operations)
 *
 * Backwards compatibility aliases:
 * binary-trees -> tree-intro
 * binary-search-tree -> binary-tree-operations
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

/* ==========================================================================
   MODULE 1: INTRODUCTION TO TREES & TERMINOLOGY (Topic 27)
   ========================================================================== */
window.LESSONS_CONTENT["tree-intro"] = {
  id: "tree-intro",
  title: "Introduction to Trees & Terminology",
  levelTitle: "Level 5 — Trees",
  summary: "Explore the foundation of hierarchical non-linear data structures: roots, branches, edges, leaves, depth vs height metrics, and JavaScript representations.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS A TREE & WHY DO WE NEED IT?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-tree",
      title: "1. What is a Tree & Why Do We Need It?",
      tocTitle: "1. What is a Tree?",
      contentHtml: `
        <p>Until now, every data structure you have learned — Arrays, Strings, Linked Lists, Stacks, and Queues — has been <strong>linear</strong>. In a linear data structure, elements are arranged sequentially in a single line, where every element has exactly one predecessor and one successor.</p>
        
        <div style="background:var(--accent-gradient-subtle); padding:18px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:1.05rem;">Definition of a Tree</h4>
          <p style="margin:0; color:var(--text-primary); line-height:1.65;">
            A <strong>Tree</strong> is a <strong>hierarchical, non-linear</strong> data structure consisting of <strong>nodes</strong> connected by directed or undirected <strong>edges</strong>. It starts at a single topmost entry point called the <strong>Root</strong>, and branches downward into subtrees without containing any cycles or loops.
          </p>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Why Trees Matter in Real-World Software</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Real-world data is naturally hierarchical, not flat. Trees power the most critical systems in modern computing:
        </p>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
          <li><strong>The Document Object Model (DOM):</strong> Every web page you visit is parsed into a tree of HTML tags (<code>&lt;html&gt; &rarr; &lt;body&gt; &rarr; &lt;div&gt; &rarr; &lt;p&gt;</code>).</li>
          <li><strong>File Systems on Disk:</strong> Folders containing nested folders and files form a classic directory tree (e.g. <code>C:\\Users\\Desktop\\DSA</code>).</li>
          <li><strong>Compilers & Interpreters:</strong> Programming languages parse your code into an <strong>Abstract Syntax Tree (AST)</strong> to execute statements in the correct order.</li>
          <li><strong>Database Indexing:</strong> High-speed databases (PostgreSQL, MySQL, SQLite) use B-Trees and B+ Trees to search billions of rows in milliseconds.</li>
          <li><strong>Machine Learning:</strong> Decision Trees and Random Forests make predictions by evaluating questions at each branch.</li>
        </ul>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Linear Structures vs. Trees: A Comparison</h3>
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Array</th>
                <th>Linked List</th>
                <th>Tree (Hierarchical)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Structure</strong></td>
                <td>Linear, contiguous memory</td>
                <td>Linear, pointer-linked nodes</td>
                <td>Non-linear, hierarchical branching</td>
              </tr>
              <tr>
                <td><strong>Search (Unsorted)</strong></td>
                <td>O(n) linear scan</td>
                <td>O(n) linear traversal</td>
                <td>O(n) for arbitrary; O(log n) if balanced BST</td>
              </tr>
              <tr>
                <td><strong>Insert / Delete</strong></td>
                <td>O(n) due to element shifting</td>
                <td>O(1) at known pointer</td>
                <td>O(log n) in balanced trees; no shifting needed</td>
              </tr>
              <tr>
                <td><strong>Relationships</strong></td>
                <td>Index offsets (0, 1, 2...)</td>
                <td>Next / Previous pointers</td>
                <td>Parent, Child, Sibling, Ancestor, Descendant</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: COMPLETE TREE TERMINOLOGY GUIDE
       ------------------------------------------------------------------------ */
    {
      id: "section-tree-terminology",
      title: "2. The Complete Tree Terminology Guide",
      tocTitle: "2. Tree Terminology",
      contentHtml: `
        <p>Before writing tree algorithms, you must master the precise vocabulary used in coding interviews and academic computer science.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; margin:16px 0;">
          <div class="tree-prop-card">
            <span class="tree-prop-label">🌱 Node</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">The fundamental building block. Contains stored data and references/pointers to child nodes.</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">👑 Root Node</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">The unique topmost entry node of the tree. The only node in a tree with <strong>no parent</strong>.</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">🔗 Edge</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">The directional link connecting a parent to a child. A tree with $N$ nodes always has <strong>exactly $N - 1$ edges</strong>.</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">👨‍👦 Parent & Child</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">A node directly above another is its <strong>Parent</strong>. The node directly below is its <strong>Child</strong>.</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">👥 Siblings</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">Nodes that share the exact same immediate parent node.</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">🍃 Leaf (External Node)</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">A terminal node with <strong>no children</strong> (degree 0, <code>left === null && right === null</code>).</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">🌳 Subtree</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">Any node in a tree along with all its descendants. Every node is the root of its own subtree!</span>
          </div>
          <div class="tree-prop-card">
            <span class="tree-prop-label">👴 Ancestor & Descendant</span>
            <span style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">Any node on the path from root to node is an <strong>Ancestor</strong>. Any node reachable downwards is a <strong>Descendant</strong>.</span>
          </div>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Depth, Height, Level, and Degree: The Exact Metrics</h3>
        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:18px; margin-bottom:16px;">
          <ul style="color:var(--text-primary); line-height:1.8; margin:0; padding-left:20px;">
            <li><strong>Node Depth:</strong> The number of edges on the path from the root down to that specific node. (The <strong>Root has depth 0</strong>).</li>
            <li><strong>Node Height:</strong> The number of edges on the longest downward path from that node down to a leaf. (A <strong>Leaf has height 0</strong>).</li>
            <li><strong>Tree Height:</strong> The height of the Root node (i.e. the maximum depth of any node in the tree).</li>
            <li><strong>Level:</strong> A horizontal tier of nodes at the same depth. Root is at <strong>Level 0</strong>.</li>
            <li><strong>Degree of a Node:</strong> The number of subtrees/children attached to that node.</li>
            <li><strong>Degree of a Tree:</strong> The maximum degree among all nodes in the tree (for binary trees, max degree is 2).</li>
          </ul>

          <div style="margin-top:14px; padding:12px 14px; background:var(--bg-body); border-radius:8px; border-left:4px solid var(--accent-primary); font-size:0.88rem; color:var(--text-secondary);">
            💡 <strong>Standard Convention Note:</strong> In modern computer science and LeetCode, height and depth are counted by <strong>edges</strong> (single-node tree has height 0; empty tree has height -1). Some legacy textbooks count by <strong>nodes/levels</strong> (single-node height = 1). In this curriculum, we use the standard edge-based convention!
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: INTERACTIVE TREE INSPECTOR
       ------------------------------------------------------------------------ */
    {
      id: "section-interactive-inspector",
      title: "3. Interactive Tree Inspector: Click Any Node",
      tocTitle: "3. Interactive Inspector",
      contentHtml: `
        <p>Inspect the canonical tree below. Click on any node circle or chip button to inspect its properties, parent, children, siblings, depth, height, ancestors, and descendants live!</p>

        <div class="hash-widget-card" id="tree-inspector-widget">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">
              Select a Node to Inspect:
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;" id="inspector-chips-bar">
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" data-node-id="A">Node A (Root)</button>
              <button class="hash-ctrl-btn" data-node-id="B">Node B</button>
              <button class="hash-ctrl-btn" data-node-id="C">Node C</button>
              <button class="hash-ctrl-btn" data-node-id="D">Node D (Leaf)</button>
              <button class="hash-ctrl-btn" data-node-id="E">Node E (Leaf)</button>
              <button class="hash-ctrl-btn" data-node-id="F">Node F (Leaf)</button>
            </div>
          </div>

          <!-- Interactive SVG Canvas -->
          <div class="tree-svg-container">
            <svg class="tree-svg-canvas" viewBox="0 0 500 230" id="inspector-svg">
              <!-- Edges -->
              <line x1="250" y1="35" x2="150" y2="105" class="tree-edge" id="edge-A-B" />
              <line x1="250" y1="35" x2="350" y2="105" class="tree-edge" id="edge-A-C" />
              <line x1="150" y1="105" x2="90" y2="175" class="tree-edge" id="edge-B-D" />
              <line x1="150" y1="105" x2="210" y2="175" class="tree-edge" id="edge-B-E" />
              <line x1="350" y1="105" x2="410" y2="175" class="tree-edge" id="edge-C-F" />

              <!-- Nodes -->
              <!-- A -->
              <g class="tree-node-group tree-node-group--active" data-node="A" transform="translate(250, 35)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">A</text>
              </g>
              <!-- B -->
              <g class="tree-node-group" data-node="B" transform="translate(150, 105)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">B</text>
              </g>
              <!-- C -->
              <g class="tree-node-group" data-node="C" transform="translate(350, 105)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">C</text>
              </g>
              <!-- D -->
              <g class="tree-node-group" data-node="D" transform="translate(90, 175)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">D</text>
              </g>
              <!-- E -->
              <g class="tree-node-group" data-node="E" transform="translate(210, 175)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">E</text>
              </g>
              <!-- F -->
              <g class="tree-node-group" data-node="F" transform="translate(410, 175)">
                <circle cx="0" cy="0" r="22" class="tree-node-circle" />
                <text class="tree-node-text">F</text>
              </g>
            </svg>
          </div>

          <!-- Inspector Property Grid -->
          <div class="tree-inspector-panel" id="inspector-details">
            <!-- Dynamically populated in onMount -->
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: JAVASCRIPT OBJECT REPRESENTATION
       ------------------------------------------------------------------------ */
    {
      id: "section-js-representation",
      title: "4. Representing Trees in JavaScript",
      tocTitle: "4. JavaScript Tree Class",
      contentHtml: `
        <p>In JavaScript, a tree is built using a simple <code>TreeNode</code> class. Each node holds its data payload (<code>val</code>) and two pointer references: <code>left</code> and <code>right</code> (pointing to child nodes, or <code>null</code> if empty).</p>

        <pre class="code-block"><code>// The canonical LeetCode TreeNode definition
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;  // Reference to left child (or null)
    this.right = null; // Reference to right child (or null)
  }
}

// Manually constructing the A-B-C-D-E-F tree:
const root = new TreeNode('A');
root.left = new TreeNode('B');
root.right = new TreeNode('C');

root.left.left = new TreeNode('D');
root.left.right = new TreeNode('E');
root.right.right = new TreeNode('F');

console.log(root.val);             // 'A' (Root)
console.log(root.left.left.val);    // 'D' (Left child of B)
console.log(root.right.left);       // null (C has no left child)</code></pre>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin-top:16px;">
          <h4 style="margin:0 0 8px 0; color:var(--text-primary); font-size:0.95rem;">Why Are There No Parent Pointers?</h4>
          <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">
            In standard interview problems, tree nodes only have pointers downward (<code>left</code> and <code>right</code>). They do <strong>not</strong> store a pointer back to their parent. Because you cannot navigate upwards, tree algorithms rely heavily on <strong>Recursion</strong> and the <strong>Call Stack</strong> to remember where you came from as you backtrack!
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: COMMON MISTAKES & RECAP
       ------------------------------------------------------------------------ */
    {
      id: "section-common-mistakes",
      title: "5. Common Mistakes & Summary",
      tocTitle: "5. Common Pitfalls",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Mistake 1: Confusing Depth vs. Height</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              Remember: <strong>Depth goes DOWN from the Root</strong> (Root has depth 0). <strong>Height goes UP from the Leaves</strong> (Leaves have height 0). A leaf node at the bottom has high depth, but height 0!
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Mistake 2: Assuming all trees are binary search trees</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              An ordinary tree has NO value ordering. A child value can be anything. Only a <em>Binary Search Tree (BST)</em> requires <code>left &lt; root &lt; right</code>.
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Mistake 3: Thinking a graph with a cycle can be a tree</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              By definition, a tree is an <strong>acyclic, connected, undirected graph</strong>. If there is a loop or cycle, or if a node has two parents, it is a graph, NOT a tree.
            </p>
          </div>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: BIND INTERACTIVE TREE INSPECTOR
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    const treeData = {
      A: { val: 'A', parent: 'null (Is Root)', children: ['B', 'C'], siblings: 'None', depth: 0, height: 2, degree: 2, isRoot: true, isLeaf: false, ancestors: 'None', descendants: ['B', 'C', 'D', 'E', 'F'] },
      B: { val: 'B', parent: 'A', children: ['D', 'E'], siblings: 'C', depth: 1, height: 1, degree: 2, isRoot: false, isLeaf: false, ancestors: ['A'], descendants: ['D', 'E'] },
      C: { val: 'C', parent: 'A', children: ['F'], siblings: 'B', depth: 1, height: 1, degree: 1, isRoot: false, isLeaf: false, ancestors: ['A'], descendants: ['F'] },
      D: { val: 'D', parent: 'B', children: [], siblings: 'E', depth: 2, height: 0, degree: 0, isRoot: false, isLeaf: true, ancestors: ['B', 'A'], descendants: 'None (Leaf)' },
      E: { val: 'E', parent: 'B', children: [], siblings: 'D', depth: 2, height: 0, degree: 0, isRoot: false, isLeaf: true, ancestors: ['B', 'A'], descendants: 'None (Leaf)' },
      F: { val: 'F', parent: 'C', children: [], siblings: 'None', depth: 2, height: 0, degree: 0, isRoot: false, isLeaf: true, ancestors: ['C', 'A'], descendants: 'None (Leaf)' }
    };

    let activeNode = 'A';

    const panel = container.querySelector('#inspector-details');
    const svg = container.querySelector('#inspector-svg');
    const chipBtns = container.querySelectorAll('#inspector-chips-bar button');

    function renderDetails(nodeId) {
      activeNode = nodeId;
      const d = treeData[nodeId];
      if (!d || !panel) return;

      // Update button highlights
      chipBtns.forEach(btn => {
        const isCur = btn.getAttribute('data-node-id') === nodeId;
        btn.className = isCur ? 'hash-ctrl-btn hash-ctrl-btn--primary' : 'hash-ctrl-btn';
      });

      // Update SVG node highlights
      if (svg) {
        svg.querySelectorAll('.tree-node-group').forEach(g => {
          const n = g.getAttribute('data-node');
          g.classList.toggle('tree-node-group--active', n === nodeId);
        });
      }

      panel.innerHTML = `
        <div class="tree-prop-card">
          <span class="tree-prop-label">Selected Node</span>
          <span class="tree-prop-value" style="color:var(--accent-primary);">Node ${d.val}</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Parent</span>
          <span class="tree-prop-value">${Array.isArray(d.parent) ? d.parent.join(', ') : d.parent}</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Children</span>
          <span class="tree-prop-value">${d.children.length > 0 ? d.children.join(', ') : 'None (Leaf)'}</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Siblings</span>
          <span class="tree-prop-value">${d.siblings}</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Node Depth</span>
          <span class="tree-prop-value" style="color:#60A5FA;">${d.depth} edge(s) from root</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Node Height</span>
          <span class="tree-prop-value" style="color:#34D399;">${d.height} edge(s) to leaf</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Degree</span>
          <span class="tree-prop-value">${d.degree} child branch(es)</span>
        </div>
        <div class="tree-prop-card">
          <span class="tree-prop-label">Status</span>
          <span class="tree-prop-value">${d.isRoot ? '👑 Root Node' : (d.isLeaf ? '🍃 Leaf Node' : '🌿 Internal Node')}</span>
        </div>
        <div class="tree-prop-card" style="grid-column: 1 / -1;">
          <span class="tree-prop-label">Ancestors (Path to Root)</span>
          <span class="tree-prop-value" style="font-size:0.88rem;">${Array.isArray(d.ancestors) ? d.ancestors.join(' &rarr; ') : d.ancestors}</span>
        </div>
        <div class="tree-prop-card" style="grid-column: 1 / -1;">
          <span class="tree-prop-label">Descendants in Subtree</span>
          <span class="tree-prop-value" style="font-size:0.88rem;">${Array.isArray(d.descendants) ? d.descendants.join(', ') : d.descendants}</span>
        </div>
      `;
    }

    // Bind chip buttons
    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        renderDetails(btn.getAttribute('data-node-id'));
      });
    });

    // Bind SVG node click
    if (svg) {
      svg.querySelectorAll('.tree-node-group').forEach(g => {
        g.addEventListener('click', () => {
          renderDetails(g.getAttribute('data-node'));
        });
      });
    }

    renderDetails('A');
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "ti-q1",
      difficulty: "Easy",
      question: "If a tree contains 15 nodes, how many edges does it contain?",
      options: [
        "A. 15 edges",
        "B. 14 edges",
        "C. 16 edges",
        "D. 30 edges"
      ],
      answer: "B",
      explanation: "A tree with $N$ nodes always has exactly $N - 1$ edges because every node except the root has exactly one incoming parent edge."
    },
    {
      id: "ti-q2",
      difficulty: "Easy",
      question: "What is the depth of the root node in standard edge-based convention?",
      options: [
        "A. 0",
        "B. 1",
        "C. -1",
        "D. Equal to the height of the tree"
      ],
      answer: "A",
      explanation: "Depth is defined as the number of edges from the root to the node. The root is 0 edges away from itself, so its depth is 0."
    },
    {
      id: "ti-q3",
      difficulty: "Medium",
      question: "What is a 'Leaf' node in a tree?",
      options: [
        "A. A node with degree 1",
        "B. A node with no parent",
        "C. A terminal node with 0 children",
        "D. The node with the largest value"
      ],
      answer: "C",
      explanation: "A leaf node is an external terminal node having no children (`left === null && right === null`), meaning its degree is 0."
    },
    {
      id: "ti-q4",
      difficulty: "Medium",
      question: "In the example tree, Node B has children D and E. Node C has child F. What is the relationship between Node B and Node C?",
      options: [
        "A. Ancestor and Descendant",
        "B. Siblings (both share parent Node A)",
        "C. Root and Leaf",
        "D. Subtree and Edge"
      ],
      answer: "B",
      explanation: "Nodes that share the exact same immediate parent node (in this case, Root Node A) are called Siblings."
    },
    {
      id: "ti-q5",
      difficulty: "Hard",
      question: "What is the difference between Depth and Height of a node?",
      options: [
        "A. Depth is counted downwards from root; Height is counted upwards from the deepest leaf",
        "B. Depth and Height are always identical",
        "C. Depth applies to binary trees; Height applies to graphs",
        "D. Depth counts nodes; Height counts edges"
      ],
      answer: "A",
      explanation: "Depth measures distance downwards from the root (root has depth 0). Height measures the longest path downwards to a leaf (leaves have height 0)."
    },
    {
      id: "ti-q6",
      difficulty: "Interview",
      question: "Why do standard LeetCode TreeNode classes omit parent pointers?",
      options: [
        "A. To save memory and force learners to master recursion and call-stack backtracking",
        "B. JavaScript objects cannot hold circular references",
        "C. Trees with parent pointers are mathematically illegal",
        "D. Parent pointers make tree search O(1)"
      ],
      answer: "A",
      explanation: "Without parent pointers, backward navigation is impossible, which is why tree algorithms use recursive call stacks or queues to track backtracking cleanly."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the degree of a leaf node?",
      options: ["A. 0", "B. 1", "C. 2", "D. Depends on tree height"],
      answer: "A",
      explanation: "Degree is the number of children attached to a node. Since a leaf has no children, its degree is 0."
    },
    {
      question: "Q2. In a tree, how many parents can a child node have?",
      options: ["A. Exactly 1 (except the root, which has 0)", "B. 2", "C. Unlimited", "D. At least 2"],
      answer: "A",
      explanation: "A tree cannot have cycles or multiple parents. Every node except the root has exactly one direct parent."
    }
  ],

  predictOutput: [
    {
      code: "const root = new TreeNode(1);\nroot.left = new TreeNode(2);\nroot.right = new TreeNode(3);\nconsole.log(root.left.right);",
      options: ["null", "undefined", "3", "ReferenceError"],
      answer: "null",
      explanation: "root.left is Node 2. Node 2 has no right child initialized, so root.left.right evaluates to null."
    },
    {
      code: "const a = new TreeNode('X');\nconst b = new TreeNode('Y');\na.left = b;\nconsole.log(a.left.val === b.val);",
      options: ["true", "false", "undefined", "TypeError"],
      answer: "true",
      explanation: "a.left references the node b, so a.left.val is 'Y', which strictly equals b.val."
    }
  ],

  practice: [
    {
      q: "Why is a tree called a non-linear data structure?",
      a: "Because its elements are not stored in a simple sequence or single line. A node can branch into multiple subtrees, forming a 2-dimensional hierarchical structure."
    },
    {
      q: "What is an edge in a tree, and what is the relation between node count and edge count?",
      a: "An edge is a directed connection between a parent and a child. A valid tree with N nodes always contains exactly N - 1 edges."
    },
    {
      q: "What is the difference between a subtree and a leaf?",
      a: "A leaf is a single node with no children. A subtree consists of a node and all of its descendants, forming a smaller complete tree inside the larger tree."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    problems: [
      {
        num: 104,
        slug: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        whyThisOrder: "Directly reinforces the depth and height definitions learned in this module."
      },
      {
        num: 226,
        slug: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        whyThisOrder: "Practice swapping left and right child pointers at every node."
      },
      {
        num: 100,
        slug: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        whyThisOrder: "Check structural identity and value equality across two trees simultaneously."
      }
    ]
  }
};


/* ==========================================================================
   MODULE 2: BINARY TREES & TYPES (Topic 28)
   ========================================================================== */
window.LESSONS_CONTENT["binary-tree-types"] = {
  id: "binary-tree-types",
  title: "Binary Trees & Types",
  levelTitle: "Level 5 — Trees",
  summary: "Master the 7 specialized binary tree classifications (Full, Complete, Perfect, Balanced, Degenerate, Skewed), mathematical capacity formulas, and the BST distinction.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT MAKES A TREE BINARY?
       ------------------------------------------------------------------------ */
    {
      id: "section-binary-tree-basics",
      title: "1. What Makes a Tree 'Binary'?",
      tocTitle: "1. Binary Tree Basics",
      contentHtml: `
        <p>A <strong>Binary Tree</strong> is a specialized tree structure where <strong>each node has at most two children</strong>, referred to as the <strong>left child</strong> and the <strong>right child</strong>.</p>

        <div style="background:var(--accent-gradient-subtle); padding:16px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:16px 0;">
          <h4 style="margin:0 0 6px 0; color:var(--accent-primary); font-size:1.02rem;">The 'At Most Two' Rule</h4>
          <p style="margin:0; color:var(--text-primary); line-height:1.6;">
            Every node in a binary tree can have <strong>0, 1, or 2 children</strong>. No node may have 3 or more children. Furthermore, left and right children are ordered: swapping a left child to the right child creates a completely different binary tree!
          </p>
        </div>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin-top:16px;">
          <h4 style="margin:0 0 6px 0; color:#EF4444; font-size:0.95rem;">⚠️ Critical Distinction: Binary Tree vs. Binary Search Tree (BST)</h4>
          <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">
            A common beginner misunderstanding is assuming binary trees must be sorted. <strong>An ordinary Binary Tree does NOT enforce any order on node values!</strong> A node value can be 50 with a left child of 99 and right child of 2. Only a <em>Binary Search Tree (BST)</em> enforces the rule: <code>left &lt; root &lt; right</code>.
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: THE 7 SPECIALIZED BINARY TREE TYPES
       ------------------------------------------------------------------------ */
    {
      id: "section-seven-tree-types",
      title: "2. The 7 Specialized Binary Tree Types",
      tocTitle: "2. The 7 Tree Types",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:14px;">
          
          <!-- Full -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--accent-primary); font-size:0.98rem; margin-bottom:4px;">
              1. Full (Strict / Proper) Binary Tree
            </div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              Every node has <strong>either 0 or 2 children</strong>. No node has exactly 1 child. If an internal node has children, it must have both!
            </p>
          </div>

          <!-- Complete -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#10B981; font-size:0.98rem; margin-bottom:4px;">
              2. Complete Binary Tree
            </div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              All levels are completely filled except possibly the last level, and all nodes on the last level are <strong>packed as far left as possible</strong> without gaps. This property allows complete trees to be stored in flat arrays without wasting memory (used in <strong>Binary Heaps & Priority Queues</strong>).
            </p>
          </div>

          <!-- Perfect -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#F59E0B; font-size:0.98rem; margin-bottom:4px;">
              3. Perfect Binary Tree
            </div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              All interior nodes have exactly 2 children, and <strong>all leaf nodes are at the exact same depth/level</strong>. A perfect tree is completely filled from top to bottom.
            </p>
          </div>

          <!-- Balanced -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#6366F1; font-size:0.98rem; margin-bottom:4px;">
              4. Balanced Binary Tree (AVL Condition)
            </div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              For every node in the tree, the height difference between its left and right subtrees is <strong>at most 1</strong>: $|height(left) - height(right)| \le 1$. Guarantees $O(\log n)$ height and fast operations!
            </p>
          </div>

          <!-- Degenerate -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; font-size:0.98rem; margin-bottom:4px;">
              5. Degenerate (Pathological) Tree
            </div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              Every internal node has exactly one child. The tree essentially degrades into a <strong>singly linked list</strong>, losing all logarithmic benefits ($O(n)$ search time).
            </p>
          </div>

          <!-- Skewed -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
            <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
              <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;">6. Left-Skewed Tree</div>
              <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Every node has ONLY a left child (no right children anywhere).</p>
            </div>
            <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
              <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;">7. Right-Skewed Tree</div>
              <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Every node has ONLY a right child (occurs when sorted numbers are inserted into a naive BST).</p>
            </div>
          </div>

        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: INTERACTIVE TREE TYPES GALLERY
       ------------------------------------------------------------------------ */
    {
      id: "section-interactive-types-gallery",
      title: "3. Interactive Tree Types Gallery",
      tocTitle: "3. Interactive Types Gallery",
      contentHtml: `
        <p>Switch between the different binary tree classifications below to view visual SVG diagrams and inspect why each structure satisfies its rules.</p>

        <div class="hash-widget-card" id="types-gallery-widget">
          <!-- Type Switcher Bar -->
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;" id="type-tabs-bar">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" data-type="full">Full Binary Tree</button>
            <button class="hash-ctrl-btn" data-type="complete">Complete Binary Tree</button>
            <button class="hash-ctrl-btn" data-type="perfect">Perfect Binary Tree</button>
            <button class="hash-ctrl-btn" data-type="balanced">Balanced Tree</button>
            <button class="hash-ctrl-btn" data-type="skewed">Skewed (Degenerate)</button>
            <button class="hash-ctrl-btn" data-type="bst-compare">Binary Tree vs. BST</button>
          </div>

          <!-- Dynamic SVG Display Canvas -->
          <div class="tree-svg-container" id="types-svg-canvas">
            <!-- Rendered in onMount -->
          </div>

          <!-- Explanation Description Card -->
          <div class="hash-narration-box" id="types-description">
            <!-- Rendered in onMount -->
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: MATHEMATICAL CAPACITY FORMULAS & LIVE CALCULATOR
       ------------------------------------------------------------------------ */
    {
      id: "section-mathematical-formulas",
      title: "4. Mathematical Formulas & Capacity Calculator",
      tocTitle: "4. Capacity Formulas",
      contentHtml: `
        <p>In technical interviews, you are frequently asked to compute theoretical bounds on binary trees. Here are the core mathematical formulas (with edge-based height $h$, where root is at level 0):</p>

        <div style="overflow-x:auto;">
          <table class="hash-state-table" style="margin-bottom:18px;">
            <thead>
              <tr>
                <th>Formula</th>
                <th>Mathematical Equation</th>
                <th>Example ($h = 3$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Max Nodes at Level $i$</strong></td>
                <td>$2^i$</td>
                <td>Level 3: $2^3 = 8$ nodes</td>
              </tr>
              <tr>
                <td><strong>Max Total Nodes for Height $h$</strong></td>
                <td>$2^{h+1} - 1$</td>
                <td>Height 3: $2^{3+1} - 1 = 15$ nodes</td>
              </tr>
              <tr>
                <td><strong>Min Height for $N$ Nodes</strong></td>
                <td>$\lfloor \log_2(N) \rfloor$</td>
                <td>15 nodes: $\lfloor \log_2(15) \rfloor = 3$ edges</td>
              </tr>
              <tr>
                <td><strong>Leaves in Perfect Tree</strong></td>
                <td>$2^h$</td>
                <td>Height 3: $2^3 = 8$ leaves</td>
              </tr>
              <tr>
                <td><strong>Full Tree Leaves vs Internal</strong></td>
                <td>$L = I + 1$</td>
                <td>7 internal nodes $\implies 8$ leaves</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Live Formula Calculator -->
        <div class="tree-calc-box">
          <h4 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1rem;">
            🧮 Interactive Tree Capacity Calculator
          </h4>
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <label style="font-weight:600; color:var(--text-secondary); font-size:0.9rem;">
              Enter Tree Height ($h$ edges):
            </label>
            <input type="number" id="calc-input-height" class="hash-input-field" value="3" min="0" max="20" style="max-width:110px;" />
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-calc-compute">Compute Bounds</button>
          </div>

          <div class="tree-calc-grid" id="calc-results-grid">
            <div class="tree-calc-metric">
              <span class="tree-prop-label">Max Total Nodes</span>
              <div class="tree-calc-metric-val" id="res-max-nodes">15</div>
            </div>
            <div class="tree-calc-metric">
              <span class="tree-prop-label">Leaves on Last Level</span>
              <div class="tree-calc-metric-val" id="res-leaves">8</div>
            </div>
            <div class="tree-calc-metric">
              <span class="tree-prop-label">Internal Nodes</span>
              <div class="tree-calc-metric-val" id="res-internal">7</div>
            </div>
            <div class="tree-calc-metric">
              <span class="tree-prop-label">Total Edges in Tree</span>
              <div class="tree-calc-metric-val" id="res-edges">14</div>
            </div>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: COMPARISON MATRIX & COMMON PITFALLS
       ------------------------------------------------------------------------ */
    {
      id: "section-comparison-matrix",
      title: "5. Comprehensive Comparison Table & Common Mistakes",
      tocTitle: "5. Types Comparison",
      contentHtml: `
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Tree Type</th>
                <th>Children per Node</th>
                <th>Leaf Level Distribution</th>
                <th>Height Bound</th>
                <th>Primary Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Full</strong></td>
                <td>0 or 2 exactly</td>
                <td>Any levels</td>
                <td>$O(\log n)$ to $O(n)$</td>
                <td>Huffman Coding, Expression Parsing</td>
              </tr>
              <tr>
                <td><strong>Complete</strong></td>
                <td>0, 1, or 2 (left-packed)</td>
                <td>All at depth $h$ or $h-1$</td>
                <td>$\lfloor \log_2 n \rfloor$</td>
                <td>Binary Heaps, Priority Queues</td>
              </tr>
              <tr>
                <td><strong>Perfect</strong></td>
                <td>2 for internal, 0 for leaves</td>
                <td>All at exact same depth $h$</td>
                <td>$\log_2(n + 1) - 1$</td>
                <td>Maximum theoretical capacity bounds</td>
              </tr>
              <tr>
                <td><strong>Balanced</strong></td>
                <td>0, 1, or 2 ($|h_L - h_R| \le 1$)</td>
                <td>Within 1 level of each other</td>
                <td>$O(\log n)$ guaranteed</td>
                <td>AVL Trees, Red-Black Trees</td>
              </tr>
              <tr>
                <td><strong>Degenerate</strong></td>
                <td>1 child per internal node</td>
                <td>Single leaf at bottom</td>
                <td>$O(n)$ linear linked list</td>
                <td>Pathological worst case in unbalanced BST</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Top 3 Traps to Avoid</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 1: Assuming a Complete Tree is always Full</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              A Complete Binary Tree is NOT necessarily a Full Binary Tree. A complete tree can have one node with exactly 1 child on the last level, whereas a Full tree strictly forbids any node from having 1 child.
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 2: Assuming a Balanced Tree must be completely filled</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              A balanced tree only requires the height difference $|h_L - h_R| \le 1$ at every node. It does not require every level to be full.
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 3: Forgetting that a sorted array turns an unbalanced BST into a degenerate tree</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              Inserting <code>[1, 2, 3, 4, 5]</code> sequentially into a standard BST inserts each element as a right child, producing an $O(n)$ right-skewed linked list!
            </p>
          </div>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: BIND GALLERY & CAPACITY CALCULATOR
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    /* 1. TYPES GALLERY */
    (function initGallery() {
      const tabs = container.querySelectorAll('#type-tabs-bar button');
      const canvas = container.querySelector('#types-svg-canvas');
      const desc = container.querySelector('#types-description');

      if (!tabs.length || !canvas) return;

      const galleryData = {
        full: {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 210">
              <line x1="230" y1="35" x2="140" y2="105" class="tree-edge" />
              <line x1="230" y1="35" x2="320" y2="105" class="tree-edge" />
              <line x1="140" y1="105" x2="90" y2="175" class="tree-edge" />
              <line x1="140" y1="105" x2="190" y2="175" class="tree-edge" />
              <g class="tree-node-group" transform="translate(230, 35)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">1</text></g>
              <g class="tree-node-group" transform="translate(140, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">2</text></g>
              <g class="tree-node-group" transform="translate(320, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">3</text></g>
              <g class="tree-node-group" transform="translate(90, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">4</text></g>
              <g class="tree-node-group" transform="translate(190, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">5</text></g>
            </svg>
          `,
          desc: `<strong>Full Binary Tree:</strong> Notice that Node 1 has 2 children, Node 2 has 2 children, and Nodes 3, 4, 5 have 0 children (leaves). <em>Zero nodes have exactly 1 child!</em>`
        },
        complete: {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 210">
              <line x1="230" y1="35" x2="140" y2="105" class="tree-edge" />
              <line x1="230" y1="35" x2="320" y2="105" class="tree-edge" />
              <line x1="140" y1="105" x2="90" y2="175" class="tree-edge" />
              <line x1="140" y1="105" x2="190" y2="175" class="tree-edge" />
              <line x1="320" y1="105" x2="270" y2="175" class="tree-edge" />
              <g class="tree-node-group" transform="translate(230, 35)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">1</text></g>
              <g class="tree-node-group" transform="translate(140, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">2</text></g>
              <g class="tree-node-group" transform="translate(320, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">3</text></g>
              <g class="tree-node-group" transform="translate(90, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">4</text></g>
              <g class="tree-node-group" transform="translate(190, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">5</text></g>
              <g class="tree-node-group" transform="translate(270, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">6</text></g>
            </svg>
          `,
          desc: `<strong>Complete Binary Tree:</strong> All levels are full except the last level, and on the last level, all nodes (4, 5, 6) are placed as far left as possible with zero gaps. Perfect for flat-array storage in Heaps!`
        },
        perfect: {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 210">
              <line x1="230" y1="35" x2="130" y2="105" class="tree-edge" />
              <line x1="230" y1="35" x2="330" y2="105" class="tree-edge" />
              <line x1="130" y1="105" x2="80" y2="175" class="tree-edge" />
              <line x1="130" y1="105" x2="180" y2="175" class="tree-edge" />
              <line x1="330" y1="105" x2="280" y2="175" class="tree-edge" />
              <line x1="330" y1="105" x2="380" y2="175" class="tree-edge" />
              <g class="tree-node-group" transform="translate(230, 35)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">1</text></g>
              <g class="tree-node-group" transform="translate(130, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">2</text></g>
              <g class="tree-node-group" transform="translate(330, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">3</text></g>
              <g class="tree-node-group" transform="translate(80, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">4</text></g>
              <g class="tree-node-group" transform="translate(180, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">5</text></g>
              <g class="tree-node-group" transform="translate(280, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">6</text></g>
              <g class="tree-node-group" transform="translate(380, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">7</text></g>
            </svg>
          `,
          desc: `<strong>Perfect Binary Tree:</strong> Every internal node has 2 children, and every leaf (4, 5, 6, 7) sits at the exact same depth level 2. Total nodes = $2^{2+1} - 1 = 7$.`
        },
        balanced: {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 210">
              <line x1="230" y1="35" x2="150" y2="105" class="tree-edge" />
              <line x1="230" y1="35" x2="310" y2="105" class="tree-edge" />
              <line x1="150" y1="105" x2="100" y2="175" class="tree-edge" />
              <g class="tree-node-group" transform="translate(230, 35)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">A</text></g>
              <g class="tree-node-group" transform="translate(150, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">B</text></g>
              <g class="tree-node-group" transform="translate(310, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">C</text></g>
              <g class="tree-node-group" transform="translate(100, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" /><text class="tree-node-text">D</text></g>
            </svg>
          `,
          desc: `<strong>Balanced Binary Tree:</strong> At Root A: Left height is 1, Right height is 0. Difference is $|1 - 0| = 1 \\le 1$. Every node satisfies the height-balance property!`
        },
        skewed: {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 230">
              <line x1="150" y1="30" x2="210" y2="90" class="tree-edge" />
              <line x1="210" y1="90" x2="270" y2="150" class="tree-edge" />
              <line x1="270" y1="150" x2="330" y2="210" class="tree-edge" />
              <g class="tree-node-group" transform="translate(150, 30)"><circle cx="0" cy="0" r="18" class="tree-node-circle" /><text class="tree-node-text">1</text></g>
              <g class="tree-node-group" transform="translate(210, 90)"><circle cx="0" cy="0" r="18" class="tree-node-circle" /><text class="tree-node-text">2</text></g>
              <g class="tree-node-group" transform="translate(270, 150)"><circle cx="0" cy="0" r="18" class="tree-node-circle" /><text class="tree-node-text">3</text></g>
              <g class="tree-node-group" transform="translate(330, 210)"><circle cx="0" cy="0" r="18" class="tree-node-circle" /><text class="tree-node-text">4</text></g>
            </svg>
          `,
          desc: `<strong>Right-Skewed Degenerate Tree:</strong> Every node has only a right child. Height is $N - 1 = 3$. Searching takes $O(n)$ time just like a linked list!`
        },
        'bst-compare': {
          svg: `
            <svg class="tree-svg-canvas" viewBox="0 0 460 210">
              <line x1="230" y1="35" x2="140" y2="105" class="tree-edge" />
              <line x1="230" y1="35" x2="320" y2="105" class="tree-edge" />
              <line x1="140" y1="105" x2="90" y2="175" class="tree-edge" />
              <line x1="140" y1="105" x2="190" y2="175" class="tree-edge" />
              <g class="tree-node-group" transform="translate(230, 35)"><circle cx="0" cy="0" r="20" class="tree-node-circle" style="stroke:#10B981;" /><text class="tree-node-text">20</text></g>
              <g class="tree-node-group" transform="translate(140, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" style="stroke:#10B981;" /><text class="tree-node-text">10</text></g>
              <g class="tree-node-group" transform="translate(320, 105)"><circle cx="0" cy="0" r="20" class="tree-node-circle" style="stroke:#10B981;" /><text class="tree-node-text">30</text></g>
              <g class="tree-node-group" transform="translate(90, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" style="stroke:#10B981;" /><text class="tree-node-text">5</text></g>
              <g class="tree-node-group" transform="translate(190, 175)"><circle cx="0" cy="0" r="20" class="tree-node-circle" style="stroke:#10B981;" /><text class="tree-node-text">15</text></g>
            </svg>
          `,
          desc: `<strong>Binary Search Tree (BST):</strong> Notice the strict value order: Left child <code>10 &lt; 20</code>, Right child <code>30 &gt; 20</code>. Furthermore, all nodes in the left subtree (5, 10, 15) are smaller than root 20.`
        }
      };

      function setType(typeKey) {
        const item = galleryData[typeKey] || galleryData.full;
        tabs.forEach(t => {
          t.className = t.getAttribute('data-type') === typeKey ? 'hash-ctrl-btn hash-ctrl-btn--primary' : 'hash-ctrl-btn';
        });
        canvas.innerHTML = item.svg;
        desc.innerHTML = item.desc;
      }

      tabs.forEach(t => {
        t.addEventListener('click', () => setType(t.getAttribute('data-type')));
      });

      setType('full');
    })();

    /* 2. CAPACITY CALCULATOR */
    (function initCalculator() {
      const inputH = container.querySelector('#calc-input-height');
      const btnCompute = container.querySelector('#btn-calc-compute');
      const resNodes = container.querySelector('#res-max-nodes');
      const resLeaves = container.querySelector('#res-leaves');
      const resInternal = container.querySelector('#res-internal');
      const resEdges = container.querySelector('#res-edges');

      if (!inputH || !btnCompute) return;

      function compute() {
        const h = parseInt(inputH.value, 10);
        if (isNaN(h) || h < 0) return;

        const maxNodes = Math.pow(2, h + 1) - 1;
        const leaves = Math.pow(2, h);
        const internal = maxNodes - leaves;
        const edges = maxNodes - 1;

        if (resNodes) resNodes.textContent = maxNodes.toLocaleString();
        if (resLeaves) resLeaves.textContent = leaves.toLocaleString();
        if (resInternal) resInternal.textContent = internal.toLocaleString();
        if (resEdges) resEdges.textContent = edges.toLocaleString();
      }

      btnCompute.addEventListener('click', compute);
      inputH.addEventListener('input', compute);
      compute();
    })();
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "bt-q1",
      difficulty: "Easy",
      question: "What is the maximum number of children any node can have in a Binary Tree?",
      options: [
        "A. 1",
        "B. 2",
        "C. 3",
        "D. Unlimited"
      ],
      answer: "B",
      explanation: "By definition, a binary tree restricts every node to at most two children: designated left and right."
    },
    {
      id: "bt-q2",
      difficulty: "Easy",
      question: "In a Full Binary Tree, how many children can an internal node have?",
      options: [
        "A. Exactly 1",
        "B. Exactly 2",
        "C. Either 1 or 2",
        "D. 0"
      ],
      answer: "B",
      explanation: "In a Full (Strict) Binary Tree, every node has either 0 children (leaf) or 2 children (internal). No node can have 1 child."
    },
    {
      id: "bt-q3",
      difficulty: "Medium",
      question: "What is the total number of nodes in a Perfect Binary Tree of height h = 4 (edge-based, root at level 0)?",
      options: [
        "A. 15",
        "B. 31",
        "C. 16",
        "D. 32"
      ],
      answer: "B",
      explanation: "The formula is $N = 2^{h+1} - 1$. For $h = 4$, $N = 2^5 - 1 = 32 - 1 = 31$ nodes."
    },
    {
      id: "bt-q4",
      difficulty: "Medium",
      question: "Which binary tree type guarantees that all levels are completely filled except possibly the last level, with nodes as far left as possible?",
      options: [
        "A. Complete Binary Tree",
        "B. Degenerate Tree",
        "C. Full Binary Tree",
        "D. Binary Search Tree"
      ],
      answer: "A",
      explanation: "A Complete Binary Tree fills every level left-to-right, making it ideal for array representations without wasted slots."
    },
    {
      id: "bt-q5",
      difficulty: "Hard",
      question: "What is the height balance condition for an AVL (Balanced) Binary Tree?",
      options: [
        "A. Both subtrees must have identical node counts",
        "B. At every node, the height difference between left and right subtrees is at most 1",
        "C. All leaves must be at depth 0",
        "D. Left child must be smaller than right child"
      ],
      answer: "B",
      explanation: "The AVL balanced condition requires $|height(left) - height(right)| \\le 1$ for every node in the tree."
    },
    {
      id: "bt-q6",
      difficulty: "Interview",
      question: "What happens if you insert sorted numbers [1, 2, 3, 4, 5] into an unbalanced Binary Search Tree?",
      options: [
        "A. It creates a perfect binary tree with O(log n) height",
        "B. It creates a degenerate right-skewed tree with O(n) search time",
        "C. It throws an insertion collision error",
        "D. The tree automatically self-balances into an AVL tree"
      ],
      answer: "B",
      explanation: "Each successively larger number becomes a right child of the previous node, degenerating into an $O(n)$ linked list."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. Does an ordinary binary tree enforce that left child is less than right child?",
      options: ["A. Yes, always", "B. No, only a Binary Search Tree (BST) enforces value ordering", "C. Only if it is complete", "D. Only for the root"],
      answer: "B",
      explanation: "An ordinary binary tree has no ordering requirements. BSTs add the specific order condition."
    },
    {
      question: "Q2. In a full binary tree with 10 internal nodes, how many leaves are there?",
      options: ["A. 10", "B. 11", "C. 20", "D. 9"],
      answer: "B",
      explanation: "By the full tree formula $L = I + 1$, $10 + 1 = 11$ leaf nodes."
    }
  ],

  predictOutput: [
    {
      code: "const h = 2;\nconst maxNodes = Math.pow(2, h + 1) - 1;\nconsole.log(maxNodes);",
      options: ["7", "8", "3", "4"],
      answer: "7",
      explanation: "2^(2+1) - 1 = 2^3 - 1 = 8 - 1 = 7 nodes."
    },
    {
      code: "function isFull(root) {\n  if (!root) return true;\n  if (!root.left && !root.right) return true;\n  if (root.left && root.right) return isFull(root.left) && isFull(root.right);\n  return false;\n}\n// Tree: Root(1) has left(2), right(null)\nconsole.log(isFull(root));",
      options: ["false", "true", "undefined", "TypeError"],
      answer: "false",
      explanation: "Root has 1 child (left exists, right is null). A full tree strictly forbids nodes with 1 child."
    }
  ],

  practice: [
    {
      q: "What is the difference between a Complete Binary Tree and a Perfect Binary Tree?",
      a: "A Perfect tree is completely filled on all levels. A Complete tree is completely filled on all levels EXCEPT possibly the last level, where nodes must be as far left as possible."
    },
    {
      q: "Why are Complete Binary Trees used for Binary Heaps?",
      a: "Because they have no missing gaps between nodes, allowing parent-child relationships to be mapped directly to array indices: `left = 2*i + 1` and `right = 2*i + 2` without wasted memory."
    },
    {
      q: "How does a Balanced Binary Tree prevent O(n) worst-case performance?",
      a: "By ensuring subtrees never differ by more than 1 in height, tree height is mathematically guaranteed to stay proportional to `O(log n)`."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    problems: [
      {
        num: 110,
        slug: "balanced-binary-tree",
        title: "Balanced Binary Tree",
        difficulty: "Easy",
        whyThisOrder: "Direct implementation of the height-balanced condition `|h_L - h_R| <= 1`."
      },
      {
        num: 101,
        slug: "symmetric-tree",
        title: "Symmetric Tree",
        difficulty: "Easy",
        whyThisOrder: "Verify mirror symmetry between left and right subtrees."
      },
      {
        num: 100,
        slug: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        whyThisOrder: "Recursively compare both structure and node values."
      }
    ]
  }
};


/* ==========================================================================
   MODULE 3: BINARY TREE TRAVERSALS (Topic 29)
   ========================================================================== */
window.LESSONS_CONTENT["binary-tree-traversals"] = {
  id: "binary-tree-traversals",
  title: "Binary Tree Traversals",
  levelTitle: "Level 5 — Trees",
  summary: "Master all 4 systematic tree traversals (Preorder, Inorder, Postorder, and BFS Level-order) with interactive step-by-step call stack tracing, queue visualization, and an editable tree builder.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: THE TRAVERSAL FUNDAMENTALS
       ------------------------------------------------------------------------ */
    {
      id: "section-traversal-concepts",
      title: "1. The 4 Traversal Strategies",
      tocTitle: "1. Traversal Strategies",
      contentHtml: `
        <p>In linear arrays, visiting every element is trivial: increment index <code>i++</code> from 0 to $n-1$. In trees, because each node branches into two subtrees, we must choose a systematic order to visit nodes.</p>

        <p>The canonical example tree used across this module:</p>
        <div style="font-family:'Fira Code',monospace; font-size:0.95rem; text-align:center; padding:14px; background:var(--bg-body); border-radius:10px; border:1px solid var(--border-default); margin:12px 0;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;\\<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;3<br/>
          &nbsp;&nbsp;&nbsp;/&nbsp;\\<br/>
          &nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;5
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:var(--accent-primary); font-size:0.92rem; margin-bottom:4px;">1. Preorder (Root &rarr; Left &rarr; Right)</div>
            <div style="font-family:'Fira Code',monospace; font-weight:700; color:#10B981; margin-bottom:6px;">[1, 2, 4, 5, 3]</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Process node FIRST, then explore subtrees. Used to copy/serialize trees.</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#6366F1; font-size:0.92rem; margin-bottom:4px;">2. Inorder (Left &rarr; Root &rarr; Right)</div>
            <div style="font-family:'Fira Code',monospace; font-weight:700; color:#10B981; margin-bottom:6px;">[4, 2, 5, 1, 3]</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Process left child, then current node, then right child. <strong>Yields sorted order in a BST!</strong></p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#F59E0B; font-size:0.92rem; margin-bottom:4px;">3. Postorder (Left &rarr; Right &rarr; Root)</div>
            <div style="font-family:'Fira Code',monospace; font-weight:700; color:#10B981; margin-bottom:6px;">[4, 5, 2, 3, 1]</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Process both children completely before processing node. Used for bottom-up tree deletion and directory sizing.</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#EC4899; font-size:0.92rem; margin-bottom:4px;">4. Level-Order (BFS Level by Level)</div>
            <div style="font-family:'Fira Code',monospace; font-weight:700; color:#10B981; margin-bottom:6px;">[1, 2, 3, 4, 5]</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">Horizontal breadth-first scan using a FIFO Queue. Level 0: 1 &rarr; Level 1: 2, 3 &rarr; Level 2: 4, 5.</p>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: FLAGSHIP INTERACTIVE TRAVERSAL VISUALIZER
       ------------------------------------------------------------------------ */
    {
      id: "section-interactive-traversal-visualizer",
      title: "2. Interactive Traversal Visualizer with Call Stack & Queue",
      tocTitle: "2. Traversal Visualizer",
      contentHtml: `
        <div class="hash-widget-card" id="traversals-player-widget">
          
          <!-- Algorithm Switcher Tabs -->
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; border-bottom:1px solid var(--border-default); padding-bottom:12px;" id="traversal-algo-tabs">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" data-algo="preorder">Preorder (N-L-R)</button>
            <button class="hash-ctrl-btn" data-algo="inorder">Inorder (L-N-R)</button>
            <button class="hash-ctrl-btn" data-algo="postorder">Postorder (L-R-N)</button>
            <button class="hash-ctrl-btn" data-algo="levelorder">Level-Order (BFS)</button>
          </div>

          <!-- Playback Controls Bar -->
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-trav-play">▶ Play</button>
              <button class="hash-ctrl-btn" id="btn-trav-reset">⏮ Reset</button>
              <button class="hash-ctrl-btn" id="btn-trav-prev">◀ Step Back</button>
              <button class="hash-ctrl-btn" id="btn-trav-next">Step Forward ▶</button>
              <button class="hash-ctrl-btn" id="btn-trav-replay">🔄 Replay</button>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.82rem; color:var(--text-secondary); font-weight:600;">Speed:</span>
              <button class="hash-ctrl-btn" id="btn-speed-slow" style="padding:4px 8px; font-size:0.75rem;">0.5x</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-speed-norm" style="padding:4px 8px; font-size:0.75rem;">1x</button>
              <button class="hash-ctrl-btn" id="btn-speed-fast" style="padding:4px 8px; font-size:0.75rem;">2x</button>
              <button class="hash-ctrl-btn" id="btn-toggle-exp" style="padding:4px 10px; font-size:0.75rem; margin-left:6px;">Hide Explanation</button>
            </div>
          </div>

          <!-- SVG Tree Canvas -->
          <div class="tree-svg-container">
            <svg class="tree-svg-canvas" viewBox="0 0 500 230" id="traversal-svg-canvas">
              <!-- Rendered dynamically -->
            </svg>
          </div>

          <!-- Output Sequence Strips -->
          <div style="font-weight:700; color:var(--text-primary); font-size:0.88rem; margin:10px 0 4px 0;">
            Output Visited Sequence:
          </div>
          <div class="hash-chips-strip" id="trav-output-strip" style="min-height:56px;"></div>

          <!-- Call Stack / Queue State Box -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px; margin:12px 0;">
            <div>
              <div style="font-weight:700; color:var(--text-primary); font-size:0.85rem;" id="trav-memory-label">
                Call Stack Frames (Recursion Depth):
              </div>
              <div class="tree-memory-strip" id="trav-memory-strip"></div>
            </div>
            <div>
              <div style="font-weight:700; color:var(--text-primary); font-size:0.85rem;">
                Step Information:
              </div>
              <div class="tree-memory-strip" style="color:var(--text-primary);" id="trav-step-counter">
                Step 0 of 0
              </div>
            </div>
          </div>

          <!-- Narration Box -->
          <div class="hash-narration-box" id="trav-narration">
            Select a traversal algorithm above and click <strong>Play ▶</strong> or <strong>Step Forward ▶</strong>.
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: EDITABLE TREE BUILDER
       ------------------------------------------------------------------------ */
    {
      id: "section-editable-tree",
      title: "3. Construct & Edit Your Own Binary Tree",
      tocTitle: "3. Editable Tree Builder",
      contentHtml: `
        <p>You are not limited to the default 5-node tree! Add new children, change node labels, delete subtrees, or reset to default. Watch how all 4 traversal algorithms recompute their execution paths live.</p>

        <div class="hash-widget-card" id="tree-editor-widget">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">
              Selected Node for Editing: <span style="color:var(--accent-primary);" id="editor-active-node">1 (Root)</span>
            </div>
            <button class="hash-ctrl-btn" id="btn-tree-reset-default" style="font-size:0.82rem;">
              ↺ Reset to Canonical Example (1, 2, 3, 4, 5)
            </button>
          </div>

          <div class="hash-playground-form">
            <input type="text" id="input-child-val" class="hash-input-field" placeholder="New Node Value (e.g. 6)" value="6" style="max-width:160px;" />
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-add-left">Add Left Child</button>
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-add-right">Add Right Child</button>
            <button class="hash-ctrl-btn" id="btn-edit-val">Edit Value</button>
            <button class="hash-ctrl-btn" id="btn-del-node" style="color:#EF4444;">Delete Node</button>
          </div>

          <!-- Status Message Feedback -->
          <div id="editor-feedback" style="font-size:0.85rem; color:var(--text-secondary); margin-top:6px; min-height:22px;"></div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: JAVASCRIPT CODE & COMPLEXITY
       ------------------------------------------------------------------------ */
    {
      id: "section-javascript-implementations",
      title: "4. JavaScript Traversal Code & Complexity Analysis",
      tocTitle: "4. Traversal Code",
      contentHtml: `
        <pre class="code-block"><code>class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 1. PREORDER TRAVERSAL (Root -> Left -> Right) - O(n) Time, O(h) Space
function preorderTraversal(root, result = []) {
  if (!root) return result;
  result.push(root.val);                 // 1. Process Root
  preorderTraversal(root.left, result);  // 2. Recurse Left
  preorderTraversal(root.right, result); // 3. Recurse Right
  return result;
}

// 2. INORDER TRAVERSAL (Left -> Root -> Right) - O(n) Time, O(h) Space
function inorderTraversal(root, result = []) {
  if (!root) return result;
  inorderTraversal(root.left, result);   // 1. Recurse Left
  result.push(root.val);                 // 2. Process Root
  inorderTraversal(root.right, result);  // 3. Recurse Right
  return result;
}

// 3. POSTORDER TRAVERSAL (Left -> Right -> Root) - O(n) Time, O(h) Space
function postorderTraversal(root, result = []) {
  if (!root) return result;
  postorderTraversal(root.left, result);  // 1. Recurse Left
  postorderTraversal(root.right, result); // 2. Recurse Right
  result.push(root.val);                  // 3. Process Root
  return result;
}

// 4. LEVEL-ORDER TRAVERSAL (BFS Queue) - O(n) Time, O(w) Space
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root]; // FIFO Queue

  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue front
    result.push(node.val);

    if (node.left) queue.push(node.left);   // Enqueue Left child
    if (node.right) queue.push(node.right); // Enqueue Right child
  }

  return result;
}</code></pre>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Time & Auxiliary Space Complexity Breakdown</h3>
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Traversal Strategy</th>
                <th>Time Complexity</th>
                <th>Auxiliary Space</th>
                <th>Space Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Preorder (DFS)</strong></td>
                <td>O(n)</td>
                <td>O(h)</td>
                <td>Call stack frames bounded by tree height $h$ ($O(\log n)$ balanced, $O(n)$ skewed)</td>
              </tr>
              <tr>
                <td><strong>Inorder (DFS)</strong></td>
                <td>O(n)</td>
                <td>O(h)</td>
                <td>Call stack frames bounded by tree height $h$</td>
              </tr>
              <tr>
                <td><strong>Postorder (DFS)</strong></td>
                <td>O(n)</td>
                <td>O(h)</td>
                <td>Call stack frames bounded by tree height $h$</td>
              </tr>
              <tr>
                <td><strong>Level-Order (BFS)</strong></td>
                <td>O(n)</td>
                <td>O(w)</td>
                <td>Queue size bounded by maximum tree width $w$ (up to $\lceil n/2 \rceil$ at bottom level)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: BIND TRAVERSAL VISUALIZER & EDITABLE TREE
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    // Canonical default tree node map:
    // 1 -> left: 2, right: 3
    // 2 -> left: 4, right: 5
    let currentTree = {
      rootId: '1',
      nodes: {
        '1': { val: '1', left: '2', right: '3', x: 250, y: 35 },
        '2': { val: '2', left: '4', right: '5', x: 150, y: 105 },
        '3': { val: '3', left: null, right: null, x: 350, y: 105 },
        '4': { val: '4', left: null, right: null, x: 90, y: 175 },
        '5': { val: '5', left: null, right: null, x: 210, y: 175 }
      }
    };

    let selectedNodeId = '1';
    let currentAlgo = 'preorder';
    let steps = [];
    let currentStep = 0;
    let timer = null;
    let speedMs = 900;
    let showExplanation = true;

    const svgCanvas = container.querySelector('#traversal-svg-canvas');
    const outputStrip = container.querySelector('#trav-output-strip');
    const memoryStrip = container.querySelector('#trav-memory-strip');
    const memoryLabel = container.querySelector('#trav-memory-label');
    const stepCounter = container.querySelector('#trav-step-counter');
    const narration = container.querySelector('#trav-narration');
    const algoTabs = container.querySelectorAll('#traversal-algo-tabs button');

    const btnPlay = container.querySelector('#btn-trav-play');
    const btnReset = container.querySelector('#btn-trav-reset');
    const btnPrev = container.querySelector('#btn-trav-prev');
    const btnNext = container.querySelector('#btn-trav-next');
    const btnReplay = container.querySelector('#btn-trav-replay');
    const btnSpeedSlow = container.querySelector('#btn-speed-slow');
    const btnSpeedNorm = container.querySelector('#btn-speed-norm');
    const btnSpeedFast = container.querySelector('#btn-speed-fast');
    const btnToggleExp = container.querySelector('#btn-toggle-exp');

    // Editor elements
    const editorActiveNode = container.querySelector('#editor-active-node');
    const inputChildVal = container.querySelector('#input-child-val');
    const btnAddLeft = container.querySelector('#btn-add-left');
    const btnAddRight = container.querySelector('#btn-add-right');
    const btnEditVal = container.querySelector('#btn-edit-val');
    const btnDelNode = container.querySelector('#btn-del-node');
    const btnResetDefault = container.querySelector('#btn-tree-reset-default');
    const editorFeedback = container.querySelector('#editor-feedback');

    function layoutTree() {
      // Simple fixed layout based on depth
      const nodes = currentTree.nodes;
      function assignPositions(nodeId, x, y, spread) {
        if (!nodeId || !nodes[nodeId]) return;
        nodes[nodeId].x = x;
        nodes[nodeId].y = y;
        if (nodes[nodeId].left) assignPositions(nodes[nodeId].left, x - spread, y + 65, spread * 0.55);
        if (nodes[nodeId].right) assignPositions(nodes[nodeId].right, x + spread, y + 65, spread * 0.55);
      }
      assignPositions(currentTree.rootId, 250, 35, 110);
    }

    function renderTreeSvg(activeId = null, visitedIds = new Set()) {
      if (!svgCanvas) return;
      layoutTree();
      const nodes = currentTree.nodes;
      let edgesHtml = '';
      let nodesHtml = '';

      Object.keys(nodes).forEach(id => {
        const n = nodes[id];
        if (n.left && nodes[n.left]) {
          const l = nodes[n.left];
          edgesHtml += `<line x1="${n.x}" y1="${n.y}" x2="${l.x}" y2="${l.y}" class="tree-edge ${visitedIds.has(n.left) ? 'tree-edge--active' : ''}" />`;
        }
        if (n.right && nodes[n.right]) {
          const r = nodes[n.right];
          edgesHtml += `<line x1="${n.x}" y1="${n.y}" x2="${r.x}" y2="${r.y}" class="tree-edge ${visitedIds.has(n.right) ? 'tree-edge--active' : ''}" />`;
        }

        let cls = 'tree-node-group';
        if (id === activeId) cls += ' tree-node-group--active';
        else if (visitedIds.has(id)) cls += ' tree-node-group--visited';

        nodesHtml += `
          <g class="${cls}" data-node-id="${id}" transform="translate(${n.x}, ${n.y})">
            <circle cx="0" cy="0" r="20" class="tree-node-circle" />
            <text class="tree-node-text">${escapeHtml(n.val)}</text>
          </g>
        `;
      });

      svgCanvas.innerHTML = edgesHtml + nodesHtml;

      svgCanvas.querySelectorAll('.tree-node-group').forEach(g => {
        g.addEventListener('click', () => {
          const nid = g.getAttribute('data-node-id');
          selectedNodeId = nid;
          if (editorActiveNode && nodes[nid]) {
            editorActiveNode.textContent = `${nodes[nid].val} (ID: ${nid})`;
          }
          renderTreeSvg(nid, visitedIds);
        });
      });
    }

    // Build steps for selected algorithm
    function generateTraversalSteps(algo) {
      const generated = [];
      const nodes = currentTree.nodes;
      const root = currentTree.rootId;
      if (!root || !nodes[root]) return generated;

      if (algo === 'preorder') {
        const stack = [];
        const visited = [];

        function dfs(nid) {
          if (!nid || !nodes[nid]) return;
          const node = nodes[nid];
          stack.push(`preorder(${node.val})`);
          visited.push(node.val);

          generated.push({
            activeId: nid,
            visitedIds: [...visited],
            memory: [...stack],
            memoryType: 'stack',
            output: [...visited],
            desc: `Process Root Node <strong>${node.val}</strong> first. Added to preorder output. Next: recurse into left subtree.`
          });

          if (node.left) dfs(node.left);
          if (node.right) dfs(node.right);

          stack.pop();
        }
        dfs(root);
      } else if (algo === 'inorder') {
        const stack = [];
        const output = [];

        function dfs(nid) {
          if (!nid || !nodes[nid]) return;
          const node = nodes[nid];
          stack.push(`inorder(${node.val})`);

          if (node.left) dfs(node.left);

          output.push(node.val);
          generated.push({
            activeId: nid,
            visitedIds: [...output],
            memory: [...stack],
            memoryType: 'stack',
            output: [...output],
            desc: `Left subtree of node <strong>${node.val}</strong> is done. Processing Root Node <strong>${node.val}</strong>. Added to inorder output. Next: recurse into right subtree.`
          });

          if (node.right) dfs(node.right);

          stack.pop();
        }
        dfs(root);
      } else if (algo === 'postorder') {
        const stack = [];
        const output = [];

        function dfs(nid) {
          if (!nid || !nodes[nid]) return;
          const node = nodes[nid];
          stack.push(`postorder(${node.val})`);

          if (node.left) dfs(node.left);
          if (node.right) dfs(node.right);

          output.push(node.val);
          generated.push({
            activeId: nid,
            visitedIds: [...output],
            memory: [...stack],
            memoryType: 'stack',
            output: [...output],
            desc: `Both children of node <strong>${node.val}</strong> have finished. Processing Root Node <strong>${node.val}</strong> last. Added to postorder output.`
          });

          stack.pop();
        }
        dfs(root);
      } else if (algo === 'levelorder') {
        const queue = [root];
        const output = [];

        while (queue.length > 0) {
          const curId = queue.shift();
          const node = nodes[curId];
          output.push(node.val);

          const qVals = queue.map(id => nodes[id].val);

          generated.push({
            activeId: curId,
            visitedIds: [...output],
            memory: [...qVals],
            memoryType: 'queue',
            output: [...output],
            desc: `Dequeued front node <strong>${node.val}</strong> from Queue. Added to level-order sequence. Enqueued any left and right children.`
          });

          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
      }

      return generated;
    }

    function updateStepUI() {
      if (currentStep === 0 || steps.length === 0) {
        renderTreeSvg();
        if (outputStrip) outputStrip.innerHTML = `<span class="hash-empty-slot">Sequence is empty</span>`;
        if (memoryStrip) memoryStrip.innerHTML = `<span class="hash-empty-slot">${currentAlgo === 'levelorder' ? 'Queue is empty' : 'Call Stack is empty'}</span>`;
        if (stepCounter) stepCounter.textContent = `Step 0 of ${steps.length}`;
        if (narration) narration.innerHTML = `Click <strong>Play ▶</strong> or <strong>Step Forward ▶</strong> to start <strong>${currentAlgo.toUpperCase()}</strong> traversal.`;
        if (btnPrev) btnPrev.disabled = true;
        if (btnNext) btnNext.disabled = false;
        return;
      }

      const s = steps[currentStep - 1];
      const visitedSet = new Set(s.output);
      renderTreeSvg(s.activeId, visitedSet);

      if (btnPrev) btnPrev.disabled = currentStep <= 1;
      if (btnNext) btnNext.disabled = currentStep >= steps.length;
      if (stepCounter) stepCounter.textContent = `Step ${currentStep} of ${steps.length}`;

      if (memoryLabel) {
        memoryLabel.textContent = s.memoryType === 'queue' ? 'BFS Queue Contents (FIFO Head &rarr; Tail):' : 'Recursive Call Stack Frames:';
      }

      if (memoryStrip) {
        if (s.memory.length === 0) {
          memoryStrip.innerHTML = `<span class="hash-empty-slot">Empty</span>`;
        } else if (s.memoryType === 'queue') {
          memoryStrip.innerHTML = s.memory.map(v => `<span class="tree-queue-item">[${v}]</span>`).join(' &rarr; ');
        } else {
          memoryStrip.innerHTML = s.memory.map(frame => `<span class="tree-stack-frame">${frame}</span>`).join(' &rarr; ');
        }
      }

      if (outputStrip) {
        outputStrip.innerHTML = s.output.map((v, i) => `
          <div class="hash-chip-item">
            <div class="hash-chip-val ${i === s.output.length - 1 ? 'hash-chip-val--active' : 'hash-chip-val--visited'}">${v}</div>
            <div class="hash-chip-idx">[${i}]</div>
          </div>
        `).join('');
      }

      if (narration) {
        narration.style.display = showExplanation ? 'block' : 'none';
        narration.innerHTML = s.desc;
        if (currentStep >= steps.length) {
          narration.innerHTML += `<br/><span style="color:#10B981; font-weight:700;">✓ Traversal complete! Output: [${s.output.join(', ')}]</span>`;
        }
      }
    }

    function setAlgorithm(algoKey) {
      if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
      currentAlgo = algoKey;
      algoTabs.forEach(t => {
        t.className = t.getAttribute('data-algo') === algoKey ? 'hash-ctrl-btn hash-ctrl-btn--primary' : 'hash-ctrl-btn';
      });
      steps = generateTraversalSteps(currentAlgo);
      currentStep = 0;
      updateStepUI();
    }

    algoTabs.forEach(t => {
      t.addEventListener('click', () => setAlgorithm(t.getAttribute('data-algo')));
    });

    if (btnNext) btnNext.addEventListener('click', () => {
      if (currentStep < steps.length) { currentStep++; updateStepUI(); }
    });

    if (btnPrev) btnPrev.addEventListener('click', () => {
      if (currentStep > 0) { currentStep--; updateStepUI(); }
    });

    if (btnReset) btnReset.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
      currentStep = 0;
      updateStepUI();
    });

    if (btnReplay) btnReplay.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = null; }
      currentStep = 0;
      updateStepUI();
      if (btnPlay) btnPlay.click();
    });

    if (btnPlay) btnPlay.addEventListener('click', () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        btnPlay.textContent = '▶ Play';
      } else {
        if (currentStep >= steps.length) currentStep = 0;
        btnPlay.textContent = '⏸ Pause';
        timer = setInterval(() => {
          if (currentStep < steps.length) {
            currentStep++;
            updateStepUI();
          } else {
            clearInterval(timer);
            timer = null;
            btnPlay.textContent = '▶ Play';
          }
        }, speedMs);
      }
    });

    if (btnSpeedSlow) btnSpeedSlow.addEventListener('click', () => {
      speedMs = 1500;
      btnSpeedSlow.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
      btnSpeedNorm.className = 'hash-ctrl-btn';
      btnSpeedFast.className = 'hash-ctrl-btn';
    });
    if (btnSpeedNorm) btnSpeedNorm.addEventListener('click', () => {
      speedMs = 900;
      btnSpeedNorm.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
      btnSpeedSlow.className = 'hash-ctrl-btn';
      btnSpeedFast.className = 'hash-ctrl-btn';
    });
    if (btnSpeedFast) btnSpeedFast.addEventListener('click', () => {
      speedMs = 400;
      btnSpeedFast.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
      btnSpeedSlow.className = 'hash-ctrl-btn';
      btnSpeedNorm.className = 'hash-ctrl-btn';
    });

    if (btnToggleExp) btnToggleExp.addEventListener('click', () => {
      showExplanation = !showExplanation;
      btnToggleExp.textContent = showExplanation ? 'Hide Explanation' : 'Show Explanation';
      if (narration) narration.style.display = showExplanation ? 'block' : 'none';
    });

    // ── TREE EDITOR ACTIONS ──
    function showFeedback(msg, isErr = false) {
      if (!editorFeedback) return;
      editorFeedback.style.color = isErr ? '#EF4444' : '#10B981';
      editorFeedback.textContent = msg;
      setTimeout(() => { if (editorFeedback) editorFeedback.textContent = ''; }, 3500);
    }

    if (btnAddLeft) btnAddLeft.addEventListener('click', () => {
      const parent = currentTree.nodes[selectedNodeId];
      const val = inputChildVal ? inputChildVal.value.trim() : '';
      if (!parent || !val) { showFeedback('Please select a valid parent node and enter a value.', true); return; }
      if (parent.left) { showFeedback(`Node ${parent.val} already has a left child (${currentTree.nodes[parent.left].val})!`, true); return; }

      const newId = 'n_' + Date.now();
      currentTree.nodes[newId] = { val, left: null, right: null, x: 0, y: 0 };
      parent.left = newId;
      showFeedback(`Added Left child "${val}" to Node ${parent.val}.`);
      setAlgorithm(currentAlgo);
    });

    if (btnAddRight) btnAddRight.addEventListener('click', () => {
      const parent = currentTree.nodes[selectedNodeId];
      const val = inputChildVal ? inputChildVal.value.trim() : '';
      if (!parent || !val) { showFeedback('Please select a valid parent node and enter a value.', true); return; }
      if (parent.right) { showFeedback(`Node ${parent.val} already has a right child (${currentTree.nodes[parent.right].val})!`, true); return; }

      const newId = 'n_' + Date.now();
      currentTree.nodes[newId] = { val, left: null, right: null, x: 0, y: 0 };
      parent.right = newId;
      showFeedback(`Added Right child "${val}" to Node ${parent.val}.`);
      setAlgorithm(currentAlgo);
    });

    if (btnEditVal) btnEditVal.addEventListener('click', () => {
      const node = currentTree.nodes[selectedNodeId];
      const val = inputChildVal ? inputChildVal.value.trim() : '';
      if (!node || !val) { showFeedback('Enter a valid value.', true); return; }
      node.val = val;
      if (editorActiveNode) editorActiveNode.textContent = `${node.val} (ID: ${selectedNodeId})`;
      showFeedback(`Updated node value to "${val}".`);
      setAlgorithm(currentAlgo);
    });

    if (btnDelNode) btnDelNode.addEventListener('click', () => {
      if (selectedNodeId === currentTree.rootId) {
        showFeedback('Cannot delete the root node directly. Reset tree instead.', true);
        return;
      }
      // Remove pointer from parent
      Object.keys(currentTree.nodes).forEach(id => {
        const p = currentTree.nodes[id];
        if (p.left === selectedNodeId) p.left = null;
        if (p.right === selectedNodeId) p.right = null;
      });
      delete currentTree.nodes[selectedNodeId];
      selectedNodeId = currentTree.rootId;
      if (editorActiveNode) editorActiveNode.textContent = `${currentTree.nodes[selectedNodeId].val} (Root)`;
      showFeedback('Node removed.');
      setAlgorithm(currentAlgo);
    });

    if (btnResetDefault) btnResetDefault.addEventListener('click', () => {
      currentTree = {
        rootId: '1',
        nodes: {
          '1': { val: '1', left: '2', right: '3', x: 250, y: 35 },
          '2': { val: '2', left: '4', right: '5', x: 150, y: 105 },
          '3': { val: '3', left: null, right: null, x: 350, y: 105 },
          '4': { val: '4', left: null, right: null, x: 90, y: 175 },
          '5': { val: '5', left: null, right: null, x: 210, y: 175 }
        }
      };
      selectedNodeId = '1';
      if (editorActiveNode) editorActiveNode.textContent = '1 (Root)';
      showFeedback('Tree reset to default [1, 2, 3, 4, 5].');
      setAlgorithm(currentAlgo);
    });

    // Initial setup
    setAlgorithm('preorder');
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "tr-q1",
      difficulty: "Easy",
      question: "What is the visit order for Inorder Traversal?",
      options: [
        "A. Root, Left, Right",
        "B. Left, Root, Right",
        "C. Left, Right, Root",
        "D. Level by level"
      ],
      answer: "B",
      explanation: "Inorder traversal visits the Left child first, then the Root node, then the Right child (L-N-R)."
    },
    {
      id: "tr-q2",
      difficulty: "Easy",
      question: "For the canonical tree [1, 2, 3, 4, 5], what is the Preorder output?",
      options: [
        "A. [1, 2, 4, 5, 3]",
        "B. [4, 2, 5, 1, 3]",
        "C. [4, 5, 2, 3, 1]",
        "D. [1, 2, 3, 4, 5]"
      ],
      answer: "A",
      explanation: "Preorder visits Root (1) &rarr; Left subtree (2, 4, 5) &rarr; Right subtree (3), producing [1, 2, 4, 5, 3]."
    },
    {
      id: "tr-q3",
      difficulty: "Medium",
      question: "Which data structure is required to implement Level-Order (BFS) Traversal iteratively?",
      options: [
        "A. LIFO Stack",
        "B. FIFO Queue",
        "C. Priority Queue",
        "D. Hash Map"
      ],
      answer: "B",
      explanation: "Level-Order traversal uses a FIFO Queue to ensure all nodes at level d are visited before any nodes at level d + 1."
    },
    {
      id: "tr-q4",
      difficulty: "Medium",
      question: "What does Inorder Traversal yield when executed on a valid Binary Search Tree (BST)?",
      options: [
        "A. Reverse sorted order",
        "B. Strictly non-decreasing sorted order",
        "C. Random unordered elements",
        "D. All leaf nodes first"
      ],
      answer: "B",
      explanation: "Because BST satisfies Left &lt; Root &lt; Right, Inorder (L-N-R) traversal naturally visits elements in ascending sorted order."
    },
    {
      id: "tr-q5",
      difficulty: "Hard",
      question: "What is the auxiliary space complexity of Level-Order Traversal on a binary tree with n nodes?",
      options: [
        "A. O(1)",
        "B. O(w) where w is the maximum width of the tree (up to n/2 nodes)",
        "C. O(log n) always",
        "D. O(n²)"
      ],
      answer: "B",
      explanation: "At the deepest level of a full or complete tree, the queue holds all leaf nodes simultaneously, which is approximately n/2 nodes."
    },
    {
      id: "tr-q6",
      difficulty: "Interview",
      question: "Why is Postorder Traversal uniquely suited for deleting an entire binary tree in memory (C/C++)?",
      options: [
        "A. It deletes parent nodes before their children",
        "B. It frees both child subtrees completely before freeing the parent node, preventing dangling pointers",
        "C. It is the fastest traversal",
        "D. Postorder traversal uses no call stack"
      ],
      answer: "B",
      explanation: "In Postorder (L-R-N), children are freed first. Deleting the root first would orphan children in unmanaged languages, causing memory leaks."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the time complexity of all 4 tree traversals on n nodes?",
      options: ["A. O(n)", "B. O(log n)", "C. O(n log n)", "D. O(1)"],
      answer: "A",
      explanation: "Each traversal visits every one of the n nodes exactly once, resulting in linear O(n) time."
    },
    {
      question: "Q2. In DFS tree traversals, what manages the backtracking when returning from a leaf?",
      options: ["A. A global array", "B. The function Call Stack", "C. The browser garbage collector", "D. An event listener"],
      answer: "B",
      explanation: "The runtime call stack pushes execution frames for subtrees and pops them on return, handling backtracking automatically."
    }
  ],

  predictOutput: [
    {
      code: "function trav(node) {\n  if (!node) return;\n  console.log(node.val);\n  trav(node.left);\n  trav(node.right);\n}\n// Root = 1, left = 2, right = 3",
      options: ["1, 2, 3", "2, 1, 3", "2, 3, 1", "3, 2, 1"],
      answer: "1, 2, 3",
      explanation: "The root value 1 is logged first, then left child 2, then right child 3 (Preorder order)."
    },
    {
      code: "function trav(node) {\n  if (!node) return;\n  trav(node.left);\n  trav(node.right);\n  console.log(node.val);\n}\n// Root = 1, left = 2, right = 3",
      options: ["2, 3, 1", "1, 2, 3", "2, 1, 3", "3, 2, 1"],
      answer: "2, 3, 1",
      explanation: "Both children (2 and 3) are recursed first, followed by logging root 1 last (Postorder order)."
    }
  ],

  practice: [
    {
      q: "How can you reconstruct a unique binary tree from traversal arrays?",
      a: "You need either (Preorder + Inorder) OR (Postorder + Inorder). The Preorder/Postorder identifies the Root, and Inorder splits nodes into Left and Right subtrees."
    },
    {
      q: "What is the difference between recursive DFS and iterative BFS?",
      a: "Recursive DFS dives deep along one branch using the Call Stack before backtracking. Iterative BFS visits all nodes level by level using a FIFO Queue."
    },
    {
      q: "When would you prefer BFS Level-Order over DFS in an interview?",
      a: "When searching for the shortest path in an unweighted tree/graph, finding nodes at a specific depth, or printing a tree level-by-level."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    problems: [
      {
        num: 94,
        slug: "binary-tree-inorder-traversal",
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        whyThisOrder: "The foundational DFS traversal; returns sorted numbers on BSTs."
      },
      {
        num: 144,
        slug: "binary-tree-preorder-traversal",
        title: "Binary Tree Preorder Traversal",
        difficulty: "Easy",
        whyThisOrder: "Practice processing root before exploring left and right subtrees."
      },
      {
        num: 145,
        slug: "binary-tree-postorder-traversal",
        title: "Binary Tree Postorder Traversal",
        difficulty: "Easy",
        whyThisOrder: "Practice bottom-up tree processing."
      },
      {
        num: 102,
        slug: "binary-tree-level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        whyThisOrder: "The classic BFS Queue problem grouping node values into level subarrays."
      }
    ]
  }
};


/* ==========================================================================
   MODULE 4: BINARY TREE OPERATIONS & INTERVIEW PROBLEMS (Topic 30)
   ========================================================================== */
window.LESSONS_CONTENT["binary-tree-operations"] = {
  id: "binary-tree-operations",
  title: "Binary Tree Operations & Interview Problems",
  levelTitle: "Level 5 — Trees",
  summary: "Master the complete structured library of 24 binary tree operations and interview problems: height, diameter, leaf counting, BST validation, LCA, views, and tree construction.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: THE UNIVERSAL RECURSIVE PATTERN
       ------------------------------------------------------------------------ */
    {
      id: "section-recursive-framework",
      title: "1. The Universal Tree Recursion Framework",
      tocTitle: "1. Recursion Framework",
      contentHtml: `
        <p>Nearly 90% of all binary tree interview problems follow the exact same 4-step Divide and Conquer recursion blueprint:</p>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:12px; padding:18px; margin:16px 0;">
          <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px; font-size:1rem;">The 4-Step Template:</div>
          <ol style="margin:0; padding-left:20px; color:var(--text-primary); line-height:1.7;">
            <li><strong>Base Case:</strong> What should be returned if <code>root === null</code>? (Usually <code>0</code>, <code>null</code>, or <code>true</code>).</li>
            <li><strong>Left Subtree Call:</strong> Recursively solve for <code>root.left</code>.</li>
            <li><strong>Right Subtree Call:</strong> Recursively solve for <code>root.right</code>.</li>
            <li><strong>Combine at Root:</strong> Compute the answer for the current root node using the results from left and right subtrees.</li>
          </ol>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: THE 24-PROBLEM STRUCTURED LIBRARY
       ------------------------------------------------------------------------ */
    {
      id: "section-problem-library",
      title: "2. The 24 Binary Tree Problems Library",
      tocTitle: "2. 24-Problem Library",
      contentHtml: `
        <p>Explore all 24 curated problems categorized from foundational beginner basics to high-frequency technical interview questions. Click any problem card to expand its complete JavaScript code, visual diagram, line-by-line dry run, and complexity analysis.</p>

        <!-- Problem Filter Bar -->
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;" id="prob-filter-bar">
          <button class="hash-ctrl-btn hash-ctrl-btn--primary" data-tier="all">All Problems (24)</button>
          <button class="hash-ctrl-btn" data-tier="beginner">Beginner (1–6)</button>
          <button class="hash-ctrl-btn" data-tier="intermediate">Intermediate (7–16)</button>
          <button class="hash-ctrl-btn" data-tier="interview">Interview Top Picks (17–24)</button>
          <input type="text" id="prob-search-input" class="hash-input-field" placeholder="Search by title or concept..." style="max-width:220px; margin-left:auto;" />
        </div>

        <!-- Problems Container -->
        <div class="tree-problems-container" id="problems-list-container">
          <!-- Rendered in onMount -->
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: BST SPECIFICS: LCA, VALIDATION & BOUNDS
       ------------------------------------------------------------------------ */
    {
      id: "section-bst-prerequisites",
      title: "3. Binary Search Tree (BST) Optimization Rules",
      tocTitle: "3. BST Prerequisites",
      contentHtml: `
        <p>Problems 17, 18, and 19 leverage the <strong>Binary Search Tree</strong> property. Unlike arbitrary binary trees where you must check both subtrees, BST ordering allows you to discard half the tree at each step:</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#10B981; font-size:0.92rem; margin-bottom:4px;">BST LCA (Problem 18)</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">
              If both targets <code>p</code> and <code>q</code> are smaller than root, LCA is in left subtree. If both are larger, LCA is in right subtree. If they split on opposite sides, <strong>current root is the LCA!</strong>
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#6366F1; font-size:0.92rem; margin-bottom:4px;">BST Validation (Problem 17)</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">
              Checking only immediate children (<code>node.left.val &lt; node.val</code>) is a trap! Every node in the left subtree must be smaller than the root. Pass down valid range boundaries: <code>validate(node, min, max)</code>.
            </p>
          </div>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: RENDER AND FILTER ALL 24 PROBLEMS
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    // Complete 24 Problem Definitions
    const ALL_PROBLEMS = [
      // ── BEGINNER (1-6) ──
      {
        num: 1,
        title: "Create a Binary Tree",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Define a TreeNode class and instantiate a 3-node binary tree with root 10, left child 5, and right child 15.",
        example: "Input: root = 10, left = 5, right = 15\nOutput: TreeNode { val: 10, left: TreeNode(5), right: TreeNode(15) }",
        intuition: "Construct nodes using new TreeNode(val) and link them by assigning pointers to root.left and root.right.",
        code: `class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nfunction createSimpleTree() {\n  const root = new TreeNode(10);\n  root.left = new TreeNode(5);\n  root.right = new TreeNode(15);\n  return root;\n}`,
        dryrun: "Step 1: Instantiate node 10. Step 2: Instantiate node 5, assign to root.left. Step 3: Instantiate node 15, assign to root.right.",
        complexity: "Time: O(1) | Auxiliary Space: O(1)",
        edgeCases: "Empty tree is represented simply by null.",
        lcUrl: null
      },
      {
        num: 2,
        title: "Count Total Nodes in a Binary Tree",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Given the root of a binary tree, return the total count of nodes.",
        example: "Tree: 1 -> (2, 3) -> Output: 3",
        intuition: "If root is null, return 0. Otherwise, return 1 (for current root) + countNodes(left) + countNodes(right).",
        code: `function countTotalNodes(root) {\n  if (!root) return 0;\n  return 1 + countTotalNodes(root.left) + countTotalNodes(root.right);\n}`,
        dryrun: "At root 1: return 1 + count(2) + count(3). count(2) returns 1; count(3) returns 1. Total = 1 + 1 + 1 = 3.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "root === null returns 0.",
        lcUrl: "https://leetcode.com/problems/count-complete-tree-nodes/"
      },
      {
        num: 3,
        title: "Count Leaf Nodes",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Count how many nodes in the binary tree have zero children.",
        example: "Tree: 1 -> (2, 3). Nodes 2 and 3 have no children. Output: 2",
        intuition: "If node has no left and no right child, it is a leaf (return 1). Otherwise, sum leaf counts of left and right subtrees.",
        code: `function countLeafNodes(root) {\n  if (!root) return 0;\n  if (!root.left && !root.right) return 1;\n  return countLeafNodes(root.left) + countLeafNodes(root.right);\n}`,
        dryrun: "Root 1 has children 2 and 3. Left call on 2 returns 1. Right call on 3 returns 1. Sum = 2.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Single node tree returns 1.",
        lcUrl: null
      },
      {
        num: 4,
        title: "Calculate Tree Height (Max Depth)",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Find the maximum height/depth of the binary tree (number of nodes along longest path from root to leaf).",
        example: "Tree: 3 -> (9, 20 -> (15, 7)). Longest path has 3 nodes. Output: 3",
        intuition: "Divide and conquer: max depth is 1 + maximum of depth of left subtree and depth of right subtree.",
        code: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
        dryrun: "Left branch height is 1. Right branch height is 2. Result = 1 + max(1, 2) = 3.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Empty tree returns 0.",
        lcUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        num: 5,
        title: "Search for a Value in an Arbitrary Binary Tree",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Given the root of a regular binary tree and a target value, return true if target exists in the tree, false otherwise.",
        example: "Tree: 1 -> (2, 3), target = 3 -> Output: true",
        intuition: "Since this is NOT a BST, we must inspect the current node, then search left subtree OR right subtree.",
        code: `function searchTree(root, target) {\n  if (!root) return false;\n  if (root.val === target) return true;\n  return searchTree(root.left, target) || searchTree(root.right, target);\n}`,
        dryrun: "Check root (1 !== 3). Recurse left (2 !== 3, leaves return false). Recurse right (3 === 3 -> true). Returns true.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Target not in tree returns false.",
        lcUrl: null
      },
      {
        num: 6,
        title: "Print Traversal Sequences",
        tier: "beginner",
        difficulty: "Easy",
        statement: "Return an object containing the Preorder, Inorder, and Postorder traversal arrays for a tree.",
        example: "Tree: 1 -> (2, 3) -> { pre: [1,2,3], in: [2,1,3], post: [2,3,1] }",
        intuition: "Run the three classic recursive traversals and return their collected outputs.",
        code: `function allTraversals(root) {\n  const pre = [], ino = [], post = [];\n  function dfs(node) {\n    if (!node) return;\n    pre.push(node.val);\n    dfs(node.left);\n    ino.push(node.val);\n    dfs(node.right);\n    post.push(node.val);\n  }\n  dfs(root);\n  return { preorder: pre, inorder: ino, postorder: post };\n}`,
        dryrun: "Single DFS traversal pushes to pre before children, ino between children, and post after children.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Empty tree returns empty arrays.",
        lcUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
      },

      // ── INTERMEDIATE (7-16) ──
      {
        num: 7,
        title: "Find Maximum Value in Binary Tree",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Find the maximum numeric value among all nodes in an unsorted binary tree.",
        example: "Tree: 1 -> (99, 4) -> Output: 99",
        intuition: "Compare root.val with the max value of left subtree and right subtree.",
        code: `function findMax(root) {\n  if (!root) return -Infinity;\n  return Math.max(root.val, findMax(root.left), findMax(root.right));\n}`,
        dryrun: "Root 1 compares with max of left (99) and right (4). Math.max(1, 99, 4) = 99.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Handles negative numbers using -Infinity base case.",
        lcUrl: null
      },
      {
        num: 8,
        title: "Find Minimum Value in Binary Tree",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Find the smallest numeric value in an unsorted binary tree.",
        example: "Tree: 10 -> (2, 18) -> Output: 2",
        intuition: "Return Math.min(root.val, findMin(left), findMin(right)) with base case Infinity.",
        code: `function findMin(root) {\n  if (!root) return Infinity;\n  return Math.min(root.val, findMin(root.left), findMin(root.right));\n}`,
        dryrun: "Root 10 compares with min of left (2) and right (18). Math.min(10, 2, 18) = 2.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Empty tree returns Infinity.",
        lcUrl: null
      },
      {
        num: 9,
        title: "Count Nodes with Exactly One Child",
        tier: "intermediate",
        difficulty: "Medium",
        statement: "Count how many internal nodes in the tree have exactly one child (either left OR right, but not both).",
        example: "Tree: 1 -> left: 2 (no right child). Node 1 has 1 child. Output: 1",
        intuition: "Evaluate Boolean: (left && !right) || (!left && right). If true, add 1 + recurse.",
        code: `function countOneChildNodes(root) {\n  if (!root) return 0;\n  const hasOne = (root.left && !root.right) || (!root.left && root.right);\n  return (hasOne ? 1 : 0) + countOneChildNodes(root.left) + countOneChildNodes(root.right);\n}`,
        dryrun: "Check each node: if XOR of left and right child exists, increment count.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Full binary tree returns 0.",
        lcUrl: null
      },
      {
        num: 10,
        title: "Count Nodes with Two Children",
        tier: "intermediate",
        difficulty: "Medium",
        statement: "Count how many nodes in the tree have both a left child and a right child.",
        example: "Tree: 1 -> (2, 3) -> Node 1 has both children. Output: 1",
        intuition: "If root.left && root.right, add 1 + recursive calls on both sides.",
        code: `function countTwoChildNodes(root) {\n  if (!root) return 0;\n  const hasTwo = root.left && root.right ? 1 : 0;\n  return hasTwo + countTwoChildNodes(root.left) + countTwoChildNodes(root.right);\n}`,
        dryrun: "Only nodes where both left !== null and right !== null contribute to the count.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Skewed tree returns 0.",
        lcUrl: null
      },
      {
        num: 11,
        title: "Invert Binary Tree (LeetCode 226)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Given the root of a binary tree, invert the tree (swap left and right child at every node), and return its root.",
        example: "Input: [4, 2, 7, 1, 3, 6, 9]\nOutput: [4, 7, 2, 9, 6, 3, 1]",
        intuition: "Recursively swap root.left and root.right. Then call invertTree on both children.",
        code: `function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}`,
        dryrun: "At node 4: swap left (2) and right (7). Recurse into both and swap their children.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Empty tree returns null; leaf returns itself.",
        lcUrl: "https://leetcode.com/problems/invert-binary-tree/"
      },
      {
        num: 12,
        title: "Check Whether Two Trees Are Identical (LeetCode 100)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Given the roots of two binary trees p and q, check if they are structurally identical and have the exact same values.",
        example: "p = [1, 2, 3], q = [1, 2, 3] -> Output: true",
        intuition: "If both are null, true. If only one is null, false. If p.val !== q.val, false. Recurse left and right.",
        code: `function isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q) return false;\n  if (p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}`,
        dryrun: "Compares current nodes values, then checks left with left, and right with right.",
        complexity: "Time: O(min(N, M)) | Auxiliary Space: O(min(h1, h2))",
        edgeCases: "One tree is null and other is not returns false.",
        lcUrl: "https://leetcode.com/problems/same-tree/"
      },
      {
        num: 13,
        title: "Check Whether a Tree Is Balanced (LeetCode 110)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Determine if a binary tree is height-balanced (height of two subtrees of every node never differs by more than 1).",
        example: "Input: [3, 9, 20, null, null, 15, 7] -> Output: true",
        intuition: "Bottom-up DFS: compute subtree heights. If any subtree is unbalanced, return -1 up the chain to terminate early.",
        code: `function isBalanced(root) {\n  function checkHeight(node) {\n    if (!node) return 0;\n    const leftH = checkHeight(node.left);\n    if (leftH === -1) return -1;\n    const rightH = checkHeight(node.right);\n    if (rightH === -1) return -1;\n\n    if (Math.abs(leftH - rightH) > 1) return -1;\n    return 1 + Math.max(leftH, rightH);\n  }\n  return checkHeight(root) !== -1;\n}`,
        dryrun: "Bottom-up traversal checks leaf heights first. If diff > 1, returns -1 instantly without redundant checks.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Empty tree is balanced.",
        lcUrl: "https://leetcode.com/problems/balanced-binary-tree/"
      },
      {
        num: 14,
        title: "Calculate Diameter of Binary Tree (LeetCode 543)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "The diameter is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
        example: "Input: [1, 2, 3, 4, 5] -> Longest path between 4 and 3 is 3 edges. Output: 3",
        intuition: "At each node, the longest path passing through it is leftHeight + rightHeight. Track a global max diameter.",
        code: `function diameterOfBinaryTree(root) {\n  let maxDiameter = 0;\n  function height(node) {\n    if (!node) return 0;\n    const leftH = height(node.left);\n    const rightH = height(node.right);\n    maxDiameter = Math.max(maxDiameter, leftH + rightH);\n    return 1 + Math.max(leftH, rightH);\n  }\n  height(root);\n  return maxDiameter;\n}`,
        dryrun: "At node 2: leftH=1 (node 4), rightH=1 (node 5). Diameter through node 2 is 2. At node 1: leftH=2, rightH=1. Max = 3.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Single node has diameter 0.",
        lcUrl: "https://leetcode.com/problems/diameter-of-binary-tree/"
      },
      {
        num: 15,
        title: "Find Maximum Depth of Binary Tree (LeetCode 104)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Return the maximum depth (number of nodes from root down to farthest leaf).",
        example: "Input: [1, null, 2] -> Output: 2",
        intuition: "Classic DFS recursion: 1 + Math.max(maxDepth(left), maxDepth(right)).",
        code: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
        dryrun: "Base case returns 0 for null. Each parent adds 1 to the deeper child.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Skewed tree runs in O(n) space.",
        lcUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        num: 16,
        title: "Find Minimum Depth of Binary Tree (LeetCode 111)",
        tier: "intermediate",
        difficulty: "Easy",
        statement: "Return the minimum depth: the number of nodes along the shortest path from the root down to the nearest leaf node.",
        example: "Tree: 1 -> right: 2 -> Output: 2 (node 1 is NOT a leaf because it has a right child!)",
        intuition: "Be careful! If a node has only one child, you MUST traverse down that child. You cannot treat null as depth 0!",
        code: `function minDepth(root) {\n  if (!root) return 0;\n  if (!root.left) return 1 + minDepth(root.right);\n  if (!root.right) return 1 + minDepth(root.left);\n  return 1 + Math.min(minDepth(root.left), minDepth(root.right));\n}`,
        dryrun: "If one child is missing, we must follow the existing child because a leaf requires left === null && right === null.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Skewed tree traverses all the way to the single leaf.",
        lcUrl: "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
      },

      // ── INTERVIEW PROBLEMS (17-24) ──
      {
        num: 17,
        title: "Validate Binary Search Tree (LeetCode 98)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Given the root of a binary tree, determine if it is a valid Binary Search Tree (BST). All left descendants must be strictly smaller than root, and all right descendants strictly greater.",
        example: "Input: [2, 1, 3] -> Output: true\nInput: [5, 1, 4, null, null, 3, 6] -> Output: false (3 is in right subtree of 5)",
        intuition: "Pass down allowed boundaries (-Infinity to +Infinity). Left child must stay < parent; right child must stay > parent.",
        code: `function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}`,
        dryrun: "When moving left, update max = root.val. When moving right, update min = root.val.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Duplicate values are illegal in a strict BST.",
        lcUrl: "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      {
        num: 18,
        title: "Lowest Common Ancestor of a BST (LeetCode 235)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Find the lowest common ancestor (LCA) node of two given nodes p and q in a Binary Search Tree.",
        example: "BST root = 6, p = 2, q = 8 -> Output: 6 (split point)",
        intuition: "If both p and q are smaller than root, branch left. If both are greater, branch right. The split point is the LCA!",
        code: `function lowestCommonAncestorBST(root, p, q) {\n  while (root) {\n    if (p.val < root.val && q.val < root.val) {\n      root = root.left;\n    } else if (p.val > root.val && q.val > root.val) {\n      root = root.right;\n    } else {\n      return root; // Split point or match found!\n    }\n  }\n  return null;\n}`,
        dryrun: "Starting at 6: p=2 (< 6), q=8 (> 6). Values split on opposite sides, so root 6 is the LCA.",
        complexity: "Time: O(h) = O(log n) balanced | Auxiliary Space: O(1) iterative",
        edgeCases: "One node is the ancestor of the other.",
        lcUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
      },
      {
        num: 19,
        title: "Kth Smallest Element in a BST (LeetCode 230)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Given the root of a BST and an integer k, return the kth smallest value (1-indexed) in the tree.",
        example: "Input: root = [3, 1, 4, null, 2], k = 1 -> Output: 1",
        intuition: "Inorder traversal visits a BST in strictly sorted ascending order. Count visited nodes until reaching k.",
        code: `function kthSmallest(root, k) {\n  let count = 0, result = null;\n  function inorder(node) {\n    if (!node || result !== null) return;\n    inorder(node.left);\n    count++;\n    if (count === k) {\n      result = node.val;\n      return;\n    }\n    inorder(node.right);\n  }\n  inorder(root);\n  return result;\n}`,
        dryrun: "Inorder traverses: 1 (count=1 -> match!), returns 1 immediately.",
        complexity: "Time: O(k + h) | Auxiliary Space: O(h)",
        edgeCases: "k = 1 returns the minimum element (leftmost leaf).",
        lcUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
      },
      {
        num: 20,
        title: "Binary Tree Level Order Traversal (LeetCode 102)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Return the level order traversal of nodes values as an array of level subarrays.",
        example: "Input: [3, 9, 20, null, null, 15, 7] -> Output: [[3], [9, 20], [15, 7]]",
        intuition: "Use BFS with a Queue. In each iteration, process queue.length items to group by level.",
        code: `function levelOrder(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(currentLevel);\n  }\n  return result;\n}`,
        dryrun: "Snapshot queue.length at start of each outer loop to isolate each depth level cleanly.",
        complexity: "Time: O(n) | Auxiliary Space: O(w)",
        edgeCases: "Empty tree returns [].",
        lcUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      {
        num: 21,
        title: "Binary Tree Zigzag Level Order Traversal (LeetCode 103)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Return the zigzag level order traversal: left-to-right on first level, right-to-left on next level, alternating.",
        example: "Input: [3, 9, 20, null, null, 15, 7] -> Output: [[3], [20, 9], [15, 7]]",
        intuition: "Run BFS level-by-level with a boolean isReverse. If isReverse, unshift values into the level array instead of push.",
        code: `function zigzagLevelOrder(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  let leftToRight = true;\n  while (queue.length > 0) {\n    const size = queue.length;\n    const level = [];\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      if (leftToRight) level.push(node.val);\n      else level.unshift(node.val); // reverse insertion\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n    leftToRight = !leftToRight;\n  }\n  return result;\n}`,
        dryrun: "Level 0: [3] (left to right). Level 1: [20, 9] (reversed). Level 2: [15, 7] (normal).",
        complexity: "Time: O(n) | Auxiliary Space: O(w)",
        edgeCases: "Single node returns [[val]].",
        lcUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
      },
      {
        num: 22,
        title: "Binary Tree Right Side View (LeetCode 199)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Imagine yourself standing on the right side of the tree. Return the values of the nodes you can see ordered from top to bottom.",
        example: "Input: [1, 2, 3, null, 5, null, 4] -> Output: [1, 3, 4]",
        intuition: "DFS with depth parameter. Visit Root &rarr; Right &rarr; Left. The first node visited at each depth level is visible from the right!",
        code: `function rightSideView(root) {\n  const result = [];\n  function dfs(node, depth) {\n    if (!node) return;\n    if (depth === result.length) {\n      result.push(node.val); // First node encountered at this depth level\n    }\n    dfs(node.right, depth + 1); // Explore right first!\n    dfs(node.left, depth + 1);\n  }\n  dfs(root, 0);\n  return result;\n}`,
        dryrun: "At depth 0: visit 1 (result=[1]). Depth 1: visit 3 (result=[1, 3]). Depth 2: visit 4 (result=[1, 3, 4]).",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Left subtree longer than right subtree correctly shows left leaves once right runs out.",
        lcUrl: "https://leetcode.com/problems/binary-tree-right-side-view/"
      },
      {
        num: 23,
        title: "Symmetric Tree (LeetCode 101)",
        tier: "interview",
        difficulty: "Easy",
        statement: "Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).",
        example: "Input: [1, 2, 2, 3, 4, 4, 3] -> Output: true",
        intuition: "A tree is symmetric if left and right subtrees are mirrors: left.val === right.val, left.left mirrors right.right, and left.right mirrors right.left.",
        code: `function isSymmetric(root) {\n  if (!root) return true;\n  function isMirror(t1, t2) {\n    if (!t1 && !t2) return true;\n    if (!t1 || !t2) return false;\n    return (t1.val === t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n  }\n  return isMirror(root.left, root.right);\n}`,
        dryrun: "Checks t1.left against t2.right and t1.right against t2.left.",
        complexity: "Time: O(n) | Auxiliary Space: O(h)",
        edgeCases: "Single node tree is symmetric.",
        lcUrl: "https://leetcode.com/problems/symmetric-tree/"
      },
      {
        num: 24,
        title: "Construct Tree from Preorder and Inorder (LeetCode 105)",
        tier: "interview",
        difficulty: "Medium",
        statement: "Given two integer arrays preorder and inorder, construct and return the unique binary tree.",
        example: "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7] -> Output: [3, 9, 20, null, null, 15, 7]",
        intuition: "preorder[0] is always the root. Locate that root in inorder array to determine how many nodes are in the left subtree vs right subtree.",
        code: `function buildTree(preorder, inorder) {\n  const inorderMap = new Map();\n  inorder.forEach((val, idx) => inorderMap.set(val, idx));\n  let preIdx = 0;\n\n  function helper(left, right) {\n    if (left > right) return null;\n    const rootVal = preorder[preIdx++];\n    const root = new TreeNode(rootVal);\n    const mid = inorderMap.get(rootVal);\n\n    root.left = helper(left, mid - 1);\n    root.right = helper(mid + 1, right);\n    return root;\n  }\n  return helper(0, inorder.length - 1);\n}`,
        dryrun: "preorder index advances sequentially. Inorder hash map provides O(1) partition split points.",
        complexity: "Time: O(n) with Hash Map | Auxiliary Space: O(n)",
        edgeCases: "Single element array returns single TreeNode.",
        lcUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
      }
    ];

    const listContainer = container.querySelector('#problems-list-container');
    const filterBtns = container.querySelectorAll('#prob-filter-bar button');
    const searchInput = container.querySelector('#prob-search-input');

    let activeTier = 'all';
    let searchQuery = '';
    const solvedSet = new Set(); // tracks local problem solved state

    function renderProblems() {
      if (!listContainer) return;
      const filtered = ALL_PROBLEMS.filter(p => {
        const matchesTier = activeTier === 'all' || p.tier === activeTier;
        const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery) || p.statement.toLowerCase().includes(searchQuery);
        return matchesTier && matchesSearch;
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = `<div class="hash-empty-slot" style="padding:24px; text-align:center;">No problems match your search criteria.</div>`;
        return;
      }

      listContainer.innerHTML = filtered.map(p => {
        const isSolved = solvedSet.has(p.num);
        return `
          <div class="tree-prob-card" data-prob-num="${p.num}">
            <div class="tree-prob-header">
              <div class="tree-prob-title-row">
                <span class="tree-prob-num">#${p.num}</span>
                <span class="tree-prob-title">${escapeHtml(p.title)}</span>
                <span class="badge" style="font-size:0.75rem; padding:2px 8px; border-radius:6px; font-weight:700; ${
                  p.difficulty === 'Easy' ? 'background:rgba(16,185,129,0.15); color:#10B981; border:1px solid #10B981;' : 'background:rgba(96,165,250,0.15); color:#60A5FA; border:1px solid #60A5FA;'
                }">${p.difficulty}</span>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <button type="button" class="hash-ctrl-btn btn-mark-prob-done ${isSolved ? 'hash-ctrl-btn--primary' : ''}" style="font-size:0.75rem; min-height:30px; min-width:30px; padding:3px 10px;">
                  ${isSolved ? '✓ Solved' : 'Mark Solved'}
                </button>
                <span class="tree-prob-chevron" style="color:var(--text-muted); font-size:1.1rem; transition:transform 0.2s;">▼</span>
              </div>
            </div>

            <div class="tree-prob-body" style="display:none;">
              <p style="margin:0; color:var(--text-secondary); font-size:0.92rem; line-height:1.6;">
                <strong>Problem:</strong> ${escapeHtml(p.statement)}
              </p>
              
              <div style="background:var(--bg-body); padding:10px 14px; border-radius:8px; font-family:'Fira Code',monospace; font-size:0.82rem; line-height:1.5;">
                ${escapeHtml(p.example)}
              </div>

              <div style="font-size:0.9rem; color:var(--text-primary); line-height:1.6;">
                💡 <strong>Intuition:</strong> ${escapeHtml(p.intuition)}
              </div>

              <div>
                <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary); margin-bottom:6px;">JavaScript Solution:</div>
                <pre class="code-block" style="margin:0;"><code>${escapeHtml(p.code)}</code></pre>
              </div>

              <div class="tree-prob-dryrun">
                <strong>Step-by-Step Dry Run:</strong><br/>
                ${escapeHtml(p.dryrun)}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:0.82rem; color:var(--text-muted);">
                <span>Complexity: <strong>${escapeHtml(p.complexity)}</strong></span>
                <span>Edge Cases: ${escapeHtml(p.edgeCases)}</span>
                ${p.lcUrl ? `<a href="${p.lcUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary); font-weight:600; text-decoration:none;">Solve on LeetCode ↗</a>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Bind Accordion Toggles
      listContainer.querySelectorAll('.tree-prob-card').forEach(card => {
        const header = card.querySelector('.tree-prob-header');
        const body = card.querySelector('.tree-prob-body');
        const chev = card.querySelector('.tree-prob-chevron');
        const markBtn = card.querySelector('.btn-mark-prob-done');
        const probNum = parseInt(card.getAttribute('data-prob-num'), 10);

        header.addEventListener('click', (e) => {
          if (e.target.closest('.btn-mark-prob-done')) return;
          const isHidden = body.style.display === 'none';
          body.style.display = isHidden ? 'flex' : 'none';
          if (chev) chev.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        if (markBtn) {
          markBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (solvedSet.has(probNum)) {
              solvedSet.delete(probNum);
              markBtn.className = 'hash-ctrl-btn btn-mark-prob-done';
              markBtn.textContent = 'Mark Solved';
            } else {
              solvedSet.add(probNum);
              markBtn.className = 'hash-ctrl-btn btn-mark-prob-done hash-ctrl-btn--primary';
              markBtn.textContent = '✓ Solved';
            }
          });
        }
      });
    }

    // Bind Filter Buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.className = 'hash-ctrl-btn');
        btn.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
        activeTier = btn.getAttribute('data-tier');
        renderProblems();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        renderProblems();
      });
    }

    renderProblems();
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "to-q1",
      difficulty: "Easy",
      question: "What is the base case for calculating the maximum depth (height) of a binary tree?",
      options: [
        "A. if (!root) return 0;",
        "B. if (root.val === 0) return true;",
        "C. if (!root.left) return 1;",
        "D. return root.depth;"
      ],
      answer: "A",
      explanation: "When reaching a null pointer (beyond a leaf), depth contribution is 0: `if (!root) return 0;`."
    },
    {
      id: "to-q2",
      difficulty: "Easy",
      question: "In LeetCode 226 (Invert Binary Tree), what operation is performed at each node?",
      options: [
        "A. Deleting the leaf nodes",
        "B. Swapping root.left and root.right child pointers",
        "C. Sorting node values",
        "D. Multiplying values by -1"
      ],
      answer: "B",
      explanation: "Inverting a binary tree simply mirrors the tree by swapping the left and right child pointers at every node recursively."
    },
    {
      id: "to-q3",
      difficulty: "Medium",
      question: "When validating a Binary Search Tree (LeetCode 98), why is comparing `root.left.val < root.val` insufficient?",
      options: [
        "A. Because BSTs only allow positive integers",
        "B. Because all nodes in the entire left subtree must be smaller than the root, not just the immediate child",
        "C. Because left children must be greater than root",
        "D. It is sufficient and optimal"
      ],
      answer: "B",
      explanation: "A node deep in the left subtree could have a right child greater than the original root (e.g. root=5, left=1, left.right=6). Range boundaries (min, max) must be propagated."
    },
    {
      id: "to-q4",
      difficulty: "Medium",
      question: "In LeetCode 543 (Diameter of Binary Tree), can the longest path between two nodes avoid passing through the root?",
      options: [
        "A. Yes, the diameter can exist entirely inside the left or right subtree",
        "B. No, diameter must always pass through the root",
        "C. Only if the root is negative",
        "D. Only in complete trees"
      ],
      answer: "A",
      explanation: "The diameter is the longest path between any two nodes. If one subtree is very deep on both sides, the diameter will pass through that subtree's root instead of the overall tree root."
    },
    {
      id: "to-q5",
      difficulty: "Hard",
      question: "In LeetCode 105, how do we reconstruct a unique binary tree from Preorder and Inorder arrays?",
      options: [
        "A. Preorder gives the Root (first element); Inorder splits elements into Left and Right subtrees",
        "B. Inorder gives the root; Preorder splits subtrees",
        "C. By sorting both arrays and running binary search",
        "D. Any two traversal arrays can reconstruct a tree without Inorder"
      ],
      answer: "A",
      explanation: "Preorder gives the root immediately at preorder[0]. Finding that root in the Inorder array determines the exact boundary of nodes belonging to the left vs right subtrees."
    },
    {
      id: "to-q6",
      difficulty: "Interview",
      question: "What is the time complexity of finding the Lowest Common Ancestor (LCA) in a balanced BST vs an ordinary binary tree?",
      options: [
        "A. O(log n) in balanced BST via left/right branching; O(n) in ordinary binary tree requiring both subtrees to be searched",
        "B. O(1) in both",
        "C. O(n) in both",
        "D. O(n log n) in BST"
      ],
      answer: "A",
      explanation: "In a BST, ordering allows branching in $O(h) = O(\log n)$ time. In an ordinary binary tree, you must explore both subtrees in $O(n)$ time."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the time complexity of inverting a binary tree with n nodes?",
      options: ["A. O(n)", "B. O(log n)", "C. O(n²)", "D. O(1)"],
      answer: "A",
      explanation: "Every node in the tree is visited and has its pointers swapped once, resulting in linear O(n) time."
    },
    {
      question: "Q2. In a tree of diameter 4, how many edges are in the longest path?",
      options: ["A. 4", "B. 5", "C. 3", "D. 8"],
      answer: "A",
      explanation: "Diameter is defined as the number of edges on the longest path between two nodes."
    }
  ],

  predictOutput: [
    {
      code: "function isSame(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q) return false;\n  return p.val === q.val;\n}\nconsole.log(isSame(new TreeNode(5), new TreeNode(5)));",
      options: ["true", "false", "undefined", "TypeError"],
      answer: "true",
      explanation: "Both nodes exist and both have val === 5, returning true."
    },
    {
      code: "const root = new TreeNode(1);\nroot.left = new TreeNode(2);\nfunction count(n) { return !n ? 0 : 1 + count(n.left) + count(n.right); }\nconsole.log(count(root));",
      options: ["2", "1", "3", "0"],
      answer: "2",
      explanation: "There are two nodes (1 and 2), so count returns 2."
    }
  ],

  practice: [
    {
      q: "What is the difference between LCA in a BST vs LCA in a general Binary Tree?",
      a: "In a BST, we can compare target values with root.val to know immediately whether to go left, right, or stop. In a general binary tree, we must search both subtrees recursively."
    },
    {
      q: "How does the Right Side View of a binary tree work using DFS?",
      a: "By visiting Root &rarr; Right &rarr; Left, the first node encountered at each depth level is guaranteed to be the rightmost visible node."
    },
    {
      q: "What is the Zigzag level order traversal algorithm?",
      a: "A BFS level-by-level traversal with an alternating boolean flag. On even levels, elements are pushed normally; on odd levels, elements are inserted in reverse (unshifted)."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    problems: [
      {
        num: 104,
        slug: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        whyThisOrder: "The fundamental recursion problem for binary trees."
      },
      {
        num: 226,
        slug: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        whyThisOrder: "Practice inverting child pointers at each node."
      },
      {
        num: 98,
        slug: "validate-binary-search-tree",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        whyThisOrder: "Master boundary range propagation (min, max) in recursion."
      },
      {
        num: 236,
        slug: "lowest-common-ancestor-of-a-binary-tree",
        title: "Lowest Common Ancestor of a Binary Tree",
        difficulty: "Medium",
        whyThisOrder: "Top interview problem for finding split points in general trees."
      },
      {
        num: 199,
        slug: "binary-tree-right-side-view",
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        whyThisOrder: "Practice Depth-First Search with right-first recursion."
      },
      {
        num: 103,
        slug: "binary-tree-zigzag-level-order-traversal",
        title: "Binary Tree Zigzag Level Order Traversal",
        difficulty: "Medium",
        whyThisOrder: "BFS queue traversal with alternating level reversal."
      }
    ]
  }
};


/* ==========================================================================
   BACKWARDS COMPATIBILITY ALIASES
   ========================================================================== */
window.LESSONS_CONTENT["binary-trees"] = window.LESSONS_CONTENT["tree-intro"];
window.LESSONS_CONTENT["binary-search-tree"] = window.LESSONS_CONTENT["binary-tree-operations"];
