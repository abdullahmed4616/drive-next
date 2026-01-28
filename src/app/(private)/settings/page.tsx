'use client';

import { Settings, User, CreditCard, Bell, Shield, Cog } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const settingsCategories = [
  {
    title: 'Profile Settings',
    description: 'Manage your personal information and account details',
    icon: User,
    href: '/settings/profile',
    color: '#6B9ADF',
  },
  {
    title: 'Subscription & Billing',
    description: 'View your plan, manage payments, and billing history',
    icon: CreditCard,
    href: '/settings/billing',
    color: '#10B981',
  },
  {
    title: 'Notifications',
    description: 'Configure how and when you receive notifications',
    icon: Bell,
    href: '/settings/notifications',
    color: '#F59E0B',
  },
  {
    title: 'Privacy & Security',
    description: 'Manage your security settings and connected apps',
    icon: Shield,
    href: '/settings/privacy-security',
    color: '#8B5CF6',
  },
  {
    title: 'General Settings',
    description: 'Customize language, timezone, and appearance',
    icon: Cog,
    href: '/settings/general',
    color: '#EC4899',
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Card
        style={{
          border: `1px solid ${BORDER_COLOR}`,
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={24} style={{ color: PRIMARY_COLOR }} />
            Settings Overview
          </CardTitle>
          <CardDescription>
            Select a category below to manage your account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settingsCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block"
                >
                  <Card
                    className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    style={{
                      border: `1px solid ${BORDER_COLOR}`,
                      background: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${category.color}15` }}
                        >
                          <Icon size={24} style={{ color: category.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {category.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
