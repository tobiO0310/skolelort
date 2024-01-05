import p5 from "p5";

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export const sketch = (p: p5) => {
    class bil {
        constructor(private _x: number, private _y: number) {}
        public tegn() {
            p.rect(this.x, this.y, 50, 40);
        }
        get x() {
            return this._x;
        }
        set x(value: number) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value: number) {
            this._y = value;
        }
        move(dx: number, dy: number) {
            this._x += dx;
            this._y += dy;
        }
    }

    const minBil = new bil(100, 100),
        dinBil = new bil(100, 100);

    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9);
    };

    p.draw = function () {
        p.background(220, 100, 50);
        p.text("minBil x-værdi = " + p.int(minBil.x), p.width / 2, 100);
        p.text("min Bil y-værdi = " + p.int(minBil.y), p.width / 2, 120);

        minBil.tegn();

        dinBil.tegn();
        dinBil.move(4, 2);

        if (dinBil.x > p.width - 50) dinBil.x = 0;
        if (dinBil.y > p.height - 40) dinBil.y = 0;

        if (p.keyIsDown(p.DOWN_ARROW)) minBil.move(0, 5);
        if (p.keyIsDown(p.UP_ARROW)) minBil.move(0, -5);
        if (p.keyIsDown(p.LEFT_ARROW)) minBil.move(-5, 0);
        if (p.keyIsDown(p.RIGHT_ARROW)) minBil.move(5, 0);

        minBil.x = clamp(minBil.x, 0, p.width - 50);
        minBil.y = clamp(minBil.y, 0, p.height - 40);
    };
};

export const myp5 = new p5(sketch, document.body);
