import { BOARD_HEIGHT, BOARD_WIDTH } from "../utils/config.js";
import Character from "./Character.js";
import Coordinate from "../utils/Coordinate.js";

export default class Player extends Character {
  #moveUp;
  #moveDown;
  #moveLeft;
  #moveRight;
  #moveSpeed;

  #maxHealth;
  #healthRegen;

  constructor() {
    super(100, new Coordinate(BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1), 15);

    this.#moveUp = false;
    this.#moveDown = false;
    this.#moveLeft = false;
    this.#moveRight = false;

    this.#moveSpeed = 300;
    this.#healthRegen = 1;
    this.#maxHealth = 100;
  }

  //player move direction booleans
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

  get moveSpeed() {
    return this.#moveSpeed;
  }

  get healthRegen() {
    return this.#healthRegen;
  }

  get maxHealth(){
    return this.#maxHealth
  }
}
