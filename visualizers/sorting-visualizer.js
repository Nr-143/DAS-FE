/**
 * OneStep Journey — Shared Interactive Sorting Visualizer
 * ──────────────────────────────────────────────────────────
 * Unified interactive visualizer supporting 5 sorting algorithms:
 * 1. Bubble Sort (with early-exit optimization)
 * 2. Selection Sort (with minIndex scanning & 1-swap-per-pass)
 * 3. Insertion Sort (with key pickup, right-shifting & insertion)
 * 4. Merge Sort (with divide-and-conquer split tree & merge buffer)
 * 5. Quick Sort (with Lomuto partitioning & deterministic pivot)
 *
 * Starts consistently from: [8, 3, 7, 4, 2, 6, 1, 5]
 * Clones clean arrays for every run to guarantee data immutability.
 * Synchronized with line-by-line JavaScript execution engine.
 */

(function () {
  const DEFAULT_ARRAY = [8, 3, 7, 4, 2, 6, 1, 5];

  const BUBBLE_CODE = [
    'function bubbleSort(arr) {',
    '  const result = [...arr];',
    '',
    '  for (let i = 0; i < result.length - 1; i++) {',
    '    let swapped = false;',
    '',
    '    for (let j = 0; j < result.length - i - 1; j++) {',
    '      if (result[j] > result[j + 1]) {',
    '        [result[j], result[j + 1]] =',
    '          [result[j + 1], result[j]];',
    '',
    '        swapped = true;',
    '      }',
    '    }',
    '',
    '    if (!swapped) break;',
    '  }',
    '',
    '  return result;',
    '}'
  ];

  const SELECTION_CODE = [
    'function selectionSort(arr) {',
    '  const result = [...arr];',
    '',
    '  for (let i = 0; i < result.length - 1; i++) {',
    '    let minIndex = i;',
    '',
    '    for (let j = i + 1; j < result.length; j++) {',
    '      if (result[j] < result[minIndex]) {',
    '        minIndex = j;',
    '      }',
    '    }',
    '',
    '    if (minIndex !== i) {',
    '      [result[i], result[minIndex]] =',
    '        [result[minIndex], result[i]];',
    '    }',
    '  }',
    '',
    '  return result;',
    '}'
  ];

  const INSERTION_CODE = [
    'function insertionSort(arr) {',
    '  const result = [...arr];',
    '',
    '  for (let i = 1; i < result.length; i++) {',
    '    const key = result[i];',
    '    let j = i - 1;',
    '',
    '    while (j >= 0 && result[j] > key) {',
    '      result[j + 1] = result[j];',
    '      j--;',
    '    }',
    '',
    '    result[j + 1] = key;',
    '  }',
    '',
    '  return result;',
    '}'
  ];

  const MERGE_CODE = [
    'function mergeSort(arr) {',
    '  if (arr.length <= 1) return arr;',
    '  const mid = Math.floor(arr.length / 2);',
    '  const left = mergeSort(arr.slice(0, mid));',
    '  const right = mergeSort(arr.slice(mid));',
    '  return merge(left, right);',
    '}',
    'function merge(left, right) {',
    '  const result = [];',
    '  let i = 0, j = 0;',
    '  while (i < left.length && j < right.length) {',
    '    if (left[i] <= right[j]) {',
    '      result.push(left[i]); i++;',
    '    } else {',
    '      result.push(right[j]); j++;',
    '    }',
    '  }',
    '  return result.concat(left.slice(i), right.slice(j));',
    '}'
  ];

  const QUICK_CODE = [
    'function quickSort(arr) {',
    '  const result = [...arr];',
    '  function partition(low, high) {',
    '    const pivot = result[high];',
    '    let i = low;',
    '    for (let j = low; j < high; j++) {',
    '      if (result[j] < pivot) {',
    '        [result[i], result[j]] = [result[j], result[i]];',
    '        i++;',
    '      }',
    '    }',
    '    [result[i], result[high]] = [result[high], result[i]];',
    '    return i;',
    '  }',
    '  function sort(low, high) {',
    '    if (low >= high) return;',
    '    const pivotIndex = partition(low, high);',
    '    sort(low, pivotIndex - 1);',
    '    sort(pivotIndex + 1, high);',
    '  }',
    '  sort(0, result.length - 1);',
    '  return result;',
    '}'
  ];

  /* -------------------------------------------------------------
   * STEP GENERATORS
   * ------------------------------------------------------------- */

  // 1. Bubble Sort Generator
  function generateBubbleSortSteps(input) {
    const arr = [...input];
    const steps = [];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    if (n <= 1) {
      steps.push({
        desc: n === 0 ? 'Array is empty. Length <= 1, already sorted.' : `Array contains 1 element (${arr[0]}). Already sorted.`,
        codeLine: 19,
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: n === 1 ? [0] : [],
        vars: { length: n, comparisons: 0, swaps: 0, status: 'Sorted' }
      });
      return { code: BUBBLE_CODE, steps, complexity: 'O(1) Best | O(n²) Worst | O(1) Space' };
    }

    steps.push({
      desc: `Initialize Bubble Sort on <code>[${arr.join(', ')}]</code>. Repeatedly compares adjacent neighbors and floats the largest unsorted element toward the end of each pass.`,
      codeLine: 1,
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      vars: { i: 'not started', j: 'not started', swapped: false, comparisons: 0, swaps: 0, status: 'Ready' }
    });

    const sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      steps.push({
        desc: `<strong>Pass ${i + 1} begins</strong> (<code>i = ${i}</code>). Reset <code>swapped = false</code>. Scanning active unsorted window from index 0 to ${n - 1 - i}.`,
        codeLine: 4,
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        vars: { i, swapped: false, comparisons, swaps, status: `Pass ${i + 1}` }
      });

      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        const needSwap = arr[j] > arr[j + 1];

        steps.push({
          desc: `Compare adjacent elements: <code>arr[${j}] (${arr[j]}) &gt; arr[${j + 1}] (${arr[j + 1]})</code> &rarr; <strong>${needSwap ? 'TRUE (out of order)' : 'FALSE (already in order)'}</strong>.`,
          codeLine: 8,
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: [...sortedIndices],
          cmpExpr: `${arr[j]} > ${arr[j + 1]} ? ${needSwap ? 'Swap needed!' : 'No swap (order correct)'}`,
          prediction: needSwap ? `Because ${arr[j]} > ${arr[j + 1]}, they will swap positions so the larger value moves right.` : `Because ${arr[j]} <= ${arr[j + 1]}, they remain in place.`,
          vars: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1], swapped, comparisons, swaps }
        });

        if (needSwap) {
          swaps++;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          steps.push({
            desc: `Swapped <code>arr[${j}]</code> and <code>arr[${j + 1}]</code>. Array state: <code>[${arr.join(', ')}]</code>. Set <code>swapped = true</code>.`,
            codeLine: 9,
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1],
            sorted: [...sortedIndices],
            vars: { i, j, 'swapped': true, comparisons, swaps, status: 'Swapped' }
          });
        }
      }

      const settledIdx = n - 1 - i;
      if (!sortedIndices.includes(settledIdx)) {
        sortedIndices.push(settledIdx);
      }

      steps.push({
        desc: `End of Pass ${i + 1}: Element <strong>${arr[settledIdx]}</strong> at index ${settledIdx} has bubbled to its final sorted position.`,
        codeLine: 13,
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        vars: { i, settledAt: settledIdx, swapped, comparisons, swaps, status: 'Element Settled' }
      });

      if (!swapped) {
        steps.push({
          desc: `<strong>Early Termination Optimization triggered!</strong> Zero swaps occurred during pass ${i + 1} (<code>swapped === false</code>). The array is guaranteed to be completely sorted. Exiting loop early!`,
          codeLine: 16,
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: n }, (_, idx) => idx),
          vars: { i, swapped: false, comparisons, swaps, status: 'Early Stop: Fully Sorted' }
        });
        break;
      }
    }

    steps.push({
      desc: `Bubble Sort finished! Final sorted array: <code>[${arr.join(', ')}]</code>. Total comparisons: <strong>${comparisons}</strong>, total swaps: <strong>${swaps}</strong>.`,
      codeLine: 19,
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      vars: { comparisons, swaps, status: 'Sorted' }
    });

    return { code: BUBBLE_CODE, steps, complexity: 'O(n) Best (Optimized) | O(n²) Worst | O(1) Space' };
  }

  // 2. Selection Sort Generator
  function generateSelectionSortSteps(input) {
    const arr = [...input];
    const steps = [];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    if (n <= 1) {
      steps.push({
        desc: n === 0 ? 'Array is empty. Already sorted.' : `Array contains 1 element (${arr[0]}). Already sorted.`,
        codeLine: 19,
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: n === 1 ? [0] : [],
        vars: { comparisons: 0, swaps: 0, status: 'Sorted' }
      });
      return { code: SELECTION_CODE, steps, complexity: 'O(n²) Time in All Cases | O(1) Space' };
    }

    steps.push({
      desc: `Initialize Selection Sort on <code>[${arr.join(', ')}]</code>. Divides the array into sorted (front) and unsorted (right) portions. Scans for the minimum value and swaps it into place at most once per pass.`,
      codeLine: 1,
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      vars: { i: 'not started', minIndex: '-', comparisons: 0, swaps: 0, status: 'Ready' }
    });

    const sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      steps.push({
        desc: `<strong>Pass ${i + 1} begins</strong> (<code>i = ${i}</code>). Target position is index ${i}. Assume initial minimum candidate is <strong>${arr[i]}</strong> at index ${i} (<code>minIndex = ${i}</code>).`,
        codeLine: 5,
        array: [...arr],
        minIndex,
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        vars: { i, minIndex, minVal: arr[i], comparisons, swaps, status: 'Find Min' }
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        const isSmaller = arr[j] < arr[minIndex];

        steps.push({
          desc: `Compare candidate: <code>arr[${j}] (${arr[j]}) &lt; arr[minIndex] (${arr[minIndex]})</code> &rarr; <strong>${isSmaller ? 'TRUE (New Min Found!)' : 'FALSE'}</strong>.`,
          codeLine: 8,
          array: [...arr],
          minIndex,
          comparing: [j, minIndex],
          swapping: [],
          sorted: [...sortedIndices],
          cmpExpr: `${arr[j]} < ${arr[minIndex]} ? ${isSmaller ? 'New minimum found!' : 'Current minimum remains'}`,
          prediction: isSmaller ? `Element ${arr[j]} is strictly smaller than ${arr[minIndex]}, so minIndex updates to ${j}.` : `Element ${arr[j]} is not smaller, so minIndex stays ${minIndex}.`,
          vars: { i, j, minIndex, 'arr[j]': arr[j], 'arr[minIndex]': arr[minIndex], comparisons, swaps }
        });

        if (isSmaller) {
          minIndex = j;
          steps.push({
            desc: `Updated minimum marker: <code>minIndex = ${j}</code> (new lowest value is <strong>${arr[j]}</strong>).`,
            codeLine: 9,
            array: [...arr],
            minIndex,
            comparing: [],
            swapping: [],
            sorted: [...sortedIndices],
            vars: { i, minIndex, newMinVal: arr[j], comparisons, swaps, status: 'Min Updated' }
          });
        }
      }

      if (minIndex !== i) {
        swaps++;
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({
          desc: `Swap minimum element <strong>${arr[i]}</strong> (from index ${minIndex}) into its correct sorted spot at index ${i}. (Performs at most 1 swap per pass).`,
          codeLine: 14,
          array: [...arr],
          minIndex: i,
          comparing: [],
          swapping: [i, minIndex],
          sorted: [...sortedIndices],
          vars: { i, swapped: `[${i}] <-> [${minIndex}]`, comparisons, swaps, status: 'Swap Min' }
        });
      } else {
        steps.push({
          desc: `Minimum candidate was already at index ${i}. No swap needed for this pass!`,
          codeLine: 13,
          array: [...arr],
          minIndex: i,
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          vars: { i, note: 'Already in position', comparisons, swaps, status: 'No Swap Needed' }
        });
      }

      sortedIndices.push(i);
      steps.push({
        desc: `Index ${i} (value <strong>${arr[i]}</strong>) is locked in its final position. Sorted boundary extends to <code>[0..${i}]</code>.`,
        codeLine: 17,
        array: [...arr],
        minIndex: -1,
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        vars: { i, sortedCount: sortedIndices.length, comparisons, swaps, status: 'Boundary Expanded' }
      });
    }

    sortedIndices.push(n - 1);

    steps.push({
      desc: `Selection Sort finished! Final sorted array: <code>[${arr.join(', ')}]</code>. Total comparisons: <strong>${comparisons}</strong>, total swaps: <strong>${swaps}</strong> (at most n-1 swaps total).`,
      codeLine: 19,
      array: [...arr],
      minIndex: -1,
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      vars: { comparisons, swaps, status: 'Sorted' }
    });

    return { code: SELECTION_CODE, steps, complexity: 'O(n²) Time in All Cases | O(n) Swaps | O(1) Space' };
  }

  // 3. Insertion Sort Generator
  function generateInsertionSortSteps(input) {
    const arr = [...input];
    const steps = [];
    const n = arr.length;
    let comparisons = 0;
    let moves = 0;

    if (n <= 1) {
      steps.push({
        desc: n === 0 ? 'Array is empty. Already sorted.' : `Array contains 1 element (${arr[0]}). Already sorted.`,
        codeLine: 16,
        array: [...arr],
        keyIndex: -1,
        comparing: [],
        shifting: [],
        sorted: n === 1 ? [0] : [],
        vars: { comparisons: 0, moves: 0, status: 'Sorted' }
      });
      return { code: INSERTION_CODE, steps, complexity: 'O(n) Best | O(n²) Worst | O(1) Space' };
    }

    steps.push({
      desc: `Initialize Insertion Sort on <code>[${arr.join(', ')}]</code>. Think of sorting playing cards in your hand: index 0 (<strong>${arr[0]}</strong>) is treated as initially sorted. Each subsequent element is picked up as <code>key</code> and inserted into its proper place.`,
      codeLine: 1,
      array: [...arr],
      keyIndex: -1,
      comparing: [],
      shifting: [],
      sorted: [0],
      vars: { i: 'not started', key: '-', j: '-', comparisons: 0, moves: 0, status: 'Ready' }
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        desc: `<strong>Iteration ${i}</strong>: Pick element at index ${i} (value <strong>${key}</strong>) as the active <code>key</code>. Sorted portion is <code>[0..${i - 1}]</code>. Will compare backwards and shift larger elements right.`,
        codeLine: 5,
        array: [...arr],
        keyIndex: i,
        keyVal: key,
        comparing: [],
        shifting: [],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        vars: { i, key, j, comparisons, moves, status: 'Pick Key' }
      });

      while (j >= 0) {
        comparisons++;
        const needShift = arr[j] > key;

        steps.push({
          desc: `Compare sorted element with key: <code>arr[${j}] (${arr[j]}) &gt; key (${key})</code> &rarr; <strong>${needShift ? 'TRUE (Shift right)' : 'FALSE (Found position)'}</strong>.`,
          codeLine: 8,
          array: [...arr],
          keyIndex: i,
          keyVal: key,
          comparing: [j, i],
          shifting: [],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          cmpExpr: `${arr[j]} > ${key} ? ${needShift ? 'Shift right!' : 'Insert position found'}`,
          prediction: needShift ? `Because ${arr[j]} > ${key}, element ${arr[j]} will shift right into index ${j + 1}.` : `Because ${arr[j]} <= ${key}, the key belongs immediately after index ${j} (at ${j + 1}).`,
          vars: { i, key, j, 'arr[j]': arr[j], comparisons, moves }
        });

        if (needShift) {
          moves++;
          arr[j + 1] = arr[j];
          steps.push({
            desc: `Shifted <strong>${arr[j]}</strong> right from index ${j} into index ${j + 1}. Decrement <code>j</code> to ${j - 1}.`,
            codeLine: 9,
            array: [...arr],
            keyIndex: -1,
            keyVal: key,
            comparing: [],
            shifting: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            vars: { i, key, j: j - 1, shifted: `${arr[j]} -> [${j + 1}]`, comparisons, moves, status: 'Shifted Right' }
          });
          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      moves++;
      steps.push({
        desc: `Inserted key <strong>${key}</strong> at its correct sorted position: index <code>${j + 1}</code>. Sorted portion now extends from index 0 to ${i}.`,
        codeLine: 13,
        array: [...arr],
        keyIndex: j + 1,
        keyVal: key,
        comparing: [],
        shifting: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        vars: { i, key, insertedAt: j + 1, comparisons, moves, status: 'Key Inserted' }
      });
    }

    steps.push({
      desc: `Insertion Sort finished! Final sorted array: <code>[${arr.join(', ')}]</code>. Total comparisons: <strong>${comparisons}</strong>, shifts/moves: <strong>${moves}</strong>.`,
      codeLine: 16,
      array: [...arr],
      keyIndex: -1,
      comparing: [],
      shifting: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      vars: { comparisons, moves, status: 'Sorted' }
    });

    return { code: INSERTION_CODE, steps, complexity: 'O(n) Best (Sorted) | O(n²) Worst | O(1) Space' };
  }

  // 4. Merge Sort Generator
  function generateMergeSortSteps(input) {
    const masterArr = [...input];
    const steps = [];
    const n = masterArr.length;
    let comparisons = 0;
    let moves = 0;

    if (n <= 1) {
      steps.push({
        desc: n === 0 ? 'Array is empty. Already sorted.' : `Array has 1 element (${masterArr[0]}). Base case reached (already sorted).`,
        codeLine: 2,
        array: [...masterArr],
        comparing: [],
        sorted: n === 1 ? [0] : [],
        vars: { comparisons: 0, moves: 0, status: 'Base Case' }
      });
      return { code: MERGE_CODE, steps, complexity: 'O(n log n) Best/Avg/Worst | O(n) Aux Space' };
    }

    steps.push({
      desc: `Initialize Merge Sort (Divide & Conquer) on <code>[${masterArr.join(', ')}]</code>. Recursively splits array into halves until 1-element subarrays remain, then merges sorted subarrays back together.`,
      codeLine: 1,
      array: [...masterArr],
      activeRange: [0, n - 1],
      comparing: [],
      sorted: [],
      vars: { status: 'Divide phase starting', comparisons: 0, moves: 0 }
    });

    function mergeSortHelper(low, high, depth = 0) {
      if (low >= high) return;

      const mid = Math.floor((low + high) / 2);

      steps.push({
        desc: `<strong>Divide Phase (Depth ${depth})</strong>: Subarray range <code>[${low}..${high}]</code> split at <code>mid = ${mid}</code> into left <code>[${low}..${mid}]</code> and right <code>[${mid + 1}..${high}]</code>.`,
        codeLine: 3,
        array: [...masterArr],
        activeRange: [low, high],
        mid,
        depth,
        comparing: [],
        sorted: [],
        vars: { depth, low, high, mid, leftPart: `[${low}..${mid}]`, rightPart: `[${mid + 1}..${high}]`, status: 'Divide' }
      });

      mergeSortHelper(low, mid, depth + 1);
      mergeSortHelper(mid + 1, high, depth + 1);

      const leftPart = masterArr.slice(low, mid + 1);
      const rightPart = masterArr.slice(mid + 1, high + 1);
      const tempMerged = [];
      let i = 0;
      let j = 0;

      steps.push({
        desc: `<strong>Merge Phase Begins</strong>: Merging sorted left part <code>[${leftPart.join(', ')}]</code> and sorted right part <code>[${rightPart.join(', ')}]</code> back into range <code>[${low}..${high}]</code>.`,
        codeLine: 8,
        array: [...masterArr],
        activeRange: [low, high],
        leftPart: [...leftPart],
        rightPart: [...rightPart],
        leftPtr: 0,
        rightPtr: 0,
        tempMerged: [],
        comparing: [],
        sorted: [],
        vars: { low, high, i: 0, j: 0, leftSize: leftPart.length, rightSize: rightPart.length, status: 'Merge Start' }
      });

      while (i < leftPart.length && j < rightPart.length) {
        comparisons++;
        const pickLeft = leftPart[i] <= rightPart[j];

        steps.push({
          desc: `Compare heads: <code>left[${i}] (${leftPart[i]}) &lt;= right[${j}] (${rightPart[j]})</code> &rarr; <strong>${pickLeft ? 'Take Left' : 'Take Right'}</strong>.`,
          codeLine: 12,
          array: [...masterArr],
          activeRange: [low, high],
          leftPart: [...leftPart],
          rightPart: [...rightPart],
          leftPtr: i,
          rightPtr: j,
          tempMerged: [...tempMerged],
          comparing: [],
          sorted: [],
          cmpExpr: `${leftPart[i]} <= ${rightPart[j]} ? Pick ${pickLeft ? leftPart[i] : rightPart[j]}`,
          prediction: pickLeft ? `Left element ${leftPart[i]} <= right element ${rightPart[j]}, so append ${leftPart[i]} to merge buffer.` : `Right element ${rightPart[j]} < left element ${leftPart[i]}, so append ${rightPart[j]} to merge buffer.`,
          vars: { i, j, 'left[i]': leftPart[i], 'right[j]': rightPart[j], comparisons, moves, status: 'Comparing' }
        });

        if (pickLeft) {
          tempMerged.push(leftPart[i]);
          i++;
        } else {
          tempMerged.push(rightPart[j]);
          j++;
        }
        moves++;

        steps.push({
          desc: `Pushed <strong>${tempMerged[tempMerged.length - 1]}</strong> into temporary merge buffer: <code>[${tempMerged.join(', ')}]</code>.`,
          codeLine: pickLeft ? 13 : 15,
          array: [...masterArr],
          activeRange: [low, high],
          leftPart: [...leftPart],
          rightPart: [...rightPart],
          leftPtr: i,
          rightPtr: j,
          tempMerged: [...tempMerged],
          comparing: [],
          sorted: [],
          vars: { i, j, buffer: `[${tempMerged.join(', ')}]`, comparisons, moves, status: 'Buffer Push' }
        });
      }

      while (i < leftPart.length) {
        tempMerged.push(leftPart[i]);
        i++;
        moves++;
        steps.push({
          desc: `Append remaining left element <strong>${leftPart[i - 1]}</strong> to buffer: <code>[${tempMerged.join(', ')}]</code>.`,
          codeLine: 18,
          array: [...masterArr],
          activeRange: [low, high],
          leftPart: [...leftPart],
          rightPart: [...rightPart],
          leftPtr: i,
          rightPtr: j,
          tempMerged: [...tempMerged],
          comparing: [],
          sorted: [],
          vars: { i, j, buffer: `[${tempMerged.join(', ')}]`, comparisons, moves, status: 'Drain Left' }
        });
      }

      while (j < rightPart.length) {
        tempMerged.push(rightPart[j]);
        j++;
        moves++;
        steps.push({
          desc: `Append remaining right element <strong>${rightPart[j - 1]}</strong> to buffer: <code>[${tempMerged.join(', ')}]</code>.`,
          codeLine: 18,
          array: [...masterArr],
          activeRange: [low, high],
          leftPart: [...leftPart],
          rightPart: [...rightPart],
          leftPtr: i,
          rightPtr: j,
          tempMerged: [...tempMerged],
          comparing: [],
          sorted: [],
          vars: { i, j, buffer: `[${tempMerged.join(', ')}]`, comparisons, moves, status: 'Drain Right' }
        });
      }

      for (let k = 0; k < tempMerged.length; k++) {
        masterArr[low + k] = tempMerged[k];
      }

      const isGlobalFinish = low === 0 && high === n - 1;
      steps.push({
        desc: `Merged result <code>[${tempMerged.join(', ')}]</code> written back into master array range <code>[${low}..${high}]</code>.`,
        codeLine: 6,
        array: [...masterArr],
        activeRange: [low, high],
        leftPart: null,
        rightPart: null,
        tempMerged: [...tempMerged],
        comparing: [],
        sorted: isGlobalFinish ? Array.from({ length: n }, (_, idx) => idx) : [],
        vars: { low, high, mergedCount: tempMerged.length, comparisons, moves, status: 'Range Merged' }
      });
    }

    mergeSortHelper(0, n - 1);

    steps.push({
      desc: `Merge Sort finished! Final sorted array: <code>[${masterArr.join(', ')}]</code>. Total comparisons: <strong>${comparisons}</strong>, buffer moves: <strong>${moves}</strong>.`,
      codeLine: 6,
      array: [...masterArr],
      activeRange: [],
      leftPart: null,
      rightPart: null,
      tempMerged: null,
      comparing: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      vars: { comparisons, moves, status: 'Sorted' }
    });

    return { code: MERGE_CODE, steps, complexity: 'O(n log n) Best/Avg/Worst | O(n) Aux Space' };
  }

  // 5. Quick Sort Generator (Lomuto Partition)
  function generateQuickSortSteps(input) {
    const arr = [...input];
    const steps = [];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices = [];

    if (n <= 1) {
      steps.push({
        desc: n === 0 ? 'Array is empty. Already sorted.' : `Array has 1 element (${arr[0]}). Base case reached (already sorted).`,
        codeLine: 22,
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: n === 1 ? [0] : [],
        vars: { comparisons: 0, swaps: 0, status: 'Base Case' }
      });
      return { code: QUICK_CODE, steps, complexity: 'O(n log n) Avg | O(n²) Worst | O(log n) Stack' };
    }

    steps.push({
      desc: `Initialize Quick Sort (Divide & Conquer) on <code>[${arr.join(', ')}]</code>. Uses Lomuto partitioning scheme: the last element of the active subarray is chosen as deterministic <code>pivot</code>.`,
      codeLine: 1,
      array: [...arr],
      activeRange: [0, n - 1],
      pivotIndex: -1,
      comparing: [],
      swapping: [],
      sorted: [],
      vars: { status: 'Quick Sort starting', comparisons: 0, swaps: 0 }
    });

    function quickSortHelper(low, high) {
      if (low >= high) {
        if (low === high && !sortedIndices.includes(low)) sortedIndices.push(low);
        return;
      }

      const pivot = arr[high];
      let i = low;

      steps.push({
        desc: `<strong>Partitioning range [${low}..${high}]</strong>. Selected pivot: <strong>${pivot}</strong> at index ${high}. Partition boundary starts at <code>i = ${low}</code>.`,
        codeLine: 4,
        array: [...arr],
        activeRange: [low, high],
        pivotIndex: high,
        pointerI: i,
        pointerJ: low,
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        vars: { low, high, pivot, i, j: low, comparisons, swaps, status: 'Pick Pivot' }
      });

      for (let j = low; j < high; j++) {
        comparisons++;
        const isSmaller = arr[j] < pivot;

        steps.push({
          desc: `Compare element with pivot: <code>arr[${j}] (${arr[j]}) &lt; pivot (${pivot})</code> &rarr; <strong>${isSmaller ? 'TRUE (Move to Left Partition)' : 'FALSE (Keep on Right)'}</strong>.`,
          codeLine: 7,
          array: [...arr],
          activeRange: [low, high],
          pivotIndex: high,
          pointerI: i,
          pointerJ: j,
          comparing: [j, high],
          swapping: [],
          sorted: [...sortedIndices],
          cmpExpr: `${arr[j]} < ${pivot} ? ${isSmaller ? 'Swap to left partition' : 'Keep on right'}`,
          prediction: isSmaller ? `Element ${arr[j]} < pivot ${pivot}, so swap with arr[i] and increment partition boundary i.` : `Element ${arr[j]} >= pivot ${pivot}, so keep it on the right side.`,
          vars: { low, high, pivot, i, j, 'arr[j]': arr[j], comparisons, swaps, status: 'Scanning' }
        });

        if (isSmaller) {
          if (i !== j) {
            swaps++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({
              desc: `Swapped <code>arr[${i}]</code> (${arr[i]}) with <code>arr[${j}]</code> (${arr[j]}). Advanced partition boundary <code>i</code> to ${i + 1}.`,
              codeLine: 8,
              array: [...arr],
              activeRange: [low, high],
              pivotIndex: high,
              pointerI: i + 1,
              pointerJ: j,
              comparing: [],
              swapping: [i, j],
              sorted: [...sortedIndices],
              vars: { low, high, pivot, i: i + 1, j, comparisons, swaps, status: 'Swapped' }
            });
          }
          i++;
        }
      }

      swaps++;
      [arr[i], arr[high]] = [arr[high], arr[i]];
      const pivotFinalIndex = i;
      if (!sortedIndices.includes(pivotFinalIndex)) sortedIndices.push(pivotFinalIndex);

      steps.push({
        desc: `Pivot <strong>${arr[i]}</strong> swapped with <code>arr[${i}]</code>. Pivot is now <strong>locked in its final sorted position at index ${pivotFinalIndex}</strong>. All elements to its left are smaller; all elements to its right are greater or equal.`,
        codeLine: 12,
        array: [...arr],
        activeRange: [low, high],
        pivotIndex: pivotFinalIndex,
        pointerI: i,
        comparing: [],
        swapping: [i, high],
        sorted: [...sortedIndices],
        vars: { pivotIndex: pivotFinalIndex, pivotVal: arr[i], comparisons, swaps, status: 'Pivot Locked' }
      });

      quickSortHelper(low, pivotFinalIndex - 1);
      quickSortHelper(pivotFinalIndex + 1, high);
    }

    quickSortHelper(0, n - 1);

    steps.push({
      desc: `Quick Sort finished! Final sorted array: <code>[${arr.join(', ')}]</code>. Total comparisons: <strong>${comparisons}</strong>, total swaps: <strong>${swaps}</strong>.`,
      codeLine: 22,
      array: [...arr],
      activeRange: [],
      pivotIndex: -1,
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      vars: { comparisons, swaps, status: 'Sorted' }
    });

    return { code: QUICK_CODE, steps, complexity: 'O(n log n) Avg | O(n²) Worst | O(log n) Space' };
  }

  /* -------------------------------------------------------------
   * ALGORITHM REGISTRY & SCENARIOS
   * ------------------------------------------------------------- */

  const ALGO_REGISTRY = {
    'bubble-sort': {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      fullTitle: 'Bubble Sort: Neighbor Swapping & Early-Exit Visualizer',
      badge: 'Bubble Sort',
      generator: generateBubbleSortSteps
    },
    'selection-sort': {
      id: 'selection-sort',
      title: 'Selection Sort',
      fullTitle: 'Selection Sort: Minimum-Scan & One-Swap-Per-Pass Visualizer',
      badge: 'Selection Sort',
      generator: generateSelectionSortSteps
    },
    'insertion-sort': {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      fullTitle: 'Insertion Sort: Key Element & Backward Shifting Visualizer',
      badge: 'Insertion Sort',
      generator: generateInsertionSortSteps
    },
    'merge-sort': {
      id: 'merge-sort',
      title: 'Merge Sort',
      fullTitle: 'Merge Sort: Divide & Conquer Subarray Merging Visualizer',
      badge: 'Merge Sort',
      generator: generateMergeSortSteps
    },
    'quick-sort': {
      id: 'quick-sort',
      title: 'Quick Sort',
      fullTitle: 'Quick Sort: Lomuto Partitioning & Pivot Positioning Visualizer',
      badge: 'Quick Sort',
      generator: generateQuickSortSteps
    }
  };

  function getScenarios(algoKey) {
    if (algoKey === 'bubble-sort') {
      return [
        { id: 'sample', label: '1. Default Sample [8, 3, 7, 4, 2, 6, 1, 5]', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
        { id: 'sorted', label: '2. Best Case / Sorted [1..8] (O(n) Early Exit)', icon: '<iconify-icon icon="lucide:zap"></iconify-icon>' },
        { id: 'reverse', label: '3. Worst Case / Reverse [8..1]', icon: '<iconify-icon icon="lucide:arrow-down-up"></iconify-icon>' },
        { id: 'small', label: '4. Small Array (5 items)', icon: '<iconify-icon icon="lucide:minimize-2"></iconify-icon>' },
        { id: 'duplicates', label: '5. With Duplicates', icon: '<iconify-icon icon="lucide:copy"></iconify-icon>' },
        { id: 'random', label: '6. Random Array', icon: '<iconify-icon icon="lucide:shuffle"></iconify-icon>' },
        { id: 'custom', label: '7. Custom Array', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
      ];
    }
    if (algoKey === 'selection-sort') {
      return [
        { id: 'sample', label: '1. Default Sample [8, 3, 7, 4, 2, 6, 1, 5]', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
        { id: 'small', label: '2. Small Array (5 items)', icon: '<iconify-icon icon="lucide:minimize-2"></iconify-icon>' },
        { id: 'sorted', label: '3. Already Sorted [1..8] (0 Swaps)', icon: '<iconify-icon icon="lucide:check-circle-2"></iconify-icon>' },
        { id: 'reverse', label: '4. Reverse [8..1] (Max n-1 Swaps)', icon: '<iconify-icon icon="lucide:arrow-down-up"></iconify-icon>' },
        { id: 'duplicates', label: '5. With Duplicates', icon: '<iconify-icon icon="lucide:copy"></iconify-icon>' },
        { id: 'random', label: '6. Random Array', icon: '<iconify-icon icon="lucide:shuffle"></iconify-icon>' },
        { id: 'custom', label: '7. Custom Array', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
      ];
    }
    if (algoKey === 'insertion-sort') {
      return [
        { id: 'sample', label: '1. Default Sample [8, 3, 7, 4, 2, 6, 1, 5]', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
        { id: 'sorted', label: '2. Best Case / Sorted [1..8] (O(n) - 0 Shifts)', icon: '<iconify-icon icon="lucide:zap"></iconify-icon>' },
        { id: 'reverse', label: '3. Worst Case / Reverse [8..1] (Max Shifts)', icon: '<iconify-icon icon="lucide:arrow-down-up"></iconify-icon>' },
        { id: 'small', label: '4. Small Array (5 items)', icon: '<iconify-icon icon="lucide:minimize-2"></iconify-icon>' },
        { id: 'duplicates', label: '5. With Duplicates', icon: '<iconify-icon icon="lucide:copy"></iconify-icon>' },
        { id: 'random', label: '6. Random Array', icon: '<iconify-icon icon="lucide:shuffle"></iconify-icon>' },
        { id: 'custom', label: '7. Custom Array', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
      ];
    }
    if (algoKey === 'merge-sort') {
      return [
        { id: 'sample', label: '1. Default Sample [8, 3, 7, 4, 2, 6, 1, 5]', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
        { id: 'small', label: '2. Small Array (5 items)', icon: '<iconify-icon icon="lucide:minimize-2"></iconify-icon>' },
        { id: 'sorted', label: '3. Already Sorted [1..8] (Guaranteed O(n log n))', icon: '<iconify-icon icon="lucide:check-circle-2"></iconify-icon>' },
        { id: 'reverse', label: '4. Reverse [8..1]', icon: '<iconify-icon icon="lucide:arrow-down-up"></iconify-icon>' },
        { id: 'duplicates', label: '5. With Duplicates', icon: '<iconify-icon icon="lucide:copy"></iconify-icon>' },
        { id: 'random', label: '6. Random Array', icon: '<iconify-icon icon="lucide:shuffle"></iconify-icon>' },
        { id: 'custom', label: '7. Custom Array', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
      ];
    }
    return [
      { id: 'sample', label: '1. Default Sample [8, 3, 7, 4, 2, 6, 1, 5]', icon: '<iconify-icon icon="lucide:play-circle"></iconify-icon>' },
      { id: 'small', label: '2. Small Array (5 items)', icon: '<iconify-icon icon="lucide:minimize-2"></iconify-icon>' },
      { id: 'sorted', label: '3. Already Sorted [1..8] (Degenerate O(n²) Tree)', icon: '<iconify-icon icon="lucide:alert-triangle"></iconify-icon>' },
      { id: 'reverse', label: '4. Reverse [8..1]', icon: '<iconify-icon icon="lucide:arrow-down-up"></iconify-icon>' },
      { id: 'duplicates', label: '5. With Duplicates', icon: '<iconify-icon icon="lucide:copy"></iconify-icon>' },
      { id: 'random', label: '6. Random Array', icon: '<iconify-icon icon="lucide:shuffle"></iconify-icon>' },
      { id: 'custom', label: '7. Custom Array', icon: '<iconify-icon icon="lucide:sliders"></iconify-icon>' }
    ];
  }

  /* -------------------------------------------------------------
   * RENDERING LOGIC FOR STAGE
   * ------------------------------------------------------------- */

  function renderSortingVisual(container, step, algoKey) {
    if (!step || !step.array) {
      container.innerHTML = '<div class="sort-visual-box"><p>Loading visualization...</p></div>';
      return;
    }

    const arr = step.array;
    const n = arr.length;
    const maxVal = Math.max(...arr, 1);
    const minIndex = step.minIndex !== undefined ? step.minIndex : -1;
    const pivotIndex = step.pivotIndex !== undefined ? step.pivotIndex : -1;
    const keyIndex = step.keyIndex !== undefined ? step.keyIndex : -1;
    const comparing = step.comparing || [];
    const swapping = step.swapping || [];
    const shifting = step.shifting || [];
    const sorted = step.sorted || [];
    const activeRange = step.activeRange || null;

    // Build bars & cells HTML
    let barsHtml = '';
    if (n === 0) {
      barsHtml = '<div style="padding: 24px; text-align: center; color: var(--text-muted);">Empty Array [ ]</div>';
    } else {
      barsHtml = arr.map((val, idx) => {
        const isCmp = comparing.includes(idx);
        const isSwap = swapping.includes(idx);
        const isShift = shifting.includes(idx);
        const isMin = idx === minIndex;
        const isPivot = idx === pivotIndex;
        const isKey = idx === keyIndex;
        const isSorted = sorted.includes(idx);
        const inActiveRange = activeRange ? (idx >= activeRange[0] && idx <= activeRange[1]) : true;

        let barClass = 'sort-bar';
        let badgeHtml = '';

        if (isCmp) {
          barClass += ' sort-bar--cmp';
          badgeHtml = '<span class="sort-tag sort-tag--cmp">CMP</span>';
        } else if (isSwap) {
          barClass += ' sort-bar--swap';
          badgeHtml = '<span class="sort-tag sort-tag--swap">SWAP</span>';
        } else if (isShift) {
          barClass += ' sort-bar--shift';
          badgeHtml = '<span class="sort-tag sort-tag--shift">SHIFT</span>';
        } else if (isMin) {
          barClass += ' sort-bar--min';
          badgeHtml = '<span class="sort-tag sort-tag--min">MIN</span>';
        } else if (isPivot) {
          barClass += ' sort-bar--pivot';
          badgeHtml = '<span class="sort-tag sort-tag--pivot">PIVOT</span>';
        } else if (isKey) {
          barClass += ' sort-bar--key';
          badgeHtml = '<span class="sort-tag sort-tag--key">KEY</span>';
        } else if (isSorted) {
          barClass += ' sort-bar--sorted';
          badgeHtml = '<span class="sort-tag sort-tag--sorted">✓</span>';
        } else if (!inActiveRange) {
          barClass += ' sort-bar--dimmed';
        }

        const barHeight = Math.max(24, Math.round((val / maxVal) * 115) + 15);

        return `
          <div class="sort-col-wrapper" data-idx="${idx}">
            <div class="sort-col-badge">${badgeHtml}</div>
            <div class="sort-bar-track">
              <div class="${barClass}" style="height:${barHeight}px;">
                <span class="sort-bar-val">${val}</span>
              </div>
            </div>
            <div class="sort-cell-idx">[${idx}]</div>
          </div>
        `;
      }).join('');
    }

    // Merge Sort Split View (if active)
    let mergeSplitHtml = '';
    if (algoKey === 'merge-sort' && (step.leftPart || step.rightPart || step.tempMerged)) {
      const leftPart = step.leftPart || [];
      const rightPart = step.rightPart || [];
      const tempMerged = step.tempMerged || [];

      mergeSplitHtml = `
        <div class="merge-split-panel">
          <div class="merge-split-header">
            <iconify-icon icon="lucide:git-merge" width="14" height="14"></iconify-icon>
            <span>Merge Sort Dual-View: Subarrays &amp; Merge Buffer</span>
          </div>
          <div class="merge-split-row">
            <div class="merge-sub-box">
              <span class="merge-sub-title">Left Subarray:</span>
              <div class="merge-sub-items">
                ${leftPart.length > 0 ? leftPart.map((v, i) => `
                  <span class="merge-chip ${i === step.leftPtr ? 'merge-chip--active' : (i < step.leftPtr ? 'merge-chip--used' : '')}">
                    ${v}
                  </span>
                `).join('') : '<span class="merge-sub-empty">Empty</span>'}
              </div>
            </div>
            <div class="merge-sub-box">
              <span class="merge-sub-title">Right Subarray:</span>
              <div class="merge-sub-items">
                ${rightPart.length > 0 ? rightPart.map((v, j) => `
                  <span class="merge-chip ${j === step.rightPtr ? 'merge-chip--active' : (j < step.rightPtr ? 'merge-chip--used' : '')}">
                    ${v}
                  </span>
                `).join('') : '<span class="merge-sub-empty">Empty</span>'}
              </div>
            </div>
          </div>
          <div class="merge-buffer-row">
            <span class="merge-buffer-title">Temporary Merge Buffer:</span>
            <div class="merge-buffer-items">
              ${tempMerged.length > 0 ? tempMerged.map(v => `
                <span class="merge-chip merge-chip--buffer">${v}</span>
              `).join('') : '<span class="merge-sub-empty">Merging in progress...</span>'}
            </div>
          </div>
        </div>
      `;
    }

    // Comparison Card
    let cmpCardHtml = '';
    if (step.cmpExpr) {
      cmpCardHtml = `
        <div class="search-cmp-card sort-cmp-card">
          <span class="search-cmp-label">Current Comparison:</span>
          <div class="search-cmp-expr"><code>${step.cmpExpr}</code></div>
        </div>
      `;
    }

    // Prediction Hint Card (Section 10 requirement)
    let predictionHtml = '';
    if (step.prediction) {
      predictionHtml = `
        <details class="sort-prediction-box">
          <summary class="sort-prediction-summary">
            <iconify-icon icon="lucide:help-circle" width="14" height="14"></iconify-icon>
            <span>💡 Prediction Challenge: What will happen next?</span>
          </summary>
          <div class="sort-prediction-content">
            <p>${step.prediction}</p>
          </div>
        </details>
      `;
    }

    const sortedCount = sorted.length;
    const comparisonsCount = step.vars && step.vars.comparisons !== undefined ? step.vars.comparisons : 0;
    const swapsMovesCount = step.vars && step.vars.swaps !== undefined ? step.vars.swaps : (step.vars && step.vars.moves !== undefined ? step.vars.moves : 0);
    const swapLabel = (algoKey === 'insertion-sort' || algoKey === 'merge-sort') ? 'Moves/Shifts' : 'Swaps';
    const currentStatus = (step.vars && step.vars.status) ? step.vars.status : (sortedCount === n && n > 0 ? 'Sorted ✓' : 'In Progress');

    container.innerHTML = `
      <div class="sort-visual-box">
        <div class="search-meta-strip sort-meta-strip">
          <span class="search-meta-pill">Algorithm: <strong>${ALGO_REGISTRY[algoKey] ? ALGO_REGISTRY[algoKey].title : algoKey}</strong></span>
          <span class="search-meta-pill">Length: <strong>${n}</strong></span>
          <span class="search-meta-pill">Comparisons: <strong>${comparisonsCount}</strong></span>
          <span class="search-meta-pill">${swapLabel}: <strong>${swapsMovesCount}</strong></span>
          <span class="search-meta-pill">Sorted: <strong>${sortedCount}/${n}</strong></span>
          <span class="search-meta-pill">Status: <strong style="color:var(--accent-primary);">${currentStatus}</strong></span>
        </div>

        <div class="search-track-outer sort-track-outer">
          <div class="sort-bars-track">
            ${barsHtml}
          </div>
        </div>

        ${n > 6 ? `
          <div class="search-scroll-hint">
            <iconify-icon icon="lucide:arrow-right-left" width="13" height="13"></iconify-icon>
            <span>Scroll horizontally to view all ${n} bars</span>
          </div>
        ` : ''}

        ${mergeSplitHtml}
        ${cmpCardHtml}
        ${predictionHtml}

        <div class="sort-legend-strip">
          <span class="sort-legend-item"><span class="sort-legend-dot dot--cmp"></span> Comparing</span>
          <span class="sort-legend-item"><span class="sort-legend-dot dot--swap"></span> Swapping / Shift</span>
          <span class="sort-legend-item"><span class="sort-legend-dot dot--min"></span> Min / Pivot / Key</span>
          <span class="sort-legend-item"><span class="sort-legend-dot dot--sorted"></span> Sorted Position</span>
        </div>
      </div>
    `;

    // Smooth auto-scroll active bar into view
    setTimeout(() => {
      const trackOuter = container.querySelector('.sort-track-outer');
      if (!trackOuter) return;
      const activeEl = container.querySelector('.sort-bar--cmp, .sort-bar--swap, .sort-bar--shift, .sort-bar--min, .sort-bar--pivot');
      if (activeEl) {
        const colWrapper = activeEl.closest('.sort-col-wrapper') || activeEl;
        try {
          colWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {
          const colLeft = colWrapper.offsetLeft;
          const colWidth = colWrapper.offsetWidth;
          const trackWidth = trackOuter.clientWidth;
          trackOuter.scrollTo({ left: Math.max(0, colLeft - (trackWidth / 2) + (colWidth / 2)), behavior: 'smooth' });
        }
      }
    }, 25);
  }

  /* -------------------------------------------------------------
   * MOUNT FUNCTION
   * ------------------------------------------------------------- */

  function mountSortingVisualizer(container, initialAlgoKey) {
    if (!container) return null;
    container.innerHTML = '';

    // Normalize algorithm key
    const currentAlgoKey = (initialAlgoKey && ALGO_REGISTRY[initialAlgoKey]) ? initialAlgoKey : 'bubble-sort';
    let currentArray = [...DEFAULT_ARRAY];
    let currentOpId = 'sample';

    const operations = getScenarios(currentAlgoKey);

    // Create execution player UI wrapper dedicated specifically to this algorithm
    const title = ALGO_REGISTRY[currentAlgoKey].fullTitle || `${ALGO_REGISTRY[currentAlgoKey].title} Interactive Execution Visualizer`;
    const ui = window.ExecutionEngine.createPlayerUI(container, {
      title,
      operations
    });

    // Custom Array Input Toolbar
    const customBar = document.createElement('div');
    customBar.className = 'search-custom-bar sort-custom-bar';
    customBar.style.display = 'none';
    customBar.innerHTML = `
      <div class="search-custom-inputs" style="flex-wrap:wrap; gap:10px;">
        <label class="search-input-group">
          <span>Custom Array (comma-separated, 3–12 numbers):</span>
          <input type="text" id="sort-custom-arr" class="widget-input" value="8, 3, 7, 4, 2, 6, 1, 5" style="width:100%; max-width:280px;" />
        </label>
        <button type="button" class="btn btn--primary" id="btn-sort-apply-custom">Apply &amp; Run</button>
      </div>
      <div class="sort-custom-hint" style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
        Tip: Enter comma-separated integers between 1 and 99.
      </div>
    `;
    ui.wrapper.insertBefore(customBar, ui.wrapper.querySelector('.exec-status-panel'));

    // Step bundle & player setup
    let bundle = ALGO_REGISTRY[currentAlgoKey].generator(currentArray);
    let code = bundle.code;

    const player = new window.ExecutionEngine.ExecutionPlayer({
      steps: bundle.steps,
      speedMs: 700,
      onStepChange: (step, idx, total) => {
        if (!step) return;
        if (ui.stepCounter) ui.stepCounter.textContent = `Step ${idx + 1} of ${total}`;
        if (ui.stepDesc) ui.stepDesc.innerHTML = step.desc;
        if (ui.varsStrip && window.ExecutionEngine) window.ExecutionEngine.renderVarsBadges(ui.varsStrip, step.vars);
        if (ui.codePre && window.ExecutionEngine) window.ExecutionEngine.renderCodeLines(ui.codePre, code, step.codeLine);
        if (ui.visualCanvas) renderSortingVisual(ui.visualCanvas, step, currentAlgoKey);

        if (ui.outputCard) {
          if (step.output !== null && step.output !== undefined) {
            ui.outputCard.style.display = 'flex';
            if (ui.outputVal) ui.outputVal.textContent = String(step.output);
          } else {
            ui.outputCard.style.display = 'none';
          }
        }
      },
      onPlayStateChange: (isPlaying) => {
        window.ExecutionEngine.updatePlayBtn(ui.playBtn, isPlaying);
      }
    });

    if (ui.complexityPill) ui.complexityPill.textContent = bundle.complexity;
    player.reset();

    // Standard Playback Listeners
    if (ui.playBtn) {
      ui.playBtn.addEventListener('click', () => {
        if (player.isPlaying) player.pause();
        else player.play();
      });
    }
    if (ui.stepBtn) ui.stepBtn.addEventListener('click', () => player.stepForward());
    if (ui.stepBackBtn) ui.stepBackBtn.addEventListener('click', () => player.stepBackward());
    if (ui.resetBtn) ui.resetBtn.addEventListener('click', () => player.reset());

    if (ui.speedBtns) {
      ui.speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          ui.speedBtns.forEach(b => b.classList.remove('exec-speed-btn--active'));
          btn.classList.add('exec-speed-btn--active');
          player.setSpeed(parseInt(btn.getAttribute('data-speed'), 10));
        });
      });
    }

    function refreshAlgorithm() {
      player.pause();
      bundle = ALGO_REGISTRY[currentAlgoKey].generator(currentArray);
      code = bundle.code;
      if (ui.complexityPill) ui.complexityPill.textContent = bundle.complexity;
      player.setSteps(bundle.steps, true);
    }

    // Scenarios Handler
    function loadScenario(opId) {
      currentOpId = opId;
      ui.opTabs.forEach(t => {
        t.classList.toggle('exec-op-tab--active', t.getAttribute('data-op-id') === opId);
      });

      customBar.style.display = opId === 'custom' ? 'block' : 'none';

      if (opId === 'sample') {
        currentArray = [...DEFAULT_ARRAY];
      } else if (opId === 'small') {
        currentArray = [5, 2, 8, 1, 4];
      } else if (opId === 'sorted') {
        currentArray = [1, 2, 3, 4, 5, 6, 7, 8];
      } else if (opId === 'reverse') {
        currentArray = [8, 7, 6, 5, 4, 3, 2, 1];
      } else if (opId === 'duplicates') {
        currentArray = [6, 2, 8, 2, 7, 6, 1, 5];
      } else if (opId === 'random') {
        currentArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 25) + 1);
      } else if (opId === 'custom') {
        applyCustomInput();
        return;
      }

      refreshAlgorithm();
    }

    ui.opTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        loadScenario(tab.getAttribute('data-op-id'));
      });
    });

    // Custom Array Input Handler
    function applyCustomInput() {
      const arrInput = customBar.querySelector('#sort-custom-arr');
      if (!arrInput) return;
      const raw = arrInput.value.trim();
      const parsed = raw.split(/[\s,]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x));

      if (parsed.length < 2) {
        if (typeof window.showToast === 'function') window.showToast('Please enter at least 2 numbers.', 'warning');
        return;
      }
      if (parsed.length > 16) {
        if (typeof window.showToast === 'function') window.showToast('Array size capped at 16 elements for clarity.', 'warning');
        parsed.length = 16;
      }

      currentArray = parsed;
      refreshAlgorithm();
      if (typeof window.showToast === 'function') window.showToast(`Custom array applied: [${parsed.join(', ')}]`);
    }

    const applyCustomBtn = customBar.querySelector('#btn-sort-apply-custom');
    if (applyCustomBtn) {
      applyCustomBtn.addEventListener('click', applyCustomInput);
    }

    // Return cleanup callback for router unmount
    return {
      destroy() {
        if (player) {
          player.destroy();
        }
        container.innerHTML = '';
      }
    };
  }

  // Expose globally on window
  window.mountBubbleSortVisualizer = (container) => mountSortingVisualizer(container, 'bubble-sort');
  window.mountSelectionSortVisualizer = (container) => mountSortingVisualizer(container, 'selection-sort');
  window.mountInsertionSortVisualizer = (container) => mountSortingVisualizer(container, 'insertion-sort');
  window.mountMergeSortVisualizer = (container) => mountSortingVisualizer(container, 'merge-sort');
  window.mountQuickSortVisualizer = (container) => mountSortingVisualizer(container, 'quick-sort');
  window.mountSortingVisualizer = mountSortingVisualizer;
  window.SORTING_ALGORITHMS = ALGO_REGISTRY;
})();
