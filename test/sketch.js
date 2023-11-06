/** GUESS WHAT? IT CLAMPS A NUMBER WITHIN A RANGE */
const clamp = (val, min, max) =>
    Math.max(min, Math.min(val, max));

/** LOOK AT THE F**KING NAME OF THE FUNCTION
 * 
 *  Basically checks if circle centrum is on either side of the rect's min and max x.
 *  If it is, then clamp to that, if not then set to 0, as it's within the boundaries
 *  and therefore is it closest to go straight up or down.
 *  Then does the same for y.
 */
function getVectorForCollision(
    rect,
    size,
    circle
) {
    const vec = createVector(rect.x - circle.x, rect.y - circle.y);
    if (circle.x < rect.x) {
        vec.x = clamp(vec.x, 0, rect.x - circle.x)
    } else if (circle.x > rect.x + size.x) {
        vec.x = clamp(vec.x, rect.x + size.x - circle.x, 0)
    } else {
        vec.x = 0;
    }
    if (circle.y < rect.y) {
        vec.y = clamp(vec.y, 0, rect.y - circle.y)
    } else if (circle.y > rect.y + size.y) {
        vec.y = clamp(vec.y, rect.y + size.y - circle.y, 0)
    } else {
        vec.y = 0;
    }
    return vec;
}

/** Use vectors to test distance between circle and closest edge. (if you couldn't read the function name) */
function collideRectCircleVector(
    rect,
    size,
    circle,
    radius
) {
    const vec = getVectorForCollision(rect, size, circle);
    return vec.mag() < radius;
}

// Color palette:
// https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373

/** guess what it is (check setup for properties) */
let plr = {};

/** Color order from top to bottom: red, orange, yellow, green, blue, purple */
const colorCodes = {
    0: "#F56565",
    1: "#ED8936",
    2: "#ECC94B",
    3: "#48BB78",
    4: "#4299E1",
    5: "#667EEA",
};
// Totals: 10x6
const bricks = [];

/** Bet you can't guess what this function does */
function refreshBricks() {
    bricks.splice(0, bricks.length); //Remove all
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 6; y++) {
            // x: 2/20 - 19/20
            // width/20(2 + 7/4*x)
            // y: 2/10-5/10
            // height/10(2+9/20*x)

            bricks[bricks.length] = {
                pos: createVector(
                    (width / 20) * (1 + 7 / 4 * x),
                    (height / 10) * (2 + 9 / 20 * y)
                ),
                size: createVector(width / 12, height / 45),
                active: true,
                color: y,
            };
        }
    }
}

// dumbass <3 (check setup for properties)
let ball = {};

// fuck p5js ￣へ￣
function setup() {
    // im not gonna comment on anything in here
    angleMode(DEGREES);
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    plr = {
        pos: createVector((width * 4) / 10, (height * 9) / 10),
        size: createVector((width * 2) / 10, 10),
        dir: createVector(0, 0),
    };
    // you're a p***y for not understanding
    ball = {
        pos: createVector(0, 0),
        dir: createVector(random(-0.01, 0.01), -1),
        radius: (25 / (1495 * 746 / (12 * 45))) * (width * height / (12 * 45)),
        speed: 5,
        maxSpeed: 15,
        origiSpeed: 5,
        speedFunc: function () {
            return this.origiSpeed * (
                (this.maxSpeed / this.origiSpeed) ** (this.point / bricks.length)
            );
        },
        life: 3,
        point: 0,
        started: false,
    };
    ball.dir.normalize().mult(ball.speed);
    refreshBricks();
};

/** Draws the player object */
function DrawPlr() {
    fill("#FAEDCD");
    rect(plr.pos.x, plr.pos.y, plr.size.x, plr.size.y);
    if (keyIsPressed) {
        // If key is pressed: set dir and move rect if dir is active
        if (
            keyIsDown(RIGHT_ARROW) === true ||
            keyIsDown(68) === true
        ) {
            // Right Arrow or D = move left
            plr.dir.set((5 / (7578 / 10)) * width, 0);
        } else if (
            keyIsDown(LEFT_ARROW) === true ||
            keyIsDown(65) === true
        ) {
            // Left arrow or A = move right
            plr.dir.set((-5 / (7578 / 10)) * width, 0);
        } else if (
            keyIsDown(32) === true ||
            keyIsDown(87) === true ||
            keyIsDown(UP_ARROW) === true
        ) {
            // Spacebar, W or Up-arrow = start
            plr.dir.set(0, 0);
            ball.started = true;
        } else {
            plr.dir.set(0, 0);
        }
        plr.pos.add(plr.dir);
    }
    plr.pos.set(clamp(plr.pos.x, 0, width - plr.size.x), plr.pos.y);
}

