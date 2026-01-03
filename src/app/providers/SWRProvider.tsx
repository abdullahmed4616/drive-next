"use client"

import { SWRConfig } from 'swr'
import { swrConfig, fetcher } from '@/lib/swr'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ ...swrConfig, fetcher }}>
      {children}
    </SWRConfig>
  )
}
