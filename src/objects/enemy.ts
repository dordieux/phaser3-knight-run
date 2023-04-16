import { IImageConstructor } from "../interfaces/image.interface";

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(3);
    this.x = this.scene.scale.baseSize.width;
    this.flipX = true;
    this.anims.play("skeletonIdle", true);
  }

  update(): void {}
}
