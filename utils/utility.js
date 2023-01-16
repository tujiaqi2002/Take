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
  BOARD_HEIGHT,
  BOARD_WIDTH,
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
  // FPSDraw();

  Enemies.forEach((enemy) => {
    enemy.enemyDraw();
  });
  Bullets.forEach((bullet) => {
    bullet.bulletDraw();
  });

  EXPGems.forEach((EXPGem) => {
    EXPGem.EXPGemDraw();
  });

  player.playerDraw();
}

function rewardPhaseUpdate() {
  // console.log(1);
}

export let indexOfHighlightBox = 0;
export let arrowMoveUp = false;
export let arrowMoveDown = false;

export function indexOfHighlightBoxModify(_indexOfHighlightBox) {
  indexOfHighlightBox = _indexOfHighlightBox;
}

export let numberOfReward = Math.floor(Math.random() + player.luck / 100) + 3;
function rewardPhaseDraw() {
  let rewardBoxLeftGap = 10;
  let rewardBoxTopGap = 10;
  let rewardBoxWidth = 1000;
  let rewardBoxHeight = 300;
  let rewardBoxGap = 15;

  console.log(numberOfReward);

  //draw boarder
  context.strokeStyle = "gold";
  context.lineWidth = 8;
  context.beginPath();
  context.roundRect(
    (BOARD_WIDTH - 2 * rewardBoxLeftGap - rewardBoxWidth) / 2,
    (BOARD_HEIGHT -
      numberOfReward * rewardBoxHeight -
      (numberOfReward - 1) * rewardBoxGap -
      2 * rewardBoxTopGap) /
      2,
    rewardBoxWidth + 2 * rewardBoxLeftGap,
    numberOfReward * rewardBoxHeight +
      (numberOfReward - 1) * rewardBoxGap +
      2 * rewardBoxTopGap,
    [20]
  );
  context.stroke();
  context.fillStyle = "Gray";
  context.fill();

  //draw boxes
  for (let i = 0; i < numberOfReward; i++) {
    if (i == indexOfHighlightBox) {
      context.strokeStyle = "red";
    } else {
      context.strokeStyle = "gold";
    }
    context.lineWidth = 6;
    context.beginPath();
    context.roundRect(
      (BOARD_WIDTH - rewardBoxWidth) / 2,
      (BOARD_HEIGHT -
        numberOfReward * rewardBoxHeight -
        (numberOfReward - 1) * rewardBoxGap) /
        2 +
        i * rewardBoxHeight +
        i * rewardBoxGap,
      rewardBoxWidth,
      rewardBoxHeight,
      [10]
    );
    context.stroke();
  }

  //draw arrow indicator
  // context.strokeStyle = "red";
  // context.beginPath();
  // context.moveTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 140,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 -
  //     20
  // );
  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 60,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 -
  //     20
  // );

  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 60,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 -
  //     40
  // );

  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 25,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2
  // );

  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 60,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 +
  //     40
  // );
  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 60,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 +
  //     20
  // );

  // context.lineTo(
  //   (BOARD_WIDTH - rewardBoxWidth) / 2 - 140,
  //   (BOARD_HEIGHT -
  //     numberOfReward * rewardBoxHeight -
  //     (numberOfReward - 1) * rewardBoxGap) /
  //     2 +
  //     arrowIndicator * rewardBoxHeight +
  //     arrowIndicator * rewardBoxGap +
  //     rewardBoxHeight / 2 +
  //     20
  // );

  // context.closePath();

  // context.stroke();
  // context.fillStyle = "red";
  // context.fill();
  context.lineWidth = 1;
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = "25px Arial";
  context.fillStyle = "white";
  context.fillText("FPS: " + FPS, 10, 30);
}

export { boardDraw, draw, update, rewardPhaseUpdate, rewardPhaseDraw };
