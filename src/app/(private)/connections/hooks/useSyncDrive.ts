import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ driveId }: SyncDriveParams) => syncDrive(driveId),
    onSuccess: (data) => {
      notifications.show({
        title: 'Sync Complete',
        message: data.message || 'Your drive has been synced successfully',
        color: 'green',
      });

      queryClient.invalidateQueries({ queryKey: ['connected-drives'] });
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Sync Failed',
        message: error.message || 'Failed to sync drive. Please try again.',
        color: 'red',
        autoClose: 7000,
      });
    },
  });
}