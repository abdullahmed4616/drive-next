import { useQuery } from '@tanstack/react-query';
import { SearchSuggestionsResponse, SmartSearchResponse } from '@/app/(private)/files/types/File.types';

export const useSmartSearch = (query: string, userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ['smartSearch', query, userId, driveId],
    queryFn: async () => {
      if (!userId || !driveId) {
        return {
          files: [],
          statistics: null,
          suggestions: null,
          searchInfo: null,
        };
      }

      if (!query || query.trim().length === 0) {
        return {
          files: [],
          statistics: null,
          suggestions: null,
          searchInfo: null,
        };
      }

      const response = await fetch('/api/googleDrive/filters/smartSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          driveId,
          query: query.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform smart search');
      }

      const data: SmartSearchResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to perform smart search');
      }

      return {
        files: data.files,
        statistics: data.statistics,
        suggestions: data.suggestions,
        searchInfo: data.searchInfo,
        query: data.query,
      };
    },
    enabled: !!userId && !!driveId && !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 2,
  });
};

export const useSearchSuggestions = (userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ['searchSuggestions', userId, driveId],
    queryFn: async () => {
      if (!userId || !driveId) {
        return {
          suggestions: [],
          fileExtensions: [],
          mimeTypes: [],
          totalFiles: 0,
        };
      }

      const response = await fetch(
        `/api/googleDrive/filters/smartSearch?userId=${userId}&driveId=${driveId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search suggestions');
      }

      const data: SearchSuggestionsResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch search suggestions');
      }

      return {
        suggestions: data.suggestions,
        fileExtensions: data.fileExtensions,
        mimeTypes: data.mimeTypes,
        totalFiles: data.totalFiles,
      };
    },
    enabled: !!userId && !!driveId,
    staleTime: 1000 * 60 * 10,
  });
};