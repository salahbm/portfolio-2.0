import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { onKeyDown, onKeyUp, updateCharacter } from './robot-controllers';
import { createGUI } from './robot-gui';
import robot from './robot.glb';

let stats: Stats;
let clock: THREE.Clock;
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let model: THREE.Group;
let actions: { [key: string]: THREE.AnimationAction };

let container: HTMLDivElement;
let orbitControls: OrbitControls;

let group: THREE.Group;
let followGroup: THREE.Group;
let floor: THREE.Mesh;

const _PI = Math.PI;
const PI90 = Math.PI / 2;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function loadModel() {
  const loader = new GLTFLoader();
  loader.load(
    robot,
    function (gltf) {
      model = gltf.scene as THREE.Group;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);

      const guiResult = createGUI(model, gltf.animations, mixer);
      actions = guiResult.actions;

      // Play the Idle animation once everything is set up
      actions.Idle.play();
    },
    progress => {
      const progressPercentage = (progress.loaded / progress.total) * 100;
      if (progressPercentage) alert('Loading progress:' + progressPercentage + '%');
    },
    function (e) {
      const errorMsg = `Error loading model: ${e}`;
      // eslint-disable-next-line no-console
      console.error(errorMsg);
    }
  );
}

function init() {
  container = document.getElementById('robot-container') as HTMLDivElement;

  if (!container) return null;

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
  camera.position.set(-1, 5, 15);
  camera.lookAt(0, 3, 0);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

  group = new THREE.Group();
  scene.add(group);

  followGroup = new THREE.Group();
  scene.add(followGroup);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);
  followGroup.add(dirLight);
  followGroup.add(dirLight.target);

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -PI90;
  mesh.receiveShadow = true;
  scene.add(mesh);

  floor = mesh;

  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(0, 1, 0);
  orbitControls.enableDamping = true;
  orbitControls.enablePan = false;
  orbitControls.maxPolarAngle = PI90 - 0.05;
  orbitControls.update();

  window.addEventListener('resize', onWindowResize);

  // Also add to document for when focus is on the canvas
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  loadModel();

  // We'll play the Idle animation after the model is loaded

  stats = new Stats();
  container.appendChild(stats.dom);

  animate();
}

/**
 * Animation loop is used to update the scene.
 */
function animate(): void {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  updateCharacter({
    delta,
    orbitControls,
    actions,
    camera,
    group,
    followGroup,
    floor,
    mixer,
  });

  renderer.render(scene, camera);

  stats.update();
}

export { init, animate, onWindowResize };
