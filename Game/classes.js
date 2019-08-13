
class player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.invi = false;
    }
    draw() {
        ctx.fillStyle = "blue";
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
    upgrade() {

    }


}
class enemy {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.y = 0;
        this.x = Math.floor(Math.random() * (500 - this.w));
    }

    update() {
        this.y += 1;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    hitbottom() {
        return (this.y + this.h > canvas.height + this.h);
    }


}
class points {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
    }

    update() {
        if (this.y + this.h > canvas.height + this.h) {
            this.y = 0;
            this.x = Math.floor(Math.random() * (500 - this.w));
        }
        this.y += 1;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, 20, 20);
    }
    hitupper() {
        return (this.y + 25 < 0);
    }

}
class bullet {
    constructor(obj, v) {
        this.w = 10;
        this.h = 10;
        this.v = v;
        this.y = obj.y + this.v - this.h;
        this.x = obj.x + obj.w / 2 - this.w / 2;
    }
    update() {
        this.y -= this.v;

    }
    draw() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    hitupper() {
        return (this.y + 25 < 0);
    }
}