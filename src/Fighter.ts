import { Position, Velocity } from "./main";

interface FighterProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: Position;
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

const gravity = 0.7;

class Fighter {
  public position: Position;
  public velocity: Velocity;
  public width: number;
  public height: number;
  public lastKey: string | null;
  public attackBox: AttackBox;
  public color: string;
  public isAttacking: boolean;
  public health: number;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor(props: FighterProps) {
    this.canvas = props.canvas;
    this.ctx = props.ctx;
    this.position = props.position;
    this.velocity = props.velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey = null;
    this.attackBox = {
      position: { ...this.position },
      width: 100,
      height: 50,
      offset: props.offset,
    } as AttackBox;
    this.color = props.color || "#ff0000";
    this.isAttacking = false;
    this.health = 100;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    // attack box
    if (this.isAttacking) {
      this.ctx.fillStyle = "#00ff00";
      this.ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
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
