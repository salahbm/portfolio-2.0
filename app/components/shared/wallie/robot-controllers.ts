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
  group,
  followGroup,
  floor,
  mixer,
}: {
  delta: number;
  orbitControls: OrbitControls;
  actions: { [key: string]: THREE.AnimationAction };
  group: THREE.Group;
  followGroup: THREE.Group;
  floor: THREE.Mesh;
  mixer: THREE.AnimationMixer;
}) {
  const fade = controls.fadeDuration;
  const key = controls.key;
  const up = controls.up;
  const position = controls.position;
  const rotate = controls.rotate;

  // Determine if character is moving
  const active = key[0] !== 0 || key[1] !== 0 ? true : false;
  const play = active ? (key[2] ? 'Running' : 'Walking') : 'Idle';

  // Change animation
  if (controls.current.state !== play) {
    const current = actions[play];
    const old = actions[controls.current.state];
    controls.current.state = play;

    setWeight(current, 1.0);
    old.fadeOut(fade);
    current.reset().fadeIn(fade).play();
  }

  // Move and rotate object
  if (controls.current.state !== 'Idle') {
    // Run/walk velocity
    const velocity =
      controls.current.state === 'Running' ? controls.runVelocity : controls.walkVelocity;

    // Direction from keys (forward/backward and left/right)
    const moveDirection = new THREE.Vector3(key[1], 0, key[0]).normalize();

    // Apply camera rotation to movement direction
    const azimuth = orbitControls.getAzimuthalAngle();
    moveDirection.applyAxisAngle(up, azimuth);

    // Scale by velocity and delta
    moveDirection.multiplyScalar(velocity * delta);

    // Update position
    position.add(moveDirection);

    // Calculate rotation to face movement direction
    if (moveDirection.length() > 0) {
      const angle = Math.atan2(moveDirection.x, moveDirection.z);
      rotate.setFromAxisAngle(up, angle);
      group.quaternion.slerp(rotate, controls.rotateSpeed); // Smooth rotation
    }

    // Update group position
    group.position.copy(position);

    // Update camera and follow group
    orbitControls.target.copy(position).add(new THREE.Vector3(0, 1, 0));
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
      key[0] = -1; // Forward
      break;
    case 'ArrowDown':
    case 'KeyS':
      key[0] = 1; // Backward
      break;
    case 'ArrowLeft':
    case 'KeyA':
      key[1] = -1; // Left
      break;
    case 'ArrowRight':
    case 'KeyD':
      key[1] = 1; // Right
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      key[2] = 1; // Run
      break;
  }

  // Handle action keys (states and emotions) from keyMap
  if (keyMap[event.code]) {
    const mapping = keyMap[event.code];
    if (mapping.type === 'state') {
      controls.current.state = mapping.action;
    } else if (
      mapping.type === 'emotion' &&
      typeof controls.current[mapping.action] === 'function'
    ) {
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
