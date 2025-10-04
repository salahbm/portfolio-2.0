import * as THREE from 'three';

import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Define a type for the current controls that allows for dynamic properties
type CurrentControls = {
  state: string;
  [key: string]: string | (() => void);
};

// Define key mappings for states and emotions
interface KeyMap {
  [key: string]: {
    action: string;
    type: 'state' | 'emotion';
  };
}

// Map keys to actions
const keyMap: KeyMap = {
  // States
  Digit1: { action: 'Idle', type: 'state' },
  Digit2: { action: 'Walking', type: 'state' },
  Digit3: { action: 'Running', type: 'state' },
  Digit4: { action: 'Dance', type: 'state' },
  Digit5: { action: 'Death', type: 'state' },
  Digit6: { action: 'Sitting', type: 'state' },
  Digit7: { action: 'Standing', type: 'state' },
  // Emotions
  KeyJ: { action: 'Jump', type: 'emotion' },
  KeyY: { action: 'Yes', type: 'emotion' },
  KeyN: { action: 'No', type: 'emotion' },
  KeyV: { action: 'Wave', type: 'emotion' },
  KeyP: { action: 'Punch', type: 'emotion' },
  KeyT: { action: 'ThumbsUp', type: 'emotion' },
};

// Track active and previous actions
let activeAction: THREE.AnimationAction;
let previousAction: THREE.AnimationAction;

const controls = {
  key: [0, 0, 0], // Forward/backward, left/right, shift
  ease: new THREE.Vector3(),
  position: new THREE.Vector3(),
  up: new THREE.Vector3(0, 1, 0),
  rotate: new THREE.Quaternion(),
  current: { state: 'Idle' } as CurrentControls, // Initialize with Idle
  fadeDuration: 0.5,
  runVelocity: 5,
  walkVelocity: 1.8,
  rotateSpeed: 0.05,
  floorDecale: 0,
};

function unwrapRad(r: number) {
  return Math.atan2(Math.sin(r), Math.cos(r));
}

function setWeight(action: THREE.AnimationAction, weight: number) {
  action.enabled = true;
  action.setEffectiveTimeScale(1);
  action.setEffectiveWeight(weight);
}

/**
 * Fade from one animation to another
 */
function fadeToAction(
  name: string,
  duration: number,
  actions: { [key: string]: THREE.AnimationAction }
) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction && previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
}

function updateCharacter({
  delta,
  orbitControls,
  actions,
  camera,
  group,
  followGroup,
  floor,
  mixer,
}: {
  delta: number;
  orbitControls: OrbitControls;
  actions: { [key: string]: THREE.AnimationAction };
  camera: THREE.Camera;
  group: THREE.Group;
  followGroup: THREE.Group;
  floor: THREE.Mesh;
  mixer: THREE.AnimationMixer;
}) {
  const fade = controls.fadeDuration;
  const key = controls.key;
  const up = controls.up;
  const ease = controls.ease;
  const rotate = controls.rotate;
  const position = controls.position;
  const azimuth = orbitControls.getAzimuthalAngle();

  const active = key[0] === 0 && key[1] === 0 ? false : true;
  const play = active ? (key[2] ? 'Running' : 'Walking') : 'Idle';

  // change animation

  if (controls.current.state != play) {
    const current = actions[play];
    const old = actions[controls.current.state];
    controls.current.state = play;

    setWeight(current, 1.0);
    old.fadeOut(fade);
    current.reset().fadeIn(fade).play();
  }

  // move object

  if (controls.current.state !== 'Idle') {
    // run/walk velocity
    const velocity =
      controls.current.state == 'Running' ? controls.runVelocity : controls.walkVelocity;

    // direction with key
    ease.set(key[1], 0, key[0]).multiplyScalar(velocity * delta);

    // calculate camera direction
    const angle = unwrapRad(Math.atan2(ease.x, ease.z) + azimuth);
    rotate.setFromAxisAngle(up, angle);

    // apply camera angle on ease
    controls.ease.applyAxisAngle(up, azimuth);

    position.add(ease);
    camera.position.add(ease);

    group.position.copy(position);
    group.quaternion.rotateTowards(rotate, controls.rotateSpeed);

    orbitControls.target.copy(position).add({ x: 0, y: 1, z: 0 });
    followGroup.position.copy(position);

    // Move the floor without any limit
    const dx = position.x - floor.position.x;
    const dz = position.z - floor.position.z;
    if (Math.abs(dx) > controls.floorDecale) floor.position.x += dx;
    if (Math.abs(dz) > controls.floorDecale) floor.position.z += dz;
  }

  if (mixer) mixer.update(delta);

  orbitControls.update();
}

function onKeyDown(event: KeyboardEvent): void {
  const key = controls.key;

  // Handle movement keys
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

  // Handle action keys (states and emotions) from keyMap
  if (keyMap[event.code]) {
    const mapping = keyMap[event.code];

    if (mapping.type === 'state') {
      // Change the state directly
      controls.current.state = mapping.action;
    } else if (
      mapping.type === 'emotion' &&
      typeof controls.current[mapping.action] === 'function'
    ) {
      // Trigger the emotion callback
      (controls.current[mapping.action] as () => void)();
    }
  }
}

function onKeyUp(event: KeyboardEvent): void {
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

export { onKeyDown, onKeyUp, controls, keyMap, updateCharacter, fadeToAction };
