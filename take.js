import Config, { player } from "./utils/config.js";
import {
  draw,
  update,
  rewardPhaseUpdate,
  rewardPhaseDraw,
} from "./utils/utility.js";
import {
  playerKeydownHandler,
  playerKeyupHandler,
} from "./utils/eventHandler.js";

window.addEventListener("DOMContentLoaded", gameStart);
const config = new Config();

function gameStart() {
  window.addEventListener("keydown", playerKeydownHandler, false);
  window.addEventListener("keyup", playerKeyupHandler, false);
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
  console.log(player.weapon);
}

function rewardPhaseLoop() {
  rewardPhaseUpdate();
  rewardPhaseDraw();
  if (config.rewardPhaseDone) {
    window.requestAnimationFrame(gameLoop);
  }
  window.requestAnimationFrame(rewardPhaseLoop);
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
