import { FavoritesContextProvider } from './Favorites'
import { PlantsContextProvider } from './Plants'
import { QueryClientProvider } from './QueryClient'
import React from 'react'
import { ThemeContextProvider } from './Theme'
import { TranslationContextProvider } from './Translations'

export const Providers = ({ children }: any): JSX.Element => {
  return (
    <ThemeContextProvider>
      <QueryClientProvider>
        <TranslationContextProvider>
          <PlantsContextProvider>
            <FavoritesContextProvider>{children}</FavoritesContextProvider>
          </PlantsContextProvider>
        </TranslationContextProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  )
}
