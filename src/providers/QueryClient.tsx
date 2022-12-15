import {
  QueryClient,
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query'

import React from 'react'

const queryClient = new QueryClient()

export const QueryClientProvider = ({ children }: any): JSX.Element => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>
}
