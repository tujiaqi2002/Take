import {
  context,
  Enemies,
  EXPGems,
  player,
  secondsPassed,
} from "../utils/config.js";
import Character from "./Character.js";
import Vector from "../utils/Vector.js";
import Coordinate from "../utils/Coordinate.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../utils/config.js";
import EXPGem from "../utils/Level-system.js";
export default class Enemy extends Character {
  #moveSpeed;
  #velocity;
  #distanceToCharacter;
  #attackDamage;
  #moveDirection;
  #EXPDrop;

  constructor() {
    super(30, randomEnemyCoord(), 10);

    this.#moveSpeed = 100;
    this.#attackDamage = 10;
    this.#velocity = new Vector(this.coordinate, player.coordinate);
    this.#EXPDrop = 2;

    // get the direction
    const displacement = new Vector(this.coordinate, player.coordinate);
    this.#distanceToCharacter = displacement.magnitude;

    //set unit vetor
    this.#moveDirection = displacement.getUnitVector();
  }

  get moveSpeed() {
    return this.#moveSpeed;
  }

  get attackDamage() {
    return this.#attackDamage;
  }

  get velocity() {
    return this.#velocity;
  }

  get EXPDrop() {
    return this.#EXPDrop;
  }

  set moveSpeed(moveSpeed) {
    this.#moveSpeed = moveSpeed;
  }

  set velocity(velocity) {
    this.#velocity = velocity;
  }

  enemyMove() {
    this.velocity = new Vector(this.coordinate, player.coordinate);
    //move = unitVector to player
    const move = this.velocity.getUnitVector();

    this.velocity = new Vector(
      this.coordinate,
      new Coordinate(
        this.coordinate.x + move.deltaX * this.#moveSpeed * secondsPassed,
        this.coordinate.y + move.deltaY * this.#moveSpeed * secondsPassed
      )
    );
    this.coordinate.x += this.velocity.deltaX;
    this.coordinate.y += this.velocity.deltaY;

    // if (oneMove.magnitude >= displacement.magnitude) {
    //   this.coordinate = player.coordinate;
    // }

    if (this.isColliding) {
    }
  }

  enemyDraw() {
    context.fillStyle = this.isColliding ? "#0099b0" : "#da3131";
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

  enemyUpdate() {
    //check for if enemy dies
    this.enemyMove();
  }

  enemyDie() {
    //drop EXP gem
    const EXPGemDrop = new EXPGem(new Coordinate(this.coordinate.x,this.coordinate.y));
    EXPGems.push(EXPGemDrop);
  }
}

function randomEnemyCoord() {
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
