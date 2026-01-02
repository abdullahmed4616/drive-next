import { useQuery } from '@tanstack/react-query';
import { FileSizeFilter, FileSizeResponse, FileSizeStatsResponse } from '@/app/(private)/files/types/File.types';

export const useFileSize = (filter?: FileSizeFilter, userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ['fileSize', filter, userId, driveId],
    queryFn: async () => {
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
    enabled: !!userId && !!driveId && (!!filter?.minSize || !!filter?.maxSize),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFileSizeStats = (userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ['fileSizeStats', userId, driveId],
    queryFn: async () => {
      if (!userId || !driveId) {
        return {
          statistics: null,
          commonSizeRanges: null,
        };
      }

      const response = await fetch(`/api/googleDrive/filters/fileSize?userId=${userId}&driveId=${driveId}`, {
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
    enabled: !!userId && !!driveId,
    staleTime: 1000 * 60 * 10,
  });
};