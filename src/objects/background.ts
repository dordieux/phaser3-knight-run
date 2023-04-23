export class Background {
  private readonly backgrounds: Phaser.GameObjects.TileSprite[];

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly texture: string,
    private readonly width: number,
    private readonly height: number,
    private readonly depth: number
  ) {
    this.backgrounds = [];

    for (let i = 0; i < this.depth; i++) {
      const background = this.scene.add
        .tileSprite(0, 0, this.width, this.height, `${this.texture}_${i}`)
        .setOrigin(0, 0);

      this.backgrounds.push(background);
    }
  }

  update() {
    for (let i = 0; i < this.depth; i++) {
      const background = this.backgrounds[i];
      const positionX = background.tilePositionX + 4 * i * 0.08;
      background.tilePositionX = positionX;
    }
  }
}
