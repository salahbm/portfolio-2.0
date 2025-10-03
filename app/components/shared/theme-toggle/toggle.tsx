import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/web';
import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';

import { Switch } from './switch';
import styles from './theme.module.css';

function ThemeToggle() {
  const [toggle, set] = useState(0);
  // Set up a shared spring which simply animates the toggle above
  // We use this spring to interpolate all the colors, position and rotations
  const [{ x }] = useSpring(
    { x: toggle, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } },
    [toggle]
  );

  const color = x.to([0, 1], ['#7fffd4', '#ff2']);

  return (
    <div className={styles.container}>
      <Canvas
        orthographic // Use orthographic projection (no perspective distortion)
        shadows // Enable shadow rendering
        dpr={[1, 2]} // Device pixel ratio: use 1 on low-end devices, 2 on high-end
        camera={{
          // Camera settings to make the switch face the user:
          zoom: 60, // Higher zoom = closer view (like zooming in)
          position: [20, 180, 0], // Position camera directly in front of the switch
          // x: 0 (centered horizontally)
          // y: 0 (centered vertically)
          // z: 10 (distance from the scene - positive z is toward the viewer)
          fov: 105, // Field of view in degrees (lower = less perspective distortion)
          // Note: fov has less effect in orthographic mode but still matters for internal calculations
        }}
      >
        {/* Ambient light provides overall soft illumination to the entire scene */}
        <ambientLight intensity={0.2} /> {/* Slightly increased for better visibility */}
        {/* Main directional light - like sunlight, coming from front-right-top */}
        <directionalLight position={[5, 5, 10]} intensity={1} />
        {/* Animated directional light that changes color based on toggle state */}
        {/* Coming from behind to create rim lighting effect */}
        <a.directionalLight position={[0, 2, -10]} intensity={0.5} color={color} />
        {/* Animated point light that changes color based on toggle state */}
        {/* Positioned in front of the switch to illuminate it directly */}
        <a.pointLight position={[0, 0, 8]} distance={10} intensity={3} color={color} />
        {/* Animated spotlight that casts shadows and changes color */}
        <a.spotLight
          color={color}
          position={[-10, 180, 10]} // Positioned above and in front for dramatic lighting
          angle={0.2} // Wider angle for broader illumination
          intensity={1.5} // Slightly reduced to prevent washing out
          shadow-mapSize-width={2048} // High-resolution shadow map
          shadow-mapSize-height={2048} // High-resolution shadow map
          shadow-bias={-0.00001} // Prevents shadow acne (visual artifacts)
          castShadow // Enable shadow casting
          target-position={[0, 0, 0]} // Points directly at the switch
        />
        {/* Valley background is now applied as CSS background to the container */}
        {/* Clear background to ensure visibility of all elements */}
        <mesh position={[0, 0, -10]} renderOrder={-2000}>
          <planeGeometry args={[50, 50]} />
          <a.meshBasicMaterial color={x.to([0, 1], ['#e6f7ff', '#ff9'])} />
        </mesh>
        <Suspense fallback={null}>
          <Switch x={x} set={set} />
        </Suspense>
        {/* Ground plane that receives shadows */}
        <mesh
          receiveShadow // Enable shadow receiving
          renderOrder={1000} // Render after other objects
          position={[0, -1.5, 0]} // Positioned below the switch
          rotation={[-Math.PI / 2, 0, 0]} // Rotated to be horizontal (facing up)
        >
          <planeGeometry args={[15, 15]} /> {/* Larger plane for better shadow area */}
          <a.shadowMaterial
            transparent
            opacity={x.to(x => 0.15 + x * 0.2)} // Dynamic opacity based on toggle state
          />
        </mesh>
      </Canvas>
    </div>
  );
}

export { ThemeToggle };
