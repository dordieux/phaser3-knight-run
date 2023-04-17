import { IImageConstructor } from "../interfaces/image.interface";

export class Player extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  private jumpKey = this.scene.input.keyboard!.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initImage();
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(32, 32);
  }

  private initImage(): void {
    this.setScale(4);
    this.setDepth(1);
    this.animation("idle");
  }

  animation(status: "idle" | "run" | "jump" | "attack") {
    this.anims.play("knight_" + status, true);
  }

  update(): void {
    if (this.jumpKey.isDown) {
      this.animation("jump");
    }
  }
}
