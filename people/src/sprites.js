import data from './data';
import scene from './scene';
import { drawSprite } from './utils';

import { WIDTH, HEIGHT } from './consts';

const sprites = {};

data.lines.forEach((line, i) => {
  const sprite = drawSprite(line);

  sprite.anchor.set(0.5);

  // Random initial value:
  sprite.x = Math.random() * WIDTH;
  sprite.y = Math.random() * HEIGHT;
  sprite.targetX = sprite.x;
  sprite.targetY = sprite.y;

  scene.stage.addChild(sprite);
  sprites[i] = sprite;

  scene.ticker.add(() => {
    sprite.x =
      (sprite.x * 19 + sprite.targetX) / 20
      + (Math.random() * 0.6) - 0.3;
    sprite.y =
      (sprite.y * 19 + sprite.targetY) / 20
      + (Math.random() * 0.6) - 0.3;
    sprite.rotation = Math.random() / 30 - 1 / 60;
  });
});

export default sprites;
