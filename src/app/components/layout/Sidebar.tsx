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
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/app/components/ui/use-toast';
import { Badge } from '@/app/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

// --- Define the Uniform Light Blue Color Scheme ---
const PRIMARY_COLOR = '#6B9ADF'; // A pleasing light blue
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)'; // Light blue with low opacity
const BORDER_COLOR = 'rgba(107, 154, 223, 0.2)'; // Light blue with low opacity

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
        <aside
            className="w-[280px] min-h-screen border-r p-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
              borderRight: `1px solid ${BORDER_COLOR}`,
            }}
        >
          <div className="flex flex-col gap-2 relative z-10">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              const isDisabled = link.requiresConnection && !isConnected;

              const navItem = (
                  <div
                      key={link.href}
                      onClick={() => !isDisabled && handleNavClick(link)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all relative overflow-hidden fade-in ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                          !isDisabled && !isActive ? 'hover:translate-x-1' : ''
                      }`}
                      style={{
                        background: isActive
                            ? PRIMARY_COLOR
                            : 'white',
                        border: `1px solid ${isActive ? 'transparent' : BORDER_COLOR}`,
                        boxShadow: isActive
                            ? `0 8px 24px ${ACCENT_BG_COLOR}`
                            : `0 2px 8px ${ACCENT_BG_COLOR}`,
                        animationDelay: `${index * 0.05}s`,
                      }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                            style={{
                              background: isActive
                                  ? 'rgba(255, 255, 255, 0.2)'
                                  : ACCENT_BG_COLOR,
                            }}
                        >
                          <Icon
                              size={20}
                              color={isActive ? 'white' : PRIMARY_COLOR}
                              strokeWidth={2}
                          />
                        </div>
                        <span
                            className={`text-sm transition-all ${
                                isActive ? 'font-semibold text-white' : 'font-medium'
                            }`}
                        >
                          {link.label}
                        </span>
                      </div>

                      {isDisabled && (
                          <Badge
                              className="text-xs"
                              style={{
                                background: PRIMARY_COLOR,
                                color: 'white',
                              }}
                          >
                            Setup
                          </Badge>
                      )}
                    </div>

                    {isActive && (
                        <div
                            className="absolute top-1/2 right-2 -translate-y-1/2 w-1 h-5 bg-white rounded-full opacity-60"
                        />
                    )}
                  </div>
              );

              return isDisabled ? (
                  <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <div>{navItem}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Connect a drive to access this feature
                    </TooltipContent>
                  </Tooltip>
              ) : (
                  navItem
              );
            })}
          </div>

          {!checking && (
              <div
                  className="mt-6 p-4 rounded-2xl relative z-10"
                  style={{
                    background: isConnected
                        ? ACCENT_BG_COLOR
                        : 'rgba(242, 153, 74, 0.1)',
                    border: `1px solid ${isConnected ? BORDER_COLOR : 'rgba(242, 153, 74, 0.2)'}`,
                  }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: isConnected ? PRIMARY_COLOR : '#f2994a',
                      }}
                  />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
          )}

          {/* Decorative background */}
          <div
              className="absolute -bottom-12 -left-12 w-[200px] h-[200px] rounded-full opacity-5 blur-[40px] pointer-events-none"
              style={{
                background: PRIMARY_COLOR,
              }}
          />

          <style jsx global>{`
            @keyframes floating {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-6px);
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .fade-in {
              animation: fadeIn 0.4s ease-out forwards;
            }
          `}</style>
        </aside>
      </TooltipProvider>
  );
}
