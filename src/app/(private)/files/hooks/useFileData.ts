'use client';

import useSWR from 'swr';
import { FileDataResponse } from '@/app/(private)/files/types/File.types';

export const useFileData = (userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId;

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? `/api/googleDrive/fileManagement?userId=${userId}&driveId=${driveId}` : null,
    async (url: string) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch file data');
      }

      const data: FileDataResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch file data');
      }

      return {
        files: data.fileData,
        total: data.fileData.length,
      };
    },
    {
      revalidateOnFocus: true,
      dedupingInterval: 1000 * 60 * 5,
    }
  );

  return { data, error, isLoading, mutate };
};
