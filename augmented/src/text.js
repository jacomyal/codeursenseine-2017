// Source:
// https://github.com/deathbearbrown/learning-three-js-blogpost
export function makeTextSprite(message, opts = {}) {
  const fontFace = opts.fontFace || 'sans-serif';
  const fontSize = opts.fontSize || 30;

  // Create canvas:
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Get size data (height depends only on font size), and resize canvas:
  context.font = fontSize + 'px ' + fontFace;
  const metrics = context.measureText(message);
  canvas.width = metrics.width;
  canvas.height = fontSize;

  // Draw text:
  // (reset font, since it seems to disappear avec measureText...)
  context.fillStyle = 'rgba(255, 255, 255, 0.5)';
  context.fillRect(0, 0, metrics.width + 4, fontSize);
  context.fillStyle = '#000';
  context.font = fontSize + 'px ' + fontFace;
  context.fillText(message, 2, fontSize - 2);

  // Use canvas content as THREE texture:
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(metrics.width / 130, fontSize / 130, 1 / 130);

  return sprite;
};
