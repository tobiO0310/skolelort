import * as p5 from "p5";

const rect: {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
    speed: number;
    color: [number, number, number];
} = {
    x: 0,
    y: 0,
    r: 0,
    w: 100, // ændre
    h: 50, // ændre
    speed: 0,
    color: [0, 0, 0],
};
const circ: {
    x: number;
    y: number;
    r: number;
    radius: number;
    speed: number;
    color: [number, number, number];
} = {
    x: 0,
    y: 0,
    r: 0,
    radius: 25, // ændre
    speed: 2, // ændre
    color: [32, 232, 31],
};
circ.x = rect.w + circ.radius
circ.y = rect.h + circ.radius

const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

function createRect(p: p5) {
    const r = rect;
    p.fill(r.color);
    p.rect(r.x, r.y, r.w, r.h);

    r.r === 0
        ? (r.x += r.speed)
        : r.r === 1
        ? (r.y += r.speed)
        : r.r === 2
        ? (r.x -= r.speed)
        : (r.y -= r.speed);
    if (r.x > p.width - r.w || r.x < 0 || r.y > p.height - r.h || r.y < 0) {
        r.r = (r.r + 1) % 4;
        r.color = [p.random(20, 255), p.random(20, 255), p.random(20, 255)];
    }
    r.x = clamp(r.x, 0, p.width - r.w);
    r.y = clamp(r.y, 0, p.height - r.h);
}

function createCircle(p: p5) {
    const c = circ;
    p.fill(c.color);
    p.circle(c.x, c.y, c.radius * 2);

    c.r === 0
        ? (c.x += c.speed)
        : c.r === 1
        ? (c.y += c.speed)
        : c.r === 2
        ? (c.x -= c.speed)
        : (c.y -= c.speed);
    if (
        c.x > p.width - (rect.w + c.radius) ||
        c.x < rect.w + c.radius ||
        c.y > p.height - (rect.h + c.radius) ||
        c.y < rect.h + c.radius
    ) {
        c.r = (c.r + 1) % 4;
        c.color = [p.random(20, 255), p.random(20, 255), p.random(20, 255)];
    }
    c.x = clamp(c.x, rect.w + c.radius, p.width - (rect.w + c.radius));
    c.y = clamp(c.y, rect.h + c.radius, p.height - (rect.h + c.radius));
}

export const sketch = (p: p5) => {
    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(400, 400);

        const rlen = 2 * (p.width - rect.w + p.height - rect.h);
        const clen =
            2 *
            (p.width - 2*rect.w - 2*circ.radius + p.height - 2*rect.h - 2*circ.radius);
        p.print([rlen, clen, rlen / clen]);
        rect.speed = circ.speed * (rlen / clen);
    };

    p.draw = function () {
        p.background(220, 100, 50);

        createRect(p);
        createCircle(p);
    };
};

export const myp5 = new p5(sketch, document.body);
