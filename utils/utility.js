import { player, Enemies, EXPGems, allCharacters, config } from './config.js';
import { detectCollisions, circleIntersect } from './Collision-system.js';
import Enemy from '../entities/Enemy.js';

function boardDraw() {
  config.context.fillStyle = '#080404';
  config.context.fillRect(0, 0, config.BOARD.width, config.BOARD.height);
}

function update() {
  detectCollisions();

  //update EXP gems
  EXPGems.forEach((EXPGem, index) => {
    EXPGem.EXPGemTake();
    EXPGem.EXPGemUpdate();
    if (
      circleIntersect(
        EXPGem.coordinate.x,
        EXPGem.coordinate.y,
        EXPGem.radius,
        player.coordinate.x,
        player.coordinate.y,
        player.radius - EXPGem.radius
      )
    ) {
      EXPGems.splice(index, 1);
      //update player EXP bar
      player.EXP += EXPGem.EXPAmount;
    }
  });
  //update all enemies
  Enemies.forEach((enemy, index) => {
    //check for enemy die
    if (enemy.HP <= 0) {
      Enemies.splice(index, 1);
      allCharacters.splice(index + 1, 1);
      index--;
      enemy.enemyDie();
    }
    enemy.enemyUpdate();
  });
  if (Enemies.length < 50) {
    let newEnemy = new Enemy();
    Enemies.push(newEnemy);
    allCharacters.push(newEnemy);
  }
  player.playerUpdate();
}

function draw() {
  boardDraw();

  Enemies.forEach((enemy) => {
    enemy.enemyDraw();
  });

  EXPGems.forEach((EXPGem) => {
    EXPGem.EXPGemDraw();
  });

  player.playerDraw();
  FPSDraw();
}

function FPSDraw() {
  // Draw FPS to the screen
  config.context.font = '25px Arial';
  config.context.fillStyle = 'white';
  config.context.fillText('FPS: ' + config.FPS, 10, 30);
}

export function closestEnemy(coordinate) {
  let distance = Infinity;
  let Enemy = null;

  Enemies.forEach((enemy) => {
    const curDistance = distanceTwoPoints(enemy.coordinate, coordinate);
    if (curDistance < distance) {
      distance = curDistance;
      Enemy = enemy;
    }
  });

  return Enemy.coordinate;
}

function distanceTwoPoints(coordinateA, coordinateB) {
  const dx = Math.abs(coordinateA.x) - Math.abs(coordinateB.x);
  const dy = Math.abs(coordinateA.y) - Math.abs(coordinateB.y);

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

export { boardDraw, draw, update, FPSDraw };
