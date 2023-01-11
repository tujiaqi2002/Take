import Coordinate from "./Coordinate.js";

export default class Vector {
  #direction;
  #magnitude;
  #deltaX;
  #deltaY;
  #startPoint;
  #endPoint;

  constructor(startPoint, endPoint) {
    this.#startPoint = startPoint;
    this.#endPoint = endPoint;
    this.#deltaX = this.#endPoint.x - this.#startPoint.x;
    this.#deltaY = this.#endPoint.y - this.#startPoint.y;
    this.#direction = new Coordinate(this.#deltaX, this.#deltaY);
    this.#magnitude = Math.sqrt(
      Math.pow(this.#direction.x, 2) + Math.pow(this.#direction.y, 2)
    );
  }

  get startPoint() {
    return this.#startPoint;
  }

  get endPoint() {
    return this.#endPoint;
  }

  get direction() {
    return this.#direction;
  }

  get magnitude() {
    return this.#magnitude;
  }

  get deltaX() {
    return this.#deltaX;
  }

  get deltaY() {
    return this.#deltaY;
  }

  set deltaX(deltaX) {
    this.#deltaX = deltaX;
  }

  set deltaY(deltaY) {
    this.#deltaY = deltaY;
  }

  getUnitVector() {
    if (this.#magnitude != 0) {
      return new Vector(
        new Coordinate(this.#startPoint.x, this.#startPoint.y),

        new Coordinate(
          this.#startPoint.x + this.#deltaX / this.#magnitude,
          this.#startPoint.y + this.#deltaY / this.#magnitude
        )
      );
    } else
      return new Vector(
        new Coordinate(this.#startPoint.x, this.#startPoint.y),

        new Coordinate(this.#startPoint.x, this.#startPoint.y)
      );
  }
}
