import Config, { player } from './utils/config.js';
import {
  draw,
  update,
  rewardPhaseUpdate,
  rewardPhaseDraw,
} from './utils/utility.js';
import {
  playerKeydownHandler,
  playerKeyupHandler,
} from './utils/eventHandler.js';

window.addEventListener('DOMContentLoaded', gameStart);
const config = new Config();

function gameStart() {
  window.addEventListener('keydown', playerKeydownHandler, false);
  window.addEventListener('keyup', playerKeyupHandler, false);
  window.requestAnimationFrame(gameLoop);
}
export let rewardPhaseDone = false;
export let inRewardPhase = false;
export let inGamePhase = true;
export let oldTimeStamp = 0;

function gameLoop(timeStamp) {
  config.secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  config.FPS = Math.round(1 / config.secondsPassed);

  update();
  if (player.levelUp) {
    inRewardPhase = true;
    inGamePhase = false;
  }
  draw();
  phaseSwap();
}

function rewardPhaseLoop() {
  rewardPhaseUpdate();
  rewardPhaseDraw();
  if (rewardPhaseDone) {
    window.requestAnimationFrame(gameLoop);
  }
  window.requestAnimationFrame(rewardPhaseLoop);
}

function phaseSwap() {
  if (inGamePhase) {
    window.requestAnimationFrame(gameLoop);
  }

  if (inRewardPhase) {
    window.requestAnimationFrame(rewardPhaseLoop);
  }
}

export { config };
