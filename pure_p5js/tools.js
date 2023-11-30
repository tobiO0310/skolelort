function randomNumbers(min = 0, max = 100, amount = 10, decimals = false) {
    const numbers = [];
    for (let i = 0; i < amount; i++) {
        const num = random(min, max);
        numbers.push(decimals ? num : num << 0);
    }
    return numbers;
}

function orderedNumbers(min = 0, max = 100, shuffle = false) {
    const arr = [];
    for (i = min; i <= max; i++) {
        arr.push(i);
    }
    if (shuffle)
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    return arr;
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

/** Binary Search O(log n) */
function binarySearch(arr, val) {
    // Hvis array har mindre end 2 elementer (altså 1 eller 0), må det første element være værdien ellers findes den ikke. 
    if (arr.length < 2) {
        if (arr[0] == val) {
            return 0;
        }
        return -1;
    }
    // Hvis arrayet har en længde på 2 eller mere, skal vi finde midt punktet
    const mid = Math.floor(arr.length / 2);
    // Så skal vi se om værdien er større eller mindre end midt punktet
    if (val > arr[mid]) {
        // Hvis større, del op og lav rekursion.
        const i = binarySearch(arr.slice(mid), val);
        // Sørg for at tilføje midtens indeks, med mindre man ikke kunne finde værdien
        if (i != -1) {
            return mid + i;
        }
        return i;
    } else if (val < arr[mid]) {
        // Hvis mindre, split fra start til midte og lav rekursion.
        const i = binarySearch(arr.slice(0, mid), val);
        return i;
    } else if (val == arr[mid]) {
        // Hvis lig med, retunere midtens indeks
        return mid;
    }
    // Sikkerhed: Hvis den er hverken mindre, større eller lig med.
    // Retunere -1 for sikkerhedsskyld, hvis man fx har en array af tal og en værdi som er en string.
    return -1;
}