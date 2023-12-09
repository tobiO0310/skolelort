let ball = {};
let tyndgekraft = 9.82;
let angle = 45;
let hastighed = 10; // Er ganget med 10.
let started = false;

function setup() {
    ball = {
        pos: createVector(0, 0),
        dir: createVector(0, 0)
    };
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
}

/** Tegn gradient baggrund og jorden */
function baggrund() {
    strokeWeight(1);
    for (let y = 0; y < height * 3 / 4; y++) {
        // lerpColor = mix disse farver
        // hvor sidste værdi er hvor tæt man er på anden farve (mellem 0 og 1)
        stroke(
            lerpColor(
                color("#90dffe"),
                color("#38a3d1"),
                y / height * 4 / 3
            )
        );
        line(0, y, width, y);
    }
    fill("#388004");
    strokeWeight(0);
    rect(0, height * 3 / 4, width, height / 4);


    // Hastighed og retnings tekst
    fill(0);
    textSize(50);
    textAlign(LEFT);
    text(`Retning: ${angle}°`, width / 64, height / 12);
    text(`Hastighed: (${toNearestDecimal(cos(angle) * (hastighed / 10), 3)
        }, ${toNearestDecimal(sin(angle) * (hastighed / 10), 3)}) m/s`, width / 64, height * 11 / 64);
    textSize(12);
}

/** Tegn kanonen */
function kanon() {
    // Sæt ny origin og retning
    translate(width / 12, height * 41 / 48);
    rotate(-angle);

    // Tegn kanon
    fill(0);
    circle(0, 0, width / 8);
    fill(25);
    rect(0, -height / 16, width / 4, height / 8);

    // Kør tilbage til original origin og retning
    rotate(angle);
    translate(-width / 12, -height * 41 / 48);
}

function simBold() {
    circle(ball.pos.x, ball.pos.y, width / 25);

    if (ball.pos.y < height * 41 / 48) {
        ball.pos.add(ball.dir);
        ball.dir.y += tyndgekraft * deltaTime / 1000;
    } else {
        ball.dir.set(0, 0);
    }
}

function guideLine() {
    const SH = hastighed/10;

    for(let i = ball.pos.x; i < width; i+=2){
        circle(i,i)
    }

    fill(0);
}

/** Check hvilken knap der er trykket
 * og ændre vinkel/hastighed an på det.
 */
function gradOgHast() {
    if (keyIsDown(UP_ARROW)) {
        hastighed++;
    }
    if (keyIsDown(DOWN_ARROW)) {
        hastighed--;
    }
    if (keyIsDown(LEFT_ARROW)) {
        angle++;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        angle--;
    }
    angle = clamp(angle, 0, 90);
    hastighed = clamp(hastighed, 10, 100);
}

function draw() {
    baggrund();
    kanon();

    // Hvis mellemrum er trykket, start
    if (keyIsDown(32) && started != true) {
        started = true
        ball.dir.set(cos(angle), -sin(angle)).mult(hastighed / 10);
        // Hvis enter er trykket, genstart.
    } else if (keyIsDown(ENTER)) {
        started = false
        ball.dir.set(0, 0);
    }

    if (started) {
        simBold();
    } else {
        gradOgHast();

        ball.pos.set(
            width / 12 + cos(angle) * width / 4,
            height * 41 / 48 - sin(angle) * width / 4
        )
        //guideLine();
    }
}
