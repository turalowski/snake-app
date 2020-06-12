class Game {
  constructor(size) {
    this.INTERVAL = 200;
    this.intervalDirection = "down";
    this.fruitX = 10;
    this.fruitY = 10;
    this.size = size;
    this.snake = new Snake(3);
    this.score = 0;
    this.direction = "right";
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.loop = this.loop.bind(this);
    this.generateApple = this.generateApple.bind(this);
    this.turnRight = this.turnRight.bind(this);
    this.turnLeft = this.turnLeft.bind(this);
    this.turnUp = this.turnUp.bind(this);
    this.turnDown = this.turnDown.bind(this);

    this.interval;
  }

  turnRight(x, y) {
    if (y + 1 === 20) {
      this.gameOver();
      return;
    }

    this.snake.snakePoints.push([x, y + 1]);
    for (let i = 0; i < this.snake.snakePoints.length - 1; i++) {
      if (
        this.snake.snakePoints[i][0] === x &&
        this.snake.snakePoints[i][1] === y + 1
      ) {
        this.gameOver();
        return;
      }
    }
    this.draw();

    if (x === this.fruitX && y + 1 === this.fruitY) {
      this.score += 1;
      this.generateApple();
    } else {
      this.snake.snakePoints.shift();
    }
  }
  turnLeft(x, y) {
    if (y - 1 === -1) {
      this.gameOver();
      return;
    }

    this.snake.snakePoints.push([x, y - 1]);
    for (let i = 0; i < this.snake.snakePoints.length - 1; i++) {
      if (
        this.snake.snakePoints[i][0] === x &&
        this.snake.snakePoints[i][1] === y - 1
      ) {
        this.gameOver();
        return;
      }
    }
    this.draw();

    if (x === this.fruitX && y - 1 === this.fruitY) {
      this.score += 1;
      this.generateApple();
    } else {
      this.snake.snakePoints.shift();
    }
  }

  turnDown(x, y) {
    if (x + 1 === 20) {
      this.gameOver();
      return;
    }

    this.snake.snakePoints.push([x + 1, y]);
    for (let i = 0; i < this.snake.snakePoints.length - 1; i++) {
      if (
        this.snake.snakePoints[i][0] === x + 1 &&
        this.snake.snakePoints[i][1] === y
      ) {
        this.gameOver();
        return;
      }
    }
    this.draw();

    if (x + 1 === this.fruitX && y === this.fruitY) {
      this.score += 1;
      this.generateApple();
    } else {
      this.snake.snakePoints.shift();
    }
  }
  turnUp(x, y) {
    if (x - 1 === -1) {
      this.gameOver();
      return;
    }

    this.snake.snakePoints.push([x - 1, y]);
    for (let i = 0; i < this.snake.snakePoints.length - 1; i++) {
      if (
        this.snake.snakePoints[i][0] === x - 1 &&
        this.snake.snakePoints[i][1] === y
      ) {
        this.gameOver();
        return;
      }
    }
    this.draw();

    if (x - 1 === this.fruitX && y === this.fruitY) {
      this.score += 1;
      this.generateApple();
    } else {
      this.snake.snakePoints.shift();
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }

  increaseScore() {
    this.score += 1;
  }

  generateApple() {
    let x = Math.floor(Math.random() * Math.floor(this.size[0]));
    let y = Math.floor(Math.random() * Math.floor(this.size[1]));
    for (let snake of this.snake.snakePoints) {
      if (this.snake.snakePoints[0] === x && this.snake.snakePoints[1] === y) {
        this.generateApple();
      } else {
        this.fruitX = x;
        this.fruitY = y;
        break;
      }
    }
  }

  draw() {
    let area = "";
    for (var row = this.size[0]; row > 0; row--) {
      area += "<div class='row'>";
      for (var column = this.size[1]; column > 0; column--) {
        area += "<div class='col'></div>";
      }
      area += "</div>";
    }
    document.getElementById("container").innerHTML = area;
    document.getElementById("score").innerText = `Score: ${this.score}`;
    this.snake.drawSnake(this.fruitX, this.fruitY);
  }

  update() {
    const [x, y] = this.snake.snakePoints[this.snake.snakePoints.length - 1];

    switch (this.direction) {
      case "right":
        this.turnRight(x, y);
        break;
      case "left":
        this.turnLeft(x, y);
        break;
      case "up":
        this.turnUp(x, y);
        break;
      case "down":
        this.turnDown(x, y);
        break;
    }
  }
  changeInterval() {
    clearInterval(this.interval);
    if (this.INTERVAL === 50) {
      this.intervalDirection = "rise";
    } else if (this.INTERVAL === 200) {
      this.intervalDirection = "down";
    }
    if (this.intervalDirection === "rise") {
      this.INTERVAL += 50;
    } else {
      this.INTERVAL -= 50;
    }
    console.log(this.INTERVAL);
    this.interval = setInterval(this.loop, this.INTERVAL);
  }

  loop() {
    this.update();
  }
  start() {
    this.draw();
    this.interval = setInterval(this.loop, this.INTERVAL);
  }

  gameOver() {
    alert("Game over");
    clearInterval(this.interval);
    document.getElementById("container").innerHTML = "";
    document.getElementById("score").innerHTML = "Score: 0";
  }
  finishGame() {
    clearInterval(this.interval);
    document.getElementById("container").innerHTML = "";
  }
}
