// useConnectedDrives.ts - Updated types and hooks
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

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
  return useQuery<DrivesResponse>({
    queryKey: ['connected-drives'],
    queryFn: async () => {
      const response = await fetch('/api/googleDrive/connect', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch connected drives');
      }

      return response.json();
    },
  });
}

export function useDeleteDrive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ driveId }: DeleteDriveParams) => {
      const response = await fetch(`/api/googleDrive/connect?driveId=${driveId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to disconnect drive');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connected-drives'] });
      queryClient.invalidateQueries({ queryKey: ['fileData'] });

      notifications.show({
        title: 'Success',
        message: 'Drive disconnected successfully',
        color: 'green',
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to disconnect drive',
        color: 'red',
      });
    },
  });
}