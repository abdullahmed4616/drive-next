import { useQuery } from '@tanstack/react-query';
import { DuplicateResponse } from '@/app/(private)/files/types/File.types';

export const checkDuplicates = (userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ["duplicates", userId, driveId],
    queryFn: async (): Promise<DuplicateResponse> => {
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
    enabled: !!userId && !!driveId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};