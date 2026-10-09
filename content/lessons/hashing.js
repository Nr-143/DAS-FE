/**
 * DSA Tracker — Lesson Content: Hashing (Level 4)
 * Covers: Hash Table / Hash Map & Hash Set & Collision Handling
 */

window.LESSONS_CONTENT = window.LESSONS_CONTENT || {};

// Hash Table / Hash Map
window.LESSONS_CONTENT["hash-table"] = {
  id: "hash-table",
  title: "Hash Table / Hash Map",
  levelTitle: "Level 4 — Hashing",
  summary: "Master key-value mapping, hash functions, and O(1) average-time lookups using Hash Tables.",

  definitions: [
    {
      term: "Hash Table",
      def: "A data structure that stores key-value pairs by using a hash function to map keys to bucket indices."
    },
    {
      term: "Hash Function",
      def: "A function that takes an arbitrary key and converts it into an integer index within an array."
    },
    {
      term: "O(1) Average Lookup",
      def: "Because the hash function directly computes the array index, retrieving or updating values takes constant time on average."
    }
  ],

  howItWorksTogether: "Hash tables store items in array slots based on a hash code computed from the key. When you look up a key, the hash function computes the index instantly instead of scanning elements sequentially.",
  whyMatters: "Hash tables power dictionary lookups, caching, database indexing, and countless interview problems like Two Sum.",

  workedExample: {
    title: "Hash Map Implementation & Usage",
    primitiveText: "<strong>Basic Operations:</strong><br/><code>const map = new Map();<br/>map.set(\"apple\", 5); // O(1) insertion<br/>map.get(\"apple\");   // 5 - O(1) lookup<br/>map.has(\"apple\");   // true<br/>map.delete(\"apple\"); // O(1) removal</code>"
  },

  codeSnippet: `class SimpleHashMap {
  constructor(size = 16) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const item = bucket.find(p => p[0] === key);
    if (item) item[1] = value;
    else bucket.push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    const item = this.buckets[idx].find(p => p[0] === key);
    return item ? item[1] : undefined;
  }
}`,

  complexityNotes: [
    "Insertion: O(1) average, O(n) worst-case (all collisions).",
    "Lookup: O(1) average, O(n) worst-case.",
    "Deletion: O(1) average, O(n) worst-case.",
    "Space: O(n) to store n key-value pairs."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Poor hash functions",
      desc: "Hash functions that distribute keys unevenly cause clustering and high collision rates."
    },
    {
      title: "Mistake 2: Assuming O(1) is guaranteed",
      desc: "In worst-case scenarios where every key hashes to the same index, lookup degrades to O(n)."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is the average time complexity of looking up a key in a Hash Map?",
      options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n²)"],
      answer: "A",
      explanation: "A Hash Map provides O(1) average time complexity for lookups."
    }
  ],

  practice: [
    {
      q: "Why is a Hash Map better than an Array for searching key-value data?",
      a: "An array requires scanning every element in O(n) time, whereas a Hash Map computes the index directly in O(1) time."
    }
  ]
};

// Hash Set & Collision Handling
window.LESSONS_CONTENT["hash-set"] = {
  id: "hash-set",
  title: "Hash Set & Collision Handling",
  levelTitle: "Level 4 — Hashing",
  summary: "Learn how Hash Sets store unique elements and how collisions are resolved using Separate Chaining and Open Addressing.",

  definitions: [
    {
      term: "Hash Set",
      def: "A collection of unique values backed by a hash table."
    },
    {
      term: "Hash Collision",
      def: "When two distinct keys produce the exact same hash index."
    },
    {
      term: "Separate Chaining",
      def: "Resolving collisions by storing colliding elements in a linked list or array at that bucket index."
    },
    {
      term: "Open Addressing",
      def: "Resolving collisions by probing for the next available slot in the array (e.g. Linear Probing)."
    }
  ],

  howItWorksTogether: "When a collision occurs, separate chaining appends the new key-value pair to a list at that bucket, while open addressing searches for an open slot in the hash table.",
  whyMatters: "Understanding collision handling explains why load factors and resizing matter for real-world performance.",

  workedExample: {
    title: "Set Operations & Duplicate Detection",
    primitiveText: "<code>const set = new Set([1, 2, 3, 2, 1]);<br/>console.log(set); // Set(3) {1, 2, 3}<br/>set.has(2); // true (O(1) check)</code>"
  },

  codeSnippet: `// Separate Chaining Hash Set
class HashSet {
  constructor(size = 10) {
    this.buckets = Array.from({ length: size }, () => []);
  }

  _hash(val) {
    return Math.abs(String(val).split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % this.buckets.length;
  }

  add(val) {
    const idx = this._hash(val);
    if (!this.buckets[idx].includes(val)) {
      this.buckets[idx].push(val);
    }
  }

  has(val) {
    const idx = this._hash(val);
    return this.buckets[idx].includes(val);
  }
}`,

  complexityNotes: [
    "Add: O(1) average.",
    "Has: O(1) average.",
    "Delete: O(1) average."
  ],

  commonMistakes: [
    {
      title: "Mistake 1: Not resizing when load factor gets high",
      desc: "If the table is 90% full, collisions skyrocket. Tables should resize (rehash) when load factor exceeds ~0.75."
    }
  ],

  miniQuiz: [
    {
      question: "Q1. What is separate chaining?",
      options: [
        "A. Storing colliding elements in a list at the bucket index",
        "B. Deleting duplicate elements",
        "C. Sorting elements by key",
        "D. Using multiple hash functions"
      ],
      answer: "A",
      explanation: "Separate chaining stores all elements hashing to the same bucket inside a list or array at that bucket."
    }
  ],

  practice: [
    {
      q: "How does a Set remove duplicate elements from an array?",
      a: "By computing the hash for each element and inserting it only if the hash bucket does not already contain that value."
    }
  ]
};
