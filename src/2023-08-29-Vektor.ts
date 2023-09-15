import * as p5 from "p5";

const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

export const sketch = (p: p5) => {
    const circle = {
        pos: p.createVector(0, 0),
        radius: 100,
    };

    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9); // 400, 400
        circle.pos.set(
            p.random(circle.radius, p.width - circle.radius),
            p.random(circle.radius, p.height - circle.radius)
        );
    };

    p.draw = function () {
        p.background(220, 100, 50);

        p.circle(circle.pos.x, circle.pos.y, circle.radius);
        const v2 = p.createVector(p.random(-1, 1), p.random(-1, 1));
        v2.normalize();
        v2.mult(250 * (p.deltaTime / 1000));
        circle.pos.add(v2);
        circle.pos.x = clamp(
            circle.pos.x,
            circle.radius,
            p.width - circle.radius
        );
        circle.pos.y = clamp(
            circle.pos.y,
            circle.radius,
            p.height - circle.radius
        );
    };
};

export const myp5 = new p5(sketch, document.body);
