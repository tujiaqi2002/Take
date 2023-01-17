import {
  BOARD,
  context,
  player,
  Enemies,
  FPS,
  Bullets,
  setEnemies,
  EXPGems,
  allCharacters,
} from "./config.js";
import { detectCollisions, circleIntersect } from "./Collision-system.js";
import EXPGem from "./Level-system.js";
import Enemy from "../entities/Enemy.js";

function boardDraw() {
  context.fillStyle = "#080404";
  context.fillRect(0, 0, BOARD.width, BOARD.height);
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
      console.log("get");
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
      console.log(allCharacters);
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
  // FPSDraw();

  Enemies.forEach((enemy) => {
    enemy.enemyDraw();
  });
  // Bullets.forEach((bullet) => {
  //   bullet.bulletDraw();
  // });

  EXPGems.forEach((EXPGem) => {
    EXPGem.EXPGemDraw();
  });

  player.playerDraw();
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = "25px Arial";
  context.fillStyle = "white";
  context.fillText("FPS: " + FPS, 10, 30);
}

export { boardDraw, draw, update };
