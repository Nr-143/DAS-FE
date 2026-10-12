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

    // Non-Linear Data Structures (Level 5 Trees & Level 6 Graphs)
    'binary-trees',
    'binary-search-tree',
    'graph-representation',
    'breadth-first-search',
    'depth-first-search'
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
