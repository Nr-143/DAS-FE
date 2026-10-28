/**
 * OneStep Journey — Lesson Content: Level 4 Hashing
 * ──────────────────────────────────────────────────
 * Topic 25: Hash Table / Hash Map (hash-table)
 * Topic 26: Hash Set & Collision Handling (hash-set)
 *
 * Fully implemented with:
 * - Comprehensive educational theory & beginner-friendly explanations
 * - Interactive step-by-step traces (Frequency Counting, Two Sum, Contains Duplicate)
 * - Interactive live playgrounds (Map & Set sandboxes with live state)
 * - Interactive Collision Visualizer (Separate Chaining vs Linear Probing on num % 5)
 * - Complete method references including modern ES2024 Set methods with polyfill fallbacks
 * - Complexity analysis & 5-way comparison matrix
 * - Categorized Question Suites, Mini Quizzes, Predict the Output, and LeetCode Practice
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

/* ==========================================================================
   TOPIC 25: HASH TABLE / HASH MAP
   ========================================================================== */
window.LESSONS_CONTENT["hash-table"] = {
  id: "hash-table",
  title: "Hash Table / Hash Map",
  levelTitle: "Level 4 — Hashing",
  summary: "Master key-value mapping, deterministic hash functions, collision fundamentals, and O(1) average-time lookups using JavaScript Map.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS HASHING?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-hashing",
      title: "1. What is Hashing & Why Do We Need It?",
      tocTitle: "1. What is Hashing?",
      contentHtml: `
        <p>In computer programming, searching for data quickly is one of the most fundamental problems. Imagine you have a list of one million students and you want to look up the test score of a student named <strong>"Nirmal"</strong>.</p>
        
        <div style="background:var(--bg-surface); padding:18px 20px; border-radius:12px; border:1px solid var(--border-default); margin:16px 0;">
          <h4 style="margin:0 0 10px 0; color:var(--text-primary); font-size:1.02rem;">The Array Search Problem: O(n)</h4>
          <p style="margin:0 0 10px 0; color:var(--text-secondary); line-height:1.6;">
            In a regular unsorted array, the computer does not know where "Nirmal" is stored. It has to start at index <code>0</code> and inspect every student card one by one:
          </p>
          <div style="font-family:'Fira Code',monospace; font-size:0.86rem; background:var(--bg-body); padding:12px 16px; border-radius:8px; border:1px solid var(--border-default); line-height:1.6;">
            Index 0: "Arun" ✗ → Index 1: "Bala" ✗ → ... → Index 999,999: "Nirmal" ✓ (Took 1,000,000 checks!)
          </div>
          <p style="margin:10px 0 0 0; color:var(--text-secondary); font-size:0.9rem;">
            Even if the array is sorted, Binary Search still takes <strong>O(log n)</strong> time (about 20 comparisons for 1,000,000 items) and requires maintaining a strict sorted order.
          </p>
        </div>

        <div style="background:var(--accent-gradient-subtle); padding:18px 20px; border-radius:12px; border:1px solid var(--border-accent); margin:18px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--accent-primary); font-size:1.05rem;">The Hashing Solution: O(1) Instant Lookup</h4>
          <p style="margin:0; color:var(--text-primary); line-height:1.65;">
            What if we didn't search at all? What if the student's name itself could tell us the <strong>exact array index</strong> where their score is stored? That is exactly what <strong>hashing</strong> does! On average, looking up a key takes a single step: <strong>O(1) constant time</strong>.
          </p>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.1rem; color:var(--text-primary);">Core Terminology Breakdown</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; margin-bottom:20px;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px;">🔑 Key</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5;">The unique identifier used to look up data (e.g. <code>"Arun"</code>, student ID, or username).</div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#10B981; margin-bottom:6px;">📦 Value</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5;">The actual data payload associated with that key (e.g. score <code>75</code>, user profile object).</div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#F59E0B; margin-bottom:6px;">⚙️ Hash Function</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5;">A deterministic mathematical function that converts an arbitrary key into a fixed integer index within bounds.</div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#6366F1; margin-bottom:6px;">🗄️ Bucket / Storage Slot</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5;">An individual storage slot at an index in the internal array where the key-value pair is stored.</div>
          </div>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.1rem; color:var(--text-primary);">Concrete Example: Student Marks System</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Suppose we want to store test scores for three students: <strong>Arun: 75</strong>, <strong>Bala: 82</strong>, and <strong>Nirmal: 90</strong> into an internal table with 5 buckets (indices 0 to 4).
        </p>

        <!-- Visual Flow Diagram -->
        <div class="hash-widget-card" style="margin:16px 0;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:14px; font-size:0.95rem;">
            Figure 1: How Keys Map to Array Buckets via a Hash Function
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            
            <!-- Row 1: Arun -->
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:var(--bg-body); padding:10px 14px; border-radius:8px;">
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:var(--text-primary); min-width:80px;">"Arun"</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:rgba(108,99,255,0.12); color:var(--accent-primary); padding:4px 8px; border-radius:6px;">hash("Arun") % 5</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:#6C63FF; min-width:65px;">Index [1]</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:var(--bg-surface); border:1px solid var(--border-default); padding:4px 10px; border-radius:6px; color:#10B981; font-weight:600;">
                Bucket 1: ["Arun", 75]
              </span>
            </div>

            <!-- Row 2: Bala -->
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:var(--bg-body); padding:10px 14px; border-radius:8px;">
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:var(--text-primary); min-width:80px;">"Bala"</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:rgba(108,99,255,0.12); color:var(--accent-primary); padding:4px 8px; border-radius:6px;">hash("Bala") % 5</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:#6C63FF; min-width:65px;">Index [3]</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:var(--bg-surface); border:1px solid var(--border-default); padding:4px 10px; border-radius:6px; color:#10B981; font-weight:600;">
                Bucket 3: ["Bala", 82]
              </span>
            </div>

            <!-- Row 3: Nirmal -->
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:var(--bg-body); padding:10px 14px; border-radius:8px;">
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:var(--text-primary); min-width:80px;">"Nirmal"</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:rgba(108,99,255,0.12); color:var(--accent-primary); padding:4px 8px; border-radius:6px;">hash("Nirmal") % 5</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-weight:700; color:#6C63FF; min-width:65px;">Index [4]</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="font-family:'Fira Code',monospace; font-size:0.85rem; background:var(--bg-surface); border:1px solid var(--border-default); padding:4px 10px; border-radius:6px; color:#10B981; font-weight:600;">
                Bucket 4: ["Nirmal", 90]
              </span>
            </div>

          </div>
        </div>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin-top:16px;">
          <h4 style="margin:0 0 8px 0; color:var(--text-primary); font-size:0.95rem;">⚠️ The O(1) Average vs O(n) Worst-Case Caveat</h4>
          <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">
            While Hash Maps are universally praised for <strong>O(1) average lookup</strong>, you must know that <strong>O(1) is NOT guaranteed in all mathematical cases</strong>. If two or more keys hash to the exact same bucket (a <em>collision</em>), or if a malicious attacker supplies keys engineered to collide, multiple items accumulate in the same slot. In the worst case where all $n$ items land in one bucket, search time degrades to <strong>O(n)</strong>. Modern languages prevent this using high-quality randomized hash functions and automatic resizing.
          </p>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: JAVASCRIPT MAP — COMPLETE GUIDE
       ------------------------------------------------------------------------ */
    {
      id: "section-javascript-map",
      title: "2. JavaScript Map: Complete API & Mechanics",
      tocTitle: "2. JavaScript Map API",
      contentHtml: `
        <p>In modern JavaScript (ES6+), the native <code>Map</code> object is the official, high-performance implementation of a Hash Map. Every DSA engineer must master its exact syntax, quirks, and methods.</p>

        <h3 style="margin:20px 0 10px 0; font-size:1.05rem; color:var(--text-primary);">All 14 Map Methods & Properties</h3>
        
        <div style="overflow-x:auto;">
          <table class="hash-state-table" style="margin-bottom:20px;">
            <thead>
              <tr>
                <th>Method / Property</th>
                <th>Description</th>
                <th>Time Complexity</th>
                <th>Return Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>new Map()</code></td>
                <td>Creates a brand new, empty Map.</td>
                <td>O(1)</td>
                <td>New <code>Map</code> instance</td>
              </tr>
              <tr>
                <td><code>new Map(iterable)</code></td>
                <td>Initializes map with entries: <code>new Map([['a', 1], ['b', 2]])</code>.</td>
                <td>O(k)</td>
                <td>Populated <code>Map</code> instance</td>
              </tr>
              <tr>
                <td><code>map.set(key, value)</code></td>
                <td>Adds or updates a key-value pair. Returns the map so calls can be chained!</td>
                <td>O(1) avg</td>
                <td>The <code>Map</code> itself (chainable)</td>
              </tr>
              <tr>
                <td><code>map.get(key)</code></td>
                <td>Retrieves the value for <code>key</code>, or <code>undefined</code> if absent.</td>
                <td>O(1) avg</td>
                <td>Value or <code>undefined</code></td>
              </tr>
              <tr>
                <td><code>map.has(key)</code></td>
                <td>Returns a boolean indicating whether the key exists in the map.</td>
                <td>O(1) avg</td>
                <td><code>true</code> | <code>false</code></td>
              </tr>
              <tr>
                <td><code>map.delete(key)</code></td>
                <td>Removes the key-value pair. Returns <code>true</code> if existed and deleted.</td>
                <td>O(1) avg</td>
                <td><code>true</code> | <code>false</code></td>
              </tr>
              <tr>
                <td><code>map.clear()</code></td>
                <td>Removes all entries from the Map.</td>
                <td>O(n)</td>
                <td><code>undefined</code></td>
              </tr>
              <tr>
                <td><code>map.size</code></td>
                <td><strong>PROPERTY, NOT A METHOD!</strong> Returns current count of entries.</td>
                <td>O(1)</td>
                <td>Non-negative integer</td>
              </tr>
              <tr>
                <td><code>map.keys()</code></td>
                <td>Returns an Iterator containing all keys in insertion order.</td>
                <td>O(1)</td>
                <td>MapIterator of keys</td>
              </tr>
              <tr>
                <td><code>map.values()</code></td>
                <td>Returns an Iterator containing all values in insertion order.</td>
                <td>O(1)</td>
                <td>MapIterator of values</td>
              </tr>
              <tr>
                <td><code>map.entries()</code></td>
                <td>Returns an Iterator of <code>[key, value]</code> pairs.</td>
                <td>O(1)</td>
                <td>MapIterator of [k, v]</td>
              </tr>
              <tr>
                <td><code>map.forEach((val, key) =>)</code></td>
                <td>Executes callback for each pair. <strong>Notice: value is 1st argument, key is 2nd!</strong></td>
                <td>O(n)</td>
                <td><code>undefined</code></td>
              </tr>
              <tr>
                <td><code>for (const [k, v] of map)</code></td>
                <td>Direct iteration with ES6 destructuring in guaranteed insertion order.</td>
                <td>O(n)</td>
                <td>Yields <code>[key, value]</code></td>
              </tr>
              <tr>
                <td>Method Chaining</td>
                <td><code>map.set('a', 1).set('b', 2).set('c', 3);</code></td>
                <td>O(1) per set</td>
                <td>Fluent API</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Critical Map Behaviors Every Engineer Must Know</h3>
        
        <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:20px;">
          
          <!-- Behavior 1: Key Uniqueness -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--text-primary); margin-bottom:6px;">1. Key Uniqueness & Overwriting</div>
            <p style="margin:0 0 8px 0; color:var(--text-secondary); font-size:0.9rem;">
              Keys in a Map are strictly unique. Calling <code>map.set(key, newVal)</code> on an already existing key will <strong>overwrite</strong> the old value without changing <code>map.size</code>:
            </p>
            <pre class="code-block"><code>const map = new Map();
