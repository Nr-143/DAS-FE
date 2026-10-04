/**
 * DSA Tracker — Lesson Content: Function Calls
 * ──────────────────────────────────────────────
 * Independent content module adhering to schema.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["function-calls"] = {
  id: "function-calls",
  title: "Function Calls",
  levelTitle: "Level 1 — Foundations",
  summary: "Understand function execution, parameters vs arguments, the Call Stack, and Stack Frames.",

  definitions: [
    {
      term: "Function",
      def: "A reusable, named block of code that performs a task, optionally taking inputs and producing an output. Plain-language analogy: a named machine or tool — you pass materials into it, it executes a procedure, and optionally gives you back a finished product."
    },
    {
      term: "Parameter",
      def: "The named placeholder for an input, written in the function's definition. Plain-language analogy: the labeled slot on a machine (like 'name') before any real material is inserted."
    },
    {
      term: "Argument",
      def: "The actual value supplied for that placeholder when the function is called. Plain-language analogy: the actual item (like 'Sam') dropped into that slot when you press START."
    },
    {
      term: "Call Stack",
      def: "A stack (last-in, first-out) structure the JavaScript engine uses to track function calls: each call is pushed on top, and popped off once that function finishes. Plain-language analogy: a stack of cafeteria trays — you place a new tray on top when a function starts, and remove it when the function completes."
    },
    {
      term: "Stack Frame",
      def: "The block of memory representing one single function call on the call stack — it holds that call's local variables and parameters, plus where execution should resume once it returns. Plain-language analogy: a temporary sticky note stuck on top of the tray holding local numbers and keeping track of where to resume."
    }
  ],

  howItWorksTogether: "When a function is called, the engine creates a new stack frame containing its parameters and local variables, and pushes it onto the call stack. When the function finishes and returns, its frame is popped off, and the engine resumes exactly where the caller left off. If a function calls another function before returning, that second call's frame stacks on top — this is exactly what happens (repeatedly) in recursion, covered next in the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> lesson.",

  whyItMatters: "Tracing Call Stack frames and understanding return propagation is essential for debugging asynchronous stack traces and analyzing space complexity in recursive algorithms.",

  workedExample: {
    title: "Call Stack Push & Pop Sequence",
    primitiveText: "<code>function greet(name) {          // greet's frame is pushed when called<br/>  return \`Hello, \${name}\`;      // frame is popped after this returns<br/>}<br/><br/>function main() {<br/>  const message = greet(\"Sam\"); // pushes greet's frame on top of main's<br/>  console.log(message);<br/>}<br/><br/>main(); // pushes main's frame first</code>",
    referenceText: "Trace: <code>main</code> pushed → <code>greet</code> pushed on top → <code>greet</code> returns and is popped → <code>main</code> continues → <code>main</code> returns and is popped → stack empty."
  },

  visual: {
    caption: "Figure 1: The Call Stack LIFO execution flow. As main() calls greet('Sam'), a new stack frame is pushed on top.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="230" fill="var(--bg-body)" rx="12" />
        <g transform="translate(40, 25)">
          <rect width="180" height="180" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="90" y="30" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">1. main() Called</text>
          
          <rect x="15" y="125" width="150" height="40" fill="rgba(108,99,255,0.2)" stroke="var(--accent-primary)" stroke-width="2" rx="6"/>
          <text x="90" y="150" fill="var(--text-primary)" font-size="12" font-weight="600" text-anchor="middle">Frame: main()</text>
        </g>
        
        <g transform="translate(260, 25)">
          <rect width="180" height="180" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="90" y="30" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">2. greet("Sam") Pushed</text>
          
          <rect x="15" y="70" width="150" height="40" fill="rgba(0,201,167,0.2)" stroke="var(--accent-secondary)" stroke-width="2" rx="6"/>
          <text x="90" y="95" fill="var(--text-primary)" font-size="12" font-weight="600" text-anchor="middle">Frame: greet("Sam")</text>
          
          <rect x="15" y="125" width="150" height="40" fill="rgba(108,99,255,0.2)" stroke="var(--accent-primary)" stroke-width="2" rx="6"/>
          <text x="90" y="150" fill="var(--text-primary)" font-size="12" font-weight="600" text-anchor="middle">Frame: main()</text>
        </g>
        
        <g transform="translate(480, 25)">
          <rect width="180" height="180" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10" />
          <text x="90" y="30" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">3. greet Returns & Pops</text>
          
          <rect x="15" y="125" width="150" height="40" fill="rgba(108,99,255,0.2)" stroke="var(--accent-primary)" stroke-width="2" rx="6"/>
          <text x="90" y="150" fill="var(--text-primary)" font-size="12" font-weight="600" text-anchor="middle">Frame: main()</text>
          
          <text x="90" y="90" fill="var(--text-muted)" font-size="11" text-anchor="middle">(greet popped off)</text>
        </g>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// 1. Parameter vs Argument</span>
<span class="kw">function</span> <span class="fn">multiply</span>(x, y) { <span class="cm">// x and y are PARAMETERS (placeholders)</span>
  <span class="kw">return</span> x * y;
}
<span class="kw">let</span> result = <span class="fn">multiply</span>(<span class="num">4</span>, <span class="num">5</span>); <span class="cm">// 4 and 5 are ARGUMENTS (actual values)</span>

<span class="cm">// 2. Call Stack Execution Trace</span>
<span class="kw">function</span> <span class="fn">greet</span>(name) {          <span class="cm">// greet's frame pushed</span>
  <span class="kw">return</span> <span class="str">\`Hello, \${name}\`</span>;      <span class="cm">// frame popped after return</span>
}

<span class="kw">function</span> <span class="fn">main</span>() {
  <span class="kw">const</span> message = <span class="fn">greet</span>(<span class="str">"Sam"</span>); <span class="cm">// pushes greet's frame on top of main's</span>
  console.<span class="fn">log</span>(message);
}

<span class="fn">main</span>(); <span class="cm">// pushes main's frame first</span>

<span class="cm">// 3. Implicit Return Trap</span>
<span class="kw">function</span> <span class="fn">noReturnVal</span>(a) {
  <span class="kw">let</span> double = a * <span class="num">2</span>;
  <span class="cm">// Missing return statement!</span>
}
console.<span class="fn">log</span>(<span class="fn">noReturnVal</span>(<span class="num">10</span>)); <span class="cm">// undefined</span>`,

  complexityNotes: [
    "Push / Pop Frame on Call Stack: O(1) Constant Time.",
    "Stack Memory Usage: O(d) Space, where d is the depth of active nested function calls.",
    "Missing return statement implicitly yields undefined."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Forgetting to return a value",
      desc: "Forgetting to <code>return</code> a value — the function then implicitly returns <code>undefined</code>, which quietly breaks code that expected a real result."
    },
    {
      title: "Mistake 2: Confusing 'parameter' with 'argument'",
      desc: "Confusing 'parameter' (the placeholder name in the function definition) with 'argument' (the actual value passed at the call site) — they're related but not the same thing."
    }
  ],

  practice: [
    {
      q: "Question 1: What is the exact distinction between a parameter and an argument?",
      a: "A parameter is the named variable inside the function definition (the placeholder, e.g., `name` in `function greet(name)`). An argument is the actual value supplied during call invocation (e.g., `'Sam'` in `greet('Sam')`)."
    },
    {
      q: "Question 2: What happens to local variables stored inside a stack frame when a function returns?",
      a: "The stack frame is popped off the Call Stack, and its local variables are discarded, returning execution focus to the caller function."
    },
    {
      q: "Question 3: If function A calls function B, and function B calls function C, which function's stack frame sits at the very top of the Call Stack?",
      a: "Function C's stack frame sits at the very top because the Call Stack follows Last-In, First-Out (LIFO) order."
    }
  ],

  challenge: {
    titleText: "Challenge: Stack Trace Analyzer",
    desc: "Explain how JavaScript engine error trace messages format stack frames when an unhandled Error is thrown inside nested functions A() -> B() -> C()."
  }
};
