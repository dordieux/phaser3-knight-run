import { Enemy, Player } from "../objects";

export class GameScene extends Phaser.Scene {
  constructor(
    private bitmapText: Phaser.GameObjects.BitmapText,
    private player: Player,
    private enemy: Enemy
  ) {
    super({
      key: "GameScene",
    });
  }

  isEncounter = false;

  init(): void {
    this.registry.set("score", -1);
  }

  create(): void {
    this.bitmapText = this.add.bitmapText(
      16,
      16,
      "font",
      "ATTACK : A\n" + "BLOCK  : D\n" + "JUMP   : SPACE",
      16
    );

    this.player = new Player({
      scene: this,
      x: 150,
      y: 200,
      texture: "player",
    });

    this.enemy = new Enemy({
      scene: this,
      x: 0,
      y: 200,
      texture: "skeleton",
    });
  }

  update(): void {
    if (this.enemy.x < 450) {
      this.isEncounter = true;
    } else {
      this.enemy.x -= 2;
    }

    if (this.isEncounter) {
      this.player.updateStatus("idle");
    } else {
      this.player.updateStatus("run");
    }
  }
}
