import { detectCollisions } from "./Collision-system.js";
import { context, EXPGems, player } from "./config.js";
import { circleIntersect } from "./Collision-system.js";
import Vector from "./Vector.js";
export default class EXPGem {
  #EXPAmount;
  #coordinate;
  #radius;
  #velocity;

  constructor(coordinate) {
    this.#coordinate = coordinate;
    this.#EXPAmount = 2;
    this.#radius = 2;
    this.#velocity = new Vector(this.#coordinate, this.#coordinate);
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
    context.fillStyle = "#eeff00";
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#radius,
      0,
      2 * Math.PI,
      false
    );
    context.stroke();
    context.fill();
  }

  EXPGemUpdate() {
    this.#coordinate.x += this.#velocity.getUnitVector().deltaX * 10;
    this.#coordinate.y += this.#velocity.getUnitVector().deltaY * 10;
  }
}
