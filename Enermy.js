import Coordinate from "./Coordinate.js";
import { boardHeight, boardWidth } from "./take.js";

var value;
class Enermy {
  #coordinate;

  constructor() {
    this.#coordinate = randomEnermyCoord();
    console.log(this.#coordinate);
  }

  get coordinate() {
    return this.#coordinate;
  }
}

function randomEnermyCoord() {
  const randomValue = Math.random();
  switch (Math.floor(4 * randomValue)) {
    case 0:
      return new Coordinate(Math.random() * boardWidth, 0);
    case 1:
      return new Coordinate(0, Math.random() * boardHeight);
    case 2:
      return new Coordinate(Math.random() * boardWidth, boardHeight);
    case 3:
      return new Coordinate(boardWidth, Math.random() * boardHeight);
  }
}

export default Enermy;
