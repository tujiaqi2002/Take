import { config } from "../take.js";
import { player } from "../utils/config.js";
import {
  indexOfHighlightBox,
  indexOfHighlightBoxModify,
  numberOfReward,
} from "./Reward-phase.js";

function playerKeydownHandler(e) {
  if (config.inGamePhase) {
    switch (e.key) {
      case "w":
      case "ArrowUp": {
        player.moveUp = true;
        break;
      }
      case "s":
      case "ArrowDown": {
        player.moveDown = true;

        break;
      }
      case "a":
      case "ArrowLeft": {
        player.moveLeft = true;
        break;
      }
      case "d":
      case "ArrowRight": {
        player.moveRight = true;
        break;
      }
      default:
        return;
    }
  }
  if (config.inRewardPhase) {
    switch (e.key) {
      case "w":
      case "ArrowUp": {
        if (indexOfHighlightBox > 0) {
          indexOfHighlightBoxModify(indexOfHighlightBox - 1);
        }
        break;
      }
      case "s":
      case "ArrowDown": {
        if (indexOfHighlightBox < numberOfReward - 1) {
          indexOfHighlightBoxModify(indexOfHighlightBox + 1);
          break;
        }
      }
      default:
        return;
    }
  }
}

function playerKeyupHandler(e) {
  if (config.inGamePhase) {
    switch (e.key) {
      case "w":
      case "ArrowUp": {
        player.moveUp = false;
        break;
      }
      case "s":
      case "ArrowDown": {
        player.moveDown = false;

        break;
      }
      case "a":
      case "ArrowLeft": {
        player.moveLeft = false;
        break;
      }
      case "d":
      case "ArrowRight": {
        player.moveRight = false;
        break;
      }
      default:
        return;
    }
  }
}

export { playerKeydownHandler, playerKeyupHandler };
