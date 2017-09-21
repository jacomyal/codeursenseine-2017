import { Sprite, Texture } from 'pixi.js';

import { SPRITE_WIDTH, SPRITE_HEIGHT } from './consts';

const canvas = document.createElement('CANVAS');
canvas.width = SPRITE_WIDTH;
canvas.height = SPRITE_HEIGHT;

const ctx = canvas.getContext('2d');

export function drawSprite(person) {
  ctx.clearRect(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

  ctx.fillStyle = '#' + (
    Math.floor(Math.random() * 16777215).toString(16) + '000000'
  ).substr(0, 6);
  ctx.fillRect(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

  return new Sprite(Texture.fromImage(canvas.toDataURL()));
};
