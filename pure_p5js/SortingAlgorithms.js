/** Selection Sort O(n^2) */
export function selectionSort(arr) {
    const sorted = [];
    while (arr.length) {
        let ref = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[ref]) {
                ref = i;
            }
        }
        sorted.push(...arr.splice(ref, 1));
    }
    return sorted;
}
/** Merge Sort O(n log n) */
export function mergeSort(arr) {
    // Enhver array med længde 0 eller 1 er sorteret.
    if (arr.length < 2) {
        return arr;
    }

    // Find mitterværdien og split
    const mid = Math.floor(arr.length / 2);

    // "Recursion" med venstre og højre side af arrayet
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const sortedArr = [];
    while (left.length && right.length) { // Så længde begge indeholder noget
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }
    return [...sortedArr, ...left, ...right];
}

/** Bubble Sort O(n^2) */
export function bubbleSort(array) {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Byt
            }
        }
    }
    return arr;
}

/** Optimized Bubble Sort */
export function bubbleSortOpt(array) {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
            break;
    }
    return arr;
}

export function isSorted(arr) {
    return arr.every((val, index) => index == 0 ? true : val >= arr[index - 1]);
}