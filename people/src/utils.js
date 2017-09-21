import { Sprite, Texture } from 'pixi.js';

import { SPRITE_WIDTH, SPRITE_HEIGHT } from './consts';

const canvas = document.createElement('CANVAS');
canvas.width = SPRITE_WIDTH;
canvas.height = SPRITE_HEIGHT;

const ctx = canvas.getContext('2d');

const SKINS = [
  '#ffdcb1', '#e5c298', '#e4b98e',
  '#e2b98f', '#e3a173', '#d99164',
  '#cc8443', '#c77a58', '#a53900',
  '#880400', '#710200', '#440000',
];

const HAIRS = ['#45351a', '#0f0356', '#cea918'];
const EYES = ['#6f6ac3', '#761e1e', '#346026'];

const TSHIRTS = ['#eaeaea', '#242424', '#bababa'];
const SHIRTS = ['#6fd1ec', '#de96e3', '#bee89a'];
const VESTS = ['#5a4728', '#2f3045', '#562c2c'];
const SHOES = ['#5062bf', '#292929', '#45351a'];
const PANTS = ['#5f5e9a', '#454545', '#632222'];
const ROBES = ['#f0c647', '#75bd4b', '#c35ece'];

function _drawBody(ctx, person) {
  ctx.fillStyle = SKINS[person._print1 % SKINS.length];

  // Head:
  ctx.fillRect(1, 0, 4, 1);
  ctx.fillRect(0, 1, 6, 3);

  // Body and arms:
  ctx.fillRect(1, 4, 4, 1);
  ctx.fillRect(0, 5, 6, 5);

  // Legs:
  ctx.fillRect(1, 10, 1, 2);
  ctx.fillRect(4, 10, 1, 2);
  ctx.fillRect(5, 11, 1, 1);
}

function _drawClothes(ctx, person) {
  const age = person.Q40 || '';
  const gender = person.Q39;

  // "Youngsters"
  if (age.match(/2[56]/)) {
    // T-Shirt :
    ctx.fillStyle = TSHIRTS[person._print3 % TSHIRTS.length];
    ctx.fillRect(0, 5, 6, 2);
    ctx.fillRect(1, 7, 4, 2);

  // "Oldsters" (and others):
  } else {
    // Shirt :
    ctx.fillStyle = SHIRTS[person._print1 % SHIRTS.length];
    ctx.fillRect(0, 5, 6, 4);

    // Vest :
    ctx.fillStyle = VESTS[person._print2 % VESTS.length];
    ctx.fillRect(0, 5, 1, 3);
    ctx.fillRect(1, 5, 1, 4);
    ctx.fillRect(4, 5, 1, 4);
    ctx.fillRect(5, 5, 1, 3);
  }

  // Robes for some women:
  if (gender === 'female' && !(person.index % 3)) {
    // Robe :
    ctx.fillStyle = ROBES[person._print1 % ROBES.length];
    ctx.fillRect(1, 9, 4, 3);
  } else {
    // Pants :
    ctx.fillStyle = PANTS[person._print2 % PANTS.length];
    ctx.fillRect(1, 9, 4, 1);
    ctx.fillRect(1, 10, 1, 1);
    ctx.fillRect(4, 10, 1, 1);
  }

  // Shoes :
  ctx.fillStyle = SHOES[person._print3 % SHOES.length];
  ctx.fillRect(1, 11, 1, 1);
  ctx.fillRect(4, 11, 2, 1);
}

function _drawHead(ctx, person) {
  const gender = person.Q39;

  // Eyes:
  ctx.fillStyle = EYES[person._print1 % EYES.length];
  ctx.fillRect(1, 2, 1, 1);
  ctx.fillRect(4, 2, 1, 1);

  // Hair:
  ctx.fillStyle = HAIRS[person._print2 % HAIRS.length];

  // Long hair:
  if (gender === 'female' && person._print3 % 3) {
    ctx.fillRect(0, 0, 5, 1);
    ctx.fillRect(0, 1, 4, 1);
    ctx.fillRect(0, 2, 1, 4);
    ctx.fillRect(5, 1, 1, 5);

  // Short hair:
  } else {
    ctx.fillRect(0, 0, 5, 1);
    ctx.fillRect(0, 1, 3, 1);
    ctx.fillRect(0, 2, 1, 2);
    ctx.fillRect(5, 1, 1, 3);
  }

  // Facial hair:
  if (gender === 'male' && !(person._print3 % 4)) {
    ctx.fillRect(2, 3, 2, 1);
    ctx.fillRect(1, 4, 4, 1);
  }
}

export function drawSprite(person) {
  ctx.clearRect(0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
  _drawBody(ctx, person);
  _drawClothes(ctx, person);
  _drawHead(ctx, person);

  return new Sprite(Texture.fromImage(canvas.toDataURL()));
};
