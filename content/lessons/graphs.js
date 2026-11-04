/**
 * OneStep Journey — Lesson Content: Level 6 Graphs
 * ─────────────────────────────────────────────────────────────
 * Lesson 31: Graph Representation (graph-representation)
 * Lesson 32: Breadth-First Search (breadth-first-search)
 * Lesson 33: Depth-First Search (depth-first-search)
 *
 * Preserves scaffolding for:
 * Lesson 34: topological-sort
 * Lesson 35: union-find
 * Lesson 36: shortest-path
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

/* ==========================================================================
   LESSON 31: GRAPH REPRESENTATION (Topic 31)
   ========================================================================== */
window.LESSONS_CONTENT["graph-representation"] = {
  id: "graph-representation",
  title: "Graph Representation",
  levelTitle: "Level 6 — Graphs",
  summary: "Master vertices, edges, directed vs undirected graphs, weighted networks, and compare Adjacency List O(V + E) vs Adjacency Matrix O(V²) memory layouts with interactive visualizers.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS A GRAPH & WHY DO WE NEED IT?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-graph",
      title: "1. What is a Graph & Real-World Analogy?",
      tocTitle: "1. What is a Graph?",
      contentHtml: `
        <p>Until now, you have learned linear structures (Arrays, Linked Lists, Stacks, Queues) and hierarchical structures (Trees). In an Array or Linked List, each element has at most one predecessor and one successor. In a Tree, each node has exactly one parent.</p>
        
        <div style="background:var(--accent-gradient-subtle); padding:18px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:1.05rem;">Definition of a Graph</h4>
          <p style="margin:0; color:var(--text-primary); line-height:1.65;">
            A <strong>Graph</strong> is a <strong>non-linear data structure</strong> consisting of a finite set of <strong>Vertices (Nodes)</strong> connected by links called <strong>Edges</strong>. Unlike trees, graphs have <em>no root</em>, <em>no parent-child hierarchy</em>, and can contain <em>cycles, cross-connections, and disconnected parts</em>.
          </p>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Real-World Analogy: The Social Network</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Imagine a social network like LinkedIn or Instagram:
        </p>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
          <li><strong>A Person = Vertex (Node):</strong> Each individual user account is a node.</li>
          <li><strong>A Friendship / Connection = Edge:</strong> The line linking two people who know each other.</li>
          <li><strong>A Direct Friend = Neighbor:</strong> Any person directly connected to you by an edge.</li>
          <li><strong>Degree = Number of Connections:</strong> The total number of friends directly connected to your node.</li>
          <li><strong>Mutual Friends = Shared Neighbors:</strong> A third person connected to both you and your friend.</li>
        </ul>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Why Graphs Matter in Real-World Software</h3>
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Nodes (Vertices)</th>
                <th>Edges (Links)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Google Maps / GPS</strong></td>
                <td>Road intersections / Cities</td>
                <td>Roads with mileage or travel time</td>
              </tr>
              <tr>
                <td><strong>The World Wide Web</strong></td>
                <td>Web pages (URLs)</td>
                <td>Hyperlinks pointing to other pages</td>
              </tr>
              <tr>
                <td><strong>Package Managers (npm / pip)</strong></td>
                <td>Software libraries (e.g. React, Express)</td>
                <td>Dependency requirements</td>
              </tr>
              <tr>
                <td><strong>Internet Routing</strong></td>
                <td>Routers / Servers across the globe</td>
                <td>Fiber optic cables / Network bandwidth</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: ESSENTIAL GRAPH TERMINOLOGY
       ------------------------------------------------------------------------ */
    {
      id: "section-graph-terminology",
      title: "2. Essential Graph Terminology Guide",
      tocTitle: "2. Graph Terminology",
      contentHtml: `
        <p>Before coding, master these core definitions. Every technical interview on graphs uses this exact vocabulary:</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:var(--accent-primary); font-size:0.95rem; margin-bottom:4px;">1. Vertex (Node)</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">The fundamental data item in a graph (e.g. Person, City, Server, Webpage). Usually represented by an ID or label like <code>'A'</code>, <code>'B'</code>, or <code>0</code>, <code>1</code>.</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:var(--accent-primary); font-size:0.95rem; margin-bottom:4px;">2. Edge</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">The connection or line between two vertices. An edge between A and B can be denoted as <code>(A, B)</code>.</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#10B981; font-size:0.95rem; margin-bottom:4px;">3. Neighbor</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">A node directly connected to another node via an edge. If edge <code>(A, B)</code> exists, B is an immediate neighbor of A.</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#10B981; font-size:0.95rem; margin-bottom:4px;">4. Degree</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">The number of edges incident to a vertex. In directed graphs: <strong>In-Degree</strong> (incoming edges) and <strong>Out-Degree</strong> (outgoing edges).</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#6366F1; font-size:0.95rem; margin-bottom:4px;">5. Path</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">A sequence of vertices where each consecutive pair is connected by an edge (e.g. <code>A &rarr; C &rarr; D</code> is a valid path from A to D).</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#EC4899; font-size:0.95rem; margin-bottom:4px;">6. Cycle</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">A path that starts and ends at the exact same vertex without retracing any edge twice (e.g. <code>A &rarr; B &rarr; C &rarr; A</code>).</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#F59E0B; font-size:0.95rem; margin-bottom:4px;">7. Connected Component</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">A maximal subgraph where every pair of vertices has a valid path between them. A graph can have multiple isolated components!</p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#F59E0B; font-size:0.95rem; margin-bottom:4px;">8. Edge Weight</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">A numerical cost, distance, or capacity assigned to an edge (e.g. <code>distance = 5km</code>, <code>latency = 12ms</code>).</p>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: INTERACTIVE 4-NODE GRAPH EXPLORER
       ------------------------------------------------------------------------ */
    {
      id: "section-interactive-graph-explorer",
      title: "3. Interactive 4-Node Graph Explorer",
      tocTitle: "3. 4-Node Explorer",
      contentHtml: `
        <p>Explore this canonical 4-node graph: <strong>A, B, C, D</strong> with edges <code>A — B</code>, <code>A — C</code>, <code>B — C</code>, and <code>C — D</code>. Click any node to inspect its live properties and immediate neighbors!</p>

        <div class="graph-svg-container" id="four-node-explorer">
          <svg class="graph-svg-canvas" viewBox="0 0 460 220" id="four-node-svg">
            <defs>
              <marker id="graph-arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)"></path>
              </marker>
            </defs>
            <!-- Edges -->
            <line id="edge-A-B" class="graph-edge" x1="80" y1="60" x2="220" y2="60" />
            <line id="edge-A-C" class="graph-edge" x1="80" y1="60" x2="220" y2="160" />
            <line id="edge-B-C" class="graph-edge" x1="220" y1="60" x2="220" y2="160" />
            <line id="edge-C-D" class="graph-edge" x1="220" y1="160" x2="380" y2="160" />

            <!-- Nodes -->
            <g class="graph-node-group" id="node-group-A" data-node="A" transform="translate(80, 60)">
              <circle class="graph-node-circle" r="22" />
              <text class="graph-node-text">A</text>
            </g>
            <g class="graph-node-group" id="node-group-B" data-node="B" transform="translate(220, 60)">
              <circle class="graph-node-circle" r="22" />
              <text class="graph-node-text">B</text>
            </g>
            <g class="graph-node-group" id="node-group-C" data-node="C" transform="translate(220, 160)">
              <circle class="graph-node-circle" r="22" />
              <text class="graph-node-text">C</text>
            </g>
            <g class="graph-node-group" id="node-group-D" data-node="D" transform="translate(380, 160)">
              <circle class="graph-node-circle" r="22" />
              <text class="graph-node-text">D</text>
            </g>
          </svg>

          <!-- Inspector Details -->
          <div class="graph-inspector-panel">
            <div class="graph-prop-card">
              <div class="graph-prop-label">Selected Node</div>
              <div class="graph-prop-value" id="node-prop-id">C</div>
            </div>
            <div class="graph-prop-card">
              <div class="graph-prop-label">Neighbors</div>
              <div class="graph-prop-value" id="node-prop-neighbors">["A", "B", "D"]</div>
            </div>
            <div class="graph-prop-card">
              <div class="graph-prop-label">Degree</div>
              <div class="graph-prop-value" id="node-prop-degree">3</div>
            </div>
            <div class="graph-prop-card">
              <div class="graph-prop-label">Total Connections</div>
              <div class="graph-prop-value" id="node-prop-conns">3 Edges</div>
            </div>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: TYPES OF GRAPHS
       ------------------------------------------------------------------------ */
    {
      id: "section-types-of-graphs",
      title: "4. The 6 Major Types of Graphs",
      tocTitle: "4. Types of Graphs",
      contentHtml: `
        <p>Graphs come in several structural varieties depending on whether edges have direction, weights, or cycles. Select any type below to inspect its diagram and practical application:</p>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;" id="graph-types-switcher">
          <button class="hash-ctrl-btn hash-ctrl-btn--primary" data-type="undirected">1. Undirected</button>
          <button class="hash-ctrl-btn" data-type="directed">2. Directed</button>
          <button class="hash-ctrl-btn" data-type="weighted">3. Weighted</button>
          <button class="hash-ctrl-btn" data-type="cyclic">4. Cyclic</button>
          <button class="hash-ctrl-btn" data-type="acyclic">5. Acyclic</button>
          <button class="hash-ctrl-btn" data-type="dag">6. DAG</button>
        </div>

        <div class="graph-svg-container" id="types-display-container">
          <div id="types-diagram-box" style="width:100%; display:flex; flex-direction:column; align-items:center;">
            <!-- Rendered dynamically by onMount -->
          </div>
          <div style="background:var(--bg-body); border:1px solid var(--border-default); border-radius:8px; padding:12px 16px; width:100%; margin-top:14px; font-size:0.9rem; line-height:1.6;" id="types-desc-box">
            <!-- Dynamic explanation -->
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: GRAPH REPRESENTATIONS — ADJACENCY LIST
       ------------------------------------------------------------------------ */
    {
      id: "section-adjacency-list",
      title: "5. Graph Representation: Adjacency List",
      tocTitle: "5. Adjacency List",
      contentHtml: `
        <p>In JavaScript, an <strong>Adjacency List</strong> is an Object or Map where <strong>every node is a key</strong>, and its <strong>connected neighbors are stored in an Array</strong>.</p>
        
        <p>This is the <strong>canonical graph representation</strong> used in 95% of technical interviews and coding platforms:</p>

        <pre class="code-block" style="margin:16px 0;"><code>const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: []
};</code></pre>

        <h4 style="color:var(--text-primary); margin:18px 0 8px 0;">Line-by-Line Breakdown:</h4>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px;">
          <li><code>a: ["c", "b"]</code> &mdash; Node <code>a</code> has directed edges pointing to nodes <code>c</code> and <code>b</code>.</li>
          <li><code>b: ["d"]</code> &mdash; Node <code>b</code> points only to node <code>d</code>.</li>
          <li><code>c: ["e"]</code> &mdash; Node <code>c</code> points only to node <code>e</code>.</li>
          <li><code>d: ["f"]</code> &mdash; Node <code>d</code> points only to node <code>f</code>.</li>
          <li><code>e: []</code> &mdash; Node <code>e</code> has no outgoing edges (a sink node/leaf).</li>
          <li><code>f: []</code> &mdash; Node <code>f</code> has no outgoing edges.</li>
        </ul>

        <h4 style="color:var(--text-primary); margin:20px 0 8px 0;">Synchronized Interactive Explorer:</h4>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Click any node on the left graph or any row/entry in the list on the right. Notice how the corresponding neighbors and edges highlight simultaneously!</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;" class="graph-repr-compare">
          <!-- Left: SVG Canvas -->
          <div class="graph-svg-container" style="margin:0;">
            <svg class="graph-svg-canvas" viewBox="0 0 320 220" id="adjlist-svg">
              <defs>
                <marker id="adj-arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)"></path>
                </marker>
              </defs>
              <line id="al-edge-a-c" class="graph-edge graph-edge--directed" x1="60" y1="50" x2="160" y2="50" marker-end="url(#adj-arrow)" />
              <line id="al-edge-a-b" class="graph-edge graph-edge--directed" x1="60" y1="50" x2="60" y2="150" marker-end="url(#adj-arrow)" />
              <line id="al-edge-b-d" class="graph-edge graph-edge--directed" x1="60" y1="150" x2="160" y2="150" marker-end="url(#adj-arrow)" />
              <line id="al-edge-c-e" class="graph-edge graph-edge--directed" x1="160" y1="50" x2="260" y2="50" marker-end="url(#adj-arrow)" />
              <line id="al-edge-d-f" class="graph-edge graph-edge--directed" x1="160" y1="150" x2="260" y2="150" marker-end="url(#adj-arrow)" />

              <g class="graph-node-group" id="al-node-a" data-node="a" transform="translate(60, 50)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">a</text></g>
              <g class="graph-node-group" id="al-node-b" data-node="b" transform="translate(60, 150)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">b</text></g>
              <g class="graph-node-group" id="al-node-c" data-node="c" transform="translate(160, 50)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">c</text></g>
              <g class="graph-node-group" id="al-node-d" data-node="d" transform="translate(160, 150)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">d</text></g>
              <g class="graph-node-group" id="al-node-e" data-node="e" transform="translate(260, 50)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">e</text></g>
              <g class="graph-node-group" id="al-node-f" data-node="f" transform="translate(260, 150)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">f</text></g>
            </svg>
          </div>

          <!-- Right: Interactive List View -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:12px; padding:16px;" id="adjlist-interactive-panel">
            <div style="font-weight:700; color:var(--text-muted); font-size:0.8rem; margin-bottom:10px; text-transform:uppercase;">Adjacency List Object</div>
            <div class="graph-adjlist-row" data-node="a">
              <span style="font-weight:700; color:var(--accent-primary);">a:</span>
              <span>[ <span class="graph-adjlist-entry" data-from="a" data-to="c">"c"</span>, <span class="graph-adjlist-entry" data-from="a" data-to="b">"b"</span> ]</span>
            </div>
            <div class="graph-adjlist-row" data-node="b">
              <span style="font-weight:700; color:var(--accent-primary);">b:</span>
              <span>[ <span class="graph-adjlist-entry" data-from="b" data-to="d">"d"</span> ]</span>
            </div>
            <div class="graph-adjlist-row" data-node="c">
              <span style="font-weight:700; color:var(--accent-primary);">c:</span>
              <span>[ <span class="graph-adjlist-entry" data-from="c" data-to="e">"e"</span> ]</span>
            </div>
            <div class="graph-adjlist-row" data-node="d">
              <span style="font-weight:700; color:var(--accent-primary);">d:</span>
              <span>[ <span class="graph-adjlist-entry" data-from="d" data-to="f">"f"</span> ]</span>
            </div>
            <div class="graph-adjlist-row" data-node="e">
              <span style="font-weight:700; color:var(--accent-primary);">e:</span>
              <span>[ ]</span>
            </div>
            <div class="graph-adjlist-row" data-node="f">
              <span style="font-weight:700; color:var(--accent-primary);">f:</span>
              <span>[ ]</span>
            </div>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 6: GRAPH REPRESENTATIONS — ADJACENCY MATRIX
       ------------------------------------------------------------------------ */
    {
      id: "section-adjacency-matrix",
      title: "6. Graph Representation: Adjacency Matrix",
      tocTitle: "6. Adjacency Matrix",
      contentHtml: `
        <p>An <strong>Adjacency Matrix</strong> is a 2D array of size <code>V &times; V</code> (where V is the number of vertices). Both the rows and columns represent vertices.</p>

        <p>A value of <code>1</code> indicates that an edge exists between row <code>i</code> and column <code>j</code>. A value of <code>0</code> indicates no connection exists.</p>

        <pre class="code-block" style="margin:16px 0;"><code>// Adjacency Matrix for vertices A, B, C, D (indices 0, 1, 2, 3)
const matrix = [
  [0, 1, 1, 0], // A connects to B (1) and C (2)
  [1, 0, 1, 0], // B connects to A (0) and C (2)
  [1, 1, 0, 1], // C connects to A (0), B (1), D (3)
  [0, 0, 1, 0]  // D connects to C (2)
];</code></pre>

        <h4 style="color:var(--text-primary); margin:20px 0 8px 0;">Interactive Matrix Table:</h4>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Click any cell below (e.g. <code>Row C, Col D</code> = 1). The corresponding edge will highlight on the visual graph above!</p>

        <div style="overflow-x:auto;">
          <table class="graph-matrix-table" id="matrix-interactive-table">
            <thead>
              <tr>
                <th style="background:transparent; border:none;"></th>
                <th>A (0)</th>
                <th>B (1)</th>
                <th>C (2)</th>
                <th>D (3)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>A (0)</th>
                <td class="graph-matrix-cell" data-r="A" data-c="A">0</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="A" data-c="B">1</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="A" data-c="C">1</td>
                <td class="graph-matrix-cell" data-r="A" data-c="D">0</td>
              </tr>
              <tr>
                <th>B (1)</th>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="B" data-c="A">1</td>
                <td class="graph-matrix-cell" data-r="B" data-c="B">0</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="B" data-c="C">1</td>
                <td class="graph-matrix-cell" data-r="B" data-c="D">0</td>
              </tr>
              <tr>
                <th>C (2)</th>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="C" data-c="A">1</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="C" data-c="B">1</td>
                <td class="graph-matrix-cell" data-r="C" data-c="C">0</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="C" data-c="D">1</td>
              </tr>
              <tr>
                <th>D (3)</th>
                <td class="graph-matrix-cell" data-r="D" data-c="A">0</td>
                <td class="graph-matrix-cell" data-r="D" data-c="B">0</td>
                <td class="graph-matrix-cell graph-matrix-cell--connected" data-r="D" data-c="C">1</td>
                <td class="graph-matrix-cell" data-r="D" data-c="D">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 7: COMPARISON: ADJACENCY LIST VS MATRIX
       ------------------------------------------------------------------------ */
    {
      id: "section-comparison-list-matrix",
      title: "7. Adjacency List vs. Adjacency Matrix Comparison",
      tocTitle: "7. List vs. Matrix",
      contentHtml: `
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Adjacency List</th>
                <th>Adjacency Matrix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Memory Space</strong></td>
                <td><code>O(V + E)</code> (Optimal)</td>
                <td><code>O(V²)</code> (Quadratic memory)</td>
              </tr>
              <tr>
                <td><strong>Check if Edge Exists</strong></td>
                <td><code>O(degree(V))</code> linear scan</td>
                <td><code>O(1)</code> instant index lookup</td>
              </tr>
              <tr>
                <td><strong>Iterate All Neighbors</strong></td>
                <td><code>O(degree(V))</code> (Very fast)</td>
                <td><code>O(V)</code> (Must check entire row)</td>
              </tr>
              <tr>
                <td><strong>Add a Vertex</strong></td>
                <td><code>O(1)</code> (Add key to object)</td>
                <td><code>O(V²)</code> (Must resize 2D table)</td>
              </tr>
              <tr>
                <td><strong>Best Use Case</strong></td>
                <td><strong>Sparse Graphs</strong> (Most real graphs)</td>
                <td><strong>Dense Graphs</strong> ($E \approx V^2$)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:16px;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 6px 0; color:#10B981; font-size:0.95rem;">Sparse Graph (E &ll; V²)</h4>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">
              A graph where nodes have only a few connections compared to the total population. For example, Facebook has 3 billion users, but each person only has ~300 friends. Storing a 3B &times; 3B matrix would crash any server (9 quintillion cells!). The list stores only the 300 connections.
            </p>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 6px 0; color:#F59E0B; font-size:0.95rem;">Dense Graph (E &approx; V²)</h4>
            <p style="margin:0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">
              A graph where almost every pair of vertices shares an edge (e.g. an airline flight route network where all major airports fly directly to every other airport). Here, the matrix wastes no space and delivers instant O(1) flight existence checks.
            </p>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 8: EXERCISE — CONSTRUCT ADJACENCY LIST FROM EDGE LIST
       ------------------------------------------------------------------------ */
    {
      id: "section-construct-adjlist",
      title: "8. Practical Exercise: Build Graph from Edge List",
      tocTitle: "8. Build Graph Exercise",
      contentHtml: `
        <p>In LeetCode and technical interviews, graphs are almost <strong>never given as adjacency lists</strong>. They are provided as an array of edge pairs (an <strong>Edge List</strong>):</p>

        <pre class="code-block" style="margin:16px 0;"><code>const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n']
];</code></pre>

        <p>Here is the standard JavaScript helper function you should memorize to convert an edge list into an undirected adjacency list:</p>

        <pre class="code-block" style="margin:16px 0;"><code>const buildGraph = (edges) => {
  const graph = {};

  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    // Undirected connection: Add both ways!
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
};</code></pre>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:0.95rem;">Interactive Adjacency List Simulator</h4>
          <p style="color:var(--text-secondary); font-size:0.88rem; margin-bottom:12px;">Click <strong>"Process Next Edge"</strong> to see how <code>buildGraph</code> constructs the adjacency list step by step:</p>
          <div style="display:flex; gap:10px; align-items:center; margin-bottom:12px;">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-step-build-graph">Process Next Edge</button>
            <button class="hash-ctrl-btn" id="btn-reset-build-graph">Reset</button>
            <span style="font-size:0.88rem; color:var(--text-muted); font-weight:600;" id="build-graph-status">Edge 0 of 5</span>
          </div>
          <pre class="code-block" id="build-graph-output" style="margin:0;"><code>{}</code></pre>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT INTERACTIVE HANDLER
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    // 1. Four Node Explorer Interactivity
    const nodeData = {
      A: { neighbors: '["B", "C"]', degree: 2, edges: ['edge-A-B', 'edge-A-C'] },
      B: { neighbors: '["A", "C"]', degree: 2, edges: ['edge-A-B', 'edge-B-C'] },
      C: { neighbors: '["A", "B", "D"]', degree: 3, edges: ['edge-A-C', 'edge-B-C', 'edge-C-D'] },
      D: { neighbors: '["C"]', degree: 1, edges: ['edge-C-D'] }
    };

    const updateNodeInspect = (nodeId) => {
      container.querySelectorAll('.graph-node-group').forEach(el => el.classList.remove('graph-node-group--active'));
      container.querySelectorAll('#four-node-svg .graph-edge').forEach(el => el.classList.remove('graph-edge--active'));

      const activeGroup = container.querySelector(`#node-group-${nodeId}`);
      if (activeGroup) activeGroup.classList.add('graph-node-group--active');

      const data = nodeData[nodeId];
      if (data) {
        const idEl = container.querySelector('#node-prop-id');
        const nbEl = container.querySelector('#node-prop-neighbors');
        const dgEl = container.querySelector('#node-prop-degree');
        const cnEl = container.querySelector('#node-prop-conns');
        if (idEl) idEl.textContent = nodeId;
        if (nbEl) nbEl.textContent = data.neighbors;
        if (dgEl) dgEl.textContent = data.degree;
        if (cnEl) cnEl.textContent = `${data.degree} Edge${data.degree > 1 ? 's' : ''}`;

        data.edges.forEach(eId => {
          const edgeEl = container.querySelector(`#${eId}`);
          if (edgeEl) edgeEl.classList.add('graph-edge--active');
        });
      }
    };

    container.querySelectorAll('#four-node-svg .graph-node-group').forEach(g => {
      g.addEventListener('click', () => {
        const nId = g.getAttribute('data-node');
        if (nId) updateNodeInspect(nId);
      });
    });

    // 2. Types of Graphs Switcher
    const graphTypesData = {
      undirected: {
        title: "Undirected Graph",
        desc: "Edges are bidirectional two-way highways. If A connects to B, B connects to A. Example: Facebook friendship (mutual agreement).",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 140">
          <line class="graph-edge graph-edge--visited" x1="80" y1="70" x2="180" y2="70" />
          <line class="graph-edge graph-edge--visited" x1="180" y1="70" x2="280" y2="70" />
          <g class="graph-node-group" transform="translate(80, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(180, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(280, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">C</text></g>
        </svg>`
      },
      directed: {
        title: "Directed Graph (Digraph)",
        desc: "Edges have arrow directions. A → B means A can navigate to B, but B cannot navigate back to A unless an edge B → A exists. Example: Twitter/Instagram followers, web hyperlinks.",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 140">
          <defs><marker id="t-arr" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981"></path></marker></defs>
          <line class="graph-edge graph-edge--visited" x1="80" y1="70" x2="180" y2="70" marker-end="url(#t-arr)" />
          <line class="graph-edge graph-edge--visited" x1="180" y1="70" x2="280" y2="70" marker-end="url(#t-arr)" />
          <g class="graph-node-group" transform="translate(80, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(180, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(280, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">C</text></g>
        </svg>`
      },
      weighted: {
        title: "Weighted Graph",
        desc: "Each edge carries an associated numerical weight (distance, toll cost, latency). Dijkstra's algorithm uses these weights. Example: Google Maps routes.",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 140">
          <line class="graph-edge" x1="80" y1="70" x2="180" y2="70" />
          <line class="graph-edge" x1="180" y1="70" x2="280" y2="70" />
          <text x="130" y="55" fill="#F59E0B" font-family="'Fira Code',monospace" font-weight="700" font-size="14">8 km</text>
          <text x="230" y="55" fill="#F59E0B" font-family="'Fira Code',monospace" font-weight="700" font-size="14">15 km</text>
          <g class="graph-node-group" transform="translate(80, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(180, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(280, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">C</text></g>
        </svg>`
      },
      cyclic: {
        title: "Cyclic Graph",
        desc: "Contains at least one cycle (a path that loops back to the start node: A &rarr; B &rarr; C &rarr; A). Traversal algorithms require a Visited Set to avoid infinite loops!",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 160">
          <defs><marker id="c-arr" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#EC4899"></path></marker></defs>
          <line class="graph-edge" stroke="#EC4899" x1="90" y1="120" x2="180" y2="40" marker-end="url(#c-arr)" />
          <line class="graph-edge" stroke="#EC4899" x1="180" y1="40" x2="270" y2="120" marker-end="url(#c-arr)" />
          <line class="graph-edge" stroke="#EC4899" x1="270" y1="120" x2="90" y2="120" marker-end="url(#c-arr)" />
          <g class="graph-node-group" transform="translate(90, 120)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(180, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(270, 120)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">C</text></g>
        </svg>`
      },
      acyclic: {
        title: "Acyclic Graph",
        desc: "Contains absolutely NO closed cycles or loops. Once you leave a node along directed edges, you can never return to it.",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 140">
          <line class="graph-edge" x1="80" y1="70" x2="180" y2="70" />
          <line class="graph-edge" x1="180" y1="70" x2="280" y2="70" />
          <g class="graph-node-group" transform="translate(80, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(180, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(280, 70)"><circle class="graph-node-circle" r="20"/><text class="graph-node-text">C</text></g>
        </svg>`
      },
      dag: {
        title: "Directed Acyclic Graph (DAG)",
        desc: "Directed edges with strictly NO cycles. The foundation of build systems (npm dependencies, Webpack chunks, git commit trees, and course prerequisites). Can always be ordered linearly via Topological Sort!",
        svg: `<svg class="graph-svg-canvas" viewBox="0 0 360 140">
          <defs><marker id="dag-arr" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#6366F1"></path></marker></defs>
          <line class="graph-edge" x1="60" y1="70" x2="150" y2="70" marker-end="url(#dag-arr)" />
          <line class="graph-edge" x1="150" y1="70" x2="240" y2="70" marker-end="url(#dag-arr)" />
          <path d="M 60 70 Q 150 15 240 70" fill="none" class="graph-edge" marker-end="url(#dag-arr)" />
          <g class="graph-node-group" transform="translate(60, 70)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">A</text></g>
          <g class="graph-node-group" transform="translate(150, 70)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">B</text></g>
          <g class="graph-node-group" transform="translate(240, 70)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">C</text></g>
        </svg>`
      }
    };

    const renderType = (typeKey) => {
      const data = graphTypesData[typeKey] || graphTypesData.undirected;
      const diagBox = container.querySelector('#types-diagram-box');
      const descBox = container.querySelector('#types-desc-box');
      if (diagBox) diagBox.innerHTML = data.svg;
      if (descBox) {
        descBox.innerHTML = `<strong style="color:var(--accent-primary); font-size:1rem;">${data.title}</strong><br/>${data.desc}`;
      }
    };

    renderType('undirected');

    container.querySelectorAll('#graph-types-switcher button').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('#graph-types-switcher button').forEach(b => b.classList.remove('hash-ctrl-btn--primary'));
        btn.classList.add('hash-ctrl-btn--primary');
        const tKey = btn.getAttribute('data-type');
        renderType(tKey);
      });
    });

    // 3. Adjacency List Synchronized Explorer
    const alEdges = {
      'a-c': 'al-edge-a-c',
      'a-b': 'al-edge-a-b',
      'b-d': 'al-edge-b-d',
      'c-e': 'al-edge-c-e',
      'd-f': 'al-edge-d-f'
    };

    const clearAlHighlights = () => {
      container.querySelectorAll('#adjlist-svg .graph-node-group').forEach(el => el.classList.remove('graph-node-group--active'));
      container.querySelectorAll('#adjlist-svg .graph-edge').forEach(el => el.classList.remove('graph-edge--active'));
      container.querySelectorAll('.graph-adjlist-row').forEach(el => el.classList.remove('graph-adjlist-row--active'));
    };

    container.querySelectorAll('.graph-adjlist-row').forEach(row => {
      row.addEventListener('click', () => {
        clearAlHighlights();
        row.classList.add('graph-adjlist-row--active');
        const node = row.getAttribute('data-node');
        const nodeEl = container.querySelector(`#al-node-${node}`);
        if (nodeEl) nodeEl.classList.add('graph-node-group--active');
      });
    });

    container.querySelectorAll('.graph-adjlist-entry').forEach(entry => {
      entry.addEventListener('click', (e) => {
        e.stopPropagation();
        clearAlHighlights();
        const from = entry.getAttribute('data-from');
        const to = entry.getAttribute('data-to');
        const edgeId = alEdges[`${from}-${to}`];
        if (edgeId) {
          const edgeEl = container.querySelector(`#${edgeId}`);
          if (edgeEl) edgeEl.classList.add('graph-edge--active');
        }
        const fromNode = container.querySelector(`#al-node-${from}`);
        const toNode = container.querySelector(`#al-node-${to}`);
        if (fromNode) fromNode.classList.add('graph-node-group--active');
        if (toNode) toNode.classList.add('graph-node-group--active');
      });
    });

    // 4. Adjacency Matrix Cell Clicking
    const matrixEdges = {
      'A-B': 'edge-A-B', 'B-A': 'edge-A-B',
      'A-C': 'edge-A-C', 'C-A': 'edge-A-C',
      'B-C': 'edge-B-C', 'C-B': 'edge-B-C',
      'C-D': 'edge-C-D', 'D-C': 'edge-C-D'
    };

    container.querySelectorAll('#matrix-interactive-table .graph-matrix-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        container.querySelectorAll('#matrix-interactive-table .graph-matrix-cell').forEach(c => c.classList.remove('graph-matrix-cell--active'));
        cell.classList.add('graph-matrix-cell--active');
        const r = cell.getAttribute('data-r');
        const c = cell.getAttribute('data-c');
        const edgeKey = `${r}-${c}`;
        const edgeId = matrixEdges[edgeKey];
        if (edgeId) {
          container.querySelectorAll('#four-node-svg .graph-edge').forEach(e => e.classList.remove('graph-edge--active'));
          const eEl = container.querySelector(`#${edgeId}`);
          if (eEl) eEl.classList.add('graph-edge--active');
        }
      });
    });

    // 5. Build Graph from Edge List Stepper
    const sampleEdges = [['i', 'j'], ['k', 'i'], ['m', 'k'], ['k', 'l'], ['o', 'n']];
    let stepIndex = 0;
    const simGraph = {};

    const btnStep = container.querySelector('#btn-step-build-graph');
    const btnReset = container.querySelector('#btn-reset-build-graph');
    const outputEl = container.querySelector('#build-graph-output code');
    const statusEl = container.querySelector('#build-graph-status');

    if (btnStep) {
      btnStep.addEventListener('click', () => {
        if (stepIndex < sampleEdges.length) {
          const [a, b] = sampleEdges[stepIndex];
          if (!simGraph[a]) simGraph[a] = [];
          if (!simGraph[b]) simGraph[b] = [];
          simGraph[a].push(b);
          simGraph[b].push(a);
          stepIndex++;
          if (outputEl) outputEl.textContent = JSON.stringify(simGraph, null, 2);
          if (statusEl) statusEl.textContent = `Edge ${stepIndex} of ${sampleEdges.length}: Processed ['${a}', '${b}']`;
          if (stepIndex === sampleEdges.length) {
            btnStep.disabled = true;
          }
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        stepIndex = 0;
        for (const k in simGraph) delete simGraph[k];
        if (outputEl) outputEl.textContent = '{}';
        if (statusEl) statusEl.textContent = 'Edge 0 of 5';
        if (btnStep) btnStep.disabled = false;
      });
    }
  },

  /* ------------------------------------------------------------------------
     QUESTIONS SUITE (Mini Quiz, Predict Output, Practice, LeetCode)
     ------------------------------------------------------------------------ */
  miniQuiz: [
    {
      question: "Q1. What is the space complexity of an Adjacency List for a graph with V vertices and E edges?",
      options: [
        "A. O(V + E)",
        "B. O(V²)",
        "C. O(E²)",
        "D. O(V × E)"
      ],
      answer: "A",
      explanation: "An adjacency list stores V vertex entries, and the arrays across all vertices store a total of 2E connections (undirected) or E connections (directed), taking optimal O(V + E) space."
    },
    {
      question: "Q2. In which scenario is an Adjacency Matrix preferred over an Adjacency List?",
      options: [
        "A. When the graph is sparse with few edges",
        "B. When the graph is dense (E ≈ V²) and frequent O(1) edge lookup is required",
        "C. When memory is very constrained",
        "D. When nodes are added dynamically during runtime"
      ],
      answer: "B",
      explanation: "In dense graphs where almost every node pair shares an edge, a matrix has almost no wasted cells and allows O(1) instant edge lookups: matrix[i][j] === 1."
    },
    {
      question: "Q3. What is the difference between a Tree and a general Graph?",
      options: [
        "A. Graphs have no nodes, trees have nodes",
        "B. A Tree is a connected acyclic graph with exactly one root and (N - 1) edges; graphs can have cycles and multiple disconnected parts",
        "C. Trees are non-linear, graphs are linear",
        "D. There is no difference"
      ],
      answer: "B",
      explanation: "A tree is a specialized subset of a graph that is connected, undirected, acyclic, and has a single root. General graphs have no root and can contain cycles and disconnected components."
    },
    {
      question: "Q4. If vertex C has edges to A, B, and D in an undirected graph, what is the degree of C?",
      options: [
        "A. 1",
        "B. 2",
        "C. 3",
        "D. 4"
      ],
      answer: "C",
      explanation: "The degree of a vertex in an undirected graph is the total count of incident edges (direct neighbors). Since C connects to 3 neighbors, its degree is 3."
    },
    {
      question: "Q5. What does DAG stand for in computer science?",
      options: [
        "A. Direct Array Group",
        "B. Directed Acyclic Graph",
        "C. Dynamic Allocation Grid",
        "D. Divided Adjacent Graph"
      ],
      answer: "B",
      explanation: "DAG stands for Directed Acyclic Graph. It is a directed graph with no cycles, forming the foundation of dependency build systems and topological sorting."
    }
  ],

  predictOutput: [
    {
      code: `const edges = [['A', 'B'], ['B', 'C']];
const graph = {};
for (const [u, v] of edges) {
  if (!graph[u]) graph[u] = [];
  if (!graph[v]) graph[v] = [];
  graph[u].push(v);
}
console.log(graph['B']);`,
      options: [
        `["C"]`,
        `["A", "C"]`,
        `["A"]`,
        `[]`
      ],
      answer: `["C"]`,
      explanation: "The code adds directed edges (graph[u].push(v) only). For edge ['A', 'B'], 'B' is added to 'A'. For edge ['B', 'C'], 'C' is added to 'B'. Thus graph['B'] is ['C']."
    },
    {
      code: `const matrix = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0]
];
let degreeOf1 = matrix[1].reduce((sum, val) => sum + val, 0);
console.log(degreeOf1);`,
      options: [
        "1",
        "2",
        "3",
        "0"
      ],
      answer: "2",
      explanation: "Row index 1 is [1, 0, 1]. Summing the row yields 1 + 0 + 1 = 2, which corresponds to the degree of node 1."
    },
    {
      code: `const graph = {
  x: ['y'],
  y: ['z'],
  z: ['x']
};
console.log(graph[graph['x'][0]][0]);`,
      options: [
        `"z"`,
        `"x"`,
        `"y"`,
        `undefined`
      ],
      answer: `"z"`,
      explanation: "graph['x'][0] is 'y'. Then graph['y'][0] is 'z'."
    }
  ],

  practice: [
    {
      q: "Write a JavaScript function `hasEdge(graph, u, v)` that returns true if a directed edge exists from u to v in an adjacency list.",
      a: "function hasEdge(graph, u, v) {\n  if (!graph[u]) return false;\n  return graph[u].includes(v);\n}"
    },
    {
      q: "Write a function `calculateInDegrees(graph)` that takes a directed adjacency list and returns an object mapping each node to its in-degree count.",
      a: "function calculateInDegrees(graph) {\n  const inDegree = {};\n  for (const node in graph) inDegree[node] = 0;\n  for (const node in graph) {\n    for (const neighbor of graph[node]) {\n      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;\n    }\n  }\n  return inDegree;\n}"
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 1791 — Find Center of Star Graph, then move to 997 — Find the Town Judge.",
    problems: [
      { num: 1791, title: "Find Center of Star Graph", concept: "Vertex Degree Check", slug: "find-center-of-star-graph", isSuggestedStart: true, isImmediateNext: true },
      { num: 997, title: "Find the Town Judge", concept: "In-Degree & Out-Degree", slug: "find-the-town-judge" },
      { num: 1971, title: "Find if Path Exists in Graph", concept: "Graph Traversal / Connectivity", slug: "find-if-path-exists-in-graph" },
      { num: 133, title: "Clone Graph", concept: "Adjacency List Deep Copy", slug: "clone-graph" }
    ]
  }
};

