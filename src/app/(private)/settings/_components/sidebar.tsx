import { CreditCard, User, Bell, Shield, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const PRIMARY_COLOR = '#6B9ADF'
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)'

interface SettingsNavItem {
    label: string
    icon: any
    href: string
}

const settingsNavItems: SettingsNavItem[] = [
    {
        label: 'Subscription & Billing',
        icon: CreditCard,
        href: '/settings/paddlePayment',
    },
    {
        label: 'Profile Settings',
        icon: User,
        href: '/settings/',
    },
    {
        label: 'Notifications',
        icon: Bell,
        href: '/settings/',
    },
    {
        label: 'Privacy & Security',
        icon: Shield,
        href: '/settings/',
    },
    {
        label: 'General Settings',
        icon: Settings,
        href: '/settings/',
    },
]

export const SettingsSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${BORDER_COLOR}`,
                boxShadow: '0 4px 16px rgba(107, 154, 223, 0.12)',
            }}
        >
            {settingsNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                    <button
                        key={item.href}
                        onClick={() => router.push(item.href)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: isActive ? `linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}25 100%)` : 'transparent',
                            color: isActive ? PRIMARY_COLOR : '#000',
                            textAlign: 'left',
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.background = `${PRIMARY_COLOR}10`
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.background = 'transparent'
                            }
                        }}
                    >
                        <Icon size={20} />
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}
