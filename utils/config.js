import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import Weapon from "../entities/Weapon.js";
import AOE from "../entities/AOE.js";

// Canva (Board) Configuration
const BOARD = document.getElementById("game-board");
const BOARD_HEIGHT = 2000;
const BOARD_WIDTH = 2000;
BOARD.height = BOARD_HEIGHT;
BOARD.width = BOARD_WIDTH;

// Board Context
const context = BOARD.getContext("2d");

// FPS
let FPS = 0;
export function modifyFPS(_FPS) {
  FPS = _FPS;
}

let secondsPassed = 0;
export function modifySecondsPassed(_secondsPassed) {
  secondsPassed = _secondsPassed;
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

let Bullets = [];
const bullet_1 = new Weapon();
Bullets.push(bullet_1);

export function setEnemies(newEnemies) {
  Enemies = newEnemies;
}
export {
  BOARD,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  context,
  FPS,
  secondsPassed,
  player,
  Enemies,
  Bullets,
  allCharacters,
  EXPGems,
};
