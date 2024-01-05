import p5 from "p5";

type Color = [R: number, G: number, B: number];

const items: {
    [key: string]: {
        x: number;
        y: number;
        r: p5.Vector;
        color: Color;
    };
} = {};
const dia = 100,
    speed = 2;
let Names: string[] = [];
for (let i = 0; i < 5; i++) {
    Names[i] = `Test${i}`;
}
console.log(Names);
class CircleAndName {
    constructor(
        private p: p5,
        public item: (typeof items)[string],
        public radius: number,
        public name: string
    ) {
        p.fill(...item.color);
        p.circle(item.x, item.y, radius);
        p.fill(0, 0, 0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(dia / 3);
        p.stroke(0);
        p.strokeWeight(0.25);
        p.text(name, item.x, item.y);
    }
}

function checkCollision(pos1: p5.Vector, pos2: p5.Vector) {
    let dist = p5.Vector.dist(pos1, pos2);
    if (dist <= dia) {
        return true;
    }
    return false;
}

export const sketch = (p: p5) => {
    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9);
    };

    p.draw = function () {
        p.background(220, 100, 50);

        Names.forEach((name) => {
            if (name in items) {
                items[name].x += items[name].r.x * speed;
                items[name].y += items[name].r.y * speed;
                let a = items[name].x,
                    b = items[name].y;
                if (a + dia / 2 > p.width || a - dia / 2 < 0) {
                    items[name].r.x *= -1;
                    items[name].color = [
                        p.random(255),
                        p.random(255),
                        p.random(255),
                    ];
                }
                if (b + dia / 2 > p.height || b - dia / 2 < 0) {
                    items[name].r.y *= -1;
                    items[name].color = [
                        p.random(50, 255),
                        p.random(50, 255),
                        p.random(50, 255),
                    ];
                }
            } else {
                items[name] = {
                    x: p.random(dia / 2, p.width - dia / 2),
                    y: p.random(dia / 2, p.height - dia / 2),
                    r: p
                        .createVector(p.random(-1,1), p.random(-1,1))
                        .normalize(),
                    color: [255, 255, 255],
                };
            }
            new CircleAndName(p, items[name], dia, name);
        });

        Object.keys(items).forEach((key) => {
            let item = items[key];
            Object.keys(items).forEach((key2) => {
                let item2 = items[key2];
                if (item === item2) return;
                let v1 = p.createVector(item.x, item.y, 0),
                    v2 = p.createVector(item2.x, item2.y, 0);
                if (checkCollision(v1, v2)) {
                    item.color = [
                        p.random(20, 255),
                        p.random(20, 255),
                        p.random(20, 255),
                    ];
                }
            });
        });
    };
};

export const myp5 = new p5(sketch, document.body);
