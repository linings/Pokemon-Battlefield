import { battlefield, endGame } from './index.js';

let Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

const hpDecreaser = (stats, damage, isFighterFirst) => {
  let gameOverStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  let btntyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  stats.hp -= damage;
  let message;

  if (stats.hp <= 0) {
    document.body.removeChild(battlefield.view);
    document.body.appendChild(endGame.view);
    endGame.renderer.backgroundColor = 0x5553339;

    if (isFighterFirst) {
      message = new Text('You Win!', gameOverStyle);
    } else {
      message = new Text('You Lose!', gameOverStyle);
    }
    creatingButton(btntyle);

    message.position.set(220, 100);

    endGame.stage.addChild(message);
  }
};

const creatingButton = (gameOverStyle) => {
  let playAgainBtn = new Text('Play Again', gameOverStyle);
  playAgainBtn.position.set(250, 200);

  playAgainBtn.interactive = true;
  playAgainBtn.buttonMode = true;
  playAgainBtn.on('pointerdown', onButtonClick);

  endGame.stage.addChild(playAgainBtn);
};

const onButtonClick = () => {
  document.body.removeChild(endGame.view);
  refreshPage();
};

function refreshPage() {
  window.location.reload();
}

export { hpDecreaser };
