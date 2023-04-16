import { IImageConstructor } from "../interfaces/image.interface";

export class Player extends Phaser.GameObjects.Sprite {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(3);
    this.anims.play("knightIdle", true);
  }

  updateStatus(status: "idle" | "run") {
    this.anims.play("knight_" + status, true);
  }

  update(): void {}
}
