import type * as Types from '../types';

/**
 * 颜色图形
 */
export class ColorGraphics extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene, options?: Phaser.Types.GameObjects.Graphics.Options) {
    super(scene, options);
    this.scene.add.existing(this);
  }

  private image?: HTMLImageElement;
  private pixelData?: Uint8ClampedArray;

  /** 默认颜色 */
  private defaultColor = 0x0000;
  /** 下一次绘制的颜色 */
  private nextColor = this.defaultColor;

  /**
   * 初始化, `new`之后调用
   */
  async init(params: Types.ColorGraphicsInitParams) {
    const { src, color = this.defaultColor, onClick } = params;
    const { image, pixelData } = (await this.createTextureGraphics({ src, color })) ?? {};
    this.setInteractive(
      new Phaser.Geom.Rectangle(this.x, this.y, image?.width, image?.height),
      Phaser.Geom.Rectangle.Contains
    );
    this.on('pointerdown', () => {
      onClick?.();
      this.resetColor();
    });
    this.image = image;
    this.pixelData = pixelData;
    return this;
  }

  /**
   * 重置颜色
   */
  async resetColor() {
    this.clear();
    this.createGraphicsForPixelData({
      pixelData: this.pixelData,
      width: this.image?.width,
      color: this.nextColor
    });
  }

  /**
   * 设置颜色
   */
  async setColor(color: number = this.defaultColor) {
    this.nextColor = color;
  }

  /**
   * 创建纹理图形
   */
  private createTextureGraphics(
    params: Types.CreateTextureGraphicsParams
  ): Promise<Types.CreateTextureGraphicsReturnType | null> {
    return new Promise((resolve) => {
      const { src, color } = params;
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          return;
        }
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        this.createGraphicsForPixelData({ pixelData, width: canvas.width, color });
        resolve({ image, pixelData });
      };
      image.onerror = (e) => {
        console.error(e);
        resolve(null);
      };
    });
  }

  /**
   * 为像素数据创建图形
   */
  private createGraphicsForPixelData(params: Types.CreateGraphicsForPixelDataParams) {
    const { pixelData, width = 0, color } = params;

    if (!pixelData) {
      return this;
    }

    // 设置填充颜色
    this.fillStyle(color);

    for (let i = 0; i < pixelData.length; i += 4) {
      const c = Phaser.Display.Color.GetColor(pixelData[i], pixelData[i + 1], pixelData[i + 2]);
      if (c !== 0) {
        // 相对像素坐标+目标绘制坐标
        const x = ((i / 4) % width) + this.x;
        const y = Math.floor(i / 4 / width) + this.y;

        // 绘制一个像素
        this.fillRect(x, y, 1, 1);
      }
    }
    return this;
  }
}
