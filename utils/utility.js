import { config } from '../take.js';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  player,
  Enemies,
  EXPGems,
  allCharacters,
} from './config.js';
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
}

function rewardPhaseUpdate() {}

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

  //draw boarder
  config.context.strokeStyle = 'gold';
  config.context.lineWidth = 8;
  config.context.beginPath();
  config.context.roundRect(
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
  config.context.stroke();
  config.context.fillStyle = 'Gray';
  config.context.fill();

  //draw boxes
  for (let i = 0; i < numberOfReward; i++) {
    if (i == indexOfHighlightBox) {
      config.context.strokeStyle = 'red';
    } else {
      config.context.strokeStyle = 'gold';
    }
    config.context.lineWidth = 6;
    config.context.beginPath();
    config.context.roundRect(
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
    config.context.stroke();
  }

  config.context.lineWidth = 1;
}

function FPSDraw() {
  // Draw FPS to the screen
  context.font = '25px Arial';
  context.fillStyle = 'white';
  context.fillText('FPS: ' + FPS, 10, 30);
}

export { boardDraw, draw, update, rewardPhaseUpdate, rewardPhaseDraw };
