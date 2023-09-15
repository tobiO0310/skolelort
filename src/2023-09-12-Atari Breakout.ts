import * as p5 from "p5";

// GUESS WHAT? IT CLAMPS A NUMBER WITHIN A RANGE
const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(val, max));

/*
Use vectors to test distance between circle and closest edge.
 */
function collideRectCircleVector(
    p: p5,
    rect: p5.Vector,
    size: p5.Vector,
    circle: p5.Vector,
    radius: number
) {
    const vec = p.createVector(rect.x - circle.x, rect.y - circle.y);
    vec.x =
        circle.x < rect.x
            ? clamp(vec.x, 0, rect.x - circle.x)
            : circle.x > rect.x + size.x
            ? clamp(vec.x, rect.x + size.x - circle.x, 0)
            : 0;

    return vec.mag() < radius;
}

// Color palette:
// https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373

export const sketch = (p: p5) => {
    const rect = {
        pos: p.createVector(200, 200),
        size: p.createVector(200, 10),
        dir: p.createVector(0, 0),
    };

    // Color order from top to bottom: red, orange, yellow, green, blue, purple
    // Totals: 10x6
    const bricks = [];

    const ball = {
        pos: p.createVector(200, 200),
        dir: p.createVector(p.random(-0.01, 0.01), -1),
        radius: 25,
        speed: 5,
        origiSpeed: 5,
        point: 0,
        started: false,
    };
    ball.dir.normalize().mult(ball.speed);

    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9); // 400, 400
        rect.pos.set((p.width * 4) / 10, (p.height * 9) / 10);
        rect.size.x = (p.width * 2) / 10;
    };

    p.draw = function () {
        p.background("#CCD5AE");

        p.fill("#FAEDCD");
        p.rect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
        if (p.keyIsPressed) {
            // If key is pressed: set dir and move rect if dir is active
            if (
                p.keyIsDown(p.RIGHT_ARROW) === true ||
                p.keyIsDown(68) === true
            ) {
                // Right Arrow or D = move left
                rect.dir.set((5 / 757.8) * p.width, 0);
            } else if (
                p.keyIsDown(p.LEFT_ARROW) === true ||
                p.keyIsDown(65) === true
            ) {
                // Left arrow or A = move right
                rect.dir.set((-5 / 757.8) * p.width, 0);
            } else if (
                p.keyIsDown(32) === true ||
                p.keyIsDown(87) === true ||
                p.keyIsDown(p.UP_ARROW) === true
            ) {
                // Spacebar, W or Up-arrow = start
                rect.dir.set(0, 0);
                ball.started = true;
            } else {
                rect.dir.set(0, 0);
            }
            rect.pos.add(rect.dir);
        }
        rect.pos.set(clamp(rect.pos.x, 0, p.width - rect.size.x), rect.pos.y);

        p.fill("E9EDC9");
        p.circle(ball.pos.x, ball.pos.y, ball.radius * 2);
        ball.started
            ? ball.pos.add(ball.dir)
            : ball.pos.set(
                  rect.pos.x + rect.size.x / 2,
                  rect.pos.y - ball.radius * 2
              );
        if (ball.pos.x < ball.radius || ball.pos.x > p.width - ball.radius) {
            // Hit left/right wall
            const v =
                -90 +
                p5.Vector.angleBetween(ball.dir, p.createVector(0, -1)) *
                    (ball.pos.x > 0 ? 1 : -1);
            const mag = ball.dir.mag();
            ball.dir.set(p.cos(v), p.sin(v)).mult(mag);
        } else if (ball.pos.y < ball.radius) {
            // Hit top
            const v = p5.Vector.angleBetween(ball.dir, p.createVector(1, 0));
            const mag = ball.dir.mag();
            ball.dir.set(p.cos(v), p.sin(v)).mult(mag);
        } else if (ball.pos.y > p.height - ball.radius) {
            // Hit bottom
            ball.started = false;
            ball.speed = ball.origiSpeed;
            ball.dir.set(p.random(-0.01, 0.01), -1);
            ball.dir.normalize().mult(ball.speed);
            ball.point = 0;
        } else if (
            collideRectCircleVector(
                p,
                rect.pos,
                rect.size,
                ball.pos,
                ball.radius
            )
        ) {
            // Colliding with player-controlled rect
            const newDir = p5.Vector.sub(
                ball.pos,
                p.createVector(
                    rect.pos.x + rect.size.x / 2,
                    rect.pos.y + rect.size.y / 2
                )
            );
            ball.point++;
            ball.pos.set(
                ball.pos.x,
                clamp(ball.pos.y, ball.radius, rect.pos.y - ball.radius)
            );
            ball.dir.set(newDir).normalize().mult(ball.speed);

            ball.speed =
                ball.origiSpeed + 10 / (1 + 50 * Math.exp(-ball.point));
            console.log(ball.speed);
        } else if (ball.point === 10) {
            console.log("won");
        }
        ball.pos.set(
            clamp(ball.pos.x, ball.radius, p.width - ball.radius),
            clamp(ball.pos.y, ball.radius, p.height - ball.radius)
        );

        p.fill("#D4A373");
        p.textAlign(p.CENTER);
        p.textSize(p.height / 10);
        p.text(`Point: ${ball.point}`, p.width * (8 / 10), p.height * (2 / 10));
    };
};

export const myp5 = new p5(sketch, document.body);
