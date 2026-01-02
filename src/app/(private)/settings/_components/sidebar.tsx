import { Stack, NavLink } from '@mantine/core'
import { IconCreditCard, IconUser, IconBell, IconShield, IconSettings } from '@tabler/icons-react'
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
        icon: IconCreditCard,
        href: '/settings/paddlePayment',
    },
    {
        label: 'Profile Settings',
        icon: IconUser,
        href: '/settings/',
    },
    {
        label: 'Notifications',
        icon: IconBell,
        href: '/settings/',
    },
    {
        label: 'Privacy & Security',
        icon: IconShield,
        href: '/settings/',
    },
    {
        label: 'General Settings',
        icon: IconSettings,
        href: '/settings/',
    },
]

export const SettingsSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <Stack
            gap="xs"
            style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${BORDER_COLOR}`,
                boxShadow: '0 4px 16px rgba(107, 154, 223, 0.12)',
            }}
        >
            {settingsNavItems.map((item) => (
                <NavLink
                    key={item.href}
                    label={item.label}
                    leftSection={<item.icon size={20} />}
                    active={pathname === item.href}
                    onClick={() => router.push(item.href)}
                    style={{
                        borderRadius: '8px',
                        fontWeight: 500,
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    styles={{
                        root: {
                            '&[data-active]': {
                                background: `linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}25 100%)`,
                                color: PRIMARY_COLOR,
                                fontWeight: 600,
                            },
                            '&:hover': {
                                background: `${PRIMARY_COLOR}10`,
                            },
                        },
                        label: {
                            fontSize: '14px',
                        },
                    }}
                />
            ))}
        </Stack>
    )
}