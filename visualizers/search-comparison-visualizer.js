/**
 * OneStep Journey — Search Comparison Interactive Visualizer
 * ────────────────────────────────────────────────────────────
 * Side-by-side interactive duel comparing Linear Search vs Binary Search
 * on the exact same dataset with the exact same target!
 * - Displays both search algorithms executing synchronously.
 * - Compares comparison counters, search steps, and computational efficiency.
 */

(function () {
  const COMPARISON_ARRAY = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
  const DEFAULT_TARGET = 27;

  function generateDuelSteps(arr, target) {
    // 1. Generate Linear Steps
    const linearSteps = [];
    let linCmp = 0;
    let linFound = -1;
    for (let i = 0; i < arr.length; i++) {
      linCmp++;
      if (arr[i] === target) {
        linFound = i;
        linearSteps.push({
          idx: i,
          val: arr[i],
          status: 'found',
          comparisons: linCmp,
          desc: `Found ${target} at index [${i}]!`
        });
        break;
      } else {
        linearSteps.push({
          idx: i,
          val: arr[i],
          status: 'checked',
          comparisons: linCmp,
          desc: `Checked index [${i}] (${arr[i]} !== ${target})`
        });
      }
    }
    if (linFound === -1) {
      linearSteps.push({
        idx: -1,
        val: null,
        status: 'not_found',
        comparisons: linCmp,
        desc: `Exhausted all ${arr.length} elements without finding ${target}.`
      });
    }

    // 2. Generate Binary Steps
    const binarySteps = [];
    let binLow = 0;
    let binHigh = arr.length - 1;
    let binCmp = 0;
    let binFound = -1;
    const binDiscarded = [];

    while (binLow <= binHigh) {
      const mid = Math.floor((binLow + binHigh) / 2);
      const midVal = arr[mid];
      binCmp++;

      if (midVal === target) {
        binFound = mid;
        binarySteps.push({
          low: binLow,
          high: binHigh,
          mid,
          val: midVal,
          discarded: [...binDiscarded],
          status: 'found',
          comparisons: binCmp,
          desc: `Mid [${mid}] (${midVal}) matches target ${target}!`
        });
        break;
      } else if (midVal < target) {
        for (let k = binLow; k <= mid; k++) {
          if (!binDiscarded.includes(k)) binDiscarded.push(k);
        }
        binarySteps.push({
          low: binLow,
          high: binHigh,
          mid,
          val: midVal,
          discarded: [...binDiscarded],
          status: 'halved_left',
          comparisons: binCmp,
          desc: `${midVal} < ${target} ➔ Discarded left half [${binLow}..${mid}]`
        });
        binLow = mid + 1;
      } else {
        for (let k = mid; k <= binHigh; k++) {
          if (!binDiscarded.includes(k)) binDiscarded.push(k);
        }
        binarySteps.push({
          low: binLow,
          high: binHigh,
          mid,
          val: midVal,
          discarded: [...binDiscarded],
          status: 'halved_right',
          comparisons: binCmp,
          desc: `${midVal} > ${target} ➔ Discarded right half [${mid}..${binHigh}]`
        });
        binHigh = mid - 1;
      }
    }

    if (binFound === -1) {
      binarySteps.push({
        low: binLow,
        high: binHigh,
        mid: -1,
        val: null,
        discarded: arr.map((_, i) => i),
        status: 'not_found',
        comparisons: binCmp,
        desc: `Range collapsed (low > high). Target not in array.`
      });
    }

    // 3. Combine into synchronized duel steps
    const maxLen = Math.max(linearSteps.length, binarySteps.length);
    const duelSteps = [];

    for (let s = 0; s < maxLen; s++) {
      const lin = linearSteps[Math.min(s, linearSteps.length - 1)];
      const bin = binarySteps[Math.min(s, binarySteps.length - 1)];

      duelSteps.push({
        linear: lin,
        binary: bin,
        linearDone: s >= linearSteps.length - 1,
        binaryDone: s >= binarySteps.length - 1
      });
    }

    return duelSteps;
  }

  function mountSearchComparisonVisualizer(container, options = {}) {
    if (!container) return;
    container.innerHTML = '';

    let currentTarget = options.initialTarget || DEFAULT_TARGET;
    let duelSteps = generateDuelSteps(COMPARISON_ARRAY, currentTarget);
    let currentStepIdx = 0;
    let isPlaying = false;
    let timer = null;
    let speedMs = 700;

    const wrapper = document.createElement('div');
    wrapper.className = 'search-duel-card';
    wrapper.innerHTML = `
      <div class="search-duel-header">
        <div class="search-duel-title-row">
          <span class="exec-player-badge"><iconify-icon icon="lucide:swords" width="14" height="14"></iconify-icon> Head-to-Head Algorithm Duel</span>
          <h3 class="search-duel-title">Linear Search vs. Binary Search</h3>
        </div>
        <p class="search-duel-desc">
          Watch both algorithms search for the exact same target in the exact same sorted 16-element array. Notice how Linear Search checks element by element, while Binary Search halves the remaining candidates at each turn.
        </p>
      </div>

      <div class="search-duel-toolbar">
        <div class="search-duel-controls">
          <button type="button" class="btn btn--primary" id="btn-duel-play">
            <iconify-icon icon="lucide:play" width="14" height="14"></iconify-icon> Run Duel
          </button>
          <button type="button" class="btn btn--secondary" id="btn-duel-step">
            <iconify-icon icon="lucide:skip-forward" width="14" height="14"></iconify-icon> Step
          </button>
          <button type="button" class="btn btn--outline" id="btn-duel-reset">
            <iconify-icon icon="lucide:rotate-ccw" width="14" height="14"></iconify-icon> Reset
          </button>
        </div>

        <div class="search-duel-target-selector">
          <span class="search-target-label">Target:</span>
          <div class="search-target-chips">
            <button type="button" class="search-target-chip ${currentTarget === 3 ? 'search-target-chip--active' : ''}" data-target="3">3 (Near Start)</button>
            <button type="button" class="search-target-chip ${currentTarget === 15 ? 'search-target-chip--active' : ''}" data-target="15">15 (Middle)</button>
            <button type="button" class="search-target-chip ${currentTarget === 27 ? 'search-target-chip--active' : ''}" data-target="27">27 (Near End)</button>
            <button type="button" class="search-target-chip ${currentTarget === 31 ? 'search-target-chip--active' : ''}" data-target="31">31 (Last Item)</button>
            <button type="button" class="search-target-chip ${currentTarget === 99 ? 'search-target-chip--active' : ''}" data-target="99">99 (Absent)</button>
          </div>
        </div>

        <div class="search-duel-step-badge" id="duel-step-indicator">
          Step 1 of ${duelSteps.length}
        </div>
      </div>

      <!-- Live Comparison Scoreboard -->
      <div class="search-scoreboard-grid">
        <div class="search-score-box search-score--linear">
          <div class="search-score-header">
            <span class="search-score-name"><iconify-icon icon="lucide:arrow-right" width="14" height="14"></iconify-icon> Linear Search</span>
            <span class="search-score-complexity">O(n) Linear Time</span>
          </div>
          <div class="search-score-metrics">
            <div class="search-metric">
              <span class="metric-num" id="duel-linear-cmp">0</span>
              <span class="metric-label">Comparisons</span>
            </div>
            <div class="search-metric">
              <span class="metric-num" id="duel-linear-pct">0%</span>
              <span class="metric-label">Array Examined</span>
            </div>
            <div class="search-metric">
              <span class="metric-num" id="duel-linear-status">Ready</span>
              <span class="metric-label">Status</span>
            </div>
          </div>
          <div class="search-duel-canvas" id="duel-linear-canvas"></div>
          <div class="search-duel-log" id="duel-linear-log">Awaiting start...</div>
        </div>

        <div class="search-score-box search-score--binary">
          <div class="search-score-header">
            <span class="search-score-name"><iconify-icon icon="lucide:split" width="14" height="14"></iconify-icon> Binary Search</span>
            <span class="search-score-complexity">O(log n) Logarithmic Time</span>
          </div>
          <div class="search-score-metrics">
            <div class="search-metric">
              <span class="metric-num" id="duel-binary-cmp">0</span>
              <span class="metric-label">Comparisons</span>
            </div>
            <div class="search-metric">
              <span class="metric-num" id="duel-binary-pct">0%</span>
              <span class="metric-label">Array Examined</span>
            </div>
            <div class="search-metric">
              <span class="metric-num" id="duel-binary-status">Ready</span>
              <span class="metric-label">Status</span>
            </div>
          </div>
          <div class="search-duel-canvas" id="duel-binary-canvas"></div>
          <div class="search-duel-log" id="duel-binary-log">Awaiting start...</div>
        </div>
      </div>

      <!-- Efficiency Summary Callout -->
      <div class="search-efficiency-callout" id="duel-efficiency-callout">
        <div class="callout-icon"><iconify-icon icon="lucide:award" width="22" height="22"></iconify-icon></div>
        <div class="callout-content" id="duel-efficiency-text">
          Press <strong>Run Duel</strong> to see how logarithmic division outperforms sequential inspection!
        </div>
      </div>
    `;

    container.appendChild(wrapper);

    // DOM references
    const playBtn = wrapper.querySelector('#btn-duel-play');
    const stepBtn = wrapper.querySelector('#btn-duel-step');
    const resetBtn = wrapper.querySelector('#btn-duel-reset');
    const stepIndicator = wrapper.querySelector('#duel-step-indicator');
    const linCmpEl = wrapper.querySelector('#duel-linear-cmp');
    const linPctEl = wrapper.querySelector('#duel-linear-pct');
    const linStatusEl = wrapper.querySelector('#duel-linear-status');
    const linCanvas = wrapper.querySelector('#duel-linear-canvas');
    const linLog = wrapper.querySelector('#duel-linear-log');

    const binCmpEl = wrapper.querySelector('#duel-binary-cmp');
    const binPctEl = wrapper.querySelector('#duel-binary-pct');
    const binStatusEl = wrapper.querySelector('#duel-binary-status');
    const binCanvas = wrapper.querySelector('#duel-binary-canvas');
    const binLog = wrapper.querySelector('#duel-binary-log');
    const efficiencyText = wrapper.querySelector('#duel-efficiency-text');

    function renderDuel() {
      const step = duelSteps[Math.min(currentStepIdx, duelSteps.length - 1)];
      stepIndicator.textContent = `Step ${currentStepIdx + 1} of ${duelSteps.length}`;

      // Update Linear state
      const lin = step.linear;
      linCmpEl.textContent = lin.comparisons;
      const linPct = Math.round((lin.comparisons / COMPARISON_ARRAY.length) * 100);
      linPctEl.textContent = `${linPct}%`;
      linStatusEl.textContent = lin.status === 'found' ? 'Found ✓' : (lin.status === 'not_found' ? 'Not Found' : 'Scanning...');
      linLog.textContent = lin.desc;

      linCanvas.innerHTML = COMPARISON_ARRAY.map((val, idx) => {
        let cls = 'duel-mini-cell';
        if (lin.status === 'found' && idx === lin.idx) cls += ' duel-cell--found';
        else if (idx === lin.idx) cls += ' duel-cell--active';
        else if (idx < lin.idx || (lin.status === 'found' && idx <= lin.idx)) cls += ' duel-cell--checked';
        return `<div class="${cls}" title="[${idx}]: ${val}"><span>${val}</span></div>`;
      }).join('');

      // Update Binary state
      const bin = step.binary;
      binCmpEl.textContent = bin.comparisons;
      const binPct = Math.round((bin.comparisons / COMPARISON_ARRAY.length) * 100);
      binPctEl.textContent = `${binPct}%`;
      binStatusEl.textContent = bin.status === 'found' ? 'Found ✓' : (bin.status === 'not_found' ? 'Not Found' : 'Halving...');
      binLog.textContent = bin.desc;

      binCanvas.innerHTML = COMPARISON_ARRAY.map((val, idx) => {
        let cls = 'duel-mini-cell';
        if (bin.status === 'found' && idx === bin.mid) cls += ' duel-cell--found';
        else if (idx === bin.mid) cls += ' duel-cell--mid';
        else if (bin.discarded && bin.discarded.includes(idx)) cls += ' duel-cell--discarded';
        else if (idx >= bin.low && idx <= bin.high) cls += ' duel-cell--in-range';
        return `<div class="${cls}" title="[${idx}]: ${val}"><span>${val}</span></div>`;
      }).join('');

      // Final summary update
      if (currentStepIdx === duelSteps.length - 1) {
        const linTotal = duelSteps[duelSteps.length - 1].linear.comparisons;
        const binTotal = duelSteps[duelSteps.length - 1].binary.comparisons;
        const ratio = (linTotal / Math.max(1, binTotal)).toFixed(1);

        efficiencyText.innerHTML = `
          <strong>Duel Complete!</strong> Binary Search needed only <strong>${binTotal} comparison${binTotal === 1 ? '' : 's'}</strong> versus Linear Search's <strong>${linTotal} comparisons</strong>.<br/>
          Binary Search was <strong style="color:#10B981;">${ratio}x more efficient</strong> for target <code>${currentTarget}</code>. On a dataset of 1,000,000 items, Linear Search could take up to 1,000,000 operations, while Binary Search finishes in at most 20 operations!
        `;
      } else {
        efficiencyText.innerHTML = `
          Target: <strong>${currentTarget}</strong>. Step through to observe how Binary Search eliminates entire sections while Linear Search inspects one by one.
        `;
      }
    }

    function stopDuel() {
      isPlaying = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      playBtn.innerHTML = '<iconify-icon icon="lucide:play" width="14" height="14"></iconify-icon> Run Duel';
    }

    function stepNext() {
      if (currentStepIdx < duelSteps.length - 1) {
        currentStepIdx++;
        renderDuel();
      } else {
        stopDuel();
      }
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopDuel();
      } else {
        if (currentStepIdx >= duelSteps.length - 1) {
          currentStepIdx = 0;
        }
        isPlaying = true;
        playBtn.innerHTML = '<iconify-icon icon="lucide:pause" width="14" height="14"></iconify-icon> Pause';
        timer = setInterval(stepNext, speedMs);
      }
    });

    stepBtn.addEventListener('click', () => {
      stopDuel();
      stepNext();
    });

    resetBtn.addEventListener('click', () => {
      stopDuel();
      currentStepIdx = 0;
      renderDuel();
    });

    // Target chip clicks
    wrapper.querySelectorAll('.search-target-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        stopDuel();
        wrapper.querySelectorAll('.search-target-chip').forEach(c => c.classList.remove('search-target-chip--active'));
        chip.classList.add('search-target-chip--active');
        currentTarget = parseInt(chip.getAttribute('data-target'), 10);
        duelSteps = generateDuelSteps(COMPARISON_ARRAY, currentTarget);
        currentStepIdx = 0;
        renderDuel();
      });
    });

    renderDuel();

    return () => {
      stopDuel();
      container.innerHTML = '';
    };
  }

  window.mountSearchComparisonVisualizer = mountSearchComparisonVisualizer;
})();