/* ==========================================================================
   LESSON 32: BREADTH-FIRST SEARCH (Topic 32)
   ========================================================================== */
window.LESSONS_CONTENT["breadth-first-search"] = {
  id: "breadth-first-search",
  title: "Breadth-First Search (BFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Explore graphs level by level using a FIFO Queue and Visited Set. Master BFS traversals, path existence, and shortest path in unweighted networks.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS BFS & REAL-WORLD ANALOGY?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-bfs",
      title: "1. What is Breadth-First Search & Real-World Analogy?",
      tocTitle: "1. What is BFS?",
      contentHtml: `
        <p><strong>Breadth-First Search (BFS)</strong> is an algorithm that explores a graph systematically <strong>layer by layer</strong>, radiating outward from a starting source node like ripples expanding in water.</p>

        <h3 style="margin:20px 0 10px 0; font-size:1.05rem; color:var(--text-primary);">Real-World Analogy: Rooms in a Large Building</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Imagine you are searching for an exit inside a massive unknown mansion:
        </p>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
          <li>First, you search every room <strong>directly connected (1 step away)</strong> to your starting hallway.</li>
          <li>Only after you have checked all 1-step rooms do you move to rooms that are <strong>2 steps away</strong>.</li>
          <li>Then you search rooms that are <strong>3 steps away</strong>, and so forth.</li>
        </ul>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Because you explore all closer rooms before ever venturing into further rooms, <strong>the first time you find the exit, it is guaranteed to be via the shortest possible path!</strong> This is the golden superpower of BFS.
        </p>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: UNDERSTAND THE QUEUE DATA STRUCTURE
       ------------------------------------------------------------------------ */
    {
      id: "section-understand-queue",
      title: "2. The Engine of BFS: The FIFO Queue",
      tocTitle: "2. The Queue Engine",
      contentHtml: `
        <p>A <strong>Queue</strong> operates on the <strong>FIFO (First In, First Out)</strong> principle — exactly like a line of people waiting at a coffee shop. The first person to join the line is the first person served and leaves the line.</p>

        <div style="background:var(--accent-gradient-subtle); padding:16px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:1rem;">Two Fundamental Operations:</h4>
          <ul style="margin:0; padding-left:20px; color:var(--text-primary); line-height:1.65;">
            <li><strong>Enqueue (<code>queue.push(item)</code>):</strong> Adds a newly discovered neighbor to the <em>back</em> of the queue.</li>
            <li><strong>Dequeue (<code>queue.shift()</code>):</strong> Removes and inspects the oldest node from the <em>front</em> of the queue.</li>
          </ul>
        </div>

        <h3 style="margin:20px 0 10px 0; font-size:1.05rem; color:var(--text-primary);">Why Does BFS Absolutely Require a Queue?</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          A queue preserves the <em>order of discovery</em>. All distance-1 neighbors are enqueued first. When distance-1 nodes are dequeued, their distance-2 neighbors are placed <em>behind</em> the remaining distance-1 nodes. This guarantees that all nodes at distance $d$ are completely processed before any node at distance $d+1$ is visited!
        </p>

        <!-- Interactive Queue Simulator -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:12px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:0.95rem;">Interactive Queue Simulation</h4>
          <div style="display:flex; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-enqueue-sample">Enqueue Random Node</button>
            <button class="hash-ctrl-btn" id="btn-dequeue-sample">Dequeue Front (Shift)</button>
            <button class="hash-ctrl-btn" id="btn-reset-sample-queue">Reset Queue</button>
          </div>
          <div style="display:flex; align-items:center; gap:8px; padding:12px; background:var(--bg-body); border:1px dashed var(--border-default); border-radius:8px; min-height:56px; overflow-x:auto;" id="sim-queue-strip">
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">FRONT (HEAD) &rarr;</span>
            <span class="q-token">A</span>
            <span class="q-token">B</span>
            <span class="q-token">C</span>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">&larr; BACK (TAIL)</span>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: CANONICAL GRAPH & TRAVERSAL WALKTHROUGH
       ------------------------------------------------------------------------ */
    {
      id: "section-canonical-bfs",
      title: "3. Canonical Graph & Expected BFS Traversal",
      tocTitle: "3. Traversal Walkthrough",
      contentHtml: `
        <p>Consider the canonical directed graph from the course notes:</p>

        <pre class="code-block" style="margin:16px 0;"><code>const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: []
};</code></pre>

        <div style="background:rgba(16, 185, 129, 0.12); border:1px solid rgba(16, 185, 129, 0.3); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 6px 0; color:#10B981; font-size:0.98rem;">Expected BFS Traversal Sequence:</h4>
          <div style="font-family:'Fira Code',monospace; font-size:1.1rem; font-weight:700; color:#10B981;">
            a &rarr; c &rarr; b &rarr; e &rarr; d &rarr; f
          </div>
          <p style="margin:6px 0 0 0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
            Notice how nodes at depth 1 (<code>c</code>, <code>b</code>) are completely visited before nodes at depth 2 (<code>e</code>, <code>d</code>), which are visited before depth 3 (<code>f</code>).
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: INTERACTIVE STEP-BY-STEP BFS VISUALIZER
       ------------------------------------------------------------------------ */
    {
      id: "section-bfs-visualizer",
      title: "4. Interactive Step-by-Step BFS Execution Visualizer",
      tocTitle: "4. BFS Visualizer",
      contentHtml: `
        <p>Step through every iteration of the BFS <code>while</code> loop. Observe how the Queue and Visited Set evolve and synchronize with the visual graph below:</p>

        <div class="hash-widget-card" id="bfs-visualizer-widget">
          <div class="hash-widget-header">
            <span class="hash-widget-title">BFS Queue Execution Engine</span>
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn" id="bfs-btn-prev">Previous</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="bfs-btn-play">Play</button>
              <button class="hash-ctrl-btn" id="bfs-btn-next">Next</button>
              <button class="hash-ctrl-btn" id="bfs-btn-reset">Reset</button>
              <select id="bfs-speed-select" class="hash-ctrl-btn" style="padding:4px 8px;">
                <option value="1200">1x Speed</option>
                <option value="600">2x Speed</option>
                <option value="2000">0.5x Speed</option>
              </select>
            </div>
          </div>

          <!-- SVG Visual Graph Canvas -->
          <div class="graph-svg-container" style="margin:12px 0;">
            <svg class="graph-svg-canvas" viewBox="0 0 340 180" id="bfs-sim-svg">
              <defs>
                <marker id="bfs-arr" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)"></path>
                </marker>
              </defs>
              <line id="bfs-e-a-c" class="graph-edge graph-edge--directed" x1="60" y1="40" x2="170" y2="40" marker-end="url(#bfs-arr)" />
              <line id="bfs-e-a-b" class="graph-edge graph-edge--directed" x1="60" y1="40" x2="60" y2="130" marker-end="url(#bfs-arr)" />
              <line id="bfs-e-b-d" class="graph-edge graph-edge--directed" x1="60" y1="130" x2="170" y2="130" marker-end="url(#bfs-arr)" />
              <line id="bfs-e-c-e" class="graph-edge graph-edge--directed" x1="170" y1="40" x2="280" y2="40" marker-end="url(#bfs-arr)" />
              <line id="bfs-e-d-f" class="graph-edge graph-edge--directed" x1="170" y1="130" x2="280" y2="130" marker-end="url(#bfs-arr)" />

              <g class="graph-node-group" id="bfs-n-a" transform="translate(60, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">a</text></g>
              <g class="graph-node-group" id="bfs-n-b" transform="translate(60, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">b</text></g>
              <g class="graph-node-group" id="bfs-n-c" transform="translate(170, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">c</text></g>
              <g class="graph-node-group" id="bfs-n-d" transform="translate(170, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">d</text></g>
              <g class="graph-node-group" id="bfs-n-e" transform="translate(280, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">e</text></g>
              <g class="graph-node-group" id="bfs-n-f" transform="translate(280, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">f</text></g>
            </svg>
          </div>

          <!-- Step Trace State Table -->
          <div style="overflow-x:auto;">
            <table class="hash-state-table" id="bfs-trace-table">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Queue Before Shift</th>
                  <th>Neighbors Checked</th>
                  <th>Visited Set</th>
                  <th>Queue After Push</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="bfs-td-curr" style="font-weight:700; color:#F59E0B;">a</td>
                  <td id="bfs-td-q-before">["a"]</td>
                  <td id="bfs-td-nbrs">["c", "b"]</td>
                  <td id="bfs-td-visited">Set {"a", "c", "b"}</td>
                  <td id="bfs-td-q-after">["c", "b"]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Traversal Output Collected -->
          <div style="display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:wrap;">
            <span style="font-weight:700; font-size:0.85rem; color:var(--text-muted);">TRAVERSAL OUTPUT:</span>
            <div id="bfs-output-chips" style="display:flex; gap:6px; flex-wrap:wrap;"></div>
          </div>

          <!-- Pedagogical Narration Box -->
          <div class="hash-narration-box" id="bfs-narration-box" style="margin-top:12px;">
            Step 1: Start at source 'a'. Enqueue 'a' and mark visited.
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: JAVASCRIPT IMPLEMENTATIONS (STANDARD & OPTIMIZED)
       ------------------------------------------------------------------------ */
    {
      id: "section-bfs-implementations",
      title: "5. JavaScript Implementations & Line-by-Line Breakdown",
      tocTitle: "5. JS Code & Walkthrough",
      contentHtml: `
        <h4 style="color:var(--text-primary); margin-top:0;">Implementation 1: Standard BFS Traversal</h4>
        <pre class="code-block"><code>const breadthFirst = (graph, source) => {
  const queue = [source];
  const visited = new Set([source]);

  while (queue.length > 0) {
    const current = queue.shift();

    console.log(current);

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
};</code></pre>

        <h4 style="color:var(--text-primary); margin:20px 0 8px 0;">Line-by-Line Explanation for Beginners:</h4>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px;">
          <li><code>const queue = [source]</code> &mdash; Initialize the FIFO queue with the source node to kick off traversal.</li>
          <li><code>const visited = new Set([source])</code> &mdash; Immediately mark <code>source</code> as visited so it can never be enqueued a second time.</li>
          <li><code>while (queue.length > 0)</code> &mdash; Continue running as long as there are nodes waiting in line to be explored.</li>
          <li><code>const current = queue.shift()</code> &mdash; Remove and return the front node from the queue.</li>
          <li><code>console.log(current)</code> &mdash; Process the current node (e.g. print, record output, or check condition).</li>
          <li><code>for (const neighbor of graph[current] || [])</code> &mdash; Iterate through every immediate adjacent neighbor.</li>
          <li><code>if (!visited.has(neighbor))</code> &mdash; Crucial check! Only process neighbors that have NOT been seen before.</li>
          <li><code>visited.add(neighbor); queue.push(neighbor);</code> &mdash; <strong>Mark visited before pushing into queue!</strong> This prevents the same node from being added multiple times by two different parent nodes.</li>
        </ul>

        <h4 style="color:var(--text-primary); margin:24px 0 8px 0;">Implementation 2: Optimized O(1) Dequeue with Head Pointer</h4>
        <p style="color:var(--text-secondary); line-height:1.6;">
          In JavaScript arrays, <code>queue.shift()</code> runs in $O(n)$ time because all remaining elements must shift left in memory. For graphs with thousands of nodes, this introduces an unnecessary $O(n^2)$ penalty. We can optimize this to true $O(1)$ by using an index head pointer:
        </p>

        <pre class="code-block"><code>const breadthFirstOptimized = (graph, source) => {
  const queue = [source];
  let head = 0;

  const visited = new Set([source]);

  while (head < queue.length) {
    const current = queue[head++]; // O(1) pointer advance!

    console.log(current);

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
};</code></pre>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 6: CORE BFS PROBLEMS & SHORTEST PATH
       ------------------------------------------------------------------------ */
    {
      id: "section-bfs-problems",
      title: "6. Core BFS Problems & The Shortest Path Guarantee",
      tocTitle: "6. Shortest Path & Problems",
      contentHtml: `
        <h3 style="color:var(--text-primary); margin-top:0;">Problem 1: Has Path (BFS)</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">Return <code>true</code> if there exists a valid directed path from <code>src</code> to <code>dst</code>, otherwise <code>false</code>:</p>

        <pre class="code-block"><code>const hasPathBFS = (graph, src, dst) => {
  const queue = [src];
  const visited = new Set([src]);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === dst) return true; // Found destination!

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return false;
};</code></pre>

        <h3 style="color:var(--text-primary); margin:24px 0 10px 0;">Problem 2: Shortest Path in an Unweighted Graph</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Given an edge list, find the minimum number of edge hops required to travel from <code>nodeA</code> to <code>nodeB</code>. Return <code>-1</code> if no path exists:
        </p>

        <pre class="code-block"><code>const shortestPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);

  const visited = new Set([nodeA]);
  // Store tuple: [currentNode, distanceFromSource]
  const queue = [[nodeA, 0]];

  while (queue.length > 0) {
    const [node, distance] = queue.shift();

    if (node === nodeB) return distance; // First time reached = shortest path!

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1;
};</code></pre>

        <div style="background:var(--accent-gradient-subtle); padding:16px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:16px 0;">
          <h4 style="margin:0 0 6px 0; color:var(--accent-primary); font-size:0.98rem;">Why Does BFS Guarantee the Shortest Path?</h4>
          <p style="margin:0; color:var(--text-primary); font-size:0.88rem; line-height:1.6;">
            Because all distance-1 nodes enter and leave the queue before any distance-2 nodes, BFS expands in strictly non-decreasing distance order: $0, 1, 1, 2, 2, 2, 3\dots$. The moment your target node is dequeued, it is physically impossible for a shorter route to exist!
          </p>
          <p style="margin:8px 0 0 0; color:var(--text-muted); font-size:0.82rem;">
            <em>Note:</em> This guarantee applies strictly to <strong>unweighted graphs</strong> where all edges cost 1. If edges have varying positive weights (e.g. 5km vs 80km), standard BFS fails and you must use <strong>Dijkstra's Algorithm</strong> (covered in Topic 36).
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 7: TIME AND SPACE COMPLEXITY
       ------------------------------------------------------------------------ */
    {
      id: "section-bfs-complexity",
      title: "7. BFS Time and Space Complexity Analysis",
      tocTitle: "7. Complexity Analysis",
      contentHtml: `
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Complexity</th>
                <th>Detailed Pedagogical Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Time Complexity</strong></td>
                <td><code>O(V + E)</code></td>
                <td>Every vertex is enqueued and dequeued at most once: <code>O(V)</code>. For each vertex, we iterate through its outgoing edge neighbors: summing across all vertices checks every edge once (directed) or twice (undirected): <code>O(E)</code>. Total = <code>O(V + E)</code>.</td>
              </tr>
              <tr>
                <td><strong>Space Complexity</strong></td>
                <td><code>O(V)</code></td>
                <td>The <code>visited</code> Set stores at most V nodes. In the worst case (a star or complete graph), the FIFO <code>queue</code> holds all $V-1$ neighbors simultaneously: <code>O(V)</code> auxiliary memory.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT INTERACTIVE BFS STEPPER
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    // 1. Interactive Sample Queue Simulator
    const simQueueStrip = container.querySelector('#sim-queue-strip');
    const btnEnqueue = container.querySelector('#btn-enqueue-sample');
    const btnDequeue = container.querySelector('#btn-dequeue-sample');
    const btnResetQ = container.querySelector('#btn-reset-sample-queue');

    let sampleQueue = ['A', 'B', 'C'];
    const alphabet = 'DEFGHIJKLMNOPQRSTUVWXYZ';

    const renderSampleQueue = () => {
      if (!simQueueStrip) return;
      if (sampleQueue.length === 0) {
        simQueueStrip.innerHTML = '<span style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">Queue is currently empty!</span>';
        return;
      }
      simQueueStrip.innerHTML = `
        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">FRONT (HEAD) &rarr;</span>
        ${sampleQueue.map(item => `<span class="q-token">${item}</span>`).join('')}
        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">&larr; BACK (TAIL)</span>
      `;
    };

    if (btnEnqueue) {
      btnEnqueue.addEventListener('click', () => {
        const nextChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        sampleQueue.push(nextChar);
        renderSampleQueue();
      });
    }

    if (btnDequeue) {
      btnDequeue.addEventListener('click', () => {
        if (sampleQueue.length > 0) {
          sampleQueue.shift();
          renderSampleQueue();
        }
      });
    }

    if (btnResetQ) {
      btnResetQ.addEventListener('click', () => {
        sampleQueue = ['A', 'B', 'C'];
        renderSampleQueue();
      });
    }

    // 2. BFS Stepper Engine
    const bfsSteps = [
      {
        curr: "a",
        qBefore: `["a"]`,
        nbrs: `["c", "b"]`,
        visited: `{"a", "c", "b"}`,
        qAfter: `["c", "b"]`,
        output: ["a"],
        activeNode: "a",
        queueNodes: ["c", "b"],
        visitedNodes: ["a", "c", "b"],
        activeEdges: ["bfs-e-a-c", "bfs-e-a-b"],
        narration: "Step 1: Dequeue 'a'. Explore unvisited neighbors of 'a': 'c' and 'b'. Enqueue both and mark visited."
      },
      {
        curr: "c",
        qBefore: `["c", "b"]`,
        nbrs: `["e"]`,
        visited: `{"a", "c", "b", "e"}`,
        qAfter: `["b", "e"]`,
        output: ["a", "c"],
        activeNode: "c",
        queueNodes: ["b", "e"],
        visitedNodes: ["a", "c", "b", "e"],
        activeEdges: ["bfs-e-c-e"],
        narration: "Step 2: Dequeue 'c' from front. Explore neighbor 'e'. Enqueue 'e' and mark visited."
      },
      {
        curr: "b",
        qBefore: `["b", "e"]`,
        nbrs: `["d"]`,
        visited: `{"a", "c", "b", "e", "d"}`,
        qAfter: `["e", "d"]`,
        output: ["a", "c", "b"],
        activeNode: "b",
        queueNodes: ["e", "d"],
        visitedNodes: ["a", "c", "b", "e", "d"],
        activeEdges: ["bfs-e-b-d"],
        narration: "Step 3: Dequeue 'b'. Explore neighbor 'd'. Enqueue 'd' and mark visited."
      },
      {
        curr: "e",
        qBefore: `["e", "d"]`,
        nbrs: `[] (no outgoing edges)`,
        visited: `{"a", "c", "b", "e", "d"}`,
        qAfter: `["d"]`,
        output: ["a", "c", "b", "e"],
        activeNode: "e",
        queueNodes: ["d"],
        visitedNodes: ["a", "c", "b", "e", "d"],
        activeEdges: [],
        narration: "Step 4: Dequeue 'e'. Node 'e' has no outgoing edges. Nothing new to enqueue."
      },
      {
        curr: "d",
        qBefore: `["d"]`,
        nbrs: `["f"]`,
        visited: `{"a", "c", "b", "e", "d", "f"}`,
        qAfter: `["f"]`,
        output: ["a", "c", "b", "e", "d"],
        activeNode: "d",
        queueNodes: ["f"],
        visitedNodes: ["a", "c", "b", "e", "d", "f"],
        activeEdges: ["bfs-e-d-f"],
        narration: "Step 5: Dequeue 'd'. Explore neighbor 'f'. Enqueue 'f' and mark visited."
      },
      {
        curr: "f",
        qBefore: `["f"]`,
        nbrs: `[] (no outgoing edges)`,
        visited: `{"a", "c", "b", "e", "d", "f"}`,
        qAfter: `[]`,
        output: ["a", "c", "b", "e", "d", "f"],
        activeNode: "f",
        queueNodes: [],
        visitedNodes: ["a", "c", "b", "e", "d", "f"],
        activeEdges: [],
        narration: "Step 6: Dequeue 'f'. Node 'f' has no outgoing edges. Queue is now completely empty. BFS finished!"
      }
    ];

    let currentStep = 0;
    let isPlaying = false;
    let timer = null;

    const renderStep = (idx) => {
      const step = bfsSteps[idx];
      if (!step) return;

      const tdCurr = container.querySelector('#bfs-td-curr');
      const tdBefore = container.querySelector('#bfs-td-q-before');
      const tdNbrs = container.querySelector('#bfs-td-nbrs');
      const tdVisited = container.querySelector('#bfs-td-visited');
      const tdAfter = container.querySelector('#bfs-td-q-after');
      const narration = container.querySelector('#bfs-narration-box');
      const outputChips = container.querySelector('#bfs-output-chips');

      if (tdCurr) tdCurr.textContent = step.curr;
      if (tdBefore) tdBefore.textContent = step.qBefore;
      if (tdNbrs) tdNbrs.textContent = step.nbrs;
      if (tdVisited) tdVisited.textContent = step.visited;
      if (tdAfter) tdAfter.textContent = step.qAfter;
      if (narration) narration.textContent = step.narration;

      if (outputChips) {
        outputChips.innerHTML = step.output.map(n => `<span class="q-token" style="background:#10B981; color:#fff;">${n}</span>`).join(' &rarr; ');
      }

      // Reset and apply SVG highlights
      container.querySelectorAll('#bfs-sim-svg .graph-node-group').forEach(el => {
        el.classList.remove('graph-node-group--active', 'graph-node-group--queue', 'graph-node-group--visited');
      });
      container.querySelectorAll('#bfs-sim-svg .graph-edge').forEach(el => el.classList.remove('graph-edge--active'));

      step.visitedNodes.forEach(n => {
        const el = container.querySelector(`#bfs-n-${n}`);
        if (el) el.classList.add('graph-node-group--visited');
      });

      step.queueNodes.forEach(n => {
        const el = container.querySelector(`#bfs-n-${n}`);
        if (el) el.classList.add('graph-node-group--queue');
      });

      const currEl = container.querySelector(`#bfs-n-${step.activeNode}`);
      if (currEl) currEl.classList.add('graph-node-group--active');

      step.activeEdges.forEach(eId => {
        const el = container.querySelector(`#${eId}`);
        if (el) el.classList.add('graph-edge--active');
      });
    };

    renderStep(0);

    const btnNext = container.querySelector('#bfs-btn-next');
    const btnPrev = container.querySelector('#bfs-btn-prev');
    const btnPlay = container.querySelector('#bfs-btn-play');
    const btnReset = container.querySelector('#bfs-btn-reset');
    const speedSelect = container.querySelector('#bfs-speed-select');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < bfsSteps.length - 1) {
          currentStep++;
          renderStep(currentStep);
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          renderStep(currentStep);
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (timer) clearInterval(timer);
        isPlaying = false;
        if (btnPlay) btnPlay.textContent = 'Play';
        currentStep = 0;
        renderStep(0);
      });
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (isPlaying) {
          clearInterval(timer);
          isPlaying = false;
          btnPlay.textContent = 'Play';
        } else {
          isPlaying = true;
          btnPlay.textContent = 'Pause';
          const speed = speedSelect ? parseInt(speedSelect.value, 10) : 1200;
          timer = setInterval(() => {
            if (currentStep < bfsSteps.length - 1) {
              currentStep++;
              renderStep(currentStep);
            } else {
              clearInterval(timer);
              isPlaying = false;
              btnPlay.textContent = 'Replay';
              currentStep = 0;
            }
          }, speed);
        }
      });
    }
  },

  /* ------------------------------------------------------------------------
     QUESTIONS SUITE (Mini Quiz, Predict Output, Practice, LeetCode)
     ------------------------------------------------------------------------ */
  miniQuiz: [
    {
      question: "Q1. Which data structure is fundamentally required to implement Breadth-First Search?",
      options: [
        "A. Stack (LIFO)",
        "B. Queue (FIFO)",
        "C. Binary Search Tree",
        "D. Priority Heap"
      ],
      answer: "B",
      explanation: "BFS explores nodes layer by layer according to distance, which requires a First-In, First-Out (FIFO) Queue."
    },
    {
      question: "Q2. When should a node be added to the Visited Set in BFS?",
      options: [
        "A. Only after all its neighbors have been completely visited",
        "B. The moment it is pushed into the Queue",
        "C. When it is removed (shifted) from the Queue",
        "D. At the very end of the algorithm"
      ],
      answer: "B",
      explanation: "Marking a node visited at the moment of enqueuing guarantees that another neighbor cannot push the duplicate node into the queue, avoiding exponential memory explosion."
    },
    {
      question: "Q3. What is the time complexity of Breadth-First Search on a graph with V vertices and E edges?",
      options: [
        "A. O(V × E)",
        "B. O(V + E)",
        "C. O(V²)",
        "D. O(log V)"
      ],
      answer: "B",
      explanation: "Every vertex is enqueued/dequeued once (O(V)) and every incident edge is checked once/twice (O(E)), giving O(V + E)."
    },
    {
      question: "Q4. Why does BFS guarantee finding the shortest path in an unweighted graph?",
      options: [
        "A. Because it explores in descending order of node IDs",
        "B. Because it explores all nodes at distance d before ever exploring any node at distance d + 1",
        "C. Because it sorts the edges by length",
        "D. Because it uses recursion"
      ],
      answer: "B",
      explanation: "BFS explores level-by-level in non-decreasing order of path length (distance 0, then 1, then 2...). Therefore, the first time the destination node is encountered, it must be via the minimum number of edge hops."
    },
    {
      question: "Q5. If an unweighted graph contains multiple disconnected components, how can BFS visit all nodes?",
      options: [
        "A. BFS automatically jumps across components",
        "B. Wrap BFS in an outer loop iterating over all vertices; start a new BFS from any unvisited node",
        "C. Convert the graph into a tree first",
        "D. Disconnected graphs cannot be traversed"
      ],
      answer: "B",
      explanation: "A single BFS from one node only visits its connected component. To traverse the entire graph, iterate through every vertex in a loop and initiate BFS if the vertex has not yet been visited."
    }
  ],

  predictOutput: [
    {
      code: `const graph = {
  1: [2, 3],
  2: [4],
  3: [],
  4: []
};
const q = [1];
const out = [];
while (q.length > 0) {
  const curr = q.shift();
  out.push(curr);
  for (const n of graph[curr]) q.push(n);
}
console.log(out.join(', '));`,
      options: [
        "1, 2, 4, 3",
        "1, 2, 3, 4",
        "1, 3, 2, 4",
        "4, 3, 2, 1"
      ],
      answer: "1, 2, 3, 4",
      explanation: "Node 1 is processed first, enqueuing 2 and 3. Then 2 is processed, enqueuing 4. Then 3 is processed. Finally 4 is processed: 1, 2, 3, 4."
    },
    {
      code: `const edges = [['A', 'B'], ['B', 'C'], ['C', 'D']];
// Shortest path hops from A to D:
console.log(shortestPath(edges, 'A', 'D'));`,
      options: [
        "2",
        "3",
        "4",
        "-1"
      ],
      answer: "3",
      explanation: "Path A -> B (1 hop) -> C (2 hops) -> D (3 hops). The shortest path distance is 3."
    },
    {
      code: `const queue = [10];
let head = 0;
queue.push(20);
const curr = queue[head++];
console.log(curr, queue.length - head);`,
      options: [
        "10, 1",
        "20, 1",
        "10, 2",
        "undefined, 0"
      ],
      answer: "10, 1",
      explanation: "queue[0] returns 10, head becomes 1. Remaining active elements: queue.length - head = 2 - 1 = 1 (element 20)."
    }
  ],

  practice: [
    {
      q: "Implement an iterative function `bfsPrint(graph, source)` that logs all reachable nodes starting from `source` using a Queue.",
      a: "function bfsPrint(graph, source) {\n  const queue = [source];\n  const visited = new Set([source]);\n  while (queue.length > 0) {\n    const curr = queue.shift();\n    console.log(curr);\n    for (const neighbor of graph[curr] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}"
    },
    {
      q: "Write a function `shortestPathLength(graph, src, dst)` that returns the minimum number of edges between src and dst, or -1 if unreachable.",
      a: "function shortestPathLength(graph, src, dst) {\n  const queue = [[src, 0]];\n  const visited = new Set([src]);\n  while (queue.length > 0) {\n    const [node, dist] = queue.shift();\n    if (node === dst) return dist;\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push([neighbor, dist + 1]);\n      }\n    }\n  }\n  return -1;\n}"
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 994 — Rotting Oranges (multi-source BFS), then 1091 — Shortest Path in Binary Matrix.",
    problems: [
      { num: 994, title: "Rotting Oranges", concept: "Multi-Source BFS Layer by Layer", slug: "rotting-oranges", isSuggestedStart: true, isImmediateNext: true },
      { num: 1091, title: "Shortest Path in Binary Matrix", concept: "8-Directional Grid Shortest Path", slug: "shortest-path-in-binary-matrix" },
      { num: 200, title: "Number of Islands", concept: "Grid Connected Components via BFS", slug: "number-of-islands" },
      { num: 127, title: "Word Ladder", concept: "Shortest Path in Word Transformation Graph", slug: "word-ladder" }
    ]
  }
};

