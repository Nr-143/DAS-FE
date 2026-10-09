/**
 * DSA Tracker — Lesson Content: Function Calls (Page 5)
 * ──────────────────────────────────────────────────────────
 * Focused Level 1 Foundation lesson on JavaScript Function Calls:
 * - Function definition vs function call / invocation
 * - Parameters vs Arguments
 * - Function execution with conceptual memory
 * - Local variables & scope destruction on return
 * - Return value vs non-returning side-effect functions
 * - The Call Stack & Stack Frames (LIFO order)
 * - Why it's called a Stack (Plates analogy)
 * - Nested vs Sequential function calls
 * - 4 Core Invocation Patterns (Regular, Method, Constructor, Callback)
 * - Explicit invocation preview (call, apply, bind)
 * - Function call lifecycle timeline
 * - Watch JavaScript Execute (Interactive 6-Step Stepper Visualizer)
 * - LIFO Call Stack connection to DSA
 * - Unfinished functions & Stack Overflow preview
 * - Function Calls in DSA (Searching, Sorting, Tree/Graph traversals)
 * - Interactive Call Stack Playground Widget
 * - Concept Checkpoints & 22-Question Dedicated Questions Suite
 * - Bridge to Page 6: Recursion
 */

// Global state & handlers for interactive widgets
window.callStackDemoStep = 1;
window.stepCallStackDemo = function(step) {
  if (step < 1) step = 1;
  if (step > 6) step = 6;
  window.callStackDemoStep = step;

  var stackEl = document.getElementById('cs-demo-stack');
  var descEl = document.getElementById('cs-demo-desc');
  var lineEl = document.getElementById('cs-demo-active-line');

  if (!stackEl || !descEl) return;

  var steps = [
    {
      line: 'Line 11: const finalResult = calculate();',
      stack: '<div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context</div>',
      desc: '<strong>Step 1:</strong> Program starts at global scope. <code>calculate()</code> is called, preparing to create its execution frame.'
    },
    {
      line: 'Line 7: const answer = multiply(5, 4);',
      stack: '<div style="padding:10px 14px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:8px; color:var(--text-primary); font-family:\'Fira Code\',monospace; font-size:0.88rem; margin-bottom:6px;">calculate() [Active]</div><div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context</div>',
      desc: '<strong>Step 2:</strong> <code>calculate()</code> frame is pushed onto the stack. Inside <code>calculate()</code>, line 7 invokes <code>multiply(5, 4)</code>.'
    },
    {
      line: 'Line 2: const result = a * b;',
      stack: '<div style="padding:10px 14px; background:rgba(52,211,153,0.25); border:1px solid #34D399; border-radius:8px; color:var(--text-primary); font-family:\'Fira Code\',monospace; font-size:0.88rem; margin-bottom:6px;">multiply(a=5, b=4) [Running Top]</div><div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem; margin-bottom:6px;">calculate()</div><div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context</div>',
      desc: '<strong>Step 3:</strong> <code>multiply(5, 4)</code> frame is pushed to the TOP of the stack. Parameters <code>a=5, b=4</code> are initialized and <code>result=20</code> is computed.'
    },
    {
      line: 'Line 3: return result; // 20',
      stack: '<div style="padding:10px 14px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:8px; color:var(--text-primary); font-family:\'Fira Code\',monospace; font-size:0.88rem; margin-bottom:6px;">calculate() [Resumed]</div><div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context</div>',
      desc: '<strong>Step 4:</strong> <code>multiply()</code> returns <code>20</code> and its stack frame is <strong>POPPED OFF</strong>. Control returns back to <code>calculate()</code>.'
    },
    {
      line: 'Line 8: return answer; // 20',
      stack: '<div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context [Resumed]</div>',
      desc: '<strong>Step 5:</strong> <code>calculate()</code> receives <code>20</code> into <code>answer</code>, returns <code>20</code>, and its stack frame is <strong>POPPED OFF</strong>.'
    },
    {
      line: 'Line 13: console.log(finalResult); // 20',
      stack: '<div style="padding:10px 14px; background:rgba(167,139,250,0.2); border:1px solid #A78BFA; border-radius:8px; color:var(--text-primary); font-family:\'Fira Code\',monospace; font-size:0.88rem;">global context (Finished)</div>',
      desc: '<strong>Step 6:</strong> Back at global scope! <code>finalResult</code> holds <code>20</code>. Execution finishes cleanly with an empty call stack!'
    }
  ];

  var sData = steps[step - 1];
  descEl.innerHTML = sData.desc;
  stackEl.innerHTML = sData.stack;
  if (lineEl) lineEl.innerText = sData.line;

  for (var i = 1; i <= 6; i++) {
    var btn = document.getElementById('cs-demo-btn-' + i);
    if (btn) {
      btn.className = (i === step) ? 'btn btn--primary' : 'btn btn--secondary';
    }
  }
};

