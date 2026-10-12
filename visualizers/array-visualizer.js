/**
 * OneStep Journey — Arrays Interactive Visualizer
 * ──────────────────────────────────────────────────
 * Demonstrates:
 * - Read: array[2] (value 7) O(1)
 * - Traverse: visit all elements O(n)
 * - Add: append 9 (push) O(1) amortized
 * - Insert: insert 10 at index 3 with shifting O(n)
 * - Update: array[4] = 99 O(1)
 * - Delete: remove index 2 (value 7) with left shifting O(n)
 */

(function () {
  const SAMPLE_ARRAY = [8, 3, 7, 4, 2, 6, 1, 5];

  function getOperations() {
    return [
      { id: 'read', label: '1. Read array[2]', icon: '<iconify-icon icon="lucide:search"></iconify-icon>' },
      { id: 'traverse', label: '2. Traverse All', icon: '<iconify-icon icon="lucide:arrow-left-right"></iconify-icon>' },
      { id: 'add', label: '3. Add (push 9)', icon: '<iconify-icon icon="lucide:plus-circle"></iconify-icon>' },
      { id: 'insert', label: '4. Insert 10 @ idx 3', icon: '<iconify-icon icon="lucide:corner-down-right"></iconify-icon>' },
      { id: 'update', label: '5. Update array[4]=99', icon: '<iconify-icon icon="lucide:edit-3"></iconify-icon>' },
      { id: 'delete', label: '6. Delete idx 2', icon: '<iconify-icon icon="lucide:trash-2"></iconify-icon>' }
    ];
  }

  function generateSteps(opId) {
    if (opId === 'read') {
      const code = [
        'function readElement(arr, index) {',
        '  // Direct address calculation: Base + index * elementSize',
        '  if (index < 0 || index >= arr.length) return undefined;',
        '  return arr[index]; // O(1) instantaneous lookup',
        '}'
      ];
      const steps = [
        {
          desc: 'Start read operation: Access element at index 2 in <code>[8, 3, 7, 4, 2, 6, 1, 5]</code>.',
          codeLine: 1,
          vars: { index: 2, arrayLength: 8, complexity: 'O(1)' },
          array: [...SAMPLE_ARRAY],
          highlightIdx: -1,
          readIdx: -1,
          output: null
        },
        {
          desc: 'Bounds check: <code>0 <= 2 < 8</code> is valid. Direct hardware memory offset calculation performed.',
          codeLine: 3,
          vars: { index: 2, isValid: true, formula: 'baseAddr + 2 * 8 bytes' },
          array: [...SAMPLE_ARRAY],
          highlightIdx: 2,
          readIdx: -1,
          output: null
        },
        {
          desc: 'Direct jump: Read value at index 2 without scanning predecessor elements! Value is <strong>7</strong>.',
          codeLine: 4,
          vars: { index: 2, value: 7, time: 'O(1) Constant Time' },
          array: [...SAMPLE_ARRAY],
          highlightIdx: -1,
          readIdx: 2,
          output: 7
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'traverse') {
      const code = [
        'function traverseArray(arr) {',
        '  for (let i = 0; i < arr.length; i++) {',
        '    console.log(arr[i]); // visit element',
        '  }',
        '}'
      ];
      const steps = [
        {
          desc: 'Start linear traversal from index <code>i = 0</code> to <code>i = 7</code>.',
          codeLine: 1,
          vars: { i: 0, length: 8, visitedCount: 0 },
          array: [...SAMPLE_ARRAY],
          visitedIndices: [],
          activeIdx: -1,
          output: '[]'
        }
      ];

      const visited = [];
      for (let i = 0; i < SAMPLE_ARRAY.length; i++) {
        visited.push(i);
        steps.push({
          desc: `Visiting element at index <strong>${i}</strong>: Value is <strong>${SAMPLE_ARRAY[i]}</strong>.`,
          codeLine: 3,
          vars: { i, value: SAMPLE_ARRAY[i], length: 8, progress: `${i + 1}/8` },
          array: [...SAMPLE_ARRAY],
          visitedIndices: [...visited],
          activeIdx: i,
          output: JSON.stringify(visited.map(idx => SAMPLE_ARRAY[idx]))
        });
      }

      steps.push({
        desc: 'Traversal complete: All 8 elements visited sequentially in linear time.',
        codeLine: 4,
        vars: { totalVisited: 8, time: 'O(n) Linear Time' },
        array: [...SAMPLE_ARRAY],
        visitedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
        activeIdx: -1,
        output: JSON.stringify(SAMPLE_ARRAY)
      });
      return { code, steps, complexity: 'O(n) Time | O(1) Space' };
    }

    if (opId === 'add') {
      const code = [
        'function append(arr, element) {',
        '  // In JS dynamic array, push places item at next index',
        '  arr[arr.length] = element;',
        '  return arr.length;',
        '}'
      ];
      const steps = [
        {
          desc: 'Appending value <strong>9</strong> to the end of <code>[8, 3, 7, 4, 2, 6, 1, 5]</code>.',
          codeLine: 1,
          vars: { newElement: 9, currentLength: 8 },
          array: [...SAMPLE_ARRAY],
          activeIdx: -1,
          output: null
        },
        {
          desc: 'Target position is index <code>arr.length = 8</code>. No existing elements need to be shifted!',
          codeLine: 3,
          vars: { targetIndex: 8, value: 9 },
          array: [...SAMPLE_ARRAY, '...'],
          newIdx: 8,
          output: null
        },
        {
          desc: 'Value 9 inserted at index 8. Array length expands from 8 to 9.',
          codeLine: 4,
          vars: { newLength: 9, time: 'O(1) Amortized' },
          array: [...SAMPLE_ARRAY, 9],
          highlightIdx: 8,
          output: 'Array length: 9'
        }
      ];
      return { code, steps, complexity: 'O(1) Amortized Time | O(1) Space' };
    }

    if (opId === 'insert') {
      const code = [
        'function insertAt(arr, index, element) {',
        '  // Shift elements right starting from the end',
        '  for (let i = arr.length - 1; i >= index; i--) {',
        '    arr[i + 1] = arr[i];',
        '  }',
        '  arr[index] = element;',
        '}'
      ];
      const targetIdx = 3;
      const targetVal = 10;
      const steps = [
        {
          desc: `Goal: Insert value <strong>${targetVal}</strong> at index <strong>${targetIdx}</strong>.`,
          codeLine: 1,
          vars: { targetIndex: targetIdx, valueToInsert: targetVal, originalLength: 8 },
          array: [...SAMPLE_ARRAY],
          activeIdx: -1,
          shifting: null,
          output: null
        }
      ];

      let workingArr = [...SAMPLE_ARRAY, null];
      for (let i = SAMPLE_ARRAY.length - 1; i >= targetIdx; i--) {
        workingArr[i + 1] = workingArr[i];
        steps.push({
          desc: `Shift right: Moving element <strong>${SAMPLE_ARRAY[i]}</strong> from index <strong>${i}</strong> → <strong>${i + 1}</strong>.`,
          codeLine: 4,
          vars: { i, shiftedValue: SAMPLE_ARRAY[i], from: i, to: i + 1 },
          array: [...workingArr],
          shifting: { from: i, to: i + 1 },
          activeIdx: i + 1,
          output: null
        });
      }

      workingArr[targetIdx] = targetVal;
      steps.push({
        desc: `Insert: Vacant slot at index <strong>${targetIdx}</strong> now filled with <strong>${targetVal}</strong>!`,
        codeLine: 6,
        vars: { insertedIndex: targetIdx, value: targetVal, finalLength: 9 },
        array: [...workingArr],
        highlightIdx: targetIdx,
        shifting: null,
        output: JSON.stringify(workingArr)
      });

      return { code, steps, complexity: 'O(n) Linear Time | O(1) Space' };
    }

    if (opId === 'update') {
      const code = [
        'function updateElement(arr, index, newValue) {',
        '  if (index < 0 || index >= arr.length) return false;',
        '  arr[index] = newValue; // direct O(1) in-place rewrite',
        '  return true;',
        '}'
      ];
      const updateIdx = 4;
      const oldVal = SAMPLE_ARRAY[updateIdx];
      const newVal = 99;
      const updatedArr = [...SAMPLE_ARRAY];
      updatedArr[updateIdx] = newVal;

      const steps = [
        {
          desc: `Update element at index <strong>${updateIdx}</strong> from <strong>${oldVal}</strong> to <strong>${newVal}</strong>.`,
          codeLine: 1,
          vars: { index: updateIdx, oldValue: oldVal, newValue: newVal },
          array: [...SAMPLE_ARRAY],
          highlightIdx: updateIdx,
          output: null
        },
        {
          desc: `Direct in-place rewrite: Memory at index ${updateIdx} is overwritten with ${newVal}. No other elements moved.`,
          codeLine: 3,
          vars: { index: updateIdx, value: newVal, time: 'O(1) Constant' },
          array: [...updatedArr],
          highlightIdx: updateIdx,
          output: JSON.stringify(updatedArr)
        }
      ];
      return { code, steps, complexity: 'O(1) Time | O(1) Space' };
    }

    if (opId === 'delete') {
      const code = [
        'function deleteAt(arr, index) {',
        '  // Shift elements left to fill the vacant gap',
        '  for (let i = index; i < arr.length - 1; i++) {',
        '    arr[i] = arr[i + 1];',
        '  }',
        '  arr.length--; // truncate last duplicate item',
        '}'
      ];
      const delIdx = 2;
      const delVal = SAMPLE_ARRAY[delIdx];
      const steps = [
        {
          desc: `Delete element at index <strong>${delIdx}</strong> (value: <strong>${delVal}</strong>).`,
          codeLine: 1,
          vars: { indexToDelete: delIdx, value: delVal, length: 8 },
          array: [...SAMPLE_ARRAY],
          delIdx: delIdx,
          output: null
        }
      ];

      let workingArr = [...SAMPLE_ARRAY];
      for (let i = delIdx; i < SAMPLE_ARRAY.length - 1; i++) {
        workingArr[i] = workingArr[i + 1];
        steps.push({
          desc: `Shift left: Moving element <strong>${SAMPLE_ARRAY[i + 1]}</strong> from index <strong>${i + 1}</strong> ← into <strong>${i}</strong>.`,
          codeLine: 4,
          vars: { i, shiftedValue: SAMPLE_ARRAY[i + 1], from: i + 1, to: i },
          array: [...workingArr],
          shifting: { from: i + 1, to: i },
          activeIdx: i,
          output: null
        });
      }

      workingArr.pop();
      steps.push({
        desc: `Truncate: Last position cleared. Length is now 7. Result: <code>${JSON.stringify(workingArr)}</code>.`,
        codeLine: 6,
        vars: { finalLength: workingArr.length, time: 'O(n) Linear' },
        array: [...workingArr],
        shifting: null,
        activeIdx: -1,
        output: JSON.stringify(workingArr)
      });

      return { code, steps, complexity: 'O(n) Linear Time | O(1) Space' };
    }

    return { code: [], steps: [], complexity: 'O(1)' };
  }

  function renderVisual(container, step) {
    if (!container || !step) return;
    const array = step.array || [];

    const cellsHtml = array.map((val, idx) => {
      let cellClass = 'array-cell';
      let badge = '';

      if (idx === step.readIdx) {
        cellClass += ' array-cell--read';
        badge = '<span class="cell-tag cell-tag--read">READ O(1)</span>';
      } else if (idx === step.highlightIdx) {
        cellClass += ' array-cell--highlight';
        badge = '<span class="cell-tag cell-tag--highlight">TARGET</span>';
      } else if (idx === step.delIdx) {
        cellClass += ' array-cell--del';
        badge = '<span class="cell-tag cell-tag--del">REMOVED</span>';
      } else if (idx === step.activeIdx) {
        cellClass += ' array-cell--active';
        badge = '<span class="cell-tag cell-tag--active">ACTIVE</span>';
      } else if (step.visitedIndices && step.visitedIndices.includes(idx)) {
        cellClass += ' array-cell--visited';
        badge = '<span class="cell-tag cell-tag--visited">VISITED</span>';
      }

      if (step.shifting) {
        if (idx === step.shifting.to) {
          cellClass += ' array-cell--shifted-to';
        } else if (idx === step.shifting.from) {
          cellClass += ' array-cell--shifted-from';
        }
      }

      return `
        <div class="array-cell-wrapper" data-idx="${idx}">
          <div class="array-idx-label">[${idx}]</div>
          <div class="${cellClass}">
            <span class="cell-value">${val === null ? '∅' : val}</span>
            ${badge}
          </div>
          <div class="cell-addr">offset: +${idx * 4}B</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="array-visual-container">
        <div class="array-meta-strip">
          <span class="array-meta-pill">Length: <strong>${array.length}</strong></span>
          <span class="array-meta-pill">Zero-indexed: <strong>0 .. ${array.length - 1}</strong></span>
          <span class="array-meta-pill">Contiguous memory: <strong>Yes</strong></span>
        </div>
        <div class="array-cells-track">
          ${cellsHtml}
        </div>
        ${step.shifting ? `
          <div class="array-shift-alert">
            <iconify-icon icon="lucide:arrow-left-right" width="16" height="16" style="vertical-align:middle;margin-right:6px;"></iconify-icon> Shifting in progress: Moving element from [${step.shifting.from}] to [${step.shifting.to}] to preserve contiguous order.
          </div>
        ` : ''}
      </div>
    `;
  }

  function mountArrayVisualizer(container) {
    container.innerHTML = '';
    const operations = getOperations();
    let currentOpId = 'read';

    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title: 'Array Operations & Memory Shifting Visualizer',
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

    // Event Listeners
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

  window.mountArrayVisualizer = mountArrayVisualizer;
})();
