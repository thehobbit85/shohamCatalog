import React, { useMemo } from 'react'

import { Home } from './screens/Home'

import { QueryClientProvider } from './context/QueryClient'
import { ThemeContextProvider } from './theme/theme'
import { FontLoadView } from './context/FontLoadView'

export default function App(): JSX.Element | null {
  const customFonts = useMemo(
    () => ({
      'GveretLevin-Regular': require('../assets/fonts/GveretLevin-Regular.ttf')
    }),
    []
  )

  return (
    <ThemeContextProvider>
      <QueryClientProvider>
        <FontLoadView customFonts={customFonts}>
          <Home />
        </FontLoadView>
      </QueryClientProvider>
    </ThemeContextProvider>
  )
}
