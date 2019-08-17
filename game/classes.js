class player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.invi = false;
    }
    draw(img) {

        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
    update() {
        if (mouse.x != undefined) {

            pl.x = mouse.x - pl.w / 2;
            pl.y = mouse.y - pl.h / 2;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.w > canvas.width) {
            this.x = canvas.width - this.w;
        }
        if (this.y + this.h > canvas.height) {
            this.y = canvas.height - this.h;
        }
        else if (this.y < 0) {
            this.y = 0;
        }

    }
    invis() {
        this.invi = true;
        var that = this;
        setTimeout(function pl() {
            that.invi = false;
        }, 1000);
    }
}
class enemy {
    constructor(w, h, lives, score, spd) {
        this.w = w;
        this.h = h;
        this.y = -this.h;
        this.x = Math.floor(Math.random() * (500 - this.w));
        this.lives = lives;
        this.score = score;
        this.op = 1;
        this.spd = spd;
    }

    update() {
        this.y += spd;
    }

    draw(img) {
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
    hitbottom() {
        return (this.y + this.h > canvas.height + this.h);
    }
}

class prize {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.rand = this.x = Math.floor(Math.random() * (500 - this.w));
    }


    update() {
        if (this.y + this.h > canvas.height + this.h) {
            this.y = 0;
            this.x = this.rand;
        }
        this.y += 1;
    }

    draw(img) {
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
    hitupper() {
        return (this.y + 25 < 0);
    }
    delay() {
        this.x = -50;
        this.y = -50;
        setTimeout(function () {
            this.x = this.rand;
            this.y = 0
        }, 2000);
    }

}


class bullet {
    constructor(obj, v) {
        this.w = 20;
        this.h = 50;
        this.v = v;
        this.y = obj.y + this.v - this.h;
        this.x = obj.x + obj.w / 2 - this.w / 2;
    }
    update() {
        this.y -= this.v;

    }
    draw(img) {

        let grd = ctx.createLinearGradient(this.x, this.y + this.h + 10, this.x + this.w, this.y + 2 * this.h + 20);
        grd.addColorStop(0, "rgb(0, 0, 0)");
        grd.addColorStop(1, "rgba(255, 25, 255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(this.x, this.y + this.h, this.w, this.h + 40);
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
        //bullet with some trail
    }
    hitupper() {
        return (this.y + 25 < 0);
    }
}

function Sound(src, maxStreams = 1, vol = 1.0) {
    this.streamNum = 0;
    this.streams = [];
    for (var i = 0; i < maxStreams; i++) {
        this.streams.push(new Audio(src));
        this.streams[i].volume = vol;
    }

    this.play = function () {
        this.streamNum = (this.streamNum + 1) % maxStreams;
        this.streams[this.streamNum].play();
    }

    this.stop = function () {
        this.streams[this.streamNum].pause();
        this.streams[this.streamNum].currentTime = 0;
    }
}
