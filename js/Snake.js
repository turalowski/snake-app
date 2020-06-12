const rows = document.getElementsByClassName("row");
const snake = "<div class='snake'></div>";
const apple = "<div class='apple'></div>";
class Snake {
    constructor(length) {
        this.snakePoints = [];
        this.length = length;
        this.createSnake();
    }
    createSnake() {
        for (let i = 0; i < this.length; i++) {
            this.snakePoints.push([0, i]);
        }
    }

    drawSnake(fruitX, fruitY) {
        rows[fruitX].children[fruitY].innerHTML = apple;

        this.snakePoints.map((snakePoint, i) => {
            rows[snakePoint[0]].children[snakePoint[1]].innerHTML = snake;
        });
    }
}