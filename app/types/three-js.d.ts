/* eslint-disable @typescript-eslint/no-explicit-any */
// Type declarations for Three.js modules
declare module 'three/addons/libs/stats.module.js' {
  export default class Stats {
    dom: HTMLElement;
    update(): void;
  }
}

declare module 'three/addons/libs/lil-gui.module.min.js' {
  export class GUI {
    add(object: any, property: string): any;
    add(object: any, property: string, min?: number, max?: number, step?: number): any;
    addFolder(name: string): GUI;
    open(): void;
    destroy(): void;
    toggle(): void;
    title(title: string): void;
  }
}

declare module 'three/addons/loaders/GLTFLoader.js' {
  import { Object3D, AnimationClip } from 'three';

  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: { scene: Object3D; animations: AnimationClip[] }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

// Declare .glb file imports
declare module '*.glb' {
  const src: string;
  export default src;
}

// Declare image file imports
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.hdr' {
  const src: string;
  export default src;
}
