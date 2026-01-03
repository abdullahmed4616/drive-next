'use client';

import useSWR from 'swr';
import { DateRangeFilter, DateRangeResponse, DateRangeInfoResponse } from '@/app/(private)/files/types/File.types';

export const useDateRange = (filter: DateRangeFilter, userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId && (!!filter.startDate || !!filter.endDate);

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? ['dateRange', filter, userId, driveId] : null,
    async () => {
      if (!userId || !driveId) {
        return {
          files: [],
          statistics: null,
          groupedByPeriod: null,
          filesByMonth: [],
          filter: { startDate: null, endDate: null, daysInRange: null },
        };
      }

      if (!filter.startDate && !filter.endDate) {
        return {
          files: [],
          statistics: null,
          groupedByPeriod: null,
          filesByMonth: [],
          filter: { startDate: null, endDate: null, daysInRange: null },
        };
      }

      const response = await fetch('/api/googleDrive/filters/dateRange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          driveId,
          startDate: filter.startDate,
          endDate: filter.endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to filter files by date range');
      }

      const data: DateRangeResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to filter files by date range');
      }

      return {
        files: data.files,
        statistics: data.statistics,
        groupedByPeriod: data.groupedByPeriod,
        filesByMonth: data.filesByMonth,
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

export const useDateRangeInfo = (userId?: string, driveId?: string | null) => {
  const enabled = !!userId && !!driveId;

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? ['dateRangeInfo', userId, driveId] : null,
    async () => {
      if (!userId || !driveId) {
        return {
          dateRanges: null,
          totalFiles: 0,
        };
      }

      const response = await fetch(
        `/api/googleDrive/filters/dateRange?userId=${userId}&driveId=${driveId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch date range information');
      }

      const data: DateRangeInfoResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch date range information');
      }

      return {
        dateRanges: data.dateRanges,
        totalFiles: data.totalFiles,
      };
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 10,
    }
  );

  return { data, error, isLoading, mutate };
};
