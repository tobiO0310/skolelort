const box = [];

const mellem = 10;
const len = 50;
const høj = 10;
const boxantalx = 7;
const boxantaly = 4;


function setup() {
    createCanvas(400, 400);
    for (let x = 0; x < boxantalx; x++) {
        for (let y = 0; y < boxantaly; y++) {
            box[box.length] = {
                x: x * (len + mellem) + 10,
                y: y * (høj + mellem / 2) + 25,
                ramt: false,
            }
            if (y % 2 == 0) {
                box[box.length - 1].color = "#FFFF00"
            } else {
                box[box.length - 1].color = "#008000"
            }
        }
    }
}

function draw() {
    background(220);

    for (let i = 0; i < box.length; i++) {
        plr(box[i].x, box[i].y, len, høj);
    }
}