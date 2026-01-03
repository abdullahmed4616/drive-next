'use client';

import { mutate as globalMutate } from 'swr';
import { useState } from 'react';

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/googleDrive/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Logout failed');

      const result = await response.json();

      // Clear all SWR cache
      globalMutate(() => true, undefined, { revalidate: false });

      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
