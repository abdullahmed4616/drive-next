'use client';

import { SettingsSidebar } from '@/app/(private)/settings/_components/sidebar';

const PRIMARY_COLOR = '#6B9ADF';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SettingsSidebar />
          </div>
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
