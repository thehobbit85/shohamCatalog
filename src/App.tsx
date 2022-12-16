import React from 'react'

import { Home } from './screens/Home'
import { ModelsContextProviders } from './models/Models'

import { QueryClientProvider } from './context/QueryClient'
import { ThemeContextProvider } from './theme/theme'
import { FontLoadView } from './context/FontLoadView'

const customFonts = {
  'GveretLevin-Regular': './assets/fonts/GveretLevin-Regular.ttf'
}

export default function App(): JSX.Element | null {
  return (
    <ThemeContextProvider>
      <QueryClientProvider>
        <ModelsContextProviders>
          <FontLoadView customFonts={customFonts}>
            <Home />
          </FontLoadView>
        </ModelsContextProviders>
      </QueryClientProvider>
    </ThemeContextProvider>
  )
}
