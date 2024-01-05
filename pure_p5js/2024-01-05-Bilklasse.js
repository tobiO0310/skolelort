let minBil, dinBil;

class Bil {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    tegn() {
        rect(this.x, this.y, 50, 40);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

function setup() {
    textAlign(CENTER, CENTER);
    createCanvas(400, 400);

    minBil = new Bil(50, 100);
    dinBil = new Bil(200, 200);
}

function draw() {
    background(220);
    text("minBil x-værdi = " + int(minBil.x), width / 2, 100);
    text("min Bil y-værdi = " + int(minBil.y), width / 2, 120);

    minBil.tegn();
    minBil.move();

    dinBil.tegn();
    dinBil.move();

    if (minBil.x > width - 50) minBil.x = 0;
    if (minBil.y > height - 40) minBil.y = 0;
    if (dinBil.x > width - 50) dinBil.x = 0;
    if (dinBil.y > height - 40) dinBil.y = 0;
}