import React from 'react'

import {
  QueryClient,
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const QueryClientProvider = ({ children }: any): JSX.Element => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>
}
