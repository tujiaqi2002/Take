import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";

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

let Enemies = [];
const enemy_1 = new Enemy();
const enemy_2 = new Enemy();
Enemies.push(enemy_1);
Enemies.push(enemy_2);

export { BOARD, BOARD_HEIGHT, BOARD_WIDTH, context, FPS, secondsPassed, player, Enemies };