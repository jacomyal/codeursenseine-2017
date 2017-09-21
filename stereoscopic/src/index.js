import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import scene from './scene'
import { CENTER, ORIGIN, FOCAL } from './consts';

// No body scrolling:
document.body.style.overflow = 'hidden';
document.body.style.margin = 0;
document.body.style.padding = 0;

// Initialize DOM container:
const container = document.getElementById('three-container');
container.style.position = 'absolute';
['top', 'left', 'right', 'bottom'].forEach(str => container.style[str] = 0);

// Initialize renderer:
const renderer = new WebGLRenderer({ alpha: true });
container.appendChild(renderer.domElement);

// Initialize camera:
const camera = new PerspectiveCamera(45, 1, 0.1, 10000);
camera.up.set(0, 0, 1);
scene.add(camera);

// Deal with rendering:
function _render() {
  renderer.render(scene, camera);
}

// Deal with autoresize:
function _resize() {
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  _render();
}
window.addEventListener('resize', _resize);
_resize();

// Make the camera move:
function _moveCamera() {
  const angle = Math.floor(Date.now() / 50) % 2 ?
    -Math.PI / 3 :
    (-Math.PI / 3 + Math.PI / 200);
  const direction = new Vector3(
    FOCAL * Math.cos(angle),
    -FOCAL * Math.sin(angle),
    FOCAL
  );
  const position = CENTER.clone().add(direction);

  camera.position.set(...position.toArray());
  camera.lookAt(CENTER);
  _render();

  requestAnimationFrame(_moveCamera);
}
_moveCamera();
