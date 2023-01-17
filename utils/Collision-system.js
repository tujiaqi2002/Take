import { allCharacters, player } from "./config.js";
import Coordinate from "./Coordinate.js";
import Vector from "./Vector.js";

function detectCollisions() {
  let obj1;
  let obj2;

  // Reset collision state of all objects
  for (let i = 0; i < allCharacters.length; i++) {
    allCharacters[i].isColliding = false;
  }

  // Start checking for collisions
  for (let i = 0; i < allCharacters.length; i++) {
    obj1 = allCharacters[i];
    for (let j = i + 1; j < allCharacters.length; j++) {
      obj2 = allCharacters[j];

      // Compare object1 with object2
      if (
        circleIntersect(
          obj1.coordinate.x,
          obj1.coordinate.y,
          obj1.radius,
          obj2.coordinate.x,
          obj2.coordinate.y,
          obj2.radius
        )
      ) {
        obj1.isColliding = true;
        obj2.isColliding = true;

        //calculate overlap
        let vectorOfObjs = new Vector(obj1.coordinate, obj2.coordinate);
        let distanceOfObjs = vectorOfObjs.magnitude;
        let overlap = obj1.radius + obj2.radius - distanceOfObjs;
        if (obj1 == player) {
          obj2.coordinate.x += overlap * vectorOfObjs.getUnitVector().deltaX;
          obj2.coordinate.y += overlap * vectorOfObjs.getUnitVector().deltaY;
        } else if ((obj2 = player)) {
          obj1.coordinate.x -= overlap * vectorOfObjs.getUnitVector().deltaX;
          obj1.coordinate.y -= overlap * vectorOfObjs.getUnitVector().deltaY;
        } else {
          obj1.coordinate.x -=
            (overlap * vectorOfObjs.getUnitVector().deltaX) / 2;
          obj1.coordinate.y -=
            (overlap * vectorOfObjs.getUnitVector().deltaY) / 2;
          obj2.coordinate.x +=
            (overlap * vectorOfObjs.getUnitVector().deltaX) / 2;
          obj2.coordinate.y +=
            (overlap * vectorOfObjs.getUnitVector().deltaY) / 2;
        }
        let vCollision = new Vector(obj1.coordinate, obj2.coordinate);

        let vCollisionNorm = vCollision.getUnitVector();

        let vRelativeVelocity = new Vector(
          new Coordinate(obj2.velocity.deltaX, obj2.velocity.deltaY),
          new Coordinate(obj1.velocity.deltaX, obj1.velocity.deltaY)
        );

        let speed =
          vRelativeVelocity.deltaX * vCollisionNorm.deltaX +
          vRelativeVelocity.deltaY * vCollisionNorm.deltaY;
        // Apply restitution to the speed

        speed *= Math.min(obj1.restitution, obj2.restitution);
        if (speed < 0) {
          break;
        }

        let impulse = (2 * speed) / (obj1.mass + obj2.mass);
        obj1.velocity.x -= impulse * obj2.mass * vCollisionNorm.x;
        obj1.velocity.y -= impulse * obj2.mass * vCollisionNorm.y;
        obj2.velocity.x += impulse * obj1.mass * vCollisionNorm.x;
        obj2.velocity.y += impulse * obj1.mass * vCollisionNorm.y;
      }
    }
  }
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
  // Calculate the distance between the two circles
  let circleDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return circleDistance <= (r1 + r2) * (r1 + r2);
}

// function detectEdgeCollisions() {
//   let obj;
//   for (let i = 0; i < allCharacters.length; i++) {
//     obj = allCharacters[i];

//     // Check for left and right
//     if (obj.x < obj.radius) {
//       obj.vx = Math.abs(obj.vx) * restitution;
//       obj.coordinate.x = obj.radius;
//     } else if (obj.x > BOARD_WIDTH - obj.radius) {
//       obj.vx = -Math.abs(obj.vx) * restitution;
//       obj.coordinate.x = BOARD_WIDTH - obj.radius;
//     }

//     // Check for bottom and top
//     if (obj.y < obj.radius) {
//       obj.vy = Math.abs(obj.vy) * restitution;
//       obj.coordinate.y = obj.radius;
//     } else if (obj.y > BOARD_HEIGHT - obj.radius) {
//       obj.vy = -Math.abs(obj.vy) * restitution;
//       obj.coordinate.y = BOARD_HEIGHT - obj.radius;
//     }
//   }
// }

export { detectCollisions, circleIntersect };
