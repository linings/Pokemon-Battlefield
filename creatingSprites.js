import { app,style } from './index.js';
import clickOnAFighter from './battlefieldScene.js';

let Text = PIXI.Text,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics;

const creatingSprites = (result) => {
  let alienImages = [];

  for (let i = 0; i < result.length; i++) {
    alienImages.push(result[i]['sprite_front']);
  }
  for (let i = 0; i < alienImages.length; i++) {
    let textureArray = [];
    let animatedSprite = '';
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

    clickOnAFighter(animatedSprite , result);

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
  for (let j = 0; j < result[i].stats.length; j++) {
    stats[result[i].stats[j].name] = result[i].stats[j]['base_stat'];
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


///
///
///
export default creatingSprites;
