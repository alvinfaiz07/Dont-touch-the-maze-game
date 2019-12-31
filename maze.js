// Make canvas statements
const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

const c = canvas.getContext('2d');

// Object that checks if key is pressed
let keyPressed = {
	left: false,
	right: false,
	up: false,
	down: false
}

// Goal object
const Goal = {
	x: canvas.width - 120,
	y: canvas.height - 110,
	width: 100,
	height: 100,
	draw: function(){
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "#13E864";
		c.fill();
		c.stroke();
		c.closePath();
	}
}

// Ball object
function Ball(x, y, radius, dx, dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "#FF00FF";
		c.fill();
		c.stroke();
		c.closePath();
	}

	this.move = function(){

		// Conditions that checks if ball is greater or less than canvas width
		if(keyPressed.left){
			if(this.x - radius > 0){
				this.x -= this.dx;
			}
		}
		if(keyPressed.right){
			if(this.x + radius < canvas.width){
				this.x += this.dx;
			}
		}

		// Conditions that checks if ball is greater or less than canvas height
		if(keyPressed.up){
			if(this.y - radius > 0){
				this.y -= this.dy;
			}
		}
		if(keyPressed.down){
			if(this.y + radius < canvas.height){
				this.y += this.dy;
			}
		}


		this.draw();
	}
}

// Wall object
function Wall(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function(){
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "black";
		c.fill();
		c.closePath();
	}
}


// Create walls and save it in an array
let wallArray = [
new Wall(0, 100, canvas.width - 150, 5),
new Wall(150, 200, canvas.width, 5),
new Wall(150, 200, 5, 125),
new Wall(250, canvas.height - 125, 5, 125),
new Wall(350, 200, 5, 125),
new Wall(450, canvas.height - 125, 5, 125),
new Wall(550, 200, 5, 125),
new Wall(650, canvas.height - 125, 5, 125)
];

// Create the ball using the object 
let ball = new Ball(30, 30, 20, 7, 7);


// Check function if ball touchs walls
function RectCircleColliding(circle,rect){
    let distX = Math.abs(circle.x - rect.x-rect.width/2);
    let distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    let dx=distX-rect.width/2;
    let dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

function wallsCheck(){
	if(RectCircleColliding(ball, wallArray[0])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[1])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[2])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[3])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[4])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[5])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[6])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
	if(RectCircleColliding(ball, wallArray[7])){
		alert("You lost. Try Again!");
		document.location.reload();
	}
}

// Check function if ball touchs goal square
function goalCheck(){
	if(RectCircleColliding(ball, Goal)){
		alert("kamu menang :)!");
		document.location.reload();
	}
}

function start(){
	requestAnimationFrame(start);
	c.clearRect(0, 0, innerWidth, innerHeight);


	wallArray[0].draw();
	wallArray[1].draw();
	wallArray[2].draw();
	wallArray[3].draw();
	wallArray[4].draw();
	wallArray[5].draw();
	wallArray[6].draw();
	wallArray[7].draw();

	Goal.draw();

	ball.move();
	wallsCheck();
	goalCheck();
}

// Event that check if keys are pressed
document.addEventListener('keydown', (e) => {
	if(e.keyCode === 37){
		keyPressed.left = true;
	}
	if(e.keyCode === 39){
		keyPressed.right = true;
	}
	if(e.keyCode === 38){
		keyPressed.up = true;
	}
	if(e.keyCode === 40){
		keyPressed.down = true;
	}
})

// Event that check if keys aren't pressed
document.addEventListener('keyup', (e) => {
	if(e.keyCode === 37){
		keyPressed.left = false;
	}
	if(e.keyCode === 39){
		keyPressed.right = false;
	}
	if(e.keyCode === 38){
		keyPressed.up = false;
	}
	if(e.keyCode === 40){
		keyPressed.down = false;
	}
});

start();
var timeleft = 30;
var downloadTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = timeleft + " detik lagi";
  timeleft -= 1;
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Jeng jeng waktu habis"
  }
}, 1000);
setInterval(function(){ alert("JHAA Waktunya Habiss!, reload untuk main lagi"); }, 32000);



/*
// Check function if you touch walls
function checkTouch(){

	for(let i = 0; i < wallArray.lenght; i++){
		let distX = Math.abs(ball.x - wallArray[i].x - wallArray[i].width / 2);
	    let distY = Math.abs(ball.y - wallArray[i].y - wallArray[i].height / 2);

		if (distX > (wallArray[i].width / 2 + ball.radius)) { return false; };
    	if (distY > (wallArray[i].height / 2 + ball.radius)) { return false; };

    	if (distX <= (wallArray[i].width / 2)) { return true; };
    	if (distY <= (wallArray[i].height / 2)) { return true; };

    	let dx = distX - wallArray[i].width / 2;
    	let dy = distY - wallArray[i].height / 2;

    	return (dx*dx+dy*dy<=(ball.radius * ball.radius));
	}
    
}*/
