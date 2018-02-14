// Canvas 

var startGame = false;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10
var x = canvas.width/2;
var y = canvas.height-30;

// For the Game

//// Basketball
//var BALL_IMAGE = 'images/bball.jpg';
//var BALL_SPEED = 6;
//var BALL_SIZE = 26;


var dx = 2;
var dy = -2;
var paddleHeight = 15;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 1;

var bricks = [];

var c;
var r; 
for(c=0; c<brickColumnCount; c+=1) {
   bricks[c] = [];
   for(r=0; r<brickRowCount; r+=1) {
       bricks[c][r] = { x: 0, y: 0, status: 1 };
   }
}
function paddleExpand() {
   paddleWidth *= 1.05;
}
function paddleSmall() {
   paddleWidth *= 0.95;
}
function bonusLife() {
   lives++;
}
function ballBounce() {
   x += 2;
   y += -2;
}

function keyDownHandler(e) {
   if (e.keyCode === 66) { // b!
       paddleExpand();
   }
   if (e.keyCode === 83) { // s!
       paddleSmall();
   }
   if (e.keyCode === 32) { // space!
       startGame = true;
   }
      if (e.keyCode === 76) { // l! 
       bonusLife();
   }
   if(e.keyCode === 39) {
       rightPressed = true;
   }
   else if(e.keyCode === 37) {
       leftPressed = true;
   }
}
function keyUpHandler(e) {

   if(e.keyCode === 39) {
       rightPressed = false;
   }
   else if(e.keyCode === 37) {
       leftPressed = false;
   }
}

function mouseMoveHandler(e) {
   var relativeX = e.clientX - canvas.offsetLeft;
   if(relativeX > 0 && relativeX < canvas.width) {
       paddleX = relativeX - paddleWidth/2;
   }
}


/*
 * Setup input responses
 */
// respond to both keys and mouse movements
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function collisionDetection() {
   for(c=0; c<brickColumnCount; c+=1) {
       for(r=0; r<brickRowCount; r+=1) {
           var b = bricks[c][r];
           if(b.status === 1) {
               if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                   dy = -dy;
                   b.status = 0;
                   score+=1;
                   if(score === brickRowCount*brickColumnCount) {
                       alert("OH");
                       document.location.reload();
                   }
               }
           }
       }
   }
}

function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
   ctx.fillStyle = "#FFFF00";
   ctx.fill();
   ctx.closePath();
}

function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "#000000";
   ctx.fill();
   ctx.closePath();
}
function drawBricks() {
   for(c=0; c<brickColumnCount; c+=1) {
       for(r=0; r<brickRowCount; r+=1) {
           if(bricks[c][r].status == 1) {
               var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
               var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
               bricks[c][r].x = brickX;
               bricks[c][r].y = brickY;
               ctx.beginPath();
               ctx.rect(brickX, brickY, brickWidth, brickHeight);
               ctx.fillStyle = "#0000FF";
               ctx.fill();
               ctx.closePath();
           }
       }
   }
}

function drawScore() {
   ctx.font = "16px Garamond";
   ctx.fillStyle = "#410B13";
   ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
   ctx.font = "16px Garamond";
   ctx.fillStyle = "#410B13";
   ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function startText() {
   ctx.font = "20px Fantasy";
   ctx.fillText("ARE YOU READY? Press Space!", 50, canvas.width/2-30);
}

function paddleSlide() {
   if (leftPressed && paddleX >= 0) {
       paddleX += -5;
   }
   if (rightPressed && paddleX+paddleWidth <= canvas.width) {
       paddleX += 5;
   }
}

function startup() {
   ballBounce();
   paddleSlide();
   collisionDetection();
}

function draw() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
       if (startGame === false) {
       startText();
   }
   if (startGame) {
       startup();
   }
   drawBricks();
   drawBall();
   drawPaddle();
   drawScore();
   drawLives();
   collisionDetection();

   if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
       dx = -dx;
   }
   if(y + dy < ballRadius) {
       dy = -dy;
   }
   else if(y + dy > canvas.height-ballRadius) {
       if(x > paddleX && x < paddleX + paddleWidth) {
           dy = -dy;
       }
       else {
           lives--;
           if(!lives) {
               alert("GAME OVER");
               document.location.reload();
           }
           else {
               x = canvas.width/2;
               y = canvas.height-30;
               dx = 3;
               dy = -3;
               paddleX = (canvas.width-paddleWidth)/2;
           }
       }
   }

   requestAnimationFrame(draw);
}

draw();

