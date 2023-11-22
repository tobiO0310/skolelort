function Opgave2(numbers) {
    textSize(30);
    // Hvis number1 > number2, byt dem
    if (numbers[0] > numbers[1]) {
        numbers.push(...numbers.splice(0, 1));
    }
    fill("#000080");
    text(numbers[0], width / 2, height / 4 - 30 / 2);
    fill("#880808");
    text(numbers[1], width / 2, height / 4 + 30 / 2);
    fill("#000000");
    textSize(100);
    text(numbers[1], width / 2, height / 2);
}

/** Kombinere to arrays, som hver er sorteret */
function merge(left, right) {
    const sortedArr = []
    while (left.length && right.length) { // Så længde en af dem indeholder noget
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    return [...sortedArr, ...left, ...right]
}

/** Merge Sort */
function mergeSort(arr) {
    // Enhver array med længde 0 eller 1 er sorteret.
    if (arr.length < 2) {
        return arr;
    }

    // Find mitterværdien og split
    const mid = Math.floor(arr.length / 2);

    // "Recursion" med venstre og højre side af arrayet
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.splice(mid))

    return merge(left, right)
}

function randomNumbers(min = 0, max = 100, amount = 10, decimals = false){
    const numbers = [];
    for(let i = 0; i < amount; i++){
        const num = random(min, max);
        numbers.push(decimals ? num : num << 0)
    }
    return numbers
}

/** Array of three numbers to sort */
function flowChartSort([a, b, c]) {
    const sorted = [];
    if (a >= b) { // b before a
        // c, b, a
        // b, c, a
        // b, a, c
        if (a < c) {
            sorted.push(b, a, c);
        } else if (b >= c) {
            sorted.push(c, b, a);
        } else {
            sorted.push(b, c, a);
        }
    } else { // a before b
        // c, a, b
        // a, c, b
        // a, b, c
        if (a >= c) {
            sorted.push(c, a, b);
        } else if (b >= c) {
            sorted.push(a, c, b);
        } else {
            sorted.push(a, b, c);
        }
    }
    if (!sorted.every((v, i, a) => i >= 1 ? v >= a[i - 1] : true)) {
        console.log([[a, b, c], sorted])
    }
    sorted.splice(3);
    return sorted;
}

/** Array of any amount of numbers to sort */
function flowChartSort2(arr) {
    const sorted = [];
    for (let i = 0; i < arr.length; i++) {
        let pos = 0;
        for (let j = 0; j < sorted.length; j++) {
            if (arr[i] < sorted[j]) {
                break;
            }
            pos = j + 1;
        }
        sorted.push(arr[i], ...sorted.splice(pos));
    }
    if (!sorted.every((v, i, a) => i >= 1 ? v >= a[i - 1] : true)) {
        console.log([[a, b, c], sorted])
    }
    return sorted;
}

/**
 * 
 * @param {[number]} numbers 
 */
function Opgave3(numbers) {
    textSize(30);
    //const sorted = mergeSort(numbers);
    const sorted = flowChartSort2(numbers);

    text(sorted[0], width / 2, height / 4 - 30 / 2);
    text(sorted[1], width / 2, height / 4 + 30 / 2);
    text(sorted[2], width / 2, height / 4 + 30 * 3 / 2);
    textSize(100);
    text(sorted[2], width / 2, height / 2);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
    frameRate(60)
}

function draw() {
    background("#C4A998");
    fill("#880808")
    //Opgave2([10, 5]);
    Opgave3([
        random(0, 100) << 0,
        random(0, 100) << 0,
        random(0, 100) << 0
    ]);
}