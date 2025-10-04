import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { controls, fadeToAction } from './robot-controllers';

let gui: GUI;

// Define a more specific type for the face object with morphTargetDictionary and morphTargetInfluences
interface MorphTargetMesh extends THREE.Mesh {
  morphTargetDictionary?: { [key: string]: number };
  morphTargetInfluences?: number[];
}

let face: MorphTargetMesh;
let actions: { [key: string]: THREE.AnimationAction };

const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
const emotions = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

// fadeToAction function is now imported from robot-controllers.ts

function createGUI(
  model: THREE.Group,
  animations: THREE.AnimationClip[],
  mixer: THREE.AnimationMixer
) {
  if (gui) gui.destroy();

  gui = new GUI();

  gui.title('Robot');

  // Use the mixer passed from robot-logic.ts

  actions = {
    Idle: mixer.clipAction(animations[0]),
    Walking: mixer.clipAction(animations[1]),
    Running: mixer.clipAction(animations[2]),
    Dance: mixer.clipAction(animations[3]),
    Death: mixer.clipAction(animations[4]),
    Sitting: mixer.clipAction(animations[5]),
    Standing: mixer.clipAction(animations[6]),

    Jump: mixer.clipAction(animations[7]),
    Yes: mixer.clipAction(animations[8]),
    No: mixer.clipAction(animations[9]),
    Wave: mixer.clipAction(animations[10]),
    Punch: mixer.clipAction(animations[11]),
    ThumbsUp: mixer.clipAction(animations[12]),
  };

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;

    if (emotions.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  // states

  const statesFolder = gui.addFolder('States');

  const clipCtrl = statesFolder.add(controls.current, 'state').options(states);

  clipCtrl.onChange(function () {
    fadeToAction(controls.current.state, 0.5, actions);
  });

  statesFolder.open();

  // emotions

  const emoteFolder = gui.addFolder('Emotions');

  function createEmotionCallback(name: string) {
    function callback(): void {
      fadeToAction(name, 0.2, actions);

      mixer.addEventListener('finished', restoreState);
    }

    controls.current[name] = callback;

    emoteFolder.add(controls.current, name);
  }

  function restoreState() {
    mixer.removeEventListener('finished', restoreState);

    fadeToAction(controls.current.state, 0.2, actions);
  }

  for (let i = 0; i < emotions.length; i++) {
    createEmotionCallback(emotions[i]);
  }

  emoteFolder.open();

  // expressions

  face = model.getObjectByName('Head_4') as MorphTargetMesh;

  const expressions = Object.keys(face.morphTargetDictionary as { [key: string]: number });
  const expressionFolder = gui.addFolder('Expressions');

  for (let i = 0; i < expressions.length; i++) {
    expressionFolder.add(face.morphTargetInfluences, String(i), 0, 1, 0.01).name(expressions[i]);
  }

  // Initialize activeAction
  fadeToAction('Idle', 0, actions);

  expressionFolder.open();

  return {
    gui,
    mixer,
    face,
    actions,
  };
}

export { createGUI };
