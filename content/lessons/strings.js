/**
 * DSA Tracker — Lesson Content: Strings (Level 2)
 * ────────────────────────────────────────────────
 * Comprehensive interactive module: Concept, Immutability, Operations,
 * Character Encoding, String Visualizer integration, and Practice.
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

window.LESSONS_CONTENT["strings"] = {
  id: "strings",
  title: "Strings",
  levelTitle: "Level 2 — Linear Data Structures",
  summary: "Master string immutability, zero-based character indexing, O(1) character access, why strings differ from arrays, and how to build large strings without O(n²) performance pitfalls.",

  definitions: [
    {
      term: "String",
      def: "An ordered, indexed sequence of characters encoded as 16-bit integers (UTF-16 code units in JavaScript)."
    },
    {
      term: "String Immutability",
      def: "In JavaScript, strings are primitive values and are immutable — once created in memory, individual characters can never be modified, added, or deleted in place. Any string method that seems to 'change' text actually allocates a brand-new string object."
    },
    {
      term: "Character Access & Code Points",
      def: "Accessing <code>str[i]</code> or <code>str.charAt(i)</code> returns the character at zero-based offset <code>i</code> in O(1) time."
    },
    {
      term: "String vs. Array Distinction",
      def: "While both strings and arrays have a <code>.length</code> and support index access, arrays are mutable reference objects on the heap with methods like <code>push()</code> and <code>splice()</code>, whereas strings are immutable primitives where <code>s[0] = 'X'</code> fails silently."
    },
    {
      term: "Repeated Concatenation (+ vs. Array.join)",
      def: "Because strings are immutable, repeatedly appending with <code>+=</code> inside a loop forces the engine to allocate a new buffer and copy all previous characters each time, degrading total time to O(n²). Collecting parts in an array and calling <code>.join('')</code> runs in linear O(n) time."
    }
  ],

  howItWorksTogether: "Because strings are immutable primitives in JavaScript, attempting direct index assignment like <code>text[0] = 'M'</code> is silently ignored by the JavaScript engine in non-strict mode (or throws a TypeError in strict mode). To change or transform text, algorithms extract slices, replace tokens, or build arrays of characters, allocating a new string at completion. Knowing this memory model prevents costly O(n²) string construction loops in algorithmic challenges.",

  whyMatters: "Text parsing, pattern matching, URL manipulation, tokenization, serialization (JSON), and two-pointer palindrome validation all center around string mechanics. In technical interviews, string problems frequently test your ability to work around immutability efficiently.",

  interactiveWidget: "string-visualizer",

  workedExample: {
    title: "String Operations & Immutability Trace",
    primitiveText: "<code>const text = 'HELLO';<br/><br/>// 1. Character Access: text[1] → 'E' (O(1))<br/>// 2. Traversal: visit indices 0..4<br/>// 3. Search: text.indexOf('L') → 2 (O(n))<br/>// 4. Substring: text.slice(1, 4) → 'ELL' (O(k))<br/>// 5. Direct Mutation Attempt: text[0] = 'M'; // FAILS SILENTLY! text is still 'HELLO'<br/>// 6. Valid Replacement: 'J' + text.slice(1) → 'JELLO' (Allocates new string)</code>",
    referenceText: "Strings cannot be modified in place. Any transformed string is a distinct memory allocation."
  },

  codeSnippet: `// String Operations in JavaScript
const text = "HELLO";

// 1. Character Access — O(1)
const char = text[1]; // "E"

// 2. Traversal — O(n)
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}

// 3. Search Character / Substring — O(n)
const foundIndex = text.indexOf("L"); // 2

// 4. Substring Extraction — O(k)
const sub = text.slice(1, 4); // "ELL"

// 5. Immutability Demonstration
text[0] = "M"; // Silently does nothing! text remains "HELLO"

// 6. Safe Replacement (produces NEW string) — O(n)
const modified = "J" + text.slice(1); // "JELLO"

// 7. Efficient Large String Construction — O(n) total
const parts = [];
for (let i = 0; i < 5; i++) parts.push("X");
const result = parts.join(""); // "XXXXX"`,

  complexityNotes: [
    "Character Access by Index (s[i]): O(1) Constant Time.",
    "String Length (s.length): O(1) Constant Time.",
    "Search (indexOf / includes): O(n) Linear Time.",
    "Substring / slice(start, end): O(k) Time and Space where k is slice length.",
    "Concatenation (a + b): O(a.length + b.length) Time and Space.",
    "Repeated += in Loop: Can degrade to O(n²) Quadratic Time.",
    "Array.join(''): O(n) Linear Time."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Trying to Mutate a Character with Index Assignment",
      desc: "Writing <code>str[0] = 'A'</code> does NOT throw an error in standard JavaScript, but it silently fails and leaves the string unchanged. You must use <code>slice()</code>, <code>replace()</code>, or convert to an array using <code>str.split('')</code>."
    },
    {
      title: "Mistake 2: Building Long Strings with += in a Loop",
      desc: "Each <code>+=</code> copies the entire accumulated string into a new memory location. For 100,000 operations, this produces millions of intermediate character copies. Always push parts into an array and call <code>.join('')</code> at the end."
    },
    {
      title: "Mistake 3: Confusing slice() with substr() / substring()",
      desc: "<code>slice(start, end)</code> takes end index exclusive, supports negative indices (counting backward from end), and is standard modern JavaScript. Avoid deprecated legacy methods like <code>substr()</code>."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What happens in JavaScript when executing: const s = 'cat'; s[0] = 'b'; console.log(s);?",
      options: [
        "A. Outputs 'bat'",
        "B. Outputs 'cat' because strings are immutable",
        "C. Throws a ReferenceError",
        "D. Outputs 'undefined'"
      ],
      answer: "B",
      explanation: "JavaScript strings are primitive and immutable. Index assignment is silently ignored in non-strict mode, leaving 's' as 'cat'."
    },
    {
      question: "Q2. Why is using array.join('') preferred over str += in a large loop?",
      a: "Because strings are immutable, each += creates a new string buffer and copies all previous characters, degrading to O(n²). Array.join('') allocates memory once and copies characters in O(n) linear time.",
      options: [
        "A. Array.join('') is O(n) while repeated += degrades to O(n²)",
        "B. Arrays take less memory than strings",
        "C. += cannot handle non-ASCII characters",
        "D. Array.join() runs on multiple CPU cores"
      ],
      answer: "A",
      explanation: "Repeated concatenation requires copying all characters accumulated so far on every iteration, leading to 1 + 2 + 3 + ... + n = O(n²) operations. Array.join allocates the final buffer once."
    }
  ],

  practice: [
    {
      q: "How can you reverse a string in JavaScript since strings do not have a .reverse() method?",
      a: "Convert the string to an array of characters, reverse the array in-place, and join it back: `str.split('').reverse().join('')`. Alternatively, use a two-pointer loop or build a reversed array manually."
    },
    {
      q: "What is the time complexity of checking if a string of length n is a palindrome using two pointers?",
      a: "O(n) time and O(1) extra space. Start one pointer at index 0 and another at index n - 1. Compare characters moving inward until the pointers meet."
    }
  ],

  challenge: {
    titleText: "Challenge: Valid Palindrome (Ignoring Non-Alphanumeric)",
    desc: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Implement this using two pointers with O(1) auxiliary space!"
  },

  leetcodePractice: {
    showProcessCallout: true,
    suggestedStartingNote: "Start with 125 — Valid Palindrome. Practice two-pointer inward scanning before attempting hash map string problems like Valid Anagram.",
    problems: [
      { num: 125, title: "Valid Palindrome", concept: "Two Pointers", slug: "valid-palindrome", isSuggestedStart: true, roadmapStep: 5, isImmediateNext: true },
      { num: 242, title: "Valid Anagram", concept: "String + Frequency Map", slug: "valid-anagram", roadmapStep: 6 },
      { num: 20, title: "Valid Parentheses", concept: "String + Stack", slug: "valid-parentheses", roadmapStep: 7 },
      { num: 387, title: "First Unique Character in a String", concept: "Frequency Map", slug: "first-unique-character-in-a-string" },
      { num: 14, title: "Longest Common Prefix", concept: "Horizontal / Vertical Scanning", slug: "longest-common-prefix" }
    ]
  }
};
