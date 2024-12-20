export default class Game {
    constructor(table, balls) {
        this.table = table;
        this.balls = balls;
        this.isRunning = false;
    }

    step() {
        if (this.isRunning) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                ball.step();
                ball.bounce(this.table);

                if (ball.checkPocket(this.table)) {
                    this.table.removeBall(ball);
                    this.balls.splice(i, 1);
                    i--;
                }
            }
        }
    
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                this.balls[i].collide(this.balls[j]);
            }
        }
    }
    

    toggleRunning() {
        this.isRunning = !this.isRunning;
    }
}