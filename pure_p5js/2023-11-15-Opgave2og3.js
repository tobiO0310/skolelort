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

/**
 * 
 * @param {[number]} numbers 
 */
function Opgave3(numbers) {
    textSize(30);
    const sorted = [];
    for (let i = 0; i < numbers.length; i++) {
        let pos = 0;
        for (let j = 0; j < sorted.length; j++) {
            if (numbers[i] > numbers[j]) {
                pos = j;
            }
        }
        sorted.push(numbers[i], ...sorted.splice(pos, Infinity))
    }
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
}

function draw() {
    background("#C4A998");
    //Opgave2([10, 5]);
    Opgave3([52, 13, 34]);
}