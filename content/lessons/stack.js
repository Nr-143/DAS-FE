/**
 * DSA Tracker — Lesson Content: Stack (Level 2)
 * ──────────────────────────────────────────────
 * Comprehensive interactive module: LIFO Concept, Call Stack Mapping,
 * Operations (push/pop/peek/isEmpty), Undo/Redo Trace, and Visualizer.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["stack"] = {
  id: "stack",
  title: "Stack",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master the LIFO (Last In, First Out) principle, vertical container mechanics, push, pop, peek, and how stacks govern runtime call stacks and undo/redo histories.",

  definitions: [
    {
      term: "Stack",
      def: "A restricted linear data structure following the LIFO (Last In, First Out) principle: elements can only be added or removed from a single open end called the TOP."
    },
    {
      term: "LIFO (Last In, First Out)",
      def: "The ordering principle where the most recently inserted element is always the first one to be removed. Think of a stack of dinner plates or a tennis ball canister."
    },
    {
      term: "Push",
      def: "The operation that places a new element onto the TOP of the stack, incrementing the stack height."
    },
    {
      term: "Pop",
      def: "The operation that removes and returns the element currently at the TOP of the stack, decrementing the stack height."
    },
    {
      term: "Peek / Top",
      def: "The operation that inspects the topmost value without removing it or modifying the stack."
    },
    {
      term: "Stack Overflow & Underflow",
      def: "Underflow occurs when calling <code>pop()</code> on an empty stack. Overflow occurs when pushing onto a fixed-size stack that has exceeded its maximum allocated memory capacity (such as recursive Call Stack Overflow)."
    }
  ],

  howItWorksTogether: "By restricting all insertions and deletions to a single end (the top), stacks provide strict O(1) constant-time performance for both <code>push()</code> and <code>pop()</code>. You never need to shift other elements or traverse the structure. This matches the JavaScript runtime's Call Stack (covered in <a href=\"#\" class=\"lesson-cross-link\" data-topic=\"function-calls\">Function Calls</a>): each function invocation pushes a frame onto the stack, and when the function completes, its frame pops off, returning execution control to the frame immediately beneath it.",

  whyMatters: "Stacks are everywhere in computer systems: runtime function call stacks, undo/redo mechanisms in text editors, browser history back buttons, compiler syntax parsing (balanced parentheses), evaluating postfix/prefix mathematical expressions, and Depth-First Search (DFS) graph traversals.",

  interactiveWidget: "stack",

  workedExample: {
    title: "Stack LIFO Execution Trace",
    primitiveText: "<code>const stack = [];<br/><br/>stack.push(10); // stack: [10], TOP = 10<br/>stack.push(20); // stack: [10, 20], TOP = 20<br/>stack.push(30); // stack: [10, 20, 30], TOP = 30<br/><br/>const removed = stack.pop(); // returns 30, stack: [10, 20], TOP = 20<br/>const topVal = stack[stack.length - 1]; // peek: 20 (not removed)</code>",
    referenceText: "Notice that 30, the LAST item pushed, was the FIRST item popped!"
  },

  codeSnippet: `// Stack Implementation using a JavaScript Array
class Stack {
  constructor() {
    this.items = [];
  }

  // 1. PUSH — O(1)
  push(val) {
    this.items.push(val); // adds to top
  }

  // 2. POP — O(1)
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop(); // removes and returns top
  }

  // 3. PEEK — O(1)
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1]; // inspects top
  }

  // 4. IS EMPTY — O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // 5. SIZE — O(1)
  size() {
    return this.items.length;
  }
}

// Execution Example
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.pop()); // 30 (LIFO)
console.log(stack.peek()); // 20`,

  complexityNotes: [
    "push(item): O(1) Constant Time.",
    "pop(): O(1) Constant Time.",
    "peek() / top: O(1) Constant Time.",
    "isEmpty(): O(1) Constant Time.",
    "Search (if supported): O(n) Linear Time.",
    "Space Complexity: O(n) where n is the number of elements pushed."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Confusing pop() with peek()",
      desc: "<code>pop()</code> removes the top element and decreases the size. <code>peek()</code> only reads the top value while leaving the stack completely unchanged."
    },
    {
      title: "Mistake 2: Using unshift() and shift() instead of push() and pop()",
      desc: "In JavaScript, <code>unshift()</code> and <code>shift()</code> operate at index 0, requiring O(n) element shifting. Using them to build a stack degrades all operations from O(1) to O(n) linear time. Always use <code>push()</code> and <code>pop()</code> at the end of the array."
    },
    {
      title: "Mistake 3: Popping from an Empty Stack (Stack Underflow)",
      desc: "Calling <code>pop()</code> without first checking <code>isEmpty()</code> returns <code>undefined</code>. In statically typed environments, this causes a fatal runtime underflow error."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the fundamental ordering principle of a Stack?",
      options: [
        "A. FIFO (First In, First Out)",
        "B. LIFO (Last In, First Out)",
        "C. Random Access by Index",
        "D. Sorted Order by Value"
      ],
      answer: "B",
      explanation: "A stack is strictly LIFO (Last In, First Out). The most recently added item is the first one removed."
    },
    {
      question: "Q2. If you push 10, then push 20, then push 30, and then call pop(), which element is returned?",
      options: [
        "A. 10",
        "B. 20",
        "C. 30",
        "D. undefined"
      ],
      answer: "C",
      explanation: "30 was the last element pushed onto the top of the stack, so LIFO ensures it is the first element popped."
    }
  ],

  practice: [
    {
      q: "How does a compiler use a stack to check for valid matching parentheses?",
      a: "Iterate through the string. Whenever an opening bracket (`(`, `{`, `[`) is encountered, push it onto the stack. Whenever a closing bracket (`)`, `}`, `]`) is encountered, pop the top element from the stack and verify that it matches. If the stack is empty at the end, the string is balanced."
    },
    {
      q: "Why does recursive code cause a 'Maximum Call Stack Size Exceeded' error?",
      a: "Every recursive function call pushes a new execution stack frame containing arguments and local variables onto the runtime call stack. Without a proper base case, frames continue pushing until available memory is exhausted, causing a stack overflow."
    }
  ],

  challenge: {
    titleText: "Challenge: Implement a MinStack with O(1) getMin()",
    desc: "Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element `getMin()` all in O(1) constant time! Hint: Maintain an auxiliary stack that tracks the current minimum at each state level."
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 20 — Valid Parentheses. It is the quintessential stack problem for interviews and builds intuition for bracket matching.",
    workedTrace: `Input:  { [ ( ) ] }
Stack:  {
        { [
        { [ (
        { [        (closing ')' matches '(', pop)
        {          (closing ']' matches '[', pop)
        empty      (closing '}' matches '{', pop)
Result: Valid!`,
    problems: [
      { num: 20, title: "Valid Parentheses", concept: "Matching Pairs + Stack", slug: "valid-parentheses", isSuggestedStart: true, roadmapStep: 7, isImmediateNext: true },
      { num: 155, title: "Min Stack", concept: "Dual Stack Tracking", slug: "min-stack", isImmediateNext: true },
      { num: 225, title: "Implement Stack using Queues", concept: "Queue Rotation", slug: "implement-stack-using-queues" },
      { num: 232, title: "Implement Queue using Stacks", concept: "In-Out Reversal Stacks", slug: "implement-queue-using-stacks" }
    ]
  }
};
