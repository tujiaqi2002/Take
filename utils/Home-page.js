import { config } from '../take.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from './config.js';

let buttonArray;
let indexOfButtonSelected = 0;
let numberOfButton;
function indexOfButtonSelectedModify(_indexOfButtonSelected) {
  indexOfButtonSelected = _indexOfButtonSelected;
}
function homePageUpdate() {
  buttonArray = ['Start', 'Setting', 'Power Up'];
  numberOfButton = buttonArray.length;

  if (config.homePagePhaseDone) {
    //reset all the detectors so the game can switch back to game phase
    config.configReset();
    config.homePagePhaseDone = false;

    switch (indexOfButtonSelected) {
      case 0:
        config.inGamePhase = true;
      case 1:
        
      case 2:
    }
  }
}

function homePageDraw() {
  //draw the homepage image
  let homePageImage = new Image();
  homePageImage.src = '../assets/home-page.png';
  config.context.drawImage(homePageImage, 0, 0, 2000, 2000);

  let buttonGap = 125;

  //draw the button
  buttonArray.forEach((button, index) => {
    config.context.fillStyle = indexOfButtonSelected == index ? 'red' : 'White';
    config.context.strokeStyle = 'black';
    config.context.lineWidth = 2;
    config.context.font = 'bolder 60px Courier';
    config.context.fillText(
      buttonArray[index],
      (BOARD_WIDTH - button.length * 32) / 2,
      (BOARD_HEIGHT - 160) / 2 + 300 + index * buttonGap
    );
  });

  //drawt the title
  config.context.fillStyle = 'White';
  config.context.font = 'bolder 200px Courier';
  config.context.fillText('Element', BOARD_WIDTH / 2 - 350, BOARD_HEIGHT / 2 - 300);
  config.context.strokeText('Element', BOARD_WIDTH / 2 - 350, BOARD_HEIGHT / 2 - 300);
}
export {
  homePageUpdate,
  homePageDraw,
  indexOfButtonSelected,
  indexOfButtonSelectedModify,
  numberOfButton,
};
