import { BOARD_HEIGHT, BOARD_WIDTH, player } from './config.js';
import { config } from '../take.js';
import Ezq from '../entities/EZq.js';
import AOE from '../entities/AOE.js';
import Freeze from '../entities/Freeze.js';

let numberOfReward;
let rewardArray;
let indexOfHighlightBox = 0;
let arrowMoveUp = false;
let arrowMoveDown = false;

export function rewardPhaseUpdate() {
  numberOfReward = Math.floor(Math.random() + player.luck / 100) + 3;
  rewardArray = [new AOE(), new Ezq(), new Freeze()];
  if (config.rewardPhaseDone) {
    //reset all the detectors so the game can switch back to game phase
    player.addWeapon(rewardArray[indexOfHighlightBox]);
    config.inGamePhase = true;

    config.inRewardPhase = false;
    config.rewardPhaseDone = false;
    player.levelUp = false;
    player.moveUp = false;
    player.moveDown = false;
    player.moveLeft = false;
    player.moveRight = false;
    indexOfHighlightBox = 0;
  }
}

export function indexOfHighlightBoxModify(_indexOfHighlightBox) {
  indexOfHighlightBox = _indexOfHighlightBox;
}

export function rewardPhaseDraw() {
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
    //draw rewards
    config.context.fillStyle = 'white';
    config.context.font = 'bolder 50px Courier';
    config.context.fillText(
      rewardArray[i].name,
      (BOARD_WIDTH - rewardBoxWidth) / 2 + 0.7 * rewardBoxWidth,
      (BOARD_HEIGHT -
        numberOfReward * rewardBoxHeight -
        (numberOfReward - 1) * rewardBoxGap) /
        2 +
        i * rewardBoxHeight +
        i * rewardBoxGap +
        0.55 * rewardBoxHeight
    );
  }

  config.context.lineWidth = 1;
}

export { indexOfHighlightBox, arrowMoveUp, arrowMoveDown, numberOfReward };
