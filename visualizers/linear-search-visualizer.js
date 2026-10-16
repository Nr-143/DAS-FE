/**
 * OneStep Journey — Linear Search Interactive Visualizer
 * ────────────────────────────────────────────────────────
 * Implements full step-by-step execution flow for Linear Search:
 * - Synchronized array cell animation, active pointers, comparison results,
 *   step explanations, variable badges, and line-by-line code highlighting.
 * - Preset scenarios: Default sample (target 6), Best Case (target 8),
 *   Worst Case (target 5), Target Not Found (target 99), Empty Array ([]).
 * - Custom Array & Target input support with validation.
 * - Speed controls (Slow / Normal / Fast), Play / Pause / Step / Prev / Reset.
 */

(function () {
  const DEFAULT_ARRAY = [8, 3, 7, 4, 2, 6, 1, 5];
  const DEFAULT_TARGET = 6;

  const CODE_LINES = [
    'function linearSearch(arr, target) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    if (arr[i] === target) {',
    '      return i;',
    '    }',
    '  }',
    '',
    '  return -1;',
    '}'
  ];

  function getScenarios() {
    return [
      { id: 'sample', label: '1. Sample (Target 6 @ idx 5)', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
      { id: 'best-case', label: '2. Best Case (Target 8 @ idx 0)', icon: '<iconify-icon icon="lucide:zap"></iconify-icon>' },
      { id: 'worst-case', label: '3. Worst Case (Target 5 @ idx 7)', icon: '<iconify-icon icon="lucide:hourglass"></iconify-icon>' },
      { id: 'not-found', label: '4. Target Not Found (Target 99)', icon: '<iconify-icon icon="lucide:search-x"></iconify-icon>' },
      { id: 'empty-array', label: '5. Empty Array ([])', icon: '<iconify-icon icon="lucide:slash"></iconify-icon>' },
      { id: 'custom', label: '6. Custom Array & Target', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
    ];
  }

  /**
   * Generates discrete execution steps for Linear Search.
   */
  function generateLinearSearchSteps(arr, target) {
    const steps = [];
    const n = arr.length;

    // Handle Empty Array
    if (n === 0) {
      steps.push({
        desc: `Array is empty (<code>length = 0</code>). Loop condition <code>i < arr.length</code> is immediately false. Target <strong>${target}</strong> cannot exist.`,
        codeLine: 2,
        vars: { i: 0, length: 0, target, comparisons: 0, status: 'Empty Array' },
        array: [],
        currentIndex: -1,
        checkedIndices: [],
        foundIndex: -1,
        cmpResult: null,
        comparisons: 0,
        output: null
      });

      steps.push({
        desc: `Execution reaches line 8: <code>return -1</code>. Returning <strong>-1</strong> indicates the target was not found in the array.`,
        codeLine: 8,
        vars: { length: 0, target, comparisons: 0, status: 'Not Found', result: -1 },
        array: [],
        currentIndex: -1,
        checkedIndices: [],
        foundIndex: -1,
        cmpResult: null,
        comparisons: 0,
        output: -1
      });

      return {
        code: CODE_LINES,
        steps,
        complexity: 'O(1) Empty Array | O(1) Space',
        target,
        array: []
      };
    }

    // Step 0: Ready state
    steps.push({
      desc: `Initialize Linear Search: Searching for target <strong>${target}</strong> in an unsorted array of ${n} elements. Linear Search inspects elements sequentially from left to right.`,
      codeLine: 1,
      vars: { i: 'not started', 'arr.length': n, target, comparisons: 0, status: 'Ready' },
      array: [...arr],
      currentIndex: -1,
      checkedIndices: [],
      foundIndex: -1,
      cmpResult: null,
      comparisons: 0,
      output: null
    });

    let comparisons = 0;
    const checked = [];
    let foundIndex = -1;

    for (let i = 0; i < n; i++) {
      comparisons++;
      const currentVal = arr[i];
      const isMatch = currentVal === target;

      // Loop evaluation / Index advance
      steps.push({
        desc: `Loop iteration: Set index <code>i = ${i}</code>. Checking bounds <code>${i} < ${n}</code> (true). Preparing to inspect element <code>arr[${i}]</code>.`,
        codeLine: 2,
        vars: { i, 'arr[i]': currentVal, target, comparisons, 'i < length': true },
        array: [...arr],
        currentIndex: i,
        checkedIndices: [...checked],
        foundIndex: -1,
        cmpResult: { left: currentVal, op: '===', right: target, result: isMatch },
        comparisons,
        output: null
      });

      // Comparison step
      if (isMatch) {
        checked.push(i);
        foundIndex = i;

        // Line 3: if check
        steps.push({
          desc: `Comparison at index <strong>${i}</strong>: <code>arr[${i}] (${currentVal}) === target (${target})</code> is <strong style="color:#10B981;">TRUE ✓</strong>! Target found!`,
          codeLine: 3,
          vars: { i, 'arr[i]': currentVal, target, match: true, comparisons },
          array: [...arr],
          currentIndex: i,
          checkedIndices: [...checked],
          foundIndex: i,
          cmpResult: { left: currentVal, op: '===', right: target, result: true },
          comparisons,
          output: null
        });

        // Line 4: return i
        steps.push({
          desc: `Success! Target <strong>${target}</strong> found at index <strong>${i}</strong> in <strong>${comparisons} comparison${comparisons === 1 ? '' : 's'}</strong>. Returning index <code>${i}</code>.`,
          codeLine: 4,
          vars: { i, returnedIndex: i, comparisons, status: 'Target Found' },
          array: [...arr],
          currentIndex: i,
          checkedIndices: [...checked],
          foundIndex: i,
          cmpResult: { left: currentVal, op: '===', right: target, result: true },
          comparisons,
          output: i
        });
        break;
      } else {
        checked.push(i);
        steps.push({
          desc: `Comparison at index <strong>${i}</strong>: <code>arr[${i}] (${currentVal}) === target (${target})</code> is <strong style="color:#EF4444;">FALSE ✗</strong> (${currentVal} !== ${target}). Values do not match. Advancing to next element.`,
          codeLine: 3,
          vars: { i, 'arr[i]': currentVal, target, match: false, comparisons },
          array: [...arr],
          currentIndex: i,
          checkedIndices: [...checked],
          foundIndex: -1,
          cmpResult: { left: currentVal, op: '===', right: target, result: false },
          comparisons,
          output: null
        });
      }
    }

    // Target not found after scanning all elements
    if (foundIndex === -1) {
      steps.push({
        desc: `Loop finished: Reached end of array (<code>i = ${n}</code>). All <strong>${n} elements</strong> were checked, but target <strong>${target}</strong> was not found.`,
        codeLine: 6,
        vars: { i: n, 'arr.length': n, target, comparisons, status: 'Exhausted' },
        array: [...arr],
        currentIndex: -1,
        checkedIndices: [...checked],
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: null
      });

      steps.push({
        desc: `Execution reaches line 8: <code>return -1</code>. Returning <strong>-1</strong> signifies that target <strong>${target}</strong> does not exist in the array.`,
        codeLine: 8,
        vars: { target, comparisons, finalResult: -1, status: 'Not Found' },
        array: [...arr],
        currentIndex: -1,
        checkedIndices: [...checked],
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: -1
      });
    }

    const complexity = foundIndex === 0
      ? 'O(1) Best Case (1 comparison) | O(1) Space'
      : (foundIndex === n - 1 || foundIndex === -1
        ? `O(n) Worst Case (${comparisons} comparisons) | O(1) Space`
        : `O(n) Average Case (${comparisons} comparisons) | O(1) Space`);

    return {
      code: CODE_LINES,
      steps,
      complexity,
      target,
      array: [...arr]
    };
  }

  /**
   * Renders the custom visual stage for Linear Search.
   */
  function renderLinearSearchVisual(container, step, target) {
    if (!container || !step) return;
    const arr = step.array || [];

    // Empty array render
    if (arr.length === 0) {
      container.innerHTML = `
        <div class="search-visual-box">
          <div class="search-meta-strip">
            <span class="search-meta-pill">Target: <strong>${target}</strong></span>
            <span class="search-meta-pill">Input: <strong>Empty Array ([])</strong></span>
            <span class="search-meta-pill">Length: <strong>0</strong></span>
          </div>
          <div class="search-empty-state">
            <iconify-icon icon="lucide:alert-circle" width="28" height="28" style="color:var(--text-muted);"></iconify-icon>
            <p>Array is empty. Linear Search has no elements to compare and returns -1 immediately.</p>
          </div>
        </div>
      `;
      return;
    }

    // Cells track
    const cellsHtml = arr.map((val, idx) => {
      const isCurrent = idx === step.currentIndex;
      const isFound = idx === step.foundIndex;
      const isChecked = step.checkedIndices && step.checkedIndices.includes(idx) && !isFound;

      let cellClass = 'array-cell';
      let tagHtml = '';
      let pointerHtml = '';

      if (isFound) {
        cellClass += ' array-cell--read search-cell--found';
        tagHtml = '<span class="cell-tag search-tag--match">MATCH ✓</span>';
        pointerHtml = '<div class="search-pointer search-pointer--found"><iconify-icon icon="lucide:arrow-down"></iconify-icon> FOUND</div>';
      } else if (isCurrent) {
        cellClass += ' array-cell--highlight search-cell--current';
        tagHtml = '<span class="cell-tag search-tag--current">COMPARING</span>';
        pointerHtml = '<div class="search-pointer search-pointer--active"><iconify-icon icon="lucide:arrow-down"></iconify-icon> i = ' + idx + '</div>';
      } else if (isChecked) {
        cellClass += ' search-cell--checked';
        tagHtml = '<span class="cell-tag search-tag--checked">✗ CHECKED</span>';
      } else {
        tagHtml = '<span class="cell-tag search-tag--pending">PENDING</span>';
      }

      return `
        <div class="array-cell-wrapper" data-idx="${idx}">
          <div class="search-pointer-slot">${pointerHtml}</div>
          <div class="array-idx-label">[${idx}]</div>
          <div class="${cellClass}">
            <span class="cell-value">${val}</span>
            ${tagHtml}
          </div>
        </div>
      `;
    }).join('');

    // Comparison pill / live expression
    let cmpHtml = '';
    if (step.cmpResult) {
      const isMatch = step.cmpResult.result;
      const color = isMatch ? '#10B981' : '#EF4444';
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:${color};">
          <span class="search-cmp-label">Current Comparison:</span>
          <div class="search-cmp-expr">
            <span class="search-cmp-part"><code>arr[${step.currentIndex}]</code> (<strong>${step.cmpResult.left}</strong>)</span>
            <span class="search-cmp-op" style="color:${color}; font-weight:700;">${step.cmpResult.op}</span>
            <span class="search-cmp-part"><code>target</code> (<strong>${step.cmpResult.right}</strong>)</span>
            <span class="search-cmp-arrow" style="color:var(--text-muted);">➔</span>
            <span class="search-cmp-result" style="color:${color}; font-weight:700;">${isMatch ? 'TRUE ✓ MATCH' : 'FALSE ✗'}</span>
          </div>
        </div>
      `;
    } else if (step.foundIndex !== -1) {
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:#10B981; background:rgba(16,185,129,0.12);">
          <span class="search-cmp-label">Result:</span>
          <div class="search-cmp-expr" style="color:#10B981; font-weight:700;">
            ✓ Success: Target ${target} located at index [${step.foundIndex}] after ${step.comparisons} comparisons!
          </div>
        </div>
      `;
    } else if (step.checkedIndices && step.checkedIndices.length === arr.length) {
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:#EF4444; background:rgba(239,68,68,0.08);">
          <span class="search-cmp-label">Result:</span>
          <div class="search-cmp-expr" style="color:#EF4444; font-weight:700;">
            ✗ Target ${target} not found after checking all ${arr.length} elements. Returns -1.
          </div>
        </div>
      `;
    } else {
      cmpHtml = `
        <div class="search-cmp-card">
          <span class="search-cmp-label">Status:</span>
          <div class="search-cmp-expr">Press <strong>Play</strong> or <strong>Step</strong> to begin linear scan. Target = <strong>${target}</strong></div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="search-visual-box">
        <div class="search-meta-strip">
          <span class="search-meta-pill">Target: <strong>${target}</strong></span>
          <span class="search-meta-pill">Length: <strong>${arr.length}</strong></span>
          <span class="search-meta-pill">Comparisons: <strong>${step.comparisons || 0}</strong></span>
          <span class="search-meta-pill">Order: <strong>Unsorted / Any</strong></span>
        </div>

        <div class="search-track-outer">
          <div class="array-cells-track">
            ${cellsHtml}
          </div>
        </div>
        ${arr.length > 4 ? `
          <div class="search-scroll-hint">
            <iconify-icon icon="lucide:arrow-right-left" width="13" height="13"></iconify-icon>
            <span>Scroll horizontally to view all ${arr.length} elements</span>
          </div>
        ` : ''}

        ${cmpHtml}
      </div>
    `;

    // Auto-scroll track so active/found cell is always centered and visible on any screen width
    setTimeout(() => {
      const trackOuter = container.querySelector('.search-track-outer');
      if (!trackOuter) return;
      const activeCell = container.querySelector('.search-cell--current, .search-cell--found');
      if (activeCell) {
        const wrapperEl = activeCell.closest('.array-cell-wrapper') || activeCell;
        try {
          wrapperEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {
          const cellLeft = wrapperEl.offsetLeft;
          const cellWidth = wrapperEl.offsetWidth;
          const trackWidth = trackOuter.clientWidth;
          const scrollTarget = cellLeft - (trackWidth / 2) + (cellWidth / 2);
          trackOuter.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
        }
      } else {
        trackOuter.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 20);
  }

  /**
   * Main mount function for Linear Search
   */
  function mountLinearSearchVisualizer(container) {
    container.innerHTML = '';
    const operations = getScenarios();
    let currentOpId = 'sample';
    let currentArray = [...DEFAULT_ARRAY];
    let currentTarget = DEFAULT_TARGET;

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Linear Search: Sequential Array Inspection Visualizer',
      operations
    });

    // Custom controls toolbar addition for custom array & target
    const customBar = document.createElement('div');
    customBar.className = 'search-custom-bar';
    customBar.style.display = 'none';
    customBar.innerHTML = `
      <div class="search-custom-inputs">
        <label class="search-input-group">
          <span>Array (comma-separated):</span>
          <input type="text" id="linear-custom-arr" class="widget-input" value="8, 3, 7, 4, 2, 6, 1, 5" style="width:100%; max-width:240px;" />
        </label>
        <label class="search-input-group">
          <span>Target:</span>
          <input type="number" id="linear-custom-target" class="widget-input" value="6" style="width:75px;" />
        </label>
        <button type="button" class="btn btn--primary" id="btn-linear-apply-custom">Apply & Run</button>
      </div>
    `;
    ui.wrapper.insertBefore(customBar, ui.wrapper.querySelector('.exec-status-panel'));

    let bundle = generateLinearSearchSteps(currentArray, currentTarget);
    let code = bundle.code;

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps: bundle.steps,
      speedMs: 800,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        ui.stepDesc.innerHTML = step.desc;
        window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        renderLinearSearchVisual(ui.visualCanvas, step, currentTarget);

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

    ui.complexityPill.textContent = bundle.complexity;
    player.reset();

    // Standard player event listeners
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

    function loadScenario(opId) {
      currentOpId = opId;
      customBar.style.display = opId === 'custom' ? 'flex' : 'none';

      if (opId === 'sample') {
        currentArray = [8, 3, 7, 4, 2, 6, 1, 5];
        currentTarget = 6;
      } else if (opId === 'best-case') {
        currentArray = [8, 3, 7, 4, 2, 6, 1, 5];
        currentTarget = 8; // index 0 (1 comparison)
      } else if (opId === 'worst-case') {
        currentArray = [8, 3, 7, 4, 2, 6, 1, 5];
        currentTarget = 5; // index 7 (8 comparisons)
      } else if (opId === 'not-found') {
        currentArray = [8, 3, 7, 4, 2, 6, 1, 5];
        currentTarget = 99; // not present
      } else if (opId === 'empty-array') {
        currentArray = [];
        currentTarget = 6;
      } else if (opId === 'custom') {
        // Read custom inputs
        const arrInput = customBar.querySelector('#linear-custom-arr');
        const targetInput = customBar.querySelector('#linear-custom-target');
        const parsed = (arrInput ? arrInput.value : '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        currentArray = parsed.length > 0 ? parsed.slice(0, 20) : [8, 3, 7, 4, 2, 6, 1, 5];
        currentTarget = targetInput ? (parseInt(targetInput.value, 10) || 6) : 6;
      }

      bundle = generateLinearSearchSteps(currentArray, currentTarget);
      code = bundle.code;
      ui.complexityPill.textContent = bundle.complexity;
      player.setSteps(bundle.steps);
    }

    ui.opTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const opId = tab.getAttribute('data-op-id');
        if (opId === currentOpId && opId !== 'custom') return;
        ui.opTabs.forEach(t => t.classList.remove('exec-op-tab--active'));
        tab.classList.add('exec-op-tab--active');
        loadScenario(opId);
      });
    });

    const applyCustomBtn = customBar.querySelector('#btn-linear-apply-custom');
    if (applyCustomBtn) {
      applyCustomBtn.addEventListener('click', () => {
        loadScenario('custom');
      });
    }

    return () => {
      player.destroy();
      container.innerHTML = '';
    };
  }

  window.mountLinearSearchVisualizer = mountLinearSearchVisualizer;
})();

