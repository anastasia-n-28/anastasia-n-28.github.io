export default class GameController {
    constructor(canvas, game, view) {
        this.canvas = canvas;
        this.game = game;
        this.view = view;
        this.cue = { x: 0, y: 0, visible: false };

        this.initEventListeners();
    }

    initEventListeners() {
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        const whiteBall = this.game.balls.find((ball) => ball.color === "white");
        if (whiteBall && whiteBall.vX === 0 && whiteBall.vY === 0) {
            const dx = whiteBall.x - mouseX;
            const dy = whiteBall.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 600;
            const power = Math.min(10, Math.max(1, (distance / maxDistance) * 10));
            document.getElementById("power").textContent = `Impact force: ${power.toFixed(0)}`;
    
            this.cue.x = mouseX;
            this.cue.y = mouseY;
            this.cue.visible = true;
            this.view.draw();
        }
    }
    
    handleMouseUp(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        const whiteBall = this.game.balls.find((ball) => ball.color === "white");
        if (whiteBall) {
            const dx = whiteBall.x - mouseX;
            const dy = whiteBall.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = Math.sqrt(dx * dx + dy * dy) * 0.05;

            document.getElementById("power").textContent = `Impact force: 0`;
    
            whiteBall.vX = dx / Math.sqrt(dx * dx + dy * dy) * speed;
            whiteBall.vY = dy / Math.sqrt(dx * dx + dy * dy) * speed;
    
            this.cue.visible = false;
        }
    }
    
    handleKeyDown(e) {
        if (e.key === " ") {
            this.game.toggleRunning();
            if (this.game.isRunning) {
                this.update();
            }
        }
    }

    handleWhiteBallStopped() {
        const whiteBall = this.game.balls.find((ball) => ball.color === "white");
    
        if (whiteBall && whiteBall.vX === 0 && whiteBall.vY === 0) {
            this.cue.visible = true;

            const event = new MouseEvent("mousemove", {
                clientX: this.cue.x + this.canvas.getBoundingClientRect().left,
                clientY: this.cue.y + this.canvas.getBoundingClientRect().top,
            });
            this.canvas.dispatchEvent(event);
        }
    }           
    
    update() {
        this.game.step();
        this.handleWhiteBallStopped();

        const event = new MouseEvent("mousemove", {
            clientX: this.cue.x + this.canvas.getBoundingClientRect().left,
            clientY: this.cue.y + this.canvas.getBoundingClientRect().top,
        });
        this.canvas.dispatchEvent(event);
    
        this.view.draw();
        requestAnimationFrame(this.update.bind(this));
    }      
        
    updateScore() {
        const scoreElement = document.getElementById("score");
        const totalBalls = 16;
        const remainingBalls = this.game.balls.filter(ball => !ball.inPocket).length;
        this.score = totalBalls - remainingBalls;
    
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}/16`;
        }
    }
}