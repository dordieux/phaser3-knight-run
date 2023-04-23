import { Background } from "../objects";

export class MainMenuScene extends Phaser.Scene {
  constructor(
    private startKey: Phaser.Input.Keyboard.Key,
    private titleBitmapText: Phaser.GameObjects.BitmapText,
    private playBitmapText: Phaser.GameObjects.BitmapText
  ) {
    super({
      key: "MainMenuScene",
    });
  }

  preload(): void {
    this.load.pack("preloadPack", "./assets/pack.json", "preload");
    this.load.pack("preloadC", "./assets/character.json", "preload");
    this.load.pack("preloadB", "./assets/background.json", "preload");
    this.load.animation("knightAnimations", "./assets/animations/knight.json");
    this.load.animation(
      "skeletonAnimations",
      "./assets/animations/enemy/skeleton.json"
    );
    this.load.animation(
      "minotaurAnimations",
      "./assets/animations/enemy/minotaur.json"
    );
    this.load.animation(
      "golemAnimations",
      "./assets/animations/enemy/golem.json"
    );
    this.load.animation(
      "archerAnimations",
      "./assets/animations/enemy/archer.json"
    );
    this.load.animation(
      "slimeAnimations",
      "./assets/animations/enemy/slime.json"
    );
    this.load.animation(
      "canineAnimations",
      "./assets/animations/enemy/canine.json"
    );
  }

  init(): void {
    this.startKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create(): void {
    new Background(
      this,
      "background_forest",
      this.game.config.width as number,
      this.game.config.height as number,
      13
    );

    this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "background_forest"
      )
      .setOrigin(0, 0);

    this.titleBitmapText = this.add.bitmapText(0, 150, "font", "TITLE", 30);

    this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.titleBitmapText.width
    );

    this.playBitmapText = this.add.bitmapText(0, 200, "font", "S: PLAY", 25);

    this.playBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.playBitmapText.width
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
