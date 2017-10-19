import scene from './scene';

const basepath =
  'https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data';

// Initialize renderer:
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(new THREE.Color('lightgrey'), 0);
renderer.setSize(640, 480);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
document.body.appendChild(renderer.domElement);

// Initialize camera:
const camera = new THREE.Camera();
scene.add(camera);

// Render loop:
function _renderLoop() {
  if (arToolkitSource.ready !== false) {
    arToolkitContext.update(arToolkitSource.domElement);
    scene.visible = camera.visible;
    _render();
  }
  requestAnimationFrame(_renderLoop);
}

// Deal with rendering:
function _render() {
  renderer.render(scene, camera);
}

// Deal with autoresize:
function _resize() {
  arToolkitSource.onResizeElement();
  arToolkitSource.copyElementSizeTo(renderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
  }
}
window.addEventListener('resize', _resize);

// Augmented reality FTW !
const arToolkitSource = new THREEx.ArToolkitSource({
  sourceType : 'webcam',
});
arToolkitSource.init(_resize);

const arToolkitContext = new THREEx.ArToolkitContext({
  detectionMode: 'mono',
  cameraParametersUrl: basepath + '/data/camera_para.dat',
});
arToolkitContext.init(() => {
  camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
  type: 'pattern',
  patternUrl: basepath + '/data/patt.hiro',
  changeMatrixMode: 'cameraTransformMatrix',
});

// As we do changeMatrixMode: 'cameraTransformMatrix', start with invisible
// scene:
scene.visible = false;
_renderLoop();
