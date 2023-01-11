import {
  BOARD,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  context,
  player,
  Enemies,
  secondsPassed,
  FPS,
} from "./config.js";
import Coordinate from "./Coordinate.js";

function boardDraw() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, BOARD.width, BOARD.height);
}

function draw() {
  boardDraw();
  FPSDraw();
  player.playerDraw();
}

function update() {
  Enemies.forEach((enemy) => {
    enemy.enemyUpdate();
  });
  player.playerUpdate();
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = "25px Arial";
  context.fillStyle = "white";
  context.fillText("FPS: " + FPS, 10, 30);
}

export { boardDraw, draw, update };
