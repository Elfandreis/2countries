let canvas;
let ctx;

let pl;
let bullets = [];
let enemies = [];
let point = new prize(50, 50);

let mouse = {};
let escores = [];

let pause = false;

let movei = 0;

let vb = 5;

var ui = {
    score: 0,
    hearts: 3,
    backy: 0,
    printscore: function () {
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = "40px Georgia"
        ctx.fillText('Score ' + this.score + ' ', 270, 40);
    },
    printheart: function () {
        if (this.hearts <= 0) {
            pause = true;
            Timers(pause);
            ctx.drawImage(images.milos, 0, 0, canvas.width, canvas.height);
        }
        for (let i = 0; i < this.hearts; i++)
            ctx.drawImage(images.heart, i * 75 + 10, 10, 50, 50);
    },
    background: function () {
        this.backy++;
        ctx.drawImage(images.back, 0, this.backy, canvas.width, canvas.height);
        ctx.drawImage(images.back, 0, (-canvas.height) + this.backy, canvas.width, canvas.height);
        if (this.backy > canvas.height) {
            this.backy = 0;
        }
    },
    diescore: function (obj) {
        ctx.font = 30 + "px Verdana";
        ctx.fillStyle = "rgba(255, 0, 0," + obj.op + ")";
        ctx.textAlign = "center";
        ctx.fillText(obj.score, obj.x + obj.w / 2, obj.y + obj.h / 2);
    }
};

document.querySelector('button').addEventListener('click', function () {
    let bt = document.getElementById("start");
    bt.style.display = "none";
    gameStart();
});


function gameStart() {
    init();
    listener();
    window.requestAnimationFrame(loop);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    pl = new player(250, 800, 100, 100);

    audio[0].play();
    Mousemov();
    Timers(false);
}

function loop() {
    if (pause == false) {
        update();
        collisions();
        draw();
    }
    window.requestAnimationFrame(loop);
}


function update() {

    pl.update();
    point.update();
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

function collisions() {
    if (collision(pl, point)) {
        ui.score += 1000;
        point.delay();
    }
    for (let j = 0; j < enemies.length; j++) {
        if (collision(pl, enemies[j]) && pl.invi == false) {
            ui.hearts--;
            pl.invis();
            enemies.splice(j, 1);
        }
    }
    arraycollis(bullets, enemies);
}

function draw() {
    ctx.clearRect(0, 0, 500, 800);

    ui.background();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(images.xxxt);
    }


    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(images.bullet);

    }

    for (let i = 0; i < escores.length; i++) {
        if (escores[i].op > 0) {
            escores[i].op -= 0.01;
            ui.diescore(escores[i]);
        }
        else {
            escores.splice(i, 1);
        }
    }
    point.draw(images.prize);
    pl.draw(images.billie);

    ui.printheart();
    ui.printscore();
}

function listener() {

    window.addEventListener('blur', function (e) {
        pause = true;
        Timers(pause);
    });

    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 32) {
            pause = !pause;
            Timers(pause);
        }
    });

    canvas.addEventListener("mousedown", function () {
        vb = 10;
        ratefire = 125;
    });
    canvas.addEventListener("mouseup", function () {
        vb = 5;
        ratefire = 250;
    });
}

