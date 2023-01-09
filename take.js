import Enermy from './entities/Enermy.js';
import Player from './entities/Player.js';
import Coordinate from './utils/Coordinate.js';

var board = document.getElementById('game-board');
var boardHeight = 2000;
var boardWidth = 2000;
board.height = boardHeight;
board.width = boardWidth;

var context;

var FPS = 144;

//player setup
const player = new Player();

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
  if (player.HP <= 0) {
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
      player.moveUp = true;
      break;
    }
    case 's':
    case 'ArrowDown': {
      player.moveDown = true;

      break;
    }
    case 'a':
    case 'ArrowLeft': {
      player.moveLeft = true;
      break;
    }
    case 'd':
    case 'ArrowRight': {
      player.moveRight = true;
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
      player.moveUp = false;
      break;
    }
    case 's':
    case 'ArrowDown': {
      player.moveDown = false;

      break;
    }
    case 'a':
    case 'ArrowLeft': {
      player.moveLeft = false;
      break;
    }
    case 'd':
    case 'ArrowRight': {
      player.moveRight = false;
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
    player.coordinate.x,
    player.coordinate.y,
    player.radius,
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
    player.coordinate.x - player.radius,
    player.coordinate.y - player.radius - 10
  );

  context.lineTo(
    player.coordinate.x + player.radius,
    player.coordinate.y - player.radius - 10
  );

  context.lineTo(
    player.coordinate.x + player.radius,
    player.coordinate.y - player.radius - 20
  );

  context.lineTo(
    player.coordinate.x - player.radius,
    player.coordinate.y - player.radius - 20
  );
  context.closePath();
  context.stroke();

  //update HP
  // enermys.forEach((enermy) => {
  //   if (enermy.coordinate == player.coordinate) {
  //     HP -= enermy.attackDamage / FPS;
  //     if (HP < 0) {
  //       HP = 0;
  //     }
  //   }
  // });

  //draw HP bar
  context.lineTo(
    player.coordinate.x + player.radius,
    player.coordinate.y - player.radius - 10
  );

  context.lineTo(
    player.coordinate.x + player.radius,
    player.coordinate.y - player.radius - 20
  );

  context.lineTo(
    player.coordinate.x - player.radius,
    player.coordinate.y - player.radius - 20
  );

  context.fillStyle = '#FFFFFF';
  context.fillRect(
    player.coordinate.x - player.radius,
    player.coordinate.y - player.radius - 20,
    player.HP,
    10
  );
}

function boardDraw() {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, board.width, board.height);
}

function enermyUpdate() {
  enermys.forEach((enermy) => {
    if (player.moveUp) {
      enermy.coordinate.y += 10;
    }
    if (player.moveDown) {
      enermy.coordinate.y -= 10;
    }
    if (player.moveLeft) {
      enermy.coordinate.x += 10;
    }
    if (player.moveRight) {
      enermy.coordinate.x -= 10;
    }
  });
}

export { boardHeight, boardWidth, FPS, player };
