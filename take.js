import {
  modifyFPS,
  secondsPassed,
  modifySecondsPassed,
  EXPGems,
  player,
} from "./utils/config.js";
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

function gameStart() {
  window.addEventListener("keydown", playerKeydownHandler, false);
  window.addEventListener("keyup", playerKeyupHandler, false);
  window.requestAnimationFrame(gameLoop);
}
let rewardPhaseDone = false;
let inRewardPhase = true;
let inGamePhase = false;
let oldTimeStamp = 0;

function gameLoop(timeStamp) {
  modifySecondsPassed((timeStamp - oldTimeStamp) / 1000);
  oldTimeStamp = timeStamp;
  modifyFPS(Math.round(1 / secondsPassed));

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
