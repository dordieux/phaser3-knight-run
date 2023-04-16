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
    this.cameras.main.setBackgroundColor(0x98d687);

    this.load.pack("preload", "./assets/pack.json", "preload");
    this.load.animation("knightAnimations", "./assets/animations/knight.json");
    this.load.animation(
      "skeletonAnimations",
      "./assets/animations/skeleton.json"
    );
  }

  init(): void {
    this.startKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create(): void {
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
