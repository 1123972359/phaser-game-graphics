import Phaser from 'phaser';
import { Main } from './scenes';
import type { InitGameProps } from './types';

export class GameInit extends Phaser.Game {
  constructor(props: InitGameProps) {
    const { parent } = props;
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.RESIZE
      },
      transparent: true,
      scene: [Main]
    };
    super(gameConfig);
  }
}
