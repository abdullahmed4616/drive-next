'use client';

import useSWR from 'swr';
import { PaddlePaymentData, SubscribedUser } from '@/app/(private)/settings/paddlePayment/types/types';

export const useSubscriptionData = (userId: string, userEmail: string) => {
  const enabled = !!userId && !!userEmail;

  const { data, error, isLoading, mutate } = useSWR<PaddlePaymentData>(
    enabled ? `/api/paddlePayment/payment?userId=${userId}&userEmail=${userEmail}` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch subscription data');
      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return { data, error, isLoading, mutate };
};

export const useCurrentSubscription = (userId: string) => {
  const enabled = !!userId;

  const { data, error, isLoading, mutate } = useSWR<SubscribedUser>(
    enabled ? `/api/paddlePayment?userId=${userId}` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch current subscription');
      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return { data, error, isLoading, mutate };
};
