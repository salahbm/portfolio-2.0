'use client'

import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { BillboardScene } from './billboard-scene'

export function Billboard3D() {
  return (
    <div className='h-[800px] w-[800px]'>
      <Canvas
        camera={{ position: [0, 10, 25], fov: 20 }}
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <ambientLight intensity={0.8} />

        <Suspense fallback={null}>
          <BillboardScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
