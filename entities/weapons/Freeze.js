import Weapon from './Weapon.js';
import { closestEnemy } from '../../utils/utility.js';
import { Enemies, player, config } from '../../utils/config.js';
import { circleIntersect } from '../../utils/Collision-system.js';

export default class Freeze extends Weapon {
  constructor() {
    super('Ice Freeze', 0, 5, player.coordinate);
    this.radius = 50;
    this.duration = 3;
    this.interval = 0;
  }

  draw() {
    if (this.interval >= 0 && this.interval <= 3) {
      config.context.fillStyle = 'rgba(116, 194, 225, 0.8)';
      config.context.beginPath();
      config.context.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, 2 * Math.PI, false);
      config.context.fill();
    }
  }

  update() {
    if (this.interval === 0) {
      this.coordinate = closestEnemy(player.coordinate);

      Enemies.forEach((enemy) => {
        if (
          circleIntersect(
            this.coordinate.x,
            this.coordinate.y,
            this.radius,
            enemy.coordinate.x,
            enemy.coordinate.y,
            enemy.radius
          )
        ) {
          enemy.moveSpeed = 0;
        }
      });

      this.interval += config.secondsPassed;
    } else if (this.interval >= 8) {
      this.interval = 0;
    } else if (this.interval > 3) {
      Enemies.forEach((enemy) => (enemy.moveSpeed = 100));
      this.interval += config.secondsPassed;
    } else {
      this.interval += config.secondsPassed;

      Enemies.forEach((enemy) => {
        if (
          circleIntersect(
            this.coordinate.x,
            this.coordinate.y,
            this.radius,
            enemy.coordinate.x,
            enemy.coordinate.y,
            0
          )
        ) {
          enemy.moveSpeed = enemy.moveSpeed / 2;
        }
      });
    }
  }
}
