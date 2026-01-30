'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import PrivateNavbar from '@/app/components/layout/PrivateNavbar';
import Sidebar from '@/app/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Skeleton } from '@/app/components/ui/skeleton';
import { CloudBackground } from '@/app/components/ui/CloudBackground';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopOpened, setDesktopOpened] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !loading && !user) {
      const authUrl = `/auth?redirect=${encodeURIComponent(pathname)}`;
      router.push(authUrl);
    }
  }, [authChecked, loading, user, pathname, router]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/googleDrive/auth/status', {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();

        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-3 text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-3 w-32 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background decorations */}
      <CloudBackground variant="minimal" showFloatingClouds={false} />

      {/* Header */}
      <div className="sticky top-0 z-40">
        <PrivateNavbar />
      </div>

      <div className="flex relative">
        {/* Sidebar Toggle Button - Desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex fixed left-4 top-24 z-50 bg-card/90 backdrop-blur-md border border-border shadow-md hover:shadow-lg hover:bg-card transition-all duration-200"
          onClick={() => setDesktopOpened(!desktopOpened)}
        >
          {desktopOpened ? (
            <X size={18} className="text-muted-foreground" />
          ) : (
            <Menu size={18} className="text-muted-foreground" />
          )}
        </Button>

        {/* Sidebar Toggle Button - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-4 top-24 z-50 bg-card/90 backdrop-blur-md border border-border shadow-md hover:shadow-lg hover:bg-card transition-all duration-200"
          onClick={() => setMobileOpened(!mobileOpened)}
        >
          {mobileOpened ? (
            <X size={18} className="text-muted-foreground" />
          ) : (
            <Menu size={18} className="text-muted-foreground" />
          )}
        </Button>

        {/* Desktop Sidebar */}
        {desktopOpened && (
          <div className="hidden md:block sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {mobileOpened && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpened(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-card shadow-xl border-r border-border">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          <div className="p-6 sm:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
