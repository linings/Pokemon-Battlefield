import fetchToApi from './fetchToApi.js';

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
  return allSpritesInfo;
};

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
    stats[stat.stat.name] = stat.base_stat;
  }
  return stats;
};

export default takeCurentSprite;
