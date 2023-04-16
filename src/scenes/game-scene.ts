import { Player } from "../objects";

export class GameScene extends Phaser.Scene {
  constructor(private player: Player) {
    super({
      key: "GameScene",
    });
  }

  init(): void {
    this.registry.set("score", -1);
  }

  create(): void {
    this.player = new Player({
      scene: this,
      x: 100,
      y: 300,
      texture: "player",
    });
  }

  update(): void {
    this.player.update();
  }
}