/* ==========================================================================
   LESSON 33: DEPTH-FIRST SEARCH (Topic 33)
   ========================================================================== */
window.LESSONS_CONTENT["depth-first-search"] = {
  id: "depth-first-search",
  title: "Depth-First Search (DFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Explore graphs deeply along branches before backtracking using Recursion and Call Stacks. Master 6 classic graph problems including Island Count and Connected Components.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS DFS & REAL-WORLD ANALOGY?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-dfs",
      title: "1. What is Depth-First Search & Real-World Analogy?",
      tocTitle: "1. What is DFS?",
      contentHtml: `
        <p><strong>Depth-First Search (DFS)</strong> is an exploration strategy that plunges as deep as possible down a single branch before <strong>backtracking</strong> to the previous junction to try another route.</p>

        <h3 style="margin:20px 0 10px 0; font-size:1.05rem; color:var(--text-primary);">Real-World Analogy: Navigating a Maze</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Imagine entering a hedge maze:
        </p>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
          <li>You choose a path and walk straight ahead until you hit a <strong>dead end</strong>.</li>
          <li>At the dead end, you turn around, retrace your steps back to the most recent intersection (<strong>backtrack</strong>), and try the next unexplored path.</li>
          <li>You mark breadcrumbs on paths you've already walked so you never walk in circles (<strong>visited set</strong>).</li>
        </ul>
        <p style="color:var(--text-secondary); line-height:1.6;">
          That is Depth-First Search! While BFS spreads outwards evenly in waves, DFS sprints down a single line of sight until it can go no further.
        </p>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: UNDERSTAND RECURSION AND THE CALL STACK
       ------------------------------------------------------------------------ */
    {
      id: "section-understand-recursion",
      title: "2. The Call Stack Engine & Recursion Visualized",
      tocTitle: "2. Recursion & Stack",
      contentHtml: `
        <p>To understand DFS, you must understand how the JavaScript engine executes <strong>recursive functions</strong> using its internal <strong>Call Stack (LIFO: Last In, First Out)</strong>:</p>

        <pre class="code-block" style="margin:16px 0;"><code>function countDown(n) {
  if (n === 0) return; // Base Case: Stop recursion!

  console.log(n);

  countDown(n - 1);   // Recursive Call: Solve subproblem
}

countDown(3);</code></pre>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:12px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 10px 0; color:var(--accent-primary); font-size:0.95rem;">Function Call Stack Lifecycle:</h4>
          <div style="display:flex; flex-direction:column; gap:6px; font-family:'Fira Code',monospace; font-size:0.88rem;">
            <div style="background:rgba(99, 102, 241, 0.2); border:1px solid var(--accent-primary); padding:6px 12px; border-radius:6px; color:var(--text-primary);">
              4. countDown(0) &rarr; Hits base case (n === 0), returns immediately! [POPPED]
            </div>
            <div style="background:rgba(99, 102, 241, 0.15); border:1px solid var(--border-default); padding:6px 12px; border-radius:6px; color:var(--text-primary);">
              3. countDown(1) &rarr; Prints 1, calls countDown(0)
            </div>
            <div style="background:rgba(99, 102, 241, 0.1); border:1px solid var(--border-default); padding:6px 12px; border-radius:6px; color:var(--text-primary);">
              2. countDown(2) &rarr; Prints 2, calls countDown(1)
            </div>
            <div style="background:rgba(99, 102, 241, 0.05); border:1px solid var(--border-default); padding:6px 12px; border-radius:6px; color:var(--text-primary);">
              1. countDown(3) &rarr; Prints 3, calls countDown(2) [INITIAL CALL]
            </div>
          </div>
          <p style="margin:12px 0 0 0; color:var(--text-secondary); font-size:0.85rem; line-height:1.5;">
            When <code>countDown(0)</code> returns, the stack unwinds in reverse order (backtracking). DFS uses this exact mechanism to remember all prior decision points!
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: CANONICAL GRAPH & TRAVERSAL WALKTHROUGH
       ------------------------------------------------------------------------ */
    {
      id: "section-canonical-dfs",
      title: "3. Canonical Graph & Expected DFS Traversal",
      tocTitle: "3. Traversal Walkthrough",
      contentHtml: `
        <p>Using the same canonical directed graph as before:</p>

        <pre class="code-block" style="margin:16px 0;"><code>const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: []
};</code></pre>

        <div style="background:rgba(99, 102, 241, 0.12); border:1px solid rgba(99, 102, 241, 0.3); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 6px 0; color:var(--accent-primary); font-size:0.98rem;">Expected DFS Traversal Sequence:</h4>
          <div style="font-family:'Fira Code',monospace; font-size:1.1rem; font-weight:700; color:var(--accent-primary);">
            a &rarr; c &rarr; e &rarr; b &rarr; d &rarr; f
          </div>
          <p style="margin:6px 0 0 0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
            Notice the crucial difference from BFS: from <code>a</code>, DFS immediately dives deep into <code>c</code>, and from <code>c</code> directly into <code>e</code> before ever returning to visit <code>b</code>!
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: INTERACTIVE STEP-BY-STEP DFS VISUALIZER
       ------------------------------------------------------------------------ */
    {
      id: "section-dfs-visualizer",
      title: "4. Interactive Step-by-Step DFS Visualizer",
      tocTitle: "4. DFS Visualizer",
      contentHtml: `
        <p>Step through recursive execution. Watch stack frames get pushed as DFS explores deeper, and popped as it backtracks:</p>

        <div class="hash-widget-card" id="dfs-visualizer-widget">
          <div class="hash-widget-header">
            <span class="hash-widget-title">DFS Recursion Stack Engine</span>
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn" id="dfs-btn-prev">Previous</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="dfs-btn-play">Play</button>
              <button class="hash-ctrl-btn" id="dfs-btn-next">Next</button>
              <button class="hash-ctrl-btn" id="dfs-btn-reset">Reset</button>
              <select id="dfs-speed-select" class="hash-ctrl-btn" style="padding:4px 8px;">
                <option value="1200">1x Speed</option>
                <option value="600">2x Speed</option>
                <option value="2000">0.5x Speed</option>
              </select>
            </div>
          </div>

          <!-- SVG Visual Canvas -->
          <div class="graph-svg-container" style="margin:12px 0;">
            <svg class="graph-svg-canvas" viewBox="0 0 340 180" id="dfs-sim-svg">
              <defs>
                <marker id="dfs-arr" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)"></path>
                </marker>
              </defs>
              <line id="dfs-e-a-c" class="graph-edge graph-edge--directed" x1="60" y1="40" x2="170" y2="40" marker-end="url(#dfs-arr)" />
              <line id="dfs-e-a-b" class="graph-edge graph-edge--directed" x1="60" y1="40" x2="60" y2="130" marker-end="url(#dfs-arr)" />
              <line id="dfs-e-b-d" class="graph-edge graph-edge--directed" x1="60" y1="130" x2="170" y2="130" marker-end="url(#dfs-arr)" />
              <line id="dfs-e-c-e" class="graph-edge graph-edge--directed" x1="170" y1="40" x2="280" y2="40" marker-end="url(#dfs-arr)" />
              <line id="dfs-e-d-f" class="graph-edge graph-edge--directed" x1="170" y1="130" x2="280" y2="130" marker-end="url(#dfs-arr)" />

              <g class="graph-node-group" id="dfs-n-a" transform="translate(60, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">a</text></g>
              <g class="graph-node-group" id="dfs-n-b" transform="translate(60, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">b</text></g>
              <g class="graph-node-group" id="dfs-n-c" transform="translate(170, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">c</text></g>
              <g class="graph-node-group" id="dfs-n-d" transform="translate(170, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">d</text></g>
              <g class="graph-node-group" id="dfs-n-e" transform="translate(280, 40)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">e</text></g>
              <g class="graph-node-group" id="dfs-n-f" transform="translate(280, 130)"><circle class="graph-node-circle" r="18"/><text class="graph-node-text">f</text></g>
            </svg>
          </div>

          <!-- DFS State Table -->
          <div style="overflow-x:auto;">
            <table class="hash-state-table" id="dfs-trace-table">
              <thead>
                <tr>
                  <th>Active Node</th>
                  <th>Current Recursive Call</th>
                  <th>Call Stack Frames</th>
                  <th>Visited Set</th>
                  <th>Event / Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="dfs-td-curr" style="font-weight:700; color:#F59E0B;">a</td>
                  <td id="dfs-td-call">dfs('a')</td>
                  <td id="dfs-td-stack">['a']</td>
                  <td id="dfs-td-visited">Set {'a'}</td>
                  <td id="dfs-td-event" style="color:#10B981; font-weight:600;">Push dfs('a')</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Traversal Output -->
          <div style="display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:wrap;">
            <span style="font-weight:700; font-size:0.85rem; color:var(--text-muted);">DFS VISITED ORDER:</span>
            <div id="dfs-output-chips" style="display:flex; gap:6px; flex-wrap:wrap;"></div>
          </div>

          <!-- Narration Box -->
          <div class="hash-narration-box" id="dfs-narration-box" style="margin-top:12px;">
            Step 1: Invoke dfs('a'). Mark 'a' visited and push to call stack.
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: JAVASCRIPT IMPLEMENTATIONS (RECURSIVE & ITERATIVE)
       ------------------------------------------------------------------------ */
    {
      id: "section-dfs-implementations",
      title: "5. Recursive and Iterative DFS Implementations",
      tocTitle: "5. JS Code & Traps",
      contentHtml: `
        <h4 style="color:var(--text-primary); margin-top:0;">Implementation 1: Recursive DFS</h4>
        <pre class="code-block"><code>const depthFirstPrint = (graph, source, visited = new Set()) => {
  // Base Case: If already visited, stop recursion to prevent cycles!
  if (visited.has(source)) return;

  visited.add(source);
  console.log(source);

  for (const neighbor of graph[source] || []) {
    depthFirstPrint(graph, neighbor, visited); // Recurse on neighbor
  }
};</code></pre>

        <div style="background:rgba(239, 68, 68, 0.12); border:1px solid rgba(239, 68, 68, 0.3); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 6px 0; color:#EF4444; font-size:0.95rem;">Why is the Visited Set Required? Cycle Trap!</h4>
          <p style="margin:0; color:var(--text-primary); font-size:0.88rem; line-height:1.6;">
            If your graph contains a cycle (<code>A &rarr; B &rarr; C &rarr; A</code>), omitting <code>visited</code> causes infinite recursion until the JavaScript engine crashes with <code>RangeError: Maximum call stack size exceeded</code>! With <code>visited.has(source)</code>, each node is processed at most once.
          </p>
        </div>

        <h4 style="color:var(--text-primary); margin:24px 0 8px 0;">Implementation 2: Iterative DFS using an Explicit Stack</h4>
        <p style="color:var(--text-secondary); line-height:1.6;">
          For extremely deep graphs (e.g. 50,000 nodes in a line), recursive calls can exceed the call stack limit. Iterative DFS avoids this by using an array as an explicit LIFO Stack on the Heap:
        </p>

        <pre class="code-block"><code>const depthFirstIterative = (graph, source) => {
  const stack = [source];
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop(); // Pop from top of stack (LIFO)

    if (visited.has(current)) continue;

    visited.add(current);
    console.log(current);

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
};</code></pre>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 6: 6 CORE DFS PROBLEMS (STRUCTY PATTERNS)
       ------------------------------------------------------------------------ */
    {
      id: "section-six-dfs-problems",
      title: "6. Master 6 Classic DFS Coding Problems",
      tocTitle: "6. 6 DFS Problems",
      contentHtml: `
        <p>Master these 6 cornerstone problems. They cover the exact patterns tested in top tech interviews:</p>

        <!-- Problem 1: Has Path -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-1">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 1</span>
              <span class="graph-prob-title">Has Path (Directed Graph)</span>
              <span class="badge" style="background:rgba(16, 185, 129, 0.2); color:#10B981; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Easy</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-1">
            <p><strong>Statement:</strong> Given a directed graph, a source node, and a destination node, return <code>true</code> if there is a path from source to destination, otherwise <code>false</code>.</p>
            <div class="graph-prob-dryrun">
              <strong>Base Case:</strong> <code>if (src === dst) return true;</code><br/>
              If we reach the destination at any point in our recursion, bubble <code>true</code> all the way back up!
            </div>
            <pre class="code-block"><code>const hasPath = (graph, src, dst, visited = new Set()) => {
  if (src === dst) return true;
  if (visited.has(src)) return false;

  visited.add(src);

  for (const neighbor of graph[src] || []) {
    if (hasPath(graph, neighbor, dst, visited)) {
      return true;
    }
  }

  return false;
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(V + E) | Space: O(V)
            </div>
          </div>
        </div>

        <!-- Problem 2: Undirected Path -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-2">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 2</span>
              <span class="graph-prob-title">Undirected Path (From Edge List)</span>
              <span class="badge" style="background:rgba(16, 185, 129, 0.2); color:#10B981; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Easy</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-2">
            <p><strong>Statement:</strong> Given an edge list representing an undirected graph, return true if a path exists between <code>nodeA</code> and <code>nodeB</code>.</p>
            <div class="graph-prob-dryrun">
              <strong>Edge List:</strong> <code>[['i', 'j'], ['k', 'i'], ['m', 'k'], ['k', 'l'], ['o', 'n']]</code><br/>
              Visualizes 2 disconnected groups: <code>{i, j, k, l, m}</code> and <code>{o, n}</code>.<br/>
              <code>undirectedPath(edges, 'j', 'm')</code> &rarr; <code>true</code><br/>
              <code>undirectedPath(edges, 'j', 'o')</code> &rarr; <code>false</code>
            </div>
            <pre class="code-block"><code>const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
};

const buildGraph = (edges) => {
  const graph = {};
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(V + E) | Space: O(V)
            </div>
          </div>
        </div>

        <!-- Problem 3: Connected Components Count -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-3">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 3</span>
              <span class="graph-prob-title">Connected Components Count</span>
              <span class="badge" style="background:rgba(245, 158, 11, 0.2); color:#F59E0B; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Medium</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-3">
            <p><strong>Statement:</strong> Given an undirected graph, return the total count of isolated connected components.</p>
            <div class="graph-prob-dryrun">
              <strong>Example Graph:</strong><br/>
              <code>{ 0: [8, 1, 5], 1: [0], 5: [0, 8], 8: [0, 5], 2: [3, 4], 3: [2, 4], 4: [3, 2] }</code><br/>
              Contains 2 distinct components: Group 1 <code>{0, 1, 5, 8}</code> and Group 2 <code>{2, 3, 4}</code>.<br/>
              <strong>Expected Output:</strong> <code>2</code>
            </div>
            <pre class="code-block"><code>const connectedComponentsCount = (graph) => {
  const visited = new Set();
  let count = 0;

  for (const node in graph) {
    // Only increment count when a brand-new component is traversed!
    if (explore(graph, node, visited) === true) {
      count++;
    }
  }

  return count;
};

const explore = (graph, current, visited) => {
  if (visited.has(String(current))) return false;

  visited.add(String(current));

  for (const neighbor of graph[current] || []) {
    explore(graph, neighbor, visited);
  }

  return true; // Successfully traversed a new component!
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(V + E) | Space: O(V)
            </div>
          </div>
        </div>

        <!-- Problem 4: Largest Component -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-4">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 4</span>
              <span class="graph-prob-title">Largest Component Size</span>
              <span class="badge" style="background:rgba(245, 158, 11, 0.2); color:#F59E0B; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Medium</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-4">
            <p><strong>Statement:</strong> Given an undirected graph, return the size of the largest connected component.</p>
            <div class="graph-prob-dryrun">
              Using the same graph: Group 1 has 4 nodes <code>{0, 1, 5, 8}</code>, Group 2 has 3 nodes <code>{2, 3, 4}</code>.<br/>
              <strong>Expected Output:</strong> <code>4</code>
            </div>
            <pre class="code-block"><code>const largestComponent = (graph) => {
  const visited = new Set();
  let longest = 0;

  for (const node in graph) {
    const size = exploreSize(graph, node, visited);
    if (size > longest) longest = size;
  }

  return longest;
};

const exploreSize = (graph, node, visited) => {
  if (visited.has(String(node))) return 0; // Return 0 if already counted!

  visited.add(String(node));

  let size = 1; // Count current node

  for (const neighbor of graph[node] || []) {
    size += exploreSize(graph, neighbor, visited);
  }

  return size;
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(V + E) | Space: O(V)
            </div>
          </div>
        </div>

        <!-- Problem 5: Island Count -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-5">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 5</span>
              <span class="graph-prob-title">Island Count (2D Grid DFS)</span>
              <span class="badge" style="background:rgba(239, 68, 68, 0.2); color:#EF4444; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Classic Interview</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-5">
            <p><strong>Statement:</strong> Given an <code>R &times; C</code> 2D grid containing <code>'W'</code> (water) and <code>'L'</code> (land), return the number of distinct islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically (diagonals do not count!).</p>

            <!-- Interactive 2D Grid Visualizer -->
            <div style="background:var(--bg-body); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:12px 0;">
              <h4 style="margin:0 0 6px 0; font-size:0.92rem; color:var(--text-primary);">Interactive 4 &times; 4 Island Grid:</h4>
              <p style="margin:0 0 12px 0; color:var(--text-secondary); font-size:0.85rem;">Click <strong>"Animate Island Count"</strong> to run DFS and watch islands get colored in real time:</p>
              
              <div class="graph-island-grid" id="island-sim-grid">
                <!-- Row 0 -->
                <div class="island-cell island-cell--land" data-r="0" data-c="0">L</div>
                <div class="island-cell island-cell--water" data-r="0" data-c="1">W</div>
                <div class="island-cell island-cell--land" data-r="0" data-c="2">L</div>
                <div class="island-cell island-cell--land" data-r="0" data-c="3">L</div>
                <!-- Row 1 -->
                <div class="island-cell island-cell--land" data-r="1" data-c="0">L</div>
                <div class="island-cell island-cell--water" data-r="1" data-c="1">W</div>
                <div class="island-cell island-cell--water" data-r="1" data-c="2">W</div>
                <div class="island-cell island-cell--land" data-r="1" data-c="3">L</div>
                <!-- Row 2 -->
                <div class="island-cell island-cell--water" data-r="2" data-c="0">W</div>
                <div class="island-cell island-cell--land" data-r="2" data-c="1">L</div>
                <div class="island-cell island-cell--water" data-r="2" data-c="2">W</div>
                <div class="island-cell island-cell--water" data-r="2" data-c="3">W</div>
                <!-- Row 3 -->
                <div class="island-cell island-cell--land" data-r="3" data-c="0">L</div>
                <div class="island-cell island-cell--land" data-r="3" data-c="1">L</div>
                <div class="island-cell island-cell--water" data-r="3" data-c="2">W</div>
                <div class="island-cell island-cell--land" data-r="3" data-c="3">L</div>
              </div>

              <div style="display:flex; justify-content:center; gap:10px; margin-top:12px;">
                <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-run-island-dfs">Animate Island Count</button>
                <button class="hash-ctrl-btn" id="btn-reset-island-dfs">Reset Grid</button>
              </div>
              <div style="text-align:center; margin-top:10px; font-weight:700; color:var(--accent-primary);" id="island-result-label">
                Found: 0 Islands
              </div>
            </div>

            <pre class="code-block"><code>const islandCount = (grid) => {
  const visited = new Set();
  let count = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (exploreIsland(grid, r, c, visited) === true) {
        count++;
      }
    }
  }

  return count;
};

const exploreIsland = (grid, r, c, visited) => {
  // 1. Boundary checks
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return false;

  // 2. Water check
  if (grid[r][c] === 'W') return false;

  // 3. Visited check
  const pos = r + ',' + c;
  if (visited.has(pos)) return false;
  visited.add(pos);

  // 4. Explore 4 cardinal directions (Up, Down, Left, Right)
  exploreIsland(grid, r - 1, c, visited); // Up
  exploreIsland(grid, r + 1, c, visited); // Down
  exploreIsland(grid, r, c - 1, visited); // Left
  exploreIsland(grid, r, c + 1, visited); // Right

  return true;
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(R &times; C) | Space: O(R &times; C)
            </div>
          </div>
        </div>

        <!-- Problem 6: Minimum Island -->
        <div class="graph-prob-card">
          <div class="graph-prob-header" data-toggle="prob-6">
            <div class="graph-prob-title-row">
              <span class="graph-prob-num">Problem 6</span>
              <span class="graph-prob-title">Minimum Island Size</span>
              <span class="badge" style="background:rgba(239, 68, 68, 0.2); color:#EF4444; font-weight:700; font-size:0.75rem; padding:2px 8px; border-radius:4px;">Classic Interview</span>
            </div>
            <span class="prob-chevron">&#9662;</span>
          </div>
          <div class="graph-prob-body" id="prob-6">
            <p><strong>Statement:</strong> Given the same grid, return the size of the smallest island (minimum number of connected land cells). Guaranteed at least one island exists.</p>
            <div class="graph-prob-dryrun">
              <strong>Key Trick:</strong> Initialize <code>minSize = Infinity</code> (not zero!).<br/>
              Calculate the size of each island using <code>exploreSize</code>, and take <code>Math.min(minSize, size)</code>.<br/>
              In the sample grid, isolated land cells at <code>(2, 1)</code> and <code>(3, 3)</code> have size <code>1</code>.<br/>
              <strong>Expected Output:</strong> <code>1</code>
            </div>
            <pre class="code-block"><code>const minimumIsland = (grid) => {
  const visited = new Set();
  let minSize = Infinity; // Crucial: Start with Infinity!

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const size = exploreIslandSize(grid, r, c, visited);
      if (size > 0 && size < minSize) {
        minSize = size;
      }
    }
  }

  return minSize;
};

const exploreIslandSize = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return 0;
  if (grid[r][c] === 'W') return 0;

  const pos = r + ',' + c;
  if (visited.has(pos)) return 0;
  visited.add(pos);

  let size = 1;
  size += exploreIslandSize(grid, r - 1, c, visited); // Up
  size += exploreIslandSize(grid, r + 1, c, visited); // Down
  size += exploreIslandSize(grid, r, c - 1, visited); // Left
  size += exploreIslandSize(grid, r, c + 1, visited); // Right

  return size;
};</code></pre>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <strong>Complexity:</strong> Time: O(R &times; C) | Space: O(R &times; C)
            </div>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 7: UNIVERSAL GRAPH COMPLEXITY TABLE
       ------------------------------------------------------------------------ */
    {
      id: "section-universal-complexity",
      title: "7. Universal Complexity Guide for Graph Algorithms",
      tocTitle: "7. Complexity Guide",
      contentHtml: `
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Algorithm / Problem</th>
                <th>Time Complexity</th>
                <th>Space Complexity</th>
                <th>Key Constraint / Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Breadth-First Search (BFS)</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Uses FIFO Queue; finds shortest path in unweighted networks</td>
              </tr>
              <tr>
                <td><strong>Depth-First Search (DFS)</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Uses Call Stack / Recursion; explores depth first</td>
              </tr>
              <tr>
                <td><strong>Has Path (DFS / BFS)</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Early return as soon as destination node is reached</td>
              </tr>
              <tr>
                <td><strong>Undirected Path</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Requires building symmetric edges in both directions</td>
              </tr>
              <tr>
                <td><strong>Connected Components Count</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Outer loop + recursive traversal</td>
              </tr>
              <tr>
                <td><strong>Largest Component Size</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Accumulates subtree sizes with <code>size = 1 + ...</code></td>
              </tr>
              <tr>
                <td><strong>Shortest Path (Unweighted)</strong></td>
                <td><code>O(V + E)</code></td>
                <td><code>O(V)</code></td>
                <td>Must use BFS with distance tuples: <code>[node, dist]</code></td>
              </tr>
              <tr>
                <td><strong>Island Count (2D Grid)</strong></td>
                <td><code>O(R &times; C)</code></td>
                <td><code>O(R &times; C)</code></td>
                <td>R = rows, C = cols; 4-directional DFS with coordinate set</td>
              </tr>
              <tr>
                <td><strong>Minimum Island Size</strong></td>
                <td><code>O(R &times; C)</code></td>
                <td><code>O(R &times; C)</code></td>
                <td>Initialize <code>minSize = Infinity</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT INTERACTIVE DFS STEPPER & ISLAND GRID
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    // 1. Accordion Card Toggles
    container.querySelectorAll('.graph-prob-header').forEach(header => {
      header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-toggle');
        const body = container.querySelector(`#${targetId}`);
        const chevron = header.querySelector('.prob-chevron');
        if (body) {
          const isHidden = body.style.display === 'none';
          body.style.display = isHidden ? 'flex' : 'none';
          if (chevron) chevron.innerHTML = isHidden ? '&#9662;' : '&#9656;';
        }
      });
    });

    // 2. DFS Stepper Engine
    const dfsSteps = [
      {
        curr: "a",
        call: "dfs('a')",
        stack: "['a']",
        visited: "Set {'a'}",
        event: "Invoke dfs('a') -> Push to stack",
        output: ["a"],
        activeNode: "a",
        visitedNodes: ["a"],
        activeEdges: ["dfs-e-a-c"],
        narration: "Step 1: Start at source 'a'. Push dfs('a') onto call stack. Visit first neighbor 'c'."
      },
      {
        curr: "c",
        call: "dfs('c')",
        stack: "['a', 'c']",
        visited: "Set {'a', 'c'}",
        event: "Invoke dfs('c') -> Push to stack",
        output: ["a", "c"],
        activeNode: "c",
        visitedNodes: ["a", "c"],
        activeEdges: ["dfs-e-c-e"],
        narration: "Step 2: DIVE DEEP! Visit 'c'. Push dfs('c'). Explore neighbor of 'c': 'e'."
      },
      {
        curr: "e",
        call: "dfs('e')",
        stack: "['a', 'c', 'e']",
        visited: "Set {'a', 'c', 'e'}",
        event: "Invoke dfs('e') -> Push to stack",
        output: ["a", "c", "e"],
        activeNode: "e",
        visitedNodes: ["a", "c", "e"],
        activeEdges: [],
        narration: "Step 3: DIVE DEEP! Visit 'e'. Push dfs('e'). Node 'e' has no neighbors (Dead End!)."
      },
      {
        curr: "c",
        call: "dfs('c')",
        stack: "['a', 'c']",
        visited: "Set {'a', 'c', 'e'}",
        event: "dfs('e') returns -> Backtrack to 'c'",
        output: ["a", "c", "e"],
        activeNode: "c",
        visitedNodes: ["a", "c", "e"],
        activeEdges: [],
        narration: "Step 4: BACKTRACK! dfs('e') finishes and is popped from call stack. Return to caller 'c'."
      },
      {
        curr: "a",
        call: "dfs('a')",
        stack: "['a']",
        visited: "Set {'a', 'c', 'e'}",
        event: "dfs('c') returns -> Backtrack to 'a'",
        output: ["a", "c", "e"],
        activeNode: "a",
        visitedNodes: ["a", "c", "e"],
        activeEdges: ["dfs-e-a-b"],
        narration: "Step 5: BACKTRACK! dfs('c') finishes. Return to 'a'. Now explore 'a's second neighbor: 'b'!"
      },
      {
        curr: "b",
        call: "dfs('b')",
        stack: "['a', 'b']",
        visited: "Set {'a', 'c', 'e', 'b'}",
        event: "Invoke dfs('b') -> Push to stack",
        output: ["a", "c", "e", "b"],
        activeNode: "b",
        visitedNodes: ["a", "c", "e", "b"],
        activeEdges: ["dfs-e-b-d"],
        narration: "Step 6: Explore 'b'. Push dfs('b'). Visit neighbor 'd'."
      },
      {
        curr: "d",
        call: "dfs('d')",
        stack: "['a', 'b', 'd']",
        visited: "Set {'a', 'c', 'e', 'b', 'd'}",
        event: "Invoke dfs('d') -> Push to stack",
        output: ["a", "c", "e", "b", "d"],
        activeNode: "d",
        visitedNodes: ["a", "c", "e", "b", "d"],
        activeEdges: ["dfs-e-d-f"],
        narration: "Step 7: Visit 'd'. Push dfs('d'). Visit neighbor 'f'."
      },
      {
        curr: "f",
        call: "dfs('f')",
        stack: "['a', 'b', 'd', 'f']",
        visited: "Set {'a', 'c', 'e', 'b', 'd', 'f'}",
        event: "Invoke dfs('f') -> Push to stack",
        output: ["a", "c", "e", "b", "d", "f"],
        activeNode: "f",
        visitedNodes: ["a", "c", "e", "b", "d", "f"],
        activeEdges: [],
        narration: "Step 8: Visit 'f'. Push dfs('f'). Dead end reached. All calls unwind. DFS complete!"
      }
    ];

    let currentDfsStep = 0;
    let isDfsPlaying = false;
    let dfsTimer = null;

    const renderDfsStep = (idx) => {
      const step = dfsSteps[idx];
      if (!step) return;

      const tdCurr = container.querySelector('#dfs-td-curr');
      const tdCall = container.querySelector('#dfs-td-call');
      const tdStack = container.querySelector('#dfs-td-stack');
      const tdVisited = container.querySelector('#dfs-td-visited');
      const tdEvent = container.querySelector('#dfs-td-event');
      const narration = container.querySelector('#dfs-narration-box');
      const outputChips = container.querySelector('#dfs-output-chips');

      if (tdCurr) tdCurr.textContent = step.curr;
      if (tdCall) tdCall.textContent = step.call;
      if (tdStack) tdStack.textContent = step.stack;
      if (tdVisited) tdVisited.textContent = step.visited;
      if (tdEvent) tdEvent.textContent = step.event;
      if (narration) narration.textContent = step.narration;

      if (outputChips) {
        outputChips.innerHTML = step.output.map(n => `<span class="q-token" style="background:#6366F1; color:#fff;">${n}</span>`).join(' &rarr; ');
      }

      container.querySelectorAll('#dfs-sim-svg .graph-node-group').forEach(el => {
        el.classList.remove('graph-node-group--active', 'graph-node-group--visited');
      });
      container.querySelectorAll('#dfs-sim-svg .graph-edge').forEach(el => el.classList.remove('graph-edge--active'));

      step.visitedNodes.forEach(n => {
        const el = container.querySelector(`#dfs-n-${n}`);
        if (el) el.classList.add('graph-node-group--visited');
      });

      const currEl = container.querySelector(`#dfs-n-${step.activeNode}`);
      if (currEl) currEl.classList.add('graph-node-group--active');

      step.activeEdges.forEach(eId => {
        const el = container.querySelector(`#${eId}`);
        if (el) el.classList.add('graph-edge--active');
      });
    };

    renderDfsStep(0);

    const btnNext = container.querySelector('#dfs-btn-next');
    const btnPrev = container.querySelector('#dfs-btn-prev');
    const btnPlay = container.querySelector('#dfs-btn-play');
    const btnReset = container.querySelector('#dfs-btn-reset');
    const speedSelect = container.querySelector('#dfs-speed-select');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentDfsStep < dfsSteps.length - 1) {
          currentDfsStep++;
          renderDfsStep(currentDfsStep);
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentDfsStep > 0) {
          currentDfsStep--;
          renderDfsStep(currentDfsStep);
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (dfsTimer) clearInterval(dfsTimer);
        isDfsPlaying = false;
        if (btnPlay) btnPlay.textContent = 'Play';
        currentDfsStep = 0;
        renderDfsStep(0);
      });
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (isDfsPlaying) {
          clearInterval(dfsTimer);
          isDfsPlaying = false;
          btnPlay.textContent = 'Play';
        } else {
          isDfsPlaying = true;
          btnPlay.textContent = 'Pause';
          const speed = speedSelect ? parseInt(speedSelect.value, 10) : 1200;
          dfsTimer = setInterval(() => {
            if (currentDfsStep < dfsSteps.length - 1) {
              currentDfsStep++;
              renderDfsStep(currentDfsStep);
            } else {
              clearInterval(dfsTimer);
              isDfsPlaying = false;
              btnPlay.textContent = 'Replay';
              currentDfsStep = 0;
            }
          }, speed);
        }
      });
    }

    // 3. Island Count Grid Animation
    const islandCells = [
      // Island 1: Top-left
      { r: 0, c: 0, island: 1, color: '#10B981' },
      { r: 1, c: 0, island: 1, color: '#10B981' },
      { r: 3, c: 0, island: 1, color: '#10B981' },
      { r: 3, c: 1, island: 1, color: '#10B981' },
      // Island 2: Top-right
      { r: 0, c: 2, island: 2, color: '#6366F1' },
      { r: 0, c: 3, island: 2, color: '#6366F1' },
      { r: 1, c: 3, island: 2, color: '#6366F1' },
      // Island 3: Middle (Size 1!)
      { r: 2, c: 1, island: 3, color: '#F59E0B' },
      // Island 4: Bottom-right (Size 1!)
      { r: 3, c: 3, island: 4, color: '#EC4899' }
    ];

    const btnRunIsland = container.querySelector('#btn-run-island-dfs');
    const btnResetIsland = container.querySelector('#btn-reset-island-dfs');
    const labelResult = container.querySelector('#island-result-label');

    if (btnRunIsland) {
      btnRunIsland.addEventListener('click', () => {
        btnRunIsland.disabled = true;
        let idx = 0;
        const interval = setInterval(() => {
          if (idx < islandCells.length) {
            const item = islandCells[idx];
            const cell = container.querySelector(`.island-cell[data-r="${item.r}"][data-c="${item.c}"]`);
            if (cell) {
              cell.style.backgroundColor = item.color;
              cell.style.borderColor = '#fff';
              cell.style.color = '#fff';
              cell.classList.add('island-cell--active');
            }
            if (labelResult) {
              labelResult.textContent = `Exploring Island ${item.island}... (Cell ${item.r}, ${item.c})`;
            }
            idx++;
          } else {
            clearInterval(interval);
            if (labelResult) {
              labelResult.innerHTML = `Traversal Complete! <span style="color:#10B981;">Total: 4 Islands</span>. Smallest Island Size: <span style="color:#F59E0B;">1 (at [2,1] & [3,3])</span>`;
            }
            btnRunIsland.disabled = false;
          }
        }, 350);
      });
    }

    if (btnResetIsland) {
      btnResetIsland.addEventListener('click', () => {
        container.querySelectorAll('.island-cell--land').forEach(cell => {
          cell.style.backgroundColor = '';
          cell.style.borderColor = '';
          cell.style.color = '';
          cell.classList.remove('island-cell--active');
        });
        if (labelResult) labelResult.textContent = 'Found: 0 Islands';
        if (btnRunIsland) btnRunIsland.disabled = false;
      });
    }
  },

  /* ------------------------------------------------------------------------
     QUESTIONS SUITE (Mini Quiz, Predict Output, Practice, LeetCode)
     ------------------------------------------------------------------------ */
  miniQuiz: [
    {
      question: "Q1. What is the fundamental difference in exploration strategy between DFS and BFS?",
      options: [
        "A. DFS explores layer by layer; BFS explores as deep as possible first",
        "B. DFS plunges deep along a single branch before backtracking; BFS explores evenly level-by-level",
        "C. DFS only works on trees, BFS only on graphs",
        "D. DFS uses a Queue, BFS uses a Stack"
      ],
      answer: "B",
      explanation: "Depth-First Search explores deeply down each path until a dead end is reached and then backtracks. Breadth-First Search explores all immediate neighbors first before moving to deeper layers."
    },
    {
      question: "Q2. In recursive DFS on a cyclic graph, what happens if the visited Set is omitted?",
      options: [
        "A. The code completes faster",
        "B. The code throws RangeError: Maximum call stack size exceeded due to infinite recursion",
        "C. It automatically switches to BFS",
        "D. The graph nodes are deleted"
      ],
      answer: "B",
      explanation: "Without a visited Set, recursive calls will cycle endlessly through the loop (A -> B -> C -> A), repeatedly pushing frames onto the call stack until memory is exhausted."
    },
    {
      question: "Q3. In the Connected Components Count problem, why is explore(graph, node, visited) called in a loop?",
      options: [
        "A. To reverse the graph edges",
        "B. Because a single DFS only visits nodes in its own isolated component; the loop ensures all isolated components are explored",
        "C. To calculate the shortest path",
        "D. To sort the vertices"
      ],
      answer: "B",
      explanation: "An isolated component cannot reach other components. The outer loop guarantees that if a node has not been reached by previous traversals, a new component is discovered and counted."
    },
    {
      question: "Q4. When finding the Minimum Island size in a 2D grid, why do we initialize minSize to Infinity rather than 0?",
      options: [
        "A. Because grid dimensions are infinite",
        "B. Because any valid island size will be smaller than Infinity, allowing Math.min to correctly update the minimum",
        "C. Because JavaScript does not support 0 for minimums",
        "D. To prevent water cells from overflowing"
      ],
      answer: "B",
      explanation: "If initialized to 0, Math.min(0, islandSize) would always remain 0! Initializing to Infinity ensures the first island's size replaces it immediately."
    },
    {
      question: "Q5. What is the time complexity of the Island Count problem on an R × C grid?",
      options: [
        "A. O(R + C)",
        "B. O(R × C)",
        "C. O(R² × C²)",
        "D. O(2^(R+C))"
      ],
      answer: "B",
      explanation: "Every cell in the R × C grid is visited at most once by the outer loops and the DFS exploration thanks to the visited coordinate Set, giving linear O(R × C) time."
    }
  ],

  predictOutput: [
    {
      code: `const graph = {
  A: ['B'],
  B: ['C'],
  C: []
};
function hasPath(src, dst) {
  if (src === dst) return true;
  for (const n of graph[src] || []) {
    if (hasPath(n, dst)) return true;
  }
  return false;
}
console.log(hasPath('A', 'C'), hasPath('C', 'A'));`,
      options: [
        "true true",
        "true false",
        "false true",
        "false false"
      ],
      answer: "true false",
      explanation: "A directed path exists from A -> B -> C (true). But C has no outgoing edges, so C -> A does not exist (false)."
    },
    {
      code: `let size = 1;
function explore() {
  return 3;
}
size += explore();
console.log(size);`,
      options: [
        "1",
        "3",
        "4",
        "0"
      ],
      answer: "4",
      explanation: "size starts at 1 (for current node). Adding 3 from the explored component yields 1 + 3 = 4."
    },
    {
      code: `const visited = new Set(['0,1']);
const r = 0, c = 1;
const key = r + ',' + c;
console.log(visited.has(key));`,
      options: [
        "true",
        "false",
        "undefined",
        "TypeError"
      ],
      answer: "true",
      explanation: "String concatenation r + ',' + c yields '0,1', which matches the entry in the Set."
    }
  ],

  practice: [
    {
      q: "Write a recursive function `dfsAll(graph, node, visited = new Set())` that returns an array of all visited node IDs in DFS order.",
      a: "function dfsAll(graph, node, visited = new Set(), order = []) {\n  if (visited.has(node)) return order;\n  visited.add(node);\n  order.push(node);\n  for (const neighbor of graph[node] || []) {\n    dfsAll(graph, neighbor, visited, order);\n  }\n  return order;\n}"
    },
    {
      q: "Write a function `maxIslandArea(grid)` that returns the maximum area (number of connected 'L' cells) of an island in a 2D grid.",
      a: "function maxIslandArea(grid) {\n  const visited = new Set();\n  let maxArea = 0;\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      maxArea = Math.max(maxArea, exploreSize(grid, r, c, visited));\n    }\n  }\n  return maxArea;\n}\n\nfunction exploreSize(grid, r, c, visited) {\n  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return 0;\n  if (grid[r][c] === 'W') return 0;\n  const pos = r + ',' + c;\n  if (visited.has(pos)) return 0;\n  visited.add(pos);\n  let size = 1;\n  size += exploreSize(grid, r - 1, c, visited);\n  size += exploreSize(grid, r + 1, c, visited);\n  size += exploreSize(grid, r, c - 1, visited);\n  size += exploreSize(grid, r, c + 1, visited);\n  return size;\n}"
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 200 — Number of Islands, then 695 — Max Area of Island.",
    problems: [
      { num: 200, title: "Number of Islands", concept: "2D Grid DFS Connected Components", slug: "number-of-islands", isSuggestedStart: true, isImmediateNext: true },
      { num: 695, title: "Max Area of Island", concept: "Grid Component Size Aggregation", slug: "max-area-of-island" },
      { num: 733, title: "Flood Fill", concept: "Pixel Grid DFS Replacement", slug: "flood-fill" },
      { num: 797, title: "All Paths From Source to Target", concept: "Backtracking Path Enumeration in DAG", slug: "all-paths-from-source-to-target" }
    ]
  }
};

