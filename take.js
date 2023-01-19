import Config, { player } from './utils/config.js';
import { draw, update } from './utils/utility.js';
import { setEventListeners } from './utils/eventHandler.js';
import { rewardPhaseDraw, rewardPhaseUpdate } from './utils/Reward-phase.js';

window.addEventListener('DOMContentLoaded', gameStart);
const config = new Config();

function gameStart() {
  setEventListeners();
  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
  config.secondsPassed = (timeStamp - config.oldTimeStamp) / 1000;
  config.oldTimeStamp = timeStamp;
  config.FPS = Math.round(1 / config.secondsPassed);

  update();
  if (player.levelUp) {
    config.inRewardPhase = true;
    config.inGamePhase = false;
  }
  draw();
  phaseSwap();
}

function rewardPhaseLoop(timeStamp) {
  config.secondsPassed = (timeStamp - config.oldTimeStamp) / 1000;
  config.oldTimeStamp = timeStamp;
  config.FPS = Math.round(1 / config.secondsPassed);
  rewardPhaseUpdate();
  rewardPhaseDraw();
  if (config.rewardPhaseDone) {
    window.requestAnimationFrame(gameLoop);
  }

  phaseSwap();
}

function phaseSwap() {
  if (config.inGamePhase) {
    window.requestAnimationFrame(gameLoop);
  }

  if (config.inRewardPhase) {
    window.requestAnimationFrame(rewardPhaseLoop);
  }
}

export { config };
