import { app, battlefield, style } from './index.js';
import {
  makeHPbar1,
  makeHPbar2,
  displayNameOfFighter,
  fighting,
} from './battlefieldScene.js';

let Text = PIXI.Text;
let animatedSprite = '';

const creatingSprites = (result) => {
  let alienImages = [];

  for (let i = 0; i < result.length; i++) {
    alienImages.push(result[i]['sprite_front']);
  }
  for (let i = 0; i < alienImages.length; i++) {
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

    let texture = PIXI.Texture.from(alienImages[i]);
    animatedSprite = new PIXI.AnimatedSprite([texture]);

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
  let moves = [];
  let movesFromInput = result[i].moves;

  for (let i = 0; i < movesFromInput.length; i++) {
    let currentMove = new Text(
      `move ${i + 1}: ${movesFromInput[i].move.name}`,
      style
    );
    moves.push(currentMove);
  }

  return moves;
};

const getMoves = (movesFromInput) => {

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

export default creatingSprites;
