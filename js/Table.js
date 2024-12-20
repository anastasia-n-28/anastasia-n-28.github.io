export default class Table {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.pockets = [
            { x: x, y: y }, // верхній лівий кут
            { x: x + w, y: y }, // верхній правий кут
            { x: x, y: y + h }, // нижній лівий кут
            { x: x + w, y: y + h }, // нижній правий кут
            { x: x + w / 2, y: y }, // верхній центр
            { x: x + w / 2, y: y + h } // нижній центр
        ];
        this.balls = [];
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    removeBall(ball) {
        const index = this.balls.indexOf(ball);
        if (index !== -1) {
            this.balls.splice(index, 1);
        }
    }
}
