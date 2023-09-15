import * as p5 from "p5";

class Circle {
    pos: p5.Vector;
    radius: number;
    color: `#${string}`;
}

export const sketch = (p: p5) => {
    const circ = {
        pos: p.createVector(200, 200),
        radius: 25,
        color: "#00000",
    } as Circle;
    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9); // 400, 400
    };

    p.draw = function () {
        p.background(220, 100, 50);

        p.fill(circ.color);
        p.circle(circ.pos.x, circ.pos.y, circ.radius * 2);

        const mouse = p.createVector(p.mouseX, p.mouseY);
        if (circ.pos.dist(mouse) > (circ.radius * 3) / 4) {
            const v1 = p.createVector(p.mouseX, p.mouseY).sub(circ.pos);
            v1.normalize();
            v1.mult(Math.min(100, p.exp(p5.Vector.dist(circ.pos, mouse) / 50)));
            circ.pos.add(v1);
            circ.color = "#C08261";
        } else {
            circ.color = "#9A3B3B";
        }
    };
};

export const myp5 = new p5(sketch, document.body);
