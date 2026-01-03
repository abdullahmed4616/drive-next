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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-40 h-[60px] border-b bg-gradient-to-r from-[#667eea] to-[#764ba2]"
      >
        <div className="flex h-full items-center">
          <div className="flex items-center gap-2 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden text-white hover:bg-white/20"
              onClick={() => setMobileOpened(!mobileOpened)}
            >
              {mobileOpened ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white hover:bg-white/20"
              onClick={() => setDesktopOpened(!desktopOpened)}
            >
              <Menu size={20} />
            </Button>
          </div>
          <PrivateNavbar />
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {desktopOpened && (
          <div className="hidden sm:block">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        {mobileOpened && (
          <div className="fixed inset-0 z-30 sm:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpened(false)}
            />
            <div className="absolute left-0 top-[60px] bottom-0 w-[280px] bg-white shadow-xl">
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
