import { useQuery } from '@tanstack/react-query';
import { FileDataResponse } from '@/app/(private)/files/types/File.types';

export const useFileData = (userId?: string, driveId?: string | null) => {
  return useQuery({
    queryKey: ['fileData', userId, driveId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }

      if (!driveId) {
        return {
          files: [],
          total: 0,
        };
      }

      const response = await fetch(`/api/googleDrive/fileManagement?userId=${userId}&driveId=${driveId}`);

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
    enabled: !!userId && !!driveId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};