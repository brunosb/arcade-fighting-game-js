import { gravity } from "./main";
import { SpriteProps, Position, Sprite } from "./Sprite";

type Velocity = Position;

interface FighterProps extends SpriteProps {
  velocity: Velocity;
  offset: Position;
  color?: string;
}

type AttackBox = {
  position: Position;
  width: number;
  height: number;
  offset: Position;
};

class Fighter extends Sprite {
  public velocity: Velocity;
  public lastKey: string | null;
  public attackBox: AttackBox;
  public color: string;
  public isAttacking: boolean;
  public health: number;

  constructor({
    canvas,
    ctx,
    position,
    velocity,
    color = "#ff0000",
    offset = { x: 0, y: 0 },
    imageSrc,
    scale = 1,
    framesMax = 1,
  }: FighterProps) {
    super({
      canvas,
      ctx,
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey = null;
    this.attackBox = {
      position: { ...this.position },
      width: 100,
      height: 50,
      offset: offset,
    } as AttackBox;
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }

  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 96
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

export { Fighter };
