import { Position } from "./main";

interface SpriteProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: Position;
  width?: number;
  height?: number;
  imageSrc: string;
}

class Sprite {
  public position: Position;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor(props: SpriteProps) {
    this.canvas = props.canvas;
    this.ctx = props.ctx;
    this.position = props.position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = props.imageSrc;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

export { Sprite };
