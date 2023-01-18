import { config } from '../take.js';

export default class Bullet {
  #x;
  #y;
  #angle;
  #speed;
  #distance;
  #radius;

  constructor(x, y, radius, angle, speed) {
    this.#x = x;
    this.#y = y;
    this.#angle = angle;
    this.#speed = speed;
    this.#distance = 0;
    this.#radius = radius;
  }

  get distance(){
    return this.#distance;
  }

  draw() {
    config.context.fillStyle = 'lightgray';
    config.context.strokeStyle = '#FFFFFF';
    config.context.beginPath();
    config.context.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI, false);
    config.context.stroke();
    config.context.fill();
  }

  update() {
    this.#x += this.#speed * Math.cos(this.#angle);
    this.#y += this.#speed * Math.sin(this.#angle);
    this.#distance += this.#speed;
  }
}
