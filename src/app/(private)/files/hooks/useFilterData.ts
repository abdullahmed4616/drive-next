// useFilterData.ts - Updated
import { useMemo } from 'react';
import { FilterState, UseFilterDataReturn } from '@/app/(private)/files/types/File.types';
import { useFileData } from './useFileData';
import { useDateRange } from './useDateRange';
import { useFileSize } from './useFileSize';
import { useSmartSearch } from './useSmartSearch';

export const useFilterData = (
  userId: string | undefined,
  filters: FilterState,
  driveId: string | null | undefined
): UseFilterDataReturn => {
  const {
    data: allFilesData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
    refetch: refetchAll,
  } = useFileData(userId, driveId);

  const {
    data: dateRangeData,
    isLoading: isLoadingDate,
    isError: isErrorDate,
    error: errorDate,
  } = useDateRange(
    {
      startDate: filters.dateRange?.startDate,
      endDate: filters.dateRange?.endDate,
    },
    userId,
    driveId
  );

  const {
    data: fileSizeData,
    isLoading: isLoadingSize,
    isError: isErrorSize,
    error: errorSize,
  } = useFileSize(
    {
      minSize: filters.fileSize?.minSize,
      maxSize: filters.fileSize?.maxSize,
    },
    userId,
    driveId
  );

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
  } = useSmartSearch(filters.searchQuery || '', userId, driveId);

  const filteredFiles = useMemo(() => {
    if (filters.searchQuery && searchData?.files) {
      return searchData.files;
    }

    if (
      (filters.dateRange?.startDate || filters.dateRange?.endDate) &&
      dateRangeData?.files
    ) {
      let files = dateRangeData.files;

      if (filters.mimeTypes && filters.mimeTypes.length > 0) {
        files = files.filter((file) =>
          filters.mimeTypes!.includes(file.mimeType)
        );
      }

      if (filters.fileSize?.minSize || filters.fileSize?.maxSize) {
        files = files.filter((file) => {
          const size = file.fileSize;
          if (filters.fileSize?.minSize && size < filters.fileSize.minSize) {
            return false;
          }
          if (filters.fileSize?.maxSize && size > filters.fileSize.maxSize) {
            return false;
          }
          return true;
        });
      }

      return files;
    }

    if (
      (filters.fileSize?.minSize || filters.fileSize?.maxSize) &&
      fileSizeData?.files
    ) {
      let files = fileSizeData.files;

      if (filters.mimeTypes && filters.mimeTypes.length > 0) {
        files = files.filter((file) =>
          filters.mimeTypes!.includes(file.mimeType)
        );
      }

      return files;
    }

    let files = allFilesData?.files || [];

    if (filters.mimeTypes && filters.mimeTypes.length > 0) {
      files = files.filter((file) =>
        filters.mimeTypes!.includes(file.mimeType)
      );
    }

    return files;
  }, [
    filters,
    allFilesData,
    dateRangeData,
    fileSizeData,
    searchData,
  ]);

  const isLoading = useMemo(() => {
    if (filters.searchQuery) return isLoadingSearch;
    if (filters.dateRange?.startDate || filters.dateRange?.endDate)
      return isLoadingDate;
    if (filters.fileSize?.minSize || filters.fileSize?.maxSize)
      return isLoadingSize;
    return isLoadingAll;
  }, [
    filters,
    isLoadingAll,
    isLoadingDate,
    isLoadingSize,
    isLoadingSearch,
  ]);

  const isError = useMemo(() => {
    if (filters.searchQuery) return isErrorSearch;
    if (filters.dateRange?.startDate || filters.dateRange?.endDate)
      return isErrorDate;
    if (filters.fileSize?.minSize || filters.fileSize?.maxSize)
      return isErrorSize;
    return isErrorAll;
  }, [
    filters,
    isErrorAll,
    isErrorDate,
    isErrorSize,
    isErrorSearch,
  ]);

  const error = useMemo(() => {
    if (filters.searchQuery) return errorSearch;
    if (filters.dateRange?.startDate || filters.dateRange?.endDate)
      return errorDate;
    if (filters.fileSize?.minSize || filters.fileSize?.maxSize)
      return errorSize;
    return errorAll;
  }, [filters, errorAll, errorDate, errorSize, errorSearch]);

  return {
    files: filteredFiles,
    isLoading,
    isError,
    error: error as Error | null,
    totalFiles: filteredFiles.length,
    refetch: refetchAll,
  };
};