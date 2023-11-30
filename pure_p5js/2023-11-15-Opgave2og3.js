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

function Opgave3(numbers) {
    textSize(30);
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
    frameRate(1);
}

function draw() {
    background("#C4A998");
    fill("#880808");
    //Opgave2([10, 5]);
    /* Opgave3([
        random(0, 100) << 0,
        random(0, 100) << 0,
        random(0, 100) << 0
    ]); */
    
    const sorted = selectionSort(randomNumbers(
        0, // Min
        100, // Max
        10 // Antal
    ));
    textSize(30);
    sorted.forEach((val, i) => {
        text(val, width / 2, height / 4 + 30 * i);
    });
}