const cvs = document.getElementById('canvas');
document.addEventListener('keydown', move, true);
document.addEventListener('keydown', color, true);
const ctx = cvs.getContext('2d');


let x = 100;
let y = 100;

let playerImage = new Image();
playerImage.src = 'player.png'
playerImage.onload = function(x,y){
    ctx.drawImage(playerImage, x, y);
}


let back = new Image();
back.src = 'back.png';

clearCanvas();
playerImage.onload(playerImage, 100,100);

function move(e){

	
	if(e.keyCode == 87)
	{
	y = y - 10;
	clearCanvas();
	playerImage.onload(x,y);
	}
	if(e.keyCode == 83)
	{
	y = y + 10;
	clearCanvas();
	playerImage.onload(x,y);
	}
	if(e.keyCode == 65)
	{
	x = x - 10;
	clearCanvas();
	playerImage.onload(x,y);
	}
	if(e.keyCode == 68)
	{
	x = x + 10;
	clearCanvas();
	playerImage.onload(x,y);
	}
	
}
function color(e){
	if(e.keyCode == 84)
	{
	ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
	}
}

function clearCanvas(){
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.drawImage(back, 0, 0);
}

