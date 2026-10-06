/**
 * DSA Tracker — Lesson Content: Objects (Page 4)
 * ──────────────────────────────────────────────────────────
 * Focused Level 1 Foundation lesson on JavaScript Objects:
 * - Why objects are needed (grouping related data)
 * - Object structure, keys, values, and properties
 * - Creating objects, property access (Dot vs Bracket)
 * - Property mutation & const binding behavior
 * - Adding & deleting properties
 * - Different value types & nested objects
 * - Object references, aliasing, and memory allocation
 * - Reference equality vs value equality ({ } === { } vs a === b)
 * - Objects vs Primitives comparison
 * - Real-world applications (APIs, products, databases)
 * - Objects in DSA (Linked Lists, Trees, Graphs, Hash Tables)
 * - Destructuring, Spread, Optional Chaining
 * - Interactive Object Playground visualizer
 * - 5 Concept Checkpoint Questions & 23-Question Dedicated Questions Suite
 * - Bridge to Page 5: Function Calls
 */

window.updateObjPlayground = function (action) {
  var el = document.getElementById('obj-playground-content');
  if (!el) return;
  if (action === 'change') {
    el.innerHTML = '{<br/>&nbsp;&nbsp;name: <span style="color:#F472B6;">"Bob"</span>,<br/>&nbsp;&nbsp;age: <span style="color:#34D399;">25</span><br/>}';
  } else if (action === 'add') {
    el.innerHTML = '{<br/>&nbsp;&nbsp;name: <span style="color:#F472B6;">"Alice"</span>,<br/>&nbsp;&nbsp;age: <span style="color:#34D399;">25</span>,<br/>&nbsp;&nbsp;city: <span style="color:#60A5FA;">"Chennai"</span><br/>}';
  } else if (action === 'delete') {
    el.innerHTML = '{<br/>&nbsp;&nbsp;name: <span style="color:#F472B6;">"Alice"</span><br/>}';
  } else if (action === 'copy') {
    el.innerHTML = '{<br/>&nbsp;&nbsp;name: <span style="color:#F472B6;">"Alice"</span>,<br/>&nbsp;&nbsp;age: <span style="color:#34D399;">25</span><br/>}<br/><span style="color:#A78BFA; font-size:0.8rem;">// user2 points to Same Shared Reference Pointer!</span>';
  }
};

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["objects"] = {
  id: "objects",
  title: "Objects",
  levelTitle: "Level 1 — Foundations",
  summary: "Learn how objects group related data, how properties work, and why references make objects behave differently from primitive values.",
  whyMatters: "Objects are the fundamental structured data type in programming. Understanding key-value properties and reference memory allocation forms the foundation for data structures like Linked Lists, Trees, Graphs, and Hash Tables.",

  sections: [
    // 1. Page Introduction
    {
      id: "section-1-intro",
      title: "Page Introduction — Why Objects?",
      tocTitle: "1. Introduction",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:22px; border-radius:12px; border:1px solid var(--border-default); margin-bottom:16px;">
          <h3 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.25rem;">Objects</h3>
          <p style="color:var(--text-secondary); margin-bottom:14px; font-size:0.98rem; line-height:1.65;">
            Learn how objects group related data, how properties work, and why references make objects behave differently from primitive values.
          </p>

          <p style="color:var(--text-primary); margin-bottom:10px;">Consider individual primitive variables describing a person:</p>
          <pre class="code-block" style="margin-bottom:12px;"><code>const name = "Nirmal";
const age = 25;
const city = "Chennai";</code></pre>

          <p style="color:var(--accent-primary); font-weight:600; margin-bottom:12px;">
            These values describe one person. Wouldn't it be easier to keep them together in one unit?
          </p>

          <pre class="code-block" style="margin-bottom:14px;"><code>const user = {
  name: "Nirmal",
  age: 25,
  city: "Chennai"
};</code></pre>

          <div style="background:var(--bg-body); padding:14px; border-radius:8px; border:1px dashed var(--border-accent); font-family:'Fira Code',monospace; font-size:0.88rem; text-align:center;">
            user<br/>
            &nbsp;&nbsp;↓<br/>
            ┌──────────────────────┐<br/>
            │ name: "Nirmal"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
            │ age: 25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
            │ city: "Chennai"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
            └──────────────────────┘
          </div>

          <div style="background:var(--accent-gradient-subtle); padding:12px 16px; border-radius:8px; border:1px solid var(--border-accent); margin-top:14px; color:var(--text-primary); font-size:0.92rem;">
            💡 <strong>Core Concept:</strong> An <strong>object</strong> lets us group related data using named <strong>properties</strong>.
          </div>
        </div>
      `
    },

    // 2. What Is an Object?
    {
      id: "section-2-what-is-object",
      title: "What Is an Object?",
      tocTitle: "2. What Is an Object?",
      contentHtml: `
        <p>An <strong>object</strong> is a collection of <strong>properties</strong>, where each property has a <strong>key</strong> and a <strong>value</strong>.</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25,
  isDeveloper: true
};</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:10px; font-family:-apple-system,sans-serif;">PROPERTY KEY-VALUE BREAKDOWN</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div><span style="color:#60A5FA; font-weight:700;">name</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ key &nbsp;|&nbsp; <span style="color:#FBBF24;">"Nirmal"</span> ──▶ value</div>
            <div><span style="color:#60A5FA; font-weight:700;">age</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ key &nbsp;|&nbsp; <span style="color:#34D399;">25</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ value</div>
            <div><span style="color:#60A5FA; font-weight:700;">isDeveloper</span> ──▶ key &nbsp;|&nbsp; <span style="color:#F472B6;">true</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ value</div>
          </div>
        </div>

        <ul style="line-height:1.7;">
          <li><strong>Object:</strong> The overall data container structure.</li>
          <li><strong>Property:</strong> A single key-value pair inside the object.</li>
          <li><strong>Key:</strong> The identifier name used to access the data.</li>
          <li><strong>Value:</strong> The data stored at that property key.</li>
        </ul>
      `
    },

    // 3. Why Do We Need Objects?
    {
      id: "section-3-why-objects",
      title: "Why Do We Need Objects?",
      tocTitle: "3. Why Need Objects?",
      contentHtml: `
        <p>Compare writing code with vs without objects:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.95rem;">Without Object (Disconnected)</strong>
            <pre class="code-block" style="margin-top:8px;"><code>const userName = "Nirmal";
const userAge = 25;
const userCity = "Chennai";
const userRole = "Developer";</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.95rem;">With Object (Grouped Unit)</strong>
            <pre class="code-block" style="margin-top:8px;"><code>const user = {
  name: "Nirmal",
  age: 25,
  city: "Chennai",
  role: "Developer"
};</code></pre>
          </div>
        </div>

        <p style="font-size:0.92rem; color:var(--text-secondary);">
          Grouping related variables into objects simplifies parameter passing, improves code readability, and prevents variable name pollution.
        </p>
      `
    },

    // 4. Creating an Object
    {
      id: "section-4-creating-object",
      title: "Creating an Object",
      tocTitle: "4. Creating Objects",
      contentHtml: `
        <p>JavaScript uses <strong>object literal</strong> syntax <code>{ }</code> to create objects:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25
};</code></pre>

        <h4 style="margin-top:14px;">Creating an Empty Object & Adding Properties:</h4>
        <pre class="code-block"><code>const user = {}; // Empty object

user.name = "Nirmal";
user.age = 25;</code></pre>
      `
    },

    // 5. Accessing Properties
    {
      id: "section-5-accessing-properties",
      title: "Accessing Properties — Dot vs Bracket Notation",
      tocTitle: "5. Accessing Properties",
      contentHtml: `
        <p>JavaScript provides two syntaxes to access object properties:</p>

        <div style="display:flex; flex-direction:column; gap:12px; margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #60A5FA;">
            <strong style="color:#60A5FA; font-size:1rem;">1. Dot Notation</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>console.log(user.name); // "Nirmal"</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Used when property names are known directly at authoring time.</span>
          </div>

          <div style="background:var(--bg-surface); padding:14px 18px; border-radius:8px; border:1px solid var(--border-default); border-left:4px solid #F472B6;">
            <strong style="color:#F472B6; font-size:1rem;">2. Bracket Notation</strong>
            <pre class="code-block" style="margin:8px 0 4px 0;"><code>console.log(user["name"]); // "Nirmal"</code></pre>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Used when key names are stored in variables or contain spaces/special characters.</span>
          </div>
        </div>
      `
    },

    // 6. Dot Notation vs Bracket Notation
    {
      id: "section-6-dot-vs-bracket",
      title: "Dot Notation vs Bracket Notation",
      tocTitle: "6. Dot vs Bracket",
      contentHtml: `
        <p>Why do we need bracket notation when dot notation looks cleaner?</p>

        <h4 style="margin-top:14px; color:var(--text-primary);">Dynamic Property Access via Variable:</h4>
        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25
};

