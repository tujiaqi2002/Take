import { player, secondsPassed } from '../utils/config.js';
import Coordinate from '../utils/Coordinate.js';
import Bullet from './Bullet.js';

let LEFT = false;
let RIGHT = true;
let DOWN = false;
let UP = false;
let totalSecondsPassed = 0;

export default class Weapon {
  #bulletType;
  #bulletNum;
  #attackSpeed;
  #coldDown;
  #bulletSpeed;
  #damage;
  #penetrate;
  #fired;
  #distanceToEnemy;

  #moveSpeed;
  #velocity;
  #moveDirection;

  #fireDirection;
  #bullets;
  #angle;
  #second;

  constructor() {
    //super(100, player.coordinate, 15);
    this.coordinate = player.coordinate;
    this.#fireDirection = new Coordinate(
      player.coordinate.x,
      player.coordinate.y
    );

    this.#bulletType = 0;
    this.#bulletNum = 1;
    this.#attackSpeed = 1;
    this.#bulletSpeed = 20;
    this.damage = 1;
    this.#penetrate = 0;
    this.#coldDown = 1.0;
    this.angle = 0;

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
    if (player.moveUp) {
      LEFT = false;
      RIGHT = false;
      DOWN = false;
      UP = true;
      newCoord.y = -10;
    }
    if ((newCoord.x == 0) & (newCoord.y == 0)) {
      if (LEFT) {
        this.angle = Math.PI;
      }
      if (RIGHT) {
        this.angle = 0;
      }
      if (UP) {
        this.angle = (270 * Math.PI) / 180;
      }
      if (DOWN) {
        this.angle = (90 * Math.PI) / 180;
      }
    } else {
      this.angle = Math.atan2(newCoord.y, newCoord.x);
    }
    totalSecondsPassed += secondsPassed;
    if (totalSecondsPassed >= 1) {
      this.shoot();
      totalSecondsPassed -= 1;
    }
  }

  shoot() {
    var newBullet = new Bullet(
      this.coordinate.x,
      this.coordinate.y,
      this.angle,
      this.bulletSpeed
    );
    this.bullets.push(newBullet);
  }
  bulletDraw() {
    this.bulletMove();
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw();
    });
  }
}
