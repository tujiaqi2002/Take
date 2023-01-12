import {
  player,
  Enemies,
  context,
  FPS,
  modifyFPS,
  secondsPassed,
  modifySecondsPassed,
} from "./utils/config.js";
import { draw, update } from "./utils/utility.js";
import {
  playerKeydownHandler,
  playerKeyupHandler,
} from "./utils/eventHandler.js";

import { detectCollisions } from "./utils/Collision-system.js";
import Enemy from "./entities/Enemy.js";

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

  update();

  // detectEdgeCollisions();

  draw();

  if (player.HP <= 0) {
    // alert('Defeat');
  }
  window.requestAnimationFrame(gameLoop);
}
