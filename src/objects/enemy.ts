import { CharacterConstructor } from "../interfaces/character.interface";

enum Texture {
  Skeleton = "skeleton",
  Minotaur = "minotaur",
  Golem = "golem",
  Archer = "archer",
  Slime = "slime",
  Canine = "canine",
}

type Action = "attack" | "defence";

interface EnemyInterface extends CharacterConstructor {
  texture: Texture;
  action: Action;
}

export class Enemy extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  declare warning: Phaser.GameObjects.Image;

  action: Action;

  constructor({ scene, x, y, texture, action }: EnemyInterface) {
    super(scene, x, y, texture);
    this.action = action;

    this.setScale(4);
    this.x = scene.scale.baseSize.width;
    this.flipX = true;
    this.anims.play(`${texture}_idle`, true);

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(32, 32);
  }

  private static getRandomTextureAndAction(): [Texture, Action] {
    const textureValues = Object.values(Texture);
    const randomTexture =
      textureValues[Math.floor(Math.random() * textureValues.length)];

    const randomAction = ["attack", "defence"][
      Math.floor(Math.random() * 2)
    ] as Action;
    return [randomTexture, randomAction];
  }

  static new(scene: Phaser.Scene): Enemy {
    const [texture, action] = this.getRandomTextureAndAction();
    return new this({ scene, x: 0, y: 275, texture, action });
  }

  update() {
    if (this.action === "attack") {
      const image = this.scene.add
        .image(this.x - 100, this.y - 70, "warning")
        .setScale(3);

      this.scene.time.delayedCall(1, () => {
        image.destroy();
      });
    }
  }

  dead() {
    this.anims.play(`${this.texture.key}_dead`, true);
    this.on("animationcomplete", () => {
      this.destroy();
    });
  }
}
