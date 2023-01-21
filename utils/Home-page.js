import { BOARD_HEIGHT, BOARD_WIDTH, config } from './config.js';

let buttonArray;
let indexOfButtonSelected = 0;
let numberOfButton;
function indexOfButtonSelectedModify(_indexOfButtonSelected) {
  indexOfButtonSelected = _indexOfButtonSelected;
}

let particlesArray = [];
const numberOfParticles = 2500;
const detail = 1;
let pixels;
let grid = [];

let homePageImage = new Image();
homePageImage.src = '../assets/home-page.png';

homePageImage.addEventListener('load', () => {
  config.context.drawImage(homePageImage, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  pixels = config.context.getImageData(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  console.log(pixels);

  for (let y = 0; y < BOARD_HEIGHT; y += detail) {
    let row = [];
    for (let x = 0; x < BOARD_WIDTH; x += detail) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
      const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
      const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

      const brightness = calculateBrightness(red, green, blue) / 100;
      const cell = [color, brightness];
      row.push(cell);
    }
    grid.push(row);
  }
  init();
});

class Particle {
  constructor() {
    this.x = Math.random() * BOARD_WIDTH;
    this.y = Math.random() * BOARD_HEIGHT;
    //this.prevX = this.x;
    this.speed = 0;
    this.velocity = Math.random() * 1 ;
    this.size = -Math.random() * 7 + 10;
    this.position1 = Math.floor(this.y / detail);
    this.position2 = Math.floor(this.x / detail);
    this.angle = 0;
  }
  update() {
    this.position1 = Math.floor(this.y / detail);
    this.position2 = Math.floor(this.x / detail);
    if (grid[this.position1]) {
      if (grid[this.position1][this.position2]) {
        this.speed = grid[this.position1][this.position2][1];
      }
    }
    this.angle += this.speed / 20;
    let movement = 2.5 - this.speed + this.velocity;
    this.y -=
      Math.random > 0.5 ? movement + Math.cos(this.angle) : -movement + Math.cos(this.angle);
    this.x += Math.random > 0.5 ? Math.cos(this.angle) : -Math.cos(this.angle);
    if (this.y <= 0) {
      this.y = BOARD_HEIGHT;
      this.x = Math.random() * BOARD_WIDTH;
    } else if (this.y >= BOARD_HEIGHT) {
      this.y = 0;
      this.x = Math.random() * BOARD_WIDTH;
    } else if (this.x <= 0) {
      this.x = BOARD_WIDTH;
      this.y = Math.random() * BOARD_HEIGHT;
    } else if (this.x >= BOARD_WIDTH) {
      this.x = 0;
      this.y = Math.random() * BOARD_HEIGHT;
    }
    //console.log(this.x += movement)
  }
  draw() {
    config.context.beginPath();
    config.context.fillStyle = 'black';
    if (this.y > BOARD_HEIGHT - this.size * 6) config.context.globalAlpha = 0;
    if (grid[this.position1]) {
      if (grid[this.position1][this.position2]) {
        config.context.fillStyle = grid[this.position1][this.position2][0];
      }
    } else {
      config.context.fillStyle = 'white';
    }
    config.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    config.context.fill();
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function calculateBrightness(red, green, blue) {
  return Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114);
}

function homePageUpdate() {
  config.context.drawImage(homePageImage, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  buttonArray = ['Start', 'Setting', 'Power Up'];
  numberOfButton = buttonArray.length;
  config.context.globalAlpha = 0.001;
  config.context.fillStyle = 'rgb(0, 0, 0)';
  config.context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  config.context.globalAlpha = 0.3;
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
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
  for (let i = 0; i < particlesArray.length; i++) {
    config.context.globalAlpha = 1;
    particlesArray[i].draw();
  }
  console.log(1);
  let buttonGap = 125;

  config.context.globalAlpha = 0.5;
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
