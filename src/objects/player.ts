import { IImageConstructor } from "../interfaces/image.interface";

export class Player extends Phaser.GameObjects.Sprite {
  private isEncounter = false;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(3);
  }

  public encounter() {
    this.isEncounter = true;
  }

  update(): void {
    this.anims.play("knightRun", true);

    if (this.isEncounter) {
      this.anims.play("knightIdle", true);
    }
  }
}
