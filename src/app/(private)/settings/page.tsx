'use client'

import { SettingsSidebar } from '@/app/(private)/settings/_components/sidebar'

const PRIMARY_COLOR = '#6B9ADF'

export default function Page() {
    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <h1
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            margin: 0,
                        }}
                    >
                        Settings
                    </h1>
                    <div style={{ fontSize: '18px', color: '#868e96', marginTop: '8px' }}>
                        Manage your account settings and preferences
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '24px' }}>
                    <div>
                        <SettingsSidebar />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            padding: '32px',
                            border: '1px solid rgba(107, 154, 223, 0.3)',
                            boxShadow: '0 4px 16px rgba(107, 154, 223, 0.12)',
                            minHeight: '400px',
                        }}
                    >
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#868e96' }}>
                            Select a setting from the sidebar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
