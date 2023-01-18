import { player } from '../utils/config.js';
import Coordinate from '../utils/Coordinate.js';
import Bullet from './Bullet.js';
import Weapon from './Weapon.js';

let LEFT = false;
let RIGHT = true;
let DOWN = false;
let UP = false;
// let UP_RIGHT = false;
// let UP_LEFT = false;
// let DOWN_RIGHT = false;
// let DOWN_LEFT = false;

let totalSecondsPassed = 0;

export default class Ezq extends Weapon {
  #bulletType;
  #bulletNum;
  #attackSpeed;
  #bulletSpeed;

  #fireDirection;
  #angle;
  #boundTime;
  #intervalTime;
  #radius;

  constructor() {
    super('Fire Ball', 10, 1, player.coordinate);
    this.#fireDirection = new Coordinate(player.coordinate.x, player.coordinate.y);
    this.#radius = 7;

    this.#bulletType = 0;
    this.#bulletNum = 5;
    this.#attackSpeed = 1;
    this.#bulletSpeed = 10;
    this.#angle = 0;
    this.#boundTime = 0; //0.7 * this.#attackSpeed * this.cooldown;
    this.#intervalTime = 0.1;

    this.bullets = [];
  }

  bulletMove() {
    let pushed = false;
    let newCoord = new Coordinate(0, 0);

    if (player.moveDown) {
      LEFT = false;
      RIGHT = false;
      DOWN = true;
      UP = false;
      newCoord.y = 10;
    }
    if (player.moveUp) {
      LEFT = false;
      RIGHT = false;
      DOWN = false;
      UP = true;
      newCoord.y = -10;
    }
    if (player.moveLeft) {
      LEFT = true;
      RIGHT = false;
      DOWN = false;
      UP = false;
      newCoord.x = -10;
    }
    if (player.moveRight) {
      LEFT = false;
      RIGHT = true;
      DOWN = false;
      UP = false;
      newCoord.x = 10;
    }

    if ((newCoord.x == 0) & (newCoord.y == 0)) {
    } else {
      this.#angle = Math.atan2(newCoord.y, newCoord.x);
    }
    if ((this.#intervalTime * this.#bulletNum) / this.cooldown > this.#attackSpeed) {
      this.#intervalTime = (this.#attackSpeed * this.cooldown) / this.#bulletNum;
    }
    //let shootingTime = this.#attackSpeed * this.cooldown / this.#bulletNum * 0.3;
    if (totalSecondsPassed >= 0) {
      totalSecondsPassed += secondsPassed;
      if (totalSecondsPassed >= this.#attackSpeed * this.cooldown) {
        totalSecondsPassed = 0;
        this.#boundTime = 0;
      }

      for (let i = 1; i <= this.#bulletNum; i++) {
        //console.log(this.#boundTime);
        if (this.#boundTime >= this.#intervalTime * this.#bulletNum) {
        } else if (totalSecondsPassed >= this.#boundTime) {
          this.shoot();
          this.#boundTime += this.#intervalTime;
        }
      }
    }
  }

  shoot() {
    let offset = 20;
    let randomX = Math.floor(((Math.random() - 0.5) * 100) / 2);
    let randomY = Math.floor(((Math.random() - 0.5) * 100) / 2);
    let randomSpeedIndex = Math.random() * 0.1 + 0.95;
    if (LEFT) {
      randomX = Math.abs(randomX) - offset;
    }
    if (RIGHT) {
      randomX = Math.abs(randomX) * -1 + offset;
    }
    if (UP) {
      randomY = Math.abs(randomY) - offset;
    }
    if (DOWN) {
      randomY = Math.abs(randomY) * -1 + offset;
    }

    var newBullet = new Bullet(
      this.coordinate.x + randomX,
      this.coordinate.y + randomY,
      this.#radius,
      this.#angle,
      this.#bulletSpeed * randomSpeedIndex
    );
    //console.log(this.#bulletSpeed);
    this.bullets.push(newBullet);
  }

  update() {
    this.bulletMove();
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (bullet.distance > 1500) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
    });
  }

  draw() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }
}
