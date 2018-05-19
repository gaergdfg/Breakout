class Paddle {
    constructor() {
        this.width = 133;
        this.height = paddleHeight;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height;
        this.speed = 10;
    }

    update(direction) {
        if(direction == 1 && this.x + this.width + this.speed < canvas.width)
            this.x += this.speed;
        else if(direction == -1 && this.x - this.speed > 0)
            this.x -= this.speed;
        else {
            if(direction == 1 && this.x + this.width + this.speed < canvas.width) {
                this.x += this.speed;
                myBall.x += this.speed;
            }
            else if(direction == -1 && this.x - this.speed > 0) {
                this.x -= this.speed;
                myBall.x -= this.speed;
            }
        }
    }

    show() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}
