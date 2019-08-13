let canvas;
let ctx;
let pl;
let enemies = [];
let point;
let score = 0;
let mouse = {};
let bullets = [];
let gameStop = false;
let hearts = 3;
let img;
let back;
let movei = 0;
let spd = 2;

let rateFire = 10;
let k = 0;


document.querySelector('button').addEventListener('click', function () {
    let bt = document.getElementById("start");
    bt.style.display = "none";

    gameStart();
});


function gameStart() {
    init();
    window.requestAnimationFrame(loop);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    pl = new player(20, 20, 100, 100);
    point = new points(50, 50);
    img = new Image();
    img.src = './billie.png';
    back = new Image();
    back.src = './migos.png';

    setInterval(createEnemy, 500);
    setInterval(createBullet, 5);
    setInterval(function () {
        movei += spd;
        if (movei > 00 || movei < -200) {
            spd *= -1;
        }

    }, 5);
    mousemov();
}

function loop() {

    if (gameStop == false) {

        score++;

        update();
        for (let j = 0; j < enemies.length; j++) {
            if (collision(pl, enemies[j]) && pl.invi == false) {
                hearts--;
                pl.invi = true;
                setTimeout(function () { pl.invi = false; }, 400);
            }

            collision(pl, point);

            for (let i = 0; i < bullets.length && enemies[j] != undefined; i++) {
                if (collision(bullets[i], enemies[j])) {

                    enemies.splice(j, 1);
                }
            }
        }
        draw();
        // if (hearts <= 0)
        //     gameStop = true;
    }
    window.requestAnimationFrame(loop);
}


function update() {

    pl.x = mouse.x - pl.w / 2;
    pl.y = mouse.y - pl.h / 2;

    point.update();

    // createBullet();

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        if (bullets[i].hitupper()) {
            bullets.splice(i, 1);
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        if (enemies[i].hitbottom()) {
            enemies.splice(i, 1);
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, 500, 800);
    ctx.drawImage(back, movei, 200)
    pl.draw();

    point.draw();
    heart();
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
    Score();

}



document.onkeydown = function (e) {
    gameStop = !gameStop;
}

function mousemov() {
    document.addEventListener('mousemove', function (e) {  // use event argument
        var rect = canvas.getBoundingClientRect();  // get element's abs. position
        mouse.x = e.clientX - rect.left;              // get mouse x and adjust for el.
        mouse.y = e.clientY - rect.top;               // get mouse y and adjust for el.
    });
}
function createBullet() {
    let Bullet = new bullet(pl, 10);
    bullets.push(Bullet);
}

function createEnemy() {
    let Enemy = new enemy(50, 50);
    enemies.push(Enemy);
}

function Score() {
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText('Score ' + score, 250, 40);
    ctx.textAlign = "center";
}

function heart() {
    for (let i = 0; i < hearts; i++)
        ctx.fillRect(i * 100, 1, 50, 50);
}

function collision(box1, box2) {
    return (((box1.x + box1.w > box2.x && box1.x < box2.x + box2.w) || (box1.x + box1.w < box2.w && box1.w > box2.x))
        && ((box1.y + box1.h > box2.y && box1.y < box2.y + box2.h) || (box1.y + box1.h < box2.h && box1.h > box2.y)));
}