/* ==========================================================================
   LEVEL 6 REMAINING SCAFFOLDING (Topics 34, 35, 36)
   ========================================================================== */
window.LESSONS_CONTENT["topological-sort"] = {
  id: "topological-sort",
  title: "Topological Sort",
  levelTitle: "Level 6 — Graphs",
  summary: "Order directed acyclic graph nodes linearly such that every directed edge u -> v has u before v.",
  sections: [
    {
      id: "section-topo-coming-soon",
      title: "Content Preparation in Progress",
      contentHtml: `<p style="color:var(--text-secondary);">Topological Sort curriculum is currently in progress. Complete Graph Representation, BFS, and DFS first!</p>`
    }
  ]
};

window.LESSONS_CONTENT["union-find"] = {
  id: "union-find",
  title: "Union-Find (Disjoint Set)",
  levelTitle: "Level 6 — Graphs",
  summary: "Disjoint-set data structure with near O(1) path compression and rank optimization.",
  sections: [
    {
      id: "section-uf-coming-soon",
      title: "Content Preparation in Progress",
      contentHtml: `<p style="color:var(--text-secondary);">Union-Find curriculum is currently in progress. Complete Graph Representation, BFS, and DFS first!</p>`
    }
  ]
};

window.LESSONS_CONTENT["shortest-path"] = {
  id: "shortest-path",
  title: "Shortest Path (Dijkstra's)",
  levelTitle: "Level 6 — Graphs",
  summary: "Dijkstra's priority-queue-based algorithm for single-source shortest path in weighted graphs.",
  sections: [
    {
      id: "section-sp-coming-soon",
      title: "Content Preparation in Progress",
      contentHtml: `<p style="color:var(--text-secondary);">Dijkstra's Shortest Path curriculum is currently in progress. Complete Graph Representation, BFS, and DFS first!</p>`
    }
  ]
};
