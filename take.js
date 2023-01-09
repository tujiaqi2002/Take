import { Enermy } from './entities/Enermy.js';
import Coordinate from './utils/Coordinate.js';

var board = document.getElementById('game-board');
var boardHeight = 2000;
var boardWidth = 2000;
board.height = boardHeight;
board.width = boardWidth;

var context;

var FPS = 144;

//player setup

var playerRadius = 15;
var playerCoord = new Coordinate(boardWidth / 2 - 1, boardHeight / 2 - 1);
var playerMoveUp = false;
var playerMoveDown = false;
var playerMoveLeft = false;
var playerMoveRight = false;

var HP = 30;

//monster list
var enermys = [];
var enermy_1 = new Enermy();
var enermy_2 = new Enermy();

enermys.push(enermy_1);
enermys.push(enermy_2);

gameStart();

function gameStart() {
  context = board.getContext('2d');

  enermy_1.enermySpawn();
  window.addEventListener('keydown', playerKeydownHandler, false);
  window.addEventListener('keyup', playerKeyupHandler, false);
  setInterval(update, 1000 / FPS);
}

function update() {
  boardDraw();
  playerUpdate();
  enermyUpdate();
  if (HP <= 0) {
    alert('lose ');
  }

  enermys.forEach((enermy) => {
    enermy.enermyMove();
  });
}

function playerKeydownHandler(e) {
  switch (e.key) {
    case 'w':
    case 'ArrowUp': {
      playerMoveUp = true;
      break;
    }
    case 's':
    case 'ArrowDown': {
      playerMoveDown = true;

      break;
    }
    case 'a':
    case 'ArrowLeft': {
      playerMoveLeft = true;
      break;
    }
    case 'd':
    case 'ArrowRight': {
      playerMoveRight = true;
      break;
    }
    default:
      return;
  }
}

function playerKeyupHandler(e) {
  switch (e.key) {
    case 'w':
    case 'ArrowUp': {
      playerMoveUp = false;
      break;
    }
    case 's':
    case 'ArrowDown': {
      playerMoveDown = false;

      break;
    }
    case 'a':
    case 'ArrowLeft': {
      playerMoveLeft = false;
      break;
    }
    case 'd':
    case 'ArrowRight': {
      playerMoveRight = false;
      break;
    }
    default:
      return;
  }
}

function playerMove() {
  enermyUpdate();
}

function playerUpdate() {
  //draw Player
  context.fillStyle = '#FFFFFF';
  context.strokeStyle = '#FFFFFF';
  context.beginPath();
  context.arc(
    playerCoord.x,
    playerCoord.y,
    playerRadius,
    0,
    2 * Math.PI,
    false
  );
  context.stroke();
  context.fill();

  HPBarUpdate();
  playerMove();
}

function HPBarUpdate() {
  //draw HP bar boarder
  context.strokeStyle = '#FFFFFF';
  context.beginPath();
  context.moveTo(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 10
  );

  context.lineTo(
    playerCoord.x + playerRadius,
    playerCoord.y - playerRadius - 10
  );

  context.lineTo(
    playerCoord.x + playerRadius,
    playerCoord.y - playerRadius - 20
  );

  context.lineTo(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20
  );
  context.closePath();
  context.stroke();

  //update HP
  // enermys.forEach((enermy) => {
  //   if (enermy.coordinate == playerCoord) {
  //     HP -= enermy.attackDamage / FPS;
  //     if (HP < 0) {
  //       HP = 0;
  //     }
  //   }
  // });

  //draw HP bar
  context.lineTo(
    playerCoord.x + playerRadius,
    playerCoord.y - playerRadius - 10
  );

  context.lineTo(
    playerCoord.x + playerRadius,
    playerCoord.y - playerRadius - 20
  );

  context.lineTo(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20
  );

  context.fillStyle = '#FFFFFF';
  context.fillRect(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20,
    HP,
    10
  );
}

function boardDraw() {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, board.width, board.height);
}

function enermyUpdate() {
  enermys.forEach((enermy) => {
    if (playerMoveUp) {
      enermy.coordinate.y += 10;
    }
    if (playerMoveDown) {
      enermy.coordinate.y -= 10;
    }
    if (playerMoveLeft) {
      enermy.coordinate.x += 10;
    }
    if (playerMoveRight) {
      enermy.coordinate.x -= 10;
    }
  });
}

export { boardHeight, boardWidth, playerCoord, playerRadius, FPS };
