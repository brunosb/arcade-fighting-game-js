import { gravity } from "./main";
import { SpriteProps, Position, Sprite } from "./Sprite";

type Velocity = Position;

type SpritesProps = {
  [key: string]: {
    imageSrc: string;
    framesMax: number;
    image?: HTMLImageElement;
  };
};

interface FighterProps extends SpriteProps {
  velocity: Velocity;
  offset: Position;
  color?: string;
  sprites: SpritesProps;
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
  public sprites: SpritesProps;

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
    sprites,
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
    this.sprites = sprites;

    for (const sprite in sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image!.src = sprites[sprite].imageSrc;
    }
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
