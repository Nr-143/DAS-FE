/**
 * OneStep Journey — Queue Interactive Visualizer
 * ────────────────────────────────────────────────
 * Demonstrates:
 * - Horizontal FIFO container with clearly labelled FRONT and REAR
 * - Enqueue (adds at rear), Dequeue (removes from front), Peek front, isEmpty
 * - Circular Queue demonstration with modulo pointer wrap-around:
 *   (rear + 1) % capacity — explaining why this avoids O(n) array shift()!
 */

(function () {
  function getOperations() {
    return [
      { id: 'fifo-demo', label: '1. Standard Queue (Enqueue/Dequeue)', icon: '<iconify-icon icon="lucide:arrow-right"></iconify-icon>' },
      { id: 'circular-queue', label: '2. Circular Queue O(1) Wrap', icon: '<iconify-icon icon="lucide:repeat"></iconify-icon>' },
      { id: 'peek-front', label: '3. Peek Front', icon: '<iconify-icon icon="lucide:eye"></iconify-icon>' },
      { id: 'empty-single', label: '4. Edge: Single & Empty', icon: '<iconify-icon icon="lucide:alert-triangle"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'fifo-demo') {
      const code = [
        'const q = new Queue();',
        'q.enqueue(10); // joined rear',
        'q.enqueue(20); // joined rear',
        'q.enqueue(30); // joined rear',
        'const served = q.dequeue(); // served from front: 10'
      ];
      const steps = [
        {
          desc: 'Line 1: Create an empty Queue. FIFO (First In, First Out) rules apply.',
          codeLine: 1,
          vars: { queue: '[]', front: 'none', rear: 'none', length: 0 },
          items: [],
          frontIdx: -1,
          rearIdx: -1,
          output: '[]'
        },
        {
          desc: 'Line 2: <code>enqueue(10)</code>. Value 10 enters at REAR. Both FRONT and REAR now point to 10.',
          codeLine: 2,
          vars: { enqueued: 10, front: 10, rear: 10, length: 1 },
          items: [10],
          frontIdx: 0,
          rearIdx: 0,
          highlightIdx: 0,
          output: '[10]'
        },
        {
          desc: 'Line 3: <code>enqueue(20)</code>. 20 arrives at REAR behind 10. REAR pointer moves to 20.',
          codeLine: 3,
          vars: { enqueued: 20, front: 10, rear: 20, length: 2 },
          items: [10, 20],
          frontIdx: 0,
          rearIdx: 1,
          highlightIdx: 1,
          output: '[10, 20]'
        },
        {
          desc: 'Line 4: <code>enqueue(30)</code>. 30 joins at REAR behind 20. REAR moves to 30.',
          codeLine: 4,
          vars: { enqueued: 30, front: 10, rear: 30, length: 3 },
          items: [10, 20, 30],
          frontIdx: 0,
          rearIdx: 2,
          highlightIdx: 2,
          output: '[10, 20, 30]'
        },
        {
          desc: 'Line 5: <code>dequeue()</code>. The first element to arrive (<strong>10</strong>) is served first from FRONT! FRONT moves to 20.',
          codeLine: 5,
          vars: { served: 10, newFront: 20, rear: 30, remaining: 2 },
          items: [20, 30],
          frontIdx: 0,
          rearIdx: 1,
          dequeuedVal: 10,
          output: 'Dequeued: 10 | Remaining: [20, 30]'
        }
      ];
      return { code, steps, complexity: 'O(1) Enqueue | O(1) Dequeue with pointers' };
    }

    if (opId === 'circular-queue') {
      const code = [
        '// Circular Queue with fixed array buffer (size = 5)',
        '// Avoids Array.shift() O(n) shifting cost!',
        'rear = (rear + 1) % capacity;   // enqueue wraps around',
        'front = (front + 1) % capacity; // dequeue wraps around'
      ];
      const buffer = [null, null, 20, 30, 40];
      const steps = [
        {
          desc: 'Problem with plain array queues: When elements are removed from the front, left cells are wasted unless all elements shift O(n).',
          codeLine: 2,
          vars: { capacity: 5, front: 2, rear: 4 },
          circularBuffer: [...buffer],
          front: 2,
          rear: 4,
          isCircular: true
        },
        {
          desc: 'Enqueue <strong>50</strong> with circular wrap: <code>rear = (4 + 1) % 5 = 0</code>! 50 wraps around and fills the empty slot at index 0!',
          codeLine: 3,
          vars: { 'newRear = (4 + 1) % 5': 0, inserted: 50 },
          circularBuffer: [50, null, 20, 30, 40],
          front: 2,
          rear: 0,
          highlightIdx: 0,
          isCircular: true,
          output: 'Buffer[0] = 50 (Wrapped around!)'
        },
        {
          desc: 'Dequeue from FRONT: <code>front = (2 + 1) % 5 = 3</code>. Node 20 served in O(1) time without shifting ANY elements!',
          codeLine: 4,
          vars: { served: 20, 'newFront': 3, time: 'O(1) True Constant Time' },
          circularBuffer: [50, null, null, 30, 40],
          front: 3,
          rear: 0,
          dequeuedVal: 20,
          isCircular: true,
          output: 'Served: 20 | Front is now at index 3'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(k) Fixed Buffer Space' };
    }

    if (opId === 'peek-front') {
      const code = [
        'function peek() {',
        '  if (this.isEmpty()) return null;',
        '  return this.items[this.front]; // O(1) inspect without removal',
        '}'
      ];
      const steps = [
        {
          desc: 'Peek front element of queue <code>[10, 20, 30]</code>.',
          codeLine: 2,
          vars: { action: 'peek', frontIndex: 0 },
          items: [10, 20, 30],
          frontIdx: 0,
          rearIdx: 2
        },
        {
          desc: 'Front value is <strong>10</strong>. Value is read without modifying or removing from the queue.',
          codeLine: 3,
          vars: { frontVal: 10, queueUnchanged: true },
          items: [10, 20, 30],
          frontIdx: 0,
          rearIdx: 2,
          highlightIdx: 0,
          output: 'Peek: 10'
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'empty-single') {
      const code = [
        'function dequeue() {',
        '  if (this.front === this.rear) {',
        '    // Single element queue becomes empty',
        '    this.front = -1; this.rear = -1;',
        '  }',
        '}'
      ];
      const steps = [
        {
          desc: 'Single element queue state: <code>items = [99]</code>. Both FRONT and REAR point to index 0.',
          codeLine: 2,
          vars: { front: 0, rear: 0, length: 1 },
          items: [99],
          frontIdx: 0,
          rearIdx: 0
        },
        {
          desc: 'Dequeue last item: 99 is removed. Queue resets to empty state (<code>front = -1, rear = -1</code>).',
          codeLine: 4,
          vars: { dequeued: 99, isEmpty: true, front: -1, rear: -1 },
          items: [],
          frontIdx: -1,
          rearIdx: -1,
          dequeuedVal: 99,
          output: 'Queue is now empty.'
        }
      ];
      return { code, steps, complexity: 'O(1) Edge Handling' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;

    if (step.isCircular) {
      const buffer = step.circularBuffer || [];
      const cells = buffer.map((val, idx) => {
        const isF = idx === step.front;
        const isR = idx === step.rear;
        const isH = idx === step.highlightIdx;
        let cellClass = 'queue-slot';
        if (isH) cellClass += ' queue-slot--highlight';
        if (isF) cellClass += ' queue-slot--front';
        if (isR) cellClass += ' queue-slot--rear';

        return `
          <div class="circular-slot-wrapper">
            <div class="circular-ptrs">
              ${isF ? '<span class="q-tag q-tag--front">FRONT</span>' : ''}
              ${isR ? '<span class="q-tag q-tag--rear">REAR</span>' : ''}
            </div>
            <div class="${cellClass}">
              <span class="slot-val">${val === null ? '∅' : val}</span>
              <span class="slot-idx">[${idx}]</span>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="circular-queue-visual">
          <div class="circular-intro">
            <strong>Circular Buffer (Capacity: 5)</strong> — Pointer indices wrap around automatically using <code>(idx + 1) % 5</code>!
          </div>
          <div class="circular-slots-track">
            ${cells}
          </div>
          ${step.dequeuedVal !== undefined && step.dequeuedVal !== null ? `
            <div class="queue-dequeued-banner">
              Served from FRONT: <strong>${step.dequeuedVal}</strong>
            </div>
          ` : ''}
        </div>
      `;
      return;
    }

    const items = step.items || [];
    const cellsHtml = items.map((val, idx) => {
      const isFront = idx === 0;
      const isRear = idx === items.length - 1;
      const isH = idx === step.highlightIdx;

      let cellClass = 'queue-person';
      if (isFront) cellClass += ' queue-person--front';
      if (isRear) cellClass += ' queue-person--rear';
      if (isH) cellClass += ' queue-person--highlight';

      return `
        <div class="queue-person-wrapper">
          <div class="queue-ptrs-tag">
            ${isFront ? '<span class="q-tag q-tag--front">FRONT</span>' : ''}
            ${isRear ? '<span class="q-tag q-tag--rear">REAR</span>' : ''}
          </div>
          <div class="${cellClass}">
            <span class="q-val">${val}</span>
            <span class="q-pos">pos ${idx}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="queue-horizontal-visual">
        <div class="queue-side-label queue-side-label--front">
          <span>← DEQUEUE (Front)</span>
        </div>
        <div class="queue-tunnel">
          ${items.length === 0 ? '<div class="queue-empty-msg">Queue is empty</div>' : cellsHtml}
        </div>
        <div class="queue-side-label queue-side-label--rear">
          <span>ENQUEUE (Rear) ←</span>
        </div>
      </div>
      ${step.dequeuedVal !== undefined && step.dequeuedVal !== null ? `
        <div class="queue-dequeued-banner">
          Removed from FRONT: <strong>${step.dequeuedVal}</strong>
        </div>
      ` : ''}
    `;
  }

  function mountAdvancedQueueVisualizer(container) {
    container.innerHTML = '';
    const operations = getOperations();
    let currentOpId = 'fifo-demo';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Horizontal FIFO Queue & Circular Buffer Visualizer',
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

  window.mountAdvancedQueueVisualizer = mountAdvancedQueueVisualizer;
})();
