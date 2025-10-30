'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { BillboardModel } from './billboard-model'

function SceneContent() {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const billboardRef = useRef<THREE.Group>(null)

  // Animate gentle up/down tilt
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (billboardRef.current) {
      billboardRef.current.rotation.x = Math.sin(t * 0.5) * 0.03
    }
    if (lightRef.current) {
      const angle = t * 0.3
      lightRef.current.position.x = Math.sin(angle) * 8
      lightRef.current.position.z = Math.cos(angle) * 8
      lightRef.current.target.position.set(0, 0, 0)
      lightRef.current.target.updateMatrixWorld()
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight color='#ffffff' groundColor='#2a2a2a' intensity={0.5} />

      <rectAreaLight
        position={[0, 8, 7]}
        width={10}
        height={5}
        intensity={3}
        color='#ffffff'
      />

      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={<Html center>Loading billboard...</Html>}>
        <group ref={billboardRef}>
          <BillboardModel />
        </group>
      </Suspense>

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
    <div className='h-[800px] w-[800px]'>
      <Canvas
        shadows
        camera={{ position: [0, 10, 25], fov: 20 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <SceneContent />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={12}
          maxDistance={18}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-0.05}
          maxAzimuthAngle={0.05}
          rotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
          makeDefault
        />
      </Canvas>
    </div>
  )
}
