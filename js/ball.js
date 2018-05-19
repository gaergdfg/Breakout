class Ball {
    constructor() {
        this.speed = baseSpeed * Math.pow(speedGrowth, level - 1);
        this.size = 20;
        this.y = canvas.height - paddleHeight - this.size / 2 - this.speed * 2;
        this.x = canvas.width / 2;
        this.dirY = -1;
        this.dirX = 1;
    }

    update(myPaddle) {
        if(this.y - this.size / 2 + this.speed * this.dirY <= 100 || this.y + this.size / 2 >= canvas.height || this.collide(myPaddle, 1))
            this.dirY *= -1;
        if(this.x - this.size / 2 + this.speed * this.dirX <= 0 || this.x + this.size / 2 + this.speed * this.dirX >= canvas.width || this.collide(myPaddle, 0))
            this.dirX *= -1;
        this.y += this.speed * this.dirY;
        this.x += this.speed * this.dirX;
    }

    show() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    collide(object, y) {
        if(y == 1) {
            if( this.y + this.size / 2 + this.speed * this.dirY >= object.y &&
                this.x + this.size / 2 + this.speed * this.dirX >= object.x &&
                this.x - this.size / 2 + this.speed * this.dirX <= object.x + object.width) {
                    this.dirY *= -1;
            }
        } else {
            if( this.y + this.size / 2 + this.speed * this.dirY >= object.y &&
                this.y - this.size / 2 + this.speed * this.dirY <= object.y + object.height &&
                ((this.x <= object.x && this.x + this.size / 2 + this.speed * this.dirX >= object.x) ||
                (this.x + this.speed * this.dirX >= object.x + object.width && this.x - this.size / 2 + this.speed * this.dirX <= object.x + object.width))) {
                    this.dirX *= -1;
            }
        }
    }
}