map.set('score', 80);
map.set('score', 95); // Overwrites 80 with 95
console.log(map.get('score')); // 95
console.log(map.size);         // 1 (not 2!)</code></pre>
          </div>

          <!-- Behavior 2: Object Reference Identity -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--text-primary); margin-bottom:6px;">2. Objects as Keys (Reference Identity)</div>
            <p style="margin:0 0 8px 0; color:var(--text-secondary); font-size:0.9rem;">
              Unlike plain JavaScript objects which only allow strings and symbols as keys, a <code>Map</code> allows <strong>any value</strong> to be a key — including objects, arrays, and functions! But remember: objects are compared by <em>reference identity</em> in memory, not structural equality:
            </p>
            <pre class="code-block"><code>const map = new Map();
map.set({ id: 1 }, "User 1");
console.log(map.get({ id: 1 })); // undefined! (Different object reference in memory)

// To retrieve it, use the exact same variable reference:
const userObj = { id: 1 };
map.set(userObj, "User 1");
console.log(map.get(userObj)); // "User 1" ✓</code></pre>
          </div>

          <!-- Behavior 3: NaN Equality -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--text-primary); margin-bottom:6px;">3. The NaN Equality Exception</div>
            <p style="margin:0 0 8px 0; color:var(--text-secondary); font-size:0.9rem;">
              In standard JavaScript, <code>NaN === NaN</code> is famously <code>false</code>. However, Map uses the ECMAScript <em>SameValueZero</em> algorithm, meaning <strong><code>NaN</code> is considered equal to <code>NaN</code></strong>:
            </p>
            <pre class="code-block"><code>const map = new Map();
