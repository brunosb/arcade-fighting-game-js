import { Fighter } from "../Fighter";

interface RectangularCollisionProps {
  rectangle1: Fighter;
  rectangle2: Fighter;
}

function rectangularCollision({
  rectangle1,
  rectangle2,
}: RectangularCollisionProps): boolean {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

export { rectangularCollision };
