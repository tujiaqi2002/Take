import { config } from '../take.js';
import { circleIntersect } from '../utils/Collision-system.js';
import { Enemies } from '../utils/config.js';

export default class Bullet {
  #coordinate;
  #angle;
  #speed;
  #distance;
  #radius;
  #penetration;
  #damage;

  constructor(coordinate, radius, angle, speed, damage) {
    this.#coordinate = coordinate;
    this.#angle = angle;
    this.#speed = speed;
    this.#distance = 0;
    this.#radius = radius;
    this.#penetration = 1;
    this.#damage = damage;
  }

  get distance() {
    return this.#distance;
  }

  draw() {
    if (this.#penetration !== 0) {
      config.context.fillStyle = 'lightgray';
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
      config.context.stroke();
      config.context.fill();
    }
  }

  update() {
    if (this.#penetration !== 0) {
      this.#coordinate.x += this.#speed * Math.cos(this.#angle);
      this.#coordinate.y += this.#speed * Math.sin(this.#angle);
      this.#distance += this.#speed;

      Enemies.forEach((enemy) => {
        if (
          circleIntersect(
            this.#coordinate.x,
            this.#coordinate.y,
            this.#radius,
            enemy.coordinate.x,
            enemy.coordinate.y,
            enemy.radius
          )
        ) {
          enemy.HP -= this.#damage;
          this.#penetration = this.#penetration - 1;
        }
      });
    }
  }
}
