import { GameScene } from "./scenes/game-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "Dino",
  version: "1.0",
  width: 600,
  height: 400,
  type: Phaser.AUTO,
  parent: "game",
  scene: [MainMenuScene, GameScene],
  input: {
    keyboard: true,
  },
  physics: {
    default: "arcade",
  },
  backgroundColor: "#98d687",
  render: { pixelArt: true, antialias: false },
};
