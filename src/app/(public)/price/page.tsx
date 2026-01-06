import React from 'react'
import Pricing from './content'
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground'
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons'
import { DecorativeShapes } from '@/app/components/decorative/DecorativeShapes'

const page = () => {
  return (
      <GlassmorphicBackground>
          <FloatingIcons />
          <DecorativeShapes />
          <Pricing/>
      </GlassmorphicBackground>
  )
}

export default page
