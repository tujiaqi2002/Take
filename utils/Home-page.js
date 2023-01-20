import { config } from '../take.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from './config.js';

function homePageUpdate() {}

function homePageDraw() {
  let homePageImage = new Image();
  homePageImage.src = '../assets/home-page.png';
  config.context.drawImage(homePageImage, 0, 0, 2000, 2000);

  //   let buttonImage = new Image();
  //   buttonImage.src = '../assets/button.png';
  //   config.context.drawImage(
  //     buttonImage,
  //     (BOARD_WIDTH - 32 * 10) / 2,
  //     (BOARD_HEIGHT - 16 * 10) / 2 + 300,
  //     32 * 10,
  //     16 * 10
  //   );
  let buttonGap = 130;

  config.context.fillStyle = 'White';
  config.context.strokeStyle = 'black';
  config.context.lineWidth = 1.5;
  config.context.font = 'bolder 60px Courier';
  config.context.fillText(
    'Start',
    (BOARD_WIDTH - (32 * 10) / 1.9) / 2,
    (BOARD_HEIGHT - 16 * 10) / 2 + 300
  );

  config.context.fillText(
    'Setting',
    (BOARD_WIDTH - (32 * 10) / 1.6) / 2,
    (BOARD_HEIGHT - 16 * 10) / 2 + 300 + buttonGap
  );

  config.context.fillText(
    'Power Up',
    (BOARD_WIDTH - (32 * 10) / 1.2) / 2,
    (BOARD_HEIGHT - 16 * 10) / 2 + 300 + 2 * buttonGap
  );

  config.context.font = 'bolder 200px Courier';
  config.context.fillText('Element', BOARD_WIDTH / 2 - 350, BOARD_HEIGHT / 2 - 300);
  config.context.strokeText('Element', BOARD_WIDTH / 2 - 350, BOARD_HEIGHT / 2 - 300);

  //   let buttonBorderImage = new Image();
  //   buttonBorderImage.src = '../assets/button-border.png';
  //   config.context.drawImage(buttonBorderImage, (BOARD_WIDTH -32*10)/ 2, (BOARD_HEIGHT-16*10) / 2, 32*10, 16*10);
}
export { homePageUpdate, homePageDraw };
