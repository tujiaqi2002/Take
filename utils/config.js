import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import AOE from '../entities/AOE.js';

const BOARD_HEIGHT = 2000;
const BOARD_WIDTH = 2000;

export default class Config {
  constructor() {
    // Canva (Board) Configuration
    this.BOARD = document.getElementById('game-board');
    this.BOARD.height = BOARD_HEIGHT;
    this.BOARD.width = BOARD_WIDTH;

    // Board Context
    this.context = this.BOARD.getContext('2d');

    // FPS
    this.FPS = 0;
    this.secondsPassed = 0;
  }
}

// Entity Initialization
const player = new Player();
player.addWeapon(new AOE());

let EXPGems = [];
let allCharacters = [];
let Enemies = [];
const enemy_1 = new Enemy();
const enemy_2 = new Enemy();
const enemy_3 = new Enemy();
const enemy_4 = new Enemy();
const enemy_5 = new Enemy();
const enemy_6 = new Enemy();
const enemy_7 = new Enemy();
const enemy_8 = new Enemy();
const enemy_9 = new Enemy();
const enemy_10 = new Enemy();

enemy_3.radius = 30;
enemy_3.moveSpeed = 200;
Enemies.push(enemy_1);
Enemies.push(enemy_2);
Enemies.push(enemy_3);
Enemies.push(enemy_4);
Enemies.push(enemy_5);
Enemies.push(enemy_6);
Enemies.push(enemy_7);
Enemies.push(enemy_8);
Enemies.push(enemy_9);
Enemies.push(enemy_10);

allCharacters.push(player);
Enemies.forEach((enemy) => {
  allCharacters.push(enemy);
});

export function setEnemies(newEnemies) {
  Enemies = newEnemies;
}

export { BOARD_HEIGHT, BOARD_WIDTH, player, Enemies, allCharacters, EXPGems };
