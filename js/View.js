export default class View {
    constructor(game) {
        this.game = game;
        const canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
    }

    draw() {
        this.clearCanvas();
        this.drawTable();
    
        const whiteBall = this.game.balls.find(ball => ball.color === "white");

        for (let i = 0; i < this.game.balls.length; i++) {
            this.drawBall(this.game.balls[i]);
        }
        if (this.gameController.cue.visible && whiteBall) {
            this.drawCue(whiteBall, this.gameController.cue.x, this.gameController.cue.y);
        }
    }
    

    clearCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawTable() {
        const t = this.game.table;
        this.ctx.fillStyle = 'brown';
        this.ctx.fillRect(t.x - 10, t.y - 10, t.w + 20, t.h + 20);
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(t.x, t.y, t.w, t.h);

        this.ctx.fillStyle = 'black';
        for (let pocket of t.pockets) {
            this.ctx.beginPath();
            this.ctx.arc(pocket.x, pocket.y, 15, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawBall(ball) {
        this.ctx.fillStyle = ball.color;
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawCue(ball, mouseX, mouseY) {
        const ctx = this.ctx;

        const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);

        const offset = ball.radius + 10;

        const startX = ball.x + Math.cos(angle) * offset;
        const startY = ball.y + Math.sin(angle) * offset;

        const cueLength = 400;
        const endX = startX + Math.cos(angle) * cueLength;
        const endY = startY + Math.sin(angle) * cueLength;

        ctx.save();
        ctx.lineWidth = 10;

        ctx.strokeStyle = "saddlebrown";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        const tipLength = 20;
        ctx.lineWidth = 6;
        ctx.strokeStyle = "beige";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + Math.cos(angle) * tipLength, startY + Math.sin(angle) * tipLength);
        ctx.stroke();
    
        ctx.restore();
    }
      
}    