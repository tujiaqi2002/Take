import { context, player, secondsPassed } from "../utils/config.js";
import Character from "./Character.js";
import Vector from "../utils/Vector.js";
import Coordinate from "../utils/Coordinate.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../utils/config.js";

export default class Bullet {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 20;
    }
  
    draw() {
      context.fillStyle = "blue";
      context.strokeStyle = "#FFFFFF";
      context.beginPath();
      context.arc(
        this.x,
        this.y,
        10,
        0,
        2 * Math.PI,
        false
      );
      context.stroke();
      context.fill();
    }
    
    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }
  }