/** Draws the ball object
 * and tests for collision between
 * ball, walls and player object.
 */
function DrawBall() {
    fill("E9EDC9");
    if (ball.started && ball.life > 0) {
        ball.pos.add(ball.dir)
    } else {
        ball.pos.set(
            plr.pos.x + plr.size.x / 2,
            plr.pos.y - ball.radius * 2
        );
    }
    circle(ball.pos.x, ball.pos.y, ball.radius * 2);
    if (ball.pos.x < ball.radius || ball.pos.x > width - ball.radius) {
        // Hit left/right wall
        /* const v = -90 +
            p5.Vector.angleBetween(ball.dir, createVector(0, -1));
        const mag = ball.dir.mag();
        ball.dir.set(cos(v), sin(v)).mult(mag); */
        ball.dir.reflect(createVector(1, 0));
    } else if (ball.pos.y < ball.radius) {
        // Hit top
        /* const v = p5.Vector.angleBetween(ball.dir, createVector(1, 0));
        const mag = ball.dir.mag();
        ball.dir.set(cos(v), sin(v)).mult(mag); */
        ball.dir.reflect(createVector(0, 1))
    } else if (ball.pos.y > height - ball.radius) {
        // Hit bottom
        ball.started = false;
        ball.life--;
        ball.dir.set(random(-0.01, 0.01), -1);
        ball.dir.normalize().mult(ball.speed);
    } else if (
        collideRectCircleVector(
            plr.pos,
            plr.size,
            ball.pos,
            ball.radius
        )
    ) {
        // Colliding with player-controlled rect
        const newDir = p5.Vector.sub(
            ball.pos,
            createVector(
                plr.pos.x + plr.size.x / 2,
                plr.pos.y + plr.size.y / 2
            )
        );
        ball.dir.set(newDir).normalize().mult(ball.speed);
    } else if (ball.point === 60) {
        console.log("won");
        ball.speed = 0;
        ball.dir.mult(ball.speed);
    }
    line(
        ball.pos.x,
        ball.pos.y,
        ball.pos.x + ball.dir.x,
        ball.pos.y + ball.dir.y
    );
    ball.pos.set(
        clamp(ball.pos.x, ball.radius, width - ball.radius),
        clamp(ball.pos.y, ball.radius, height - ball.radius)
    );
}

/** Draws the bricks, if they're active.
 * Then checks if ball collides with it,
 * if it does, change ball dir, point and speed.
 * Then turn the brick off.
 */
function DrawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (brick.active === false) continue;
        fill(colorCodes[brick.color]);
        rect(brick.pos.x, brick.pos.y, brick.size.x, brick.size.y);
        if (
            collideRectCircleVector(
                brick.pos,
                brick.size,
                ball.pos,
                ball.radius
            )
        ) {
            // Colliding with rect
            const v1 = getVectorForCollision(
                brick.pos,
                brick.size,
                ball.pos
            );
            // Shows the vector for debugging.
            line(
                ball.pos.x,
                ball.pos.y,
                ball.pos.x + v1.x,
                ball.pos.y + v1.y
            );
            brick.active = false;

            // Reflect er forklaret via maple fil:
            // https://edumercantec-my.sharepoint.com/:u:/g/personal/tobi371c_edu_mercantec_dk/ETAz_FQTgKJMgCz6cqhKpD4B1dgEZGEBaTzEnT2ICtRFvg?e=NEuKQs

            ball.dir.reflect(v1);
            ball.point++;
            ball.speed = ball.speedFunc();
            console.log(ball.speed);
            ball.dir.normalize().mult(ball.speed);
        }
    };
}

/** Draws the different texts */
function DrawText() {
    if (ball.life > 0 && ball.point < bricks.length) {
        // Point text.
        fill("#D4A373");
        textAlign(CENTER);
        textSize(height / 10);
        text(
            `Point: ${ball.point}`,
            width * (8 / 10),
            height / 10
        );

        // Life text.
        fill("#D4A373");
        textAlign(CENTER);
        textSize(height / 20);
        text(
            `Lives: ${ball.life}`,
            width * (8 / 10),
            height * (1.5 / 10)
        );
    } else if (ball.point === bricks.length) {

    }
}

// like actually fuck p5js
function draw() {
    background("#CCD5AE");
    DrawPlr();
    DrawBall();
    DrawBricks();
    DrawText();
}