import {
  BOARD,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  context,
  player,
  Enemies,
  secondsPassed,
} from "./config.js";
import Coordinate from "./Coordinate.js";

function boardDraw() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, BOARD.width, BOARD.height);
}

export { boardDraw,BOARD_HEIGHT,BOARD_WIDTH };
