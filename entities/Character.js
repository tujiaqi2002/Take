import Vector from "../utils/Vector.js";

export default class Character {
  #HP;
  #coordinate;
  #radius;
  #isColliding;
  #velocity;
  #mass;
  #restitution;

  constructor(HP, coord, radius) {
    this.#HP = HP;
    this.#coordinate = coord;
    this.#radius = radius;
    this.#isColliding = false;
    this.#mass = Math.PI * Math.pow(this.#radius, 2);
    this.#restitution = 0.9;
    this.#velocity = new Vector(this.#coordinate, this.#coordinate);
  }

  get coordinate() {
    return this.#coordinate;
  }

  get velocity() {
    return this.#velocity;
  }

  get radius() {
    return this.#radius;
  }

  get HP() {
    return this.#HP;
  }

  get isColliding() {
    return this.#isColliding;
  }

  get mass() {
    return this.#mass;
  }

  get restitution() {
    return this.#restitution;
  }

  set radius(radius) {
    this.#radius = radius;
  }
  set HP(HP) {
    this.#HP = HP;
  }

  set velocity(velocity) {
    this.#velocity = velocity;
  }

  set isColliding(bool) {
    this.#isColliding = bool;
  }

  set coordinate(cord) {
    this.#coordinate = cord;
  }

  set mass(mass) {
    this.#mass = mass;
  }
}
