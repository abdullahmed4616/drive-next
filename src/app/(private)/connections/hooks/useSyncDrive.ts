'use client';

import React from 'react';
import { mutate as globalMutate } from 'swr';
import { useState } from 'react';
import { toast } from '@/app/components/ui/use-toast';

interface SyncDriveParams {
  driveId: string;
}

interface SyncDriveResponse {
  status: string;
  message: string;
}

async function syncDrive(driveId: string): Promise<SyncDriveResponse> {
  const response = await fetch('/api/googleDrive/metadata', {
    method: 'POST'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to sync drive');
  }

  return response.json();
}

export function useSyncDrive() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async ({ driveId }: SyncDriveParams) => {
    setIsLoading(true);
    try {
      const data = await syncDrive(driveId);

      // Revalidate related queries
      await globalMutate('/api/googleDrive/connect');
      await globalMutate((key) => typeof key === 'string' && key.includes('/api/googleDrive/fileManagement'));

      toast({
        title: 'Sync Complete',
        description: data.message || 'Your drive has been synced successfully',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Sync Failed',
        description: error.message || 'Failed to sync drive. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
