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
      scale={[0.18, 0.145, 0.15]}
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

      {/* FlipBoard integrated seamlessly into billboard screen */}
      <Html
        transform
        occlude
        position={[0, 16, 6]} // perfectly flush with screen surface
        rotation={[0, Math.PI / 2, 0]}
        distanceFactor={5} // adjusted for perfect scale match
        style={{
          pointerEvents: 'auto',
          transform: 'scale(1.8)',
          zIndex: 1,
        }}
        className='billboard-flipboard-container'
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'hsl(0 0% 8%)', // match billboard screen
            padding: '10px',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          <FlipBoard />
        </div>
      </Html>
    </group>
  )
}

useGLTF.preload('/glbs/billboard.glb')
