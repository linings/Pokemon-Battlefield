import { battlefield, style } from './index.js';
import { hpDecreaser } from './endGameScene.js';

let Text = PIXI.Text,
  Container = PIXI.Container,
  Graphics = PIXI.Graphics;

let healthBar1, healthBar2;

let play;
let healthDecreaser = 0;
let isFighterFirst;

const makeHPbar1 = (healthBarPosition, x, y, w, h) => {
  healthBar1 = new Container();
  healthBar1.position.set(healthBarPosition, 4);
  battlefield.stage.addChild(healthBar1);

  let innerBar = new Graphics();
  innerBar.beginFill(0x00bb43);
  innerBar.drawRect(x, y, w, h);
  innerBar.endFill();
  healthBar1.addChild(innerBar);

  let outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(x, y, w / healthDecreaser, h);
  outerBar.endFill();
  healthBar1.addChild(outerBar);

  healthBar1.outerBarFirst = outerBar;
};

const makeHPbar2 = (healthBarPosition, x, y, w, h) => {
  healthBar2 = new Container();
  healthBar2.position.set(healthBarPosition, 4);
  battlefield.stage.addChild(healthBar2);

  let innerBar = new Graphics();
  innerBar.beginFill(0x00bb43);
  innerBar.drawRect(x, y, w, h);
  innerBar.endFill();
  healthBar2.addChild(innerBar);

  let outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(x, y, w / healthDecreaser, h);
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
    damage = (fighterStats.attack / competitorStats.defense) * getRandomInt(201);
    damage = Math.round(damage);

    isFighterFirst = true;
    if (damage > 0) {
      attack(fighterStats, competitorStats, sprites, damage);
    }
  } else {
    damage = (competitorStats.attack / fighterStats.defense) * getRandomInt(201);
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
      healthDecreaser = stats.hp / damage;
      makeHPbar2(0, healthbarPosition, 250, 120, 20);

      hpDecreaser(stats, damage, isFighterFirst);
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
      healthDecreaser = stats.hp / damage;
      makeHPbar2(0, healthbarPosition, 250, 120, 20);

      hpDecreaser(stats, damage, isFighterFirst);
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

export { makeHPbar1, makeHPbar2, displayNameOfFighter, fighting };