map.set(NaN, "Not a number value");
console.log(map.get(NaN)); // "Not a number value" ✓
console.log(map.has(NaN)); // true ✓</code></pre>
          </div>

        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Map vs Plain JavaScript Object: When to Use Which?</h3>
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>JavaScript <code>Map</code></th>
                <th>Plain Object <code>{}</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Key Types</strong></td>
                <td>Any type (Objects, Functions, Primitives, NaN)</td>
                <td>Strings and Symbols only</td>
              </tr>
              <tr>
                <td><strong>Size Calculation</strong></td>
                <td><code>map.size</code> in <strong>O(1)</strong> time</td>
                <td><code>Object.keys(obj).length</code> in <strong>O(n)</strong> time</td>
              </tr>
              <tr>
                <td><strong>Iteration Order</strong></td>
                <td>Strict, guaranteed <strong>insertion order</strong></td>
                <td>Complex rules (integer keys first, then insertion)</td>
              </tr>
              <tr>
                <td><strong>Performance</strong></td>
                <td>Optimized for frequent additions & removals</td>
                <td>Optimized for fixed-shape records & lookups</td>
              </tr>
              <tr>
                <td><strong>Prototype Safety</strong></td>
                <td>Clean: Contains no default keys or prototypes</td>
                <td>Inherits <code>toString</code>, <code>valueOf</code>, vulnerable to prototype pollution</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: PRACTICAL EXAMPLE — FREQUENCY COUNTING
       ------------------------------------------------------------------------ */
    {
      id: "section-frequency-counter",
      title: "3. Practical Map Example: Frequency Counting",
      tocTitle: "3. Frequency Counter",
      contentHtml: `
        <p>Frequency counting is the single most common Map pattern in coding interviews (used in anagrams, top-K frequent elements, and data deduplication). Let's see how it works on array <code>[1, 2, 2, 3, 1, 2]</code>.</p>

        <pre class="code-block"><code>function countFrequencies(arr) {
  const freqMap = new Map();
  for (const num of arr) {
    const currentCount = freqMap.get(num) || 0;
    freqMap.set(num, currentCount + 1);
  }
  return freqMap;
}</code></pre>

        <!-- Interactive Step-by-Step Trace Widget -->
        <div class="hash-widget-card" id="trace-freq-container">
          <div class="hash-widget-header">
            <h4 class="hash-widget-title">
              <span>📊 Step-by-Step Interactive Trace: Frequency Counter</span>
            </h4>
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn" id="btn-freq-reset" title="Reset to start">⏮ Reset</button>
              <button class="hash-ctrl-btn" id="btn-freq-prev" title="Step backward">◀ Step Back</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-freq-play" title="Play animation">▶ Play</button>
              <button class="hash-ctrl-btn" id="btn-freq-next" title="Step forward">Step Forward ▶</button>
            </div>
          </div>

          <!-- Input Array Chips -->
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">Input Array: <code>[1, 2, 2, 3, 1, 2]</code></div>
          <div class="hash-chips-strip" id="freq-chips-strip"></div>

          <!-- Narration Box -->
          <div class="hash-narration-box" id="freq-narration">
            Click <strong>Step Forward ▶</strong> to begin tracing how the Map records occurrences step-by-step.
          </div>

          <!-- Live Map Table Display -->
          <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem; margin-top:12px;">
            Current Map State (<span id="freq-map-size">size: 0</span>):
          </div>
          <div style="overflow-x:auto;">
            <table class="hash-state-table" id="freq-state-table">
              <thead>
                <tr>
                  <th>Key (Number)</th>
                  <th>Value (Count)</th>
                  <th>Last Action</th>
                </tr>
              </thead>
              <tbody id="freq-table-body">
                <tr><td colspan="3" class="hash-empty-slot">Map is currently empty</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: LEETCODE 1 — TWO SUM
       ------------------------------------------------------------------------ */
    {
      id: "section-two-sum",
      title: "4. LeetCode 1: Two Sum (Optimal Hash Map Approach)",
      tocTitle: "4. LeetCode: Two Sum",
      contentHtml: `
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <p style="margin:0; color:var(--text-secondary); line-height:1.6;">
            <strong>Problem:</strong> Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
          </p>
          <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noopener noreferrer" class="btn btn--secondary" style="display:inline-flex; align-items:center; gap:6px; font-size:0.82rem; padding:6px 12px; text-decoration:none;">
            <span>Solve on LeetCode #1</span> ↗
          </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:6px;">Brute-Force: O(n²) Time</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              Use two nested loops to check every pair <code>(i, j)</code>. If <code>nums[i] + nums[j] === target</code>, return <code>[i, j]</code>. For 10,000 numbers, this requires ~100,000,000 operations!
            </p>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#10B981; margin-bottom:6px;">One-Pass Hash Map: O(n) Time</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              As we walk the array, calculate <code>complement = target - nums[i]</code>. If the complement is already in the Map, we found our answer! Otherwise, save <code>map.set(nums[i], i)</code> and keep going.
            </p>
          </div>
        </div>

        <pre class="code-block"><code>function twoSum(nums, target) {
  // Map stores: Number -> Its Index in the array
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    // Check if the complement was already seen
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    // Otherwise record current number and its index
    seen.set(current, i);
  }

  return [];
}</code></pre>

        <!-- Interactive Two Sum Stepper Widget -->
        <div class="hash-widget-card" id="trace-twosum-container">
          <div class="hash-widget-header">
            <h4 class="hash-widget-title">
              <span>🎯 Interactive Two Sum Trace (Target = 9)</span>
            </h4>
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn" id="btn-twosum-reset">⏮ Reset</button>
              <button class="hash-ctrl-btn" id="btn-twosum-prev">◀ Step Back</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-twosum-play">▶ Play</button>
              <button class="hash-ctrl-btn" id="btn-twosum-next">Step Forward ▶</button>
              <button class="hash-ctrl-btn" id="btn-twosum-toggle-dup" style="font-size:0.8rem;">Switch to Duplicates ([3,3], T=6)</button>
            </div>
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">
            Array: <code id="twosum-array-label">[2, 7, 11, 15]</code> | Target: <strong style="color:var(--accent-primary);" id="twosum-target-label">9</strong>
          </div>
          <div class="hash-chips-strip" id="twosum-chips-strip"></div>

          <div class="hash-narration-box" id="twosum-narration">
            Click <strong>Step Forward ▶</strong> to inspect how the hash map computes the complement and finds the matching indices instantly.
          </div>

          <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem; margin-top:12px;">
            Map Contents (Number → Index):
          </div>
          <div style="overflow-x:auto;">
            <table class="hash-state-table" id="twosum-state-table">
              <thead>
                <tr>
                  <th>Key (Number)</th>
                  <th>Value (Index)</th>
                  <th>Target - Key</th>
                </tr>
              </thead>
              <tbody id="twosum-table-body">
                <tr><td colspan="3" class="hash-empty-slot">Map is empty</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: INTERACTIVE MAP PLAYGROUND
       ------------------------------------------------------------------------ */
    {
      id: "section-map-playground",
      title: "5. Interactive Map Playground Sandbox",
      tocTitle: "5. Map Playground",
      contentHtml: `
        <p>Experiment with real Map operations live in your browser. Add items, inspect object keys, query keys, and inspect internal return values in real-time.</p>

        <div class="hash-widget-card" id="map-playground-container">
          <div class="hash-playground-form">
            <input type="text" id="pg-map-key" class="hash-input-field" placeholder="Key (e.g. Nirmal, or {id:1})" value="Nirmal" />
            <input type="text" id="pg-map-val" class="hash-input-field" placeholder="Value (e.g. 95)" value="95" />
            <select id="pg-map-type" class="hash-input-field" style="flex:0 0 120px;">
              <option value="string">String Key</option>
              <option value="number">Number Key</option>
              <option value="object">Object Key {}</option>
              <option value="nan">NaN Key</option>
            </select>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-pg-set">set(k, v)</button>
            <button class="hash-ctrl-btn" id="btn-pg-get">get(k)</button>
            <button class="hash-ctrl-btn" id="btn-pg-has">has(k)</button>
            <button class="hash-ctrl-btn" id="btn-pg-delete">delete(k)</button>
            <button class="hash-ctrl-btn" id="btn-pg-clear" style="color:#EF4444;">clear()</button>
            <button class="hash-ctrl-btn" id="btn-pg-reset-sample" style="margin-left:auto;">Reset Sample Data</button>
          </div>

          <!-- Live Entries Table -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin:16px 0 8px 0;">
            <span style="font-weight:700; color:var(--text-primary); font-size:0.92rem;">Map Entries</span>
            <span class="badge" style="background:rgba(108,99,255,0.15); color:var(--accent-primary); font-weight:700; padding:4px 12px; border-radius:12px;" id="pg-map-size-badge">
              map.size = 3
            </span>
          </div>

          <div style="overflow-x:auto;">
            <table class="hash-state-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Key</th>
                  <th>Key Type</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="pg-map-tbody"></tbody>
            </table>
          </div>

          <!-- Console Activity Log -->
          <div style="font-weight:700; color:var(--text-primary); font-size:0.88rem; margin-top:14px;">Operation Log:</div>
          <div class="hash-log-terminal" id="pg-map-log">
            <div class="hash-log-entry hash-log-entry--info">[System] Map initialized with 3 student records: Arun, Bala, Nirmal.</div>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 6: COMPLEXITY ANALYSIS & COMMON PITFALLS
       ------------------------------------------------------------------------ */
    {
      id: "section-complexity-notes",
      title: "6. Complexity Analysis & Common Mistakes",
      tocTitle: "6. Complexity & Pitfalls",
      contentHtml: `
        <h3 style="margin:0 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Time & Space Complexity Summary</h3>
        <div style="overflow-x:auto;">
          <table class="hash-state-table" style="margin-bottom:20px;">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Average Case</th>
                <th>Worst Case</th>
                <th>Reason for Worst Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Get / Lookup</strong></td>
                <td>O(1)</td>
                <td>O(n)</td>
                <td>All keys produce identical hash codes (hash collision cluster)</td>
              </tr>
              <tr>
                <td><strong>Set / Insert</strong></td>
                <td>O(1)</td>
                <td>O(n)</td>
                <td>Collision chain traversal or table resize/rehash</td>
              </tr>
              <tr>
                <td><strong>Delete / Remove</strong></td>
                <td>O(1)</td>
                <td>O(n)</td>
                <td>Searching through colliding chain to unlink node</td>
              </tr>
              <tr>
                <td><strong>Auxiliary Space</strong></td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>Proportional to number of unique key-value pairs stored</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin:20px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Top 4 Traps & Common Mistakes</h3>
        
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 1: Calling <code>map.size()</code> with parentheses</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              In JavaScript, <code>.size</code> is a <strong>read-only property</strong>, not a function! Calling <code>map.size()</code> throws a <code>TypeError: map.size is not a function</code>. Always write <code>map.size</code>.
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 2: Confusing parameter order in <code>map.forEach((val, key) =>)</code></div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              JavaScript follows the array convention where the item is first and index/key is second: <code>map.forEach((value, key) => { ... })</code>. Writing <code>(key, value)</code> will quietly swap them!
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 3: Using Object literals as keys without saving references</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              Writing <code>map.set({ id: 1 }, "Admin"); map.has({ id: 1 });</code> returns <code>false</code> because each <code>{ id: 1 }</code> literal creates a new object at a distinct memory address.
            </p>
          </div>

          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#EF4444; margin-bottom:4px;">Trap 4: Using <code>map[key] = value</code> instead of <code>map.set(key, value)</code></div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem; line-height:1.5;">
              Using square bracket syntax attaches a standard property to the JS object wrapper, completely bypassing the Map's internal hash table. <code>map.size</code> will not increment and <code>map.get(key)</code> will return <code>undefined</code>!
            </p>
          </div>
        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: BIND INTERACTIVE WIDGETS
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    /* 1. FREQUENCY COUNTER STEPPER */
    (function initFreqStepper() {
      const arr = [1, 2, 2, 3, 1, 2];
      let step = 0;
      let timer = null;

      const chipsStrip = container.querySelector('#freq-chips-strip');
      const narration = container.querySelector('#freq-narration');
      const tbody = container.querySelector('#freq-table-body');
      const sizeEl = container.querySelector('#freq-map-size');
      const btnReset = container.querySelector('#btn-freq-reset');
      const btnPrev = container.querySelector('#btn-freq-prev');
      const btnPlay = container.querySelector('#btn-freq-play');
      const btnNext = container.querySelector('#btn-freq-next');

      if (!chipsStrip) return;

      function renderChips() {
        chipsStrip.innerHTML = arr.map((val, idx) => {
          let cls = 'hash-chip-val';
          if (step > 0 && idx === step - 1) cls += ' hash-chip-val--active';
          else if (step > 0 && idx < step - 1) cls += ' hash-chip-val--visited';
          return `
            <div class="hash-chip-item">
              <div class="${cls}">${val}</div>
              <div class="hash-chip-idx">[${idx}]</div>
            </div>
          `;
        }).join('');
      }

      function updateState() {
        renderChips();

        if (step === 0) {
          narration.innerHTML = `Click <strong>Step Forward ▶</strong> to begin tracing how the Map records occurrences step-by-step.`;
          tbody.innerHTML = `<tr><td colspan="3" class="hash-empty-slot">Map is currently empty</td></tr>`;
          if (sizeEl) sizeEl.textContent = 'size: 0';
          if (btnPrev) btnPrev.disabled = true;
          if (btnNext) btnNext.disabled = false;
          return;
        }

        if (btnPrev) btnPrev.disabled = false;
        if (btnNext) btnNext.disabled = step >= arr.length;

        // Compute map state up to current step
        const currentMap = new Map();
        for (let i = 0; i < step; i++) {
          const num = arr[i];
          currentMap.set(num, (currentMap.get(num) || 0) + 1);
        }

        const activeNum = arr[step - 1];
        const prevCount = currentMap.get(activeNum) - 1;
        const newCount = currentMap.get(activeNum);

        narration.innerHTML = `
          <strong>Step ${step} of ${arr.length}:</strong> Processing index <code>[${step - 1}]</code> with element <strong>${activeNum}</strong>.<br/>
          ${prevCount > 0
            ? `Key <code>${activeNum}</code> already exists with count <code>${prevCount}</code>. Incrementing: <code>freqMap.set(${activeNum}, ${newCount})</code>.`
            : `Key <code>${activeNum}</code> is new. Initializing: <code>freqMap.set(${activeNum}, 1)</code>.`}
        `;

        if (sizeEl) sizeEl.textContent = `size: ${currentMap.size}`;

        let rowsHtml = '';
        currentMap.forEach((cnt, k) => {
          const isLatest = k === activeNum;
          rowsHtml += `
            <tr class="${isLatest ? 'highlight-row' : ''}">
              <td><code>${k}</code></td>
              <td><strong style="color:var(--accent-primary);">${cnt}</strong></td>
              <td>${isLatest ? `<span style="color:#10B981;font-weight:700;">Updated to ${cnt} ✓</span>` : `<span style="color:var(--text-muted);">Unchanged</span>`}</td>
            </tr>
          `;
        });
        tbody.innerHTML = rowsHtml;

        if (step >= arr.length) {
          narration.innerHTML += `<br/><span style="color:#10B981; font-weight:700;">✓ Completed! Final frequency map: { 1 => 2, 2 => 3, 3 => 1 }</span>`;
          if (timer) {
            clearInterval(timer);
            timer = null;
            if (btnPlay) btnPlay.textContent = '▶ Play';
          }
        }
      }

      if (btnNext) btnNext.addEventListener('click', () => {
        if (step < arr.length) { step++; updateState(); }
      });
      if (btnPrev) btnPrev.addEventListener('click', () => {
        if (step > 0) { step--; updateState(); }
      });
      if (btnReset) btnReset.addEventListener('click', () => {
        step = 0;
        if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        updateState();
      });
      if (btnPlay) btnPlay.addEventListener('click', () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
          btnPlay.textContent = '▶ Play';
        } else {
          if (step >= arr.length) step = 0;
          btnPlay.textContent = '⏸ Pause';
          timer = setInterval(() => {
            if (step < arr.length) {
              step++;
              updateState();
            } else {
              clearInterval(timer);
              timer = null;
              btnPlay.textContent = '▶ Play';
            }
          }, 900);
        }
      });

      updateState();
    })();

    /* 2. TWO SUM STEPPER */
    (function initTwoSumStepper() {
      let nums = [2, 7, 11, 15];
      let target = 9;
      let step = 0;
      let timer = null;
      let isDupMode = false;

      const chipsStrip = container.querySelector('#twosum-chips-strip');
      const narration = container.querySelector('#twosum-narration');
      const tbody = container.querySelector('#twosum-table-body');
      const btnReset = container.querySelector('#btn-twosum-reset');
      const btnPrev = container.querySelector('#btn-twosum-prev');
      const btnPlay = container.querySelector('#btn-twosum-play');
      const btnNext = container.querySelector('#btn-twosum-next');
      const btnToggleDup = container.querySelector('#btn-twosum-toggle-dup');
      const arrayLabel = container.querySelector('#twosum-array-label');
      const targetLabel = container.querySelector('#twosum-target-label');

      if (!chipsStrip) return;

      function renderChips() {
        chipsStrip.innerHTML = nums.map((val, idx) => {
          let cls = 'hash-chip-val';
          if (step > 0 && idx === step - 1) cls += ' hash-chip-val--active';
          else if (step > 0 && idx < step - 1) cls += ' hash-chip-val--visited';
          return `
            <div class="hash-chip-item">
              <div class="${cls}">${val}</div>
              <div class="hash-chip-idx">[${idx}]</div>
            </div>
          `;
        }).join('');
      }

      function updateState() {
        renderChips();

        if (step === 0) {
          narration.innerHTML = `Click <strong>Step Forward ▶</strong> to start checking complements for target = <strong>${target}</strong>.`;
          tbody.innerHTML = `<tr><td colspan="3" class="hash-empty-slot">Map is empty</td></tr>`;
          if (btnPrev) btnPrev.disabled = true;
          if (btnNext) btnNext.disabled = false;
          return;
        }

        if (btnPrev) btnPrev.disabled = false;

        const currentMap = new Map();
        let matchFound = false;
        let matchPair = null;

        for (let i = 0; i < step; i++) {
          const val = nums[i];
          const complement = target - val;
          if (currentMap.has(complement)) {
            matchFound = true;
            matchPair = [currentMap.get(complement), i];
            break;
          }
          currentMap.set(val, i);
        }

        const activeIdx = step - 1;
        const activeVal = nums[activeIdx];
        const complement = target - activeVal;

        if (matchFound) {
          narration.innerHTML = `
            <span style="color:#10B981; font-weight:700;">🎉 SOLUTION FOUND!</span><br/>
            At index <code>[${activeIdx}]</code>, current value is <strong>${activeVal}</strong>.<br/>
            <code>complement = ${target} - ${activeVal} = ${complement}</code>.<br/>
            <code>map.has(${complement})</code> is <strong>TRUE</strong>! Stored index is <code>${matchPair[0]}</code>.<br/>
            <strong>Return Indices: [${matchPair[0]}, ${matchPair[1]}]</strong> (Values: ${nums[matchPair[0]]} + ${nums[matchPair[1]]} = ${target}).
          `;
          if (btnNext) btnNext.disabled = true;
          if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        } else {
          narration.innerHTML = `
            <strong>Step ${step}:</strong> Inspecting index <code>[${activeIdx}]</code> (value = <strong>${activeVal}</strong>).<br/>
            Calculate: <code>complement = ${target} - ${activeVal} = ${complement}</code>.<br/>
            <code>map.has(${complement})</code> is <strong>FALSE</strong>.<br/>
            Store in map: <code>map.set(${activeVal}, ${activeIdx})</code> and continue.
          `;
          if (btnNext) btnNext.disabled = step >= nums.length;
        }

        let rowsHtml = '';
        currentMap.forEach((idx, val) => {
          rowsHtml += `
            <tr class="${val === complement && matchFound ? 'highlight-row' : ''}">
              <td><code>${val}</code></td>
              <td><code>index ${idx}</code></td>
              <td><code>${target - val}</code></td>
            </tr>
          `;
        });
        tbody.innerHTML = rowsHtml || `<tr><td colspan="3" class="hash-empty-slot">Map is empty</td></tr>`;
      }

      if (btnNext) btnNext.addEventListener('click', () => {
        if (step < nums.length) { step++; updateState(); }
      });
      if (btnPrev) btnPrev.addEventListener('click', () => {
        if (step > 0) { step--; updateState(); }
      });
      if (btnReset) btnReset.addEventListener('click', () => {
        step = 0;
        if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        updateState();
      });
      if (btnPlay) btnPlay.addEventListener('click', () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
          btnPlay.textContent = '▶ Play';
        } else {
          btnPlay.textContent = '⏸ Pause';
          timer = setInterval(() => {
            if (step < nums.length) {
              step++;
              updateState();
            } else {
              clearInterval(timer);
              timer = null;
              btnPlay.textContent = '▶ Play';
            }
          }, 1100);
        }
      });
      if (btnToggleDup) btnToggleDup.addEventListener('click', () => {
        isDupMode = !isDupMode;
        if (isDupMode) {
          nums = [3, 3];
          target = 6;
          btnToggleDup.textContent = 'Switch to Standard ([2,7,11,15], T=9)';
          if (arrayLabel) arrayLabel.textContent = '[3, 3]';
          if (targetLabel) targetLabel.textContent = '6';
        } else {
          nums = [2, 7, 11, 15];
          target = 9;
          btnToggleDup.textContent = 'Switch to Duplicates ([3,3], T=6)';
          if (arrayLabel) arrayLabel.textContent = '[2, 7, 11, 15]';
          if (targetLabel) targetLabel.textContent = '9';
        }
        step = 0;
        if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        updateState();
      });

      updateState();
    })();

    /* 3. INTERACTIVE MAP PLAYGROUND */
    (function initMapPlayground() {
      const liveMap = new Map();
      liveMap.set("Arun", 75);
      liveMap.set("Bala", 82);
      liveMap.set("Nirmal", 90);

      const inputKey = container.querySelector('#pg-map-key');
      const inputVal = container.querySelector('#pg-map-val');
      const selectType = container.querySelector('#pg-map-type');
      const tbody = container.querySelector('#pg-map-tbody');
      const sizeBadge = container.querySelector('#pg-map-size-badge');
      const logBox = container.querySelector('#pg-map-log');

      const btnSet = container.querySelector('#btn-pg-set');
      const btnGet = container.querySelector('#btn-pg-get');
      const btnHas = container.querySelector('#btn-pg-has');
      const btnDelete = container.querySelector('#btn-pg-delete');
      const btnClear = container.querySelector('#btn-pg-clear');
      const btnResetSample = container.querySelector('#btn-pg-reset-sample');

      if (!inputKey || !tbody) return;

      function logMsg(msg, type = 'info') {
        if (!logBox) return;
        const entry = document.createElement('div');
        entry.className = `hash-log-entry hash-log-entry--${type}`;
        const time = new Date().toLocaleTimeString();
        entry.textContent = `[${time}] ${msg}`;
        logBox.appendChild(entry);
        logBox.scrollTop = logBox.scrollHeight;
      }

      function parseKey() {
        const type = selectType ? selectType.value : 'string';
        const raw = inputKey.value.trim();
        if (type === 'number') return Number(raw);
        if (type === 'nan') return NaN;
        if (type === 'object') {
          try {
            return JSON.parse(raw);
          } catch (e) {
            return { rawKey: raw };
          }
        }
        return raw;
      }

      function renderTable() {
        if (sizeBadge) sizeBadge.textContent = `map.size = ${liveMap.size}`;
        if (liveMap.size === 0) {
          tbody.innerHTML = `<tr><td colspan="5" class="hash-empty-slot">Map is completely empty</td></tr>`;
          return;
        }

        let rowsHtml = '';
        let i = 1;
        liveMap.forEach((v, k) => {
          const keyType = typeof k === 'number' && isNaN(k) ? 'NaN' : typeof k;
          const displayKey = typeof k === 'object' ? JSON.stringify(k) : String(k);
          const displayVal = typeof v === 'object' ? JSON.stringify(v) : String(v);

          rowsHtml += `
            <tr>
              <td>${i++}</td>
              <td><code>${escapeHtml(displayKey)}</code></td>
              <td><span style="font-size:0.75rem; background:rgba(108,99,255,0.1); color:var(--accent-primary); padding:2px 8px; border-radius:4px;">${keyType}</span></td>
              <td><strong>${escapeHtml(displayVal)}</strong></td>
              <td>
                <button class="hash-ctrl-btn" style="min-height:28px; min-width:28px; padding:2px 8px; font-size:0.75rem; color:#EF4444;" data-del-key="${escapeHtml(displayKey)}">
                  Delete
                </button>
              </td>
            </tr>
          `;
        });
        tbody.innerHTML = rowsHtml;

        tbody.querySelectorAll('button[data-del-key]').forEach(b => {
          b.addEventListener('click', () => {
            const kToDel = b.getAttribute('data-del-key');
            for (const key of liveMap.keys()) {
              if (String(key) === kToDel) {
                liveMap.delete(key);
                logMsg(`map.delete("${kToDel}") => true`, 'warn');
                renderTable();
                break;
              }
            }
          });
        });
      }

      if (btnSet) btnSet.addEventListener('click', () => {
        const k = parseKey();
        const v = inputVal.value.trim() || 'default_val';
        liveMap.set(k, v);
        logMsg(`map.set(${typeof k === 'object' ? JSON.stringify(k) : k}, "${v}") => map updated (size: ${liveMap.size})`, 'success');
        renderTable();
      });

      if (btnGet) btnGet.addEventListener('click', () => {
        const k = parseKey();
        let res = liveMap.get(k);
        // Fallback search for string match
        if (res === undefined && typeof k === 'object') {
          logMsg(`map.get(${JSON.stringify(k)}) => undefined (Objects match by reference identity, not content!)`, 'warn');
        } else {
          logMsg(`map.get(${k}) => ${res !== undefined ? JSON.stringify(res) : 'undefined'}`, res !== undefined ? 'success' : 'warn');
        }
      });

      if (btnHas) btnHas.addEventListener('click', () => {
        const k = parseKey();
        const hasIt = liveMap.has(k);
        logMsg(`map.has(${k}) => ${hasIt}`, hasIt ? 'success' : 'warn');
      });

      if (btnDelete) btnDelete.addEventListener('click', () => {
        const k = parseKey();
        const del = liveMap.delete(k);
        logMsg(`map.delete(${k}) => ${del}`, del ? 'warn' : 'err');
        renderTable();
      });

      if (btnClear) btnClear.addEventListener('click', () => {
        liveMap.clear();
        logMsg(`map.clear() => Map cleared (size: 0)`, 'err');
        renderTable();
      });

      if (btnResetSample) btnResetSample.addEventListener('click', () => {
        liveMap.clear();
        liveMap.set("Arun", 75);
        liveMap.set("Bala", 82);
        liveMap.set("Nirmal", 90);
        logMsg(`Map reset to original student marks sample data`, 'info');
        renderTable();
      });

      renderTable();
    })();
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "ht-q1",
      difficulty: "Easy",
      question: "What is the average time complexity of looking up a key in a JavaScript Map?",
      options: [
        "A. O(1) constant time",
        "B. O(log n) logarithmic time",
        "C. O(n) linear time",
        "D. O(n²) quadratic time"
      ],
      answer: "A",
      explanation: "A Hash Map directly computes the bucket array index using a deterministic hash function, allowing O(1) average lookup."
    },
    {
      id: "ht-q2",
      difficulty: "Easy",
      question: "How do you check the number of elements in a JavaScript Map?",
      options: [
        "A. map.length",
        "B. map.size",
        "C. map.size()",
        "D. map.count()"
      ],
      answer: "B",
      explanation: "In JavaScript, `size` is an accessor property (getter), NOT a method. Calling `map.size()` throws a TypeError."
    },
    {
      id: "ht-q3",
      difficulty: "Medium",
      question: "What happens when you call map.set(key, newVal) on a key that is ALREADY stored in the map?",
      options: [
        "A. A collision error is thrown",
        "B. The value is overwritten and map.size remains unchanged",
        "C. A duplicate key is appended to the map",
        "D. The new value is ignored and old value kept"
      ],
      answer: "B",
      explanation: "Map keys are strictly unique. Re-setting an existing key overwrites the old value in-place without incrementing size."
    },
    {
      id: "ht-q4",
      difficulty: "Medium",
      question: "What does `map.get({ id: 1 })` return after executing `map.set({ id: 1 }, 'Alice')`?",
      options: [
        "A. 'Alice'",
        "B. undefined",
        "C. ReferenceError",
        "D. null"
      ],
      answer: "B",
      explanation: "In JavaScript, distinct object literals are located at different memory addresses. `map.get({ id: 1 })` checks a new memory reference, returning undefined."
    },
    {
      id: "ht-q5",
      difficulty: "Hard",
      question: "What is the worst-case time complexity of a Hash Table lookup, and under what condition does it occur?",
      options: [
        "A. O(log n) when the load factor exceeds 0.5",
        "B. O(n) when all inserted keys produce hash collisions in the same bucket",
        "C. O(1) always guaranteed by modern hardware",
        "D. O(n log n) when rehashing"
      ],
      answer: "B",
      explanation: "If all $n$ keys hash to the exact same bucket, they form a single linked list of length $n$, degrading search to O(n)."
    },
    {
      id: "ht-q6",
      difficulty: "Interview",
      question: "In LeetCode 1 (Two Sum), why is a single-pass Hash Map preferred over sorting the array first?",
      options: [
        "A. Sorting takes O(n log n) time and scrambles the original array indices needed for the return answer",
        "B. Sorting does not work with negative numbers",
        "C. Hash Map takes O(1) space while sorting takes O(n)",
        "D. Two Sum cannot be solved with sorting"
      ],
      answer: "A",
      explanation: "Sorting costs O(n log n) and destroys the original index positions required by the problem statement, whereas a single-pass Map solves it in O(n) time while preserving original indices."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the correct order of parameters in map.forEach?",
      options: [
        "A. (key, value, map)",
        "B. (value, key, map)",
        "C. (index, value, map)",
        "D. (map, key, value)"
      ],
      answer: "B",
      explanation: "In JavaScript `map.forEach((value, key, map) => {})`, the value comes FIRST, matching Array.prototype.forEach((item, index))."
    },
    {
      question: "Q2. Can a JavaScript Map store NaN as a key?",
      options: [
        "A. No, NaN throws an InvalidKeyError",
        "B. Yes, and NaN is treated as equal to NaN",
        "C. Yes, but you can never retrieve it",
        "D. Only if converted to a string 'NaN'"
      ],
      answer: "B",
      explanation: "Map uses the SameValueZero algorithm, where NaN is considered equal to NaN."
    }
  ],

  predictOutput: [
    {
      code: "const map = new Map();\nmap.set('a', 1).set('b', 2).set('a', 3);\nconsole.log(map.size, map.get('a'));",
      options: ["3 1", "2 3", "3 3", "2 1"],
      answer: "2 3",
      explanation: "Key 'a' is set twice. The second set overwrites value 1 with 3. Total unique keys = 2."
    },
    {
      code: "const map = new Map();\nconst keyObj = { x: 10 };\nmap.set(keyObj, 'Found!');\nconsole.log(map.get({ x: 10 }));",
      options: ["'Found!'", "undefined", "TypeError", "null"],
      answer: "undefined",
      explanation: "{ x: 10 } creates a new object in heap memory. Because object keys are compared by reference, map.get returns undefined."
    }
  ],

  practice: [
    {
      q: "Why is a Hash Map better than an Array for searching key-value pairs?",
      a: "An array requires scanning elements sequentially in O(n) time, whereas a Hash Map computes the index directly via a hash function in O(1) average time."
    },
    {
      q: "What is the difference between map.delete(k) and map.clear()?",
      a: "`map.delete(k)` removes only the specific key `k` and returns a boolean, while `map.clear()` removes all entries and resets `map.size` to 0."
    },
    {
      q: "How does Two Sum achieve O(n) time using a Map?",
      a: "For each element, it calculates `complement = target - nums[i]`. By checking `map.has(complement)` in O(1), it finds pairs in a single traversal instead of nested O(n²) loops."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    twoSumNote: true,
    problems: [
      {
        num: 1,
        slug: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        whyThisOrder: "The classic hash map problem. Learn how trading O(n) auxiliary space slashes runtime from O(n²) to O(n)."
      },
      {
        num: 219,
        slug: "contains-duplicate-ii",
        title: "Contains Duplicate II",
        difficulty: "Easy",
        whyThisOrder: "Tests using a Map to store indices and checking distance constraints `abs(i - j) <= k`."
      },
      {
        num: 387,
        slug: "first-unique-character-in-a-string",
        title: "First Unique Character in a String",
        difficulty: "Easy",
        whyThisOrder: "Direct application of frequency counting with a Map or frequency array."
      },
      {
        num: 49,
        slug: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        whyThisOrder: "Use sorted strings or character counts as map keys to group related words together in O(N * K) time."
      }
    ]
  }
};


