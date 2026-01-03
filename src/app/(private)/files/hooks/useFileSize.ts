'use client';

import useSWR from 'swr';
import { FileSizeFilter, FileSizeResponse, FileSizeStatsResponse } from '@/app/(private)/files/types/File.types';

export const useFileSize = (filter?: FileSizeFilter, userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId && (!!filter?.minSize || !!filter?.maxSize);

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? ['fileSize', filter, userId, driveId] : null,
    async () => {
      if (!userId || !driveId) {
        return {
          files: [],
          statistics: null,
          sizeDistribution: null,
          filter: null,
        };
      }

      const response = await fetch('/api/googleDrive/filters/fileSize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          driveId,
          minSize: filter?.minSize,
          maxSize: filter?.maxSize,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to filter files by size');
      }

      const data: FileSizeResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to filter files by size');
      }

      return {
        files: data.files,
        statistics: data.statistics,
        sizeDistribution: data.sizeDistribution,
        filter: data.filter,
      };
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5,
    }
  );

  return { data, error, isLoading, mutate };
};

export const useFileSizeStats = (userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId;

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? `/api/googleDrive/filters/fileSize?userId=${userId}&driveId=${driveId}` : null,
    async (url: string) => {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file size statistics');
      }

      const data: FileSizeStatsResponse = await response.json();

      if (!data.success) {
        throw new Error('Failed to fetch file size statistics');
      }

      return {
        statistics: data.statistics,
        commonSizeRanges: data.commonSizeRanges,
      };
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 10,
    }
  );

  return { data, error, isLoading, mutate };
};
