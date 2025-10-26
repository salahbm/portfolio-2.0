'use client'

import { useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { FlipBoard } from '@/components/flipboard'

export function BillboardModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/glbs/billboard.glb')

  return (
    <group
      ref={groupRef}
      scale={[0.18, 0.145, 0.16]}
      rotation={[0, 5.5, 0]} // faces camera
      position={[0, -1.4, 0]}
    >
      <primitive object={scene} />

      <rectAreaLight
        args={['#ffffff', 15, 3, 1]}
        position={[0, 13.6, -0.4]} // just in front of screen
        rotation={[0, 1.6, 0]}
        intensity={15}
      />

      {/* FlipBoard sits flush against front face */}
      <Html
        transform
        occlude
        position={[0, 14.63, 2.05]} // center of screen area
        rotation={[0, Math.PI / 2, 0]}
        distanceFactor={5.5} // smaller = larger in world space
        style={{
          pointerEvents: 'auto',
          width: '470px',
          height: '300px',
          transform: 'scale(2.12)',
          zIndex: 1,
        }}
      >
        <FlipBoard />
      </Html>
    </group>
  )
}

useGLTF.preload('/glbs/billboard.glb')
