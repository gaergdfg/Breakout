var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 920;
document.body.appendChild(canvas);

var fps = 1000 / 60;
var direction = 0;
var lives = 3;
var score = 0;
var level = 1;
var scoreGrowth = 1.41;
var speedGrowth = 1.13;

var paddleHeight = 17;
var baseSpeed = 6;
var myBall;
var myPaddle;

var brick = new Array();
var collumns = 6;
var rows = 3;
var bricksAmount = rows * collumns;
for(var row = 1; row <= rows; row++) {
    brick[row] = new Array();
}

resetBall();
resetGame(0);                                                                   // Start a new game

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var row = parseInt(1); row <= rows; row++) {
        for(var col = parseInt(1); col <= collumns; col++) {
            if( brick[row][col].popped == false &&
                myBall.y + myBall.size / 2 >= brick[row][col].y && myBall.y - myBall.size / 2 <= brick[row][col].y + brick[row][col].height &&
                myBall.x + myBall.size / 2 >= brick[row][col].x && myBall.x - myBall.size / 2 <= brick[row][col].x + brick[row][col].width  ){
                myBall.update(brick[row][col]);
                brick[row][col].destroy();
            }
        }
    }
    for(var row = 1; row <= rows; row++) {
        for(var col = 1; col <= collumns; col++) {
            brick[row][col].show();
        }
    }
    myPaddle.update(direction);
    myPaddle.show();
    myBall.update(myPaddle);
    myBall.show();
    drawScore();
    if(myBall.y + myBall.size / 2 >= canvas.height) {
        lives--;
        if(lives == 0) {
            document.location.reload();
            alert("You lost!\nYour score: " + score);
        }
        resetBall();
    }
    if(bricksAmount == 0) {
        level++;
        resetBall();
        resetGame(1);
    }
}

function resetGame(win) {
    if(win) {
        bricksAmount = collumns * rows;
    }
    for(var row = 1; row <= rows; row++) {
        for(var col = 1; col <= collumns; col++) {
            brick[row][col] = new Brick(col, row);
        }
    }
    //console.log(Math.pow(speedGrowth, level - 1), myBall.speed, Math.pow(scoreGrowth, level - 1), brick[1][1].value);
}

function resetBall() {
    myBall = new Ball();
    myPaddle = new Paddle();
}

function drawScore() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.strokeRect(0, 0, canvas.width, 100 - myBall.size / 2);
    ctx.fillStyle = "blue";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Lives: " + lives, 15, 33);
    ctx.fillText("Score: " + score, 15, 66);
    ctx.fillText("Level: " + level, canvas.width / 2 - 45, 50);
    ctx.closePath();
}

$(document).bind('keydown', function(e) {
    var key = e.keyCode || e.which;
    if(key == 65)
        direction = -1;
    else if(key == 68)
        direction = 1;
});

$(document).bind('keyup', function(e) {
    direction = 0;
});

setInterval(draw, fps);
