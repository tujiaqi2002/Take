export default class Weapon {
  #damage;
  #cooldown;
  #coordinate;
  #name;

  constructor(name, damage, cooldown, coordinate) {
    this.#damage = damage;
    this.#cooldown = cooldown;
    this.#coordinate = coordinate;
    this.#name = name;
  }

  get coordinate() {
    return this.#coordinate;
  }

  get damage() {
    return this.#damage;
  }

  get name() {
    return this.#name;
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
