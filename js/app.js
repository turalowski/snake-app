let game = new Game([20,20]);
game.start();
document.getElementById("newGame").addEventListener("click", () => {
  game.finishGame();
  delete game;
  game = new Game([20,20])
  game.start();
})


document.onkeydown = function (e) {
  e.preventDefault();
  switch (e.keyCode) {
    //Shift
    case 16:
      game.changeInterval();
      break;
      // up
    case 38:
      if (game.direction !== "down") game.setDirection("up");
      break;

    // right
    case 39:
      if (game.direction !== "left") game.setDirection("right");
      break;

    // left
    case 37:
      if (game.direction !== "right") game.setDirection("left");
      break;

    // down
    case 40:
      if (game.direction !== "up") game.setDirection("down");
      break;
    default:
      break;
  }
};
