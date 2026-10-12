/**
 * DSA Tracker — Lesson Content: Graphs (Level 6)
 * Covers: Graph Representation, BFS, DFS, Topological Sort, Union-Find, Shortest Path
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// ==========================================
// 1. GRAPH REPRESENTATION (UNLOCKED)
// ==========================================
window.LESSONS_CONTENT["graph-representation"] = {
  id: "graph-representation",
  title: "Graph Representation",
  levelTitle: "Level 6 — Graphs",
  summary: "Master vertices, edges, directed vs undirected graphs, weighted networks, and compare Adjacency List O(V + E) vs Adjacency Matrix O(V²) memory layouts.",

  definitions: [
    {
      term: "Graph",
      def: "A non-linear data structure consisting of a finite set of vertices (or nodes) connected by links called edges."
    },
    {
      term: "Directed vs. Undirected",
      def: "In an <strong>undirected graph</strong>, edges are two-way bidirectional highways (if A connects to B, B connects to A). In a <strong>directed graph (digraph)</strong>, edges have an arrow direction (A → B does not imply B → A)."
    },
    {
      term: "Weighted vs. Unweighted",
      def: "In a <strong>weighted graph</strong>, each edge carries a numerical cost or distance (e.g. mileage on Google Maps, latency in networks). In an unweighted graph, all edge traversals cost 1."
    },
    {
      term: "Adjacency List",
      def: "A collection of lists or hash map where each vertex maps to an array of its immediate neighbors. Uses optimal <code>O(V + E)</code> memory for sparse graphs."
    },
    {
      term: "Adjacency Matrix",
      def: "A 2D <code>V × V</code> boolean/number table where cell <code>matrix[i][j] = 1</code> indicates an edge exists from vertex i to vertex j. Allows O(1) edge existence queries at the cost of <code>O(V²)</code> memory."
    }
  ],

  howItWorksTogether: "In software engineering, almost all real-world graphs (social networks, web pages, road maps) are sparse: each vertex connects to only a tiny fraction of the total vertices. Using an Adjacency Matrix for Facebook (3 billion users) would require 9 quintillion cells (O(V²)), running out of memory instantly. An Adjacency List stores only the actual existing edges, keeping storage proportional to <code>O(V + E)</code> while making neighbor traversal fast and direct.",

  whyMatters: "Graphs model social networks, Google Maps GPS navigation, internet routing, recommendation engines, dependency resolution in package managers (npm), and circuit design.",

  interactiveWidget: "graph-visualizer",

  workedExample: {
    title: "Adjacency List vs Matrix for Vertices A, B, C, D, E",
    primitiveText: "<code>// Adjacency List: Map of Arrays<br/>const graph = {<br/>  A: ['B', 'C'],<br/>  B: ['A', 'D', 'E'],<br/>  C: ['A', 'E'],<br/>  D: ['B', 'E'],<br/>  E: ['C', 'B', 'D']<br/>};<br/><br/>// Adjacency Matrix: 5x5 Grid<br/>// matrix[0][1] = 1 (A connects to B)</code>",
    referenceText: "Notice how the list only stores connections that actually exist!"
  },

  codeSnippet: `class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1. ADD VERTEX — O(1)
  addVertex(v) {
    if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
  }

  // 2. ADD UNDIRECTED EDGE — O(1)
  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // 3. REMOVE EDGE — O(E)
  removeEdge(v1, v2) {
    if (this.adjacencyList[v1]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    }
    if (this.adjacencyList[v2]) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
  }
}`,

  complexityNotes: [
    "Adjacency List Space: O(V + E) — highly efficient for sparse graphs.",
    "Adjacency Matrix Space: O(V²) — excessive memory for sparse networks.",
    "Add Vertex: O(1) in Adjacency List; O(V²) in Matrix (resizing 2D array).",
    "Add Edge: O(1) in both representations.",
    "Check if Edge Exists: O(1) in Matrix; O(degree(v)) in Adjacency List."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Choosing a Matrix for Large Sparse Networks",
      desc: "For a graph with 1,000,000 vertices, an adjacency matrix allocates 1,000,000,000,000 cells (1 Terabyte of RAM!), crashing the browser or server instantly. Always use an Adjacency List unless density <code>E ≈ V²</code>."
    },
    {
      title: "Mistake 2: Forgetting to Add Symmetrical Link in Undirected Graphs",
      desc: "In an undirected graph, <code>addEdge(A, B)</code> must push B into A's list AND A into B's list. Omitting one creates an accidental directed one-way link."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the space complexity of an Adjacency List with V vertices and E edges?",
      options: [
        "A. O(V + E)",
        "B. O(V²)",
        "C. O(E²)",
        "D. O(1)"
      ],
      answer: "A",
      explanation: "An adjacency list stores V array entries and E edge connections, taking optimal O(V + E) space."
    },
    {
      question: "Q2. When is an Adjacency Matrix preferred over an Adjacency List?",
      options: [
        "A. When the graph is sparse",
        "B. When the graph is dense (E ≈ V²) and frequent O(1) edge lookup is required",
        "C. When memory is limited",
        "D. When running BFS"
      ],
      answer: "B",
      explanation: "In dense graphs where almost every pair of vertices shares an edge, a matrix has no wasted cells and provides instantaneous O(1) edge checks."
    }
  ],

  practice: [
    {
      q: "What is the degree of a vertex in an undirected graph?",
      a: "The degree of a vertex is the number of edges incident to it (i.e., the number of immediate neighbors in its adjacency list)."
    }
  ],

  challenge: {
    titleText: "Challenge: Find the Center of a Star Graph",
    desc: "Given an undirected star graph with n vertices labeled from 1 to n, find the center vertex that connects to every other vertex in O(1) time!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 1791 — Find Center of Star Graph, then move to graph traversals.",
    problems: [
      { num: 1791, title: "Find Center of Star Graph", concept: "Edge Frequency Check", slug: "find-center-of-star-graph", isSuggestedStart: true, isImmediateNext: true },
      { num: 997, title: "Find the Town Judge", concept: "In-Degree & Out-Degree", slug: "find-the-town-judge" }
    ]
  }
};

// ==========================================
// 2. BREADTH-FIRST SEARCH (BFS) (UNLOCKED)
// ==========================================
window.LESSONS_CONTENT["breadth-first-search"] = {
  id: "breadth-first-search",
  title: "Breadth-First Search (BFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Traverse graphs layer-by-layer using a FIFO Queue and a Visited Set to discover the guaranteed shortest path in unweighted networks.",

  definitions: [
    {
      term: "Breadth-First Search (BFS)",
      def: "A graph traversal algorithm that explores all neighbor vertices at the current depth distance before moving on to vertices at the next depth level."
    },
    {
      term: "Queue in BFS",
      def: "BFS uses a FIFO (First In, First Out) Queue to maintain the frontier of discovered vertices, guaranteeing that vertices closer to the source are visited first."
    },
    {
      term: "Visited Set",
      def: "A hash set tracking nodes that have already been discovered or enqueued, preventing duplicate processing and infinite loops in cyclic graphs."
    },
    {
      term: "Shortest Path Guarantee",
      def: "In any unweighted graph, BFS is mathematically guaranteed to find the shortest path (minimum number of edges) from the source to any reachable vertex."
    }
  ],

  howItWorksTogether: "BFS starts at a source vertex, enqueues it, and adds it to the Visited set. In a loop, it dequeues the front vertex, examines all its immediate neighbors, and for each unvisited neighbor, marks it as visited and enqueues it. Because FIFO ordering processes all distance-1 nodes before distance-2 nodes, the first time target T is popped, the path taken is guaranteed to be the shortest possible.",

  whyMatters: "BFS powers Google Maps routing in unweighted grids, LinkedIn's 'degrees of connection' distance calculations, web crawlers indexing the web by link depth, and solving shortest-move puzzles (Word Ladder, Knight's minimum moves).",

  interactiveWidget: "graph-bfs-visualizer",

  workedExample: {
    title: "BFS Execution Trace with Queue & Visited Set",
    primitiveText: "<code>Graph: A - B, A - C, B - D, C - E<br/>Start at A:<br/>1. Enqueue A, Visited: {A}<br/>2. Dequeue A, Enqueue neighbors B, C → Queue: [B, C], Visited: {A, B, C}<br/>3. Dequeue B, Enqueue D → Queue: [C, D], Visited: {A, B, C, D}<br/>4. Dequeue C, Enqueue E → Queue: [D, E], Visited: {A, B, C, D, E}<br/>5. Dequeue D, E → Done!</code>",
    referenceText: "Notice how distance 1 nodes (B, C) were fully processed before distance 2 nodes (D, E)!"
  },

  codeSnippet: `function bfsShortestPath(graph, start, target) {
  const queue = [[start, 0]]; // [currentNode, distance]
  const visited = new Set([start]);

  while (queue.length > 0) {
    const [curr, dist] = queue.shift(); // Dequeue
    if (curr === target) return dist;   // Shortest path found!

    for (const neighbor of (graph[curr] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // Mark visited immediately!
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1; // Unreachable
}`,

  complexityNotes: [
    "Time Complexity: O(V + E) — every vertex is enqueued once, every edge examined twice.",
    "Space Complexity: O(V) — for the Queue and the Visited Set."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting to Add to Visited Set Upon Enqueue",
      desc: "If you only mark a node as visited when it is <em>dequeued</em>, multiple paths can enqueue the same node dozens of times, causing an exponential explosion in queue size and severe performance degradation."
    },
    {
      title: "Mistake 2: Missing Visited Set on Cyclic Graphs",
      desc: "Without a visited set, cycles (A → B → A) cause the queue to cycle forever, hanging the application in an infinite loop."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What data structure is fundamentally required by Breadth-First Search?",
      options: [
        "A. Stack",
        "B. FIFO Queue",
        "C. Min-Heap",
        "D. Binary Search Tree"
      ],
      answer: "B",
      explanation: "BFS relies on a FIFO Queue to ensure vertices are visited level-by-level in order of their edge distance from the source."
    },
    {
      question: "Q2. When does BFS guarantee finding the shortest path?",
      options: [
        "A. On any weighted graph",
        "B. On unweighted graphs where all edge weights are equal",
        "C. Only on binary trees",
        "D. Only on directed acyclic graphs"
      ],
      answer: "B",
      explanation: "BFS guarantees the shortest path when all edges have uniform (equal) weight, as it explores all paths of length k before any path of length k + 1."
    }
  ],

  practice: [
    {
      q: "Why is BFS preferred over DFS for finding the shortest path in an unweighted maze?",
      a: "DFS can explore deep down dead ends that lead away from the target before backtracking. BFS expands equally in all directions and stops the instant the destination is reached, guaranteeing the minimum step count."
    }
  ],

  challenge: {
    titleText: "Challenge: Shortest Path in Binary Matrix (LeetCode 1091)",
    desc: "Given an n x n binary grid, return the length of the shortest clear path from top-left (0, 0) to bottom-right (n-1, n-1) using 8-directional BFS movement!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 1091 — Shortest Path in Binary Matrix and 200 — Number of Islands (BFS approach).",
    problems: [
      { num: 1091, title: "Shortest Path in Binary Matrix", concept: "8-Directional Grid BFS", slug: "shortest-path-in-binary-matrix", isSuggestedStart: true, isImmediateNext: true },
      { num: 200, title: "Number of Islands", concept: "Connected Component Floodfill", slug: "number-of-islands", isImmediateNext: true }
    ]
  }
};

// ==========================================
// 3. DEPTH-FIRST SEARCH (DFS) (UNLOCKED)
// ==========================================
window.LESSONS_CONTENT["depth-first-search"] = {
  id: "depth-first-search",
  title: "Depth-First Search (DFS)",
  levelTitle: "Level 6 — Graphs",
  summary: "Explore branches deeply along each path using Recursion or an explicit Stack, backtrack on dead ends, and detect cycles.",

  definitions: [
    {
      term: "Depth-First Search (DFS)",
      def: "A graph traversal algorithm that plunges as deep as possible along each branch before backtracking to explore alternate branches."
    },
    {
      term: "Call Stack / Recursion",
      def: "DFS inherently uses a LIFO Stack — either via the system's recursive execution call stack or an explicit stack data structure."
    },
    {
      term: "Backtracking",
      def: "The process of retreating up the call stack to the previous vertex once a dead end or fully visited neighbor list is reached."
    },
    {
      term: "Cycle Detection",
      def: "DFS can detect cycles in directed graphs by tracking vertices in the current recursion stack (back-edges)."
    }
  ],

  howItWorksTogether: "DFS begins at a source vertex, marks it as visited, and immediately recurses on its first unvisited neighbor. It continues plunging deeper until reaching a vertex with no unvisited neighbors (a dead end). At that point, the recursive function returns, backtracking to the previous vertex to explore its next remaining neighbor.",

  whyMatters: "DFS is the mechanism behind counting connected components (Number of Islands), solving mazes, topological sorting in build systems, finding bridges and articulation points in networks, and cycle detection.",

  interactiveWidget: "graph-dfs-visualizer",

  workedExample: {
    title: "Recursive DFS Deep Plunge Trace",
    primitiveText: "<code>Path A - B - D - E - C:<br/>1. dfs(A) → branch to B<br/>2. dfs(B) → branch to D<br/>3. dfs(D) → branch to E<br/>4. dfs(E) → branch to C<br/>5. C has no unvisited neighbors → Backtrack to E → D → B → A!</code>",
    referenceText: "Notice how DFS went 4 levels deep before backtracking!"
  },

  codeSnippet: `function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;

  function dfs(r, c) {
    // Boundary check + water check
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // Sink island / mark visited in-place!
    dfs(r + 1, c); // Down
    dfs(r - 1, c); // Up
    dfs(r, c + 1); // Right
    dfs(r, c - 1); // Left
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // Explore entire connected island
      }
    }
  }
  return count;
}`,

  complexityNotes: [
    "Time Complexity: O(V + E) — visits every vertex and examines every edge.",
    "Space Complexity: O(V) — for the recursive call stack depth in the worst case (linear path)."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Stack Overflow on Deep Graphs",
      desc: "In very deep graphs (or large 1000x1000 grids), recursion can exceed the browser's maximum call stack limit (~10,000 frames). For huge graphs, use an explicit iterative stack."
    },
    {
      title: "Mistake 2: Missing Boundary Checks in Grid DFS",
      desc: "Always check <code>r < 0 || r >= rows || c < 0 || c >= cols</code> BEFORE accessing <code>grid[r][c]</code> to avoid out-of-bounds errors."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What data structure does Depth-First Search inherently utilize?",
      options: [
        "A. FIFO Queue",
        "B. LIFO Stack (or Call Stack)",
        "C. Min-Heap",
        "D. Hash Set"
      ],
      answer: "B",
      explanation: "DFS operates via LIFO Stack order (either recursively on the runtime call stack or iteratively)."
    },
    {
      question: "Q2. How can DFS detect a cycle in a directed graph?",
      options: [
        "A. By checking if the queue size exceeds V",
        "B. By detecting a back-edge to a node currently active in the recursion call stack",
        "C. By checking if total edges > vertices",
        "D. By running binary search"
      ],
      answer: "B",
      explanation: "If DFS encounters a neighbor that is already in the current ancestor recursion stack, a cycle exists."
    }
  ],

  practice: [
    {
      q: "What is the difference between BFS and DFS traversal shapes?",
      a: "BFS expands in concentric circular ripples (level by level), finding shortest paths. DFS plunges straight down a single path like a winding thread until it hits a wall, then backtracks."
    }
  ],

  challenge: {
    titleText: "Challenge: Number of Islands (LeetCode 200)",
    desc: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 200 — Number of Islands, followed by 695 — Max Area of Island.",
    problems: [
      { num: 200, title: "Number of Islands", concept: "Grid Floodfill DFS", slug: "number-of-islands", isSuggestedStart: true, isImmediateNext: true },
      { num: 695, title: "Max Area of Island", concept: "Component Area DFS", slug: "max-area-of-island", isImmediateNext: true },
      { num: 733, title: "Flood Fill", concept: "Pixel Replacement DFS", slug: "flood-fill" }
    ]
  }
};

// ==========================================
// 4. TOPOLOGICAL SORT, UNION-FIND, SHORTEST PATH (PRESERVED - LOCKED)
// ==========================================
window.LESSONS_CONTENT["topological-sort"] = {
  id: "topological-sort",
  title: "Topological Sort",
  levelTitle: "Level 6 — Graphs",
  summary: "Order vertices in a Directed Acyclic Graph (DAG) such that for every edge u -> v, u comes before v.",
  definitions: [{ term: "DAG", def: "Directed Acyclic Graph." }]
};

window.LESSONS_CONTENT["union-find"] = {
  id: "union-find",
  title: "Union-Find (Disjoint Set)",
  levelTitle: "Level 6 — Graphs",
  summary: "Master Disjoint Set Union (DSU) with Path Compression and Rank for near O(1) set operations.",
  definitions: [{ term: "Union-Find", def: "A data structure supporting find and union operations over disjoint sets." }]
};

window.LESSONS_CONTENT["shortest-path"] = {
  id: "shortest-path",
  title: "Shortest Path (Dijkstra's)",
  levelTitle: "Level 6 — Graphs",
  summary: "Find shortest paths from a source node in weighted graphs using Dijkstra's Algorithm.",
  definitions: [{ term: "Dijkstra's", def: "Greedy graph algorithm for non-negative weighted shortest paths." }]
};
