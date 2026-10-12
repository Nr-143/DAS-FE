/**
 * OneStep Journey — Binary Trees & BST Interactive Visualizer
 * ─────────────────────────────────────────────────────────────
 * Demonstrates:
 * - Binary Tree Traversals: Inorder (L-N-R), Preorder (N-L-R), Postorder (L-R-N), Level-order (BFS)
 * - Binary Search Tree (BST):
 *   - Insertion with < left / > right comparisons
 *   - Search comparisons
 *   - Deletion: Leaf, 1-child, and 2-children (Inorder Successor swap)
 *   - Balanced vs Degraded Skewed tree performance
 */

(function () {
  /* Pre-configured BST structure:
            20
          /    \
        10      30
       /  \    /  \
      5   15  25  35
  */
  const BST_NODES = {
    20: { val: 20, x: 250, y: 40, left: 10, right: 30 },
    10: { val: 10, x: 130, y: 110, left: 5, right: 15 },
    30: { val: 30, x: 370, y: 110, left: 25, right: 35 },
    5:  { val: 5,  x: 70,  y: 180, left: null, right: null },
    15: { val: 15, x: 190, y: 180, left: null, right: null },
    25: { val: 25, x: 310, y: 180, left: null, right: null },
    35: { val: 35, x: 430, y: 180, left: null, right: null }
  };

  function getBSTOperations() {
    return [
      { id: 'bst-search', label: '1. BST Search (25)', icon: '<iconify-icon icon="lucide:search"></iconify-icon>' },
      { id: 'bst-insert', label: '2. BST Insert (12)', icon: '<iconify-icon icon="lucide:plus-circle"></iconify-icon>' },
      { id: 'bst-inorder', label: '3. Inorder Traversal (Sorted)', icon: '<iconify-icon icon="lucide:list-tree"></iconify-icon>' },
      { id: 'bst-levelorder', label: '4. Level-Order BFS', icon: '<iconify-icon icon="lucide:layers"></iconify-icon>' },
      { id: 'bst-del-leaf', label: '5. Delete Leaf (5)', icon: '<iconify-icon icon="lucide:leaf"></iconify-icon>' },
      { id: 'bst-del-2child', label: '6. Delete 2-Child Root (20)', icon: '<iconify-icon icon="lucide:git-branch"></iconify-icon>' }
    ];
  }

  function getBTTraversalsOperations() {
    return [
      { id: 'bt-inorder', label: '1. Inorder (L-N-R)', icon: '<iconify-icon icon="lucide:arrow-left"></iconify-icon>' },
      { id: 'bt-preorder', label: '2. Preorder (N-L-R)', icon: '<iconify-icon icon="lucide:arrow-down"></iconify-icon>' },
      { id: 'bt-postorder', label: '3. Postorder (L-R-N)', icon: '<iconify-icon icon="lucide:arrow-right"></iconify-icon>' },
      { id: 'bt-bfs', label: '4. Level-Order (BFS Queue)', icon: '<iconify-icon icon="lucide:align-justify"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'bst-search') {
      const target = 25;
      const code = [
        'function searchBST(root, target) {',
        '  if (!root || root.val === target) return root;',
        '  if (target < root.val) return searchBST(root.left, target);',
        '  return searchBST(root.right, target);',
        '}'
      ];
      const steps = [
        {
          desc: `Start BST Search for target <strong>${target}</strong> at root node <strong>20</strong>.`,
          codeLine: 2,
          vars: { target: 25, current: 20 },
          activeVal: 20,
          visitedVals: [20],
          output: null
        },
        {
          desc: `Comparison: <code>${target} > 20</code>. Since 25 is GREATER than 20, discard entire left subtree and branch <strong>RIGHT</strong>!`,
          codeLine: 4,
          vars: { target: 25, comparison: '25 > 20 (branch right)', next: 30 },
          activeVal: 30,
          visitedVals: [20, 30],
          output: null
        },
        {
          desc: `Comparison at node 30: <code>${target} < 30</code>. Since 25 is LESS than 30, branch <strong>LEFT</strong>!`,
          codeLine: 3,
          vars: { target: 25, comparison: '25 < 30 (branch left)', next: 25 },
          activeVal: 25,
          visitedVals: [20, 30, 25],
          output: null
        },
        {
          desc: `Found node <strong>25</strong>! <code>root.val === target</code>. Target located in only <strong>3 comparisons</strong> instead of 7!`,
          codeLine: 2,
          vars: { target: 25, comparisonsCount: 3, time: 'O(h) = O(log n)' },
          activeVal: 25,
          matchVal: 25,
          visitedVals: [20, 30, 25],
          output: 'Found: Node(25)'
        }
      ];
      return { code, steps, complexity: 'O(log n) Balanced | O(n) Skewed' };
    }

    if (opId === 'bst-insert') {
      const val = 12;
      const code = [
        'function insertBST(root, val) {',
        '  if (!root) return new TreeNode(val);',
        '  if (val < root.val) root.left = insertBST(root.left, val);',
        '  else root.right = insertBST(root.right, val);',
        '  return root;',
        '}'
      ];
      const steps = [
        {
          desc: `Inserting value <strong>${val}</strong> into BST. Start at root <strong>20</strong>.`,
          codeLine: 1,
          vars: { val: 12, curr: 20 },
          activeVal: 20,
          visitedVals: [20]
        },
        {
          desc: `Comparison: <code>12 < 20</code> → branch <strong>LEFT</strong> to node 10.`,
          codeLine: 3,
          vars: { comparison: '12 < 20', next: 10 },
          activeVal: 10,
          visitedVals: [20, 10]
        },
        {
          desc: `Comparison at node 10: <code>12 > 10</code> → branch <strong>RIGHT</strong> to node 15.`,
          codeLine: 4,
          vars: { comparison: '12 > 10', next: 15 },
          activeVal: 15,
          visitedVals: [20, 10, 15]
        },
        {
          desc: `Comparison at node 15: <code>12 < 15</code>. Left child of 15 is <code>null</code>! Insert 12 as <strong>15.left</strong>.`,
          codeLine: 2,
          vars: { parent: 15, slot: 'left child', inserted: 12 },
          activeVal: 12,
          insertedVal: 12,
          customNodes: {
            12: { val: 12, x: 160, y: 240, left: null, right: null, parent: 15 }
          },
          output: 'Inserted 12 as left child of 15'
        }
      ];
      return { code, steps, complexity: 'O(log n) Average | O(n) Worst' };
    }

    if (opId === 'bst-inorder' || opId === 'bt-inorder') {
      const code = [
        'function inorder(node, result = []) {',
        '  if (!node) return;',
        '  inorder(node.left, result);  // 1. Visit Left subtree',
        '  result.push(node.val);        // 2. Visit Node itself',
        '  inorder(node.right, result); // 3. Visit Right subtree',
        '  return result;',
        '}'
      ];
      const traversalOrder = [5, 10, 15, 20, 25, 30, 35];
      const steps = [
        {
          desc: 'Inorder Traversal (Left → Node → Right). On a BST, this yields strictly <strong>sorted ascending order</strong>!',
          codeLine: 1,
          vars: { rule: 'Left -> Node -> Right' },
          visitedVals: [],
          activeVal: -1,
          output: '[]'
        }
      ];

      const visited = [];
      traversalOrder.forEach(num => {
        visited.push(num);
        steps.push({
          desc: `Visit node <strong>${num}</strong> and append to output: <code>[${visited.join(', ')}]</code>.`,
          codeLine: 4,
          vars: { visited: num, count: visited.length },
          visitedVals: [...visited],
          activeVal: num,
          output: `[${visited.join(', ')}]`
        });
      });

      steps.push({
        desc: 'Inorder traversal complete: All nodes visited. Output is completely sorted: <code>[5, 10, 15, 20, 25, 30, 35]</code>.',
        codeLine: 6,
        vars: { totalNodes: 7, isSorted: true },
        visitedVals: traversalOrder,
        activeVal: -1,
        output: '[5, 10, 15, 20, 25, 30, 35]'
      });

      return { code, steps, complexity: 'O(n) Time | O(h) Space' };
    }

    if (opId === 'bt-preorder') {
      const code = [
        'function preorder(node, result = []) {',
        '  if (!node) return;',
        '  result.push(node.val);        // 1. Visit Node FIRST',
        '  preorder(node.left, result);  // 2. Visit Left subtree',
        '  preorder(node.right, result); // 3. Visit Right subtree',
        '  return result;',
        '}'
      ];
      const traversalOrder = [20, 10, 5, 15, 30, 25, 35];
      const steps = [
        {
          desc: 'Preorder Traversal (Node → Left → Right). Visits root first before any children.',
          codeLine: 1,
          vars: { rule: 'Node -> Left -> Right' },
          visitedVals: [],
          output: '[]'
        }
      ];
      const visited = [];
      traversalOrder.forEach(num => {
        visited.push(num);
        steps.push({
          desc: `Preorder visit node <strong>${num}</strong>.`,
          codeLine: 3,
          vars: { currentNode: num },
          visitedVals: [...visited],
          activeVal: num,
          output: `[${visited.join(', ')}]`
        });
      });
      return { code, steps, complexity: 'O(n) Time | O(h) Call Stack' };
    }

    if (opId === 'bt-postorder') {
      const code = [
        'function postorder(node, result = []) {',
        '  if (!node) return;',
        '  postorder(node.left, result);  // 1. Visit Left subtree',
        '  postorder(node.right, result); // 2. Visit Right subtree',
        '  result.push(node.val);         // 3. Visit Node LAST',
        '  return result;',
        '}'
      ];
      const traversalOrder = [5, 15, 10, 25, 35, 30, 20];
      const steps = [
        {
          desc: 'Postorder Traversal (Left → Right → Node). Children are visited before their parent (used in tree deletion).',
          codeLine: 1,
          vars: { rule: 'Left -> Right -> Node' },
          visitedVals: [],
          output: '[]'
        }
      ];
      const visited = [];
      traversalOrder.forEach(num => {
        visited.push(num);
        steps.push({
          desc: `Postorder visit node <strong>${num}</strong>.`,
          codeLine: 5,
          vars: { currentNode: num },
          visitedVals: [...visited],
          activeVal: num,
          output: `[${visited.join(', ')}]`
        });
      });
      return { code, steps, complexity: 'O(n) Time | O(h) Call Stack' };
    }

    if (opId === 'bst-levelorder' || opId === 'bt-bfs') {
      const code = [
        'function levelOrder(root) {',
        '  if (!root) return [];',
        '  const queue = [root], result = [];',
        '  while (queue.length) {',
        '    const node = queue.shift();',
        '    result.push(node.val);',
        '    if (node.left) queue.push(node.left);',
        '    if (node.right) queue.push(node.right);',
        '  }',
        '  return result;',
        '}'
      ];
      const steps = [
        {
          desc: 'Level-Order (BFS) Traversal: Explores tree level by level using a FIFO Queue.',
          codeLine: 3,
          vars: { queue: '[20]', currentLevel: 0 },
          visitedVals: [],
          activeVal: 20,
          output: '[]'
        },
        {
          desc: 'Level 0: Dequeue 20. Enqueue left (10) and right (30).',
          codeLine: 5,
          vars: { dequeued: 20, queue: '[10, 30]' },
          visitedVals: [20],
          activeVal: 20,
          output: '[20]'
        },
        {
          desc: 'Level 1: Dequeue 10. Enqueue 5 and 15.',
          codeLine: 5,
          vars: { dequeued: 10, queue: '[30, 5, 15]' },
          visitedVals: [20, 10],
          activeVal: 10,
          output: '[20, 10]'
        },
        {
          desc: 'Level 1: Dequeue 30. Enqueue 25 and 35.',
          codeLine: 5,
          vars: { dequeued: 30, queue: '[5, 15, 25, 35]' },
          visitedVals: [20, 10, 30],
          activeVal: 30,
          output: '[20, 10, 30]'
        },
        {
          desc: 'Level 2: Dequeue leaf nodes 5, 15, 25, 35 in order.',
          codeLine: 5,
          vars: { queue: '[]', completed: true },
          visitedVals: [20, 10, 30, 5, 15, 25, 35],
          activeVal: -1,
          output: '[20, 10, 30, 5, 15, 25, 35]'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(n) Queue Space' };
    }

    if (opId === 'bst-del-leaf') {
      const code = [
        '// Case 1: Deleting a leaf node (no children)',
        'if (!node.left && !node.right) {',
        '  return null; // simply remove pointer from parent',
        '}'
      ];
      const steps = [
        {
          desc: 'Case 1: Deleting leaf node <strong>5</strong>. Search navigates to 5.',
          codeLine: 1,
          vars: { target: 5, isLeaf: true, parent: 10 },
          activeVal: 5,
          visitedVals: [20, 10, 5]
        },
        {
          desc: 'Since node 5 has no children (<code>left === null && right === null</code>), parent (10) simply sets <code>left = null</code>.',
          codeLine: 3,
          vars: { '10.left': 'null', deleted: 5 },
          activeVal: -1,
          deletedVal: 5,
          output: 'Leaf 5 cleanly deleted'
        }
      ];
      return { code, steps, complexity: 'O(log n) Time | O(1) Rewire' };
    }

    if (opId === 'bst-del-2child') {
      const code = [
        '// Case 3: Deleting a node with TWO children',
        '// 1. Find In-Order Successor (smallest in right subtree)',
        'const successor = findMin(node.right); // node 25',
        'node.val = successor.val;              // copy 25 to root',
        'node.right = deleteNode(node.right, successor.val);'
      ];
      const steps = [
        {
          desc: 'Case 3: Deleting root node <strong>20</strong>, which has TWO children (10 and 30).',
          codeLine: 1,
          vars: { targetToDelete: 20, leftChild: 10, rightChild: 30 },
          activeVal: 20,
          visitedVals: [20]
        },
        {
          desc: 'Find In-Order Successor: Go right to 30, then all the way left → Node <strong>25</strong>!',
          codeLine: 3,
          vars: { successor: 25, why: 'Smallest value greater than 20' },
          activeVal: 25,
          visitedVals: [20, 30, 25]
        },
        {
          desc: 'Copy successor value: Replace root value 20 with <strong>25</strong>. Root is now 25.',
          codeLine: 4,
          vars: { 'root.val': 25, oldVal: 20 },
          activeVal: 20,
          replacedVal: { old: 20, new: 25 }
        },
        {
          desc: 'Delete original successor leaf (25) from right subtree. BST ordering property is perfectly preserved!',
          codeLine: 5,
          vars: { newRoot: 25, deletedSuccessorLeaf: 25 },
          activeVal: -1,
          deletedVal: 25,
          output: 'Root updated to 25; BST property preserved.'
        }
      ];
      return { code, steps, complexity: 'O(log n) Time | O(1) Swap' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;

    const nodes = { ...BST_NODES, ...(step.customNodes || {}) };

    let svgEdges = '';
    let svgNodes = '';

    Object.values(nodes).forEach(n => {
      if (step.deletedVal === n.val) return;

      // Draw edges to children
      if (n.left && nodes[n.left] && step.deletedVal !== n.left) {
        const c = nodes[n.left];
        svgEdges += `<line x1="${n.x}" y1="${n.y}" x2="${c.x}" y2="${c.y}" stroke="var(--border-default)" stroke-width="2.5" />`;
      }
      if (n.right && nodes[n.right] && step.deletedVal !== n.right) {
        const c = nodes[n.right];
        svgEdges += `<line x1="${n.x}" y1="${n.y}" x2="${c.x}" y2="${c.y}" stroke="var(--border-default)" stroke-width="2.5" />`;
      }

      // Determine node circle styling
      let fill = 'var(--bg-surface)';
      let stroke = 'var(--border-default)';
      let textColor = 'var(--text-primary)';
      let displayVal = n.val;

      if (step.replacedVal && step.replacedVal.old === n.val) {
        displayVal = step.replacedVal.new;
        fill = 'rgba(16, 185, 129, 0.25)';
        stroke = '#10B981';
      } else if (step.matchVal === n.val) {
        fill = 'rgba(16, 185, 129, 0.3)';
        stroke = '#10B981';
      } else if (step.activeVal === n.val) {
        fill = 'rgba(108, 99, 255, 0.3)';
        stroke = 'var(--accent-primary)';
      } else if (step.visitedVals && step.visitedVals.includes(n.val)) {
        fill = 'rgba(0, 201, 167, 0.15)';
        stroke = '#00C9A7';
      }

      svgNodes += `
        <g class="tree-svg-node" transform="translate(${n.x}, ${n.y})">
          <circle r="20" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
          <text text-anchor="middle" dy="5" font-size="13" font-weight="700" fill="${textColor}">${displayVal}</text>
        </g>
      `;
    });

    container.innerHTML = `
      <div class="tree-visual-canvas">
        <svg viewBox="0 0 500 280" class="tree-svg">
          <defs>
            <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(108,99,255,0.4)"/>
            </filter>
          </defs>
          ${svgEdges}
          ${svgNodes}
        </svg>
        <div class="tree-legend">
          <span class="legend-item"><span class="legend-color" style="background:var(--accent-primary)"></span> Current Node</span>
          <span class="legend-item"><span class="legend-color" style="background:#00C9A7"></span> Visited / Inorder</span>
          <span class="legend-item"><span class="legend-color" style="background:#10B981"></span> Target Match</span>
        </div>
      </div>
    `;
  }

  function mountBinaryTreesVisualizer(container) {
    container.innerHTML = '';
    const operations = getBTTraversalsOperations();
    let currentOpId = 'bt-inorder';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Binary Tree Traversal Mechanics (DFS & BFS)',
      operations
    });

    let { code, steps, complexity } = generateSteps(currentOpId);

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderVisual(ui.visualCanvas, step);

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

        const bundle = generateSteps(currentOpId);
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

  function mountBSTVisualizer(container) {
    container.innerHTML = '';
    const operations = getBSTOperations();
    let currentOpId = 'bst-search';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Binary Search Tree (BST) Operations Visualizer',
      operations
    });

    let { code, steps, complexity } = generateSteps(currentOpId);

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderVisual(ui.visualCanvas, step);

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

        const bundle = generateSteps(currentOpId);
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

  window.mountBinaryTreesVisualizer = mountBinaryTreesVisualizer;
  window.mountBSTVisualizer = mountBSTVisualizer;
})();
