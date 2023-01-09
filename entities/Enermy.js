import { boardHeight, boardWidth, playerCoord, FPS } from '../take.js';
import Vector from '../utils/Vector.js';
import Coordinate from '../utils/Coordinate.js';

const board = document.getElementById('game-board');
var context;

class Enermy {
  #coordinate;
  #moveSpeed;
  #distanceToCharacter;
  #moveDirection;
  #attackSpeed;
  #attackDamage;
  #enermyRadius;
  #color;

  constructor() {
    this.#coordinate = randomEnermyCoord();
    this.#enermyRadius = 10;
    this.#moveSpeed = 30;
    this.#attackDamage = 5;

    // get the direction
    const displacement = new Vector(this.#coordinate, playerCoord);
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

  get enermyRadius() {
    return this.#enermyRadius;
  }

  get attackDamage() {
    return this.#attackDamage;
  }

  enermyMove() {
    this.enermyClear();
    const displacement = new Vector(this.#coordinate, playerCoord);

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
      this.#coordinate = playerCoord;
    }

    this.enermyDraw();
  }

  enermyDraw() {
    context = board.getContext('2d');
    context.fillStyle = '#da3131';
    context.strokeStyle = '#FFFFFF';
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#enermyRadius,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }

  enermyClear() {
    context = board.getContext('2d');
    context.fillStyle = '#000000';
    context.strokeStyle = '#000000';
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#enermyRadius + 1,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }

  enermySpawn() {
    this.enermyDraw();
  }
}

function randomEnermyCoord() {
  const randomValue = Math.random();
  switch (Math.floor(4 * randomValue)) {
    case 0:
      return new Coordinate(Math.random() * boardWidth, 0);
    case 1:
      return new Coordinate(0, Math.random() * boardHeight);
    case 2:
      return new Coordinate(Math.random() * boardWidth, boardHeight);
    case 3:
      return new Coordinate(boardWidth, Math.random() * boardHeight);
  }
}

export { Enermy, randomEnermyCoord };
