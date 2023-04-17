import { Enemy, Player } from "../objects";

export class GameScene extends Phaser.Scene {
  isEncounter = false;
  isProgress = false;
  isEnemyAlive = true;

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

    this.enemy = Enemy.new(this);

    this.add.bitmapText(
      16,
      16,
      "font",
      "ATTACK : A\n" + "BLOCK  : D\n" + "JUMP   : SPACE",
      16
    );
  }

  update(): void {
    this.physics.add.overlap(this.player, this.enemy, () => {
      if (this.isProgress) {
        this.player.animation("attack");
        this.enemy.dead();
      }

      this.isProgress = false;
      this.isEnemyAlive = false;
      this.isEncounter = false;
    });

    if (this.isEnemyAlive && !this.isEncounter) {
      if (this.enemy.x > 450) {
        this.background.tilePositionX += 4;
        this.enemy.x -= 2;
        this.player.animation("run");
      } else {
        this.isEncounter = true;
        this.player.animation("idle");
      }
    }

    if (this.isEncounter) {
      this.handleInput();

      if (this.isProgress) {
        this.player.animation("run");
        this.player.x += 3;
      }
    }

    if (!this.isEnemyAlive) {
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          if (this.player.x > 150) {
            this.background.tilePositionX += 4;
            this.player.animation("run");
            this.player.x -= 5;
          }
        },
        loop: false,
      });

      if (this.player.x <= 150) {
        this.isEnemyAlive = true;
        this.enemy = Enemy.new(this);
      }
    }
  }

  private handleInput(): void {
    if (this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      this.isProgress = true;
    }
  }
}
