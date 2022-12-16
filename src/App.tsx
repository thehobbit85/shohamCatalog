import React, { useMemo, useEffect } from 'react'

import { Home } from './screens/Home'

import { ThemeContextProvider } from './theme/theme'
import { FontLoadView } from './context/FontLoadView'
import { useStore } from './state/useStore'
import { useHandler } from './hooks/useHandler'

export default function App(): JSX.Element | null {
  const fetchData = useStore(useHandler((state) => state.fetchData))

  useEffect(() => {
    fetchData().catch((e) => console.log(e))
  }, [fetchData])

  const customFonts = useMemo(
    () => ({
      'GveretLevin-Regular': require('../assets/fonts/GveretLevin-Regular.ttf')
    }),
    []
  )

  return (
    <ThemeContextProvider>
      <FontLoadView customFonts={customFonts}>
        <Home />
      </FontLoadView>
    </ThemeContextProvider>
  )
}
