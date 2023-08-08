import * as p5 from "p5";

export const sketch = (p: p5) => {
    p.setup = function() {
        p.createCanvas(window.innerWidth * 9/10, window.innerHeight * 9/10);

    };

    p.draw = function() {
        p.background(220);
        p.ellipse(p.mouseX, p.mouseY, 80, 160);
    };
};

export const myp5 = new p5(sketch, document.body);
