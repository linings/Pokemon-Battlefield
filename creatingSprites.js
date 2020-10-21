import { app, battlefield, endGame, style } from './index.js';
// import clickOnAFighter from './battlefieldScene.js';

let Text = PIXI.Text,
  Container = PIXI.Container,
  Graphics = PIXI.Graphics;

let textureArray = [];
let animatedSprite = '';
let healthBar1, healthBar2;

let play;
let healthDecreaser = 0;
let isFighterFirst;

const creatingSprites = (result) => {
  let alienImages = [];

  for (let i = 0; i < result.length; i++) {
    alienImages.push(result[i]['sprite_front']);
  }
  for (let i = 0; i < alienImages.length; i++) {
    textureArray = [];
    animatedSprite = '';
    let texture = PIXI.Texture.from(alienImages[i]);
    textureArray.push(texture);

    let name = new Text(`name: ${[result[i]['name']]}`, style);
    let ability = new Text(`ability: ${[result[i]['ability']]}`, style);

    const [move1, move2, move3, move4] = creatingMoves(result, i);

    const [
      speed,
      specialDefense,
      specialAttack,
      defense,
      attack,
      health,
    ] = creatingStats(result, i);

    animatedSprite = new PIXI.AnimatedSprite(textureArray);

    if (i <= 4) {
      const vp = 155 * i + 25;
      const hp = 20;
      animatedSprite.position.set(vp, hp);
      creatingText(vp, hp, [
        name,
        ability,
        move1,
        move2,
        move3,
        move4,
        speed,
        specialDefense,
        specialAttack,
        defense,
        attack,
        health,
      ]);
    }
    if (i > 4 && i <= 9) {
      const vp = 155 * (i - 5) + 25;
      const hp = 400;
      animatedSprite.position.set(vp, hp);
      creatingText(vp, hp, [
        name,
        ability,
        move1,
        move2,
        move3,
        move4,
        speed,
        specialDefense,
        specialAttack,
        defense,
        attack,
        health,
      ]);
    }
    if (i > 9 && i <= 14) {
      const vp = 155 * (i - 10) + 25;
      const hp = 800;
      animatedSprite.position.set(vp, hp);
      creatingText(vp, hp, [
        name,
        ability,
        move1,
        move2,
        move3,
        move4,
        speed,
        specialDefense,
        specialAttack,
        defense,
        attack,
        health,
      ]);
    }
    if (i > 14) {
      const vp = 155 * (i - 15) + 25;
      const hp = 1200;
      animatedSprite.position.set(vp, hp);
      creatingText(vp, hp, [
        name,
        ability,
        move1,
        move2,
        move3,
        move4,
        speed,
        specialDefense,
        specialAttack,
        defense,
        attack,
        health,
      ]);
    }

    clickOnAFighter(animatedSprite, result);

    app.stage.addChild(
      animatedSprite,
      name,
      ability,
      move1,
      move2,
      move3,
      move4,
      speed,
      specialDefense,
      specialAttack,
      defense,
      attack,
      health
    );
  }
};

const creatingMoves = (result, i) => {
  const moves = {
    move1: result[i].moves[0].move.name,
    move2: result[i].moves[1].move.name,
    move3: result[i].moves[2].move.name,
    move4: result[i].moves[3].move.name,
  };

  let move1 = new Text(`move 1: ${moves.move1}`, style);
  let move2 = new Text(`move 2: ${moves.move2}`, style);
  let move3 = new Text(`move 3: ${moves.move3}`, style);
  let move4 = new Text(`move 4: ${moves.move4}`, style);

  return [move1, move2, move3, move4];
};

const creatingText = (vp, hp, spriteSpecialties) => {
  const moveVertically = 120;
  const spaceBetweenText = 20;

  for (let i = 0; i < spriteSpecialties.length; i++) {
    spriteSpecialties[i].position.set(
      vp,
      hp + moveVertically + i * spaceBetweenText
    );
  }
};

const creatingStats = (result, i) => {
  let stats = {};

  for (let j = 0; j < Object.keys(result[i].stats).length; j++) {
    stats[Object.entries(result[i].stats)[j][0]] = Object.entries(
      result[i].stats
    )[j][1];
  }

  let speed = new Text(`speed: ${stats.speed}`, style);
  let specialDefense = new Text(
    `special-defense: ${stats['special-defense']}`,
    style
  );
  let specialAttack = new Text(
    `special-attack: ${stats['special-attack']}`,
    style
  );
  let defense = new Text(`defense: ${stats.defense}`, style);
  let attack = new Text(`attack: ${stats.attack}`, style);
  let health = new Text(`HP: ${stats.hp}`, style);

  return [speed, specialDefense, specialAttack, defense, attack, health];
};

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

    makeHPbar1(0, 100, 250, 120, 20, 0);
    makeHPbar2(0, 530, 250, 120, 20, 0);

    displayNameOfFighter(fighter, competitor, 120, 550, 220);

    fighting(fighter, competitor, [firstSprite, secondSprite]);
  }
};

