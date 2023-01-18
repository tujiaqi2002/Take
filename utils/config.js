import Player from '../entities/Player.js';
import AOE from '../entities/AOE.js';
import Ezq from '../entities/EZq.js';

const BOARD_HEIGHT = 2000;
const BOARD_WIDTH = 2000;

export default class Config {
  constructor() {
    // Canva (Board) Configuration
    this.BOARD = document.getElementById("game-board");
    this.BOARD.height = BOARD_HEIGHT;
    this.BOARD.width = BOARD_WIDTH;

    // Board Context
    this.context = this.BOARD.getContext("2d");

    // FPS
    this.FPS = 0;
    this.secondsPassed = 0;

    // Phases
    this.rewardPhaseDone = false;
    this.inRewardPhase = true;
    this.inGamePhase = false;
    this.oldTimeStamp = 0;
  }
}

// Entity Initialization
const player = new Player();

let EXPGems = [];
let allCharacters = [];
let Enemies = [];

allCharacters.push(player);
Enemies.forEach((enemy) => {
  allCharacters.push(enemy);
});

export { BOARD_HEIGHT, BOARD_WIDTH, player, Enemies, allCharacters, EXPGems };
