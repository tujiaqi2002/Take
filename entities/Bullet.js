import { context } from "../utils/config.js";

export default class Bullet {
  #x;
  #y;
  #angle;
  #speed;
  #distance;
  
  constructor(x, y, angle, speed) {
    this.#x = x;
    this.#y = y;
    this.#angle = angle;
    this.#speed = speed;
    this.#distance = 0;
  }

  get distance(){
    return this.#distance;
  }

  draw() {
    context.fillStyle = "lightgray";
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.arc(this.#x, this.#y, 10, 0, 2 * Math.PI, false);
    context.stroke();
    context.fill();
  }

  update() {
    this.#x += this.#speed * Math.cos(this.#angle);
    this.#y += this.#speed * Math.sin(this.#angle);
    this.#distance += this.#speed;
  }
}
