import React from 'react'
import { DotGrid } from './DotGrid'

export const DotsGrid = () => {
  return (
     <div className="w-full h-full relative">
      <DotGrid
        dotSize={3}
        gap={10}
        baseColor="#271E37"
        activeColor="#38bdf8"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      </div>
  )
}
