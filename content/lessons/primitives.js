/**
 * DSA Tracker — Lesson Content: Primitives (Page 3)
 * ──────────────────────────────────────────────────────────
 * Focused 10–15 minute beginner-friendly lesson on:
 * - What a primitive value is & the 7 primitive types
 * - Value immutability explained from zero
 * - Copy-by-value assignment semantics
 * - Detailed breakdown of Number, String, Boolean, Undefined, Null, BigInt, Symbol
 * - JavaScript quirks (typeof null, NaN typeof, string immutability, BigInt rules)
 * - Strict vs loose equality (=== vs ==)
 * - Interactive visualizations & memory models
 * - Predict output, Common mistakes, Cheat sheet, Mini quiz, DSA connection
 * - Bridge to Page 4: Objects
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["primitives"] = {
  id: "primitives",
  title: "Primitives",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn JavaScript's 7 primitive data types, value immutability, pass-by-value assignment, and common language quirks.",
  whyMatters: "Primitive values are the fundamental building blocks of computer memory and algorithms. Understanding immutability, copy-by-value semantics, and language quirks ensures bug-free algorithm development.",

  sections: [
    // 1. Page Introduction
    {
      id: "section-1-intro",
      title: "Page Introduction — What Are Primitives?",
      tocTitle: "1. Introduction",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:22px; border-radius:12px; border:1px solid var(--border-default); margin-bottom:16px;">
          <h3 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.25rem;">Primitives</h3>
          <p style="color:var(--text-secondary); margin-bottom:16px; font-size:0.98rem; line-height:1.65;">
            Learn the basic values JavaScript works with and understand why primitives behave differently from objects.
          </p>

          <div style="background:var(--accent-gradient-subtle); padding:14px 18px; border-radius:8px; border:1px solid var(--border-accent); margin-bottom:18px;">
            <strong style="color:var(--accent-primary); font-size:1rem;">💡 Core Definition:</strong>
            <p style="margin:6px 0 0 0; color:var(--text-primary); font-size:0.95rem;">
              A <strong>primitive</strong> is a simple, <strong>immutable</strong> value that is not an object.
            </p>
          </div>

          <div style="font-weight:700; color:var(--text-primary); margin-bottom:12px; font-size:0.92rem;">
            JavaScript's 7 Primitive Types:
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:10px; text-align:center; font-family:'Fira Code',monospace;">
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #60A5FA;">
              <strong style="color:#60A5FA;">Number</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">25, 99.99</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #F472B6;">
              <strong style="color:#F472B6;">String</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">"Nirmal"</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #34D399;">
              <strong style="color:#34D399;">Boolean</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">true / false</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #FBBF24;">
              <strong style="color:#FBBF24;">Undefined</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">undefined</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #A78BFA;">
              <strong style="color:#A78BFA;">Null</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">null</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #EC4899;">
              <strong style="color:#EC4899;">BigInt</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">123n</span>
            </div>
            <div style="background:var(--bg-body); padding:12px 8px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #3B82F6;">
              <strong style="color:#3B82F6;">Symbol</strong><br/>
              <span style="font-size:0.75rem; color:var(--text-secondary);">Symbol()</span>
            </div>
          </div>
        </div>
      `
    },

    // 2. What Is a Primitive?
    {
      id: "section-2-what-is-primitive",
      title: "What Is a Primitive?",
      tocTitle: "2. Primitive Concept",
      contentHtml: `
        <p>Start with the simplest variable assignments:</p>
        <pre class="code-block"><code>let age = 25;</code></pre>
        <div style="background:var(--bg-body); padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:0.9rem; text-align:center; border:1px dashed var(--border-accent); margin:10px 0;">
          age<br/>&nbsp;&nbsp;↓<br/><span style="color:#FBBF24; font-weight:700;">25</span>
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary);"><code>25</code> is a primitive value.</p>

        <pre class="code-block"><code>let name = "Nirmal";</code></pre>
        <div style="background:var(--bg-body); padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:0.9rem; text-align:center; border:1px dashed var(--border-accent); margin:10px 0;">
          name<br/>&nbsp;&nbsp;↓<br/><span style="color:#F472B6; font-weight:700;">"Nirmal"</span>
        </div>

        <div class="callout-box" style="margin-top:16px;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary);">📦 Primitives Copy by Value</h4>
          <p style="margin:0; font-size:0.93rem;">
            Primitive values are values themselves. When a primitive value is assigned to another variable, the value is <strong>copied independently</strong>.
          </p>
        </div>

        <pre class="code-block" style="margin-top:14px;"><code>let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:10px; font-size:0.92rem;">Visual Copy Timeline:</div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:6px;">BEFORE (let b = a)</div>
              a ──▶ <span style="color:#FBBF24;">10</span><br/>
              b ──▶ <span style="color:#FBBF24;">10</span> <span style="color:#34D399; font-size:0.75rem;">(Copied)</span>
            </div>

            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:6px;">AFTER (b = 20)</div>
              a ──▶ <span style="color:#FBBF24;">10</span> <span style="color:#60A5FA; font-size:0.75rem;">(Unaffected!)</span><br/>
              b ──▶ <span style="color:#34D399;">20</span> <span style="color:#34D399; font-size:0.75rem;">(Reassigned)</span>
            </div>
          </div>
        </div>
      `
    },

    // 3. Important Definition: Immutable
    {
      id: "section-3-immutable",
      title: "Important Definition: Immutable",
      tocTitle: "3. Immutability",
      contentHtml: `
        <p>Let's explain the word <strong>immutable</strong> from absolute zero.</p>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border-left:4px solid #F472B6; margin:14px 0;">
          <strong style="color:#F472B6; font-size:1.05rem;">Immutable</strong> means the primitive value itself <strong>cannot be changed in place</strong>.
        </div>

        <p>Consider this example:</p>
        <pre class="code-block"><code>let name = "Alice";

name = "Bob";</code></pre>

        <p style="line-height:1.65; color:var(--text-primary);">
          Notice what happened: <code>"Alice"</code> was <strong>not</strong> modified or edited into <code>"Bob"</code>. Instead, a brand new string <code>"Bob"</code> was created, and the variable identifier <code>name</code> was reassigned to point to <code>"Bob"</code>.
        </p>

        <div style="background:var(--bg-body); padding:14px; border-radius:8px; border:1px dashed var(--border-accent); font-family:'Fira Code',monospace; font-size:0.88rem; text-align:center; margin:14px 0;">
          First:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name ──▶ <span style="color:#F472B6;">"Alice"</span><br/><br/>
          Reassign:&nbsp;&nbsp; name ──▶ <span style="color:#34D399;">"Bob"</span>
        </div>

        <div class="callout-box callout-box--warning" style="margin-top:14px;">
          <strong>⚠️ Crucial Distinction:</strong><br/>
          <code>let</code> allows the <em>variable binding</em> to be reassigned. It does <strong>not</strong> make the <em>primitive value itself</em> mutable!
        </div>
      `
    },

    // 4. Primitive Type #1 — Number
    {
      id: "section-4-type-number",
      title: "Primitive Type #1 — Number",
      tocTitle: "4. Number",
      contentHtml: `
        <p>JavaScript's <code>number</code> type represents ordinary numeric values, including both whole integers and floating-point decimals.</p>

        <pre class="code-block"><code>let age = 25;
let price = 99.99;
let temperature = -10;

console.log(typeof 25); // "number"</code></pre>

        <h4 style="margin-top:16px; color:var(--text-primary);">Basic Arithmetic Operations:</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:10px; margin:10px 0; font-family:'Fira Code',monospace; font-size:0.85rem; text-align:center;">
          <div style="background:var(--bg-surface); padding:10px; border-radius:6px; border:1px solid var(--border-default);">10 + 5 ──▶ <span style="color:#34D399;">15</span></div>
          <div style="background:var(--bg-surface); padding:10px; border-radius:6px; border:1px solid var(--border-default);">10 - 5 ──▶ <span style="color:#34D399;">5</span></div>
          <div style="background:var(--bg-surface); padding:10px; border-radius:6px; border:1px solid var(--border-default);">10 * 5 ──▶ <span style="color:#34D399;">50</span></div>
          <div style="background:var(--bg-surface); padding:10px; border-radius:6px; border:1px solid var(--border-default);">10 / 5 ──▶ <span style="color:#34D399;">2</span></div>
        </div>

        <h4 style="margin-top:16px; color:var(--text-primary);">Special Numeric Values:</h4>
        <ul style="line-height:1.7;">
          <li><code>Infinity</code> — results from numbers exceeding max values or division by zero (e.g., <code>1 / 0</code>).</li>
          <li><code>-Infinity</code> — negative infinity (e.g., <code>-1 / 0</code>).</li>
          <li><code>NaN</code> — stands for <strong>"Not-a-Number"</strong>, representing an invalid arithmetic result.</li>
        </ul>

        <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border-left:4px solid #FBBF24; margin-top:12px;">
          <strong style="color:#FBBF24;">⚡ NaN Quirk:</strong>
          <pre class="code-block" style="margin:8px 0 4px 0;"><code>console.log("hello" * 2); // NaN
console.log(typeof NaN);    // "number"</code></pre>
          <span style="font-size:0.88rem; color:var(--text-secondary);">
            Even though <code>NaN</code> stands for "Not-a-Number", its JavaScript technical type is still <code>"number"</code>!
          </span>
        </div>
      `
    },

    // 5. Number Challenge
    {
      id: "section-5-number-challenge",
      title: "Interactive Number Challenge",
      tocTitle: "5. Number Challenge",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 10px 0; color:var(--accent-primary); font-size:1.05rem;">🧪 Challenge 1: Floating Point Division</h4>
          <p style="margin-bottom:8px;">Consider this code:</p>
          <pre class="code-block"><code>let a = 10;
let b = 3;

console.log(a / b);</code></pre>
          <p style="font-weight:600; color:var(--text-primary); margin:10px 0 6px 0;">Question: Is the result an integer?</p>
          
          <button type="button" class="btn btn--secondary" onclick="this.nextElementSibling.style.display='block'; this.style.display='none';" style="padding:6px 14px; font-size:0.88rem; cursor:pointer;">
            Reveal Result
          </button>
          
          <div style="display:none; margin-top:10px; padding:12px 16px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-accent);">
            <strong style="color:#FBBF24; font-family:'Fira Code',monospace;">Result: 3.3333333333333335</strong>
            <p style="margin:6px 0 0 0; font-size:0.88rem; color:var(--text-secondary);">
              JavaScript numbers have no separate integer type; division produces exact floating-point decimals.
            </p>
          </div>

          <hr style="border:0; border-top:1px solid var(--border-default); margin:20px 0;"/>

          <h4 style="margin:0 0 10px 0; color:var(--accent-primary); font-size:1.05rem;">🧪 Challenge 2: What is typeof NaN?</h4>
          <pre class="code-block"><code>console.log(typeof NaN);</code></pre>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
            <button type="button" class="btn btn--secondary" onclick="alert('Incorrect ❌ NaN is not string \'NaN\'!')" style="text-align:left; padding:8px 12px; font-size:0.88rem; cursor:pointer;">A. "NaN"</button>
            <button type="button" class="btn btn--secondary" onclick="alert('Incorrect ❌ NaN is not undefined!')" style="text-align:left; padding:8px 12px; font-size:0.88rem; cursor:pointer;">B. "undefined"</button>
            <button type="button" class="btn btn--primary" onclick="alert('Correct! 🎉 typeof NaN returns \'number\'!')" style="text-align:left; padding:8px 12px; font-size:0.88rem; cursor:pointer;">C. "number" ✅</button>
            <button type="button" class="btn btn--secondary" onclick="alert('Incorrect ❌ NaN is a numeric value, not an object!')" style="text-align:left; padding:8px 12px; font-size:0.88rem; cursor:pointer;">D. "object"</button>
          </div>
        </div>
      `
    },

    // 6. Primitive Type #2 — String
    {
      id: "section-6-type-string",
      title: "Primitive Type #2 — String",
      tocTitle: "6. String",
      contentHtml: `
        <p>A <strong>string</strong> represents text. JavaScript supports three quote formats:</p>

        <pre class="code-block"><code>let doubleQuotes = "Hello";
let singleQuotes = 'Hello';
let templateLiteral = \`Hello\`;</code></pre>

        <h4 style="margin-top:14px; color:var(--text-primary);">Template Literals (Backticks):</h4>
        <pre class="code-block"><code>let name = "Nirmal";
let message = \`Hello \${name}\`; // "Hello Nirmal"</code></pre>

        <h4 style="margin-top:14px; color:var(--text-primary);">String Operations:</h4>
        <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); font-family:'Fira Code',monospace; font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
          <div>"Hello" + " World" &nbsp;──▶ &nbsp;<span style="color:#F472B6;">"Hello World"</span></div>
          <div>"JavaScript".length &nbsp;──▶ &nbsp;<span style="color:#34D399;">10</span></div>
        </div>

        <h4 style="margin-top:16px; color:var(--text-primary);">String Immutability Example:</h4>
        <pre class="code-block"><code>let word = "cat";
word[0] = "b"; // Silently fails!

console.log(word); // "cat"</code></pre>

        <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:6px;">
          Strings are immutable primitives. Direct index mutation (<code>word[0] = "b"</code>) is ignored. To change a string, construct a new one (e.g. <code>word = "b" + word.slice(1)</code>).
        </p>
      `
    },

    // 7. Primitive Type #3 — Boolean
    {
      id: "section-7-type-boolean",
      title: "Primitive Type #3 — Boolean",
      tocTitle: "7. Boolean",
      contentHtml: `
        <p>A <strong>Boolean</strong> has only two possible values: <code>true</code> or <code>false</code>.</p>

        <pre class="code-block"><code>let isLoggedIn = true;
let isAdmin = false;</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="color:var(--text-secondary); margin-bottom:8px;">REAL-WORLD DECISION FLOW</div>
          <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
            <div style="background:var(--bg-body); padding:10px 16px; border-radius:8px; border-top:3px solid #34D399;">
              Is user logged in?<br/>↓<br/><strong style="color:#34D399;">true</strong>
            </div>
            <div style="background:var(--bg-body); padding:10px 16px; border-radius:8px; border-top:3px solid #EF4444;">
              Is user an admin?<br/>↓<br/><strong style="color:#EF4444;">false</strong>
            </div>
          </div>
        </div>

        <h4 style="margin-top:14px;">Comparisons Produce Booleans:</h4>
        <div style="background:var(--bg-body); padding:12px 16px; border-radius:8px; font-family:'Fira Code',monospace; font-size:0.88rem; border:1px solid var(--border-default); display:flex; flex-direction:column; gap:6px;">
          <div>10 &gt; 5 &nbsp;&nbsp;&nbsp;──▶ &nbsp;<span style="color:#34D399;">true</span></div>
          <div>10 &lt; 5 &nbsp;&nbsp;&nbsp;──▶ &nbsp;<span style="color:#EF4444;">false</span></div>
          <div>10 === 10 ──▶ &nbsp;<span style="color:#34D399;">true</span></div>
        </div>

        <p style="margin-top:12px; font-size:0.9rem; color:var(--text-secondary);">
          Booleans power control flow, searching algorithms, conditions, and decision making in DSA.
        </p>
      `
    },

    // 8. Primitive Type #4 — Undefined
    {
      id: "section-8-type-undefined",
      title: "Primitive Type #4 — Undefined",
      tocTitle: "8. Undefined",
      contentHtml: `
        <p><code>undefined</code> means a variable has been declared, but no initial value has been assigned to it yet.</p>

        <pre class="code-block"><code>let score;

console.log(score);        // undefined
console.log(typeof score); // "undefined"</code></pre>

        <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); margin-top:12px; font-size:0.92rem;">
          <strong>Slot Analogy:</strong> The variable slot <code>score</code> exists in scope memory, but it holds JavaScript's default placeholder value <code>undefined</code>.
        </div>
      `
    },

    // 9. Primitive Type #5 — Null
    {
      id: "section-9-type-null",
      title: "Primitive Type #5 — Null",
      tocTitle: "9. Null",
      contentHtml: `
        <p><code>null</code> is an <strong>intentional</strong> assignment representing the explicit absence of any value.</p>

        <pre class="code-block"><code>let selectedUser = null;</code></pre>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:14px 0; font-size:0.88rem;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #FBBF24;">
            <strong style="color:#FBBF24; font-size:0.95rem;">undefined</strong><br/>
            <span style="color:var(--text-secondary);">No value has been assigned / provided yet.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); border-top:3px solid #A78BFA;">
            <strong style="color:#A78BFA; font-size:0.95rem;">null</strong><br/>
            <span style="color:var(--text-secondary);">Intentionally set to "nothing" by developer.</span>
          </div>
        </div>

        <div class="callout-box callout-box--warning">
          <strong style="color:#EF4444; font-size:1rem;">🚨 Interview / JavaScript Gotcha:</strong>
          <pre class="code-block" style="margin:8px 0 4px 0;"><code>console.log(typeof null); // "object"</code></pre>
          <span style="font-size:0.88rem; color:var(--text-secondary);">
            This is a <strong>historical bug</strong> from JS 1.0 preserved for backward compatibility. <code>null</code> is <strong>still a primitive</strong> value, NOT an object!
          </span>
        </div>
      `
    },

    // 10. Primitive Type #6 — BigInt
    {
      id: "section-10-type-bigint",
      title: "Primitive Type #6 — BigInt",
      tocTitle: "10. BigInt",
      contentHtml: `
        <p><strong>BigInt</strong> represents whole integers too large to safely fit inside JavaScript's standard <code>Number</code> precision limits.</p>

        <pre class="code-block"><code>const bigNumber = 9007199254740993n; // Note the 'n' suffix
console.log(typeof 123n);            // "bigint"</code></pre>

        <div class="callout-box callout-box--important" style="margin-top:14px;">
          <strong>⚠️ Arithmetic Rule:</strong><br/>
          <code>10n + 5n</code> evaluates to <code>15n</code>. However, mixing BigInt and standard Number directly (e.g. <code>10n + 5</code>) throws a <strong>TypeError</strong>.
        </div>
      `
    },

    // 11. Primitive Type #7 — Symbol
    {
      id: "section-11-type-symbol",
      title: "Primitive Type #7 — Symbol",
      tocTitle: "11. Symbol",
      contentHtml: `
        <p>A <strong>Symbol</strong> creates an absolutely unique primitive value, guaranteed never to collide with any other value.</p>

        <pre class="code-block"><code>const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false!</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; text-align:center; font-family:'Fira Code',monospace; font-size:0.85rem;">
          Symbol("id") &nbsp;──▶ &nbsp;<span style="color:#3B82F6;">Unique Identity A</span><br/>
          Symbol("id") &nbsp;──▶ &nbsp;<span style="color:#EC4899;">Unique Identity B</span>
        </div>

        <p style="font-size:0.9rem; color:var(--text-secondary);">
          <strong>Analogy:</strong> Two people can both be named "John", but their physical identity is completely distinct. Symbols are primarily used for unique object property keys.
        </p>
      `
    },

    // 12. The Seven Primitives — Interactive Map
    {
      id: "section-12-interactive-map",
      title: "The Seven Primitives — Interactive Grid",
      tocTitle: "12. 7 Primitives Grid",
      contentHtml: `
        <p style="color:var(--text-secondary); margin-bottom:14px;">Click any primitive card below to highlight its core representation:</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px;">
          <div onclick="alert('Number: Represents whole & decimal numbers (25, 99.99).')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🔢</div>
            <strong style="color:#60A5FA; display:block; margin:6px 0 2px 0;">Number</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">42</span>
          </div>

          <div onclick="alert('String: Immutable sequence of text characters (\"Hello\").')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🔤</div>
            <strong style="color:#F472B6; display:block; margin:6px 0 2px 0;">String</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">"Hello"</span>
          </div>

          <div onclick="alert('Boolean: Logical true or false flag.')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🔘</div>
            <strong style="color:#34D399; display:block; margin:6px 0 2px 0;">Boolean</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">true</span>
          </div>

          <div onclick="alert('Undefined: Default unassigned variable state.')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">❓</div>
            <strong style="color:#FBBF24; display:block; margin:6px 0 2px 0;">Undefined</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">undefined</span>
          </div>

          <div onclick="alert('Null: Explicit intentional empty value.')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🚫</div>
            <strong style="color:#A78BFA; display:block; margin:6px 0 2px 0;">Null</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">null</span>
          </div>

          <div onclick="alert('BigInt: Large integer with n suffix (9007199254740993n).')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🐘</div>
            <strong style="color:#EC4899; display:block; margin:6px 0 2px 0;">BigInt</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">123n</span>
          </div>

          <div onclick="alert('Symbol: Guaranteed unique primitive identifier.')" style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); cursor:pointer; text-align:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            <div style="font-size:1.2rem;">🔑</div>
            <strong style="color:#3B82F6; display:block; margin:6px 0 2px 0;">Symbol</strong>
            <span style="font-size:0.78rem; font-family:'Fira Code',monospace; color:var(--text-secondary);">Symbol()</span>
          </div>
        </div>
      `
    },

    // 13. Primitive vs Object
    {
      id: "section-13-primitive-vs-object",
      title: "Primitive vs Object — Page 4 Bridge Preview",
      tocTitle: "13. Primitive vs Object",
      contentHtml: `
        <p>Notice the core difference between primitive copying and object reference sharing:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.95rem;">Primitive Copying (Value)</strong>
            <pre class="code-block" style="margin:8px 0;"><code>let a = 10;
let b = a;
b = 20;</code></pre>
            <div style="font-family:'Fira Code',monospace; font-size:0.85rem; color:var(--text-secondary); text-align:center;">
              a ──▶ 10<br/>
              b ──▶ 20 <span style="color:#34D399;">(Independent)</span>
            </div>
          </div>

          <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default);">
            <strong style="color:#60A5FA; font-size:0.95rem;">Object Copying (Reference)</strong>
            <pre class="code-block" style="margin:8px 0;"><code>const u1 = { name: "Alice" };
const u2 = u1;</code></pre>
            <div style="font-family:'Fira Code',monospace; font-size:0.82rem; color:var(--text-secondary); text-align:center;">
              u1 ──┐<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ ──▶ [ Object ]<br/>
              u2 ──┘
            </div>
          </div>
        </div>

        <p style="font-size:0.9rem; color:var(--text-secondary);">
          We will explore objects, memory references, and heap pointers in detail on the next page: <strong>Page 4 — Objects</strong>.
        </p>
      `
    },

    // 14. Primitive Equality
    {
      id: "section-14-primitive-equality",
      title: "How Do Primitive Values Compare?",
      tocTitle: "14. Primitive Equality",
      contentHtml: `
        <p>Strict equality (<code>===</code>) compares primitive values by checking both their <strong>value</strong> and <strong>type</strong> without type conversion:</p>

        <pre class="code-block"><code>console.log(10 === 10);        // true
console.log("hello" === "hello"); // true
console.log(true === true);    // true</code></pre>

        <p>If the primitive types differ, strict comparison returns <code>false</code>:</p>
        <pre class="code-block"><code>console.log(10 === "10"); // false!</code></pre>

        <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); margin-top:10px; font-family:'Fira Code',monospace; font-size:0.88rem;">
          10 &nbsp;&nbsp;&nbsp;──▶ &nbsp;<span style="color:#60A5FA;">Number</span><br/>
          "10" &nbsp;──▶ &nbsp;<span style="color:#F472B6;">String</span><br/>
          <span style="color:#EF4444;">10 === "10" ──▶ false (Different Types)</span>
        </div>
      `
    },

    // 15. == vs ===
    {
      id: "section-15-equality-operators",
      title: "== vs === — The Essential Distinction",
      tocTitle: "15. == vs ===",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #FBBF24;">
            <strong style="color:#FBBF24;">== (Loose Equality)</strong>
            <pre class="code-block" style="margin:6px 0 2px 0;"><code>10 == "10" // true (Converts string "10" to number 10)</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Performs implicit type coercion before comparison.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #34D399;">
            <strong style="color:#34D399;">=== (Strict Equality)</strong>
            <pre class="code-block" style="margin:6px 0 2px 0;"><code>10 === "10" // false (No type coercion allowed)</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Strictly checks value and type without coercing.</span>
          </div>
        </div>

        <div class="callout-box callout-box--tip">
          💡 <strong>Best Practice:</strong> Always use <code>===</code> for predictable, bug-free comparisons.
        </div>
      `
    },

    // 16. Primitive Immutability Playground
    {
      id: "section-16-immutability-playground",
      title: "Primitive Immutability & Copying Playground",
      tocTitle: "16. Visual Playground",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 10px 0; color:var(--text-primary);">Interactive Variable Copy Visualizer</h4>
          
          <pre class="code-block"><code>let x = 10;
let y = x;
y = 20;</code></pre>

          <div style="background:var(--bg-body); padding:16px; border-radius:8px; border:1px solid var(--border-default); margin-top:12px; font-family:'Fira Code',monospace; font-size:0.9rem;">
            <div style="display:flex; justify-content:space-around; text-align:center;">
              <div>
                <span style="color:var(--text-secondary); font-size:0.8rem;">VARIABLE x</span><br/>
                <span style="color:#60A5FA; font-weight:700; font-size:1.1rem;">x ──▶ 10</span>
              </div>
              <div>
                <span style="color:var(--text-secondary); font-size:0.8rem;">VARIABLE y</span><br/>
                <span style="color:#34D399; font-weight:700; font-size:1.1rem;">y ──▶ 20</span>
              </div>
            </div>
          </div>
          <p style="font-size:0.88rem; color:var(--text-secondary); text-align:center; margin-top:10px;">
            Changing <code>y</code> to 20 updates only <code>y</code>. Variable <code>x</code> remains 10.
          </p>
        </div>
      `
    },

    // 17. DSA Connection
    {
      id: "section-17-dsa-connection",
      title: "DSA Connection — Why Primitives Matter in Algorithms",
      tocTitle: "17. DSA Connection",
      contentHtml: `
        <p>Primitive values are the core data units processed inside Data Structures & Algorithms:</p>

        <ul style="line-height:1.7;">
          <li><strong>Numbers:</strong> Array indexes, loop counters, graph distances, algorithm time complexities.</li>
          <li><strong>Booleans:</strong> Search match flags, condition checks, visited node markers.</li>
          <li><strong>Strings:</strong> Text searching, pattern matching, string reversal, anagram checking.</li>
          <li><strong>Undefined / Null:</strong> Empty node pointers, missing search targets, tree leaves.</li>
          <li><strong>BigInt:</strong> Ultra-large mathematical computations (e.g. large Fibonacci numbers).</li>
        </ul>

        <pre class="code-block" style="margin-top:12px;"><code>for (let i = 0; i < 10; i++) {
  // 'i' is a primitive number used as an array loop index
}</code></pre>
      `
    },

    // 18. Common Mistakes
    {
      id: "section-18-common-mistakes",
      title: "Common Beginner Mistakes",
      tocTitle: "18. Common Mistakes",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="mistake-card">
            <div class="mistake-card__title">1. Thinking "10" and 10 are the same type</div>
            <div class="mistake-card__desc"><code>"10"</code> is a string while <code>10</code> is a number. <code>"10" === 10</code> returns <code>false</code>.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">2. Thinking null is an object because typeof null === "object"</div>
            <div class="mistake-card__desc"><code>typeof null</code> returning <code>"object"</code> is a historical JS bug. <code>null</code> is a primitive value.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">3. Thinking changing a string character mutates the string</div>
            <div class="mistake-card__desc"><code>word[0] = 'b'</code> fails silently. Strings are immutable primitives.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">4. Confusing undefined and null</div>
            <div class="mistake-card__desc"><code>undefined</code> means uninitialized default state, whereas <code>null</code> is intentional assignment of no value.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">5. Thinking NaN has type "NaN"</div>
            <div class="mistake-card__desc"><code>typeof NaN</code> returns <code>"number"</code>. Use <code>Number.isNaN(val)</code> to check for <code>NaN</code>.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">6. Mixing BigInt and Number directly</div>
            <div class="mistake-card__desc"><code>10n + 5</code> throws a <code>TypeError</code>. Explicit conversion is required.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">7. Thinking two Symbols with the same description are equal</div>
            <div class="mistake-card__desc"><code>Symbol("id") === Symbol("id")</code> returns <code>false</code>; every Symbol call produces a unique value.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">8. Using == without understanding type coercion</div>
            <div class="mistake-card__desc"><code>==</code> coerces types automatically. Prefer <code>===</code> for explicit comparisons.</div>
          </div>
        </div>
      `
    },

    // 19. Primitive Cheat Sheet
    {
      id: "section-19-cheat-sheet",
      title: "Primitive Cheat Sheet",
      tocTitle: "19. Cheat Sheet",
      contentHtml: `
        <div class="concept-table-wrapper">
          <table class="concept-table">
            <thead>
              <tr>
                <th>Primitive Type</th>
                <th>Example</th>
                <th><code>typeof</code> Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Number</strong></td>
                <td><code>42</code>, <code>3.14</code></td>
                <td><code>"number"</code></td>
              </tr>
              <tr>
                <td><strong>String</strong></td>
                <td><code>"hello"</code></td>
                <td><code>"string"</code></td>
              </tr>
              <tr>
                <td><strong>Boolean</strong></td>
                <td><code>true</code>, <code>false</code></td>
                <td><code>"boolean"</code></td>
              </tr>
              <tr>
                <td><strong>Undefined</strong></td>
                <td><code>undefined</code></td>
                <td><code>"undefined"</code></td>
              </tr>
              <tr>
                <td><strong>Null</strong></td>
                <td><code>null</code></td>
                <td><code>"object"</code>*</td>
              </tr>
              <tr>
                <td><strong>BigInt</strong></td>
                <td><code>42n</code></td>
                <td><code>"bigint"</code></td>
              </tr>
              <tr>
                <td><strong>Symbol</strong></td>
                <td><code>Symbol("id")</code></td>
                <td><code>"symbol"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:8px;">
          * Note: <code>typeof null</code> returning <code>"object"</code> is a historical JavaScript quirk. <code>null</code> itself is a primitive.
        </p>
      `
    },

    // 20. Summary
    {
      id: "section-20-summary",
      title: "Page Completion Summary",
      tocTitle: "20. Summary",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">PRIMITIVES SUMMARY</h4>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.92rem; line-height:1.6;">
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Primitive = basic non-object value</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>7 types: Number, String, Boolean, Undefined, Null, BigInt, Symbol</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Primitive values are immutable</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Assignment of primitives gives independent copied values</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>10</code> and <code>"10"</code> are different types</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>null</code> and <code>undefined</code> represent different concepts</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>NaN</code> has type <code>"number"</code></span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>BigInt uses the <code>n</code> suffix</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Symbols are guaranteed unique</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>===</code> avoids type coercion</span></li>
          </ul>
        </div>
      `
    },

    // 21. Bridge to Page 4
    {
      id: "section-21-bridge-objects",
      title: "Bridge to Page 4 — Next: Objects",
      tocTitle: "21. Next: Objects",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-default); text-align:center; margin-top:16px;">
          <h3 style="margin:0 0 12px 0; color:var(--text-primary); font-size:1.2rem;">Next Up: Objects</h3>
          
          <p style="color:var(--text-secondary); max-width:550px; margin:0 auto 16px auto; line-height:1.6; font-size:0.95rem;">
            If primitives are individual, simple values, how do we store collections of related data together?
          </p>

          <pre class="code-block" style="display:inline-block; text-align:left; margin-bottom:18px;"><code>const user = {
  name: "Nirmal",
  age: 25
};</code></pre>

          <div>
            <a href="#objects" class="lesson-cross-link btn btn--primary" data-topic="objects" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; font-weight:700; text-decoration:none; border-radius:8px;">
              Next → Objects
            </a>
          </div>
        </div>
      `
    }
  ],

  // 17. Predict Output (8 questions)
  predictOutput: [
    {
      code: "let a = 10;\nlet b = a;\nb = 50;\nconsole.log(a);",
      options: ["10", "50", "undefined", "ReferenceError"],
      answer: "10",
      explanation: "Primitives copy by value. Reassigning b to 50 leaves variable a untouched at 10."
    },
    {
      code: "console.log(typeof 10);",
      options: ["\"number\"", "\"string\"", "\"integer\"", "\"digit\""],
      answer: "\"number\"",
      explanation: "JavaScript has a single number type that handles all numeric values."
    },
    {
      code: "console.log(typeof \"10\");",
      options: ["\"string\"", "\"number\"", "\"text\"", "\"object\""],
      answer: "\"string\"",
      explanation: "Text enclosed in quotes is of primitive type string."
    },
    {
      code: "console.log(typeof null);",
      options: ["\"object\"", "\"null\"", "\"undefined\"", "\"boolean\""],
      answer: "\"object\"",
      explanation: "typeof null returning 'object' is a long-standing historical JS bug, though null is primitive."
    },
    {
      code: "console.log(10 === \"10\");",
      options: ["false", "true", "undefined", "TypeError"],
      answer: "false",
      explanation: "Strict comparison === checks both value and type without coercing. Number 10 !== String '10'."
    },
    {
      code: "console.log(10 == \"10\");",
      options: ["true", "false", "undefined", "TypeError"],
      answer: "true",
      explanation: "Loose comparison == performs type coercion, converting String '10' to Number 10 before checking."
    },
    {
      code: "console.log(typeof 123n);",
      options: ["\"bigint\"", "\"number\"", "\"largeint\"", "\"object\""],
      answer: "\"bigint\"",
      explanation: "The 'n' suffix denotes a BigInt primitive integer type."
    },
    {
      code: "const a = Symbol(\"id\");\nconst b = Symbol(\"id\");\nconsole.log(a === b);",
      options: ["false", "true", "undefined", "TypeError"],
      answer: "false",
      explanation: "Every Symbol call creates a unique primitive identity, even with identical description strings."
    }
  ],

  // 20. Mini Quiz (10 questions)
  miniQuiz: [
    {
      question: "Q1. What type is const age = \"25\"?",
      options: ["A. String", "B. Number", "C. Boolean", "D. BigInt"],
      answer: "A",
      explanation: "Quoted characters represent string primitives."
    },
    {
      question: "Q2. What type is const value = 25n?",
      options: ["A. Number", "B. BigInt", "C. Integer", "D. Symbol"],
      answer: "B",
      explanation: "The trailing 'n' marks a BigInt primitive."
    },
    {
      question: "Q3. What is the value of let score; if declared without assignment?",
      options: ["A. null", "B. undefined", "C. 0", "D. NaN"],
      answer: "B",
      explanation: "Uninitialized variables default to value undefined."
    },
    {
      question: "Q4. What is the output of typeof NaN?",
      options: ["A. \"NaN\"", "B. \"undefined\"", "C. \"number\"", "D. \"object\""],
      answer: "C",
      explanation: "NaN is technically of JavaScript type number."
    },
    {
      question: "Q5. What happens when writing let word = 'cat'; word[0] = 'b';?",
      options: ["A. word becomes 'bat'", "B. word remains 'cat'", "C. Throws TypeError", "D. word becomes undefined"],
      answer: "B",
      explanation: "Strings are immutable primitives; index mutations fail silently."
    },
    {
      question: "Q6. Which operator checks both value and type without coercion?",
      options: ["A. ==", "B. ===", "C. =", "D. !="],
      answer: "B",
      explanation: "=== is the strict equality operator."
    },
    {
      question: "Q7. What does 10n + 5 execute to?",
      options: ["A. 15n", "B. 15", "C. Throws TypeError", "D. NaN"],
      answer: "C",
      explanation: "BigInt and Number cannot be directly mixed in arithmetic."
    },
    {
      question: "Q8. Why does typeof null return 'object'?",
      options: ["A. Null is an object", "B. Historical JS bug", "C. Null inherits Object prototype", "D. JS engine optimization"],
      answer: "B",
      explanation: "typeof null returning 'object' is a historical legacy JS bug."
    },
    {
      question: "Q9. How are primitives passed when assigned let b = a?",
      options: ["A. Copied by reference", "B. Copied by value", "C. Shared memory link", "D. Pointer alias"],
      answer: "B",
      explanation: "Primitives are copied by value into independent variable memory bindings."
    },
    {
      question: "Q10. Are Symbol('a') and Symbol('a') equal?",
      options: ["A. Yes (true)", "B. No (false)", "C. Only with ==", "D. Depends on scope"],
      answer: "B",
      explanation: "Every Symbol invocation returns a unique primitive value."
    }
  ],

  practice: [
    {
      q: "1. What is a primitive?",
      a: "A primitive is a basic, immutable value that is not an object and has no methods of its own."
    },
    {
      q: "2. What are the seven primitive types?",
      a: "Number, String, Boolean, Undefined, Null, BigInt, and Symbol."
    },
    {
      q: "3. What does immutable mean?",
      a: "Immutable means the primitive value itself cannot be modified in place. Reassigning a variable creates a new value binding rather than altering the original primitive."
    },
    {
      q: "4. Why does changing b not change a in `let a = 10; let b = a; b = 20;`?",
      a: "Primitives are copied by value. Assigning `let b = a` writes an independent copy of `10` into `b`'s memory slot. Reassigning `b = 20` mutates only `b`."
    },
    {
      q: "5. What is the difference between null and undefined?",
      a: "`undefined` means a variable has been declared but not assigned a value yet (default placeholder state). `null` is an explicit, intentional assignment representing 'no value'."
    },
    {
      q: "6. Why does typeof null return 'object'?",
      a: "It is a historical bug from the first version of JavaScript (JS 1.0) preserved for backward compatibility. `null` is actually a primitive value."
    },
    {
      q: "7. Why are 10 and '10' different?",
      a: "`10` is of primitive type Number, while `'10'` is of primitive type String. They represent different data types."
    },
    {
      q: "8. Why are two Symbol('id') values different?",
      a: "Every invocation of `Symbol()` generates a unique primitive identity, even if created with identical description strings."
    }
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Assuming a string can be edited in place",
      desc: "Assuming a string can be edited in place, e.g. <code>str[0] = 'X'</code> — this silently does nothing; strings are immutable."
    },
    {
      title: "Mistake 2: Comparing NaN with ===",
      desc: "Comparing <code>NaN</code> with <code>===</code> (e.g. <code>NaN === NaN</code> is <code>false</code>) — use <code>Number.isNaN(value)</code>."
    },
    {
      title: "Mistake 3: Relying on == instead of ===",
      desc: "Relying on <code>==</code> instead of <code>===</code> and getting surprised by type coercion (e.g. <code>'5' == 5</code> is <code>true</code>)."
    },
    {
      title: "Mistake 4: Thinking null is an object",
      desc: "<code>typeof null</code> returning <code>'object'</code> is a historical bug in the language. <code>null</code> is still a primitive."
    }
  ]
};