const key = "name";

console.log(user.key);  // undefined (looks for literal property named 'key')
console.log(user[key]); // "Nirmal"  (evaluates variable key to 'name')</code></pre>

        <div class="callout-box callout-box--tip" style="margin-top:14px;">
          💡 <strong>Rule of Thumb:</strong> Use <code>user.name</code> for static known keys. Use <code>user[key]</code> when the key name comes from a variable, function parameter, or loop iteration.
        </div>
      `
    },

    // 7. Changing Object Properties
    {
      id: "section-7-changing-properties",
      title: "Changing Object Properties — Const Binding vs Content Mutation",
      tocTitle: "7. Changing Properties",
      contentHtml: `
        <p>Observe what happens when mutating property values of a <code>const</code> object:</p>

        <pre class="code-block"><code>const user = {
  name: "Alice",
  age: 25
};

user.name = "Bob";

console.log(user.name); // "Bob"</code></pre>

        <div class="callout-box callout-box--warning" style="margin-top:14px;">
          <strong>⚡ Why does const allow this?</strong><br/>
          <code>const</code> prevents reassigning the <em>variable binding reference pointer</em> itself (e.g. <code>user = {}</code> throws a TypeError). However, it does <strong>not</strong> freeze or lock the properties <em>inside</em> the referenced object!
        </div>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; text-align:center; font-family:'Fira Code',monospace; font-size:0.85rem;">
          const user ──▶ <span style="color:#60A5FA;">[ Reference Pointer Unchanged ]</span><br/><br/>
          Object Content: &nbsp; { name: <span style="color:#EF4444;">"Alice"</span> } ──▶ { name: <span style="color:#34D399;">"Bob"</span> }
        </div>
      `
    },

    // 8. Adding and Deleting Properties
    {
      id: "section-8-adding-deleting",
      title: "Adding and Deleting Properties",
      tocTitle: "8. Add & Delete",
      contentHtml: `
        <p>Objects are dynamic key-value collections. You can add or delete properties at runtime:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal"
};

