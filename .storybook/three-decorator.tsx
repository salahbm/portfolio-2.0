import { Canvas } from '@react-three/fiber';
import React from 'react';

/**
 * A decorator for Storybook that provides a proper Three.js Canvas context
 * for components that require it.
 */
export const ThreeJsDecorator = Story => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas style={{ background: 'transparent' }} camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Story />
      </Canvas>
    </div>
  );
};
