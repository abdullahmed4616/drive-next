'use client';

import { Settings, User, CreditCard, Bell, Shield, Cog } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

const settingsCategories = [
  {
    title: 'Profile Settings',
    description: 'Manage your personal information and account details',
    icon: User,
    href: '/settings/profile',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Subscription & Billing',
    description: 'View your plan, manage payments, and billing history',
    icon: CreditCard,
    href: '/settings/billing',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
  {
    title: 'Notifications',
    description: 'Configure how and when you receive notifications',
    icon: Bell,
    href: '/settings/notifications',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Privacy & Security',
    description: 'Manage your security settings and connected apps',
    icon: Shield,
    href: '/settings/privacy-security',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    title: 'General Settings',
    description: 'Customize language, timezone, and appearance',
    icon: Cog,
    href: '/settings/general',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={24} className="text-primary" />
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
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${category.iconBg}`}>
                          <Icon size={24} className={category.iconColor} />
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
