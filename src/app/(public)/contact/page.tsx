'use client'
import React from 'react'
import ContactUsPage from "@/app/(public)/contact/content";
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground';
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons';
import { DecorativeShapes } from '@/app/components/decorative/DecorativeShapes';


const page = () => {
  return (
    <GlassmorphicBackground>
        <FloatingIcons />
        <DecorativeShapes />
        <ContactUsPage/>
    </GlassmorphicBackground>
  )
}

export default page
