import { player, config } from './config.js';
import { circleIntersect } from './Collision-system.js';
import Vector from './Vector.js';
export default class EXPGem {
  #EXPAmount;
  #coordinate;
  #radius;
  #velocity;
  #flySpeed;

  constructor(coordinate) {
    this.#coordinate = coordinate;
    this.#EXPAmount = 2;
    this.#radius = 2;
    this.#velocity = new Vector(this.#coordinate, this.#coordinate);
    this.#flySpeed = player.moveSpeed * 2;
  }

  get coordinate() {
    return this.#coordinate;
  }
  get radius() {
    return this.#radius;
  }

  get EXPAmount() {
    return this.#EXPAmount;
  }
  EXPGemTake() {
    if (
      circleIntersect(
        this.#coordinate.x,
        this.#coordinate.y,
        this.#radius,
        player.coordinate.x,
        player.coordinate.y,
        player.magnetRadius
      )
    ) {
      this.#velocity = new Vector(this.#coordinate, player.coordinate);
    }
  }

  EXPGemDraw() {
    config.context.fillStyle = '#eeff00';
    config.context.strokeStyle = '#FFFFFF';
    config.context.beginPath();
    config.context.arc(this.#coordinate.x, this.#coordinate.y, this.#radius, 0, 2 * Math.PI, false);
    config.context.stroke();
    config.context.fill();
  }

  EXPGemUpdate() {
    this.#coordinate.x +=
      this.#velocity.getUnitVector().deltaX * config.secondsPassed * this.#flySpeed;
    this.#coordinate.y +=
      this.#velocity.getUnitVector().deltaY * config.secondsPassed * this.#flySpeed;
  }
}
