import Coordinate from "./Coordinate.js";

var board = document.getElementById("game-board");
var context;

var boardHeight = 1000;
var boardWidth = 1000;
var playerRadius = 15;
var playerCoord;

var HP = 30;
var enermyAttack = 0;

console.log(board);

gameStart();

function gameStart() {
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d");

  //draw game board
  context.fillStyle = "#000000";
  context.fillRect(0, 0, board.width, board.height);

  //draw Player
  playerCoord = new Coordinate(boardWidth / 2 - 1, boardHeight / 2 - 1);
  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
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

  //draw HP bar
  context.strokeStyle = "#FFFFFF";
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
  setInterval(update, 1000);
}

function refreshGame() {
  //draw game board
  context.fillStyle = "#000000";
  context.fillRect(0, 0, board.width, board.height);

  //draw Player
  playerCoord = new Coordinate(boardWidth / 2 - 1, boardHeight / 2 - 1);
  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
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

  //draw HP bar
  context.strokeStyle = "#FFFFFF";
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
}

function update() {
  refreshGame();
  //   window.addEventListener("keydup", playerMove);
  context = board.getContext("2d");
  context.fillStyle = "#FFFFFF";
  console.log(playerCoord.x - playerRadius);

  context.fillRect(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20,
    HP,
    10
  );
  console.log(HP);
  HP = HP - enermyAttack;
  if (HP <= 0) {
    alert("lose ");
  }
  window.addEventListener("keyup", playerMove);
}

function playerMove(e) {
  console.log(e.key);
}
