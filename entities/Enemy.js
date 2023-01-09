import { FPS, player } from '../utils/config.js';
import Vector from '../utils/Vector.js';
import Coordinate from '../utils/Coordinate.js';
import { randomEnemyCoord } from '../utils/utility.js';

const board = document.getElementById('game-board');
var context;

export default class Enemy {
  #coordinate;
  #moveSpeed;
  #distanceToCharacter;
  #attackDamage;
  #enemyRadius;
  #moveDirection;

  constructor() {
    this.#coordinate = randomEnemyCoord();
    this.#enemyRadius = 10;
    this.#moveSpeed = 30;
    this.#attackDamage = 5;

    // get the direction
    const displacement = new Vector(this.#coordinate, player.coordinate);
    this.#distanceToCharacter = displacement.magnitude;

    //set unit vetor
    this.#moveDirection = displacement.getUnitVector();
  }

  set moveSpeed(moveSpeed) {
    this.#moveSpeed = moveSpeed;
  }

  set coordinate(cord) {
    this.#coordinate = cord;
  }

  get coordinate() {
    return this.#coordinate;
  }

  get moveSpeed() {
    return this.#moveSpeed;
  }

  get enemyRadius() {
    return this.#enemyRadius;
  }

  get attackDamage() {
    return this.#attackDamage;
  }

  enemyMove() {
    this.enemyClear();
    const displacement = new Vector(this.#coordinate, player.coordinate);

    //move
    const move = displacement.getUnitVector();
    const oneMove = new Vector(
      this.#coordinate,
      new Coordinate(
        this.#coordinate.x +
          ((move.deltaX * this.#distanceToCharacter) / (FPS * 100)) *
            this.#moveSpeed,
        this.#coordinate.y +
          ((move.deltaY * this.#distanceToCharacter) / (FPS * 100)) *
            this.#moveSpeed
      )
    );

    this.#coordinate.x += oneMove.deltaX;
    this.#coordinate.y += oneMove.deltaY;

    if (oneMove.magnitude >= displacement.magnitude) {
      this.#coordinate = player.coordinate;
    }

    this.enemyDraw();
  }

  enemyDraw() {
    context = board.getContext('2d');
    context.fillStyle = '#da3131';
    context.strokeStyle = '#FFFFFF';
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#enemyRadius,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }

  enemyClear() {
    context = board.getContext('2d');
    context.fillStyle = '#000000';
    context.strokeStyle = '#000000';
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#enemyRadius + 1,
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
