import { IImageConstructor } from "../interfaces/image.interface";

export class Enemy extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(32, 32);
  }

  private initImage(): void {
    this.setScale(4);
    this.x = this.scene.scale.baseSize.width;
    this.flipX = true;
    this.anims.play("skeleton_idle", true);
  }

  dead() {
    this.anims.play("skeleton_dead", true);
    this.on("animationcomplete", () => {
      this.destroy();
    });
  }
}
