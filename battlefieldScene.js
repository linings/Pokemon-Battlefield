import { app, battlefield, style } from './index.js';

let Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  Graphics = PIXI.Graphics;

const clickOnAFighter = (animatedSprite, result) => {
  animatedSprite.interactive = true;
  animatedSprite.buttonMode = true;
  let counter = 0;

  animatedSprite.on('click', onClick);

  function onClick() {
    if (counter === 0) {
      app.stage.visible = false;

      document.body.removeChild(app.view);
      document.body.appendChild(battlefield.view);

      battlefield.renderer.backgroundColor = 0x52258844;
      counter++;
    }

    const [fighter, competitor, firstSprite, secondSprite] = loadRandomFighter(
      result,
      animatedSprite
    );

    let healthbarCounter = 1;
    makeHPbar(0, 100, 250, 120, 20, healthbarCounter);
    healthbarCounter++;
    makeHPbar(0, 530, 250, 120, 20, healthbarCounter);

    displayNameOfFighter(fighter, competitor, 120, 550, 220);

    fighting(fighter, competitor, [firstSprite, secondSprite]);
  }
};

const loadRandomFighter = (result, animatedSprite) => {
  let spriteOne, spriteTwo;

  console.log(result);
  const fighter = result.find(
    (f) => f.sprite_front === animatedSprite.texture.textureCacheIds[0]
  );

  spriteOne = addFightersToStage(fighter.sprite_back);
  spriteOne.position.set(120, 120);

  const competitor = result[Math.floor(Math.random() * result.length)];

  if (competitor.sprite_front !== fighter.sprite_front) {
    spriteTwo = addFightersToStage(competitor.sprite_front);
    spriteTwo.position.set(550, 120);
  } else {
    loadRandomFighter();
  }

  return [fighter, competitor, spriteOne, spriteTwo];
};

const addFightersToStage = (sprite) => {
  let texture = PIXI.Texture.from(sprite);
  const animatedSprite = new PIXI.AnimatedSprite([texture]);
  battlefield.stage.addChild(animatedSprite);

  return animatedSprite;
};

const makeHPbar = (healthBarPosition, x, y, w, h, healthbarCounter) => {
  const healthBar = new Container();
  healthBar.position.set(healthBarPosition, 4);
  battlefield.stage.addChild(healthBar);

  // Create the black background rectangle
  let innerBar = new Graphics();
  innerBar.beginFill(0xff3300);
  innerBar.drawRect(x, y, w, h);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new Graphics();
  outerBar.beginFill(0x00bb43);
  outerBar.drawRect(x, y, w - 20, h);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthbarCounter === 1
    ? (healthBar.outerBarFirst = outerBar)
    : (healthBar.outerBarSecond = outerBar);
};

const displayNameOfFighter = (
  fighter,
  competitor,
  fighterVPosition,
  competitorVPosition,
  hPosition
) => {
  let fighterName = new Text(`name: ${[fighter['name']]}`, style);
  console.log(fighterName);
  fighterName.position.set(fighterVPosition, hPosition);
  battlefield.stage.addChild(fighterName);

  let competitorName = new Text(`name: ${[competitor['name']]}`, style);
  competitorName.position.set(competitorVPosition, hPosition);
  battlefield.stage.addChild(competitorName);
};

const fighting = (fighter, competitor, sprites) => {
  const fighterStats = fighter.stats;
  const competitorStats = competitor.stats;
  let damage = 0;
  let isFighterFirst = false;

  if (fighterStats.speed > competitorStats.speed) {
    damage =
      (fighterStats.attack / competitorStats.defense) * getRandomInt(201);
    damage = Math.round(damage);

    isFighterFirst = true;
    if (damage > 0) {
      attack(fighterStats, competitorStats, sprites, damage, isFighterFirst);
    }
  } else {
    damage =
      (competitorStats.attack / fighterStats.defense) * getRandomInt(201);
    damage = Math.round(damage);

    isFighterFirst = false;
    if (damage > 0) {
      attack(fighterStats, competitorStats, sprites, damage, isFighterFirst);
    }
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const attack = (
  fighterStats,
  competitorStats,
  sprites,
  damage,
  isFighterFirst
) => {
  const [fighter, competitor] = sprites;

  fighter.interactive = true;
  fighter.buttonMode = true;

  competitor.interactive = true;
  competitor.buttonMode = true;

  let state;
  let moveBackward = false;

  function setup() {
    //Set the game state
    state = play;
    //Start the game loop
    if (moveBackward) {
      return;
    }
    battlefield.ticker.add((delta) => gameLoop(delta));
  }

  function gameLoop(delta) {
    //Update the current game state:
    state(delta);
    if (moveBackward) {
      return;
    }
  }

  function play(delta) {
    console.log(competitor.x);

    console.log(competitorStats.hp);
    console.log(fighterStats.hp);
    console.log(damage);

    // while (competitorStats.hp > 0 && fighterStats.hp > 0) { // fighting
    //   if (isFighterFirst) {
    //     fighterAttack();
    //   }else{

    //   }
    // }

    const competitorAttack = () => {
      competitor.vx = 1;

      if (competitor.x === 550 && moveBackward) {
        console.log(moveBackward);
        console.log('1');
        return;
      }

      if (competitor.x > 180 && !moveBackward) {
        competitor.x -= competitor.vx;
      } else if (competitor.x === 180) {
        moveBackward = true;
        competitor.x += competitor.vx;
      } else if (competitor.x > 180 && moveBackward) {
        competitor.x += competitor.vx;
      }
    };

    const fighterAttack = () => {
      fighter.vx = 1;

      if (fighter.x === 120 && moveBackward) {
        console.log(moveBackward);
        return;
      }

      console.log(fighter.x);
      if (fighter.x < 480 && !moveBackward) {
        fighter.x += fighter.vx;
        console.log('1');
      } else if (fighter.x === 480) {
        moveBackward = true;
        fighter.x -= fighter.vx;
        console.log('2');
      } else if (fighter.x < 480 && moveBackward) {
        fighter.x -= fighter.vx;
        console.log('3');
      }
    };

    fighterAttack();
    competitorAttack();
  }
  setup();
};
export default clickOnAFighter;
