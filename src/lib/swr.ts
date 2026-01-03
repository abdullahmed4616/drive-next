import { SWRConfiguration } from 'swr'

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  dedupingInterval: 2000,
}

// Default fetcher for SWR
export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
  })

  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

// Helper for mutations (similar to useMutation from React Query)
export async function mutate<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Mutation failed')
  }

  return response.json()
}
