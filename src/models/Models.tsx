import { FavoritesContextProvider } from './Favorites'
import { PlantsContextProvider } from './Plants'
import React from 'react'

import { TranslationContextProvider } from './Translations'

export const ModelsContextProviders = ({ children }: any): JSX.Element => {
  return (
    <TranslationContextProvider>
      <PlantsContextProvider>
        <FavoritesContextProvider>{children}</FavoritesContextProvider>
      </PlantsContextProvider>
    </TranslationContextProvider>
  )
}
