'use client'

import { useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { FlipBoard } from '@/components/landing/locations/flipboard'

export function BillboardModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/glbs/billboard.glb')

  return (
    <group
      ref={groupRef}
      scale={[0.18, 0.145, 0.15]}
      rotation={[0, 5.5, 0]}
      position={[0, -1.4, 0]}
    >
      <primitive object={scene} />

      {/* FlipBoard inside billboard screen */}
      <Html
        transform
        occlude
        position={[0, 16, 6]}
        rotation={[0, Math.PI / 2, 0]}
        distanceFactor={5}
        style={{
          pointerEvents: 'auto',
          transform: 'scale(1.8)',
        }}
      >
        <div
          className='billboard-screen flex items-center justify-center rounded-lg bg-neutral-900 p-3 text-neutral-100 shadow-inner dark:bg-neutral-100 dark:text-neutral-900'
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <FlipBoard />
        </div>
      </Html>
    </group>
  )
}

useGLTF.preload('/glbs/billboard.glb')
