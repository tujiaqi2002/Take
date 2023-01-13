import { context, player } from '../utils/config.js';
import Weapon from './Weapon.js';

export default class AOE extends Weapon {
  constructor() {
    super(10, 1, player.coordinate);
  }

  draw() {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.strokeStyle = '#FFFFFF';
    context.beginPath();
    context.arc(
      this.coordinate.x,
      this.coordinate.y,
      100,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  }

  update() {
    this.coordinate = player.coordinate;
  }
}
