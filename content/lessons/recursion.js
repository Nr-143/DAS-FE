/**
 * DSA Tracker — Lesson Content: Recursion (Page 6)
 * ──────────────────────────────────────────────────────────
 * Focused Level 1 Foundation lesson on JavaScript Recursion:
 * - Can a function call itself? (Introduction)
 * - What is Recursion? (Definition & Russian Dolls Analogy)
 * - Simplest Recursion Example (Countdown)
 * - The Two Parts of Recursion (Base Case vs Recursive Case)
 * - The Golden Rule of Recursion (Must eventually stop)
 * - Why Does Recursion Stop? (Moving toward Base Case)
 * - Recursion & The Call Stack ("Going Down" vs "Coming Back Up")
 * - Recursion Has Two Phases (Pre-call vs Post-call code)
 * - Practical Problem 1: Print 1 to N (Coming back phase)
 * - Practical Problem 2: Print N to 1 (Going down phase)
 * - Recursion vs Loop comparison
 * - When Should I Use Recursion? (Decision Guide & Trees preview)
 * - Types of Recursion (Direct, Indirect/Mutual, Tail, Non-Tail)
 * - Recursion with Return Values (Sum 1 to N)
 * - Factorial (Classic example)
 * - Recursion Trace Table
 * - Recursion Visualizer Stepper (3 Synchronized Areas)
 * - Debugging Recursion & Common Bugs (5 cards)
 * - Recursion vs Iteration Comparison Table
 * - Recursion in DSA (Roadmap preview: Trees, Divide & Conquer, Backtracking, DFS)
 * - Connection to Page 5 Function Calls
 * - "Go Down / Come Back Up" Phase Stepper
 * - Recursion Checklist & Debugging Checklist
 * - Recursion Cheat Sheet
 * - Concept Checkpoints & 27-Question Dedicated Questions Suite
 * - Bridge to Page 7: Time Complexity (Big-O)
 */

// Global state & handlers for interactive widgets
window.recursionVisStep = 1;
window.stepRecursionVisualizer = function(step) {
  if (step < 1) step = 1;
  if (step > 9) step = 9;
  window.recursionVisStep = step;

  var lineEl = document.getElementById('rec-vis-line');
  var stackEl = document.getElementById('rec-vis-stack');
  var returnsEl = document.getElementById('rec-vis-returns');
  var descEl = document.getElementById('rec-vis-desc');

  if (!stackEl || !descEl || !returnsEl) return;

  var steps = [
    {
      line: 'Line 5: sum(4) called',
      stack: '<div style="padding:8px 12px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem;">sum(4) [Waiting: 4 + sum(3)]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-top:4px;">global</div>',
      returns: '<div style="color:var(--text-muted); font-size:0.82rem;">Calls winding down...</div>',
      desc: '<strong>Step 1:</strong> <code>sum(4)</code> is called. It checks <code>n === 0</code> (false), so it needs <code>4 + sum(3)</code>. It pauses and calls <code>sum(3)</code>.'
    },
    {
      line: 'Line 3: sum(3) called',
      stack: '<div style="padding:8px 12px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(3) [Waiting: 3 + sum(2)]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem;">global</div>',
      returns: '<div style="color:var(--text-muted); font-size:0.82rem;">sum(4) waiting for sum(3)...</div>',
      desc: '<strong>Step 2:</strong> <code>sum(3)</code> is pushed to stack. Needs <code>3 + sum(2)</code>. Pauses and calls <code>sum(2)</code>.'
    },
    {
      line: 'Line 3: sum(2) called',
      stack: '<div style="padding:8px 12px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(2) [Waiting: 2 + sum(1)]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(3)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:var(--text-muted); font-size:0.82rem;">sum(3) waiting for sum(2)...</div>',
      desc: '<strong>Step 3:</strong> <code>sum(2)</code> is pushed. Needs <code>2 + sum(1)</code>. Pauses and calls <code>sum(1)</code>.'
    },
    {
      line: 'Line 3: sum(1) called',
      stack: '<div style="padding:8px 12px; background:rgba(96,165,250,0.2); border:1px solid #60A5FA; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(1) [Waiting: 1 + sum(0)]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(2)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(3)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:var(--text-muted); font-size:0.82rem;">sum(2) waiting for sum(1)...</div>',
      desc: '<strong>Step 4:</strong> <code>sum(1)</code> is pushed. Needs <code>1 + sum(0)</code>. Pauses and calls <code>sum(0)</code>.'
    },
    {
      line: 'Line 2: if (n === 0) return 0; // BASE CASE!',
      stack: '<div style="padding:8px 12px; background:rgba(239,68,68,0.25); border:1px solid #EF4444; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(0) [BASE CASE REACHED!]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(1)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(2)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(3)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:#EF4444; font-weight:700; font-size:0.85rem;">sum(0) returns 0!</div>',
      desc: '<strong>Step 5 (Base Case):</strong> <code>sum(0)</code> is called. <code>n === 0</code> is TRUE! Base Case returns <code>0</code> directly. Stack stops growing and begins UNWINDING!'
    },
    {
      line: 'Line 3: return 1 + 0; // returns 1',
      stack: '<div style="padding:8px 12px; background:rgba(52,211,153,0.2); border:1px solid #34D399; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(1) [Unwinding: 1 + 0 = 1]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(2)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(3)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:#34D399; font-weight:600; font-size:0.85rem;">sum(0) ──▶ 0<br/>sum(1) ──▶ 1 + 0 = 1</div>',
      desc: '<strong>Step 6:</strong> <code>sum(0)</code> pops off. <code>sum(1)</code> receives <code>0</code>, computes <code>1 + 0 = 1</code>, and returns <code>1</code>.'
    },
    {
      line: 'Line 3: return 2 + 1; // returns 3',
      stack: '<div style="padding:8px 12px; background:rgba(52,211,153,0.2); border:1px solid #34D399; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(2) [Unwinding: 2 + 1 = 3]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(3)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:#34D399; font-weight:600; font-size:0.85rem;">sum(0) ──▶ 0<br/>sum(1) ──▶ 1<br/>sum(2) ──▶ 2 + 1 = 3</div>',
      desc: '<strong>Step 7:</strong> <code>sum(1)</code> pops off. <code>sum(2)</code> receives <code>1</code>, computes <code>2 + 1 = 3</code>, and returns <code>3</code>.'
    },
    {
      line: 'Line 3: return 3 + 3; // returns 6',
      stack: '<div style="padding:8px 12px; background:rgba(52,211,153,0.2); border:1px solid #34D399; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem; margin-bottom:4px;">sum(3) [Unwinding: 3 + 3 = 6]</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; margin-bottom:4px;">sum(4)</div><div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px;">global</div>',
      returns: '<div style="color:#34D399; font-weight:600; font-size:0.85rem;">sum(0) ──▶ 0<br/>sum(1) ──▶ 1<br/>sum(2) ──▶ 3<br/>sum(3) ──▶ 3 + 3 = 6</div>',
      desc: '<strong>Step 8:</strong> <code>sum(2)</code> pops off. <code>sum(3)</code> receives <code>3</code>, computes <code>3 + 3 = 6</code>, and returns <code>6</code>.'
    },
    {
      line: 'Line 3: return 4 + 6; // returns 10',
      stack: '<div style="padding:8px 12px; background:rgba(167,139,250,0.25); border:1px solid #A78BFA; border-radius:6px; font-family:\'Fira Code\',monospace; font-size:0.85rem;">global [COMPLETE — Final Result: 10]</div>',
      returns: '<div style="color:#A78BFA; font-weight:700; font-size:0.88rem;">sum(0) ──▶ 0<br/>sum(1) ──▶ 1<br/>sum(2) ──▶ 3<br/>sum(3) ──▶ 6<br/>sum(4) ──▶ 10 (FINAL!)</div>',
      desc: '<strong>Step 9 (Final Result):</strong> <code>sum(3)</code> pops off. <code>sum(4)</code> receives <code>6</code>, computes <code>4 + 6 = 10</code>, and returns <code>10</code> to global scope! Execution complete!'
    }
  ];

  var sData = steps[step - 1];
  descEl.innerHTML = sData.desc;
  stackEl.innerHTML = sData.stack;
  returnsEl.innerHTML = sData.returns;
  if (lineEl) lineEl.innerText = sData.line;

  for (var i = 1; i <= 9; i++) {
    var btn = document.getElementById('rec-vis-btn-' + i);
    if (btn) {
      btn.className = (i === step) ? 'btn btn--primary' : 'btn btn--secondary';
    }
  }
};

