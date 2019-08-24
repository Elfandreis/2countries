let images = {};


//audio;
let audios = {};

let createenemy;
let createbullet;

let rateenem = 500;
let ratefire = 250;

let timers = {
    pause: false,
    enemy: function () {
        if (this.pause == false) {
            let that = this;
            let Enemy = new enemy(75, 75, 3, 50, 2);
            enemies.push(Enemy);
            setTimeout(function () { that.enemy(); }, rateenem);
        }
    },
    bullet: function () {
        if (this.pause == false) {
            let that = this;
            let Bullet = new bullet(pl, vb);
            bullets.push(Bullet);
            audios.bullet.play();
            setTimeout(function () { that.bullet(); }, ratefire);
        }
    },
};

function Timers(pause) {
    timers.pause = pause;
    timers.enemy();
    timers.bullet();
}

function preloadImages() {
    let imageList = ["./img/player.png", "./img/mi.png", "./img/xxxt.png", "./img/bullet.png", "./img/heart.png", "./img/milos.png", "./img/prize.png", "./img/back.png", "./img/1mou.png", "./img/2mou.png"];
    let imagename = ["billie", "migos", "xxxt", "bullet", "heart", "milos", "prize", "back", "mo1", "mo2"];

    for (let i = 0; i < imageList.length; i++) {
        images[imagename[i]] = new Image();
        images[imagename[i]].src = imageList[i];
    }
}
function preloadAudio() {
    let audioList = ["./sound/bad guy.mp3", "./sound/skr.mp3", "./sound/bullet.mp3"];
    let audioname = ["billie", "xxxt", "bullet"];
    for (let i = 0; i < audioname.length; i++) {
        if (!isNaN(audioname[i]))
            continue;
        audios[audioname[i]] = new Sound(audioList[i], 20, 0.5 ** i);
    }

}

function Mousemov() {
    document.addEventListener('mousemove', function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

        mouse.x = (evt.clientX - rect.left) * scaleX;  // scale mouse coordinates after they have
        mouse.y = (evt.clientY - rect.top) * scaleY;    // been adjusted to be relative to element
    })
}

function collision(box1, box2) {
    return (((box1.x + box1.w > box2.x && box1.x < box2.x + box2.w) || (box1.x + box1.w < box2.w && box1.w > box2.x))
        && ((box1.y + box1.h > box2.y && box1.y < box2.y + box2.h) || (box1.y + box1.h < box2.h && box1.h > box2.y)));
}

function bulenem(weapon, target) {
    for (let i = 0; i < weapon.length; i++) {
        for (let j = 0; j < target.length; j++) {
            if (weapon[i] == undefined) {
                continue;
            }
            if (collision(weapon[i], target[j])) {
                target[j].lives--;
                weapon.splice(i, 1);
                if (target[j].lives == 0) {
                    ui.score += target[j].score;
                    target[j].op = 1;
                    escores.push(target[j]);
                    target.splice(j, 1);
                    audios.xxxt.play();
                }
            }
        }
    }
}


function createPoint() {
    let Point = new prize(50, 0);
    points.push(Point);
}


//fps

let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed, currentFps;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    loop();
}


preloadImages();
preloadAudio();