// 1. Adding a property
user.age = 25;
console.log(user); // { name: "Nirmal", age: 25 }

// 2. Deleting a property
delete user.age;
console.log(user); // { name: "Nirmal" }</code></pre>
      `
    },

    // 9. Objects Can Contain Different Value Types
    {
      id: "section-9-different-types",
      title: "Objects Can Contain Different Value Types",
      tocTitle: "9. Value Types",
      contentHtml: `
        <p>Object properties can hold numbers, strings, booleans, null, undefined, or even arrays and other objects:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25,
  isDeveloper: true,
  salary: null,
  skills: ["JavaScript", "Node.js"]
};</code></pre>

        <div style="background:var(--bg-surface); padding:16px; border-radius:10px; border:1px solid var(--border-default); margin-top:14px; font-family:'Fira Code',monospace; font-size:0.88rem;">
          user<br/>
          ├── name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ <span style="color:#F472B6;">"Nirmal"</span> (String)<br/>
          ├── age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ <span style="color:#34D399;">25</span> (Number)<br/>
          ├── isDeveloper ──▶ <span style="color:#60A5FA;">true</span> (Boolean)<br/>
          ├── salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ <span style="color:#A78BFA;">null</span> (Null)<br/>
          └── skills &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──▶ <span style="color:#FBBF24;">["JavaScript", "Node.js"]</span> (Array)
        </div>
      `
    },

    // 10. Nested Objects
    {
      id: "section-10-nested-objects",
      title: "Nested Objects",
      tocTitle: "10. Nested Objects",
      contentHtml: `
        <p>Objects can contain other objects as property values, forming nested data structures:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  address: {
    city: "Chennai",
    country: "India"
  }
};

console.log(user.address.city); // "Chennai"</code></pre>

        <div style="background:var(--bg-body); padding:14px; border-radius:8px; border:1px dashed var(--border-accent); font-family:'Fira Code',monospace; font-size:0.85rem; margin-top:12px;">
          user ──▶ { name: "Nirmal", address: ──▶ { city: "Chennai", country: "India" } }
        </div>
      `
    },

    // 11. Objects and References
    {
      id: "section-11-references",
      title: "Objects and References — Crucial Concept",
      tocTitle: "11. References",
      contentHtml: `
        <p>This is the single most important concept distinguishing objects from primitives:</p>

        <pre class="code-block"><code>const user1 = {
  name: "Alice"
};

const user2 = user1;

user2.name = "Bob";

console.log(user1.name); // "Bob"!</code></pre>

        <div style="background:var(--bg-surface); padding:18px; border-radius:10px; border:1px solid var(--border-default); margin:14px 0; text-align:center; font-family:'Fira Code',monospace; font-size:0.88rem;">
          <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:8px;">HEAP MEMORY SHARED REFERENCE</div>
          user1 ──────────┐<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌─────────────┐<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ name: "Bob" │<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─────────────┘<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↑<br/>
          user2 ──────────┘
        </div>

        <div class="callout-box callout-box--important">
          <strong>💡 Reference Pointer Copying:</strong><br/>
          Assigning <code>user2 = user1</code> copies the <em>reference memory pointer</em>, NOT the object content itself. Both variables now point to the exact same heap memory location!
        </div>
      `
    },

    // 12. Object Assignment vs New Object
    {
      id: "section-12-assignment-vs-new",
      title: "Object Assignment vs New Object",
      tocTitle: "12. Same vs New Object",
      contentHtml: `
        <p>Compare assigning an existing reference vs creating a new object literal:</p>

        <div class="responsive-grid-2col" style="margin:14px 0;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#34D399; font-size:0.92rem;">Same Object Reference</strong>
            <pre class="code-block" style="margin:6px 0;"><code>const a = { value: 10 };
