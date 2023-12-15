let ball = {};
const tyndgekraft = 9.82; // (m/s)
let angle = 45; // grader
let hastighed = 10; // Er ganget med 10, på grund af decimal tal. (m/s)
let started = false;
let ramtVandet = 0;

let pondX; // Vandets x
let bomb; // Billede af bombe
let splash; // Billede af vandsplash
let fish; // Billede af fisk

/** Gør som den heder */
const toNearestDecimal = (val, dec) => Math.round(val * (10 ** dec)) / (10 ** dec);
/** Sætter en nedre og øvere grænse for hvad værdien må være.
 *  Hvis val er inden for grænsen, retunere val.
 *  Ellers retunere hhv. den mindste eller øverste grænse-værdi
 */
const clamp = (val, min, max) =>
    Math.max(min, Math.min(val, max));

// Læser billederne
function preload() {
    bomb = loadImage("bomb.webp");
    splash = loadImage("Water_splash.png");
    fish = loadImage("Item_Fish.webp");
}

function setup() {
    ball = {
        // m/s
        pos: createVector(0, 0),
        dir: createVector(0, 0)
    };
    angleMode(DEGREES);

    // Lav noget magi med aspect ratio
    const ww = 2 * windowHeight;
    const wh = windowWidth / 2;

    createCanvas(Math.min(ww, windowWidth), Math.min(wh, windowHeight));
    pondX = random(width / 2, width * 7 / 8);
}

/** Tegn gradient baggrund og jorden */
function baggrund() {
    // Lav en sky-look graident.
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
    // Jorden
    fill("#388004");
    strokeWeight(0);
    rect(0, height * 3 / 4, width, height / 4);

    // Vandet
    fill("#5d97e7");
    ellipse(pondX, height * 7 / 8, width / 5, height / 8);

    // Hastighed og retnings tekst
    fill(0);
    textSize(50 * width / 1495);
    textAlign(LEFT);
    text(`Retning: ${angle}°`, width / 64, height / 12);
    text(`Hastighed: (${toNearestDecimal(cos(angle) * (hastighed / 10), 3)
        } m/s, ${toNearestDecimal(sin(angle) * (hastighed / 10), 3)} m/s) / ${hastighed / 10} m/s`, width / 64, height / 12 + 50 * width / 1495);
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

/** Laver det fysiske simulation, ved hjælp af deltaTid */
function simBold() {
    if (ramtVandet < 0.5) {
        fill("#a0b00c");
        circle(ball.pos.x, ball.pos.y, width / 25);
        image(bomb, ball.pos.x - width / 30, ball.pos.y - width / 30, width / 15, width / 15);
    }
    // pixels / meter
    const ratio = 373.75 / 5;
    // Fordi jeg er sej
    const dt = deltaTime / 1000;

    // Hvis bolden er over jorden, tilføj til position og hastighed.
    if (ball.pos.y < height * 41 / 48) {
        ball.pos.x += ball.dir.x * ratio * dt;
        ball.pos.y += ball.dir.y * ratio * dt;
        ball.dir.y += tyndgekraft * dt;
    } else if (pondX - width / 10 + width / 25 < ball.pos.x && ball.pos.x < pondX + width / 10 - width / 25) {
        ramtVandet += dt;
        if (0 < ramtVandet && ramtVandet < 1) {
            image(splash, ball.pos.x - width / 10, ball.pos.y - width / 10 - width / 40, width / 5, width / 5);
        }
        if (0.25 < ramtVandet) {
            image(fish, ball.pos.x - width * 2 / 15, ball.pos.y - width / 6, width / 10, width / 10);
        }
        if (0.5 < ramtVandet) {
            image(fish, ball.pos.x - width / 20, ball.pos.y - width / 6, width / 10, width / 10);
        }
        if (0.75 < ramtVandet) {
            image(fish, ball.pos.x - width / 10 + width * 2 / 15, ball.pos.y - width / 6, width / 10, width / 10);
        }
    }
}

/** Laver et lidt gennemsigtlig stiplet linje for at sigte */
function guideLine() {
    // pixels / meter
    const ratio = 373.75 / 5;
    const x0 = width / 12 + cos(angle) * width / 4;
    const v0x = cos(angle) * (hastighed / 10 * ratio);
    const v0y = -sin(angle) * (hastighed / 10 * ratio);
    const y0 = height * 41 / 48 - sin(angle) * width / 4;

    fill(0, 0, 0, 100);
    for (let i = 0; i < 1000; i++) {
        const t = i / 50;
        const y = (1 / 2) * (tyndgekraft * ratio) * (t ** 2) + (v0y * t) + y0;
        if (y > height * 41 / 48) break;
        circle(x0 + v0x * t, y, 5);
    }

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
    // Sørger for at den ikke bliver højere end maks og lavere end min.
    angle = clamp(angle, 0, 90);
    hastighed = clamp(hastighed, 10, 100);
}

function draw() {
    // Baggrund, kanon og stiplet linje. (Check deres funktion ovenfor)
    baggrund();
    kanon();
    guideLine();

    // Hvis mellemrum er trykket, start
    if (keyIsDown(32) && started != true) {
        started = true;
        ball.dir.set(cos(angle), -sin(angle)).mult(hastighed / 10);
        // Hvis enter er trykket, genstart.
    } else if (keyIsDown(ENTER) && started != false) {
        started = false;
        if (0 < ramtVandet) {
            pondX = random(width / 2, width * 7 / 8);
            ramtVandet = 0;
        }
        ball.dir.set(0, 0);
    }

    // Simulere bolden hvis det er started, ellers check for ændring i hastighed og grader.
    if (started) {
        simBold();
    } else {
        gradOgHast();

        // Sæt boldens position til enden af kanonen
        ball.pos.set(
            width / 12 + cos(angle) * width / 4,
            height * 41 / 48 - sin(angle) * width / 4
        );
    }
}
