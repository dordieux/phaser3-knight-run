import { IImageConstructor } from "../interfaces/image.interface";

const ENEMY_LIST = ["skeleton", "minotaur"];

type textureType = "skeleton" | "minotaur";
interface EnemyInterface extends IImageConstructor {
  texture: textureType;
}

export class Enemy extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(aParams: EnemyInterface) {
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
    this.anims.play(this.texture.key + "_idle", true);
  }

  dead() {
    this.anims.play(this.texture.key + "_dead", true);
    this.on("animationcomplete", () => {
      this.destroy();
    });
  }

  static new(scene: Phaser.Scene) {
    return new this({
      scene: scene,
      x: 0,
      y: 275,
      texture: ENEMY_LIST[
        Math.floor(Math.random() * ENEMY_LIST.length)
      ] as textureType,
    });
  }
}
