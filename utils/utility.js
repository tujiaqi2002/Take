import { BOARD_HEIGHT, BOARD_WIDTH } from './config.js';
import Coordinate from './Coordinate.js';

export function randomEnermyCoord() {
  const randomValue = Math.random();
  switch (Math.floor(4 * randomValue)) {
    case 0:
      return new Coordinate(Math.random() * BOARD_WIDTH, 0);
    case 1:
      return new Coordinate(0, Math.random() * BOARD_HEIGHT);
    case 2:
      return new Coordinate(Math.random() * BOARD_WIDTH, BOARD_HEIGHT);
    case 3:
      return new Coordinate(BOARD_WIDTH, Math.random() * BOARD_HEIGHT);
  }
}
