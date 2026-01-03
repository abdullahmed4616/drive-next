"use client";

import useSWR from "swr";
import { AuthStatus } from "@/app/(private)/types/authTypes";

export function useAuthStatus() {
  const { data, error, isLoading, mutate } = useSWR<AuthStatus>(
    "/api/googleDrive/auth/status",
    async (url: string) => {
      const response = await fetch(url, {
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          return {
            authenticated: false,
            user: null,
            connected: false,
            accountsCount: 0,
            accounts: [],
          };
        }
        throw new Error("Failed to fetch auth status");
      }

      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5,
      shouldRetryOnError: false,
    }
  );

  return { data, error, isLoading, mutate };
}

export function useUserId() {
  const { data, isLoading, error } = useAuthStatus();

  return {
    userId: data?.user?.id ?? null,
    email: data?.user?.email ?? null,
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
    error,
  };
}

export function useGoogleDriveStatus() {
  const { data, isLoading, error } = useAuthStatus();

  return {
    connected: data?.connected ?? false,
    accountsCount: data?.accountsCount ?? 0,
    accounts: data?.accounts ?? [],
    isLoading,
    error,
  };
}