import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';

// Canva (Board) Configuration
const BOARD = document.getElementById('game-board');
const BOARD_HEIGHT = 2000;
const BOARD_WIDTH = 2000;
BOARD.height = BOARD_HEIGHT;
BOARD.width = BOARD_WIDTH;

// Game frame per second
const FPS = 144;

// Board Context
const context = BOARD.getContext('2d');

// Entity Initialization
const player = new Player();

let Enemies = [];
const enemy_1 = new Enemy();
const enemy_2 = new Enemy();
Enemies.push(enemy_1);
Enemies.push(enemy_2);

export { BOARD, BOARD_HEIGHT, BOARD_WIDTH, FPS, context, player, Enemies };
