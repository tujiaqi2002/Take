import Config, { player,config } from './utils/config.js';
import { draw, update } from './utils/utility.js';
import { setEventListeners } from './utils/eventHandler.js';
import { rewardPhaseDraw, rewardPhaseUpdate } from './utils/Reward-phase.js';
import { homePageDraw, homePageUpdate } from './utils/Home-page.js';


window.addEventListener('DOMContentLoaded', gameStart);

function gameStart() {
  setEventListeners();
  phaseSwap();
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

  phaseSwap();
}

function homePageLoop(timeStamp) {
  config.secondsPassed = (timeStamp - config.oldTimeStamp) / 1000;
  config.oldTimeStamp = timeStamp;
  config.FPS = Math.round(1 / config.secondsPassed);

  homePageUpdate();
  homePageDraw();

  phaseSwap();
}

function powerUpPhase(timeStamp) {}

function phaseSwap() {
  if (config.inGamePhase) {
    window.requestAnimationFrame(gameLoop);
  }

  if (config.inRewardPhase) {
    window.requestAnimationFrame(rewardPhaseLoop);
  }

  if (config.inHomePagePhase) {
    window.requestAnimationFrame(homePageLoop);
  }
}

export { config };
