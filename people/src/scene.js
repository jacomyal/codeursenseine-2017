import { Application } from 'pixi.js';

import { WIDTH, HEIGHT } from './consts';

const app = new Application(
  WIDTH,
  HEIGHT,
  { transparent: true }
);

export default app;
