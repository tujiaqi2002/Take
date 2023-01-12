import { context, player } from '../utils/config.js';

export default class AOE {
  #coordinate;

  constructor() {
    this.#coordinate = player.coordinate;
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
    context.stroke();
    context.fill();
  }

  update() {
    this.#coordinate = player.coordinate;
  }
}
