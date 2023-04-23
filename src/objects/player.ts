import { CharacterConstructor } from "../interfaces/character.interface";

export class Player extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(params: CharacterConstructor) {
    super(params.scene, params.x, params.y, params.texture);

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

  animation(status: "idle" | "run" | "jump" | "attack" | "block") {
    this.anims.play("knight_" + status, true);
  }
}
