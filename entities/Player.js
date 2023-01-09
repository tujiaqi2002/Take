import { BOARD_HEIGHT, BOARD_WIDTH } from '../utils/config.js';
import Coordinate from '../utils/Coordinate.js';

export default class Player {
  #coordinate;
  #radius;
  #moveUp;
  #moveDown;
  #moveLeft;
  #moveRight;
  #HP;

  constructor() {
    this.#coordinate = new Coordinate(
      BOARD_WIDTH / 2 - 1,
      BOARD_HEIGHT / 2 - 1
    );
    this.#HP = 30;
    this.#radius = 15;
    this.#moveUp = false;
    this.#moveDown = false;
    this.#moveLeft = false;
    this.#moveRight = false;
  }

  get coordinate() {
    return this.#coordinate;
  }

  get radius() {
    return this.#radius;
  }

  get HP() {
    return this.#HP;
  }

  get moveUp() {
    return this.#moveUp;
  }

  get moveDown() {
    return this.#moveDown;
  }

  get moveLeft() {
    return this.#moveLeft;
  }

  get moveRight() {
    return this.#moveRight;
  }

  set moveUp(bool) {
    this.#moveUp = bool;
  }

  set moveDown(bool) {
    this.#moveDown = bool;
  }

  set moveLeft(bool) {
    this.#moveLeft = bool;
  }

  set moveRight(bool) {
    this.#moveRight = bool;
  }
}
