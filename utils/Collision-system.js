import { allCharacters, BOARD_HEIGHT, BOARD_WIDTH, player } from "./config.js";

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

        let vCollision = {
          x: obj2.coordinate.x - obj1.coordinate.x,
          y: obj2.coordinate.y - obj1.coordinate.y,
        };
        let distance = Math.sqrt(
          (obj2.coordinate.x - obj1.coordinate.x) *
            (obj2.coordinate.x - obj1.coordinate.x) +
            (obj2.coordinate.y - obj1.coordinate.y) *
              (obj2.coordinate.y - obj1.coordinate.y)
        );
        let vCollisionNorm = {
          x: vCollision.x / 15,
          y: vCollision.y / 15,
        };
        let vRelativeVelocity = {
          x: obj1.velocity.deltaX - obj2.velocity.deltaX,
          y: obj1.velocity.deltaY - obj2.velocity.deltaY,
        };
        let speed =
          vRelativeVelocity.x * vCollisionNorm.x +
          vRelativeVelocity.y * vCollisionNorm.y;
        // Apply restitution to the speed

        speed *= Math.min(obj1.restitution, obj2.restitution);
        if (speed < 0) {
          break;
        }
        console.log(player.velocity);

        let impulse = (200 * speed) / (obj1.mass + obj2.mass);
        console.log(obj1.velocity.deltaX);
        obj1.velocity.deltaX -= impulse * obj2.mass * vCollisionNorm.x;
        obj1.velocity.deltaY -= impulse * obj2.mass * vCollisionNorm.y;
        obj2.velocity.deltaX += impulse * obj1.mass * vCollisionNorm.x;
        obj2.velocity.deltaY += impulse * obj1.mass * vCollisionNorm.y;

        console.log(obj1.velocity.deltaX);
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

export { detectCollisions, circleIntersect,  };
