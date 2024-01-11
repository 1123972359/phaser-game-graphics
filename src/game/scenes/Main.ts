import { ColorGraphics } from "../objects";
import player_01 from "../assets/player_01.png";
import player_02 from "../assets/player_02.png";
import player_03 from "../assets/player_03.png";
import player_04 from "../assets/player_04.png";
import player_05 from "../assets/player_05.png";
import player_06 from "../assets/player_06.png";
import player_07 from "../assets/player_07.png";
import player_08 from "../assets/player_08.png";
import player from "../assets/player.png";
import player_011 from "../assets/player_011.png";
import player_012 from "../assets/player_012.png";
import player_013 from "../assets/player_013.png";
import player_014 from "../assets/player_014.png";
import player_015 from "../assets/player_015.png";
import Phaser from "phaser";

const imageUrl = {
  player_01,
  player_02,
  player_03,
  player_04,
  player_05,
  player_06,
  player_07,
  player_08,
  player,
  player_011,
  player_012,
  player_013,
  player_014,
  player_015,
};

export class Main extends Phaser.Scene {
  constructor() {
    super("main");
  }

  nextColor = 0;

  preload() {}

  create() {
    this._createColorPanel();
    this._createDrawGraphics();
  }

  update() {}

  /** 创建颜色面板 */
  private _createColorPanel() {
    const colorPanel = [
      { label: "A色", color: 0xfded },
      { label: "B色", color: 0xabdc },
      { label: "C色", color: 0x800080 },
      { label: "D色", color: 0xe90004 },
      { label: "E色", color: 0xe97334 },
    ];
    const diffX = 50;
    colorPanel.forEach((item, i) => {
      const textStyle = { font: "16px Arial", fill: "red" };
      this.add
        .text(diffX * i, window.innerHeight - 100, item.label, textStyle)
        .setInteractive()
        .on("pointerdown", () => {
          console.log(item);
          this.nextColor = item.color;
        })
        .setDepth(1);
    });
  }

  /**
   * 创建绘制图形
   * - p.s.像素位置需要自行微调
   */
  private async _createDrawGraphics() {
    const arr = [
      {
        src: imageUrl.player_01,
        x: 0,
        y: 20,
      },
      {
        src: imageUrl.player_02,
        x: 0,
        y: 30,
      },
      {
        src: imageUrl.player_03,
        x: 0,
        y: 40,
      },
      {
        src: imageUrl.player_04,
        x: 0,
        y: 50,
      },
      {
        src: imageUrl.player_05,
        x: 0,
        y: 60,
      },
      {
        src: imageUrl.player_06,
        x: 0,
        y: 70,
      },
      {
        src: imageUrl.player_07,
        x: 0,
        y: 80,
      },
      {
        src: imageUrl.player_08,
        x: 0,
        y: 90,
      },
      {
        src: imageUrl.player,
        x: 0,
        y: 100,
      },
      {
        src: imageUrl.player_011,
        x: 0,
        y: 200,
      },
      {
        src: imageUrl.player_012,
        x: 0,
        y: 225,
      },
      {
        src: imageUrl.player_013,
        x: 25,
        y: 225,
      },
      {
        src: imageUrl.player_014,
        x: 82.5,
        y: 225,
      },
      {
        src: imageUrl.player_015,
        x: 25,
        y: 258,
      },
    ];
    for (const i in arr) {
      const { src, x, y } = arr[i];
      const g = new ColorGraphics(this, { x, y });
      await g.init({
        src,
        onClick: () => {
          g.setColor(this.nextColor);
        },
      });
    }
  }
}
