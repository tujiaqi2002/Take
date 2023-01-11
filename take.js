import {
  player,
  Enemies,
  context,
  FPS,
  modifyFPS,
  secondsPassed,
  modifySecondsPassed,
} from "./utils/config.js";
import { boardDraw } from "./utils/utility.js";
import {
  playerKeydownHandler,
  playerKeyupHandler,
} from "./utils/eventHandler.js";

import {
  detectCollisions,
  detectEdgeCollisions,
} from "./utils/Collision-system.js";

window.addEventListener("DOMContentLoaded", gameStart);

function gameStart() {
  window.addEventListener("keydown", playerKeydownHandler, false);
  window.addEventListener("keyup", playerKeyupHandler, false);
  window.requestAnimationFrame(gameLoop);
}

let oldTimeStamp = 0;

function gameLoop(timeStamp) {
  modifySecondsPassed((timeStamp - oldTimeStamp) / 1000);
  oldTimeStamp = timeStamp;
  modifyFPS(Math.round(1 / secondsPassed));

  detectCollisions();
  boardDraw();

  // detectEdgeCollisions();
  // playerUpdate();

  player.playerUpdate();
  player.playerDraw();
  // enemyUpdate();

  FPSDraw();

  if (player.HP <= 0) {
    // alert('Defeat');
  }

  Enemies.forEach((enemy) => {
    enemy.enemyMove();
  });

  window.requestAnimationFrame(gameLoop);
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = "25px Arial";
  context.fillStyle = "white";
  context.fillText("FPS: " + FPS, 10, 30);
}
