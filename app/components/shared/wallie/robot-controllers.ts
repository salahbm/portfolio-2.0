import * as THREE from 'three';
const controls = {
  key: [0, 0],
  ease: new THREE.Vector3(),
  position: new THREE.Vector3(),
  up: new THREE.Vector3(0, 1, 0),
  rotate: new THREE.Quaternion(),
  current: 'Idle',
  fadeDuration: 0.5,
  runVelocity: 5,
  walkVelocity: 1.8,
  rotateSpeed: 0.05,
  floorDecale: 0,
};

function onKeyDown(event: KeyboardEvent) {
  const key = controls.key;
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
    case 'KeyZ':
      key[0] = -1;
      break;
    case 'ArrowDown':
    case 'KeyS':
      key[0] = 1;
      break;
    case 'ArrowLeft':
    case 'KeyA':
    case 'KeyQ':
      key[1] = -1;
      break;
    case 'ArrowRight':
    case 'KeyD':
      key[1] = 1;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      key[2] = 1;
      break;
  }
}

function onKeyUp(event: KeyboardEvent) {
  const key = controls.key;
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
    case 'KeyZ':
      key[0] = key[0] < 0 ? 0 : key[0];
      break;
    case 'ArrowDown':
    case 'KeyS':
      key[0] = key[0] > 0 ? 0 : key[0];
      break;
    case 'ArrowLeft':
    case 'KeyA':
    case 'KeyQ':
      key[1] = key[1] < 0 ? 0 : key[1];
      break;
    case 'ArrowRight':
    case 'KeyD':
      key[1] = key[1] > 0 ? 0 : key[1];
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      key[2] = 0;
      break;
  }
}

export { onKeyDown, onKeyUp };
