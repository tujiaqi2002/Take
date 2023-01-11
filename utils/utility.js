import {
  BOARD,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  context,
  player,
  Enemies,
  secondsPassed,
} from "./config.js";
import Coordinate from "./Coordinate.js";

function boardDraw() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, BOARD.width, BOARD.height);
}

function playerUpdate() {
  //draw Player
  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
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

function enemyUpdate() {}

function HPBarUpdate() {
  //draw HP bar boarder
  context.strokeStyle = "#FFFFFF";
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
  Enemies.forEach((enemy) => {
    if (enemy.coordinate == player.coordinate) {
      player.HP = player.HP - enemy.attackDamage;
      if (player.HP < 0) {
        player.HP = 0;
      }
    }
  });

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

  context.fillStyle = "#FFFFFF";
  context.fillRect(
    player.coordinate.x - player.radius,
    player.coordinate.y - player.radius - 20,
    player.HP,
    10
  );
}

function playerMove() {
  Enemies.forEach((enemy) => {
    if (player.moveUp) {
      console.log(player.moveSpeed * secondsPassed);
      enemy.coordinate.y += player.moveSpeed * secondsPassed;
    }
    if (player.moveDown) {
      console.log(player.moveSpeed * secondsPassed);
      enemy.coordinate.y -= player.moveSpeed * secondsPassed;
    }
    if (player.moveLeft) {
      console.log(player.moveSpeed * secondsPassed);
      enemy.coordinate.x += player.moveSpeed * secondsPassed;
    }
    if (player.moveRight) {
      enemy.coordinate.x -= player.moveSpeed * secondsPassed;
    }
  });
}

function randomEnemyCoord() {
  const randomValue = Math.random();
  switch (Math.floor(4 * randomValue)) {
    case 0:
      return new Coordinate(Math.random() * BOARD_WIDTH, 0);
    case 1:
      return new Coordinate(0, Math.random() * BOARD_HEIGHT);
    case 2:
      return new Coordinate(Math.random() * BOARD_WIDTH, BOARD_HEIGHT);
    case 3:
      return new Coordinate(BOARD_WIDTH, Math.random() * BOARD_HEIGHT);
  }
}

export { boardDraw, playerUpdate, enemyUpdate, randomEnemyCoord };
