'use client';

import useSWR from 'swr';
import { DuplicateResponse } from '@/app/(private)/files/types/File.types';

export const checkDuplicates = (userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId;

  const { data, error, isLoading, mutate } = useSWR<DuplicateResponse>(
    enabled ? [`/api/googleDrive/filters/duplicates`, userId, driveId] : null,
    async () => {
      if (!userId || !driveId) {
        return {
          success: true,
          data: [],
          count: 0,
          duplicateGroups: [],
        };
      }

      const response = await fetch(
        `/api/googleDrive/filters/duplicates?userId=${userId}&driveId=${driveId}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch duplicate files!');
      }

      const data = await response.json();
      return data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return { data, error, isLoading, mutate };
};
