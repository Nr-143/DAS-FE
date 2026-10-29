/**
 * OneStep Journey — Centralized Topic Configuration
 * ──────────────────────────────────────────────────
 * Defines the single source of truth for which topics are unlocked
 * and which topics remain locked ("Coming Soon").
 */

(function () {
  const UNLOCKED_TOPIC_IDS = new Set([
    // Level 1 — Foundations
    'what-is-dsa',
    'variables-and-memory',
    'primitives',
    'objects',
    'function-calls',
    'recursion',
    'time-complexity',
    'space-complexity',
    'control-flow',
    'core-builtins',
    'es6-plus',

    // Level 2 — Linear Data Structures
    'arrays',
    'strings',
    'linked-list-singly',
    'linked-list-doubly',
    'stack',
    'queue',

    // Level 3 — Searching & Sorting (Unlocked topics 18, 19, 20, 21, 22, 23, 24)
    'linear-search',
    'binary-search',
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',

    // Level 4 — Hashing (Unlocked topics 25, 26)
    'hash-table',
    'hash-set',

    // Level 5 — Trees (Unlocked topics 27, 28, 29, 30)
    'tree-intro',
    'binary-tree-types',
    'binary-tree-traversals',
    'binary-tree-operations',
    'binary-trees',
    'binary-search-tree',
  ]);

  window.TOPIC_CONFIG = {
    unlockedTopicIds: UNLOCKED_TOPIC_IDS,

    isUnlocked(topicId) {
      if (!topicId) return false;
      return UNLOCKED_TOPIC_IDS.has(topicId);
    },

    getUnlockedList() {
      return Array.from(UNLOCKED_TOPIC_IDS);
    }
  };
})();
