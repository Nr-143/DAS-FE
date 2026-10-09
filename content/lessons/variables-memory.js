/**
 * DSA Tracker — Lesson Content: Variables & Memory (Page 2)
 * ──────────────────────────────────────────────────────────
 * Focused 10–15 minute beginner-friendly lesson on:
 * - What a variable is & lifecycle (Declaration, Initialization, Reassignment)
 * - var vs let vs const and block vs function scope
 * - Conceptual memory model (Stack & Heap introductory concepts)
 * - Variable vs Value vs Memory distinction
 * - Copying variables & reference introduction
 * - Why memory matters in DSA
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["variables-and-memory"] = {
  id: "variables-and-memory",
  title: "Variables & Memory",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn what variables really represent, how values are stored conceptually, and why memory matters when learning DSA.",
  interactiveWidget: "memory-playground",

  whyMatters: "Understanding variables and memory is the foundation of computer programming and DSA. Every algorithm you write reads from, modifies, and organizes memory.",

  sections: [
    {
      id: "section-what-is-variable",
      title: "Start With: What Is a Variable?",
      tocTitle: "1. What Is a Variable?",
      contentHtml: `
        <p>At the absolute beginner level, a program needs a way to keep track of information while it runs. A <strong>variable</strong> is a named binding that allows a program to access a stored value.</p>
        
        <div style="background:var(--bg-surface); padding:18px; border-radius:10px; border:1px solid var(--border-default); margin:16px 0;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:10px;">Deconstructing a Variable Statement:</div>
          <pre class="code-block"><code>let age = 25;</code></pre>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-top:14px; text-align:center; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border-top:3px solid #F472B6;">
              <strong style="color:#F472B6; font-size:1rem;">let</strong><br/>
              <span style="color:var(--text-secondary); font-size:0.78rem;">↓<br/>create a variable</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border-top:3px solid #60A5FA;">
              <strong style="color:#60A5FA; font-size:1rem;">age</strong><br/>
              <span style="color:var(--text-secondary); font-size:0.78rem;">↓<br/>variable name</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border-top:3px solid #34D399;">
              <strong style="color:#34D399; font-size:1rem;">=</strong><br/>
              <span style="color:var(--text-secondary); font-size:0.78rem;">↓<br/>assignment</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border-top:3px solid #FBBF24;">
              <strong style="color:#FBBF24; font-size:1rem;">25</strong><br/>
              <span style="color:var(--text-secondary); font-size:0.78rem;">↓<br/>value</span>
            </div>
          </div>
        </div>

        <div class="callout-box" style="margin-top:16px;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary);">📦 Simple Box Analogy</h4>
          <p style="margin:0;">Think of a variable as a <strong>labeled box</strong> or sticky note identifier:</p>
          <div style="margin-top:10px; font-family:'Fira Code',monospace; font-size:0.9rem; text-align:center; padding:12px; background:var(--bg-body); border-radius:6px; border:1px dashed var(--border-accent);">
            Variable = labeled box / name<br/><br/>
            <span style="color:var(--accent-primary); font-weight:700;">age</span><br/>
            &nbsp;&nbsp;↓<br/>
            <span style="color:#FBBF24; font-weight:700;">25</span>
          </div>
        </div>

        <p style="margin-top:16px;">When you update the variable later:</p>
        <pre class="code-block"><code>let age = 25;
age = 30;</code></pre>
        <p>The variable label <code>age</code> is now associated with the new value <code>30</code>.</p>
      `
    },

    {
      id: "section-declaration-initialization",
      title: "Declaration vs Initialization vs Assignment",
      tocTitle: "2. Declaration & Assignment",
      contentHtml: `
        <p>When working with variables, three core terms describe their lifecycle:</p>

        <div style="display:flex; flex-direction:column; gap:14px; margin:16px 0;">
          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #60A5FA;">
            <strong style="color:#60A5FA; font-size:1rem;">1. Declaration</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>let age;</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);">The variable name is declared in scope, but no initial value is assigned yet.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #34D399;">
            <strong style="color:#34D399; font-size:1rem;">2. Initialization</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>let age = 25;</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);">The variable receives its initial value upon creation.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #FBBF24;">
            <strong style="color:#FBBF24; font-size:1rem;">3. Reassignment</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>age = 30;</code></pre>
            <span style="font-size:0.88rem; color:var(--text-secondary);">The variable is updated to point to another value.</span>
          </div>
        </div>

        <h4 style="margin-top:16px;">Visual Lifecycle Timeline:</h4>
        <div style="background:var(--bg-body); padding:16px; border-radius:8px; text-align:center; font-family:'Fira Code',monospace; font-size:0.9rem; border:1px solid var(--border-default); color:var(--text-primary); margin-top:10px;">
          declare<br/>
          &nbsp;&nbsp;↓<br/>
          initialize<br/>
          &nbsp;&nbsp;↓<br/>
          use<br/>
          &nbsp;&nbsp;↓<br/>
          reassign<br/>
          &nbsp;&nbsp;↓<br/>
          use again
        </div>
      `
    },

    {
      id: "section-var-let-const",
      title: "var, let, and const",
      tocTitle: "3. var, let, const",
      contentHtml: `
        <p>JavaScript provides three keywords for declaring variables. Choosing the right keyword ensures clean, predictable code.</p>

        <div class="concept-table-wrapper">
          <table class="concept-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th><code>var</code></th>
                <th><code>let</code></th>
                <th><code>const</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Can reassign?</strong></td>
                <td>Yes</td>
                <td>Yes</td>
                <td><strong style="color:#EF4444;">No</strong></td>
              </tr>
              <tr>
                <td><strong>Scope</strong></td>
                <td>Function</td>
                <td>Block</td>
                <td>Block</td>
              </tr>
              <tr>
                <td><strong>Redeclaration</strong></td>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <td><strong>Modern recommendation</strong></td>
                <td>Avoid generally</td>
                <td>Yes (for reassignable values)</td>
                <td>Yes (default choice)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="responsive-grid-2col" style="margin-top:16px;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <div style="font-weight:700; color:#34D399; margin-bottom:6px;">let Example</div>
            <pre class="code-block"><code>let score = 10;
score = 20; // ✅ Allowed</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <div style="font-weight:700; color:#EF4444; margin-bottom:6px;">const Example</div>
            <pre class="code-block"><code>const score = 10;
// score = 20; ❌ TypeError!</code></pre>
          </div>
        </div>

        <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); margin-top:12px;">
          <div style="font-weight:700; color:#F59E0B; margin-bottom:6px;">var Example</div>
          <pre class="code-block"><code>var score = 10; // Older syntax; avoid in modern JS</code></pre>
        </div>
      `
    },

    {
      id: "section-scope-variables",
      title: "Scope — Only the Variable Perspective",
      tocTitle: "4. Scope",
      contentHtml: `
        <p><strong>Scope</strong> defines where a variable can be accessed within your program.</p>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-bottom:14px;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:8px;">Block Scope (let & const):</div>
          <pre class="code-block"><code>{
  let score = 100;
}

console.log(score); // ❌ ReferenceError: score is not defined</code></pre>
        </div>

        <div style="background:var(--bg-body); padding:16px; border-radius:8px; font-family:'Fira Code',monospace; font-size:0.88rem; border:1px dashed var(--border-accent); margin-bottom:14px;">
          Outside<br/>
          ────────────────────────────<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
          ────────────────────────────<br/>
          Outside cannot access score
        </div>

        <p>By contrast, <code>var</code> ignores block boundaries and attaches to function or global scope:</p>
        <pre class="code-block"><code>if (true) {
  var x = 10;
}

console.log(x); // 10 (var leaks outside block!)</code></pre>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:6px;">
          Rule of thumb: Use <code>let</code> and <code>const</code> so your variables remain safely scoped inside block <code>{}</code> boundaries.
        </p>
      `
    },

    {
      id: "section-what-is-memory",
      title: "What Does \"Memory\" Mean?",
      tocTitle: "5. What Is Memory?",
      contentHtml: `
        <p>When a program runs, your computer allocates memory to keep track of information and active data.</p>

        <p>For example, when you write:</p>
        <pre class="code-block"><code>let score = 100;
let age = 25;
let name = "Nirmal";</code></pre>

        <p>Conceptually, the computer's memory keeps track of these variable bindings:</p>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; font-family:'Fira Code',monospace; font-size:0.9rem;">
          <div style="font-weight:700; color:var(--accent-primary); margin-bottom:10px; font-family:-apple-system,sans-serif;">MEMORY CONCEPTUAL MODEL</div>
          <div style="border:1px solid var(--border-default); border-radius:6px; overflow:hidden;">
            <div style="padding:10px 14px; background:var(--bg-body); border-bottom:1px solid var(--border-default);">score → 100</div>
            <div style="padding:10px 14px; background:var(--bg-body); border-bottom:1px solid var(--border-default);">age   → 25</div>
            <div style="padding:10px 14px; background:var(--bg-body);">name  → "Nirmal"</div>
          </div>
        </div>

        <p>Variables provide human-readable <strong>names</strong> through which your code accesses stored data in computer memory.</p>
      `
    },

    {
      id: "section-memory-not-just-storage",
      title: "Memory Is Not Just \"Storage\"",
      tocTitle: "6. Memory & Programs",
      contentHtml: `
        <p>Memory isn't just a static box—it is active state. As execution proceeds, the program reads, writes, and updates values stored in memory.</p>

        <pre class="code-block"><code>let a = 10;
let b = 20;

a = 50; // Memory location associated with 'a' is updated</code></pre>

        <div class="callout-box callout-box--important" style="margin-top:16px;">
          <h4 style="margin:0 0 6px 0; color:var(--accent-primary);">🚀 Core Connection to DSA</h4>
          <p style="margin:0; font-size:0.95rem; font-weight:600;">
            "Data structures are fundamentally ways of organizing and accessing data in memory."
          </p>
        </div>
      `
    },

    {
      id: "section-stack-heap",
      title: "Stack and Heap — Conceptual Introduction",
      tocTitle: "7. Stack & Heap",
      contentHtml: `
        <p>To understand how programs manage memory, developers use two conceptual memory models: <strong>Stack</strong> and <strong>Heap</strong>.</p>

        <div class="responsive-grid-2col" style="margin:16px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); border-top:4px solid #6C63FF;">
            <h4 style="margin:0 0 8px 0; color:#6C63FF;">⚡ The Stack</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:10px;">
              A memory area associated with currently executing program work and local execution information.
            </p>
            <div style="background:var(--bg-body); padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:0.8rem; text-align:center; border:1px dashed var(--border-default);">
              STACK<br/>
              ┌───────────────┐<br/>
              │ current work  │<br/>
              ├───────────────┤<br/>
              │ local data    │<br/>
              ├───────────────┤<br/>
              │ other frames  │<br/>
              └───────────────┘
            </div>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); border-top:4px solid #00C9A7;">
            <h4 style="margin:0 0 8px 0; color:#00C9A7;">📦 The Heap</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:10px;">
              A memory area commonly used for dynamically allocated data such as objects.
            </p>
            <div style="background:var(--bg-body); padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:0.8rem; text-align:center; border:1px dashed var(--border-default);">
              HEAP<br/>
              ┌────────────────────┐<br/>
              │ dynamically        │<br/>
              │ allocated data     │<br/>
              │                    │<br/>
              │ ...                │<br/>
              └────────────────────┘
            </div>
          </div>
        </div>

        <div class="callout-box callout-box--warning">
          <strong>⚠️ Important Technical Accuracy Note:</strong><br/>
          Do NOT think that <em>"Every primitive is stored on the stack"</em> or <em>"Every object is stored on the heap"</em> as absolute JavaScript spec rules. Stack and heap are <strong>useful conceptual models</strong> for understanding memory. The JavaScript engine (like V8) decides how values are physically represented and optimizes them internally.
        </div>
      `
    },

    {
      id: "section-variable-value-memory",
      title: "Variable vs Value vs Memory",
      tocTitle: "8. Variable vs Value vs Memory",
      contentHtml: `
        <p>Let's clearly distinguish between three terms that beginners often confuse:</p>

        <pre class="code-block"><code>let score = 100;</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="display:inline-block; text-align:left;">
            VARIABLE &nbsp;&nbsp;→ &nbsp;&nbsp;<span style="color:#60A5FA; font-weight:700;">score</span> (the identifier / binding name)<br/>
            VALUE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ &nbsp;&nbsp;<span style="color:#FBBF24; font-weight:700;">100</span> (the data associated with it)<br/>
            MEMORY &nbsp;&nbsp;&nbsp;&nbsp;→ &nbsp;&nbsp;<span style="color:#34D399; font-weight:700;">[ location in system ]</span> (resources used to keep the data)
          </div>
        </div>

        <ul style="line-height:1.7;">
          <li><strong>Variable:</strong> The name or binding identifier in code.</li>
          <li><strong>Value:</strong> The actual data content associated with the binding.</li>
          <li><strong>Memory:</strong> System resources used by the running program to represent and maintain that data.</li>
        </ul>
      `
    },

    {
      id: "section-copying-variables",
      title: "Copying Variables",
      tocTitle: "9. Copying Variables",
      contentHtml: `
        <p>What happens when you copy one variable to another?</p>

        <pre class="code-block"><code>let a = 10;
let b = a;</code></pre>

        <div style="background:var(--bg-body); padding:12px; border-radius:8px; font-family:'Fira Code',monospace; font-size:0.88rem; margin:10px 0; border:1px solid var(--border-default);">
          a → 10<br/>
          b → 10
        </div>

        <p>Now, if we reassign <code>b</code>:</p>
        <pre class="code-block"><code>b = 20;</code></pre>

        <div style="background:var(--bg-body); padding:12px; border-radius:8px; font-family:'Fira Code',monospace; font-size:0.88rem; margin:10px 0; border:1px solid var(--border-default);">
          a → 10<br/>
          b → 20
        </div>

        <p>Assignment creates a new binding/value relationship. Changing <code>b</code> does not automatically change <code>a</code> in this example.</p>

        <div class="callout-box callout-box--tip" style="margin-top:14px;">
          💡 <em>We will study exactly why this happens on the next page: <strong>Primitives</strong>.</em>
        </div>
      `
    },

    {
      id: "section-reference-concept",
      title: "Reference Concept — Very Small Introduction",
      tocTitle: "10. Reference Concept",
      contentHtml: `
        <p>Some JavaScript values involve <strong>references</strong> to dynamically allocated data.</p>

        <pre class="code-block"><code>const user = { name: "Alice" };
const anotherUser = user;</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; font-family:'Fira Code',monospace; font-size:0.85rem;">
          user ─────────┐<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌─────────────┐<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ name: Alice │<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─────────────┘<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↑<br/>
          anotherUser ──┘
        </div>

        <p>When two variables store references pointing to the same underlying data, modifying the data through one variable affects what the other sees.</p>

        <div class="callout-box" style="margin-top:14px;">
          🔗 <em>We will explore references, objects, and memory sharing properly in the upcoming section: <strong>Objects</strong>.</em>
        </div>
      `
    },

    {
      id: "section-why-memory-dsa",
      title: "Why Memory Matters in DSA",
      tocTitle: "11. Memory in DSA",
      contentHtml: `
        <p>When learning Data Structures & Algorithms, memory is the foundation of everything you do. Every structure you will learn is simply a different way to organize data in memory:</p>

        <ul style="line-height:1.7;">
          <li><strong>Array:</strong> Elements stored in sequential memory slots.</li>
          <li><strong>Linked List:</strong> Memory nodes connected via reference pointers.</li>
          <li><strong>Stack & Queue:</strong> Constrained sequential operations over memory.</li>
          <li><strong>Tree & Graph:</strong> Nodes connected via parent-child or graph reference edges.</li>
          <li><strong>Hash Table:</strong> Key-value memory buckets for fast access.</li>
        </ul>

        <div class="responsive-grid-2col" style="margin-top:16px;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">Sequential Array Memory</div>
            <div style="font-family:'Fira Code',monospace; font-size:0.85rem; padding:10px; background:var(--bg-body); border-radius:6px; text-align:center;">
              ┌────┬────┬────┬────┐<br/>
              │ 10 │ 20 │ 30 │ 40 │<br/>
              └────┴────┴────┴────┘
            </div>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">Pointer Linked List Memory</div>
            <div style="font-family:'Fira Code',monospace; font-size:0.82rem; padding:10px; background:var(--bg-body); border-radius:6px; text-align:center;">
              ┌───────┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───────┐<br/>
              │  10   │ ───→  │  20   │ ───→ ...<br/>
              └───────┘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└───────┘
            </div>
          </div>
        </div>

        <p style="margin-top:14px;">Later in the course, we will use these memory concepts to understand how each data structure works under the hood.</p>
      `
    },

    {
      id: "section-memory-visualization",
      title: "Memory Visualization: \"Where Is My Variable?\"",
      tocTitle: "12. Memory Visualizer",
      contentHtml: `
        <p>Explore this conceptual memory model demonstrating variable binding and memory updates:</p>

        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:16px 0;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:12px; font-size:1rem; display:flex; align-items:center; justify-content:space-between;">
            <span>Step 1: Declaration & Initialization</span>
            <span class="badge" style="background:rgba(108,99,255,0.15); color:var(--accent-primary); border:1px solid var(--border-accent); font-size:0.75rem;">Conceptual Memory Model</span>
          </div>
          
          <pre class="code-block" style="margin-bottom:12px;"><code>let score = 100;</code></pre>
          
          <div style="display:flex; align-items:center; justify-content:center; gap:20px; flex-wrap:wrap; padding:16px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-default);">
            <div style="text-align:center;">
              <span style="font-size:0.8rem; color:var(--text-secondary);">VARIABLE IDENTIFIER</span><br/>
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:#60A5FA; font-size:1.1rem;">score</span>
            </div>
            <div style="font-size:1.4rem; color:var(--accent-primary);">───▶</div>
            <div style="text-align:center; background:var(--bg-surface); padding:10px 20px; border-radius:8px; border:1px dashed var(--accent-primary);">
              <span style="font-size:0.8rem; color:var(--text-secondary);">MEMORY LOCATION</span><br/>
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:#FBBF24; font-size:1.1rem;">100</span>
            </div>
          </div>

          <div style="font-weight:700; color:var(--text-primary); margin:18px 0 12px 0; font-size:1rem;">
            Step 2: Copying Variable
          </div>
          
          <pre class="code-block" style="margin-bottom:12px;"><code>let anotherScore = score;</code></pre>
          
          <div style="display:flex; flex-direction:column; gap:10px; padding:16px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-default); font-family:'Fira Code',monospace; font-size:0.9rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface); border-radius:6px;">
              <span>score</span>
              <span>───▶</span>
              <span style="color:#FBBF24; font-weight:700;">100</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface); border-radius:6px;">
              <span>anotherScore</span>
              <span>───▶</span>
              <span style="color:#FBBF24; font-weight:700;">100</span>
            </div>
          </div>
        </div>
      `
    },

    {
      id: "section-think-about-it",
      title: "Think About It",
      tocTitle: "13. Think About It",
      contentHtml: `
        <div class="callout-box callout-box--tip" style="margin-bottom:16px;">
          <h4 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.05rem;">🤔 Interactive Thought Experiment</h4>
          <p style="margin-bottom:10px;">Consider the following code snippet:</p>
          <pre class="code-block"><code>let x = 10;
let y = x;

y = 50;</code></pre>

          <p style="font-weight:600; margin:12px 0 8px 0; color:var(--accent-primary);">
            Question: Did <code>x</code> become 50?
          </p>

          <button type="button" class="btn btn--secondary" onclick="this.nextElementSibling.style.display='block'; this.style.display='none';" style="padding:6px 14px; font-size:0.88rem; cursor:pointer;">
            Click to Reveal Answer
          </button>

          <div style="display:none; margin-top:12px; padding:12px 16px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-accent);">
            <strong style="color:#34D399; font-size:1rem;">Answer: No!</strong>
            <div style="font-family:'Fira Code',monospace; margin-top:8px; font-size:0.9rem;">
              x → 10<br/>
              y → 50
            </div>
            <p style="margin-top:8px; font-size:0.88rem; color:var(--text-secondary);">
              Reassigning <code>y</code> updates only what <code>y</code> represents. It does not alter <code>x</code>.
            </p>
          </div>
        </div>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
          <p style="margin:0; font-size:0.95rem;">
            In the next lesson (<strong>Primitives</strong>), we will learn why the answer depends on the kind of value being stored.
          </p>
        </div>
      `
    },

    {
      id: "section-common-mistakes",
      title: "Common Mistakes",
      tocTitle: "14. Common Mistakes",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="mistake-card">
            <div class="mistake-card__title">1. Thinking a variable is the exact same thing as the value</div>
            <div class="mistake-card__desc">A variable is the named binding identifier (<code>variable ≠ value</code>). The value is the data stored at that memory representation.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">2. Thinking const means data can never change</div>
            <div class="mistake-card__desc"><code>const</code> prevents reassigning the variable binding itself. (We will cover how objects interact with <code>const</code> on Page 4: Objects).</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">3. Thinking stack and heap are exact JavaScript language rules</div>
            <div class="mistake-card__desc">Stack and heap are conceptual memory models used by developers. The JS engine optimizes physical storage under the hood.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">4. Thinking assignment always creates a completely independent copy of everything</div>
            <div class="mistake-card__desc">The behavior depends on the kind of value involved. Primitives and objects will be covered separately in upcoming lessons.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">5. Thinking memory is only important when a program has errors</div>
            <div class="mistake-card__desc">Memory layout and access patterns are fundamental to understanding data structures and writing efficient algorithms.</div>
          </div>
        </div>
      `
    },

    {
      id: "section-what-you-learned",
      title: "What You Learned",
      tocTitle: "15. Summary",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; line-height:1.6; font-size:0.95rem;">
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>A variable gives a name to a value/binding.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Declaration creates a variable binding.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Initialization gives it its initial value.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Assignment/reassignment changes what the variable is associated with.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span><code>let</code> and <code>const</code> are block scoped.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span><code>var</code> is function scoped.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Programs need memory to store and work with data.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Stack and heap are useful conceptual models for understanding memory.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Assigning one variable to another does not always mean the same thing for every kind of value.</span>
            </li>
            <li style="display:flex; gap:10px; align-items:flex-start;">
              <span style="color:#34D399; font-weight:700;">✓</span>
              <span>Memory is fundamental to understanding data structures.</span>
            </li>
          </ul>
        </div>
      `
    },

    {
      id: "section-bridge-primitives",
      title: "Bridge to Page 3",
      tocTitle: "16. Next: Primitives",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-default); text-align:center; margin-top:16px;">
          <h3 style="margin:0 0 12px 0; color:var(--text-primary); font-size:1.2rem;">Next Up: Primitives</h3>
          
          <div style="display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; margin:16px 0; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <span style="padding:6px 12px; background:var(--accent-gradient-subtle); border:1px solid var(--border-accent); border-radius:6px; color:var(--accent-primary); font-weight:700;">Variables & Memory</span>
            <span>↓</span>
            <span style="padding:6px 12px; background:var(--bg-body); border:1px solid var(--border-default); border-radius:6px; color:var(--text-secondary);">Primitives</span>
            <span>↓</span>
            <span style="padding:6px 12px; background:var(--bg-body); border:1px solid var(--border-default); border-radius:6px; color:var(--text-secondary);">Objects</span>
            <span>↓</span>
            <span style="padding:6px 12px; background:var(--bg-body); border:1px solid var(--border-default); border-radius:6px; color:var(--text-secondary);">Function Calls</span>
            <span>↓</span>
            <span style="padding:6px 12px; background:var(--bg-body); border:1px solid var(--border-default); border-radius:6px; color:var(--text-secondary);">Recursion</span>
          </div>

          <p style="color:var(--text-secondary); max-width:550px; margin:0 auto 18px auto; line-height:1.6; font-size:0.95rem;">
            Now that you understand what variables and memory are, the next question is: <strong>what kinds of values can a variable contain?</strong>
          </p>

          <a href="#primitives" class="lesson-cross-link btn btn--primary" data-topic="primitives" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; font-weight:700; text-decoration:none; border-radius:8px;">
            Primitives →
          </a>
        </div>
      `
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is a variable?",
      options: [
        "A. A programming language",
        "B. A named binding used to access a value",
        "C. A database",
        "D. A function"
      ],
      answer: "B",
      explanation: "A variable is a named binding used to access a stored value in computer memory."
    },
    {
      question: "Q2. What does reassignment mean in let score = 10; score = 20;?",
      options: [
        "A. Creating a new variable",
        "B. Changing the value associated with score",
        "C. Deleting score",
        "D. Creating an object"
      ],
      answer: "B",
      explanation: "Reassignment changes the value associated with the variable binding."
    },
    {
      question: "Q3. Which variable declaration keyword is block-scoped?",
      options: [
        "A. var",
        "B. let",
        "C. Both var and let",
        "D. Neither"
      ],
      answer: "B",
      explanation: "`let` (and `const`) are block-scoped. `var` is function-scoped."
    },
    {
      question: "Q4. What is stack/heap in this lesson?",
      options: [
        "A. Exact rules of JavaScript storage",
        "B. Useful conceptual models for understanding memory",
        "C. Database structures",
        "D. CPU instructions"
      ],
      answer: "B",
      explanation: "Stack and heap are useful conceptual mental models for developers to reason about memory allocation."
    },
    {
      question: "Q5. Why does memory matter in DSA?",
      options: [
        "A. Data structures organize data in memory",
        "B. Only because JavaScript needs memory",
        "C. It does not matter",
        "D. Only for databases"
      ],
      answer: "A",
      explanation: "Data structures are fundamentally ways of organizing and accessing data in computer memory."
    },
    {
      question: "Q6. What happens when we write let b = a;?",
      options: [
        "A. The answer is always a deep copy",
        "B. The behavior depends on the value involved",
        "C. a is deleted",
        "D. b becomes a function"
      ],
      answer: "B",
      explanation: "Primitive values are copied by value, whereas objects are assigned by reference."
    }
  ],

  predictOutput: [
    {
      code: "let age = 25;\nage = 30;\nconsole.log(age);",
      options: ["25", "30", "undefined", "ReferenceError"],
      answer: "30",
      explanation: "Reassignment updates the value associated with the variable age from 25 to 30."
    },
    {
      code: "{\n  let score = 100;\n}\nconsole.log(score);",
      options: ["100", "undefined", "ReferenceError", "null"],
      answer: "ReferenceError",
      explanation: "let is block-scoped. Attempting to access score outside the {} block throws a ReferenceError."
    },
    {
      code: "if (true) {\n  var x = 10;\n}\nconsole.log(x);",
      options: ["10", "undefined", "ReferenceError", "null"],
      answer: "10",
      explanation: "var is function-scoped rather than block-scoped, so x leaks outside the if block."
    },
    {
      code: "const val = 42;\nval = 50;\nconsole.log(val);",
      options: ["42", "50", "TypeError", "SyntaxError"],
      answer: "TypeError",
      explanation: "const prevents reassignment of the variable binding. Reassigning val throws a TypeError."
    },
    {
      code: "let a = 10;\nlet b = a;\nb = 20;\nconsole.log(a);",
      options: ["10", "20", "undefined", "ReferenceError"],
      answer: "10",
      explanation: "Reassigning b to 20 updates b's binding; it does not change variable a."
    }
  ],

  practice: [
    {
      q: "What is the key difference between declaration and initialization?",
      a: "Declaration creates the variable binding name in scope (e.g., `let age;`), whereas initialization provides the variable with its starting value (e.g., `let age = 25;`)."
    },
    {
      q: "Why should var generally be avoided in modern JavaScript?",
      a: "`var` is function-scoped rather than block-scoped and allows redeclaration, which can easily cause subtle bugs and accidental variable leaks."
    },
    {
      q: "What is the relationship between data structures and computer memory?",
      a: "Data structures are fundamental ways of organizing and accessing data stored in computer memory."
    }
  ]
};
