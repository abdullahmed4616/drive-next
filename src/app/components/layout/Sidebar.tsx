'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PlugZap,
  Files,
  Search,
  BarChart3,
  Settings,
  Cloud,
} from 'lucide-react';
import { useToast } from '@/app/components/ui/use-toast';
import { Badge } from '@/app/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

const navLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    requiresConnection: true,
  },
  {
    label: 'Connections',
    href: '/connections',
    icon: PlugZap,
    requiresConnection: false,
  },
  {
    label: 'File Management',
    href: '/files',
    icon: Files,
    requiresConnection: true,
  },
  {
    label: 'AI Search',
    href: '/search',
    icon: Search,
    requiresConnection: true,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    requiresConnection: true,
  },
  {
    label: 'Settings',
    href: '/settings/paddlePayment',
    icon: Settings,
    requiresConnection: false,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/googleDrive/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.connected && data.accountsCount > 0);
      }
    } catch (error) {
      console.error('Connection check failed:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.requiresConnection && !isConnected) {
      toast({
        title: 'Connection Required',
        description: 'Please connect a drive first to access this feature',
        variant: 'default',
      });
      router.push('/connections');
      return;
    }

    router.push(link.href);
  };

  return (
    <TooltipProvider>
      <aside className="w-[260px] min-h-full bg-card/50 border-r border-border relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/3 blur-3xl pointer-events-none" />

        {/* Navigation */}
        <div className="flex flex-col gap-2 p-5 relative z-10">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/15">
              <Cloud size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">DriveUnity</p>
              <p className="text-[11px] text-muted-foreground">Cloud Manager</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href.split('/')[1] === 'settings' ? '/settings' : link.href + '/');
              const isDisabled = link.requiresConnection && !isConnected;

              const navItem = (
                <button
                  key={link.href}
                  onClick={() => !isDisabled && handleNavClick(link)}
                  disabled={isDisabled}
                  className={`
                    w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 text-left
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'hover:bg-accent text-foreground'
                    }
                    ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    ${!isDisabled && !isActive ? 'hover:translate-x-0.5' : ''}
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all
                      ${isActive ? 'bg-white/20' : 'bg-primary/8'}
                    `}
                  >
                    <Icon
                      size={16}
                      className={isActive ? 'text-white' : 'text-primary'}
                    />
                  </div>
                  <span className={`text-sm font-medium flex-1 ${isActive ? 'text-white' : ''}`}>
                    {link.label}
                  </span>

                  {isDisabled && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-primary/8 text-primary border-0">
                      Setup
                    </Badge>
                  )}

                  {isActive && (
                    <div className="w-1 h-4 bg-white/50 rounded-full" />
                  )}
                </button>
              );

              return isDisabled ? (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <div>{navItem}</div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    Connect a drive to access this feature
                  </TooltipContent>
                </Tooltip>
              ) : (
                navItem
              );
            })}
          </nav>
        </div>

        {/* Status Card */}
        {!checking && (
          <div className="p-5 pt-0 relative z-10">
            <div
              className={`
                p-4 rounded-xl border transition-all
                ${isConnected
                  ? 'bg-primary/5 border-primary/15'
                  : 'bg-warning/5 border-warning/15'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`
                    w-2 h-2 rounded-full animate-pulse
                    ${isConnected ? 'bg-primary' : 'bg-warning'}
                  `}
                />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {isConnected ? 'Connected & Ready' : 'Setup Required'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isConnected
                  ? 'All systems operational'
                  : 'Connect a drive to get started'}
              </p>
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
