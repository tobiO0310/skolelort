let circles = [];

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
    frameRate(60);
    for (let i = 0; i < 10; i++) {
        const circ = {
            pos: createVector(width / 2, height / 2),
            dir: createVector(random(-1, 1), random(-1, 1)),
            speed: 0.5,
            r: width / 25
        }
        circ.dir.normalize();
        circles.push(circ)
    }
}

function draw() {
    background("#C4A998");
    fill("#880808");

    circles.forEach((circ) => {
        circ.pos.add(p5.Vector.mult(circ.dir, deltaTime * circ.speed));

        if (circ.pos.x <= circ.r || circ.pos.x >= width - circ.r) {
            circ.dir.reflect(createVector(1, 0));
        } else if (circ.pos.y <= circ.r || circ.pos.y >= height - circ.r) {
            circ.dir.reflect(createVector(0, 1));
        }

        circ.pos.x = clamp(circ.pos.x, circ.r + 1, width - circ.r - 1);
        circ.pos.y = clamp(circ.pos.y, circ.r + 1, height - circ.r - 1);
        circle(circ.pos.x, circ.pos.y, circ.r * 2);
    })
}

function keyPressed() {
    const fra = frameRate();
    if (keyCode == DOWN_ARROW) {
        frameRate(fra - 1);
    } else if (keyCode == UP_ARROW) {
        frameRate(fra + 1);
    }
}