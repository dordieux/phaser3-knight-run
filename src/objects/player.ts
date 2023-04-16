import { IImageConstructor } from "../interfaces/image.interface";

export class Player extends Phaser.GameObjects.Sprite {
  private jumpKey = this.scene.input.keyboard!.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scrollFactorX = 100;
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(3);
    this.updateStatus("idle");
  }

  updateStatus(status: "idle" | "run" | "jump") {
    this.anims.play("knight_" + status, true);
  }

  update(): void {
    if (this.jumpKey.isDown) {
      this.updateStatus("jump");
    }
  }
}
