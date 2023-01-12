import { context, player } from '../utils/config.js';

export default class AOE {
  #coordinate;
  #damage;

  constructor() {
    this.#coordinate = player.coordinate;
    this.#damage = 10;
  }

  draw() {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.strokeStyle = '#FFFFFF';
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      100,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  }

  update() {
    this.#coordinate = player.coordinate;
  }
}
