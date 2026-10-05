/**
 * DSA Tracker — Lesson Content: Stack
 * ─────────────────────────────────────
 * Independent content module adhering to schema.
 * Includes interactive Stack widget configuration (rendered by app.js).
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["stack"] = {
  id: "stack",
  title: "Stack",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master the LIFO (Last In, First Out) data structure — push, pop, peek — and understand how it maps to the call stack from the Function Calls lesson.",

  definitions: [
    {
      term: "Stack",
      def: "A linear structure that follows LIFO (Last In, First Out): the most recently added item is the first one removed."
    },
    {
      term: "Push",
      def: "Adds an item to the top of the stack."
    },
    {
      term: "Pop",
      def: "Removes and returns the item from the top of the stack."
    },
    {
      term: "Peek (top)",
      def: "Looks at the top item without removing it."
    }
  ],

  howItWorksTogether: "A stack only exposes one end — the \"top\" — for both adding and removing. That single-ended restriction is exactly what creates LIFO order, and it's also exactly how the call stack works (see the <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"function-calls\">Function Calls</a> / <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"recursion\">Recursion</a> lessons): each call is pushed on top, and only the most recent one can pop off before the one beneath it.",

  // Flag for app.js to render the interactive Stack widget
  interactiveWidget: "stack",

  visual: {
    caption: "Figure 1: Stack — LIFO order. Push adds to top, Pop removes from top. Only the top element is accessible.",
    diagramSvg: `
      <svg class="diagram-svg" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="260" fill="var(--bg-body)" rx="12" />
        <text x="350" y="28" fill="var(--text-primary)" font-size="14" font-weight="bold" text-anchor="middle">Stack: LIFO — Last In, First Out</text>
        
        <g transform="translate(220, 45)">
          <rect x="0" y="0" width="260" height="175" fill="var(--bg-surface)" stroke="var(--border-default)" stroke-width="2" rx="10"/>
          
          <rect x="30" y="125" width="200" height="35" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="1.5" rx="5"/>
          <text x="130" y="148" fill="var(--text-primary)" font-size="13" font-weight="600" text-anchor="middle">1 (bottom)</text>
          
          <rect x="30" y="85" width="200" height="35" fill="rgba(108,99,255,0.15)" stroke="var(--accent-primary)" stroke-width="1.5" rx="5"/>
          <text x="130" y="108" fill="var(--text-primary)" font-size="13" font-weight="600" text-anchor="middle">2</text>
          
          <rect x="30" y="45" width="200" height="35" fill="rgba(45,138,104,0.12)" stroke="#2d8a68" stroke-width="2" rx="5"/>
          <text x="130" y="68" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">3 ← TOP</text>
          
          <text x="130" y="20" fill="var(--text-muted)" font-size="11" text-anchor="middle">push()/pop() here only ↑</text>
        </g>
        
        <g transform="translate(30, 60)">
          <text x="0" y="10" fill="#34d399" font-size="12" font-weight="bold">push(3)</text>
          <path d="M 55 15 Q 100 20 160 40" stroke="#2d8a68" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#stk-arrow-g)"/>
          
          <text x="0" y="65" fill="#f87171" font-size="12" font-weight="bold">pop() → 3</text>
          <path d="M 70 55 Q 110 45 155 40" stroke="#b84a4a" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#stk-arrow-r)"/>
        </g>
        
        <g transform="translate(510, 80)">
          <text x="0" y="0" fill="var(--text-muted)" font-size="11" font-weight="bold">Array state:</text>
          <text x="0" y="18" fill="var(--accent-primary)" font-size="12" font-family="monospace">[1, 2, 3]</text>
          <text x="0" y="42" fill="var(--text-muted)" font-size="11" font-weight="bold">After pop():</text>
          <text x="0" y="60" fill="#f87171" font-size="12" font-family="monospace">[1, 2]</text>
        </g>
        
        <defs>
          <marker id="stk-arrow-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2d8a68"/>
          </marker>
          <marker id="stk-arrow-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b84a4a"/>
          </marker>
        </defs>
      </svg>
    `
  },

  codeSnippet: `<span class="cm">// Stack using a plain JavaScript array</span>
<span class="kw">const</span> stack = [];

stack.<span class="fn">push</span>(<span class="num">1</span>);
stack.<span class="fn">push</span>(<span class="num">2</span>);
stack.<span class="fn">push</span>(<span class="num">3</span>);  <span class="cm">// stack is now [1, 2, 3]</span>

stack.<span class="fn">pop</span>();    <span class="cm">// returns 3 → stack is [1, 2]</span>

stack[stack.length - <span class="num">1</span>];  <span class="cm">// peek: 2, not removed</span>`,

  complexityNotes: [
    "push(): O(1) Constant Time.",
    "pop(): O(1) Constant Time.",
    "peek (top): O(1) Constant Time — everything happens at one end."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Using shift()/unshift() instead of push()/pop()",
      desc: "Using <code>shift()</code>/<code>unshift()</code> to build a stack on an array works on the <em>front</em> and is O(n), silently making every operation slow. Use <code>push()</code>/<code>pop()</code> which work at the end — O(1)."
    },
    {
      title: "Mistake 2: Expecting random access from a stack",
      desc: "A stack only exposes the top by design. Expecting to \"peek the 3rd item from the top\" defeats the purpose of the LIFO abstraction."
    }
  ],

  practice: [
    {
      q: "Question 1: Push 1, 2, 3, then pop twice — what's left, and what came out?",
      a: "First pop returns 3, second pop returns 2. What's left in the stack: [1]. LIFO order means the most recently pushed items come out first."
    },
    {
      q: "Question 2: Why would shift()/unshift() be a performance mistake for a stack?",
      a: "`shift()` and `unshift()` operate on the front of the array, which is O(n) because every element must shift. `push()`/`pop()` operate on the end — O(1). Using the wrong end makes every stack operation unnecessarily slow."
    }
  ],

  challenge: {
    titleText: "Challenge: Balanced Brackets Checker",
    desc: "Use a stack to check whether a string of brackets (e.g. <code>\"{[()]}\"</code>) is balanced. Push opening brackets, pop on closing brackets, and verify each closing bracket matches the most recent opening bracket."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 20 — Valid Parentheses.",
    workedTrace: `Input:  { [ ( ) ] }
Stack:  {
        { [
        { [ (
        { [        (closing matches, pop)
        {
        empty → valid`,
    problems: [
      { num: 20, title: "Valid Parentheses", slug: "valid-parentheses", isSuggestedStart: true, roadmapStep: 7 },
      { num: 155, title: "Min Stack", slug: "min-stack" },
      { num: 225, title: "Implement Stack using Queues", slug: "implement-stack-using-queues" },
      { num: 232, title: "Implement Queue using Stacks", slug: "implement-queue-using-stacks" }
    ]
  }
};
