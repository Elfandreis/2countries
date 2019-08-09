class tea {
	constructor(origin, taste, effect) {
		this.origin = origin;
		this.taste = taste;
		this.effect = effect;
	}
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
var rotea = new tea(1, 2, 3);
ctx.fillRect(10, 10, 10, 10);