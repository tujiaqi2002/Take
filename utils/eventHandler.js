import { player } from '../utils/config.js';

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

export { playerKeydownHandler, playerKeyupHandler };
