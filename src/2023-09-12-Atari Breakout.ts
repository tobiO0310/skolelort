import * as p5 from "p5";

// GUESS WHAT? IT CLAMPS A NUMBER WITHIN A RANGE
const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(val, max));

// LOOK AT THE F**KING NAME OF THE FUNCTION
function getVectorForCollision(
    p: p5,
    rect: p5.Vector,
    size: p5.Vector,
    circle: p5.Vector
): p5.Vector {
    const vec = p.createVector(rect.x - circle.x, rect.y - circle.y);
    vec.x =
        circle.x < rect.x
            ? clamp(vec.x, 0, rect.x - circle.x)
            : circle.x > rect.x + size.x
            ? clamp(vec.x, rect.x + size.x - circle.x, 0)
            : 0;
    vec.y =
        circle.y < rect.y
            ? clamp(vec.y, 0, rect.y - circle.y)
            : circle.y > rect.y + size.y
            ? clamp(vec.y, rect.y + size.y - circle.y, 0)
            : 0;
    return vec;
}

// Use vectors to test distance between circle and closest edge. (if you couldn't read the function name)
function collideRectCircleVector(
    p: p5,
    rect: p5.Vector,
    size: p5.Vector,
    circle: p5.Vector,
    radius: number
) {
    const vec = getVectorForCollision(p, rect, size, circle);
    return vec.mag() < radius;
}

// Color palette:
// https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373

// woah!
export const sketch = (p: p5) => {
    // guess what it is
    const rect = {
        pos: p.createVector(200, 200),
        size: p.createVector(200, 10),
        dir: p.createVector(0, 0),
    };

    // Color order from top to bottom: red, orange, yellow, green, blue, purple
    const colorCodes: { [n: number]: `#${string}` } = {
        0: "#F56565",
        1: "#ED8936",
        2: "#ECC94B",
        3: "#48BB78",
        4: "#4299E1",
        5: "#667EEA",
    };
    // Totals: 10x6
    const bricks: {
        pos: p5.Vector;
        size: p5.Vector;
        active: boolean;
        color: number;
    }[] = [];

    // bet you can't guess what this function does
    function refreshBricks() {
        bricks.splice(0, bricks.length); //Remove all
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 6; y++) {
                // x: 2/20 - 19/20
                // p.width/20(2 + 1.75*x)
                // y: 2/10-5/10
                // p.height/10(2+.45*x)

                bricks.push({
                    pos: p.createVector(
                        (p.width / 20) * (1 + 1.75 * x),
                        (p.height / 10) * (2 + 0.45 * y)
                    ),
                    size: p.createVector(p.width / 12, p.height / 45),
                    active: true,
                    color: y,
                });
            }
        }
        console.log(bricks);
    }

    // dumbass <3
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

    // fuck p5js
    p.setup = function () {
        // im not gonna comment on anything in here
        // you're a p***y for not understanding
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.9);
        rect.pos.set((p.width * 4) / 10, (p.height * 9) / 10);
        rect.size.x = (p.width * 2) / 10;
        ball.radius = (25 / 671.4) * p.height;

        refreshBricks();
    };

    // like actually fuck p5js
    p.draw = function () {
        //there's too much to comment, i might do it later
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
            refreshBricks();
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
            ball.dir.set(newDir).normalize().mult(ball.speed);
        } else if (ball.point === 60) {
            console.log("won");
        }
        ball.pos.set(
            clamp(ball.pos.x, ball.radius, p.width - ball.radius),
            clamp(ball.pos.y, ball.radius, p.height - ball.radius)
        );

        // Draw bricks, if active, and test if collides with ball.
        bricks.forEach((brick) => {
            if (brick.active === false) return;
            p.fill(colorCodes[brick.color]);
            p.rect(brick.pos.x, brick.pos.y, brick.size.x, brick.size.y);
            if (
                collideRectCircleVector(
                    p,
                    brick.pos,
                    brick.size,
                    ball.pos,
                    ball.radius
                )
            ) {
                // Colliding with rect
                const line = getVectorForCollision(
                    p,
                    brick.pos,
                    brick.size,
                    ball.pos
                );
                p.line(
                    ball.pos.x,
                    ball.pos.y,
                    ball.pos.x + line.x,
                    ball.pos.y + line.y
                );
                brick.active = false;
                ball.dir.reflect(line);
                ball.point++;
                ball.speed =
                    ball.origiSpeed +
                    10 / (1 + 23 * Math.exp(-0.1 * ball.point));
            }
        });

        p.fill("#D4A373");
        p.textAlign(p.CENTER);
        p.textSize(p.height / 10);
        p.text(
            `Point: ${ball.point}`,
            p.width * (8 / 10),
            p.height * (1.5 / 10)
        );
    };
};

export const myp5 = new p5(sketch, document.body);
