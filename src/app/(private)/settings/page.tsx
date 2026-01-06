'use client'

import { SettingsSidebar } from '@/app/(private)/settings/_components/sidebar'
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground'
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons'

export default function Page() {
    return (
        <GlassmorphicBackground>
            <FloatingIcons />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="space-y-3">
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Settings
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <SettingsSidebar />
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3">
                            <div className="flex flex-col gap-6 backdrop-blur-2xl bg-white/40 border border-white/30 rounded-2xl p-8 lg:p-12 shadow-2xl min-h-[400px]">
                                <p className="text-lg font-medium text-muted-foreground">
                                    Select a setting from the sidebar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassmorphicBackground>
    )
}