const loadRandomFighter = (result, animatedSprite) => {
  let spriteOne, spriteTwo;

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

const makeHPbar1 = (healthBarPosition, x, y, w, h) => {
  healthBar1 = new Container();
  healthBar1.position.set(healthBarPosition, 4);
  battlefield.stage.addChild(healthBar1);

  // Create the black background rectangle
  let innerBar = new Graphics();
  innerBar.beginFill(0xff3300);
  innerBar.drawRect(x, y, w, h);
  innerBar.endFill();
  healthBar1.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new Graphics();
  outerBar.beginFill(0x00bb43);
  outerBar.drawRect(x, y, w - healthDecreaser, h);
  outerBar.endFill();
  healthBar1.addChild(outerBar);

  healthBar1.outerBarFirst = outerBar;
};

const makeHPbar2 = (healthBarPosition, x, y, w, h) => {
  healthBar2 = new Container();
  healthBar2.position.set(healthBarPosition, 4);
  battlefield.stage.addChild(healthBar2);

  // Create the black background rectangle
  let innerBar = new Graphics();
  innerBar.beginFill(0xff3300);
  innerBar.drawRect(x, y, w, h);
  innerBar.endFill();
  healthBar2.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new Graphics();
  outerBar.beginFill(0x00bb43);
  outerBar.drawRect(x, y, w - healthDecreaser, h);
  outerBar.endFill();
  healthBar2.addChild(outerBar);

  healthBar2.outerBarSecond = outerBar;
};

const displayNameOfFighter = (
  fighter,
  competitor,
  fighterVPosition,
  competitorVPosition,
  hPosition
) => {
  let fighterName = new Text(`name: ${[fighter['name']]}`, style);
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

  if (fighterStats.speed > competitorStats.speed) {
    damage =
      (fighterStats.attack / competitorStats.defense) * getRandomInt(201);
    damage = Math.round(damage);

    isFighterFirst = true;
    if (damage > 0) {
      attack(fighterStats, competitorStats, sprites, damage);
    }
  } else {
    damage =
      (competitorStats.attack / fighterStats.defense) * getRandomInt(201);
    damage = Math.round(damage);

    isFighterFirst = false;
    if (damage > 0) {
      attack(fighterStats, competitorStats, sprites, damage);
    }
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let moveBackward = false;

const attack = (fighterStats, competitorStats, sprites, damage) => {
  const [fighter, competitor] = sprites;

  const setup = () => {
    battlefield.ticker.add(() => play());
  };

  play = () => {
    // healthBar1.outerBarFirst.clear();
    // healthBar2.outerBarSecond.clear();

    if (isFighterFirst) {
      initiateAttack(fighter, 470, 120, 530, competitor, fighterStats, damage);
    } else {
      initiateAttack(
        competitor,
        180,
        550,
        100,
        fighter,
        competitorStats,
        damage
      );
    }
  };
  setup();
};

const delay = (ms) =>
  new Promise((res) => {
    id = setTimeout(res, ms);
  });

let id;

const setBlinking = async (fighterToBlink) => {
  let timer = 1000;
  fighterToBlink.alpha = 0;
  await delay(timer);
  fighterToBlink.alpha = 1;

  await delay(timer);
  fighterToBlink.alpha = 0;

  await delay(timer);
  fighterToBlink.alpha = 1;

  await delay(timer);
  fighterToBlink.alpha = 0;

  await delay(timer);
  fighterToBlink.alpha = 1;
  clearTimeout(id);
};

const initiateAttack = (
  attacker,
  startingPosition,
  endingPosition,
  healthbarPosition,
  blinker,
  stats,
  damage
) => {
  attacker.vx = 1;

  if (attacker.x === endingPosition && moveBackward) {
    stopCurrentAndPlayOther();
  }

  if (isFighterFirst) {
    if (attacker.x < startingPosition && !moveBackward) {
      attacker.x += attacker.vx;
    } else if (attacker.x === startingPosition) {
      moveBackward = true;
      attacker.vx = 0;
      setBlinking(blinker);
      makeHPbar2(0, healthbarPosition, 250, 120, 20);
      healthDecreaser += 20;

      hpDecreaser(stats, damage);
      attacker.x -= 1;
    } else if (attacker.x <= startingPosition && moveBackward) {
      attacker.x -= attacker.vx;
    }
  } else {
    if (attacker.x > startingPosition && !moveBackward) {
      attacker.x -= attacker.vx;
    } else if (attacker.x === startingPosition) {
      moveBackward = true;
      attacker.vx = 0;

      setBlinking(blinker);
      makeHPbar2(0, healthbarPosition, 250, 120, 20);
      healthDecreaser += 20;

      hpDecreaser(stats, damage);
      attacker.x += 1;
    } else if (attacker.x > startingPosition && moveBackward) {
      attacker.x += attacker.vx;
    }
  }
};

const stopCurrentAndPlayOther = () => {
  moveBackward = !moveBackward;
  isFighterFirst = !isFighterFirst;
};

const hpDecreaser = (stats, damage) => {
  console.log(stats);
  console.log(damage);
  stats.hp -= damage;
  if (stats.hp < 0) {
    document.body.removeChild(battlefield.view);
    document.body.appendChild(endGame.view);
    endGame.renderer.backgroundColor = 0x5553339;
  }
};

export default creatingSprites;
