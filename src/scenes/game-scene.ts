import { Enemy, Player } from "../objects";

export class GameScene extends Phaser.Scene {
  isEncounter = false;
  isProgress = false;
  isEnemyAlive = true;
  isPlayerReady = false;

  declare action: "attack" | "block";

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
    this.add.bitmapText(16, 16, "font", "ATTACK : A\n" + "BLOCK  : D\n", 16);

    this.player = new Player({
      scene: this,
      x: 150,
      y: 275,
      texture: "player",
    });

    this.enemy = Enemy.new(this);
  }

  update(): void {
    this.physics.add.overlap(this.player, this.enemy, () => {
      if (this.isProgress) this.battle();

      this.isProgress = false;
    });

    if (!this.isEnemyAlive || !this.isEncounter) {
      if (!this.isEnemyAlive || this.enemy.x > 450) {
        this.background.tilePositionX += 4;
        this.enemy.x -= 2;
        this.player.animation("run");
      } else {
        this.isEncounter = true;
        this.player.animation("idle");
        this.enemy.update();
      }
    }

    if (this.isEncounter) {
      this.handleInput();

      if (this.isProgress) {
        this.player.animation("run");
        this.player.x += 3;
      }
    }

    if (this.isPlayerReady) {
      if (this.player.x > 150) {
        this.player.animation("run");
        this.player.x -= 5;
      } else {
        this.player.animation("idle");
        this.isPlayerReady = false;
      }
    }
  }

  private handleInput(): void {
    if (this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      this.action = "attack";
      this.isProgress = true;
    }
    if (this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.action = "block";
      this.isProgress = true;
    }
  }

  private battle() {
    const [isEnemyDead, isWin] = this.battleResult();

    this.player.once(Phaser.Animations.Events.ANIMATION_START, () => {
      if (isEnemyDead) {
        this.enemy.dead();
      } else {
        this.enemy.battle();
      }
    });

    this.player.animation(this.action);

    this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.isPlayerReady = true;
      if (isWin) console.log("win");
      if (isEnemyDead) {
        this.isEnemyAlive = false;
        this.isEncounter = false;

        this.time.addEvent({
          delay: 1500,
          callback: () => {
            this.enemy = Enemy.new(this);
            this.isEnemyAlive = true;
          },
          loop: false,
        });
      }
    });
  }

  private battleResult() {
    if (this.action === "attack" && this.enemy.action === "idle")
      return [true, true];
    if (this.action === "block" && this.enemy.action === "attack")
      return [false, true];

    return [false, false];
  }
}
