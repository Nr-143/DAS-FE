/**
 * DSA Tracker — Lesson Content: Graphs (Level 6)
 * Covers: Graph Representation, BFS, DFS, Topological Sort, Union-Find, Shortest Path
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// Graph Representation
window.LESSONS_CONTENT["graph-representation"] = {
  id: "graph-representation",
  title: "Graph Representation",
  levelTitle: "Level 6 — Graphs",
  summary: "Learn how networks of vertices and edges are modeled using Adjacency Lists and Adjacency Matrices.",

  definitions: [
    { term: "Graph", def: "A collection of nodes (vertices) connected by links (edges)." },
    { term: "Adjacency List", def: "A hash map or array of lists where each vertex maps to a list of its neighboring vertices." },
    { term: "Adjacency Matrix", def: "A 2D V×V matrix where entry matrix[i][j] is 1 if an edge exists between vertex i and j." }
  ],

  howItWorksTogether: "Adjacency lists use less memory O(V + E) for sparse graphs, while matrices allow O(1) edge lookup.",
  whyMatters: "Powers social networks, Google Maps routing, recommendation systems, and network topology.",

  workedExample: {
    title: "Adjacency List Representation",
    primitiveText: "<code>const graph = {<br/>  A: [\"B\", \"C\"],<br/>  B: [\"A\", \"D\"],<br/>  C: [\"A\"],<br/>  D: [\"B\"]<br/>};</code>"
  },

  codeSnippet: `class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.addVertex(v1); this.addVertex(v2);
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
}`,

  complexityNotes: ["Space: Adjacency List O(V + E); Adjacency Matrix O(V²)."],
  commonMistakes: [{ title: "Mistake 1: Matrix space", desc: "Using a V×V matrix for a graph with 1,000,000 vertices requires 1 trillion entries!" }],
  miniQuiz: [{ question: "Q1. What is the space complexity of an Adjacency List?", options: ["A. O(V + E)", "B. O(V²)", "C. O(E²)", "D. O(V)"], answer: "A", explanation: "Adjacency list stores V vertices and E edge pointers." }],
  practice: [{ q: "When is an Adjacency Matrix preferred over an Adjacency List?", a: "When the graph is dense (E ≈ V²) or when frequent O(1) edge existence checks are required." }]
};

// Breadth-First Search (BFS)
window.LESSONS_CONTENT["breadth-first-search"] = {
  id: "breadth-first-search",
  title: "Breadth-First Search (BFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Traverse graphs level by level using a Queue to find the shortest path in unweighted graphs.",

  definitions: [
    { term: "BFS", def: "Traversing nodes layer-by-layer starting from a source node using a Queue." },
    { term: "Shortest Path Guarantee", def: "In unweighted graphs, BFS is guaranteed to find the path with the fewest edges." }
  ],

  howItWorksTogether: "Uses a FIFO Queue and a Visited set to explore all neighbors at depth d before moving to depth d+1.",
  whyMatters: "Used in social connection distance ('degrees of separation'), web crawlers, and shortest path in unweighted grids.",

  workedExample: {
    title: "BFS Implementation",
    primitiveText: "<code>function bfs(graph, start) {<br/>  const queue = [start];<br/>  const visited = new Set([start]);<br/>  while (queue.length) {<br/>    const curr = queue.shift();<br/>    for (const neighbor of graph[curr]) {<br/>      if (!visited.has(neighbor)) {<br/>        visited.add(neighbor);<br/>        queue.push(neighbor);<br/>      }<br/>    }<br/>  }<br/>}</code>"
  },

  codeSnippet: `function bfsShortestPath(graph, start, target) {
  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === target) return dist;

    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`,

  complexityNotes: ["Time: O(V + E).", "Space: O(V) for Queue and Visited set."],
  commonMistakes: [{ title: "Mistake 1: Forgetting Visited set", desc: "Causes infinite loops on cyclic graphs." }],
  miniQuiz: [{ question: "Q1. What data structure does BFS use?", options: ["A. Stack", "B. Queue", "C. Heap", "D. Array"], answer: "B", explanation: "BFS uses a Queue (FIFO) to explore nodes level-by-level." }],
  practice: [{ q: "Why is BFS guaranteed to find the shortest path in an unweighted graph?", a: "Because it explores all nodes at distance d before any node at distance d+1." }]
};

// Depth-First Search (DFS)
window.LESSONS_CONTENT["depth-first-search"] = {
  id: "depth-first-search",
  title: "Depth-First Search (DFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Explore as far as possible along each branch using Recursion or a Stack before backtracking.",

  definitions: [
    { term: "DFS", def: "Traversing deeply along a branch until reaching a dead end, then backtracking." }
  ],

  howItWorksTogether: "Uses recursion (Call Stack) or an explicit Stack. Ideal for cycle detection, maze solving, and component counting.",
  whyMatters: "Core mechanism for connected components, topological sorting, and solving puzzles.",

  workedExample: {
    title: "Recursive DFS",
    primitiveText: "<code>function dfs(node, graph, visited = new Set()) {<br/>  if (visited.has(node)) return;<br/>  visited.add(node);<br/>  for (const neighbor of graph[node]) {<br/>    dfs(neighbor, graph, visited);<br/>  }<br/>}</code>"
  },

  codeSnippet: `function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark visited
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,

  complexityNotes: ["Time: O(V + E).", "Space: O(V) for call stack."],
  commonMistakes: [{ title: "Mistake 1: Stack Overflow", desc: "On very deep graphs, recursion can exceed max call stack size." }],
  miniQuiz: [{ question: "Q1. What data structure does DFS inherently use?", options: ["A. Queue", "B. Stack / Recursion", "C. Min Heap", "D. Set"], answer: "B", explanation: "DFS uses a Stack (or the call stack via recursion)." }],
  practice: [{ q: "How can DFS detect a cycle in a directed graph?", a: "By tracking nodes currently in the recursion stack (back-edges)." }]
};

// Topological Sort
window.LESSONS_CONTENT["topological-sort"] = {
  id: "topological-sort",
  title: "Topological Sort",
  levelTitle: "Level 6 — Graphs",
  summary: "Order vertices in a Directed Acyclic Graph (DAG) such that for every edge u -> v, u comes before v.",

  definitions: [
    { term: "DAG", def: "Directed Acyclic Graph (a directed graph with no cycles)." },
    { term: "Topological Order", def: "A linear ordering of vertices respecting dependency directions." }
  ],

  howItWorksTogether: "Kahn's Algorithm (BFS with in-degrees) or DFS with post-order stack ordering.",
  whyMatters: "Used for build systems (e.g. npm dependency resolution), course prerequisite ordering, and task scheduling.",

  workedExample: {
    title: "Kahn's Algorithm (BFS In-Degree)",
    primitiveText: "<code>1. Calculate in-degree of all nodes.<br/>2. Push nodes with 0 in-degree to queue.<br/>3. Process queue, decrementing in-degrees of neighbors.</code>"
  },

  codeSnippet: `function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    graph[src].push(dest);
    inDegree[dest]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length) {
    const curr = queue.shift();
    order.push(curr);
    for (const next of graph[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return order.length === numCourses ? order : [];
}`,

  complexityNotes: ["Time: O(V + E).", "Space: O(V + E)."],
  commonMistakes: [{ title: "Mistake 1: Graph has cycles", desc: "Topological sort is impossible if the graph has a cycle. Output order length will be < V." }],
  miniQuiz: [{ question: "Q1. What type of graph is required for Topological Sort?", options: ["A. Undirected", "B. DAG (Directed Acyclic Graph)", "C. Binary Tree", "D. Complete Graph"], answer: "B", explanation: "Topological sort requires a Directed Acyclic Graph." }],
  practice: [{ q: "How can Kahn's algorithm detect if a graph contains a cycle?", a: "If the final topological order array contains fewer than V nodes, a cycle exists." }]
};

// Union-Find (Disjoint Set)
window.LESSONS_CONTENT["union-find"] = {
  id: "union-find",
  title: "Union-Find (Disjoint Set)",
  levelTitle: "Level 6 — Graphs",
  summary: "Master Disjoint Set Union (DSU) with Path Compression and Rank for near O(1) set operations.",

  definitions: [
    { term: "Union-Find", def: "A data structure supporting find(x) and union(x, y) operations over disjoint sets." },
    { term: "Path Compression", def: "Flattening the tree structure during find() calls so nodes point directly to the root." }
  ],

  howItWorksTogether: "With Path Compression and Union by Rank, operations run in nearly O(1) amortized time (inverse Ackermann function α(n)).",
  whyMatters: "Essential for Kruskal's Minimum Spanning Tree algorithm and dynamic connectivity problems.",

  workedExample: {
    title: "DSU Class",
    primitiveText: "<code>const dsu = new DSU(5);<br/>dsu.union(0, 1);<br/>dsu.union(1, 2);<br/>dsu.find(0) === dsu.find(2); // true</code>"
  },

  codeSnippet: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]); // Path compression
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) this.parent[rootI] = rootJ;
      else if (this.rank[rootI] > this.rank[rootJ]) this.parent[rootJ] = rootI;
      else { this.parent[rootJ] = rootI; this.rank[rootI]++; }
      return true;
    }
    return false; // Already connected
  }
}`,

  complexityNotes: ["Time: O(α(n)) ≈ O(1) per operation.", "Space: O(n)."],
  commonMistakes: [{ title: "Mistake 1: Skipping path compression", desc: "Without path compression, find() can degrade to O(n)." }],
  miniQuiz: [{ question: "Q1. What is the time complexity of Union-Find with Path Compression?", options: ["A. O(1) amortized", "B. O(log n)", "C. O(n)", "D. O(n²)"], answer: "A", explanation: "Path compression reduces operations to near-constant amortized time." }],
  practice: [{ q: "How do you detect a cycle in an undirected graph using Union-Find?", a: "For each edge (u, v), if find(u) === find(v), adding the edge creates a cycle." }]
};

// Shortest Path (Dijkstra's)
window.LESSONS_CONTENT["shortest-path"] = {
  id: "shortest-path",
  title: "Shortest Path (Dijkstra's)",
  levelTitle: "Level 6 — Graphs",
  summary: "Find the shortest paths from a source node to all other nodes in a weighted graph using Dijkstra's Algorithm.",

  definitions: [
    { term: "Dijkstra's Algorithm", def: "A greedy graph algorithm for finding shortest paths in non-negative weighted graphs." }
  ],

  howItWorksTogether: "Maintains a distance table and uses a Priority Queue (Min-Heap) to pick the closest unvisited node.",
  whyMatters: "Powers GPS navigation, network packet routing, and game pathfinding.",

  workedExample: {
    title: "Dijkstra Overview",
    primitiveText: "<code>1. Set dist[src] = 0, all others = ∞.<br/>2. Extract node u with min dist from Min-Heap.<br/>3. Relax all neighbors v: dist[v] = min(dist[v], dist[u] + weight).</code>"
  },

  codeSnippet: `function dijkstra(graph, src, n) {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  const pq = [[0, src]]; // [dist, node]

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // Min-heap behavior
    const [d, u] = pq.shift();

    if (d > dist[u]) continue;

    for (const [v, w] of (graph[u] || [])) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,

  complexityNotes: ["Time: O((V + E) log V) with Min-Heap.", "Space: O(V + E)."],
  commonMistakes: [{ title: "Mistake 1: Negative weight edges", desc: "Dijkstra's algorithm fails on graphs with negative edge weights! Use Bellman-Ford instead." }],
  miniQuiz: [{ question: "Q1. Why does Dijkstra's algorithm fail with negative edge weights?", options: ["A. Greedy choice assumption fails", "B. Out of memory", "C. Stack overflow", "D. Array index out of bounds"], answer: "A", explanation: "Dijkstra assumes visited nodes have finalized minimum distances, which is broken by negative weights." }],
  practice: [{ q: "What algorithm should be used if edge weights are all 1?", a: "BFS (Breadth-First Search) is simpler and runs in O(V + E) time." }]
};