/* ==========================================================================
   TOPIC 26: HASH SET & COLLISION HANDLING
   ========================================================================== */
window.LESSONS_CONTENT["hash-set"] = {
  id: "hash-set",
  title: "Hash Set & Collision Handling",
  levelTitle: "Level 4 — Hashing",
  summary: "Learn how Hash Sets store unique elements, how collisions occur, and how they are resolved using Separate Chaining, Open Addressing, and load-factor resizing.",

  sections: [
    /* ------------------------------------------------------------------------
       SECTION 1: WHAT IS A SET?
       ------------------------------------------------------------------------ */
    {
      id: "section-what-is-set",
      title: "1. What is a Hash Set?",
      tocTitle: "1. What is a Set?",
      contentHtml: `
        <p>A <strong>Set</strong> is a collection of <strong>unique values</strong>. Unlike an array where an element can appear many times, a Set guarantees that every stored element exists exactly once. If you attempt to add an item that already exists, the Set simply ignores the duplicate.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px;">Set: Stores Values Only</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.5;">
              <code>Set {'alice', 'bob', 'charlie'}</code><br/>
              Used when you only care about <strong>membership</strong> (checking if an element exists or has been seen).
            </p>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px;">
            <div style="font-weight:700; color:#10B981; margin-bottom:6px;">Map: Stores Key-Value Pairs</div>
            <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.5;">
              <code>Map {'alice' => 25, 'bob' => 30}</code><br/>
              Used when you need to <strong>associate additional metadata</strong> with each unique key.
            </p>
          </div>
        </div>

        <h3 style="margin:20px 0 10px 0; font-size:1.05rem; color:var(--text-primary);">Everyday Real-World Examples</h3>
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:20px; margin:0 0 16px 0;">
          <li><strong>Unique Visitor IP Counter:</strong> Websites count unique daily visitors by recording incoming IP addresses in a Set.</li>
          <li><strong>Graph / Tree Traversal:</strong> Keeping a <code>visited = new Set()</code> to prevent infinite cycles.</li>
          <li><strong>Email Newsletter Subscriptions:</strong> Ensuring no user receives duplicate marketing emails.</li>
        </ul>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 2: JAVASCRIPT SET METHODS & ES2024 COMPOSITION
       ------------------------------------------------------------------------ */
    {
      id: "section-javascript-set",
      title: "2. JavaScript Set API & Modern ES2024 Methods",
      tocTitle: "2. Set Methods & ES2024",
      contentHtml: `
        <h3 style="margin:0 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Standard Set Methods & Properties</h3>
        
        <div style="overflow-x:auto;">
          <table class="hash-state-table" style="margin-bottom:20px;">
            <thead>
              <tr>
                <th>Method / Property</th>
                <th>Description</th>
                <th>Time Complexity</th>
                <th>Return Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>new Set()</code></td>
                <td>Creates an empty Set.</td>
                <td>O(1)</td>
                <td>New <code>Set</code></td>
              </tr>
              <tr>
                <td><code>new Set(iterable)</code></td>
                <td>Initializes with elements, automatically stripping duplicates!</td>
                <td>O(k)</td>
                <td>Deduplicated <code>Set</code></td>
              </tr>
              <tr>
                <td><code>set.add(val)</code></td>
                <td>Appends value if not already present. Returns Set for chaining!</td>
                <td>O(1) avg</td>
                <td>The <code>Set</code> itself (chainable)</td>
              </tr>
              <tr>
                <td><code>set.has(val)</code></td>
                <td>Checks if value exists in Set.</td>
                <td>O(1) avg</td>
                <td><code>true</code> | <code>false</code></td>
              </tr>
              <tr>
                <td><code>set.delete(val)</code></td>
                <td>Removes value. Returns <code>true</code> if existed and deleted.</td>
                <td>O(1) avg</td>
                <td><code>true</code> | <code>false</code></td>
              </tr>
              <tr>
                <td><code>set.clear()</code></td>
                <td>Empties the Set.</td>
                <td>O(n)</td>
                <td><code>undefined</code></td>
              </tr>
              <tr>
                <td><code>set.size</code></td>
                <td><strong>PROPERTY, NOT METHOD!</strong> Current unique item count.</td>
                <td>O(1)</td>
                <td>Integer</td>
              </tr>
              <tr>
                <td><code>[...new Set(arr)]</code></td>
                <td><strong>Array Deduplication idiom:</strong> converts array to Set and spreads back.</td>
                <td>O(n)</td>
                <td>New deduplicated Array</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Modern Set Composition Methods (ES2024)</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          Modern JavaScript provides native mathematical set operations. Our application includes automatic runtime feature detection with safe fallbacks so these run flawlessly across all browsers:
        </p>

        <div style="overflow-x:auto;">
          <table class="hash-state-table" style="margin-bottom:20px;">
            <thead>
              <tr>
                <th>Method</th>
                <th>Math Concept</th>
                <th>Description</th>
                <th>Example (A = {1, 2}, B = {2, 3})</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>A.union(B)</code></td>
                <td>$A \cup B$</td>
                <td>All elements in either A or B</td>
                <td><code>{1, 2, 3}</code></td>
              </tr>
              <tr>
                <td><code>A.intersection(B)</code></td>
                <td>$A \cap B$</td>
                <td>Only elements present in both A and B</td>
                <td><code>{2}</code></td>
              </tr>
              <tr>
                <td><code>A.difference(B)</code></td>
                <td>$A \setminus B$</td>
                <td>Elements in A that are NOT in B</td>
                <td><code>{1}</code></td>
              </tr>
              <tr>
                <td><code>A.symmetricDifference(B)</code></td>
                <td>$A \Delta B$</td>
                <td>Elements in either A or B, but NOT in both</td>
                <td><code>{1, 3}</code></td>
              </tr>
              <tr>
                <td><code>A.isSubsetOf(B)</code></td>
                <td>$A \subseteq B$</td>
                <td>Returns true if every element in A is in B</td>
                <td><code>false</code></td>
              </tr>
              <tr>
                <td><code>A.isSupersetOf(B)</code></td>
                <td>$A \supseteq B$</td>
                <td>Returns true if A contains every element in B</td>
                <td><code>false</code></td>
              </tr>
              <tr>
                <td><code>A.isDisjointFrom(B)</code></td>
                <td>$A \cap B = \emptyset$</td>
                <td>Returns true if A and B share no elements</td>
                <td><code>false</code> (both share 2)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 3: PRACTICAL SET EXAMPLE — CONTAINS DUPLICATE
       ------------------------------------------------------------------------ */
    {
      id: "section-contains-duplicate",
      title: "3. Practical Set Example: LeetCode 217 (Contains Duplicate)",
      tocTitle: "3. Contains Duplicate",
      contentHtml: `
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <p style="margin:0; color:var(--text-secondary); line-height:1.6;">
            <strong>Problem:</strong> Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.
          </p>
          <a href="https://leetcode.com/problems/contains-duplicate/" target="_blank" rel="noopener noreferrer" class="btn btn--secondary" style="display:inline-flex; align-items:center; gap:6px; font-size:0.82rem; padding:6px 12px; text-decoration:none;">
            <span>Solve on LeetCode #217</span> ↗
          </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin:16px 0;">
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#EF4444; font-size:0.9rem;">Brute Force</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">O(n²) Time | O(1) Space<br/>Nested loops checking all pairs.</div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#F59E0B; font-size:0.9rem;">Sorting Approach</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">O(n log n) Time | O(1) Space<br/>Sort array, check adjacent items.</div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:14px;">
            <div style="font-weight:700; color:#10B981; font-size:0.9rem;">Hash Set (Optimal)</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">O(n) Time | O(n) Space<br/>Early exit on first duplicate seen!</div>
          </div>
        </div>

        <pre class="code-block"><code>function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) {
      return true; // Found duplicate early!
    }
    seen.add(num);
  }
  return false;
}

// Or clean one-liner:
const containsDuplicateOneLiner = (nums) => new Set(nums).size !== nums.length;</code></pre>

        <!-- Interactive Stepper for Contains Duplicate -->
        <div class="hash-widget-card" id="trace-dup-container">
          <div class="hash-widget-header">
            <h4 class="hash-widget-title">
              <span>🔍 Step-by-Step Duplicate Detection Trace: [1, 2, 3, 1]</span>
            </h4>
            <div class="hash-stepper-controls">
              <button class="hash-ctrl-btn" id="btn-dup-reset">⏮ Reset</button>
              <button class="hash-ctrl-btn" id="btn-dup-prev">◀ Step Back</button>
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-dup-play">▶ Play</button>
              <button class="hash-ctrl-btn" id="btn-dup-next">Step Forward ▶</button>
            </div>
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">Input Array: <code>[1, 2, 3, 1]</code></div>
          <div class="hash-chips-strip" id="dup-chips-strip"></div>

          <div class="hash-narration-box" id="dup-narration">
            Click <strong>Step Forward ▶</strong> to trace how the Set tracks seen numbers and catches duplicates.
          </div>

          <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem; margin-top:10px;">
            Set Contents:
          </div>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:12px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-default); margin-top:6px;" id="dup-set-display">
            <span class="hash-empty-slot">Set is empty: Set {}</span>
          </div>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 4: COLLISION HANDLING & THE REMAINDER OPERATOR
       ------------------------------------------------------------------------ */
    {
      id: "section-collision-handling",
      title: "4. Collision Handling: Separate Chaining & Linear Probing",
      tocTitle: "4. Collision Handling",
      contentHtml: `
        <h3 style="margin:0 0 10px 0; font-size:1.05rem; color:var(--text-primary);">Why Collisions Are Mathematically Inevitable</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          According to the <strong>Pigeonhole Principle</strong>, if you have 10 pigeons and only 9 holes, at least one hole must contain more than one pigeon. Similarly, because potential keys are infinite while hash table slots are finite, two different keys will eventually hash to the same bucket index. This event is called a <strong>Hash Collision</strong>.
        </p>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--text-primary); font-size:0.95rem;">Concrete Scenario: Table Size = 5 Buckets (0 to 4)</h4>
          <p style="margin:0 0 10px 0; color:var(--text-secondary); font-size:0.9rem; line-height:1.5;">
            Let our hash function be the remainder operator: <code>hash(x) = x % 5</code>.
          </p>
          <div style="font-family:'Fira Code',monospace; font-size:0.86rem; background:var(--bg-body); padding:10px 14px; border-radius:6px; line-height:1.7;">
            Insert 12: 12 % 5 = <strong>Index 2</strong><br/>
            Insert 17: 17 % 5 = <strong>Index 2</strong> &nbsp; <span style="color:#EF4444; font-weight:700;">💥 COLLISION! Both want slot 2!</span>
          </div>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Method 1: Separate Chaining</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          In <strong>Separate Chaining</strong>, each bucket in the array does not store a raw value directly. Instead, each bucket holds a <strong>Linked List</strong> (or dynamic array) of colliding nodes. When a collision occurs, we simply append the new element to that bucket's list.
        </p>

        <!-- Separate Chaining Diagram -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:14px 0;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:10px; font-size:0.9rem;">
            Separate Chaining with Buckets 0 to 4:
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; font-family:'Fira Code',monospace; font-size:0.85rem;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hash-bucket-badge">Slot [0]</span> <span class="hash-empty-slot">null</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hash-bucket-badge">Slot [1]</span> <span class="hash-empty-slot">null</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hash-bucket-badge" style="border-color:#6C63FF; color:#6C63FF;">Slot [2]</span>
              <span class="hash-node-card">[12]</span>
              <span class="hash-node-arrow">→</span>
              <span class="hash-node-card" style="border-color:#10B981; color:#10B981;">[17]</span>
              <span class="hash-node-arrow">→</span>
              <span class="hash-empty-slot">null</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hash-bucket-badge">Slot [3]</span> <span class="hash-empty-slot">null</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hash-bucket-badge">Slot [4]</span> <span class="hash-empty-slot">null</span>
            </div>
          </div>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Method 2: Open Addressing (Linear Probing)</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          In <strong>Open Addressing</strong>, there are no linked lists. Every item is stored directly in the table array. If a collision occurs at <code>index</code>, we probe sequentially down the table:
          <code>(index + 1) % size</code>, <code>(index + 2) % size</code>, until we locate the first empty slot.
        </p>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:14px 0;">
          <div style="font-weight:700; color:var(--text-primary); margin-bottom:8px; font-size:0.9rem;">
            Step-by-Step Linear Probing Walkthrough (Size = 5):
          </div>
          <ol style="margin:0; padding-left:20px; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
            <li><strong>Insert 7:</strong> <code>7 % 5 = 2</code>. Slot 2 is empty → placed in <strong>Slot 2</strong>.</li>
            <li><strong>Insert 12:</strong> <code>12 % 5 = 2</code>. Slot 2 is OCCUPIED by 7! Probe next: <code>(2 + 1) % 5 = 3</code>. Slot 3 is empty → placed in <strong>Slot 3</strong>!</li>
            <li><strong>Insert 17:</strong> <code>17 % 5 = 2</code>. Slot 2 full (7), Slot 3 full (12). Probe next: <code>(2 + 2) % 5 = 4</code>. Slot 4 is empty → placed in <strong>Slot 4</strong>!</li>
          </ol>
        </div>

        <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:10px; padding:16px; margin:16px 0;">
          <h4 style="margin:0 0 8px 0; color:var(--text-primary); font-size:0.95rem;">⚠️ The Primary Clustering Issue in Linear Probing</h4>
          <p style="margin:0; color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">
            When consecutive slots become occupied, they form contiguous blocks called <strong>clusters</strong>. Any new key that hashes to any slot within that cluster will have to walk past every single occupied cell to find an open slot, causing insertion and search times to quickly snowball towards <strong>O(n)</strong>.
          </p>
        </div>

        <h3 style="margin:24px 0 12px 0; font-size:1.05rem; color:var(--text-primary);">Load Factor & Resizing (Rehashing)</h3>
        <p style="color:var(--text-secondary); line-height:1.6;">
          The <strong>Load Factor</strong> $\alpha$ measures how full the hash table is:
        </p>
        <div style="font-family:'Fira Code',monospace; font-size:1rem; text-align:center; padding:12px; background:var(--bg-body); border-radius:8px; margin:10px 0; color:var(--accent-primary); font-weight:700;">
          Load Factor α = (Number of Stored Items) / (Total Table Buckets)
        </div>
        <p style="color:var(--text-secondary); line-height:1.6;">
          When $\alpha$ exceeds a safe threshold (typically <strong>0.70 to 0.75</strong>), performance degrades rapidly. The hash table immediately triggers <strong>Resizing & Rehashing</strong>:
        </p>
        <ul style="color:var(--text-secondary); line-height:1.6; padding-left:20px; margin:0 0 16px 0;">
          <li>A new internal array of double the size (e.g. from 16 to 32 slots) is allocated.</li>
          <li>Every existing item must have its bucket recomputed: <code>newIndex = key % newSize</code>.</li>
          <li>Items are redistributed evenly across the larger table, restoring <strong>O(1) average lookup</strong>.</li>
        </ul>
        <p style="font-size:0.9rem; color:var(--text-muted);">
          <em>Note:</em> JavaScript engines (like Google Chrome's V8) handle all hashing, closed addressing, and resizing invisibly in C++ behind the scenes, freeing you to focus on application algorithms.
        </p>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 5: 5-WAY COMPARISON MATRIX
       ------------------------------------------------------------------------ */
    {
      id: "section-comparison-matrix",
      title: "5. Comprehensive Comparison Matrix: Map vs Set vs Object vs Array vs Custom Table",
      tocTitle: "5. Comparison Matrix",
      contentHtml: `
        <div style="overflow-x:auto;">
          <table class="hash-state-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>JS <code>Map</code></th>
                <th>JS <code>Set</code></th>
                <th>Plain <code>Object</code></th>
                <th>Array <code>[]</code></th>
                <th>Custom Hash Table</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Data Stored</strong></td>
                <td>Key-Value pairs</td>
                <td>Values only</td>
                <td>Key-Value pairs</td>
                <td>Ordered values</td>
                <td>Key-Value or Values</td>
              </tr>
              <tr>
                <td><strong>Key Types</strong></td>
                <td>Any type (Objects, primitives)</td>
                <td>Any type</td>
                <td>Strings & Symbols</td>
                <td>Integer indices (0..n-1)</td>
                <td>Whatever hash func handles</td>
              </tr>
              <tr>
                <td><strong>Lookup Time</strong></td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(n) by value, O(1) by index</td>
                <td>O(1) avg, O(n) worst</td>
              </tr>
              <tr>
                <td><strong>Insertion Time</strong></td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(1) push, O(n) unshift</td>
                <td>O(1) avg</td>
              </tr>
              <tr>
                <td><strong>Deletion Time</strong></td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(1) average</td>
                <td>O(n) splice</td>
                <td>O(1) avg</td>
              </tr>
              <tr>
                <td><strong>Size Check</strong></td>
                <td><code>map.size</code> O(1)</td>
                <td><code>set.size</code> O(1)</td>
                <td><code>Object.keys().length</code> O(n)</td>
                <td><code>arr.length</code> O(1)</td>
                <td><code>this.count</code> O(1)</td>
              </tr>
              <tr>
                <td><strong>Ordering</strong></td>
                <td>Strict insertion order</td>
                <td>Strict insertion order</td>
                <td>Complex legacy order</td>
                <td>Strict index order</td>
                <td>Unordered bucket order</td>
              </tr>
              <tr>
                <td><strong>Best For</strong></td>
                <td>Fast key-value cache, dictionaries</td>
                <td>Uniqueness, membership testing</td>
                <td>Fixed record data, JSON</td>
                <td>Ordered lists, stacks, queues</td>
                <td>Learning low-level hashing internals</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    /* ------------------------------------------------------------------------
       SECTION 6: COLLISION VISUALIZER & SET PLAYGROUND
       ------------------------------------------------------------------------ */
    {
      id: "section-collision-visualizer",
      title: "6. Interactive Collision Visualizer & Set Playground",
      tocTitle: "6. Collision Visualizer",
      contentHtml: `
        <div class="hash-widget-card" id="collision-widget-panel">
          
          <!-- Mode Tabs -->
          <div style="display:flex; gap:8px; margin-bottom:16px; border-bottom:1px solid var(--border-default); padding-bottom:12px; flex-wrap:wrap;">
            <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-mode-chaining">Separate Chaining</button>
            <button class="hash-ctrl-btn" id="btn-mode-probing">Open Addressing (Linear Probing)</button>
            <button class="hash-ctrl-btn" id="btn-mode-setplayground" style="margin-left:auto;">Interactive Set Playground</button>
          </div>

          <!-- Collision Visualizer View -->
          <div id="view-collision">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
              <div>
                <span style="font-weight:700; color:var(--text-primary); font-size:0.95rem;" id="collision-mode-title">Mode: Separate Chaining (5 Buckets)</span>
                <div style="font-size:0.82rem; color:var(--text-secondary);">Hash Function: <code>index = number % 5</code></div>
              </div>
              <div class="hash-stepper-controls">
                <button class="hash-ctrl-btn" id="btn-preset-demo" style="font-size:0.82rem;">Run Preset (7, 12, 17, 2)</button>
                <button class="hash-ctrl-btn" id="btn-clear-table" style="color:#EF4444; font-size:0.82rem;">Reset Table</button>
              </div>
            </div>

            <!-- Manual Insertion Form -->
            <div class="hash-playground-form">
              <input type="number" id="input-col-num" class="hash-input-field" placeholder="Enter integer (e.g. 12)" value="12" />
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-col-insert">Insert Number</button>
              <button class="hash-ctrl-btn" id="btn-col-search">Search Number</button>
            </div>

            <!-- Narration Box -->
            <div class="hash-narration-box" id="col-narration">
              Enter a number and click <strong>Insert Number</strong> to watch remainder calculation and collision placement.
            </div>

            <!-- Buckets Container -->
            <div class="hash-buckets-container" id="col-buckets-container"></div>

            <!-- Load Factor Meter -->
            <div class="hash-load-meter">
              <span style="font-weight:700; color:var(--text-primary); font-size:0.88rem; min-width:140px;">
                Load Factor α: <span id="col-lf-text" style="color:#10B981;">0.00 (0 / 5)</span>
              </span>
              <div class="hash-load-bar-track">
                <div class="hash-load-bar-fill" id="col-lf-fill" style="width:0%;"></div>
              </div>
            </div>
          </div>

          <!-- Set Playground View (Hidden by default) -->
          <div id="view-set" style="display:none;">
            <div style="font-weight:700; color:var(--text-primary); font-size:1rem; margin-bottom:10px;">
              Live JavaScript Set Playground
            </div>
            
            <div class="hash-playground-form">
              <input type="text" id="pg-set-val" class="hash-input-field" placeholder="Enter value (e.g. Apple, 42)" value="Apple" />
              <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-set-add">set.add(v)</button>
              <button class="hash-ctrl-btn" id="btn-set-has">set.has(v)</button>
              <button class="hash-ctrl-btn" id="btn-set-delete">set.delete(v)</button>
              <button class="hash-ctrl-btn" id="btn-set-clear" style="color:#EF4444;">set.clear()</button>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin:16px 0 8px 0;">
              <span style="font-weight:700; color:var(--text-primary); font-size:0.92rem;">Stored Unique Elements</span>
              <span class="badge" style="background:rgba(16,185,129,0.15); color:#10B981; font-weight:700; padding:4px 12px; border-radius:12px;" id="pg-set-size-badge">
                set.size = 0
              </span>
            </div>
            <div id="pg-set-chips" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:12px; background:var(--bg-body); border-radius:8px; border:1px solid var(--border-default); min-height:48px;">
              <span class="hash-empty-slot">Set is empty</span>
            </div>

            <!-- Deduplication Tester -->
            <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border-default);">
              <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem; margin-bottom:6px;">
                Array Deduplication Tool: <code>[...new Set(arr)]</code>
              </div>
              <div class="hash-playground-form">
                <input type="text" id="input-dedupe" class="hash-input-field" value="1, 2, 2, 3, 4, 3, 5, 1" placeholder="Comma-separated items" />
                <button class="hash-ctrl-btn hash-ctrl-btn--primary" id="btn-run-dedupe">Deduplicate Array</button>
              </div>
              <div class="hash-dedupe-result" id="dedupe-result">
                Result will appear here.
              </div>
            </div>

            <div style="font-weight:700; color:var(--text-primary); font-size:0.88rem; margin-top:14px;">Set Activity Log:</div>
            <div class="hash-log-terminal" id="pg-set-log">
              <div class="hash-log-entry hash-log-entry--info">[System] Set playground ready.</div>
            </div>
          </div>

        </div>
      `
    }
  ],

  /* ------------------------------------------------------------------------
     ONMOUNT HOOK: BIND COLLISION VISUALIZER & SET PLAYGROUND
     ------------------------------------------------------------------------ */
  onMount: function (container) {
    if (!container) return;

    /* 1. CONTAINS DUPLICATE STEPPER */
    (function initDupStepper() {
      const arr = [1, 2, 3, 1];
      let step = 0;
      let timer = null;

      const chipsStrip = container.querySelector('#dup-chips-strip');
      const narration = container.querySelector('#dup-narration');
      const setDisplay = container.querySelector('#dup-set-display');
      const btnReset = container.querySelector('#btn-dup-reset');
      const btnPrev = container.querySelector('#btn-dup-prev');
      const btnPlay = container.querySelector('#btn-dup-play');
      const btnNext = container.querySelector('#btn-dup-next');

      if (!chipsStrip) return;

      function renderChips() {
        chipsStrip.innerHTML = arr.map((val, idx) => {
          let cls = 'hash-chip-val';
          if (step > 0 && idx === step - 1) {
            // Check if duplicate
            const isDup = arr.slice(0, idx).includes(val);
            cls += isDup ? ' hash-chip-val--match' : ' hash-chip-val--active';
          } else if (step > 0 && idx < step - 1) {
            cls += ' hash-chip-val--visited';
          }
          return `
            <div class="hash-chip-item">
              <div class="${cls}">${val}</div>
              <div class="hash-chip-idx">[${idx}]</div>
            </div>
          `;
        }).join('');
      }

      function updateState() {
        renderChips();

        if (step === 0) {
          narration.innerHTML = `Click <strong>Step Forward ▶</strong> to trace duplicate detection step-by-step.`;
          setDisplay.innerHTML = `<span class="hash-empty-slot">Set is empty: Set {}</span>`;
          if (btnPrev) btnPrev.disabled = true;
          if (btnNext) btnNext.disabled = false;
          return;
        }

        if (btnPrev) btnPrev.disabled = false;

        const seenSet = new Set();
        let foundDup = false;

        for (let i = 0; i < step; i++) {
          const num = arr[i];
          if (seenSet.has(num)) {
            foundDup = true;
            break;
          }
          seenSet.add(num);
        }

        const activeVal = arr[step - 1];

        if (foundDup) {
          narration.innerHTML = `
            <span style="color:#EF4444; font-weight:700;">💥 DUPLICATE DETECTED!</span><br/>
            At index <code>[${step - 1}]</code>, element <strong>${activeVal}</strong> is encountered.<br/>
            Evaluating: <code>seen.has(${activeVal})</code> is <strong>TRUE</strong>!<br/>
            <strong>Execution terminates early and returns <code>true</code>!</strong>
          `;
          if (btnNext) btnNext.disabled = true;
          if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        } else {
          narration.innerHTML = `
            <strong>Step ${step}:</strong> Inspecting index <code>[${step - 1}]</code> (element = <strong>${activeVal}</strong>).<br/>
            Evaluating: <code>seen.has(${activeVal})</code> is <strong>FALSE</strong>.<br/>
            Adding to set: <code>seen.add(${activeVal})</code> and advancing.
          `;
          if (btnNext) btnNext.disabled = step >= arr.length;
        }

        let chipsHtml = Array.from(seenSet).map(v => `
          <span class="hash-node-card">${v}</span>
        `).join('');
        setDisplay.innerHTML = chipsHtml || `<span class="hash-empty-slot">Set is empty: Set {}</span>`;
      }

      if (btnNext) btnNext.addEventListener('click', () => {
        if (step < arr.length) { step++; updateState(); }
      });
      if (btnPrev) btnPrev.addEventListener('click', () => {
        if (step > 0) { step--; updateState(); }
      });
      if (btnReset) btnReset.addEventListener('click', () => {
        step = 0;
        if (timer) { clearInterval(timer); timer = null; if (btnPlay) btnPlay.textContent = '▶ Play'; }
        updateState();
      });
      if (btnPlay) btnPlay.addEventListener('click', () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
          btnPlay.textContent = '▶ Play';
        } else {
          btnPlay.textContent = '⏸ Pause';
          timer = setInterval(() => {
            if (step < arr.length) {
              step++;
              updateState();
            } else {
              clearInterval(timer);
              timer = null;
              btnPlay.textContent = '▶ Play';
            }
          }, 1000);
        }
      });

      updateState();
    })();

    /* 2. COLLISION VISUALIZER */
    (function initCollisionVisualizer() {
      const TABLE_SIZE = 5;
      let mode = 'chaining'; // 'chaining' or 'probing'
      let table = Array.from({ length: TABLE_SIZE }, () => []);

      const bucketsContainer = container.querySelector('#col-buckets-container');
      const narration = container.querySelector('#col-narration');
      const lfText = container.querySelector('#col-lf-text');
      const lfFill = container.querySelector('#col-lf-fill');
      const inputNum = container.querySelector('#input-col-num');
      const btnInsert = container.querySelector('#btn-col-insert');
      const btnSearch = container.querySelector('#btn-col-search');
      const btnResetTable = container.querySelector('#btn-clear-table');
      const btnPreset = container.querySelector('#btn-preset-demo');
      const titleMode = container.querySelector('#collision-mode-title');

      const btnModeChaining = container.querySelector('#btn-mode-chaining');
      const btnModeProbing = container.querySelector('#btn-mode-probing');
      const btnModeSetPlay = container.querySelector('#btn-mode-setplayground');

      const viewCollision = container.querySelector('#view-collision');
      const viewSet = container.querySelector('#view-set');

      if (!bucketsContainer) return;

      // Switch sub-tabs
      if (btnModeChaining) btnModeChaining.addEventListener('click', () => {
        mode = 'chaining';
        btnModeChaining.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
        btnModeProbing.className = 'hash-ctrl-btn';
        btnModeSetPlay.className = 'hash-ctrl-btn';
        viewCollision.style.display = 'block';
        viewSet.style.display = 'none';
        if (titleMode) titleMode.textContent = 'Mode: Separate Chaining (5 Buckets)';
        resetTable();
      });

      if (btnModeProbing) btnModeProbing.addEventListener('click', () => {
        mode = 'probing';
        btnModeProbing.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
        btnModeChaining.className = 'hash-ctrl-btn';
        btnModeSetPlay.className = 'hash-ctrl-btn';
        viewCollision.style.display = 'block';
        viewSet.style.display = 'none';
        if (titleMode) titleMode.textContent = 'Mode: Open Addressing / Linear Probing (5 Buckets)';
        resetTable();
      });

      if (btnModeSetPlay) btnModeSetPlay.addEventListener('click', () => {
        btnModeSetPlay.className = 'hash-ctrl-btn hash-ctrl-btn--primary';
        btnModeChaining.className = 'hash-ctrl-btn';
        btnModeProbing.className = 'hash-ctrl-btn';
        viewCollision.style.display = 'none';
        viewSet.style.display = 'block';
      });

      function countTotalItems() {
        if (mode === 'chaining') {
          return table.reduce((sum, b) => sum + b.length, 0);
        } else {
          return table.filter(b => b.length > 0).length;
        }
      }

      function updateLoadFactor() {
        const total = countTotalItems();
        const lf = (total / TABLE_SIZE).toFixed(2);
        const pct = Math.min((total / TABLE_SIZE) * 100, 100);

        if (lfText) {
          lfText.textContent = `${lf} (${total} / ${TABLE_SIZE})`;
          if (lf >= 0.75) lfText.style.color = '#EF4444';
          else if (lf >= 0.6) lfText.style.color = '#F59E0B';
          else lfText.style.color = '#10B981';
        }

        if (lfFill) {
          lfFill.style.width = `${pct}%`;
          lfFill.className = 'hash-load-bar-fill' + (lf >= 0.75 ? ' hash-load-bar-fill--danger' : lf >= 0.6 ? ' hash-load-bar-fill--warning' : '');
        }
      }

      function renderBuckets(highlightRow = -1, highlightType = '') {
        bucketsContainer.innerHTML = '';
        for (let i = 0; i < TABLE_SIZE; i++) {
          const row = document.createElement('div');
          row.className = 'hash-bucket-row';
          if (i === highlightRow) {
            row.className += highlightType === 'probed' ? ' hash-bucket-row--probed' : ' hash-bucket-row--placed';
          }

          const badge = document.createElement('div');
          badge.className = 'hash-bucket-badge';
          badge.textContent = `Slot [${i}]`;
          row.appendChild(badge);

          const chain = document.createElement('div');
          chain.className = 'hash-bucket-chain';

          if (table[i].length === 0) {
            chain.innerHTML = `<span class="hash-empty-slot">empty (null)</span>`;
          } else {
            if (mode === 'chaining') {
              chain.innerHTML = table[i].map((num, idx) => `
                <span class="hash-node-card">${num}</span>
                ${idx < table[i].length - 1 ? '<span class="hash-node-arrow">→</span>' : '<span class="hash-node-arrow">→ null</span>'}
              `).join('');
            } else {
              // Probing: exactly one item per slot
              chain.innerHTML = `<span class="hash-node-card" style="border-color:var(--accent-primary);">${table[i][0]}</span>`;
            }
          }

          row.appendChild(chain);
          bucketsContainer.appendChild(row);
        }
        updateLoadFactor();
      }

      function resetTable() {
        table = Array.from({ length: TABLE_SIZE }, () => []);
        narration.innerHTML = `Table cleared. Ready for new insertions (Hash Function: <code>x % ${TABLE_SIZE}</code>).`;
        renderBuckets();
      }

      function insertNumber(num) {
        const hashIdx = ((num % TABLE_SIZE) + TABLE_SIZE) % TABLE_SIZE;

        if (mode === 'chaining') {
          // Separate chaining
          const isCollision = table[hashIdx].length > 0;
          table[hashIdx].push(num);
          renderBuckets(hashIdx, isCollision ? 'probed' : 'placed');

          narration.innerHTML = `
            <strong>Inserted ${num}:</strong> Hash: <code>${num} % 5 = Index ${hashIdx}</code>.<br/>
            ${isCollision
              ? `<span style="color:#F59E0B; font-weight:700;">💥 Collision Handled!</span> Slot [${hashIdx}] already had elements. Appended <strong>${num}</strong> to the chain.`
              : `<span style="color:#10B981; font-weight:700;">✓ Clean placement!</span> Slot [${hashIdx}] was empty.`}
          `;
        } else {
          // Linear Probing
          let probe = hashIdx;
          let probesCount = 0;
          let placed = false;

          while (probesCount < TABLE_SIZE) {
            if (table[probe].length === 0) {
              table[probe].push(num);
              placed = true;
              renderBuckets(probe, 'placed');
              narration.innerHTML = `
                <strong>Inserted ${num}:</strong> Hash: <code>${num} % 5 = Index ${hashIdx}</code>.<br/>
                ${probesCount > 0
                  ? `<span style="color:#F59E0B; font-weight:700;">💥 Collision Resolved!</span> Slot [${hashIdx}] was occupied. Probed ${probesCount} slot(s) and placed in first available <strong>Slot [${probe}]</strong>.`
                  : `<span style="color:#10B981; font-weight:700;">✓ Direct Placement!</span> Slot [${probe}] was empty.`}
              `;
              break;
            }
            probesCount++;
            probe = (probe + 1) % TABLE_SIZE;
          }

          if (!placed) {
            narration.innerHTML = `
              <span style="color:#EF4444; font-weight:700;">❌ Table Overflow!</span> All 5 slots are full. In a production hash table, this immediately triggers a <strong>Resizing & Rehashing</strong> event!
            `;
          }
        }
      }

      function searchNumber(num) {
        const hashIdx = ((num % TABLE_SIZE) + TABLE_SIZE) % TABLE_SIZE;

        if (mode === 'chaining') {
          const list = table[hashIdx];
          const found = list.includes(num);
          renderBuckets(hashIdx, found ? 'placed' : 'probed');
          narration.innerHTML = `
            <strong>Searching for ${num}:</strong> Hash: <code>${num} % 5 = Index ${hashIdx}</code>.<br/>
            ${found
              ? `<span style="color:#10B981; font-weight:700;">✓ Found!</span> Traversed chain at Slot [${hashIdx}] and matched <strong>${num}</strong>.`
              : `<span style="color:#EF4444; font-weight:700;">✗ Not Found!</span> Scanned chain at Slot [${hashIdx}], element is not present.`}
          `;
        } else {
          let probe = hashIdx;
          let probesCount = 0;
          let found = false;

          while (probesCount < TABLE_SIZE) {
            if (table[probe].length === 0) {
              break; // Empty slot stops linear probe
            }
            if (table[probe][0] === num) {
              found = true;
              renderBuckets(probe, 'placed');
              narration.innerHTML = `
                <strong>Searching for ${num}:</strong> Initial hash: Index ${hashIdx}.<br/>
                <span style="color:#10B981; font-weight:700;">✓ Found at Slot [${probe}]</span> after ${probesCount} probe(s)!
              `;
              return;
            }
            probesCount++;
            probe = (probe + 1) % TABLE_SIZE;
          }

          narration.innerHTML = `
            <strong>Searching for ${num}:</strong> Initial hash: Index ${hashIdx}.<br/>
            <span style="color:#EF4444; font-weight:700;">✗ Not Found!</span> Reached empty slot or checked all ${probesCount} slots without a match.
          `;
        }
      }

      if (btnInsert) btnInsert.addEventListener('click', () => {
        const n = parseInt(inputNum.value, 10);
        if (!isNaN(n)) insertNumber(n);
      });

      if (btnSearch) btnSearch.addEventListener('click', () => {
        const n = parseInt(inputNum.value, 10);
        if (!isNaN(n)) searchNumber(n);
      });

      if (btnResetTable) btnResetTable.addEventListener('click', resetTable);

      if (btnPreset) btnPreset.addEventListener('click', () => {
        resetTable();
        const seq = [7, 12, 17, 2];
        let i = 0;
        const intv = setInterval(() => {
          if (i < seq.length) {
            insertNumber(seq[i]);
            i++;
          } else {
            clearInterval(intv);
          }
        }, 800);
      });

      renderBuckets();
    })();

    /* 3. INTERACTIVE SET PLAYGROUND */
    (function initSetPlayground() {
      const liveSet = new Set();
      const inputVal = container.querySelector('#pg-set-val');
      const chipsBox = container.querySelector('#pg-set-chips');
      const sizeBadge = container.querySelector('#pg-set-size-badge');
      const logBox = container.querySelector('#pg-set-log');

      const btnAdd = container.querySelector('#btn-set-add');
      const btnHas = container.querySelector('#btn-set-has');
      const btnDelete = container.querySelector('#btn-set-delete');
      const btnClear = container.querySelector('#btn-set-clear');

      const inputDedupe = container.querySelector('#input-dedupe');
      const btnRunDedupe = container.querySelector('#btn-run-dedupe');
      const dedupeResult = container.querySelector('#dedupe-result');

      if (!inputVal || !chipsBox) return;

      function logMsg(msg, type = 'info') {
        if (!logBox) return;
        const entry = document.createElement('div');
        entry.className = `hash-log-entry hash-log-entry--${type}`;
        const time = new Date().toLocaleTimeString();
        entry.textContent = `[${time}] ${msg}`;
        logBox.appendChild(entry);
        logBox.scrollTop = logBox.scrollHeight;
      }

      function renderChips() {
        if (sizeBadge) sizeBadge.textContent = `set.size = ${liveSet.size}`;
        if (liveSet.size === 0) {
          chipsBox.innerHTML = `<span class="hash-empty-slot">Set is empty</span>`;
          return;
        }

        chipsBox.innerHTML = Array.from(liveSet).map(val => `
          <div class="hash-node-card">
            <span>${escapeHtml(String(val))}</span>
            <button class="hash-ctrl-btn" style="min-height:22px; min-width:22px; padding:0 6px; font-size:0.75rem; border:none; background:transparent; color:#EF4444; cursor:pointer;" data-del-val="${escapeHtml(String(val))}">
              ✕
            </button>
          </div>
        `).join('');

        chipsBox.querySelectorAll('button[data-del-val]').forEach(b => {
          b.addEventListener('click', () => {
            const val = b.getAttribute('data-del-val');
            liveSet.delete(val);
            logMsg(`set.delete("${val}") => true`, 'warn');
            renderChips();
          });
        });
      }

      if (btnAdd) btnAdd.addEventListener('click', () => {
        const val = inputVal.value.trim() || 'item';
        const alreadyHad = liveSet.has(val);
        liveSet.add(val);
        if (alreadyHad) {
          logMsg(`set.add("${val}") => Value already exists. Set ignored duplicate! (size: ${liveSet.size})`, 'warn');
        } else {
          logMsg(`set.add("${val}") => Inserted successfully! (size: ${liveSet.size})`, 'success');
        }
        renderChips();
      });

      if (btnHas) btnHas.addEventListener('click', () => {
        const val = inputVal.value.trim();
        const hasIt = liveSet.has(val);
        logMsg(`set.has("${val}") => ${hasIt}`, hasIt ? 'success' : 'warn');
      });

      if (btnDelete) btnDelete.addEventListener('click', () => {
        const val = inputVal.value.trim();
        const del = liveSet.delete(val);
        logMsg(`set.delete("${val}") => ${del}`, del ? 'warn' : 'err');
        renderChips();
      });

      if (btnClear) btnClear.addEventListener('click', () => {
        liveSet.clear();
        logMsg(`set.clear() => All elements removed (size: 0)`, 'err');
        renderChips();
      });

      if (btnRunDedupe && inputDedupe && dedupeResult) {
        btnRunDedupe.addEventListener('click', () => {
          const raw = inputDedupe.value.split(',').map(s => s.trim()).filter(Boolean);
          const unique = [...new Set(raw)];
          dedupeResult.innerHTML = `
            <strong>Original (${raw.length} items):</strong> [${escapeHtml(raw.join(', '))}]<br/>
            <span style="color:#10B981; font-weight:700;">Deduplicated Set (${unique.length} items):</span> [${escapeHtml(unique.join(', '))}]
          `;
          logMsg(`Array deduplicated: ${raw.length} elements reduced to ${unique.length} unique elements.`, 'success');
        });
      }

      renderChips();
    })();
  },

  /* ------------------------------------------------------------------------
     QUESTIONS TAB
     ------------------------------------------------------------------------ */
  questionSuite: [
    {
      id: "hs-q1",
      difficulty: "Easy",
      question: "What is the primary difference between a JavaScript Map and a Set?",
      options: [
        "A. Map stores key-value pairs; Set stores unique values only",
        "B. Set is sorted; Map is unsorted",
        "C. Set allows duplicate elements; Map does not",
        "D. Map has a .size property; Set uses .length"
      ],
      answer: "A",
      explanation: "A Map maps keys to values (`key => value`), whereas a Set only stores individual unique values without associated payloads."
    },
    {
      id: "hs-q2",
      difficulty: "Easy",
      question: "What is the standard JavaScript idiom to remove all duplicate values from an array `arr`?",
      options: [
        "A. arr.filterDuplicates()",
        "B. [...new Set(arr)]",
        "C. new Set(arr).toArray()",
        "D. Object.keys(arr)"
      ],
      answer: "B",
      explanation: "Passing an array into `new Set(arr)` strips duplicates in O(n) time, and spreading `[...new Set(arr)]` reconstructs a clean array."
    },
    {
      id: "hs-q3",
      difficulty: "Medium",
      question: "In hash table collision handling, what is 'Separate Chaining'?",
      options: [
        "A. Deleting the oldest colliding element",
        "B. Storing colliding elements in a linked list or array at that bucket slot",
        "C. Using two hash tables simultaneously",
        "D. Encrypting keys with a cipher"
      ],
      answer: "B",
      explanation: "Separate chaining resolves collisions by having each bucket index point to a linked list or dynamic array containing all colliding items."
    },
    {
      id: "hs-q4",
      difficulty: "Medium",
      question: "What is 'Primary Clustering' in Open Addressing (Linear Probing)?",
      options: [
        "A. Keys grouping around index 0",
        "B. Contiguous blocks of occupied slots that cause progressively longer search and insert probe sequences",
        "C. A hardware CPU cache miss",
        "D. Using multiple hash functions"
      ],
      answer: "B",
      explanation: "In linear probing, colliding keys fill adjacent slots. As contiguous occupied clusters grow, any key hashing anywhere into the cluster must probe all the way to the end."
    },
    {
      id: "hs-q5",
      difficulty: "Hard",
      question: "What does the Load Factor (α = n / k) represent, and why does a hash table resize when α exceeds ~0.75?",
      options: [
        "A. The percentage of memory used by the OS; it prevents memory leaks",
        "B. The ratio of stored items to total buckets; exceeding 0.75 exponentially increases collisions and degrades O(1) performance",
        "C. The number of CPU threads allocated to hashing",
        "D. It specifies the number of duplicate items allowed"
      ],
      answer: "B",
      explanation: "As $\alpha$ exceeds 0.7 to 0.75, buckets become overcrowded, degrading lookups towards O(n). Resizing doubles table capacity and rehashes items to restore O(1) speed."
    },
    {
      id: "hs-q6",
      difficulty: "Interview",
      question: "In LeetCode 217 (Contains Duplicate), why is a Set solution optimal compared to sorting?",
      options: [
        "A. Set takes O(n) time with early exit on the first duplicate, whereas sorting takes O(n log n)",
        "B. Sorting does not detect duplicates",
        "C. Set uses O(1) space while sorting uses O(n) space",
        "D. Sorting cannot handle negative numbers"
      ],
      answer: "A",
      explanation: "A Hash Set scans the array in linear O(n) time and can terminate immediately the moment a duplicate is encountered, beating the O(n log n) sorting cost."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the time complexity of set.has(val) in JavaScript?",
      options: [
        "A. O(1) average case",
        "B. O(log n)",
        "C. O(n)",
        "D. O(n²)"
      ],
      answer: "A",
      explanation: "A Set is backed by a hash table, providing O(1) average-time membership checks."
    },
    {
      question: "Q2. What does new Set([1, 1, 2, 2, 3]).size evaluate to?",
      options: ["A. 5", "B. 3", "C. 2", "D. undefined"],
      answer: "B",
      explanation: "Duplicates are removed during initialization, leaving unique values {1, 2, 3} with a size of 3."
    }
  ],

  predictOutput: [
    {
      code: "const set = new Set();\nset.add(1).add(2).add(1);\nconsole.log(set.size);",
      options: ["3", "2", "1", "TypeError"],
      answer: "2",
      explanation: "The second add(1) is ignored because 1 is already in the set. Unique items: {1, 2}."
    },
    {
      code: "const set = new Set();\nset.add({ a: 1 });\nset.add({ a: 1 });\nconsole.log(set.size);",
      options: ["1", "2", "undefined", "TypeError"],
      answer: "2",
      explanation: "Each object literal `{ a: 1 }` has a different reference in memory, so both are considered distinct by the Set."
    }
  ],

  practice: [
    {
      q: "How does a Hash Set discard duplicate values?",
      a: "When inserting an element, the Set computes its hash index. If that bucket already contains an element with identical value (SameValueZero equality), insertion is aborted."
    },
    {
      q: "What is the difference between Separate Chaining and Linear Probing?",
      a: "Separate Chaining stores colliding elements in a linked list at the same bucket slot. Linear Probing stores all elements directly in the table array and probes adjacent slots until finding an empty cell."
    },
    {
      q: "What is Rehashing?",
      a: "When a hash table's load factor exceeds a threshold, a new larger array (typically double size) is created and all existing elements are re-inserted using the new array length."
    }
  ],

  leetcodePractice: {
    showProcessCallout: true,
    problems: [
      {
        num: 217,
        slug: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        whyThisOrder: "The quintessential Hash Set problem. Learn how O(1) membership checks beat brute-force and sorting."
      },
      {
        num: 349,
        slug: "intersection-of-two-arrays",
        title: "Intersection of Two Arrays",
        difficulty: "Easy",
        whyThisOrder: "Direct practice of mathematical Set intersection using `new Set()` and `.has()`."
      },
      {
        num: 202,
        slug: "happy-number",
        title: "Happy Number",
        difficulty: "Easy",
        whyThisOrder: "Use a Set to detect infinite cycle loops in digit-square sum sequences."
      },
      {
        num: 128,
        slug: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        whyThisOrder: "Store numbers in a Set for O(1) lookups to find consecutive sequences in optimal O(n) time."
      }
    ]
  }
};