window.stackPlaygroundStep = 0;
window.stepStackPlayground = function(action) {
  if (action === 'next') {
    window.stackPlaygroundStep++;
    if (window.stackPlaygroundStep > 6) window.stackPlaygroundStep = 6;
  } else if (action === 'prev') {
    window.stackPlaygroundStep--;
    if (window.stackPlaygroundStep < 0) window.stackPlaygroundStep = 0;
  } else if (action === 'reset') {
    window.stackPlaygroundStep = 0;
  }

  var step = window.stackPlaygroundStep;
  var stackEl = document.getElementById('sp-stack-visual');
  var descEl = document.getElementById('sp-desc');
  if (!stackEl || !descEl) return;

  var states = [
    {
      stack: '<div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Initial State:</strong> Only the <code>global</code> execution context sits at the base of the call stack.'
    },
    {
      stack: '<div style="padding:10px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">first() [Active]</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Step 1:</strong> <code>first()</code> is called. <code>first()</code> stack frame is PUSHED onto the stack.'
    },
    {
      stack: '<div style="padding:10px; background:rgba(52,211,153,0.2); border:1px solid #34D399; border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">second() [Active]</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">first()</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Step 2:</strong> Inside <code>first()</code>, <code>second()</code> is called. <code>second()</code> frame is PUSHED on top.'
    },
    {
      stack: '<div style="padding:10px; background:rgba(244,114,182,0.25); border:1px solid #F472B6; border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">third() [Running Top]</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">second()</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">first()</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Step 3:</strong> Inside <code>second()</code>, <code>third()</code> is called. <code>third()</code> frame is PUSHED at the peak of the stack.'
    },
    {
      stack: '<div style="padding:10px; background:rgba(52,211,153,0.2); border:1px solid #34D399; border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">second() [Resumed]</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">first()</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Step 4:</strong> <code>third()</code> finishes <code>console.log("Done")</code> and <strong>POPS OFF</strong>. Control returns to <code>second()</code>.'
    },
    {
      stack: '<div style="padding:10px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; margin-bottom:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">first() [Resumed]</div><div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global</div>',
      desc: '<strong>Step 5:</strong> <code>second()</code> finishes and <strong>POPS OFF</strong>. Control returns to <code>first()</code>.'
    },
    {
      stack: '<div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.88rem;">global [Complete]</div>',
      desc: '<strong>Step 6:</strong> <code>first()</code> finishes and <strong>POPS OFF</strong>. Execution finishes back in <code>global</code> scope!'
    }
  ];

  var st = states[step];
  stackEl.innerHTML = st.stack;
  descEl.innerHTML = st.desc;
};

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["function-calls"] = {
  id: "function-calls",
  title: "Function Calls",
  levelTitle: "Level 1 — Foundations",
  summary: "Understand what happens when a function runs, how JavaScript manages function execution, and why the call stack matters in DSA.",
  interactiveWidget: "functions-visualizer",
  whyMatters: "Tracing Call Stack frames and understanding return value propagation is essential for debugging code execution, understanding memory scope, and mastering Recursion.",

  sections: [
    // 1. Page Introduction
    {
      id: "section-1-intro",
      title: "Page Introduction — Function Definition vs Call",
      tocTitle: "1. Introduction",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:22px; border-radius:12px; border:1px solid var(--border-default); margin-bottom:16px;">
          <h3 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.25rem;">Function Calls</h3>
          <p style="color:var(--text-secondary); margin-bottom:14px; font-size:0.98rem; line-height:1.65;">
            Understand what happens when a function runs, how JavaScript manages function execution, and why the call stack matters in DSA.
          </p>

          <div style="background:var(--bg-body); padding:16px; border-radius:10px; border:1px solid var(--border-accent); margin-bottom:16px;">
            <strong style="color:var(--accent-primary); font-size:1rem;">Start with a simple question:</strong>
            <p style="color:var(--text-primary); margin:6px 0 10px 0; font-size:0.95rem;">
              You write a function. When does its code actually execute?
            </p>
            <pre class="code-block" style="margin:0;"><code>function greet() {
  console.log("Hello");
}</code></pre>
          </div>

          <p style="color:var(--text-primary); font-weight:600; margin-bottom:12px;">
            💡 <strong>Defining a function does NOT execute its body.</strong> It only creates the blueprint.
          </p>

          <p style="color:var(--text-primary); margin-bottom:8px;">To run the function body, you must invoke it with parentheses:</p>
          <pre class="code-block" style="margin-bottom:14px;"><code>greet(); // The function is now being called, or invoked.</code></pre>

          <div style="background:var(--bg-body); padding:14px; border-radius:8px; border:1px dashed var(--border-accent); font-family:'Fira Code',monospace; font-size:0.88rem; text-align:center; margin-top:12px;">
            FUNCTION DEFINITION<br/>
            ↓<br/>
            <span style="color:#60A5FA;">"Here is what the function should do."</span><br/><br/>
            FUNCTION CALL<br/>
            ↓<br/>
            <span style="color:#34D399;">"Execute that function now."</span>
          </div>
        </div>
      `
    },

    // 2. Function Definition vs Function Call
    {
      id: "section-2-def-vs-call",
      title: "Function Definition vs Function Call",
      tocTitle: "2. Definition vs Call",
      contentHtml: `
        <p>A <strong>function definition</strong> describes the work. A <strong>function call</strong> asks JavaScript to perform that work.</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.98rem;">1. Function Definition</strong>
            <pre class="code-block" style="margin:8px 0 6px 0;"><code>function add(a, b) {
  return a + b;
}</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Declares the logic & parameter placeholders. Nothing executes yet.</span>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.98rem;">2. Function Call (Invocation)</strong>
            <pre class="code-block" style="margin:8px 0 6px 0;"><code>add(10, 20);</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Passes concrete arguments (10, 20) and triggers actual execution.</span>
          </div>
        </div>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem; margin-top:14px;">
          DEFINE: &nbsp; function add(a, b) { return a + b; }<br/><br/>
          CALL: &nbsp;&nbsp;&nbsp; add(10, 20); &nbsp;──▶ &nbsp;EXECUTE &nbsp;──▶ &nbsp;<span style="color:#34D399; font-weight:700;">30</span>
        </div>
      `
    },

    // 3. What Happens When a Function Is Called?
    {
      id: "section-3-execution-sequence",
      title: "What Happens When a Function Is Called?",
      tocTitle: "3. Execution Sequence",
      contentHtml: `
        <p>When JavaScript reaches a function call, execution jumps into the function body, executes its statements, and then returns to where it was called:</p>

        <pre class="code-block"><code>function greet() {
  console.log("Hello");
}

greet();</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:12px; border:1px solid var(--border-default); margin:16px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Execution Flow Sequence</h4>
          <ol style="margin:0; padding-left:20px; display:flex; flex-direction:column; gap:10px; color:var(--text-primary); font-size:0.92rem; line-height:1.6;">
            <li><strong>1. Reach Call:</strong> JavaScript reaches <code>greet()</code> in code execution.</li>
            <li><strong>2. Invocation:</strong> Function is invoked, pausing current global execution.</li>
            <li><strong>3. Enter Body:</strong> Execution jumps inside <code>greet()</code>.</li>
            <li><strong>4. Execute Statement:</strong> <code>console.log("Hello")</code> executes.</li>
            <li><strong>5. Function Finishes:</strong> End of function body reached.</li>
            <li><strong>6. Return Control:</strong> Control returns back to caller (global scope).</li>
          </ol>
        </div>
      `
    },

    // 4. Parameters vs Arguments
    {
      id: "section-4-parameters-vs-arguments",
      title: "Parameters vs Arguments",
      tocTitle: "4. Parameters vs Arguments",
      contentHtml: `
        <p>These two terms are frequently confused by beginners. Here is the exact distinction:</p>

        <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #60A5FA;">
            <strong style="color:#60A5FA; font-size:1rem;">Parameters (Placeholders)</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>function add(a, b) { ... }</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);"><code>a</code> and <code>b</code> are named variable placeholders declared in the function definition.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #34D399;">
            <strong style="color:#34D399; font-size:1rem;">Arguments (Actual Values)</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>add(10, 20);</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);"><code>10</code> and <code>20</code> are the actual concrete values passed when calling the function.</span>
          </div>
        </div>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
          ARGUMENT MAPPING:<br/><br/>
          a &nbsp;← &nbsp;<span style="color:#34D399; font-weight:700;">10</span><br/>
          b &nbsp;← &nbsp;<span style="color:#34D399; font-weight:700;">20</span>
        </div>
      `
    },

    // 5. Function Execution with Memory
    {
      id: "section-5-execution-memory",
      title: "Function Execution with Memory (Conceptual Execution Model)",
      tocTitle: "5. Execution Memory",
      contentHtml: `
        <p>During a function's execution, JavaScript needs to keep track of parameters and local variables:</p>

        <pre class="code-block"><code>function add(a, b) {
  const result = a + b;
  return result;
}

const answer = add(10, 20);</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:8px;">CONCEPTUAL EXECUTION MODEL</div>
          CALL: add(10, 20)<br/>
          ↓<br/>
          ┌──────────────────────────────────┐<br/>
          │ a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ 10 (parameter) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
          │ b &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ 20 (parameter) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
          │ result ──▶ 30 (local variable) &nbsp;&nbsp;&nbsp;│<br/>
          └──────────────────────────────────┘<br/>
          ↓<br/>
          return 30 &nbsp;──▶ &nbsp;answer ──▶ <span style="color:#34D399;">30</span>
        </div>

        <div class="callout-box callout-box--note">
          <strong>Note:</strong> This is a conceptual execution model showing how local variables and parameters exist only during function execution.
        </div>
      `
    },

    // 6. Local Variables
    {
      id: "section-6-local-variables",
      title: "Local Variables & Scope Boundaries",
      tocTitle: "6. Local Variables",
      contentHtml: `
        <p>Variables declared inside a function belong exclusively to that function call's execution context:</p>

        <pre class="code-block"><code>function calculate() {
  const x = 10;
  const y = 20;
  return x + y;
}

calculate();
// console.log(x); // ReferenceError: x is not defined!</code></pre>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.92rem;">Outside Function (Global Scope)</strong>
            <div style="font-family:'Fira Code',monospace; font-size:0.88rem; margin-top:8px;">
              x ❌ (Not accessible)<br/>
              y ❌ (Not accessible)
            </div>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.92rem;">Inside Function (Active Call)</strong>
            <div style="font-family:'Fira Code',monospace; font-size:0.88rem; margin-top:8px;">
              x ──▶ 10<br/>
              y ──▶ 20
            </div>
          </div>
        </div>

        <p style="font-size:0.9rem; color:var(--text-secondary);">
          After the function finishes executing, its execution context is no longer active, and its local variables are discarded.
        </p>
      `
    },

    // 7. Return Value
    {
      id: "section-7-return-value",
      title: "Return Value — Sending Data Back to Caller",
      tocTitle: "7. Return Value",
      contentHtml: `
        <p>The <code>return</code> statement sends a value back to the code that called the function and immediately completes execution of that function:</p>

        <pre class="code-block"><code>function square(n) {
  return n * n;
}

const result = square(5); // result receives 25</code></pre>

        <h4 style="margin-top:16px;">What if a function does NOT explicitly return a value?</h4>

        <pre class="code-block"><code>function greet() {
  console.log("Hello");
}

const output = greet();
console.log(output); // undefined</code></pre>

        <div class="callout-box callout-box--warning">
          ⚡ <strong>Implicit Undefined:</strong> In JavaScript, if a function does not have a <code>return</code> statement, it automatically returns <code>undefined</code>.
        </div>
      `
    },

    // 8. Function Call Without Return
    {
      id: "section-8-function-without-return",
      title: "Function Call Without Return (Side Effects)",
      tocTitle: "8. Call Without Return",
      contentHtml: `
        <p>A function can perform an action (a side effect) without returning a calculated value:</p>

        <pre class="code-block"><code>function printName(name) {
  console.log(name);
}

printName("Nirmal"); // Performs action (printing), no return value needed</code></pre>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.92rem;">Function A (Action / Side Effect)</strong>
            <p style="font-size:0.88rem; margin:6px 0 0 0; color:var(--text-secondary);">Performs work like <code>console.log()</code> or updating UI. No explicit return.</p>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.92rem;">Function B (Calculation)</strong>
            <p style="font-size:0.88rem; margin:6px 0 0 0; color:var(--text-secondary);">Computes result like <code>a + b</code> and returns value to caller.</p>
          </div>
        </div>
      `
    },

    // 9. Call Stack
    {
      id: "section-9-call-stack",
      title: "The Call Stack — Managing Active Function Executions",
      tocTitle: "9. The Call Stack",
      contentHtml: `
        <p>JavaScript uses a <strong>Call Stack</strong> to keep track of active function calls in your program:</p>

        <pre class="code-block"><code>function first() {
  second();
}

function second() {
  console.log("Hello");
}

first();</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:8px;">CALL STACK LIFO PROGRESSION</div>
          ┌─────────────────┐<br/>
          │ second() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ ──▶ Currently running (Top of stack)<br/>
          ├─────────────────┤<br/>
          │ first() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
          ├─────────────────┤<br/>
          │ global context &nbsp;│<br/>
          └─────────────────┘
        </div>

        <div class="callout-box callout-box--important">
          💡 <strong>LIFO Principle:</strong> The call stack operates on <strong>Last In, First Out (LIFO)</strong> order. The most recently called function is pushed on top and finishes first.
        </div>
      `
    },

    // 10. Why Is It Called a Stack?
    {
      id: "section-10-why-stack",
      title: "Why Is It Called a Stack? (Plates Analogy)",
      tocTitle: "10. Why a Stack?",
      contentHtml: `
        <p>Think of a physical stack of cafeteria plates:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
            <strong style="color:var(--text-primary);">Physical Plate Stack</strong><br/><br/>
            ┌──────────────┐<br/>
            │ Top Plate    │ ──▶ First removed<br/>
            ├──────────────┤<br/>
            │ Middle Plate │<br/>
            ├──────────────┤<br/>
            │ Bottom Plate │<br/>
            └──────────────┘
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
            <strong style="color:var(--accent-primary);">Call Stack</strong><br/><br/>
            ┌──────────────┐<br/>
            │ second()     │ ──▶ First to finish & pop<br/>
            ├──────────────┤<br/>
            │ first()      │<br/>
            ├──────────────┤<br/>
            │ global       │<br/>
            └──────────────┘
          </div>
        </div>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          This prepares you directly for learning the <strong>Stack Data Structure</strong> in Level 2!
        </p>
      `
    },

    // 11. Nested Function Calls
    {
      id: "section-11-nested-calls",
      title: "Nested Function Calls",
      tocTitle: "11. Nested Calls",
      contentHtml: `
        <p>A function can call another function inside its body, stacking frames on top of each other:</p>

        <pre class="code-block"><code>function greet() {
  sayHello();
}

function sayHello() {
  console.log("Hello");
}

greet();</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-family:'Fira Code',monospace; font-size:0.85rem;">
          greet() called &nbsp;──▶ &nbsp;sayHello() called &nbsp;──▶ &nbsp;console.log() &nbsp;──▶ &nbsp;sayHello() pops &nbsp;──▶ &nbsp;greet() pops
        </div>
      `
    },

    // 12. Sequential Function Calls
    {
      id: "section-12-sequential-calls",
      title: "Sequential Function Calls",
      tocTitle: "12. Sequential Calls",
      contentHtml: `
        <p>Compare nested calls with sequential calls where functions run one after another:</p>

        <pre class="code-block"><code>function first() {
  console.log("First");
}

function second() {
  console.log("Second");
}

first();  // Pushed, executes, pops off completely
second(); // Pushed after first() is already empty, executes, pops off</code></pre>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          Unlike nested calls, sequential calls do not remain on the stack at the same time. Each call starts with an empty stack above <code>global</code>.
        </p>
      `
    },

    // 13. Types of Function Invocation
    {
      id: "section-13-invocation-types",
      title: "Common Ways JavaScript Functions Are Invoked",
      tocTitle: "13. Invocation Types",
      contentHtml: `
        <p>Clarification: these represent <strong>different ways a function is called</strong>, not different definitions.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA;">1. Regular Function Call</strong><br/>
            <code>greet("Nirmal")</code>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399;">2. Method Call</strong><br/>
            <code>user.greet()</code>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#F472B6;">3. Constructor Call</strong><br/>
            <code>new User("Nirmal")</code>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#FBBF24;">4. Callback Invocation</strong><br/>
            <code>arr.forEach(fn)</code>
          </div>
        </div>
      `
    },

    // 14. Regular Function Call
    {
      id: "section-14-regular-call",
      title: "Type 1 — Regular Function Call",
      tocTitle: "14. Regular Call",
      contentHtml: `
        <p>The function is invoked directly using its identifier name followed by parentheses:</p>

        <pre class="code-block"><code>function greet(name) {
  return \`Hello \${name}\`;
}

greet("Nirmal"); // Regular function call</code></pre>
      `
    },

    // 15. Method Call
    {
      id: "section-15-method-call",
      title: "Type 2 — Method Call",
      tocTitle: "15. Method Call",
      contentHtml: `
        <p>When a function is attached as an object's property, calling it via the object is a <strong>method call</strong>:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  greet() {
    return \`Hello \${this.name}\`;
  }
};

user.greet(); // Method call</code></pre>

        <div class="callout-box callout-box--tip">
          💡 <strong>Brief Note on <code>this</code>:</strong> In a method call such as <code>user.greet()</code>, JavaScript provides <code>this</code> pointing to the object before the dot (<code>user</code>).
        </div>
      `
    },

    // 16. Constructor Call
    {
      id: "section-16-constructor-call",
      title: "Type 3 — Constructor Call (new)",
      tocTitle: "16. Constructor Call",
      contentHtml: `
        <p>Using the <code>new</code> keyword invokes a constructor function to instantiate a new object:</p>

        <pre class="code-block"><code>function User(name) {
  this.name = name;
}

const user = new User("Nirmal");</code></pre>

        <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); font-family:'Fira Code',monospace; font-size:0.85rem; margin-top:12px;">
          new User("Nirmal") &nbsp;──▶ &nbsp;New object allocated &nbsp;──▶ &nbsp;Properties assigned &nbsp;──▶ &nbsp;Object returned
        </div>
      `
    },

    // 17. Callback Invocation
    {
      id: "section-17-callback-invocation",
      title: "Type 4 — Callback Invocation",
      tocTitle: "17. Callback Invocation",
      contentHtml: `
        <p>A <strong>callback</strong> is a function passed as an argument to another function so it can be invoked later:</p>

        <pre class="code-block"><code>function processUser(name, callback) {
  callback(name);
}

function greet(name) {
  console.log(\`Hello \${name}\`);
}

processUser("Nirmal", greet); // greet is passed as a callback</code></pre>
      `
    },

    // 18. Callback with Array Method
    {
      id: "section-18-callback-array",
      title: "Callback with Array Methods",
      tocTitle: "18. Array Callbacks",
      contentHtml: `
        <p>Array iteration methods like <code>forEach</code> accept callbacks to process each item:</p>

        <pre class="code-block"><code>const numbers = [1, 2, 3];

// ES6 Arrow function callback
numbers.forEach(number => {
  console.log(number);
});</code></pre>
      `
    },

    // 19. Explicit Function Invocation
    {
      id: "section-19-explicit-invocation",
      title: "Explicit Function Invocation (call / apply / bind)",
      tocTitle: "19. Explicit Call",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:18px; border-radius:10px; border:1px solid var(--border-default);">
          <strong style="color:var(--accent-primary);">⚡ Advanced Preview: Explicit Invocation</strong>
          <pre class="code-block" style="margin-top:10px;"><code>function greet() {
  console.log("Hello");
}

greet.call(null);</code></pre>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin:6px 0 0 0;">
            JavaScript provides <code>call()</code>, <code>apply()</code>, and <code>bind()</code> to explicitly control invocation target and <code>this</code> context.
          </p>
        </div>
      `
    },

    // 20. Function Call Lifecycle Timeline
    {
      id: "section-20-lifecycle",
      title: "Function Call Lifecycle Timeline",
      tocTitle: "20. Call Lifecycle",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 14px 0; color:var(--text-primary);">Execution Context Lifecycle</h4>

          <div style="display:flex; flex-direction:column; gap:8px; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div>1. Invoke function call</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>2. Create execution context</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>3. Push active call onto Call Stack</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>4. Set up parameters & local variables</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>5. Execute function body statements</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>6. Compute and return value</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>7. Pop frame off Call Stack</div>
            <div>&nbsp;&nbsp;↓</div>
            <div>8. Resume caller execution</div>
          </div>
        </div>
      `
    },

    // 21. Watch JavaScript Execute (Interactive Visualizer)
    {
      id: "section-21-interactive-visualizer",
      title: "Watch JavaScript Execute — Step-by-Step Stepper",
      tocTitle: "21. Execution Stepper",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Interactive Call Stack & Execution Stepper</h4>

          <div class="responsive-grid-2col" style="margin-bottom:16px;">
            <div style="background:var(--bg-body); padding:14px; border-radius:10px; border:1px solid var(--border-default);">
              <strong style="color:var(--text-muted); font-size:0.8rem;">SOURCE CODE:</strong>
              <pre class="code-block" style="margin-top:8px; font-size:0.85rem;"><code>1: function multiply(a, b) {
2:   const result = a * b;
3:   return result;
4: }
5: 
6: function calculate() {
7:   const answer = multiply(5, 4);
8:   return answer;
9: }
10:
11: const finalResult = calculate();
12: console.log(finalResult);</code></pre>
              <div id="cs-demo-active-line" style="margin-top:8px; color:var(--accent-primary); font-weight:700; font-size:0.85rem; font-family:'Fira Code',monospace;">
                Line 11: calculate() invoked
              </div>
            </div>

            <div style="background:var(--bg-body); padding:14px; border-radius:10px; border:1px dashed var(--accent-primary);">
              <strong style="color:var(--text-muted); font-size:0.8rem;">CALL STACK STATE:</strong>
              <div id="cs-demo-stack" style="margin-top:10px; display:flex; flex-direction:column-reverse; gap:6px;">
                <div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:8px; color:var(--text-secondary); font-family:'Fira Code',monospace; font-size:0.88rem;">global context</div>
              </div>
            </div>
          </div>

          <div id="cs-demo-desc" style="background:var(--accent-gradient-subtle); padding:12px 16px; border-radius:8px; border:1px solid var(--border-accent); margin-bottom:16px; font-size:0.9rem; color:var(--text-primary);">
            <strong>Step 1:</strong> Program starts at global scope. <code>calculate()</code> is called.
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" id="cs-demo-btn-1" class="btn btn--primary" onclick="window.stepCallStackDemo(1)">Step 1</button>
            <button type="button" id="cs-demo-btn-2" class="btn btn--secondary" onclick="window.stepCallStackDemo(2)">Step 2</button>
            <button type="button" id="cs-demo-btn-3" class="btn btn--secondary" onclick="window.stepCallStackDemo(3)">Step 3</button>
            <button type="button" id="cs-demo-btn-4" class="btn btn--secondary" onclick="window.stepCallStackDemo(4)">Step 4</button>
            <button type="button" id="cs-demo-btn-5" class="btn btn--secondary" onclick="window.stepCallStackDemo(5)">Step 5</button>
            <button type="button" id="cs-demo-btn-6" class="btn btn--secondary" onclick="window.stepCallStackDemo(6)">Step 6</button>
          </div>
        </div>
      `
    },

    // 22. Call Stack — LIFO & DSA Connection
    {
      id: "section-22-lifo-dsa",
      title: "Call Stack — LIFO & DSA Connection",
      tocTitle: "22. LIFO & DSA",
      contentHtml: `
        <p>The call stack operates strictly on <strong>LIFO (Last In, First Out)</strong> order:</p>

        <pre class="code-block"><code>A() ──▶ B() ──▶ C()</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem; margin:14px 0;">
          ┌──────────┐<br/>
          │ C() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ ──▶ Leaves FIRST (Pops)<br/>
          ├──────────┤<br/>
          │ B() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ ──▶ Leaves SECOND<br/>
          ├──────────┤<br/>
          │ A() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ ──▶ Leaves LAST<br/>
          └──────────┘
        </div>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          This exact behavior makes understanding the <strong>Stack Data Structure</strong> effortless when you reach Level 2!
        </p>
      `
    },

    // 23. What Happens When a Function Never Finishes?
    {
      id: "section-23-never-finishes",
      title: "What Happens When a Function Never Finishes?",
      tocTitle: "23. Stuck Execution",
      contentHtml: `
        <p>If a function enters an infinite loop and never returns, its stack frame remains permanently on top of the call stack:</p>

        <pre class="code-block"><code>function runForever() {
  while (true) {
    // Endless loop! Never returns!
  }
}

runForever();</code></pre>

        <div class="callout-box callout-box--warning">
          ⚡ <strong>Execution Stuck:</strong> The function never returns, so execution remains trapped inside that frame. In the next lesson (<a href="#recursion" class="lesson-cross-link" data-topic="recursion">Recursion</a>), we will see another way functions can create stack frames!
        </div>
      `
    },

    // 24. Stack Overflow — Preview Only
    {
      id: "section-24-stack-overflow-preview",
      title: "Stack Overflow — Preview Only",
      tocTitle: "24. Stack Overflow",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:18px; border-radius:12px; border:1px solid var(--border-default);">
          <strong style="color:#EF4444; font-size:1rem;">Preview: RangeError: Maximum call stack size exceeded</strong>
          <pre class="code-block" style="margin-top:10px;"><code>function a() { b(); }
function b() { a(); }

a(); // Mutual recursive stack overflow!</code></pre>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin:6px 0 0 0;">
            If too many function calls accumulate without returning, the call stack runs out of memory capacity. We will explore this completely in Page 6 (Recursion).
          </p>
        </div>
      `
    },

    // 25. Function Calls and DSA
    {
      id: "section-25-dsa-connection",
      title: "Function Calls and DSA",
      tocTitle: "25. Functions & DSA",
      contentHtml: `
        <p>In Data Structures & Algorithms, functions are used continuously to break problems down:</p>

        <ul style="line-height:1.7;">
          <li><strong>Searching:</strong> <code>binarySearch(arr, target)</code></li>
          <li><strong>Sorting:</strong> <code>mergeSort(arr)</code></li>
          <li><strong>Tree Traversal:</strong> <code>traverse(node)</code></li>
          <li><strong>Graph Traversal:</strong> <code>dfs(vertex)</code></li>
        </ul>
      `
    },

    // 26. Interactive Call Stack Playground
    {
      id: "section-26-playground",
      title: "Call Stack Playground",
      tocTitle: "26. Stack Playground",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Interactive Call Stack Push & Pop Playground</h4>

          <pre class="code-block" style="margin-bottom:14px; font-size:0.85rem;"><code>function first() { second(); }
function second() { third(); }
function third() { console.log("Done"); }

first();</code></pre>

          <div style="background:var(--bg-body); padding:16px; border-radius:10px; border:1px dashed var(--accent-primary); margin-bottom:16px;">
            <strong style="color:var(--text-muted); font-size:0.78rem;">LIVE CALL STACK VISUALIZER:</strong>
            <div id="sp-stack-visual" style="margin-top:10px; display:flex; flex-direction:column-reverse; gap:6px;">
              <div style="padding:10px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:'Fira Code',monospace; font-size:0.88rem;">global</div>
            </div>
          </div>

          <div id="sp-desc" style="background:var(--accent-gradient-subtle); padding:12px 16px; border-radius:8px; border:1px solid var(--border-accent); margin-bottom:16px; font-size:0.9rem; color:var(--text-primary);">
            <strong>Initial State:</strong> Only the <code>global</code> execution context sits at the base of the call stack.
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button type="button" class="btn btn--primary" onclick="window.stepStackPlayground('next')" style="font-size:0.85rem;">▶ Push / Step Forward</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepStackPlayground('prev')" style="font-size:0.85rem;">◀ Step Back</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepStackPlayground('reset')" style="font-size:0.85rem;">🔄 Reset Stack</button>
          </div>
        </div>
      `
    },

    // 27. Common Mistakes
    {
      id: "section-27-common-mistakes",
      title: "Common Beginner Mistakes",
      tocTitle: "27. Common Mistakes",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="mistake-card">
            <div class="mistake-card__title">1. Thinking defining a function automatically executes it</div>
            <div class="mistake-card__desc">A function definition only creates the logic blueprint. You must call it with <code>fn()</code> to execute it.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">2. Confusing parameters and arguments</div>
            <div class="mistake-card__desc">Parameters are definition placeholders; arguments are actual concrete values passed during invocation.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">3. Thinking return prints a value</div>
            <div class="mistake-card__desc"><code>return</code> sends data back to the caller program. <code>console.log()</code> displays text in console.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">4. Thinking functions remain on the call stack forever</div>
            <div class="mistake-card__desc">When a function returns, its frame is immediately popped off the stack.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">5. Confusing a function definition with a function call</div>
            <div class="mistake-card__desc"><code>function add()</code> is the definition; <code>add()</code> is the invocation.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">6. Thinking nested function calls execute independently</div>
            <div class="mistake-card__desc">Inner nested functions must finish and pop off before outer functions can resume execution.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">7. Thinking callback means immediate execution when passed</div>
            <div class="mistake-card__desc">Passing a callback function passes its reference; the receiving function decides when to invoke it.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">8. Thinking the call stack is the same as the heap</div>
            <div class="mistake-card__desc">The call stack tracks active execution frames (LIFO); the heap stores dynamically allocated objects.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">9. Thinking every function call creates permanent memory</div>
            <div class="mistake-card__desc">Stack frame memory is temporary and gets freed as soon as the function returns.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">10. Saying "JavaScript runs all functions at the same time"</div>
            <div class="mistake-card__desc">JavaScript execution is single-threaded and synchronous within normal call stack execution.</div>
          </div>
        </div>
      `
    },

    // 28. Cheat Sheet
    {
      id: "section-28-cheat-sheet",
      title: "Function Calls Cheat Sheet",
      tocTitle: "28. Cheat Sheet",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">FUNCTION CALLS CHEAT SHEET</h4>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#60A5FA;">Definition:</strong><br/>
              function add(a, b)
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#34D399;">Invocation:</strong><br/>
              add(10, 20)
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#F472B6;">Return Value:</strong><br/>
              return a + b
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#FBBF24;">Call Stack Order:</strong><br/>
              LIFO (Last In, First Out)
            </div>
          </div>
        </div>
      `
    },

    // 29. Bridge to Page 6
    {
      id: "section-29-bridge-recursion",
      title: "Bridge to Page 6 — Next: Recursion",
      tocTitle: "29. Next: Recursion",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-default); text-align:center; margin-top:16px;">
          <h3 style="margin:0 0 12px 0; color:var(--text-primary); font-size:1.2rem;">Next Up: Recursion</h3>
          
          <p style="color:var(--text-secondary); max-width:550px; margin:0 auto 16px auto; line-height:1.6; font-size:0.95rem;">
            A function call normally creates one active function execution. But what happens if a function calls <strong>itself</strong>?
          </p>

          <div>
            <a href="#recursion" class="lesson-cross-link btn btn--primary" data-topic="recursion" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; font-weight:700; text-decoration:none; border-radius:8px;">
              Next: Recursion →
            </a>
          </div>
        </div>
      `
    }
  ],

  practice: [
    {
      q: "1. Predict output:\nfunction add(a, b) { return a + b; }\nconsole.log(add(2, 3));",
      a: "Result: 5. The function takes arguments 2 and 3 into parameters a and b, computes 2 + 3 = 5, and returns 5."
    },
    {
      q: "2. Predict output:\nfunction first() { console.log('A'); second(); }\nfunction second() { console.log('B'); }\nfirst();",
      a: "Result:\n'A'\n'B'\nfirst() logs 'A' first, then invokes second() which logs 'B'."
    },
    {
      q: "3. Predict output:\nfunction square(n) { return n * n; }\nconst result = square(4);\nconsole.log(result);",
      a: "Result: 16. square(4) returns 16, which is assigned to result and logged."
    },
    {
      q: "4. Predict output:\nfunction greet() { console.log('Hello'); }\nconst result = greet();\nconsole.log(result);",
      a: "Result:\n'Hello'\nundefined\ngreet() prints 'Hello'. Since greet has no explicit return statement, it implicitly returns undefined."
    }
  ],

  // 22-Question Dedicated Questions Suite for Questions Tab (Easy, Medium, Hard, Interview)
  questionSuite: [
    // Easy (Q1-Q6)
    {
      id: "q1",
      difficulty: "Easy",
      type: "mcq",
      question: "Q1. Function Call Definition: What is a function call?",
      options: ["A. Defining a function", "B. Executing/invoking a function", "C. Deleting a function", "D. Creating an object"],
      answer: "B",
      explanation: "Executing or invoking a function runs its code body statements."
    },
    {
      id: "q2",
      difficulty: "Easy",
      type: "mcq",
      question: "Q2. Parameter Identification: In `function add(a, b) {}`, what are `a` and `b`?",
      options: ["A. Arguments", "B. Parameters", "C. Variables", "D. Properties"],
      answer: "B",
      explanation: "Parameters are the named placeholders specified in the function definition."
    },
    {
      id: "q3",
      difficulty: "Easy",
      type: "mcq",
      question: "Q3. Argument Identification: In `add(10, 20)`, what are `10` and `20`?",
      options: ["A. Parameters", "B. Arguments", "C. Placeholders", "D. Return values"],
      answer: "B",
      explanation: "Arguments are the actual concrete values passed into the function at invocation time."
    },
    {
      id: "q4",
      difficulty: "Easy",
      type: "mcq",
      question: "Q4. Purpose of Return: What does the `return` statement do?",
      options: ["A. Prints text to console", "B. Stops program", "C. Sends a value back to caller and ends execution", "D. Restarts function"],
      answer: "C",
      explanation: "`return` sends a value back to the call site and pops the function frame off the call stack."
    },
    {
      id: "q5",
      difficulty: "Easy",
      type: "mcq",
      question: "Q5. Call Stack Order: What data structure ordering principle does the Call Stack follow?",
      options: ["A. FIFO (First In, First Out)", "B. LIFO (Last In, First Out)", "C. Random", "D. Alphabetical"],
      answer: "B",
      explanation: "The call stack operates on LIFO (Last In, First Out) order."
    },
    {
      id: "q6",
      difficulty: "Easy",
      type: "predict-output",
      question: "Q6. Output Prediction: What is logged by this code?",
      code: "function greet() {\n  console.log(\"Hello\");\n}\n\ngreet();",
      options: ["\"Hello\"", "undefined", "null", "Nothing"],
      answer: "\"Hello\"",
      explanation: "Invoking `greet()` executes `console.log(\"Hello\")`."
    },

    // Medium (Q7-Q13)
    {
      id: "q7",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q7. Predict Output with Return: What is logged?",
      code: "function add(a, b) {\n  return a + b;\n}\n\nconst result = add(5, 10);\nconsole.log(result);",
      options: ["5", "10", "15", "undefined"],
      answer: "15",
      explanation: "`add(5, 10)` calculates `5 + 10 = 15` and returns 15 to `result`."
    },
    {
      id: "q8",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q8. Predict Sequential Function Log: What order are lines printed?",
      code: "function first() {\n  console.log(\"First\");\n  second();\n}\n\nfunction second() {\n  console.log(\"Second\");\n}\n\nfirst();",
      options: ["\"Second\" then \"First\"", "\"First\" then \"Second\"", "\"First\" only", "\"Second\" only"],
      answer: "\"First\" then \"Second\"",
      explanation: "`first()` prints 'First' before calling `second()`, which prints 'Second'."
    },
    {
      id: "q9",
      difficulty: "Medium",
      type: "stack-trace",
      question: "Q9. Stack Trace Analysis: Given `a()` calling `b()`, which calls `c()`, what is the stack state when `c()` is executing?",
      options: ["c() at top above b(), a(), and global", "global at top above a(), b(), c()", "a() at top above b() and c()", "only c() exists"],
      answer: "c() at top above b(), a(), and global",
      explanation: "`c()` sits at the top of the stack above `b()`, `a()`, and `global`."
    },
    {
      id: "q10",
      difficulty: "Medium",
      type: "short-answer",
      question: "Q10. Parameter vs Argument Concept: What is the key distinction between parameters and arguments?",
      options: ["Parameters are values, arguments are types", "Parameters are placeholders in definition; arguments are actual values passed at call time", "They are identical terms", "Arguments are declared in definition"],
      answer: "Parameters are placeholders in definition; arguments are actual values passed at call time",
      explanation: "Parameters define input slots; arguments are concrete data passed when called."
    },
    {
      id: "q11",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q11. Missing Return Output: What is logged by the second console.log?",
      code: "function greet() {\n  console.log(\"Hello\");\n}\n\nconst result = greet();\nconsole.log(result);",
      options: ["\"Hello\" then \"Hello\"", "\"Hello\" then undefined", "undefined then \"Hello\"", "TypeError"],
      answer: "\"Hello\" then undefined",
      explanation: "`greet()` logs 'Hello', but returns `undefined` because it lacks an explicit return statement."
    },
    {
      id: "q12",
      difficulty: "Medium",
      type: "mcq",
      question: "Q12. Method Invocation Pattern: Which syntax represents a method call?",
      options: ["A. greet()", "B. user.greet()", "C. new User()", "D. callback()"],
      answer: "B",
      explanation: "Calling a function attached as an object property (e.g. `user.greet()`) is a method call."
    },
    {
      id: "q13",
      difficulty: "Medium",
      type: "mcq",
      question: "Q13. Callback Execution in Array Method: What does `[1, 2].forEach(n => console.log(n))` do?",
      options: ["Returns new array", "Invokes callback for each element", "Runs callback once", "Throws SyntaxError"],
      answer: "Invokes callback for each element",
      explanation: "`forEach` receives a callback function and invokes it once for every element in the array."
    },

    // Hard (Q14-Q17)
    {
      id: "q14",
      difficulty: "Hard",
      type: "stack-trace",
      question: "Q14. Nested Function Call Stack Trace: What is the exact return value of `outer()`?",
      code: "function outer() {\n  const result = inner();\n  return result + 10;\n}\n\nfunction inner() {\n  return 20;\n}\n\nconsole.log(outer());",
      options: ["30", "20", "10", "undefined"],
      answer: "30",
      explanation: "`inner()` returns 20 to `outer()`, which adds 10 to return 30."
    },
    {
      id: "q15",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q15. Function Continuation Order: Predict the exact output order:",
      code: "function one() {\n  console.log(\"1\");\n  two();\n  console.log(\"2\");\n}\n\nfunction two() {\n  console.log(\"3\");\n}\n\none();",
      options: ["1, 2, 3", "1, 3, 2", "3, 1, 2", "2, 1, 3"],
      answer: "1, 3, 2",
      explanation: "`one()` logs '1', calls `two()` which logs '3' and pops, then `one()` resumes to log '2'."
    },
    {
      id: "q16",
      difficulty: "Hard",
      type: "short-answer",
      question: "Q16. LIFO Call Stack Rationale: Why does the Call Stack strictly use LIFO order?",
      options: ["Because global scope requires it", "Because the most recently called function must finish before control can return to the caller function", "To preserve heap memory", "To support multi-threading"],
      answer: "Because the most recently called function must finish before control can return to the caller function",
      explanation: "Nested execution requires the inner (most recently called) function to finish and yield its result before the outer caller function can continue."
    },
    {
      id: "q17",
      difficulty: "Hard",
      type: "short-answer",
      question: "Q17. Call Stack Frame Destruction: When a function returns, what happens to its local variables?",
      options: ["They move to global scope", "They remain on call stack permanently", "The frame is popped off and local variable context is destroyed", "Stored in localStorage"],
      answer: "The frame is popped off and local variable context is destroyed",
      explanation: "Returning pops the frame off the stack and releases its local execution context."
    },

    // Interview (Q18-Q22)
    {
      id: "q18",
      difficulty: "Interview",
      type: "interview",
      question: "Q18. Defining Call Stack for Interview: What is the JavaScript Call Stack?",
      options: ["A heap region for objects", "A LIFO data structure used by the JS engine to keep track of active function execution contexts", "An async queue", "A DOM tree"],
      answer: "A LIFO data structure used by the JS engine to keep track of active function execution contexts",
      explanation: "The Call Stack is the engine's LIFO mechanism for managing active execution frames."
    },
    {
      id: "q19",
      difficulty: "Interview",
      type: "interview",
      question: "Q19. Function Call Execution Mechanics: What sequence of steps occurs conceptually when a function is invoked?",
      options: ["Context created -> frame pushed -> body executes -> frame popped on return", "Function deleted -> variable created", "Code compiled -> global scope cleared", "Heap allocated -> event loop triggered"],
      answer: "Context created -> frame pushed -> body executes -> frame popped on return",
      explanation: "Invocation pushes a frame with arguments/locals onto the call stack, executes the body, and pops the frame upon return."
    },
    {
      id: "q20",
      difficulty: "Interview",
      type: "interview",
      question: "Q20. Definition vs Call Distinction: Why is distinguishing function definition from function call crucial?",
      options: ["Definitions run code immediately", "Definitions specify the logic blueprint, while calls trigger actual execution with runtime arguments", "There is no distinction", "Calls create parameters"],
      answer: "Definitions specify the logic blueprint, while calls trigger actual execution with runtime arguments",
      explanation: "Defining creates the reusable logic blueprint; calling asks the engine to perform that work now."
    },
    {
      id: "q21",
      difficulty: "Interview",
      type: "interview",
      question: "Q21. Parameter vs Argument Distinction: Explain parameters vs arguments in an interview setting.",
      options: ["Parameters are variables in definition; arguments are actual values passed during call", "Parameters are numbers; arguments are strings", "Parameters exist at runtime; arguments exist at compile time", "Parameters are returned"],
      answer: "Parameters are variables in definition; arguments are actual values passed during call",
      explanation: "Parameters define input placeholders; arguments are concrete data passed when called."
    },
    {
      id: "q22",
      difficulty: "Interview",
      type: "interview",
      question: "Q22. Bridge to Recursion: Why is understanding the Call Stack essential before studying Recursion?",
      options: ["Recursion doesn't use functions", "Each recursive call pushes a new frame onto the stack, so understanding stack frames is key to understanding recursion depth and stack overflow", "Recursion uses FIFO queues", "Recursion disables the call stack"],
      answer: "Each recursive call pushes a new frame onto the stack, so understanding stack frames is key to understanding recursion depth and stack overflow",
      explanation: "Recursive functions repeatedly call themselves, pushing frames onto the stack until a base case returns and unwinds the stack."
    }
  ]
};
