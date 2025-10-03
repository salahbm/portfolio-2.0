// React hooks for managing component state and side effects
import { a } from '@react-spring/three';
import { SpringValue } from '@react-spring/web';
import { useGLTF, useTexture, Shadow, meshBounds } from '@react-three/drei';
import { useState, useEffect } from 'react';
// Drei is a collection of useful helpers and abstractions for @react-three/fiber
// SpringValue is a value that animates smoothly when it changes
// 'a' is a namespace for animated components in Three.js
// Core Three.js types for 3D objects, materials, and geometry
import { BufferGeometry, Material, Mesh } from 'three';

// Import 3D model file (.glb = GL Binary format, a compact 3D file format)
import crossTextureUrl from './assets/cross.jpg';
import switchModelUrl from './assets/switch.glb';
// Import texture image for the switch button

// Define TypeScript types for the 3D model structure
// This helps TypeScript understand the shape of the data returned by useGLTF
type GLTFResult = {
  // 'nodes' contains all the 3D objects in the model
  nodes: {
    // 'Cube' is the name of a specific mesh in the model file
    // It's a Mesh object with a geometry property
    Cube: Mesh & { geometry: BufferGeometry };
  };
  // 'materials' contains all materials defined in the model
  materials: {
    // 'track' is the name of a specific material in the model
    track: Material;
  };
};

// Preload the 3D model to avoid loading delays when the component renders
// This improves performance by fetching the model in advance
useGLTF.preload(switchModelUrl);

export function Switch({
  x,
  set,
}: {
  // Function to update the toggle state (0 or 1) in the parent component
  set: React.Dispatch<React.SetStateAction<number>>;
  // Animated value from React Spring that smoothly transitions between 0 and 1
  // This drives all the animations in the component
  x: SpringValue<number>;
}) {
  // Load the 3D model and cast it to our defined type
  // useGLTF loads a 3D model and returns its nodes (meshes) and materials
  const { nodes, materials } = useGLTF(switchModelUrl) as unknown as GLTFResult;
  // Load the texture image for the switch button
  // useTexture converts a regular image into a Three.js texture
  const texture = useTexture(crossTextureUrl);

  // State to track if the mouse is hovering over the switch
  const [hovered, setHover] = useState(false);
  // Change the cursor style when hovering over the switch
  // The 'void' operator is used to discard the return value of the assignment
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);

  // Event handlers for user interactions
  // Toggle between 0 and 1 when clicked (converts boolean to number)
  const onClick = () => set(toggle => Number(!toggle));
  // Set hover state to true when mouse enters
  const onPointerOver = () => setHover(true);
  // Set hover state to false when mouse leaves
  const onPointerOut = () => setHover(false);

  // Create derived animated values from the main 'x' value
  // These map the 0-1 range to specific output ranges for different properties

  // Maps x from 0-1 to position on z-axis from -1.2 to 1.2
  // This moves the switch knob forward/backward
  const pZ = x.to([0, 1], [-1.2, 1.2]);

  // Maps x from 0-1 to rotation around x-axis from 0 to ~4.08 radians (234°)
  // This rotates the switch knob
  const rX = x.to([0, 1], [0, Math.PI * 1.3]);

  // Maps x from 0-1 to color values from light gray to dark gray
  // This changes the color of elements based on switch state
  const color = x.to([0, 1], ['#888', '#2a2a2a']);

  return (
    // Root group that contains all 3D elements, scaled up by 1.25x
    // 'dispose={null}' prevents Three.js from disposing resources when unmounting
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      {/* The track/base of the switch (animated mesh) */}
      <a.mesh
        receiveShadow // This mesh can receive shadows from other objects
        castShadow // This mesh can cast shadows onto other objects
        material={materials.track} // Use the material from the imported 3D model
        geometry={nodes.Cube.geometry} // Use the geometry from the imported 3D model
        material-color={color} // Animate the color based on switch state
        material-roughness={0.5} // How rough the surface appears (0=mirror, 1=matte)
        material-metalness={0.8} // How metallic the surface appears (0=non-metal, 1=metal)
      />
      {/* Animated group for the switch knob - moves up/down (y) and forward/back (z) */}
      <a.group position-y={1} position-z={pZ}>
        {/* Animated group that rotates the knob based on switch state */}
        <a.group rotation-x={rX}>
          {/* The actual knob/button mesh that users interact with */}
          <mesh
            receiveShadow // Can receive shadows
            castShadow // Can cast shadows
            raycast={meshBounds} // Uses bounding box for click detection (performance optimization)
            onClick={onClick} // Handle click events
            onPointerOver={onPointerOver} // Handle mouse enter
            onPointerOut={onPointerOut} // Handle mouse leave
          >
            {/* A sphere with radius 0.4 and 64 segments (high detail) */}
            <sphereGeometry args={[0.4, 64, 64]} />
            {/* Standard material with medium roughness and the imported texture */}
            <meshStandardMaterial roughness={0.5} map={texture} />
          </mesh>
        </a.group>
        {/* Animated point light that changes color with switch state */}
        {/* Illuminates the scene from the knob's position */}
        <a.pointLight intensity={100} distance={1.4} color={color} />

        {/* Shadow component from drei - creates a realistic shadow beneath the knob */}
        <Shadow
          renderOrder={-1000} // Render before other objects (appears underneath)
          position={[0, -1, 0]} // Position below the knob
          rotation={[-Math.PI / 2, 0, 0]} // Rotate to face upward (shadows project down)
          scale={1.5} // Make shadow 1.5x larger than default
        />
      </a.group>
    </group>
  );
}
