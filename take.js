import Coordinate from "./Coordinate.js";
import Enermy from "./Enermy.js";

var board = document.getElementById("game-board");
var context;

var boardHeight = 1000;
var boardWidth = 1000;
var playerRadius = 15;
var playerCoord;

var enermyRadius = 10;

var HP = 30;

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

function update() {
  enermySpawn();
  //   window.addEventListener("keydup", playerMove);

  console.log(HP);
  HPBarUpdate();
  if (HP <= 0) {
    alert("lose ");
  }

  window.addEventListener("keyup", playerMove);
}

function playerMove(e) {
  console.log(e.key);
}

function enermySpawn() {
  const enermy = new Enermy();
  console.log(enermy.coordinate.x);
  enermyDraw(enermy);
}

function enermyDraw(enermy) {
  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
  context.beginPath();
  context.arc(
    enermy.coordinate.x,
    enermy.coordinate.y,
    enermyRadius,
    0,
    2 * Math.PI,
    false
  );
  context.stroke();
  context.fill();
}

function enermyAttact(enermy) {
  if (enermy.coordinate.x - playerCoord.x) {
  }
}

function HPBarUpdate() {
  //clear the previous frame
  context.fillStyle = "#000000";
  context.fillRect(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20,
    HP,
    10
  );

  context.fillStyle = "#FFFFFF";
  context.fillRect(
    playerCoord.x - playerRadius,
    playerCoord.y - playerRadius - 20,
    HP,
    10
  );
}

export { boardHeight, boardWidth };
