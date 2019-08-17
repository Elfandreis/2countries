let images = {};
let spd = 2;

//audio;
let audio = [];

let createenemy;
let createbullet;
let moveimage;

let rateenem = 500;
let ratefire = 250;

let timers = {
    pause: false,
    enemy: function () {
        if (this.pause == false) {
            let that = this;
            createEnemy();
            setTimeout(function () { that.enemy(); }, rateenem);
        }
    },
    bullet: function () {
        if (this.pause == false) {
            let that = this;
            createBullet();
            setTimeout(function () { that.bullet(); }, ratefire);
        }
    }

};

function Timers(pause) {
    timers.pause = pause;
    timers.enemy();
    timers.bullet();

}

function preloadImages() {
    let imageList = ["./img/player.png", "./img/mi.png", "./img/xxxt.png", "./img/bullet.png", "./img/heart.png", "./img/milos.png", "./img/prize.png", "./img/back.png"];
    let imagename = ["billie", "migos", "xxxt", "bullet", "heart", "milos", "prize", "back"];

    for (let i = 0; i < imageList.length; i++) {
        images[imagename[i]] = new Image();
        images[imagename[i]].src = imageList[i];
    }
}
function preloadAudio() {
    var audioList = ["./sound/bad guy.mp3", "./sound/skr.mp3", "./sound/bullet.mp3", "./sound/bullet2.mp3"];
    //do same thing as images
    audio[0] = new Sound(audioList[0], 1, 0.7);
    audio[1] = new Sound(audioList[1], 3, 0.5);
    audio[2] = new Sound(audioList[2], 20, 1);
    audio[3] = new Sound(audioList[3], 40, 1);

}

function Mousemov() {
    document.addEventListener('mousemove', function (e) {  // use event argument
        var rect = canvas.getBoundingClientRect();  // get element's abs. position
        mouse.x = e.clientX - rect.left;              // get mouse x and adjust for el.
        mouse.y = e.clientY - rect.top;               // get mouse y and adjust for el.
    });
}

function collision(box1, box2) {
    return (((box1.x + box1.w > box2.x && box1.x < box2.x + box2.w) || (box1.x + box1.w < box2.w && box1.w > box2.x))
        && ((box1.y + box1.h > box2.y && box1.y < box2.y + box2.h) || (box1.y + box1.h < box2.h && box1.h > box2.y)));
}

function arraycollis(weapon, target) {
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
                    escores.push(target[j]);
                    target.splice(j, 1);
                    audio[1].play();
                }
            }
        }
    }
}


function createBullet() {
    let Bullet = new bullet(pl, vb);
    bullets.push(Bullet);
    audio[2].play();
}

function createEnemy() {
    let Enemy = new enemy(75, 75, 3, 50, 1);
    enemies.push(Enemy);
}

preloadImages();
preloadAudio();
