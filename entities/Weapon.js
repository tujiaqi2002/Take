export default class Weapon {
  #damage;
  #cooldown;
  #coordinate;

  constructor(damage, cooldown, coordinate) {
    this.#damage = damage;
    this.#cooldown = cooldown;
    this.#coordinate = coordinate;
  }

  get coordinate() {
    return this.#coordinate;
  }

  get damage() {
    return this.#damage;
  }

  set coordinate(coordinate) {
    this.#coordinate = coordinate;
  }

  get cooldown() {
    return this.#cooldown;
  }

  set cooldown(cooldown) {
    this.#cooldown = cooldown;
  }
}
