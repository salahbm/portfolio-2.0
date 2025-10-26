'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { BillboardModel } from './billboard-model'

function SceneContent() {
  const lightRef = useRef<THREE.DirectionalLight>(null)

  // Rotate the directional light subtly with the camera orbit
  useFrame((state) => {
    if (lightRef.current) {
      const angle = state.camera.rotation.y
      lightRef.current.position.x = Math.sin(angle) * 10
      lightRef.current.position.z = Math.cos(angle) * 10
      lightRef.current.target.position.set(0, 0, 0)
      lightRef.current.target.updateMatrixWorld()
    }
  })

  return (
    <>
      {/* Global ambient for indoor feel */}
      <ambientLight intensity={0.3} />
      <hemisphereLight color='#ffffff' groundColor='#2a2a2a' intensity={0.4} />

      {/* Billboard glow simulation */}
      <rectAreaLight
        position={[0, 8, 7]}
        width={10}
        height={5}
        intensity={3}
        color='#ffffff'
      />

      {/* Dynamic main light (rotates with orbit) */}
      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      >
        <primitive object={new THREE.Object3D()} />
      </directionalLight>

      {/* Billboard */}
      <Suspense fallback={<Html center>Loading billboard...</Html>}>
        <BillboardModel />
      </Suspense>

      {/* Soft dynamic contact shadow */}
      <ContactShadows
        position={[0, -1.4, 0.5]}
        opacity={0.55}
        scale={20}
        blur={4}
        far={10}
        resolution={1024}
        color='#2a2a2a'
      />
    </>
  )
}

export function Billboard3D() {
  return (
    <div className='h-[600px] w-[600px]'>
      <Canvas
        shadows
        camera={{ position: [50, 8, 45], fov: 14 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <SceneContent />

        {/* Orbit restricted, smooth camera */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={12}
          maxDistance={16}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 4}
          makeDefault
        />
      </Canvas>
    </div>
  )
}
