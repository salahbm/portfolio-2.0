import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { createGUI } from './robot-gui';
import robot from './robot.glb';

let stats: Stats;
let clock: THREE.Clock;
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let model: THREE.Group;

function init(container: HTMLDivElement) {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
  camera.position.set(-5, 3, 10);
  camera.lookAt(0, 2, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

  clock = new THREE.Clock();

  // lights

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);

  // ground

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  // model

  const loader = new GLTFLoader();
  loader.load(
    robot,
    function (gltf) {
      model = gltf.scene as THREE.Group;
      scene.add(model);

      // Initialize the mixer before using it
      mixer = new THREE.AnimationMixer(model);
      createGUI(model, gltf.animations, mixer);
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// animation loop

function animate() {
  const dt = clock.getDelta();

  if (mixer) mixer.update(dt);

  renderer.render(scene, camera);

  stats.update();
}

export { init, animate, onWindowResize };
