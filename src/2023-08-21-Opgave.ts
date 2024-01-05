// [Imports]
import p5 from "p5";

// [Global-Scope]
const rect: {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
    speed: number;
    dir: -1 | 1;
    color: [number, number, number];
} = {
    x: 0,
    y: 0,
    r: 0,
    w: 100, // ændre
    h: 50, // ændre
    speed: 0,
    dir: 1,
    color: [0, 0, 0],
};
const circ: {
    x: number;
    y: number;
    r: number;
    radius: number;
    speed: number;
    dir: -1 | 1;
    color: [number, number, number];
} = {
    x: 0,
    y: 0,
    r: 0,
    radius: 25, // ændre
    speed: 2, // ændre
    dir: -1,
    color: [32, 232, 31],
};
// [Circle Coords]: Based on rect's position and circ's radius.
circ.x = rect.w + circ.radius;
circ.y = rect.h + circ.radius;

// [Clamp Function]
const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

/* [Create Rect]: Draw rectangle on old coords, adjust x, y and r according to these rules:
    Bounds is within the screen.
    If direction (dir) is 1, then go clockwise around the bounds, else cunterclockwise.
    Use the r (retning) property to define which direction to go (up, down, left or right).
    Move speed amount along direction.

    If rect is outside the bounds, add to r and randomize color.
    Clamp it's position within bounds.
*/
function createRect(p: p5) {
    p.fill(rect.color);
    p.rect(rect.x, rect.y, rect.w, rect.h);

    rect.dir === 1
        ? rect.r === 0
            ? (rect.x += rect.speed)
            : rect.r === 1
            ? (rect.y += rect.speed)
            : rect.r === 2
            ? (rect.x -= rect.speed)
            : (rect.y -= rect.speed)
        : rect.r === 0
        ? (rect.y += rect.speed)
        : rect.r === 1
        ? (rect.x += rect.speed)
        : rect.r === 2
        ? (rect.y -= rect.speed)
        : (rect.x -= rect.speed);
    if (rect.x > p.width - rect.w || rect.x < 0 || rect.y > p.height - rect.h || rect.y < 0) {
        rect.r = (rect.r + 1) % 4;
        rect.color = [p.random(20, 255), p.random(20, 255), p.random(20, 255)];
    }
    rect.x = clamp(rect.x, 0, p.width - rect.w);
    rect.y = clamp(rect.y, 0, p.height - rect.h);
}

/* [Create Circ]: Draw circle on old coords, adjust x, y and r according to these rules:
    Bounds for the circle is inside the track which the rectangle moves, aka they never touch.
    If direction (dir) is 1, then go clockwise bounds, else cunterclockwise.
    Use the r (retning) property to define which direction to go (up, down, left or right).
    Move speed amount along direction.

    If circ is outside the bounds, add to r and randomize color.
    Clamp it's position within bounds.
*/
function createCircle(p: p5) {
    p.fill(circ.color);
    p.circle(circ.x, circ.y, circ.radius * 2);

    circ.dir === 1
        ? circ.r === 0
            ? (circ.x += circ.speed)
            : circ.r === 1
            ? (circ.y += circ.speed)
            : circ.r === 2
            ? (circ.x -= circ.speed)
            : (circ.y -= circ.speed)
        : circ.r === 0
        ? (circ.y += circ.speed)
        : circ.r === 1
        ? (circ.x += circ.speed)
        : circ.r === 2
        ? (circ.y -= circ.speed)
        : (circ.x -= circ.speed);
    if (
        circ.x > p.width - (rect.w + circ.radius) ||
        circ.x < rect.w + circ.radius ||
        circ.y > p.height - (rect.h + circ.radius) ||
        circ.y < rect.h + circ.radius
    ) {
        circ.r = (circ.r + 1) % 4;
        circ.color = [p.random(20, 255), p.random(20, 255), p.random(20, 255)];
    }
    circ.x = clamp(circ.x, rect.w + circ.radius, p.width - (rect.w + circ.radius));
    circ.y = clamp(circ.y, rect.h + circ.radius, p.height - (rect.h + circ.radius));
}

// [p5 workings]
export const sketch = (p: p5) => {
    // [Setup Function]: Only ran once, sets framerate and canvas.
    // Also makes sure the speed of the rectangle and circle is set, so they always meet at the top left corner.
    p.setup = function () {
        p.frameRate(60);
        p.createCanvas(400, 400);

        const rlen = 2 * (p.width - rect.w + p.height - rect.h);
        const clen =
            2 *
            (p.width -
                2 * rect.w -
                2 * circ.radius +
                p.height -
                2 * rect.h -
                2 * circ.radius);
        p.print([rlen, clen, rlen / clen]);
        rect.speed = circ.speed * (rlen / clen);
    };

    // [Draw Function]: Drawn every frame, sets background and runs createRect and createCircle functions.
    p.draw = function () {
        p.background(220, 100, 50);

        createRect(p);
        createCircle(p);
    };

    // [MouseClick function]: Ran on mouse click, changes direction if clicked on either rectangle or circle.
    p.mouseClicked = function () {
        if (
            clamp(p.mouseX, rect.x, rect.x + rect.w) == p.mouseX &&
            clamp(p.mouseY, rect.y, rect.y + rect.h) == p.mouseY
        ) {
            rect.dir *= -1;
            rect.r = (rect.r + 3) % 4;
        }
        if(p.dist(p.mouseX,p.mouseY,circ.x,circ.y) <= circ.radius){
            circ.dir *= -1;
            circ.r = (circ.r + 3) % 4;
        }
    };
};

// [myp5] Create the p5 instance.
export const myp5 = new p5(sketch, document.body);
