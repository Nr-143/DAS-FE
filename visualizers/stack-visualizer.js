/**
 * OneStep Journey — Stack Interactive Visualizer
 * ───────────────────────────────────────────────
 * Demonstrates:
 * - Vertical LIFO visual container with open top
 * - Step-by-step code execution trace: push(10), push(20), push(30), pop()
 * - Operations: push, pop, peek, isEmpty, call stack simulator, undo/redo
 * - TOP pointer moving and highlighting
 */

(function () {
  function getOperations() {
    return [
      { id: 'trace', label: '1. Code Trace [10, 20, 30, pop]', icon: '<iconify-icon icon="lucide:file-code"></iconify-icon>' },
      { id: 'push-op', label: '2. Push Operation', icon: '<iconify-icon icon="lucide:arrow-down-to-dot"></iconify-icon>' },
      { id: 'pop-op', label: '3. Pop Operation', icon: '<iconify-icon icon="lucide:arrow-up-from-dot"></iconify-icon>' },
      { id: 'peek-op', label: '4. Peek vs Pop', icon: '<iconify-icon icon="lucide:eye"></iconify-icon>' },
      { id: 'undo-demo', label: '5. Undo / Redo Real-World', icon: '<iconify-icon icon="lucide:undo-2"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'trace') {
      const code = [
        'const stack = [];',
        'stack.push(10); // push 10',
        'stack.push(20); // push 20',
        'stack.push(30); // push 30',
        'const removed = stack.pop(); // pop 30'
      ];
      const steps = [
        {
          desc: 'Line 1: Initialize an empty stack: <code>const stack = []</code>.',
          codeLine: 1,
          vars: { stack: '[]', length: 0, top: 'none' },
          items: [],
          topIdx: -1,
          output: '[]'
        },
        {
          desc: 'Line 2: <code>stack.push(10)</code>. Value 10 lands at the bottom of the stack. TOP now points to 10.',
          codeLine: 2,
          vars: { pushed: 10, length: 1, top: 10 },
          items: [10],
          topIdx: 0,
          highlightIdx: 0,
          output: '[10]'
        },
        {
          desc: 'Line 3: <code>stack.push(20)</code>. Value 20 is placed on top of 10. TOP pointer moves up to 20.',
          codeLine: 3,
          vars: { pushed: 20, length: 2, top: 20 },
          items: [10, 20],
          topIdx: 1,
          highlightIdx: 1,
          output: '[10, 20]'
        },
        {
          desc: 'Line 4: <code>stack.push(30)</code>. Value 30 is pushed onto the top. TOP pointer moves to 30.',
          codeLine: 4,
          vars: { pushed: 30, length: 3, top: 30 },
          items: [10, 20, 30],
          topIdx: 2,
          highlightIdx: 2,
          output: '[10, 20, 30]'
        },
        {
          desc: 'Line 5: <code>stack.pop()</code> removes the top element (<strong>30</strong>). TOP pointer moves down to 20. LIFO in action!',
          codeLine: 5,
          vars: { popped: 30, remainingLength: 2, top: 20, time: 'O(1) Constant' },
          items: [10, 20],
          topIdx: 1,
          poppedVal: 30,
          output: 'Popped: 30 | Stack: [10, 20]'
        }
      ];
      return { code, steps, complexity: 'O(1) Push/Pop | O(n) Space' };
    }

    if (opId === 'push-op') {
      const code = [
        'function push(val) {',
        '  // Place element at the current TOP index',
        '  this.items[this.items.length] = val;',
        '  // TOP pointer increments',
        '}'
      ];
      const steps = [
        {
          desc: 'Starting with stack <code>[15, 25]</code>. Preparing to push <strong>35</strong>.',
          codeLine: 1,
          vars: { valToPush: 35, currentTop: 25 },
          items: [15, 25],
          topIdx: 1
        },
        {
          desc: 'Pushing 35 down into the vertical open container. It settles above 25.',
          codeLine: 3,
          vars: { pushed: 35, newLength: 3 },
          items: [15, 25, 35],
          topIdx: 2,
          highlightIdx: 2,
          output: '[15, 25, 35]'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'pop-op') {
      const code = [
        'function pop() {',
        '  if (this.isEmpty()) return null;',
        '  const topItem = this.items[this.items.length - 1];',
        '  this.items.length--; // remove top',
        '  return topItem;',
        '}'
      ];
      const steps = [
        {
          desc: 'Current stack: <code>[15, 25, 35]</code>. Top element is <strong>35</strong>.',
          codeLine: 3,
          vars: { topItem: 35, length: 3 },
          items: [15, 25, 35],
          topIdx: 2,
          highlightIdx: 2
        },
        {
          desc: 'Popping top item: 35 lifts out of the container. TOP pointer shifts down to 25.',
          codeLine: 4,
          vars: { removed: 35, newTop: 25, length: 2 },
          items: [15, 25],
          topIdx: 1,
          poppedVal: 35,
          output: 'Removed: 35'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'peek-op') {
      const code = [
        '// peek() reads top WITHOUT removing it',
        'function peek() {',
        '  if (this.isEmpty()) return null;',
        '  return this.items[this.items.length - 1];',
        '}'
      ];
      const steps = [
        {
          desc: 'Peek inspects the topmost element without modifying the stack.',
          codeLine: 2,
          vars: { action: 'peek', topIndex: 2 },
          items: [10, 20, 30],
          topIdx: 2
        },
        {
          desc: 'Read top: Value is <strong>30</strong>. Notice that 30 stays firmly in the stack!',
          codeLine: 4,
          vars: { peekValue: 30, stackUnmodified: true },
          items: [10, 20, 30],
          topIdx: 2,
          highlightIdx: 2,
          output: 'Peek value: 30 (Stack unchanged)'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'undo-demo') {
      const code = [
        'const history = []; // Undo stack',
        'history.push("Typed: Hello");',
        'history.push("Typed: World");',
        'history.push("Bolded text");',
        '// User presses Ctrl+Z (Undo):',
        'const lastAction = history.pop();'
      ];
      const steps = [
        {
          desc: 'Real-world example: Text editor Undo history.',
          codeLine: 1,
          vars: { actionsCount: 0 },
          items: [],
          topIdx: -1
        },
        {
          desc: 'Action 1 pushed: <code>"Typed: Hello"</code>',
          codeLine: 2,
          vars: { action: 'Typed: Hello' },
          items: ['Typed: Hello'],
          topIdx: 0
        },
        {
          desc: 'Action 2 pushed: <code>"Typed: World"</code>',
          codeLine: 3,
          vars: { action: 'Typed: World' },
          items: ['Typed: Hello', 'Typed: World'],
          topIdx: 1
        },
        {
          desc: 'Action 3 pushed: <code>"Bolded text"</code>',
          codeLine: 4,
          vars: { action: 'Bolded text' },
          items: ['Typed: Hello', 'Typed: World', 'Bolded text'],
          topIdx: 2
        },
        {
          desc: 'Ctrl+Z (Undo): Most recent action (<strong>"Bolded text"</strong>) is popped and reverted first!',
          codeLine: 6,
          vars: { undone: 'Bolded text', currentState: 'Typed: World' },
          items: ['Typed: Hello', 'Typed: World'],
          topIdx: 1,
          poppedVal: 'Bolded text',
          output: 'Reverted: "Bolded text"'
        }
      ];
      return { code, steps, complexity: 'O(1) LIFO Undo History' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;
    const items = step.items || [];

    const boxesHtml = items.map((val, idx) => {
      const isTop = idx === step.topIdx;
      const isHighlight = idx === step.highlightIdx;
      let boxClass = 'stack-plate';
      if (isTop) boxClass += ' stack-plate--top';
      if (isHighlight) boxClass += ' stack-plate--highlight';

      return `
        <div class="stack-plate-row">
          <div class="stack-plate-ptr">${isTop ? '<span class="stack-top-badge">TOP →</span>' : ''}</div>
          <div class="${boxClass}">
            <span class="stack-val">${val}</span>
            <span class="stack-idx">[${idx}]</span>
          </div>
        </div>
      `;
    }).reverse().join('');

    container.innerHTML = `
      <div class="stack-vertical-visual">
        <div class="stack-entry-funnel">
          <span class="stack-funnel-label">Push / Pop Entrance (Top Only) ↓↑</span>
        </div>
        ${step.poppedVal !== undefined && step.poppedVal !== null ? `
          <div class="stack-flying-item">
            <span class="flying-badge">Popped Out:</span>
            <span class="flying-val">${step.poppedVal}</span>
          </div>
        ` : ''}
        <div class="stack-chute">
          ${items.length === 0 ? '<div class="stack-empty-msg">Stack is empty (underflow if popped)</div>' : boxesHtml}
          <div class="stack-base-floor">BASE FLOOR</div>
        </div>
      </div>
    `;
  }

  function mountAdvancedStackVisualizer(container) {
    container.innerHTML = '';
    const operations = getOperations();
    let currentOpId = 'trace';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Vertical LIFO Stack Execution Visualizer',
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

  window.mountAdvancedStackVisualizer = mountAdvancedStackVisualizer;
})();
