import Player from '../entities/Player.js';

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

    // Phases
    this.rewardPhaseDone = false;
    this.inRewardPhase = false;

    this.inGamePhase = false;

    this.inHomePagePhase = true;
    this.homePagePhaseDone = false;

    //timeStamp used to calculate FPS
    this.oldTimeStamp = 0;
  }

  configReset() {
    this.inGamePhase = false;
    this.inRewardPhase = false;
    this.rewardPhaseDone = false;
    this.inHomePagePhase = false;
    this.homePagePhaseDone = false;
    player.levelUp = false;
    player.moveUp = false;
    player.moveDown = false;
    player.moveLeft = false;
    player.moveRight = false;
  }
}

// Entity Initialization
const player = new Player();

let EXPGems = [];
let allCharacters = [];
let Enemies = [];

allCharacters.push(player);

export { BOARD_HEIGHT, BOARD_WIDTH, player, Enemies, allCharacters, EXPGems };
