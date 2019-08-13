let canvas;
let ctx;
let border = 500;
let clack;
let billy;
let a;
let b;

document.querySelector('button').addEventListener('click', function () {
  clack = new Audio('./clack.wav');
  billy = new Audio("./bad guy.mp3");
  clack.play();
  billy.play();
  gameStart();

});

function gameStart() {
  init();

  a = new flash(150, 20, 0, 100);
  b = new flash(250, 120, - 3, 500000);
  c = new flash(390, 50, 5, 5002);
  updates();

}


function updates() {

  ctx.clearRect(0, 0, canvas.width, 500);

  if (a.collide(b)) {
    const v1 = a.bounce(b);
    const v2 = b.bounce(a);

    clack.play();
    a.v = v1;
    b.v = v2;
  }
  if (c.collide(b)) {
    const v3 = c.bounce(b);
    const v4 = b.bounce(c);

    clack.play();
    c.v = v3;
    b.v = v4;
  }
  if (a.hitwall()) {
    a.v *= -1;
    clack.play();
  }
  if (b.hitwall()) {
    b.v *= -1;
    clack.play();
  }
  if (c.hitwall()) {
    c.v *= -1;
    clack.play();
  }


  a.update();
  b.update();
  c.update();
  a.show();
  b.show();
  c.show();
  requestAnimationFrame(updates);
}
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, border, canvas.width, 100);
}



class flash {
  constructor(x, w, v, m) {
    this.x = x;
    this.y = border - w - 2;
    this.w = w;
    this.m = m;
    this.v = v;
  }

  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  hitwall() {
    return (this.x < 0 || this.x + this.w > canvas.width)
  }

  update() {
    this.x += this.v;
  }

  bounce(other) {
    let sumM = this.m + other.m
    let newV = (this.m - other.m) / sumM * this.v;
    newV += (2 * other.m / sumM) * other.v;
    return newV;
  }
  show() {
    ctx.fillStyle = "#FF851B";
    ctx.fillRect(this.x, border - this.w, this.w, this.w);
  }
}


