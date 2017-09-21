import data from './data';
import scene from './scene';
import { drawSprite } from './utils';

const sprites = {};

data.lines.forEach((line, i) => {
  const sprite = drawSprite(line);

  sprite.anchor.set(0.5);

  // Random initial value:
  sprite.x = 0;
  sprite.y = 0;
  sprite.targetX = sprite.x;
  sprite.targetY = sprite.y;

  scene.stage.addChild(sprite);
  sprites[i] = sprite;

  scene.ticker.add(() => {
    sprite.x = (sprite.x + sprite.targetX) / 2;
    sprite.y = (sprite.y + sprite.targetY) / 2;
    sprite.rotation = Math.random() / 30 - 1 / 60;
  });
});

export default sprites;
