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
      <aside className="w-[280px] min-h-full bg-card border-r border-border relative overflow-hidden">
        {/* Cloud decoration */}
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

        {/* Navigation */}
        <div className="flex flex-col gap-2 p-6 relative z-10">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-gradient-cloud flex items-center justify-center shadow-md">
              <Cloud size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">DriveUnity</p>
              <p className="text-xs text-muted-foreground">Cloud Manager</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href.split('/')[1] === 'settings' ? '/settings' : link.href + '/');
              const isDisabled = link.requiresConnection && !isConnected;

              const navItem = (
                <button
                  key={link.href}
                  onClick={() => !isDisabled && handleNavClick(link)}
                  disabled={isDisabled}
                  className={`
                    w-full p-3.5 rounded-xl flex items-center gap-3 transition-all duration-200 text-left
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-accent text-foreground'
                    }
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    ${!isDisabled && !isActive ? 'hover:translate-x-0.5' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center transition-all
                      ${isActive
                        ? 'bg-white/20'
                        : 'bg-primary/10'
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-white' : 'text-primary'}
                    />
                  </div>
                  <span className={`text-sm font-medium flex-1 ${isActive ? 'text-white' : ''}`}>
                    {link.label}
                  </span>

                  {isDisabled && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary border-0">
                      Setup
                    </Badge>
                  )}

                  {isActive && (
                    <div className="w-1 h-5 bg-white/60 rounded-full" />
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
          <div className="p-6 pt-0 relative z-10">
            <div
              className={`
                p-4 rounded-xl border transition-all
                ${isConnected
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-warning/5 border-warning/20'
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

        {/* Cloud illustration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden opacity-30">
          <svg
            viewBox="0 0 280 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-primary"
          >
            <path
              d="M240 60H50c-22.091 0-40-17.909-40-40S27.909-20 50-20h0c22.091 0 40 17.909 40 40 0-22.091 17.909-40 40-40h0c22.091 0 40 17.909 40 40 0-22.091 17.909-40 40-40h30c22.091 0 40 17.909 40 40s-17.909 40-40 40H50"
              fill="currentColor"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </aside>
    </TooltipProvider>
  );
}
