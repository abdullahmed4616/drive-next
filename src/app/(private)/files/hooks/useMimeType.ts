import { useQuery } from "@tanstack/react-query";
import { MimeTypeResponse } from "@/app/(private)/files/types/File.types";

export const useMimeType = (userId: any, driveId?: string | null) => {
  return useQuery({
    queryKey: ["mimeTypes", userId, driveId],
    queryFn: async () => {
      if (!driveId) {
        return {
          mimeTypes: [],
          groupedByCategory: {},
          totalTypes: 0,
        };
      }

      const response = await fetch(
        `/api/googleDrive/filters/mimetype?userId=${userId}&driveId=${driveId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch MIME types");
      }

      const data: MimeTypeResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch MIME types");
      }

      return {
        mimeTypes: data.mimeTypes,
        groupedByCategory: data.groupedByCategory,
        totalTypes: data.totalTypes,
      };
    },
    enabled: !!driveId,
    staleTime: 1000 * 60 * 10,
  });
};