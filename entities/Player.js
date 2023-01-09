import { BOARD_HEIGHT, BOARD_WIDTH } from '../utils/config.js';
import Character from './Character.js';
import Coordinate from '../utils/Coordinate.js';

export default class Player extends Character {
  #moveUp;
  #moveDown;
  #moveLeft;
  #moveRight;

  constructor() {
    super(30, new Coordinate(BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1), 15);

    this.#moveUp = false;
    this.#moveDown = false;
    this.#moveLeft = false;
    this.#moveRight = false;
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
