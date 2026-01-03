'use client';

import useSWR from 'swr';

export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/googleDrive/dashboard',
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return { data, error, isLoading, mutate };
}
