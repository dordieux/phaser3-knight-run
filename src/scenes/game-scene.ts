import { Enemy, Player } from "../objects";

export class GameScene extends Phaser.Scene {
  isEncounter = false;

  constructor(
    private background: Phaser.GameObjects.TileSprite,
    private player: Player,
    private enemy: Enemy
  ) {
    super({
      key: "GameScene",
    });
  }

  create(): void {
    this.background = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "background_forest"
      )
      .setOrigin(0, 0);

    this.player = new Player({
      scene: this,
      x: 150,
      y: 275,
      texture: "player",
    });

    this.enemy = new Enemy({
      scene: this,
      x: 0,
      y: 275,
      texture: "skeleton",
    });

    this.add.bitmapText(
      16,
      16,
      "font",
      "ATTACK : A\n" + "BLOCK  : D\n" + "JUMP   : SPACE",
      16
    );
  }

  update(): void {
    if (this.isEncounter) {
      this.player.update();
    } else {
      this.moveUntilEncount();
    }
  }

  private moveUntilEncount() {
    if (this.enemy.x < 450) {
      this.isEncounter = true;
      this.player.updateStatus("idle");
    } else {
      this.background.tilePositionX += 4;
      this.enemy.x -= 2;
      this.player.updateStatus("run");
    }
  }
}
