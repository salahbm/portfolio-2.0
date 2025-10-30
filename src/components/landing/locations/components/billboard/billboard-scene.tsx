'use client'

import { BillboardModel } from './billboard-model'
import { OrbitControls } from '@react-three/drei'

export function BillboardScene() {
  return (
    <>
      <BillboardModel />

      {/* Optional manual control — no animation */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}
