export type InitGameProps = {
  parent?: HTMLElement;
};
export type CreateTextureGraphicsParams = {
  /** 图片地址 */
  src: string;
  /** 颜色 */
  color: number;
};

export type CreateTextureGraphicsReturnType = {
  image: HTMLImageElement;
  pixelData?: Uint8ClampedArray;
};

export type CreateGraphicsForPixelDataParams = {
  /** 像素数据 */
  pixelData?: Uint8ClampedArray;
  width?: number;
  color: number;
};

export type ColorGraphicsInitParams = {
  src: string;
  color?: number;
  onClick?: () => void;
};
