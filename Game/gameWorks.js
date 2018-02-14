// Canvas 

var startGame = false;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// For the Game

// Basketball
//var BALL_IMAGE = 'images/bball.jpg';
//var BALL_SPEED = 6;
//var BALL_SIZE = 26;

// paddle specific values
var paddleHeight = 5;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
//var PADDLE_SOUND = 'sounds/infinity.wav';
//var PADDLE_IMAGE = 'images/BasketballMiss.gif';
//var PADDLE_SPEED = 20;
//var PADDLE_SIZE = 5;

var dx = 2;
var dy = -2;
var x = canvas.width/2;
var y = canvas.height-30;

function ballBounce() {
   x += dx;
   y += dy;
}

function keyDownHandler(e) {
   if (e.keyCode === 32) { // space!
       startGame = true;
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
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function collisionDetection() {
   for(var c=0; c<bColumnCount; c+=1) {
       for(var r=0; r<bRowCount; r+=1) {
           var b = blocks[c][r];
           if(b.status === 1) {
               if(x > b.x && x < b.x+bWidth && y > b.y && y < b.y+bHeight) {
                   dy = -dy;
                   b.status = 0;
                   score+=1;
                   if(score === bRowCount*bColumnCount) {
                       alert("YOU WON!");
                       document.location.reload();
                   }
               }
           }
       }
   }
}

//BLOCK STUFF: 

var bRowCount = 15;
var bColumnCount = 15;
var bWidth = 30;
var bHeight = 10;
var bPadding = 0.5;
var bOffsetTop = 30;
var bOffsetLeft = 10;

var blocks = [];
for(var c=0; c<bColumnCount; c+=1) {
   blocks[c] = [];
   for(var r=0; r<bRowCount; r+=1) {
       blocks[c][r] = { x: 0, y: 0, status: 1 };
   }
}

function Blocks() {
   for(c=0; c<bColumnCount; c+=1) {
       for(r=0; r<bRowCount; r+=1) {
           if(blocks[c][r].status == 1) {
               var bX = (r*(bWidth+bPadding))+bOffsetLeft;
               var bY = (c*(bHeight+bPadding))+bOffsetTop;
               blocks[c][r].x = bX;
               blocks[c][r].y = bY;
               ctx.beginPath();
               ctx.rect(bX, bY, bWidth, bHeight);
               ctx.fillStyle = "#0000FF";
               ctx.fill();
               ctx.closePath();
           }
       }
   }
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

var score = 0;
var lives = 1;

function dMap() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
       if (startGame === false) {
          ctx.font = "20px Arial";
        ctx.fillStyle = "#000000";
   ctx.fillText("ARE YOU READY? Press Space!", 50, canvas.width/2-30);
   }
   if (startGame) {
       startup();
   }
   Blocks();
   //Ball 
    var ballRadius = 5;
   ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
   ctx.fillStyle = "#00008B";
   ctx.fill();
   ctx.closePath();
    
    // Paddle Stuff
       ctx.beginPath();
   ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "#000000";
   ctx.fill();
   ctx.closePath();

        // Scores 
   ctx.font = "14px Arial";
   ctx.fillStyle = "#000000";
   ctx.fillText("Score: "+score, 8, 20);
    //Lives Here
   ctx.font = "14px Arial";
   ctx.fillStyle = "#000000";
   ctx.fillText("Lives: "+lives, canvas.width-65, 20);
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

   requestAnimationFrame(dMap);
}

dMap();