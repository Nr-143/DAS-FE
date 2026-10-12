/**
 * OneStep Journey — Strings Interactive Visualizer
 * ──────────────────────────────────────────────────
 * Demonstrates:
 * - Character Access: text[1] -> 'E' (O(1))
 * - Traversal: character-by-character visiting
 * - Search: finding 'L' with comparison highlighting
 * - Substring: slice(1, 4) -> 'ELL'
 * - Replace: building new string ("JELLO")
 * - Concatenation: "HELLO" + " WORLD"
 * - Immutability: why text[0] = 'M' fails silently
 */

(function () {
  const SAMPLE_TEXT = "HELLO";

  function getOperations() {
    return [
      { id: 'access', label: '1. Access text[1]', icon: '<iconify-icon icon="lucide:binary"></iconify-icon>' },
      { id: 'traverse', label: '2. Traverse String', icon: '<iconify-icon icon="lucide:arrow-right"></iconify-icon>' },
      { id: 'search', label: '3. Search "L"', icon: '<iconify-icon icon="lucide:search"></iconify-icon>' },
      { id: 'slice', label: '4. Substring slice(1, 4)', icon: '<iconify-icon icon="lucide:scissors"></iconify-icon>' },
      { id: 'replace', label: '5. Replace "H" → "J"', icon: '<iconify-icon icon="lucide:refresh-cw"></iconify-icon>' },
      { id: 'immutability', label: '6. Immutability Demo', icon: '<iconify-icon icon="lucide:shield-check"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'access') {
      const code = [
        'const text = "HELLO";',
        '// Direct character access via zero-based index',
        'const char = text[1]; // O(1) Instant read',
        'console.log(char); // "E"'
      ];
      const steps = [
        {
          desc: 'Reading character at index 1 from string <code>"HELLO"</code>.',
          codeLine: 1,
          vars: { index: 1, stringLength: 5 },
          chars: SAMPLE_TEXT.split(''),
          highlightIdx: -1,
          readIdx: -1,
          output: null
        },
        {
          desc: 'Index 1 corresponds to UTF-16 code unit at offset 1: <strong>\'E\'</strong>.',
          codeLine: 3,
          vars: { index: 1, character: 'E', time: 'O(1) Constant Time' },
          chars: SAMPLE_TEXT.split(''),
          highlightIdx: -1,
          readIdx: 1,
          output: "'E'"
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'traverse') {
      const code = [
        'const text = "HELLO";',
        'for (let i = 0; i < text.length; i++) {',
        '  console.log(text[i]);',
        '}'
      ];
      const chars = SAMPLE_TEXT.split('');
      const steps = [
        {
          desc: 'Start traversing string from index <code>i = 0</code> to <code>i = 4</code>.',
          codeLine: 2,
          vars: { i: 0, length: 5 },
          chars,
          visitedIndices: [],
          activeIdx: -1,
          output: '""'
        }
      ];

      const visited = [];
      for (let i = 0; i < chars.length; i++) {
        visited.push(i);
        steps.push({
          desc: `Visiting index <strong>${i}</strong>: character is <strong>'${chars[i]}'</strong>.`,
          codeLine: 3,
          vars: { i, char: chars[i], totalVisited: i + 1 },
          chars,
          visitedIndices: [...visited],
          activeIdx: i,
          output: visited.map(idx => chars[idx]).join('')
        });
      }

      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'search') {
      const target = 'L';
      const code = [
        'function findChar(text, target) {',
        '  for (let i = 0; i < text.length; i++) {',
        '    if (text[i] === target) return i; // found',
        '  }',
        '  return -1;',
        '}'
      ];
      const chars = SAMPLE_TEXT.split('');
      const steps = [
        {
          desc: `Search for target character <strong>'${target}'</strong> in <code>"${SAMPLE_TEXT}"</code>.`,
          codeLine: 1,
          vars: { target: 'L', index: 0 },
          chars,
          activeIdx: -1,
          foundIdx: -1,
          output: null
        },
        {
          desc: `Compare index 0: <code>'${chars[0]}' !== '${target}'</code>. Move forward.`,
          codeLine: 3,
          vars: { i: 0, current: chars[0], target: 'L', match: false },
          chars,
          activeIdx: 0,
          foundIdx: -1,
          output: null
        },
        {
          desc: `Compare index 1: <code>'${chars[1]}' !== '${target}'</code>. Move forward.`,
          codeLine: 3,
          vars: { i: 1, current: chars[1], target: 'L', match: false },
          chars,
          activeIdx: 1,
          foundIdx: -1,
          output: null
        },
        {
          desc: `Compare index 2: <code>'${chars[2]}' === '${target}'</code>. <strong>Match found!</strong> Return index 2.`,
          codeLine: 3,
          vars: { i: 2, current: chars[2], target: 'L', match: true, time: 'O(n) Worst-case' },
          chars,
          activeIdx: -1,
          foundIdx: 2,
          output: 'Index: 2'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'slice') {
      const code = [
        'const text = "HELLO";',
        '// slice(startIdx, endIdxExclusive)',
        'const sub = text.slice(1, 4); // indices 1, 2, 3',
        'console.log(sub); // "ELL"'
      ];
      const chars = SAMPLE_TEXT.split('');
      const steps = [
        {
          desc: 'Extracting substring from index 1 up to index 4 (exclusive).',
          codeLine: 1,
          vars: { start: 1, end: 4, fullText: 'HELLO' },
          chars,
          sliceIndices: [],
          output: null
        },
        {
          desc: 'Selecting character indices: [1] (\'E\'), [2] (\'L\'), [3] (\'L\'). Index 4 (\'O\') is excluded.',
          codeLine: 3,
          vars: { start: 1, end: 4, includedCount: 3 },
          chars,
          sliceIndices: [1, 2, 3],
          output: null
        },
        {
          desc: 'A <strong>new string</strong> <code>"ELL"</code> is allocated in memory. Original <code>"HELLO"</code> remains unchanged.',
          codeLine: 4,
          vars: { newString: 'ELL', originalIntact: true, time: 'O(k) where k = slice length' },
          chars,
          sliceIndices: [1, 2, 3],
          output: '"ELL"'
        }
      ];
      return { code, steps, complexity: 'O(k) Time | O(k) Space' };
    }

    if (opId === 'replace') {
      const code = [
        'const text = "HELLO";',
        '// Strings are immutable: Cannot do text[0] = "J"',
        '// Must build a NEW string with slice / replace',
        'const newText = "J" + text.slice(1); // "JELLO"'
      ];
      const chars = SAMPLE_TEXT.split('');
      const steps = [
        {
          desc: 'Goal: Replace initial character <strong>\'H\'</strong> with <strong>\'J\'</strong> to form <code>"JELLO"</code>.',
          codeLine: 1,
          vars: { original: 'HELLO', targetChar: 'H', replacement: 'J' },
          chars,
          output: null
        },
        {
          desc: 'Slice remaining suffix from index 1: <code>text.slice(1)</code> yields <code>"ELLO"</code>.',
          codeLine: 4,
          vars: { suffix: 'ELLO' },
          chars,
          sliceIndices: [1, 2, 3, 4],
          output: null
        },
        {
          desc: 'Concatenate replacement + suffix: <code>"J" + "ELLO"</code> allocates new string <code>"JELLO"</code>.',
          codeLine: 4,
          vars: { resultString: 'JELLO', originalUnchanged: 'HELLO' },
          chars: ['J', 'E', 'L', 'L', 'O'],
          highlightIdx: 0,
          output: '"JELLO"'
        }
      ];
      return { code, steps, complexity: 'O(n) Time | O(n) Space' };
    }

    if (opId === 'immutability') {
      const code = [
        'let text = "HELLO";',
        'text[0] = "M"; // In JavaScript, this fails SILENTLY!',
        'console.log(text); // STILL "HELLO" (not "MELLO")',
        '// Primitives in JS cannot be mutated in place.'
      ];
      const chars = SAMPLE_TEXT.split('');
      const steps = [
        {
          desc: 'Demonstrating Immutability: Attempting in-place modification <code>text[0] = "M"</code>.',
          codeLine: 1,
          vars: { text: 'HELLO', attemptedChar: 'M' },
          chars,
          mutationAttempt: null,
          output: '"HELLO"'
        },
        {
          desc: 'Executing assignment: <code>text[0] = "M"</code>. Notice that JavaScript does NOT throw an error, but ignores the assignment!',
          codeLine: 2,
          vars: { attemptedIndex: 0, attemptedValue: 'M', mutated: false },
          chars,
          mutationAttempt: { idx: 0, attemptedVal: 'M' },
          output: null
        },
        {
          desc: 'Inspection: Value at index 0 remains <strong>\'H\'</strong>! Strings are primitive and immutable in JavaScript memory.',
          codeLine: 3,
          vars: { actualValue: 'HELLO', isImmutable: true },
          chars,
          mutationAttempt: null,
          highlightIdx: 0,
          output: '"HELLO" (Unchanged!)'
        }
      ];
      return { code, steps, complexity: 'O(1) Concept' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;
    const chars = step.chars || [];

    const cellsHtml = chars.map((ch, idx) => {
      let cellClass = 'string-char-cell';
      let tag = '';

      if (idx === step.readIdx) {
        cellClass += ' string-char-cell--read';
        tag = '<span class="cell-tag cell-tag--read">READ</span>';
      } else if (idx === step.foundIdx) {
        cellClass += ' string-char-cell--found';
        tag = '<span class="cell-tag cell-tag--found">MATCH</span>';
      } else if (idx === step.activeIdx) {
        cellClass += ' string-char-cell--active';
        tag = '<span class="cell-tag cell-tag--active">CHECK</span>';
      } else if (step.sliceIndices && step.sliceIndices.includes(idx)) {
        cellClass += ' string-char-cell--slice';
        tag = '<span class="cell-tag cell-tag--slice">SLICE</span>';
      } else if (step.visitedIndices && step.visitedIndices.includes(idx)) {
        cellClass += ' string-char-cell--visited';
        tag = '<span class="cell-tag cell-tag--visited">SEEN</span>';
      } else if (idx === step.highlightIdx) {
        cellClass += ' string-char-cell--highlight';
        tag = '<span class="cell-tag cell-tag--highlight">NEW</span>';
      }

      return `
        <div class="string-char-wrapper">
          <div class="string-idx-label">[${idx}]</div>
          <div class="${cellClass}">
            <span class="char-val">"${ch}"</span>
            ${tag}
          </div>
          <div class="char-code">U+00${ch.charCodeAt(0).toString(16).toUpperCase()}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="string-visual-container">
        <div class="string-meta-strip">
          <span class="string-meta-pill">Length: <strong>${chars.length}</strong> chars</span>
          <span class="string-meta-pill">Primitive: <strong>Immutable</strong></span>
          <span class="string-meta-pill">Encoding: <strong>UTF-16</strong></span>
        </div>
        <div class="string-cells-track">
          ${cellsHtml}
        </div>
        ${step.mutationAttempt ? `
          <div class="string-mutation-warning">
            <iconify-icon icon="lucide:shield-alert" width="16" height="16" style="vertical-align:middle;margin-right:6px;"></iconify-icon> <strong>Immutability Guard:</strong> Attempted <code>text[${step.mutationAttempt.idx}] = "${step.mutationAttempt.attemptedVal}"</code> was blocked by the JavaScript runtime! Direct property assignment on strings is prohibited.
          </div>
        ` : ''}
      </div>
    `;
  }

  function mountStringVisualizer(container) {
    container.innerHTML = '';
    const operations = getOperations();
    let currentOpId = 'access';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'String Operations & Immutability Visualizer',
      operations
    });

    let { code, steps, complexity } = generateSteps(currentOpId);

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderVisual(ui.visualCanvas, step);

        if (step.output !== null && step.output !== undefined) {
          ui.outputCard.style.display = 'flex';
          ui.outputVal.textContent = String(step.output);
        } else {
          ui.outputCard.style.display = 'none';
        }
      },
      onPlayStateChange: (isPlaying) => {
        window.ExecutionEngine.updatePlayBtn(ui.playBtn, isPlaying);
      }
    });

    ui.complexityPill.textContent = complexity;
    player.reset();

    ui.playBtn.addEventListener('click', () => {
      if (player.isPlaying) player.pause();
      else player.play();
    });

    ui.stepBtn.addEventListener('click', () => player.stepForward());
    ui.stepBackBtn.addEventListener('click', () => player.stepBackward());
    ui.resetBtn.addEventListener('click', () => player.reset());

    ui.speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ui.speedBtns.forEach(b => b.classList.remove('exec-speed-btn--active'));
        btn.classList.add('exec-speed-btn--active');
        player.setSpeed(parseInt(btn.getAttribute('data-speed'), 10));
      });
    });

    ui.opTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const opId = tab.getAttribute('data-op-id');
        if (opId === currentOpId) return;
        currentOpId = opId;
        ui.opTabs.forEach(t => t.classList.remove('exec-op-tab--active'));
        tab.classList.add('exec-op-tab--active');

        const bundle = generateSteps(currentOpId);
        code = bundle.code;
        ui.complexityPill.textContent = bundle.complexity;
        player.setSteps(bundle.steps);
      });
    });

    return () => {
      player.destroy();
      container.innerHTML = '';
    };
  }

  window.mountStringVisualizer = mountStringVisualizer;
})();
