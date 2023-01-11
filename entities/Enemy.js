import { context, player, secondsPassed } from "../utils/config.js";
import Character from "./Character.js";
import Vector from "../utils/Vector.js";
import Coordinate from "../utils/Coordinate.js";
import { randomEnemyCoord } from "../utils/utility.js";

export default class Enemy extends Character {
  #moveSpeed;
  #distanceToCharacter;
  #attackDamage;
  #moveDirection;

  constructor() {
    super(30, randomEnemyCoord(), 10);

    this.#moveSpeed = 100;
    this.#attackDamage = 10;

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

  set moveSpeed(moveSpeed) {
    this.#moveSpeed = moveSpeed;
  }
  d;

  enemyMove() {
    this.enemyClear();
    const displacement = new Vector(this.coordinate, player.coordinate);

    //move = unitVector to player
    const move = displacement.getUnitVector();

    const oneMove = new Vector(
      this.coordinate,
      new Coordinate(
        this.coordinate.x + move.deltaX * this.#moveSpeed * secondsPassed,
        this.coordinate.y + move.deltaY * this.#moveSpeed * secondsPassed
      )
    );

    this.coordinate.x += oneMove.deltaX;
    this.coordinate.y += oneMove.deltaY;

    if (oneMove.magnitude >= displacement.magnitude) {
      this.coordinate = player.coordinate;
    }

    this.enemyDraw();
  }

  enemyDraw() {
    context.fillStyle = "#da3131";
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

  enemyClear() {
    context.fillStyle = "#000000";
    context.strokeStyle = "#000000";
    context.beginPath();
    context.arc(
      this.coordinate.x,
      this.coordinate.y,
      this.radius + 1,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }

  enemySpawn() {
    this.enemyDraw();
  }
}