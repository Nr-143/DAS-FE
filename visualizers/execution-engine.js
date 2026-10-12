/**
 * OneStep Journey — Interactive Algorithm Execution Engine
 * ──────────────────────────────────────────────────────────
 * Deterministic step-by-step state machine player with Play, Pause,
 * Step Forward/Backward, Reset, Speed controls, Variable Inspector,
 * and Code Line Highlighting.
 */

(function () {
  class ExecutionPlayer {
    constructor(options = {}) {
      this.steps = options.steps || [];
      this.currentStepIdx = 0;
      this.speedMs = options.speedMs || 800;
      this.isPlaying = false;
      this.timer = null;
      this.onStepChange = options.onStepChange || (() => {});
      this.onPlayStateChange = options.onPlayStateChange || (() => {});
    }

    setSteps(steps, resetIndex = true) {
      this.pause();
      this.steps = steps || [];
      if (resetIndex) {
        this.currentStepIdx = 0;
      } else {
        this.currentStepIdx = Math.min(this.currentStepIdx, Math.max(0, this.steps.length - 1));
      }
      this.notify();
    }

    notify() {
      const currentStep = this.steps[this.currentStepIdx] || null;
      this.onStepChange(currentStep, this.currentStepIdx, this.steps.length);
      this.onPlayStateChange(this.isPlaying);
    }

    play() {
      if (this.isPlaying) return;
      if (this.steps.length === 0) return;
      if (this.currentStepIdx >= this.steps.length - 1) {
        this.currentStepIdx = 0;
      }
      this.isPlaying = true;
      this.notify();

      this.timer = setInterval(() => {
        if (this.currentStepIdx < this.steps.length - 1) {
          this.currentStepIdx++;
          this.notify();
        } else {
          this.pause();
        }
      }, this.speedMs);
    }

    pause() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.isPlaying = false;
      this.notify();
    }

    stepForward() {
      this.pause();
      if (this.currentStepIdx < this.steps.length - 1) {
        this.currentStepIdx++;
        this.notify();
      }
    }

    stepBackward() {
      this.pause();
      if (this.currentStepIdx > 0) {
        this.currentStepIdx--;
        this.notify();
      }
    }

    reset() {
      this.pause();
      this.currentStepIdx = 0;
      this.notify();
    }

    setSpeed(speedMs) {
      this.speedMs = speedMs;
      if (this.isPlaying) {
        this.pause();
        this.play();
      }
    }

    destroy() {
      this.pause();
      this.steps = [];
      this.onStepChange = null;
      this.onPlayStateChange = null;
    }
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Builds the standardized interactive player UI container
   */
  function createPlayerUI(container, options = {}) {
    const title = options.title || 'Interactive Execution Player';
    const operations = options.operations || [];
    const initialCode = options.codeLines || [];

    const wrapper = document.createElement('div');
    wrapper.className = 'interactive-exec-player';
    wrapper.innerHTML = `
      <div class="exec-player-header">
        <div class="exec-player-title-row">
          <span class="exec-player-badge"><iconify-icon icon="lucide:zap" width="14" height="14"></iconify-icon> Interactive Visualizer</span>
          <h3 class="exec-player-title">${escapeHtml(title)}</h3>
        </div>
        ${operations.length > 0 ? `
          <div class="exec-op-tabs" role="tablist">
            ${operations.map((op, idx) => `
              <button type="button" class="exec-op-tab ${idx === 0 ? 'exec-op-tab--active' : ''}" data-op-id="${op.id}">
                ${op.icon ? `<span class="exec-op-icon">${op.icon}</span>` : ''}
                <span>${escapeHtml(op.label)}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="exec-toolbar">
        <div class="exec-playback-controls">
          <button type="button" class="btn btn--primary btn-exec-play" title="Play / Pause execution">
            <span class="exec-play-icon"><iconify-icon icon="lucide:play" width="15" height="15"></iconify-icon></span> Play
          </button>
          <button type="button" class="btn btn--secondary btn-exec-step-back" title="Previous step">
            <iconify-icon icon="lucide:skip-back" width="15" height="15"></iconify-icon> Prev
          </button>
          <button type="button" class="btn btn--secondary btn-exec-step" title="Next step">
            <iconify-icon icon="lucide:skip-forward" width="15" height="15"></iconify-icon> Step
          </button>
          <button type="button" class="btn btn--outline btn-exec-reset" title="Reset to start">
            <iconify-icon icon="lucide:rotate-ccw" width="15" height="15"></iconify-icon> Reset
          </button>
        </div>

        <div class="exec-speed-selector">
          <span class="exec-speed-label">Speed:</span>
          <button type="button" class="exec-speed-btn" data-speed="1500">Slow</button>
          <button type="button" class="exec-speed-btn exec-speed-btn--active" data-speed="800">Normal</button>
          <button type="button" class="exec-speed-btn" data-speed="300">Fast</button>
        </div>

        <div class="exec-step-indicator">
          <span class="exec-step-counter">Step 1 of 1</span>
        </div>
      </div>

      <div class="exec-status-panel">
        <div class="exec-step-desc">Ready to execute. Press <strong>Play</strong> or <strong>Step</strong>.</div>
        <div class="exec-vars-strip"></div>
      </div>

      <div class="exec-main-grid">
        <div class="exec-stage-col">
          <div class="exec-stage-card">
            <div class="exec-stage-header">
              <span class="exec-stage-title"><iconify-icon icon="lucide:layers" width="15" height="15"></iconify-icon> Data Structure State</span>
              <span class="exec-stage-badge"><iconify-icon icon="lucide:activity" width="12" height="12"></iconify-icon> Live</span>
            </div>
            <div class="exec-visual-canvas"></div>
          </div>
        </div>

        <div class="exec-code-col">
          <div class="exec-code-card">
            <div class="exec-code-header">
              <span class="exec-code-title"><iconify-icon icon="lucide:code" width="15" height="15"></iconify-icon> Algorithm Code</span>
              <span class="exec-complexity-pill"><iconify-icon icon="lucide:clock" width="13" height="13"></iconify-icon> O(1)</span>
            </div>
            <div class="exec-code-view">
              <pre class="exec-code-pre"><code></code></pre>
            </div>
            <div class="exec-output-card" style="display:none;">
              <span class="exec-output-label"><iconify-icon icon="lucide:terminal" width="14" height="14"></iconify-icon> Output / Result:</span>
              <code class="exec-output-val"></code>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(wrapper);

    // References
    const elements = {
      wrapper,
      playBtn: wrapper.querySelector('.btn-exec-play'),
      playIcon: wrapper.querySelector('.exec-play-icon'),
      stepBtn: wrapper.querySelector('.btn-exec-step'),
      stepBackBtn: wrapper.querySelector('.btn-exec-step-back'),
      resetBtn: wrapper.querySelector('.btn-exec-reset'),
      speedBtns: wrapper.querySelectorAll('.exec-speed-btn'),
      stepCounter: wrapper.querySelector('.exec-step-counter'),
      stepDesc: wrapper.querySelector('.exec-step-desc'),
      varsStrip: wrapper.querySelector('.exec-vars-strip'),
      visualCanvas: wrapper.querySelector('.exec-visual-canvas'),
      codePre: wrapper.querySelector('.exec-code-pre code'),
      complexityPill: wrapper.querySelector('.exec-complexity-pill'),
      outputCard: wrapper.querySelector('.exec-output-card'),
      outputVal: wrapper.querySelector('.exec-output-val'),
      opTabs: wrapper.querySelectorAll('.exec-op-tab')
    };

    return elements;
  }

  function renderCodeLines(codePreEl, codeLines, activeLineIdx = -1) {
    if (!codePreEl) return;
    const html = codeLines.map((line, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === activeLineIdx;
      return `<div class="exec-code-line ${isActive ? 'exec-code-line--active' : ''}">` +
        `<span class="exec-line-num">${lineNum}</span>` +
        `<span class="exec-line-text">${escapeHtml(line)}</span>` +
        `</div>`;
    }).join('');
    codePreEl.innerHTML = html;
  }

  function renderVarsBadges(varsStripEl, variables) {
    if (!varsStripEl) return;
    if (!variables || Object.keys(variables).length === 0) {
      varsStripEl.innerHTML = '<span class="exec-var-empty">No active variables</span>';
      return;
    }
    const html = Object.entries(variables).map(([k, v]) => {
      let displayVal = typeof v === 'object' ? JSON.stringify(v) : String(v);
      return `<div class="exec-var-pill">` +
        `<span class="exec-var-key">${escapeHtml(k)}:</span>` +
        `<span class="exec-var-val">${escapeHtml(displayVal)}</span>` +
        `</div>`;
    }).join('');
    varsStripEl.innerHTML = html;
  }

  function updatePlayBtn(playBtn, isPlaying) {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<span class="exec-play-icon"><iconify-icon icon="lucide:pause" width="15" height="15"></iconify-icon></span> Pause'
      : '<span class="exec-play-icon"><iconify-icon icon="lucide:play" width="15" height="15"></iconify-icon></span> Play';
  }

  window.ExecutionEngine = {
    ExecutionPlayer,
    createPlayerUI,
    renderCodeLines,
    renderVarsBadges,
    updatePlayBtn,
    escapeHtml
  };
})();