const b = a;
console.log(a === b); // true</code></pre>
          </div>

          <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default);">
            <strong style="color:#EF4444; font-size:0.92rem;">Different Object Literals</strong>
            <pre class="code-block" style="margin:6px 0;"><code>const a = { value: 10 };
const b = { value: 10 };
console.log(a === b); // false</code></pre>
          </div>
        </div>

        <p style="font-size:0.9rem; color:var(--text-secondary);">
          Even though <code>{ value: 10 }</code> and <code>{ value: 10 }</code> look identical, each object literal allocates a separate heap memory address.
        </p>
      `
    },

    // 13. Object Equality
    {
      id: "section-13-object-equality",
      title: "Object Equality — How === Compares Objects",
      tocTitle: "13. Object Equality",
      contentHtml: `
        <p>The strict equality operator (<code>===</code>) compares objects by checking whether they hold the <strong>exact same reference memory address pointer</strong>:</p>

        <pre class="code-block"><code>const a = { value: 10 };
const b = { value: 10 };

console.log(a === b); // false (Different heap addresses!)</code></pre>

        <pre class="code-block"><code>const a = { value: 10 };
const b = a;

console.log(a === b); // true (Identical reference address!)</code></pre>
      `
    },

    // 14. Objects vs Primitives
    {
      id: "section-14-objects-vs-primitives",
      title: "Objects vs Primitives — Core Comparison",
      tocTitle: "14. Objects vs Primitives",
      contentHtml: `
        <p>This side-by-side comparison connects <strong>Page 3 (Primitives)</strong> to <strong>Page 4 (Objects)</strong>:</p>

        <div class="concept-table-wrapper">
          <table class="concept-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Primitives (Number, String...)</th>
                <th>Objects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Value Immutability</strong></td>
                <td>Immutable (value cannot change in place)</td>
                <td>Mutable (properties can be changed/added/deleted)</td>
              </tr>
              <tr>
                <td><strong>Assignment Semantics</strong></td>
                <td>Copies by value (independent copy)</td>
                <td>Copies by reference (shared memory pointer)</td>
              </tr>
              <tr>
                <td><strong>Comparison (===)</strong></td>
                <td>Compares actual value & type</td>
                <td>Compares memory reference address</td>
              </tr>
              <tr>
                <td><strong>Example</strong></td>
                <td><code>let b = a; // independent</code></td>
                <td><code>const b = a; // shared pointer</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // 15. Objects in Real Applications
    {
      id: "section-15-real-applications",
      title: "Objects in Real Applications",
      tocTitle: "15. Real Applications",
      contentHtml: `
        <p>Real-world software applications, REST APIs, databases, and configuration files structure data into objects:</p>

        <pre class="code-block"><code>// E-commerce Product Model
const product = {
  id: 101,
  name: "Laptop",
  price: 65000,
  inStock: true
};

// Company Organization Model
const company = {
  name: "OneStep",
  employees: 50,
  location: {
    city: "Coimbatore",
    country: "India"
  }
};</code></pre>
      `
    },

    // 16. Objects and DSA
    {
      id: "section-16-objects-and-dsa",
      title: "Objects and DSA — Foundations for Advanced Data Structures",
      tocTitle: "16. Objects & DSA",
      contentHtml: `
        <p>Understanding object property references is the foundation for core Data Structures you will build later:</p>

        <ul style="line-height:1.7;">
          <li><strong>Linked Lists:</strong> Nodes containing data values and <code>next</code> pointer references.</li>
          <li><strong>Trees:</strong> Nodes containing values and <code>left</code> / <code>right</code> child pointers.</li>
          <li><strong>Graphs:</strong> Vertices and adjacency edge reference maps.</li>
          <li><strong>Hash Tables:</strong> Fast key-value property lookup tables.</li>
        </ul>

        <div style="background:var(--bg-surface); padding:14px; border-radius:8px; border:1px solid var(--border-default); text-align:center; font-family:'Fira Code',monospace; font-size:0.85rem; margin-top:12px;">
          Linked List Node Preview:<br/><br/>
          ┌───────────────────────┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───────────────────────┐<br/>
          │ value: 10 &nbsp;|&nbsp; next ──┼───▶ &nbsp;│ value: 20 &nbsp;|&nbsp; next ──┼───▶ ...<br/>
          └───────────────────────┘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└───────────────────────┘
        </div>
      `
    },

    // 17. Object Destructuring
    {
      id: "section-17-destructuring",
      title: "Object Destructuring",
      tocTitle: "17. Destructuring",
      contentHtml: `
        <p>Object destructuring allows unpacking property values cleanly into variables:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25
};

// ES6 Destructuring syntax
const { name, age } = user;

console.log(name); // "Nirmal"
console.log(age);  // 25</code></pre>
      `
    },

    // 18. Object Spread
    {
      id: "section-18-object-spread",
      title: "Object Spread ({ ...user })",
      tocTitle: "18. Object Spread",
      contentHtml: `
        <p>The spread operator (<code>...</code>) creates a new object copying top-level properties:</p>

        <pre class="code-block"><code>const user = {
  name: "Nirmal",
  age: 25
};

// Create a new object with updated age
const updatedUser = {
  ...user,
  age: 26
};

console.log(updatedUser); // { name: "Nirmal", age: 26 }
console.log(user.age);    // 25 (original remains untouched!)</code></pre>
      `
    },

    // 19. Optional Chaining
    {
      id: "section-19-optional-chaining",
      title: "Optional Chaining (?.)",
      tocTitle: "19. Optional Chaining",
      contentHtml: `
        <p>Optional chaining (<code>?.</code>) safely accesses deeply nested properties without throwing TypeError when an intermediate property is <code>null</code> or <code>undefined</code>:</p>

        <pre class="code-block"><code>const user = {};

// Without optional chaining: user.address.city throws TypeError!
// With optional chaining:
console.log(user.address?.city); // undefined (Safe, no crash!)</code></pre>
      `
    },

    // 20. Object Playground
    {
      id: "section-20-playground",
      title: "Interactive Object Playground",
      tocTitle: "20. Object Playground",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default); margin:14px 0;">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">Interactive Object State Visualizer</h4>

          <div id="obj-playground-card" style="background:var(--bg-body); padding:16px; border-radius:10px; border:1px dashed var(--accent-primary); font-family:'Fira Code',monospace; font-size:0.9rem; margin-bottom:16px;">
            <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:8px;">const user =</div>
            <div id="obj-playground-content" style="color:var(--text-primary); line-height:1.6;">
              {<br/>
              &nbsp;&nbsp;name: <span style="color:#F472B6;">"Alice"</span>,<br/>
              &nbsp;&nbsp;age: <span style="color:#34D399;">25</span><br/>
              }
            </div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button type="button" class="btn btn--secondary" onclick="window.updateObjPlayground('change')" style="font-size:0.82rem;">Change Property (user.name = "Bob")</button>
            <button type="button" class="btn btn--secondary" onclick="window.updateObjPlayground('add')" style="font-size:0.82rem;">Add Property (user.city = "Chennai")</button>
            <button type="button" class="btn btn--secondary" onclick="window.updateObjPlayground('delete')" style="font-size:0.82rem;">Delete Property (delete user.age)</button>
            <button type="button" class="btn btn--secondary" onclick="window.updateObjPlayground('copy')" style="font-size:0.82rem;">Copy Reference (const user2 = user)</button>
          </div>
        </div>
      `
    },

    // 21. Common Mistakes
    {
      id: "section-21-common-mistakes",
      title: "Common Beginner Mistakes",
      tocTitle: "21. Common Mistakes",
      contentHtml: `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="mistake-card">
            <div class="mistake-card__title">1. Thinking two objects with identical properties are the same object</div>
            <div class="mistake-card__desc"><code>{ a: 1 } === { a: 1 }</code> is <code>false</code>. Each object literal creates a distinct memory instance.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">2. Thinking const b = a creates a new object</div>
            <div class="mistake-card__desc"><code>const b = a</code> copies the reference memory pointer, not the object itself.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">3. Thinking const makes an object immutable</div>
            <div class="mistake-card__desc"><code>const</code> locks variable re-binding; it does not freeze property content inside the object.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">4. Confusing user.name with user["name"]</div>
            <div class="mistake-card__desc">Dot notation uses static property names; bracket notation evaluates variables dynamically.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">5. Forgetting that arrays are objects</div>
            <div class="mistake-card__desc">Arrays are specialized objects with integer index keys and special length mechanics.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">6. Saying JavaScript objects are simply "passed by reference"</div>
            <div class="mistake-card__desc">JavaScript is strictly pass-by-value. When an object is assigned, the value copied is a reference pointer.</div>
          </div>

          <div class="mistake-card">
            <div class="mistake-card__title">7. Thinking {} and {} are equal with ===</div>
            <div class="mistake-card__desc">Empty object literals allocate distinct heap addresses, so <code>{} === {}</code> evaluates to <code>false</code>.</div>
          </div>
        </div>
      `
    },

    // 22. Object Cheat Sheet
    {
      id: "section-22-cheat-sheet",
      title: "Object Cheat Sheet",
      tocTitle: "22. Cheat Sheet",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">OBJECT CHEAT SHEET</h4>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#60A5FA;">Access:</strong><br/>
              user.name<br/>
              user["name"]
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#34D399;">Change / Add:</strong><br/>
              user.name = "Bob"<br/>
              user.city = "Chennai"
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#EF4444;">Delete:</strong><br/>
              delete user.city
            </div>
            <div style="background:var(--bg-body); padding:12px; border-radius:8px; border:1px solid var(--border-default);">
              <strong style="color:#FBBF24;">Reference Copy:</strong><br/>
              const b = user
            </div>
          </div>
        </div>
      `
    },

    // 23. Summary
    {
      id: "section-23-summary",
      title: "Page Completion Summary",
      tocTitle: "23. Summary",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:20px; border-radius:12px; border:1px solid var(--border-default);">
          <h4 style="margin:0 0 12px 0; color:var(--text-primary);">OBJECTS SUMMARY</h4>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.92rem; line-height:1.6;">
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Objects group related data into key-value properties</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Dot notation accesses static keys; Bracket notation evaluates dynamic variables</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>const</code> prevents variable re-binding, NOT object property mutation</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Properties can be added (<code>obj.k = v</code>) and removed (<code>delete obj.k</code>)</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Assigning an object copies the reference pointer, sharing heap memory</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span><code>===</code> compares object reference pointers, not content equivalence</span></li>
            <li style="display:flex; gap:8px;"><span>✓</span> <span>Objects form the foundation for Linked Lists, Trees, Graphs, and Hash Tables</span></li>
          </ul>
        </div>
      `
    },

    // 24. Bridge to Page 5
    {
      id: "section-24-bridge-function-calls",
      title: "Bridge to Page 5 — Next: Function Calls",
      tocTitle: "24. Next: Function Calls",
      contentHtml: `
        <div style="background:var(--bg-surface); padding:24px; border-radius:12px; border:1px solid var(--border-default); text-align:center; margin-top:16px;">
          <h3 style="margin:0 0 12px 0; color:var(--text-primary); font-size:1.2rem;">Next Up: Function Calls</h3>
          
          <p style="color:var(--text-secondary); max-width:550px; margin:0 auto 16px auto; line-height:1.6; font-size:0.95rem;">
            Now that you understand variables, primitives, and objects, how do functions execute and manage parameters when invoked?
          </p>

          <div>
            <a href="#function-calls" class="lesson-cross-link btn btn--primary" data-topic="function-calls" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; font-weight:700; text-decoration:none; border-radius:8px;">
              Next: Function Calls →
            </a>
          </div>
        </div>
      `
    }
  ],

  practice: [
    {
      q: "1. What is user.name output?\nconst user = { name: 'Alice' }; user.name = 'Bob'; console.log(user.name);",
      a: "Result: 'Bob'. Property name was mutated inside the object from 'Alice' to 'Bob'."
    },
    {
      q: "2. What is a.value output?\nconst a = { value: 10 }; const b = a; b.value = 20; console.log(a.value);",
      a: "Result: 20. Variable b was assigned the reference pointer to object a. Both variables share the same heap object, so mutating b.value updates a.value."
    },
    {
      q: "3. What is { value: 10 } === { value: 10 } output?",
      a: "Result: false. Strict equality === compares object memory reference pointers. Each object literal { value: 10 } creates a distinct instance in heap memory with a unique address."
    }
  ],

  // 23-Question Dedicated Questions Suite for Questions Tab (Easy, Medium, Hard, Interview)
  questionSuite: [
    // Easy (Q1-Q6)
    {
      id: "q1",
      difficulty: "Easy",
      type: "mcq",
      question: "Q1. Object Identification: What is `user` in `const user = { name: 'Alice', age: 25 };`?",
      code: "const user = {\n  name: \"Alice\",\n  age: 25\n};",
      options: ["A. Number", "B. String", "C. Object", "D. Boolean"],
      answer: "C",
      explanation: "`user` is an Object containing multiple key-value property pairs."
    },
    {
      id: "q2",
      difficulty: "Easy",
      type: "mcq",
      question: "Q2. Property Access: How do you access \"Alice\" using dot notation?",
      code: "const user = {\n  name: \"Alice\"\n};",
      options: ["A. user.name", "B. user->name", "C. user::name", "D. user/name"],
      answer: "A",
      explanation: "Dot notation accesses property values using `object.propertyName`."
    },
    {
      id: "q3",
      difficulty: "Easy",
      type: "mcq",
      question: "Q3. Bracket Notation: Which syntax also accesses \"Alice\"?",
      code: "const user = {\n  name: \"Alice\"\n};",
      options: ["A. user[\"name\"]", "B. user(name)", "C. user{name}", "D. user->[\"name\"]"],
      answer: "A",
      explanation: "Bracket notation accesses property values using `object[\"propertyName\"]`."
    },
    {
      id: "q4",
      difficulty: "Easy",
      type: "predict-output",
      question: "Q4. Mutation: What is user.age after reassignment?",
      code: "const user = {\n  age: 20\n};\nuser.age = 25;",
      options: ["20", "25", "undefined", "TypeError"],
      answer: "25",
      explanation: "Reassigning `user.age = 25` mutates the property value inside the existing object."
    },
    {
      id: "q5",
      difficulty: "Easy",
      type: "predict-output",
      question: "Q5. Adding Property: How many properties does user now have?",
      code: "const user = {\n  name: \"Alice\"\n};\nuser.age = 25;",
      options: ["1", "2", "3", "0"],
      answer: "2",
      explanation: "`user.age = 25` adds a new `age` property to `user`, bringing the total count to 2 (`name` and `age`)."
    },
    {
      id: "q6",
      difficulty: "Easy",
      type: "predict-output",
      question: "Q6. Nested Property: What is user.address.city?",
      code: "const user = {\n  address: {\n    city: \"Chennai\"\n  }\n};",
      options: ["\"Chennai\"", "undefined", "null", "TypeError"],
      answer: "\"Chennai\"",
      explanation: "Chaining dot notation `user.address.city` traverses nested object properties to return 'Chennai'."
    },

    // Medium (Q7-Q13)
    {
      id: "q7",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q7. Shared Reference: What is console.log(a.score)?",
      code: "const a = {\n  score: 10\n};\nconst b = a;\nb.score = 50;\nconsole.log(a.score);",
      options: ["10", "50", "undefined", "TypeError"],
      answer: "50",
      explanation: "Variable `b` was assigned the reference pointer to object `a`. Both variables point to the exact same object in memory, so mutating `b.score` updates `a.score`."
    },
    {
      id: "q8",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q8. Object Equality: What is console.log(a === b)?",
      code: "const a = {\n  score: 10\n};\nconst b = {\n  score: 10\n};\nconsole.log(a === b);",
      options: ["false", "true", "undefined", "TypeError"],
      answer: "false",
      explanation: "Object literals `a` and `b` create two distinct object instances in heap memory. Strict equality `===` checks memory reference pointers, returning `false`."
    },
    {
      id: "q9",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q9. Dynamic Property Access: What is console.log(user[key])?",
      code: "const user = {\n  name: \"Alice\",\n  age: 25\n};\nconst key = \"name\";\nconsole.log(user[key]);",
      options: ["\"Alice\"", "undefined", "\"name\"", "TypeError"],
      answer: "\"Alice\"",
      explanation: "Bracket notation evaluates variable `key` to string 'name', retrieving `user.name` ('Alice')."
    },
    {
      id: "q10",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q10. Destructuring: What is console.log(name)?",
      code: "const user = {\n  name: \"Alice\",\n  age: 25\n};\nconst { name } = user;\nconsole.log(name);",
      options: ["\"Alice\"", "undefined", "{ name: \"Alice\" }", "TypeError"],
      answer: "\"Alice\"",
      explanation: "Object destructuring `const { name } = user` extracts the `name` property into local variable `name`."
    },
    {
      id: "q11",
      difficulty: "Medium",
      type: "predict-output",
      question: "Q11. Object Spread: What is console.log(updated.age)?",
      code: "const user = {\n  name: \"Alice\",\n  age: 25\n};\nconst updated = {\n  ...user,\n  age: 26\n};\nconsole.log(updated.age);",
      options: ["25", "26", "undefined", "TypeError"],
      answer: "26",
      explanation: "Spread `{ ...user, age: 26 }` creates a new object with user's top-level properties and overrides `age` to 26."
    },
    {
      id: "q12",
      difficulty: "Medium",
      type: "true-false",
      question: "Q12. Const Rule: Does `const` prevent changing an object's properties?",
      code: "const user = { age: 20 };\nuser.age = 25; // Allowed or Error?",
      options: ["A. Yes, const locks properties", "B. No, const locks only the variable binding"],
      answer: "B",
      explanation: "`const` prevents reassigning the variable pointer (`user = ...`), but does NOT prevent mutating properties inside the referenced object."
    },
    {
      id: "q13",
      difficulty: "Medium",
      type: "short-answer",
      question: "Q13. Dot vs Bracket: What is the key functional difference between user.name and user[\"name\"]?",
      code: "const key = \"name\";\nconsole.log(user.key);  // undefined\nconsole.log(user[key]); // \"Alice\"",
      options: [
        "A. Dot syntax evaluates variables, bracket syntax does not",
        "B. Dot syntax uses static key names; bracket syntax evaluates dynamic variables and special characters",
        "C. They are completely identical in all scenarios",
        "D. Bracket syntax works only with numbers"
      ],
      answer: "B",
      explanation: "Dot notation treats the word after the dot as a literal identifier name. Bracket notation evaluates the expression inside brackets, supporting variables and special characters."
    },

    // Hard (Q14-Q18)
    {
      id: "q14",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q14. Shared Nested Reference: What is console.log(user1.profile.name)?",
      code: "const user1 = {\n  profile: {\n    name: \"Alice\"\n  }\n};\nconst user2 = user1;\nuser2.profile.name = \"Bob\";\nconsole.log(user1.profile.name);",
      options: ["\"Alice\"", "\"Bob\"", "undefined", "TypeError"],
      answer: "\"Bob\"",
      explanation: "Both `user1` and `user2` reference the exact same outer object and inner nested `profile` object, so mutating `user2.profile.name` changes `user1.profile.name`."
    },
    {
      id: "q15",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q15. Empty Object Comparison: What is console.log(a === b)?",
      code: "const a = {};\nconst b = {};\nconsole.log(a === b);",
      options: ["true", "false", "undefined", "TypeError"],
      answer: "false",
      explanation: "Each empty object literal `{}` allocates a distinct instance in heap memory with a unique address pointer."
    },
    {
      id: "q16",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q16. Reference Pointer Assignment: What is console.log(a === b)?",
      code: "const a = {};\nconst b = a;\nconsole.log(a === b);",
      options: ["false", "true", "undefined", "TypeError"],
      answer: "true",
      explanation: "`const b = a` copies the reference pointer of object `a` into variable `b`. Both variables hold identical memory address pointers."
    },
    {
      id: "q17",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q17. Bracket Assignment: What is console.log(user.name)?",
      code: "const user = {\n  name: \"Alice\"\n};\nconst key = \"name\";\nuser[key] = \"Bob\";\nconsole.log(user.name);",
      options: ["\"Alice\"", "\"Bob\"", "undefined", "TypeError"],
      answer: "\"Bob\"",
      explanation: "`user[key]` evaluates `key` to string 'name', updating property `user.name` to 'Bob'."
    },
    {
      id: "q18",
      difficulty: "Hard",
      type: "predict-output",
      question: "Q18. Shallow Spread Independence: What is user.name after mutating copy.name?",
      code: "const user = {\n  name: \"Alice\",\n  age: 25\n};\nconst copy = {\n  ...user\n};\ncopy.name = \"Bob\";\nconsole.log(user.name);",
      options: ["\"Alice\"", "\"Bob\"", "undefined", "TypeError"],
      answer: "\"Alice\"",
      explanation: "Object spread `{ ...user }` performs a top-level shallow copy. Top-level primitive properties like `name` ('Alice') are copied independently."
    },

    // Interview (Q19-Q23)
    {
      id: "q19",
      difficulty: "Interview",
      type: "interview",
      question: "Q19. Interview Question: What is an Object in JavaScript?",
      options: [
        "A. A basic primitive number value",
        "B. A collection of key-value properties used to represent structured data",
        "C. A function call stack frame",
        "D. A database query"
      ],
      answer: "B",
      explanation: "An Object is a non-primitive data structure that groups related state and behavior into key-value properties."
    },
    {
      id: "q20",
      difficulty: "Interview",
      type: "interview",
      question: "Q20. Interview Question: What is the core difference between primitive assignment and object assignment?",
      options: [
        "A. Primitives copy references; Objects copy values",
        "B. Primitive values are copied independently; Object assignment copies the reference pointer, sharing heap memory",
        "C. There is no difference in JavaScript",
        "D. Objects cannot be assigned to variables"
      ],
      answer: "B",
      explanation: "Primitives copy by value into independent slots. Object assignment copies the reference memory pointer, so multiple variables point to the same shared heap object."
    },
    {
      id: "q21",
      difficulty: "Interview",
      type: "interview",
      question: "Q21. Interview Question: Why does `{}` === `{}` return false?",
      options: [
        "A. Empty objects are invalid in JavaScript",
        "B. `===` compares object reference pointers in memory, and each `{}` literal allocates a distinct object with a unique heap memory address",
        "C. `===` works only on numbers",
        "D. Empty objects convert to NaN"
      ],
      answer: "B",
      explanation: "Object equality checks whether two operands share the exact same memory address reference pointer. Two separate object literals represent distinct heap allocations."
    },
    {
      id: "q22",
      difficulty: "Interview",
      type: "interview",
      question: "Q22. Interview Question: Why can a `const` object still be mutated?",
      options: [
        "A. `const` is ignored by JavaScript engine",
        "B. `const` prevents reassigning the variable reference pointer (`user = ...`); it does NOT freeze or lock the contents inside the referenced object",
        "C. Objects ignore const rules automatically",
        "D. `const` works only for strings"
      ],
      answer: "B",
      explanation: "`const` binds the variable identifier to its reference address. Reassigning `user = newObj` throws a TypeError, but modifying `user.name = 'Bob'` mutates object properties without altering the variable binding reference address."
    },
    {
      id: "q23",
      difficulty: "Interview",
      type: "interview",
      question: "Q23. Interview Question: Is JavaScript pass-by-reference?",
      options: [
        "A. Yes, JavaScript passes everything by reference",
        "B. No, JavaScript is strictly pass-by-value. For objects, the value being passed or assigned is the reference pointer itself (call-by-sharing)",
        "C. No, JavaScript uses pass-by-name",
        "D. It depends on browser vendor"
      ],
      answer: "B",
      explanation: "JavaScript evaluates all arguments by value. When passing an object, the value copied into the parameter variable is the memory reference pointer itself."
    }
  ]
};
