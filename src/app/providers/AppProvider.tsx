'use client';

import { SessionProvider } from './SessionProvider';
import { SWRProvider } from './SWRProvider';
import { Toaster } from '@/app/components/ui/toaster';
import { TooltipProvider } from '@/app/components/ui/tooltip';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </SWRProvider>
    </SessionProvider>
  );
}