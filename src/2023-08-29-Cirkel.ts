import * as p5 from "p5";

export const sketch = (p: p5) => {
    const circle = {
        vec: p.createVector(0, 0),
        color: p.createColorPicker("#000"),
        radius: 25,
    };

    const game = {
        point: 0,
        timer: 60,
    };

    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        p.textAlign(p.CENTER);
        p.createCanvas(400, 400);
        circle.color.position(p.width / 2, p.height + circle.color.height / 2);
        circle.vec.set(
            p.random(circle.radius, p.width - circle.radius),
            p.random(circle.radius, p.height - circle.radius)
        );
    };

    p.draw = function () {
        p.background(220, 100, 50);

        p.colorMode(p.RGB);
        p.fill((circle.color as any).color());
        p.stroke(0, 95);
        p.circle(circle.vec.x, circle.vec.y, circle.radius * 2);

        p.fill(255);
        p.textSize(15)
        p.text("Point: " + game.point, p.width - 100, 100);
        p.text("Timer: " + p.round(game.timer), p.width - 100, 125);

        if (game.timer > 0) {
            game.timer -= p.deltaTime / 1000;
        } else {
            game.timer = 0;
            p.fill(0, .75 * 255);
            p.rect(p.width/8, p.height/2-p.height*1/8, p.width*6/8, p.height*2/8);
            p.textSize(25);
            p.fill(255);
            p.text("Game over, points: " + game.point, p.width/2, p.height/2);
        }
    };

    p.mousePressed = function () {
        if (
            p.dist(circle.vec.x, circle.vec.y, p.mouseX, p.mouseY) <=
            circle.radius && game.timer > 0
        ) {
            circle.vec.set(
                p.random(circle.radius, p.width - circle.radius),
                p.random(circle.radius, p.height - circle.radius)
            );
            game.point++;
        }
    };
};

export const myp5 = new p5(sketch, document.body);
