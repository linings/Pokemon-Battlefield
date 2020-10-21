import creatingSprites from './creatingSprites.js';
import takeCurentSprite from './getSprites.js';
import sprites from './sprites.js';

let Application = PIXI.Application,
  TextStyle = PIXI.TextStyle;

let app = new Application({
  width: 800, // default: 800
  height: 1600, // default: 600
});

let battlefield = new Application({
  width: 800, // default: 800
  height: 500, // default: 600
});

let endGame = new Application({
  width: 600, // default: 800
  height: 400, // default: 600
});

let style = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 12,
  fill: '#8FBC8F',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 4,
});

const drawCanvas = async () => {
  const takeCurrentSprite = async () => {
    const result = await takeCurentSprite(sprites);
    return result;
  };

  const result = await takeCurrentSprite();

  document.body.appendChild(app.view);
  app.renderer.backgroundColor = 0x5555979;

  console.log(result);
  creatingSprites(result);
};
drawCanvas();

export { app, battlefield ,endGame, style };
