// useConnectedDrives.ts - Updated types and hooks
"use client";

import useSWR, { mutate as globalMutate } from 'swr';
import { useState } from 'react';
import { toast } from '@/app/components/ui/use-toast';

export interface ConnectedDrive {
  id: string;
  gmailAccount: string;
  createdAt: string;
  updatedAt: string | null;
}

interface SubscriptionInfo {
  maxConnectedDrives: number;
  tier: string;
  packageName: string;
  canAddMore: boolean;
  remainingSlots: number;
}

interface DrivesResponse {
  success: boolean;
  drives: ConnectedDrive[];
  totalCount: number;
  subscription?: SubscriptionInfo;
}

interface DeleteDriveParams {
  driveId: string;
}

export function useConnectedDrives() {
  const { data, error, isLoading, mutate } = useSWR<DrivesResponse>(
    '/api/googleDrive/connect',
    async (url: string) => {
      const response = await fetch(url, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch connected drives');
      }

      return response.json();
    }
  );

  return { data, error, isLoading, mutate };
}

export function useDeleteDrive() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteDrive = async ({ driveId }: DeleteDriveParams) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/googleDrive/connect?driveId=${driveId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to disconnect drive');
      }

      const result = await response.json();

      // Revalidate the data
      await globalMutate('/api/googleDrive/connect');
      await globalMutate((key) => typeof key === 'string' && key.startsWith('/api/googleDrive/fileManagement'));

      toast({
        title: 'Success',
        description: 'Drive disconnected successfully',
      });

      return result;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to disconnect drive',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteDrive, isDeleting };
}
