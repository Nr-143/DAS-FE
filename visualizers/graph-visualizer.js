/**
 * OneStep Journey — Graphs Interactive Visualizer
 * ────────────────────────────────────────────────
 * Demonstrates:
 * - Adjacency List vs Adjacency Matrix representations
 * - Breadth-First Search (BFS) with FIFO Queue and Visited Set
 * - Depth-First Search (DFS) with Call Stack and Visited Set
 * - Adding a Vertex and Adding/Removing an Edge
 */

(function () {
  const GRAPH_DATA = {
    nodes: {
      A: { id: 'A', x: 80,  y: 120 },
      B: { id: 'B', x: 190, y: 50 },
      C: { id: 'C', x: 190, y: 190 },
      D: { id: 'D', x: 310, y: 50 },
      E: { id: 'E', x: 310, y: 190 }
    },
    edges: [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'D'],
      ['C', 'E'],
      ['B', 'E'],
      ['D', 'E']
    ]
  };

  function getGraphOperations() {
    return [
      { id: 'bfs', label: '1. BFS Traversal (Queue)', icon: '<iconify-icon icon="lucide:network"></iconify-icon>' },
      { id: 'dfs', label: '2. DFS Traversal (Stack)', icon: '<iconify-icon icon="lucide:git-pull-request"></iconify-icon>' },
      { id: 'repr', label: '3. Adj List vs Matrix', icon: '<iconify-icon icon="lucide:table-2"></iconify-icon>' },
      { id: 'add-edge', label: '4. Add Vertex & Edge', icon: '<iconify-icon icon="lucide:plus"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'bfs') {
      const code = [
        'function bfs(startNode) {',
        '  const queue = [startNode];',
        '  const visited = new Set([startNode]);',
        '  while (queue.length > 0) {',
        '    const curr = queue.shift(); // Dequeue from front',
        '    for (const neighbor of graph[curr]) {',
        '      if (!visited.has(neighbor)) {',
        '        visited.add(neighbor); queue.push(neighbor);',
        '      }',
        '    }',
        '  }',
        '}'
      ];
      const steps = [
        {
          desc: 'Start BFS Traversal at source vertex <strong>A</strong>. Initial queue: <code>["A"]</code>, visited: <code>{"A"}</code>.',
          codeLine: 2,
          vars: { queue: '["A"]', visited: '{"A"}', curr: 'A' },
          activeNode: 'A',
          visitedNodes: ['A'],
          queueItems: ['A'],
          activeEdge: null,
          output: 'Queue: [A]'
        },
        {
          desc: 'Dequeue <strong>A</strong>. Explore adjacent neighbors of A: <strong>B</strong> and <strong>C</strong>.',
          codeLine: 5,
          vars: { dequeued: 'A', neighbors: '["B", "C"]' },
          activeNode: 'A',
          visitedNodes: ['A'],
          queueItems: [],
          activeEdge: ['A', 'B'],
          output: 'Visiting: A'
        },
        {
          desc: 'Enqueue unvisited neighbors: Add <strong>B</strong> and <strong>C</strong> to Queue. Visited: <code>{A, B, C}</code>.',
          codeLine: 8,
          vars: { queue: '["B", "C"]', visited: '{"A", "B", "C"}' },
          activeNode: 'A',
          visitedNodes: ['A', 'B', 'C'],
          queueItems: ['B', 'C'],
          activeEdge: ['A', 'C'],
          output: 'Queue: [B, C]'
        },
        {
          desc: 'Dequeue <strong>B</strong> from front. Examine neighbors of B: A (already visited), D (unvisited), E (unvisited).',
          codeLine: 5,
          vars: { dequeued: 'B', queue: '["C"]' },
          activeNode: 'B',
          visitedNodes: ['A', 'B', 'C'],
          queueItems: ['C'],
          activeEdge: ['B', 'D'],
          output: 'Visiting: B'
        },
        {
          desc: 'Enqueue <strong>D</strong> and <strong>E</strong> behind C. Queue: <code>["C", "D", "E"]</code>. Visited: <code>{A, B, C, D, E}</code>.',
          codeLine: 8,
          vars: { queue: '["C", "D", "E"]', visited: '{"A", "B", "C", "D", "E"}' },
          activeNode: 'B',
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          queueItems: ['C', 'D', 'E'],
          activeEdge: ['B', 'E'],
          output: 'Queue: [C, D, E]'
        },
        {
          desc: 'Dequeue <strong>C</strong>. Neighbors A and E are already in the Visited set.',
          codeLine: 5,
          vars: { dequeued: 'C', queue: '["D", "E"]' },
          activeNode: 'C',
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          queueItems: ['D', 'E'],
          activeEdge: null,
          output: 'Visiting: C'
        },
        {
          desc: 'Dequeue <strong>D</strong> and <strong>E</strong>. All vertices reached! BFS discovers shortest paths in unweighted graphs.',
          codeLine: 4,
          vars: { queue: '[]', allVisited: true, time: 'O(V + E)' },
          activeNode: null,
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          queueItems: [],
          activeEdge: null,
          output: 'BFS Visit Order: A -> B -> C -> D -> E'
        }
      ];
      return { code, steps, complexity: 'O(V + E) Time | O(V) Queue Space' };
    }

    if (opId === 'dfs') {
      const code = [
        'function dfs(node, visited = new Set()) {',
        '  visited.add(node); // mark visited',
        '  console.log(node);',
        '  for (const neighbor of graph[node]) {',
        '    if (!visited.has(neighbor)) {',
        '      dfs(neighbor, visited); // recursive call stack',
        '    }',
        '  }',
        '}'
      ];
      const steps = [
        {
          desc: 'Start DFS Traversal from source vertex <strong>A</strong>. Call stack: <code>[dfs(A)]</code>.',
          codeLine: 1,
          vars: { callStack: '[A]', visited: '{A}' },
          activeNode: 'A',
          visitedNodes: ['A'],
          stackItems: ['A'],
          activeEdge: null,
          output: 'Visiting: A'
        },
        {
          desc: 'Branch deeply: First unvisited neighbor of A is <strong>B</strong>. Recurse: <code>dfs(B)</code>.',
          codeLine: 6,
          vars: { callStack: '[A, B]', visited: '{A, B}' },
          activeNode: 'B',
          visitedNodes: ['A', 'B'],
          stackItems: ['A', 'B'],
          activeEdge: ['A', 'B'],
          output: 'A -> B'
        },
        {
          desc: 'Continue deep path: First unvisited neighbor of B is <strong>D</strong>. Recurse: <code>dfs(D)</code>.',
          codeLine: 6,
          vars: { callStack: '[A, B, D]', visited: '{A, B, D}' },
          activeNode: 'D',
          visitedNodes: ['A', 'B', 'D'],
          stackItems: ['A', 'B', 'D'],
          activeEdge: ['B', 'D'],
          output: 'A -> B -> D'
        },
        {
          desc: 'Continue deep path: From D, visit neighbor <strong>E</strong>. Recurse: <code>dfs(E)</code>.',
          codeLine: 6,
          vars: { callStack: '[A, B, D, E]', visited: '{A, B, D, E}' },
          activeNode: 'E',
          visitedNodes: ['A', 'B', 'D', 'E'],
          stackItems: ['A', 'B', 'D', 'E'],
          activeEdge: ['D', 'E'],
          output: 'A -> B -> D -> E'
        },
        {
          desc: 'From E, visit remaining unvisited neighbor <strong>C</strong>. Recurse: <code>dfs(C)</code>.',
          codeLine: 6,
          vars: { callStack: '[A, B, D, E, C]', visited: '{A, B, D, E, C}' },
          activeNode: 'C',
          visitedNodes: ['A', 'B', 'D', 'E', 'C'],
          stackItems: ['A', 'B', 'D', 'E', 'C'],
          activeEdge: ['E', 'C'],
          output: 'A -> B -> D -> E -> C'
        },
        {
          desc: 'Backtrack: C has no unvisited neighbors. Call stack unwinds back to E, D, B, and A. All vertices visited!',
          codeLine: 8,
          vars: { callStack: '[]', completed: true, time: 'O(V + E)' },
          activeNode: null,
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          stackItems: [],
          activeEdge: null,
          output: 'DFS Order: A -> B -> D -> E -> C'
        }
      ];
      return { code, steps, complexity: 'O(V + E) Time | O(V) Call Stack' };
    }

    if (opId === 'repr') {
      const code = [
        '// 1. Adjacency List: Hash map of arrays',
        'const adjList = {',
        '  A: ["B", "C"], B: ["A", "D", "E"],',
        '  C: ["A", "E"], D: ["B", "E"], E: ["C", "B", "D"]',
        '}; // Space: O(V + E) — optimal for sparse networks'
      ];
      const steps = [
        {
          desc: 'Compare graph storage formats: <strong>Adjacency List</strong> vs <strong>Adjacency Matrix</strong>.',
          codeLine: 1,
          vars: { vertices: 5, edges: 6, bestChoice: 'Adjacency List for sparse graphs' },
          activeNode: null,
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          showMatrix: true,
          output: 'Adjacency List: O(V + E) | Matrix: O(V²)'
        }
      ];
      return { code, steps, complexity: 'List: O(V+E) | Matrix: O(V²)' };
    }

    if (opId === 'add-edge') {
      const code = [
        'function addVertex(v) {',
        '  if (!this.adjList[v]) this.adjList[v] = [];',
        '}',
        'function addEdge(v1, v2) {',
        '  this.adjList[v1].push(v2);',
        '  this.adjList[v2].push(v1); // undirected link',
        '}'
      ];
      const steps = [
        {
          desc: 'Step 1: Add new vertex <strong>F</strong> to the network.',
          codeLine: 2,
          vars: { newVertex: 'F', neighbors: '[]' },
          extraNode: { id: 'F', x: 420, y: 120 },
          extraEdges: [],
          activeNode: 'F',
          visitedNodes: ['A', 'B', 'C', 'D', 'E'],
          output: 'Vertex F instantiated'
        },
        {
          desc: 'Step 2: Add edge between <strong>D</strong> and <strong>F</strong> (<code>addEdge("D", "F")</code>).',
          codeLine: 5,
          vars: { edge: 'D <-> F', undirected: true },
          extraNode: { id: 'F', x: 420, y: 120 },
          extraEdges: [['D', 'F']],
          activeNode: 'F',
          activeEdge: ['D', 'F'],
          visitedNodes: ['A', 'B', 'C', 'D', 'E', 'F'],
          output: 'Edge D <-> F established'
        }
      ];
      return { code, steps, complexity: 'O(1) Time' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;

    if (step.showMatrix) {
      container.innerHTML = `
        <div class="graph-repr-compare">
          <div class="repr-col">
            <h4>Adjacency List (Map of Arrays)</h4>
            <pre class="repr-code"><code>{
  "A": ["B", "C"],
  "B": ["A", "D", "E"],
  "C": ["A", "E"],
  "D": ["B", "E"],
  "E": ["C", "B", "D"]
}</code></pre>
            <p class="repr-note">✓ Takes <code>O(V + E)</code> space. Efficient for sparse graphs.</p>
          </div>
          <div class="repr-col">
            <h4>Adjacency Matrix (5×5 Grid)</h4>
            <table class="adj-matrix-table">
              <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
              <tr><th>A</th><td>0</td><td class="m-one">1</td><td class="m-one">1</td><td>0</td><td>0</td></tr>
              <tr><th>B</th><td class="m-one">1</td><td>0</td><td>0</td><td class="m-one">1</td><td class="m-one">1</td></tr>
              <tr><th>C</th><td class="m-one">1</td><td>0</td><td>0</td><td>0</td><td class="m-one">1</td></tr>
              <tr><th>D</th><td>0</td><td class="m-one">1</td><td>0</td><td>0</td><td class="m-one">1</td></tr>
              <tr><th>E</th><td>0</td><td class="m-one">1</td><td class="m-one">1</td><td class="m-one">1</td><td>0</td></tr>
            </table>
            <p class="repr-note">✓ Takes <code>O(V²)</code> space. O(1) edge lookup.</p>
          </div>
        </div>
      `;
      return;
    }

    const allNodes = { ...GRAPH_DATA.nodes };
    if (step.extraNode) {
      allNodes[step.extraNode.id] = step.extraNode;
    }

    const allEdges = [...GRAPH_DATA.edges, ...(step.extraEdges || [])];

    let svgEdges = '';
    allEdges.forEach(([u, v]) => {
      const p1 = allNodes[u];
      const p2 = allNodes[v];
      if (!p1 || !p2) return;

      const isEdgeActive = step.activeEdge && (
        (step.activeEdge[0] === u && step.activeEdge[1] === v) ||
        (step.activeEdge[0] === v && step.activeEdge[1] === u)
      );

      const stroke = isEdgeActive ? 'var(--accent-primary)' : 'var(--border-default)';
      const strokeWidth = isEdgeActive ? '3.5' : '2';

      svgEdges += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    });

    let svgNodes = '';
    Object.values(allNodes).forEach(n => {
      const isA = n.id === step.activeNode;
      const isV = step.visitedNodes && step.visitedNodes.includes(n.id);

      let fill = 'var(--bg-surface)';
      let stroke = 'var(--border-default)';
      if (isA) {
        fill = 'rgba(108, 99, 255, 0.35)';
        stroke = 'var(--accent-primary)';
      } else if (isV) {
        fill = 'rgba(0, 201, 167, 0.2)';
        stroke = '#00C9A7';
      }

      svgNodes += `
        <g class="graph-svg-node" transform="translate(${n.x}, ${n.y})">
          <circle r="18" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
          <text text-anchor="middle" dy="5" font-size="13" font-weight="700" fill="var(--text-primary)">${n.id}</text>
        </g>
      `;
    });

    let stateStrip = '';
    if (step.queueItems) {
      stateStrip = `
        <div class="graph-state-pill-strip">
          <span class="state-strip-label">BFS FIFO Queue:</span>
          ${step.queueItems.length === 0 ? '<span class="empty-q">[empty]</span>' : step.queueItems.map(item => `<span class="q-token">${item}</span>`).join(' → ')}
        </div>
      `;
    } else if (step.stackItems) {
      stateStrip = `
        <div class="graph-state-pill-strip">
          <span class="state-strip-label">DFS Recursion Call Stack:</span>
          ${step.stackItems.length === 0 ? '<span class="empty-q">[empty]</span>' : step.stackItems.map(item => `<span class="stack-token">dfs(${item})</span>`).join(' ↳ ')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="graph-visual-canvas">
        <svg viewBox="0 0 480 240" class="graph-svg">
          ${svgEdges}
          ${svgNodes}
        </svg>
        ${stateStrip}
      </div>
    `;
  }

  function mountGraphVisualizer(container, defaultOp = 'bfs') {
    container.innerHTML = '';
    const operations = getGraphOperations();
    let currentOpId = defaultOp;

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Graph Traversal & Representation Visualizer',
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

  window.mountGraphVisualizer = mountGraphVisualizer;
})();
