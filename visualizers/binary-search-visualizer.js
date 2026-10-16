/**
 * OneStep Journey — Binary Search Interactive Visualizer
 * ────────────────────────────────────────────────────────
 * Implements full step-by-step execution flow for Binary Search on sorted data:
 * - Clear visual states: active search range [low..high], animated LOW/HIGH/MID pointers,
 *   discarded elements half-by-half, live comparison cards, and variable badges.
 * - Synchronized line-by-line code execution with the exact iterative JavaScript implementation.
 * - Explanations of why half the search range is eliminated at each step.
 * - Preset scenarios: Sample (target 6), Beginning (target 1), End (target 8),
 *   Middle (target 4 - best case O(1)), Target Not Found (target 9),
 *   Single Element ([42]), Empty Array ([]), and Custom Search with unsorted input validation.
 * - Play / Pause / Step / Prev / Reset / Speed controls (Slow, Normal, Fast).
 */

(function () {
  const DEFAULT_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];
  const DEFAULT_TARGET = 6;

  const CODE_LINES = [
    'function binarySearch(arr, target) {',
    '  let low = 0;',
    '  let high = arr.length - 1;',
    '',
    '  while (low <= high) {',
    '    const mid = Math.floor((low + high) / 2);',
    '',
    '    if (arr[mid] === target) {',
    '      return mid;',
    '    }',
    '',
    '    if (arr[mid] < target) {',
    '      low = mid + 1;',
    '    } else {',
    '      high = mid - 1;',
    '    }',
    '  }',
    '',
    '  return -1;',
    '}'
  ];

  function getScenarios() {
    return [
      { id: 'sample', label: '1. Sample (Target 6 @ idx 5)', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
      { id: 'beginning', label: '2. Beginning (Target 1 @ idx 0)', icon: '<iconify-icon icon="lucide:arrow-left-to-line"></iconify-icon>' },
      { id: 'end', label: '3. End (Target 8 @ idx 7)', icon: '<iconify-icon icon="lucide:arrow-right-to-line"></iconify-icon>' },
      { id: 'middle', label: '4. Middle (Target 4 - Best Case)', icon: '<iconify-icon icon="lucide:target"></iconify-icon>' },
      { id: 'not-found', label: '5. Not Found (Target 9)', icon: '<iconify-icon icon="lucide:search-x"></iconify-icon>' },
      { id: 'single', label: '6. Single Element ([42])', icon: '<iconify-icon icon="lucide:box"></iconify-icon>' },
      { id: 'empty', label: '7. Empty Array ([])', icon: '<iconify-icon icon="lucide:slash"></iconify-icon>' },
      { id: 'custom', label: '8. Custom Array & Target', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
    ];
  }

  function isSortedAscending(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  /**
   * Generates step-by-step execution trace for Binary Search.
   */
  function generateBinarySearchSteps(arr, target) {
    const steps = [];
    const n = arr.length;

    // Handle Empty Array
    if (n === 0) {
      steps.push({
        desc: `Array is empty (<code>arr.length = 0</code>). Initializing <code>low = 0</code>, <code>high = -1</code>.`,
        codeLine: 2,
        vars: { low: 0, high: -1, target, 'low <= high': false, comparisons: 0, status: 'Empty Array' },
        array: [],
        low: 0,
        high: -1,
        mid: -1,
        discarded: [],
        foundIndex: -1,
        cmpResult: null,
        comparisons: 0,
        output: null
      });

      steps.push({
        desc: `While condition <code>low <= high</code> (<code>0 <= -1</code>) evaluates to <strong>false</strong> immediately. Loop does not execute.`,
        codeLine: 5,
        vars: { low: 0, high: -1, target, 'low <= high': false, comparisons: 0, status: 'Terminated' },
        array: [],
        low: 0,
        high: -1,
        mid: -1,
        discarded: [],
        foundIndex: -1,
        cmpResult: null,
        comparisons: 0,
        output: null
      });

      steps.push({
        desc: `Execution reaches line 19: <code>return -1</code>. Returning <strong>-1</strong> indicates the target does not exist.`,
        codeLine: 19,
        vars: { target, comparisons: 0, result: -1, status: 'Not Found' },
        array: [],
        low: 0,
        high: -1,
        mid: -1,
        discarded: [],
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

    // Step 0: Ready & Bounds Initialization
    steps.push({
      desc: `Initialize Binary Search: Input is a <strong>sorted array</strong> of ${n} elements. Setting search range boundaries: <code>low = 0</code> (start), <code>high = ${n - 1}</code> (end). Target is <strong>${target}</strong>.`,
      codeLine: 2,
      vars: { low: 0, high: n - 1, target, comparisons: 0, status: 'Initializing' },
      array: [...arr],
      low: 0,
      high: n - 1,
      mid: -1,
      discarded: [],
      foundIndex: -1,
      cmpResult: null,
      comparisons: 0,
      output: null
    });

    let low = 0;
    let high = n - 1;
    let comparisons = 0;
    let foundIndex = -1;
    let discardedIndices = [];

    while (low <= high) {
      // Step: Check while condition
      steps.push({
        desc: `Check while condition: <code>low <= high</code> (<code>${low} <= ${high}</code>) is <strong>true</strong>. Active search window has <strong>${high - low + 1}</strong> element${high - low + 1 === 1 ? '' : 's'} remaining: indices [${low} .. ${high}].`,
        codeLine: 5,
        vars: { low, high, 'windowSize': high - low + 1, 'low <= high': true, comparisons },
        array: [...arr],
        low,
        high,
        mid: -1,
        discarded: [...discardedIndices],
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: null
      });

      // Calculate midpoint
      const mid = Math.floor((low + high) / 2);
      const midVal = arr[mid];

      steps.push({
        desc: `Calculate midpoint: <code>mid = Math.floor((${low} + ${high}) / 2) = Math.floor(${low + high} / 2) = ${mid}</code>. Middle element is <code>arr[${mid}] = <strong>${midVal}</strong></code>.`,
        codeLine: 6,
        vars: { low, high, mid, 'arr[mid]': midVal, target, formula: `(${low}+${high})/2 = ${mid}` },
        array: [...arr],
        low,
        high,
        mid,
        discarded: [...discardedIndices],
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: null
      });

      comparisons++;

      // Check if arr[mid] === target
      if (midVal === target) {
        foundIndex = mid;

        steps.push({
          desc: `Comparison at line 8: <code>arr[mid] === target</code> (<code>${midVal} === ${target}</code>) is <strong style="color:#10B981;">TRUE ✓</strong>! The middle element matches the target.`,
          codeLine: 8,
          vars: { low, high, mid, 'arr[mid]': midVal, target, comparisons, match: true },
          array: [...arr],
          low,
          high,
          mid,
          discarded: [...discardedIndices],
          foundIndex: mid,
          cmpResult: { left: midVal, op: '===', right: target, result: true },
          comparisons,
          output: null
        });

        steps.push({
          desc: `Success! Target <strong>${target}</strong> found at index <strong>${mid}</strong> in only <strong>${comparisons} comparison${comparisons === 1 ? '' : 's'}</strong>! Returning <code>${mid}</code>.`,
          codeLine: 9,
          vars: { returnedIndex: mid, comparisons, status: 'Target Found' },
          array: [...arr],
          low,
          high,
          mid,
          discarded: [...discardedIndices],
          foundIndex: mid,
          cmpResult: { left: midVal, op: '===', right: target, result: true },
          comparisons,
          output: mid
        });
        break;
      }

      // Check if midVal < target
      if (midVal < target) {
        steps.push({
          desc: `Comparison at line 8 & 12: <code>arr[mid] (${midVal}) === ${target}</code> is <strong>false</strong>. Next check: <code>arr[mid] < target</code> (<code>${midVal} < ${target}</code>) is <strong style="color:#38BDF8;">TRUE</strong>.`,
          codeLine: 12,
          vars: { low, high, mid, 'arr[mid]': midVal, target, 'arr[mid] < target': true, comparisons },
          array: [...arr],
          low,
          high,
          mid,
          discarded: [...discardedIndices],
          foundIndex: -1,
          cmpResult: { left: midVal, op: '<', right: target, result: true },
          comparisons,
          output: null
        });

        // Discard left half
        const newlyDiscarded = [];
        for (let k = low; k <= mid; k++) {
          if (!discardedIndices.includes(k)) {
            discardedIndices.push(k);
            newlyDiscarded.push(k);
          }
        }

        const oldLow = low;
        low = mid + 1;

        steps.push({
          desc: `Since array is sorted and <code>arr[${mid}] (${midVal}) < ${target}</code>, target <strong>cannot exist at index ${mid} or anywhere to the left</strong>. We safely discard left half [${oldLow} .. ${mid}]. Update <code>low = mid + 1 = <strong>${low}</strong></code>. Remaining search space: [${low} .. ${high}].`,
          codeLine: 13,
          vars: { low, high, previousMid: mid, discardedRange: `[${oldLow}..${mid}]`, comparisons },
          array: [...arr],
          low,
          high,
          mid: -1,
          discarded: [...discardedIndices],
          foundIndex: -1,
          cmpResult: null,
          comparisons,
          output: null
        });
      } else {
        // midVal > target
        steps.push({
          desc: `Comparison at line 8 & 12: <code>arr[mid] (${midVal}) === ${target}</code> is <strong>false</strong>. Check <code>arr[mid] < target</code> (<code>${midVal} < ${target}</code>) is <strong>false</strong>, entering <code>else</code> branch (<code>${midVal} > ${target}</code>).`,
          codeLine: 14,
          vars: { low, high, mid, 'arr[mid]': midVal, target, 'arr[mid] > target': true, comparisons },
          array: [...arr],
          low,
          high,
          mid,
          discarded: [...discardedIndices],
          foundIndex: -1,
          cmpResult: { left: midVal, op: '>', right: target, result: true },
          comparisons,
          output: null
        });

        // Discard right half
        const oldHigh = high;
        for (let k = mid; k <= high; k++) {
          if (!discardedIndices.includes(k)) {
            discardedIndices.push(k);
          }
        }

        high = mid - 1;

        steps.push({
          desc: `Since array is sorted and <code>arr[${mid}] (${midVal}) > ${target}</code>, target <strong>cannot exist at index ${mid} or anywhere to the right</strong>. We safely discard right half [${mid} .. ${oldHigh}]. Update <code>high = mid - 1 = <strong>${high}</strong></code>. Remaining search space: [${low} .. ${high}].`,
          codeLine: 15,
          vars: { low, high, previousMid: mid, discardedRange: `[${mid}..${oldHigh}]`, comparisons },
          array: [...arr],
          low,
          high,
          mid: -1,
          discarded: [...discardedIndices],
          foundIndex: -1,
          cmpResult: null,
          comparisons,
          output: null
        });
      }
    }

    // If target not found after loop terminates
    if (foundIndex === -1) {
      steps.push({
        desc: `While condition check: <code>low <= high</code> (<code>${low} <= ${high}</code>) is now <strong style="color:#EF4444;">FALSE</strong> (the search window has collapsed). The loop terminates.`,
        codeLine: 5,
        vars: { low, high, 'low <= high': false, comparisons, status: 'Window Collapsed' },
        array: [...arr],
        low,
        high,
        mid: -1,
        discarded: arr.map((_, i) => i),
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: null
      });

      steps.push({
        desc: `Execution reaches line 19: <code>return -1</code>. Returning <strong>-1</strong> confirms target <strong>${target}</strong> does not exist in this sorted array. Total comparisons: <strong>${comparisons}</strong> (never needed to inspect every element!).`,
        codeLine: 19,
        vars: { target, comparisons, finalResult: -1, status: 'Target Absent' },
        array: [...arr],
        low,
        high,
        mid: -1,
        discarded: arr.map((_, i) => i),
        foundIndex: -1,
        cmpResult: null,
        comparisons,
        output: -1
      });
    }

    const complexity = foundIndex !== -1 && comparisons === 1
      ? 'O(1) Best Case (1 comparison) | O(1) Space'
      : `O(log n) Logarithmic Time (${comparisons} comparison${comparisons === 1 ? '' : 's'}) | O(1) Space`;

    return {
      code: CODE_LINES,
      steps,
      complexity,
      target,
      array: [...arr]
    };
  }

  /**
   * Visual renderer for Binary Search
   */
  function renderBinarySearchVisual(container, step, target) {
    if (!container || !step) return;
    const arr = step.array || [];

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
            <p>Array is empty. <code>low (0) <= high (-1)</code> is immediately false. Returns -1 in 0 comparisons.</p>
          </div>
        </div>
      `;
      return;
    }

    const { low, high, mid, foundIndex, discarded = [] } = step;

    const cellsHtml = arr.map((val, idx) => {
      const isMid = idx === mid;
      const isFound = idx === foundIndex;
      const isLow = idx === low;
      const isHigh = idx === high;
      const isDiscarded = discarded.includes(idx);
      const inActiveRange = idx >= low && idx <= high && !isDiscarded;

      let cellClass = 'array-cell';
      let tagHtml = '';
      let pointerBadges = [];

      if (isFound) {
        cellClass += ' array-cell--read search-cell--found';
        tagHtml = '<span class="cell-tag search-tag--match">MATCH ✓</span>';
        pointerBadges.push('<span class="search-boundary-badge search-boundary--found">FOUND [${idx}]</span>');
      } else if (isMid) {
        cellClass += ' search-cell--mid';
        tagHtml = '<span class="cell-tag search-tag--mid">MID</span>';
        pointerBadges.push('<span class="search-boundary-badge search-boundary--mid">MID (${mid})</span>');
      } else if (isDiscarded) {
        cellClass += ' search-cell--discarded';
        tagHtml = '<span class="cell-tag search-tag--discarded">DISCARDED</span>';
      } else if (inActiveRange) {
        cellClass += ' search-cell--active-range';
        tagHtml = '<span class="cell-tag search-tag--active">ACTIVE</span>';
      }

      if (isLow && !isFound) {
        pointerBadges.push('<span class="search-boundary-badge search-boundary--low">LOW (${low})</span>');
      }
      if (isHigh && !isFound && isHigh !== isLow) {
        pointerBadges.push('<span class="search-boundary-badge search-boundary--high">HIGH (${high})</span>');
      } else if (isHigh && isLow && !isFound) {
        pointerBadges.push('<span class="search-boundary-badge search-boundary--both">LOW & HIGH</span>');
      }

      const pointersHtml = pointerBadges.length > 0
        ? `<div class="search-pointers-stack">${pointerBadges.join('')}</div>`
        : '<div class="search-pointers-stack" style="visibility:hidden;"><span class="search-boundary-badge">&nbsp;</span></div>';

      return `
        <div class="array-cell-wrapper ${inActiveRange ? 'array-cell-wrapper--active' : ''}" data-idx="${idx}">
          <div class="search-pointer-slot">${pointersHtml}</div>
          <div class="array-idx-label">[${idx}]</div>
          <div class="${cellClass}">
            <span class="cell-value">${val}</span>
            ${tagHtml}
          </div>
        </div>
      `;
    }).join('');

    // Comparison banner
    let cmpHtml = '';
    if (step.cmpResult) {
      const isMatch = step.cmpResult.result && step.cmpResult.op === '===';
      const color = isMatch ? '#10B981' : '#38BDF8';
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:${color};">
          <span class="search-cmp-label">Current Mid Comparison:</span>
          <span class="search-cmp-expr">
            <code>arr[mid=${mid}]</code> (<strong>${step.cmpResult.left}</strong>)
            <strong style="color:${color}; margin: 0 4px;">${step.cmpResult.op}</strong>
            <code>target</code> (<strong>${step.cmpResult.right}</strong>)
            &nbsp;➔&nbsp;
            <span style="color:${color}; font-weight:700;">${isMatch ? 'TRUE ✓ MATCH FOUND' : 'TRUE (Branching)'}</span>
          </span>
        </div>
      `;
    } else if (foundIndex !== -1) {
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:#10B981; background:rgba(16,185,129,0.12);">
          <span class="search-cmp-label">Result:</span>
          <span class="search-cmp-expr" style="color:#10B981; font-weight:700;">
            ✓ Success: Target ${target} found at index [${foundIndex}] in ${step.comparisons} comparison${step.comparisons === 1 ? '' : 's'}!
          </span>
        </div>
      `;
    } else if (low > high) {
      cmpHtml = `
        <div class="search-cmp-card" style="border-color:#EF4444; background:rgba(239,68,68,0.08);">
          <span class="search-cmp-label">Result:</span>
          <span class="search-cmp-expr" style="color:#EF4444; font-weight:700;">
            ✗ Search space collapsed (low=${low} > high=${high}). Target ${target} not in array. Return -1.
          </span>
        </div>
      `;
    } else {
      cmpHtml = `
        <div class="search-cmp-card">
          <span class="search-cmp-label">Status:</span>
          <span class="search-cmp-expr">Active Search Range: <strong>[${low} .. ${high}]</strong> | Mid: <strong>${mid >= 0 ? mid : 'calculating...'}</strong> | Target: <strong>${target}</strong></span>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="search-visual-box">
        <div class="search-meta-strip">
          <span class="search-meta-pill">Target: <strong>${target}</strong></span>
          <span class="search-meta-pill">low: <strong>${low}</strong></span>
          <span class="search-meta-pill">high: <strong>${high}</strong></span>
          <span class="search-meta-pill">mid: <strong>${mid >= 0 ? mid : '—'}</strong></span>
          <span class="search-meta-pill">Comparisons: <strong>${step.comparisons || 0}</strong></span>
          <span class="search-meta-pill" style="border-color:#10B981; color:#10B981;">Input: <strong>Sorted Ascending ✓</strong></span>
        </div>

        <div class="search-track-outer">
          <div class="array-cells-track">
            ${cellsHtml}
          </div>
        </div>

        ${cmpHtml}
      </div>
    `;
  }

  /**
   * Main mount function for Binary Search
   */
  function mountBinarySearchVisualizer(container) {
    container.innerHTML = '';
    const operations = getScenarios();
    let currentOpId = 'sample';
    let currentArray = [...DEFAULT_ARRAY];
    let currentTarget = DEFAULT_TARGET;

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Binary Search: Logarithmic Divide-and-Conquer Visualizer',
      operations
    });

    // Custom toolbar for custom array & target + Unsorted Alert
    const customBar = document.createElement('div');
    customBar.className = 'search-custom-bar';
    customBar.style.display = 'none';
    customBar.innerHTML = `
      <div class="search-custom-inputs">
        <label class="search-input-group">
          <span>Sorted Array (comma-separated):</span>
          <input type="text" id="binary-custom-arr" class="widget-input" value="1, 2, 3, 4, 5, 6, 7, 8" style="min-width:210px;" />
        </label>
        <label class="search-input-group">
          <span>Target:</span>
          <input type="number" id="binary-custom-target" class="widget-input" value="6" style="width:75px;" />
        </label>
        <button type="button" class="btn btn--primary" id="btn-binary-apply-custom">Apply & Run</button>
      </div>
      <div id="binary-unsorted-alert" class="search-unsorted-alert" style="display:none;">
        <div style="display:flex; align-items:center; gap:8px;">
          <iconify-icon icon="lucide:alert-triangle" width="18" height="18" style="color:#F59E0B; flex-shrink:0;"></iconify-icon>
          <span><strong>Unsorted Input Warning:</strong> Standard Binary Search requires sorted data to decide which half to discard. If unsorted, halving assumptions fail and produce invalid results.</span>
        </div>
        <button type="button" class="btn btn--secondary" id="btn-binary-auto-sort" style="margin-top:8px; padding:4px 12px; font-size:0.82rem;">
          Sort Array (Ascending) & Proceed &rarr;
        </button>
      </div>
    `;
    ui.wrapper.insertBefore(customBar, ui.wrapper.querySelector('.exec-status-panel'));

    const unsortedAlert = customBar.querySelector('#binary-unsorted-alert');
    const autoSortBtn = customBar.querySelector('#btn-binary-auto-sort');

    let bundle = generateBinarySearchSteps(currentArray, currentTarget);
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
        renderBinarySearchVisual(ui.visualCanvas, step, currentTarget);

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

    // Event listeners
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
      if (unsortedAlert) unsortedAlert.style.display = 'none';

      if (opId === 'sample') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = 6;
      } else if (opId === 'beginning') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = 1;
      } else if (opId === 'end') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = 8;
      } else if (opId === 'middle') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = 4; // mid on step 1!
      } else if (opId === 'not-found') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = 9;
      } else if (opId === 'single') {
        currentArray = [42];
        currentTarget = 42;
      } else if (opId === 'empty') {
        currentArray = [];
        currentTarget = 6;
      } else if (opId === 'custom') {
        const arrInput = customBar.querySelector('#binary-custom-arr');
        const targetInput = customBar.querySelector('#binary-custom-target');
        const parsed = (arrInput ? arrInput.value : '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        const rawArr = parsed.length > 0 ? parsed.slice(0, 20) : [1, 2, 3, 4, 5, 6, 7, 8];
        currentTarget = targetInput ? (parseInt(targetInput.value, 10) || 6) : 6;

        if (!isSortedAscending(rawArr)) {
          if (unsortedAlert) unsortedAlert.style.display = 'block';
          // Keep raw for warning, don't silently sort
          currentArray = rawArr;
        } else {
          currentArray = rawArr;
        }
      }

      bundle = generateBinarySearchSteps(currentArray, currentTarget);
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

    const applyCustomBtn = customBar.querySelector('#btn-binary-apply-custom');
    if (applyCustomBtn) {
      applyCustomBtn.addEventListener('click', () => {
        loadScenario('custom');
      });
    }

    if (autoSortBtn) {
      autoSortBtn.addEventListener('click', () => {
        currentArray.sort((a, b) => a - b);
        const arrInput = customBar.querySelector('#binary-custom-arr');
        if (arrInput) arrInput.value = currentArray.join(', ');
        if (unsortedAlert) unsortedAlert.style.display = 'none';
        bundle = generateBinarySearchSteps(currentArray, currentTarget);
        code = bundle.code;
        ui.complexityPill.textContent = bundle.complexity;
        player.setSteps(bundle.steps);
      });
    }

    return () => {
      player.destroy();
      container.innerHTML = '';
    };
  }

  window.mountBinarySearchVisualizer = mountBinarySearchVisualizer;
})();

