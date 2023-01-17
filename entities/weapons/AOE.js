import { config } from '../../take.js';
import { circleIntersect } from '../../utils/Collision-system.js';
import { Enemies, player } from '../../utils/config.js';

export default class AOE {
  #coordinate;
  #damage;
  #radius;

  constructor() {
    this.#coordinate = player.coordinate;
    this.#damage = 1000;
    this.#radius = 200;
  }

  get radius() {
    return this.#radius;
  }

  draw() {
    config.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    config.context.strokeStyle = '#FFFFFF';
    config.context.beginPath();
    config.context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#radius,
      0,
      2 * Math.PI,
      false
    );
    config.context.fill();
  }

  update() {
    this.#coordinate = player.coordinate;
    Enemies.forEach((enemy, index) => {
      if (
        //if enemy is inside the area
        circleIntersect(
          this.#coordinate.x,
          this.#coordinate.y,
          this.#radius,
          enemy.coordinate.x,
          enemy.coordinate.y,
          enemy.radius
        )
      ) {
        enemy.HP -= this.#damage * config.secondsPassed;
      }
    });
  }
}
