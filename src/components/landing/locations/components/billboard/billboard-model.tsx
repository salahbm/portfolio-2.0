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
    </group>
  )
}

useGLTF.preload('/glbs/billboard.glb')
