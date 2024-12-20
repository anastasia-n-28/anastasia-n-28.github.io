export default class Ball {
    constructor(x, y, vX, vY, radius = 10, color = 'white', mass = 1, gameController = null) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.mass = mass;
        this.vX = vX;
        this.vY = vY;
        this.inPocket = false;
        this.gameController = gameController;
    }

    step() {
        this.x += this.vX;
        this.y += this.vY;

        this.vX *= 0.985;
        this.vY *= 0.985;

        if (Math.abs(this.vX) < 0.01) this.vX = 0;
        if (Math.abs(this.vY) < 0.01) this.vY = 0;
    }

    checkPocket(table) {
        const isWhiteBall = this.color === "white";
        const ballsOnTable = table.balls.filter(ball => ball !== this && ball.color !== "white");
     
        for (let pocket of table.pockets) {
            const dx = this.x - pocket.x;
            const dy = this.y - pocket.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const pocketRadius = 15;
    
            if (distance < pocketRadius) {
                console.log(`Куля ${this.color} потрапила в лунку!`);
                if (isWhiteBall && ballsOnTable.length > 0) {
                    return false;
                }
                this.inPocket = true;
                this.x = pocket.x;
                this.y = pocket.y;
                this.vX = 0;
                this.vY = 0;
    
                if (this.gameController) {
                    this.gameController.updateScore();
                }
                return true;
            }
        }
        return false;
    }

    bounce(table) {
        if (this.x - this.radius < table.x || this.x + this.radius > table.x + table.w) {
            this.vX = -this.vX;
        }
        if (this.y - this.radius < table.y || this.y + this.radius > table.y + table.h) {
            this.vY = -this.vY;
        }
    }

    collide(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + otherBall.radius) {
            const normalX = dx / distance;
            const normalY = dy / distance;

            const relativeVelocityX = this.vX - otherBall.vX;
            const relativeVelocityY = this.vY - otherBall.vY;

            const dotProduct = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);

            if (dotProduct > 0) return;

            const coefficientOfRestitution = 0.9;
            const impulse = (2 * dotProduct) / (this.mass + otherBall.mass);

            this.vX -= impulse * otherBall.mass * normalX * coefficientOfRestitution;
            this.vY -= impulse * otherBall.mass * normalY * coefficientOfRestitution;
            otherBall.vX += impulse * this.mass * normalX * coefficientOfRestitution;
            otherBall.vY += impulse * this.mass * normalY * coefficientOfRestitution;
        }
    }
}
