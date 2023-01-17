import { context, Enemies, player, secondsPassed } from "../utils/config.js";
import { circleIntersect } from "../utils/Collision-system.js";
import Weapon from './Weapon.js';

export default class AOE extends Weapon {
  constructor() {
    super(10, 1, player.coordinate);
  }

  draw() {
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.arc(
      this.#coordinate.x,
      this.#coordinate.y,
      this.#radius,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
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
        enemy.HP -= this.#damage * secondsPassed;
      }
    });
  }
}