window.recPhaseStep = 1;
window.stepPhaseDemo = function(step) {
  if (step < 1) step = 1;
  if (step > 7) step = 7;
  window.recPhaseStep = step;

  var visualEl = document.getElementById('rec-phase-visual');
  var descEl = document.getElementById('rec-phase-desc');
  if (!visualEl || !descEl) return;

  var phases = [
    {
      phase: 'Going Down (Phase 1)',
      visual: '<div style="color:#60A5FA; font-weight:700; font-size:1.1rem;">"before 3" logged</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(3) executes line before print(2)</div>',
      desc: '<strong>Step 1 (Going Down):</strong> <code>print(3)</code> runs <code>console.log("before", 3)</code>, outputting <strong>"before 3"</strong>, then calls <code>print(2)</code>.'
    },
    {
      phase: 'Going Down (Phase 1)',
      visual: '<div style="color:#60A5FA; font-weight:700; font-size:1.1rem;">"before 3"<br/>"before 2" logged</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(2) executes line before print(1)</div>',
      desc: '<strong>Step 2 (Going Down):</strong> <code>print(2)</code> runs <code>console.log("before", 2)</code>, outputting <strong>"before 2"</strong>, then calls <code>print(1)</code>.'
    },
    {
      phase: 'Going Down (Phase 1)',
      visual: '<div style="color:#60A5FA; font-weight:700; font-size:1.1rem;">"before 3"<br/>"before 2"<br/>"before 1" logged</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(1) executes line before print(0)</div>',
      desc: '<strong>Step 3 (Going Down):</strong> <code>print(1)</code> runs <code>console.log("before", 1)</code>, outputting <strong>"before 1"</strong>, then calls <code>print(0)</code>.'
    },
    {
      phase: 'Base Case Reached',
      visual: '<div style="color:#EF4444; font-weight:700; font-size:1.1rem;">print(0) returns immediately!</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">n === 0 is TRUE! Winding stops, unwinding begins!</div>',
      desc: '<strong>Step 4 (Base Case):</strong> <code>print(0)</code> is called. <code>if (n === 0) return;</code> triggers. It logs nothing and returns! The stack now begins coming back up!'
    },
    {
      phase: 'Coming Back Up (Phase 2)',
      visual: '<div style="color:#34D399; font-weight:700; font-size:1.1rem;">"after 1" logged</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(1) resumes after print(0) returned</div>',
      desc: '<strong>Step 5 (Coming Back Up):</strong> Control unwinds back to <code>print(1)</code>. It resumes after the call line and executes <code>console.log("after", 1)</code>, outputting <strong>"after 1"</strong>.'
    },
    {
      phase: 'Coming Back Up (Phase 2)',
      visual: '<div style="color:#34D399; font-weight:700; font-size:1.1rem;">"after 1"<br/>"after 2" logged</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(2) resumes after print(1) returned</div>',
      desc: '<strong>Step 6 (Coming Back Up):</strong> Control unwinds back to <code>print(2)</code>. It executes <code>console.log("after", 2)</code>, outputting <strong>"after 2"</strong>.'
    },
    {
      phase: 'Coming Back Up (Phase 2)',
      visual: '<div style="color:#34D399; font-weight:700; font-size:1.1rem;">"after 1"<br/>"after 2"<br/>"after 3" logged (Complete!)</div><div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(3) resumes and finishes execution</div>',
      desc: '<strong>Step 7 (Complete):</strong> Control unwinds back to initial <code>print(3)</code>. It executes <code>console.log("after", 3)</code>, outputting <strong>"after 3"</strong> and popping off!'
    }
  ];

  var p = phases[step - 1];
  visualEl.innerHTML = p.visual;
  descEl.innerHTML = p.desc;
};

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["recursion"] = {
  id: "recursion",
  title: "Recursion",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn how a function can solve a problem by calling itself, and understand how the call stack manages each recursive call.",
  whyMatters: "Recursion is the foundational technique behind trees, graphs, divide-and-conquer algorithms, and backtracking. Mastering how recursive calls wind and unwind on the call stack is essential for solving complex algorithms.",

  sections: [
    // 1. Page Introduction
    {
      id: "section-1-intro",
      title: "Page Introduction — Can a Function Call Itself?",
      tocTitle: "1. Introduction",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:22px; border-radius:12px; border:1px solid var(--border-default); margin-bottom:16px;">
          <h3 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.25rem;">Recursion</h3>
          <p style="color:var(--text-secondary); margin-bottom:14px; font-size:0.98rem; line-height:1.65;">
            Learn how a function can solve a problem by calling itself, and understand how the call stack manages each recursive call.
          </p>

          <div style="background:var(--bg-body); padding:16px; border-radius:10px; border:1px solid var(--border-accent); margin-bottom:16px;">
            <strong style="color:var(--accent-primary); font-size:1rem;">Start with a simple question:</strong>
            <p style="color:var(--text-primary); margin:6px 0 10px 0; font-size:0.95rem;">
              Can a function call itself?
            </p>
            <pre class="code-block" style="margin:0;"><code>function sayHello() {
  sayHello();
}</code></pre>
          </div>

          <p style="color:var(--text-primary); font-weight:600; margin-bottom:12px;">
            💡 <strong>Yes.</strong> But if it keeps calling itself forever, something goes wrong.
          </p>

          <div style="background:var(--bg-body); padding:14px; border-radius:8px; border:1px dashed var(--border-accent); font-family:'Fira Code',monospace; font-size:0.88rem; text-align:center; margin-top:12px;">
            Function<br/>
            ↓<br/>
            calls itself<br/>
            ↓<br/>
            smaller / simpler problem<br/>
            ↓<br/>
            calls itself again<br/>
            ↓<br/>
            <span style="color:#34D399; font-weight:700;">eventually stops</span>
          </div>

          <div style="background:var(--accent-gradient-subtle); padding:14px 18px; border-radius:8px; border:1px solid var(--border-accent); margin-top:16px; color:var(--text-primary); font-size:0.92rem;">
            🎯 <strong>The Two Ingredients of Recursion:</strong><br/>
            1. <strong>Base Case:</strong> The stopping condition that prevents infinite execution.<br/>
            2. <strong>Recursive Case:</strong> The part where the function calls itself with a smaller input.
          </div>
        </div>
      `
    },

    // 2. What Is Recursion?
    {
      id: "section-2-what-is-recursion",
      title: "What Is Recursion?",
      tocTitle: "2. What Is Recursion?",
      contentHtml: `
        <p>In beginner-friendly language:</p>

        <blockquote style="margin:14px 0; padding:14px 18px; background:var(--bg-surface); border-left:4px solid var(--accent-primary); border-radius:0 8px 8px 0; font-weight:500;">
          <strong>Recursion</strong> is a technique where a function calls itself to solve a problem by working on a smaller or simpler version of the same problem.
        </blockquote>

        <h4 style="margin-top:16px; color:var(--text-primary);">Real-World Analogy: Russian Nesting Dolls (Matryoshka)</h4>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; font-family:'Fira Code',monospace; font-size:0.88rem; text-align:center;">
          ┌───────────────────────────┐<br/>
          │ Large Outer Doll &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
          │ &nbsp;&nbsp;┌─────────────────────┐ │<br/>
          │ &nbsp;&nbsp;│ Medium Inner Doll &nbsp;&nbsp;│ │<br/>
          │ &nbsp;&nbsp;│ &nbsp;&nbsp;┌──────────────┐ &nbsp;│ │<br/>
          │ &nbsp;&nbsp;│ &nbsp;&nbsp;│ Smallest Doll│ &nbsp;│ │ ──▶ Base Case! Cannot open further!<br/>
          │ &nbsp;&nbsp;│ &nbsp;&nbsp;└──────────────┘ &nbsp;│ │<br/>
          │ &nbsp;&nbsp;└─────────────────────┘ │<br/>
          └───────────────────────────┘
        </div>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          Opening each doll reveals a smaller version of the exact same structure until you reach the tiny solid core (the base case) that cannot be opened any further.
        </p>
      `
    },

    // 3. The Simplest Recursion Example
    {
      id: "section-3-simplest-example",
      title: "The Simplest Recursion Example (Countdown)",
      tocTitle: "3. Countdown Example",
      contentHtml: `
        <p>Let's examine a simple countdown function from <code>n</code> down to <code>0</code>:</p>

        <pre class="code-block"><code>function countdown(n) {
  console.log(n);

  if (n === 0) {
    return; // Base Case: Stop!
  }

  countdown(n - 1); // Recursive Case: Call with smaller input
}

countdown(3);</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-family:'Fira Code',monospace; font-size:0.88rem;">
          Console Output:<br/>
          3<br/>
          2<br/>
          1<br/>
          0
        </div>

        <h4 style="margin-top:14px;">Line-by-Line Execution Tracing:</h4>
        <ul style="line-height:1.7; font-size:0.92rem;">
          <li><code>countdown(3)</code> prints <code>3</code>, then invokes <code>countdown(2)</code>.</li>
          <li><code>countdown(2)</code> prints <code>2</code>, then invokes <code>countdown(1)</code>.</li>
          <li><code>countdown(1)</code> prints <code>1</code>, then invokes <code>countdown(0)</code>.</li>
          <li><code>countdown(0)</code> prints <code>0</code>, meets <code>if (n === 0) return;</code>, and <strong>STOPS</strong>!</li>
        </ul>
      `
    },

    // 4. The Two Parts of Recursion
    {
      id: "section-4-two-parts",
      title: "The Two Parts of Recursion — Base Case & Recursive Case",
      tocTitle: "4. The Two Parts",
      contentHtml: `
        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); border-top:4px solid #EF4444;">
            <strong style="color:#EF4444; font-size:1rem;">1. Base Case (Stopping Condition)</strong>
            <pre class="code-block" style="margin:8px 0 6px 0;"><code>if (n === 0) {
  return;
}</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);">tells the function when to stop calling itself and return.</span>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); border-top:4px solid #60A5FA;">
            <strong style="color:#60A5FA; font-size:1rem;">2. Recursive Case (Self-Invocation)</strong>
            <pre class="code-block" style="margin:8px 0 6px 0;"><code>countdown(n - 1);</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);">calls the function again with a reduced input (<code>n - 1</code>).</span>
          </div>
        </div>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem; margin-top:14px;">
          3 &nbsp;──▶ &nbsp;2 &nbsp;──▶ &nbsp;1 &nbsp;──▶ &nbsp;0 &nbsp;──▶ &nbsp;<span style="color:#EF4444; font-weight:700;">STOP! (Base Case)</span>
        </div>
      `
    },

    // 5. The Golden Rule of Recursion
    {
      id: "section-5-golden-rule",
      title: "The Golden Rule of Recursion",
      tocTitle: "5. Golden Rule",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h3 style="margin:0 0 10px 0; color:var(--accent-primary); font-size:1.15rem;">👑 The Golden Rule of Recursion</h3>
          <p style="color:var(--text-primary); font-weight:600; font-size:1rem; margin-bottom:14px;">
            Every recursive function MUST have a base case that is guaranteed to be reached.
          </p>

          <p style="color:var(--text-secondary); margin-bottom:10px; font-size:0.92rem;">Consider what happens if a function lacks a base case:</p>

          <pre class="code-block" style="margin-bottom:12px;"><code>function bad(n) {
  bad(n); // No base case! Same argument passed endlessly!
}</code></pre>

          <div class="callout-box callout-box--warning">
            ⚡ <strong>Stack Overflow:</strong> Without a base case, calls pile up endlessly until the engine throws:<br/>
            <code>RangeError: Maximum call stack size exceeded</code>
          </div>
        </div>
      `
    },

    // 6. Why Does Recursion Stop?
    {
      id: "section-6-why-stops",
      title: "Why Does Recursion Stop? (Moving Toward Base Case)",
      tocTitle: "6. Moving Toward Base",
      contentHtml: `
        <p>A base case alone is not enough — the argument passed to the recursive call must make measurable progress toward the base case:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.92rem;">BAD: Makes No Progress</strong>
            <pre class="code-block" style="margin-top:6px;"><code>function count(n) {
  if (n === 0) return;
  count(n); // Same n! Never reaches 0!
}</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.92rem;">GOOD: Moves Toward Base Case</strong>
            <pre class="code-block" style="margin-top:6px;"><code>function count(n) {
  if (n === 0) return;
  count(n - 1); // Decrements n! Reaches 0!
}</code></pre>
          </div>
        </div>
      `
    },

    // 7. Recursion and the Call Stack
    {
      id: "section-7-call-stack-progression",
      title: "Recursion and the Call Stack — \"Going Down\" vs \"Coming Back\"",
      tocTitle: "7. Going Down vs Back",
      contentHtml: `
        <p>Connecting Page 5 (Function Calls) to Page 6: Each recursive call pushes a new stack frame onto the Call Stack!</p>

        <pre class="code-block"><code>function count(n) {
  if (n === 0) return;
  count(n - 1);
}

count(3);</code></pre>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.95rem;">1. CALLING ("Going Down" Phase)</strong>
            <div style="font-family:'Fira Code',monospace; font-size:0.85rem; margin-top:8px;">
              ┌──────────────┐<br/>
              │ count(0)     │ ──▶ Base Case! Stops stack growth.<br/>
              ├──────────────┤<br/>
              │ count(1)     │<br/>
              ├──────────────┤<br/>
              │ count(2)     │<br/>
              ├──────────────┤<br/>
              │ count(3)     │<br/>
              ├──────────────┤<br/>
              │ global       │<br/>
              └──────────────┘
            </div>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.95rem;">2. RETURNING ("Coming Back Up" Phase)</strong>
            <div style="font-family:'Fira Code',monospace; font-size:0.85rem; margin-top:8px;">
              count(0) returns ──▶ Pops off<br/>
              &nbsp;&nbsp;↓<br/>
              count(1) returns ──▶ Pops off<br/>
              &nbsp;&nbsp;↓<br/>
              count(2) returns ──▶ Pops off<br/>
              &nbsp;&nbsp;↓<br/>
              count(3) returns ──▶ Pops off<br/>
              &nbsp;&nbsp;↓<br/>
              global context continues!
            </div>
          </div>
        </div>
      `
    },

    // 8. Recursion Has Two Phases
    {
      id: "section-8-two-phases",
      title: "Recursion Has Two Phases — Code Before vs After Call",
      tocTitle: "8. Two Execution Phases",
      contentHtml: `
        <p>Observe what happens when statements exist both before and after the recursive call line:</p>

        <pre class="code-block"><code>function count(n) {
  if (n === 0) return;

  console.log("before", n); // Phase 1: Going Down
  count(n - 1);
  console.log("after", n);  // Phase 2: Coming Back Up
}

count(3);</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-family:'Fira Code',monospace; font-size:0.88rem;">
          Output Log:<br/>
          <span style="color:#60A5FA;">before 3</span> &nbsp;(Going down)<br/>
          <span style="color:#60A5FA;">before 2</span> &nbsp;(Going down)<br/>
          <span style="color:#60A5FA;">before 1</span> &nbsp;(Going down)<br/>
          <span style="color:#34D399;">after 1</span> &nbsp;&nbsp;(Coming back up)<br/>
          <span style="color:#34D399;">after 2</span> &nbsp;&nbsp;(Coming back up)<br/>
          <span style="color:#34D399;">after 3</span> &nbsp;&nbsp;(Coming back up)
        </div>

        <div class="callout-box callout-box--important">
          💡 <strong>Key Rule:</strong> Code before the recursive call executes while winding down the stack. Code after the recursive call executes while unwinding back up!
        </div>
      `
    },

    // 9. Practical Problem 1 — Print 1 to N
    {
      id: "section-9-print-1-to-n",
      title: "First Practical Problem — Print 1 to N",
      tocTitle: "9. Print 1 to N",
      contentHtml: `
        <p>To print numbers in ascending order (1 to N), place the <code>console.log(n)</code> statement AFTER the recursive call:</p>

        <pre class="code-block"><code>function printNumbers(n) {
  if (n === 0) return;

  printNumbers(n - 1); // Winds call stack down first!
  console.log(n);      // Logs while unwinding coming back up!
}

printNumbers(5); // Logs: 1, 2, 3, 4, 5</code></pre>
      `
    },

    // 10. Practical Problem 2 — Print N to 1
    {
      id: "section-10-print-n-to-1",
      title: "Second Practical Problem — Print N to 1",
      tocTitle: "10. Print N to 1",
      contentHtml: `
        <p>To print numbers in descending order (N to 1), place <code>console.log(n)</code> BEFORE the recursive call:</p>

        <pre class="code-block"><code>function printReverse(n) {
  if (n === 0) return;

  console.log(n);     // Logs immediately while going down!
  printReverse(n - 1);
}

printReverse(5); // Logs: 5, 4, 3, 2, 1</code></pre>
      `
    },

    // 11. Recursion vs Loop
    {
      id: "section-11-recursion-vs-loop",
      title: "Recursion vs Loop",
      tocTitle: "11. Recursion vs Loop",
      contentHtml: `
        <p>Compare solving the same task using an iterative loop vs a recursive function:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.95rem;">Iterative Loop</strong>
            <pre class="code-block" style="margin-top:6px;"><code>for (let i = 5; i >= 1; i--) {
  console.log(i);
}</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.95rem;">Recursive Function</strong>
            <pre class="code-block" style="margin-top:6px;"><code>function count(n) {
  if (n === 0) return;
  console.log(n);
  count(n - 1);
}
count(5);</code></pre>
          </div>
        </div>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          Both snippets produce identical output. Recursion shines when solving self-similar nested structures like Trees, Directories, Graphs, and Divide-and-Conquer algorithms!
        </p>
      `
    },

    // 12. When Should I Use Recursion?
    {
      id: "section-12-when-to-use",
      title: "When Should I Use Recursion? (Decision Guide)",
      tocTitle: "12. When to Use",
      contentHtml: `
        <p>Use recursion when a problem naturally breaks down into smaller versions of itself:</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA;">1. Trees & Subtrees</strong><br/>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Each child node is the root of a smaller subtree.</span>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399;">2. Nested Directories</strong><br/>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Folders containing subfolders containing files.</span>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#F472B6;">3. Divide & Conquer</strong><br/>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Splitting array into halves (Merge Sort).</span>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#FBBF24;">4. Backtracking</strong><br/>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Exploring paths and undoing choices (Mazes).</span>
          </div>
        </div>
      `
    },

    // 13. Types of Recursion
    {
      id: "section-13-types-of-recursion",
      title: "Types of Recursion (Direct, Indirect, Tail, Non-Tail)",
      tocTitle: "13. Types of Recursion",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.98rem;">1. Direct Recursion</strong>
            <pre class="code-block" style="margin:6px 0;"><code>function count(n) {
  if (n === 0) return;
  count(n - 1); // Directly calls itself
}</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.98rem;">2. Indirect / Mutual Recursion</strong>
            <pre class="code-block" style="margin:6px 0;"><code>function even(n) {
  if (n === 0) return true;
  return odd(n - 1); // Calls odd
}

function odd(n) {
  if (n === 0) return false;
  return even(n - 1); // Calls even
}</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#F472B6; font-size:0.98rem;">3. Tail Recursion</strong>
            <pre class="code-block" style="margin:6px 0;"><code>function count(n) {
  if (n === 0) return;
  console.log(n);
  return count(n - 1); // Recursive call is the absolute final operation
}</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Note: Standard JS engines do not guarantee Tail-Call Optimization (TCO) across all environments.</span>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#FBBF24; font-size:0.98rem;">4. Non-Tail Recursion</strong>
            <pre class="code-block" style="margin:6px 0;"><code>function count(n) {
  if (n === 0) return;
  count(n - 1);
  console.log(n); // Work remains AFTER the recursive call returns!
}</code></pre>
          </div>
        </div>
      `
    },

    // 14. Recursion with Return Values
    {
      id: "section-14-return-values",
      title: "Recursion with Return Values — Sum from 1 to N",
      tocTitle: "14. Return Values",
      contentHtml: `
        <p>When recursion calculates and returns data, each frame waits for its child call's returned value:</p>

        <pre class="code-block"><code>function sum(n) {
  if (n === 0) {
    return 0; // Base Case
  }

  return n + sum(n - 1); // Recursive Case
}

console.log(sum(4)); // 10</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-family:'Fira Code',monospace; font-size:0.88rem;">
          WINDING DOWN (Calls):<br/>
          sum(4) = 4 + sum(3)<br/>
          sum(3) = 3 + sum(2)<br/>
          sum(2) = 2 + sum(1)<br/>
          sum(1) = 1 + sum(0)<br/>
          sum(0) = 0 (Base Case!)<br/><br/>
          UNWINDING UP (Returns):<br/>
          sum(0) ──▶ 0<br/>
          sum(1) ──▶ 1 + 0 = 1<br/>
          sum(2) ──▶ 2 + 1 = 3<br/>
          sum(3) ──▶ 3 + 3 = 6<br/>
          sum(4) ──▶ 4 + 6 = <span style="color:#34D399; font-weight:700;">10</span>
        </div>
      `
    },

    // 15. Factorial Example
    {
      id: "section-15-factorial",
      title: "Factorial — Classic Recursion Example",
      tocTitle: "15. Factorial Example",
      contentHtml: `
        <p>Factorial of <code>n</code> (written <code>n!</code>) is the product of all positive integers less than or equal to <code>n</code> (with <code>0! = 1</code>):</p>

        <pre class="code-block"><code>function factorial(n) {
  if (n === 0) {
    return 1; // Base Case: 0! = 1
  }

  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)</code></pre>
      `
    },

    // 16. Recursion Trace Table
    {
      id: "section-16-trace-table",
      title: "Recursion Trace Table",
      tocTitle: "16. Trace Table",
      contentHtml: `
        <p>A trace table helps visualize function execution during winding and unwinding phases:</p>

        <div class="concept-table-wrapper">
          <table class="concept-table">
            <thead>
              <tr>
                <th>Call Frame</th>
                <th>Expression / Action</th>
                <th>Status / Returned Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sum(3)</code></td>
                <td><code>3 + sum(2)</code></td>
                <td>Waits for <code>sum(2)</code></td>
              </tr>
              <tr>
                <td><code>sum(2)</code></td>
                <td><code>2 + sum(1)</code></td>
                <td>Waits for <code>sum(1)</code></td>
              </tr>
              <tr>
                <td><code>sum(1)</code></td>
                <td><code>1 + sum(0)</code></td>
                <td>Waits for <code>sum(0)</code></td>
              </tr>
              <tr>
                <td><code>sum(0)</code></td>
                <td><code>if (n === 0) return 0</code></td>
                <td><strong style="color:#EF4444;">Returns 0 (Base Case)</strong></td>
              </tr>
              <tr>
                <td><code>sum(1)</code></td>
                <td><code>1 + 0</code></td>
                <td><strong style="color:#34D399;">Returns 1</strong></td>
              </tr>
              <tr>
                <td><code>sum(2)</code></td>
                <td><code>2 + 1</code></td>
                <td><strong style="color:#34D399;">Returns 3</strong></td>
              </tr>
              <tr>
                <td><code>sum(3)</code></td>
                <td><code>3 + 3</code></td>
                <td><strong style="color:#34D399;">Returns 6</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // 17. Recursion Visualizer & Stepper
    {
      id: "section-17-interactive-visualizer",
      title: "Recursion Visualizer — Synchronized 3-Area Stepper",
      tocTitle: "17. Recursion Visualizer",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Interactive Recursion Stepper (sum(4))</h4>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:16px;">
            <div style="background:var(--bg-body); padding:14px; border-radius:10px; border:1px solid var(--border-default);">
              <strong style="color:var(--text-muted); font-size:0.8rem;">1. CODE:</strong>
              <pre class="code-block" style="margin-top:8px; font-size:0.85rem;"><code>1: function sum(n) {
2:   if (n === 0) return 0;
3:   return n + sum(n - 1);
4: }
5: sum(4);</code></pre>
              <div id="rec-vis-line" style="margin-top:6px; color:var(--accent-primary); font-weight:700; font-size:0.82rem; font-family:'Fira Code',monospace;">
                Line 5: sum(4) called
              </div>
            </div>

            <div style="background:var(--bg-body); padding:14px; border-radius:10px; border:1px dashed var(--accent-primary);">
              <strong style="color:var(--text-muted); font-size:0.8rem;">2. CALL STACK:</strong>
              <div id="rec-vis-stack" style="margin-top:8px; display:flex; flex-direction:column-reverse; gap:4px;">
                <div style="padding:8px 12px; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:6px; font-family:'Fira Code',monospace; font-size:0.85rem;">global</div>
              </div>
            </div>

            <div style="background:var(--bg-body); padding:14px; border-radius:10px; border:1px solid var(--border-default);">
              <strong style="color:var(--text-muted); font-size:0.8rem;">3. RETURN VALUES:</strong>
              <div id="rec-vis-returns" style="margin-top:8px; font-family:'Fira Code',monospace;">
                <div style="color:var(--text-muted); font-size:0.82rem;">Calls winding down...</div>
              </div>
            </div>
          </div>

          <div id="rec-vis-desc" style="background:var(--accent-gradient-subtle); padding:12px 16px; border-radius:8px; border:1px solid var(--border-accent); margin-bottom:16px; font-size:0.9rem; color:var(--text-primary);">
            <strong>Step 1:</strong> <code>sum(4)</code> is called. It needs <code>4 + sum(3)</code>. Pauses and calls <code>sum(3)</code>.
          </div>

          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" id="rec-vis-btn-1" class="btn btn--primary" onclick="window.stepRecursionVisualizer(1)">Step 1</button>
            <button type="button" id="rec-vis-btn-2" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(2)">Step 2</button>
            <button type="button" id="rec-vis-btn-3" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(3)">Step 3</button>
            <button type="button" id="rec-vis-btn-4" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(4)">Step 4</button>
            <button type="button" id="rec-vis-btn-5" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(5)">Step 5 (Base)</button>
            <button type="button" id="rec-vis-btn-6" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(6)">Step 6</button>
            <button type="button" id="rec-vis-btn-7" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(7)">Step 7</button>
            <button type="button" id="rec-vis-btn-8" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(8)">Step 8</button>
            <button type="button" id="rec-vis-btn-9" class="btn btn--secondary" onclick="window.stepRecursionVisualizer(9)">Step 9 (Final)</button>
          </div>
        </div>
      `
    },

    // 18. Debugging Recursion
    {
      id: "section-18-debugging-recursion",
      title: "Debugging Recursion",
      tocTitle: "18. Debugging",
      contentHtml: `
        <p>When debugging recursion, look for two core failure modes:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.92rem;">Bug 1: Missing Base Case</strong>
            <pre class="code-block" style="margin-top:6px;"><code>function count(n) {
  // Missing base case!
  count(n - 1);
}</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.92rem;">Bug 2: Input Moves Away</strong>
            <pre class="code-block" style="margin-top:6px;"><code>function count(n) {
  if (n === 0) return;
  count(n + 1); // Moves away from 0!
}</code></pre>
          </div>
        </div>
      `
    },

    // 19. Common Recursion Bugs
    {
      id: "section-19-common-bugs",
      title: "Common Recursion Bugs (5 Cards)",
      tocTitle: "19. Common Bugs",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="mistake-card">
            <div class="mistake-card__title">1. No base case specified</div>
            <div class="mistake-card__desc">Functions call themselves indefinitely, causing <code>RangeError: Maximum call stack size exceeded</code>.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">2. Base case condition can never be reached</div>
            <div class="mistake-card__desc">The argument moves in the wrong direction (e.g. <code>count(n + 1)</code> when checking for <code>n === 0</code>).</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">3. Wrong base case return value</div>
            <div class="mistake-card__desc">Returning <code>0</code> in <code>factorial(n)</code> instead of <code>1</code>, causing all multiplications to return <code>0</code>.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">4. Forgetting the return statement on the recursive call</div>
            <div class="mistake-card__desc">Writing <code>n + sum(n - 1)</code> without <code>return</code>, causing the function to yield <code>undefined</code>.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">5. Not making progress toward stopping condition</div>
            <div class="mistake-card__desc">Passing <code>n</code> unchanged instead of <code>n - 1</code> in recursive calls.</div>
          </div>
        </div>
      `
    },

    // 20. Recursion vs Iteration Comparison Table
    {
      id: "section-20-comparison-table",
      title: "Recursion vs Iteration Comparison Table",
      tocTitle: "20. Recursion vs Iteration",
      contentHtml: `
        <div class="concept-table-wrapper">
          <table class="concept-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Recursion</th>
                <th>Iteration (Loop)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mechanism</strong></td>
                <td>Function calls itself repeatedly</td>
                <td>Loop constructs (<code>for</code>, <code>while</code>) repeat</td>
              </tr>
              <tr>
                <td><strong>Stopping Condition</strong></td>
                <td>Base case (e.g. <code>if (n === 0) return</code>)</td>
                <td>Loop condition (e.g. <code>i >= 1</code>)</td>
              </tr>
              <tr>
                <td><strong>Memory Overhead</strong></td>
                <td>Uses Call Stack frames per call</td>
                <td>Uses local loop state (constant space)</td>
              </tr>
              <tr>
                <td><strong>Best Suited For</strong></td>
                <td>Hierarchical/nested data (Trees, Graphs, Divide & Conquer)</td>
                <td>Linear sequence iteration (Arrays, Countdowns)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // 21. Recursion and DSA (Roadmap Preview)
    {
      id: "section-21-dsa-connection",
      title: "Recursion and DSA (Future Roadmap)",
      tocTitle: "21. Recursion in DSA",
      contentHtml: `
        <p>Recursion is a foundational problem-solving technique for upcoming DSA topics on your roadmap:</p>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.85rem; margin:14px 0;">
          RECURSION<br/>
          ├── Trees (Root node recursively calls left & right child subtrees)<br/>
          ├── Divide & Conquer (Merge Sort & Quick Sort)<br/>
          ├── Backtracking (N-Queens, Sudoku, Maze solvers)<br/>
          └── Graph Traversals (Depth-First Search - DFS)
        </div>
      `
    },

    // 22. Connection to Page 5 Function Calls
    {
      id: "section-22-connection-page5",
      title: "Connection to Page 5 — Function Calls",
      tocTitle: "22. Connection to Page 5",
      contentHtml: `
        <div style="background:var(--accent-gradient-subtle); padding:18px; border-radius:10px; border:1px solid var(--border-accent);">
          <strong style="color:var(--text-primary); font-size:1rem;">💡 Bridge from Page 5:</strong>
          <p style="color:var(--text-secondary); margin:6px 0 0 0; line-height:1.65; font-size:0.95rem;">
            Recursion is not a separate engine feature. It simply uses standard function calls repeatedly! Every recursive invocation follows the exact same Call Stack push and pop rules learned in Page 5.
          </p>
        </div>
      `
    },

    // 23. "Go Down / Come Back Up" Interactive Phase Stepper
    {
      id: "section-23-phase-stepper",
      title: "\"Go Down / Come Back Up\" Phase Stepper",
      tocTitle: "23. Phase Stepper",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Interactive Execution Phase Stepper (print(3))</h4>

          <pre class="code-block" style="margin-bottom:14px; font-size:0.85rem;"><code>function print(n) {
  if (n === 0) return;
  console.log("before", n);
  print(n - 1);
  console.log("after", n);
}</code></pre>

          <div id="rec-phase-visual" style="background:var(--bg-body); padding:16px; border-radius:10px; border:1px dashed var(--accent-primary); text-align:center; margin-bottom:14px;">
            <div style="color:#60A5FA; font-weight:700; font-size:1.1rem;">"before 3" logged</div>
            <div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">print(3) executes line before print(2)</div>
          </div>

          <div id="rec-phase-desc" style="background:var(--bg-surface); padding:12px 16px; border-radius:8px; border:1px solid var(--border-default); margin-bottom:16px; font-size:0.9rem; color:var(--text-primary);">
            <strong>Step 1 (Going Down):</strong> <code>print(3)</code> runs <code>console.log("before", 3)</code>, outputting <strong>"before 3"</strong>, then calls <code>print(2)</code>.
          </div>

          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" class="btn btn--primary" onclick="window.stepPhaseDemo(1)">Step 1</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(2)">Step 2</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(3)">Step 3</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(4)">Step 4 (Base)</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(5)">Step 5</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(6)">Step 6</button>
            <button type="button" class="btn btn--secondary" onclick="window.stepPhaseDemo(7)">Step 7 (Final)</button>
          </div>
        </div>
      `
    },

    // 24. Recursion Checklist & Debugging Checklist
    {
      id: "section-24-checklists",
      title: "Recursion Checklist & Debugging Guide",
      tocTitle: "24. Checklists",
      contentHtml: `
        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:var(--accent-primary); font-size:0.98rem;">📋 Pre-Writing Checklist</strong>
            <ul style="margin:8px 0 0 0; padding-left:18px; line-height:1.6; font-size:0.88rem; color:var(--text-secondary);">
              <li>What is the smallest subproblem?</li>
              <li>What is the Base Case condition?</li>
              <li>What should the Base Case return?</li>
              <li>Does the Recursive Case make progress toward base case?</li>
              <li>Am I returning the recursive result?</li>
            </ul>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.98rem;">🐞 Debugging Checklist</strong>
            <ol style="margin:8px 0 0 0; padding-left:18px; line-height:1.6; font-size:0.88rem; color:var(--text-secondary);">
              <li>Check if base case condition is met.</li>
              <li>Check if argument moves toward base case.</li>
              <li>Verify return keyword is present.</li>
              <li>Manually trace first 3 calls.</li>
              <li>Trace stack unwinding returns.</li>
            </ol>
          </div>
        </div>
      `
    },

    // 25. Recursion Cheat Sheet
    {
      id: "section-25-cheat-sheet",
      title: "Recursion Cheat Sheet",
      tocTitle: "25. Cheat Sheet",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">RECURSION CHEAT SHEET</h4>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#EF4444;">Base Case:</strong><br/>
              if (n === 0) return 0;
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#60A5FA;">Recursive Case:</strong><br/>
              return n + sum(n - 1);
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#34D399;">Phases:</strong><br/>
              Winding (down)<br/>
              Unwinding (up)
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#FBBF24;">Danger:</strong><br/>
              No base case = Stack Overflow
            </div>
          </div>
        </div>
      `
    },

    // 26. Bridge to Page 7
    {
      id: "section-26-bridge-time-complexity",
      title: "Page Completion & Next: Time Complexity (Big-O)",
      tocTitle: "26. Next: Big-O",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-default); text-align:center; margin-top:16px;">
          <h3 style="margin:0 0 12px 0; color:var(--text-primary); font-size:1.2rem;">Next Up: Time Complexity (Big-O)</h3>
          
          <p style="color:var(--text-secondary); max-width:580px; margin:0 auto 16px auto; line-height:1.6; font-size:0.95rem;">
            Now that you can write and trace recursive algorithms, the next question is: <strong>how much time does an algorithm take as input grows?</strong>
          </p>

          <div>
            <a href="#time-complexity" class="lesson-cross-link btn btn--primary" data-topic="time-complexity" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; font-weight:700; text-decoration:none; border-radius:8px;">
              Next: Time Complexity (Big-O) →
            </a>
          </div>
        </div>
      `
    }
  ],

  practice: [
    {
      q: "1. Predict output:\nfunction count(n) {\n  if (n === 0) return;\n  console.log(n);\n  count(n - 1);\n}\ncount(3);",
      a: "Result: 3, 2, 1. console.log(n) executes before the recursive call while going down the stack."
    },
    {
      q: "2. Predict output:\nfunction count(n) {\n  if (n === 0) return;\n  count(n - 1);\n  console.log(n);\n}\ncount(3);",
      a: "Result: 1, 2, 3. console.log(n) executes after the recursive call while unwinding back up the stack."
    },
    {
      q: "3. Predict output:\nfunction sum(n) {\n  if (n === 0) return 0;\n  return n + sum(n - 1);\n}\nconsole.log(sum(3));",
      a: "Result: 6. Computes 3 + sum(2) = 3 + 2 + sum(1) = 3 + 2 + 1 + 0 = 6."
    },
    {
      q: "4. Predict output:\nfunction test(n) {\n  if (n === 0) return;\n  test(n - 1);\n  console.log(n);\n}\ntest(4);",
      a: "Result: 1, 2, 3, 4. The console.log statement executes during unwinding from the smallest call test(1) up to test(4)."
    }
  ],

  // 27-Question Dedicated Questions Suite for Questions Tab (Easy, Medium, Hard, Interview)
  questionSuite: [
    // Easy (Q1-Q7)
    {
      id: "q1",
      difficulty: "Easy",
      type: "mcq",
      question: "Q1. What is recursion?",
      options: ["A. A loop only", "B. A function calling itself", "C. A variable calling a function", "D. A data type"],
      answer: "B",
      explanation: "Recursion is a programming technique where a function calls itself."
    },
    {
      id: "q2",
      difficulty: "Easy",
      type: "mcq",
      question: "Q2. What is the purpose of a base case?",
      options: ["A. Start recursion", "B. Stop recursion", "C. Create a variable", "D. Repeat forever"],
      answer: "B",
      explanation: "The base case provides the stopping condition to prevent infinite execution."
    },
    {
      id: "q3",
      difficulty: "Easy",
      type: "mcq",
      question: "Q3. What is the recursive case?",
      options: ["A. The stopping condition", "B. The part where the function calls itself with a new/smaller input", "C. The return statement", "D. An error handler"],
      answer: "B",
      explanation: "The recursive case performs work and calls the function with a reduced input."
    },
    {
      id: "q4",
      difficulty: "Easy",
      type: "mcq",
      question: "Q4. What happens if recursion never reaches its stopping condition?",
      options: ["A. Returns 0", "B. Program speeds up", "C. Call stack fills up causing a Stack Overflow error", "D. Converts into a loop automatically"],
      answer: "C",
      explanation: "Without reaching a base case, stack frames accumulate until RangeError: Maximum call stack size exceeded occurs."
    },
    {
      id: "q5",
      difficulty: "Easy",
      type: "predict-output",
      question: "Q5. Predict output:",
      code: "function count(n) {\n  if (n === 0) return;\n  console.log(n);\n  count(n - 1);\n}\ncount(3);",
      options: ["3, 2, 1", "1, 2, 3", "3, 2, 1, 0", "0, 1, 2, 3"],
      answer: "3, 2, 1",
      explanation: "console.log(n) happens BEFORE the recursive call, so it prints 3, then 2, then 1 while going down."
    },
    {
      id: "q6",
      difficulty: "Easy",
      type: "find-bug",
      question: "Q6. What is missing in this code?",
      code: "function count(n) {\n  console.log(n);\n  count(n - 1);\n}",
      options: ["A parameter", "A base case", "A console statement", "A variable"],
      answer: "A base case",
      explanation: "There is no base case (if (n === 0) return), so count will call itself endlessly until stack overflow."
    },
    {
      id: "q7",
      difficulty: "Easy",
      type: "mcq",
      question: "Q7. Which structure manages active recursive function calls?",
      options: ["A. Queue", "B. Heap", "C. Call stack", "D. Hash table"],
      answer: "C",
      explanation: "The Call Stack manages execution frames for recursive calls in LIFO order."
    },

    // Medium (Q8-Q15)
    {
      id: "q8",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q8. Predict output:",
      code: "function print(n) {\n  if (n === 0) return;\n  print(n - 1);\n  console.log(n);\n}\nprint(4);",
      options: ["4, 3, 2, 1", "1, 2, 3, 4", "0, 1, 2, 3", "4, 3, 2, 1, 0"],
      answer: "1, 2, 3, 4",
      explanation: "console.log(n) occurs AFTER the recursive call, so numbers print in ascending order while unwinding coming back up."
    },
    {
      id: "q9",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q9. Predict output:",
      code: "function print(n) {\n  if (n === 0) return;\n  console.log(n);\n  print(n - 1);\n}\nprint(4);",
      options: ["4, 3, 2, 1", "1, 2, 3, 4", "4, 3, 2, 1, 0", "0, 1, 2, 3"],
      answer: "4, 3, 2, 1",
      explanation: "console.log(n) occurs BEFORE the recursive call, so numbers print in descending order going down."
    },
    {
      id: "q10",
      difficulty: "Medium",
      type: "trace-stack",
      question: "Q10. What is the maximum number of active test() call frames on the stack?",
      code: "function test(n) {\n  if (n === 0) return;\n  test(n - 1);\n}\ntest(3);",
      options: ["3 calls", "4 calls (test(3), test(2), test(1), test(0))", "1 call", "Infinite"],
      answer: "4 calls (test(3), test(2), test(1), test(0))",
      explanation: "At maximum stack depth, test(3), test(2), test(1), and test(0) all sit on the stack simultaneously (4 frames)."
    },
    {
      id: "q11",
      difficulty: "Medium",
      type: "fill-code",
      question: "Q11. Fill in the base case condition for sum(n):",
      code: "function sum(n) {\n  if (___) {\n    return 0;\n  }\n  return n + sum(n - 1);\n}",
      options: ["n === 0", "n === 10", "n > 0", "n === -1"],
      answer: "n === 0",
      explanation: "When n === 0, the sum of zero elements is 0, stopping the recursion."
    },
    {
      id: "q12",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q12. What is logged by console.log(sum(4))?",
      code: "function sum(n) {\n  if (n === 0) return 0;\n  return n + sum(n - 1);\n}\nconsole.log(sum(4));",
      options: ["4", "10", "24", "0"],
      answer: "10",
      explanation: "sum(4) = 4 + 3 + 2 + 1 + 0 = 10."
    },
    {
      id: "q13",
      difficulty: "Medium",
      type: "find-bug",
      question: "Q13. Why does this function not stop?",
      code: "function count(n) {\n  if (n === 0) return;\n  count(n + 1);\n}\ncount(1);",
      options: ["n is negative", "The argument n + 1 moves away from the base case n === 0", "Base case is missing", "count cannot take parameters"],
      answer: "The argument n + 1 moves away from the base case n === 0",
      explanation: "Starting at n = 1 and adding 1 moves n to 2, 3, 4... further away from 0."
    },
    {
      id: "q14",
      difficulty: "Medium",
      type: "short-answer",
      question: "Q14. What is the key difference between printing before vs printing after the recursive call?",
      options: ["Before prints while going down stack; after prints while unwinding back up", "After runs faster", "Before causes errors", "No difference"],
      answer: "Before prints while going down stack; after prints while unwinding back up",
      explanation: "Pre-call operations execute during stack winding (going down); post-call operations execute during stack unwinding (coming back up)."
    },
    {
      id: "q15",
      difficulty: "Medium",
      type: "mcq",
      question: "Q15. What type of recursion is shown here?",
      code: "function even(n) {\n  if (n === 0) return true;\n  return odd(n - 1);\n}\nfunction odd(n) {\n  if (n === 0) return false;\n  return even(n - 1);\n}",
      options: ["Direct recursion", "Indirect / Mutual recursion", "Tail recursion", "Infinite loop"],
      answer: "Indirect / Mutual recursion",
      explanation: "even calls odd and odd calls even, making it indirect or mutual recursion."
    },

    // Hard (Q16-Q20)
    {
      id: "q16",
      difficulty: "Hard",
      type: "find-bug",
      question: "Q16. Find the bug in this factorial implementation:",
      code: "function factorial(n) {\n  if (n === 0) {\n    return 0;\n  }\n  return n * factorial(n - 1);\n}",
      options: ["Base case should return 1, otherwise multiplying by 0 makes entire factorial 0", "Should add instead of multiply", "Base case should be n === 5", "Missing return keyword"],
      answer: "Base case should return 1, otherwise multiplying by 0 makes entire factorial 0",
      explanation: "Base case returning 0 causes n * ... * 0 = 0 for all inputs. 0! = 1, so base case must return 1."
    },
    {
      id: "q17",
      difficulty: "Hard",
      type: "find-bug",
      question: "Q17. Find the bug in this sum implementation:",
      code: "function sum(n) {\n  if (n === 0) return 0;\n  n + sum(n - 1);\n}",
      options: ["return keyword is missing on recursive case line", "Base case is wrong", "Loop required", "Function name invalid"],
      answer: "return keyword is missing on recursive case line",
      explanation: "n + sum(n - 1) calculates the value but does not return it, resulting in undefined."
    },
    {
      id: "q18",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q18. Predict exact log output:",
      code: "function test(n) {\n  if (n === 0) return;\n  console.log(\"A\", n);\n  test(n - 1);\n  console.log(\"B\", n);\n}\ntest(2);",
      options: ["A 2, A 1, B 1, B 2", "A 2, B 2, A 1, B 1", "A 2, A 1, B 2, B 1", "A 1, A 2, B 1, B 2"],
      answer: "A 2, A 1, B 1, B 2",
      explanation: "Going down logs A 2 then A 1. At base case test(0) returns. Unwinding back up logs B 1 then B 2."
    },
    {
      id: "q19",
      difficulty: "Hard",
      type: "trace-stack",
      question: "Q19. In sum(4), which call frames are waiting on the stack during sum(0)?",
      options: ["sum(4), sum(3), sum(2), sum(1) all wait for return values", "None wait", "Only sum(0) waits", "Only sum(4) waits"],
      answer: "sum(4), sum(3), sum(2), sum(1) all wait for return values",
      explanation: "Each outer frame is suspended on the stack waiting for its inner recursive call to return a value."
    },
    {
      id: "q20",
      difficulty: "Hard",
      type: "trace-stack",
      question: "Q20. When sum(0) returns 0 in stack [sum(0), sum(1), sum(2), sum(3), global], which frame resumes execution next?",
      options: ["sum(1)", "sum(3)", "global", "sum(4)"],
      answer: "sum(1)",
      explanation: "The frame directly below sum(0) on the LIFO stack is sum(1), which resumes execution."
    },

    // Interview (Q21-Q27)
    {
      id: "q21",
      difficulty: "Interview",
      type: "interview",
      question: "Q21. What is recursion in simple words?",
      options: ["A function calling itself to solve a smaller version of the same problem", "A type of object property", "A database query", "A loop optimization"],
      answer: "A function calling itself to solve a smaller version of the same problem",
      explanation: "Recursion breaks down a problem by having a function invoke itself on smaller subproblems until reaching a base case."
    },
    {
      id: "q22",
      difficulty: "Interview",
      type: "interview",
      question: "Q22. What are the two mandatory ingredients of any valid recursive function?",
      options: ["Base Case and Recursive Case", "Try and Catch", "Array and Object", "Variable and Loop"],
      answer: "Base Case and Recursive Case",
      explanation: "A base case specifies when to stop; a recursive case reduces the input and calls the function again."
    },
    {
      id: "q23",
      difficulty: "Interview",
      type: "interview",
      question: "Q23. Why does recursion rely on the Call Stack?",
      options: ["Each recursive invocation creates a new stack frame that must be tracked until it returns", "JS has no other memory", "To bypass scope rules", "To prevent loops"],
      answer: "Each recursive invocation creates a new stack frame that must be tracked until it returns",
      explanation: "The call stack holds local variables and return addresses for every active recursive frame until unwinding occurs."
    },
    {
      id: "q24",
      difficulty: "Interview",
      type: "interview",
      question: "Q24. What is the difference between direct and indirect recursion?",
      options: ["Direct calls itself directly; indirect calls itself through one or more other functions", "Direct is faster", "Indirect has no base case", "Direct uses loops"],
      answer: "Direct calls itself directly; indirect calls itself through one or more other functions",
      explanation: "Direct recursion is f() calling f(). Indirect recursion is f() calling g(), which calls f()."
    },
    {
      id: "q25",
      difficulty: "Interview",
      type: "interview",
      question: "Q25. Why can recursion cause a Stack Overflow error?",
      options: ["If recursive calls accumulate without returning, the call stack exceeds engine memory limits", "Due to syntax errors", "Because functions are objects", "Due to global variables"],
      answer: "If recursive calls accumulate without returning, the call stack exceeds engine memory limits",
      explanation: "Every call consumes stack memory. Unlimited recursive calls exceed maximum stack size."
    },
    {
      id: "q26",
      difficulty: "Interview",
      type: "interview",
      question: "Q26. How is recursion related to tree data structures?",
      options: ["Trees naturally consist of subtrees, so recursive functions easily process a node and recursively process its children", "Trees cannot use loops", "Trees are built into JS", "Trees don't use memory"],
      answer: "Trees naturally consist of subtrees, so recursive functions easily process a node and recursively process its children",
      explanation: "Hierarchical structures like trees contain smaller trees, matching recursion's self-similar structure."
    },
    {
      id: "q27",
      difficulty: "Interview",
      type: "interview",
      question: "Q27. When might you choose iteration (a loop) instead of recursion?",
      options: ["For simple repetition where an iterative solution is simpler and avoids call-stack memory overhead", "Always", "Never", "Only for strings"],
      answer: "For simple repetition where an iterative solution is simpler and avoids call-stack memory overhead",
      explanation: "Iteration uses constant stack space for simple repetitive tasks, making it cleaner or more efficient when problem structure isn't naturally recursive."
    }
  ]
};
