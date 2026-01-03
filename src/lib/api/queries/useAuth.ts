'use client';

import useSWR from 'swr';

export function useAuthStatus() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/googleDrive/auth/status',
    async (url: string) => {
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (!response.ok) return { connected: false, user: null };
      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000,
      shouldRetryOnError: false,
    }
  );

  return { data, error, isLoading, mutate };
}
