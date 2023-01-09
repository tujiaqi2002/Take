import { FPS, player, Enemies } from './utils/config.js';
import { boardDraw, playerUpdate, enemyUpdate } from './utils/utility.js';
import {
  playerKeydownHandler,
  playerKeyupHandler,
} from './utils/eventHandler.js';

window.addEventListener('DOMContentLoaded', gameStart);

function gameStart() {
  window.addEventListener('keydown', playerKeydownHandler, false);
  window.addEventListener('keyup', playerKeyupHandler, false);
  setInterval(update, 1000 / FPS);
}

function update() {
  boardDraw();
  playerUpdate();
  enemyUpdate();
  if (player.HP <= 0) {
    alert('Defeat');
  }

  Enemies.forEach((enemy) => {
    enemy.enemyMove();
  });
}
