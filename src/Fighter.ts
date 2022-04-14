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
  attackBox: AttackBox;
}

type AttackBox = {
  position?: Position;
  width?: number;
  height?: number;
  offset: Position;
};

class Fighter extends Sprite {
  public velocity: Velocity;
  public lastKey: string | null;
  public color: string;
  public isAttacking: boolean;
  public health: number;
  public sprites: SpritesProps;
  public attackBox: AttackBox;

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
    attackBox,
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
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
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

    // attack boxes
    this.attackBox.position!.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position!.y = this.position.y + this.attackBox.offset.y;

    // draw attackbox
    // this.ctx.fillRect(
    //   this.attackBox.position!.x,
    //   this.attackBox.position!.y,
    //   this.attackBox.width!,
    //   this.attackBox.height!
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //gravity function
    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 96
    ) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  switchSprite(sprite: string) {
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image!;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image!;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image!;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image!;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image!;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}

export { Fighter };
