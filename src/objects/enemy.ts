import { CharacterConstructor } from "../interfaces/character.interface";

enum Texture {
  Skeleton = "skeleton",
  Minotaur = "minotaur",
  Golem = "golem",
  Archer = "archer",
  Slime = "slime",
  Canine = "canine",
}

type Action = "attack" | "idle";

interface EnemyInterface extends CharacterConstructor {
  texture: Texture;
  action: Action;
}

export class Enemy extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  action: Action = "idle";

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

  static new(scene: Phaser.Scene): Enemy {
    const [texture, action] = getRandomTextureAndAction();
    return new this({ scene, x: 0, y: 275, texture, action });
  }

  update() {
    this.action = getRandomeAction();
  }

  battle() {
    this.anims.play(`${this.texture.key}_${this.action}`, true);

    this.on("animationcomplete", () => {
      this.anims.play(`${this.texture.key}_idle`, true);
    });
  }

  dead() {
    this.anims.play(`${this.texture.key}_dead`, true);

    this.on("animationcomplete", () => {
      this.destroy();
    });
  }
}

function getRandomTextureAndAction(): [Texture, Action] {
  const textureValues = Object.values(Texture);
  const randomTexture =
    textureValues[Math.floor(Math.random() * textureValues.length)];

  return [randomTexture, getRandomeAction()];
}

function getRandomeAction(): Action {
  return ["attack", "idle"][Math.floor(Math.random() * 2)] as Action;
}
