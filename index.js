let canvas;
let ctx;

let pl;
let bullets = [];
let enemies = [];
let points = [];
let mouse = {};
let escores = [];

let pause = false;

let movei = 0;

let vb = 5;


//frame counters fps
const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
}
refreshLoop();

var ui = {
    score: 0,
    spd: 2,
    hearts: 16,
    printscore: function () {
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = "40px Georgia"
        ctx.fillText('Score ' + fps + ' ', 270, 40);
    },
    printheart: function () {
        if (this.hearts <= 0) {
            pause = true;
            Timers(pause);
            ctx.drawImage(images.milos, 0, 0, canvas.width, canvas.height);
        }
        for (let i = 0; i < this.hearts; i++) {
            ctx.drawImage(images.heart, i * 75 + 10, 10, 50, 50);
        }
    },
    background: function () {
        this.spd += 0.3;
        ctx.fillStyle = "#39CCCC";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images.mo2, 0, 300 + this.spd);
        ctx.drawImage(images.mo1, 0, 400 + this.spd * 1.1);

    },
    diescore: function (obj) {
        ctx.font = 30 + "px Verdana";
        ctx.fillStyle = "rgba(255, 0, 0," + obj.op + ")";
        ctx.textAlign = "center";
        ctx.fillText(obj.score, obj.x + obj.w / 2, obj.y + obj.h / 2);
    }
};

//event starter
document.querySelector('button').addEventListener('click', function () {
    let bt = document.getElementById("start");
    bt.style.display = "none";
    gameStart();
});


function gameStart() {
    init();
    listeners();
    window.requestAnimationFrame(loop);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    pl = new player(250, 800, 100, 100);

    //music
    audio[0].play();

    Mousemov();
    Timers(false);
    createPoint();
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
    for (let i = 0; i < points.length; i++) {
        points[i].update();
    }

}

function collisions() {
    for (let i = 0; i < points.length; i++) {
        points[i].draw(images.prize);

        if (collision(pl, points[i])) {
            ui.score += 1000;
            points[i].delay();
        }
    }

    for (let j = 0; j < enemies.length; j++) {
        if (collision(pl, enemies[j]) && pl.invi == false) {
            ui.hearts--;
            pl.invis();
            enemies.splice(j, 1);
        }
    }
    war(bullets, enemies);
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

    for (let i = 0; i < points.length; i++) {
        points[i].draw(images.prize);
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
    pl.draw(images.billie);

    ui.printheart();
    ui.printscore();

}

function listeners() {

    //pausing
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

    //charge
    canvas.addEventListener("mousedown", function () {
        vb = 10;
        ratefire = 125;
    });

    //back state
    canvas.addEventListener("mouseup", function () {
        vb = 5;
        ratefire = 250;
    });
}

