
import React from 'react'
import CommingSoonPage from "@/app/components/ui/CommingSoon"
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground'
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons'

const page = () => {
  return (
    <GlassmorphicBackground>
      <FloatingIcons />
      <CommingSoonPage/>
    </GlassmorphicBackground>
  )
}

export default page
