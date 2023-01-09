export default class Character {
  #HP;
  #coordinate;
  #radius;

  constructor(HP, coord, radius) {
    this.#HP = HP;
    this.#coordinate = coord;
    this.#radius = radius;
  }

  get coordinate() {
    return this.#coordinate;
  }

  get radius() {
    return this.#radius;
  }

  get HP() {
    return this.#HP;
  }

  set HP(HP) {
    this.#HP = HP;
  }

  set coordinate(cord) {
    this.#coordinate = cord;
  }
}
