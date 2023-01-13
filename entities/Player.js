import { BOARD_HEIGHT, BOARD_WIDTH, EXPGems } from "../utils/config.js";
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

  //level system attribute
  #level;
  #EXP;
  #maxEXP;
  #maxEXPIncrease;
  #magnetRadius;

  #maxHealth;
  #healthRegen;

  #weapons = [];

  constructor() {
    super(100, new Coordinate(BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1), 15);

    this.#moveUp = false;
    this.#moveDown = false;
    this.#moveLeft = false;
    this.#moveRight = false;

    //level system
    this.#level = 1;
    this.#EXP = 0;
    this.#maxEXP = 10;
    this.#magnetRadius = 60;
    this.#maxEXPIncrease = 20;

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

  //player property gettters and setters
  get moveSpeed() {
    return this.#moveSpeed;
  }

  get magnetRadius() {
    return this.#magnetRadius;
  }

  get healthRegen() {
    return this.#healthRegen;
  }

  get maxHealth() {
    return this.#maxHealth;
  }

  get EXP() {
    return this.#EXP;
  }

  set EXP(EXP) {
    this.#EXP = EXP;
  }

  addWeapon(weapon) {
    this.#weapons.push(weapon);
  }

  playerUpdate() {
    this.HPBarUpdate();
    this.playerMove();
    this.EXPBarUpdate();
    this.#weapons.forEach((weapon) => weapon.update());
  }

  EXPBarDraw() {
    //draw background

    //draw  EXP bar
    context.fillStyle = "#537a73";
    context.fillRect(9, 9, ((BOARD_WIDTH - 14) * this.#EXP) / this.#maxEXP, 50);

    //draw EXP barboarder
    context.strokeStyle = "#f7f5d7";
    context.lineWidth = 8;
    context.beginPath();
    context.roundRect(7, 7, BOARD_WIDTH - 14, 50, [5]);
    context.stroke();

    //draw Level
    context.fillStyle = "white";
    context.font = "bolder 30px Courier";

    context.fillText("Level:" + this.#level, BOARD_WIDTH - 150, 40);

    context.lineWidth = 1;
  }

  EXPBarUpdate() {
    if (this.#EXP >= this.#maxEXP) {
      this.#EXP -= this.#maxEXP;
      this.#level += 1;
      this.#maxEXP += this.#maxEXPIncrease;
      console.log(1);
    }

    switch (this.#level) {
      case 10:
        this.#maxEXPIncrease = 30;
        break;
      case 20:
        this.#maxEXPIncrease = 40;
        break;
      case 40:
        this.#maxEXPIncrease = 50;
        break;
    }
  }

  HPBarDraw() {
    //draw HP bar boarder
    context.strokeStyle = "#FFFFFF";

    context.beginPath();
    context.roundRect(
      this.coordinate.x - this.radius,
      this.coordinate.y - this.radius - 20,
      2 * this.radius,
      10,
      [1]
    );
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

    EXPGems.forEach((EXPGem) => {
      if (this.moveUp) {
        EXPGem.coordinate.y += this.moveSpeed * secondsPassed;
      }
      if (this.moveDown) {
        EXPGem.coordinate.y -= this.moveSpeed * secondsPassed;
      }
      if (this.moveLeft) {
        EXPGem.coordinate.x += this.moveSpeed * secondsPassed;
      }
      if (this.moveRight) {
        EXPGem.coordinate.x -= this.moveSpeed * secondsPassed;
      }
    });
  }

  playerDraw() {
    //draw player
    context.fillStyle = this.isColliding ? "#0099b0" : "#f7f5d7";

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

    this.HPBarDraw();
    this.#weapons.forEach((weapon) => weapon.draw());
    this.EXPBarDraw();
  }
}
