/**
 * DSA Tracker — Lesson Content: Space Complexity
 * ─────────────────────────────────────────────
 * Independent content module adhering to Schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["space-complexity"] = {
  id: "space-complexity",
  title: "Space Complexity",
  levelTitle: "Level 1 — Foundations",
  summary: "Master space complexity, auxiliary space, in-place algorithms, and call stack memory growth.",

  definitions: [
    {
      term: "Space Complexity",
      def: "A measure of the total amount of memory an algorithm needs to run, expressed as a function of input size — including the space taken by the input itself plus any extra space the algorithm uses while running."
    },
    {
      term: "Auxiliary Space",
      def: "The extra memory an algorithm uses beyond the input itself (e.g. temporary variables, new arrays/objects it creates). Most 'space complexity' discussions in interviews specifically refer to auxiliary space — this is the standard metric used unless total space is explicitly requested."
    },
    {
      term: "In-Place Algorithm",
      def: "An algorithm that transforms the input using only a constant amount of extra auxiliary space (O(1)), without creating new data structures that grow with input size."
    },
    {
      term: "Call Stack Space (Recursive Space)",
      def: "The memory used by the call stack itself when a function calls itself recursively; each recursive call adds a stack frame (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"function-calls\">Function Calls</a> and <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> lessons), so recursion depth directly contributes to space complexity — even if the function never explicitly creates a new array or object."
    }
  ],

  howItWorksTogether: "Space complexity isn't just about arrays and objects you create on purpose — it also includes the call stack itself. A recursive function that looks memory-light because it doesn't allocate anything can still have O(n) space complexity, because each recursive call pushes a new stack frame that stays in memory until that call returns. This is why an iterative version of the same algorithm often uses less space than a recursive one, even when both do the same number of operations (same time complexity — see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"time-complexity\">Time Complexity (Big-O)</a> lesson) — the recursive version pays an extra cost in call-stack space that the iterative version doesn't.",

  whyItMatters: "Understanding space complexity ensures your algorithms don't crash with out-of-memory errors or stack overflows on large datasets. In technical interviews and production applications, optimizing space complexity (such as converting recursive functions to iterative ones or adopting in-place mutations) is often the key to meeting strict memory budgets.",

  workedExample: {
    title: "In-Place vs New Allocation Reversal & Iterative vs Recursive Factorial",
    primitiveText: "<strong>1. In-Place Array Reversal (O(1) Auxiliary Space):</strong><br/><code>function reverseInPlace(arr) {<br/>  let left = 0, right = arr.length - 1;<br/>  while (left &lt; right) {<br/>    [arr[left], arr[right]] = [arr[right], arr[left]];<br/>    left++;<br/>    right--;<br/>  }<br/>  return arr;<br/>}</code><br/><br/><strong>2. New Array Reversal (O(n) Auxiliary Space):</strong><br/><code>function reverseNew(arr) {<br/>  const result = [];<br/>  for (let i = arr.length - 1; i &gt;= 0; i--) {<br/>    result.push(arr[i]);<br/>  }<br/>  return result;<br/>}</code>",
    referenceText: "<strong>3. Recursive Factorial (O(n) Space due to Call Stack):</strong><br/><code>function factorialRecursive(n) {<br/>  if (n &lt;= 1) return 1;<br/>  return n * factorialRecursive(n - 1);<br/>}</code><br/><br/><strong>4. Iterative Factorial (O(1) Space — Running Total):</strong><br/><code>function factorialIterative(n) {<br/>  let result = 1;<br/>  for (let i = 2; i &lt;= n; i++) result *= i;<br/>  return result;<br/>}</code><br/><br/><em>Contrast:</em> Both <code>factorialRecursive</code> and <code>factorialIterative</code> share identical <code>O(n)</code> time complexity (from the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"time-complexity\">Time Complexity (Big-O)</a> lesson), but drastically different space complexity (<code>O(n)</code> call stack frames vs <code>O(1)</code> constant memory)."
  },

  visual: {
    caption: "Figure 1: Visual comparison of memory consumption: Recursive Factorial builds up n stack frames in memory (O(n) Space), whereas Iterative Factorial reuses a single result variable (O(1) Space).",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="240" fill="var(--bg-body)" rx="12" />
        <g transform="translate(30, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">1. RECURSIVE (O(n) Stack Space)</text>
          
          <rect x="25" y="50" width="250" height="28" fill="rgba(184,74,74,0.12)" stroke="#b84a4a" rx="4"/>
          <text x="35" y="69" fill="var(--text-primary)" font-size="11" font-weight="600">factorialRecursive(1) [Frame 4]</text>
          
          <rect x="25" y="82" width="250" height="28" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" rx="4"/>
          <text x="35" y="101" fill="var(--text-primary)" font-size="11" font-weight="600">factorialRecursive(2) [Frame 3]</text>
          
          <rect x="25" y="114" width="250" height="28" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" rx="4"/>
          <text x="35" y="133" fill="var(--text-primary)" font-size="11" font-weight="600">factorialRecursive(3) [Frame 2]</text>
          
          <rect x="25" y="146" width="250" height="28" fill="rgba(109,76,154,0.12)" stroke="#6d4c9a" rx="4"/>
          <text x="35" y="165" fill="var(--text-primary)" font-size="11" font-weight="600">factorialRecursive(4) [Frame 1]</text>
        </g>
        
        <g transform="translate(370, 25)">
          <rect width="300" height="190" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="150" y="30" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">2. ITERATIVE (O(1) Auxiliary Space)</text>
          
          <rect x="25" y="75" width="250" height="70" fill="rgba(45,138,104,0.12)" stroke="#2d8a68" stroke-width="2" rx="8"/>
          <text x="150" y="105" fill="var(--text-primary)" font-size="13" font-weight="bold" text-anchor="middle">Variable: result = 24</text>
          <text x="150" y="127" fill="#34d399" font-size="11" font-weight="600" text-anchor="middle">Single slot re-used throughout loop</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// O(1) auxiliary space — reverses the array using only a few variables</span>
<span class="kw">function</span> <span class="fn">reverseInPlace</span>(arr) {
  <span class="kw">let</span> left = <span class="num">0</span>, right = arr.length - <span class="num">1</span>;
  <span class="kw">while</span> (left &lt; right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  <span class="kw">return</span> arr;
}

<span class="cm">// O(n) auxiliary space — builds a brand-new array of size n</span>
<span class="kw">function</span> <span class="fn">reverseNew</span>(arr) {
  <span class="kw">const</span> result = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = arr.length - <span class="num">1</span>; i &gt;= <span class="num">0</span>; i--) {
    result.<span class="fn">push</span>(arr[i]);
  }
  <span class="kw">return</span> result;
}

<span class="cm">// O(n) space — recursion depth n means n stack frames alive at once</span>
<span class="kw">function</span> <span class="fn">factorialRecursive</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> <span class="num">1</span>;
  <span class="kw">return</span> n * <span class="fn">factorialRecursive</span>(n - <span class="num">1</span>);
}

<span class="cm">// O(1) space — no growth in memory as n increases, just a running total</span>
<span class="kw">function</span> <span class="fn">factorialIterative</span>(n) {
  <span class="kw">let</span> result = <span class="num">1</span>;
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">2</span>; i &lt;= n; i++) result *= i;
  <span class="kw">return</span> result;
}`,

  complexityNotes: [
    "In-Place Array Swap (reverseInPlace): O(1) Constant Auxiliary Space.",
    "New Array Allocation (reverseNew): O(n) Linear Auxiliary Space.",
    "Recursive Factorial: O(n) Time, O(n) Call Stack Space due to n stack frames.",
    "Iterative Factorial: O(n) Time, O(1) Constant Space."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming recursion is 'free' in terms of memory",
      desc: "Believing recursion consumes no extra memory just because no new arrays or objects are declared — forgetting that the call stack itself uses <code>O(depth)</code> stack frame space."
    },
    {
      title: "Mistake 2: Conflating total space with auxiliary space",
      desc: "Confusing total space (input space + auxiliary space) with auxiliary space alone. Most interview space complexity questions refer specifically to auxiliary space (extra memory used by the algorithm beyond input)."
    },
    {
      title: "Mistake 3: Assuming 'in-place' always guarantees O(1) total auxiliary space",
      desc: "Assuming 'in-place' guarantees <code>O(1)</code> space in all scenarios — some in-place algorithms (like typical recursive Quick Sort implementations) mutate input data in-place but still consume <code>O(log n)</code> auxiliary space on average due to recursive call stack depth."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the space complexity of a loop that only uses a fixed number of variables, regardless of input size?",
      a: "O(1) Constant Auxiliary Space. The memory required remains fixed and does not grow as the input size n increases."
    },
    {
      q: "Question 2: A recursive function calls itself until it reaches a base case at depth n. What is its space complexity, and why?",
      a: "O(n) Space Complexity. Each recursive call pushes a new stack frame onto the call stack. At maximum depth n, there are n stack frames active simultaneously in memory until the base case returns."
    },
    {
      q: "Question 3: Is creating a brand-new array of length n inside a function considered O(1) or O(n) auxiliary space?",
      a: "O(n) Auxiliary Space. Creating a new array of length n allocates heap memory proportional to input size n."
    }
  ],

  challenge: {
    titleText: "Challenge: Rewrite Recursive Fibonacci Iteratively",
    desc: "Take a given recursive function (like recursive Fibonacci <code>fib(n)</code> which uses <code>O(n)</code> call stack space) and rewrite it iteratively so its space complexity drops from <code>O(n)</code> to <code>O(1)</code> constant auxiliary space while keeping the same <code>O(n)</code> linear time complexity."
  }
};
