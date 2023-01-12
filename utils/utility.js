import { BOARD, context, player, Enemies, FPS, Bullets } from './config.js';
import Coordinate from './Coordinate.js';
import { detectCollisions } from './Collision-system.js';

function boardDraw() {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, BOARD.width, BOARD.height);
}

function update() {
  detectCollisions();
  Enemies.forEach((enemy) => {
    enemy.enemyUpdate();
  });
  player.playerUpdate();
}

function draw() {
  boardDraw();
  FPSDraw();

  Enemies.forEach((enemy) => {
    enemy.enemyDraw();
  });
  Bullets.forEach((bullet) => {
    bullet.bulletDraw();
  });

  player.playerDraw();
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = '25px Arial';
  context.fillStyle = 'white';
  context.fillText('FPS: ' + FPS, 10, 30);
}

export { boardDraw, draw, update };
