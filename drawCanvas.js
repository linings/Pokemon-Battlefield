const fetchToApi = async (url) => {
  const data = await fetch(url);
  const result = await data.json();

  return result;
};

const takeCurentSprite = async (spriteDetails) => {
  let allSpritesInfo = [];

  for (const sprite of spriteDetails) {
    const info = await fetchToApi(sprite.url);

    allSpritesInfo.push({
      sprite_front: info.sprites.front_default,
      sprite_back: info.sprites.back_default,
      name: sprite.name,
      id: info.id,
      ability: findAbility(info),
      moves: info.moves.slice(0, 4),
      stats: findStats(info.stats),
    });
  }

  const findAbility = (info) => {
    const ability = info.abilities.find((el) => el.is_hidden === true);
    if (ability) {
      return ability.ability.name;
    }
    return null;
  };

  const findStats = (infoStats) => {
    const stats = [];
    for (const stat of infoStats) {
      stats.push({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      });
    }
    return stats;
  };
  return allSpritesInfo;
};

const sprites = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
  { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
  { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
  { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
  { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
  { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
  { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
  { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
  { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
  { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
  { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
  { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
  { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
];

let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle,
  Container = PIXI.Container;

let app = new Application({
  width: 800, // default: 800
  height: 1600, // default: 600
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

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  app.renderer.backgroundColor = 0x5555979;

  creatingSprites(result);

  app.ticker.add((delta) => gameLoop(delta));

  function gameLoop(delta) {
    //Move the cat 1 pixel
    // cat.x += 1;
    // Optionally use the `delta` value
    // sprite.x -= 0.5; // moves vertically
    // sprite2.x += 0.5; // moves vertically
    // sprite3.x += 0.1; // moves vertically
    // Update the cat's velocity
    // sprite.vx += 0.5; // move to the corner!
    // sprite.vy += 0.5;
    // //Apply the velocity values to the cat's
    // //position to make it move
    // sprite.x -= sprite.vx;
    // sprite.y -= sprite.vy;
  }
};
drawCanvas();

const creatingSprites = (result) => {
  let alienImages = [];
  // creating the sprites

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
    animatedSprite.interactive = true;
    animatedSprite.buttonMode = true;
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
