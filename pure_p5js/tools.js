function randomNumbers(min = 0, max = 100, amount = 10, decimals = false) {
    const numbers = [];
    for (let i = 0; i < amount; i++) {
        const num = random(min, max);
        numbers.push(decimals ? num : num << 0)
    }
    return numbers
}

/** Selection Sort O(n^2) */
function selectionSort(arr) {
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
function mergeSort(arr) {
    // Enhver array med længde 0 eller 1 er sorteret.
    if (arr.length < 2) {
        return arr;
    }

    // Find mitterværdien og split
    const mid = Math.floor(arr.length / 2);

    // "Recursion" med venstre og højre side af arrayet
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))

    const sortedArr = []
    while (left.length && right.length) { // Så længde begge indeholder noget
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    return [...sortedArr, ...left, ...right]
}

/** Search for a value in a sorted array */
function binarySearch(arr, val){
    if(arr.length < 2){
        if(arr[0] == val){
            return 0;
        } else if(arr[1] == val){
            return 1;
        }
        return -1;
    }
    const mid = Math.floor(arr.length / 2);
    if(val > arr[mid]){
        const index = mid + binarySearch(arr.slice(mid), val);
    }
}