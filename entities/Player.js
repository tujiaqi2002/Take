import { BOARD_HEIGHT, BOARD_WIDTH } from "../utils/config.js";
import Character from "./Character.js";
import Coordinate from "../utils/Coordinate.js";
import { secondsPassed } from "../utils/config.js";
import { context, Enemies } from "../utils/config.js";

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

  get maxHealth() {
    return this.#maxHealth;
  }

  playerUpdate() {
    this.HPBarUpdate();
    this.playerMove();
  }

  HPBarDraw() {
    //draw HP bar boarder
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.moveTo(
      this.coordinate.x - this.radius,
      this.coordinate.y - this.radius - 10
    );

    context.lineTo(
      this.coordinate.x + this.radius,
      this.coordinate.y - this.radius - 10
    );

    context.lineTo(
      this.coordinate.x + this.radius,
      this.coordinate.y - this.radius - 20
    );

    context.lineTo(
      this.coordinate.x - this.radius,
      this.coordinate.y - this.radius - 20
    );
    context.closePath();
    context.stroke();

    //draw HP bar
    context.lineTo(
      this.coordinate.x + this.radius,
      this.coordinate.y - this.radius - 10
    );

    context.lineTo(
      this.coordinate.x + this.radius,
      this.coordinate.y - this.radius - 20
    );

    context.lineTo(
      this.coordinate.x - this.radius,
      this.coordinate.y - this.radius - 20
    );

    context.fillStyle = "#FFFFFF";
    context.fillRect(
      this.coordinate.x - this.radius,
      this.coordinate.y - this.radius - 20,
      ((2 * this.radius) / 100) * this.HP,
      10
    );
  }

  HPBarUpdate() {
    //update HP
    if (this.HP + this.healthRegen * secondsPassed > this.maxHealth) {
      this.HP = this.maxHealth;
    } else {
      this.HP += this.healthRegen * secondsPassed;
    }

    Enemies.forEach((enemy) => {
      if (enemy.coordinate == this.coordinate) {
        this.HP = this.HP - enemy.attackDamage * secondsPassed;
        if (this.HP < 0) {
          this.HP = 0;
        }
      }
    });
  }

  playerMove() {
    Enemies.forEach((enemy) => {
      if (this.moveUp) {
        enemy.coordinate.y += this.moveSpeed * secondsPassed;
      }
      if (this.moveDown) {
        enemy.coordinate.y -= this.moveSpeed * secondsPassed;
      }
      if (this.moveLeft) {
        enemy.coordinate.x += this.moveSpeed * secondsPassed;
      }
      if (this.moveRight) {
        enemy.coordinate.x -= this.moveSpeed * secondsPassed;
      }
    });
  }

  playerDraw() {
    //draw this
    context.fillStyle = this.isColliding ? "#0099b0" : "#FFFFFF";

    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.arc(
      this.coordinate.x,
      this.coordinate.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }
}
