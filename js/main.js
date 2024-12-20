import Table from "./Table.js";
import Game from "./Game.js";
import View from "./View.js";
import Ball from "./Ball.js"
import GameController from "./GameController.js";

const canvas = document.getElementById("canvas");

const table = new Table(450, 450, 700, 400);

const centerX = table.x + table.w / 2;
const centerY = table.y + table.h / 4;
const balls = setupTriangle(centerX, centerY, 10);
balls.forEach(ball => table.addBall(ball));

const game = new Game(table, balls);
const view = new View(game);
const gameController = new GameController(canvas, game, view);
view.gameController = gameController; 

balls.forEach(ball => {
    ball.gameController = gameController;
});

function setupTriangle(centerX, centerY, radius) {
    const balls = [];
    const colors = [
        "yellow", "navy", "red", "purple", "orange", 
        "lawngreen", "maroon", "black", "gold", "blue", 
        "orangered", "blueviolet", "coral", "greenyellow", "crimson"
    ];
    let colorIndex = 0;

    const triangleX = centerX - 150;
    const triangleY = centerY + 100;

    let cols = 5;
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row <= col; row++) {
            const x = triangleX - col * (radius * 2);
            const y = triangleY + (row - col / 2) * (radius * 2);
            balls.push(new Ball(x, y, 0, 0, radius, colors[colorIndex % colors.length]));
            colorIndex++;
        }
    }

    const whiteBallX = centerX + 150;
    const whiteBallY = centerY + 100;
    balls.push(new Ball(whiteBallX, whiteBallY, 0, 0, radius, "white"));

    return balls;
}

view.draw();