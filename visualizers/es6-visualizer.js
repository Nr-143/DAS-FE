/**
 * OneStep Journey — ES6+ Interactive Feature Visualizer
 * ──────────────────────────────────────────────────────
 * Interactive step visualizer for modern JavaScript mechanics:
 * 1. Array & Object Destructuring
 * 2. Spread (Out) vs Rest (In)
 * 3. Arrow Function Lexical 'this' scoping
 * 4. Optional Chaining (?.) & Nullish Coalescing (??)
 */

(function () {
  function getES6Operations() {
    return [
      { id: 'destructuring', label: '1. Destructuring Unpack', icon: '<iconify-icon icon="lucide:package"></iconify-icon>' },
      { id: 'spread-rest', label: '2. Spread vs Rest', icon: '<iconify-icon icon="lucide:sparkles"></iconify-icon>' },
      { id: 'arrow-this', label: '3. Arrow Lexical "this"', icon: '<iconify-icon icon="lucide:crosshair"></iconify-icon>' },
      { id: 'opt-nullish', label: '4. Optional Chaining & ??', icon: '<iconify-icon icon="lucide:shield"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'destructuring') {
      const code = [
        '// Array Destructuring',
        'const [first, second] = [10, 20];',
        '// Object Destructuring',
        'const { name, role } = { name: "Alex", role: "Dev", id: 99 };'
      ];
      const steps = [
        {
          desc: 'Array Destructuring: Unpacks array positions into variable identifiers by index order.',
          codeLine: 2,
          vars: { sourceArray: '[10, 20]' },
          stageData: {
            type: 'array-destruct',
            source: [10, 20],
            targets: [{ var: 'first', val: 10 }, { var: 'second', val: 20 }]
          },
          output: 'first = 10, second = 20'
        },
        {
          desc: 'Object Destructuring: Unpacks properties by key name matching directly from the heap object.',
          codeLine: 4,
          vars: { sourceObj: '{ name: "Alex", role: "Dev", id: 99 }' },
          stageData: {
            type: 'obj-destruct',
            source: { name: 'Alex', role: 'Dev', id: 99 },
            targets: [{ var: 'name', val: '"Alex"' }, { var: 'role', val: '"Dev"' }]
          },
          output: 'name = "Alex", role = "Dev"'
        }
      ];
      return { code, steps, complexity: 'O(1) Syntax' };
    }

    if (opId === 'spread-rest') {
      const code = [
        '// Spread (...) expands elements OUT:',
        'const merged = [...[1, 2], ...[3, 4]]; // [1, 2, 3, 4]',
        '// Rest (...) collects remaining arguments IN:',
        'function collect(first, ...rest) { return rest; }',
        'collect(10, 20, 30); // rest = [20, 30]'
      ];
      const steps = [
        {
          desc: 'Spread: Expands arrays <code>[1, 2]</code> and <code>[3, 4]</code> into individual elements to create a new shallow copy.',
          codeLine: 2,
          vars: { leftArray: '[1, 2]', rightArray: '[3, 4]' },
          stageData: {
            type: 'spread',
            inputs: [[1, 2], [3, 4]],
            result: [1, 2, 3, 4]
          },
          output: 'merged = [1, 2, 3, 4]'
        },
        {
          desc: 'Rest: Collects remaining comma-separated function arguments into a single real Array object.',
          codeLine: 5,
          vars: { firstArg: 10, restArgs: '[20, 30]' },
          stageData: {
            type: 'rest',
            inputs: [10, 20, 30],
            first: 10,
            restArray: [20, 30]
          },
          output: 'first = 10, rest = [20, 30]'
        }
      ];
      return { code, steps, complexity: 'Spread: O(n) | Rest: O(k)' };
    }

    if (opId === 'arrow-this') {
      const code = [
        'const obj = {',
        '  count: 10,',
        '  regularMethod: function() { return this.count; }, // this = obj (10)',
        '  arrowMethod: () => { return this.count; }         // this = window/undefined!',
        '};'
      ];
      const steps = [
        {
          desc: 'Regular functions have their own dynamic <code>this</code> bound to the caller object (<code>obj.regularMethod() → 10</code>).',
          codeLine: 3,
          vars: { thisBinding: 'obj', result: 10 },
          stageData: {
            type: 'this-compare',
            isRegular: true,
            thisVal: 'obj { count: 10 }'
          },
          output: '10'
        },
        {
          desc: 'Arrow functions do NOT have their own <code>this</code>. They inherit lexical <code>this</code> from the surrounding module/global scope!',
          codeLine: 4,
          vars: { thisBinding: 'Lexical parent (window/undefined)', result: 'undefined' },
          stageData: {
            type: 'this-compare',
            isRegular: false,
            thisVal: 'global / window (undefined)'
          },
          output: 'undefined'
        }
      ];
      return { code, steps, complexity: 'Lexical Scoping' };
    }

    if (opId === 'opt-nullish') {
      const code = [
        'const user = { profile: null };',
        '// Optional Chaining (?.) short-circuits without throwing TypeError:',
        'const city = user.profile?.address?.city ?? "Default City";',
        '// Nullish Coalescing (??) only falls back on null/undefined, not on 0 or ""!'
      ];
      const steps = [
        {
          desc: 'Evaluating <code>user.profile?.address</code>: <code>user.profile</code> is null! Instead of crashing, <code>?.</code> cleanly returns <code>undefined</code>.',
          codeLine: 3,
          vars: { 'user.profile': 'null', shortCircuit: true, evaluated: 'undefined' },
          stageData: {
            type: 'opt-chain',
            status: 'Short-circuited safely'
          },
          output: 'undefined (no TypeError)'
        },
        {
          desc: 'Evaluating <code>undefined ?? "Default City"</code>: Since the left operand is nullish, fallback value is returned.',
          codeLine: 3,
          vars: { fallbackApplied: true, finalResult: 'Default City' },
          stageData: {
            type: 'opt-chain',
            status: 'Fallback "Default City" applied'
          },
          output: '"Default City"'
        }
      ];
      return { code, steps, complexity: 'O(1) Safe Access' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step || !step.stageData) return;
    const d = step.stageData;

    if (d.type === 'array-destruct' || d.type === 'obj-destruct') {
      const targetsHtml = d.targets.map(t => `
        <div class="destruct-target-box">
          <span class="destruct-var-name">const ${t.var}</span>
          <span class="destruct-arrow">←</span>
          <span class="destruct-val-tag">${t.val}</span>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="es6-destruct-canvas">
          <div class="destruct-source-box">
            <span class="destruct-source-title">Source Data Structure</span>
            <code class="destruct-source-code">${JSON.stringify(d.source)}</code>
          </div>
          <div class="destruct-flow-divider">↳ Unpacking into variables</div>
          <div class="destruct-targets-grid">
            ${targetsHtml}
          </div>
        </div>
      `;
      return;
    }

    if (d.type === 'spread') {
      container.innerHTML = `
        <div class="es6-spread-canvas">
          <div class="spread-sources-row">
            ${d.inputs.map(arr => `<span class="spread-pill">[...${JSON.stringify(arr)}]</span>`).join(' + ')}
          </div>
          <div class="spread-action-arrow">↓ Spreading items outward into new Array</div>
          <div class="spread-result-box">
            <span class="spread-result-val">${JSON.stringify(d.result)}</span>
          </div>
        </div>
      `;
      return;
    }

    if (d.type === 'rest') {
      container.innerHTML = `
        <div class="es6-spread-canvas">
          <div class="spread-sources-row">
            Arguments passed: <code>collect(10, 20, 30)</code>
          </div>
          <div class="spread-action-arrow">↓ First argument bound to 'first'; remaining gathered into 'rest'</div>
          <div class="destruct-targets-grid">
            <div class="destruct-target-box"><span class="destruct-var-name">first</span> = <span class="destruct-val-tag">10</span></div>
            <div class="destruct-target-box"><span class="destruct-var-name">...rest</span> = <span class="destruct-val-tag">[20, 30]</span></div>
          </div>
        </div>
      `;
      return;
    }

    if (d.type === 'this-compare') {
      container.innerHTML = `
        <div class="es6-this-canvas">
          <div class="this-card ${d.isRegular ? 'this-card--active' : ''}">
            <h4>Regular Function</h4>
            <p>Dynamically binds <code>this</code> to caller object:</p>
            <div class="this-box">this = ${d.thisVal}</div>
          </div>
        </div>
      `;
      return;
    }

    if (d.type === 'opt-chain') {
      container.innerHTML = `
        <div class="es6-opt-canvas">
          <div class="opt-step-box">
            <div class="opt-tag">Safe Navigation</div>
            <div class="opt-desc">${d.status}</div>
          </div>
        </div>
      `;
      return;
    }
  }

  function mountES6Visualizer(container) {
    container.innerHTML = '';
    const operations = getES6Operations();
    let currentOpId = 'destructuring';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'ES6+ Modern Syntax & Memory Mechanics Visualizer',
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

  window.mountES6Visualizer = mountES6Visualizer;
})();
