'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import PrivateNavbar from '@/app/components/layout/PrivateNavbar';
import Sidebar from '@/app/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';

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
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  const PRIMARY_COLOR = '#6B9ADF';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)' }}>
      {/* Header */}
      <PrivateNavbar />

      <div className="flex relative">
        {/* Sidebar Toggle Button - Desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex fixed left-4 top-24 z-50 backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: `1px solid rgba(107, 154, 223, 0.2)`,
            boxShadow: '0 4px 12px rgba(107, 154, 223, 0.15)',
          }}
          onClick={() => setDesktopOpened(!desktopOpened)}
        >
          {desktopOpened ? <X size={20} color={PRIMARY_COLOR} /> : <Menu size={20} color={PRIMARY_COLOR} />}
        </Button>

        {/* Sidebar Toggle Button - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-4 top-24 z-50 backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: `1px solid rgba(107, 154, 223, 0.2)`,
            boxShadow: '0 4px 12px rgba(107, 154, 223, 0.15)',
          }}
          onClick={() => setMobileOpened(!mobileOpened)}
        >
          {mobileOpened ? <X size={20} color={PRIMARY_COLOR} /> : <Menu size={20} color={PRIMARY_COLOR} />}
        </Button>

        {/* Desktop Sidebar */}
        {desktopOpened && (
          <div className="hidden md:block sticky top-[70px] h-[calc(100vh-70px)]">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        {mobileOpened && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpened(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-xl">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
