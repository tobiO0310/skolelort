import p5 from "p5";

export const sketch = (p: p5) => {
    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9); // 400, 400
    };

    p.draw = function () {
        p.background(220, 100, 50);
    };
};

export const myp5 = new p5(sketch, document.body);
