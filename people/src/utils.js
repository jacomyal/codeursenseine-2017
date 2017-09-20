import { Sprite, Texture } from 'pixi.js';

import { SPRITE_WIDTH, SPRITE_HEIGHT } from './consts';

const canvas = document.createElement('CANVAS');
canvas.width = SPRITE_WIDTH;
canvas.height = SPRITE_HEIGHT;

const ctx = canvas.getContext('2d');

export function drawSprite(person) {
  ctx.clearRect(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
  ctx.fillStyle =
    person.Q39 === 'male' ?
      'blue' :
    person.Q39 === 'female' ?
      'red' :
      'grey';
  ctx.fillRect(1, 1, SPRITE_WIDTH - 2, SPRITE_HEIGHT - 2);

  return new Sprite(Texture.fromImage(canvas.toDataURL()));
};
