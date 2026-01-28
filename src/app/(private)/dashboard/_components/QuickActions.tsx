'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Search, BarChart3, FolderOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    title: 'Connect New Drive',
    description: 'Add another Google Drive account',
    icon: Plus,
    href: '/connections',
    color: '#10B981',
  },
  {
    title: 'Smart Search',
    description: 'Find files with AI-powered search',
    icon: Sparkles,
    href: '/search',
    color: '#8B5CF6',
  },
  {
    title: 'View Analytics',
    description: 'Storage insights and reports',
    icon: BarChart3,
    href: '/analytics',
    color: '#F59E0B',
  },
  {
    title: 'Manage Files',
    description: 'Browse and organize your files',
    icon: FolderOpen,
    href: '/files',
    color: '#6B9ADF',
  },
];

export default function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <Card
                className="h-full transition-all duration-300 cursor-pointer hover:shadow-lg group"
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  background: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ background: `${action.color}15` }}
                      >
                        <Icon size={24} style={{ color: action.color }} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                        style={{ color: action.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
