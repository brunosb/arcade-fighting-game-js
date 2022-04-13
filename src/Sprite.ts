export type Position = {
  x: number;
  y: number;
};

interface SpriteProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: Position;
  width?: number;
  height?: number;
  imageSrc: string;
  scale?: number;
  framesMax?: number;
  offset?: Position;
}

class Sprite {
  public position: Position;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public scale: number;
  public framesMax: number;
  public framesCurrent: number;
  public framesElapsed: number;
  public framesHold: number;
  public offset: Position;

  constructor({
    canvas,
    ctx,
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }: SpriteProps) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      (this.framesCurrent * this.image.width) / this.framesMax,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

export { Sprite, SpriteProps };
