'use client';

import useSWR from 'swr';
import { MimeTypeResponse } from "@/app/(private)/files/types/File.types";

export const useMimeType = (userId: any, driveId?: string | null) => {
  const enabled = !!driveId;

  const { data, error, isLoading, mutate } = useSWR(
    enabled ? `/api/googleDrive/filters/mimetype?userId=${userId}&driveId=${driveId}` : null,
    async (url: string) => {
      const response = await fetch(url);

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
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 10,
    }
  );

  return { data, error, isLoading, mutate };
};
