import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let gui: GUI;
let activeAction: THREE.AnimationAction;
let previousAction: THREE.AnimationAction;

// Define a more specific type for the face object with morphTargetDictionary and morphTargetInfluences
interface MorphTargetMesh extends THREE.Mesh {
  morphTargetDictionary?: { [key: string]: number };
  morphTargetInfluences?: number[];
}

let face: MorphTargetMesh;
let actions: { [key: string]: THREE.AnimationAction };

const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
const emotions = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

// Define an interface for the api object that allows dynamic properties
interface ApiObject {
  state: string;
  // Allow any string key with a function value
  [key: string]: string | (() => void);
}

// Create api object with the interface
const api: ApiObject = { state: 'Walking' };

function fadeToAction(name: string, duration: number) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
}

function createGUI(
  model: THREE.Group,
  animations: THREE.AnimationClip[],
  mixer: THREE.AnimationMixer
) {
  if (gui) gui.destroy();

  gui = new GUI();

  gui.title('Robot');

  // Use the mixer passed from wallie-logic.ts

  actions = {};

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

  const clipCtrl = statesFolder.add(api, 'state').options(states);

  clipCtrl.onChange(function () {
    fadeToAction(api.state, 0.5);
  });

  statesFolder.open();

  // emotions

  const emoteFolder = gui.addFolder('Emotions');

  function createEmoteCallback(name: string) {
    api[name] = function () {
      fadeToAction(name, 0.2);

      mixer.addEventListener('finished', restoreState);
    };

    emoteFolder.add(api, name);
  }

  function restoreState() {
    mixer.removeEventListener('finished', restoreState);

    fadeToAction(api.state, 0.2);
  }

  for (let i = 0; i < emotions.length; i++) {
    createEmoteCallback(emotions[i]);
  }

  emoteFolder.open();

  // expressions

  face = model.getObjectByName('Head_4') as MorphTargetMesh;

  const expressions = Object.keys(face.morphTargetDictionary as { [key: string]: number });
  const expressionFolder = gui.addFolder('Expressions');

  for (let i = 0; i < expressions.length; i++) {
    expressionFolder.add(face.morphTargetInfluences, String(i), 0, 1, 0.01).name(expressions[i]);
  }

  activeAction = actions['Walking'];
  activeAction.play();

  expressionFolder.open();

  return {
    gui,
    mixer,
    activeAction,
    previousAction,
    face,
    actions,
    api,
  };
}

export { createGUI };
