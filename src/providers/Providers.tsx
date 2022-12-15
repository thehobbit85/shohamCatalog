import React from 'react'

import { QueryClientProvider } from './QueryClient'
import { FavoritesContextProvider } from './Favorites'
import { PlantsContextProvider } from './Plants'
import { TranslationContextProvider } from './Translations'

export const Providers = ({ children }: any): JSX.Element => {
  return (
    <QueryClientProvider>
      <TranslationContextProvider>
        <PlantsContextProvider>
          <FavoritesContextProvider>{children}</FavoritesContextProvider>
        </PlantsContextProvider>
      </TranslationContextProvider>
    </QueryClientProvider>
  )
}
